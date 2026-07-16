# Main-site expansion implementation runbook

Prepared July 15, 2026 for an autonomous Codex implementation run in `vantage-movers-clients`.

This document turns [the competitive audit and wireframe](./main-site-expansion-wireframe.md) into an executable repository plan. The wireframe remains the product and content source of truth; this runbook defines repository boundaries, branch and preview behavior, file seams, API invariants, verification gates, and completion criteria.

## Copy/paste goal for the implementing agent

> Work until the Vantage main-site expansion described in `apps/main-site/docs/competitive-audit/main-site-expansion-wireframe.md` and `apps/main-site/docs/competitive-audit/main-site-expansion-implementation-runbook.md` is implemented and verified. Work only in the `vantage-movers-clients` Git repository. Before editing, inspect the worktree and create a new feature branch from the current base without discarding, stashing, staging, or overwriting unrelated user changes. Implement the shared service-page platform, all eight English launch routes, their Spanish route equivalents, navigation/homepage/footer/sitemap/SEO updates, route-aware analytics, and the generated image library saved under `apps/main-site/public/images/services/`. Preserve the existing quote fields, schema, payload, `/api/quote` route, server-only API client, authentication, and `vantage-main-server` contract. Use the image-generation skill for the new raster assets and inspect every desktop/mobile crop. Add proportionate tests, run lint/typecheck/tests/build, and visually QA responsive pages. Commit only files belonging to this expansion, push the feature branch, open a draft pull request into `main`, wait for the existing main-site GitHub Actions preview workflow, retrieve and inspect the Vercel preview URL, fix failures, and repeat until all automated and preview checks pass. Do not merge the pull request or deploy production. Report the branch, commits, draft PR, preview URL, test results, changed files, and any human compliance/content approvals still required.

The explicit commit, push, draft-PR, and preview language above is intentional. A goal that only says "build the pages" does not necessarily authorize an agent to publish a branch or create external GitHub/Vercel state.

## Repository and deployment model

`vantage` is a folder containing several independent Git repositories. The frontend monorepo is:

```text
vantage-movers-clients/                 <- Git root; create the branch here
├── .github/workflows/
├── apps/
│   ├── clients/                        <- separate partner app; out of scope
│   └── main-site/                      <- site being expanded
├── packages/
│   ├── api-client/                     <- server-only main-server adapter
│   ├── styles/
│   ├── ui/
│   └── utils/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── turbo.json
```

Do not create a branch inside `apps/main-site`; it is not a separate Git repository. Create one branch at `vantage-movers-clients/`, and limit the diff primarily to `apps/main-site/**`. Shared-package changes are allowed only when the site genuinely needs a reusable capability.

The main site is a separate Vercel project whose Root Directory is `apps/main-site`, but builds are launched from the monorepo root so workspace packages remain available. Important files:

- `README.md` — monorepo layout and Vercel root-directory instructions.
- `apps/main-site/vercel.json` — intentionally sets `git.deploymentEnabled` to `false`; do not turn it on.
- `.github/workflows/vercel-movers-main-site-preview.yml` — deploys a preview for pull requests and pushed non-`main` branches when `apps/main-site/**`, `packages/**`, or workspace configuration changes.
- `.github/workflows/vercel-movers-main-site-production.yml` — deploys production only after changes reach `main`; the implementation agent must not invoke or merge into this path.
- `apps/main-site/scripts/verify-build-api.mjs` — confirms preview build access to published testimonials and active moving carriers before the Vercel build.

Therefore the expected lifecycle is:

```text
feature branch -> local checks -> commit -> push -> draft PR
       -> GitHub Actions prebuilt main-site preview -> inspect URL -> iterate
       -> human approval -> later merge by an authorized human
```

Direct Vercel Git builds are not the preview mechanism. The GitHub Actions workflow installs, typechecks, pulls the Vercel preview environment, applies `apps/main-site` as the project root, verifies API access, builds a prebuilt artifact, and deploys that artifact.

## Start-of-run safety procedure

From `vantage-movers-clients/`:

```bash
git status --short
git branch --show-current
git remote -v
git fetch origin
git switch -c feat/main-site-service-expansion
```

If the desired branch name exists, use a short date suffix. Do not use `git reset --hard`, `git checkout --`, blanket stashing, or blanket staging.

At the time this runbook was written, the worktree contained an unrelated modification to `apps/main-site/src/components/interactive/MovingCarriersTable.tsx` and untracked audit documentation under `apps/main-site/docs/`. Recheck rather than assuming that state is unchanged. Preserve `MovingCarriersTable.tsx` unless the expansion specifically requires and tests a carrier-list presentation change. Stage explicit paths or inspect `git diff --cached` before every commit; never use an unreviewed `git add -A` in a dirty worktree.

