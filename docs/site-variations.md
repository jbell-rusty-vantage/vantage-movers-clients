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

Deployment and qualification evidence is appended here once the A Route preview is Ready. A working build or successful analytics network request does not establish dashboard receipt or full release qualification.

Analytics retains existing event names and adds `variation_id`, `app`, `environment`, `page`, and `locale`. Only `/` is tagged `main-site-a-route`; other routes retain baseline identity. The root layout publishes the public environment on `<html>` and analytics reads it at event time. Filter by `environment=production` when examining released traffic; dashboard receipt and exclusion of preview traffic still require account-level verification. Each quote placement has a distinct form ID; the inherited wizard records its first step on mount even if the lower placement has not been scrolled into view.
