// Credentials remain in this Node process. Never import this module into browser code.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import dns from "node:dns";

export const previewDatabase = "testvantagemovers_sitepreview";
const defaultPreviewEnv = new URL("../../../../vantage-movers-clients/.env.site-preview", import.meta.url);
const defaultServerEnv = new URL("../../../../vantage-main-server/.env", import.meta.url);
const serverRequire = createRequire(new URL("../../../../vantage-main-server/package.json", import.meta.url));
const evidenceDirectory = new URL("./evidence/", import.meta.url);

export function check(condition, message) {
  if (!condition) throw new Error(message);
}

export async function saveEvidence(name, data) {
  check(/^[a-z0-9-]+\.json$/.test(name), "Invalid evidence filename");
  await mkdir(evidenceDirectory, { recursive: true });
  await writeFile(new URL(name, evidenceDirectory), JSON.stringify(data, null, 2));
}

export async function previewConnection() {
  const env = parseEnv(await readFile(process.env.SITE_PREVIEW_ENV_FILE || defaultPreviewEnv, "utf8"));
  check(env.VERCEL_ENV === "preview", "Preview environment mode required");
  const origin = new URL(env.VANTAGE_API_BASE_URL);
  check(origin.href === "https://vantage-sites-preview-api.vercel.app/", "Only the approved isolated API origin is accepted");
  check(env.FORM_LEAD_ROUTE === "api/v1/form-leads", "Unexpected preview Form Lead route");
  check(Boolean(env.VANTAGE_API_SECRET && env.VANTAGE_API_PROTECTION_BYPASS), "Missing preview credentials");
  return {
    origin: origin.origin,
    async get(path, invalidAuth = false) {
      check(/^\/(db|health|api\/v1\/(testimonials(?:\?published=true)?|moving-carriers(?:\?active=true)?|analytics|form-leads(?:\/[a-f0-9]{24})?)|api\/cron\/sheet-sync)$/.test(path), "Unapproved API read path");
      return fetch(new URL(path, origin), {
        method: "GET", redirect: "error", signal: AbortSignal.timeout(30000),
        headers: {
          "x-api-secret": invalidAuth ? "intentionally-invalid-preview-check" : env.VANTAGE_API_SECRET,
          "x-vercel-protection-bypass": env.VANTAGE_API_PROTECTION_BYPASS,
        },
      });
    },
  };
}

export async function preflight(api) {
  const response = await api.get("/db");
  check(response.status === 200 && response.headers.get("content-type")?.includes("application/json"), "Preview database probe unavailable");
  const db = await response.json();
  check(db.ok === true && db.name === previewDatabase && db.readyState === 1, "Preview database isolation not established");
  const content = [];
  for (const path of ["/api/v1/testimonials?published=true", "/api/v1/moving-carriers?active=true"]) {
    const result = await api.get(path);
    check(result.status === 200, "Preview content read failed");
    const body = await result.json();
    check(Array.isArray(body.data?.items) && body.data.items.length > 0, "Expected preview content fixture missing");
    content.push({ path, status: result.status, fixtureCount: body.data.items.length });
  }
  const unauthorized = await api.get("/api/v1/testimonials", true);
  check(unauthorized.status === 401, "Preview API did not reject invalid authentication");
  const restricted = [];
  for (const path of ["/api/v1/analytics", "/api/cron/sheet-sync", "/api/v1/form-leads"]) {
    const result = await api.get(path);
    check(result.status === 404, "Preview route boundary failed");
    restricted.push({ path, status: result.status });
  }
  return { checkedAt: new Date().toISOString(), origin: api.origin, database: db.name, readyState: db.readyState, invalidAuthentication: unauthorized.status, content, restricted, writes: 0 };
}

export function assertPreviewSite(value) {
  const url = new URL(value);
  check(url.protocol === "https:" && !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash, "A bare HTTPS preview site origin is required");
  check(/^vantage-movers-clients-main-site-[a-z0-9]+-vantage-4d3db9ef\.vercel\.app$/.test(url.hostname) || url.hostname === "vantage-main-site-optimization.vercel.app", "Site origin is outside the Main Site preview allowlist");
  return url.origin;
}

async function withMongoReadback(work) {
  const env = parseEnv(await readFile(process.env.SITE_PREVIEW_SERVER_ENV_FILE || defaultServerEnv, "utf8"));
  check(Boolean(env.MONGO_URI), "Read-only Mongo verification credential unavailable");
  if (env.MONGO_DNS_SERVERS) dns.setServers(env.MONGO_DNS_SERVERS.split(",").map(value => value.trim()).filter(Boolean));
  const { MongoClient } = serverRequire("mongodb");
  const client = new MongoClient(env.MONGO_URI, { maxPoolSize: 1, minPoolSize: 0, serverSelectionTimeoutMS: 10000, socketTimeoutMS: 15000, appName: "main-site-preview-exact-reference-readback" });
  try {
    await client.connect();
    return await work(client);
  } finally { await client.close(); }
}

