# Measurement and companion workflow boundary

November 12, 2026. Implemented on `agent/main-site-optimization`, Main Site only. The nearest proof still needed is the deployed bilingual journey with one confirmed isolated Form Lead, followed by a separately qualified analytics destination. Local diagnostics are not dashboard receipts or Booking attribution.

## Implemented measurement

`SiteTelemetry` mounts the existing Vercel Analytics and Speed Insights SDKs only when the server passes `enabled` for the Production environment. Preview and local sessions do not load either SDK. Their custom events stay in a bounded, in-memory `window.__vantagePreviewEvents` buffer (last 100 events) and the local `vantage:analytics` browser event. Nothing forwards that buffer to a remote service. This makes browser assertions possible without adding owner review traffic to production reporting.

All custom events pass through `analytics-contract.ts`. Existing event names are retained, but arbitrary event names and dimensions are rejected. Each event has exactly two properties:

| Property | Meaning |
|---|---|
| `context` | Fixed variation `main-site-optimization`, production/preview, allowlisted public page ID and locale, separated by `|` |
| `detail` | Only bounded form step, field name, error category or placement code; otherwise `none` |

The page ID also identifies a service where applicable. The locale comes from the visited public route, not a submitted field. Unknown paths become `other`. URLs sent by automatic pageview/Web Vitals SDK hooks must resolve to an allowlisted public path; query strings and fragments are removed. No itinerary, ZIP, contact details, arbitrary link text/href, quote reference, LID or session ID is included in custom events. The small path allowlist is a privacy boundary; adding a public registry route requires a corresponding allowlist entry and contract test.

`phone_clicked` is intent only. It does not create a Call Lead or establish capture. The wizard owns first intentional interaction, step progression and `form_submit_success` after the site's API explicitly reports `leadCaptured: true`. A successful estimate calculation is not capture. Analytics and session-storage failures cannot throw into form submission. Existing bounce/engagement event names remain optional session-derived diagnostics and do not establish a Lead outcome.

Two packed properties avoid assuming a higher custom-event property allowance, but do not qualify the account plan, dashboard visibility, filters, retention or receipt. Preview collection remains deliberately local until a separate preview destination or independently verified exclusion is configured. Do not enable remote preview collection by reusing the production switch.

## Checks and remaining proof

Focused tests cover sensitive-property removal, locale/service identity, unknown event/path rejection, URL query stripping, local-only preview delivery, bounded diagnostic memory, phone intent without a capture event, and SDK/storage failure isolation. The integration session owns build/lint/typecheck and browser evidence on its final revision.

Executed: `pnpm --filter @vantage/main-site exec vitest run --config vitest.unit.config.mts src/lib/analytics.test.ts src/lib/analytics-contract.test.ts` (7 tests passed, including coverage of all 26 localized editorial entries), and focused ESLint on the measurement modules, tests and helper component (passed). A mid-integration typecheck encountered stale generated route types and the not-yet-written editorial index; it is not a final qualification result.

## Baseline claim cleanup

The integrated preview also removes unsupported baseline claims that would otherwise undermine the new editorial review gate. `content.ts` no longer contains randomized move-count ranges, a 51-region coverage total, climate-controlled-storage or open/enclosed availability assertions, blanket binding/not-to-exceed or no-hidden-fee promises, unverified review totals, military weight-ticket promises, or unsourced seven-day/$250 date-change terms. The replacement asks customers to confirm route availability, included services and written shipment terms. Existing business contacts, address, USDOT and MC identifiers are preserved from the baseline; this is not a fresh registration audit.

The destination map explicitly represents planning interest, not coverage or a selected quote destination. The homepage structured data uses `Organization` with the broker disclosure and removes unsupported aggregate ratings, price range and nationwide `areaServed`. The trust band retains the broker identifier without manufacturing a five-star rating or an additional bonded assertion.

`GetInTouchSection` no longer renders the fabricated Marcus C. fallback or a static 4.8/530-review aggregate. Its featured snippet requires a published testimonial from the API; absent content renders no endorsement. Testimonial stars use a valid supplied rating with an explicit numeric label; absent or invalid ratings are not defaulted to five. "Verified" labels were removed because a published flag alone does not prove independent verification. The quote panel also receives publication-gated guide links. Focused ESLint for these modified baseline components passed; the owning integration session performs the rendered comparison.

Outstanding deployment qualification: deployed API response, isolated database record/readback, zero matching production records, runtime environment/protection/noindex, and browser event order. Outstanding analytics qualification: approved preview destination or verified exclusion, actual dashboard receipts for the corresponding event sequence, the account plan and dimensions accepted there. This work does not claim those receipts.

For production outcome reporting, the server must own an approved bounded attribution snapshot and authoritative join from a Form Lead to the official Booking/Cancellation. A service page visit is reading interest, not a purchased service. Source Company stays `main_site`; do not use variation ID as Source Company, LID or Tracking Reference. RingCentral qualification continues to govern Call Leads. Partner attribution stays in `apps/clients` and its existing server contract.

## Moving assistant prototype

`components/resources/MovingAssistant.tsx` offers three preset, bilingual questions: who transports, how to compare estimates and how to prepare the inventory. Each answer links to the official FMCSA source and offers the existing Vantage phone contact. It is a bounded source-linked interface: no model, free-form inference, shipment lookup, price promise, scheduling promise or customer-data access. The component is ready for the resource template; integration and rendered evidence are reported by the owning session. Spanish and commercial review remain the same publication gates as the surrounding drafts. Do not describe this as an integrated AI assistant.

A later model-based assistant would retrieve only versioned reviewed entries and their source records, cite them, distinguish general guidance from shipment-specific questions, and hand those questions to a verified Vantage recipient. The server owns any authenticated shipment lookup. Model selection, data retention, tool permissions and live support routing need their own delivery session.

## Owner publishing scope

The current preview reads static content and selected assets from the repository. No Admin upload, publish or restore action exists in this change. A separate Admin/server delivery should implement the following lifecycle against stable content IDs and per-locale review state:

1. Upload a file to a server-owned asset record with original, dimensions, format, byte size, provenance, rights and safe crop.
2. Place that asset on a draft entry without changing its published revision. Validate alt text, mobile crop and localized metadata.
3. Preview the exact draft revision with the Main Site's existing template and registry rules.
4. Record the responsible review, then publish an immutable revision through a server-owned command. The public site serves only published snapshots and retains its last good snapshot during editor outages.
5. Restore a selected earlier revision through another recorded command; keep referenced assets until no published/restorable revision uses them.

Owner clarification during this session supersedes the proposed new-pipeline scope: the Owner is the reviewer and says the publishing pipeline already exists. This preview keeps text in the registry and media in `public`; future storage integration should reuse that existing pipeline, not build another upload/editor system. Booking/Lead controls belong to server/Admin, and a partner landing redesign belongs to `apps/clients`; neither is represented as completed by this preview.
