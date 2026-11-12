/**
 * Public photo registry — swap filenames here to change section images site-wide.
 * Files live in `/public` or `/public/sitepictures/`.
 */

export const HERO_IMAGES = {
  enhanced: "/hero_image_enhanced.png",
  webp: "/hero_image.webp",
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;

export const SITE_IMAGES = {
  hero: "/images/preview/home-inventory.webp",
  longDistanceMoves: "/long_distance_traffic.webp",
  packingStorage: "/images/preview/packing-detail.webp",
  officeMoves: "/images/preview/office-preparation.webp",
  militaryMoves: "/images/preview/service-military-family-preparation-20261112.webp",
  aboutCoordinators: "/customer_service_rep.webp",
  expertiseBanner: "/sitepictures/Truck%20Loaded.jpeg",
  autoTransport: "/sitepictures/autotransport.jpg",
  coordinationSupport: "/customer_service_rep.png",
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;

export function resolveSiteImage(
  nameOrPath: SiteImageKey | HeroImageKey | string,
): string {
  if (!nameOrPath) return "";
  if (nameOrPath in HERO_IMAGES) return HERO_IMAGES[nameOrPath as HeroImageKey];
  if (nameOrPath in SITE_IMAGES) return SITE_IMAGES[nameOrPath as SiteImageKey];
  return nameOrPath.startsWith("/") ? nameOrPath : `/${nameOrPath}`;
}
