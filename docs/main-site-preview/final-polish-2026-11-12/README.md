# Final preview polish — November 12, 2026

The Owner’s final visual corrections are implemented for review. This continues the qualified service-refinement candidate at `4f5de58`; it does not approve editorial publication or deploy production.

## Changes

- Removed the visible introduction beside the referral-company logos. Logos now float without cards, borders or background fills in a full-width ribbon with edge fades, evenly spaced repeated groups and a seamless 50-second cycle. Hover and the icon control pause motion; reduced-motion shows each of the five logos once, wrapped and fully visible. The identity, written-details and telephone cards remain below.
- Removed the saved-progress disclosure and clear-progress control from quote cards, as requested. The existing one-hour tab-session recovery, draft migration, reference/LID, consent and capture behavior remain.
- Added the compact blue Licensed Moving Broker / USDOT 4078939 / MC 1551322 strip in both root layouts and the standalone 404 document, covering all page templates without duplicate header instances. Spanish translates the broker label. Registration identifiers link to consumer information. The strip is omitted when printing.
- Added a lock with “Your Data is Secure” and a shield with “Privacy is our Priority” below the quote actions, plus Spanish equivalents. Privacy links to the existing policy. These are text/icon treatments, not a third-party certification badge or a new security audit.
- Generated six separate custom editorial posters with the built-in image_gen tool. Inventory uses a cutaway home and object checklist; comparison uses paired estimates and a magnifier; roles uses a home/coordinator/carrier sequence; costs uses a calculator/route/shipment; packing checks use separated items and question markers; paperwork uses organized folios. No generic moving photograph is reused. Both languages share topic artwork without embedded language. Cards and article figures retain the whole 3:2 composition.

## Artwork

Final WebP assets: `apps/main-site/public/images/editorial/20261112/` (`inventory`, `estimates`, `roles`, `costs`, `packing`, `paperwork`). Each is 1200×800; the six total approximately 598 KB. The [exact prompt template, individual subjects, original generated paths and final asset paths](posters.json) record provenance. Originals remain under the Codex generated-images directory. These illustrations remain subject to Owner media review with the rest of the preview.

## Verification

51 unit/contract/publication tests, Main Site lint and typecheck passed. Quote regressions at 320/390/1440px passed with all responses mocked: validation, destination selection, guide/back, locale/reload, optional consent false, identical retries, explicit capture and draft clearing. No Lead was created. One parallel dev-server run timed out at the first step; the isolated rerun passed without an application change.

The focused browser harness covers both locales, all services/articles, home/resources and policy/error templates at desktop/phone widths; logo animation/pause/reduced motion, transparent logo wrappers, license identifiers, quote security links and removal of the disclosure. Initial image checks needed to scroll/decode lazy-loaded posters before asserting; the harness was corrected. Final deployment identity, complete results and handoff follow below.

## Qualified preview

[Stable review preview](https://vantage-main-site-optimization.vercel.app) · [Articles](https://vantage-main-site-optimization.vercel.app/resources) · [Immutable deployment](https://vantage-movers-clients-main-site-pu707ilbg-vantage-4d3db9ef.vercel.app)

- Application source `f4b95c8f79b30c0e85ae56b740c49041758735d7`; CI test merge `ef1e6bd7ea18c1a19b3fb09300555886466a5289`, identical tree `511ccac803e2499f84a74251c5f53878164d8e9b`.
- [CI build and deploy](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43308911847) succeeded. Vercel deployment `dpl_D4agsdR9v52yQkz6q2vUXjjob1Qa` is READY, target preview. The stable alias was assigned and inspected against this exact deployment. [Identity record](evidence/deployment.json).
- [602 local checks](evidence/local/report.json) and [602 deployed checks](evidence/deployed/report.json), zero failures. [Eight stable-alias checks](evidence/deployed/stable-report.json) verify both archives, noindex, license strip and six decoded posters. All screenshot captures now wait for lazy images to decode; blank initial captures were replaced.
- [Mocked quote recovery evidence](evidence/quote/report.json) passed at all three widths. No real Lead, phone call or production change. Local development content used its expected no-credential fallback; deployed checks had no browser exceptions.
- Visually inspected the [phone license strip](evidence/deployed/en-mobile-home.png), [quote privacy treatment](evidence/deployed/en-mobile-form.png), [borderless provider ribbon](evidence/deployed/en-referrals.png), [English article posters](evidence/deployed/en-articles.png) and Spanish equivalents.

The checkout is handed off for the Owner’s next session. [Next-session prompt](NEXT-SESSION-PROMPT.md). Draft editorial/media status and prior production gates remain unchanged. Evidence-only commits following the application source do not redeploy the application.