The implementing agent must read `NEXTJS_AGENTS.md` completely before changing the Next.js app, then consult the bundled Next.js 16 documentation it points to for App Router pages, dynamic routes, metadata/OG images, `next/image`, JSON-LD, internationalization, sitemap generation, and testing. It must also read any newly discovered `AGENTS.md` that governs a file it changes.

## Product scope

### Required route inventory

| Priority | English route | Spanish equivalent |
| --- | --- | --- |
| P0 | `/services/long-distance-moving` | `/es/servicios/mudanzas-larga-distancia` |
| P0 | `/services/auto-transport` | `/es/servicios/transporte-de-autos` |
| P0 | `/services/military-moving` | `/es/servicios/mudanzas-militares` |
| P1 | `/services/residential-moving` | `/es/servicios/mudanzas-residenciales` |
| P1 | `/services/corporate-office-moving` | `/es/servicios/mudanzas-de-oficina` |
| P1 | `/services/packing-services` | `/es/servicios/servicios-de-embalaje` |
| P1 | `/services/storage-options` | `/es/servicios/opciones-de-almacenamiento` |
| P1 | `/services/senior-moving` | `/es/servicios/mudanzas-para-personas-mayores` |

All routes use one shared page composition and typed content registries. Do not create eight or sixteen copied page implementations. English remains unprefixed. Each EN/ES switch must resolve to the exact equivalent route.

Spanish marketing copy may be drafted and previewed, but consent, cancellation, estimates, broker/carrier explanations, and other legal/compliance language cannot be declared production-approved without qualified human review. Record that review as a launch gate, not as unfinished engineering. If reviewed Spanish legal copy is unavailable, keep the preview implementation complete but clearly report the approval dependency.

### Shared page composition

Each service page must render, in order:

1. Compliance bar and global header.
2. Breadcrumbs.
3. Route-specific hero with one H1, service promise, verified proof points, generated image, and the shared quote wizard.
4. Trust/verification band.
5. Service-specific benefits.
6. Four-step service process.
7. Broker-versus-motor-carrier responsibilities.
8. Planning checklist or educational section.
9. Relevant real testimonials; hide the section when the API returns none.
10. Nationwide coverage.
11. Related service links.
12. Route-specific FAQs.
13. Final quote CTA.
14. Compliance-rich site footer.

On mobile, the content order is message, proof, then form; images must use an intentional mobile crop; stacked content and sticky actions must not obscure consent or controls.

## Target file architecture

The agent may refine names while preserving these seams:

```text
apps/main-site/
├── public/images/services/
│   ├── long-distance-moving-hero.webp
│   ├── long-distance-moving-hero-mobile.webp
│   ├── auto-transport-hero.webp
│   ├── auto-transport-hero-mobile.webp
│   ├── military-moving-hero.webp
│   ├── military-moving-hero-mobile.webp
│   ├── residential-moving-hero.webp
│   ├── residential-moving-hero-mobile.webp
│   ├── corporate-office-moving-hero.webp
│   ├── corporate-office-moving-hero-mobile.webp
│   ├── packing-services-hero.webp
│   ├── packing-services-hero-mobile.webp
│   ├── storage-options-hero.webp
│   ├── storage-options-hero-mobile.webp
│   ├── senior-moving-hero.webp
│   ├── senior-moving-hero-mobile.webp
│   └── broker-coordinator-detail.webp
└── src/
    ├── app/
    │   ├── services/[slug]/page.tsx
    │   ├── es/servicios/[slug]/page.tsx
    │   └── sitemap.ts
    ├── components/
    │   ├── interactive/QuoteWizard.tsx
    │   ├── service-pages/
    │   │   ├── ServicePage.tsx
    │   │   ├── ServiceHero.tsx
    │   │   ├── ServiceBenefits.tsx
    │   │   ├── ServiceProcess.tsx
    │   │   ├── BrokerCarrierExplainer.tsx
    │   │   ├── ServicePlanningChecklist.tsx
    │   │   ├── RelatedServices.tsx
    │   │   └── ServiceBreadcrumbs.tsx
    │   └── seo/ServicePageJsonLd.tsx
    ├── content/
    │   ├── services/
    │   │   ├── types.ts
    │   │   ├── registry.ts
    │   │   └── *.ts                  <- one entry per English service
    │   └── locales/es/
    │       ├── common.ts
    │       └── services/*.ts
    └── lib/
        ├── images.ts
        ├── analytics.ts
        ├── site.ts
        └── service-routes.ts         <- EN/ES route pairing and lookup
```

