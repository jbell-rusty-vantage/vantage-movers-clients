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
try {
 for(const locale of ['en','es']) {
  const path=locale==='es'?'/es/recursos':'/resources';
  await page.setViewportSize({width:1440,height:1000});
  const response=await page.goto(new URL(path,base).href);
  await page.locator('#articles img').first().waitFor();
  for(const img of await page.locator('#articles img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());}
  check(response.status()===200,'Stable archive renders',{locale});
  check(response.headers()['x-robots-tag']?.includes('noindex'),'Preview noindex',{locale});
  check(await page.locator('#articles img').evaluateAll(els=>els.every(e=>e.complete&&e.naturalWidth>0)),'All six posters decoded',{locale});
  check(await page.locator('.license-strip').count()===1,'License strip present',{locale});
  await shot(`${locale}-articles`,page.locator('#articles'));
 }
}finally{await browser.close();await writeFile(new URL('stable-report.json',out),JSON.stringify(report,null,2));}
console.log(JSON.stringify({checks:report.checks.length,failures:report.failures}));if(report.failures.length)process.exitCode=1;
