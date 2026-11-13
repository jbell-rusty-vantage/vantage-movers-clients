import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { spawn } from "node:child_process";
import { check } from "./preview-qualification.mjs";

const source = process.env.SITE_PREVIEW_ENV_FILE || new URL("../../../../vantage-movers-clients/.env.site-preview", import.meta.url);
const preview = parseEnv(await readFile(source, "utf8"));
check(preview.VERCEL_ENV === "preview" && preview.VANTAGE_API_BASE_URL === "https://vantage-sites-preview-api.vercel.app" && preview.FORM_LEAD_ROUTE === "api/v1/form-leads", "Approved isolated preview environment required");
const env = { ...process.env, VERCEL_ENV: "preview", RAYON_NUM_THREADS: "2", GOOGLE_SERVICE_ACCOUNT_JSON: "" };
for (const key of ["VANTAGE_API_BASE_URL", "VANTAGE_API_SECRET", "VANTAGE_API_PROTECTION_BYPASS", "FORM_LEAD_ROUTE"]) env[key] = preview[key];
// Fixed command arguments only; credentials are passed solely through child environment.
const child = spawn("pnpm --filter @vantage/main-site build", { env, stdio: "inherit", shell: true });
child.on("exit", code => { process.exitCode = code ?? 1; });
