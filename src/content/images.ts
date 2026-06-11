/**
 * Public photo registry — swap filenames here to change section images site-wide.
 * Files live in `/public` (root) or `/public/sitepictures/`.
 */

/**
 * Hero background options — set `SITE_IMAGES.hero` to any value below.
 * Empty entries intentionally use ImageFill's branded scene fallback until
 * licensed photo assets are added under `/public`.
 */
export const HERO_IMAGES = {
  enhanced: "",
  enhancedTwo: "",
  webp: "",
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;

export const SITE_IMAGES = {
  hero: HERO_IMAGES.enhanced,
  longDistanceMoves: "",
  packingStorage: "",
  officeMoves: "",
  militaryMoves: "",
  expertiseBanner: "",
  autoTransport: "",
  coordinationSupport: "",
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;

/** Resolve a registry key or raw public path/filename. */
export function resolveSiteImage(nameOrPath: SiteImageKey | HeroImageKey | string): string {
  if (!nameOrPath) {
    return "";
  }
  if (nameOrPath in HERO_IMAGES) {
    return HERO_IMAGES[nameOrPath as HeroImageKey];
  }
  if (nameOrPath in SITE_IMAGES) {
    return SITE_IMAGES[nameOrPath as SiteImageKey];
  }
  return nameOrPath.startsWith("/") ? nameOrPath : `/${nameOrPath}`;
}
