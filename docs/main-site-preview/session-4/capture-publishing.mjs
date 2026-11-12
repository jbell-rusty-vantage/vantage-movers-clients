// From repository root: node docs/main-site-preview/session-4/capture-publishing.mjs
// Read-only local browse QA. No quote is submitted; telemetry and non-GET/HEAD requests are blocked.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = new URL(process.env.PUBLISHING_LOCAL_URL || 'http://localhost:3001');
if (!['localhost', '127.0.0.1'].includes(base.hostname)) throw new Error('This capture is restricted to localhost.');
const output = new URL('./evidence/', import.meta.url);
const session6 = new URL('../session-6/', import.meta.url);
await mkdir(output, { recursive: true });
await mkdir(session6, { recursive: true });

const services = [
  ['long-distance-moving', 'mudanzas-larga-distancia'], ['auto-transport', 'transporte-de-autos'],
  ['military-moving', 'mudanzas-militares'], ['residential-moving', 'mudanzas-residenciales'],
  ['corporate-office-moving', 'mudanzas-de-oficina'], ['packing-services', 'servicios-de-embalaje'],
  ['storage-options', 'opciones-de-almacenamiento'], ['senior-moving', 'mudanzas-para-personas-mayores'],
];
const pairs = [
  ...services.map(([en, es]) => [`/services/${en}`, `/es/servicios/${es}`]),
  ['/resources/before-the-inventory-call', '/es/recursos/preparar-inventario'],
  ['/resources/comparing-moving-estimates', '/es/recursos/comparar-presupuestos'],
  ['/resources/who-handles-my-move', '/es/recursos/quien-organiza-mi-mudanza'],
  ['/locations/wisconsin-movers', '/es/destinos/wisconsin'],
  ['/locations/wisconsin-movers/madison', '/es/destinos/wisconsin/madison'],
  ['/', '/es'], ['/services', '/es/servicios'], ['/resources', '/es/recursos'],
  ['/locations', '/es/destinos'], ['/contact', '/es/contacto'],
];
const legacy = ['/consumer-information', '/carrier-contacts', '/privacy', '/terms', '/sms-privacy', '/sms-terms', '/cancellation', '/accessibility'];
const allPaths = [...pairs.flat(), ...legacy];
const alternate = new Map(pairs.flatMap(([en, es]) => [[en, es], [es, en]]));
const capturePaths = new Map([
  ['/services/long-distance-moving', 'service-en'], ['/es/servicios/mudanzas-larga-distancia', 'service-es'],
  ['/services', 'services-en'], ['/es/servicios', 'services-es'],
  ['/locations', 'locations-en'], ['/es/destinos', 'locations-es'],
  ['/resources', 'resources-en'], ['/es/recursos', 'resources-es'],
  ['/locations/wisconsin-movers/madison', 'madison-en'], ['/es/destinos/wisconsin/madison', 'madison-es'],
  ['/resources/comparing-moving-estimates', 'worksheet-en'], ['/es/recursos/comparar-presupuestos', 'worksheet-es'],
]);
const report = {
  capturedAt: new Date().toISOString(), base: base.origin,
  source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  workingTree: execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim().split('\n'),
  mode: 'Next development server; viewport emulation at scale 1; reduced motion requested',
  boundary: 'Read-only browsing; all non-GET/HEAD and telemetry blocked. No Forms, analytics receipts, deployed protection or performance qualification.',
  routes: [], layouts: [], links: [], keyboard: [], navigation: [], externalOpening: [], print: [], notFound: [], failures: [],
};
const save = () => writeFile(new URL('publishing-results.json', output), JSON.stringify(report, null, 2) + '\n');
function check(condition, message, details) { if (!condition) report.failures.push({ message, ...details }); }
const internalLinks = new Map();
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await context.route('**/*', route => {
    const request = route.request();
    if (!['GET', 'HEAD'].includes(request.method()) || /\/_vercel\/|vercel-insights|vitals\.vercel/.test(request.url())) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  let pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  for (const path of allPaths) {
    pageErrors = [];
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(new URL(path, base).href, { waitUntil: 'networkidle', timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    const facts = await page.evaluate(() => ({
      title: document.title, lang: document.documentElement.lang,
      h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim()),
      canonical: document.querySelector('link[rel=canonical]')?.href,
      alternates: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map(e => ({ lang: e.hreflang, href: e.href })),
      contentId: document.querySelector('[data-content-id]')?.getAttribute('data-content-id'),
      draftNotice: Boolean(document.querySelector('.preview-note')),
      links: [...document.querySelectorAll('a[href]')].map(e => ({ href: e.getAttribute('href'), target: e.target, rel: e.rel, label: e.textContent.trim() })),
      robots: [...document.querySelectorAll('meta[name=robots]')].map(e => e.content),
    }));
    const expectedLang = path.startsWith('/es') ? 'es' : 'en';
    const entry = { path, status: response.status(), ...facts, errors: [...pageErrors] };
    report.routes.push(entry);
    check(entry.status === 200, 'Expected HTTP 200', { path, actual: entry.status });
    check(entry.lang === expectedLang, 'Document language mismatch', { path, actual: entry.lang, expectedLang });
    check(entry.h1.length === 1, 'Expected one h1', { path, h1: entry.h1 });
    check(entry.canonical && new URL(entry.canonical).pathname === path, 'Canonical path mismatch', { path, actual: entry.canonical });
    if (alternate.has(path)) check(entry.alternates.some(a => new URL(a.href).pathname === alternate.get(path)), 'Missing reciprocal language alternate', { path, expected: alternate.get(path), actual: entry.alternates });
    check(!entry.errors.length, 'Uncaught page exception', { path, errors: entry.errors });
    for (const link of entry.links) {
      const url = new URL(link.href, page.url());
      if (url.origin === base.origin) internalLinks.set(url.pathname + url.hash, { path: url.pathname, hash: url.hash, from: path });
      if (/^https?:/.test(url.protocol) && url.origin !== base.origin && link.target === '_blank') check(link.rel.includes('noopener') && link.rel.includes('noreferrer'), 'Unsafe external new-tab link', { path, href: link.href });
      if (facts.contentId && /^https:\/\/(www\.)?(fmcsa\.dot\.gov|wisconsindot\.gov|cityofmadison\.com)/.test(link.href)) check(link.target === '_blank' && /new tab|otra pestaña|nueva pestaña/.test(link.label), 'Source link must announce and open a new tab', { path, href: link.href, label: link.label });
    }
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width > 1000 ? 1000 : 844 });
      await page.evaluate(() => window.scrollTo(0, 0));
      const layout = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth }));
      report.layouts.push({ path, ...layout });
      check(layout.documentWidth <= width, 'Horizontal document overflow', { path, ...layout });
      if (capturePaths.has(path) && width !== 320) {
        const stem = `${capturePaths.get(path)}-${width}`;
        await page.screenshot({ path: fileURLToPath(new URL(`${stem}-viewport.png`, output)), animations: 'disabled' });
        await page.screenshot({ path: fileURLToPath(new URL(`${stem}-full.png`, output)), fullPage: true, animations: 'disabled' });
      }
    }
    await save();
    console.log(`Checked ${path}: ${entry.status}, ${entry.lang}`);
  }

  // Check every unique discovered internal destination, including fragments.
  for (const link of internalLinks.values()) {
    if (link.path.startsWith('/api/')) continue;
    try {
      const response = await context.request.get(new URL(link.path, base).href, { timeout: 60000 });
      const status = response.status();
      let fragment = true;
      if (link.hash && status === 200 && response.headers()['content-type']?.includes('text/html')) {
        const html = await response.text();
        const target = decodeURIComponent(link.hash.slice(1));
        fragment = html.includes(`id="${target}"`) || html.includes(`name="${target}"`);
      }
      report.links.push({ ...link, status, fragment });
      check(status < 400 && fragment, 'Broken internal link or fragment', { ...link, status, fragment });
    } catch (error) {
      report.links.push({ ...link, error: String(error) });
      check(false, 'Internal link request failed', { ...link, error: String(error) });
    }
  }
  for (const path of ['/services/not-a-service', '/es/servicios/no-existe', '/locations/wisconsin-movers/not-a-city', '/resources/not-an-article']) {
    const response = await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' });
    const result = { path, status: response.status(), visible: await page.locator('body').innerText() };
    report.notFound.push(result);
    check(result.status === 404, 'Unknown content must return HTTP 404', result);
  }
  for (const locale of ['en', 'es']) {
    const path = locale === 'en' ? '/services/long-distance-moving' : '/es/servicios/mudanzas-larga-distancia';
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' });
      const trigger = page.getByRole('button', { name: locale === 'en' ? /^Browse/ : /^Explorar/ });
      await trigger.focus(); await page.keyboard.press('Enter');
      const opened = await trigger.getAttribute('aria-expanded') === 'true';
      const menu = page.getByRole('navigation', { name: locale === 'en' ? 'Browse the site' : 'Explorar el sitio', exact: true });
      await menu.locator('a').first().focus(); await page.keyboard.press('Escape');
      const closed = await trigger.getAttribute('aria-expanded') === 'false';
      const focusReturned = await trigger.evaluate(el => el === document.activeElement);
      report.keyboard.push({ path, width, opened, closed, focusReturned });
      check(opened && closed && focusReturned, 'Browse keyboard/Escape focus failed', { path, width, opened, closed, focusReturned });
    }
    const worksheet = locale === 'en' ? '/resources/comparing-moving-estimates' : '/es/recursos/comparar-presupuestos';
    await page.locator(`main a[href="${worksheet}"]`).first().click();
    await page.waitForURL(new URL(worksheet, base).href);
    await page.reload({ waitUntil: 'networkidle' });
    const reloadCorrect = new URL(page.url()).pathname === worksheet;
    await page.goBack({ waitUntil: 'networkidle' });
    const backCorrect = new URL(page.url()).pathname === path;
    report.navigation.push({ locale, from: path, to: worksheet, reloadCorrect, backCorrect });
    check(reloadCorrect && backCorrect, 'Deep link/reload/browser Back failed', { locale, reloadCorrect, backCorrect });
    await page.goto(new URL(worksheet, base).href, { waitUntil: 'networkidle' });
    const source = page.locator('main a[target="_blank"][href*="fmcsa.dot.gov"]').first();
    const expectedSource = await source.getAttribute('href');
    const [popup] = await Promise.all([page.waitForEvent('popup'), source.click()]);
    await popup.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {});
    const external = { locale, expected: expectedSource, opened: popup.url(), originalPath: new URL(page.url()).pathname };
    report.externalOpening.push(external);
    check(external.opened === expectedSource && external.originalPath === worksheet, 'Source did not open independently in a new tab', external);
    await popup.close();
    await page.emulateMedia({ media: 'print' });
    const print = await page.evaluate(() => ({
      headerHidden: getComputedStyle(document.querySelector('.site-header')).display === 'none',
      quoteHidden: getComputedStyle(document.querySelector('.quote-entry')).display === 'none',
      worksheetVisible: getComputedStyle(document.querySelector('.worksheet')).display !== 'none',
      tables: document.querySelector('.worksheet').querySelectorAll('table').length,
      columnHeaders: document.querySelector('.worksheet').querySelectorAll('th[scope=col]').length,
    }));
    report.print.push({ path: worksheet, ...print });
    check(print.headerHidden && print.quoteHidden && print.worksheetVisible && print.tables === 2, 'Print worksheet visibility failed', { path: worksheet, ...print });
    await page.pdf({ path: fileURLToPath(new URL(`worksheet-${locale}-print.pdf`, output)), format: 'Letter', printBackground: true, margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } });
    await page.emulateMedia({ media: 'screen' });
  }
  await context.close();
} catch (error) {
  report.failures.push({ message: 'Capture execution interrupted', error: String(error) });
} finally {
  report.completedAt = new Date().toISOString();
  await save();
  await browser.close();
  const matrix = ['# Session 6 — route and locale browser matrix', '', `Captured ${report.capturedAt}; source ${report.source} with the recorded working-tree changes.`, '', 'Read-only local development evidence. All new editorial entries are drafts for Owner review; this is not a deployed qualification or publication approval. Widths are CSS viewport emulation, not physical devices or actual browser zoom. See Session 4 evidence for detailed results.', '', '| Route | HTTP | Document language | Canonical path | H1 | Layout widths without overflow |', '|---|---:|---|---|---|---|', ...report.routes.map(r => `| ${r.path} | ${r.status} | ${r.lang} | ${r.canonical ? new URL(r.canonical).pathname : 'missing'} | ${r.h1.length} | ${report.layouts.filter(l => l.path === r.path && l.documentWidth <= l.width).map(l => l.width).join(', ')} |`), '', `Failures recorded: ${report.failures.length}. Unknown-route, link, keyboard, history and print results are in [publishing-results.json](../session-4/evidence/publishing-results.json).`, '', 'Production publication requires the Owner-reviewed locale entries; protected preview review, actual carrier/support recipients, deployed analytics receipts and source-linked production selection remain separate qualification.'];
  await writeFile(new URL('route-matrix.md', session6), matrix.join('\n') + '\n');
}
console.log(JSON.stringify({ routes: report.routes.length, layouts: report.layouts.length, links: report.links.length, failures: report.failures }, null, 2));
if (report.failures.length) process.exitCode = 1;
