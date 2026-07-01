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
  headline: ["Affordable Stress Free", "Long Distance Moving Services"],
  subcopy:
    "Let's make your move easy. See why Vantage Movers is the premier choice in state to state moving services.",
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
