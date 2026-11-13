import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = process.env.REVIEW_URL || 'http://localhost:3001';
const output = new URL(process.env.REVIEW_OUTPUT || './evidence/local/', import.meta.url);
await mkdir(output, { recursive: true });
let token;
if (!base.includes('localhost')) {
  if (!new URL(base).hostname.endsWith('.vercel.app')) throw new Error('Preview only');
  const result = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8', timeout: 45000 });
  token = Object.keys(JSON.parse(result.stdout).protectionBypass)[0];
  if (!token) throw new Error('Preview bypass unavailable');
}
const report = { base, checks: [], errors: [] };
function check(ok, name, details = {}) { report.checks.push({ ok, name, ...details }); }
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
await context.route('**/*', route => {
  const req = route.request();
  const url = new URL(req.url());
  if (!['GET', 'HEAD'].includes(req.method()) || url.origin !== new URL(base).origin || url.pathname.includes('_vercel/')) return route.abort();
  return token ? route.continue({ headers: { ...req.headers(), 'x-vercel-protection-bypass': token } }) : route.continue();
});
const page = await context.newPage();
page.on('pageerror', error => report.errors.push(error.message));
async function go(path) {
  const response = await page.goto(base + path);
  await page.locator('main').waitFor();
  await page.evaluate(() => document.fonts.ready);
  check(response.status() === 200, 'HTTP 200', { path });
}
try {
  for (const locale of ['en', 'es']) {
    const es = locale === 'es'; const home = es ? '/es' : '/'; const locations = es ? '/es/destinos' : '/locations';
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await go(home);
      const process = page.getByTestId('moving-process');
      await process.scrollIntoViewIfNeeded();
      const heights = [];
      for (let i = 0; i < 5; i++) {
        await process.locator('ol button').nth(i).click();
        const slot = process.getByTestId('process-image-slot');
        const size = await slot.boundingBox();
        const figure = await process.locator('figure').boundingBox();
        heights.push(figure.height);
        check(Math.abs(size.width / size.height - 1.6) < .01, 'Consistent landscape image frame', { locale, width, step: i + 1 });
        check(await slot.locator('img').evaluate(async img => { await img.decode().catch(() => {}); return img.naturalWidth > 0; }), 'Step image loads', { locale, width, step: i + 1 });
        if ((width === 1440 || width === 390) && i < 2) await process.screenshot({ path: fileURLToPath(new URL(`${locale}-step-${i + 1}-${width}.png`, output)) });
      }
      check(Math.max(...heights) - Math.min(...heights) < 2, 'Card height remains stable across all steps', { locale, width, heights });
      await go(locations);
      check(await page.locator('#states a[id^="state-"]').count() === 50, '50 state quote cards', { locale, width });
      check(await page.locator('svg a[href^="#state-"]').count() === 50, '50 map targets', { locale, width });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow', { locale, width });
      check(await page.locator('h1').count() === 1, 'One primary heading', { locale, width });
      check(await page.locator('#states a').evaluateAll((links, href) => links.every(link => link.getAttribute('href') === href), `${home}#quote`), 'All state cards lead to localized quote', { locale, width });
      await page.locator('svg a[href="#state-wi"]').focus();
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => location.hash === '#state-wi');
      check(await page.locator('#state-wi').evaluate(el => { const box = el.getBoundingClientRect(); return box.top >= 0 && box.bottom <= innerHeight; }), 'Keyboard map link reaches Wisconsin card', { locale, width });
      if (width === 1440 || width === 390) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: fileURLToPath(new URL(`${locale}-locations-${width}.png`, output)), fullPage: true });
      }
    }
    await go(es ? '/es/servicios/mudanzas-larga-distancia' : '/services/long-distance-moving');
    check(!(await page.locator('#map').innerText()).includes('Wisconsin'), 'Stray Wisconsin promo removed', { locale });
    await page.locator(`#map a[href="${locations}"]`).click();
    await page.waitForURL(base + locations);
    check(true, 'Coverage promo opens locations directory', { locale });
    await page.locator('#state-tx').click();
    await page.waitForURL(base + home + '#quote');
    check(await page.locator('#quote').isVisible(), 'State quote CTA reaches actual quote form', { locale });
  }
} catch (error) { report.errors.push(error.stack); }
finally {
  await browser.close();
  await writeFile(new URL('report.json', output), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ checks: report.checks.length, failed: report.checks.filter(c => !c.ok), errors: report.errors }));
if (report.errors.length || report.checks.some(c => !c.ok)) process.exitCode = 1;
