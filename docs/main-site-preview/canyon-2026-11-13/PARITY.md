# Canyon parity with the optimization preview

The review baseline is `agent/main-site-optimization` at `49bdd3c`. The optimization alias was recorded at application source `bd70189e824a4426ae9b608769648575f3e77e43` and Vercel deployment `dpl_FmWZfS29WdoBuXMghcoJhNaeiEq4`. Later commits in that range record release evidence. Canyon branches from this baseline and uses a separate review deployment. [Baseline release record](../editorial-enhancement-2026-11-12/deployment.json)

## Visual reference and composition

The supplied `Desktop · Canyon-html/Main-Canyon.dc.html` selects the Canyon palette in `Main.dc.html`. The 1440px artboard provides the desktop composition. It uses a 1240px container with 32px gutters, Plus Jakarta Sans headings, Inter body, warm-white ground, rust actions, deep-brown surfaces, peach accents, pill buttons and 20–28px cards.

| Reference | Integrated Canyon composition |
| --- | --- |
| Utility strip and sticky header, lines 47–76 | License and contact strip over sticky white navigation. Keep the real logo, actual links, language switch, navigation panels and floating call control. |
| Full-width hero, lines 78–129 | Dark photographic background behind left copy and a raised white quote card. Existing facts, sourced imagery and the four-stage QuoteWizard supply the content and behavior. |
| Referral and planning sections, lines 131–174 | White referral ribbon and identity cards, then a light planning-card grid. The five interactive steps, image sequence, captions, reduced-motion and keyboard behavior remain available. |
| Featured services and trust strip, lines 176–263 | Two image-first feature cards and compact service tiles, followed by a rust broker strip. Keep all existing cards, route links, CTA targets and broker disclosure. |
| Reviews and coverage, lines 264–373 | Light review section with carousel cards. Dark coverage section with interactive state geography, selected-state detail and the all-locations link. |
| Coordination and FAQ, lines 375–434 | Rounded coordinator image beside existing About copy. Keep broker-benefit and military-appreciation sections. Light two-column FAQ with divider rows and the existing interactive accordion. |
| Contact, closing banner and footer, lines 437–505 | Contact details beside the second English homepage QuoteWizard. Retain the featured review and referral placements. Rounded dark photo banner and dark site footer retain their contact, quote, legal and resource links. |
| All other templates | Shared Canyon typography, palette, card and CTA treatment extends to all existing routes. Their structures remain specific to each template. The artboard supplies one English desktop homepage. |

The artboard's sample metrics, reviews, quote inputs, coverage claims and placeholder links are illustrative. Existing Vantage copy and CMS defaults supply the implemented content. Mobile and Spanish use the existing language and page structure with responsive Canyon treatments.

## HTTP route parity

The protected Canyon review alias at application source `089ca90246ec260b0082d4a6039964f1179d6ed6`, deployment `dpl_HYYfgXhLat9Au3b7TJpy3VLkWvmk`, matched the pinned optimization preview on all 56 HTML pages. Each route returned HTTP 200 with noindex, the expected locale, one identical primary heading, the same normalized copy phrases and audited display-attribute values, the same link targets, and the same original media source URLs. Both federal PDF shortcuts returned the same HTTP 307 target paths, the geographic license returned HTTP 200 with matching content hash, and unknown English and Spanish routes returned HTTP 404. All five utility responses also carried noindex. [Deployed route evidence](evidence/deployed-route-parity.json) · [Earlier local evidence](evidence/local-route-parity.json)

The verifier reconstructs completed React Suspense boundaries, strips scripts and styles, normalizes Unicode and whitespace, and compares phrase counts so section reordering retains the words within each phrase. It reads both HTML trees over GET. The comparison covers server-rendered content. CSS visibility, fonts, hydrated interactions, CMS writes, form capture, print rendering and PDF file contents require separate checks.

Run the same comparison against the protected review deployment with Python and `beautifulsoup4` plus the authenticated Vercel CLI.

```sh
python docs/main-site-preview/canyon-2026-11-13/verify-route-parity.py \
  https://vantage-main-site-canyon.vercel.app \
  docs/main-site-preview/canyon-2026-11-13/evidence/deployed-route-parity.json \
  --baseline-vercel --candidate-vercel --include-utility
```

## Route and interaction matrix

The baseline includes 56 HTML pages. The [CMS baseline inventory](../cms-2026-11-12/baseline-pages.json) lists exact URLs and the geographic license asset. The current route registry is in `apps/main-site/src/content/editorial/` and `apps/main-site/src/lib/publication.ts`. Each bilingual pair retains the document language, alternate switch, canonical and one primary heading. Test 320, 390, 768 and 1440px widths and actual zoom separately.

