import {
  CAMPAIGN_MEDIA, CAMPAIGN_NAMES, CAMPAIGN_SOURCES, REFERRING_HOSTS,
  parseWebsiteAttribution, websitePage, WEBSITE_DESIGN,
  type WebsiteAttribution, type WebsiteTouch,
} from "@vantage/api-client/website-attribution";

export const WEBSITE_ATTRIBUTION_KEY = "vantage.website-attribution.v1";
type Storage = Pick<globalThis.Storage, "getItem" | "setItem" | "removeItem">;
const ownHosts = new Set(["vantagehomemovers.com", "www.vantagehomemovers.com", "vantage-main-site-optimization.vercel.app"]);
function allowed<T extends string>(value: string | null, values: readonly T[], fallback: T): T {
  return values.includes(value as T) ? value as T : fallback;
}

/** No visitor ID, free-form campaign, full referrer, query, itinerary or form values. */
export function updateWebsiteAttribution(input: {
  href: string; referrer: string; storage: Storage; now?: number; disabled?: boolean; internalNavigation?: boolean;
}): WebsiteAttribution | undefined {
  try {
    if (input.disabled) { input.storage.removeItem(WEBSITE_ATTRIBUTION_KEY); return; }
    const now = input.now ?? Date.now();
    const url = new URL(input.href);
    const page = websitePage(url.pathname);
    if (!page) return;
    let previous: WebsiteAttribution | undefined;
    try { previous = parseWebsiteAttribution(JSON.parse(input.storage.getItem(WEBSITE_ATTRIBUTION_KEY) ?? "null"), now); } catch { /* Expired or corrupt storage starts a new bounded session. */ }
    let externalHost = "";
    try {
      const ref = new URL(input.referrer);
      if (/^https?:$/.test(ref.protocol) && ref.host !== url.host && !ownHosts.has(ref.hostname)) externalHost = ref.hostname.replace(/^www\./, "");
    } catch { /* A missing referrer is direct or unmeasured. */ }
    const hasCampaign = ["utm_source", "utm_medium", "utm_campaign"].some(key => url.searchParams.has(key));
    const isNewTouch = !input.internalNavigation;
    const referring_host = allowed(externalHost || "none", REFERRING_HOSTS, "other");
    const channel = isNewTouch && hasCampaign ? "campaign" : isNewTouch && externalHost
      ? (["google.com", "bing.com", "duckduckgo.com"].includes(externalHost) ? "organic_search" : "referral") : "direct";
    const current: WebsiteTouch = {
      ...page, occurred_at: new Date(now).toISOString(), channel,
      referring_host: isNewTouch ? referring_host : "none",
      ...(channel === "campaign" ? { campaign: {
        source: allowed(url.searchParams.get("utm_source"), CAMPAIGN_SOURCES, "unknown"),
        medium: allowed(url.searchParams.get("utm_medium"), CAMPAIGN_MEDIA, "unknown"),
        name: allowed(url.searchParams.get("utm_campaign"), CAMPAIGN_NAMES, "unknown"),
      } } : {}),
    };
    const latest = current.channel !== "direct" ? current : previous?.latest_non_direct_touch;
    const snapshot: WebsiteAttribution = {
      version: 1, first_touch: previous?.first_touch ?? current,
      ...(latest ? { latest_non_direct_touch: latest } : {}), capture_page: page, design: WEBSITE_DESIGN,
    };
    input.storage.setItem(WEBSITE_ATTRIBUTION_KEY, JSON.stringify(snapshot));
    return snapshot;
  } catch { return; } // Tracking/storage failure never enters the Lead capture failure path.
}

let observedDocument = false;
export function captureWebsiteAttribution(): WebsiteAttribution | undefined {
  try {
    const disabled = navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    const result = updateWebsiteAttribution({ href: window.location.href, referrer: document.referrer, storage: sessionStorage, disabled, internalNavigation: observedDocument });
    observedDocument = true;
    return result;
  } catch { return; }
}
