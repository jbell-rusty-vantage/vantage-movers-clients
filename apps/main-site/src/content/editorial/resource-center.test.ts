import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { editorialEntries } from "./index";
import { articleDetails, resourceTypes } from "./resource-center";

describe("resource presentation and publication dates", () => {
  const resource = editorialEntries.find(e => e.kind === "resource")!;
  it("never presents an unapproved draft date as a publication date", () => {
    const dated = { ...resource, publishedAt: "2026-11-15" };
    expect(articleDetails(dated).published).toBe(false);
    expect(articleDetails(dated).date).toBe(resource.review.checkedAt);
    expect(articleDetails({ ...dated, review: { ...dated.review, status: "reviewed", reviewer: null } }).published).toBe(false);
    const reviewed = { ...dated, review: { ...dated.review, status: "reviewed" as const, reviewer: "Owner" } };
    expect(articleDetails(reviewed).published).toBe(true);
    expect(articleDetails(reviewed).date).toBe("2026-11-15");
    expect(articleDetails({ ...reviewed, publishedAt: "invalid" }).published).toBe(false);
  });
  it("supplies real local posters and content-based reading times for each locale", () => {
    for (const entry of editorialEntries.filter(e => e.kind === "resource")) {
      const metadata = articleDetails(entry);
      expect(existsSync(`public${metadata.poster}`)).toBe(true);
      expect(metadata.minutes).toBeGreaterThan(0);
    }
    expect(articleDetails({ ...resource, sections: [{ heading: "Long guide", paragraphs: ["word ".repeat(2000)] }] }).minutes).toBeGreaterThanOrEqual(10);
  });
  it("keeps resource navigation within the existing localized route contract", () => {
    expect(resourceTypes("en").map(t => t.href)).toEqual(["/resources#articles", "/resources#moving-guides", "/resources#checklists", "/resources#moving-authorities"]);
    expect(resourceTypes("es").every(t => t.href.startsWith("/es/recursos#"))).toBe(true);
  });
});
