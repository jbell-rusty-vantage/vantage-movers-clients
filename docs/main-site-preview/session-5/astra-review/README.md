# Astra phone hero proposal — November 12, 2026

The missing phone composition now has a separate, reviewable ChatGPT Images proposal. It is not integrated or deployed. The current `10ec4d2` preview candidate and its six selected scenes are unchanged. The Owner is the content/media reviewer; no approval is implied.

## Provenance and requirement boundary

The parent orchestrator explicitly selected `model=gpt-6-astra` and `fork_turns=none` for the `astra_media` agent, and confirmed that selection in its collaboration message. That is the model-selection evidence for this new art-direction work only. The agent used the built-in ChatGPT Images tool (`image_gen__imagegen`), not an API/CLI fallback. The image generator's internal model identity is not exposed and is not claimed to be Astra. Earlier six-scene authorship remains exactly as recorded in the parent Session 5 README.

This fulfills a concrete Astra-directed image-production contribution and supplies the missing phone proposal. It does **not** establish that the entire original set was produced in an Astra chat, that the reference has Owner approval, or that all Stage 5 qualification is complete. Full completion still needs actual-hero narrow/wide EN/ES comparison, image-loading/layout-shift measurements for any selected change, and Owner media selection. No source substitution or application code change was made here.

## Generation record

- Date: November 12, 2026.
- Input: `apps/main-site/public/images/preview/home-inventory.webp`, visually inspected before editing; it is the existing fictional couple and apartment, still awaiting Owner approval.
- Exact prompt: [prompt.txt](prompt.txt). Tool arguments: this one reference path and `transparent_background=false`.
- Tool original: `C:/Users/Pinda/.codex/generated_images/01a1d071-6aa7-76b0-8fec-bb5ebe7cd231/exec-1bec0234-5d75-458f-b4ae-c314aa5eb2e7.png`.
- Workspace original: `apps/main-site/public/images/preview/astra-review/hero-phone-v1.png`.
- Exports: full 2:3 portrait at 1024×1536, 720×1080 and 390×585; WebP quality 80, no crop, no enlargement. Sharp performed encoding/resizing only after generative editing. [Manifest](assets.json) records dimensions, bytes and SHA-256 for the reference, original and exports.
- Rights/provenance: generated fictional people and setting, derived from the existing generated reference. No real staff/customer identity, testimonial, outside stock license or exclusive rights claim.

## Art direction and inspection

Placement: proposed phone-specific home hero, paired with the existing landscape. Narrative: customers prepare an inventory before speaking with the broker. The generated output and the 390px export were visually inspected. Both adult faces, distinct navy/beige clothing, hands and paper remain visible; warm window light, sofa, boxes and room palette maintain convincing continuity. The upper wall provides calm space. No logos, vehicle, uniform or readable personal information were observed. Tiny paper marks are indistinct. Generated anatomy remains subject to Owner visual review.

Use the full portrait initially. Suggested focal point is approximately 58% x / 66% y; faces occupy roughly x=35–80%, y=40–62%, and the inventory action x=42–78%, y=63–77%. Avoid arbitrary `object-cover` cropping. A severe center crop would sacrifice either top copy space or the preparation action. The existing mobile hero uses top-aligned `object-contain` plus HTML text, gradient and quote controls; a taller source changes the visible-image region and could place body copy over faces. This proposal is therefore not a drop-in improvement claim.

If decorative under the hero's real HTML copy, retain empty alt. If displayed as standalone editorial content, proposed EN alt: “Illustration of two adults reviewing a room inventory beside moving boxes.” ES: “Ilustración de dos adultos que revisan un inventario junto a cajas de mudanza.” Never describe them as Vantage customers.

Source export sizes are 96,578 bytes (1024), 55,758 (720), and 20,496 (390). These are file sizes, not measured browser transfer savings. No new performance or deployment qualification was performed. The bounded local actual-layout comparison below was subsequently completed.

## Actual mobile hero comparison — recommendation: retain current source

The portrait is **not recommended as a direct replacement in the current hero layout**. At 390px it clears the headline background, but both faces sit behind the body copy and the inventory activity sits behind supporting copy and the CTA buttons. This happens in both English and Spanish. The current landscape also has text over parts of the photograph, but keeps the faces near the top and ends the photograph sooner, leaving most body copy against the plain blue background. Retain the portrait as a separate art-direction option for a future layout that separates image and text; do not replace the current candidate with this proposal automatically.

Executed `node docs/main-site-preview/session-5/astra-review/capture-hero.mjs` against the already-running `http://localhost:3001`. This uses the established Playwright method, a fresh context per case, Chromium 390×844, DPR 1, reduced motion and no throttling. All non-GET/HEAD requests and Vercel telemetry were blocked; no quote was submitted. The proposal cases intercepted **only** the same-origin `home-inventory.webp` image request (via `/_next/image`) and fulfilled it with the proposed 720px WebP. No application source or server setting was changed. This simulates image substitution; it does not implement responsive picture/source selection or measure the production optimizer.

The source was the uncommitted local worktree, including the optional geolocation UI, based on `b59f18233992d8df5c5ecbf6ca8904945208b549`. These are **not** captures of deployed `10ec4d2`; HEAD alone is not the complete tested source. [Machine-readable results](evidence/comparison.json) record image dimensions, interception receipts, blocked requests and hero geometry. All four cases returned 200, loaded the intended source ratio, had no page exceptions and had no horizontal overflow. Hero dimensions were identical between variants within each locale: EN 390×1955.45, ES 390×1913.41. This is static geometry evidence, not a CLS or performance measurement. The first run used an overly strict ratio assertion that rejected responsive intrinsic-dimension rounding; the script now allows a 0.01 ratio tolerance, and the complete rerun passed.

Visually inspected all four full-hero screenshots:

| Locale | Current source | Simulated portrait |
|---|---|---|
| English | [Current hero](evidence/en-current-hero.png) | [Portrait hero](evidence/en-proposal-hero.png) |
| Spanish | [Current hero](evidence/es-current-hero.png) | [Portrait hero](evidence/es-proposal-hero.png) |

The component captures hide the sticky header, skip link and Next dev portal without changing layout. Additional `*-viewport.png` files preserve the normal viewport capture. No desktop substitution was tested because this proposal is phone-specific; the existing landscape remains the wide composition. Owner media review and any selected source's deployed/loading qualification remain open.
