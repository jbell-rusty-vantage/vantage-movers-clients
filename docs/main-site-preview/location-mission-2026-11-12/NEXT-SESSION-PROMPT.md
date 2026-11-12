# Florida and route preview — deployed handoff

The Owner authorized “Deploy the isolated preview” and clarified “To the preview url not the main url.” That release is complete. [Review the stable preview](https://vantage-main-site-optimization.vercel.app). Production website and API deployments remain unchanged.

Read this packet's [README](README.md), [state/route architecture](STATE-ROUTE-ARCHITECTURE.md), [attribution integration](ATTRIBUTION-INTEGRATION.md), and [release identity](evidence/deployed/release-identity.json). Owner objective: `C:/Users/Pinda/.codex/attachments/f5450eb8-537c-448b-bbcc-66d2d4db022c/goal-objective.md`.

## Released sources

- Site worktree: `C:/Users/Pinda/Proyectos/vantage/main-site-optimization`, branch `agent/main-site-optimization`, application source `762b3b92a01642349a86ec045291ecad60df0f05`, draft PR #4. CI merge `b54e39adb41a450e30a3aa741669769f2bbad687` has the identical application tree.
- Server: `C:/Users/Pinda/Proyectos/vantage/vantage-main-server`, branch `agent/site-preview-api`, source `7f1cceca11d4f7d28d26085a00cfb37f445c0cdb`, draft PR #222. Additive attribution identities deployed before the site.
- Site deployment: `dpl_FvingkCg3fuBxuCUbo74qioDLpd4`; API deployment: `dpl_BRbmdo7QmAKkfJvr4DjcYvTALrPe`. Both target Preview. Subsequent evidence-only commits do not change deployed application source.

## Qualification and next decision

Local site build/typecheck/lint and 55 tests passed; 532 deployed integration checks and mocked quote/pickup/navigation regressions passed. Final stable-alias checks passed for all four pilot pages. Server focused tests and clean CI typecheck passed; local scratch-file and Vercel builder limitations are documented. No Lead was created, no live Places qualification was repeated, and no newly persisted route-attribution receipt is claimed.

The requested implementation and isolated preview release are complete. The next decision is Owner review. All 36 localized entries remain drafts; production selection, publication, business/Spanish/media approval and claim evidence are separate. No production release direction has been supplied. Do not replay old synthetic captures.

The new map uses local Census-derived us-atlas geometry with ISC notice. Older homepage CoverageMap still uses the pre-existing noncommercial dependency; resolve it separately before commercial promotion. The architecture documents expansion to 20 states/380 directed routes, including the additional source maintenance/admission work, without mass publication.
