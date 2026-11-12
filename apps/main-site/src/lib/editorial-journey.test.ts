import { describe, expect, it } from "vitest";
import { guideLinksFor } from "./editorial-journey";
import { destinationResourceKey } from "@/content/editorial/destination-registry";

describe("destination resource selection", () => {
  it("uses confirmed country/state/city and does not guess from names", () => {
    expect(destinationResourceKey({ country: "US", state: "WI", city: " Madison " })).toBe("madison");
    expect(destinationResourceKey({ country: "US", state: "WI", city: "Milwaukee" })).toBe("wisconsin");
    expect(destinationResourceKey({ country: "US", state: "AL", city: "Madison" })).toBe("generic");
    expect(destinationResourceKey({ country: "CA", state: "WI", city: "Madison" })).toBe("generic");
    for (const state of ["DC", "PR", "CA"]) expect(destinationResourceKey({ country: "US", state, city: "" })).toBe("generic");
  });
  it("retains localized preview pilots and excludes unpublished destination paths in production", () => {
    expect(guideLinksFor("es", "preview").madison).toContain("/es/");
    for (const mode of ["production", "development", "unknown"]) {
      const links = guideLinksFor("es", mode);
      expect(links.madison).toBe(links.generic);
      expect(links.wisconsin).toBe(links.generic);
      expect(links.generic).not.toContain("/destinos/");
    }
  });
});
