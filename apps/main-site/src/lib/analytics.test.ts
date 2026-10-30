import { afterEach, describe, expect, it, vi } from "vitest";

const { track } = vi.hoisted(() => ({ track: vi.fn() }));
vi.mock("@vercel/analytics", () => ({ track }));
import { trackEvent } from "./analytics";

afterEach(() => {
  vi.unstubAllGlobals();
  track.mockReset();
});

function browser(pathname: string) {
  const values = new Map<string, string>();
  vi.stubGlobal("window", {
    location: { pathname },
    sessionStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
  });
  vi.stubGlobal("document", {
    documentElement: { lang: "en", dataset: { deploymentEnvironment: "preview" } },
  });
}

describe("main-site analytics context", () => {
  it("adds preview and homepage identity to conversion and derived engagement events", () => {
    browser("/");
    trackEvent("form_submit_success", { form_name: "main_site_quote" });
    expect(track.mock.calls.map(([name]) => name)).toEqual([
      "site_engaged", "site_lead_intent", "form_submit_success",
    ]);
    for (const [, properties] of track.mock.calls) {
      expect(properties).toMatchObject({
        variation_id: "main-site-a-route", app: "main-site",
        environment: "preview", page: "/", locale: "en",
      });
    }
  });

  it("keeps other pages outside the homepage variation", () => {
    browser("/privacy");
    trackEvent("privacy_policy_clicked");
    expect(track).toHaveBeenLastCalledWith("privacy_policy_clicked", expect.objectContaining({
      variation_id: "main-site-baseline", page: "/privacy",
    }));
  });

  it("cannot throw into intake when analytics and browser storage fail", () => {
    browser("/");
    Object.defineProperty(window, "sessionStorage", { get() { throw new Error("blocked"); } });
    track.mockImplementation(() => { throw new Error("provider unavailable"); });
    expect(() => trackEvent("form_submit_success")).not.toThrow();
  });
});
