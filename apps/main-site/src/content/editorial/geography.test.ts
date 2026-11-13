import { describe, expect, it } from "vitest";
import usa from "@/content/geography/usa-map.json";
import { editorialEntries, editorialSources } from "./index";
import { entryAt, entriesFor } from "@/lib/publication";
import { destinationResourceKey } from "./destination-registry";
import { guideLinksFor } from "@/lib/editorial-journey";

describe("authored state and directed-route publication", () => {
  it("exposes the pilot in preview without manufacturing reverse routes or production pages", () => {
    for (const locale of ["en", "es"] as const) {
      const entries = entriesFor(locale, "preview").filter(entry => entry.geography);
      expect(entries.map(entry => entry.id)).toEqual(["florida", "florida-to-north-carolina"]);
      for (const entry of entries) expect(entryAt(entry.path, "production")).toBeUndefined();
      expect(entries.find(entry => entry.kind === "route")?.geography?.destination?.code).toBe("NC");
    }
    expect(entryAt("/moving-routes/north-carolina-to-florida", "preview")).toBeUndefined();
    expect(entryAt("/locations/north-carolina-movers", "preview")).toBeUndefined();
  });

  it("resolves localized service plans, route links and source evidence", () => {
    const sources = new Set(editorialSources.map(source => source.id));
    for (const entry of editorialEntries.filter(entry => entry.geography)) {
      const content = entry.geography!;
      const linkedIds = [...Object.keys(content.serviceNotes), ...content.relatedRouteIds, ...(content.coordinationCards ?? []).map(card => card.serviceId)];
      for (const id of linkedIds) expect(editorialEntries.some(other => other.id === id && other.locale === entry.locale), `${entry.path} -> ${id}`).toBe(true);
      for (const anchor of [content.origin, content.destination].filter(Boolean)) {
        expect(usa.locations.some(state => state.id === anchor!.code.toLowerCase())).toBe(true);
        expect(Number.isFinite(anchor!.x) && Number.isFinite(anchor!.y)).toBe(true);
      }
      for (const sourceId of entry.sourceIds) expect(sources.has(sourceId)).toBe(true);
    }
  });

  it("offers the Florida destination guide only for a confirmed US/FL identity and visible locale", () => {
    expect(destinationResourceKey({ country: "US", state: "FL", city: "Miami" })).toBe("florida");
    expect(destinationResourceKey({ country: "US", state: "NC", city: "Charlotte" })).toBe("generic");
    expect(destinationResourceKey({ country: "CA", state: "FL", city: "Miami" })).toBe("generic");
    expect(guideLinksFor("es", "preview").florida).toBe("/es/destinos/florida");
    expect(guideLinksFor("en", "production").florida).toBe(guideLinksFor("en", "production").generic);
  });
});
