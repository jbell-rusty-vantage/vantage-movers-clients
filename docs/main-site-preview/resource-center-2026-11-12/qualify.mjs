import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = new URL(process.env.REVIEW_URL || 'http://localhost:3001');
const output = new URL(process.env.REVIEW_OUTPUT || './evidence/local/', import.meta.url);
await mkdir(output, { recursive: true });
let token;
if (!['localhost', '127.0.0.1'].includes(base.hostname)) {
  if (!base.hostname.endsWith('.vercel.app')) throw new Error('Preview origins only');
  const result = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8', timeout: 45000 });
  token = Object.keys(JSON.parse(result.stdout).protectionBypass)[0];
  if (!token) throw new Error('Preview bypass unavailable');
}
const report = { source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), base: base.origin, capturedAt: new Date().toISOString(), scope: 'Read-only Chromium viewport qualification; no Lead submissions or real phone calls. Local runs may include uncommitted changes. Viewport checks do not prove actual browser zoom.', checks: [], failures: [] };
function check(ok, name, details = {}) { report.checks.push({ ok, name, ...details }); if (!ok) report.failures.push({ name, ...details }); }
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
await context.route('**/*', route => {
  const req = route.request(); const url = new URL(req.url());
  if (!['GET', 'HEAD'].includes(req.method()) || url.origin !== base.origin || /_vercel\/(insights|speed-insights)/.test(url.pathname)) return route.abort();
  return token ? route.continue({ headers: { ...req.headers(), 'x-vercel-protection-bypass': token } }) : route.continue();
});
const page = await context.newPage();
page.setDefaultTimeout(20000);
page.on('pageerror', error => report.failures.push({ name: 'Browser exception', message: error.message }));
async function go(path) {
  const response = await page.goto(new URL(path, base).href);
  await page.locator('main').waitFor(); await page.evaluate(() => document.fonts.ready);
  check(response.status() === 200, 'Route renders', { path });
}
async function layout(path, width) {
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow', { path, width });
  check(await page.locator('h1').count() === 1, 'One primary heading', { path, width });
}
async function screenshot(name, fullPage = false) { await page.screenshot({ path: fileURLToPath(new URL(`${name}.jpg`, output)), fullPage, quality: 82 }); }
try {
  for (const locale of ['en', 'es']) {
    const es = locale === 'es'; const home = es ? '/es' : '/'; const resources = es ? '/es/recursos' : '/resources';
    await page.setViewportSize({ width: 1440, height: 1050 }); await go(home);
    const services = await page.locator(`footer.bg-cream:visible nav[aria-label="${es ? 'Servicios' : 'Services'}"] a`).evaluateAll(els => els.map(e => e.getAttribute('href')));
    const trigger = page.getByRole('button', { name: es ? 'Recursos' : 'Resources', exact: true });
    await trigger.hover(); const menu = page.getByRole('navigation', { name: es ? 'Recursos para mudanzas' : 'Moving resources', exact: true });
    check(await menu.isVisible(), 'Resource hover cards open', { locale });
    check(await menu.locator('a[href*="#"]').count() === 4, 'Four resource types in flyout', { locale });
    await menu.locator('a').nth(2).hover(); await page.waitForTimeout(250); check(await menu.isVisible(), 'Pointer crosses flyout without closing', { locale });
    await screenshot(`${locale}-navigation`); await page.keyboard.press('Escape');
    check(await trigger.evaluate(e => e === document.activeElement), 'Escape restores resource trigger focus', { locale });
    await page.keyboard.press('Enter'); check(await menu.isVisible(), 'Keyboard opens resource flyout', { locale }); await page.keyboard.press('Escape');
    const serviceTrigger = page.getByRole('button', { name: es ? 'Servicios' : 'Services', exact: true });
    await serviceTrigger.hover();
    const serviceMenu = page.getByRole('navigation', { name: es ? 'Servicios de mudanza' : 'Moving services', exact: true });
    check(await serviceMenu.isVisible() && await serviceMenu.locator('a').count() === 9, 'Eight service cards and directory link retained', { locale });
    await page.keyboard.press('Escape');
    check(await page.locator(`a[href="${home}#faq"]`).count() > 0 && await page.locator('#faq').count() === 1, 'FAQ navigation has localized target', { locale });
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width < 800 ? 844 : 1050 });
      for (const path of [home, ...services]) {
        await go(path); await layout(path, width);
        const hero = page.locator('main > section').first();
        check(await hero.locator('[data-hero-facts] > div').count() === 4, 'Shared four-part hero proof row', { path, width });
        const proof = await hero.innerText();
        check(proof.includes('50,000') && proof.includes('4.48/5') && proof.includes('423'), 'Owner count and dated BBB snapshot in hero', { path, width });
        check(await hero.locator('form').count() === 1, 'One quote form inside hero', { path, width });
        if (path !== home) check(await page.locator('main form').count() === 1, 'No duplicate service wizard', { path, width });
        const boxes = await hero.evaluate(e => { const form = e.querySelector('form').getBoundingClientRect(); const title = e.querySelector('h1').getBoundingClientRect(); return { formLeft: form.left, formTop: form.top, titleRight: title.right, titleBottom: title.bottom }; });
        check(width >= 1024 ? boxes.formLeft > boxes.titleRight : boxes.formTop > boxes.titleBottom, 'Quote and copy do not overlap', { path, width });
        check(await hero.locator('img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0)), 'Hero media loads', { path, width });
        if ((width === 1440 || width === 390) && (!es || path === services[0])) await screenshot(`${locale}-${path === home ? 'home' : path.split('/').at(-1)}-${width}`);
      }
    }
    await page.setViewportSize({ width: 1440, height: 1050 }); await go(resources);
    const articles = await page.locator('#articles a').evaluateAll(els => els.map(e => e.getAttribute('href')));
    check(articles.length === 6, 'Six article cards with posters', { locale });
    check(await page.locator('#articles time').count() === 6, 'Article date metadata', { locale });
    check(await page.locator('#moving-authorities a').count() === 3, 'Prioritized official authority directory', { locale });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width < 800 ? 844 : 1050 });
      await go(resources); await layout(resources, width); await screenshot(`${locale}-resources-${width}`, true);
      for (const path of articles) {
        await go(path); await layout(path, width);
        check(await page.locator('main time').count() >= 1, 'Article date rendered', { path, width });
        check(await page.getByRole('navigation', { name: es ? 'En esta guía' : 'In this guide', exact: true }).count() === 1, 'Article contents navigation', { path, width });
        if (path === articles[0] && width !== 320) await screenshot(`${locale}-article-${width}`, true);
      }
    }
    await go(services[0]);
    check(await page.locator('[data-floating-call]').count() === 0, 'Call control absent at page top', { locale });
    await page.evaluate(() => scrollTo(0, 650)); await page.waitForTimeout(200);
    check(await page.locator('[data-floating-call]').isVisible(), 'Call control appears after scroll', { locale });
    check((await page.locator('[data-floating-call] a').getAttribute('href')).startsWith('tel:'), 'Call control is a telephone link only', { locale });
    await page.emulateMedia({ media: 'print' });
    check(await page.locator('[data-floating-call]').isHidden(), 'Call control excluded from printable resources', { locale });
    await page.emulateMedia({ media: 'screen' });
    await page.locator('form input:visible').first().focus(); await page.waitForTimeout(100);
    check(await page.locator('[data-floating-call]').count() === 0, 'Call control hides for form editing', { locale });
    await page.locator('h1').click(); await page.evaluate(() => scrollTo(0, 700)); await page.waitForTimeout(200);
    await page.locator('[data-floating-call] button').click();
    check(await page.locator('[data-floating-call]').count() === 0, 'Call control can be dismissed', { locale });
    await page.getByRole('button', { name: es ? 'Menú' : 'Menu', exact: true }).click();
    const mobile = page.getByRole('navigation', { name: es ? 'Navegación móvil' : 'Mobile navigation', exact: true });
    check(await mobile.locator('a[href*="#articles"]').count() === 1, 'Mobile resource type navigation', { locale });
    await screenshot(`${locale}-mobile-navigation`);
  }
} finally {
  await browser.close(); await writeFile(new URL('report.json', output), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ checks: report.checks.length, failures: report.failures, base: base.origin }));
if (report.failures.length) process.exitCode = 1;
