# Florida and route preview mission — November 12

The requested changes are deployed to the [stable isolated preview](https://vantage-main-site-optimization.vercel.app). The Owner authorized commit/push and isolated preview deployment, explicitly excluding the main production URL. The production website and API aliases were checked before and after release and remain unchanged.

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

## Deployed release and remaining decisions

The isolated API deployed first from `7f1cceca11d4f7d28d26085a00cfb37f445c0cdb`; [API workflow](https://github.com/jbell-rusty-vantage/vantage-movers-server/actions/runs/43323668464) succeeded. [Read-only qualification](evidence/deployed/api-readonly.json) verified source identity, test database and preview isolation without writes.

Site source `762b3b92a01642349a86ec045291ecad60df0f05` deployed through the successful [site workflow](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43324193801). CI merge `b54e39adb41a450e30a3aa741669769f2bbad687` has the identical application tree `994e86a5a23c2b2518aa97bed6f1e5f514309dac`. The [immutable deployment](https://vantage-movers-clients-main-site-ji4bm12lw-vantage-4d3db9ef.vercel.app) is Ready, target Preview, deployment `dpl_FvingkCg3fuBxuCUbo74qioDLpd4`. The stable alias now points there.

[Deployed integration](evidence/deployed/integration/report.json) passed all 532 checks. Deployed [quote](evidence/deployed/quote/report.json), [pickup option](evidence/deployed/quote-option/results.json) and [navigation/input](evidence/deployed/navigation-input/report.json) regressions passed with writes mocked. The [final stable-alias check](evidence/deployed/stable/report.json) verified all four pilot pages return 200, remain noindex, show the map and sources, and have no browser errors. [Release identity](evidence/deployed/release-identity.json) records both unchanged production deployment IDs.

No new Lead was created. Deployed persistence of the newly admitted route identities has not been exercised with a real capture; local contract tests and deployed exact-source/isolation evidence are the available proof. Any new synthetic capture requires a separately bounded test plan. No production deployment, editorial approval, indexing, campaign or business-data backfill occurred.

All 36 localized entries remain drafts. Production selection, Spanish/business/media approval, pricing/transit evidence, the 50,000-count definition and refreshed BBB evidence remain separate. The older homepage map's pre-existing noncommercial dependency is documented in the architecture packet and needs replacement or licensing resolution before commercial promotion; the new map does not use it.

No migration or environment change is required for the attribution extension. Roll back site and allowlist source together; retain historical attribution and qualification evidence. The previous stable deployment ID is preserved in the release identity record.
