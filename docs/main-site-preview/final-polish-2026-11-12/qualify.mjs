import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawnSync,execFileSync } from 'node:child_process';
import {fileURLToPath} from 'node:url';
const require=createRequire(new URL('../../../apps/main-site/package.json',import.meta.url));
const {chromium}=require('playwright');
const base=new URL(process.env.REVIEW_URL||'http://localhost:3001');
const out=new URL(process.env.REVIEW_OUTPUT||'./evidence/local/',import.meta.url);await mkdir(out,{recursive:true});
let token;
if(base.hostname!=='localhost'){if(!base.hostname.endsWith('.vercel.app'))throw Error('Preview only');const r=spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef',{shell:true,encoding:'utf8'});token=Object.keys(JSON.parse(r.stdout).protectionBypass)[0];}
const browser=await chromium.launch();const context=await browser.newContext();
const report={source:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),base:base.origin,checks:[],failures:[]};
function check(ok,name,details={}){report.checks.push({ok,name,...details});if(!ok)report.failures.push({name,...details});}
await context.route('**/*',route=>{const req=route.request(),url=new URL(req.url());if(url.origin!==base.origin||!['GET','HEAD'].includes(req.method())||url.pathname.startsWith('/_vercel/'))return route.abort();return token?route.continue({headers:{...req.headers(),'x-vercel-protection-bypass':token}}):route.continue();});
const page=await context.newPage();page.on('pageerror',e=>report.failures.push({name:'Browser exception',message:e.message}));
async function go(path){await page.goto(new URL(path,base).href);await page.locator('main').waitFor();await page.evaluate(()=>document.fonts.ready);}
async function shot(name,target=page){await target.screenshot({path:fileURLToPath(new URL(name+'.png',out)),...(target===page?{fullPage:false}:{})});}
try{
 for(const locale of ['en','es']){
  const es=locale==='es',home=es?'/es':'/',archive=es?'/es/recursos':'/resources';
  await page.setViewportSize({width:1440,height:1000});await go(home);
  const services=await page.locator(`footer.bg-cream:visible nav[aria-label="${es?'Servicios':'Services'}"] a`).evaluateAll(els=>els.map(e=>e.getAttribute('href')));
  await go(archive);const articles=await page.locator('#articles a').evaluateAll(els=>els.map(e=>e.getAttribute('href')));
  const posters=await page.locator('#articles img').evaluateAll(els=>els.map(e=>new URL(e.src).searchParams.get('url')||e.getAttribute('src')));
  check(posters.length===6&&new Set(posters).size===6&&posters.every(p=>p.includes('/images/editorial/20261112/')),'Six distinct custom posters',{locale});
  for(const img of await page.locator('#articles img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());} await shot(`${locale}-articles`,page.locator('#articles'));
  for(const width of [1440,390,320]){
   await page.setViewportSize({width,height:1000});
   for(const path of [home,...services,...articles,archive]){
    await go(path);
    const license=page.locator('.license-strip');check(await license.count()===1,'One sitewide license strip',{path,width});
    const text=await license.innerText();check(text.includes('USDOT 4078939')&&text.includes('MC 1551322'),'Correct license identifiers',{path,width});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No overflow',{path,width});
    const forms=page.locator('form');
    if(await forms.count()){
     check(await forms.first().locator('[data-quote-security] svg').count()===2,'Lock and shield under quote',{path,width});
     check(!/Your saved progress|Su progreso guardado/.test(await forms.first().innerText()),'Saved-progress disclosure removed',{path,width});
     check(await forms.first().locator('[data-quote-security] a').getAttribute('href')==='/privacy','Privacy message links to policy',{path,width});
    }
    if(path===archive) { for(const img of await page.locator('#articles img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());} }
    if(path===archive)check(await page.locator('#articles img').evaluateAll(els=>els.every(e=>e.complete&&e.naturalWidth>0)),'All custom posters loaded',{locale,width});
   }
   await go(home);await page.mouse.move(0,0);await page.emulateMedia({reducedMotion:'no-preference'});
   const track=page.locator('.referral-track');await track.waitFor();
   check(!/You may have found|Connections that start|Quizá nos conoció/.test(await page.locator('main').innerText()),'Referral side copy removed',{locale,width});
   check(await page.locator('.referral-logo').evaluateAll(els=>els.every(e=>getComputedStyle(e).backgroundColor==='rgba(0, 0, 0, 0)'&&parseFloat(getComputedStyle(e).borderTopWidth)===0)),'Unboxed transparent logo treatments',{locale,width});
   const first=await track.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(200);const second=await track.evaluate(e=>getComputedStyle(e).transform);check(first!==second,'Ribbon cycles',{locale,width});
   await page.getByRole('button',{name:es?'Pausar logos':'Pause logos',exact:true}).click();check(await track.evaluate(e=>getComputedStyle(e).animationPlayState)==='paused','Pause works',{locale,width});
   if(width===1440)await shot(`${locale}-referrals`,page.locator('.referral-window').locator('xpath=../../..'));
   await page.emulateMedia({reducedMotion:'reduce'});
   check(await track.evaluate(e=>{const b=e.parentElement.getBoundingClientRect();return [...e.firstElementChild.children].filter(c=>c.getAttribute('aria-hidden')!=='true').every(c=>{const r=c.getBoundingClientRect();return r.left>=b.left&&r.right<=b.right+1;});}),'All logos visible with reduced motion',{locale,width});
   if(width===390){await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(100);await shot(`${locale}-mobile-home`);await shot(`${locale}-mobile-form`,page.locator('form').first());}
  }
 }
 await page.setViewportSize({width:390,height:844});
 for(const path of ['/privacy','/terms','/consumer-information','/carrier-contacts','/accessibility','/missing-polish-test']){await go(path);check(await page.locator('.license-strip').count()===1,'License strip on policy and error pages',{path});}
}finally{await browser.close();await writeFile(new URL('report.json',out),JSON.stringify(report,null,2));}
console.log(JSON.stringify({checks:report.checks.length,failures:report.failures}));if(report.failures.length)process.exitCode=1;
