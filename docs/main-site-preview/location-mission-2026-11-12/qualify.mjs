import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {execFileSync,spawnSync} from 'node:child_process';
const require=createRequire(new URL('../../../apps/main-site/package.json',import.meta.url));
const {chromium}=require('playwright');
const base=process.env.REVIEW_URL||'http://localhost:3001';
const origin=new URL(base);
if(origin.origin!==base||(!['localhost','127.0.0.1'].includes(origin.hostname)&&!origin.hostname.endsWith('.vercel.app')))throw Error('Only local or isolated Vercel preview origins permitted');
let bypass;
if(origin.hostname.endsWith('.vercel.app')){const result=spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef',{shell:true,encoding:'utf8'});if(result.status!==0)throw Error('Preview protection lookup failed');bypass=Object.keys(JSON.parse(result.stdout).protectionBypass??{})[0];if(!bypass)throw Error('Preview protection unavailable');}
const output=new URL(process.env.REVIEW_OUTPUT||'./evidence/integration/',import.meta.url);await mkdir(output,{recursive:true});
const report={base,source:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),checks:[],failures:[]};
function check(ok,name,details={}){report.checks.push({ok,name,...details});if(!ok)report.failures.push({name,...details});}
const browser=await chromium.launch();
const context=await browser.newContext({reducedMotion:'reduce'});
await context.route('**/*',route=>{const req=route.request(),u=new URL(req.url());return u.origin!==base||!['GET','HEAD'].includes(req.method())||u.pathname.startsWith('/_vercel/')?route.abort():bypass?route.continue({headers:{...req.headers(),'x-vercel-protection-bypass':bypass}}):route.continue();});
const page=await context.newPage();page.on('pageerror',e=>report.failures.push({name:'browser exception',message:e.message}));
async function go(path){const response=await page.goto(base+path);check(response.status()===200,'Page responds',{path,status:response.status()});await page.locator('main').waitFor();await page.evaluate(()=>document.fonts.ready);}
try{
 for(const locale of ['en','es']){
  const es=locale==='es',home=es?'/es':'/',state=es?'/es/destinos/florida':'/locations/florida-movers',route=es?'/es/rutas/florida-a-carolina-del-norte':'/moving-routes/florida-to-north-carolina';
  await page.setViewportSize({width:1440,height:1000});await go(home);
  const services=await page.locator(`footer nav[aria-label="${es?'Servicios':'Services'}"] a`).evaluateAll(a=>a.map(x=>x.getAttribute('href')));
  check(services.length===8,'Eight service pages',{locale});
  const locations=page.getByRole('button',{name:es?'Destinos':'Locations',exact:true});
  await page.waitForFunction(()=>Array.from(document.querySelectorAll('header button')).some(b=>Object.keys(b).some(k=>k.startsWith('__reactProps')&&(typeof b[k]?.onMouseEnter==='function'||typeof b[k]?.onPointerEnter==='function'))));
  await locations.hover();await page.waitForFunction(label=>Array.from(document.querySelectorAll('header button')).some(b=>b.textContent.trim()===label&&b.getAttribute('aria-expanded')==='true'),es?'Destinos':'Locations');check(await locations.getAttribute('aria-expanded')==='true','Locations opens on hover',{locale});
  check(await page.locator(`header a[href="${state}"]:visible`).count()>0,'Florida card in navigation',{locale});
  await page.keyboard.press('Escape');await page.waitForFunction(label=>Array.from(document.querySelectorAll('header button')).some(b=>b.textContent.trim()===label&&b.getAttribute('aria-expanded')==='false'),es?'Destinos':'Locations');check(await locations.getAttribute('aria-expanded')==='false','Locations closes with Escape',{locale});
  await locations.focus();await page.keyboard.press('Enter');await page.waitForFunction(label=>Array.from(document.querySelectorAll('header button')).some(b=>b.textContent.trim()===label&&b.getAttribute('aria-expanded')==='true'),es?'Destinos':'Locations');check(await locations.getAttribute('aria-expanded')==='true','Locations keyboard activation',{locale});await page.keyboard.press('Escape');
  for(const width of [1440,390,320]){
   await page.setViewportSize({width,height:1000});
   for(const path of [...services,state,route]){
    await go(path);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow',{path,width});
    check(await page.locator('h1').count()===1,'One page heading',{path,width});
    check(!/Codex editorial draft|Prepared by:|Reviewer: pending/.test(await page.locator('main').innerText()),'No internal author/reviewer workflow copy',{path,width});
    check(await page.locator('form').first().getByRole('button',{name:es?'Atrás':'Back',exact:true}).count()===0,'No first-step Back',{path,width});
    check(await page.locator('#sources-review-heading').count()===1,'Source cards included',{path,width});
    if(services.includes(path)){
     check(await page.locator('#service-details h3').count()>=3,'Service-specific detail cards',{path,width});
     check(await page.locator('main section').first().getByRole('navigation').count()===0,'No service hero breadcrumbs',{path,width});
    }
    if(path===state||path===route){
     check((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'),'Preview remains noindex',{path,width});
     const map=page.locator('figure').filter({has:page.locator('svg[role="img"]')});
     const usa=require('./src/content/geography/usa-map.json');
     const anchors=(path===route?['fl','nc']:['fl']).map(code=>[code,...usa.locations.find(s=>s.id===code).anchor]);
     for(const [code,x,y] of anchors){const d=usa.locations.find(s=>s.id===code).path;check(await map.locator('svg[role="img"]').evaluate((svg,{d,x,y})=>{const p=[...svg.querySelectorAll('path')].find(p=>p.getAttribute('d')===d);return p.isPointInFill(new DOMPoint(x,y));},{d,x,y}),'Pin lies inside correct state',{path,code,width});}
     if(path===route){
      check(await map.locator('path[marker-end]').count()===1,'Directional connecting line',{path,width});
      const destination=map.getByRole('button',{name:es?'Carolina del Norte':'North Carolina',exact:true});await destination.focus();await page.keyboard.press('Enter');
      check(await destination.getAttribute('aria-pressed')==='true','Map destination keyboard selection',{path,width});
      check((await map.locator('[aria-live]').innerText()).length>20,'Map selection shows guidance',{path,width});
     }
     check(await page.locator('main h2').count()>=6,'Substantial location sections',{path,width});
     await page.evaluate(()=>{document.activeElement?.blur();scrollTo({top:0,behavior:'instant'});});
     await page.screenshot({path:fileURLToPath(new URL(`${locale}-${path===state?'florida':'route'}-${width}.png`,output)),fullPage:true});
    }
   }
   if(width===390){await go(home);await page.getByRole('button',{name:es?'Menú':'Menu',exact:true}).click();check(await page.locator(`header a[href="${state}"]:visible`).count()>0,'Mobile Florida navigation',{locale});}
  }
 }
}finally{await browser.close();await writeFile(new URL('report.json',output),JSON.stringify(report,null,2));}
console.log(JSON.stringify({checks:report.checks.length,failures:report.failures}));if(report.failures.length)process.exitCode=1;
