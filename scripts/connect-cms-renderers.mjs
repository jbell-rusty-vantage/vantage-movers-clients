// One-time mechanical migration. The checked-in renderers, not this script, run in production.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(new URL('../apps/main-site/package.json',import.meta.url));
const ts=require('typescript');
const root=path.resolve('apps/main-site/src');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(root).filter(p=>p.endsWith('.tsx')&&!/test\.|stories|playground|[\\/]cms[\\/]|seo[\\/]|analytics[\\/]|opengraph-image|layout.tsx/.test(p));
function jsxText(value) {const lines=value.replace(/\r/g,'').split('\n');return lines.map((line,i)=>{let s=line.replace(/\t/g,' ');if(i>0)s=s.replace(/^ +/,'');if(i<lines.length-1)s=s.replace(/ +$/,'');return s;}).filter(Boolean).join(' ');}
for(const filename of files) {
 const source=fs.readFileSync(filename,'utf8');if(source.includes('components/cms/Content'))continue;
 const scope=path.relative(root,filename).replaceAll('\\','/'), ast=ts.createSourceFile(scope,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX), edits=[],used=new Set();
 const scopeAttr=` scope=${JSON.stringify(scope)}`;
 const replace=(start,end,text)=>edits.push({start,end,text});
 function visit(node) {
   if(ts.isJsxElement(node)||ts.isJsxSelfClosingElement(node)) {
    const opening=ts.isJsxElement(node)?node.openingElement:node;
    const tag=opening.tagName.getText();
    if(/^[a-z]/.test(tag)&&(['option','source'].includes(tag)||opening.attributes.properties.some(p=>ts.isJsxAttribute(p)&&['alt','title','placeholder','aria-label','aria-description','aria-roledescription','dangerouslySetInnerHTML'].includes(p.name.getText())))) {
      replace(opening.tagName.getStart(),opening.tagName.end,`CmsElement element=${JSON.stringify(tag)}${scopeAttr}`);used.add('CmsElement');
      if(ts.isJsxElement(node))replace(node.closingElement.tagName.getStart(),node.closingElement.tagName.end,'CmsElement');
    }
    if(tag==='Image')replace(opening.tagName.end,opening.tagName.end,scopeAttr);
   }
   if(ts.isJsxText(node)&&!['option','textarea','script','style','title'].includes(node.parent.openingElement?.tagName.getText())) {
     const value=jsxText(node.text); if(value.trim()){replace(node.getFullStart(),node.end,`<CmsText${scopeAttr}>{${JSON.stringify(value)}}</CmsText>`);used.add('CmsText');}
   }
   if(ts.isJsxExpression(node)&&node.expression&&(ts.isJsxElement(node.parent)||ts.isJsxFragment(node.parent))&&!['option','textarea','script','style','title'].includes(node.parent.openingElement?.tagName.getText())) {
     replace(node.getStart(),node.getStart(),`<CmsText${scopeAttr}>`);replace(node.end,node.end,'</CmsText>');used.add('CmsText');
   }
   ts.forEachChild(node,visit);
 }
 visit(ast);
 let updated=source;
 for(const e of edits.sort((a,b)=>b.start-a.start||b.end-a.end)) updated=updated.slice(0,e.start)+e.text+updated.slice(e.end);
 if(updated.includes('from "next/image"')) {updated=updated.replace(/import Image from "next\/image";/,'import { CmsImage as Image } from "@/components/cms/Content";');}
 if(used.size) {const line=`import { ${[...used].join(', ')} } from "@/components/cms/Content";\n`;updated=updated.startsWith('"use client";')?updated.replace('"use client";','"use client";\n'+line):line+updated;}
 if(updated!==source)fs.writeFileSync(filename,updated);
}
