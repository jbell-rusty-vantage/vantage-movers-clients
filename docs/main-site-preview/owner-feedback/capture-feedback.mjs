import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = new URL(process.env.FEEDBACK_URL || 'http://localhost:3001');
const output = new URL(process.env.FEEDBACK_OUTPUT || './evidence/', import.meta.url);
await mkdir(output, { recursive: true });
const report = { source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), capturedAt: new Date().toISOString(), base: base.origin, note: 'Read-only Chromium viewport emulation. No quote submitted; telemetry blocked. Local capture may include uncommitted changes.', checks: [], failures: [] };
function check(ok, name, details = {}) { report.checks.push({ name, ok, ...details }); if (!ok) report.failures.push({ name, ...details }); }
let token;
if (!['localhost', '127.0.0.1'].includes(base.hostname)) {
  if (!base.hostname.endsWith('.vercel.app')) throw new Error('Only local or Vercel preview origins allowed');
  const { spawnSync } = await import('node:child_process');
  const result = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8', timeout: 45000 });
  token = Object.keys(JSON.parse(result.stdout).protectionBypass)[0];
  if (!token) throw new Error('Preview protection token unavailable');
}
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
await context.route('**/*', route => {
  const req = route.request();
  if (!['GET', 'HEAD'].includes(req.method()) || /_vercel\/(insights|speed-insights)/.test(req.url())) return route.abort();
  if (token && new URL(req.url()).origin === base.origin) return route.continue({ headers: { ...req.headers(), 'x-vercel-protection-bypass': token } });
  return route.continue();
});
const page = await context.newPage();
page.on('pageerror', e => report.failures.push({ name: 'Browser exception', error: e.message }));
const internal = new Set();
async function go(path) {
  const response = await page.goto(new URL(path, base).href);
  await page.locator('footer.bg-cream:visible').waitFor();
  await page.evaluate(() => document.fonts.ready);
  check(response.status() === 200, 'Route renders', { path, status: response.status() });
}
async function shot(name, locator) {
  await page.mouse.move(4, 800);
  await page.waitForTimeout(250);
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate(e => window.scrollBy(0, e.getBoundingClientRect().top - 115));
  await page.waitForTimeout(250);
  await locator.screenshot({ path: new URL(`${name}.png`, output).pathname.replace(/^\/([A-Za-z]:)/, '$1') });
}
for (const locale of ['en', 'es']) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await go(locale === 'en' ? '/' : '/es');
  const services = await page.locator(`footer.bg-cream:visible nav[aria-label="${locale === 'en' ? 'Services' : 'Servicios'}"] a`).evaluateAll(els => els.map(e => e.getAttribute('href')));
  check(services.length === 8, 'Eight service links', { locale });
  for (const href of await page.locator('footer.bg-cream:visible a').evaluateAll(els => els.map(e => e.getAttribute('href')))) if (href.startsWith('/')) internal.add(href);
  const trigger = page.getByRole('button', { name: locale === 'en' ? 'Services' : 'Servicios', exact: true });
  await trigger.hover();
  const menu = page.getByRole('navigation', { name: locale === 'en' ? 'Moving services' : 'Servicios de mudanza', exact: true });
  check(await menu.isVisible(), 'Hover opens service cards', { locale });
  await menu.getByRole('link').nth(2).hover();
  await page.waitForTimeout(250);
  check(await menu.isVisible(), 'Menu stays open crossing header gap', { locale });
  if (locale === 'en') await page.screenshot({ path: new URL('navigation-desktop.png', output).pathname.replace(/^\/([A-Za-z]:)/, '$1') });
  await page.keyboard.press('Escape');
  await page.mouse.move(4, 800);
  check(await trigger.evaluate(e => e === document.activeElement), 'Escape returns focus', { locale });
  await page.keyboard.press('Enter');
  check(await menu.isVisible(), 'Keyboard opens service cards', { locale });
  await page.keyboard.press('Escape');
  if (locale === 'en') {
    await shot('trust-desktop', page.locator('main > section').filter({ hasText: 'You may have found us here.' }));
    await shot('military-desktop', page.locator('#military-appreciation'));
    await shot('footer-desktop', page.locator('footer.bg-cream:visible'));
  }
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const path of services) {
      await go(path);
      const hero = page.locator('main > section').first();
      const img = hero.locator('img');
      await img.evaluate(async e => { if (!e.complete) await new Promise(resolve => { e.onload = resolve; e.onerror = resolve; }); });
      check(await img.evaluate(e => e.naturalWidth > 0 && getComputedStyle(e).opacity === '1'), 'Hero image visible without blue overlay', { path, width });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow', { path, width });
      if (path === services[0] && width !== 320) await shot(`service-${locale}-${width}`, hero);
    }
    if (width === 390) {
      await page.getByRole('button', { name: locale === 'en' ? 'Menu' : 'Menú', exact: true }).click();
      const mobileMenu = page.getByRole('navigation', { name: locale === 'en' ? 'Mobile navigation' : 'Navegación móvil' });
      check(await mobileMenu.isVisible(), 'Mobile menu opens on tap', { locale });
      await mobileMenu.locator('a').last().click();
      check(await mobileMenu.count() === 0, 'Mobile link closes menu', { locale });
      await shot(`footer-${locale}-390`, page.locator('footer.bg-cream:visible'));
    }
  }
}
for (const href of internal) {
  const url = new URL(href, base);
  // Existing PDF redirects use the browser download path; source configuration owns those targets.
  if (['/your-rights', '/ready-to-move'].includes(url.pathname)) continue;
  await go(url.pathname);
  if (url.hash) check(await page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).count() > 0, 'Footer fragment exists', { href });
}
await writeFile(new URL('results.json', output), JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify({ checks: report.checks.length, failures: report.failures }));
if (report.failures.length) process.exitCode = 1;

