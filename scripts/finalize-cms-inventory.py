"""Qualify source fields against the fetched baseline and known interactive states."""
import json,re,html,collections
from pathlib import Path
root=Path('docs/main-site-preview/cms-2026-11-12')
catalog_path=Path('apps/main-site/src/content/cms/catalog.json')
catalog=json.loads(catalog_path.read_text(encoding='utf8'))
baseline=json.loads((root/'baseline-pages.json').read_text(encoding='utf8'))
assert not baseline['errors'] and len(baseline['pages'])>=50,'Complete authorized baseline crawl required'
pages=[p for p in baseline['pages'] if not p['path'].endswith('.txt')]
text=' '.join(t for p in pages for t in p['text']+p['attributes'])
technical=re.compile(r'^(?:es-US|en-US|UTC|use client|block|POST|GET|Unable to resolve ZIP|Quote request failed|Lead capture unconfirmed|NotFoundError|PositionUnavailableError|TimeoutError|GeolocationPositionError|PERMISSION_DENIED|POSITION_UNAVAILABLE|TIMEOUT)$|^\[main-site|Missing state map geometry|system-ui, sans-serif')
def observed(row):
    value=re.sub(r'\s+',' ',html.unescape(row['defaultValue']))
    if '{{' in value:
        pattern='.*?'.join(re.escape(piece) for piece in re.split(r'\{\{\d+\}\}',value))
        return any(re.fullmatch(pattern,node) for page in pages for node in page['text']+page['attributes'])
    return value in text
def interactive(row):
    source=row['sourceFile'];label=row['label'];value=row['defaultValue']
    if source in ('lib/quote-copy.ts','schemas/quote-form.schema.ts'):return True
    if source=='content/editorial/service-preparation.ts':return label.startswith(('question ','answer '))
    if source=='content/editorial/services.ts':return label.startswith(('heading ','paragraphs ','bullets '))
    if source=='lib/content.ts':return label.startswith(('q ','a ','coverageCopy ')) or '{{0}}' in value
    if source.startswith('components/interactive/') or source.startswith('components/layout/BrowseNavigation'):return True
    if source.startswith('components/feedback/') or source.endswith('/error.tsx') or source.endswith('/not-found.tsx') or source=='app/global-not-found.tsx':return True
    if source in ('components/sections/FaqSection.tsx','components/sections/TestimonialsSection.tsx','components/sections/GetInTouchSection.tsx','components/sections/HeroFacts.tsx','components/ui/Stars.tsx'):return True
    if source=='components/editorial/ArticleMetadata.tsx':return value in ('Publicado:','Published:','Revisado:','Reviewed:')
    if source=='components/editorial/SourcesReview.tsx':return value in ('Revisión a cargo de','Reviewed by')
    return False
kept=[];excluded=[]
for row in catalog:
    # Contact display and action use the single business field, even on legal pages.
    duplicate_contact=row['sourceFile']=='content/legal/docs.ts' and row['defaultValue'] in ('support@vantagehomemovers.com','(888) 477-9232')
    if not duplicate_contact and not technical.search(row['defaultValue']) and (row['kind']=='image' or observed(row) or interactive(row)):
        kept.append(row)
    else:excluded.append(row)
catalog_path.write_text(json.dumps(kept,indent=2,ensure_ascii=False)+'\n',encoding='utf8')
(root/'excluded-source-fields.json').write_text(json.dumps(excluded,indent=2,ensure_ascii=False)+'\n',encoding='utf8')

lines=['# Exact preview copy and image inventory','',f'Baseline: {baseline["origin"]}. Read-only HTTP inventory of {len(pages)} English and Spanish page routes; no forms were submitted. This records the preview before CMS edits. The machine-readable baseline preserves every text node and display attribute.','',
'The editable catalog contains exact defaults grouped by their source section. Identical defaults in distinct source modules keep separate keys. The quote form, legal documents and editorial entries have explicit source bindings. Global business contact values are shared so displayed phone/email and click targets agree. `{{0}}`, `{{1}}` are runtime values in a copy template and must be preserved.','',
'Route paths, component layout, customer review words/ratings, publication approvals, dates, carrier records and schema/telemetry identifiers remain operational data. Editorial wording is editable; its review status is separate. Metadata-only and unused source fields are excluded from the editor. Logos and photographs are editable image slots; inline UI icons and the geographic map remain components.','',
'## Pages','']
for p in pages:lines.append(f'- [{p["path"]}]({baseline["origin"]}{p["path"]})')
lines+=['','## Editable copy by section','']
groups=collections.defaultdict(list)
for row in kept:
    if row['kind']=='text':groups[row['section']].append(row)
for section,rows in sorted(groups.items()):
    lines.extend([f'### {section}',''])
    for row in rows:
        lines.extend([f'**{row["locale"]} · {row["label"].split(" · ")[0]}** (`{row["key"]}`)', '', '> '+row['defaultValue'].replace('\n','\n> '),''])
lines+=['## Images and placements','']
for row in [r for r in kept if r['kind']=='image']:
    usages=[p for p in pages if row['defaultValue'] in p['images']]
    alts=sorted(set(d['alt'] for p in usages for d in p.get('imageDetails',[]) if d['src']==row['defaultValue']))
    lines += [f'### {row["defaultValue"]}','',f'Field: `{row["key"]}` · {row["section"]}','',
        'Page placements: '+(', '.join('`'+p['path']+'`' for p in usages) or 'Interactive carousel / responsive source; source-defined placement.'),'',
        'Alt text: '+('; '.join(repr(a) if a else 'empty (decorative; adjacent copy provides context)' for a in alts) or 'See localized carousel captions and alt text above.'),'']
lines+=['## Baseline page transcripts','', 'These transcripts preserve exact rendered text in document order, including repeated shared navigation/footer text. Dynamic customer testimonial text is evidence, not editable website copy.','']
for p in pages:
    lines.extend(['### '+p['path'],'','\n\n'.join(p['text']),''])
(root/'INVENTORY.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
print(json.dumps({'pages':len(pages),'editableFields':len(kept),'images':sum(r['kind']=='image' for r in kept),'excludedSourceFields':len(excluded)}))
