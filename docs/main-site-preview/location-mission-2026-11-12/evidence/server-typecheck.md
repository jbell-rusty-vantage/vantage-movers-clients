# Main Server typecheck

On November 12, 2026, `pnpm exec tsc --noEmit --project <temporary config>` exited 0 in `vantage-main-server`. The temporary configuration extended the repository's `tsconfig.json`, preserved its `ops/cloud/**` exclusion, and additionally excluded the ignored local scratch file `ops/output/pool-active-canonical-audit.ts`. That file was the only source of errors in the standard typecheck. The temporary configuration was deleted after the check.
