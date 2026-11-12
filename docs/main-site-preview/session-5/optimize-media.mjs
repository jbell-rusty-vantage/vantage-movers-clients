import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';
const require = createRequire(await fs.realpath(path.resolve('apps/main-site/node_modules/next/package.json')));
const sharp = require('sharp');
const sourceRoot = 'C:/Users/Pinda/.codex/generated_images/01a1d03b-03ab-73f1-afc4-c236e2a471cc';
const assets = [
 ['home-inventory', 'exec-3690ab10-cb15-48e8-8d3c-da2abd41b9bb.png'],
 ['inventory-call', 'exec-68cc1adf-f0da-4bd6-aaac-1c11af968996.png'],
 ['packing-detail', 'exec-005ac5a1-058b-4fc5-8dd5-118a91926dbc.png'],
 ['carrier-paperwork', 'exec-113c5c5d-8dd2-462d-9528-b03f2e067eed.png'],
 ['review-estimate', 'exec-b232d490-cafa-40ff-aa16-d6ea0688a05a.png'],
 ['office-preparation', 'exec-6c1d1631-0f72-4fcc-922b-add159f79f46.png'],
];
const rows=[];
for(const [name,file] of assets){
 const input=await fs.readFile(path.join(sourceRoot,file));
 const target=`apps/main-site/public/images/preview/${name}.webp`;
 await sharp(input).resize({width:1440,withoutEnlargement:true}).webp({quality:82}).toFile(target);
 await sharp(input).resize({width:720,withoutEnlargement:true}).webp({quality:80}).toFile(target.replace('.webp','-720.webp'));
 const bytes=(await fs.stat(target)).size;
 rows.push({name, sourceFile:file, sourceSha256:crypto.createHash('sha256').update(input).digest('hex'), sourceBytes:input.length, webpBytes:bytes, width:1440,height:960, provenance:'ChatGPT Images generated illustration; fictional people; Owner review pending'});
}
await fs.writeFile('docs/main-site-preview/session-5/assets.json',JSON.stringify(rows,null,2)+'\n');
console.log(rows.map(({name,sourceBytes,webpBytes})=>({name,sourceBytes,webpBytes})));
