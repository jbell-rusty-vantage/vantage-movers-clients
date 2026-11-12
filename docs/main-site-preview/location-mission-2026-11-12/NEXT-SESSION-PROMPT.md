# Continue the location mission

Release authorization received: the Owner answered “Deploy the isolated preview” and clarified “To the preview url not the main url.” This supersedes the pending-approval notes below. The isolated API source `7f1cceca` is pushed; release qualification is in progress. Consult the final deployment evidence when present.

Read this packet's README, STATE-ROUTE-ARCHITECTURE and ATTRIBUTION-INTEGRATION. Owner objective: `C:/Users/Pinda/.codex/attachments/f5450eb8-537c-448b-bbcc-66d2d4db022c/goal-objective.md`.

Implementation and local qualification are finished in the current shared worktrees, uncommitted:
- Site: `C:/Users/Pinda/Proyectos/vantage/main-site-optimization`, `agent/main-site-optimization`, baseline HEAD `e181329`.
- Server: `C:/Users/Pinda/Proyectos/vantage/vantage-main-server`, `agent/site-preview-api`; only additive attribution allowlist, regression test and README changed by this mission.

An explicit question is pending to commit/push both candidates, deploy the isolated API first then site preview, qualify and update the stable alias. The server's branch workflow rule requires explicit commit/push/deploy direction. Do not treat elapsed time as approval. Check the conversation for the Owner's answer.

Local checks passed: site 55 tests, lint, typecheck/build, 532 final integration assertions; quote/pickup/navigation browser regressions; server 16 tests, distributed contract equality and typecheck excluding only the documented ignored audit scratch file. No Lead was created. The local dev server is stopped. Starting the built app was rejected by automatic approval review (“blocked by policy”); it was not retried. The public stable alias still serves final-polish source `f4b95c8`, not this mission.

On approved preview release, follow existing GitHub Actions workflows and exact deployment/SHA evidence. Preserve production and editorial gates. Recheck deployed interaction/noindex/source cards/map. When capturing full-page images after keyboard map tests, blur the focused map control and scroll instantly to the top first so sticky chrome does not appear midway through the capture. Do not replay old synthetic captures. No production direction has been supplied.

The new map uses local Census-derived us-atlas geometry with ISC notice. Older homepage CoverageMap still uses the pre-existing noncommercial map dependency; resolve that separately before commercial promotion. The architecture documents expansion to 20 states/380 directed routes without mass publication.
