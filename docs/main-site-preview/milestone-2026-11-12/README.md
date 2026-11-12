# Main Site implementation milestone — November 12, 2026

The independently actionable service/resource candidate and bounded website attribution are implemented and qualified in isolated preview. The next outcome is Owner review of the actual EN/ES content and illustrations, followed by separate production design selection. This closes engineering readiness for the requested milestone; it does not finish the five-stage roadmap or approve publication.

[Review preview](https://vantage-main-site-optimization.vercel.app) · [Main Site draft PR #4](https://github.com/jbell-rusty-vantage/vantage-movers-clients/pull/4) · [Server draft PR #222](https://github.com/jbell-rusty-vantage/vantage-movers-server/pull/222) · [Owner outcome report](OWNER-OUTCOME-REPORT.md)

## Checkpoint and checklist

- Verified clean site branch `agent/main-site-optimization` at `1b692d1`; remote is `jbell-rusty-vantage/vantage-movers-clients`.
- Verified clean server checkout; reused `agent/site-preview-api` and merged current `origin/main` (`6aaf3bda`) before implementation so the isolated API retains current domain protections.
- Already qualified on earlier source: hover/mobile navigation, 16 service routes, quote draft and capture semantics, isolated API, Preview analytics destination. Earlier receipts are not evidence for changed attribution code.
- [x] Tailored service details/FAQs and replacement military/senior/storage media.
- [x] Six original bilingual resource drafts and real footer destinations.
- [x] Bounded attribution capture, server validation/storage and canonical outcome report.
- [x] Contract/privacy/failure tests, integrated preview deployment and exact-source isolated readback.
- [x] Browser journeys, publication gates, image/link checks; actual 200% zoom has a precise unavailable-proof record below.
- [x] Draft PRs, evidence and next-stage handoff. Broad server CI completed successfully.

## What changed

Every existing service has tailored preparation steps, a practical service-specific question and supporting media. New high-resolution military-family, senior-downsizing and storage-preparation illustrations replace the weak/reused selections. Full-frame images and localized illustrative captions avoid implying real Vantage customers, staff or facilities. [Media provenance](media/README.md) records GPT-6 Astra direction, prompts, generated sources, optimization and Owner approval state.

The three additional resources address moving costs, items to check before packing and moving paperwork. Together with the existing inventory, estimate-comparison and provider-role guides, there are six resources in EN/ES. The footer links the real archive and each guide. All 32 localized editorial entries remain drafts, including eight services and the two destination guides in each language. Production rendering/indexing remains publication-gated. The existing registry, static assets and Owner publishing pipeline are reused.

The server-owned wire contract is copied into the shared API client and checked by `scripts/check-website-attribution-contract.mjs`. Optional, 24-hour tab-session attribution preserves first/latest non-direct touch, page/content/locale and fixed design/campaign values. No visitor identifier, raw referrer/query, contact values or browsing-event database is added. Malformed tracking, denied storage, DNT/GPC and analytics failure do not block capture. Main Site, partner, LID, Tracking Reference and RingCentral Call qualification contracts remain intact.

The existing analytics module now reports Main Site Form Lead cohorts through canonical Booking/Cancellation relationships, JSON and CSV. It distinguishes unknown attribution, eligible/duplicate/bad Leads, current official outcomes, recorded amounts and missing values. No phone/job/sibling inference, historical backfill, new analytics platform or Admin UI was needed. [Server contract](https://github.com/jbell-rusty-vantage/vantage-movers-server/blob/agent/site-preview-api/docs/website-attribution/README.md).

## Qualification

- Main Site: 43 tests passed with the repository's unit config; workspace typecheck and lint passed. Lint retains two existing Clients warnings. Partner attribution and API-origin regression tests passed. CI repeated Main Site tests/typecheck and built/deployed the candidate.
- Server: 15 analytics/attribution/isolation tests plus three Admin route/scope tests passed. [Full CI](https://github.com/jbell-rusty-vantage/vantage-movers-server/actions/runs/43278205508) passed clean typecheck, lint, the complete test suite and quality tests at application source `5ba8164d`; local typecheck excluded only pre-existing ignored `ops/output` scratch. The normal report routes now derive from the validation schema, preventing the new report from being omitted from route registration.
- Disposable loopback Mongo proof exercised canonical Form Lead creation, identical command replay, nested attribution mutation/unset rejection, ordinary correction, Booking, Cancellation and actual report queries. [Synthetic outcome evidence](https://github.com/jbell-rusty-vantage/vantage-movers-server/blob/agent/site-preview-api/docs/website-attribution/evidence/local-replica.json). The first proof caught and fixed nested attribution mutation; same-day Florida Booking dates are correctly zero calendar days.
- Deployed navigation/service/footer checks: [220 checks, zero failures](evidence/deployed/results.json). Both languages and all 16 service routes were checked at 1440/390/320px, with image loading, overflow, hover/keyboard/mobile controls and footer targets. The harness now selects visible footers, excluding hidden streamed DOM copies.
- Deployed resource/media checks: [158 checks, zero failures](evidence/resources/results.json), covering all 12 resource routes at 1440/390/320px plus full-frame service media. Root visually inspected military/storage phone layouts, senior desktop, Spanish resource phone and Spanish footer captures. Images load without cropping heads; text and CTAs remain readable. Decorative illustration `alt=""` is intentional; adjacent captions provide context and disclose illustration status.
- Local [quote regression](evidence/quote/wizard-journey.json) passed at 390/1440: guide/back/reload/locale retention, destination disambiguation, false/failed/success response sequence, identical retry payloads, false consent and captured-draft clearing, including the existing two homepage forms. All quote/Places responses were mocked. Initial homepage attempts failed because the local Preview API base was missing; correcting the local-only base resolved it, without changing application behavior. The harness no longer rewrites a production image asset unless explicitly requested.
- One new [deployed synthetic capture](../session-8/evidence/attribution-20261112/deployed-ui-qualification.json), using Main Site `73b4d7c` and API `e94a27a6`: Spanish cost guide with the bounded review campaign → English resource → English Long-distance quote. One POST, HTTP 200, explicit `leadCaptured`, no browser exceptions. [Exact readback](../session-8/evidence/attribution-20261112/deployed-readback.json): preview count 1, production count 0, source/LID preserved, saved page/locale/campaign/design continuity, CRM posting false, no scoped Lead Messages or Sheet Sync entries. The report changed from nine unknown Leads to ten Leads with one attributed and nine unchanged unknowns. Do not replay this reference.
- Final API `5ba8164d` adds schema-derived Admin report registration, route/scope tests and runbook corrections; capture/schema/report implementation is unchanged from the one-shot proof. [Final-source readback](../session-8/evidence/attribution-20261112/final-api-readback.json) passed with zero further submissions: exact snapshot preserved, preview 1/production 0, ten cohort Leads/one known/nine unknown, report invalid-auth 401, general Admin/cron/list boundary 404. Its dedicated CI deploy repeated clean typecheck and focused route tests.

### Proof limits

Actual 200% browser zoom is **unverified**. The supported in-app browser exposed no actual zoom setting; the supported Ctrl-plus attempt left reported `devicePixelRatio=1`, visual viewport scale `1` and `innerWidth=757` unchanged. It is not accepted as zoom evidence. The 320/390px checks are viewport emulation, not actual zoom or physical-device testing. Native Firefox control previously lacked URL-policy support and was not bypassed. Owner browser review must close actual 200% zoom before production selection.

Earlier native Vercel Analytics/Speed Insights receipts remain tied to their original source in session 7. The new automated capture proves persisted attribution and diagnostic event order; Vercel excludes webdriver traffic, so it does not claim a fresh remote dashboard receipt. No campaign effectiveness, production conversion uplift or sales-cycle duration is inferred. Atlas credential-level database restriction remains the pre-existing administrator-dependent follow-up; runtime isolation and exact-reference production exclusion were verified.

## Next-stage handoff

1. Owner reviews the [preview](https://vantage-main-site-optimization.vercel.app), both languages, six resources, military appreciation and proposed images. Return corrections or approve specific entries/assets through the existing publishing workflow. Actual 200% browser zoom remains a release proof item.
2. Only after explicit production selection: integrate the server contract/report, perform a fresh production build and bounded release checks, then build the selected Main Site fresh with approved content. Do not promote test data or the isolated preview artifact. Draft content stays excluded until approved. Roll back to the previous production source if capture/isolation fails; do not retry ambiguous quote submissions.
3. Stage 2 still requires the chosen production design and production release proof. Stage 3 still requires reviewed publication, indexable approved URLs and the existing pipeline's revision/restore proof. Stage 4's operator/calendar/scorecard and any experiment, and Stage 5 expansion, are separate later work. No scheduled automation, paid tool, traffic assignment or growth campaign was enabled.

The stable Main Site alias is manually pinned to the recorded CI build. The isolated API alias follows its dedicated branch workflow. Later docs-only commits do not change the deployed application source; use [deployment identities](evidence/deployment.json), not HEAD alone, for receipts.

Workspace note: the app-created server worktree at `C:/Users/Pinda/.codex/worktrees/website-attribution/vantage-main-server` was initially delayed, so implementation used the verified clean server checkout. The app rejected archive with `The task's primary checkout cannot be removed.` The spare checkout is clean and detached at final API source `5ba8164d`; it contains no extra implementation. Local dev and disposable Mongo processes were stopped.

## Decisions and approval boundaries

Interstate and cross-country planning live within Long-distance; no duplicate thin service pages. Resources is the article archive; no fabricated news feed. White-glove scope, discounts, veteran ownership, Trustpilot metrics, completed-household counts and press logos are withheld pending evidence. Careers, a moving app and dedicated complaint intake need actual processes; the existing support/contact route remains available. Existing referral mark publication rights need Owner confirmation.

All EN/ES editorial entries and proposed illustrations remain drafts. Reuse the existing registry/static assets and Owner publishing pipeline. No new CMS, production backfill, ordinary Call creation, analytics platform, or campaign operation is authorized by this milestone.
