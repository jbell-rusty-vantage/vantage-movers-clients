# Image refinement — November 12, 2026

Owner request: use the existing service-image collection more precisely, replace the cartoon resource previews with new photography, remove all truck depictions, and repair the cropped first moving-process image. This is a preview-only refinement of `agent/main-site-optimization`; production and editorial approval remain separate.

## Images selected and generated

The collection from **Create Vantage Movers site images** (chat `01a1d04a-b261-75d2-b317-d58dc449a6fb`) is available locally at `C:/Users/Pinda/Proyectos/vantage/image-options-2026-11-12`. Eleven images were visually inspected and copied as optimized WebP files into `apps/main-site/public/images/selected-20261112/`. [Library provenance and original prompts](library-provenance.json).

| Placement | Selection |
| --- | --- |
| Home and residential hero | Couple unpacking in their new home |
| Long-distance hero and feature | Couple looking out over their new city |
| Auto transport | Passenger sedan outside a home, with no transport truck |
| Military hero | Uniformed service member and family arriving at their new doorway |
| Military supporting feature | Servicewoman and partner packing their household |
| Office moving | Colleagues preparing an office |
| Packing | Hands protecting ceramic dishes |
| Storage | Wrapped furniture and cartons in organized storage |
| Senior moving | Older adult and family member sorting personal belongings |
| About / coordination | Coordinator with headset and documents |
| Lower quote section | Boxes and folded blanket at a home's entrance |

The shared `SERVICE_IMAGES` registry controls service choices and responsive focal positions. All active image registries and truck icon renderers use truck-free alternatives. Historical unreferenced library files are preserved. Legal and operational prose mentioning trucks is unchanged.

Six new resource photographs were generated with the **built-in image_gen tool**, one per article: inventory, written estimates, carrier handoff, moving budget, careful packing and document organization. [Exact generation prompts](prompts.json). Workspace assets: `apps/main-site/public/images/editorial/photography-20261112/`. The resource archive, related cards and article pages all use the new registry paths. These are illustrative generated scenes, not actual Vantage customers or employees.

Step 1 now shows a fresh, complete English or Spanish capture of the current contact-first form, using fictional details and no submission. Desktop and phone each receive a capture of their actual responsive form layout. The lossless WebP captures use native aspect ratios (desktop 1034:1176, phone 668:1250 EN / 668:1226 ES) and bypass lossy image optimization so their text remains clear. The heading, progress steps, all fields, Continue button and privacy footer are visible. Its caption now matches the current contact-first workflow. Steps 2–5 retain their appropriate truck-free photography.

## Verification

Main Site lint, typecheck and all 55 existing unit/contract/publication tests pass. The focused browser harness checks English and Spanish home pages, all eight services and resource archives at 1440, 390 and 320 pixels. It checks image decoding, curated sources, absence of truck icons/retired imagery, all five process steps, native screenshot aspect ratio and overflow. All browser writes and telemetry are blocked; no Lead or call is created.

Local development uses the isolated preview API origin without credentials, so content fetches use the established fallback. Final build/deployment and browser evidence are recorded below after release.

The final responsive implementation passed [400 local checks](evidence/local/report.json), zero failures. Earlier harness iterations attempted to decode hidden duplicated referral logos and encountered a local Next image-optimizer stall; visibility filtering, bounded decode waiting and restarting the local development server resolved those checks. Final screenshot selection uses the figure rather than a tall process container so sticky page chrome cannot obscure the capture. Development chrome is excluded from the source form captures themselves. These are verification-tool corrections; they do not change customer form behavior.

## Deployed and verified

[Stable review site](https://vantage-main-site-optimization.vercel.app/) · [Immutable deployment](https://vantage-movers-clients-main-site-3nb0hm6w2-vantage-4d3db9ef.vercel.app) · [Successful build and deploy](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43333972831).

- Application source `d6156f1d2f373a850fa9e9546513772ca0865aed`; CI merge `2309ef5cd03c0d7e7b015ba12f1dc7405068d020` has the identical tree `674b4680af8a2ea46cc7e19a1a928942d6cb3695`.
- Preview deployment `dpl_AbTgiNPGGiWH2r7RNrtdkZtrz8pj` is READY. The stable alias resolves to that exact deployment. [Identity record](evidence/deployment.json).
- [400 deployed checks](evidence/deployed/report.json), zero failures. The first deployed harness run had two Spanish-home image assertions affected by changing `:visible` nth indexes during scrolling; retaining actual element handles resolved the scan. No application modification was required.
- [18 stable-URL checks](evidence/stable/report.json), zero failures, confirm both home pages, resource archives and auto-transport pages, the phone-specific form captures, six loaded photographic previews and effective noindex.
- Visually inspected [new resource photography](evidence/stable/en-resources.png), [English phone form](evidence/stable/en-process-phone.png), [Spanish phone form](evidence/stable/es-process-phone.png) and [truck-free auto hero](evidence/stable/en-auto-phone.png), plus the desktop service compositions.
- Production still resolves to its prior deployment `dpl_4jzUYdiummhMzTXkwCkYvHdB61fC`. No production promotion, quote submission, Lead, phone call or editorial approval occurred.

The requested image refinement is complete on the review URL. Owner review of this preview is the next decision; the broader production/publication gates remain in the existing handoff. Documentation-only follow-ups do not change the pinned application build.
