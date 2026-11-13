# Site preview handoff status

**Canyon preview candidate, November 13.** `agent/main-site-canyon` branches from the optimization checkpoint and uses the same CMS catalog and isolated preview API. The first immutable Canyon deployment matched the optimization preview across all 56 HTML routes for copy, display attributes, headings, links, media, language and noindex. The stable review deployment has its own qualification. Canyon remains in Preview pending Owner selection. [Canyon implementation and evidence](main-site-preview/canyon-2026-11-13/README.md)

**Optimization candidate, November 12:** [Main Site milestone](main-site-preview/milestone-2026-11-12/README.md) and [review preview](https://vantage-main-site-optimization.vercel.app). Bounded server attribution/outcome reporting is now implemented and isolated-preview qualified. The October infrastructure and alternate-design checkpoints below remain historical. Production is unchanged by this milestone.

Audit date: October 30, 2026 (America/New_York). This is an evidence snapshot, not an evergreen claim about branch counts.

## Branch inventory

Fresh `git fetch origin --prune` and GitHub open-PR lookup found exactly one open PR: draft [#2](https://github.com/jbell-rusty-vantage/vantage-movers-clients/pull/2), `agent/main-site-service-expansion`. Remote head before this work: `eb7dcd8`; local head `57198a8` was one commit ahead (Granot posting/LID alignment). Three additional remote branches exist: `v0/change-one-word-eba77e8e` at `acdf260`, and `v0/overton77-67717d71` / `v0/overton77-ea2b6bd1` at `dab4f69`. They have no open PR in the audit; their deployment retention is not implied by this count. No branches were deleted.

Main started at `8b9cb56`. Pending Next.js/React upgrades, lockfile and agent setup are included in the reviewed monorepo checkpoint. Ignored local Storybook labs and environment files are excluded by repository policy.

## Verification and infrastructure

- Frozen lockfile install passed.
- Lint passed with two existing clients warnings (image element and React Hook Form/Compiler compatibility).
- Workspace typecheck passed.
- Both Next.js apps built. Parallel builds exhausted Windows resources; sequential builds succeeded after replacing Source Sans 3's failing Google download with a licensed local copy.
- Main-site quote contract: two tests passed; preview origin policy: two tests passed.
- Local builds without the API secret use empty content fallbacks; authenticated deployment checks are separately required.
- Preview API branch: `agent/site-preview-api` in `jbell-rusty-vantage/vantage-movers-server`; deployment/runbook: `docs/site-preview-api.md` there.
- Separate Vercel project `vantage-sites-preview-api` created in Vantage team. Both website Preview scopes point to its stable alias with unique preview credentials; main-site CI no longer injects the production GitHub API secret into previews.
- Test DB `testvantagemovers_sitepreview` seeded with five source/granularity pairs (including GetMovers) and explicitly synthetic testimonial/carrier fixtures. Existing Mongo script credential reused at owner direction; credential-level database restriction is still a follow-up.
- Server focused CRM/Form Lead tests: 36 passed; preview boundary tests: two passed. Full local typecheck initially encounters an unrelated ignored `ops/output/pool-active-canonical-audit.ts`; isolated typecheck evidence is recorded at final qualification.

## Still owned by cloud agents

Implement the variation review/promotion workflow and analytics dimensions/isolation described in `cloud-site-variations.md`. Browser-level per-variation QA, analytics dashboard receipt and legal/Spanish approval are not established by a successful build or API smoke test. No design variation is approved or merged by this preparation task.

## Released source and integration evidence

- Main monorepo checkpoint `e316488`: both production workflows succeeded, with Vercel Ready deployments. Main Site: `https://vantage-movers-clients-main-site-bpuxndl7r-vantage-4d3db9ef.vercel.app`; Clients: `https://vantage-movers-clients-nuwwf60ir-vantage-4d3db9ef.vercel.app`. Both public domains returned HTTP 200 in read-only checks. No production Form Lead was submitted.
- Follow-up `29b1dde` fixes an existing GetMovers attribution omission: `/getmovers` sent a configured source absent from the quote route allowlist and was being normalized to Main Site. Five partner attribution regression cases pass, plus clients typecheck and focused lint. This follow-up triggers only the Clients production deployment.
- Existing variation updated by merging main, without promoting the variation into main: `05cca62`, then `ba3a43a` including the GetMovers fix. Six main-site unit/contract tests, typecheck and variation build passed after the initial merge.
- [Owner review URL](https://vantage-main-site-service-expansion.vercel.app) now points to the successful [GitHub Actions preview](https://vantage-movers-clients-main-site-gxegw6mun-vantage-4d3db9ef.vercel.app): branch `ba3a43a`, PR test-merge SHA `1dbdd81334efd176d0d724d756bcdb34abf110d7`. It is a manually pinned review alias, not yet an automatic branch-following alias. The earlier [manual fallback deployment](https://vantage-movers-clients-main-site-lkxuzopih-vantage-4d3db9ef.vercel.app) at `05cca62` was used while GitHub runners were queued; the later source change affects Clients only, and Main Site implementation is unchanged. Latest review deployment homepage also returned HTTP 200.
- Preview API: [stable origin](https://vantage-sites-preview-api.vercel.app), [immutable deployment](https://vantage-sites-preview-nld3k1rla-vantage-4d3db9ef.vercel.app), runtime server SHA `67484849`; source/runbook branch `agent/site-preview-api` subsequently includes smoke tooling and five-source seed support (`697f4a10`). It has not been merged or deployed to server production.
- API smoke: database identity, content reads, invalid-secret 401, forbidden-route 404, synthetic Form Lead creation/readback all passed. Reference `PREVIEW-1793391424104`, lead `6ae4fb40457367376193a457`, CRM `skipped`, messaging `not_requested`; exact reference count test=1, production=0.
- Deployed Main Site preview `/api/quote` returned HTTP 200 with `leadCaptured: true`. Reference `PREVIEW-SITE-20261030`, test lead `6ae4fc1fc12ea61714a0ad04`, source `main_site`, submitted LID preserved; exact reference count production=0. Preview homepage returned HTTP 200 and `X-Robots-Tag: noindex`.
- Both apps built successfully with live preview API settings; the main-site authenticated build-content preflight passed. The first main-site CI attempt reached the alias before it was ready (404); the rerun succeeded once the API was qualified.
- Partner smoke initially returned HTTP 200 with `leadCaptured: false`; its inherited Preview `FORM_LEAD_ROUTE` was rejected by the restricted API. Both sites' Preview routes are now explicitly `api/v1/form-leads`, preserving Production settings. A redeploy is required for environment changes; final partner proof is recorded below.

Final partner qualification: [Clients preview](https://vantage-movers-clients-k6kyzfcxm-vantage-4d3db9ef.vercel.app), SHA `ba3a43a`, is Ready. Top10 and GetMovers deployed quote submissions both returned HTTP 200 / `leadCaptured: true`. Test records: `PREVIEW-PARTNER-20261030` → `6ae4fda497124c7827d4c413` / `top10_leads`; `PREVIEW-GETMOVERS-20261030` → `6ae4fda797124c7827d4c41b` / `get_movers_leads`. Combined exact-reference count in production: zero. The GetMovers fix is deployed to [Clients production](https://vantage-movers-clients-4lzfxgm7f-vantage-4d3db9ef.vercel.app), SHA `29b1dde`, with successful CI. Its local build also passed.

Final Main Site preview run [41123075482](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/41123075482) and Clients preview run [41123064603](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/41123064603) both succeeded. The open-PR audit still finds only draft PR #2; its description now links the preview and current qualification. Final evidence-only commits do not change the deployed implementation.

GitHub runs: [Main Site production](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/41121595409), [Clients baseline production](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/41121595245), [main-site preview rerun](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/41121714593), [Clients attribution-fix production](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/41123059784).

The code/deployment evidence above does not qualify analytics dashboard delivery, UI interaction on every device/locale, Spanish legal copy, or promotion approval. Those remain explicit cloud-agent acceptance work.
