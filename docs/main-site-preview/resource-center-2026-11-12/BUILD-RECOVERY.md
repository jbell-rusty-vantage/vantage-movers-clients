# Preview build recovery

Outcome: the final application source built and deployed successfully on the identical CI rerun. No font, dependency or publishing-pipeline changes were needed.

- Source: `cd462dad2e3ec9d015f787ca42f44b8a862f6323`.
- CI test merge: `c8283690ae1c19b58ea0b5be95be4e9fb130b07f` (identical tree).
- Workflow: https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43296545911
- Attempt 1: typecheck and contract tests passed; Turbopack build failed resolving Bricolage Grotesque.
- Signature: `Can't resolve '@vercel/turbopack-next/internal/font/google/font'` with `next/font/google queries have exactly one entry`.
- Attempt 2: same source, full build and preview deployment succeeded.

The application delta from the immediately preceding successful build was a print CSS selector. Fonts and font configuration were unchanged. The failure signature matches [Next.js issue #99114](https://github.com/vercel/next.js/issues/99114), describing Google font responses with extensionless query-bearing URLs that the loader cannot parse. That is an evidence-supported likely cause, not a traced reproduction of the runner's exact upstream response.

Resolution: rerun the failed workflow job, then qualify the resulting immutable preview. No production target or configuration was changed. If this failure recurs, consider locally bundling the same font files and licenses, or a verified upstream fix, as a focused build-reliability change. Do not alter visual typography or broadly upgrade dependencies merely to hide a failed build.
