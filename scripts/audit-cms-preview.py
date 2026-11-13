"""Read-only baseline inventory. No quote, analytics, or browser actions are submitted."""

import concurrent.futures, json, re, urllib.request, urllib.parse, os

from html.parser import HTMLParser

from pathlib import Path



ORIGIN='https://vantage-main-site-optimization.vercel.app'

headers={'User-Agent':'Vantage-content-inventory/1.0'}

if os.environ.get('CMS_SITE_ENV_FILE'):

    for line in Path(os.environ['CMS_SITE_ENV_FILE']).read_text().splitlines():

        if line.startswith('VERCEL_AUTOMATION_BYPASS_SECRET='):

            headers['x-vercel-protection-bypass']=line.split('=',1)[1].strip().strip(chr(34)).strip(chr(39))

class SameOriginRedirect(urllib.request.HTTPRedirectHandler):

    def redirect_request(self,req,fp,code,msg,hdrs,newurl):

        if urllib.parse.urlparse(newurl).netloc!=urllib.parse.urlparse(ORIGIN).netloc: raise RuntimeError('Unexpected cross-origin redirect')

        return super().redirect_request(req,fp,code,msg,hdrs,newurl)

opener=urllib.request.build_opener(SameOriginRedirect)

class Page(HTMLParser):

    def __init__(self):

        super().__init__(convert_charrefs=True); self.text=[]; self.attrs=[]; self.images=[]; self.links=[]; self.image_details=[]; self.skip=0

    def handle_starttag(self,tag,attrs):

        d=dict(attrs)

        if tag in ('script','style'): self.skip+=1

        if tag=='a' and d.get('href','').startswith('/'): self.links.append(d['href'].split('#')[0].split('?')[0])

        for key in ('alt','title','placeholder','aria-label','aria-description','aria-roledescription'):

            if d.get(key): self.attrs.append(d[key])

        if tag in ('img','source'):

            for key in ('src','srcset'):

                for value in d.get(key,'').split(','):

                    value=value.strip().split(' ')[0]

                    if not value: continue

                    if value.startswith('/_next/image?'): value=urllib.parse.parse_qs(urllib.parse.urlparse(value).query).get('url',[''])[0]

                    if value.startswith('/'):
                        self.images.append(value)
                        self.image_details.append({'src':value,'alt':d.get('alt',''),'tag':tag})

    def handle_endtag(self,tag):

        if tag in ('script','style'): self.skip=max(0,self.skip-1)

    def handle_data(self,data):

        if not self.skip and data.strip(): self.text.append(re.sub(r'\s+',' ',data).strip())

def read(path):

    req=urllib.request.Request(ORIGIN+path,headers=headers)

    with opener.open(req,timeout=45) as response: html=response.read().decode()

    if 'Login – Vercel' in html or 'Log in to Vercel' in html: raise RuntimeError('Preview protection requires authorized access')

    parser=Page();parser.feed(html)

    return {'path':path,'text':parser.text,'attributes':parser.attrs,'images':sorted(set(parser.images)),'imageDetails':parser.image_details,'links':sorted(set(parser.links))}

seen=set(); pending={'/','/es'}; pages=[]; errors=[]

while pending:

    batch=sorted(pending-seen);pending=set()

    if not batch:break

    seen.update(batch)

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:

        futures={pool.submit(read,p):p for p in batch}

        for future in concurrent.futures.as_completed(futures):

            try:

                page=future.result();pages.append(page)

                pending.update(p for p in page['links'] if p and p not in seen and not re.search(r'\.(pdf|svg|png|jpg|webp)$|^/(api|_next|ready-to-move|your-rights)',p))

            except Exception as e:errors.append({'path':futures[future],'error':str(e)})

out=Path('docs/main-site-preview/cms-2026-11-12');out.mkdir(parents=True,exist_ok=True)

(out/'baseline-pages.json').write_text(json.dumps({'origin':ORIGIN,'pages':sorted(pages,key=lambda p:p['path']),'errors':errors},indent=2,ensure_ascii=False)+'\n',encoding='utf8')

print(json.dumps({'pages':len(pages),'errors':errors}))

