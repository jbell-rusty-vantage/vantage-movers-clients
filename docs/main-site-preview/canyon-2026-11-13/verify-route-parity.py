"""Compare rendered Main Site HTML with read-only GETs (requires beautifulsoup4)."""

import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import re
import shutil
import subprocess
from tempfile import TemporaryDirectory
import unicodedata
from urllib.error import HTTPError
from urllib.parse import parse_qs, urljoin, urlsplit, urlunsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

from bs4 import BeautifulSoup, Comment, NavigableString, Tag


BASELINE = "https://vantage-main-site-optimization.vercel.app"
SCOPE = "vantage-4d3db9ef"
INVENTORY = Path(__file__).resolve().parent.parent / "cms-2026-11-12" / "baseline-pages.json"
NON_HTML = {"/licenses/us-atlas.txt"}
UTILITY_ROUTES = {
    "/ready-to-move": (307, "/pdfs/Ready_To_Move_Brochure_2006.pdf"),
    "/your-rights": (307, "/pdfs/Rights-and-Responsibilities-2013.pdf"),
    "/licenses/us-atlas.txt": (200, "text/plain"),
    "/canyon-parity-unknown": (404, "text/html"),
    "/es/canyon-parity-unknown": (404, "text/html"),
}
TEXT_ATTRIBUTES = ("alt", "title", "placeholder", "aria-label", "aria-description", "aria-roledescription")
BLOCK_ELEMENTS = frozenset("address article aside blockquote br dd div dl dt fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr li main nav ol p section summary table td th tr ul".split())
COPY_CONTAINERS = BLOCK_ELEMENTS | {"a", "button", "select", "option", "text", "title"}
SUSPENSE_START = {"$", "$?", "$~", "$!", "&"}
SUSPENSE_END = {"/$", "/&"}
STREAM_CALL = re.compile(r'\$R([CSR])\("([BSP]:[\da-f]+)",\s*"([BSP]:[\da-f]+)"')
ROBOTS_DIRECTIVE = re.compile(r"(?:^|[\s,:])(noindex|none)(?:$|[\s,])", re.I)
BACKGROUND_URL = re.compile(r'''url\(\s*['"]?([^'"\s)]+)['"]?\s*\)''')


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, request, file, code, message, headers, new_url):
        return None


def fetch(origin, path, use_vercel):
    if not use_vercel:
        request = Request(origin + path, headers={"User-Agent": "Vantage-route-parity/1.0"})
        try:
            with build_opener(NoRedirect).open(request, timeout=30) as response:
                return response.status, dict(response.headers.items()), response.read().decode("utf-8")
        except HTTPError as response:
            with response:
                return response.code, dict(response.headers.items()), response.read().decode("utf-8")

    executable = shutil.which("vercel")
    if not executable:
        raise RuntimeError("Vercel CLI is unavailable")
    with TemporaryDirectory(prefix="vantage-route-parity-") as temporary:
        headers = Path(temporary) / "headers"
        body = Path(temporary) / "body"
        result = subprocess.run(
            [executable, "curl", path, "--deployment", origin, "--scope", SCOPE, "--",
             "--silent", "--show-error", "--max-time", "30", "--dump-header", str(headers),
             "--output", str(body)], capture_output=True, timeout=50, check=False,
        )
        if result.returncode or not headers.exists() or not body.exists():
            raise RuntimeError(f"Authenticated Vercel GET failed (exit {result.returncode})")
        blocks = re.split(r"\r?\n\r?\n", headers.read_text(encoding="iso8859-1").strip())
        lines = next(block.splitlines() for block in reversed(blocks) if block.startswith("HTTP/"))
        status = int(lines[0].split()[1])
        return status, dict(line.split(":", 1) for line in lines[1:] if ":" in line), body.read_text(encoding="utf-8")


def replace_fallback(marker, segment):
    """Replace one completed React boundary with the transmitted segment."""
    depth = 0
    fallback = [marker]
    for node in marker.next_siblings:
        if isinstance(node, Comment) and node in SUSPENSE_END:
            if depth == 0:
                break
            depth -= 1
        elif isinstance(node, Comment) and node in SUSPENSE_START:
            depth += 1
        fallback.append(node)
    else:
        raise RuntimeError("Completed Suspense boundary lacks a closing marker")
    for child in list(segment.contents):
        marker.insert_before(child.extract())
    segment.decompose()
    for node in fallback:
        node.extract()


def restore_streamed_html(document):
    for tag in list(document.find_all(("script", "template"))):
        if tag.name == "script":
            instructions = STREAM_CALL.findall(tag.get_text())
        elif tag.has_attr("data-rsi"):
            instructions = [("S", tag["data-sid"], tag["data-pid"])]
        elif tag.has_attr("data-rci") or tag.has_attr("data-rri"):
            instructions = [("C", tag["data-bid"], tag["data-sid"])]
        else:
            continue
        for operation, first, second in instructions:
            segment = document.find(id=first if operation == "S" else second)
            marker = document.find(id=second if operation == "S" else first)
            if segment is None or marker is None:
                raise RuntimeError(f"Unresolved React stream instruction {operation} {first} {second}")
            if operation == "S":
                marker.replace_with(*[node.extract() for node in list(segment.contents)])
                segment.decompose()
            else:
                replace_fallback(marker, segment)
    for tag in document.select("script, style, template, nextjs-portal, [data-nextjs-dialog-overlay]"):
        tag.decompose()


