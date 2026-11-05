import { describe, expect, it } from "vitest";
import { englishServices, getServiceById, servicePages, spanishServices } from "./registry";
import { SERVICE_IDS } from "./types";

describe("service registry", () => {
  it("contains one complete English and Spanish page for every service", () => {
    expect(englishServices).toHaveLength(SERVICE_IDS.length);
    expect(spanishServices).toHaveLength(SERVICE_IDS.length);
    expect(servicePages).toHaveLength(SERVICE_IDS.length * 2);
  });

  it("has unique paths, slugs, metadata, H1s, and image pairs", () => {
    expect(new Set(servicePages.map((item) => item.path)).size).toBe(servicePages.length);
    for (const locale of ["en-US", "es-US"] as const) {
      const pages = servicePages.filter((item) => item.locale === locale);
      expect(new Set(pages.map((item) => item.slug)).size).toBe(pages.length);
      expect(new Set(pages.map((item) => item.seo.title)).size).toBe(pages.length);
      expect(new Set(pages.map((item) => item.seo.description)).size).toBe(pages.length);
      expect(new Set(pages.map((item) => item.hero.title)).size).toBe(pages.length);
      expect(new Set(pages.map((item) => item.hero.desktopImage)).size).toBe(pages.length);
      expect(new Set(pages.map((item) => item.hero.mobileImage)).size).toBe(pages.length);
    }
  });

  it("pairs every localized route exactly and resolves all relationships", () => {
    for (const id of SERVICE_IDS) {
      const en = getServiceById(id, "en-US");
      const es = getServiceById(id, "es-US");
      expect(en.alternatePath).toBe(es.path);
      expect(es.alternatePath).toBe(en.path);
      for (const relatedId of [...en.relatedServiceIds, ...es.relatedServiceIds]) {
        expect(SERVICE_IDS).toContain(relatedId);
        expect(relatedId).not.toBe(id);
      }
    }
  });

  it("requires the complete shared composition content", () => {
    for (const page of servicePages) {
      expect(page.benefits.length).toBeGreaterThanOrEqual(3);
      expect(page.process).toHaveLength(4);
      expect(page.planningChecklist.length).toBeGreaterThanOrEqual(5);
      expect(page.faqs.length).toBeGreaterThanOrEqual(4);
      expect(page.hero.proofPoints.length).toBeGreaterThanOrEqual(3);
    }
  });
});
