import localFont from "next/font/local";

// next.config.ts selects the optimized font module when that presentation is active.
export const siteDisplayFont = localFont({
  src: "../fonts/PlusJakartaSans-variable.woff2",
  weight: "200 800",
  variable: "--font-display",
  display: "swap",
});

export const siteBodyFont = localFont({
  src: "../fonts/Inter-variable.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});

export const heroHeadingFont = siteDisplayFont;
export const heroBodyFont = siteBodyFont;
export const testimonialsBodyFont = siteBodyFont;