def normalize(text):
    return " ".join(unicodedata.normalize("NFC", text).split())


def rendered_text(node):
    if isinstance(node, Comment):
        return ""
    if isinstance(node, NavigableString):
        return str(node)
    if not isinstance(node, Tag):
        return ""
    text = "".join(rendered_text(child) for child in node.children)
    return f" {text} " if node.name in BLOCK_ELEMENTS else text


def copy_chunks(node):
    """Keep word order inside copy while allowing components to move on a page."""
    text = ""
    for child in node.children:
        if isinstance(child, Tag) and child.name in COPY_CONTAINERS:
            if text.strip():
                yield normalize(text)
            text = ""
            yield from copy_chunks(child)
        else:
            text += rendered_text(child)
    if text.strip():
        yield normalize(text)


def origin_relative(value, page_url):
    result = urlsplit(urljoin(page_url, value))
    origin = urlsplit(page_url)
    if (result.scheme, result.netloc) != (origin.scheme, origin.netloc):
        return result.geturl()
    return urlunsplit(("", "", result.path, result.query, result.fragment))


def media_source(value, page_url):
    parsed = urlsplit(value)
    if parsed.path == "/_next/image":
        value = parse_qs(parsed.query).get("url", [value])[0]
    return origin_relative(value, page_url)


def inspect_utility(origin, path, use_vercel):
    expected_status, expected_target = UTILITY_ROUTES[path]
    status, headers, body = fetch(origin, path, use_vercel)
    headers = {name.lower(): value.strip() for name, value in headers.items()}
    robots = headers.get("x-robots-tag", "")
    if expected_status == 307:
        target = origin_relative(headers["location"], origin + path) if headers.get("location") else None
    else:
        target = headers.get("content-type", "").split(";", 1)[0]
    record = {"status": status, "noindex": bool(ROBOTS_DIRECTIVE.search(robots)), "target": target}
    if path in NON_HTML:
        record["sha256"] = sha256(body.encode("utf-8")).hexdigest()
    record["passed"] = status == expected_status and record["noindex"] and target == expected_target
    return record


def inspect(origin, path, use_vercel):
    status, headers, html = fetch(origin, path, use_vercel)
    headers = {name.lower(): value.strip() for name, value in headers.items()}
    content_type = headers.get("content-type", "").split(";", 1)[0]
    if status != 200 or content_type != "text/html":
        raise RuntimeError(f"Expected application HTML, received HTTP {status} {content_type}")
    document = BeautifulSoup(html, "html.parser")
    restore_streamed_html(document)
    if document.html is None or document.body is None or document.find("main", id="main-content") is None:
        raise RuntimeError("Application HTML lacks its root or main landmark")
    page_url = origin + path
    links = {origin_relative(tag["href"], page_url) for tag in document.select("body a[href], body area[href]")}
    media = {
        media_source(value.strip().split()[0], page_url)
        for tag in document.select("body img, body source")
        for attribute in ("src", "srcset")
        for value in tag.get(attribute, "").split(",")
        if value.strip()
    }
    background_media = {
        media_source(value, page_url)
        for tag in document.select("body [style]")
        for value in BACKGROUND_URL.findall(tag["style"])
    }
    attributes = Counter(
        normalize(tag[attribute])
        for tag in document.body.find_all(True)
        for attribute in TEXT_ATTRIBUTES
        if tag.get(attribute)
    )
    robots = [headers.get("x-robots-tag", "")] + [tag.get("content", "") for tag in document.select('meta[name="robots"]')]
    return {
        "status": status,
        "noindex": any(ROBOTS_DIRECTIVE.search(value) for value in robots),
        "lang": document.html.get("lang"),
        "presentation": document.html.get("data-presentation"),
        "headings": [normalize(rendered_text(tag)) for tag in document.body.find_all("h1")],
        "text": Counter(copy_chunks(document.body)),
        "attributes": attributes,
        "links": sorted(links),
        "media": sorted(media | background_media),
    }


def snapshot(origin, paths, use_vercel, include_utility=False):
    records = {}
    utilities = {}
    with ThreadPoolExecutor(max_workers=4) as pool:
        tasks = {path: pool.submit(inspect, origin, path, use_vercel) for path in paths}
        utility_tasks = {path: pool.submit(inspect_utility, origin, path, use_vercel) for path in UTILITY_ROUTES} if include_utility else {}
        for output, pending in ((records, tasks), (utilities, utility_tasks)):
            for path, task in pending.items():
                try:
                    output[path] = task.result()
                except Exception as error:
                    output[path] = {"error": str(error)}
    return {"origin": origin, "checkedAt": datetime.now(timezone.utc).isoformat(), "pages": records, "utilities": utilities}