Prefer a registry keyed by a stable internal service ID rather than coupling relationships to translated slugs. The registry should support static params, `notFound()` for unknown slugs, metadata, breadcrumbs, navigation, related services, the sitemap, and locale switching from one source.

The typed model should include at least:

```ts
type Locale = "en-US" | "es-US";

interface QuoteWizardCopy {
  title: string;
  subtitle: string;
  continueLabel: string;
  submitLabel: string;
  confirmationTitle?: string;
  confirmationBody?: string;
}

interface ServicePageContent {
  id: string;
  locale: Locale;
  slug: string;
  path: string;
  alternatePath: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    desktopImage: string;
    mobileImage: string;
    imageAlt: string;
    proofPoints: Array<{ value: string; label: string }>;
  };
  quoteFormCopy: QuoteWizardCopy;
  benefits: Array<{ title: string; body: string; icon: string }>;
  process: Array<{ title: string; body: string }>;
  planningChecklist: string[];
  faqs: Array<{ q: string; a: string }>;
  relatedServiceIds: string[];
}
```

Content modules may contain only substantiated Vantage claims. Never copy competitor wording, images, ratings, carrier counts, savings, awards, or guarantees. Vantage must be represented as a licensed moving broker coordinating with authorized motor carriers, not as the carrier operating a Vantage fleet.

## Existing files to extend, not bypass

| Existing file | Required treatment |
| --- | --- |
| `src/components/interactive/QuoteWizard.tsx` | Add a small presentation-copy prop and optional locale labels while keeping state, fields, steps, consent, validation, submission, errors, and analytics local to this component. |
| `src/schemas/quote-form.schema.ts` | Preserve fields, `MOVE_SIZES`, `STEP_FIELDS`, validation, and output shape. Localized error presentation must not change the API payload. |
| `src/app/api/quote/route.ts` | Preserve `/api/quote` and its server-side mapping to `CreateFormLeadInput`. Ignore client attempts to override source attribution as it does today. |
| `packages/api-client/src/index.ts` | Preserve the `server-only` boundary, `x-api-secret`, base URL, form-lead route, testimonial fetch, and moving-carrier fetch. Never expose the API secret through `NEXT_PUBLIC_*`. |
| `src/content/partners.ts` | Keep `MAIN_SITE.sourceCompany = "main_site"` and `sourceCompanySite = "vantagehomemovers.com"`. |
| `src/components/interactive/ServicesDropdown.tsx` | Replace homepage-anchor targets with crawlable service routes and make keyboard/mobile behavior complete. |
| `src/components/sections/ServicesSection.tsx` | Turn cards and feature previews into service links; retain a separate quote CTA where useful. |
| `src/components/layout/Header.tsx` and `src/components/layout/SiteFooter.tsx` | Add route-aware service navigation and EN/ES equivalent-route switching without breaking homepage hash links. |
| `src/components/HomePage.tsx` | Keep the homepage broad; add broker/carrier clarity and service-page discovery without duplicating full service content. |
| `src/app/sitemap.ts` | Include every canonical service route and Spanish alternate. Keep legal routes. |
| `src/components/seo/HomePageJsonLd.tsx` | Do not blindly reuse the current `MovingCompany` type on service pages. Use the legal/SEO-approved organization/service representation and visible, verified review data. |
| `src/lib/images.ts` | Register generated public assets and resolve them consistently. Use `next/image` in rendered components. |
| `src/lib/analytics.ts` | Existing events already add `current_path`; add stable service ID and locale properties where needed without adding fields to the lead payload. |
| `src/app/api/places/autocomplete/route.ts` and `details/route.ts` | Pass/validate the active locale rather than keeping all place responses fixed to English; never expose Google credentials. |

## `vantage-main-server` compatibility contract

The browser posts only to the main-site route handler:

```text
QuoteWizard
  POST /api/quote
    -> apps/main-site/src/app/api/quote/route.ts
      -> @vantage/api-client createFormLead()
        POST {VANTAGE_API_BASE_URL}/{FORM_LEAD_ROUTE}
        default: https://vantage-movers-main-server.vercel.app/api/v1/form-leads
```

The secret is attached server-side as `x-api-secret`. The final main-server payload must remain:

```ts
{
  source_company: "main_site",
  source_company_site: "vantagehomemovers.com",
  name: string,
  email: string,
  phone_number: string,
  pickup_zip: string,       // five digits
  destination_zip: string,  // five digits
  move_size: string,
  move_date?: string,
  ref_no?: string,
  sms_consent?: boolean
}
```

