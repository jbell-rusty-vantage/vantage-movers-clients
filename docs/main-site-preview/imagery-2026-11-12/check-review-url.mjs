import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = 'https://vantage-main-site-optimization.vercel.app';
const result = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8' });
if (result.status !== 0) throw Error('Protection lookup failed');
const token = Object.keys(JSON.parse(result.stdout).protectionBypass)[0];
const out = new URL('./evidence/stable/', import.meta.url);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
await context.route('**/*', route => {
  const request = route.request(), url = new URL(request.url());
  return url.origin === base && ['GET', 'HEAD'].includes(request.method()) && !url.pathname.startsWith('/_vercel/')
    ? route.continue({ headers: { ...request.headers(), 'x-vercel-protection-bypass': token } }) : route.abort();
});
const page = await context.newPage();
const report = { base, checks: [], failures: [] };
const check = (ok, name, path) => { const item = { ok, name, path }; report.checks.push(item); if (!ok) report.failures.push(item); };
page.on('pageerror', error => report.failures.push({ name: 'Browser exception', message: error.message }));
try {
  for (const [path, locale] of [['/', 'en'], ['/es', 'es'], ['/resources', 'en'], ['/es/recursos', 'es'], ['/services/auto-transport', 'en'], ['/es/servicios/transporte-de-autos', 'es']]) {
    await page.setViewportSize({ width: 1440, height: 1600 });
    const response = await page.goto(base + path);
    await page.locator('main').waitFor();
    check(response.status() === 200, 'Review route responds', path);
    check(response.headers()['x-robots-tag']?.includes('noindex'), 'Preview stays noindex', path);
    if (path === '/' || path === '/es') {
      await page.setViewportSize({ width: 390, height: 1200 });
      const figure = page.getByTestId('moving-process').locator('figure');
      await figure.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 180, behavior: 'instant' }));
      const image = figure.locator('img');
      await image.evaluate(element => element.decode());
      check((await image.evaluate(element => element.currentSrc)).endsWith(`quote-request-${locale}-mobile.webp`), 'Readable phone form capture', path);
      await figure.screenshot({ path: fileURLToPath(new URL(`${locale}-process-phone.png`, out)) });
    } else if (path.endsWith('resources') || path.endsWith('recursos')) {
      const images = page.locator('#articles img');
      for (const image of await images.elementHandles()) { await image.scrollIntoViewIfNeeded(); await image.evaluate(element => element.decode()); }
      check(await images.evaluateAll(elements => elements.length === 6 && elements.every(element => element.complete && element.naturalWidth > 0 && element.src.includes('photography-20261112'))), 'Six photographic resource previews', path);
      await page.locator('#articles').evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 180, behavior: 'instant' }));
      await page.locator('#articles').screenshot({ path: fileURLToPath(new URL(`${locale}-resources.png`, out)) });
    } else {
      check((await page.locator('main img').first().getAttribute('src')).includes('auto-arrival.webp'), 'Passenger car hero', path);
      await page.setViewportSize({ width: 390, height: 1000 });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: fileURLToPath(new URL(`${locale}-auto-phone.png`, out)) });
    }
  }
} finally { await browser.close(); await writeFile(new URL('report.json', out), JSON.stringify(report, null, 2)); }
console.log(JSON.stringify({ checks: report.checks.length, failures: report.failures }));
if (report.failures.length) process.exitCode = 1;
