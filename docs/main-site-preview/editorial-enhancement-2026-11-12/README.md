# Resources ready for Owner review — November 12, 2026

Owner goal: the final Resources implementation before reviewing the optimization preview. This change makes the existing six bilingual guides easier to find, recognizes the Owner-led editorial team, replaces the repeated person imagery, and puts federal information in both Resources and Consumer Information. It does not approve the draft articles or select a production design.

## Implemented

- A featured estimate-comparison guide, searchable six-article library, combined topic filtering, result counts, clear/reset and empty results. Topics reflect existing content: Moving tips, Cost & pricing, Packing & preparation, Paperwork & rights. Military, corporate and city categories are not empty filters; their existing service/destination routes remain available in navigation.
- Six original still-life covers for inventory, estimates, coordination, budget, packing and paperwork. One registry supplies archive cards, related cards and article heroes. No people or vehicles. Generated illustrations are identified on article pages; [prompts and provenance](poster-prompts.json).
- Public byline: **Vantage Movers Editorial Team** / **Equipo editorial de Vantage Movers**, with an Owner-led editorial profile and correction/contact link. Internal drafting provenance and pending review status remain intact. This is a collective editorial identity, not a claim about staff count or credentials.
- Reading times, explicit draft-update dates, publication dates only with reviewed status, a named reviewer and a publication date; later material revisions can have `updatedAt`. No artificial backdated publication history.
- Printable worksheet links go directly to the worksheet anchors. The existing browser print/save-to-PDF functionality remains available. These are practical guides and worksheets, not newly invented research or white papers.
- One shared federal collection on Resources and Consumer Information: FMCSA Protect Your Move, registration search, stored 2013 Rights and Responsibilities PDF and stored 2006 Ready to Move PDF. The current web sources and archived PDFs are distinguished. The assigned-carrier paperwork qualification remains explicit. All four open a new tab with appropriate rel attributes.
- New content and image descriptors appended to the preview CMS. Existing descriptors, Owner overrides and testimonial policy preserved; identical replay appended zero fields. [Catalog receipt](catalog-receipt.json). Historical descriptors remain immutable for revision compatibility.

## Reference review

Reviewed [Safe Ship's article library](https://safeshipmoving.com/articles/) through Firecrawl and browser control on November 12. Observed author attribution, topic filters/search, featured articles, image cards, reading times and dates. Used these structural patterns with Vantage copy, design tokens and original images; no competitor text or media imported. Firecrawl receipt `01a1d2a3-a472-7268-bf18-15558adffd92`; raw local research in the parent workspace `.firecrawl/safeship-articles.json`.

Checked current [FMCSA Protect Your Move](https://www.fmcsa.dot.gov/protect-your-move) and [Search a Mover](https://www.fmcsa.dot.gov/protect-your-move/search-mover), receipts `01a1d2a3-7386-712b-a4e1-1e0f481b5d0c` and `01a1d2a3-7386-73ff-8b12-84fe8e19ba99`. The stored PDFs retain their previously verified edition labels; this task does not replace them with an alleged current edition.

## Verification

Main Site lint and typecheck pass. All 67 unit/contract/publication/CMS tests pass, including combined search/filtering, Spanish accent normalization, existing date approval gates and new cover/byline CMS bindings.

Browser control checked the local desktop library, 390px English library and 320px Spanish library/article. Search, topic selection, empty results and reset work; all six covers load; no horizontal document overflow at tested widths. Worksheet anchors and article byline are present. Consumer Information contains the same four targets, all `_blank` with `noopener noreferrer`. Local console only reported the expected missing-secret carrier fallback, not hydration failures. No quote or customer communication was submitted.

Preview deployment and final verification are recorded below when completed. Owner visual/content review, Spanish editorial approval and production selection remain separate.
