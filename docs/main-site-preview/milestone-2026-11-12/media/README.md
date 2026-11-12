# Proposed service illustrations — November 12, 2026

The three missing service-specific image slots now have original editorial illustrations ready for preview integration and Owner review. This closes asset production for military-family preparation, senior downsizing and storage preparation. Owner media approval and verification in the actual service-page layout remain pending; these files do not qualify production publication.

GPT-6 Astra, assigned as the delegated image director by the Main Site packet, directed the built-in ChatGPT Images tool. No CLI/API fallback or external stock was used. The image tool does not expose its underlying model/version; this record distinguishes the directing agent from the image generator. These fictional people, homes and belongings are proposed illustrations, never evidence of real Vantage customers, staff, equipment, facilities or endorsements.

## Files for integration

All files are in `apps/main-site/public/images/preview/`. Each has a `-720.webp` sibling.

| Filename | 1440px dimensions / bytes | 720px dimensions / bytes | Suggested use |
|---|---|---|---|
| `service-military-family-preparation-20261112.webp` | 1440 × 960 / 144,716 | 720 × 480 / 46,042 | Military/veteran/family hero; civilian preparation only |
| `service-senior-downsizing-20261112.webp` | 1440 × 960 / 120,892 | 720 × 480 / 38,910 | Senior moving hero; older adult directs decisions |
| `service-storage-preparation-20261112.webp` | 1440 × 901 / 121,610 | 720 × 450 / 40,324 | Storage hero; preparation in a home, no warehouse implication |

Use the full frame with `contain`, matching the service hero's fully visible image treatment. The family and senior images have tight head margins: if a 16:10 crop is needed, use top alignment (`50% 0%`) and check it in the actual page. Do not apply square/portrait cover crops. Storage is approximately 16:10; its precise generated dimensions are retained in the manifest. All exported files preserve the complete original frame.

## Evidence and review

- [Exact prompts](prompts.json): complete initial prompts, the one storage edit, EN/ES alt text, narrative purpose, focal points, crop guidance and inspection notes.
- [Asset manifest](assets.json): source paths, actual dimensions, bytes, SHA-256 hashes for originals and both optimized sizes, plus the rejected initial storage image hash.
- [Optimization script](optimize-media.mjs): existing session-5 Sharp approach, widths 1440/720 with `withoutEnlargement`, WebP quality 82/80. Run from the repository root; no crop or upscaling.
- [Contact sheet](contact-sheet.html): full-frame selected images and proposed alt text for Owner review.

All selected originals were visually inspected in the image tool output, and every 720px WebP was opened and inspected after export. Family paperwork is unreadable; there are no uniforms, flags or government seals. The older adult holds and discusses the keepsake while her daughter listens. The storage scene is clearly domestic, with no facility, security or climate-control promises. The first storage image showed an exposed plate; a targeted ChatGPT Images edit wrapped it fully, and only the corrected image was exported.

Originals remain in `C:/Users/Pinda/.codex/generated_images/01a1d0e0-a88d-7c50-8c73-fde282d9e89b/`; project-ready exports are copied into the repository. No existing asset was overwritten. No UI, source registry, route, runtime behavior or production selection was changed by this asset task. Byte counts describe files only, not measured page-performance improvements.

**Owner decision: pending.** Root integrated all three images in the actual EN/ES service pages. Deployed loading/full-frame checks passed and the root inspected desktop/phone captures in [resource/media evidence](../evidence/resources/results.json). The hero treats these images as decorative (`alt=""`) with adjacent localized context and an explicit illustrative-image label; proposed descriptive alt text remains available in the prompt record. Content/media approval is still pending. The contact sheet remains a review artifact, distinct from deployed-page evidence.
