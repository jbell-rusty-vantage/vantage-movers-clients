import { Manrope, Red_Hat_Display } from "next/font/google";

/** Site-wide display font (headings, nav labels, CTAs). */
export const siteDisplayFont = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/** Site-wide body font (paragraphs, links, form fields). */
export const siteBodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
