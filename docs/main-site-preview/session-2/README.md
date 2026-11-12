# Session 2 — original bilingual editorial drafts

The first service journey now has actual English and Spanish content to render: long-distance → worked estimates worksheet → quote → Wisconsin/Madison. The remaining seven service subjects, inventory worksheet and responsibility guide are also drafted. The next editorial proof is the Owner's review of the rendered content, including Spanish wording and service-specific promises. Drafting and source checks do not establish publication approval.

Prepared November 12, 2026, America/New_York, in `main-site-optimization`, branch `agent/main-site-optimization`. These files are part of the integration branch; this session does not independently deploy or publish them.

## What is ready for review

- [Service drafts](../../../apps/main-site/src/content/editorial/services.ts): eight stable service identities, each with independently written English and Spanish copy. Older service-branch slugs are retained. Openings, preparation questions and FAQs differ by customer need.
- [Resources](../../../apps/main-site/src/content/editorial/resources.ts): inventory checklist, responsibility guide and a printable estimate comparison. The comparison includes an invented two-bedroom household and fully worked arithmetic: an initial fictional $4,100 offer plus $850 of missing work becomes $4,950, compared with a fictional $4,800 offer. Every amount is labeled invented, not a rate or quote. Both worksheets have blank rows for the reader's own notes.
- [Location drafts](../../../apps/main-site/src/content/editorial/locations.ts): Wisconsin and the finished Madison article, with practical arrival questions, the seasonal campus-area limitation, official new-resident instructions and a local park destination. LakeWay's future works are explicitly distinguished from completed attractions.
- [Source and claim records](../../../apps/main-site/src/content/editorial/sources.ts): eight sources, section/scope/check/recheck metadata, and material bilingual claims with page identities. See the [source verification notes](sources-and-review.md).
- [Types](../../../apps/main-site/src/content/editorial/types.ts) and [entry export](../../../apps/main-site/src/content/editorial/index.ts): 26 locale entries, related content IDs, per-section citations and per-locale review state. No English fallback silently completes a Spanish entry.

All prose is kept as versioned, typed content alongside the app so the review and published source can be tied to a commit. Media belongs in the existing public asset tree for this preview. The Owner said the publishing pipeline exists; this work does not create a parallel Blob upload/editor pipeline.

## Review state and Owner direction

The Owner designated themselves as reviewer during this session: “I'll be the reviewer.” This assigns the review; it does not approve unseen content. Each locale therefore remains `status: draft`, `reviewer: null`, with an explicit note that the Owner is the designated reviewer and approval is pending. `author` identifies Codex. `checkedAt` records November 12, 2026. The rendering/publication layer must keep drafts out of production routes, navigation, alternates and sitemap. Protected, noindex preview rendering can expose the actual drafts for review.

The Owner can review the first journey before reviewing the remaining library. Record approval against each locale and revision; changing `status` alone must not substitute for that evidence. Spanish is drafted throughout the content rather than copied from English, but no independent Spanish reviewer or legal review is claimed.

## Coverage matrix

| Stable ID | English path | Spanish path | Editorial state |
|---|---|---|---|
| long-distance-moving | `/services/long-distance-moving` | `/es/servicios/mudanzas-larga-distancia` | Draft; first journey |
| residential-moving | `/services/residential-moving` | `/es/servicios/mudanzas-residenciales` | Draft |
| corporate-office-moving | `/services/corporate-office-moving` | `/es/servicios/mudanzas-de-oficina` | Draft |
| military-moving | `/services/military-moving` | `/es/servicios/mudanzas-militares` | Draft |
| senior-moving | `/services/senior-moving` | `/es/servicios/mudanzas-para-personas-mayores` | Draft |
| packing-services | `/services/packing-services` | `/es/servicios/servicios-de-embalaje` | Draft |
| storage-options | `/services/storage-options` | `/es/servicios/opciones-de-almacenamiento` | Draft |
| auto-transport | `/services/auto-transport` | `/es/servicios/transporte-de-autos` | Draft |
| before-the-inventory-call | `/resources/before-the-inventory-call` | `/es/recursos/preparar-inventario` | Draft; printable inventory |
| comparing-moving-estimates | `/resources/comparing-moving-estimates` | `/es/recursos/comparar-presupuestos` | Draft; worked + blank comparison |
| who-handles-my-move | `/resources/who-handles-my-move` | `/es/recursos/quien-organiza-mi-mudanza` | Draft |
| wisconsin | `/locations/wisconsin-movers` | `/es/destinos/wisconsin` | Draft; state directory content |
| madison-wisconsin | `/locations/wisconsin-movers/madison` | `/es/destinos/wisconsin/madison` | Draft; finished city article |

Paths describe the content contract; actual route, print, browser and deployment evidence belongs to the integration sessions.

## What the drafts enable a reader to do

The service and responsibility drafts name the assigned motor carrier as the transporter and Vantage as the arranger, point the reader to their own paperwork for assignment and link the official federal lookup. The estimates worksheet exposes omitted inventory, packing, stairs, storage and redelivery questions rather than treating the lowest initial figure as equivalent work. The Madison guide distinguishes the defined student move-out area and historical 2026 schedule from future dates and links the City and Wisconsin DOT directly.

This is a content inspection, not a human usability study. Rendered mobile tables, external-link behavior, language continuity, direct navigation and actual quote capture still require integrated proof.

## Checks and handoff

`pnpm --filter @vantage/main-site typecheck` passed after all editorial modules were added. `pnpm --filter @vantage/main-site exec vitest run --config vitest.unit.config.mts src/content/editorial/editorial.test.ts` passed four checks: complete paired queue and unique paths, related-entry/source resolution, explicit review/source metadata, and usable worked/blank worksheet structures. These are content contract checks, not rendered usability or source-truth verification. The parent integration owns publication/route tests and browser evidence against these entries. No backend, partner app, quote fields, consent wording or source attribution was changed by this editorial task.

The content stage is authored and source-checked, with the Owner review outstanding. Session 3 can render the first service and resource journey immediately; Session 4 can render state/city entries using stable IDs. Keep the source ledger visible in review and do not label Codex's source check as Owner approval.
