import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const app = new URL("../../../../apps/main-site/", import.meta.url);
const { chromium } = createRequire(new URL("package.json", app))("playwright");
const base = new URL(process.env.REVIEW_URL ?? "http://localhost:3001");
const out = new URL(process.env.REVIEW_OUTPUT ?? "./", import.meta.url);
const widths = [320, 390, 1440];
const sourceFiles = ["resources.ts", "planning-resources.ts"];
const services = await readFile(new URL("src/content/editorial/services.ts", app), "utf8");
const serviceRoutes = Array.from(services.matchAll(/service\("(en|es)", "([^"]+)", "([^"]+)"/g), ([, locale, id, slug]) => ({
  id, locale, path: `${locale === "en" ? "/services" : "/es/servicios"}/${slug}`,
}));
const editorialPaths = (await Promise.all(sourceFiles.map(file => readFile(new URL(`src/content/editorial/${file}`, app), "utf8"))))
  .flatMap(contents => Array.from(contents.matchAll(/path: "([^"]+)"/g), ([, path]) => path));

assert.equal(serviceRoutes.length, 16);
assert.equal(editorialPaths.length, 12);
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chromium", headless: true });
const context = await browser.newContext();
await context.route("**/*", route => {
  const request = route.request();
  return new URL(request.url()).origin === base.origin && ["GET", "HEAD"].includes(request.method())
    ? route.continue()
    : route.abort();
});
const page = await context.newPage();
const report = { origin: base.origin, widths, services: [], editorial: [], pageErrors: [] };
page.on("pageerror", error => report.pageErrors.push(error.message));
const hiddenProcessCopy = /Codex editorial|draft updated|editorial approval|vista previa editorial|borrador revisado|reviewer: pending/i;
const sourcePanel = page.getByRole("region", { name: /Sources and review|Fuentes y revisión/ });

async function open(path) {
  const response = await page.goto(new URL(path, base).href);
  assert.equal(response?.status(), 200, path);
  assert.doesNotMatch(await page.locator("main").innerText(), hiddenProcessCopy, path);
}

async function capture(locator, name) {
  await locator.evaluate(element => {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 165, behavior: "instant" });
  });
  await page.waitForFunction(() => document.fonts.status === "loaded");
  await page.screenshot({
    path: fileURLToPath(new URL(`${name}.jpg`, out)),
    type: "jpeg",
    quality: 82,
    animations: "disabled",
    style: "nextjs-portal { display:none !important }",
  });
}

async function checkSources(path, expectedCount) {
  const links = await sourcePanel.locator("a[target=_blank]").evaluateAll(nodes => nodes.map(node => node.href));
  assert.ok(links.length > 0, path);
  if (expectedCount) assert.equal(links.length, expectedCount, path);
  assert.ok(links.every(link => link.startsWith("https://")), path);
  assert.equal(await sourcePanel.locator("time[datetime]").count(), links.length, path);
  return links;
}

try {
  for (const entry of serviceRoutes) {
    const { path, locale, id } = entry;
    await page.setViewportSize({ width: 390, height: 980 });
    await open(path);
    assert.equal(await page.locator("main > section:first-child nav").count(), 0, path);
    const details = page.locator("#service-details");
    assert.equal(await details.getByRole("heading", { level: 3 }).count(), 3, path);
    assert.ok(await details.locator("svg.lucide").count() >= 3, path);
    const sources = await checkSources(path, 4);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 980 });
      const layout = await details.evaluate(element => ({
        columns: getComputedStyle(element.querySelector(".grid")).gridTemplateColumns.split(" ").length,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      assert.equal(layout.columns, width === 1440 ? 3 : 1, `${path} at ${width}px`);
      assert.ok(layout.scrollWidth <= width, `${path} overflows at ${width}px`);
      if ((id === "packing-services" && locale === "en" && width === 1440) ||
          (id === "military-moving" && locale === "es" && width === 390)) {
        await capture(details, `${locale}-${id}-${width}`);
      }
    }
    report.services.push({ ...entry, sources });
  }

  for (const path of ["/resources", "/es/recursos", ...editorialPaths]) {
    await page.setViewportSize({ width: 390, height: 980 });
    await open(path);
    const sources = editorialPaths.includes(path) ? await checkSources(path) : [];
    if (path === "/resources/comparing-moving-estimates") {
      await page.setViewportSize({ width: 1440, height: 980 });
      await capture(sourcePanel, "en-sources-1440");
    }
    if (path === "/es/recursos/comparar-presupuestos") await capture(sourcePanel, "es-sources-390");
    report.editorial.push({ path, sources });
  }
  assert.deepEqual(report.pageErrors, []);
} finally {
  await writeFile(new URL("service-editorial-report.json", out), JSON.stringify(report, null, 2) + "\n");
  await browser.close();
}
