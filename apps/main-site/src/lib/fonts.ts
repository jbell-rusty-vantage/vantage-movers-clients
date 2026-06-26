import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Manrope,
  Red_Hat_Display,
  Source_Sans_3,
} from "next/font/google";

/** Site-wide display font (nav, section headings, CTAs outside hero). */
export const siteDisplayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/** Site-wide body font. */
export const siteBodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/** Hero heading font — Red Hat Display (Storybook Playground choice). */
export const heroHeadingFont = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/** Hero body copy font — Manrope (Storybook Playground choice). */
export const heroBodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Testimonials body font — Source Sans 3 (Storybook Playground choice). */
export const testimonialsBodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
