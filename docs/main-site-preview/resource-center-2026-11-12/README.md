# Resource center and hero refinement — 2026-11-12

This round advances the Owner's review preview: an editorial resource center, consistent image-and-quote service heroes, shared hero facts, FAQ navigation and a floating call control. It is implementation for Owner review, not editorial publication approval or completion of the five-stage roadmap.

## Owner direction recorded

- Model the resource experience more closely on Safe Ship: article posters, reading times, date metadata, guide categories and prominent moving authorities. Establish the editable structure before polishing every article.
- Add FAQ to navigation and a hover-triggered Resources card menu. Resource types are Articles, Moving Guides, Checklists & Worksheets, and Moving Authorities.
- Give every service the homepage's image/copy/quote composition. Pay particular attention to which part of each photograph remains visible beside the form and behind the copy.
- Repeat a compact feature/proof row in every service hero and both homepages. The Owner cited Safe Ship's moves coordinated, Trustpilot rating, states served and free-quote treatment as the structural reference.
- Include practical long-distance pricing context and common options.
- Make the call control float unobtrusively after scrolling.
- Continue toward destination-driven state/city resources at the appropriate roadmap stage. Wisconsin is an implemented, source-checked draft pilot, not arbitrary filler. Broader coverage remains planned.

## Implemented

Both languages have the four resource sections, six article cards with original poster assets, computed reading times, honest draft-update dates, article contents navigation, source references and printable worksheets. Official FMCSA and USA.gov resources lead the directory. Existing route identities and attribution allowlists are preserved: resource categories use anchors rather than new routes.

The optional `publishedAt` field is displayed as a publication date only when the entry has reviewed status and a named reviewer. A date on a draft does not bypass the existing publication gate. No article was approved or published by this work. Existing 32 localized editorial entries retain their draft state; the new Spanish FAQ and new pricing presentation also await Owner/editorial review.

The homepage and all eight service types use shared image-composition and hero-facts components. The image occupies the left portion on desktop, with its people/subject above the text and outside the quote column. A separate mobile focal position and fade preserve the scene above stacked copy and form. The actual existing QuoteWizard is in each service hero exactly once, preserving service identity, destination links and quote behavior. Original illustrative media provenance remains in the preceding milestone's media record. No competitor photography or article copy was imported.

The Owner then instructed: “No but use 50000 … You could use BBB … No Trust Pilot account.” The shared hero now uses **50,000 moves coordinated** as the Owner-supplied preview figure, the BBB customer-review score, interstate coordination and a free quote request. The count's period, definition and supporting data are still unknown. It is guarded by explicit preview mode, with a nonnumeric fallback in production/unknown modes. This authorizes the review mockup, not an independently verified customer count or production publication.

BBB was matched by legal name, address, USDOT 4078939 and MC1551322. A fresh Firecrawl scrape of the linked customer-reviews page on 2026-11-12 returned **4.48/5 from 423 reviews**. Cached web-search content returned older values (4.43/362), which were not used. The displayed score is explicitly labeled **BBB customer reviews**, dated and linked. It is not BBB's business grade or accreditation. The separate profile reports B- and not accredited; no accreditation logo, endorsement badge, A+ or Trustpilot claim was added. Refresh the score/count and date together before publication, and confirm any use of BBB brand assets before adding a logo. This implementation uses plain text and a source link.

BBB sources: https://www.bbb.org/us/fl/boynton-beach/profile/moving-brokers/vantage-movers-llc-0633-92031922 and its `/customer-reviews` page. Acquisition receipt: Firecrawl scrape `01a1d158-21b7-77fa-8ab8-fdf1125387a5`, 2026-11-12. No customer review quotations were copied.

Long-distance pricing now compares self-packing, packing assistance and storage needs, with written-estimate questions and cost drivers. It does not claim these are fixed packages or quote unsupported dollar ranges. Numerical ranges and timing examples require Vantage-approved evidence and precise scope.

Resources supports pointer hover, keyboard activation, Escape/focus return, outside dismissal and mobile links. FAQ links reach real localized homepage sections. The floating telephone link appears after 480px, hides during field editing and can be dismissed. It records bounded phone intent only; it does not assert Call Lead capture or booking.

## Destination resource direction

1. Keep confirmed country/state/city from Places as the selection input. Do not infer city identity from a ZIP string or free-text match alone.
2. Introduce a central resource registry keyed by country + state and, where available, confirmed city identity. Resolve approved/preview-eligible city guide, then state guide, then generic moving guide.
3. Start with high-value, source-backed destinations and essential official contacts. National planning scope is the 50 states; D.C. and territories need explicit separate scope. Do not generate thin pages for every city just to inflate coverage.
4. Each location needs dated sources, a responsible reviewer, useful preparation content and an explicit distinction between guide availability, carrier availability and a local office.
5. Retain the quote draft during exploration. Add routes to both frontend and backend bounded-attribution contracts when routes are actually introduced. Test city/state collisions, unserved routes, missing guides and locale fallback.

This round deliberately retains the tested Wisconsin/Madison/generic resolution. It does not claim national guide coverage.

## References and factual boundaries

Structural references inspected 2026-11-12:
- https://safeshipmoving.com/articles/senior-moving-services/ — article poster, category, date, read time, introduction and structured sections.
- https://safeshipmoving.com/services/long-distance-moving-services/ — hero/quote, cost context, comparison structure, process and FAQs.

Official links checked 2026-11-12:
- https://www.fmcsa.dot.gov/protect-your-move
- https://www.fmcsa.dot.gov/protect-your-move/search-mover
- https://www.usa.gov/state-consumer

Safe Ship's customer counts, ratings, rate ranges, nationwide coverage, binding-estimate language and delivery windows are not evidence for Vantage. These were not transferred. Linking official guidance does not imply government endorsement or a claim that FMCSA resolves individual damage disputes.

## Qualification and deployment

Local structural qualification passed 802 checks with zero failures. The first run targeted a hidden Places input in its focus assertion; the corrected test targets the visible field. The final Owner-supplied hero count and refreshed BBB snapshot will be qualified on the deployed build. Deployment receipts and immutable source mapping will be added after the existing preview workflow completes.

Local checks: Main Site unit/contract/publication suite (47 tests); workspace lint (no errors; two existing partner-app warnings); workspace typecheck; mocked quote regression at 390px and 1440px, including saved draft, locale changes, destination fallback, false-success and retry responses, identical retry payloads, false consent retention and clearing after capture. No real Lead or phone call was created in this round.

`qualify.mjs` performs read-only responsive checks, navigation interactions, hero/form placement, article metadata and floating-call behavior. Evidence separates localhost and deployed preview. Localhost screenshot runs may show development diagnostics. Real browser 200% zoom remains a previously recorded qualification gap; viewport checks do not close it.

## Next review and stage boundary

Owner review should focus on the resource taxonomy and article presentation, image composition across services, shared hero facts and the call control. Remaining business inputs: approved customer-count definition and period, BBB snapshot refresh and any future logo permissions, confirmed coverage claim, defensible price ranges, Spanish review and publication approvals. Further guide copy can be improved independently using reliable sources.

No production deployment, approval of drafts, changes to authoritative Booking/Cancellation semantics or growth campaign work is part of this round. See [next-session prompt](NEXT-SESSION-PROMPT.md), [previous implementation milestone](../milestone-2026-11-12/README.md), and [roadmap section 9](../../website-operations-proposal.md).
