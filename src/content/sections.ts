import type { BannerContent, CommitmentContent, TwoColContent } from "@/types";

/** Shared urgency pill copy used by banners + promo. */
export const URGENCY_TEXT = "44+ booked a move in the last hour";

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
  eyebrow: "Save more",
  title: ["Save More With", "Vantage Movers"],
  body: "Get competitive quotes and expert coordination for your long distance move.",
};

/** 8. Expertise banner (tall). */
export const expertiseBanner: BannerContent = {
  scene: "expertise",
  eyebrow: "Our expertise",
  title: ["Nationwide Long Distance", "Moving Is Our Expertise"],
  body: "We focus on making every long distance move efficient, reliable, and tailored to your needs. Our professional moving experts are dedicated to careful planning and safe transportation — ensuring your move is smooth from start to finish.",
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
  body: "Vantage Movers takes the hassle out of car transport. Our auto-transport experts handle everything, so you can focus on settling in. Contact us for a free quote and see why we offer the best car transport services in the country.",
  cta: { label: "Request Free Quote", href: "#quote" },
  image: "/sitepictures/autotransport.jpg",
};

/** 11. Support two-column section (reversed). */
export const support: TwoColContent = {
  id: "support",
  reverse: true,
  scene: "support",
  eyebrow: "Always-on support",
  title: ["Support Is Available", "Every Step Of The Way"],
  body: "Vantage Movers customer support is available every step of the way. From pickup to delivery, we are there with you to help make your move a breeze — by phone, email, or chat, seven days a week.",
  cta: { label: "Get Instant Quote", href: "#quote" },
  image: "/sitepictures/Furniture%201.jpeg",
};

/** 10. Commitment band. */
export const commitment: CommitmentContent = {
  eyebrow: "Why Vantage",
  title: "Our Commitment To Excellence",
  body: "Vantage Movers stands out by prioritizing our customers. Our goal is to simplify your moving process and provide the best moving services tailored to your specific needs. Choose Vantage for a smooth and easy move.",
};
