import { describe, expect, it } from "vitest";
import { editorialClaims, editorialEntries, editorialSources } from "./index";
import { SERVICE_IDS } from "./services";

describe("editorial publication queue integrity", () => {
  it("provides complete locale pairs with unique paths for the required publication queue", () => {
    const expectedIds = [...SERVICE_IDS, "before-the-inventory-call", "comparing-moving-estimates", "who-handles-my-move", "wisconsin", "madison-wisconsin"];
    expect(new Set(editorialEntries.map((entry) => entry.id))).toEqual(new Set(expectedIds));
    expect(new Set(editorialEntries.map((entry) => entry.path)).size).toBe(editorialEntries.length);
    for (const id of expectedIds) {
      const pair = editorialEntries.filter((entry) => entry.id === id);
      expect(pair.map((entry) => entry.locale).sort()).toEqual(["en", "es"]);
      expect(pair[0].kind).toBe(pair[1].kind);
      for (const entry of pair) {
        expect(entry.path.startsWith("/es/")).toBe(entry.locale === "es");
        expect(entry.title.trim()).not.toBe("");
        expect(entry.description.trim()).not.toBe("");
        expect(entry.sections.length).toBeGreaterThanOrEqual(4);
        expect(entry.sections.every((section) => section.heading && section.paragraphs.length > 0)).toBe(true);
      }
    }
  });

  it("resolves every related entry in the same locale and every cited source", () => {
    const sourceIds = new Set(editorialSources.map((source) => source.id));
    expect(sourceIds.size).toBe(editorialSources.length);
    for (const entry of editorialEntries) {
      for (const relatedId of entry.relatedIds) {
        expect(editorialEntries.some((related) => related.id === relatedId && related.locale === entry.locale), `${entry.id}/${entry.locale} → ${relatedId}`).toBe(true);
      }
      const citedIds = [...entry.sourceIds, ...entry.sections.flatMap((section) => section.sourceIds ?? [])];
      for (const sourceId of citedIds) expect(sourceIds.has(sourceId), `${entry.id} → ${sourceId}`).toBe(true);
    }
    for (const claim of editorialClaims) {
      for (const id of claim.entryIds) expect(editorialEntries.some((entry) => entry.id === id), `${claim.id} → ${id}`).toBe(true);
      for (const sourceId of claim.sourceIds) expect(sourceIds.has(sourceId)).toBe(true);
      expect(claim.status === "withheld" || claim.sourceIds.length > 0).toBe(true);
    }
  });

  it("keeps review attribution and source-check limitations explicit", () => {
    for (const entry of editorialEntries) {
      expect(entry.review.author).toContain("Codex");
      expect(entry.review.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.review.notes.length).toBeGreaterThan(0);
      if (entry.review.status === "reviewed") expect(entry.review.reviewer?.trim()).toBeTruthy();
    }
    for (const source of editorialSources) {
      expect(new URL(source.url).protocol).toBe("https:");
      expect(source.section).toBeTruthy();
      expect(source.scope).toBeTruthy();
      expect(source.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.recheckTrigger).toBeTruthy();
      expect(source.limitation).toBeTruthy();
    }
  });

  it("supplies worked and blank comparison rows in each locale", () => {
    for (const locale of ["en", "es"]) {
      const estimate = editorialEntries.find((entry) => entry.id === "comparing-moving-estimates" && entry.locale === locale);
      expect(estimate?.worksheet?.columns.length).toBe(3);
      expect(estimate?.worksheet?.rows.length).toBeGreaterThanOrEqual(9);
      expect(estimate?.worksheet?.blankRows.length).toBeGreaterThanOrEqual(10);
      expect(estimate?.worksheet?.caption).toMatch(/fictional|ficticia/i);
      const inventory = editorialEntries.find((entry) => entry.id === "before-the-inventory-call" && entry.locale === locale);
      expect(inventory?.worksheet?.blankRows.length).toBeGreaterThanOrEqual(10);
    }
  });
});
