import type { BannerContent, CommitmentContent, TwoColContent } from "@/types";

/** Shared urgency pill copy used by banners + promo. */
export const URGENCY_TEXT = "20+ booked a move in the last hour";

/** Partner logos for the "trusted & reviewed on" marquee. */
export interface TrustLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const trustStrip: { label: string; logos: TrustLogo[] } = {
  label: "As trusted & reviewed on",
  logos: [
    { src: "/partnerlogos/tbm_leads.svg", alt: "TBM", width: 190, height: 50 },
    { src: "/partnerlogos/tbm_prime_leads.svg", alt: "TBM Prime", width: 134, height: 40 },
    { src: "/partnerlogos/top10.svg", alt: "Top 10 Moving Companies", width: 130, height: 36 },
    { src: "/partnerlogos/convoice.svg", alt: "Consumer Voice", width: 99, height: 30 },
  ],
};

/** 6. Promo banner. */
export const promoBanner: BannerContent = {
  scene: "promo",
  eyebrow: "Free moving estimate",
  title: ["Plan Your Interstate", "Move With Clarity"],
  body: "Get a quote request started with a licensed broker that helps coordinate long distance moves through authorized motor carriers.",
};

/** 8. Expertise banner (tall). */
export const expertiseBanner: BannerContent = {
  scene: "expertise",
  eyebrow: "Our focus",
  title: ["Nationwide Long Distance", "Move Coordination"],
  body: "We help customers organize interstate moves with clear estimates, route planning, and carrier coordination. Final charges may vary based on carrier tariff, inventory, services, and move conditions.",
  tall: true,
  image: "/sitepictures/Truck%20Loaded.jpeg",
};

/** 12. Final CTA banner. */
export const finalCta: BannerContent = {
  scene: "finalcta",
  eyebrow: "Ready when you are",
  title: ["Get A Free Moving", "Estimate Today"],
  overlay: 0.7,
};

/** 9. Auto transport two-column section. */
export const autoTransport: TwoColContent = {
  id: "auto",
  scene: "auto",
  eyebrow: "Auto transport",
  title: ["Need Reliable Auto Transport?"],
  body: "Need to move a vehicle along with your household goods? Our coordinators can help you request auto-transport options and compare the services available for your route.",
  cta: { label: "Request Free Quote", href: "#quote" },
  image: "/sitepictures/autotransport.jpg",
};

/** 11. Support two-column section (reversed). */
export const support: TwoColContent = {
  id: "support",
  reverse: true,
  scene: "support",
  eyebrow: "Coordination support",
  title: ["Support For The", "Key Moving Details"],
  body: "Our team helps with quote requests, service questions, scheduling details, and carrier coordination so you can make informed decisions before moving day.",
  cta: { label: "Get Instant Quote", href: "#quote" },
  image: "/sitepictures/Furniture%201.jpeg",
};

/** 10. Commitment band. */
export const commitment: CommitmentContent = {
  eyebrow: "Why Vantage",
  title: "Licensed Broker. Clear Coordination.",
  body: "Vantage Movers is a licensed interstate moving broker. We help customers plan, quote, and coordinate long distance relocations through FMCSA-authorized motor carriers.",
};
