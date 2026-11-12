import { describe, expect, it } from "vitest";
import { editorialEntries } from "@/content/editorial";
import { parseWebsiteAttribution, websitePage } from "@vantage/api-client/website-attribution";
import { updateWebsiteAttribution, WEBSITE_ATTRIBUTION_KEY } from "./website-attribution";

const now = Date.parse("2026-11-12T18:00:00Z");
function storage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
}
const href = "https://vantagehomemovers.com/resources/moving-cost-guide?utm_source=review&utm_medium=review&utm_campaign=preview-qualification&email=private@example.com";
describe("bounded website attribution", () => {
  it("retains acquisition across guide, locale and direct returns while recording capture page", () => {
    const store = storage();
    const first = updateWebsiteAttribution({ href, referrer: "https://google.com/search?q=private", storage: store, now });
    const moved = updateWebsiteAttribution({ href: "https://vantagehomemovers.com/es/servicios/mudanzas-larga-distancia", referrer: "https://google.com/search?q=private", internalNavigation: true, storage: store, now: now + 1000 });
    const direct = updateWebsiteAttribution({ href: "https://vantagehomemovers.com/es", referrer: "", storage: store, now: now + 2000 });
    expect(moved?.first_touch).toEqual(first?.first_touch);
    expect(direct?.latest_non_direct_touch).toEqual(first?.first_touch);
    expect(moved?.capture_page).toMatchObject({ content_id: "long-distance-moving", locale: "es" });
    expect(JSON.stringify(moved)).not.toMatch(/private|email=|search\?|utm_/);
  });
  it("keeps first touch when a later external referral replaces latest non-direct", () => {
    const store = storage();
    const first = updateWebsiteAttribution({ href: "https://vantagehomemovers.com/", referrer: "", storage: store, now });
    const next = updateWebsiteAttribution({ href: "https://vantagehomemovers.com/services/storage-options", referrer: "https://chatgpt.com/c/private-id", storage: store, now: now + 1000 });
    expect(next?.first_touch).toEqual(first?.first_touch);
    expect(next?.latest_non_direct_touch).toMatchObject({ channel: "referral", referring_host: "chatgpt.com" });
  });
  it("never promotes an internal referral or arbitrary campaign into known acquisition", () => {
    const next = updateWebsiteAttribution({ href: "https://vantagehomemovers.com/?utm_campaign=private@example.com&utm_source=Alice&utm_medium=5551234567", referrer: "https://www.vantagehomemovers.com/contact?name=Alice", storage: storage(), now });
    expect(next?.first_touch.campaign).toEqual({ name: "unknown", source: "unknown", medium: "unknown" });
    expect(next?.first_touch.referring_host).toBe("none");
    expect(JSON.stringify(next)).not.toMatch(/Alice|555|@/);
  });
  it("expires sessions, respects privacy opt-out and isolates corrupt or unavailable storage", () => {
    const store = storage();
    updateWebsiteAttribution({ href, referrer: "", storage: store, now });
    const expired = updateWebsiteAttribution({ href: "https://vantagehomemovers.com/", referrer: "", storage: store, now: now + 86_400_001 });
    expect(expired?.first_touch.channel).toBe("direct");
    expect(updateWebsiteAttribution({ href, referrer: "", storage: store, now, disabled: true })).toBeUndefined();
    expect(store.getItem(WEBSITE_ATTRIBUTION_KEY)).toBeNull();
    store.setItem(WEBSITE_ATTRIBUTION_KEY, "bad-json");
    expect(updateWebsiteAttribution({ href, referrer: "", storage: store, now })).toBeDefined();
    expect(updateWebsiteAttribution({ href, referrer: "", storage: { ...store, getItem() { throw Error("disabled"); }, setItem() { throw Error("disabled"); } }, now })).toBeUndefined();
  });
  it("rejects unknown paths, timestamps and fabricated design assignments", () => {
    const snapshot = updateWebsiteAttribution({ href, referrer: "", storage: storage(), now })!;
    expect(parseWebsiteAttribution({ ...snapshot, first_touch: { ...snapshot.first_touch, path: "/customer/alice" } }, now)).toBeUndefined();
    expect(parseWebsiteAttribution({ ...snapshot, first_touch: { ...snapshot.first_touch, occurred_at: "2099-01-01" } }, now)).toBeUndefined();
    expect(parseWebsiteAttribution({ ...snapshot, design: { id: "winner", version: "fake" } }, now)).toBeUndefined();
    expect(parseWebsiteAttribution({ ...snapshot, experiment: "fake", name: "private" }, now)).toEqual(snapshot);
    for (const entry of editorialEntries) expect(websitePage(entry.path)).toMatchObject({ content_id: entry.id, locale: entry.locale });
  });
});
