import {
  BadgeCheck,
  Clock,
  Headphones,
  Mail,
  Phone,
  Shield,
  type LucideIcon,
} from "lucide-react";

export const layoutIconIds = [
  "clock",
  "phone",
  "mail",
  "shield",
  "badgeCheck",
  "headphones",
] as const;
export type LayoutIconId = (typeof layoutIconIds)[number];

export const layoutIconLabels: Record<LayoutIconId, string> = {
  clock: "Clock",
  phone: "Phone",
  mail: "Mail / email",
  shield: "Shield",
  badgeCheck: "Badge check",
  headphones: "Headphones",
};

export const layoutIcons: Record<LayoutIconId, LucideIcon> = {
  clock: Clock,
  phone: Phone,
  mail: Mail,
  shield: Shield,
  badgeCheck: BadgeCheck,
  headphones: Headphones,
};

export const radiusTokenIds = ["none", "chip", "md2", "lg2", "xl2", "card", "panel", "full"] as const;
export type RadiusTokenId = (typeof radiusTokenIds)[number];

export const radiusTokenLabels: Record<RadiusTokenId, string> = {
  none: "None (0px)",
  chip: "Chip (7px)",
  md2: "Medium (9px)",
  lg2: "Large (11px) — current nav/CTA",
  xl2: "XL (13px)",
  card: "Card (16px)",
  panel: "Panel (20px)",
  full: "Full (pill/circle)",
};

export const radiusClasses: Record<RadiusTokenId, string> = {
  none: "rounded-none",
  chip: "rounded-chip",
  md2: "rounded-md2",
  lg2: "rounded-lg2",
  xl2: "rounded-xl2",
  card: "rounded-card",
  panel: "rounded-panel",
  full: "rounded-full",
};

export const spacingScale = {
  tight: { py: 6, gap: 12, navPadX: 12, navPadY: 8 },
  default: { py: 9, gap: 18, navPadX: 14, navPadY: 10 },
  relaxed: { py: 12, gap: 24, navPadX: 16, navPadY: 12 },
} as const;

export type SpacingPresetId = keyof typeof spacingScale;

export const spacingPresetLabels: Record<SpacingPresetId, string> = {
  tight: "Tight — compact bar / dense nav",
  default: "Default — production values",
  relaxed: "Relaxed — more breathing room",
};
