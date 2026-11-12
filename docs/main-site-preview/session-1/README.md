# Session 1 — baseline and implementation design

Session 2 can now draft against the current Vantage UI and a defined first journey. Session 1 supplies production/local captures, a quote trace, a selective reuse plan and annotated layouts. It implements no public routes. The next proof is reviewed English/Spanish long-distance copy, a worked estimates worksheet and a Madison article with claim/source records.

## Revision and evidence

Captured November 12, 2026 (America/New_York). Repository: `jbell-rusty-vantage/vantage-movers-clients`; worktree `C:/Users/Pinda/Proyectos/vantage/main-site-optimization`; branch `agent/main-site-optimization`.

| Reference | Revision | Meaning |
|---|---|---|
| Fetched `origin/main` | `145a4dd6efa699c58c5bc8017a086e8b3d5acf87` | Current main source and packet's production-source control |
| Session start | `0775d787d8f194b2d657f8eef1717be78c1c561d` | Same runtime, packages and lockfile as main; packet additions only |
| Fetched service branch | `ba3a43a615f413b9ebd8726576ed3eb03f3c7c81` | Reuse candidate, not approved production content |
| Public control | <https://www.vantagehomemovers.com/> | Live HTTP 200; visually inspected at 1440×1000 and 390×844 |

The public build's exact deployed SHA was not independently queried. Do not equate source parity with immutable deployment identity. Local rendering used identical current-main runtime source, Next 16.3.3 **development mode**, without API or Places credentials. Local testimonials/carrier data therefore uses the existing empty state; production includes live content. Next's development issue indicator is visible in local captures. An optimized build passed separately. The host execution policy rejected starting a second production-mode local server; no production-mode local screenshot is claimed.

### Capture index

| Surface | Desktop | Phone |
|---|---|---|
| Production first viewport | [1440](evidence/production-1440-viewport.png) | [390](evidence/production-390-viewport.png) |
| Production full page | [1440](evidence/production-1440-full.png) | [390](evidence/production-390-full.png) |
| Production wizard | [1440](evidence/production-1440-quote.png) | [390](evidence/production-390-quote.png) |
| Production empty validation | [1440](evidence/production-1440-validation.png) | [390](evidence/production-390-validation.png) |
| Local current-main viewport | [1440](evidence/local-main-1440-viewport.png) | [390](evidence/local-main-390-viewport.png) |
| Local current-main full page | [1440](evidence/local-main-1440-full.png) | [390](evidence/local-main-390-full.png) |
| Local retry, mocked 503 | [1440](evidence/local-1440-retry-mocked.png) | [390](evidence/local-390-retry-mocked.png) |
| Local confirmation, mocked 200 | [1440](evidence/local-1440-confirmation-mocked.png) | [390](evidence/local-390-confirmation-mocked.png) |

[Capture manifest](evidence/capture-manifest.json) records URLs, UTC timestamps, viewport sizes, fonts, headings, links, validation and browser errors. [Quote simulation evidence](evidence/quote-states.json) distinguishes mocked confirmation from persistence. Raw Firecrawl extraction is ignored at `.firecrawl/production-home.json` (scrape `01a1d02e-1dcc-75bd-9472-7bb76602be66`, status 200). Committed browser evidence provides the reproducible link/content inventory.

### Reproduce

From this worktree, use Node 24 / pnpm 10.13.1:

```powershell
pnpm install --frozen-lockfile
$env:VERCEL_ENV='preview'
$env:VANTAGE_API_BASE_URL='https://vantage-sites-preview-api.vercel.app'
$env:VANTAGE_API_SECRET=''
$env:VANTAGE_API_PROTECTION_BYPASS=''
$env:GOOGLE_SERVICE_ACCOUNT_JSON=''
$env:RAYON_NUM_THREADS='2'
pnpm --filter @vantage/main-site dev
# In a second terminal, from the same repository root:
node docs/main-site-preview/session-1/capture-baseline.mjs
node docs/main-site-preview/session-1/capture-quote-states.mjs
```

Do not load a production `.env`. This worktree had no per-app environment file. Install Playwright Chromium with `pnpm --filter @vantage/main-site exec playwright install chromium` if absent. The baseline script blocks all browser non-GET/HEAD requests and Vercel telemetry, then exercises only empty validation. The quote-state script accepts localhost only and intercepts quote/Places requests; it creates no Form Lead. Firecrawl supplies public content; local Playwright supplies exact shared viewports and browser interception for reproducibility.

