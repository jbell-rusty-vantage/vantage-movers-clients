# Florida and route preview mission — November 12

The Owner's requested changes are implemented locally. The Owner explicitly authorized committing/pushing the site and additive server attribution changes and deploying the isolated preview, reaffirming that the main production URL must remain unchanged. Preview release is in progress; exact deployment evidence will be recorded here before claiming the stable review alias is updated.

## Reviewable result

- Pickup ZIP suggestion is a small opt-in action. Disclosure appears after opening it; sharing location and applying a suggested ZIP remain separate explicit actions.
- The first quote step has no Back button (existing behavior, now browser-verified). A newly reproduced click-loss bug is fixed: correcting a contact validation error no longer moves Continue out from under a pointer press.
- All eight service pages in English and Spanish have icon/heading/copy grids and expanded planning content. Their image heroes no longer show Home / Services breadcrumbs.
- Sources and review is a card section with source names, domains and per-source dates. Internal Codex author/pending-review workflow copy is removed from consumer presentation; editorial statuses and publication guards remain intact.
- Florida and Florida → North Carolina have distinct English/Spanish pages, contextual quote introductions, trust strip, city planning cards, service grids, Florida service combinations, challenges, arrival preparation, route crosslinks and official resources.
- Locations exposes cards on hover, click, keyboard and mobile. The directed-route map has two state pins, a connecting line and selectable state guidance. Geometry is locally bundled and permissively licensed; it is not truck tracking or road routing.
- Directory navigation, language alternates and sitemap membership honor independent locale approval. Unknown and reverse routes are not generated.

Local paths: `/locations/florida-movers`, `/moving-routes/florida-to-north-carolina`, `/es/destinos/florida`, `/es/rutas/florida-a-carolina-del-norte`; directory `/moving-routes` and `/es/rutas`.

## Research and scaling design

[Reference research](REFERENCE-RESEARCH.md) records the requested Firecrawl extractions. [State/route architecture](STATE-ROUTE-ARCHITECTURE.md) distinguishes implemented retrieval/rendering from the additional admission manifest, revision tracking and source maintenance needed for expansion. Twenty states permit 380 directed pairs: up to 400 state/route identities or 800 English/Spanish pages, not an authorization to produce them all. Content is formulated offline from primary-source evidence and reviewed per locale; no visitor request invokes AI or a web scrape.

## Verification

- Main Site unit/contract/publication suite: 55 passing tests; Main Site lint passes. Typecheck also passed during integration.
- [Final integration report](evidence/integration/report.json): 532 checks, no failures. Covers all 16 service routes and four new locale pages at 320/390/1440 pixels; menu keyboard/hover/mobile behavior, sources, noindex, overflow, state pin point-in-fill checks and map keyboard selection. Screenshots are in that folder.
- [Service/editorial evidence](service-evidence/service-editorial-report.json): 16 service routes, 14 earlier editorial routes and source-card visual checks. [Desktop service cards](service-evidence/en-packing-services-1440.jpg), [Spanish phone cards](service-evidence/es-military-moving-390.jpg), [source cards](service-evidence/en-sources-1440.jpg).
- [Pickup option](evidence/quote-option/results.json): eight bilingual cases, including denial, unavailable provider and cancellation while editing. [Quote regression](evidence/quote/report.json): three widths, validation, direct pointer activation after correction, destination guide/back, locale/reload, consent false, identical retries, explicit capture success and draft clearing. All network writes mocked; no Lead created.
- [Navigation input proof](evidence/navigation-input/report.json): mouse, keyboard, touch-tablet and phone-error correction.
- [Attribution integration](ATTRIBUTION-INTEGRATION.md): server-owned additive allowlist, exact distributed contract, 16 focused server tests. Standard server typecheck still hits one pre-existing ignored scratch file; excluding only that file passes.

The local build uses explicit Preview mode and a dead loopback API origin without credentials. It verifies compilation/static generation with expected content fallbacks, not live content retrieval, Places or deployed persistence. Build result and local review process are recorded in `evidence/build.md`.

## Release and remaining decisions

The server repository requires explicit direction before commit/push/deploy. Release the isolated API allowlist first, then the site preview source through the existing workflows; verify exact source/deployment mapping before assigning the stable alias. Any real deployed synthetic capture requires a separately bounded test plan. No production deployment, editorial approval, indexing, campaign or business-data backfill occurred.

All 36 localized entries remain drafts. Production selection, Spanish/business/media approval, pricing/transit evidence, the 50,000-count definition and refreshed BBB evidence remain separate. The older homepage map's pre-existing noncommercial dependency is documented in the architecture packet and needs replacement or licensing resolution before commercial promotion; the new map does not use it.

No migration or environment change is required for the attribution extension. Roll back site and allowlist source together; retain historical attribution and qualification evidence. The prior stable preview remains available until a new deployment is explicitly recorded.
