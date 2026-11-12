import { createRequire } from 'node:module';
import { mkdir, writeFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const require=createRequire(new URL('../../../apps/main-site/package.json',import.meta.url));
const {chromium}=require('playwright');
const base=new URL(process.env.REVIEW_URL||'http://localhost:3001');
const out=new URL(process.env.REVIEW_OUTPUT||'./evidence/sections/',import.meta.url); await mkdir(out,{recursive:true});
let token;
if(base.hostname!=='localhost'){
 if(!base.hostname.endsWith('.vercel.app'))throw Error('Preview only');
 const result=spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef',{shell:true,encoding:'utf8'});
 token=Object.keys(JSON.parse(result.stdout).protectionBypass)[0];
}
const extension=await mkdtemp(join(tmpdir(),'vantage-zoom-'));
await writeFile(join(extension,'manifest.json'),JSON.stringify({manifest_version:3,name:'Vantage browser zoom qualification',version:'1.0',permissions:['tabs'],background:{service_worker:'background.js'}}));
await writeFile(join(extension,'background.js'),'chrome.runtime.onInstalled.addListener(() => {});');
const context=await chromium.launchPersistentContext('',{channel:'chromium',headless:true,viewport:{width:1440,height:1000},args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});
const report={base:base.origin,checks:[],failures:[],zoom:null};
function check(ok,name,details={}){report.checks.push({ok,name,...details});if(!ok)report.failures.push({name,...details});}
await context.route('**/*',route=>{const req=route.request(),u=new URL(req.url());if(u.origin!==base.origin||!['GET','HEAD'].includes(req.method())||u.pathname.startsWith('/_vercel/'))return route.abort();return token?route.continue({headers:{...req.headers(),'x-vercel-protection-bypass':token}}):route.continue();});
const page=await context.newPage();page.on('pageerror',e=>report.failures.push({name:'browser exception',message:e.message}));
try{
 for(const locale of ['en','es']){
  const es=locale==='es';await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(new URL(es?'/es':'/',base).href);
  const routes=await page.locator(`footer.bg-cream:visible nav[aria-label="${es?'Servicios':'Services'}"] a`).evaluateAll(els=>els.map(e=>e.getAttribute('href')));
  const track=page.locator('.referral-track');await track.waitFor();
  check(await track.evaluate(e=>getComputedStyle(e).animationName)==='referral-cycle','Referral strip animates',{locale});
  await page.getByRole('button',{name:es?'Pausar logos':'Pause logos'}).click();
  check(await track.evaluate(e=>getComputedStyle(e).animationPlayState)==='paused','Referral strip pauses',{locale});
  await page.emulateMedia({reducedMotion:'reduce'});
  check(await track.evaluate(e=>getComputedStyle(e).animationName)==='none','Reduced motion stops cycling',{locale});
  await page.screenshot({path:new URL(`${locale}-home.png`,out).pathname.replace(/^\/([A-Z]:)/,'$1'),fullPage:false});
  for(const width of [1440,390,320]){
   await page.setViewportSize({width,height:1000});
   for(const path of routes){
    await page.goto(new URL(path,base).href);await page.locator('[data-service-grid]').waitFor();
    check(await page.locator('[data-service-grid] a').count()===8,'Full eight-service grid',{path,width});
    check(await page.locator('#testimonials').count()===1,'Testimonials section',{path,width});
    check(await page.locator('#map svg[role=img]').count()===1,'Interactive map',{path,width});
    check(await page.locator('#faq button').count()>=1,'Service FAQs',{path,width});
    check(await page.locator('form input:visible').count()===3,'Contact has three fields',{path,width});
    const height=await page.locator('form').evaluate(e=>Math.round(e.getBoundingClientRect().height));
    check(height<620,'Compact contact form',{path,width,height});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No overflow',{path,width});
   }
  }
  await page.setViewportSize({width:1440,height:1000}); await page.goto(new URL(routes[0],base).href);
  await page.getByRole('button',{name:'Wisconsin',exact:true}).click();
  check(await page.locator('#map').getByRole('heading',{name:'Wisconsin',exact:true}).isVisible(),'Map selection changes details',{locale});
  await page.locator('#faq button').last().click();
  check(await page.locator('#faq button').last().getAttribute('aria-expanded')==='true','FAQ opens',{locale});
 }
 // chrome.tabs.setZoom is genuine browser zoom; viewport emulation is not used for this proof.
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker');
 await page.setViewportSize({width:1440,height:1000});await page.goto(new URL('/services/long-distance-moving',base).href);
 const before=await page.evaluate(()=>({dpr:devicePixelRatio,width:innerWidth}));
 const zoom=await worker.evaluate(async origin=>{const tabs=await chrome.tabs.query({});const tab=tabs.find(t=>t.url?.startsWith(origin));await chrome.tabs.setZoom(tab.id,2);return await chrome.tabs.getZoom(tab.id);},base.origin);
 await page.waitForTimeout(500);
 const after=await page.evaluate(()=>({dpr:devicePixelRatio,width:innerWidth}));report.zoom={mechanism:'chrome.tabs.setZoom',zoom,before,after};
 check(zoom===2&&after.dpr===before.dpr*2&&after.width===before.width/2,'Genuine 200 percent browser zoom');
 check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow at actual zoom');
 await page.locator('form input:visible').first().fill('Zoom review');
 check(await page.locator('form input:visible').first().inputValue()==='Zoom review','Form editable at actual zoom');
 await page.screenshot({path:new URL('actual-200-percent.png',out).pathname.replace(/^\/([A-Z]:)/,'$1'),fullPage:false});
}finally{await context.close();await writeFile(new URL('report.json',out),JSON.stringify(report,null,2));}
console.log(JSON.stringify({checks:report.checks.length,failures:report.failures,zoom:report.zoom}));if(report.failures.length)process.exitCode=1;
