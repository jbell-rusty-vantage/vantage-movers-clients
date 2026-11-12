import { describe, expect, it } from "vitest";
import { destinationGuide, isCapturedResponse, parseDestination, parseQuoteDraft, QUOTE_DRAFT_TTL, type QuoteDraft } from "./quote-journey";

const now = 1800000000000;
const draft: QuoteDraft = {
  version: 2, savedAt: now, step: 1, internalRefNo: "MS-20261112-TEST", inboundRefNo: "", lid: "LID0123456789abc",
  started: true, completedSteps: [0],
  values: { pickup: "33426", dest: "53703", date: "2099-01-15", size: "2 Bedrooms", name: "Synthetic", email: "synthetic@example.com", phone: "2025550100", smsConsent: false },
  destination: { postalCode: "53703", city: "Madison", state: "WI", country: "US" },
};

describe("preserved quote attempt", () => {
  it("retains false consent, step, reference and LID through serialization", () => {
    expect(parseQuoteDraft(JSON.stringify(draft), now)).toEqual(draft);
  });
  it("migrates old attempts without changing identity or consent", () => {
    expect(parseQuoteDraft(JSON.stringify({ ...draft, version: 1, step: 1 }), now)).toEqual({ ...draft, step: 0, completedSteps: [] });
  });
  it("rejects expired, future, corrupt and oversized storage", () => {
    expect(parseQuoteDraft(JSON.stringify(draft), now + QUOTE_DRAFT_TTL + 1)).toBeNull();
    expect(parseQuoteDraft(JSON.stringify(draft), now - 1)).toBeNull();
    expect(parseQuoteDraft("{broken", now)).toBeNull();
    expect(parseQuoteDraft("x".repeat(8001), now)).toBeNull();
    expect(parseQuoteDraft(JSON.stringify({ ...draft, lid: "invalid" }), now)).toBeNull();
  });
  it("invalidates a stored destination after its ZIP changes", () => {
    expect(parseQuoteDraft(JSON.stringify({ ...draft, values: { ...draft.values, dest: "10001" } }), now)?.destination).toBeNull();
  });
  it("distinguishes same-name cities, state fallback and unsupported states", () => {
    expect(destinationGuide(draft.destination)).toBe("madison");
    expect(destinationGuide({ ...draft.destination!, city: "Milwaukee" })).toBe("wisconsin");
    expect(destinationGuide({ ...draft.destination!, state: "AL" })).toBe("generic");
    expect(destinationGuide(null)).toBe("generic");
    expect(parseDestination({ ...draft.destination!, country: "CA" })).toBeNull();
  });
  it("requires explicit boolean capture even after a successful HTTP response", () => {
    expect(isCapturedResponse({ leadCaptured: true })).toBe(true);
    for (const response of [{ leadCaptured: false }, {}, { leadCaptured: "true" }, null]) {
      expect(isCapturedResponse(response)).toBe(false);
    }
  });
});
