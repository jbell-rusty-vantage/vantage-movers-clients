# Website outcome report — isolated qualification

The new report recognizes the website Lead and preserves its source, guide, language and design context. The next business decision is approval of the review candidate, followed by a separately authorized fresh production release. These synthetic preview records do not measure channel performance or justify a growth campaign.

Observed November 12, 2026, at 18:14:47 UTC in `testvantagemovers_sitepreview`. The default cohort covers stored Florida wall-clock timestamps from October 13 at 13:14 through November 12 at 13:14, end exclusive. [Raw aggregate receipt](../session-8/evidence/attribution-20261112/outcomes-after.json).

| Cohort | Eligible Form Leads | Known attribution | Bookings | Cancelled Bookings | Recorded refunds |
|---|---:|---:|---:|---:|---:|
| New review-tagged Spanish cost guide → English Long-distance quote | 1 | 1 | 0 | 0 | $0 |
| Existing synthetic preview records | 9 | 0 | 0 | 0 | $0 |
| Total | 10 | 1 | 0 | 0 | $0 |

All ten Leads are inside the declared 30-day maturity review window. There are no duplicate/bad flags in this test cohort. The nine earlier records remain unknown; the implementation does not invent their browsing history. Before the new capture, the same report contained nine Leads, all unknown. The exact test reference is recorded in the readback receipt; no contact values are included in this report.

The preview does not receive synthetic Bookings merely to fill this table. A separate disposable loopback database exercised the real canonical commands and Mongo report: two Form Leads (one attributed and one historical unknown), one official Booking, one matching Cancellation, $500 deposit, $300 binder and $125 refund. The report returned $375 deposit less recorded refunds and zero active Bookings. This proves the outcome joins without mutating production or the deployed preview's Booking history. The report is observational and does not call deposits or binder profit/revenue.

After a separately authorized production release, the existing authenticated analytics endpoint is `GET /api/v1/admin/analytics/website-outcomes`, with CSV at `/api/v1/admin/exports/analytics/website-outcomes.csv`. Use explicit half-open `from`/`to` calendar bounds (maximum 93 days); the default is 30 days. Read unknown coverage, eligible/duplicate/bad counts and maturity before comparing source/page/locale groups. Outcomes follow official Booking/Cancellation refs only. Missing amounts stay explicit. Narrow the date interval if the 10,000-record limit is reached. This milestone adds no Admin screen or scheduled campaign/report automation.
