<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

This is a pnpm + Turborepo monorepo. Bundled Next.js docs resolve from each app: `apps/clients/node_modules/next/dist/docs/` and `apps/main-site/node_modules/next/dist/docs/`. Project guidance lives in `.cursor/rules`.

For website variations and cloud work, read `docs/cloud-site-variations.md`, then `docs/site-preview-status.md`. Preview sites use the isolated website preview API. Never reuse production API credentials or promote a preview build artifact directly to production.
