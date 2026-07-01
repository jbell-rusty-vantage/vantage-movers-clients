import type { BannerContent, TwoColContent } from "@/types";
import { SITE_IMAGES } from "@/content/images";

/** Shared urgency pill copy used by banners + promo. */
export const URGENCY_TEXT = "20+ booked a move in the last hour";

/** Partner logos for the "trusted & reviewed on" marquee. */
export interface TrustLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional modifier for logo-specific CSS (e.g. "getmovers"). */
  imgClass?: string;
}

export const trustStrip: { label: string; logos: TrustLogo[] } = {
  label: "As trusted & reviewed on",
  logos: [
    { src: "/partnerlogos/tbm_leads.svg", alt: "TBM", width: 190, height: 50 },
    { src: "/partnerlogos/tbm_prime_leads.svg", alt: "TBM Prime", width: 134, height: 40 },
    { src: "/partnerlogos/top10.svg", alt: "Top 10 Moving Companies", width: 130, height: 36 },
    { src: "/partnerlogos/convoice.svg", alt: "Consumer Voice", width: 99, height: 30 },
    {
      src: "/partnerlogos/getmovers.svg",
      alt: "Get Movers",
      width: 456,
      height: 44,
      imgClass: "getmovers",
    },
  ],
};

/** 6. Promo banner — pricing CTA. */
export const promoBanner: BannerContent = {
  scene: "promo",
  eyebrow: "",
  title: ["Long Distance Moves", "Starting at $1,499"],
  body: "Find out how much we can help you save",
};

/** 8. Expertise banner (tall) — planning section. */
export const expertiseBanner: BannerContent = {
  scene: "expertise",
  eyebrow: "",
  title: ["Planning a Long Distance Move?"],
  body: "Moving a long distance can be a stressful experience. With Vantage Movers you get a professional moving coordinator and moving team dedicated to helping make your long distance move a breeze. Contact us for an easy and affordable moving experience.",
  tall: true,
  image: SITE_IMAGES.expertiseBanner,
};

/** 12. Final CTA banner. */
export const finalCta: BannerContent = {
  scene: "finalcta",
  eyebrow: "",
  title: ["Request a Free Moving Quote."],
  body: "Tell us your pickup zip code to get your FREE estimate",
  overlay: 0.7,
};

/** 11. Support two-column section (reversed). */
export const support: TwoColContent = {
  id: "support",
  reverse: true,
  scene: "support",
  eyebrow: "",
  title: ["Vantage Moving Support is", "Always a Call Away"],
  body: "Moving with Vantage is seamless. Our dedicated moving coordinator manages every detail, ensuring a smooth transition. From packing to settling in, we're with you at every step. See why +9,500 families choose us as the best nation wide moving service provider. Contact us today to get a free affordable quote for your move.",
  cta: { label: "Speak With an Agent", href: "#quote" },
  image: SITE_IMAGES.coordinationSupport,
};

/** Legacy section — not rendered on the main landing page. Kept for Storybook. */
export const autoTransport: TwoColContent = {
  id: "auto",
  scene: "auto",
  eyebrow: "Auto transport",
  title: ["Need Reliable Auto Transport?"],
  body: "Need to move a vehicle along with your household goods? Our coordinators can help you request auto-transport options and compare the services available for your route.",
  cta: { label: "Request Free Quote", href: "#quote" },
  image: SITE_IMAGES.autoTransport,
};

/** Legacy section — not rendered on the main landing page. Kept for Storybook. */
export const commitment = {
  eyebrow: "Why Vantage",
  title: "Licensed Broker. Clear Coordination.",
  body: "Vantage Movers is a licensed interstate moving broker. We help customers plan, quote, and coordinate long distance relocations through FMCSA-authorized motor carriers.",
};
