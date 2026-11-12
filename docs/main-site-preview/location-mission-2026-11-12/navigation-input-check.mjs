import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { reviewBrowserTarget } from './review-browser-target.mjs';

const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const { origin, deployed, output, continueRead } = reviewBrowserTarget('navigation-input');
const browser = await chromium.launch();
const results = [];

async function openPage(path, options) {
  const context = await browser.newContext({ ...options, serviceWorkers: 'block' });
  await context.route('**/*', continueRead);
  const page = await context.newPage();
  const response = await page.goto(origin + path, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200);
  if (deployed) assert.match(response.headers()['x-robots-tag'] ?? '', /noindex/);
  return page;
}

try {
  const desktop = await openPage('/', { viewport: { width: 1440, height: 900 } });
  const locations = desktop.getByRole('button', { name: 'Locations', exact: true });
  const locationsPanel = desktop.getByRole('navigation', { name: 'Locations and routes', exact: true });
  await locations.hover();
  await locationsPanel.waitFor();
  await desktop.locator('main').hover({ position: { x: 5, y: 5 } });
  await locationsPanel.waitFor({ state: 'hidden' });
  results.push('Desktop mouse hover opens and pointer departure closes');

  await locations.click();
  await locationsPanel.waitFor();
  await desktop.mouse.move(1, 850);
  await desktop.waitForTimeout(250);
  assert.equal(await locations.getAttribute('aria-expanded'), 'true');
  await locations.click();
  await locationsPanel.waitFor({ state: 'hidden' });
  results.push('First desktop click keeps the panel open and second closes it');

  await locations.focus();
  await desktop.keyboard.press('Enter');
  await locationsPanel.waitFor();
  await locationsPanel.getByRole('link').first().focus();
  await desktop.keyboard.press('Escape');
  await locationsPanel.waitFor({ state: 'hidden' });
  assert(await locations.evaluate(element => element === document.activeElement));
  await desktop.keyboard.press('Space');
  await locationsPanel.waitFor();
  await desktop.keyboard.press('Escape');
  results.push('Enter and Space open, Escape closes and restores focus');

  const tablet = await openPage('/', { viewport: { width: 1280, height: 900 }, hasTouch: true, isMobile: true });
  const tapLocations = tablet.getByRole('button', { name: 'Locations', exact: true });
  const tapPanel = tablet.getByRole('navigation', { name: 'Locations and routes', exact: true });
  await tapLocations.tap();
  await tapPanel.waitFor();
  await tapLocations.tap();
  await tapPanel.waitFor({ state: 'hidden' });
  await tapLocations.tap();
  await tapPanel.waitFor();
  await tablet.touchscreen.tap(5, 850);
  await tapPanel.waitFor({ state: 'hidden' });
  results.push('Touch tablet opens on first tap and closes on second or outside tap');

  const contact = await openPage('/services/long-distance-moving', { viewport: { width: 390, height: 1000 } });
  const form = contact.locator('form').first();
  const phone = form.getByLabel('Phone', { exact: true });
  await form.getByLabel('Full Name', { exact: true }).fill('Preview Synthetic');
  await form.getByLabel('Email', { exact: true }).fill('synthetic@example.com');
  await phone.fill('123');
  await phone.press('Tab');
  await form.getByRole('alert').filter({ hasText: 'Enter a valid phone number' }).waitFor();
  await phone.fill('2025550100');
  await form.getByRole('alert').filter({ hasText: 'Enter a valid phone number' }).waitFor({ state: 'hidden' });
  const next = form.getByRole('button', { name: 'Continue', exact: true });
  const box = await next.boundingBox();
  assert(box);
  await next.click({ position: { x: box.width / 2, y: box.height - 7 }, delay: 100 });
  await form.getByLabel('Moving From (ZIP)', { exact: true }).waitFor();
  results.push('Phone error first triggered on blur clears on edit and first Continue advances');
} finally {
  await browser.close();
  await mkdir(output, { recursive: true });
  await writeFile(new URL('report.json', output), JSON.stringify({ origin, results }, null, 2));
}
console.log(JSON.stringify(results));
