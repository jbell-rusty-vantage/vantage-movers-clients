import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { reviewBrowserTarget } from './review-browser-target.mjs';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const { origin: base, deployed, output: outputUrl, continueRead } = reviewBrowserTarget('quote');
const output = fileURLToPath(outputUrl);
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const results = [];
const key = 'vantage.main-site.quote.v1';
try {
for (const width of [320, 390, 1440]) {
 const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
 const payloads = [], errors = [];
 await context.route('**/*', route => {
  const req = route.request(), url = new URL(req.url());
  if (url.origin !== base) return route.abort();
  if (url.pathname === '/api/quote') { payloads.push(req.postDataJSON()); return route.fulfill({ status: payloads.length === 2 ? 503 : 200, json: { leadCaptured: payloads.length >= 3 } }); }
  if (url.pathname === '/api/places/autocomplete') { const zip = url.searchParams.get('input'); return route.fulfill({ json: { suggestions: [{ placeId: zip, postalCode: zip, text: `Test ${zip}` }] } }); }
  if (url.pathname === '/api/places/details') { const zip = url.searchParams.get('placeId'); return route.fulfill({ json: { postalCode: zip, country: 'US', state: zip === '10001' ? 'AL' : 'WI', city: zip === '53590' ? 'Sun Prairie' : 'Madison' } }); }
  return continueRead(route);
 });
 const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message));
 const response = await page.goto(base + '/services/long-distance-moving', { waitUntil: 'networkidle' });
 assert.equal(response?.status(), 200, 'Service quote route must render');
 if (deployed) assert.match(response.headers()['x-robots-tag'] ?? '', /noindex/);
 const form = page.locator('form').first();
 assert.equal(await form.getByRole('button', {name:'Back',exact:true}).count(),0);
 await form.getByRole('button', {name:'Continue',exact:true}).click();
 await form.getByRole('alert').first().waitFor();
 assert.equal(payloads.length, 0);
 await form.getByLabel('Full Name',{exact:true}).fill('Preview Synthetic');
 await form.getByLabel('Email',{exact:true}).fill('synthetic@example.com');
 const phone = form.getByLabel('Phone',{exact:true});
 await phone.fill('2025550100');
 await page.waitForFunction(key => {
  const values = JSON.parse(sessionStorage.getItem(key) || '{}').values;
  return values?.name === 'Preview Synthetic' && values?.email === 'synthetic@example.com' && values?.phone === '2025550100';
 }, key);
 await form.screenshot({path: `${output}/contact-${width}.png`, caret:'initial'});
 const continueButton = form.getByRole('button', {name:'Continue',exact:true});
 const continueBox = await continueButton.boundingBox();
 assert(continueBox);
 // Releasing near the bottom after blur catches a button that shifts up as the phone alert clears.
 await continueButton.click({position:{x:continueBox.width/2,y:continueBox.height-7},delay:100});
 await form.getByLabel('Moving From (ZIP)',{exact:true}).waitFor().catch(async error=>{
  await form.screenshot({path:output+'/unexpected-step.png', caret:'initial'});
  console.log({width, form:await form.innerText(), draft:await page.evaluate(key=>sessionStorage.getItem(key),key), errors});
  throw error;
 });
 assert.equal(await form.getByRole('button', {name:'Back',exact:true}).count(),1);
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
 await form.screenshot({path: `${output}/review-${width}.png`, caret:'initial'});
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
 results.push({width, firstStepHasNoBack:true, locationStepHasBack:true, contactValidation:true, directContinueAfterPhoneCorrection:true, noEarlySubmission:true, destinationFallback:true, guideBack:true, localeReload:true, identicalRetryPayloads:true, falseConsent:true, captureClearsDraft:true});
 await context.close();
}
const context=await browser.newContext({ serviceWorkers: 'block' }); const page=await context.newPage();
await context.route('**/*', continueRead);
await page.goto(base); const forms=page.locator('form'); await forms.nth(1).waitFor();
await forms.nth(0).getByLabel('Full Name',{exact:true}).fill('First form');
await forms.nth(1).getByLabel('Full Name',{exact:true}).fill('Active second form');
await page.goto(base+'/es/servicios/mudanzas-larga-distancia');
await page.waitForFunction(()=>document.querySelector('input[id$="-name"]')?.value==='Active second form');
results.push({multipleHomeForms:'active attempt retained'});
await context.close();
await writeFile(`${output}/report.json`,JSON.stringify({origin:base,mode:'Mocked quotes and Places; no Lead created',results},null,2));
console.log(JSON.stringify(results));
} finally {await browser.close();}
