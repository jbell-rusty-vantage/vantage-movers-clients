# Integrated preview review

**Latest visual review candidate: `1dd5b3188428ffb340ce02a5138de196a3f69e82`.** [Owner feedback revision](../owner-feedback/README.md) adds Services hover cards, split service heroes, fuller service layouts, military appreciation, a bilingual footer and referral trust grid. Its CI build and deployed read-only route/menu/layout checks passed; the stable alias is verified. This is the current Owner review handoff. No new quote was submitted; the capture/geocoding receipts below retain their original source identity.

**Prior capture-qualified candidate: `76b9a8671f855391c17c01a72305e5def32dc5a3`.** The stable alias now includes optional pickup-location suggestions, with [live reverse-geocoding proof](evidence/pickup-location/live-provider.json), eight [deployed bilingual fallback/confirmation cases](evidence/pickup-location/results.json), and an exact-source [isolated quote capture](evidence/geolocation-20261112/deployed-ui-qualification.json). [Current deployment identity](evidence/geolocation-20261112/deployment.json) records successful CI and the verified alias. All 37 Main Site contracts, lint and typecheck passed. Actual 200% browser zoom and Owner review/production selection remain open.

**Earlier telemetry-qualified source: `10ec4d24e6f816d4540c2314aad93e52ee795e69`.** The [analytics qualification](../session-7/analytics-qualification.md) closes the dashboard gap for that source: native-browser capture, one remote capture event, both locale properties, performance samples and empty matching Production queries. Its [deployment receipt](evidence/analytics-native-20261112/deployment.json) is historical. Telemetry contracts/components and quote API/client code are unchanged in the current source; those receipts are retained as prior evidence, not relabeled as a fresh dashboard session.

The current quote reference `MS-20261112-B8903E0AA2-PREVIEW-1794498978452` saved preview Lead `6af5e1a5ef3cfb8486845818`: one preview record, zero production matches, Main Site attribution, false submitted SMS consent, CRM posting disabled and zero scoped Lead Messages/Sheet Sync entries. This was the fourth distinct synthetic qualification Lead across the upgrade; no historical submission was replayed. The location tests used synthetic public coordinates and mocked permission callbacks, never the operator's device location. The real deployed lookup returned Madison, WI 53703 with `private, no-store`; no Google account/service setting changed.

