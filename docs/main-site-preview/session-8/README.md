# Integrated preview review

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

The same receipt shows ordered local preview diagnostics: intentional start → progression → submit attempt → one confirmed capture, with bounded page/service/locale dimensions. Preview collectors remain disabled. This proves browser diagnostics, **not** analytics dashboard receipt or Booking attribution.

Local integration checks passed: 27 Main Site contracts, 5 Clients contracts, 2 shared API-environment tests, Main Site lint/typecheck/build and Clients/shared-UI typecheck. The approved-preview build generated 56 static entries. Local browsing covered 44 routes at 1440/390/320px, 172 internal targets/fragments, language alternates, keyboard navigation, print, guide return, draft persistence, false consent, retry and capture semantics. Process checks covered keyboard focus, no autoplay, reduced motion, deferred images, fixed layout and no-JavaScript reading. These are viewport-emulated Chromium checks, not physical-device or field performance measurements.

[Deployed route audit](evidence/deployed-route-audit.json) separately records the final deployed pages, three widths, noindex, canonical URLs, document languages, useful 404s and no-JavaScript reading. The first audit asserted a `www` canonical incorrectly; the site consistently uses its established `https://vantagehomemovers.com` canonical. The corrected audit checks exact paths against that existing origin.

## Remaining decisions and boundaries

- Owner review of all EN/ES entries and selected images; authoring and source checks are not approval.
- Owner production selection against a reviewed source, followed by a fresh Production build. Never promote this isolated Preview artifact to the live domain.
- Analytics destination/dashboard qualification and authoritative Booking joins remain separate; no collector receipts are claimed.
- Optional pickup geolocation is not offered. Manual ZIP entry works; no denied-geolocation test is claimed.
- Images were generated with ChatGPT Images; a specific GPT-6 Astra authoring identity is not verified. Historical bundled consumer PDFs are labeled by edition and link to maintained official guidance.
- Existing publishing, server/Admin Booking controls and partner redesign are separate from this Main Site preview.

The [qualification runbook](qualification-runbook.md) preserves safe readback/recovery instructions. A persisted attempt journal prevents accidental duplicate qualification submissions.
