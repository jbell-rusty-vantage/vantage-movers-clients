import { beforeEach, describe, expect, it, vi } from "vitest";

const { createFormLead } = vi.hoisted(() => ({ createFormLead: vi.fn() }));
vi.mock("@vantage/api-client", () => ({ createFormLead }));

describe("POST /api/quote contract", () => {
  beforeEach(() => createFormLead.mockReset().mockResolvedValue({ ok: true, status: 201 }));

  it("forces main-site attribution, Granot posting, and the supplied LID", async () => {
    const { POST } = await import("./route");
    const body = {
      pickup: "33426", dest: "10001", date: "2099-01-15", size: "2 Bedrooms",
      name: "Production Test", phone: "5615550100", email: "production@example.com",
      smsConsent: true, ref_no: "MS-TEST", lid: "LID6a6255e58ad8d",
      source_company: "client_override", source_company_site: "evil.example",
    };

    const response = await POST(new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }));

    expect(response.status).toBe(200);
    expect(createFormLead).toHaveBeenCalledOnce();
    expect(createFormLead.mock.calls[0]![0]).toEqual({
      source_company: "main_site",
      source_company_site: "vantagehomemovers.com",
      name: "Production Test",
      email: "production@example.com",
      phone_number: "5615550100",
      pickup_zip: "33426",
      destination_zip: "10001",
      move_size: "2 Bedrooms",
      move_date: "2099-01-15",
      ref_no: "MS-TEST",
      lid: "LID6a6255e58ad8d",
      post_to_granot: true,
      sms_consent: true,
    });
  });

  it("returns a failure status when the lead was not captured", async () => {
    createFormLead.mockResolvedValueOnce({
      ok: false,
      status: 503,
      error: "CRM unavailable",
    });
    const { POST } = await import("./route");
    const response = await POST(new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        pickup: "33426",
        dest: "10001",
        date: "2099-01-15",
        size: "2 Bedrooms",
        name: "Retry Test",
        phone: "5615550100",
        email: "retry@example.com",
        smsConsent: false,
        ref_no: "MS-RETRY",
        lid: "LID6a6255e58ad8d",
      }),
    }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ leadCaptured: false });
  });

  it("forwards bounded attribution while malformed tracking and privacy opt-out preserve capture", async () => {
    const { POST } = await import("./route");
    const base = { pickup: "33426", dest: "53703", date: "2099-01-15", size: "Studio", name: "Synthetic", phone: "2025550100", email: "synthetic@example.com", smsConsent: false, ref_no: "MS-ATTRIBUTION", lid: "LID6a6255e58ad8d" };
    const attribution = { version: 1, first_touch: { path: "/resources/moving-cost-guide", occurred_at: new Date().toISOString(), channel: "campaign", referring_host: "none", campaign: { source: "review", medium: "review", name: "preview-qualification" } }, capture_page: { path: "/es" }, design: { id: "main-site-canyon", version: "2026-11-13" }, email: "private@example.com", experiment: "fake" };
    const optimization = { ...attribution, design: { id: "main-site-optimization", version: "2026-11-12" } };
    for (const [value, disabled, expected] of [[attribution, false, true], [attribution, true, false], [optimization, false, false], ["malformed", false, false]] as const) {
      const response = await POST(new Request("https://preview.example/api/quote", { method: "POST", headers: { "content-type": "application/json", ...(disabled ? { "sec-gpc": "1" } : {}) }, body: JSON.stringify({ ...base, website_attribution: value }) }));
      expect(response.status).toBe(200);
      const payload = createFormLead.mock.calls.at(-1)![0];
      expect(Boolean(payload.website_attribution)).toBe(expected);
      expect(payload).toMatchObject({ source_company: "main_site", ref_no: base.ref_no, lid: base.lid, sms_consent: false });
      expect(JSON.stringify(payload.website_attribution) ?? "").not.toMatch(/private|experiment/);
      if (expected) expect(payload.website_attribution).toMatchObject({
        capture_page: { path: "/es", content_id: "home", locale: "es" },
        design: attribution.design,
      });
    }
  });
});
