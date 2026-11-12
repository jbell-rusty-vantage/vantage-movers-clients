// Run from repository root against the existing local preview server. No quotes are submitted.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const origin = process.env.PROCESS_LOCAL_URL || 'http://localhost:3001';
assert(['localhost', '127.0.0.1'].includes(new URL(origin).hostname), 'Local preview only');
const output = new URL('./evidence/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const evidence = {
  capturedAt: new Date().toISOString(),
  source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  sourceState: 'Uncommitted integrated worktree; HEAD identifies its base, not the complete tested source.',
  environment: 'Next development server, Chromium deviceScaleFactor=1, no network/CPU throttling; no physical-device claim.',
  screenshotTreatment: 'Component-only screenshots hide sticky header, skip link and Next development portal during capture, without changing layout. They are not full-page screenshots.',
  mediaComparison: { originalHeroFileBytes: 1833644, selectedHeroFileBytes: 105142, boundary: 'Source asset sizes supplied by integration owner. Not a measured network transfer reduction or controlled performance comparison.' },
  cases: [],
};

function asset(url) {
  const parsed = new URL(url);
  return parsed.searchParams.get('url') || parsed.pathname;
}
async function contextFor(viewport, options = {}) {
  const { failProcessImage, ...browserOptions } = options;
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce', ...browserOptions });
  await context.route('**/*', route => {
    const req = route.request();
    if (!['GET', 'HEAD'].includes(req.method()) || /\/_vercel\/|vercel-insights|vitals\.vercel/.test(req.url())) return route.abort();
    if (failProcessImage && asset(req.url()) === '/images/preview/quote-request.webp') return route.abort();
    return route.continue();
  });
  return context;
}
async function imageReady(region) {
  await region.locator('[data-testid="process-image-slot"] img').evaluate(img => new Promise((resolve, reject) => {
    if (img.complete) return img.naturalWidth ? resolve(true) : reject(new Error('Image failed'));
    img.addEventListener('load', () => resolve(true), { once: true });
    img.addEventListener('error', () => reject(new Error('Image failed')), { once: true });
  }));
}
async function screenshot(region, name) {
  await region.screenshot({ path: fileURLToPath(new URL(name, output)), animations: 'disabled', style: 'header, .skip-link, nextjs-portal { visibility: hidden !important; }' });
}

