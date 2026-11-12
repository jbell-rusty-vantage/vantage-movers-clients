import { describe, expect, it } from "vitest";
import { editorialEntries } from "@/content/editorial";
import { editorialSources } from "@/content/editorial/sources";
import { canRenderEntry, entriesFor, entryAt } from "./publication";

describe("editorial publication boundary", () => {
  it("keeps all unapproved locale entries out of production and unknown environments", () => {
    for (const e of editorialEntries.filter(e => e.review.status === "draft")) {
      expect(canRenderEntry(e, "production")).toBe(false);
      expect(canRenderEntry(e, "development")).toBe(false);
      expect(canRenderEntry(e, "preview")).toBe(true);
      expect(entryAt(e.path, "production")).toBeUndefined();
    }
  });
  it("requires a named reviewer and does not publish the sibling locale automatically", () => {
    const entry = editorialEntries[0];
    expect(canRenderEntry({ ...entry, review: { ...entry.review, status: "reviewed", reviewer: null } }, "production")).toBe(false);
    expect(canRenderEntry({ ...entry, review: { ...entry.review, status: "reviewed", reviewer: "Vantage reviewer" } }, "production")).toBe(true);
  });
  it("provides unique, reciprocal locale identities and complete source/related references", () => {
    expect(new Set(editorialEntries.map(e => e.path)).size).toBe(editorialEntries.length);
    const sourceIds = new Set(editorialSources.map(s => s.id));
    for (const e of editorialEntries) {
      expect(editorialEntries.filter(a => a.id === e.id && a.locale !== e.locale)).toHaveLength(1);
      expect(e.sections.length).toBeGreaterThan(1);
      expect(e.sourceIds.every(id => sourceIds.has(id))).toBe(true);
      expect(e.relatedIds.every(id => editorialEntries.some(a => a.id === id && a.locale === e.locale))).toBe(true);
    }
  });
  it("rejects unknown paths and publishes only available locale entries", () => {
    expect(entryAt("/services/not-a-service", "preview")).toBeUndefined();
    expect(entriesFor("es", "preview").every(e => e.path.startsWith("/es/"))).toBe(true);
  });
});
