/**
 * Public photo registry — swap filenames here to change section images site-wide.
 * Files live in `/public` (root) or `/public/sitepictures/`.
 */

/** Hero background options — set `SITE_IMAGES.hero` to any value below. */
export const HERO_IMAGES = {
  enhanced: "/hero_image_enhanced.png",
  enhancedTwo: "/hero_image_enhanced_two.png",
  webp: "/hero_image.webp",
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;

export const SITE_IMAGES = {
  hero: HERO_IMAGES.enhanced,
  longDistanceMoves: "/long_distance_traffic.webp",
  packingStorage: "/couple_with_boxes.jpg",
  officeMoves: "/moving_boxes_in_office.webp",
  militaryMoves: "/military_moves.webp",
  expertiseBanner: "/sitepictures/Truck%20Loaded.jpeg",
  autoTransport: "/sitepictures/autotransport.jpg",
  coordinationSupport: "/customer_service_rep.webp",
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;

/** Resolve a registry key or raw public path/filename. */
export function resolveSiteImage(nameOrPath: SiteImageKey | HeroImageKey | string): string {
  if (nameOrPath in HERO_IMAGES) {
    return HERO_IMAGES[nameOrPath as HeroImageKey];
  }
  if (nameOrPath in SITE_IMAGES) {
    return SITE_IMAGES[nameOrPath as SiteImageKey];
  }
  return nameOrPath.startsWith("/") ? nameOrPath : `/${nameOrPath}`;
}
