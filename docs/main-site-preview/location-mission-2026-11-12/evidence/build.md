# Local preview build

November 12, 2026: `pnpm --filter @vantage/main-site build` passed compilation, TypeScript and generation of all 69 static pages (exit 0). `VERCEL_ENV=preview`, `VANTAGE_API_BASE_URL=http://127.0.0.1:9`, `FORM_LEAD_ROUTE=api/v1/form-leads`, `RAYON_NUM_THREADS=2`; no API credentials or app environment file were present. Expected testimonial/carrier fallback messages and the pre-existing local metadataBase warning were observed.

This is the optimized local build in Preview mode, not a Production deployment. It proves compilation/render generation, not live API content or persistence. The dev server was stopped after browser checks. An attempt to start the built app locally was rejected by automatic approval review with only “blocked by policy”; it was not retried. Review the saved screenshots until release direction is supplied.

The complete browser integration before build passed 532 checks with zero failures. Final current Main Site unit suite: 55 tests, 13 files; lint passed. Server contract and its distributed API-client copy match. All business-data writes in browser verification were mocked.
