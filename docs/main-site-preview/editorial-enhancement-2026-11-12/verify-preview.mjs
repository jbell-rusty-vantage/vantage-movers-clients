// Read-only checks. No forms, customer records or telemetry submissions.
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
const origin = process.argv[2];
const output = process.argv[3];
if (!origin || !output || !/^https:\/\/[a-z0-9.-]+\.vercel\.app$/.test(origin)) throw new Error("Pass the exact preview origin and evidence path");
const authenticated = process.argv.includes("--authenticated");
const work = authenticated ? await fs.mkdtemp(path.join(os.tmpdir(), "vantage-resource-check-")) : null;
async function request(route) {
  if (!authenticated) {
    const response = await fetch(origin + route);
    if (new URL(response.url).origin !== origin) throw new Error("Preview requires authenticated access; use --authenticated with the signed-in Vercel CLI.");
    return response;
  }
  const quote = value => `'${value.replaceAll("'", "''")}'`;
  const headersFile = path.join(work, "headers.txt");
  const bodyFile = path.join(work, "body");
  const command = `vercel curl ${quote(route)} --deployment ${quote(origin)} --scope vantage-4d3db9ef -- --silent --show-error --location --dump-header ${quote(headersFile)} --output ${quote(bodyFile)}`;
  const run = spawnSync("powershell.exe", ["-NoProfile", "-Command", command], { encoding: "utf8" });
  if (run.status !== 0) throw new Error(`Authenticated read failed for ${route}`);
  const blocks = (await fs.readFile(headersFile, "utf8")).trim().split(/\r?\n\r?\n/);
  const block = blocks.filter(b => b.startsWith("HTTP/")).at(-1);
  const status = Number(block.match(/^HTTP\/\S+ (\d+)/)[1]);
  const headers = new Headers(block.split(/\r?\n/).slice(1).filter(line => line.includes(":")).map(line => [line.slice(0, line.indexOf(":")), line.slice(line.indexOf(":") + 1).trim()]));
  return { status, headers, text: () => fs.readFile(bodyFile, "utf8") };
}
const paths = ["/resources", "/es/recursos", "/consumer-information", "/resources/comparing-moving-estimates", "/resources/before-the-inventory-call", "/resources/who-handles-my-move", "/resources/moving-cost-guide", "/resources/items-to-check-before-packing", "/resources/moving-paperwork-guide"];
const results = [];
for (const path of paths) {
  const response = await request(path);
  const raw = await response.text();
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const noindex = /noindex/i.test(response.headers.get("x-robots-tag") ?? "") || /name="robots"[^>]+content="[^"]*noindex/i.test(html);
  const checks = { ok: response.status === 200, noindex };
  if (path !== "/consumer-information") {
    checks.author = html.includes(path.startsWith("/es/") ? "Equipo editorial de Vantage Movers" : "Vantage Movers Editorial Team");
    checks.date = html.includes(path.startsWith("/es/") ? "Borrador actualizado:" : "Draft updated:");
    checks.cover = html.includes("still-life-20261112");
  }
  if (["/resources", "/es/recursos"].includes(path)) {
    checks.search = html.includes('id="resource-search"');
    checks.results = html.includes('id="resource-results"');
    checks.sixCovers = ["inventory", "estimates", "roles", "costs", "packing", "paperwork"].every(name => html.includes(`${name}.webp`));
    checks.editorial = html.includes('id="editorial-team"');
  }
  if (["/resources", "/es/recursos", "/consumer-information"].includes(path)) {
    checks.federal = html.includes('id="moving-authorities"') && html.includes("2013") && html.includes("2006");
    checks.links = ["https://www.fmcsa.dot.gov/protect-your-move", "https://www.fmcsa.dot.gov/protect-your-move/search-mover", "/your-rights", "/ready-to-move"].every(href => html.includes(`href="${href}"`));
  }
  results.push({ path, status: response.status, checks, passed: Object.values(checks).every(Boolean) });
}
for (const path of ["/your-rights", "/ready-to-move"]) {
  const response = await request(path);
  results.push({ path, status: response.status, contentType: response.headers.get("content-type"), passed: response.status === 200 && /application\/pdf/.test(response.headers.get("content-type") ?? "") });
  await response.body?.cancel();
}
const report = { origin, access: authenticated ? "Authenticated Vercel CLI; deployment protection retained" : "Anonymous HTTP", checkedAt: new Date().toISOString(), passed: results.every(r => r.passed), results };
await fs.writeFile(output, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ passed: report.passed, pages: results.length, failures: results.filter(r => !r.passed) }));
if (!report.passed) process.exitCode = 1;