def delta(baseline, candidate):
    if isinstance(baseline, dict):
        before = Counter(baseline)
        after = Counter(candidate)
        return {"missing": dict(sorted((before - after).items())), "extra": dict(sorted((after - before).items()))}
    return {"missing": sorted(set(baseline) - set(candidate)), "extra": sorted(set(candidate) - set(baseline))}


def compare(baseline, candidate):
    results = []
    for path, before in baseline["pages"].items():
        after = candidate["pages"][path]
        if "error" in before or "error" in after:
            results.append({"path": path, "passed": False, "baselineError": before.get("error"), "candidateError": after.get("error")})
            continue
        lang = "es" if path == "/es" or path.startswith("/es/") else "en"
        checks = {
            "status": before["status"] == after["status"] == 200,
            "noindex": before["noindex"] and after["noindex"],
            "language": before["lang"] == after["lang"] == lang,
            "canyon": after["presentation"] == "canyon",
            "h1": before["headings"] == after["headings"] and len(after["headings"]) == 1,
            **{key: before[key] == after[key] for key in ("text", "attributes", "links", "media")},
        }
        changes = {
            key: delta(before[key], after[key])
            for key in ("text", "attributes", "links", "media")
            if not checks[key]
        }
        for check, field in (("language", "lang"), ("h1", "headings"), ("noindex", "noindex")):
            if not checks[check]:
                changes[field] = {"baseline": before[field], "candidate": after[field]}
        records = {key: before[key] for key in ("headings", "lang", "noindex", "status")}
        records["fingerprints"] = {
            key: sha256(json.dumps(before[key], ensure_ascii=False, sort_keys=True).encode()).hexdigest()
            for key in ("text", "attributes", "links", "media")
        }
        results.append({"path": path, "passed": all(checks.values()), "checks": checks, "baseline": records, **({"differences": changes} if changes else {})})
    utility_results = []
    for path, before in baseline.get("utilities", {}).items():
        after = candidate["utilities"][path]
        utility_results.append({
            "path": path, "baseline": before, "candidate": after,
            "passed": bool(before.get("passed") and after.get("passed") and before == after),
        })
    return {
        "baseline": baseline["origin"], "baselineCheckedAt": baseline["checkedAt"],
        "candidate": candidate["origin"], "candidateCheckedAt": candidate["checkedAt"],
        "copyComparison": "normalized rendered phrase multiset after React stream replacement",
        "passed": all(result["passed"] for result in results + utility_results),
        "routes": len(results), "results": results, "utilityResults": utility_results,
    }


def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("candidate", help="Canyon origin, e.g. http://127.0.0.1:3002")
    parser.add_argument("output", type=Path, help="Evidence JSON path")
    parser.add_argument("--baseline", default=BASELINE, help="Optimization preview origin")
    parser.add_argument("--baseline-vercel", action="store_true", help="Read baseline using authenticated Vercel CLI")
    parser.add_argument("--candidate-vercel", action="store_true", help="Read candidate using authenticated Vercel CLI")
    parser.add_argument("--include-utility", action="store_true", help="Compare document redirects, geography license and two unknown paths")
    parser.add_argument("--write-baseline", type=Path, help="Save an independent baseline snapshot outside the repository")
    parser.add_argument("--read-baseline", type=Path, help="Compare using a previously captured baseline snapshot")
    args = parser.parse_args()
    for origin in (args.baseline, args.candidate):
        parsed = urlsplit(origin)
        if (parsed.scheme not in {"http", "https"} or not parsed.netloc
                or parsed.username or parsed.password or parsed.path not in {"", "/"}
                or parsed.query or parsed.fragment):
            parser.error("Pass a bare HTTP or HTTPS origin without credentials, path, query or fragment")
    pages = json.loads(INVENTORY.read_text(encoding="utf-8"))["pages"]
    paths = sorted({page["path"] for page in pages} - NON_HTML)
    if len(paths) != 56:
        raise RuntimeError(f"Expected 56 HTML routes in the reviewed inventory, found {len(paths)}")
    baseline = (
        json.loads(args.read_baseline.read_text(encoding="utf-8"))
        if args.read_baseline else snapshot(args.baseline.rstrip("/"), paths, args.baseline_vercel, args.include_utility)
    )
    if set(baseline["pages"]) != set(paths):
        raise RuntimeError("Baseline snapshot does not match the reviewed route inventory")
    include_utility = args.include_utility or bool(baseline.get("utilities"))
    if args.include_utility and set(baseline.get("utilities", {})) != set(UTILITY_ROUTES):
        supplemental = snapshot(baseline["origin"], [], args.baseline_vercel, include_utility=True)
        baseline["utilities"] = supplemental["utilities"]
        baseline["utilitiesCheckedAt"] = supplemental["checkedAt"]
    if args.write_baseline:
        save(args.write_baseline, baseline)
    candidate = snapshot(args.candidate.rstrip("/"), paths, args.candidate_vercel, include_utility)
    report = compare(baseline, candidate)
    save(args.output, report)
    failures = [row["path"] for row in report["results"] + report["utilityResults"] if not row["passed"]]
    print(json.dumps({"passed": report["passed"], "routes": report["routes"], "failingRoutes": failures}))
    return bool(failures)


if __name__ == "__main__":
    raise SystemExit(main())