This matches `vantage-main-server/src/validation/v1/leads.validation.ts` and `POST /api/v1/form-leads` in `vantage-main-server/src/routes/v1.routes.ts`. The server schema is strict. Do not add `service`, `locale`, page path, campaign metadata, or hidden route fields to this body as part of the site expansion. Route and locale attribution belong in Vercel Analytics unless a separate server-contract change is explicitly designed, tested, and deployed first.

Compatibility invariants:

- Same seven visible quote inputs and SMS consent behavior on every route.
- Same `quoteFormSchema`, step field groups, and `MOVE_SIZES` values.
- Same browser endpoint: `/api/quote`.
- Same `MAIN_SITE` attribution, internal `MS-...` reference construction, and API-secret boundary.
- Same success/error behavior unless an independently tested bug fix is in scope.
- No direct browser request to `vantage-main-server`.
- Existing testimonials and moving-carriers reads remain authenticated server-side.

Do not submit a real preview form into the production lead endpoint merely as a smoke test. Prefer automated route tests with a mocked API-client boundary and the existing authenticated GET build verifier. An end-to-end POST is allowed only against a designated test/preview server or when the user explicitly authorizes a clearly marked synthetic lead and its cleanup/handling is understood.

## Image production contract

First implement the final responsive hero frame and determine its crop/focal behavior. Then use the image-generation skill to create the asset family; do not generate images before the layout is known.

Required visual direction comes from the wireframe:

- Photorealistic editorial advertising with natural light and credible U.S. settings.
- One coherent campaign treatment across all services.
- Subtle navy/yellow props or color grading are acceptable.
- No fake Vantage truck logos, uniforms, licenses, awards, ratings, military insignia, government endorsement, or partner branding.
- Emphasize planning, coordination, family, route, vehicle, office, packing, storage, and support—not Vantage employees physically transporting goods.
- Represent customers naturally across age, ethnicity, household type, and ability.

Generate each desktop hero at approximately 2:1 with intentional negative space for copy/form, and a separately composed mobile crop around 4:3. Save optimized WebP files under `apps/main-site/public/images/services/`; retain source-quality masters there only when their size is reasonable and they are needed for future recropping. Use descriptive alt text that describes the scene without keyword stuffing. Inspect the actual files for artifacts, unintended logos/text, anatomy problems, inaccurate military imagery, and crop collisions.

At minimum, generate eight service heroes, eight mobile variants, and one broker-coordinator detail image. The service concepts are specified in the source wireframe. Existing files in `public/` may remain for homepage content, but the new service routes should not quietly fall back to unrelated old stock imagery when a required generated asset is missing.

## Execution phases and gates

### Phase 1: foundation and contract tests

- Create the branch and baseline the existing lint/typecheck/build behavior.
- Add the typed service and locale registries, route pairing, shared composition, and quote-copy interface.
- Add tests that assert every registered route is unique and paired, every related ID resolves, every content entry has required sections, and quote presentation props do not change submitted keys.
- Implement the long-distance tracer route with temporary development imagery only until the hero dimensions are final.

Gate: the tracer route renders through the shared composition; the homepage form still works; contract tests pass; no server payload change exists.

### Phase 2: P0 pages and image system

- Complete long-distance, auto-transport, and military content.
- Generate and inspect their desktop/mobile hero assets.
- Add unique metadata, canonical, Open Graph values/images, breadcrumbs, FAQ/service JSON-LD, and related links.
- Update services discovery in the header and homepage.

Gate: three pages are unique content variations of one component system and pass responsive/accessibility checks.

### Phase 3: complete English launch set

- Add residential, corporate/office, packing, storage, and senior entries.
- Generate and inspect the remaining images.
- Complete homepage, footer, sitemap, coverage/related-service, and analytics changes.
- Keep location/corridor pages and a `/services` index out of scope unless the core launch set is complete and the wireframe's "later expansion" is explicitly promoted.

Gate: all eight English routes are crawlable, internally linked, unique, and included in the sitemap.

### Phase 4: Spanish routes

- Implement the paired Spanish content registry and shell labels.
- Localize navigation, form presentation, validation messages, consent text, metadata, structured data, alt text, API error presentation, date display, and Places requests.
- Add reciprocal `hreflang` (`en-US`, `es-US`, `x-default`) and exact route switching.
- Record the qualified-human legal/compliance review as a production launch gate.

Gate: all route pairs switch directly, document/section language is machine-detectable, and no English UI fragments remain except proper nouns or intentionally shared U.S. identifiers.

### Phase 5: final verification and preview

