# Process sequence implementation

The existing How It Works section now presents five customer steps with bilingual captions and manual controls. The local integrated browser checks pass at phone and desktop widths. Deployed performance, final source identity and Owner media selection remain separate release proofs.

Update: the [deployed loading comparison](../session-8/README.md#matched-loading-comparison) now records actual production-control versus preview image bytes, LCP and layout shift. Preview hero bytes and layout shift were higher in the bounded sample; source-file compression alone is not evidence of a network improvement. Owner media selection remains open.

The same ten process cases subsequently passed on immutable source `10ec4d2`: [deployed results and screenshots](../session-8/evidence/analytics-native-20261112/process/process-checks.json). Set `SITE_PREVIEW_URL`, `SITE_PREVIEW_SOURCE_SHA` and the origin-scoped protection credential to use this script against the allowlisted preview; otherwise its localhost-only behavior is unchanged. The deployed run blocks all non-GET/HEAD requests and telemetry.

`components/interactive/MovingProcess.tsx` is the only interactive sequence component. `HowItWorksSection` retains the production section shell, palette, heading treatment and phone action, and accepts `locale="en" | "es"`.

| Step | Asset | Meaning |
|---|---|---|
| Request | `/images/preview/quote-request.webp` | Actual wizard capture with fictional details |
| Inventory | `/images/preview/inventory-call.webp` | Coordinator reviews belongings and access |
| Estimate | `/images/preview/review-estimate.webp` | Customer reviews written terms and optional services |
| Prepare | `/images/preview/packing-detail.webp` | Confirm arrangements, clear the entrance and retain paperwork |
| Carrier | `/images/preview/carrier-paperwork.webp` | Assigned motor carrier performs pickup, transport and delivery |

The first image and all five text steps are server rendered. Only the selected image mounts; later frames are requested when selected. Image dimensions and the 16:10 wrapper reserve space. The real form capture uses `object-contain`; illustrative photography uses `object-cover`. A failed image leaves its caption available and displays a meaningful text fallback. Generated scenes are explicitly labeled as illustrations, not Vantage customers or staff.

There is no timer, autoplay, focus movement or animated frame transition. Previous/next controls clamp at either end. `aria-disabled` preserves focus at the boundary while the handler refuses to advance beyond it. Arrow keys work only while focus is inside this sequence, and modified shortcuts are ignored. The visible ordered list also selects individual frames; the current item uses `aria-current="step"`. Captions announce changes politely. Button color transitions are disabled under reduced motion. Without JavaScript, the initial image and complete ordered text remain readable.

Browser hooks: `data-testid="moving-process"`, `process-image-slot`, `process-position`; controls are named “Previous step” / “Next step” or “Paso anterior” / “Paso siguiente”. The section must be exercised at phone/desktop widths, with reduced motion and blocked images, and without JavaScript. Image provenance, reviewed crops and before/after byte/loading/layout-shift evidence belong in the accompanying media manifest; these are not established by component compilation.

Validation performed during implementation: focused ESLint and app `tsc --noEmit` passed.

## Integrated browser evidence — November 12, 2026

Run `node docs/main-site-preview/session-5/capture-process.mjs` from the repository root with the existing localhost:3001 preview server running. It rejects non-local origins and blocks non-GET/HEAD requests and Vercel telemetry. It submits no quote. [Machine-readable results](evidence/process-checks.json) record the working-tree base SHA, timestamp, page errors, image requests, dimensions and local performance observations. Because the test ran against uncommitted integration changes, the recorded HEAD alone is not the tested source identity; the release session must qualify its committed revision.

All ten cases passed:

- EN and ES at 1440×1000 and 390×844: manual next/previous and individual frame availability; arrow navigation only inside the focused sequence; retained focus including the end boundary; no automatic advancement after 1.4 seconds; reduced-motion transition property `none`; no running sequence animations, page exceptions or horizontal document overflow.
- Both locales at 390×844 with JavaScript disabled: first image and all five text steps visible. The initial test exposed the whole homepage under a hidden streaming boundary. The integration owner bounded the asynchronous contact section and removed the root loading wrapper; the rerun verifies the visible no-JavaScript shell. The [initial failure screenshot](evidence/nojs-debug.png) is historical diagnostic evidence, not the final state.
- Both locales at 390×844 with the first process image request aborted: localized image-error message, usable caption and all five steps remain visible.
- The global 404 at both widths with JavaScript disabled: HTTP 404, noindex, English/Spanish guidance and working home recovery destinations.

Only one process image is mounted at a time. The unique inventory-call, estimate-review and carrier-paperwork files were absent from requests until selection. Packing-detail is shared with the homepage service section, so its preexisting request is not a sequence preload. The image slot stayed 592.78×370.48 px on desktop and 332×207.5 px on phone between the first and last frames.

Selected captures: [EN desktop first step](evidence/en-1440-first.png), [EN phone first step](evidence/en-390-first.png), [ES desktop carrier step](evidence/es-1440-carrier.png), [ES phone without JavaScript](evidence/es-390-nojs.png), [EN phone image fallback](evidence/en-390-image-fallback.png), [phone 404](evidence/global-404-390.png). Component screenshots hide the sticky header, skip link and Next development portal during capture without changing layout; they are focused component views, not unmodified full-page screenshots. The shared actual wizard screenshot contains English example labels; both live wizard locales and all sequence captions are separate from that bitmap.

The development-server hero observation recorded no initial layout shifts in these four runs. Next's optimized hero response transferred 77,172 bytes at desktop width and 21,354 bytes at phone width (encoded bodies 76,872 and 21,054 bytes); durations varied from 26.5 to 54 ms on this local, unthrottled host. These are diagnostic observations, not Lighthouse scores, field Core Web Vitals, deployed performance or a controlled comparison. The original hero source file was 1,833,644 bytes and the selected source file is 105,142 bytes; those source sizes do not establish an equal network reduction. No comparable production-baseline transfer or CLS run was performed here.
