# Vantage Movers Monorepo

pnpm workspace containing the public marketing Next.js apps and shared packages.

## Structure

```
apps/
  clients/     Partner landing pages (Top10, TBM, etc.) → vantagemoves.com
  main-site/   Vantage organic Main Site → dedicated domain (TBD)
packages/
  api-client/  Server-only vantage-main-server API client
  styles/      Brand tokens, base CSS, Tailwind preset
  utils/       Shared helpers (cn)
```

`vantage-main-server` and `vantage-admin` remain in separate repositories.

## Setup

```bash
pnpm install
cp .env apps/clients/.env      # if migrating from pre-monorepo root .env
cp .env apps/main-site/.env
```

## Development

```bash
pnpm dev:clients      # http://localhost:3000
pnpm dev:main-site    # http://localhost:3001
pnpm dev              # both apps via Turborepo
```

## Build & check

```bash
pnpm build
pnpm typecheck
pnpm lint
```

## Vercel

Each app is a separate Vercel project linked to this repo:

| App | Root Directory | GitHub secret |
|-----|----------------|---------------|
| Clients | `apps/clients` | `VERCEL_PROJECT_ID_MOVERS_CLIENTS` |
| Main Site | `apps/main-site` | `VERCEL_PROJECT_ID_MOVERS_MAIN_SITE` |

In each Vercel project settings:

1. Set **Root Directory** to the app path above.
2. Enable **Include source files outside of the Root Directory in the Build Step**.
3. Keep **Git deployments disabled** (`vercel.json` in each app).

Deploys run via GitHub Actions (prebuilt output), same as before the monorepo migration.

## Shared packages

Import from apps using workspace protocol:

```ts
import { getTestimonials } from "@vantage/api-client";
import { cn } from "@vantage/utils";
```

```css
@import "@vantage/styles/base.css";
```
