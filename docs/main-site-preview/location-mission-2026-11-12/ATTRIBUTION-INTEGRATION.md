# Location attribution integration

The pilot adds three bounded identities to the authoritative server contract at `vantage-main-server/src/contracts/websiteAttribution.ts`: `florida`, `florida-to-north-carolina`, and `moving-routes`, each with explicit English and Spanish paths. The API-client contract is distributed from that source. It does not invent route names or broaden admission to arbitrary URLs.

The server extension is additive. It needs no schema migration, backfill or environment change. Existing attribution snapshots, source assignment, consent, retry identity and canonical Booking/Cancellation qualification are unchanged. The reverse route remains unknown until separately authored and admitted.

## Local evidence

- `node scripts/check-website-attribution-contract.mjs ../vantage-main-server/src/contracts/websiteAttribution.ts`: identical normalized content, SHA-256 `eb54d4f5e4f393042c9bd339fe95aeac1bb089e4b5f39802b2814e12e4f1175d`.
- Server focused isolation, analytics and attribution run: 16 tests passed, including Florida first touch → Spanish FL-to-NC capture and rejection of the unregistered reverse route.
- Standard server `pnpm typecheck` encounters the pre-existing ignored `ops/output/pool-active-canonical-audit.ts` import/type errors recorded in the earlier milestone. A temporary config preserving the normal excludes and excluding only that scratch file passed; the temporary config was removed.
- No synthetic Lead or business-data write was used for these checks.

## Release boundary

The Owner subsequently authorized commit/push and isolated preview deployment, explicitly excluding the main production URL. Server source `7f1cceca` is pushed to `agent/site-preview-api`; deployment qualification is in progress.

These checks prove local contract behavior, not acceptance by the deployed API. Preview integration requires the isolated API to deploy this additive allowlist before the site uses it for persisted route attribution. The existing stable alias and prior capture evidence remain tied to the previous source until a new deployment is recorded.

The server's `.cursor/rules/branch-test-vercel-workflow.mdc` requires explicit direction before committing, pushing or deploying. Complete the reviewable local candidate first, then obtain direction for the isolated preview release. Production is a separate selection and fresh build.

Rollback: revert the added identities and the corresponding site release together. An older server discards optional attribution with new paths while continuing valid quote intake; it must not be used to claim those captures retain location attribution. No stored evidence is rewritten.
