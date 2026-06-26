import type { IconKey } from "@/lib/content";
import { SERVICE_ICONS } from "@/lib/icons";

export const serviceIconIds = [
  "truck",
  "route",
  "home",
  "office",
  "shield",
  "users",
  "box",
  "package-open",
  "headphones",
] as const satisfies readonly IconKey[];

export type ServiceIconId = (typeof serviceIconIds)[number];

export const serviceIconLabels: Record<ServiceIconId, string> = {
  truck: "Truck",
  route: "Route / interstate",
  home: "Home",
  office: "Office / building",
  shield: "Shield / military",
  users: "Users / seniors",
  box: "Box / package",
  "package-open": "Open package",
  headphones: "Headphones / coordination",
};

export const serviceIcons = SERVICE_ICONS;

export const sectionHeadingFontSizeIds = [30, 36, 40, 44, 48] as const;
export type SectionHeadingFontSizeId = (typeof sectionHeadingFontSizeIds)[number];

export const sectionIntroFontSizeIds = [15, 16, 17, 18] as const;
export type SectionIntroFontSizeId = (typeof sectionIntroFontSizeIds)[number];

export const featureTitleFontSizeIds = [26, 30, 32, 36] as const;
export type FeatureTitleFontSizeId = (typeof featureTitleFontSizeIds)[number];

export const featureBodyFontSizeIds = [15, 16, 16.5, 17] as const;
export type FeatureBodyFontSizeId = (typeof featureBodyFontSizeIds)[number];

export const checklistFontSizeIds = [14, 15, 15.5, 16] as const;
export type ChecklistFontSizeId = (typeof checklistFontSizeIds)[number];

export const cardTitleFontSizeIds = [18, 20, 22, 24] as const;
export type CardTitleFontSizeId = (typeof cardTitleFontSizeIds)[number];

export const cardDescFontSizeIds = [13, 14, 14.5, 15] as const;
export type CardDescFontSizeId = (typeof cardDescFontSizeIds)[number];

export const ctaFontSizeIds = [13, 14, 15, 16] as const;
export type CtaFontSizeId = (typeof ctaFontSizeIds)[number];

export const cardIconSizeIds = [22, 24, 26, 28, 32] as const;
export type CardIconSizeId = (typeof cardIconSizeIds)[number];

export const badgeIconSizeIds = [13, 15, 17, 19] as const;
export type BadgeIconSizeId = (typeof badgeIconSizeIds)[number];

export const cardIconWrapperSizeIds = [44, 48, 52, 56, 60] as const;
export type CardIconWrapperSizeId = (typeof cardIconWrapperSizeIds)[number];
