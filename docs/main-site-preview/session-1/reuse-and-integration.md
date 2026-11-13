# Selective reuse and integration plan

Compare `origin/main` (`145a4dd`) with `origin/agent/main-site-service-expansion` (`ba3a43a`). Do not merge the branch wholesale. Its service identity/routes are useful; its editorial approval, full Spanish experience and navigation/state behavior are not complete. `agent/main-site-a-route` remains a separate design.

## File-level decisions

Paths below start at `apps/main-site/`. “Reuse” means a future scoped integration, not a file imported by Session 1.

| Candidate file | Decision | Required reconciliation / proof |
|---|---|---|
| `src/content/services/types.ts` | Reuse stable `SERVICE_IDS`, locale and content types | Add per-locale draft/reviewed publication status, claim/source IDs and article relationships; keep customer-facing copy separate from identifiers |
| `src/content/services/registry.ts` | Reuse path/slug/alternate/related-ID lookup design | Replace or review seed copy via Session 2. Existing English fallback spread can conceal missing Spanish sections; fail closed for unpublished locale content. Never automatically publish all 16 entries |
| `src/content/services/registry.test.ts` | Reuse four structural cases | Tests cover counts, uniqueness, reciprocal alternates/relationships and content shape; they are **not rendered route tests**. Add publication gates, unknown-slug 404, locale completeness and sitemap/navigation consistency |
| `src/app/services/[slug]/page.tsx` | Reuse thin async route and metadata pattern | Await params; reviewed-only static params/lookup; actual service-index breadcrumb; render/404/canonical evidence |
| `src/app/es/servicios/[slug]/page.tsx` | Reuse locale route pairing | Complete Spanish form/errors and appropriate document language. Branch wraps content in `lang=es` but root HTML remains `lang=en`; resolve before bilingual acceptance |
| `src/components/service-pages/ServicePage.tsx` | Reuse composition seams and related-service lookup | Match production hero type scale, spacing and card treatments. Reorder to answer → quote → preparation → coordinator review → carrier responsibilities → resource → FAQ. Branch uses oversized hero, generic benefits and proof claims; do not copy unchanged |
| `src/components/service-pages/ServiceFaqs.tsx` | Reuse localized items and accordion mechanism | Verify keyboard, expanded state, IDs, heading level and translated answers |
| `src/components/seo/ServicePageJsonLd.tsx` | Adapt Service/Breadcrumb generation | Review claims/schema; use real service index instead of `/#services`. Avoid asserting unverified geography or publishing draft FAQ schema; align schema with visible reviewed copy |
| `src/components/interactive/QuoteWizard.tsx` | Selectively port `copy`, `locale`, `serviceId` props | Preserve fields, source, consent and retry IDs. Translate validation, ZIP errors, calendar and move-size display labels without changing payload enum. Branch still has English strings. Gate confirmation on true capture; plan explicit draft lifecycle for guide/locale navigation |
| `src/app/api/quote/route.test.ts` | Port stronger established-key assertion alongside current cases | Added assertion strips unsupported service/locale and honors false snake-case consent. Preserve current failure test; add missing validation/HTTP-200-false UI coverage during integration |
| `src/app/api/places/autocomplete/route.ts` | Port locale whitelist/language selection only | Test EN/ES, invalid locale and manual ZIP fallback; retain server credentials and preview behavior |
| `src/app/api/places/details/route.ts` | Defer until destination identity implementation | Route exists but current wizard does not call it. Session 4 must explicitly resolve confirmed city/state/ZIP, ambiguity and edit invalidation |
| `src/components/interactive/ServicesDropdown.tsx` | Reuse registry links/locale labels | Add explicit button toggling, outside close, Escape/focus return and no hover-only dependency |
| `src/components/layout/Header.tsx` | Reuse props for locale/alternate/quote URL | Keep current brand shell. Replace branch's services-only mobile `details` with complete Services/Locations/Resources/contact navigation. Do not make ES mean “first Spanish service” when no equivalent home exists |
| `src/components/layout/SiteFooter.tsx` | Reuse forwarding locale props | Keep footer/consumer/legal access; label untranslated destinations truthfully |
| `src/components/layout/Footer.tsx` | Reuse registry-backed service links | Confirm support/complaint/carrier recruitment labels vs actual recipients; keep existing legal URLs and no invented jobs destination |
| `src/components/layout/ComplianceBar.tsx` | Review optional localized disclosure | Not mounted on current home; branch adds it to service pages. Confirm disclosure placement without adding unreviewed global chrome |
| `src/components/sections/ServicesSection.tsx` | Port canonical hrefs | Keep current sections and photography treatment. Link only published locale entries; legacy hashes continue resolving |
| `src/components/HomePage.tsx` | Retain current section order | Do not copy `showLocaleEntry`'s first-Spanish-service shortcut as a language switch; add explicit language-aware service entry only |
| `src/app/sitemap.ts` | Adapt registry enumeration | Branch includes every service unconditionally. Require reviewed entries and reciprocal alternates. Keep preview noindex/protection |
| `src/lib/content.ts` | Port service URL relationships selectively | Retain production contact/tokens/editorial control; eliminate duplicate service identity, not unrelated copy |
| `src/lib/images.ts` | Register selected reviewed assets only | Current production media remains control; document provenance/crop/alt text before adopting service media |
| `src/components/interactive/CoverageMap.tsx` | Defer branch map changes | Keep current map appearance; add accessible published-state links via Session 4, not a second coverage registry |
| `src/components/interactive/MovingCarriersTable.tsx` | Defer search/layout enhancement | Useful separately, not needed for first service journey. Preserve authoritative carrier data and official lookup boundary |
| `public/images/services/*` | Audit before reuse | Sixteen EN/ES-shared service hero crops plus coordinator detail exist. Presence does not prove rights or claim accuracy; Session 5 chooses and records approved assets |
| `public/military_moves.png` | Do not automatically import | Separate asset change unnecessary for first prototype |
| `docs/competitive-audit/*` | Historical reference only | Current Session 1 captures supersede older baseline screenshots; competitor assets are not Vantage content |
| `vitest.config.mts` | Do not replace unit configuration wholesale | Current `vitest.unit.config.mts` is the baseline command; extend focused tests deliberately and retain clean-checkout compatibility |

