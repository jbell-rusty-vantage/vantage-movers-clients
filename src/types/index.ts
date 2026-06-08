/* ============================================================
   Vantage Movers - Shared domain types
   ============================================================ */

/** Semantic icon names mapped to lucide-react in components/ui/Icon.tsx */
export type IconName =
  | "phone"
  | "star"
  | "arrowUp"
  | "arrowRight"
  | "arrowLeft"
  | "check"
  | "truck"
  | "box"
  | "office"
  | "shield"
  | "pin"
  | "headset"
  | "car"
  | "users"
  | "clock"
  | "mail"
  | "quote"
  | "info"
  | "chevronRight"
  | "close";

/** Illustration scene presets used by <ImageFill /> */
export type SceneName =
  | "hero"
  | "longdist"
  | "storage"
  | "office"
  | "military"
  | "promo"
  | "expertise"
  | "auto"
  | "support"
  | "finalcta";

export interface SiteConfig {
  name: string;
  /** Single source of truth for the public phone number (placeholder for now). */
  phone: string;
  email: string;
  hours: string;
  address: {
    line1: string;
    line2: string;
  };
  license: {
    dot: string;
    mc: string;
  };
  tagline: string;
  copyrightYear: number;
  /** FMCSA broker disclaimer shown in the footer legal strip. */
  brokerDisclaimer: string;
}

export interface NavLink {
  label: string;
  href: string;
  /** Open in a new tab via a plain anchor (e.g. PDF documents). */
  newTab?: boolean;
}

export interface StatItem {
  icon: IconName;
  big: string;
  small: string;
}

export interface HeroContent {
  ratingScore: string;
  ratingCount: string;
  headline: string[];
  subcopy: string;
  stats: StatItem[];
  /** "split" | "centered" - the locked-in layout variant from the prototype. */
  variant: "split" | "centered";
}

export interface Service {
  scene: SceneName;
  icon: IconName;
  title: string;
  body: string;
  /** Optional real photo path under /public. */
  image?: string;
}

export interface Review {
  name: string;
  location: string;
  text: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface BannerContent {
  scene: SceneName;
  eyebrow: string;
  /** Lines are rendered with <br/> between them. */
  title: string[];
  body?: string;
  tall?: boolean;
  /** Stronger dark overlay opacity (0-1). */
  overlay?: number;
  /** Optional real photo path under /public. */
  image?: string;
}

export interface TwoColContent {
  id: string;
  reverse?: boolean;
  scene: SceneName;
  eyebrow: string;
  title: string[];
  body: string;
  cta: CtaLink;
  /** Optional real photo path under /public. */
  image?: string;
}

export interface CommitmentContent {
  eyebrow: string;
  title: string;
  body: string;
}

export interface PromoConfig {
  enabled: boolean;
  amount: number;
  inactivitySec: number;
  exitIntent: boolean;
  urgencyText: string;
}

export interface LegalSection {
  id: string;
  index: string;
  title: string;
  /** Each block is either a paragraph, a bullet list, or a callout. */
  blocks: LegalBlock[];
}

export type LegalBlock =
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; html: string }
  | { type: "h3"; text: string };

export interface LegalContactAction {
  label: string;
  href: string;
  variant: "gold" | "ghost";
  icon?: IconName;
}

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  /** Intro line shown in the hero, next to the "last updated" pill. */
  heroNote: string;
  lead: string;
  sections: LegalSection[];
  contact: {
    heading: string;
    bodyHtml: string;
    actions: LegalContactAction[];
  };
}
