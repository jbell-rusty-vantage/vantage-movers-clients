export const footerColorPresetIds = [
  "production",
  "light",
  "deeperNight",
  "navyBlue",
  "charcoal",
  "custom",
] as const;

export type FooterColorPresetId = (typeof footerColorPresetIds)[number];

export const footerColorPresetLabels: Record<FooterColorPresetId, string> = {
  production: "Production — near-black footer",
  light: "Light — white footer with dark text",
  deeperNight: "Deeper night — stronger contrast",
  navyBlue: "Navy blue — brand-aligned footer",
  charcoal: "Charcoal — softer dark gray",
  custom: "Custom — use color pickers below",
};

export interface FooterColors {
  footerBg: string;
  headingColor: string;
  bodyColor: string;
  mutedColor: string;
  linkColor: string;
  linkHoverColor: string;
  borderColor: string;
  phoneColor: string;
}

export const footerColorPresets: Record<Exclude<FooterColorPresetId, "custom">, FooterColors> = {
  production: {
    footerBg: "#0b0d14",
    headingColor: "#ffffff",
    bodyColor: "#9fb6d2",
    mutedColor: "#6f8aad",
    linkColor: "#9fb6d2",
    linkHoverColor: "#ffffff",
    borderColor: "rgba(255, 255, 255, 0.1)",
    phoneColor: "#ffffff",
  },
  light: {
    footerBg: "#ffffff",
    headingColor: "#024799",
    bodyColor: "#1f2937",
    mutedColor: "#64748b",
    linkColor: "#111827",
    linkHoverColor: "#1763cf",
    borderColor: "#ece4d6",
    phoneColor: "#024799",
  },
  deeperNight: {
    footerBg: "#050608",
    headingColor: "#f8fafc",
    bodyColor: "#94a3b8",
    mutedColor: "#64748b",
    linkColor: "#cbd5e1",
    linkHoverColor: "#ffffff",
    borderColor: "rgba(255, 255, 255, 0.08)",
    phoneColor: "#ffce45",
  },
  navyBlue: {
    footerBg: "#041226",
    headingColor: "#ffffff",
    bodyColor: "#bcd0e8",
    mutedColor: "#7f9bbd",
    linkColor: "#9cc6f2",
    linkHoverColor: "#ffce45",
    borderColor: "rgba(255, 255, 255, 0.12)",
    phoneColor: "#ffce45",
  },
  charcoal: {
    footerBg: "#1e293b",
    headingColor: "#f1f5f9",
    bodyColor: "#cbd5e1",
    mutedColor: "#94a3b8",
    linkColor: "#e2e8f0",
    linkHoverColor: "#ffffff",
    borderColor: "rgba(255, 255, 255, 0.14)",
    phoneColor: "#ffffff",
  },
};

export function resolveFooterColors(
  preset: FooterColorPresetId,
  custom: Partial<FooterColors>,
): FooterColors {
  if (preset !== "custom") {
    return footerColorPresets[preset];
  }
  const base = footerColorPresets.production;
  return {
    footerBg: custom.footerBg ?? base.footerBg,
    headingColor: custom.headingColor ?? base.headingColor,
    bodyColor: custom.bodyColor ?? base.bodyColor,
    mutedColor: custom.mutedColor ?? base.mutedColor,
    linkColor: custom.linkColor ?? base.linkColor,
    linkHoverColor: custom.linkHoverColor ?? base.linkHoverColor,
    borderColor: custom.borderColor ?? base.borderColor,
    phoneColor: custom.phoneColor ?? base.phoneColor,
  };
}

export const footerBodyFontSizeIds = [13, 14, 14.5, 15] as const;
export type FooterBodyFontSizeId = (typeof footerBodyFontSizeIds)[number];

export const footerColumnHeadingFontSizeIds = [12, 13, 14] as const;
export type FooterColumnHeadingFontSizeId = (typeof footerColumnHeadingFontSizeIds)[number];

export const footerPaddingPresetIds = ["compact", "default", "relaxed"] as const;
export type FooterPaddingPresetId = (typeof footerPaddingPresetIds)[number];

export const footerPaddingPresetLabels: Record<FooterPaddingPresetId, string> = {
  compact: "Compact — tighter vertical padding",
  default: "Default — production values",
  relaxed: "Relaxed — more breathing room",
};

export const footerPaddingScale: Record<
  FooterPaddingPresetId,
  { pt: number; pb: number; gridGap: number; sectionGap: number }
> = {
  compact: { pt: 48, pb: 24, gridGap: 32, sectionGap: 24 },
  default: { pt: 64, pb: 32, gridGap: 40, sectionGap: 32 },
  relaxed: { pt: 80, pb: 40, gridGap: 48, sectionGap: 40 },
};
