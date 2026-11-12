import { describe, expect, it } from "vitest";
import { heroProofFacts } from "./hero-proof";

describe("Owner-supplied hero count boundary", () => {
  it("shows the requested count in both preview locales without promoting it to production", () => {
    for (const locale of ["en", "es"] as const) {
      expect(heroProofFacts(locale, "preview")[0][0]).toBe("50,000");
      expect(heroProofFacts(locale, "production").flat()).not.toContain("50,000");
      expect(heroProofFacts(locale, "development").flat()).not.toContain("50,000");
    }
  });
});
