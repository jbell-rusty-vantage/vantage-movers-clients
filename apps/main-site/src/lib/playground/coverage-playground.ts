export const coverageColorPresetIds = [
  "production",
  "creamSection",
  "softBlue",
  "highContrast",
  "custom",
] as const;

export type CoverageColorPresetId = (typeof coverageColorPresetIds)[number];

export const coverageColorPresetLabels: Record<CoverageColorPresetId, string> = {
  production: "Production — white section, brand blue map",
  creamSection: "Cream section — warm neutral background",
  softBlue: "Soft blue — light brand wash",
  highContrast: "High contrast — stronger map selection",
  custom: "Custom — use color pickers below",
};

export interface CoverageColors {
  sectionBg: string;
  headingColor: string;
  bodyColor: string;
  detailCardBg: string;
  detailCardBorder: string;
  detailIconBg: string;
  detailIconColor: string;
  detailTitleColor: string;
  ctaBg: string;
  ctaText: string;
  mapPanelBg: string;
  mapPanelBorder: string;
  mapInnerBg: string;
  mapDefaultFill: string;
  mapDefaultStroke: string;
  mapHoverFill: string;
  mapHoverStroke: string;
  mapActiveFill: string;
  mapActiveStroke: string;
  mapActiveLabel: string;
  mapHoverLabel: string;
  mapDefaultLabel: string;
}

export const coverageColorPresets: Record<
  Exclude<CoverageColorPresetId, "custom">,
  CoverageColors
> = {
  production: {
    sectionBg: "#ffffff",
    headingColor: "#024799",
    bodyColor: "#64748b",
    detailCardBg: "#faf6ef",
    detailCardBorder: "#e8e0d4",
    detailIconBg: "#024799",
    detailIconColor: "#ffce45",
    detailTitleColor: "#024799",
    ctaBg: "#1763cf",
    ctaText: "#ffffff",
    mapPanelBg: "#faf6ef",
    mapPanelBorder: "#e8e0d4",
    mapInnerBg: "linear-gradient(to bottom right, #ffffff, #ffffff, rgba(255, 243, 209, 0.4))",
    mapDefaultFill: "#ffffff",
    mapDefaultStroke: "#e8e0d4",
    mapHoverFill: "#1763cf",
    mapHoverStroke: "#3d8ef0",
    mapActiveFill: "#024799",
    mapActiveStroke: "#ffce45",
    mapActiveLabel: "#ffce45",
    mapHoverLabel: "#ffffff",
    mapDefaultLabel: "#475569",
  },
  creamSection: {
    sectionBg: "#faf6ef",
    headingColor: "#022f66",
    bodyColor: "#64748b",
    detailCardBg: "#ffffff",
    detailCardBorder: "#e8e0d4",
    detailIconBg: "#1763cf",
    detailIconColor: "#ffce45",
    detailTitleColor: "#024799",
    ctaBg: "#024799",
    ctaText: "#ffffff",
    mapPanelBg: "#ffffff",
    mapPanelBorder: "#e8e0d4",
    mapInnerBg: "linear-gradient(to bottom right, #faf6ef, #ffffff, rgba(255, 243, 209, 0.55))",
    mapDefaultFill: "#faf6ef",
    mapDefaultStroke: "#e8e0d4",
    mapHoverFill: "#1763cf",
    mapHoverStroke: "#3d8ef0",
    mapActiveFill: "#024799",
    mapActiveStroke: "#ffce45",
    mapActiveLabel: "#ffce45",
    mapHoverLabel: "#ffffff",
    mapDefaultLabel: "#475569",
  },
  softBlue: {
    sectionBg: "#f0f6ff",
    headingColor: "#1763cf",
    bodyColor: "#475569",
    detailCardBg: "#ffffff",
    detailCardBorder: "#c7daf5",
    detailIconBg: "#1763cf",
    detailIconColor: "#ffce45",
    detailTitleColor: "#024799",
    ctaBg: "#1763cf",
    ctaText: "#ffffff",
    mapPanelBg: "#ffffff",
    mapPanelBorder: "#c7daf5",
    mapInnerBg: "linear-gradient(to bottom right, #ffffff, #e8f1fd, rgba(255, 243, 209, 0.35))",
    mapDefaultFill: "#ffffff",
    mapDefaultStroke: "#c7daf5",
    mapHoverFill: "#1763cf",
    mapHoverStroke: "#024799",
    mapActiveFill: "#024799",
    mapActiveStroke: "#ffce45",
    mapActiveLabel: "#ffce45",
    mapHoverLabel: "#ffffff",
    mapDefaultLabel: "#475569",
  },
  highContrast: {
    sectionBg: "#ffffff",
    headingColor: "#022f66",
    bodyColor: "#334155",
    detailCardBg: "#fffdf5",
    detailCardBorder: "#ffce45",
    detailIconBg: "#022f66",
    detailIconColor: "#ffce45",
    detailTitleColor: "#022f66",
    ctaBg: "#022f66",
    ctaText: "#ffffff",
    mapPanelBg: "#fffdf5",
    mapPanelBorder: "#ffe08a",
    mapInnerBg: "linear-gradient(to bottom right, #ffffff, #fff8e7, rgba(255, 206, 69, 0.25))",
    mapDefaultFill: "#ffffff",
    mapDefaultStroke: "#cbd5e1",
    mapHoverFill: "#1763cf",
    mapHoverStroke: "#024799",
    mapActiveFill: "#022f66",
    mapActiveStroke: "#ffb800",
    mapActiveLabel: "#ffb800",
    mapHoverLabel: "#ffffff",
    mapDefaultLabel: "#334155",
  },
};

