import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  DollarSign,
  Globe,
  Headphones,
  Package,
  Route,
  Shield,
  Truck,
  Users,
} from "lucide-react";

export const whyVantageIconIds = [
  "shield",
  "dollar-sign",
  "globe",
  "headphones",
  "briefcase",
  "truck",
  "route",
  "users",
  "package",
] as const;

export type WhyVantageIconId = (typeof whyVantageIconIds)[number];

export const whyVantageIconLabels: Record<WhyVantageIconId, string> = {
  shield: "Shield — licensed broker",
  "dollar-sign": "Dollar sign — pricing",
  globe: "Globe — nationwide",
  headphones: "Headphones — support",
  briefcase: "Briefcase — commercial",
  truck: "Truck — transportation",
  route: "Route — interstate",
  users: "Users — customer focus",
  package: "Package — packing",
};

export const whyVantageIcons: Record<WhyVantageIconId, LucideIcon> = {
  shield: Shield,
  "dollar-sign": DollarSign,
  globe: Globe,
  headphones: Headphones,
  briefcase: Briefcase,
  truck: Truck,
  route: Route,
  users: Users,
  package: Package,
};

export const whyVantageColorPresetIds = [
  "production",
  "creamWarm",
  "softBlueCards",
  "navyCta",
  "custom",
] as const;

export type WhyVantageColorPresetId = (typeof whyVantageColorPresetIds)[number];

export const whyVantageColorPresetLabels: Record<WhyVantageColorPresetId, string> = {
  production: "Production — cream section, white cards",
  creamWarm: "Cream warm — softer card borders",
  softBlueCards: "Soft blue cards — light tint",
  navyCta: "Navy CTA card — stronger gradient",
  custom: "Custom — use color pickers below",
};

export interface WhyVantageColors {
  sectionBg: string;
  headingColor: string;
  cardBg: string;
  cardBorder: string;
  cardTitleColor: string;
  cardDescColor: string;
  iconWrapperBg: string;
  iconColor: string;
  ctaGradientStart: string;
  ctaGradientEnd: string;
  ctaTitleColor: string;
  ctaBodyColor: string;
  ctaButtonBg: string;
  ctaButtonText: string;
}

export const whyVantageColorPresets: Record<
  Exclude<WhyVantageColorPresetId, "custom">,
  WhyVantageColors
> = {
  production: {
    sectionBg: "#faf6ef",
    headingColor: "#024799",
    cardBg: "#ffffff",
    cardBorder: "#e8e0d4",
    cardTitleColor: "#024799",
    cardDescColor: "#64748b",
    iconWrapperBg: "#fff3d1",
    iconColor: "#1763cf",
    ctaGradientStart: "#1763cf",
    ctaGradientEnd: "#024799",
    ctaTitleColor: "#ffffff",
    ctaBodyColor: "rgba(241, 245, 249, 0.95)",
    ctaButtonBg: "#ffce45",
    ctaButtonText: "#000000",
  },
  creamWarm: {
    sectionBg: "#fffdf5",
    headingColor: "#022f66",
    cardBg: "#ffffff",
    cardBorder: "#f0e6d6",
    cardTitleColor: "#024799",
    cardDescColor: "#64748b",
    iconWrapperBg: "#fff8e7",
    iconColor: "#024799",
    ctaGradientStart: "#1763cf",
    ctaGradientEnd: "#022f66",
    ctaTitleColor: "#ffffff",
    ctaBodyColor: "rgba(255, 248, 231, 0.92)",
    ctaButtonBg: "#ffce45",
    ctaButtonText: "#022f66",
  },
  softBlueCards: {
    sectionBg: "#f0f6ff",
    headingColor: "#1763cf",
    cardBg: "#ffffff",
    cardBorder: "#c7daf5",
    cardTitleColor: "#024799",
    cardDescColor: "#475569",
    iconWrapperBg: "#e8f1fd",
    iconColor: "#1763cf",
    ctaGradientStart: "#1763cf",
    ctaGradientEnd: "#024799",
    ctaTitleColor: "#ffffff",
    ctaBodyColor: "rgba(241, 245, 249, 0.95)",
    ctaButtonBg: "#ffce45",
    ctaButtonText: "#022f66",
  },
  navyCta: {
    sectionBg: "#faf6ef",
    headingColor: "#024799",
    cardBg: "#ffffff",
    cardBorder: "#e8e0d4",
    cardTitleColor: "#024799",
    cardDescColor: "#64748b",
    iconWrapperBg: "#fff3d1",
    iconColor: "#1763cf",
    ctaGradientStart: "#022f66",
    ctaGradientEnd: "#041226",
    ctaTitleColor: "#ffffff",
    ctaBodyColor: "rgba(203, 213, 225, 0.92)",
    ctaButtonBg: "#ffce45",
    ctaButtonText: "#022f66",
  },
};

export function resolveWhyVantageColors(
  preset: WhyVantageColorPresetId,
  custom: Partial<WhyVantageColors>,
): WhyVantageColors {
  if (preset !== "custom") {
    return whyVantageColorPresets[preset];
  }
  const base = whyVantageColorPresets.production;
  return {
    sectionBg: custom.sectionBg ?? base.sectionBg,
    headingColor: custom.headingColor ?? base.headingColor,
    cardBg: custom.cardBg ?? base.cardBg,
    cardBorder: custom.cardBorder ?? base.cardBorder,
    cardTitleColor: custom.cardTitleColor ?? base.cardTitleColor,
    cardDescColor: custom.cardDescColor ?? base.cardDescColor,
    iconWrapperBg: custom.iconWrapperBg ?? base.iconWrapperBg,
    iconColor: custom.iconColor ?? base.iconColor,
    ctaGradientStart: custom.ctaGradientStart ?? base.ctaGradientStart,
    ctaGradientEnd: custom.ctaGradientEnd ?? base.ctaGradientEnd,
    ctaTitleColor: custom.ctaTitleColor ?? base.ctaTitleColor,
    ctaBodyColor: custom.ctaBodyColor ?? base.ctaBodyColor,
    ctaButtonBg: custom.ctaButtonBg ?? base.ctaButtonBg,
    ctaButtonText: custom.ctaButtonText ?? base.ctaButtonText,
  };
}

export const whyVantageHeadingFontSizeIds = [30, 36, 40, 44] as const;
export type WhyVantageHeadingFontSizeId = (typeof whyVantageHeadingFontSizeIds)[number];

export const whyVantageCardTitleFontSizeIds = [17, 19, 21] as const;
export type WhyVantageCardTitleFontSizeId = (typeof whyVantageCardTitleFontSizeIds)[number];

export const whyVantageCardDescFontSizeIds = [13, 14, 14.5, 15] as const;
export type WhyVantageCardDescFontSizeId = (typeof whyVantageCardDescFontSizeIds)[number];

export const whyVantageIconSizeIds = [20, 24, 28] as const;
export type WhyVantageIconSizeId = (typeof whyVantageIconSizeIds)[number];
