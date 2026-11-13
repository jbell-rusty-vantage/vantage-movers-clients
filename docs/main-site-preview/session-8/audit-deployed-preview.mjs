// Read-only browser qualification of the protected deployment; never submits a quote.
import { createRequire } from "node:module";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { assertPreviewSite, check } from "./preview-qualification.mjs";

const require = createRequire(new URL("../../../apps/main-site/package.json", import.meta.url));
const { chromium } = require("playwright");
const origin = assertPreviewSite(process.env.SITE_PREVIEW_URL || "");
check(Boolean(process.env.SITE_PREVIEW_BYPASS), "Site-only protection credential required");
const manifest = JSON.parse(await readFile(new URL("../../../apps/main-site/.next/prerender-manifest.json", import.meta.url), "utf8"));
const paths = Object.keys(manifest.routes).filter(path => !path.startsWith("/_") && !/\.(xml|txt|svg|webmanifest)$/.test(path) && path !== "/opengraph-image");
const output = new URL("./evidence/", import.meta.url);
await mkdir(output, { recursive: true });
const report = { checkedAt: new Date().toISOString(), origin, sourceSha: process.env.SITE_PREVIEW_SOURCE_SHA, mode: "Deployed optimized preview; Chromium viewport emulation, reduced motion; read-only", routes: [], layouts: [], noJavaScript: [], errors: [], failures: [] };
const record = (condition, description) => { if (!condition) report.failures.push(description); };
const browser = await chromium.launch();
async function context(javaScriptEnabled = true) {
  const value = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce", javaScriptEnabled });
  await value.route("**/*", route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== origin || !["GET", "HEAD"].includes(request.method()) || url.pathname.startsWith("/_vercel/")) return route.abort();
    return route.continue({ headers: { ...request.headers(), "x-vercel-protection-bypass": process.env.SITE_PREVIEW_BYPASS } });
  });
  return value;
}
try {
  const session = await context();
  const page = await session.newPage();
  page.on("pageerror", error => report.errors.push(error.name));
  const captures = new Map([["/", "home-en"], ["/es", "home-es"], ["/services/long-distance-moving", "service-en"], ["/es/servicios/mudanzas-larga-distancia", "service-es"], ["/resources/comparing-moving-estimates", "worksheet-en"], ["/es/destinos/wisconsin/madison", "madison-es"]]);
  for (const path of paths) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(`${origin}${path}`, { waitUntil: "networkidle", timeout: 60000 });
    const data = await page.evaluate(() => ({ lang: document.documentElement.lang, title: document.title, canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"), headings: document.querySelectorAll("h1").length }));
    record(response.status() === 200, `${path}: HTTP ${response.status()}`);
    record(response.headers()["x-robots-tag"]?.includes("noindex"), `${path}: missing noindex`);
    record(data.lang === (path === "/es" || path.startsWith("/es/") ? "es" : "en"), `${path}: document language`);
    record(data.headings === 1 && Boolean(data.title), `${path}: page identity`);
    record(data.canonical === `https://vantagehomemovers.com${path === "/" ? "" : path}`, `${path}: canonical`);
    if (path === "/") {
      const featureTargets = await page.getByRole("link", { name: "Learn More", exact: true }).evaluateAll(links => links.map(link => link.getAttribute("href")));
      record(JSON.stringify(featureTargets) === JSON.stringify(["/services/long-distance-moving", "/services/military-moving"]), "Homepage feature links must open service articles");
    }
    report.routes.push({ path, status: response.status(), noindex: true, ...data });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await page.evaluate(() => document.fonts.ready);
      const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      record(documentWidth <= width, `${path}: overflow at ${width}`);
      report.layouts.push({ path, width, documentWidth });
      if (captures.has(path) && width !== 320) await page.screenshot({ path: fileURLToPath(new URL(`deployed-${captures.get(path)}-${width}.png`, output)) });
    }
  }
  for (const path of ["/missing-preview-review-page", "/es/missing-preview-review-page"]) {
    const response = await page.goto(`${origin}${path}`);
    record(response.status() === 404, `${path}: expected404`);
  }
  await session.close();
  const noJs = await context(false);
  const fallback = await noJs.newPage();
  for (const path of ["/", "/es", "/services/long-distance-moving", "/es/servicios/mudanzas-larga-distancia"]) {
    const response = await fallback.goto(`${origin}${path}`);
    const visible = await fallback.locator("h1").isVisible();
    record(response.status() === 200 && visible, `${path}: no-JavaScript reading`);
    report.noJavaScript.push({ path, status: response.status(), headingVisible: visible });
  }
  await noJs.close();
} finally {
  await browser.close();
  await writeFile(new URL("deployed-route-audit.json", output), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ routes: report.routes.length, layouts: report.layouts.length, noJavaScript: report.noJavaScript.length, errors: report.errors, failures: report.failures }));
if (report.errors.length || report.failures.length) process.exitCode = 1;