export function resolveCoverageColors(
  preset: CoverageColorPresetId,
  custom: Partial<CoverageColors>,
): CoverageColors {
  if (preset !== "custom") {
    return coverageColorPresets[preset];
  }
  const base = coverageColorPresets.production;
  return {
    sectionBg: custom.sectionBg ?? base.sectionBg,
    headingColor: custom.headingColor ?? base.headingColor,
    bodyColor: custom.bodyColor ?? base.bodyColor,
    detailCardBg: custom.detailCardBg ?? base.detailCardBg,
    detailCardBorder: custom.detailCardBorder ?? base.detailCardBorder,
    detailIconBg: custom.detailIconBg ?? base.detailIconBg,
    detailIconColor: custom.detailIconColor ?? base.detailIconColor,
    detailTitleColor: custom.detailTitleColor ?? base.detailTitleColor,
    ctaBg: custom.ctaBg ?? base.ctaBg,
    ctaText: custom.ctaText ?? base.ctaText,
    mapPanelBg: custom.mapPanelBg ?? base.mapPanelBg,
    mapPanelBorder: custom.mapPanelBorder ?? base.mapPanelBorder,
    mapInnerBg: custom.mapInnerBg ?? base.mapInnerBg,
    mapDefaultFill: custom.mapDefaultFill ?? base.mapDefaultFill,
    mapDefaultStroke: custom.mapDefaultStroke ?? base.mapDefaultStroke,
    mapHoverFill: custom.mapHoverFill ?? base.mapHoverFill,
    mapHoverStroke: custom.mapHoverStroke ?? base.mapHoverStroke,
    mapActiveFill: custom.mapActiveFill ?? base.mapActiveFill,
    mapActiveStroke: custom.mapActiveStroke ?? base.mapActiveStroke,
    mapActiveLabel: custom.mapActiveLabel ?? base.mapActiveLabel,
    mapHoverLabel: custom.mapHoverLabel ?? base.mapHoverLabel,
    mapDefaultLabel: custom.mapDefaultLabel ?? base.mapDefaultLabel,
  };
}

export const coverageHeadingFontSizeIds = [30, 36, 40, 44, 48] as const;
export type CoverageHeadingFontSizeId = (typeof coverageHeadingFontSizeIds)[number];

export const coverageIntroFontSizeIds = [15, 16, 17, 18] as const;
export type CoverageIntroFontSizeId = (typeof coverageIntroFontSizeIds)[number];

export const coverageDefaultStateIds = ["FL", "CA", "TX", "NY", "IL"] as const;
export type CoverageDefaultStateId = (typeof coverageDefaultStateIds)[number];

export const coverageDefaultStateLabels: Record<CoverageDefaultStateId, string> = {
  FL: "Florida (production default)",
  CA: "California",
  TX: "Texas",
  NY: "New York",
  IL: "Illinois",
};
