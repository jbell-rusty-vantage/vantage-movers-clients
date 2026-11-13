// Read-only qualification for the single synthetic Canyon browser quote.
import {
  check, checkUnusedReference, exactReferenceReadback, preflight, previewConnection,
} from "../session-8/preview-qualification.mjs";

const [mode, reference, lid] = process.argv.slice(2);
const serverSha = "b926311ee9b8ceb16be57dad9435624f1ad8beac";
const referencePattern = /^MS-[0-9]{8}-[A-Z0-9]{1,10}-CANYON-20261113-01$/;
let stage = "arguments";

try {
  check(["preflight", "before", "after"].includes(mode), "Expected preflight, before or after");
  if (mode !== "preflight") check(referencePattern.test(reference), "Expected the exact generated Canyon qualification Tracking Reference");
  if (mode === "after") check(/^LID[a-f0-9]{13}$/.test(lid), "Expected the submitted LID");

  stage = "isolated API and exact source";
  const api = await previewConnection();
  const apiBoundary = await preflight(api);
  const loadReport = async () => {
    const response = await api.get("/api/v1/site-preview/website-outcomes");
    check(response.status === 200, "Expected the authenticated outcome report");
    const report = await response.json();
    check(report.source_sha === serverSha && report.ok === true &&
      report.data?.report === "website-outcomes" && Array.isArray(report.data?.data?.items), "Unexpected API source or report failure");
    return report.data.data;
  };
  if (mode === "preflight") {
    await loadReport();
    console.log(JSON.stringify({ serverSha, apiBoundary }, null, 2));
  } else if (mode === "before") {
    await loadReport();
    stage = "unused exact Tracking Reference";
    console.log(JSON.stringify({ reference, ...await checkUnusedReference(reference), serverSha, apiBoundary }, null, 2));
  } else {
    stage = "one exact preview record and zero production matches";
    const result = await exactReferenceReadback(reference, api, { lid, size: "2 Bedrooms" });
    stage = "disabled CRM, messaging and Sheet Sync";
    check(result.postToGranot === false && result.previewLeadMessageCount === 0 && result.sheetSyncEntryCount === 0, "Unexpected side-effect evidence");

    stage = "persisted Canyon design";
    const snapshot = result.websiteAttribution;
    check(snapshot?.design?.id === "main-site-canyon" && snapshot.design.version === "2026-11-13" &&
      Boolean(snapshot.received_at), "Unexpected Canyon attribution receipt");
    const touch = snapshot.latest_non_direct_touch ?? snapshot.first_touch;
    stage = "matching Canyon outcome group";
    const report = await loadReport();
    const matchingGroup = report.items.find(item =>
      item.design_id === snapshot.design.id && item.design_version === snapshot.design.version &&
      item.channel === touch.channel && item.source === (touch.campaign?.source ?? touch.referring_host) &&
      item.medium === (touch.campaign?.medium ?? "none") && item.campaign === (touch.campaign?.name ?? "none") &&
      item.landing_path === touch.path && item.content_id === touch.content_id && item.locale === touch.locale &&
      item.capture_content_id === snapshot.capture_page.content_id && item.capture_locale === snapshot.capture_page.locale);
    check(matchingGroup?.attributed_leads >= 1, "Canyon attribution missing from the outcome report");
    console.log(JSON.stringify({
      serverSha, apiBoundary, ...result,
      outcomeGroup: {
        designId: matchingGroup.design_id, designVersion: matchingGroup.design_version,
        channel: matchingGroup.channel, source: matchingGroup.source, campaign: matchingGroup.campaign,
        landingContent: matchingGroup.content_id, landingLocale: matchingGroup.locale,
        captureContent: matchingGroup.capture_content_id, captureLocale: matchingGroup.capture_locale,
        attributedLeads: matchingGroup.attributed_leads,
      },
    }, null, 2));
  }
} catch {
  console.error(JSON.stringify({ stage, status: "failed", writes: 0 }));
  process.exitCode = 1;
}
