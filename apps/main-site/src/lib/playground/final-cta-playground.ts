export const finalCtaColorPresetIds = [
  "production",
  "deepNavy",
  "brightGradient",
  "yellowAccent",
  "custom",
] as const;
export type FinalCtaColorPresetId = (typeof finalCtaColorPresetIds)[number];

export const finalCtaColorPresetLabels: Record<FinalCtaColorPresetId, string> = {
  production: "Production — brand blue gradient",
  deepNavy: "Deep navy — darker gradient",
  brightGradient: "Bright gradient — lighter blues",
  yellowAccent: "Yellow accent — warmer badge",
  custom: "Custom — use color pickers below",
};

export interface FinalCtaColors {
  gradientStart: string;
  gradientEnd: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  titleColor: string;
  bodyColor: string;
  primaryBtnBg: string;
  primaryBtnText: string;
  secondaryBtnBorder: string;
  secondaryBtnText: string;
}

export const finalCtaColorPresets: Record<
  Exclude<FinalCtaColorPresetId, "custom">,
  FinalCtaColors
> = {
  production: {
    gradientStart: "#1763cf",
    gradientEnd: "#024799",
    badgeBorder: "rgba(255, 192, 46, 0.4)",
    badgeBg: "rgba(255, 192, 46, 0.18)",
    badgeText: "#ffc02e",
    titleColor: "#ffffff",
    bodyColor: "rgba(255, 255, 255, 0.88)",
    primaryBtnBg: "#ffc02e",
    primaryBtnText: "#000000",
    secondaryBtnBorder: "rgba(255, 255, 255, 0.5)",
    secondaryBtnText: "#ffffff",
  },
  deepNavy: {
    gradientStart: "#022f66",
    gradientEnd: "#020a14",
    badgeBorder: "rgba(255, 206, 69, 0.35)",
    badgeBg: "rgba(255, 206, 69, 0.12)",
    badgeText: "#ffce45",
    titleColor: "#ffffff",
    bodyColor: "rgba(226, 232, 240, 0.88)",
    primaryBtnBg: "#ffce45",
    primaryBtnText: "#022f66",
    secondaryBtnBorder: "rgba(255, 255, 255, 0.35)",
    secondaryBtnText: "#f8fafc",
  },
  brightGradient: {
    gradientStart: "#2e86de",
    gradientEnd: "#1763cf",
    badgeBorder: "rgba(255, 255, 255, 0.35)",
    badgeBg: "rgba(255, 255, 255, 0.12)",
    badgeText: "#ffffff",
    titleColor: "#ffffff",
    bodyColor: "rgba(255, 255, 255, 0.92)",
    primaryBtnBg: "#ffffff",
    primaryBtnText: "#024799",
    secondaryBtnBorder: "rgba(255, 255, 255, 0.6)",
    secondaryBtnText: "#ffffff",
  },
  yellowAccent: {
    gradientStart: "#024799",
    gradientEnd: "#022f66",
    badgeBorder: "rgba(255, 206, 69, 0.55)",
    badgeBg: "rgba(255, 206, 69, 0.22)",
    badgeText: "#fff8e7",
    titleColor: "#fff8e7",
    bodyColor: "rgba(255, 248, 231, 0.85)",
    primaryBtnBg: "#ffce45",
    primaryBtnText: "#022f66",
    secondaryBtnBorder: "rgba(255, 206, 69, 0.45)",
    secondaryBtnText: "#fff8e7",
  },
};

export function resolveFinalCtaColors(
  preset: FinalCtaColorPresetId,
  custom: Partial<FinalCtaColors>,
): FinalCtaColors {
  if (preset !== "custom") {
    return finalCtaColorPresets[preset];
  }
  const base = finalCtaColorPresets.production;
  return {
    gradientStart: custom.gradientStart ?? base.gradientStart,
    gradientEnd: custom.gradientEnd ?? base.gradientEnd,
    badgeBorder: custom.badgeBorder ?? base.badgeBorder,
    badgeBg: custom.badgeBg ?? base.badgeBg,
    badgeText: custom.badgeText ?? base.badgeText,
    titleColor: custom.titleColor ?? base.titleColor,
    bodyColor: custom.bodyColor ?? base.bodyColor,
    primaryBtnBg: custom.primaryBtnBg ?? base.primaryBtnBg,
    primaryBtnText: custom.primaryBtnText ?? base.primaryBtnText,
    secondaryBtnBorder: custom.secondaryBtnBorder ?? base.secondaryBtnBorder,
    secondaryBtnText: custom.secondaryBtnText ?? base.secondaryBtnText,
  };
}

export const finalCtaHeadingFontSizeIds = [32, 40, 44, 52, 56] as const;
export type FinalCtaHeadingFontSizeId = (typeof finalCtaHeadingFontSizeIds)[number];

export const finalCtaBodyFontSizeIds = [15, 16, 17, 18, 20] as const;
export type FinalCtaBodyFontSizeId = (typeof finalCtaBodyFontSizeIds)[number];

export const finalCtaBadgeFontSizeIds = [11, 12, 13, 14] as const;
export type FinalCtaBadgeFontSizeId = (typeof finalCtaBadgeFontSizeIds)[number];

export const finalCtaPrimaryStyleIds = ["yellow", "white", "outline"] as const;
export type FinalCtaPrimaryStyleId = (typeof finalCtaPrimaryStyleIds)[number];

export const finalCtaPrimaryStyleLabels: Record<FinalCtaPrimaryStyleId, string> = {
  yellow: "Yellow — production primary",
  white: "Solid white on gradient",
  outline: "Outline white (transparent fill)",
};
