import { afterEach, describe, expect, it, vi } from "vitest";
const { sdkTrack } = vi.hoisted(() => ({ sdkTrack: vi.fn() }));
vi.mock("@vercel/analytics", () => ({ track: sdkTrack }));
import { configureAnalytics, trackEvent, trackZipNotRecognized } from "./analytics";
import { telemetryMode } from "./telemetry-mode";

function browser() {
  const storage = new Map<string, string>();
  return {
    location: { pathname: "/" },
    sessionStorage: { getItem: (key: string) => storage.get(key), setItem: (key: string, value: string) => storage.set(key, value) },
    dispatchEvent: vi.fn(),
    __vantagePreviewEvents: [] as { name: string; properties: Record<string, string> }[],
  };
}

afterEach(() => { vi.unstubAllGlobals(); sdkTrack.mockReset(); configureAnalytics("local"); });

describe("analytics delivery", () => {
  it("keeps local diagnostics offline and does not equate phone intent with capture", () => {
    const window = browser();
    vi.stubGlobal("window", window);
    configureAnalytics("local");
    trackEvent("phone_clicked");
    trackZipNotRecognized({ field_name: "dest", zip: "53703", suggestion_count: 0 });
    expect(sdkTrack).not.toHaveBeenCalled();
    expect(window.__vantagePreviewEvents.map((e) => e.name)).toContain("phone_clicked");
    expect(window.__vantagePreviewEvents.map((e) => e.name)).not.toContain("form_submit_success");
    expect(JSON.stringify(window.__vantagePreviewEvents)).not.toContain("53703");
  });

  it("keeps SDK and unavailable storage errors out of form execution", () => {
    const window = browser();
    window.sessionStorage.getItem = () => { throw new Error("blocked storage"); };
    vi.stubGlobal("window", window);
    configureAnalytics("production");
    sdkTrack.mockImplementation(() => { throw new Error("SDK unavailable"); });
    expect(() => trackEvent("form_submit_attempted")).not.toThrow();
    expect(sdkTrack).toHaveBeenCalledWith("form_submit_attempted", {
      context: "main-site-canyon|production|home|en", detail: "none",
    });
  });

  it("bounds the preview in-memory diagnostics buffer", () => {
    const window = browser();
    vi.stubGlobal("window", window);
    for (let i = 0; i < 120; i++) trackEvent("form_step_viewed", { step_number: 1 });
    expect(window.__vantagePreviewEvents).toHaveLength(100);
  });

  it("collects deployed preview events with preview attribution and no private values", () => {
    const window = browser();
    window.location.pathname = "/es/servicios/mudanzas-larga-distancia";
    vi.stubGlobal("window", window);
    configureAnalytics("preview");
    trackEvent("form_submit_success", { email: "private@example.com", ref_no: "private-ref" });
    expect(sdkTrack.mock.calls.filter(([name]) => name === "form_submit_success")).toHaveLength(1);
    expect(sdkTrack).toHaveBeenCalledWith("form_submit_success", {
      context: "main-site-canyon|preview|long-distance-moving|es", detail: "none",
    });
    expect(window.__vantagePreviewEvents.filter(event => event.name === "form_submit_success")).toHaveLength(1);
    expect(JSON.stringify(sdkTrack.mock.calls)).not.toMatch(/private@example|private-ref/);
  });

  it("requires an explicit deployment identity for preview collection", () => {
    expect(telemetryMode("preview")).toBe("local");
    expect(telemetryMode("preview", "invalid")).toBe("local");
    expect(telemetryMode(undefined, "a".repeat(40))).toBe("local");
    expect(telemetryMode("preview", "a".repeat(40))).toBe("preview");
    expect(telemetryMode("production")).toBe("production");
  });
});
