# Execution sessions

Work from the branch and app identified in the [packet index](README.md). Each heading below is a separate chat brief. “Done” means the listed output and proof exist in the repo or linked PR. Record any pending evidence explicitly. The present packet completes initial research and planning. The sessions below implement and qualify the site.

## Integrated progress — November 12, 2026

| Stage | Implemented / tested | Remaining qualification |
|---|---|---|
| 1 | Baseline and design complete; original evidence preserved | None for baseline scope |
| 2 | 26 original EN/ES drafts, sources/claims, worked estimate and inventory sheets, Madison article | Owner is designated reviewer; locale approvals pending |
| 3 | Navigation, services, full Spanish quote UI, persistent quote draft, retry/capture gates; deployed isolated capture receipt | Owner visual selection |
| 4 | Resource/state/city routes, confirmed destination fallback, print, Back/reload/locale checks | Geolocation is not offered; manual entry works. No denied-permission scenario claimed |
| 5 | Six generated editorial scenes, actual synthetic UI capture, manual bilingual process sequence | Owner media approval; model-specific Astra authorship not claimed |
| 6 | Eight services × two locales, full route/link matrix, contact and consumer paths | Owner service/Spanish approval; dedicated careers and complaints workflows remain separate |
| 7 | Privacy-limited events; actual Preview dashboard receipts and Production exclusion; Speed Insights receipts; source-linked helper prototype and companion scopes | Authoritative Booking joins remain separate from browser analytics |
| 8 | CI deployment, stable protected alias, deployed route audit and exact-source isolated Form Lead/analytics receipts on `10ec4d2` | Owner content/media review and production decision |

Follow the per-stage evidence linked from the packet index. “Draft,” “tested locally,” “deployed” and “Owner approved” remain distinct states.

### 1. Baseline and implementation design

**Complete — November 12, 2026.** [Evidence and Session 2 handoff](session-1/README.md). Local rendering is current-main source in development mode with empty API content; production captures are separate. Retry/confirmation browser evidence is mocked, not Lead persistence. No runtime integration or production selection is implied.

Capture current production and local main at phone and desktop widths. Trace HomePage → HeroSection → QuoteWizard → /api/quote → shared server-only API client. Record how true capture, validation failure and retry are represented. Inventory existing service, legal, consumer and carrier routes, contact destinations, tokens, media, navigation and current analytics. Read the app AGENTS guidance and installed Next docs before coding. Compare origin/agent/main-site-service-expansion with current main, specifically src/content/services/registry.ts, localized app routes, tests, schema and navigation. Identify reusable changes file by file. Produce a current route map, component reuse table, annotated desktop/mobile layouts for the page types in the specification and a scoped integration diff plan. The baseline proof is a reproducible current-main render and trace, with the first prototype route chosen.

### 2. Evidence and original editorial production

Use the research ledger and prior service briefs. Interview or consult approved Vantage materials for operational claims. Deliver actual English and Spanish drafts in the Main Site content tree for the publication queue, with source records and review states. Provide one fully worked estimate worksheet and a finished Madison article for layout validation first. Verify that readers can identify the transporter, compare included services and find the official authority from the drafts alone. Track unconfirmed claims by page and exclude them from public copy. This session can run alongside visual design after baseline inventory.

### 3. Design integration and first service journey

On the current UI implement desktop/mobile navigation, Services index, shared service template and first bilingual long-distance page. Reuse the service branch registry, route tests and existing wizard after reconciling against production source. Give resource, coverage and contact links real destinations as they become available. Handle long Spanish labels, keyboard opening/closing and focus return. Compare screenshots against the baseline. Demonstrate home → service → estimate worksheet → quote on phone and desktop. Preserve the existing form fields, server validation, main_site attribution, consent and capture semantics.

### 4. State, city and resource publishing

