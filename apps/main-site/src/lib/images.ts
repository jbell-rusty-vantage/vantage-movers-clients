/**
 * Public photo registry — swap filenames here to change section images site-wide.
 * Files live in `/public` or `/public/sitepictures/`.
 */

export const HERO_IMAGES = {
  enhanced: "/images/selected-20261112/home-arrival.webp",
  webp: "/images/selected-20261112/home-arrival.webp",
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;

export const SITE_IMAGES = {
  hero: HERO_IMAGES.webp,
  longDistanceMoves: "/images/selected-20261112/long-distance-arrival.webp",
  packingStorage: "/images/selected-20261112/packing-care.webp",
  officeMoves: "/images/selected-20261112/office-moving.webp",
  militaryMoves: "/images/selected-20261112/military-packing.webp",
  aboutCoordinators: "/images/selected-20261112/move-coordinator.webp",
  expertiseBanner: "/images/selected-20261112/quiet-arrival.webp",
  autoTransport: "/images/selected-20261112/auto-arrival.webp",
  coordinationSupport: "/images/selected-20261112/move-coordinator.webp",
} as const;

// One truck-free selection for every service hero and its supporting media.
export const SERVICE_IMAGES: Record<string, { src: string; position: string; mobilePosition: string }> = {
  "long-distance-moving": { src: SITE_IMAGES.longDistanceMoves, position: "60% 40%", mobilePosition: "60% 35%" },
  "residential-moving": { src: SITE_IMAGES.hero, position: "75% 40%", mobilePosition: "85% 40%" },
  "packing-services": { src: SITE_IMAGES.packingStorage, position: "50% 45%", mobilePosition: "50% 45%" },
  "corporate-office-moving": { src: SITE_IMAGES.officeMoves, position: "50% 30%", mobilePosition: "50% 30%" },
  "auto-transport": { src: SITE_IMAGES.autoTransport, position: "60% 55%", mobilePosition: "65% 55%" },
  "military-moving": { src: "/images/selected-20261112/military-arrival.webp", position: "60% 25%", mobilePosition: "65% 20%" },
  "storage-options": { src: "/images/selected-20261112/storage-belongings.webp", position: "50% 40%", mobilePosition: "50% 40%" },
  "senior-moving": { src: "/images/selected-20261112/senior-moving.webp", position: "50% 25%", mobilePosition: "50% 20%" },
};

export type SiteImageKey = keyof typeof SITE_IMAGES;

export function resolveSiteImage(
  nameOrPath: SiteImageKey | HeroImageKey | string,
): string {
  if (!nameOrPath) return "";
  if (nameOrPath in HERO_IMAGES) return HERO_IMAGES[nameOrPath as HeroImageKey];
  if (nameOrPath in SITE_IMAGES) return SITE_IMAGES[nameOrPath as SiteImageKey];
  return nameOrPath.startsWith("/") ? nameOrPath : `/${nameOrPath}`;
}
