import type { HeroContent } from "@/types";
import { HERO_IMAGES } from "@/content/images";

export const hero: HeroContent = {
  image: HERO_IMAGES.enhanced,
  overlayOpacity: 0.38,
  imageBrightness: 1.1,
  imagePosition: "center center",
  imagePositionLg: "center 30%",
  ratingScore: "4.8/5.0",
  ratingCount: "from 1000+ reviews",
  headline: ["Affordable Long Distance", "Moving Coordination"],
  subcopy:
    "Plan your interstate move with a licensed moving broker that helps match your route, inventory, and service needs with authorized motor carriers.",
  stats: [
    {
      icon: "users",
      big: "50,000+",
      small: "Families moved nationwide",
      animatedRange: { min: 50000, max: 55000, suffix: "+" },
    },
    {
      icon: "clock",
      big: "20+",
      small: "Booked a move in the last hour",
      animatedRange: { min: 20, max: 30, suffix: "+" },
    },
  ],
  variant: "split",
};
