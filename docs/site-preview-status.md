# Site preview handoff status

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
- Test DB `testvantagemovers_sitepreview` seeded with four source/granularity pairs and explicitly synthetic testimonial/carrier fixtures. Existing Mongo script credential reused at owner direction; credential-level database restriction is still a follow-up.
- Server focused CRM/Form Lead tests: 36 passed; preview boundary tests: two passed. Full local typecheck initially encounters an unrelated ignored `ops/output/pool-active-canonical-audit.ts`; isolated typecheck evidence is recorded at final qualification.

## Still owned by cloud agents

Implement the variation review/promotion workflow and analytics dimensions/isolation described in `cloud-site-variations.md`. Browser-level per-variation QA, analytics dashboard receipt and legal/Spanish approval are not established by a successful build or API smoke test. No design variation is approved or merged by this preparation task.

Deployment qualification and final SHAs/URLs are appended after the release checks complete.
