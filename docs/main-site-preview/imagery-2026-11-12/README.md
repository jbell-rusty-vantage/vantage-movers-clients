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

Step 1 now shows a fresh, complete English or Spanish capture of the current contact-first form, using fictional details and no submission. The lossless WebP captures use their native 1034:1176 aspect ratio and bypass lossy image optimization so their text remains clear. The heading, progress steps, all fields, Continue button and privacy footer are visible. Its caption now matches the current contact-first workflow. Steps 2–5 retain their appropriate truck-free photography.

## Verification

Main Site lint, typecheck and all 55 existing unit/contract/publication tests pass. The focused browser harness checks English and Spanish home pages, all eight services and resource archives at 1440, 390 and 320 pixels. It checks image decoding, curated sources, absence of truck icons/retired imagery, all five process steps, native screenshot aspect ratio and overflow. All browser writes and telemetry are blocked; no Lead or call is created.

Local development uses the isolated preview API origin without credentials, so content fetches use the established fallback. Final build/deployment and browser evidence are recorded below after release.
