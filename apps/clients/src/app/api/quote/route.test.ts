import { beforeEach, describe, expect, it, vi } from "vitest";
import { MAIN_SITE, PARTNERS } from "@/content/partners";

const { createFormLead } = vi.hoisted(() => ({ createFormLead: vi.fn() }));
vi.mock("@vantage/api-client", () => ({ createFormLead }));

describe("partner source attribution", () => {
  beforeEach(() => createFormLead.mockReset().mockResolvedValue({ ok: true, status: 201 }));
  it.each([MAIN_SITE, ...Object.values(PARTNERS)])("preserves $sourceCompany", async (partner) => {
    const { POST } = await import("./route");
    const response = await POST(new Request("http://localhost/api/quote", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ pickup: "10001", dest: "94105", date: "2027-01-15", size: "Studio", name: "Synthetic Test", phone: "2025550100", email: "test@example.com", smsConsent: false, source_company: partner.sourceCompany, source_company_site: partner.sourceCompanySite }),
    }));
    expect(response.status).toBe(200);
    expect(createFormLead).toHaveBeenCalledOnce();
    expect(createFormLead.mock.calls[0][0]).toMatchObject({ source_company: partner.sourceCompany, source_company_site: partner.sourceCompanySite });
  });
});
