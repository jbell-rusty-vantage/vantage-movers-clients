// Local browser contracts only: synthetic coordinates, mocked provider seam, no quotes.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { assertPreviewSite } from '../session-8/preview-qualification.mjs';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const deployed = Boolean(process.env.SITE_PREVIEW_URL);
const origin = deployed ? assertPreviewSite(process.env.SITE_PREVIEW_URL) : 'http://localhost:3001';
if (deployed) assert(/^[a-f0-9]{40}$/.test(process.env.SITE_PREVIEW_SOURCE_SHA || ''), 'Deployed source identity required');
const output = new URL(deployed ? '../session-8/evidence/pickup-location/' : './evidence/pickup-location/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const report = { checkedAt: new Date().toISOString(), source: process.env.SITE_PREVIEW_SOURCE_SHA, origin, scope: `${deployed ? 'Deployed preview' : 'Local uncommitted implementation'}, mocked browser location and provider seam, zero quote submissions. Not live geocoding qualification.`, cases: [] };
try {
  for (const locale of ['en', 'es']) {
    for (const mode of ['success', 'denied', 'unavailable', 'editing-pending']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await context.addInitScript(({ mode }) => {
        window.__locationCalls = 0;
        Object.defineProperty(navigator, 'geolocation', { value: { getCurrentPosition(success, failure) {
          window.__locationCalls++;
          setTimeout(() => mode === 'denied' ? failure({ code: 1 }) : success({ coords: { latitude: 43.074712345, longitude: -89.384212345, accuracy: 30 } }), mode === 'editing-pending' ? 800 : 10);
        } } });
      }, { mode });
      let calls = 0;
      await context.route('**/*', async route => {
        const request = route.request(), url = new URL(request.url());
        if (url.pathname === '/api/places/pickup-location') {
          calls++;
          assert.equal(request.method(), 'POST'); assert.equal(url.search, '');
          assert.deepEqual(request.postDataJSON(), { latitude: 43.075, longitude: -89.384, locale });
          return route.fulfill({ status: mode === 'unavailable' ? 503 : 200, json: { suggestion: { postalCode: '53703', city: 'Madison', state: 'WI', country: 'US' } } });
        }
        if (url.pathname.startsWith('/api/places/')) return route.fulfill({ json: { suggestions: [] } });
        if (!['GET', 'HEAD'].includes(request.method()) || url.pathname.startsWith('/_vercel/')) return route.abort();
        const headers = { ...request.headers() };
        if (deployed && url.origin === origin && process.env.SITE_PREVIEW_BYPASS) headers['x-vercel-protection-bypass'] = process.env.SITE_PREVIEW_BYPASS;
        return route.continue({ headers });
      });
      const page = await context.newPage();
      const response = await page.goto(`${origin}${locale === 'es' ? '/es/servicios/mudanzas-larga-distancia' : '/services/long-distance-moving'}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      if (deployed) assert.match(response.headers()['x-robots-tag'], /noindex/);
      assert.match(response.headers()['permissions-policy'], /geolocation=\(self\)/);
      assert.equal(await page.evaluate(() => window.__locationCalls), 0);
      const pickup = page.getByLabel(locale === 'es' ? 'Origen (código postal)' : 'Moving From (ZIP)', { exact: true });
      const button = page.getByRole('button', { name: locale === 'es' ? 'Sugerir mi código postal de origen' : 'Suggest my pickup ZIP', exact: true });
      await button.click();
      if (mode === 'editing-pending') {
        await pickup.fill('33426'); await page.waitForTimeout(1000);
        assert.equal(calls, 0); assert.equal(await pickup.inputValue(), '33426');
      } else if (mode === 'success') {
        const confirm = page.getByRole('button', { name: locale === 'es' ? 'Usar este código postal de origen' : 'Use this pickup ZIP', exact: true });
        await confirm.waitFor(); assert.equal(await pickup.inputValue(), '');
        await page.screenshot({ path: fileURLToPath(new URL(`${locale}-confirm.png`, output)), fullPage: false });
        await confirm.click(); assert.equal(await pickup.inputValue(), '53703');
        assert.equal(await pickup.evaluate(el => el === document.activeElement), true);
        await pickup.fill('33426'); assert.equal(await pickup.inputValue(), '33426');
      } else {
        await page.getByText(locale === 'es' ? 'La ubicación no está disponible. Escriba su código postal de origen arriba.' : 'Location is unavailable. Enter your pickup ZIP above.', { exact: true }).waitFor();
        await pickup.fill('33426'); assert.equal(await pickup.inputValue(), '33426');
        assert.equal(calls, mode === 'denied' ? 0 : 1);
      }
      const saved = await page.evaluate(() => JSON.stringify(sessionStorage));
      assert(!/43\.075|-89\.384|latitude|longitude/.test(saved));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 390);
      report.cases.push({ locale, mode, passed: true, locationRequests: calls });
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(new URL('results.json', output), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report));