Both viewports measured document width equal to viewport width and no uncaught page exceptions. The manifest's unresolved image candidates include offscreen/repeated lazy marquee logos; that is not proof that every logo is broken. Hero and visible form were visually inspected. No performance score, full accessibility pass or analytics dashboard receipt is claimed. Randomized metrics, moving marquees and live testimonials prevent byte-identical screenshots.

The capture scripts use Chromium at device scale 1 with reduced motion requested. This is viewport emulation, not a physical-device test. Layout review is self-contained in HTML; [first-service layout capture](evidence/layouts-service.png) is a convenient static review image. All nine layout types rendered without horizontal document overflow at the review viewport.

## Baseline findings and layout decisions

- Desktop: sticky white header, approximately 1200px content width, navy photo hero with white copy on the left and a white rounded wizard on the right. Wizard starts at y≈110px. Keep this recognizable composition.
- Phone: header exposes logo, Call and Free Quote only. Hero copy, two CTAs and two metric cards precede the wizard, which begins at y≈1062px. Retain immediate quote entry; place the service-detail wizard after the short answer, before long editorial sections. Add a real mobile browse control in Session 3.
- Home order: hero → partner trust strip → services → trust band → process → coverage → why Vantage → about → testimonials → FAQ → contact with a second wizard → final CTA → footer. Keep that control order while adding linked service/resource entries.
- Services and Locations are currently in-page journeys. CoverageMap changes the selected state locally; it does not open a state guide. No resource index or Spanish home exists.
- A quote anchor can align the form under the sticky header. Add and verify scroll offset and focus handling during integration; preserve natural scrolling and browser Back.
- `RollingNumber` chooses random values for “Families Moved” and “Moved In The Last Hour.” These are not reporting evidence. Session 2 must substantiate or replace those claims. Also review “50 states”/“51” coverage wording, review totals, binding-estimate/no-hidden-fee statements, ownership implications in image alt text and service promises.

Use [annotated layouts](layouts.html) for all specified page types, [inventory and trace](inventory-and-quote-flow.md) for the current system, and [reuse and integration plan](reuse-and-integration.md) for file-level work.

## Validation and boundary

| Check | Result |
|---|---|
| Frozen install | Passed; lockfile unchanged; pnpm noted ignored esbuild build script |
| Runtime source comparison with fetched main | No differences in `apps`, `packages`, lockfile |
| Main-site quote contracts | 2 passed: authoritative Main Site attribution/LID and failed-capture HTTP status |
| Shared API environment tests | 2 passed: preview origin refusal and isolated origin resolution |
| Main-site optimized build | Passed, all 21 generated static entries; expected missing-secret content warnings |
| Main-site lint/typecheck | Both passed |
| Browser baseline | Four captures: production/local × desktop/phone, including empty validation |
| Mocked retry/confirmation | Passed on both widths; two byte-equivalent logical payloads, unchecked consent retained |
| Deployed Lead persistence, Places integration, analytics receipts | Not exercised; later isolated-preview qualification |

No public runtime source, backend, partner app, deployment or production data was changed. No production quote was submitted. Session 1's UI confirmation is a simulation, not a captured Lead or Booking.

Repeat the source checks with `pnpm --filter @vantage/main-site lint`, `pnpm --filter @vantage/main-site typecheck`, `pnpm --filter @vantage/main-site exec vitest run --config vitest.unit.config.mts`, `node --test packages/api-client/src/environment.test.mjs`, and `pnpm --filter @vantage/main-site build` using the noncredentialed preview environment above. The service branch's registry cases were inspected, not executed in this worktree. Root/app AGENTS and bundled Next 16.3.3 development/page conventions were read; localized route params must remain awaited promises.

## Session 2 handoff

First prototype route: `/services/long-distance-moving`, paired with `/es/servicios/mudanzas-larga-distancia`. Intended first integrated journey: current home → service → estimate worksheet → preserved quote → Wisconsin/Madison guide. The worksheet and location paths in the layouts are proposals until the publishing registry exists.

Session 2 should create actual reviewed/draft EN and ES entries in the Main Site content tree, using stable IDs and per-locale review states. Start with long-distance, a fictional worked comparison (no promised prices), Wisconsin and “Getting ready to move to Madison, Wisconsin.” Supply author/reviewer, checked date, source sections, geographic scope and recheck trigger for each material claim. Resolve operational promises with approved Vantage materials; unconfirmed text remains unpublished. Do not publish the older branch's entire registry merely because its structural tests pass.

Keep the layouts as design intent. Session 3 owns route/navigation/template implementation; Session 4 owns destination behavior and publishing routes. Session 5 owns image production after rights/crops are reviewed. Session 7 owns measurement qualification; Session 8 owns deployed preview receipts and Owner selection. There is no request for production selection in this handoff.
