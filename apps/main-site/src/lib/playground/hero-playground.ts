import { HERO_IMAGES, SITE_IMAGES } from "@/lib/images";

export const heroImageOptions = {
  heroEnhanced: HERO_IMAGES.enhanced,
  heroWebp: HERO_IMAGES.webp,
  longDistance: SITE_IMAGES.longDistanceMoves,
  packingStorage: SITE_IMAGES.packingStorage,
  officeMoves: SITE_IMAGES.officeMoves,
  militaryMoves: SITE_IMAGES.militaryMoves,
  aboutCoordinators: SITE_IMAGES.aboutCoordinators,
  expertiseBanner: SITE_IMAGES.expertiseBanner,
  autoTransport: SITE_IMAGES.autoTransport,
  coordinationSupport: SITE_IMAGES.coordinationSupport,
} as const;

export type HeroImageOptionId = keyof typeof heroImageOptions;

export const heroImageLabels: Record<HeroImageOptionId, string> = {
  heroEnhanced: "Hero — enhanced PNG (production)",
  heroWebp: "Hero — WebP alternate",
  longDistance: "Long-distance traffic",
  packingStorage: "Couple with boxes",
  officeMoves: "Office move",
  militaryMoves: "Military move",
  aboutCoordinators: "Customer service rep",
  expertiseBanner: "Truck loaded",
  autoTransport: "Auto transport",
  coordinationSupport: "Coordination support",
};

export const heroObjectPositionIds = [
  "center30",
  "center",
  "centerTop",
  "centerBottom",
  "leftCenter",
  "rightCenter",
] as const;

export type HeroObjectPositionId = (typeof heroObjectPositionIds)[number];

export const heroObjectPositionLabels: Record<HeroObjectPositionId, string> = {
  center30: "Center 30% — production default",
  center: "Center",
  centerTop: "Center top",
  centerBottom: "Center bottom",
  leftCenter: "Left center",
  rightCenter: "Right center",
};

export const heroObjectPositionClasses: Record<HeroObjectPositionId, string> = {
  center30: "object-[center_30%]",
  center: "object-center",
  centerTop: "object-top",
  centerBottom: "object-bottom",
  leftCenter: "object-left",
  rightCenter: "object-right",
};

export const formPreviewStepIds = ["step1", "step2", "confirmation"] as const;
export type FormPreviewStepId = (typeof formPreviewStepIds)[number];

export const formPreviewStepLabels: Record<FormPreviewStepId, string> = {
  step1: "Step 1 — moving details (ZIP, date, size)",
  step2: "Step 2 — contact info",
  confirmation: "Confirmation — request received",
};

export const productionFormStepLabels = {
  step1: "Moving Details",
  step2: "Contact Info",
  step3: "Confirmation",
} as const;

export const alternateFormStepLabels = {
  step1: "Moving Details",
  step2: "Contact Info",
  step3: "Confirmation",
} as const;

export const heroImageEffectIds = [
  "none",
  "grayscale",
  "sepia",
  "warm",
  "cool",
  "vivid",
  "muted",
  "highContrast",
  "softFocus",
  "darken",
  "brighten",
] as const;

export type HeroImageEffectId = (typeof heroImageEffectIds)[number];

export const heroImageEffectLabels: Record<HeroImageEffectId, string> = {
  none: "None — original photo",
  grayscale: "Grayscale",
  sepia: "Sepia / vintage",
  warm: "Warm golden tint",
  cool: "Cool blue tint",
  vivid: "Vivid — boosted saturation",
  muted: "Muted — desaturated & soft",
  highContrast: "High contrast",
  softFocus: "Soft focus (subtle blur)",
  darken: "Darken",
  brighten: "Brighten",
};