export async function checkUnusedReference(reference) {
  check(/^MS-[A-Za-z0-9_-]{1,120}$/.test(reference), "A generated Main Site preview reference is required");
  return withMongoReadback(async client => {
    for (const database of [previewDatabase, "vantagemovers"]) {
      const count = await client.db(database).collection("form_leads").countDocuments({ ref_no: reference }, { limit: 1, maxTimeMS: 10000 });
      check(count === 0, "Reference already exists; do not submit again");
    }
    return { previewCount: 0, productionCount: 0 };
  });
}

export async function exactReferenceReadback(reference, api, expected = {}) {
  check(/^(MS|PREVIEW)-[A-Za-z0-9_-]{1,120}$/.test(reference), "A single synthetic preview reference is required");
  return withMongoReadback(async client => {
    const filter = { ref_no: reference };
    // Only equality queries; never enumerate production records or use application models.
    const productionCount = await client.db("vantagemovers").collection("form_leads").countDocuments(filter, { limit: 2, maxTimeMS: 10000 });
    const preview = client.db(previewDatabase);
    const previewCount = await preview.collection("form_leads").countDocuments(filter, { limit: 2, maxTimeMS: 10000 });
    check(productionCount === 0, "Synthetic reference found in production; stop qualification");
    check(previewCount === 1, "Expected exactly one preview Form Lead");
    const lead = await preview.collection("form_leads").findOne(filter, { projection: { _id: 1, source_company: 1, source_company_site: 1, lid: 1, move_size: 1, duplicate: 1, post_to_granot: 1, sheet_sync: 1 }, maxTimeMS: 10000 });
    check(lead.source_company === "main_site" && lead.source_company_site === "vantagehomemovers.com", "Incorrect persisted Main Site attribution");
    if (expected.lid) check(lead.lid === expected.lid, "Persisted LID mismatch");
    if (expected.size) check(lead.move_size === expected.size, "Persisted move-size mismatch");
    const id = String(lead._id);
    const read = await api.get(`/api/v1/form-leads/${id}`);
    check(read.status === 200, "Preview single-lead API readback failed");
    const body = await read.json();
    const apiLead = body.data?.lead ?? body.data?.item ?? body.data;
    check(String(apiLead?._id) === id && apiLead.ref_no === reference, "Preview API readback identity mismatch");
    const messageCount = await preview.collection("lead_messages").countDocuments({ $or: [{ form_lead: lead._id }, { "lead_ref.model": "FormLead", "lead_ref.id": lead._id }] }, { limit: 2, maxTimeMS: 10000 });
    check(lead.post_to_granot === false, "Preview Lead still permits CRM posting");
    check(messageCount === 0, "Unexpected preview Lead Message exists");
    return {
      checkedAt: new Date().toISOString(), reference, leadId: id, previewDatabase, previewCount, productionDatabase: "vantagemovers", productionCount,
      apiReadback: "passed", sourceCompany: lead.source_company, sourceCompanySite: lead.source_company_site,
      lidPreserved: expected.lid ? true : "not supplied", moveSize: lead.move_size, duplicate: lead.duplicate,
      postToGranot: lead.post_to_granot, previewLeadMessageCount: messageCount,
      sheetSyncEntryCount: Array.isArray(lead.sheet_sync) ? lead.sheet_sync.length : null,
      boundary: "Exact-reference counts and one synthetic preview Lead only. Site response does not expose CRM/messaging status; no such response receipt is inferred.",
    };
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let stage = "load-preview-connection";
  try {
    const api = await previewConnection();
    stage = "read-only-api-preflight";
    const result = await preflight(api);
    await saveEvidence("api-preflight.json", result);
    console.log(JSON.stringify(result, null, 2));
    if (process.argv[2] === "--readback") {
      stage = "exact-reference-readback";
      const readback = await exactReferenceReadback(process.argv[3] || "", api);
      await saveEvidence(process.argv[3]?.startsWith("PREVIEW-") ? "historical-readback.json" : "deployed-readback.json", readback);
      console.log(JSON.stringify(readback, null, 2));
    }
  } catch (error) {
    // Network/driver errors can contain credentials or hosts. Never print raw messages.
    console.error(JSON.stringify({ stage, status: "failed", errorType: error?.name || "Error", detail: "No credentials or remote response bodies printed. Inspect the named stage and documented prerequisites." }));
    process.exitCode = 1;
  }
}
