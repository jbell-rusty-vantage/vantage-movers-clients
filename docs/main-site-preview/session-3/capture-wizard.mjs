import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const require = createRequire(new URL("../../../apps/main-site/package.json", import.meta.url));
const { chromium } = require("playwright");
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const base = process.env.MAIN_SITE_QA_URL || "http://localhost:3001";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Mocked quote QA accepts localhost only");
const evidence = fileURLToPath(new URL("./evidence/", import.meta.url));
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch();
const results = [];
const en = "/services/long-distance-moving";
const es = "/es/servicios/mudanzas-larga-distancia";
const key = "vantage.main-site.quote.v1";

try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, reducedMotion: "reduce" });
    const payloads = [];
    const errors = [];
    let captureAttempt = 0;
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.pathname === "/api/quote") {
        payloads.push(request.postDataJSON());
        captureAttempt += 1;
        return route.fulfill({ status: captureAttempt === 2 ? 503 : 200, contentType: "application/json", body: JSON.stringify({ leadCaptured: captureAttempt >= 3, low: 0, high: 0 }) });
      }
      if (url.pathname === "/api/places/autocomplete") {
        const zip = url.searchParams.get("input");
        return route.fulfill({ json: { suggestions: [{ placeId: `synthetic-${zip}`, postalCode: zip, text: `Synthetic place ${zip}` }] } });
      }
      if (url.pathname === "/api/places/details") {
        const zip = url.searchParams.get("placeId").replace("synthetic-", "");
        const place = zip === "53703" ? { city: "Madison", state: "WI" } : zip === "53590" ? { city: "Sun Prairie", state: "WI" } : { city: "Madison", state: "AL" };
        return route.fulfill({ json: { postalCode: zip, country: "US", ...place } });
      }
      if (url.origin !== new URL(base).origin || !["GET", "HEAD"].includes(request.method()) || url.pathname.startsWith("/_vercel/")) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(base + en);
    await page.locator("form").waitFor();
    let form = page.locator("form").first();
    await form.getByLabel("Moving From (ZIP)", { exact: true }).fill("33426");
    const destination = form.getByLabel("Moving To (ZIP)", { exact: true });
    await destination.fill("53703");
    await form.getByRole("button", { name: "Confirm delivery location: Madison, WI", exact: true }).click();
    assert.match(await form.getByRole("link", { name: "Plan for your destination", exact: true }).getAttribute("href"), /madison/);
    await destination.fill("10001");
    assert.equal(await form.getByRole("link", { name: "Plan for your destination", exact: true }).count(), 0);
    await form.getByRole("button", { name: "Confirm delivery location: Madison, AL", exact: true }).click();
    assert.doesNotMatch(await form.getByRole("link", { name: "Plan for your destination", exact: true }).getAttribute("href"), /wisconsin|madison/);
    await destination.fill("53590");
    await form.getByRole("button", { name: "Confirm delivery location: Sun Prairie, WI", exact: true }).click();
    assert.match(await form.getByRole("link", { name: "Plan for your destination", exact: true }).getAttribute("href"), /wisconsin/);
    await destination.fill("53703");
    await form.getByRole("button", { name: "Confirm delivery location: Madison, WI", exact: true }).click();
    await form.getByRole("button", { name: "Select move date", exact: true }).click();
    await page.locator(".vdp__day-btn:not(.vdp__day-btn--disabled):not(.vdp__day-btn--outside)").last().click();
    await form.getByLabel("Move Size", { exact: true }).selectOption("2 Bedrooms");
    const requestCapture = await form.screenshot({ path: `${evidence}/wizard-${width}-request.png` });
    if (width === 1440) {
      const assetDirectory = fileURLToPath(new URL("../../../apps/main-site/public/images/preview/", import.meta.url));
      await mkdir(assetDirectory, { recursive: true });
      await sharp(requestCapture).webp({ quality: 85 }).toFile(`${assetDirectory}/quote-request.webp`);
    }
    await form.getByRole("button", { name: "Continue", exact: true }).click();
    await form.getByLabel("Full Name", { exact: true }).fill("Preview Wizard Synthetic");
    await form.getByLabel("Email", { exact: true }).fill("wizard-preview@example.com");
    await form.getByLabel("Phone", { exact: true }).fill("2025550100");
    await form.getByRole("checkbox").uncheck();
    await form.getByRole("link", { name: "Plan for your destination", exact: true }).click();
    await page.waitForURL(/madison/);
    await page.goBack();
    form = page.locator("form").first();
    await form.getByLabel("Full Name", { exact: true }).waitFor();
    assert.equal(await form.getByLabel("Full Name", { exact: true }).inputValue(), "Preview Wizard Synthetic");
    await page.goto(base + es);
    assert.equal(await page.locator("html").getAttribute("lang"), "es");
    form = page.locator("form").first();
    await form.getByLabel("Nombre completo", { exact: true }).waitFor();
    assert.equal(await form.getByLabel("Nombre completo", { exact: true }).inputValue(), "Preview Wizard Synthetic");
    assert.equal(await form.getByRole("checkbox").isChecked(), false);
    await page.reload();
    await form.getByLabel("Nombre completo", { exact: true }).waitFor();
    assert.equal(await form.getByRole("checkbox").isChecked(), false);
    await form.getByRole("button", { name: "Solicitar cotización gratis", exact: true }).click();
    await form.getByRole("alert").filter({ hasText: "No pudimos confirmar" }).waitFor();
    assert.equal(await form.getByRole("heading", { name: "Solicitud recibida", exact: true }).count(), 0);
    await page.screenshot({ path: `${evidence}/wizard-${width}-false-capture.png`, fullPage: false });
    await form.getByRole("button", { name: "Solicitar cotización gratis", exact: true }).click();
    await form.getByRole("alert").filter({ hasText: "No pudimos confirmar" }).waitFor();
    await form.getByRole("button", { name: "Solicitar cotización gratis", exact: true }).click();
    await form.getByRole("heading", { name: "Solicitud recibida", exact: true }).waitFor();
    assert.equal(payloads.length, 3);
    assert.deepEqual(payloads[0], payloads[1]);
    assert.deepEqual(payloads[1], payloads[2]);
    assert.equal(payloads[0].sms_consent, false);
    assert.equal(payloads[0].source_company, "main_site");
    assert.equal(await page.evaluate(key => sessionStorage.getItem(key), key), null);
    await page.screenshot({ path: `${evidence}/wizard-${width}-confirmation.png`, fullPage: false });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    results.push({ width, locale: "es", draftExplorationBackReload: "passed", destinationCityStateGenericAndEdit: "passed", responseSequence: ["200 false", "503 false", "200 true"], identicalRetryPayloads: true, falseConsentRetained: true, capturedDraftCleared: true, overflow: false, pageErrors: errors });
    assert.deepEqual(errors, []);
    await context.close();
  }
  // The two homepage forms must not race when pagehide saves the active attempt.
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route("**/api/places/**", route => route.fulfill({ json: { suggestions: [] } }));
  await context.route("**/_vercel/**", route => route.abort());
  const page = await context.newPage();
  await page.goto(base);
  const forms = page.locator("form");
  await forms.nth(1).waitFor();
  assert.equal(await forms.count(), 2);
  await forms.nth(0).getByLabel("Moving From (ZIP)", { exact: true }).fill("33426");
  await forms.nth(1).getByLabel("Moving From (ZIP)", { exact: true }).fill("10001");
  await forms.nth(1).getByLabel("Moving To (ZIP)", { exact: true }).fill("53703");
  await page.goto(base + es);
  await page.getByLabel("Origen (código postal)", { exact: true }).waitFor();
  await page.waitForFunction(() => document.querySelector('input[id$="-pickup-zip"]')?.value === "10001");
  assert.equal(await page.getByLabel("Origen (código postal)", { exact: true }).inputValue(), "10001");
  results.push({ homepageMultipleForms: "active form retained after navigation" });
  await context.close();
  await writeFile(`${evidence}/wizard-journey.json`, JSON.stringify({ capturedAt: new Date().toISOString(), base, mode: "Local development; all quote and Places responses mocked. No Form Lead persisted.", geolocation: "No pickup permission requested; reverse-geolocation feature deferred. Manual ZIP path exercised.", results }, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
