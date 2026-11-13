import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {reviewBrowserTarget} from './review-browser-target.mjs';
const require=createRequire(new URL('../../../apps/main-site/package.json',import.meta.url));
const {chromium}=require('playwright');
const target=reviewBrowserTarget('stable','https://vantage-main-site-optimization.vercel.app');
const browser=await chromium.launch();
const context=await browser.newContext();
await context.route('**/*',target.continueRead);
const page=await context.newPage();
const result={origin:target.origin,checks:[],errors:[]};
page.on('pageerror',error=>result.errors.push(error.message));
try{
 for(const path of ['/locations/florida-movers','/moving-routes/florida-to-north-carolina','/es/destinos/florida','/es/rutas/florida-a-carolina-del-norte']){
  const response=await page.goto(target.origin+path);
  await page.locator('main form').waitFor();
  const record={path,status:response.status(),noindex:response.headers()['x-robots-tag']?.includes('noindex')===true,heading:await page.locator('h1').innerText(),map:await page.locator('figure svg[role="img"]').count()===1,sources:await page.locator('#sources-review-heading').count()===1};
  result.checks.push(record);
  if(record.status!==200||!record.noindex||!record.map||!record.sources)throw Error(`Stable preview check failed: ${path}`);
 }
 if(result.errors.length)throw Error('Stable preview browser errors');
}finally{await browser.close();await mkdir(target.output,{recursive:true});await writeFile(new URL('report.json',target.output),JSON.stringify(result,null,2));}
console.log(JSON.stringify(result));