try {
  for (const locale of ['en', 'es']) {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      const context = await contextFor(viewport);
      await context.addInitScript(() => {
        window.__processCLS = 0;
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__processCLS += entry.value;
        }).observe({ type: 'layout-shift', buffered: true });
      });
      const page = await context.newPage();
      const requested = new Set();
      const errors = [];
      page.on('request', req => requested.add(asset(req.url())));
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(`${origin}${locale === 'es' ? '/es' : '/'}`, { waitUntil: 'networkidle', timeout: 120000 });
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      const heroLoading = await page.evaluate(() => ({
        layoutShiftValue: window.__processCLS,
        hero: performance.getEntriesByType('resource').filter(e => e.name.includes('home-inventory')).map(e => ({ name: new URL(e.name).pathname + new URL(e.name).search, transferSize: e.transferSize, encodedBodySize: e.encodedBodySize, decodedBodySize: e.decodedBodySize, duration: e.duration })),
      }));
      const region = page.getByTestId('moving-process');
      await region.scrollIntoViewIfNeeded();
      await imageReady(region);
      const position = page.getByTestId('process-position');
      assert.equal(await position.innerText(), '1 / 5');
      const initialRequests = [...requested].filter(path => path.startsWith('/images/preview/'));
      for (const filename of ['inventory-call.webp', 'review-estimate.webp', 'carrier-paperwork.webp']) {
        assert(!requested.has(`/images/preview/${filename}`), `Later process frame requested early: ${filename}`);
      }
      assert.equal(await region.locator('img').count(), 1);
      const initialBox = await page.getByTestId('process-image-slot').boundingBox();
      await page.waitForTimeout(1400);
      assert.equal(await position.innerText(), '1 / 5', 'No autoplay');
      await screenshot(region, `${locale}-${viewport.width}-first.png`);

      const next = region.getByRole('button', { name: locale === 'es' ? 'Paso siguiente' : 'Next step', exact: true });
      await next.click();
      assert.equal(await position.innerText(), '2 / 5');
      assert.equal(await next.evaluate(el => document.activeElement === el), true, 'Next retains focus');
      await imageReady(region);
      await next.press('ArrowRight');
      assert.equal(await position.innerText(), '3 / 5');
      assert.equal(await next.evaluate(el => document.activeElement === el), true, 'Arrow navigation retains focus');
      await imageReady(region);
      await next.press('ArrowRight');
      await imageReady(region);
      assert.equal(await position.innerText(), '4 / 5');
      await next.press('ArrowRight');
      await imageReady(region);
      assert.equal(await position.innerText(), '5 / 5');
      assert.equal(await next.getAttribute('aria-disabled'), 'true');
      await next.press('ArrowRight');
      assert.equal(await position.innerText(), '5 / 5', 'End clamps');
      assert.equal(await next.evaluate(el => document.activeElement === el), true, 'Boundary retains focus');
      const finalBox = await page.getByTestId('process-image-slot').boundingBox();
      assert(Math.abs(initialBox.width - finalBox.width) < 1 && Math.abs(initialBox.height - finalBox.height) < 1, 'Fixed image area across frames');
      await screenshot(region, `${locale}-${viewport.width}-carrier.png`);
      const firstStep = region.locator('ol button').first();
      await firstStep.click();
      assert.equal(await position.innerText(), '1 / 5');
      assert.equal(await firstStep.evaluate(el => document.activeElement === el), true, 'Direct step selection retains focus');
      await region.locator('ol button').last().click();
      assert.equal(await position.innerText(), '5 / 5');
      const previous = region.getByRole('button', { name: locale === 'es' ? 'Paso anterior' : 'Previous step', exact: true });
      await previous.click();
      assert.equal(await position.innerText(), '4 / 5');
      assert.equal(await previous.evaluate(el => document.activeElement === el), true, 'Previous retains focus');
      await next.click();
      assert.equal(await position.innerText(), '5 / 5');
      await region.focus();
      await region.press('ArrowLeft');
      assert.equal(await position.innerText(), '4 / 5');
      assert.equal(await region.evaluate(el => document.activeElement === el), true, 'Region retains focus');
      await page.getByRole('link').first().focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await position.innerText(), '4 / 5', 'Arrow outside region does not advance');
      const metrics = await region.evaluate(el => ({
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        animationCount: el.getAnimations({ subtree: true }).length,
        buttonTransition: getComputedStyle(el.querySelector('button')).transitionDuration,
        buttonTransitionProperty: getComputedStyle(el.querySelector('button')).transitionProperty,
        steps: [...el.querySelectorAll('ol > li')].map(li => li.textContent.trim()),
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
      }));
      assert.equal(metrics.steps.length, 5);
      assert.equal(metrics.documentWidth, viewport.width, 'No horizontal document overflow');
      assert.equal(metrics.animationCount, 0);
      assert(metrics.buttonTransitionProperty === 'none' || metrics.buttonTransition === '0s');
      assert.deepEqual(errors, []);
      evidence.cases.push({ locale, viewport, mode: 'interactive', status: 'passed', initialRequests, deferredFramesVerified: ['inventory-call.webp', 'review-estimate.webp', 'carrier-paperwork.webp'], sharedAssetNote: 'packing-detail is also used in the homepage service section; sequence itself mounts only one image.', noAutoplayWaitMs: 1400, initialBox, finalBox, metrics, heroLoading, errors });
      await context.close();
    }
  }
  for (const locale of ['en', 'es']) {
    const context = await contextFor({ width: 390, height: 844 }, { javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`${origin}${locale === 'es' ? '/es' : '/'}`, { waitUntil: 'networkidle', timeout: 120000 });
    const region = page.getByTestId('moving-process');
    await region.scrollIntoViewIfNeeded();
    await imageReady(region);
    assert.equal(await region.locator('ol > li').count(), 5);
    assert.equal(await page.getByTestId('process-position').innerText(), '1 / 5');
    const text = await region.locator('ol').innerText();
    await screenshot(region, `${locale}-390-nojs.png`);
    evidence.cases.push({ locale, viewport: { width: 390, height: 844 }, mode: 'javascript-disabled', status: 'passed', visibleSteps: 5, text });
    await context.close();
  }
  for (const locale of ['en', 'es']) {
    const context = await contextFor({ width: 390, height: 844 }, { failProcessImage: true });
    const page = await context.newPage();
    await page.goto(`${origin}${locale === 'es' ? '/es' : '/'}`, { waitUntil: 'networkidle', timeout: 120000 });
    const region = page.getByTestId('moving-process');
    await region.scrollIntoViewIfNeeded();
    await region.getByText(locale === 'es' ? 'La imagen no está disponible' : 'Image unavailable', { exact: true }).waitFor();
    assert.equal(await region.locator('ol > li').count(), 5);
    await screenshot(region, `${locale}-390-image-fallback.png`);
    evidence.cases.push({ locale, viewport: { width: 390, height: 844 }, mode: 'image-request-aborted', status: 'passed', fallback: await region.getByRole('status').innerText(), visibleSteps: 5 });
    await context.close();
  }
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await contextFor(viewport, { javaScriptEnabled: false });
    const page = await context.newPage();
    const response = await page.goto(`${origin}/__missing-process-qa`, { waitUntil: 'networkidle', timeout: 120000 });
    assert.equal(response.status(), 404);
    assert(await page.getByRole('heading', { name: 'This page could not be found.', exact: true }).isVisible());
    assert(await page.getByRole('heading', { name: 'No encontramos esta página.', exact: true }).isVisible());
    assert.equal(await page.getByRole('link', { name: 'Return home', exact: true }).getAttribute('href'), '/');
    assert.equal(await page.getByRole('link', { name: 'Volver al inicio', exact: true }).getAttribute('href'), '/es');
    const meta = await page.locator('meta[name="robots"]').first().getAttribute('content');
    assert(meta.includes('noindex'));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), viewport.width);
    await page.screenshot({ path: fileURLToPath(new URL(`global-404-${viewport.width}.png`, output)), fullPage: true });
    evidence.cases.push({ mode: 'global-404-javascript-disabled', viewport, status: 'passed', httpStatus: response.status(), robots: meta, languages: ['en', 'es'], recoveryPaths: ['/', '/es'] });
    await context.close();
  }
} catch (error) {
  evidence.failure = { message: error.message, stack: error.stack };
  process.exitCode = 1;
} finally {
  await writeFile(new URL('process-checks.json', output), JSON.stringify(evidence, null, 2) + '\n');
  await browser.close();
  console.log(JSON.stringify({ completedCases: evidence.cases.length, failure: evidence.failure?.message ?? null }, null, 2));
}