/** Returns a CSS filter string scaled by strength (0–100). */
export function resolveHeroImageFilter(
  effect: HeroImageEffectId,
  strength: number,
): string | undefined {
  const t = Math.min(100, Math.max(0, strength)) / 100;
  if (effect === "none" || t === 0) return undefined;

  switch (effect) {
    case "grayscale":
      return `grayscale(${Math.round(t * 100)}%)`;
    case "sepia":
      return `sepia(${Math.round(t * 55)}%)`;
    case "warm":
      return `sepia(${Math.round(t * 28)}%) saturate(${100 + Math.round(t * 18)}%) hue-rotate(${Math.round(t * -8)}deg)`;
    case "cool":
      return `saturate(${100 - Math.round(t * 12)}%) hue-rotate(${Math.round(t * 14)}deg) brightness(${100 - Math.round(t * 6)}%)`;
    case "vivid":
      return `saturate(${100 + Math.round(t * 35)}%) contrast(${100 + Math.round(t * 8)}%)`;
    case "muted":
      return `saturate(${100 - Math.round(t * 28)}%) brightness(${100 - Math.round(t * 10)}%)`;
    case "highContrast":
      return `contrast(${100 + Math.round(t * 30)}%) saturate(${100 + Math.round(t * 12)}%)`;
    case "softFocus":
      return `blur(${Math.max(0.5, t * 2.5)}px) brightness(${100 - Math.round(t * 4)}%)`;
    case "darken":
      return `brightness(${100 - Math.round(t * 35)}%)`;
    case "brighten":
      return `brightness(${100 + Math.round(t * 18)}%) saturate(${100 + Math.round(t * 8)}%)`;
    default:
      return undefined;
  }
}

export const heroOverlayStyleIds = [
  "none",
  "solidBlue",
  "solidNavy",
  "solidBlack",
  "warmAmber",
  "coolTeal",
  "gradientBottom",
  "gradientLeft",
  "vignette",
  "brandBlend",
] as const;

export type HeroOverlayStyleId = (typeof heroOverlayStyleIds)[number];

export const heroOverlayStyleLabels: Record<HeroOverlayStyleId, string> = {
  none: "None",
  solidBlue: "Solid — brand blue",
  solidNavy: "Solid — deep navy",
  solidBlack: "Solid — black",
  warmAmber: "Solid — warm amber",
  coolTeal: "Solid — cool teal",
  gradientBottom: "Gradient — dark bottom fade",
  gradientLeft: "Gradient — dark left fade",
  vignette: "Vignette — edge darkening",
  brandBlend: "Gradient — brand blue blend",
};

export function resolveHeroOverlayBackground(
  style: HeroOverlayStyleId,
  opacity: number,
): string | undefined {
  const a = Math.min(100, Math.max(0, opacity)) / 100;
  if (style === "none" || a === 0) return undefined;

  switch (style) {
    case "solidBlue":
      return `rgba(2, 71, 153, ${a})`;
    case "solidNavy":
      return `rgba(4, 18, 38, ${a})`;
    case "solidBlack":
      return `rgba(0, 0, 0, ${a})`;
    case "warmAmber":
      return `rgba(120, 53, 15, ${a * 0.85})`;
    case "coolTeal":
      return `rgba(12, 74, 110, ${a * 0.85})`;
    case "gradientBottom":
      return `linear-gradient(to top, rgba(4, 18, 38, ${a * 0.9}) 0%, rgba(4, 18, 38, ${a * 0.35}) 45%, transparent 72%)`;
    case "gradientLeft":
      return `linear-gradient(to right, rgba(2, 71, 153, ${a * 0.88}) 0%, rgba(2, 71, 153, ${a * 0.4}) 42%, transparent 68%)`;
    case "vignette":
      return `radial-gradient(ellipse at center, transparent 38%, rgba(4, 18, 38, ${a * 0.75}) 100%)`;
    case "brandBlend":
      return `linear-gradient(135deg, rgba(2, 71, 153, ${a * 0.62}) 0%, rgba(4, 18, 38, ${a * 0.52}) 50%, rgba(2, 47, 102, ${a * 0.38}) 100%)`;
    default:
      return undefined;
  }
}

export const heroContentColorPresetIds = [
  "production",
  "whiteOnDark",
  "creamWarm",
  "yellowHeadline",
  "blueOnLight",
  "highContrast",
  "custom",
] as const;

export type HeroContentColorPresetId = (typeof heroContentColorPresetIds)[number];

