import type { IconKey } from "@/lib/content";

export type ServiceLocale = "en-US" | "es-US";

export interface QuoteWizardCopy {
  title: string;
  subtitle: string;
  continueLabel: string;
  submitLabel: string;
  confirmationTitle: string;
  confirmationBody: string;
}

export interface ServicePageContent {
  id: ServiceId;
  locale: ServiceLocale;
  slug: string;
  path: string;
  alternatePath: string;
  navLabel: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    desktopImage: string;
    mobileImage: string;
    imageAlt: string;
    proofPoints: Array<{ value: string; label: string }>;
  };
  quoteFormCopy: QuoteWizardCopy;
  benefits: Array<{ title: string; body: string; icon: IconKey }>;
  process: Array<{ title: string; body: string }>;
  planningTitle: string;
  planningIntro: string;
  planningChecklist: string[];
  faqs: Array<{ q: string; a: string }>;
  relatedServiceIds: ServiceId[];
}

export const SERVICE_IDS = [
  "long-distance-moving",
  "auto-transport",
  "military-moving",
  "residential-moving",
  "corporate-office-moving",
  "packing-services",
  "storage-options",
  "senior-moving",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];
