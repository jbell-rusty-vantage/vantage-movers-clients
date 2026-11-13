import { describe, expect, it } from "vitest";
import { pageIdentity, sanitizeAnalyticsEvent, sanitizeTelemetryUrl } from "./analytics-contract";
import { editorialEntries } from "@/content/editorial";
import { websiteDesign } from "./website-design";

describe("Main Site measurement boundary", () => {
  it("identifies every localized editorial route without importing prose into client telemetry", () => {
    for (const entry of editorialEntries) {
      expect(pageIdentity(entry.path)).toEqual({ id: entry.id, locale: entry.locale });
    }
  });
  it("retains bounded attribution with only two properties and discards private values", () => {
    const event = sanitizeAnalyticsEvent("form_validation_error", {
      step_number: 2, field_name: "phone", error_type: "invalid",
      phone: "5551234567", pickup: "53703", zip: "53703", email: "private@example.com",
      session_id: "private-id", ref_no: "private-ref", date: "2026-12-01",
      link_href: "/?name=Private", current_path: "/private@example.com", service_id: "unbounded",
    }, "/es/servicios/mudanzas-larga-distancia", false);
    expect(event).toEqual({ name: "form_validation_error", properties: {
      context: `${websiteDesign.id}|preview|long-distance-moving|es`,
      detail: "step:2|field:phone|error:invalid",
    } });
    expect(Object.keys(event!.properties)).toHaveLength(2);
  });

  it("retains all four quote steps but excludes arbitrary step values", () => {
    for (const step_number of [1, 2, 3, 4]) expect(sanitizeAnalyticsEvent("form_step_viewed", { step_number }, "/", false)?.properties.detail).toBe(`step:${step_number}`);
    expect(sanitizeAnalyticsEvent("form_step_viewed", { step_number: 5 }, "/", false)?.properties.detail).toBe("none");
  });

  it("cannot expose unknown event names, paths, or unbounded dimensions", () => {
    expect(sanitizeAnalyticsEvent("private@example.com", {}, "/", false)).toBeNull();
    expect(sanitizeAnalyticsEvent("phone_clicked", {
      field_name: "private@example.com", step_number: 5551234567, cta_location: "private@example.com",
    }, "/private@example.com", true)).toEqual({ name: "phone_clicked", properties: {
      context: `${websiteDesign.id}|production|other|en`, detail: "none",
    } });
  });

  it("removes query and fragment from SDK URLs and refuses unknown routes", () => {
    expect(sanitizeTelemetryUrl("https://www.vantagehomemovers.com/services/long-distance-moving?email=x@y.com#53703"))
      .toBe("https://www.vantagehomemovers.com/services/long-distance-moving");
    expect(sanitizeTelemetryUrl("https://www.vantagehomemovers.com/private@example.com")).toBeNull();
    expect(sanitizeTelemetryUrl("not a URL")).toBeNull();
    expect(pageIdentity("/services/long-distance-moving/").id).toBe("long-distance-moving");
  });
});
