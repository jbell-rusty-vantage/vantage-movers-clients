import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Red_Hat_Display,
} from "next/font/google";
import localFont from "next/font/local";
import { sitePresentation } from "./presentation";

/** Site-wide display font (nav, section headings, CTAs outside hero). */
const optimizedDisplayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/** Site-wide body font. */
const optimizedBodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/** Hero heading font — Red Hat Display (Storybook Playground choice). */
const optimizedHeroHeadingFont = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/** Hero body copy font — Manrope (Storybook Playground choice). */
const optimizedHeroBodyFont = localFont({
  src: "../fonts/Manrope-variable.ttf",
  weight: "400 700",
  display: "swap",
});

/** Testimonials body font — Source Sans 3 (Storybook Playground choice). */
const optimizedTestimonialsBodyFont = localFont({
  src: "../fonts/SourceSans3-variable.ttf",
  weight: "200 900",
  display: "swap",
});

const canyonDisplayFont = localFont({
  src: "../fonts/PlusJakartaSans-variable.ttf",
  weight: "200 800",
  variable: "--font-display",
  display: "swap",
});

const canyonBodyFont = localFont({
  src: "../fonts/Inter-variable.ttf",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});

const canyon = sitePresentation.id === "canyon";
export const siteDisplayFont = canyon ? canyonDisplayFont : optimizedDisplayFont;
export const siteBodyFont = canyon ? canyonBodyFont : optimizedBodyFont;
export const heroHeadingFont = canyon ? canyonDisplayFont : optimizedHeroHeadingFont;
export const heroBodyFont = canyon ? canyonBodyFont : optimizedHeroBodyFont;
export const testimonialsBodyFont = canyon ? canyonBodyFont : optimizedTestimonialsBodyFont;
