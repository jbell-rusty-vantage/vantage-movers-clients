# State and directed-route content

Owner goal: a useful Florida landing page and Florida → North Carolina guide that establish a repeatable system for up to 20 states. This implementation closes the first authored, bilingual state/route pair and its navigation/map components. It does not publish the remaining combinations or approve any new content for production.

## Implemented boundary

| Module | Responsibility |
| --- | --- |
| `src/content/editorial/florida.ts` | Independently authored English/Spanish Florida pages: quote context, planning cards, city starting points, full service grid, compact service combinations, challenges, arrival preparation and route crosslink. |
| `src/content/editorial/moving-routes.ts` | Independently authored Florida → North Carolina pages: departure/arrival plan, destination examples, relevant services, timing and cost questions, packing/resident preparation and source references. |
| `src/content/editorial/geography-types.ts` | Typed geographic page contract: origin/destination anchors, localized planning text, cards and explicit related IDs. |
| `src/content/editorial/state-geography.ts` | Maps authored state identities to the local map geometry. An available outline does not publish a guide or assert coverage. |
| `src/content/editorial/geography-sources.ts` | Primary-source findings, scope, limitations, source-check attribution/date and recheck triggers. Included in the existing source registry. |
| `src/components/editorial/LocationPage.tsx` | Shared composition of reviewed content: same quote contract, broker disclosure, trust strip, specific card grids, sources and onward links. No provider calls or prose generation. |
| `src/components/interactive/StateRouteMap.tsx` | Selected-state interaction, schematic directed connection, padded viewport derived from anchors, localized accessible explanation and map attribution. No addresses, geocoding, tracking, mileage or routing API. |
| `src/lib/publication.ts` + existing catch-all routes | Existing explicit Preview mode and per-locale publication gate. Navigation, directories, alternates and source entry lookup share this boundary. |
| `src/content/editorial/destination-registry.ts` | Confirmed US/FL Places identity may suggest the visible Florida guide. Reading a guide never changes the quote fields. NC remains generic until an NC state page is authored. |

The pages use the existing quote schema, consent, draft persistence and submission contract. Florida and corridor context appears next to the form; an editorial URL does not infer or prefill a customer's pickup or destination. Source Company remains Main Site. Bounded analytics/attribution identities are integrated separately through the established server-owned contract.

| Identity | English | Spanish |
| --- | --- | --- |
| `florida` | `/locations/florida-movers` | `/es/destinos/florida` |
| `florida-to-north-carolina` | `/moving-routes/florida-to-north-carolina` | `/es/rutas/florida-a-carolina-del-norte` |
| route directory | `/moving-routes` | `/es/rutas` |

The reverse route is deliberately absent. Unknown state/route paths do not materialize pages. Directory links and related services resolve only visible entries; an English approval does not approve the Spanish sibling. Drafts stay out of the production sitemap.

## Retrieval and formulation

1. **Choose the state or directed route.** Record the actual reader problem and intended city examples. Florida → NC asks about Florida handover and North Carolina arrival; NC → Florida is a different assignment. The Owner chooses the next states/routes from business priorities rather than a Cartesian page generator.
2. **Build a bounded evidence brief.** Use Firecrawl to search or directly scrape primary state/city/transportation/emergency sources. Save the exact URL, returned snapshot, retrieval date and source finding. Existing federal role/checklist sources can be reused after their recheck trigger is evaluated. Competitor pages supply information-architecture references, never Vantage capabilities, testimonials, market statistics, claims or copied prose.
3. **Extract facts separately from recommendations.** Link every externally verifiable claim to a source ID. For law, fees, deadlines, eligibility or live conditions, prefer linking the current official instructions; do not transform a snapshot into an evergreen promise. Generic inventory and access questions are original editorial planning aids. Vantage operations owns availability, terms and capacity statements.
4. **Formulate structured drafts offline.** An agent may assist during authoring, but produces a reviewable TypeScript/content diff plus an evidence brief. It receives the selected state/route facts, source limitations, existing broker language and supported service IDs. It must not fill missing facts with plausible claims. The public website never calls an LLM, Firecrawl, or a competitor.
5. **Review for useful geographic differences.** State content must cover specific preparation and official resources. Route content must connect the two endpoints and contain useful departure/arrival decisions; merely replacing place names fails review. No “most requested,” “growing corridor,” mileage, prices, transit times, local offices, guaranteed service, carrier technology or climate-controlled storage claims without evidence and approval.
6. **Review each locale.** English and Spanish share identity, sources and factual intent, but have separate authored copy and separate approval. A source being checked by an agent is not business, legal or Spanish language approval. Set the existing named reviewer/status fields only after approval.
7. **Render and qualify the preview.** Confirm sources, service links, directional identity, local map anchors and keyboard/mobile navigation. Exercise quote continuity without synthesizing customer location. Run content/publication tests, lint, typecheck, build and browser review before proposing source promotion.

## Evidence used for the pilot

The reference review is in `REFERENCE-RESEARCH.md`. Full competitor extractions are local `.firecrawl/safeship-florida-deep.json` and `.firecrawl/safeship-fl-nc-deep.json`; these are research inputs, not page content or capability evidence.

Primary sources retrieved and inspected with Firecrawl on 2026-11-12:

