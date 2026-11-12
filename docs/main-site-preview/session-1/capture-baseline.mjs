// Run from the repository root after pnpm install and starting main-site on 3001.
// Read-only production capture: blocks every non-GET/HEAD request and telemetry.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const require = createRequire(new URL('../../../apps/main-site/package.json', import.meta.url));
const { chromium } = require('playwright');
const output = new URL('./evidence/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const manifest = { capturedAt: new Date().toISOString(), source: execFileSync('git', ['rev-parse', 'HEAD'], {encoding:'utf8'}).trim(), captures: [] };
try {
  for (const [name, url] of [['production', 'https://www.vantagehomemovers.com/'], ['local-main', process.env.BASELINE_LOCAL_URL || 'http://localhost:3001/']]) {
    for (const viewport of [{width:1440,height:1000}, {width:390,height:844}]) {
      const context = await browser.newContext({viewport, deviceScaleFactor:1, reducedMotion:'reduce'});
      await context.route('**/*', route => {
        const request = route.request();
        if (!['GET','HEAD'].includes(request.method()) || /\/_vercel\/|vercel-insights|vitals\.vercel/.test(request.url())) return route.abort();
        return route.continue();
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      const response = await page.goto(url, {waitUntil:'networkidle', timeout:120000});
      await page.evaluate(() => document.fonts.ready);
      for (let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=800) { await page.evaluate(y=>window.scrollTo(0,y), y); await page.waitForTimeout(120); }
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.waitForTimeout(600);
      const stem = `${name}-${viewport.width}`;
      await page.screenshot({path:new URL(`${stem}-viewport.png`,output).pathname.replace(/^\/(\w:)/,'$1'), animations:'disabled'});
      await page.screenshot({path:new URL(`${stem}-full.png`,output).pathname.replace(/^\/(\w:)/,'$1'),fullPage:true, animations:'disabled'});
      const facts = await page.evaluate(()=>({title:document.title, width:innerWidth, documentWidth:document.documentElement.scrollWidth, headings:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent), links:[...document.querySelectorAll('a[href]')].map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')})), quoteTop:document.getElementById('quote')?.getBoundingClientRect().top, fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})), unresolvedImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>({src:i.currentSrc||i.src,loading:i.loading,complete:i.complete,renderedWidth:i.getBoundingClientRect().width}))}));
      await page.locator('#quote').scrollIntoViewIfNeeded();
      await page.screenshot({path:new URL(`${stem}-quote.png`,output).pathname.replace(/^\/(\w:)/,'$1'), animations:'disabled'});
      await page.locator('#quote button[type=submit]').click();
      const validation = await page.locator('#quote').innerText();
      await page.screenshot({path:new URL(`${stem}-validation.png`,output).pathname.replace(/^\/(\w:)/,'$1'), animations:'disabled'});
      manifest.captures.push({name,url:page.url(),viewport,status:response.status(),...facts,errors,validation});
      await context.close();
    }
  }
} finally {
  await writeFile(new URL('capture-manifest.json',output), JSON.stringify(manifest,null,2)+'\n');
  await browser.close();
}
