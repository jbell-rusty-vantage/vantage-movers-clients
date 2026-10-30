# Main Site variation review

Only source merged to `main` is eligible for the existing Production workflow. Preview builds use the isolated website API and must be rebuilt with Production settings when selected.

| ID | Purpose | Branch | Review URL | Owner decision |
| --- | --- | --- | --- | --- |
| service-expansion | Existing localized service-page proposal | `agent/main-site-service-expansion` / PR #2 | https://vantage-main-site-service-expansion.vercel.app | Not approved; Spanish legal/schema gates remain open |
| main-site-a-route | Owner-selected Claude Design A Route homepage | `agent/main-site-a-route` | https://vantage-main-site-a-route.vercel.app | Preview requested; production selection pending |

## A Route maintenance

The A Route homepage is composed from native React sections in `apps/main-site/src/components/a-route/`. Its copy and media slots live in `apps/main-site/src/content/a-route.ts`; extracted local assets live in `apps/main-site/public/a-route/`. The original design input remains `site_variations_preview_HTMLS/Vantage Preview · A Route.html`. The existing quote wizard, server-only API client, validation, legal pages and Source Company attribution remain the intake boundary.

Pushing application changes to `agent/main-site-a-route` runs the Main Site Preview workflow. Its explicit branch mapping updates the stable A Route review URL after deployment; the GitHub run also records the immutable deployment URL and deployed SHA. PR runs may deploy GitHub's test merge SHA rather than the branch head: record both when reviewing.

## Environment selection

In the Main Site Vercel project's **Settings → Environment Variables**, values are scoped to Preview or Production. Preview can also have branch-specific overrides. Changing a value requires a new deployment. The browser posts to the website's own `/api/quote`; the server-only API client uses these settings:

| Variable | Preview | Production |
| --- | --- | --- |
| `VANTAGE_API_BASE_URL` | `https://vantage-sites-preview-api.vercel.app` | `https://vantage-movers-main-server.vercel.app` |
| `VANTAGE_API_SECRET` | Unique preview API secret | Existing production API secret |
| `VANTAGE_API_PROTECTION_BYPASS` | Preview API automation bypass | Unset |
| `FORM_LEAD_ROUTE` | `api/v1/form-leads` | Preserve existing production configuration |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Places-enabled credential | Existing production Places credential |

Never prefix these with `NEXT_PUBLIC_`. CI injects Preview API settings for the build, while Vercel's Preview environment supplies runtime settings. Both must agree. The preview origin guard rejects a live API origin when `VERCEL_ENV=preview`.

## Promotion

1. Review the stable URL and record approval against its deployed SHA and immutable URL. Reconcile with current `main`, then rerun checks and preview verification if source changes.
2. Merge the approved branch's source into `main` through a PR. Native Vercel Git deployments are disabled here: GitHub Actions owns deployment, so changing Vercel's production-branch setting alone does not change this repository's pipeline.
3. The Production workflow rebuilds with Production variables and deploys to the Main Site project's production domains, including `vantagehomemovers.com`. Do not promote or alias the prebuilt Preview artifact onto the production domain.
4. Verify production pages, read-only API content and analytics configuration. Synthetic Production Form Leads require explicit owner authorization.
5. Roll back through a revert and Production rebuild, or a verified previous Production deployment. Record the last known-good Production SHA before release.

Vercel also supports choosing a Production Branch and assigning domains to preview branches with native Git integration. This repository intentionally uses Actions plus an explicit preview alias; keeping `main` as the release branch makes selection, history and rollback straightforward.

## Evidence

October 30, 2026 (America/New_York): [draft PR #3](https://github.com/jbell-rusty-vantage/vantage-movers-clients/pull/3). Application source `c6c9861643cdb9fff020c2aab1f0aa0409038bb8`; [immutable Ready Preview](https://vantage-movers-clients-main-site-84szk0ayw-vantage-4d3db9ef.vercel.app). Follow-up `184fd1c` explicitly scopes automatic alias updates to the Vantage team; it does not change application behavior. The stable review URL follows subsequent successful branch deployments and requires Vercel authentication.

- Frozen install, main-site lint/typecheck, two preview-origin tests, five quote/analytics tests and optimized build passed. CI repeated these checks successfully before deployment.
- Local browser QA at 1440px and 390px: no horizontal overflow or page errors; empty-form validation, date picker (past days disabled), ZIP autocomplete, progression to contact details, keyboard FAQ and Services disclosure passed. ZIPs 33426 and 78701 resolved through HTTP 200 autocomplete. The inherited UI resolves locations from autocomplete and does not invoke the separate Places details endpoint; that endpoint was not browser-qualified.
- The deployed Preview's own `/api/quote` returned 200 / `leadCaptured:true` for synthetic reference `PREVIEW-A-ROUTE-20261030-2108`; empty input returned 400. Test lead `6ae5071ab4741aaf64a70ce3` read back through the Preview API (200), Source Company `main_site`, site `vantagehomemovers.com`, LID `LID6ae50500000ab`, size `2 Bedrooms`, nonduplicate, `post_to_granot:false`. Exact-reference Mongo counts: `testvantagemovers_sitepreview` = 1, `vantagemovers` = 0. No Production Form Lead was submitted.
- Same-runtime isolated API smoke reference `PREVIEW-1793394088193`, lead `6ae505a7b4741aaf64a70cdb`, returned CRM `skipped` and messaging `not_requested`; exact-reference counts preview = 1 / production = 0. API identity/content/auth/forbidden-route checks passed. API origin `https://vantage-sites-preview-api.vercel.app`, runtime server SHA `67484849` (see prior handoff).
- Preview homepage has `X-Robots-Tag: noindex`, robots disallows `/`, and unauthenticated review access redirects to Vercel login. Protection remains enabled.

A working build or successful analytics network request does not establish dashboard receipt or full release qualification. Analytics dashboard delivery/exclusion, exhaustive browser/device QA, and Owner approval against the reviewed revision remain open before Production selection. No Production deployment or production-domain assignment was performed for A Route.

Analytics retains existing event names and adds `variation_id`, `app`, `environment`, `page`, and `locale`. Only `/` is tagged `main-site-a-route`; other routes retain baseline identity. The root layout publishes the public environment on `<html>` and analytics reads it at event time. Filter by `environment=production` when examining released traffic; dashboard receipt and exclusion of preview traffic still require account-level verification. Each quote placement has a distinct form ID; the inherited wizard records its first step on mount even if the lower placement has not been scrolled into view.
