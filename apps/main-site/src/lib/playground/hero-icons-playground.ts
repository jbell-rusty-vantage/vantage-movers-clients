import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Globe,
  Home,
  MapPin,
  Package,
  Route,
  Shield,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { layoutIconIds, layoutIcons, layoutIconLabels } from "./layout-playground";

export const heroExtraIconIds = [
  "users",
  "package",
  "truck",
  "globe",
  "mapPin",
  "home",
  "route",
  "shield",
  "briefcase",
  "building",
  "arrowRight",
  "badgeCheck",
] as const;

export type HeroExtraIconId = (typeof heroExtraIconIds)[number];

export const heroIconIds = [...layoutIconIds, ...heroExtraIconIds] as const;
export type HeroIconId = (typeof heroIconIds)[number];

export const heroExtraIconLabels: Record<HeroExtraIconId, string> = {
  users: "Users / families",
  package: "Package / boxes",
  truck: "Truck",
  globe: "Globe / nationwide",
  mapPin: "Map pin",
  home: "Home",
  route: "Route / interstate",
  shield: "Shield / trust",
  briefcase: "Briefcase / business",
  building: "Building / office",
  arrowRight: "Arrow right",
  badgeCheck: "Badge check",
};

export const heroIconLabels: Record<HeroIconId, string> = {
  ...layoutIconLabels,
  ...heroExtraIconLabels,
};

const heroExtraIcons: Record<HeroExtraIconId, LucideIcon> = {
  users: Users,
  package: Package,
  truck: Truck,
  globe: Globe,
  mapPin: MapPin,
  home: Home,
  route: Route,
  shield: Shield,
  briefcase: Briefcase,
  building: Building2,
  arrowRight: ArrowRight,
  badgeCheck: BadgeCheck,
};

export const heroIcons: Record<HeroIconId, LucideIcon> = {
  ...layoutIcons,
  ...heroExtraIcons,
};

export const heroCtaIconIds = ["none", ...heroIconIds] as const;
export type HeroCtaIconId = (typeof heroCtaIconIds)[number];

export const heroCtaIconLabels: Record<HeroCtaIconId, string> = {
  none: "None — text only",
  ...heroIconLabels,
};

export const heroPrimaryCtaStyleIds = ["yellow", "blueBright", "outlineWhite"] as const;
export type HeroPrimaryCtaStyleId = (typeof heroPrimaryCtaStyleIds)[number];

export const heroPrimaryCtaStyleLabels: Record<HeroPrimaryCtaStyleId, string> = {
  yellow: "Yellow — production primary",
  blueBright: "Brand blue bright",
  outlineWhite: "Outline white on photo",
};

export const heroSecondaryCtaStyleIds = ["glass", "outline", "solidYellow"] as const;
export type HeroSecondaryCtaStyleId = (typeof heroSecondaryCtaStyleIds)[number];

export const heroSecondaryCtaStyleLabels: Record<HeroSecondaryCtaStyleId, string> = {
  glass: "Glass + icon circle — production",
  outline: "Outline white (no fill)",
  solidYellow: "Solid yellow CTA",
};

export function resolveHeroPrimaryCtaClasses(style: HeroPrimaryCtaStyleId): string {
  switch (style) {
    case "blueBright":
      return "bg-brand-blue-bright text-white shadow-cta";
    case "outlineWhite":
      return "border-[1.5px] border-white/80 bg-transparent text-white shadow-[0_6px_20px_rgba(0,0,0,.22)] backdrop-blur-sm hover:border-white hover:bg-white/10";
    case "yellow":
    default:
      return "bg-brand-yellow text-black shadow-cta-yellow";
  }
}

export function resolveHeroSecondaryCtaClasses(style: HeroSecondaryCtaStyleId): string {
  switch (style) {
    case "outline":
      return "border-[1.5px] border-white/80 bg-transparent text-white shadow-[0_6px_20px_rgba(0,0,0,.22)] backdrop-blur-sm hover:border-white hover:bg-white/10";
    case "solidYellow":
      return "border border-brand-yellow bg-brand-yellow text-black shadow-cta-yellow hover:bg-[#ffd04a]";
    case "glass":
    default:
      return "border-[1.5px] border-white/70 bg-[rgba(4,18,38,.58)] text-white shadow-[0_6px_20px_rgba(0,0,0,.28)] backdrop-blur-sm hover:border-white hover:bg-[rgba(4,18,38,.72)]";
  }
}

export function resolveHeroSecondaryIconCircleClasses(style: HeroSecondaryCtaStyleId): string {
  switch (style) {
    case "solidYellow":
      return "bg-brand-blue text-white";
    case "outline":
      return "border border-white/70 bg-transparent text-white";
    case "glass":
    default:
      return "bg-brand-yellow text-brand-blue";
  }
}