| Local snapshot | Source | Finding used |
| --- | --- | --- |
| `.firecrawl/florida-preparedness.md` | [Florida Emergency Management](https://www.floridadisaster.org/planprepare/preparing-for-hurricane-season/) | Preparation resources and June 1–November 30 Atlantic season; no saved weather alert presented as live. |
| `.firecrawl/florida-new-resident.md` | [FLHSMV](https://www.flhsmv.gov/new-resident/) | Official license/ID, documentation and title/registration instructions. No fees or personal eligibility conclusions reproduced. |
| `.firecrawl/nc-new-resident.md` | [NCDMV](https://www.ncdot.gov/dmv/help/moving/Pages/new-residents.aspx) | Official licensing, registration, document and insurance instructions. No legal deadline reproduced. |
| `.firecrawl/nc-road-conditions.md` | [DriveNC](https://drivenc.gov/) | Public road map/alerts resource. Not commercial truck routing or shipment tracking. |
| `.firecrawl/usps-mail-forwarding.md` | [USPS](https://www.usps.com/manage/forward.htm) | Official forwarding/change-of-address instructions; no price or forwarding-duration promise. |

The source registry preserves findings even if ignored research-cache files are unavailable in another checkout. For later scale, promote bounded claim excerpts/checksums and review receipts into the versioned evidence packet; avoid committing whole third-party pages unnecessarily.

## Twenty-state expansion

Twenty state pages permit **20 × 19 = 380 directed state-to-state combinations** excluding same-state moves. That is **400 state/route identities**, or **800 localized pages** with English and Spanish, before any city pages. This is the upper bound of the model, not a publication target or current inventory.

Expand in small reviewable waves:

1. Select states and priority directions based on Owner-approved demand evidence. Do not claim demand from the number of possible routes.
2. Add one state evidence packet and localized state entry. Reuse federal guidance and service identities, but author local challenges and arrival resources. Add the state to destination suggestions only after an appropriate guide exists.
3. Add directed routes with sufficient distinctive departure/arrival content. An origin or destination anchor can exist without a state landing page; all links must still resolve. Never generate a reverse page by reversing text or the map line.
4. Before expanding beyond the pilot, introduce an explicit route admission manifest with origin code, destination code, content identity, source IDs, owner, locale status and last-reviewed revision. Validate uniqueness of `(origin, destination, locale)` and reject same-state entries. The present two authored entries already enforce the boundary through the registry; a separate manifest is not yet implemented.
5. Add a source-to-entry dependency index for maintenance, not a runtime retrieval pipeline. If a shared official source changes, list affected states/routes/locales for revision. A deadline-sensitive or materially incorrect entry can be returned to draft independently; do not silently carry its approval into changed copy.
6. For every wave, gate missing sources, missing translations, dead related links, unsupported assertions, duplicate boilerplate, absent local differences and inaccessible navigation. Require review against a concrete content revision before marking reviewed.
7. Measure qualified quote outcomes with the existing bounded page identities. Expand server-owned allowlists and reporting together; never send arbitrary URL text, ZIP codes or a new source-company value as analytics attribution.

Twenty states do not require a CMS, vector database, autonomous scheduler or new backend service. Versioned data and server-rendered static entry lookup are sufficient at this size. A later editorial admin system can replace the authoring storage while preserving the page contract and publication boundary if review volume justifies it.

## Map geometry and extension

The new map uses the [us-atlas 3.0.1](https://github.com/topojson/us-atlas) redistribution of the Census Bureau's 2017 cartographic boundaries under the included ISC license. Its preprojected Albers data fits a 975 × 610 viewport. The build input is `https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-albers-10m.json`; the generated JSON stores its SHA-256 checksum. No data is fetched at page load.

`apps/main-site/scripts/build-state-map.py` decodes the pinned topology into local SVG paths and largest-polygon centroid candidates. `src/content/geography/usa-map.json` includes the geometry, source identifier, checksum and anchor candidates. New anchors require visual and `SVGGeometryElement.isPointInFill` validation: a polygon centroid is not guaranteed to lie inside every concave state. Test multiple instances for unique SVG IDs, localized pin descriptions, keyboard selection and responsive cropping. Alaska/Hawaii use the atlas inset geography; their schematic routes need a separately reviewed presentation before admission.

The component receives localized state-specific notes through the content contract. It derives viewport bounds from its anchors and labels the line as illustrative. It neither implies a road route nor converts map distance to an estimate. The map ships its notice at `/licenses/us-atlas.txt` and credits the source beside the caption.

The older homepage `CoverageMap` still uses the pre-existing `@svg-maps/usa` dependency, whose package declares CC-BY-NC-4.0. This implementation does not reuse it for the new map. Replacing the homepage geometry and recalibrating its label overrides is a separate existing-map follow-up; it should be resolved before commercial production promotion.

## Qualification and remaining proof

Focused geography/editorial/publication/destination tests passed (14 tests), and the new page/map/nav implementation typechecked. The integration evidence packet owns responsive screenshots, map point-in-fill proof, map keyboard selection, hover/click/mobile navigation checks, full build and final deployment status. These are separate from business/Spanish approval and production publication. No production deployment is authorized or performed by this implementation.

