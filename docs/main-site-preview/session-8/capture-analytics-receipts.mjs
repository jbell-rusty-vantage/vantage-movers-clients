// Read-only aggregation receipts for the exact synthetic Preview deployment.
import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const output = new URL("./evidence/analytics-native-20261112/", import.meta.url);
await mkdir(output, { recursive: true });
const common = "--project prj_NdJhC2yevE4wx3XqZrH7Yt5rJU4P --scope vantage-4d3db9ef --since 2026-11-12T15:32:00Z --until 2026-11-12T15:38:00Z --json";
const host = "requestHostname:vantage-movers-clients-main-site-6wze5e9bt-vantage-4d3db9ef.vercel.app";
const deployment = "deploymentId:dpl_3mQdrBPimckecxJ4KZ7vWatLk1cu";
for (const environment of ["preview", "production"]) {
  for (const product of ["analytics", "speed"]) {
    const args = product === "analytics"
      ? `vercel.analytics.event.count --group-by eventName --limit 30 --filter ${host}`
      : `vercel.speed_insights.lcp_ms --aggregation count --group-by requestPath --filter ${deployment}`;
    const result = spawnSync(`vercel metrics ${args} --filter environment:${environment} ${common}`, { shell: true, encoding: "utf8", timeout: 45000 });
    if (result.status !== 0) throw new Error(`Metrics query failed: ${product}/${environment}`);
    const body = JSON.parse(result.stdout);
    await writeFile(new URL(`${product}-${environment}.json`, output), JSON.stringify(body, null, 2));
    console.log(JSON.stringify({ product, environment, query: body.query, summary: body.summary }));
    if (environment === "production" && body.summary.some(row => Object.entries(row).some(([key, value]) => key.endsWith("_count") && Number(value) > 0))) throw new Error("Preview traffic appeared in Production");
    if (environment === "preview" && product === "analytics") {
      const count = name => body.summary.find(row => row.eventName === name)?.vercel_analytics_event_count_count ?? 0;
      if (count("form_submit_success") !== 1 || count("form_submit_attempted") !== 1 || count("form_started") !== 2) throw new Error("Expected synthetic event receipts are absent or duplicated");
    }
    if (environment === "preview" && product === "speed" && !body.summary.some(row => row.vercel_speed_insights_lcp_ms_count > 0)) throw new Error("Missing performance receipt");
  }
}
