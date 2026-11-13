import { createRequire } from 'node:module';
import { spawnSync, execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = new URL(process.env.FEEDBACK_URL || 'http://localhost:3001');
if (!['localhost', '127.0.0.1'].includes(base.hostname) && !/^vantage-movers-clients-main-site-[a-z0-9]+-vantage-4d3db9ef\.vercel\.app$/.test(base.hostname)) throw new Error('Use local or immutable Main Site preview');
const output = new URL('./evidence/resources/', import.meta.url);
await mkdir(output, { recursive: true });
let token;
if (base.protocol === 'https:') {
  const result = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8', timeout: 45000 });
  token = Object.keys(JSON.parse(result.stdout).protectionBypass)[0];
}
const report = { source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), capturedAt: new Date().toISOString(), base: base.origin, checks: [], failures: [], zoom: 'Viewport emulation only; actual browser zoom is separately unverified.' };
function check(ok, name, detail) { report.checks.push({ ok, name, detail }); if (!ok) report.failures.push({ name, detail }); }
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  await context.route('**/*', route => {
    const req = route.request();
    if (!['GET', 'HEAD'].includes(req.method()) || new URL(req.url()).origin !== base.origin || /_vercel\/(insights|speed-insights)/.test(req.url())) return route.abort();
    return route.continue({ headers: { ...req.headers(), ...(token ? { 'x-vercel-protection-bypass': token } : {}) } });
  });
  const page = await context.newPage();
  page.on('pageerror', error => report.failures.push({ name: 'pageerror', detail: error.name }));
  for (const locale of ['en', 'es']) {
    const archive = locale === 'en' ? '/resources' : '/es/recursos';
    await page.goto(new URL(archive, base).href);
    await page.locator('footer.bg-cream').waitFor();
    const paths = await page.locator('main a').evaluateAll(els => [...new Set(els.map(e => e.getAttribute('href')).filter(href => href?.startsWith('/resources/') || href?.startsWith('/es/recursos/')))]);
    check(paths.length === 6, 'Six resource destinations', { locale, paths });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const path of paths) {
        const response = await page.goto(new URL(path, base).href);
        await page.locator('footer.bg-cream').waitFor();
        check(response.status() === 200, 'Resource renders', { path, width });
        check(await page.locator('main h1').count() === 1, 'One resource heading', { path, width });
        check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow', { path, width });
        check(await page.locator('a[href*="#quote"]').count() > 0, 'Resource has quote return', { path, width });
        if (path.endsWith('moving-cost-guide') || path.endsWith('costos-de-mudanza')) await page.screenshot({ path: fileURLToPath(new URL(`resource-${locale}-${width}.png`, output)) });
      }
    }
  }
  for (const path of ['military-moving', 'senior-moving', 'storage-options']) {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(new URL(`/services/${path}`, base).href);
      const picture = page.locator('main img').first();
      await picture.scrollIntoViewIfNeeded();
      await picture.evaluate(async img => { if (!img.complete) await new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }); });
      check(await picture.evaluate(img => img.naturalWidth > 0), 'Service image loaded', { path, width });
      check(await picture.evaluate(img => getComputedStyle(img).objectFit === 'contain'), 'Service image preserves full frame', { path, width });
      await page.screenshot({ path: fileURLToPath(new URL(`${path}-${width}.png`, output)) });
    }
  }
} finally {
  await browser.close();
  await writeFile(new URL('results.json', output), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ checks: report.checks.length, failures: report.failures }));
if (report.failures.length) process.exitCode = 1;
