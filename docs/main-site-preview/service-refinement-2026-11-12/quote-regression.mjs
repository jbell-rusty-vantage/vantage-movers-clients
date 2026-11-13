import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const base = 'http://localhost:3001';
const output = fileURLToPath(new URL('./evidence/quote/', import.meta.url));
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const results = [];
const key = 'vantage.main-site.quote.v1';
try {
for (const width of [320, 390, 1440]) {
 const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
 const payloads = [], errors = [];
 await context.route('**/*', route => {
  const req = route.request(), url = new URL(req.url());
  if (url.pathname === '/api/quote') { payloads.push(req.postDataJSON()); return route.fulfill({ status: payloads.length === 2 ? 503 : 200, json: { leadCaptured: payloads.length >= 3 } }); }
  if (url.pathname === '/api/places/autocomplete') { const zip = url.searchParams.get('input'); return route.fulfill({ json: { suggestions: [{ placeId: zip, postalCode: zip, text: `Test ${zip}` }] } }); }
  if (url.pathname === '/api/places/details') { const zip = url.searchParams.get('placeId'); return route.fulfill({ json: { postalCode: zip, country: 'US', state: zip === '10001' ? 'AL' : 'WI', city: zip === '53590' ? 'Sun Prairie' : 'Madison' } }); }
  if (url.origin !== base || !['GET','HEAD'].includes(req.method()) || url.pathname.startsWith('/_vercel/')) return route.abort();
  return route.continue();
 });
 const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
 await page.goto(base + '/services/long-distance-moving');
 const form = page.locator('form').first();
 await form.getByRole('button', {name:'Continue',exact:true}).click();
 await form.getByRole('alert').first().waitFor();
 assert.equal(payloads.length, 0);
 await form.getByLabel('Full Name',{exact:true}).fill('Preview Synthetic');
 await form.getByLabel('Email',{exact:true}).fill('synthetic@example.com');
 await form.getByLabel('Phone',{exact:true}).fill('2025550100');
 await form.screenshot({path: `${output}/contact-${width}.png`});
 await form.getByRole('button', {name:'Continue',exact:true}).click();
 await form.getByLabel('Moving From (ZIP)',{exact:true}).fill('33426');
 for(const [zip, place, pattern] of [['53703','Madison, WI',/madison/],['10001','Madison, AL',/who-handles/],['53590','Sun Prairie, WI',/wisconsin/],['53703','Madison, WI',/madison/]]) {
  await form.getByLabel('Moving To (ZIP)',{exact:true}).fill(zip);
  await form.getByRole('button',{name:`Confirm delivery location: ${place}`,exact:true}).click();
  assert.match(await form.getByRole('link',{name:'Plan for your destination',exact:true}).getAttribute('href'),pattern);
 }
 await form.getByRole('link',{name:'Plan for your destination',exact:true}).click(); await page.waitForURL(/madison/); await page.goBack();
 await form.getByLabel('Moving To (ZIP)',{exact:true}).waitFor(); assert.equal(await form.getByLabel('Moving To (ZIP)',{exact:true}).inputValue(),'53703');
 await form.getByRole('button',{name:'Continue',exact:true}).click();
 await form.getByRole('button',{name:'Select move date',exact:true}).click();
 await page.locator('.vdp__day-btn:not(.vdp__day-btn--disabled):not(.vdp__day-btn--outside)').last().click();
 await form.getByLabel('Move Size',{exact:true}).selectOption('2 Bedrooms');
 await form.getByRole('button',{name:'Continue',exact:true}).click();
 await form.getByRole('checkbox').uncheck();
 assert.equal(payloads.length,0);
 await form.screenshot({path: `${output}/review-${width}.png`});
 await page.goto(base+'/es/servicios/mudanzas-larga-distancia');
 await form.getByRole('heading',{name:'Revise su solicitud'}).waitFor();
 assert.equal(await form.getByRole('checkbox').isChecked(),false);
 await page.reload(); await form.getByRole('heading',{name:'Revise su solicitud'}).waitFor();
 assert.equal(await form.getByRole('checkbox').isChecked(),false);
 for(let i=0;i<3;i++) {
  await form.getByRole('button',{name:'Solicitar cotización gratis',exact:true}).click();
  if(i<2) { await form.getByRole('alert').filter({hasText:'No pudimos confirmar'}).waitFor(); assert.equal(await form.getByRole('heading',{name:'Solicitud recibida'}).count(),0); }
 }
 await form.getByRole('heading',{name:'Solicitud recibida'}).waitFor();
 assert.equal(payloads.length,3); assert.deepEqual(payloads[0],payloads[1]); assert.deepEqual(payloads[1],payloads[2]); assert.equal(payloads[0].sms_consent,false);
 assert.equal(await page.evaluate(key=>sessionStorage.getItem(key),key),null);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false); assert.deepEqual(errors,[]);
 results.push({width, contactValidation:true, noEarlySubmission:true, destinationFallback:true, guideBack:true, localeReload:true, identicalRetryPayloads:true, falseConsent:true, captureClearsDraft:true});
 await context.close();
}
const context=await browser.newContext(); const page=await context.newPage();
await context.route('**/api/quote',route=>route.abort());
await page.goto(base); const forms=page.locator('form'); await forms.nth(1).waitFor();
await forms.nth(0).getByLabel('Full Name',{exact:true}).fill('First form');
await forms.nth(1).getByLabel('Full Name',{exact:true}).fill('Active second form');
await page.goto(base+'/es/servicios/mudanzas-larga-distancia');
await page.waitForFunction(()=>document.querySelector('input[id$="-name"]')?.value==='Active second form');
results.push({multipleHomeForms:'active attempt retained'});
await context.close();
await writeFile(`${output}/report.json`,JSON.stringify({mode:'Mocked quotes and Places; no Lead created',results},null,2));
console.log(JSON.stringify(results));
} finally {await browser.close();}
