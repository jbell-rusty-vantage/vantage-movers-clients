# Planning steps and all-locations preview

Owner goal, November 12, 2026: make the five planning previews consistently sized, replace the repeated Wisconsin promo with an all-locations invitation, and adapt Safe Ship's state-directory pattern before the next code/documentation cleanup round.

## Reference review

Firecrawl inspected [Safe Ship's locations page](https://safeshipmoving.com/locations/) on November 12 (scrape `01a1d28f-c061-765b-a9b0-d8ad0a40b1b7`). The structure is a nationwide introduction, interactive US map, state cards organized into five regions, route links, service cards and a closing quote prompt. The supplied copy and fresh HTML agree on that structure. Its map links lead to state landing pages, despite the introduction describing jumps down the page. Its West Virginia card incorrectly links to Virginia. Neither behavior was copied.

Vantage uses its own blue/yellow styling, original bilingual copy and existing licensed Census/us-atlas geometry. Map links jump to matching cards; all 50 cards lead to the existing localized quote form. State selection does not prefill a destination or clear a saved quote. Existing Florida, Wisconsin and Madison guides remain in a separate guide section. Only already available route/service entries are linked. This change does not invent fifty state landing pages, local offices, route popularity or blanket carrier availability.

The reference scrape is cached at `vantage-movers-clients/.firecrawl/safeship-locations.json` outside this active worktree. Firecrawl could not read the protected Vantage preview: it received Vercel's login page. Qualification instead uses a same-origin automation header, held only in memory, without disabling protection.

## Implementation boundaries

- `MovingProcess.tsx`: every image uses the same 16:10 frame. The real form screenshot uses contain; illustrations use cover. Captions share a CSS grid cell sized by the tallest translated caption. Only the active caption is visible and exposed to assistive technology; enlarged text can grow without clipping.
- `CoverageSection.tsx`: all-locations promo replaces the Wisconsin-specific card wherever this shared section appears. It respects the existing publication gate.
- `LocationsDirectory.tsx`: dedicated `/locations` and `/es/destinos` composition, routed through the existing directory module. All state names reuse the site registry; `state-regions.ts` owns grouping only. Map and region navigation work without client state.
- `AnchorFocus.tsx`: native HTML and SVG anchors resolve their href attribute against the document base, preserving keyboard focus and hash behavior.
- CMS catalog: existing descriptors remain unchanged; new directory/promo copy is appended using explicit `--append-source` arguments. The generator excludes its renderer scope constant. Region/state identities and route targets remain source-owned.

The broader architecture/documentation cleanup remains the Owner's next decision. This round keeps changes local to the requested behavior and records their release evidence here.

## Verification

Main Site lint, typecheck and all 65 unit/contract/publication tests pass. Read-only Chromium qualification passes 176 checks locally and on the deployed artifact across English/Spanish and 320/390/768/1440px, with no browser exceptions. Checks cover every planning step, consistent frame/card height, image loading, fifty uniquely named map/card targets, keyboard map navigation, localized quote links, one primary heading, horizontal overflow and removal of the Wisconsin promo on long-distance pages. Visual review caught the previously missing Hawaii entry in the shared state-name registry; it is restored. No Lead submissions or real calls are made. Viewport checks do not qualify every physical device or browser zoom setting.

Run `node docs/main-site-preview/locations-feedback-2026-11-12/qualify.mjs` against local port 3001, or set `REVIEW_URL` to the isolated Vercel preview and `REVIEW_OUTPUT=./evidence/deployed/`. The script obtains the existing project automation bypass in memory and sends it only to that preview origin. Local screenshots can show development diagnostics.

## Released preview

- [Stable review URL](https://vantage-main-site-optimization.vercel.app/) and [all-locations page](https://vantage-main-site-optimization.vercel.app/locations).
- [Immutable artifact](https://vantage-movers-clients-main-site-kmpbfyxgy-vantage-4d3db9ef.vercel.app), deployment `dpl_4qHq7JmRiHJjXTJbtM3v4MA6m2df`, READY, target Preview.
- Application source `a62e2790358f05f16a0fbb45ee073062a2abde0a`; [successful CI](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43347875643) built PR merge `35ee89c019fb4756f441239534143b904b305e38`. Both source trees are `4a1881236c51aa6b0eae066ad44c68fdba1f6650`.
- [Deployed browser report](evidence/deployed/report.json) and screenshots are retained. Stable alias inspection resolves to that exact deployment; [readback](evidence/stable-alias.json) checks updated English/Spanish content, HTTP 200 and effective noindex.
- Preview CMS catalog append admitted 52 descriptors, bringing the immutable catalog to 2,213 fields at revision 28. Identical replay appended zero fields and remained at revision 28. This uses the server's guarded append transaction, preserving existing overrides and testimonial policy. Source-only state/region identities remain outside editing.

Production is outside this release. Follow-up evidence commits do not change the reviewed application artifact or the pinned alias. Broader code/documentation cleanup awaits the Owner's next instruction.
