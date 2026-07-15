import { beforeEach, describe, expect, it, vi } from "vitest";

const { createFormLead } = vi.hoisted(() => ({ createFormLead: vi.fn() }));
vi.mock("@vantage/api-client", () => ({ createFormLead }));

describe("POST /api/quote contract", () => {
  beforeEach(() => createFormLead.mockReset().mockResolvedValue({ ok: true, status: 201 }));

  it("forces main-site attribution and sends only the established server keys", async () => {
    const { POST } = await import("./route");
    const body = {
      pickup: "33426", dest: "10001", date: "2099-01-15", size: "2 Bedrooms",
      name: "Preview Test", phone: "5615550100", email: "preview@example.com", smsConsent: true,
      source_company: "client_override", source_company_site: "evil.example", ref_no: "MS-TEST", sms_consent: false,
      service: "must-not-pass", locale: "es-US",
    };
    const response = await POST(new Request("http://localhost/api/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }));
    expect(response.status).toBe(200);
    expect(createFormLead).toHaveBeenCalledOnce();
    const payload = createFormLead.mock.calls[0]![0];
    expect(payload).toEqual({
      source_company: "main_site", source_company_site: "vantagehomemovers.com",
      name: "Preview Test", email: "preview@example.com", phone_number: "5615550100",
      pickup_zip: "33426", destination_zip: "10001", move_size: "2 Bedrooms",
      move_date: "2099-01-15", ref_no: "MS-TEST", sms_consent: false,
    });
    expect(Object.keys(payload).sort()).toEqual([
      "destination_zip", "email", "move_date", "move_size", "name", "phone_number",
      "pickup_zip", "ref_no", "sms_consent", "source_company", "source_company_site",
    ]);
  });
});
