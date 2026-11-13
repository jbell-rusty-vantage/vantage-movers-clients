// Local UI simulation only. All API responses are intercepted; creates no Lead.
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(new URL('../../../apps/main-site/package.json',import.meta.url));
const {chromium}=require('playwright');
const base=process.env.BASELINE_LOCAL_URL||'http://localhost:3001/';
assert.ok(/^http:\/\/(localhost|127\.0\.0\.1):\d+\/$/.test(base),'Local host required');
const browser=await chromium.launch();
const evidence=[];
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:width===390?844:1000},reducedMotion:'reduce'});
  const attempts=[];
  await context.route('**/*', route=>{
   const request=route.request();
   if(request.url().includes('/api/places/')) return route.fulfill({json:{suggestions:[]}});
   if(request.url().includes('/api/quote')) {
    attempts.push(request.postDataJSON());
    return route.fulfill({status:attempts.length===1?503:200,json:{low:0,high:0,leadCaptured:attempts.length>1}});
   }
   if(!['GET','HEAD'].includes(request.method())||/\/_vercel\//.test(request.url())) return route.abort();
   return route.continue();
  });
  const page=await context.newPage();
  await page.goto(base,{waitUntil:'networkidle'});
  const form=page.locator('#quote');
  await form.locator('#quote-pickup-zip').fill('33426');
  await form.locator('#quote-dest-zip').fill('53703');
  await form.getByRole('button',{name:'Select move date'}).click();
  await page.getByRole('dialog',{name:'Choose move date'}).locator('button:not([disabled])').filter({hasText:/^\d+$/}).last().click();
  await form.locator('select').selectOption('2 Bedrooms');
  await form.getByRole('button',{name:'Continue',exact:true}).click();
  await form.locator('input[name=name]').fill('Session One Example');
  await form.locator('input[name=email]').fill('session-one@example.com');
  await form.locator('input[name=phone]').fill('2025550100');
  await form.locator('input[name=smsConsent]').uncheck();
  await form.getByRole('button',{name:'Request Free Quote'}).click();
  await form.getByText('Something went wrong.',{exact:false}).waitFor();
  await page.screenshot({path:fileURLToPath(new URL(`./evidence/local-${width}-retry-mocked.png`,import.meta.url))});
  const retained=await form.locator('input[name=email]').inputValue();
  assert.equal(retained,'session-one@example.com');
  await form.getByRole('button',{name:'Request Free Quote'}).click();
  await form.getByRole('heading',{name:'Request Received'}).waitFor();
  await page.screenshot({path:fileURLToPath(new URL(`./evidence/local-${width}-confirmation-mocked.png`,import.meta.url))});
  assert.equal(attempts.length,2);
  assert.deepEqual(attempts[0],attempts[1]);
  evidence.push({width,simulation:true,attempts:2,retainedFields:true,identicalRetryPayload:true,source:attempts[0].source_company,consent:attempts[0].sms_consent,confirmation:await form.innerText()});
  await context.close();
 }
} finally {await browser.close();}
await writeFile(new URL('./evidence/quote-states.json',import.meta.url),JSON.stringify(evidence,null,2)+'\n');
