# Owner feedback — preview design revision

**Follow-up completed for review:** the [November 12 milestone](../milestone-2026-11-12/README.md) addresses the independently actionable service/media/footer/resource work below and adds bounded server attribution. This original feedback record and its source receipts remain intact. Unsupported business claims and content/media publication approval remain with the Owner.

November 12, 2026. The next outcome is Owner review of this visual revision, followed by a bounded page/content refinement session. This closes the first feedback pass within the existing preview stage. It does not complete the five-stage website operations roadmap or authorize production publication.

## Implemented

- Replaced the separate **Browse +** control with a Services hover menu containing eight navigation cards and an all-services link. Enter/Space, Escape, outside click, focus departure and a separate mobile Menu control are supported. A short pointer-exit grace period bridges the space below the header.
- All eight services in both languages now use a split hero with a fully visible image, service-specific image selection, direct quote/details links and a three-step preparation strip. The substantive existing copy is presented in numbered cards, followed by the homepage moving-process component and a closing quote invitation. Quote, worksheet, publication and consent contracts are preserved.
- Added original, evergreen military/veteran/family appreciation to both homepages and both military service pages. Veterans Day is November 11 (already past at this session date), so the copy does not advertise an upcoming 2026 holiday, discount, donation, government relationship or veteran ownership.
- Rebuilt the shared EN/ES footer around Services, Guides & resources, Helpful links, Contact and Policies. It uses Vantage's current contact details, actual resources and existing legal documents. English-only destinations are identified in Spanish labels. Support concerns use the real support email; the carrier link uses the existing intake page. Customer reviews now have a stable anchor and an honest empty state.
- Replaced the repeated scrolling trust marquee with a static referral-logo grid and three business/preparation/contact cards. Referral channels are identified as such. No competitor review totals, ratings, press mentions, awards or household counts were transferred.

The structure was informed by the Owner's supplied [Safe Ship homepage](https://safeshipmoving.com/), [military service page](https://safeshipmoving.com/services/military-moving-services/) and [Veterans Day page](https://safeshipmoving.com/veterans-day/), reviewed November 12. Vantage copy and identities remain distinct.

## Verification and evidence

- Typecheck and full Main Site lint passed; all 37 existing Main Site unit/contract tests passed.
- [Browser capture script](capture-feedback.mjs) exercises both locales, all 16 service routes at 1440/390/320px, hover-to-panel movement, keyboard activation/Escape focus return, mobile menu selection, image loading, document overflow and footer route/fragment targets. Local result: 212 checks, zero failures. PDF redirect targets retain their existing configuration and are excluded from browser navigation checks.
- Local captures use development mode without API credentials, so customer reviews use their empty state and Next displays the expected missing-testimonials-credential development indicator. This is not a deployed API failure. Viewport emulation is not a physical-device test or actual browser 200% zoom qualification.
- No quote was submitted during this visual revision. Existing isolated quote/geolocation evidence remains tied to `76b9a86`; actual analytics dashboard receipts remain tied to `10ec4d2`. This revision does not claim a new Lead or analytics receipt.
- The same 212 checks passed against the immutable deployed preview, with no browser exceptions. [Deployed results](evidence/deployed/results.json) and [deployment identity](evidence/deployment.json) record source `1dd5b3188428ffb340ce02a5138de196a3f69e82`, CI test-merge `62443ad6cb4c81ba2ac3796dfa50c50e807a2ba6`, successful [CI build/deploy](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43266067680), and the verified stable alias. The stable service route returned HTTP 200 with the revised hero. [Review the protected preview](https://vantage-main-site-optimization.vercel.app).

Deployed screenshots: [hover menu](evidence/deployed/navigation-desktop.png), [service desktop](evidence/deployed/service-en-1440.png), [service phone EN](evidence/deployed/service-en-390.png) / [ES](evidence/deployed/service-es-390.png), [military appreciation](evidence/deployed/military-desktop.png), [referral trust grid](evidence/deployed/trust-desktop.png), [footer desktop](evidence/deployed/footer-desktop.png), [footer phone EN](evidence/deployed/footer-en-390.png) / [ES](evidence/deployed/footer-es-390.png).

## Next session considerations

| Owner request | Remaining work / acceptance |
|---|---|
| Each service as complete as home | Review the new shared page treatment, then tailor each page's supporting photography, service details and useful FAQs. The existing military image is only 308×215; replace it with an approved high-resolution asset. Storage and senior currently reuse relevant packing/home imagery. Do not call the entire page/media program finished because the shared layout is implemented. |
| Full competitor-style service coverage | Decide whether Interstate and Cross-country deserve distinct pages or sections under Long-distance. Add original intent-specific content rather than duplicate SEO pages. White-glove needs an agreed Vantage scope and handling boundaries before a service promise is drafted. Current eight routes remain the preview inventory. |
| Military / Veterans Day | Owner reviews appreciation wording and military paperwork details. A dedicated Veterans Day page, approved photos and any genuine offer/community involvement can follow. Any seasonal campaign needs start/end dates and return to evergreen copy; the next Veterans Day is November 11, 2027. |
| Complete footer destinations | Missing first-class destinations: moving article archive/trends, prohibited-items guide, moving-cost guide, press page, moving-app page, careers and dedicated complaint intake. Build useful pages/workflows only where Vantage has content or an actual process. Do not point these labels to unrelated pages or copy Safe Ship's contact details. Current footer has no fabricated destinations. |
| Trustpilot / families moved / press grid | Obtain Vantage's canonical review profile, current rating/count with date and permitted display assets; define a defensible completed-move count and period; document real publication mentions and logo permissions. The five existing referral assets are not press endorsements. Existing third-party mark usage still needs Owner confirmation for publication. |
| Storage / publishing | Content stays versioned in the editorial registry, media in `public`. Use the Owner's existing Blob pipeline when chosen. Do not build a second CMS/storage workflow. |
| Release | Owner still reviews EN/ES content, imagery and design. All 26 editorial locale entries remain drafts. Production selection, actual 200% zoom, final media/content qualification and the broader measurement/server-attribution stage are still separate work. |

Handoff boundary: present this revised preview for feedback, record corrections, and stop. Do not automatically continue the backend roadmap, create unrequested service campaigns, or promote to production.

## Follow-up: resource center and shared heroes (2026-11-12)

The Owner subsequently requested a more complete article/resource structure, resource-type navigation, homepage-like service heroes with carefully composed imagery and a repeated proof row, long-distance pricing context, FAQ navigation and a floating call control. See [the follow-up implementation and decision record](../resource-center-2026-11-12/README.md) for current behavior, qualification, pending business facts and the destination-resource expansion direction. This supersedes the earlier full-frame side-image hero decision; it does not approve draft content or production publication.
