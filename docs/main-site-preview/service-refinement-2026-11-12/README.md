# Service-page and quote refinement — November 12, 2026

The next outcome is Owner review of a smaller quote experience and complete service pages. This milestone implements the Owner’s latest feedback and the independently actionable destination-resource foundation. Publication and production selection remain separate decisions.

## Starting state

Verified clean branch `agent/main-site-optimization`, HEAD and remote draft PR #4 at `004274112ad34327499b3395cf32330a3595e5ef`. Vercel inspection confirmed the stable alias pointed to READY preview deployment `dpl_HmYiC1iDGhgSAQkeoJ1zp4M4zjaC`, application source `cd462dad2e3ec9d015f787ca42f44b8a862f6323`. Later baseline commits were evidence-only.

## Implemented for review

- Shared quote wizard: Contact → Location → Details → Quote. The final step reviews the request and optional SMS consent. Nothing is submitted before the final action. The API schema, source, LID, reference, attribution and explicit capture-success rule are preserved. Existing one-hour session drafts migrate without losing attempt identity, contact values, false consent or confirmed destination. All field groups are validated again before final submission.
- Home and all eight bilingual service heroes use the compact wizard. Service headings are shorter; field spacing and saved-progress help reduce clutter. Existing imagery, focal positioning and proof row remain.
- All service pages have tailored supporting sections, the published-review component (with its honest empty state), interactive map, full eight-service grid and service-specific expandable FAQs. Questions move from repeated prose into the FAQ area. The map is planning context, not a coverage or office claim.
- The referral-logo strip cycles again, with pause/resume and reduced-motion support. The three identity/written-details/telephone cards remain naturally below it. Logos are referral channels, not press endorsements.
- Long-distance pricing presents the supplied route/range/transit table **only in explicit preview mode**, identifies its third-party provenance and limits, adds cost drivers and practical comparison guidance, and links Vantage’s cost guide and quote. It makes no promise of binding estimates, carrier bidding or delivery timing.
- Destination resources now have a central country/state/city registry. Confirmed Places identity selects city → state → generic. Link resolution applies publication gates and requested-locale → English fallback at each level. Wisconsin/Madison remain the only destination pilots; no new routes or attribution IDs, mass pages or backend changes. D.C. and territories remain separately scoped.

## Reference and claim decisions

Read the Owner-supplied [interstate](https://safeshipmoving.com/services/interstate-moving-services/) and [long-distance](https://safeshipmoving.com/services/long-distance-moving-services/) pages on November 12 with Firecrawl. Receipts: `01a1d178-4da6-73aa-873f-e9ef7b10b5ef` and `01a1d178-5759-729a-80f7-ea6c676c1dd8`. Local reference snapshots are ignored under `.firecrawl/`.

The reference establishes the four-part form and section sequence. It does not substantiate Vantage’s rates, delivery windows, nationwide availability, number of carriers bidding, guaranteed estimate type, tracking, claims advocacy, discounts or awards. The supplied numerical examples are reference material for Owner review, not Vantage prices. Production hides the numerical table until an independently authorized implementation with defensible scope. The original options comparison remains useful without those figures. No competitor customer reviews, imagery or article prose were copied.

The earlier 50,000 Owner-supplied preview count and dated BBB customer-review snapshot retain their recorded limits. All editorial entries and proposed illustrations remain drafts. Spanish wording and all numerical/publication claims still need review.

## Verification

- 50 Main Site unit/contract/publication tests passed, including draft migration and destination country/state/city and publication boundaries.
- Workspace lint and typecheck passed; two unchanged partner-app lint warnings remain.
- Local quote regression passed at 320/390/1440px: contact validation, no early POST, city/state/generic selection, guide/back, locale/reload, false consent, identical retries after HTTP 200 with capture false and HTTP 503, explicit capture success and draft clearing. The two homepage forms preserve the active attempt. Every quote/Places response was mocked; no Lead or call was created.
- Existing responsive/navigation/resource suite: 878 local checks, zero failures. Final deployed qualification and exact source mapping are recorded below when available.

The existing isolated backend attribution and Booking/Cancellation qualification remains tied to the prior milestone. This revision does not claim fresh real captures or analytics dashboard receipts.

- Focused service/strip checks: 349 passed, zero failures. Both languages/all eight services at 1440/390/320px include the full grid, reviews, map, FAQs, three contact fields, compact card and no horizontal overflow. Earlier harness errors counted decorative SVG icons as maps and carried reduced-motion mode into the next locale; both selectors/state were corrected. The Spanish heading was shortened after its 320px height exceeded the target.
- Genuine Chromium 200% browser zoom now qualified locally via `chrome.tabs.setZoom(2)`: unchanged 1440px viewport, `devicePixelRatio` 1 → 2 and `innerWidth` 1440 → 720. No horizontal overflow; form remains editable. This closes the earlier unsupported-zoom-tool gap for Chromium on the representative long-distance page, not every browser/device.
