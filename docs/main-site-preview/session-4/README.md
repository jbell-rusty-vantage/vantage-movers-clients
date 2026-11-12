# Session 4 — publishing and browsing evidence

The bilingual service/resource/destination routes now render in the integrated local preview. The latest read-only browser run passed the route, metadata, link, responsive-layout, navigation and print assertions below. Owner content approval and deployed quote persistence remain separate proofs.

## Reproduce

Start the Main Site development server on port 3001 with the isolated preview settings from Session 1, then run from the repository root:

```powershell
node docs/main-site-preview/session-4/capture-publishing.mjs
```

The script accepts localhost only. It blocks every browser non-GET/HEAD request and telemetry, submits no forms and reads no production data. It uses Chromium at device scale 1, reduced motion, and CSS viewports of 1440×1000, 390×844 and 320×844. This is viewport emulation, not physical-device testing or actual browser zoom. The screenshots include Next's development indicator where visible. Performance scores and immutable deployed source identity are not claimed.

## Results

[Latest machine-readable results](evidence/publishing-results.json) record timestamps, the starting commit, dirty working-tree paths and each observed result. This is evidence for the integrated working tree, not proof that the starting commit alone contains the new pages. The [route matrix](../session-6/route-matrix.md) lists every route.

| Check | Observed result |
|---|---|
| Existing and new routes | 44 HTTP 200 routes: all 26 editorial locale entries, both homes, six directory pages, both contact pages and eight legacy consumer/legal pages |
| Document language | Correct English/Spanish document language on every route |
| Metadata | Canonical path matched each route; reciprocal alternate found for every paired page |
| Layout | No horizontal document overflow in 132 route/width cases, including 320px |
| Internal destinations | 172 unique paths/fragments resolved successfully, including the locally hosted consumer PDF redirects |
| Source links | External citations announce a new tab and include `noopener noreferrer`; actual FMCSA popup opening preserved the original worksheet in both locales |
| Browse control | Keyboard Enter opens; Escape closes and returns focus, both locales at desktop and phone widths |
| History | Direct service visit → worksheet → reload → browser Back returned to the service in both locales |
| Print | English and Spanish worksheet print media hides site header and quote, retains worked and blank semantic tables |
| Unknown routes | Four tested unknown service/resource/city URLs return HTTP 404 |
| Uncaught exceptions | None on the 44 route visits |

The first run is preserved in [initial results](evidence/publishing-results-initial.json). It found missing home alternates, narrow-screen text/table overflow, upstream 403s behind legacy PDF redirects and streamed English not-found pages returning HTTP 200. Integration fixes and the repeat run close those measured failures. The initial source-link check also failed to recognize the valid Spanish label “nueva pestaña”; the harness was corrected to accept that label.

After this route run, the integration added a bilingual global 404 with recovery links. The later [process/browser evidence](../session-5/process.md) verifies HTTP 404, noindex and both language recovery paths at desktop and phone widths without JavaScript. No human usability review, assistive-technology audit or real 200% browser-zoom session is claimed.

## Visual captures

Each named screenshot has a full-page counterpart in the same evidence directory. The full run refreshes service, all three directory types, Madison and worksheet screenshots in both languages at desktop and phone widths.

| Surface | English | Spanish |
|---|---|---|
| Long-distance desktop | [1440px](evidence/service-en-1440-viewport.png) | [1440px](evidence/service-es-1440-viewport.png) |
| Long-distance phone | [390px](evidence/service-en-390-viewport.png) | [390px](evidence/service-es-390-viewport.png) |
| Services directory | [390px](evidence/services-en-390-full.png) | [390px](evidence/services-es-390-full.png) |
| Locations directory | [390px](evidence/locations-en-390-full.png) | [390px](evidence/locations-es-390-full.png) |
| Resources directory | [390px](evidence/resources-en-390-full.png) | [390px](evidence/resources-es-390-full.png) |
| Madison | [390px](evidence/madison-en-390-full.png) | [390px](evidence/madison-es-390-full.png) |
| Worksheet | [390px](evidence/worksheet-en-390-full.png) | [390px](evidence/worksheet-es-390-full.png) |

The English desktop and Spanish phone service captures were visually inspected for recognizable Vantage hierarchy, readable copy and reachable quote actions. The Spanish print sample's worked comparison and blank worksheet pages were rendered with Poppler and inspected: [worked table](evidence/worksheet-es-print-review-3.png), [blank table](evidence/worksheet-es-print-review-4.png). The HTML print command produces a readable article plus worksheet; the PDF is a browser-generated proof rather than a separate customer document template. Print PDFs for [English](evidence/worksheet-en-print.pdf) and [Spanish](evidence/worksheet-es-print.pdf) are included.

## Consumer documents

The original redirect targets were legacy FMCSA URLs that returned 403 to this host's automated request. Integration now serves the repository's existing local files; the consumer page labels their historical editions and points to the maintained federal authority.

Current-source investigation found FMCSA's [Consumer Rights and Responsibilities](https://www.fmcsa.dot.gov/protect-your-move/consumer-rights) page, updated November 4, 2024, and its [Rights and Responsibilities Booklet](https://www.fmcsa.dot.gov/consumer-protection/protect-your-move/rights-and-responsibilities-booklet) landing page, updated October 3, 2023. The latter links the [2023 hosted handbook](https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/2023-10/FMCSA_R%26R_Handbook_Web_v1.pdf); official search also identifies the [2022 Ready to Move brochure](https://www.fmcsa.dot.gov/sites/fmcsa.dot.gov/files/ReadytoMoveBrochure_2022Update.pdf).

Direct original-byte downloads of the current handbook and brochure were attempted and rejected by FMCSA's CDN with HTTP 403. No new original PDF bytes were acquired, no checksum for a current document is claimed and no unverified download replaced the existing files. The current official editions remain a follow-up before presenting locally served documents as current; maintained authority links are the reference for updated instructions.

## Remaining proof

Destination edit/fallback, saved wizard progress and consent/capture behavior belong to the quote-flow evidence in Session 3. This script does not simulate or submit a quote. Media sequence qualification is separate from these page captures. Final preview acceptance still needs the exact deployed revision, live isolated Form Lead readback, zero production matches, measurement receipts where supported, and the Owner's content/design decision.
