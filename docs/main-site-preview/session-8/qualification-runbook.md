# Deployed preview qualification

The integrated deployed UI has now passed one synthetic capture and exact-reference readback: see the [release evidence](README.md) and [deployed receipt](evidence/deployed-ui-qualification.json). Do not rerun the submission command: the attempt journal is retained and the script refuses another attempt. The current [API preflight](evidence/api-preflight.json) passed on November 12, 2026: isolated database identity, published synthetic content reads, invalid-auth 401 and restricted-route 404. The preflight itself performed zero writes.

The [historical readback](evidence/historical-readback.json) verifies tooling against the already documented `PREVIEW-SITE-20261030` record: one preview Form Lead, zero exact-reference production matches, Main Site attribution, stored `post_to_granot: false`, no scoped Lead Message and no Sheet Sync entry. It does not qualify a November 12 build. A separate never-submitted sentinel reference also returned preview=0 / production=0, proving that the pre-submit count check can run.

## Read-only checks

```powershell
node docs/main-site-preview/session-8/preview-qualification.mjs
node docs/main-site-preview/session-8/preview-qualification.mjs --readback MS-EXACT-SYNTHETIC-REFERENCE
```

The helper reads the approved ignored sibling `vantage-movers-clients/.env.site-preview` in memory. It checks Preview mode, the exact isolated API origin and Form Lead route before any request. Only server-side GETs use API credentials. `SITE_PREVIEW_ENV_FILE` can point to another approved preview-only file. It never loads that file into the browser or prints its contents.

For exact-reference counts it reads only the documented `MONGO_URI` and optional `MONGO_DNS_SERVERS` from the sibling server's ignored `.env`, with an optional `SITE_PREVIEW_SERVER_ENV_FILE` override. The Mongo code uses read-only equality queries, a bounded result projection, one connection and query time limits. It does not import application models, initialize indexes or execute mutations. Production access is count-only for the supplied synthetic reference. Preview API readback uses the single verified synthetic ID; no list-all route is used.

## One deployed UI quote

After CI qualifies the immutable deployment and its Preview configuration, provide these process values through the approved local environment (never commit credentials):

- `SITE_PREVIEW_URL`: immutable Main Site preview origin, or the approved optimization review alias. Live domains and other projects are refused.
- `SITE_PREVIEW_SOURCE_SHA`: the full source revision tied to that deployment.
- `SITE_PREVIEW_BYPASS`: site-specific Vercel protection bypass, **not the API bypass**, or `SITE_PREVIEW_STORAGE_STATE`: an authenticated site-only Playwright storage-state file kept outside tracked files.

Then run:

```powershell
node docs/main-site-preview/session-8/qualify-deployed-ui.mjs --submit-one-preview-quote
```

This command intentionally creates one synthetic preview Form Lead. It first repeats API isolation checks, requires anonymous site protection and noindex, fills the actual deployed wizard, validates the synthetic payload and checks that the exact reference does not already exist in either database. It sends exactly one `/api/quote` POST through the site. Additional POSTs and browser access to the backend/third-party origins are blocked. Site protection credentials are attached only to same-origin site requests. API and Mongo credentials remain in Node.

It records an attempt journal **before** the POST reaches the site, then requires HTTP 200 with `leadCaptured: true` and visible confirmation. It captures desktop/phone screenshots and proves exactly one resulting preview Form Lead, zero matching production records, Main Site attribution, retained LID/move size, disabled persisted CRM-posting flag and no scoped Lead Message. It uses the real deployed Places endpoints and reports whether destination confirmation was available; manual ZIP entry is allowed when lookup fails.

If the command fails after an attempted POST, **do not submit again**. Recover using the exact reference in `evidence/deployed-submission-attempt.json` and the read-only helper. A failed response or readback does not establish that no Lead was saved.

The website response intentionally exposes no backend CRM/messaging status. Evidence reports the persisted posting flag and scoped record counts, plus the preview app's documented startup boundary; it does not invent missing response receipts. Consent is submitted false. Local mocked retry tests separately prove that false consent and IDs survive failure.

Preview analytics collection is disabled by the integrated measurement boundary. This script blocks collector requests and cannot establish analytics dashboard delivery. Owner design/content/Spanish review, media approval and production selection remain separate decisions.
