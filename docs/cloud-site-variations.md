# Cloud-agent brief: reviewable site variations

Owner instruction, October 30, 2026. Build a workflow where the Owner can review deployed variations, choose one, and promote its source to `main` with confidence that analytics and Form Lead ingestion still work. The current task prepares infrastructure and this brief; it does not implement design variations or an A/B testing platform.

## Read first

Read `AGENTS.md`, `.cursor/rules/project-organization.mdc`, `docs/site-preview-status.md`, and `docs/website-operations-proposal.md`. The older operations proposal is broader future work, not authorization to implement marketing, resources, paid tooling or A/B assignment now.

The server is a separate repository: `jbell-rusty-vantage/vantage-movers-server`. The preview infrastructure is on `agent/site-preview-api`, not server `main`. Read that branch's `AGENTS.md`, `CLOUD_AGENTS.md`, `docs/site-preview-api.md`, `docs/knowledge/environment.md`, and `docs/knowledge/services/form-lead.md`. Backend business rules stay there. Both apps use `packages/api-client`; shared UI is in `packages/ui`. Keep a variation's visual composition local to its app while preserving these boundaries.

## Starting branch and owner workflow

The only open variation PR at handoff is [draft PR #2](https://github.com/jbell-rusty-vantage/vantage-movers-clients/pull/2), branch `agent/main-site-service-expansion`: localized service-page expansion. It is not approved for production. Its Spanish legal/compliance review and schema approval gates remain open. Older `v0/*` branches exist; do not mistake them for current owner-selected variations or delete them without instruction.

Maintain a small committed variation register: ID, purpose, branch/PR, source SHA, deployment URL, API SHA/origin, test evidence, owner decision and promotion status. Start with the existing variation. New variants should branch from current `main`; routinely merge current `main` into active variants and retest. Do not mix independent designs into one branch or silently merge PR #2 into production.

Owner-supplied design references are committed at `site_variations_preview_HTMLS/Vantage Preview · A Route.html` and `site_variations_preview_HTMLS/Vantage Preview · C Concierge.html`. Treat them as visual inputs, not integrated Next.js applications or proof of analytics/API behavior. They are not deployed variations yet.

Every preview needs a stable review URL and an immutable deployment URL tied to its SHA. A screenshot or local Storybook session is not a deployed variation. Keep existing ignored Storybook labs local; publish approved choices as normal application components.

## Deployment and environment contract

GitHub Actions owns deployments; native Vercel Git deploys are disabled. Two projects share this repository:

| App | Vercel project | Root | Production |
|---|---|---|---|
| Partner sites | `vantage-movers-clients` | `apps/clients` | `vantagequotes.com` |
| Main Site | `vantage-movers-clients-main-site` | `apps/main-site` | `vantagehomemovers.com` |

Shared-package and lockfile changes can deploy both apps. Workflows run from the monorepo root and set each project root. Preserve workspace source inclusion. A docs-only commit does not normally trigger deployment because of workflow path filters. Non-main pushes and PRs can both schedule previews; concurrency cancels redundant runs, so use the completed run and its SHA as evidence.

| Site variable | Production | Preview / cloud development |
|---|---|---|
| `VANTAGE_API_BASE_URL` | `https://vantage-movers-main-server.vercel.app` | `https://vantage-sites-preview-api.vercel.app` |
| `VANTAGE_API_SECRET` | Existing production secret | Unique preview secret; matches preview API |
| `VANTAGE_API_PROTECTION_BYPASS` | Unset | Preview API's automation bypass; server-only |
| `FORM_LEAD_ROUTE` | Preserve the existing setting; default is `api/v1/form-leads` | Explicitly `api/v1/form-leads` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Existing Places credential | Places-enabled credential; prefer separately restricted preview credential |
| `VERCEL_ENV` | Platform `production` | Platform `preview`; set explicitly for cloud/local preview builds |

No secret gets a `NEXT_PUBLIC_` prefix. Populate the per-app local `.env` files from approved preview secrets, never copy a developer's production `.env`. `VERCEL_ENV=preview` is required locally to exercise the fail-closed origin policy. Turbo forwards/hashes the server environment inputs. Current production Google Places credentials remain configured in Preview too; those are not Mongo/CRM credentials, but the account/quota is shared until a restricted preview credential is supplied.

The owner's local checkout has an ignored `.env.site-preview` containing only the website preview origin, API secret, bypass, route and mode. It is not committed or automatically loaded by Next.js. Transfer its values through the cloud environment's secret settings, not through prompts or Git. Supply a separately approved Places credential for local autocomplete testing.

Main-site preview CI uses GitHub secrets `VANTAGE_PREVIEW_API_SECRET`, `VANTAGE_PREVIEW_API_PROTECTION_BYPASS`, and repository variable `VANTAGE_PREVIEW_API_BASE_URL`. Vercel Preview scope must contain matching runtime values. Both preview workflows pull branch-specific environment settings; audit overrides before trusting a URL. Build-time values alone do not prove runtime routing.

The isolated API uses `testvantagemovers_sitepreview`; it never intentionally writes `vantagemovers`. Its deployment has no crons or queue consumers, denies non-website endpoints, and disables CRM, messaging and Sheets. `TEST_MODE` alone is insufficient to disable Granot; the separate CRM flag is mandatory. The existing Mongo credential was reused by owner instruction and is broader than this database; database-restricted credentials remain a hardening follow-up.

Keep Vercel protection on. Server-to-server calls attach the automation bypass header and `x-api-secret`. Do not put either secret in a browser request, query parameter, analytics property, log, screenshot or PR. The browser posts to its own `/api/quote`; expanding backend CORS is unnecessary for this architecture.

## Implementation work for cloud agents

1. Confirm the deployed baseline and the API isolation evidence. Resolve any outstanding integration issue before accepting owner test traffic.
2. Design a minimal variation registry and promotion workflow around branches/PRs and existing deploys. Keep shared forms, content fetching, attribution, legal links, responsive behavior and accessibility consistent. Avoid a new generic experimentation framework unless a real requirement demands it.
3. Define a shared analytics contract for both apps: retain existing event names and add stable variation ID, deployment environment, app, page/service and locale dimensions where appropriate. Prevent duplicate mounts and duplicate conversion events. Do not use a variant ID as `source_company`; partner attribution must retain its domain meaning.
4. Verify actual Vercel Web Analytics and Speed Insights collection in previews, including account settings, event availability and environmental filters. Choose/document a preview-only dataset or exclusion filter so owner testing cannot contaminate production reports. Components rendering and network requests alone are not proof that events reached the dashboard.
5. Provide a simple owner review record with URLs, differences, known limitations and pass/fail evidence. The Owner chooses the variant; technical checks cannot substitute for that preference.

No GA4, Clarity, paid analytics, traffic splitting or new backend attribution schema is implied. If persistent variant-to-Lead/Booking attribution is needed, propose a server-owned contract; do not append unsupported fields or misuse `lid`, Tracking Reference or Source Company.

## Acceptance per variation

- Frozen install, lint, typecheck, focused tests and production build pass from a fresh checkout. Commands below work without ignored Storybook files.
- Desktop/mobile pages, language routes, quote steps, validation, keyboard use, legal links, Places autocomplete/details and API-backed content work. Preview has effective noindex/protection; production canonical/sitemap behavior remains correct on promotion.
- Prove the deployed site's own `/api/quote` creates a synthetic Form Lead in `testvantagemovers_sitepreview`, then read it back from the preview API. Record ref/ID and sanitized evidence. Verify attribution for Main Site and partner pages, consent, move size, LID and retry behavior.
- The main-site route distinguishes `leadCaptured` success/failure. The partner route has historically returned an estimate even when capture failed; an estimate alone is never proof of persistence. Preserve production behavior unless deliberately changing and testing it.
- Exercise backend unavailable, bad auth and validation errors. No conversion-success event on failed capture; no secret/PII in telemetry. Analytics failure must not stop intake. Phone clicks measure intent, not a completed Call Lead or Booking.
- Verify events in the analytics destination, with variation and environment dimensions and no duplicate initialization. Record collection delays or plan limitations explicitly.
- Confirm the API reports CRM skipped and messaging disabled, and no production side effects occurred. Use synthetic identity/contact data only. Do not call real customers or submit synthetic leads to production.

## Promotion and rollback

After the Owner selects a variation, merge/rebase it against the latest `main`, resolve conflicts, repeat checks, and record approval against the reviewed SHA. Merge its source to `main` through the normal review process. The production workflows must rebuild with Production environment values. **Do not promote the prebuilt preview artifact:** it can embed preview data, origin and public analytics settings.

After deployment, verify the production origin/auth with read-only content checks, pages and analytics configuration. Production Form Lead test submissions need explicit owner authorization. Record the production deployment/SHA and previous known-good SHA. Roll back via a revert and production rebuild (or a verified previous production deployment), never by copying preview data or secrets. Keep unrelated variants open until the Owner decides their future.

## Commands

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
node --test packages/api-client/src/environment.test.mjs
pnpm --filter @vantage/main-site exec vitest run --config vitest.unit.config.mts
pnpm --filter @vantage/clients exec vitest run --config vitest.unit.config.mts
pnpm turbo build --concurrency=1
```

Node 24 / pnpm 10.13.1 matches CI. On constrained Windows hosts, `RAYON_NUM_THREADS=2` plus sequential builds avoids the observed parallel-build resource exhaustion. Source Sans 3 is bundled locally with its OFL license because Google returned font URLs that the current Next.js loader could not parse.
