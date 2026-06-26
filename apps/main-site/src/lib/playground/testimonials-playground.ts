export const testimonialsNavigationModeIds = ["marquee", "carousel"] as const;
export type TestimonialsNavigationModeId = (typeof testimonialsNavigationModeIds)[number];

export const testimonialsNavigationModeLabels: Record<TestimonialsNavigationModeId, string> = {
  marquee: "Auto marquee — continuous scroll (hover to pause)",
  carousel: "Arrow carousel — 3–4 visible, one card slides per click",
};

export const carouselVisibleCountIds = [3, 4] as const;
export type CarouselVisibleCountId = (typeof carouselVisibleCountIds)[number];

export const carouselVisibleCountLabels: Record<CarouselVisibleCountId, string> = {
  3: "3 cards visible",
  4: "4 cards visible",
};

export const marqueeSpeedIds = ["brisk", "fast", "medium", "default", "slow", "relaxed"] as const;
export type MarqueeSpeedId = (typeof marqueeSpeedIds)[number];

export const marqueeSpeedLabels: Record<MarqueeSpeedId, string> = {
  brisk: "Brisk — 10s",
  fast: "Fast — 16s",
  medium: "Medium — 24s",
  default: "Default — 34s (production)",
  slow: "Slow — 50s",
  relaxed: "Relaxed — 70s",
};

export const marqueeSpeedSeconds: Record<MarqueeSpeedId, number> = {
  brisk: 10,
  fast: 16,
  medium: 24,
  default: 34,
  slow: 50,
  relaxed: 70,
};

export const cardSizeIds = ["compact", "default", "spacious", "wide"] as const;
export type CardSizeId = (typeof cardSizeIds)[number];

export const cardSizeLabels: Record<CardSizeId, string> = {
  compact: "Compact — 260–320px",
  default: "Default — 300–390px (production)",
  spacious: "Spacious — 340–440px",
  wide: "Wide — 380–520px",
};

export const cardSizeWidths: Record<CardSizeId, string> = {
  compact: "clamp(260px, 28vw, 320px)",
  default: "clamp(300px, 30vw, 390px)",
  spacious: "clamp(340px, 32vw, 440px)",
  wide: "clamp(380px, 40vw, 520px)",
};

export const quoteFontSizeIds = [14, 15.5, 16, 17, 18] as const;
export type QuoteFontSizeId = (typeof quoteFontSizeIds)[number];

export const nameFontSizeIds = [14, 15, 16, 17] as const;
export type NameFontSizeId = (typeof nameFontSizeIds)[number];

export const starSizeIds = [14, 17, 18, 20, 24] as const;
export type StarSizeId = (typeof starSizeIds)[number];

export const starStyleIds = ["filled", "outline", "soft"] as const;
export type StarStyleId = (typeof starStyleIds)[number];

export const starStyleLabels: Record<StarStyleId, string> = {
  filled: "Filled — solid brand yellow",
  outline: "Outline — stroke only",
  soft: "Soft — pale fill + stroke",
};

export const starColorPresetIds = [
  "brandYellow",
  "gold",
  "white",
  "amber",
  "custom",
] as const;
export type StarColorPresetId = (typeof starColorPresetIds)[number];

export const starColorPresetLabels: Record<StarColorPresetId, string> = {
  brandYellow: "Brand yellow (production)",
  gold: "Gold",
  white: "White (on dark cards)",
  amber: "Amber",
  custom: "Custom picker",
};

export const starColorPresets: Record<
  Exclude<StarColorPresetId, "custom">,
  { fill: string; stroke: string }
> = {
  brandYellow: { fill: "#F5C518", stroke: "#F5C518" },
  gold: { fill: "#D4A017", stroke: "#D4A017" },
  white: { fill: "#FFFFFF", stroke: "#FFFFFF" },
  amber: { fill: "#F59E0B", stroke: "#F59E0B" },
};

export function resolveStarColors(
  preset: StarColorPresetId,
  customColor?: string
): { fill: string; stroke: string } {
  if (preset === "custom" && customColor) {
    return { fill: customColor, stroke: customColor };
  }
  if (preset === "custom") {
    return starColorPresets.brandYellow;
  }
  return starColorPresets[preset];
}
