/**
 * A presentation changes composition and paint, never content or intake rules.
 * Branches select one preset here; both locales and every page share it.
 * Keep the CMS catalog and publication registry independent of this selection.
 */
export type SitePresentation = { id: "optimized" | "canyon" };

export const sitePresentations = {
  optimized: { id: "optimized" },
  canyon: { id: "canyon" },
} satisfies Record<string, SitePresentation>;

export const sitePresentation: SitePresentation = sitePresentations.canyon;