- Run all checks below.
- Commit only expansion files with coherent commit messages.
- Push the feature branch and open a draft PR against `main`.
- Wait for `Vercel Preview (Main Site)`, retrieve its URL from the Actions job summary, inspect the preview, and repair all failures.
- Do not merge or run a production deployment.

## Verification matrix

Run from `vantage-movers-clients/`:

```bash
pnpm install --frozen-lockfile
pnpm --filter @vantage/main-site lint
pnpm --filter @vantage/main-site typecheck
pnpm --filter @vantage/main-site exec vitest run
pnpm build:main-site
```

If a Playwright configuration is added, also run the main-site E2E suite against a local production build. Do not claim tests passed if no matching test command ran.

Automated coverage should include:

- Registry integrity and EN/ES one-to-one mapping.
- Static route generation and unknown-slug 404 behavior.
- Unique title, description, canonical, hreflang, H1, FAQ content, and image per route.
- JSON-LD serialization without unsafe HTML and with visible-data parity.
- Quote wizard field names and outbound `/api/quote` body regression.
- `/api/quote` mapping to the exact `CreateFormLeadInput` keys with source attribution forced server-side.
- Keyboard behavior for menus, accordions, forms, and locale switching.
- Sitemap inclusion and internal-link validity.

Visual QA at representative 390 px, 768 px, 1440 px, and wide desktop widths must check:

- Header/menu behavior, breadcrumbs, one H1, hero crop, proof points, and form order.
- Form controls, errors, consent, focus indicators, tap targets, and sticky actions.
- No layout shift from images; explicit dimensions/sizes and useful responsive delivery.
- Benefits/process/explainer/checklist/testimonials/related services/FAQ/final CTA/footer.
- Spanish overflow and line wrapping.
- No generated text/logos/artifacts in images.
- No console errors, failed network requests, hydration errors, broken links, or horizontal overflow.

Preview API checks must confirm testimonials and carriers load when available. For quote submission, use a mock or designated non-production backend unless a production synthetic lead is explicitly authorized.

## Branch, PR, and preview commands

After all local gates pass:

```bash
git status --short
git diff --check
git diff --cached
git commit -m "feat(main-site): add localized service expansion"
git push -u origin feat/main-site-service-expansion
gh pr create --draft --base main --head feat/main-site-service-expansion \
  --title "feat(main-site): expand service content platform" \
  --body-file <prepared-pr-body.md>
gh run list --workflow "Vercel Preview (Main Site)" --branch feat/main-site-service-expansion
gh run watch <run-id> --exit-status
gh run view <run-id>
```

Adapt the branch name in commands when a suffix was required. The agent should place the preview URL and verification evidence in the draft PR body or a PR comment. A failed preview is not a terminal handoff: inspect the workflow logs, fix the root cause, push, and wait for the replacement run.

## Definition of done

The implementation run is complete only when:

- It is on a feature branch in the `vantage-movers-clients` repository, not `main` and not a fictitious app-level repository.
- All eight English and eight paired Spanish routes render from shared typed components/content.
- Every route has unique content, metadata, canonical/hreflang, breadcrumbs, structured data, FAQs, generated desktop/mobile imagery, and internal links.
- Homepage service cards, Services navigation, footer, related links, and sitemap point to crawlable routes.
- The shared quote UI varies only in presentation/localized copy and retains the exact browser and main-server contracts.
- New imagery is saved under `apps/main-site/public/images/services/`, optimized, inspected, and free of false branding/claims.
- Lint, typecheck, tests, and production build pass, with results recorded.
- Responsive, keyboard, accessibility, console, network, and content QA pass locally and on the Vercel preview.
- The branch is pushed, a draft PR exists, the existing main-site preview workflow is green, and the preview URL has been inspected.
- Unrelated user changes are preserved and excluded from commits.
- Unsupported claims and competitor-owned content are absent.
- Remaining human approvals—especially Spanish legal/compliance review and final schema-type review—are clearly listed.
- The PR is left unmerged and production is untouched.

## Final handoff format

The implementing agent's final report should contain:

```text
Branch:
Commit(s):
Draft PR:
Vercel preview:

Implemented routes:
Generated assets:
Major component/content seams:

Checks:
- lint
- typecheck
- unit/integration tests
- production build
- responsive/accessibility QA
- preview/API smoke checks

API contract confirmation:
Unrelated changes preserved:
Human approvals still required:
Known limitations (if any):
```

Do not use "complete" to mean only that files were generated. Completion includes passing checks, a green and inspected preview, a draft PR, contract confirmation, and an honest accounting of human review gates.
