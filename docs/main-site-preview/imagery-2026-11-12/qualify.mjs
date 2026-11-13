import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = new URL(process.env.REVIEW_URL || 'http://localhost:3001');
const out = new URL(process.env.REVIEW_OUTPUT || './evidence/local/', import.meta.url);
await mkdir(out, { recursive: true });
let token;
if (base.hostname !== 'localhost') {
  if (!base.hostname.endsWith('.vercel.app')) throw Error('Preview only');
  const result = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8' });
  if (result.status !== 0) throw Error('Preview protection lookup failed');
  token = Object.keys(JSON.parse(result.stdout).protectionBypass)[0];
}
const report = { source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), base: base.origin, checks: [], failures: [], images: [] };
function check(ok, name, details = {}) { const result = { ok, name, ...details }; report.checks.push(result); if (!ok) report.failures.push(result); }
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
await context.route('**/*', route => {
  const request = route.request(), url = new URL(request.url());
  if (url.origin !== base.origin || !['GET', 'HEAD'].includes(request.method()) || url.pathname.startsWith('/_vercel/')) return route.abort();
  return token ? route.continue({ headers: { ...request.headers(), 'x-vercel-protection-bypass': token } }) : route.continue();
});
const page = await context.newPage();
page.on('pageerror', error => report.failures.push({ name: 'Browser exception', message: error.message }));
async function go(path) { const response = await page.goto(new URL(path, base).href); await page.locator('main').waitFor(); await page.evaluate(() => document.fonts.ready); check(response.status() === 200, 'Route loads', { path }); return response; }
async function shot(name, locator = page) { await locator.screenshot({ path: fileURLToPath(new URL(name + '.png', out)) }); }
async function inspect(path, width) {
  console.log(`Inspect ${width} ${path}`);
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow', { path, width });
  check(await page.locator('svg.lucide-truck').count() === 0, 'No truck icons', { path, width });
  const images = page.locator('main img:visible');
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    // Responsive srcset can replace an in-flight decode after a viewport change.
    await image.evaluate(async element => {
      for (let attempt = 0; attempt < 4; attempt++) {
        try { await Promise.race([element.decode(), new Promise((_, reject) => setTimeout(() => reject(Error('decode timeout')), 5000))]); return; } catch { await new Promise(resolve => setTimeout(resolve, 250)); }
      }
      throw Error(`Image failed to decode: ${element.currentSrc}`);
    });
  }
  const sources = await images.evaluateAll(elements => elements.map(element => new URL(element.src).searchParams.get('url') || element.getAttribute('src')));
  check(sources.every(src => !/autotransport\.jpg|long_distance_traffic|Truck|hero_image|editorial\/20261112\//i.test(src)), 'No retired truck imagery or cartoon resource posters', { path, width });
  check(await images.evaluateAll(elements => elements.every(element => element.complete && element.naturalWidth > 0)), 'All images decode', { path, width });
  report.images.push(...sources);
}
try {
  for (const locale of ['en', 'es']) {
    const es = locale === 'es', home = es ? '/es' : '/', archive = es ? '/es/recursos' : '/resources';
    await page.setViewportSize({ width: 1440, height: 1100 });
    await go(home);
    const services = await page.locator(`footer.bg-cream:visible nav[aria-label="${es ? 'Servicios' : 'Services'}"] a`).evaluateAll(elements => elements.map(element => element.getAttribute('href')));
    check(services.length === 8, 'All eight service routes discovered', { locale });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1100 });
      for (const path of [home, ...services, archive]) {
        await go(path); await inspect(path, width);
        if (path.includes('/services/') || path.includes('/servicios/')) {
          const hero = page.locator('main img').first();
          check((await hero.getAttribute('src')).includes('selected-20261112'), 'Service uses curated library image', { path, width });
          if (width !== 320) { await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await shot(`${locale}-${path.split('/').at(-1)}-${width}`); }
        }
        if (path === archive) {
          const posters = await page.locator('#articles img').evaluateAll(elements => elements.map(element => new URL(element.src).searchParams.get('url')));
          check(posters.length === 6 && new Set(posters).size === 6 && posters.every(src => src.includes('/photography-20261112/')), 'Six distinct photographic previews', { locale, width });
          if (width !== 320) await shot(`${locale}-resources-${width}`, page.locator('#articles'));
        }
        if (path === home) {
          const process = page.getByTestId('moving-process');
          const image = process.locator('img');
          check((await image.evaluate(element => element.currentSrc)).endsWith(`quote-request-${locale}${width < 640 ? '-mobile' : ''}.webp`), 'Localized complete quote screenshot with responsive composition', { locale, width });
          check(await image.evaluate(element => Math.abs(element.clientWidth / element.clientHeight - element.naturalWidth / element.naturalHeight) < .01 && getComputedStyle(element).objectFit === 'contain'), 'Form displayed at uncropped native aspect ratio', { locale, width });
          if (width !== 320) {
            const figure = process.locator('figure');
            await figure.evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - 180, behavior: 'instant' }));
            await shot(`${locale}-process-${width}`, figure);
          }
          for (let step = 2; step <= 5; step++) { await process.getByRole('button', { name: es ? 'Paso siguiente' : 'Next step', exact: true }).click(); await image.evaluate(element => element.decode()); check((await process.getByTestId('process-position').textContent()).trim() === `${step} / 5`, 'Process advances with loaded image', { locale, width, step }); }
          for (let step = 4; step >= 1; step--) await process.getByRole('button', { name: es ? 'Paso anterior' : 'Previous step', exact: true }).click();
          check((await image.getAttribute('src')).endsWith(`quote-request-${locale}.webp`), 'Process returns to full form', { locale, width });
          if (width !== 320) { await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await shot(`${locale}-home-${width}`); }
        }
      }
    }
  }
} finally {
  report.images = [...new Set(report.images)];
  await browser.close();
  await writeFile(new URL('report.json', out), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ checks: report.checks.length, failures: report.failures }));
if (report.failures.length) process.exitCode = 1;
