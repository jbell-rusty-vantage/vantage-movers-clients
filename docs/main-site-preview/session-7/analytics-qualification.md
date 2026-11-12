# Preview analytics qualification — November 12, 2026

The measurement gap is closed for the Main Site preview. Vercel Web Analytics and Speed Insights have actual Preview dataset receipts, including one confirmed capture, and the corresponding Production queries are empty. These are synthetic QA sessions, not customer conversion or field-performance statistics.

## Source and isolation

Application source `10ec4d24e6f816d4540c2314aad93e52ee795e69`; CI test-merge `daeb7491524d896abc3192953032767f0035a185`; deployment `dpl_3mQdrBPimckecxJ4KZ7vWatLk1cu`. [Main Site CI](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43248637602) and companion Clients CI passed. Main Site lint/typecheck and all 29 contracts passed before deployment.

The existing Vercel project already had both products enabled. No paid service, plan change, new dataset or backend schema was introduced. The signed-in Vantage Pro dashboard defaulted to **Production** and offered a separate **Preview** filter. Production reporting must retain that filter; **All Environments intentionally includes QA traffic**. The [Preview dashboard](https://vercel.com/vantage-4d3db9ef/vantage-movers-clients-main-site/analytics?environment=preview) and [production dashboard](https://vercel.com/vantage-4d3db9ef/vantage-movers-clients-main-site/analytics?environment=production) are distinct views of the same project.

`telemetryMode` permits deployed Preview collection only when `VERCEL_ENV=preview` and the build has a valid `VERCEL_GIT_COMMIT_SHA`. Both existing preview workflows supply that SHA; Turbo now forwards/hashes it. Local sessions without deployment identity keep their bounded diagnostics offline. Production remains attributed as production. No new browser secret or public credential was added. Events retain the two allowlisted context/detail properties, and automatic URLs retain only approved paths.

## Actual receipts

The signed-in in-app browser exercised the English service quote, then switched to Spanish and began an unsubmitted Spanish form. Bounded network observation recorded no contact details, ZIPs, reference or LID in collector payloads. The custom events and Speed Insights endpoint returned 200. The separate aggregation readback proves delivery beyond those HTTP responses.

| Receipt, exact preview host / deployment, 15:32–15:38 UTC | Observed |
|---|---:|
| `form_started` | 2: English and Spanish |
| `form_step_completed` | 2: English steps 1 and 2 |
| `form_submit_attempted` | 1 |
| `form_submit_success` | 1 |
| `form_step_viewed` | 3 |
| Speed Insights LCP samples | 1 English service, 1 Spanish service |
| Same preview host's events under Production | 0 |
| Same deployment's LCP samples under Production | 0 |

The dashboard's `form_started` → `context` breakdown visibly showed `main-site-optimization|preview|long-distance-moving|en` and its `es` counterpart once each. This verifies received variation, environment, service and locale values. The two custom properties fit the existing account; no upgrade was needed. Receipts appeared within approximately two minutes. This is not a guarantee of future collection latency.

Evidence: [native browser observation](../session-8/evidence/analytics-native-20261112/browser-receipts.json), [Preview events](../session-8/evidence/analytics-native-20261112/analytics-preview.json), [Production exclusion](../session-8/evidence/analytics-native-20261112/analytics-production.json), [Preview performance](../session-8/evidence/analytics-native-20261112/speed-preview.json), [Production performance exclusion](../session-8/evidence/analytics-native-20261112/speed-production.json). Reproduce the bounded read-only aggregates with `node docs/main-site-preview/session-8/capture-analytics-receipts.mjs`.

## Quote and automated-browser distinction

The native-browser reference `MS-20261112-7D30920C03` returned HTTP 200 and `leadCaptured: true`, with visible Request Received. [Exact-reference readback](../session-8/evidence/analytics-native-20261112/deployed-readback.json) verifies preview Form Lead `6af5dcbe6f5de80e075af132`, preview count 1 / production count 0, Main Site attribution, retained LID, Studio size, disabled CRM posting, zero scoped Lead Messages and zero Sheet Sync entries. Consent was submitted false.

The earlier automated qualification on this same source also saved one distinct synthetic preview Lead, reference `MS-20261112-67847D7501-PREVIEW-1794497595913`, but produced no collector requests. Inspection of the served vendor scripts found an intentional early return for `navigator.webdriver` or Headless user agents. Changing only the user agent did not bypass that rule. We preserved the test receipt, did not retry its submission, and switched to ordinary UI interactions in the signed-in browser without modifying automation detection. Future automated qualification uses its normal user agent and explicitly does not claim analytics delivery.

Across the upgrade there are **three** deliberate synthetic test Leads: the initial pre-telemetry candidate, the new candidate's automated quote check, and the native-browser analytics qualification. Each has a different reference and an individual count-one / production-zero readback. Only the native-browser test produced the one remote capture event. Do not rerun any submission to refresh evidence; use the exact-reference readers.

## Remaining scope

Booking attribution still needs its separate authoritative server join; a browser capture event is not a Booking. Phone clicks remain intent only. These few synthetic performance samples qualify delivery, not a field performance score. Owner editorial/media review and production selection remain open.

Official references checked during qualification: [Vercel environment attribution](https://vercel.com/changelog/speed-insights-and-web-analytics-now-support-custom-environments), [metrics CLI](https://vercel.com/docs/cli/metrics), [Speed Insights](https://vercel.com/docs/speed-insights), [Web Analytics filtering](https://vercel.com/docs/analytics/filtering). Current project configuration, CLI schema and actual dashboard/query results—not documentation alone—establish this project's qualification.
