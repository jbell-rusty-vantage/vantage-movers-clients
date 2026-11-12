// Creates ONE synthetic Form Lead through an allowlisted deployed Preview UI.
// Run only after the build's immutable URL and approved Preview configuration are known.
import { createRequire } from "node:module";
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { assertPreviewSite, check, checkUnusedReference, evidenceDirectory, exactReferenceReadback, preflight, previewConnection, saveEvidence } from "./preview-qualification.mjs";

const require = createRequire(new URL("../../../apps/main-site/package.json", import.meta.url));
const { chromium } = require("playwright");
const evidence = fileURLToPath(evidenceDirectory);
let stage = "validate-target";
let browser;
let submittedReference;

try {
  check(process.argv[2] === "--submit-one-preview-quote", "Explicit preview-submit mode required");
  const priorAttempt = await stat(`${evidence}/deployed-submission-attempt.json`).then(() => true).catch(error => { if (error.code === "ENOENT") return false; throw error; });
  check(!priorAttempt, "A submission attempt already exists; use exact-reference readback instead of resubmitting");
  const origin = assertPreviewSite(process.env.SITE_PREVIEW_URL || "");
  check(Boolean(process.env.SITE_PREVIEW_SOURCE_SHA?.match(/^[a-f0-9]{40}$/)), "Record the deployed source SHA before qualification");
  const api = await previewConnection();
  stage = "api-preflight";
  const apiEvidence = await preflight(api);
  await saveEvidence("api-preflight.json", apiEvidence);

  stage = "anonymous-site-protection";
  const anonymous = await fetch(origin, { redirect: "manual", signal: AbortSignal.timeout(30000) });
  check([401, 403, 302, 303, 307, 308].includes(anonymous.status), "Expected preview site protection was not observed");
  check(Boolean(process.env.SITE_PREVIEW_BYPASS || process.env.SITE_PREVIEW_STORAGE_STATE), "Site-scoped bypass or authenticated site storage required");

  stage = "open-protected-ui";
  browser = await chromium.launch();
  // Vercel excludes navigator.webdriver sessions. Use the native browser runbook
  // for dashboard receipts; never alter browser automation signals to force collection.
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce", ...(process.env.SITE_PREVIEW_STORAGE_STATE ? { storageState: process.env.SITE_PREVIEW_STORAGE_STATE } : {}) });
  let submitted;
  let quotePosts = 0;
  const requestErrors = [];
  const collectorRequests = [];
  await context.route("**/*", async route => {
    const request = route.request();
    const url = new URL(request.url());
    // Browser never contacts the backend API or sends secrets to third parties.
    if (url.origin !== origin) return route.abort();
    const collector = url.pathname.startsWith("/_vercel/insights/") || url.pathname.startsWith("/_vercel/speed-insights/");
    if (collector && request.method() === "POST") {
      const body = request.postData() || "";
      if (/preview-main-site-|example\.com|20255501|33426|53703|ref_no|MS-2026|Synthetic Main Site/i.test(body)) {
        requestErrors.push("Private or test-form data was blocked from a collector");
        return route.abort();
      }
      collectorRequests.push({ path: url.pathname, method: request.method() });
    }
    if (request.method() === "POST" && url.pathname === "/api/quote") {
      quotePosts += 1;
      if (quotePosts > 1) { requestErrors.push("A second quote POST was blocked"); return route.abort(); }
      const payload = request.postDataJSON();
      if (!(payload.name === "Synthetic Main Site Preview Qualification" && /^preview-main-site-[0-9]+@example\.com$/.test(payload.email) && /^20255501[0-9]{2}$/.test(payload.phone) && payload.source_company === "main_site" && payload.source_company_site === "vantagehomemovers.com" && payload.sms_consent === false && /^MS-[A-Za-z0-9_-]+$/.test(payload.ref_no))) {
        requestErrors.push("Unexpected quote payload was blocked");
        return route.abort();
      }
      try { await checkUnusedReference(payload.ref_no); }
      catch { requestErrors.push("Exact-reference pre-submit check failed; request blocked"); return route.abort(); }
      submitted = payload;
      submittedReference = payload.ref_no;
      await saveEvidence("deployed-submission-attempt.json", { attemptedAt: new Date().toISOString(), site: origin, sourceSha: process.env.SITE_PREVIEW_SOURCE_SHA, reference: payload.ref_no, lid: payload.lid, consent: false, expectedSource: "main_site", note: "Attempt journal only; response/readback determine capture. Do not rerun submission to recover a failed readback." });
    } else if (!["GET", "HEAD"].includes(request.method()) && !collector) {
      return route.abort();
    }
    const headers = { ...request.headers() };
    if (process.env.SITE_PREVIEW_BYPASS) headers["x-vercel-protection-bypass"] = process.env.SITE_PREVIEW_BYPASS;
    return route.continue({ headers });
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.name));
  const marker = `PREVIEW-${Date.now()}`;
  const response = await page.goto(`${origin}/services/long-distance-moving?ref_no=${marker}`);
  check(response?.status() === 200, "Protected service page did not render");
  const responseNoindex = response.headers()["x-robots-tag"]?.includes("noindex");
  const metaNoindex = await page.evaluate(() => document.querySelector('meta[name="robots"]')?.getAttribute("content")?.includes("noindex") === true);
  check(responseNoindex || metaNoindex, "Preview noindex is missing");
  const form = page.locator("form").first();
  await form.waitFor();

  stage = "synthetic-ui-entry";
  await form.getByLabel("Moving From (ZIP)", { exact: true }).fill("33426");
  await form.getByLabel("Moving To (ZIP)", { exact: true }).fill("53703");
  const confirm = form.getByRole("button", { name: /Confirm delivery location/ });
  const placesConfirmed = await confirm.waitFor({ timeout: 10000 }).then(async () => { await confirm.click(); return true; }).catch(() => false);
  await form.getByRole("button", { name: "Select move date", exact: true }).click();
  await page.locator(".vdp__day-btn:not(.vdp__day-btn--disabled):not(.vdp__day-btn--outside)").last().click();
  await form.getByLabel("Move Size", { exact: true }).selectOption("Studio");
  await form.getByRole("button", { name: "Continue", exact: true }).click();
  await form.getByLabel("Full Name", { exact: true }).fill("Synthetic Main Site Preview Qualification");
  await form.getByLabel("Email", { exact: true }).fill(`preview-main-site-${Date.now()}@example.com`);
  await form.getByLabel("Phone", { exact: true }).fill(`20255501${String(Math.floor(Math.random() * 100)).padStart(2, "0")}`);
  await form.getByRole("checkbox").uncheck();

  stage = "one-ui-submission";
  const quoteResponsePromise = page.waitForResponse(response => new URL(response.url()).origin === origin && new URL(response.url()).pathname === "/api/quote" && response.request().method() === "POST");
  await form.getByRole("button", { name: "Request Free Quote", exact: true }).click();
  const quoteResponse = await quoteResponsePromise;
  const quoteResult = await quoteResponse.json();
  check(quoteResponse.status() === 200 && quoteResult.leadCaptured === true, "Deployed UI did not confirm capture; do not resubmit automatically");
  await form.getByRole("heading", { name: "Request Received", exact: true }).waitFor();
  check(quotePosts === 1 && submitted && requestErrors.length === 0, "Unexpected submission behavior");
  const diagnosticEvents = await page.evaluate(() => window.__vantagePreviewEvents ?? []);
  const eventNames = diagnosticEvents.map(event => event.name);
  const orderedEvents = ["form_started", "form_step_completed", "form_submit_attempted", "form_submit_success"];
  let priorIndex = -1;
  for (const name of orderedEvents) {
    const index = eventNames.indexOf(name);
    check(index > priorIndex, "Preview diagnostic event order failed");
    priorIndex = index;
  }
  check(eventNames.filter(name => name === "form_submit_success").length === 1, "Expected exactly one capture diagnostic");
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/deployed-1440-confirmation.png`, fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await form.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${evidence}/deployed-390-confirmation.png`, fullPage: false });

  stage = "exact-reference-readback";
  const readback = await exactReferenceReadback(submitted.ref_no, api, { lid: submitted.lid, size: submitted.size });
  await saveEvidence("deployed-readback.json", readback);
  const result = {
    checkedAt: new Date().toISOString(), site: origin, sourceSha: process.env.SITE_PREVIEW_SOURCE_SHA,
    anonymousProtectionStatus: anonymous.status, noindex: true, uiQuotePostCount: quotePosts, quoteHttpStatus: quoteResponse.status(), leadCaptured: quoteResult.leadCaptured,
    reference: submitted.ref_no, consentSubmitted: false, placesConfirmed, pageErrors, diagnosticEvents, collectorRequests, readback,
    analytics: "Automated Chromium session: Vercel intentionally excludes webdriver traffic. Native browser and aggregation evidence must qualify analytics separately.",
    scope: "One real synthetic preview Form Lead via deployed UI. Invalid/retry contracts are separately mocked. No production submission.",
  };
  await saveEvidence("deployed-ui-qualification.json", result);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(JSON.stringify({ stage, status: "failed", errorType: error?.name || "Error", ...(submittedReference ? { reference: submittedReference, recovery: "Use preview-qualification.mjs --readback with this exact reference. Do not resubmit." } : {}), detail: "Credentials, network errors and remote bodies suppressed." }));
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
}