Implement the location and resource routes in the specification using reviewed Session 2 entries. Use stable IDs and one source of navigation, language alternates, internal links and sitemap entries. Add Wisconsin → Madison and Wisconsin → shared service page. Connect the confirmed delivery location to city/state/generic fallback. Exercise an edited destination, unknown city, unsupported state, denied pickup geolocation and locale switch midway through the form. Verify a direct deep link, browser Back, a reload, printable worksheet and external reference opening in a new tab. Capture the first integrated review increment.

### 5. GPT-6 Astra imagery and visual process sequence

Start a GPT-6 Astra chat with the media brief in specification.md, the chosen layouts and target image slots. Call ChatGPT Images for the missing photographs. Review a contact sheet before generating dependent scenes. Export responsive assets and record chosen prompts, provenance, crops and alt text. Capture the real wizard with synthetic data. Implement the slideshow in the existing process section using the storyboard. Supply narrow/wide screenshots, keyboard and reduced-motion evidence, and a before/after comparison of image bytes, loading and layout shift. The sequence must remain understandable with motion disabled.

### 6. Complete the service library and customer navigation

Integrate all eight services and their related resources in both reviewed locales. Check every header, footer, breadcrumb and quote entry. Confirm support and complaint contacts, careers and carrier-network paths with the responsible Vantage team. Use an existing owned contact destination until a dedicated workflow exists. Review the footer and contact flow as a booked customer as well as a new visitor. Validate canonical and alternate URLs, rendered HTML, useful 404s and production sitemap logic. Record a route-by-locale matrix with working links and content status.

### 7. Measurement and walkthrough extensions

Implement first intentional wizard interaction, form progression and confirmed Form Lead capture using current analytics helpers. Exercise page/service/locale attribution and verify receipts in the preview analytics destination. Use limited nonpersonal dimensions. Booking attribution requires an authoritative server-side join. Telephone clicks only measure intent. Report the verified measurement boundary.

Account for the other walkthrough items in the handoff. For a moving assistant, prototype reviewed-source answers about quotes, roles and preparation, with citations and a human handoff; record demo versus integrated behavior. For owner publishing, scope the Admin upload → placement → preview → publish → restore workflow against the established registry; use static reviewed assets for this preview. For Booking/Lead controls use the separate walkthrough and server/Admin ownership. Record owner decisions and which companion changes need their own delivery sessions. Partner landing redesign belongs to apps/clients and must preserve provider attribution.

### 8. Deploy and qualify the production candidate

1. Start from the integrated non-main branch, sync current main, run existing package checks from the repository root (pnpm --filter @vantage/main-site lint, typecheck and build via the package scripts). Run the existing quote, service-registry and analytics contracts on the integrated revision. Use the approved Preview environment for the build that reads backend content.
2. Commit and push the integrated source; open or update its review PR. The Main Site Preview GitHub Action handles matching non-main pushes and PR events. Native Vercel Git deploys are disabled. Top-level docs alone do not trigger that workflow. Check path filters if CI does not run. Record branch SHA, CI build SHA, successful workflow URL, immutable deployment URL, stable review alias and isolated API revision. Verify the alias points to this build.
3. Verify Preview API origin, protection, noindex and no production side effects using the existing environment contract. Submit a uniquely labeled synthetic quote through the deployed UI. Check leadCaptured, one resulting preview Form Lead with main_site attribution, zero matching production records and expected preview analytics receipts. Test invalid/retry paths without counting an unsuccessful request as a captured lead.
4. Walk the published journey at phone and desktop widths and in both languages. Exercise keyboard, zoom, media fallback, source links, guide fallback, back navigation and all service CTAs. Record screenshots, failed cases, fixes and retests. Review broker wording, translations, rights/provenance, factual sources and speed against the baseline. Hand the Owner a stable URL and a short reproducible review path.
5. Record the Owner’s production decision against the reviewed source. When selected, merge that source to main and let Main Site Production rebuild with production settings. Verify public routes, metadata, indexability and runtime configuration. Use the known-good production deployment and matching source revision for rollback if needed. Never assign the isolated Preview artifact to the live domain.