| Surface | Routes and behavior to verify |
| --- | --- |
| Home | `/`, `/es`. Check all sections and scroll targets, including `#main-content`, `#quote`, `#faq`, `#military-appreciation` and the established English section anchors. Two English forms and one Spanish form. Test referral pause, hover and reduced motion, planning cards and previous/next/arrow keys, FAQ keyboard and contact/quote links. |
| Navigation | Services, Locations and Resources panel hover, activation, Escape/focus return, outside dismissal, mobile menu and language alternate. Check About, FAQ and footer anchors, keyboard skip link, hash focus and history. Check floating call after scrolling, field-edit suppression and dismissal. Inspect telephone targets without placing calls. |
| Services | `/services`, `/es/servicios` and eight localized pairs for long distance, auto, military, residential, office, packing, storage and senior moves. Each detail keeps its own image, proof row, single quote with service identity, planning content, service links, reviews/empty state, map and FAQs. Long distance retains preview pricing context. Military retains its own follow-through content and CTAs. |
| Locations | `/locations`, `/es/destinos`; Florida, Wisconsin and Madison localized guides. Directory geography has 50 named map links, matching state cards, region jumps and existing guides. State card links reach the localized form while preserving the quote draft. Directory jumps and guide selection never infer a destination. |
| Routes | `/moving-routes`, `/es/rutas`; `/moving-routes/florida-to-north-carolina` and `/es/rutas/florida-a-carolina-del-norte`. Check schematic map controls, state-specific detail and quote/guide links. Preserve route direction and source qualifications. |
| Resources | `/resources`, `/es/recursos` and six localized guide pairs for comparing estimates, inventory, move coordination, costs, packing and paperwork. Check featured article, search and combined topic filters, Spanish accent normalization, result count, reset/empty state, covers, byline and dates, contents links, related content, worksheet links and printing. |
| Contact and disclosures | `/contact`, `/es/contacto`; English `/consumer-information`, `/carrier-contacts`, `/accessibility`, `/privacy`, `/terms`, `/cancellation`, `/sms-privacy`, `/sms-terms`. Verify support and quote paths, external carrier application, carrier table/empty state, and four federal references in both resource directories and Consumer Information. Spanish links to English-only content keep their language cues. |
| Documents, errors and indexing | `/ready-to-move` and `/your-rights` redirect to the existing federal PDF editions. Verify unknown EN/ES routes, readable error/loading states, geo license, print exclusion of chrome/quote and local map captions. Keep deployment protection and noindex, production sitemap rules and preview-only draft visibility. |
| Quote | Contact → Location → Details → Quote. Cover name/email/phone errors, five-digit ZIP and Places results/failures, optional pickup geolocation confirmation/deny/manual fallback, confirmed destination and guide fallback, date/size controls, review and SMS consent. Verify EN/ES and both English home placements with distinct IDs. Validate back, reload, language switch and guide return, one-hour session draft, and stable reference/LID. On HTTP failure, malformed or false capture show retry without clearing the draft. Successful explicit `leadCaptured: true` shows receipt and clears it. |
| Analytics and attribution | Confirm one telemetry mount per document, stable bounded page/locale IDs, preserved CTA/phone/quote event names and no contact values or query strings in events. GPC/DNT excludes website attribution. Identical retries preserve source `main_site`, site `vantagehomemovers.com`, reference/LID and optional false consent. The server's bounded website attribution identity remains governed by the existing schema. Inspect collector/dashboard receipts separately from browser requests. |
| CMS and testimonials | Read changed text, media and contact details through both locale root providers. Confirm EN/ES and placement isolation, owner-uploaded same-origin image rendering, synchronized telephone/email links, published review policy and both English homepage placements. Test excluded and empty review sets. Shared preview content means a live Owner edit can appear on either preview. |

## Contracts and proof

- `lib/cms/server.ts`, `snapshot.ts`, `resolve.ts` and `components/cms/Content.tsx` connect the existing Mongo catalog to both locale root layouts. Resolvers match kind, locale, exact default and audited source scope. Keep the old scope when markup moves. `ContentScope` selects editorial entry bindings. Keep dynamic tokens in `{{0}}` form, and keep `CmsImage` and contact links on their audited binding values. Existing descriptors are immutable. Baseline revision 29 contained 2,327 fields. [CMS release and proof](../cms-2026-11-12/README.md)
- `QuoteWizard.tsx`, `quote-journey.ts`, `website-attribution.ts` and `app/api/quote/route.ts` own the live intake contract. `packages/api-client` enforces the isolated preview origin and authenticated server-to-server reads and writes. The browser uses its own API. Test preview isolation with the exact Canyon deployment identity before any isolated synthetic submission. The application path uses the existing preview Mongo database `testvantagemovers_sitepreview`. [Preview environment contract](../../cloud-site-variations.md)
- Existing runnable checks cover [quote recovery](../service-refinement-2026-11-12/quote-regression.mjs), [planning and location behaviors](../locations-feedback-2026-11-12/qualify.mjs), [service and navigation structure](../service-refinement-2026-11-12/qualify-sections.mjs), and the [resource release](../editorial-enhancement-2026-11-12/README.md). Compare any style-specific assertion to the intended Canyon composition. These sources record baseline results. Canyon's own exact-source verification belongs in its release record.
