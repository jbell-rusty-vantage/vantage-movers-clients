// Read-only, matched-browser lab comparison. No quote or telemetry POST is allowed.
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import { assertPreviewSite } from "./preview-qualification.mjs";
const require = createRequire(new URL("../../../apps/main-site/package.json", import.meta.url));
const { chromium } = require("playwright");
const preview = assertPreviewSite(process.env.SITE_PREVIEW_URL || "");
const browser = await chromium.launch();
const report = { checkedAt: new Date().toISOString(), sourceSha: process.env.SITE_PREVIEW_SOURCE_SHA, method: "One cold browser context per origin/width; desktop Chromium, DPR1, reduced motion, no network/CPU throttling, five seconds after load. Cache/CDN warmth is uncontrolled. API content differs. Not a field score or statistical speed claim.", samples: [] };
try {
  for (const width of [1440, 390]) {
    for (const [kind, origin] of [["production-control", "https://www.vantagehomemovers.com"], ["preview", preview]]) {
      const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1000 : 844 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      await context.route("**/*", route => {
        const request = route.request();
        const url = new URL(request.url());
        if (!["GET", "HEAD"].includes(request.method()) || url.pathname.startsWith("/_vercel/")) return route.abort();
        const headers = { ...request.headers() };
        if (url.origin === preview && process.env.SITE_PREVIEW_BYPASS) headers["x-vercel-protection-bypass"] = process.env.SITE_PREVIEW_BYPASS;
        return route.continue({ headers });
      });
      await context.addInitScript(() => {
        window.__loadingSample = { cls: 0, lcp: 0 };
        new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__loadingSample.cls += entry.value; }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__loadingSample.lcp = entry.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.name));
      const response = await page.goto(origin, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(5000);
      const result = await page.evaluate(() => {
        const hero = document.querySelector("main section img");
        const resource = hero && performance.getEntriesByType("resource").find(entry => entry.name === hero.currentSrc);
        const navigation = performance.getEntriesByType("navigation")[0];
        return { ...window.__loadingSample, documentWidth: document.documentElement.scrollWidth, heroLoaded: Boolean(hero?.complete && hero.naturalWidth), heroSource: hero?.currentSrc, heroTransferBytes: resource?.transferSize, heroEncodedBytes: resource?.encodedBodySize, heroDurationMs: resource?.duration, domContentLoadedMs: navigation?.domContentLoadedEventEnd, loadMs: navigation?.loadEventEnd };
      });
      report.samples.push({ kind, width, status: response.status(), errors, ...result });
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(new URL("./evidence/analytics-native-20261112/loading-comparison.json", import.meta.url), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report, null, 2));
if (report.samples.some(sample => sample.status !== 200 || !sample.heroLoaded || sample.errors.length || sample.documentWidth > sample.width)) process.exitCode = 1;
