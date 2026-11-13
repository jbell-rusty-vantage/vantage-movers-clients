import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const browser = await chromium.launch();
try {
  for (const locale of ['en', 'es']) {
   for (const width of [1440, 390]) {
    const suffix = width === 390 ? '-mobile' : '';
    const context = await browser.newContext({ viewport: { width, height: 1400 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
    await context.route('**/*', route => {
      const request = route.request(), url = new URL(request.url());
      return url.origin === 'http://localhost:3001' && ['GET', 'HEAD'].includes(request.method()) && !url.pathname.startsWith('/_vercel/') ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    await page.goto(`http://localhost:3001${locale === 'es' ? '/es' : ''}`);
    const form = page.locator('form').first();
    await form.getByLabel(locale === 'es' ? 'Nombre completo' : 'Full Name', { exact: true }).fill('Alex Morgan');
    await form.getByLabel(locale === 'es' ? 'Correo electrónico' : 'Email', { exact: true }).fill('alex@example.com');
    await form.getByLabel(locale === 'es' ? 'Teléfono' : 'Phone', { exact: true }).fill('2025550100');
    await page.evaluate(() => document.fonts.ready);
    await form.getByRole('heading').first().click();
    // Capture the entire current form, without sticky page chrome covering its top.
    await page.locator('header, nextjs-portal').evaluateAll(elements => elements.forEach(element => element.style.visibility = 'hidden'));
    const buffer = await form.screenshot();
    await sharp(buffer).webp({ lossless: true }).toFile(fileURLToPath(new URL(`../../../apps/main-site/public/images/selected-20261112/quote-request-${locale}${suffix}.webp`, import.meta.url)));
    const metadata = await sharp(buffer).metadata();
    console.log(JSON.stringify({ locale, width: metadata.width, height: metadata.height }));
    await context.close();
   }
  }
} finally { await browser.close(); }
