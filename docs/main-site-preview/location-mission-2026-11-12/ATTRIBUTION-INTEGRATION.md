# Location attribution integration

The pilot adds three bounded identities to the authoritative server contract at `vantage-main-server/src/contracts/websiteAttribution.ts`: `florida`, `florida-to-north-carolina`, and `moving-routes`, each with explicit English and Spanish paths. The API-client contract is distributed from that source. It does not invent route names or broaden admission to arbitrary URLs.

The server extension is additive. It needs no schema migration, backfill or environment change. Existing attribution snapshots, source assignment, consent, retry identity and canonical Booking/Cancellation qualification are unchanged. The reverse route remains unknown until separately authored and admitted.

## Local evidence

- `node scripts/check-website-attribution-contract.mjs ../vantage-main-server/src/contracts/websiteAttribution.ts`: identical normalized content, SHA-256 `eb54d4f5e4f393042c9bd339fe95aeac1bb089e4b5f39802b2814e12e4f1175d`.
- Server focused isolation, analytics and attribution run: 16 tests passed, including Florida first touch → Spanish FL-to-NC capture and rejection of the unregistered reverse route.
- Standard server `pnpm typecheck` encounters the pre-existing ignored `ops/output/pool-active-canonical-audit.ts` import/type errors recorded in the earlier milestone. A temporary config preserving the normal excludes and excluding only that scratch file passed; the temporary config was removed.
- No synthetic Lead or business-data write was used for these checks.

## Release boundary

The Owner authorized commit/push and isolated preview deployment, explicitly excluding the main production URL. Server source `7f1cceca11d4f7d28d26085a00cfb37f445c0cdb` deployed successfully through [the API workflow](https://github.com/jbell-rusty-vantage/vantage-movers-server/actions/runs/43323668464) to Preview deployment `dpl_BRbmdo7QmAKkfJvr4DjcYvTALrPe`. The stable API alias is `https://vantage-sites-preview-api.vercel.app`.

[Read-only deployed evidence](evidence/deployed/api-readonly.json) verifies the exact source, test database, content fixtures and denied non-preview surfaces. The API deployed before the site. Site source `762b3b92` is now at the stable preview alias; [release identity](evidence/deployed/release-identity.json) records the complete source/deployment mapping. Clean CI typecheck and tests passed; Vercel's builder still emits pre-existing unrelated ObjectId diagnostics, documented in the server attribution README.

No real quote capture was sent for this release. Local tests prove the new path admission; deployed exact-source and isolation checks establish integration, but do not establish newly persisted route attribution. Prior capture receipts remain evidence for their recorded source only. Production is a separate selection and fresh build; both production aliases remain unchanged.

Rollback: revert the added identities and the corresponding site release together. An older server discards optional attribution with new paths while continuing valid quote intake; it must not be used to claim those captures retain location attribution. No stored evidence is rewritten.
