# Session 5 — media and process sequence

The preview now has a consistent moving-preparation story and a manual five-step process. The Owner is the designated reviewer; imagery is proposed for review, not approved evidence of company personnel, customers or equipment.

## Delivered assets

All six photographs were generated with the built-in ChatGPT Images tool on November 12, 2026. The tool does not expose a selectable/verified GPT-6 Astra authoring identity; no separate Astra chat or model-specific qualification is claimed. The first home image was visually inspected before using it as the continuity reference for the dependent home scenes. No external stock photos or customer portraits were introduced.

| File under `apps/main-site/public/images/preview/` | Placement / purpose | Framing and alt-text intent |
|---|---|---|
| `home-inventory.webp` | Home hero, general service backdrop; residential inventory | Fictional couple reviewing an inventory. Wide negative space left; people right. Hero is decorative beneath actual HTML copy, so empty alt. |
| `inventory-call.webp` | Process 2: inventory conversation | Same people, clothing and apartment; customer on phone. Alt says illustrative inventory conversation. |
| `review-estimate.webp` | Process 3: written estimate review | Same clothing/hands, unreadable sample documents; no prices or personal data. |
| `packing-detail.webp` | Packing section/service; process 4 | Hands wrapping a ceramic bowl; the caption's other preparation tasks remain HTML text. |
| `carrier-paperwork.webp` | Process 5 | Same fictional residents and an unbranded carrier representative; no truck or Vantage employee implication. |
| `office-preparation.webp` | Office imagery | Fictional colleagues organizing office equipment and inventory; no company identity. |
| `quote-request.webp` | Process 1 | Actual working local wizard screenshot with fictional ZIP/date/size; screenshot proves UI only. |

Generated originals remain in the workstation's Codex generated-images directory. [Asset manifest](assets.json) records source filename, SHA-256, original bytes and optimized bytes. [Optimization script](optimize-media.mjs) exports 1440px and 720px WebP versions, preserving the full 3:2 frame. Next Image supplies responsive runtime sizes; process photos use a fixed 16:10 crop with centered subjects, and the form screenshot uses contain. No labels are baked into generated photos. [Contact sheet](contact-sheet.html) displays the selected output for review.

The old hero source is 1,833,644 bytes; the new 1440px WebP is 105,142 bytes. That is a **source-file** comparison. Next Image may transcode either source, so this is not a claim of equivalent network savings or a performance score. Browser evidence records loading and layout observations separately.

## Prompt record

All prompts requested natural editorial photography, landscape 1536×1024, warm neutrals/navy accents, believable hands and no readable text, logos, uniforms, trucks, endorsements or watermarks. The home continuity reference was `exec-3690ab10-cb15-48e8-8d3c-da2abd41b9bb.png`.

1. **Home/inventory:** Two fictional adults, approximately 35 and 45, short dark curly hair and shoulder-length brown hair, reviewing a handwritten room inventory beside half-packed boxes in a lived-in apartment. People right, clear calm negative space left for HTML headline; everyday navy shirt/beige cardigan, natural morning light; both retained in mobile framing.
2. **Inventory conversation:** Same people, clothing, apartment and window. Woman speaking on a phone to a moving coordinator while man makes inventory notes at a wooden table; boxes and same sofa in background. No visible phone interface; no depiction of Vantage staff.
3. **Packing:** Same woman's beige cardigan sleeves and hands wrapping a ceramic bowl in plain packing paper on the same table, open box with cushioning, wrapped dishes and softly focused sofa/navy accent. Main action centrally composed.
4. **Carrier paperwork:** Same residents at apartment doorway reviewing documents with a fictional representative wearing a plain gray polo. Clear passage, boxes near doorway, no handshake, branding, truck or Vantage-carrier ownership implication; calm natural interaction.
5. **Estimate review:** Same navy/beige cuffs and hands comparing two sample documents side by side, pencil and folder nearby. Only abstract table lines, no readable text, numbers, prices, addresses, personal details or invented interface.
6. **Office:** Two fictional colleagues in a modest contemporary office organizing monitor cables and inventory beside plain boxes and an office chair. Clear passage, equipment on desk, ordinary smart-casual clothing, no readable screens, branding or actual-staff implication.

The Owner can approve or replace any selected scene. Generated people are not used as testimonial portraits. [Process behavior](process.md) records keyboard, fallback and loading implementation; browser evidence supplements it.

## Astra-directed phone composition follow-up

A separately spawned GPT-6 Astra agent directed a new ChatGPT Images phone composition from the existing home reference. [Provenance and actual-layout comparison](astra-review/README.md) records the exact model selection, prompt, generated original and optimized files. Four EN/ES mobile comparison cases passed loading/overflow checks, but visual inspection found that the proposed faces overlap body copy and the inventory falls behind buttons. Retain the current hero; the proposal remains a reviewable alternative in `public/images/preview/astra-review` and is not selected or deployed as the hero. This establishes new Astra-directed production work without retroactively attributing the earlier six images to Astra. Owner media approval remains open.
