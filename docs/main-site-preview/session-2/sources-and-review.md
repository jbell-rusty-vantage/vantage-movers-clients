# Source checks and editorial review

Checked November 12, 2026, America/New_York. Reviewer for publication: Owner, designated in the active session. Content approval remains pending. Codex performed the source inspection and wrote the drafts; no human source or Spanish review is invented.

## Evidence gathered

Official pages were read with the Tavily extraction CLI. The first batch returned all five requested pages with no failed results, request `923a723e-06c3-4047-a49f-f4b1f2e6f119`. The second batch returned the three requested pages with no failed results, request `0359f509-5480-4573-a9af-fa40f1a5ddf2`. The second batch used a relevant-content query for park access, construction, estimates and carrier responsibility. These request identifiers are provenance, not durable public snapshots; the content tree retains concise findings and direct source URLs rather than copies of entire pages.

| Source | Observed section and applicable scope | Decision in the drafts | Recheck trigger |
|---|---|---|---|
| [FMCSA: Movers vs. Brokers](https://www.fmcsa.dot.gov/protect-your-move/movers-vs-brokers) | Role comparison and working with brokers; interstate household goods; page updated April 27, 2026 | Separate arranger and transporter. Do not infer a specific carrier assignment from a list. | Pre-publication, role wording or federal guidance changes |
| [FMCSA: Moving Checklist](https://www.fmcsa.dot.gov/protect-your-move/moving-checklist) | Before moving, moving day, delivery day; page updated November 4, 2024 | Compare services and costs, identify contacts, review documents and inventory. Original worksheet is not an official form. | Consumer guidance or document changes |
| [FMCSA: Search for a Registered Mover](https://www.fmcsa.dot.gov/protect-your-move/search-mover) | Lookup fields include business type, registration and contact information | Link readers to the authority; do not claim a fresh Vantage/carrier registration lookup was completed. | Lookup destination or business identity change |
| Current Vantage control, `apps/main-site/src/lib/content.ts` at `145a4dd` | `business.brokerDisclaimer` and `hero.brokerNote` | Retain the existing broker/carrier distinction as internal baseline. Do not introduce fresh license, volume or guaranteed-service claims. | Owner operations/legal review before release |
| [Wisconsin DOT: New residents](https://wisconsindot.gov/Pages/dmv/vehicles/title-plates/new-res-default.aspx) | Driver license/ID and title/plates sections; includes Spanish link | Direct readers to current official instructions. Some extracted dynamic blocks were unavailable, so deadlines, fees and eligibility are deliberately omitted. | DMV process change or adding a deadline/eligibility statement |
| [Madison: August Student Move-Out](https://www.cityofmadison.com/streets/trash-recycling/move-out-clean-outs/august-student-move-out) | Defined student area, work-order rules, electronics and collection guidance for 2026 | Limit seasonal statement to the mapped area and applicable dates. Do not carry historical 2026 dates into a future move. | Every new annual notice or policy/map change |
| [Madison: LakeWay project](https://www.cityofmadison.com/parks/projects/madison-lakeway-lake-monona-waterfront) | October 15, 2026 update: anticipated June 2027 start subject to contract award | Treat improvements as planned construction, not an open destination. Ask readers to check current access notices. | New project/access update and pre-publication |
| [Madison Parks: Washington Manor Park](https://www.cityofmadison.com/parks/find-a-park/park.cfm?id=1369) | Listed playground and basketball court | Offer a concrete local destination with a current-information link; do not guarantee same-day access. | Amenity/closure changes and pre-publication |

The legacy [FMCSA consumer handbook landing page](https://www.fmcsa.dot.gov/consumer-protection/your-rights-and-responsibilities-when-you-move) was also inspected. It described a 2013 document. The new drafts use the current maintained checklist and role/lookup pages for the claims they actually make; this session does not silently relabel the old landing page as the latest handbook edition or change the site's existing PDF redirects.

## Claims deliberately withheld

| Affected entries | Not asserted in the new copy | Evidence needed to add a promise |
|---|---|---|
| All services and home integration | Live move counts, review totals, all-state coverage, savings, guaranteed pickup/delivery, “no hidden fees” or a universally binding estimate | Named operational source and exact approved wording; measured claims need dated evidence |
| Storage | Climate control, unrestricted access, owned facilities, availability for every route | Approved provider conditions, scope, terms and availability process |
| Vehicle transport | Guaranteed open/enclosed options, equipment ownership, insurance coverage, shared household-goods contract | Confirmed workflow and provider-specific service/contract terms |
| Military / veteran | Government affiliation, reimbursement, discounts or guaranteed weight tickets | Responsible operations confirmation plus applicable official program authority where relevant |
| Senior | Medical care, personal assistance or a specialist care program | Explicit service scope and responsible provider |
| Office | IT installation, data handling or guaranteed downtime | Explicit commercial scope and responsible provider |
| Packing / residential | Universal inclusion of unpacking, all handling, disposal, full protection or any acceptance of restricted items | Carrier-specific instructions and reviewed written terms |
| Wisconsin / Madison | Local Vantage office, intrastate availability, all-route service coverage | Approved geographic/service scope |

Rather than fill these gaps with promises, the drafts ask the customer to get answers for the actual shipment. The finished estimate example is fictional original work; its arithmetic is not evidence of Vantage rates. Military, vehicle and office pages ask planning questions without importing household-goods consumer rules as a guarantee for another shipment type.

## Owner review order

1. Review long-distance, the estimate worksheet and the responsibility guide in both languages. Confirm that readers can identify who transports, compare included work and find the official authority.
2. Review Wisconsin and Madison for usefulness and scope. Confirm the dated source statements and publication-time rechecks.
3. Review the other seven services, especially storage, vehicle, military and office wording. Keep questions where operational offerings remain unconfirmed.
4. Record the reviewed source revision and each approved locale, then have the integration change the publication state. A source-check date or a successful build must never grant approval by itself.

The Owner's selection of a preview design and approval of each locale are separate from the deployed quote/analytics evidence. All three are needed for the production candidate described in the runbook.
