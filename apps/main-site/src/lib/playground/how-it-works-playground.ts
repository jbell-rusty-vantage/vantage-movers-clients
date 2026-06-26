export const howItWorksColorPresetIds = [
  "production",
  "deeperNavy",
  "brightBlue",
  "yellowAccent",
  "custom",
] as const;

export type HowItWorksColorPresetId = (typeof howItWorksColorPresetIds)[number];

export const howItWorksColorPresetLabels: Record<HowItWorksColorPresetId, string> = {
  production: "Production — deep navy + yellow accent",
  deeperNavy: "Deeper navy — stronger contrast",
  brightBlue: "Bright blue — lighter section wash",
  yellowAccent: "Yellow accent — warmer step highlights",
  custom: "Custom — use color pickers below",
};

export interface HowItWorksColors {
  sectionBg: string;
  taglineColor: string;
  topBarBorder: string;
  eyebrowBorder: string;
  eyebrowBg: string;
  eyebrowText: string;
  titleColor: string;
  titleAccent: string;
  stepCircleBorder: string;
  stepCircleBg: string;
  stepNumberColor: string;
  connectorLine: string;
  stepTitleColor: string;
  stepDescColor: string;
  phoneBtnBg: string;
  phoneBtnText: string;
}

export const howItWorksColorPresets: Record<
  Exclude<HowItWorksColorPresetId, "custom">,
  HowItWorksColors
> = {
  production: {
    sectionBg: "#041226",
    taglineColor: "rgba(255, 255, 255, 0.9)",
    topBarBorder: "rgba(255, 255, 255, 0.1)",
    eyebrowBorder: "rgba(255, 192, 46, 0.28)",
    eyebrowBg: "rgba(255, 255, 255, 0.06)",
    eyebrowText: "#ffffff",
    titleColor: "#ffffff",
    titleAccent: "#ffce45",
    stepCircleBorder: "rgba(255, 192, 46, 0.28)",
    stepCircleBg: "rgba(255, 192, 46, 0.12)",
    stepNumberColor: "#ffce45",
    connectorLine: "rgba(255, 192, 46, 0.22)",
    stepTitleColor: "#ffffff",
    stepDescColor: "rgba(203, 213, 225, 0.88)",
    phoneBtnBg: "#ffce45",
    phoneBtnText: "#024799",
  },
  deeperNavy: {
    sectionBg: "#020a14",
    taglineColor: "rgba(255, 255, 255, 0.82)",
    topBarBorder: "rgba(255, 255, 255, 0.08)",
    eyebrowBorder: "rgba(255, 206, 69, 0.35)",
    eyebrowBg: "rgba(255, 255, 255, 0.04)",
    eyebrowText: "#f8fafc",
    titleColor: "#ffffff",
    titleAccent: "#ffb800",
    stepCircleBorder: "rgba(255, 206, 69, 0.4)",
    stepCircleBg: "rgba(255, 206, 69, 0.1)",
    stepNumberColor: "#ffb800",
    connectorLine: "rgba(255, 206, 69, 0.28)",
    stepTitleColor: "#ffffff",
    stepDescColor: "rgba(148, 163, 184, 0.95)",
    phoneBtnBg: "#ffb800",
    phoneBtnText: "#022f66",
  },
  brightBlue: {
    sectionBg: "#024799",
    taglineColor: "rgba(255, 255, 255, 0.92)",
    topBarBorder: "rgba(255, 255, 255, 0.14)",
    eyebrowBorder: "rgba(255, 255, 255, 0.22)",
    eyebrowBg: "rgba(255, 255, 255, 0.1)",
    eyebrowText: "#ffffff",
    titleColor: "#ffffff",
    titleAccent: "#ffce45",
    stepCircleBorder: "rgba(255, 255, 255, 0.25)",
    stepCircleBg: "rgba(255, 255, 255, 0.08)",
    stepNumberColor: "#ffce45",
    connectorLine: "rgba(255, 255, 255, 0.18)",
    stepTitleColor: "#ffffff",
    stepDescColor: "rgba(226, 232, 240, 0.88)",
    phoneBtnBg: "#1763cf",
    phoneBtnText: "#ffffff",
  },
  yellowAccent: {
    sectionBg: "#022f66",
    taglineColor: "rgba(255, 248, 231, 0.95)",
    topBarBorder: "rgba(255, 206, 69, 0.2)",
    eyebrowBorder: "rgba(255, 206, 69, 0.45)",
    eyebrowBg: "rgba(255, 206, 69, 0.12)",
    eyebrowText: "#fff8e7",
    titleColor: "#ffffff",
    titleAccent: "#ffce45",
    stepCircleBorder: "rgba(255, 206, 69, 0.5)",
    stepCircleBg: "rgba(255, 206, 69, 0.2)",
    stepNumberColor: "#fff8e7",
    connectorLine: "rgba(255, 206, 69, 0.35)",
    stepTitleColor: "#fff8e7",
    stepDescColor: "rgba(255, 248, 231, 0.78)",
    phoneBtnBg: "#ffce45",
    phoneBtnText: "#022f66",
  },
};

export function resolveHowItWorksColors(
  preset: HowItWorksColorPresetId,
  custom: Partial<HowItWorksColors>,
): HowItWorksColors {
  if (preset !== "custom") {
    return howItWorksColorPresets[preset];
  }
  const base = howItWorksColorPresets.production;
  return {
    sectionBg: custom.sectionBg ?? base.sectionBg,
    taglineColor: custom.taglineColor ?? base.taglineColor,
    topBarBorder: custom.topBarBorder ?? base.topBarBorder,
    eyebrowBorder: custom.eyebrowBorder ?? base.eyebrowBorder,
    eyebrowBg: custom.eyebrowBg ?? base.eyebrowBg,
    eyebrowText: custom.eyebrowText ?? base.eyebrowText,
    titleColor: custom.titleColor ?? base.titleColor,
    titleAccent: custom.titleAccent ?? base.titleAccent,
    stepCircleBorder: custom.stepCircleBorder ?? base.stepCircleBorder,
    stepCircleBg: custom.stepCircleBg ?? base.stepCircleBg,
    stepNumberColor: custom.stepNumberColor ?? base.stepNumberColor,
    connectorLine: custom.connectorLine ?? base.connectorLine,
    stepTitleColor: custom.stepTitleColor ?? base.stepTitleColor,
    stepDescColor: custom.stepDescColor ?? base.stepDescColor,
    phoneBtnBg: custom.phoneBtnBg ?? base.phoneBtnBg,
    phoneBtnText: custom.phoneBtnText ?? base.phoneBtnText,
  };
}

export const howItWorksHeadingFontSizeIds = [32, 36, 40, 44, 48] as const;
export type HowItWorksHeadingFontSizeId = (typeof howItWorksHeadingFontSizeIds)[number];

export const howItWorksStepTitleFontSizeIds = [16, 18, 20] as const;
export type HowItWorksStepTitleFontSizeId = (typeof howItWorksStepTitleFontSizeIds)[number];

export const howItWorksStepDescFontSizeIds = [13, 14, 14.5, 15] as const;
export type HowItWorksStepDescFontSizeId = (typeof howItWorksStepDescFontSizeIds)[number];

export const howItWorksStepNumberSizeIds = [22, 26, 30] as const;
export type HowItWorksStepNumberSizeId = (typeof howItWorksStepNumberSizeIds)[number];