export const heroContentColorPresetLabels: Record<HeroContentColorPresetId, string> = {
  production: "Production — white on photo",
  whiteOnDark: "Bright white — max readability",
  creamWarm: "Warm cream / off-white",
  yellowHeadline: "Yellow headline + white body",
  blueOnLight: "Brand blue — for brightened photos",
  highContrast: "Pure white + strong shadow",
  custom: "Custom — use color pickers below",
};

export interface HeroContentColors {
  headline: string;
  paragraph: string;
  supporting: string;
  badge: string;
  stats: string;
  statsLabel: string;
}

export const heroContentColorPresets: Record<
  Exclude<HeroContentColorPresetId, "custom">,
  HeroContentColors
> = {
  production: {
    headline: "#ffffff",
    paragraph: "rgba(255, 255, 255, 0.92)",
    supporting: "rgba(255, 255, 255, 0.88)",
    badge: "#ffffff",
    stats: "#ffffff",
    statsLabel: "#ffffff",
  },
  whiteOnDark: {
    headline: "#ffffff",
    paragraph: "#ffffff",
    supporting: "#f8fafc",
    badge: "#ffffff",
    stats: "#ffffff",
    statsLabel: "#f1f5f9",
  },
  creamWarm: {
    headline: "#fff8e7",
    paragraph: "rgba(255, 248, 231, 0.94)",
    supporting: "rgba(255, 236, 200, 0.9)",
    badge: "#fff8e7",
    stats: "#fff8e7",
    statsLabel: "rgba(255, 248, 231, 0.92)",
  },
  yellowHeadline: {
    headline: "#ffc02e",
    paragraph: "rgba(255, 255, 255, 0.92)",
    supporting: "rgba(255, 255, 255, 0.88)",
    badge: "#ffffff",
    stats: "#ffffff",
    statsLabel: "rgba(255, 255, 255, 0.92)",
  },
  blueOnLight: {
    headline: "#024799",
    paragraph: "#1f2937",
    supporting: "#374151",
    badge: "#024799",
    stats: "#024799",
    statsLabel: "#1f2937",
  },
  highContrast: {
    headline: "#ffffff",
    paragraph: "#ffffff",
    supporting: "#ffffff",
    badge: "#ffffff",
    stats: "#ffffff",
    statsLabel: "#ffffff",
  },
};

export const heroTextShadowIds = ["none", "subtle", "default", "strong"] as const;
export type HeroTextShadowId = (typeof heroTextShadowIds)[number];

export const heroTextShadowLabels: Record<HeroTextShadowId, string> = {
  none: "None",
  subtle: "Subtle",
  default: "Default — production",
  strong: "Strong — max legibility",
};

export const heroTextShadowStyles: Record<HeroTextShadowId, string> = {
  none: "none",
  subtle: "0 1px 6px rgba(0, 0, 0, 0.25)",
  default: "0 2px 18px rgba(0, 0, 0, 0.45)",
  strong: "0 2px 24px rgba(0, 0, 0, 0.65), 0 1px 4px rgba(0, 0, 0, 0.4)",
};

export const heroBodyTextShadowStyles: Record<HeroTextShadowId, string> = {
  none: "none",
  subtle: "0 1px 4px rgba(0, 0, 0, 0.2)",
  default: "0 1px 10px rgba(0, 0, 0, 0.35)",
  strong: "0 2px 14px rgba(0, 0, 0, 0.55)",
};

export function resolveHeroContentColors(
  preset: HeroContentColorPresetId,
  custom: Partial<HeroContentColors>,
): HeroContentColors {
  if (preset !== "custom") {
    return heroContentColorPresets[preset];
  }
  const base = heroContentColorPresets.production;
  return {
    headline: custom.headline ?? base.headline,
    paragraph: custom.paragraph ?? base.paragraph,
    supporting: custom.supporting ?? base.supporting,
    badge: custom.badge ?? base.badge,
    stats: custom.stats ?? base.stats,
    statsLabel: custom.statsLabel ?? base.statsLabel,
  };
}
