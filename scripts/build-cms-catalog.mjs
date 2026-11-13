import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../apps/main-site/package.json', import.meta.url));
const ts = require('typescript');
const root = path.resolve('apps/main-site/src');
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const files = walk(root).filter(p => /\.(ts|tsx)$/.test(p) && !/test\.|stories|playground|[\\/]cms[\\/]|geography[\\/]|api[\\/]|analytics|fonts.ts|estimate.ts|website-attribution|quote-journey|telemetry|seo[\\/]|editorial-routes|site.ts|manifest.ts|opengraph-image|editorial[\\/]draft.ts|editorial[\\/]types.ts/.test(p));
const rows = new Map();
const allSource=files.map(f=>({file:f,source:fs.readFileSync(f,'utf8')}));
const usedExport=(name,file)=>allSource.some(f=>f.file!==file&&new RegExp('\\b'+name+'\\b').test(f.source)) || (fs.readFileSync(file,'utf8').match(new RegExp('\\b'+name+'\\b','g'))??[]).length>1;
const forbiddenKeys = /^(id|path|href|url|kind|type|status|reviewer|reviewedAt|sourceIds|claimIds|relatedIds|locale|className|class|key|variant|sizes|position|mobilePosition|width|height|icon|contentId|event|source_company|source_company_site|phoneHref|dot|mc|code|labelId|headingId|testId|target|rel|role|aria-controls|aria-labelledby|data-.*)$/;
function property(node) { for(let p=node.parent;p;p=p.parent) { if(ts.isPropertyAssignment(p)) return p.name.getText().replace(/["']/g,''); if(ts.isVariableDeclaration(p)) return p.name.getText(); } return ''; }
function locale(node,file) { for(let p=node;p;p=p.parent) { if(ts.isCallExpression(p)&&p.arguments[0]&&ts.isStringLiteral(p.arguments[0])&&['en','es'].includes(p.arguments[0].text))return p.arguments[0].text; if(ts.isObjectLiteralExpression(p)) {const l=p.properties.find(x=>ts.isPropertyAssignment(x)&&x.name.getText()==='locale');if(l&&ts.isStringLiteral(l.initializer)&&['en','es'].includes(l.initializer.text))return l.initializer.text;} } if(file.startsWith('app/es/')) return 'es'; for(let p=node;p?.parent;p=p.parent) { const q=p.parent; if(ts.isPropertyAssignment(q)&&['en','es'].includes(q.name.getText())) return q.name.getText(); if(ts.isConditionalExpression(q)&&/\bes\b|locale\s*===\s*["']es/.test(q.condition.getText())) return p===q.whenTrue?'es':p===q.whenFalse?'en':'shared'; } return /lib\/content|content\/legal/.test(file)?'en':'shared'; }
function jsxText(value) { const lines=value.replace(/\r/g,'').split('\n'); return lines.map((line,i)=>{ let s=line.replace(/\t/g,' '); if(i>0)s=s.replace(/^ +/,''); if(i<lines.length-1)s=s.replace(/ +$/,''); return s; }).filter(Boolean).join(' '); }
function add(value,node,file,kind='text') {
  if (property(node) === 'scope') return; // Renderer binding, not Owner-facing copy.
  if(value.includes('{{')&&!/[A-Za-z]{2}/.test(value.replace(/\{\{\d+\}\}/g,'')))return;
  if(file==='lib/publication.ts'&&value==='Services')return; // Active nav reuses the historic Services field.
  if(!value.trim()||value==='use client'||value==='use server'||/^(?:randomUUID|getRandomValues|onTouched|POST|GET|application\/json)$/.test(value))return;
  if(kind==='text'&&/<[^>]+>/.test(value)) { for(const part of value.split(/<[^>]+>/g)) add(part,node,file);return; }
  if(kind==='text' && ((/^[\s\d.,/%·©—–+()$-]+$/.test(value)&&!['50,000','4.48/5','(888) 477-9232'].includes(value)) || value.length<2 || /(?:^|\s)(?:border-|focus:|px-|py-|pt-|pb-|min-|max-|justify-|items-|gap-|sm:|lg:)/.test(value) || /^[a-z]+[A-Z][a-zA-Z]*$/.test(value) || /^(?:https?:|mailto:|tel:|\/|#|@|--)/.test(value) || /\b(?:bg-|text-|flex|grid|rounded-|margin|padding|rgba\(|linear-gradient|font-|hover:|object-)/.test(value) || /^[a-z_][a-z\d_.:-]*$/.test(value))) return;
  const l=kind==='image'?'shared':locale(node,file), clean=value.trim();
  const digest=crypto.createHash('sha256').update(`${file}\0${l}\0${kind}\0${clean}`).digest('hex').slice(0,16);
  const key=`${kind}.${digest}`;
  let section=file.replace(/^(components|content|lib|app)\//,'').replace(/\.(tsx?|json)$/,'').replaceAll('/',' / ');
  for(let a=node;a;a=a.parent) {if(ts.isVariableDeclaration(a)&&ts.isVariableStatement(a.parent?.parent)&&a.parent.parent.parent===node.getSourceFile()) {section+=' / '+a.name.getText();break;} }
  for(let a=node;a;a=a.parent) {if(ts.isCallExpression(a)&&a.expression.getText()==='service'&&a.arguments.length>3&&ts.isStringLiteral(a.arguments[0])&&ts.isStringLiteral(a.arguments[2])) {section=(a.arguments[0].text==='es'?'/es/servicios/':'/services/')+a.arguments[2].text;break;} } 
  const sourceLine=node.getSourceFile().getLineAndCharacterOfPosition(node.getStart()).line+1;
  if(!rows.has(key)) rows.set(key,{key,section,label:kind==='image'?path.basename(clean):`${property(node)||'Copy'} · ${clean.slice(0,75)}`,locale:l,kind,defaultValue:clean,sourceFile:file,sourceLine});
}
for(const filename of files) {
 const file=path.relative(root,filename).replaceAll('\\','/'), source=fs.readFileSync(filename,'utf8'), ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 function visit(node) {
  if(ts.isVariableStatement(node)&&node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword)&&node.declarationList.declarations.every(d=>!usedExport(d.name.getText(),filename)))return;

  if(ts.isTemplateExpression(node)) {
   for(let a=node;a;a=a.parent)if(ts.isVariableDeclaration(a)&&a.name.getText()==='metadata')return;

   let excluded=false;for(let a=node;a;a=a.parent) {if(ts.isJsxAttribute(a)&&!['alt','title','placeholder','aria-label','aria-description','aria-roledescription'].includes(a.name.getText()))excluded=true;}
   const template=node.head.text+node.templateSpans.map((span,i)=>'{{'+i+'}}'+span.literal.text).join('');
   if(!excluded&&/[A-Za-z]{2} /.test(template)&&!forbiddenKeys.test(property(node)))add(template,node,file);
  }
  if(ts.isJsxText(node)) add(jsxText(node.text),node,file);
  if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)) {
   for(let a=node;a;a=a.parent) { if(ts.isVariableDeclaration(a)&&a.name.getText()==='metadata') return; }

   for(let a=node.parent;a;a=a.parent)if(ts.isJsxAttribute(a)&&!['src','srcSet','alt','title','placeholder','aria-label','aria-description','aria-roledescription'].includes(a.name.getText()))return;

   const p=node.parent, value=node.text;
   if(ts.isImportDeclaration(p)||ts.isExportDeclaration(p)||ts.isLiteralTypeNode(p)||ts.isPropertyAssignment(p)&&p.name===node||ts.isTypeReferenceNode(p))return;
   if(/\.(?:webp|png|jpe?g|svg|avif)$/.test(value)&&value.startsWith('/')) add(value,node,file,'image');
   else if(ts.isJsxAttribute(p)) { if(['alt','title','placeholder','aria-label','aria-description','aria-roledescription'].includes(p.name.getText()))add(value,node,file); }
   else if(!forbiddenKeys.test(property(node))) add(value,node,file);
  }
  ts.forEachChild(node,visit);
 }
 visit(ast);
}
// The process carousel composes these paths from locale/frame IDs.
const processFile='components/interactive/MovingProcess.tsx';
const processAst=ts.createSourceFile(processFile,fs.readFileSync(path.join(root,processFile),'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
for(const src of ['quote-request-en.webp','quote-request-es.webp','quote-request-en-mobile.webp','quote-request-es-mobile.webp'].map(f=>`/images/selected-20261112/${f}`).concat(['inventory-call.webp','review-estimate.webp','packing-detail.webp','carrier-paperwork.webp'].map(f=>`/images/preview/${f}`)))add(src,processAst,processFile,'image');
for(const filename of ['inventory','estimates','roles','costs','packing','paperwork'])add(`/images/editorial/photography-20261112/${filename}.webp`,processAst,'content/editorial/resource-center.ts','image');
const catalog=[...rows.values()].sort((a,b)=>a.section.localeCompare(b.section)||a.sourceLine-b.sourceLine);
fs.mkdirSync(path.join(root,'content/cms'),{recursive:true});
const catalogPath=path.join(root,'content/cms/catalog.json');
// Append only explicitly selected source modules; immutable descriptors retain Owner overrides.
const appendSources = process.argv.filter(arg => arg.startsWith('--append-source=')).map(arg => arg.slice('--append-source='.length));
if (process.argv.includes('--append-navigation')) appendSources.push('lib/publication.ts');
const existing = appendSources.length ? JSON.parse(fs.readFileSync(catalogPath, 'utf8')) : [];
const output = appendSources.length
  ? [...existing, ...catalog.filter(row => appendSources.includes(row.sourceFile) && !existing.some(old => old.key === row.key))]
  : catalog;
fs.writeFileSync(catalogPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({fields:output.length,text:output.filter(r=>r.kind==='text').length,images:output.filter(r=>r.kind==='image').length}));