Quote schema `src/schemas/quote-form.schema.ts`, quote runtime route and `packages/api-client` have no service-branch runtime diff in this comparison. This is valuable parity, not evidence that browser/locale/error behavior has been fully tested. No runtime files from the branch were imported in Session 1.

## Stable service routes to preserve

English prefix `/services/`; Spanish prefix `/es/servicios/`.

| Stable ID / English slug | Spanish slug |
|---|---|
| `long-distance-moving` | `mudanzas-larga-distancia` |
| `residential-moving` | `mudanzas-residenciales` |
| `corporate-office-moving` | `mudanzas-de-oficina` |
| `military-moving` | `mudanzas-militares` |
| `senior-moving` | `mudanzas-para-personas-mayores` |
| `packing-services` | `servicios-de-embalaje` |
| `storage-options` | `opciones-de-almacenamiento` |
| `auto-transport` | `transporte-de-autos` |

Services index `/services` and `/es/servicios` are new, not existing branch routes. Keep office ID stable even though production hash says `service-commercial-office-moving`. Locations/resources may use new localized slugs, but those must be declared once with stable content IDs before routing/navigation/sitemap consume them.

## Scoped integration sequence

1. **Editorial contract (Session 2).** Draft/verify content IDs `long-distance-moving`, `comparing-moving-estimates`, `wisconsin`, `madison`; EN and ES review states, citations and reviewer records. A two-column worksheet must contain matched inventory, packing, stairs/long carries, storage, redelivery and open questions, with a clearly fictional worked example. No fabricated Vantage offering or price promise.
2. **First vertical journey (Session 3).** Bring in registry/types/tests, localized detail routes, service index and adapted ServicePage/FAQ. Extend existing Header/Footer/ServicesDropdown with genuine mobile navigation and service links. Add locale/copy to the existing wizard. Keep runtime API payload unchanged. Prototype long-distance first; other registry entries remain hidden until reviewed.
3. **Preserved quote context and publishing (Session 4).** Add a small app-local quote-draft boundary shared by existing wizard consumers: values, step, consent, IDs and confirmed destination identity. Define ownership/reset, expiry and storage failure behavior before coding; never put itinerary/contact values in URLs or analytics. A same-tab draft should survive guide/locale navigation, Back and reload per specification. Use narrowly scoped session storage only if needed, with explicit cleanup on reset/completion and tests; no backend schema change. Destination identity resolves reviewed city → state → generic guide and invalidates after edits. Explicit pickup geolocation remains optional with manual fallback.
4. **Media (Session 5).** Preserve current hero until approved replacement is compared in both crops. Use real wizard captures for Request; art-directed stills for inventory/review/prepare/carrier delivery. Keep slideshow manual, accessible and intelligible with reduced motion. Record source bytes versus delivered bytes and loading evidence.
5. **Library/navigation and measurement (Sessions 6–7).** Add remaining reviewed service/locale pages and resources through the same registry. Reconcile contact labels and legal access. Apply consistent nonpersonal measurement; preserve existing event names where meaningful and verify receipts in preview destination.
6. **Preview proof (Session 8).** Sync latest main; checks and rebuild with approved Preview settings; push and record source/CI/deployment identities. Submit uniquely marked synthetic data through deployed UI, read one Main Site Form Lead in isolated DB and verify zero matching production records, correct consent/LID, no CRM/messages and analytics receipts. Only then ask for Owner production selection against the reviewed SHA.

## Acceptance cases to carry forward

At 390/1440px and long Spanish labels: keyboard menu opening/closing/focus return; direct service deep link; useful unknown-slug 404; services breadcrumb; reviewed-only locale alternates; invalid form stays editable; false/missing capture never confirms; retry retains IDs and consent; new completed request resets intentionally; no duplicate wizard state; guide exploration/Back/reload preserves draft; edited/ambiguous/unlisted destination chooses correct fallback; denied pickup geolocation leaves manual entry; print worksheet works; official links indicate new tab and protect opener; footer serves booked customers as well as new quotes. Schema/registry tests do not substitute for these browser checks.
