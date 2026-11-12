import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const require = createRequire(new URL('../../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const origin = 'http://localhost:3001';
const output = new URL('./evidence/', import.meta.url);
await mkdir(output, { recursive: true });
const proposal = await readFile(new URL('../../../../apps/main-site/public/images/preview/astra-review/hero-phone-v1-720.webp', import.meta.url));
const browser = await chromium.launch({ headless: true });
const results = { capturedAt: new Date().toISOString(), baseSha: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), sourceState: 'Uncommitted local working tree, including optional geolocation UI. Not deployed 10ec4d2. HEAD is base only.', method: '390x844 Chromium, DPR1, reduced motion, no throttling. Only current home-inventory image response is substituted; no application edit. Non-GET/HEAD and telemetry blocked. No quote submitted. Hero screenshots hide header/skip-link/dev portal without layout changes.', cases: [] };
try {
 for (const locale of ['en', 'es']) for (const variant of ['current', 'proposal']) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const intercepted = []; const blocked = []; const errors = [];
  await context.route('**/*', route => {
   const req = route.request(); const url = new URL(req.url());
   if (!['GET', 'HEAD'].includes(req.method()) || /\/_vercel\/|vercel-insights|vitals\.vercel/.test(req.url())) { blocked.push({ method: req.method(), path: url.pathname }); return route.abort(); }
   const asset = url.searchParams.get('url') || url.pathname;
   if (variant === 'proposal' && url.origin === origin && asset === '/images/preview/home-inventory.webp') { intercepted.push(url.pathname + url.search); return route.fulfill({ status: 200, contentType: 'image/webp', body: proposal }); }
   return route.continue();
  });
  const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
  const response = await page.goto(origin + (locale === 'es' ? '/es' : '/'), { waitUntil: 'networkidle', timeout: 120000 });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  const hero = page.locator('#top');
  const dimensions = await hero.locator('img').first().evaluate(img => { if (!img.complete || !img.naturalWidth) throw new Error('Hero unavailable'); return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, objectFit: getComputedStyle(img).objectFit, objectPosition: getComputedStyle(img).objectPosition }; });
  assert(Math.abs(dimensions.naturalHeight / dimensions.naturalWidth - (variant === 'proposal' ? 1.5 : 2 / 3)) < 0.01, 'Expected source ratio, allowing responsive density rounding');
  await hero.screenshot({ path: fileURLToPath(new URL(`${locale}-${variant}-hero.png`, output)), animations: 'disabled', style: 'header, .skip-link, nextjs-portal { visibility: hidden !important; }' });
  await page.screenshot({ path: fileURLToPath(new URL(`${locale}-${variant}-viewport.png`, output)), animations: 'disabled' });
  results.cases.push({ locale, variant, dimensions, heroBox: await hero.boundingBox(), intercepted, blocked, errors, horizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) });
  await context.close();
 }
} finally { await browser.close(); await writeFile(new URL('comparison.json', output), JSON.stringify(results, null, 2) + '\n'); }
console.log(JSON.stringify(results, null, 2));