The Main Site upgrade is ready for Owner review at [the protected optimization preview](https://vantage-main-site-optimization.vercel.app). It contains all eight services in English and Spanish, three preparation resources, Wisconsin/Madison destination guides, linked navigation, the visual process sequence and a quote draft that survives guide visits, reload and language changes. The next decision is approval or corrections to the actual content, Spanish wording and media; production selection is separate.

Text is versioned in `apps/main-site/src/content/editorial`; optimized images are in `apps/main-site/public/images/preview`. The Owner designated themselves reviewer and confirmed that the publishing pipeline already exists. This preview does not create another Blob/editor pipeline. All 26 locale entries remain drafts and are excluded from production publication until approved.

## Review path

1. Open the homepage and use Services → Long-distance moving.
2. Open the estimate comparison worksheet and its printable version.
3. Enter moving details, visit a preparation guide, return and switch language; the quote draft should remain.
4. Review Locations → Wisconsin → Madison, then the Spanish counterpart.
5. Review the other services, process images, Contact and existing-customer/carrier paths.

Use fictional contact details if submitting in this preview. The isolated API cannot create production records. The automated qualification below already created the planned synthetic Lead; repeating it is unnecessary for content review.

## Deployment identity

Final navigation source: `748b2a39b3a0dfed735f8ac0326dbaddcae1c3f5`. Integration source: `b37f4d1ce30369494e600bc32167b62c5e737319`. Draft [PR #4](https://github.com/jbell-rusty-vantage/vantage-movers-clients/pull/4) targets main `145a4dd6efa699c58c5bc8017a086e8b3d5acf87`.

The first integrated CI build failed in Next 16.3.3's Google Manrope font resolver (`next/font/google queries have exactly one entry`). Bundling the official variable font and OFL license locally repaired it, retaining the font and weights. Source `4dd2806a66dee939d8ddf7ec49ad8110941e39a1` passed [Main Site workflow 43246465076](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43246465076). CI built test-merge SHA `4b8756ff865916d599e9d5aea1fcb38170a06369`, deployed as `dpl_2Luq1exCp46NPfYbEcnJSZmr4Fzt`, immutable [qualification build](https://vantage-movers-clients-main-site-bpqnaxwaa-vantage-4d3db9ef.vercel.app).

The subsequent source change only connects the two homepage feature links to their service articles. Quote UI, API route, API client, attribution, consent, Places and telemetry code are unchanged from the captured build. The final build and alias receipt are recorded in `evidence/deployment.json`; the real submission receipt explicitly retains its original deployed source, rather than claiming another submission happened.

The isolated API alias is `https://vantage-sites-preview-api.vercel.app`, verified READY as `dpl_Huhbr2877phW8DMMSHdE4e1NzYmy` / `vantage-sites-preview-nld3k1rla-vantage-4d3db9ef.vercel.app`. Its previously documented source is `67484849`; Vercel metadata did not independently expose that SHA. Current read-only preflight verifies database `testvantagemovers_sitepreview`, fixture reads, invalid-auth 401 and restricted-route 404.

## Qualified behavior

[Deployed UI receipt](evidence/deployed-ui-qualification.json) records exactly one quote POST, HTTP 200, `leadCaptured: true`, visible confirmation and real Places destination confirmation. Exact reference `MS-20261112-ADE8167265-PREVIEW-1794496865501` produced preview Form Lead `6af5d966a90d789431eb21ec`: preview count **1**, production exact-reference count **0**, Source Company `main_site`, site `vantagehomemovers.com`, LID retained, Studio size retained, consent submitted false, persisted `post_to_granot: false`, zero scoped Lead Messages and zero Sheet Sync entries. No production submission occurred. These are bounded readback facts, not inferred CRM/messaging response fields.

That initial receipt shows ordered local preview diagnostics: intentional start → progression → submit attempt → one confirmed capture. At that revision, Preview collectors were disabled. The subsequent current-source native-browser qualification linked above establishes actual dashboard receipts; neither establishes Booking attribution.

Local integration checks passed: 27 Main Site contracts, 5 Clients contracts, 2 shared API-environment tests, Main Site lint/typecheck/build and Clients/shared-UI typecheck. The approved-preview build generated 56 static entries. Local browsing covered 44 routes at 1440/390/320px, 172 internal targets/fragments, language alternates, keyboard navigation, print, guide return, draft persistence, false consent, retry and capture semantics. Process checks covered keyboard focus, no autoplay, reduced motion, deferred images, fixed layout and no-JavaScript reading. These are viewport-emulated Chromium checks, not physical-device or field performance measurements.

[Deployed route audit](evidence/deployed-route-audit.json) separately records the final deployed pages, three widths, noindex, canonical URLs, document languages, useful 404s and no-JavaScript reading. The first audit asserted a `www` canonical incorrectly; the site consistently uses its established `https://vantagehomemovers.com` canonical. The corrected audit checks exact paths against that existing origin.

## Remaining decisions and boundaries

### Matched loading comparison

[Raw loading evidence](evidence/analytics-native-20261112/loading-comparison.json) compares the live production control and source `10ec4d2` in fresh Chromium contexts, at DPR 1 with reduced motion, no throttling and five seconds after load. Each cell is one sample; CDN warmth and API content differ. This establishes a reproducible comparison, not a statistical speed improvement or field performance score.

| Width | Control / preview hero encoded bytes | Control / preview LCP (ms) | Control / preview layout shift |
|---|---:|---:|---:|
| 1440 | 66,460 / 76,872 | 3,648 / 476 | 0.0081 / 0.0675 |
| 390 | 15,666 / 21,054 | 708 / 516 | 0.0533 / 0.0636 |

Both heroes loaded, all pages returned 200, and neither page overflowed or raised an uncaught browser exception. The selected hero delivers more bytes and the preview had more layout shift in these samples. The much smaller source WebP file therefore must not be described as a network-transfer reduction. Reproduce with `compare-deployed-loading.mjs` using the exact preview environment described in the qualification runbook; it blocks quote and telemetry POSTs.

### Open review and qualification

The current deployment also passed all ten [process checks](evidence/analytics-native-20261112/process/process-checks.json): EN/ES phone and desktop controls, retained keyboard focus, reduced motion, deferred frames, no autoplay, fixed image dimensions, phone no-JavaScript reading, simulated image-failure fallback and useful 404s. [English phone fallback](evidence/analytics-native-20261112/process/en-390-image-fallback.png) and [Spanish desktop sequence](evidence/analytics-native-20261112/process/es-1440-carrier.png) are captures from this exact deployment. No quote was submitted by these checks.

- Owner review of all EN/ES entries and selected images; authoring and source checks are not approval.
- Owner production selection against a reviewed source, followed by a fresh Production build. Never promote this isolated Preview artifact to the live domain.
- Analytics dashboard delivery and Production exclusion are now qualified. Authoritative Booking joins remain separate.
- Optional pickup geolocation is implemented and deployed. Denial/failure/confirmation behavior passed with controlled browser callbacks; a real provider lookup passed separately. Actual device-location accuracy is not claimed.
- Actual 200% browser zoom remains unverified. The embedded browser's zoom shortcut did not change its measured viewport or device pixel ratio. Existing 320px responsive tests are not a substitute for that proof.
- Images were generated with ChatGPT Images. A new explicitly selected [GPT-6 Astra phone proposal](../session-5/astra-review/README.md) was generated and compared in both actual mobile layouts; it was not selected because copy obscured faces. Earlier six-scene authorship is not retroactively attributed to Astra. Historical bundled consumer PDFs remain labeled by edition with official current guidance links.
- Existing publishing, server/Admin Booking controls and partner redesign are separate from this Main Site preview.

The [qualification runbook](qualification-runbook.md) preserves safe readback/recovery instructions. A persisted attempt journal prevents accidental duplicate qualification submissions.
