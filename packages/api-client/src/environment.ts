export const PRODUCTION_API_URL = "https://vantage-movers-main-server.vercel.app";

/** Preview requests must never fall back to the live API. */
export function resolveApiBaseUrl(value: string | undefined, environment?: string): string {
  const configured = value?.trim().replace(/^(['"])(.*)\1$/, "$2");
  if (!configured) {
    if (environment === "preview") throw new Error("Preview requires VANTAGE_API_BASE_URL");
    return PRODUCTION_API_URL;
  }
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(configured) ? configured : `https://${configured}`);
    if (!["http:", "https:"].includes(url.protocol) || url.search || url.hash || url.username || url.password) {
      throw new Error("Invalid API URL");
    }
    if (environment === "preview" && (
      url.hostname === new URL(PRODUCTION_API_URL).hostname ||
      url.hostname === "vantage-movers-servers.vercel.app"
    )) throw new Error("Preview cannot use the production API");
    return url.toString().replace(/\/+$/, "");
  } catch (error) {
    if (environment === "preview") throw error;
    console.warn("[vantage] VANTAGE_API_BASE_URL is invalid; using the production API URL");
    return PRODUCTION_API_URL;
  }
}
