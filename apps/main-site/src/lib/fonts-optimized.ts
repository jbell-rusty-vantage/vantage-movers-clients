import localFont from "next/font/local";

export const siteDisplayFont = localFont({
  src: "../fonts/BricolageGrotesque-variable.woff2",
  weight: "500 800",
  variable: "--font-display",
  display: "swap",
});

export const siteBodyFont = localFont({
  src: "../fonts/HankenGrotesk-variable.woff2",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});

export const heroHeadingFont = localFont({
  src: "../fonts/RedHatDisplay-variable.woff2",
  weight: "600 800",
  display: "swap",
});

export const heroBodyFont = localFont({
  src: "../fonts/Manrope-variable.woff2",
  weight: "400 700",
  display: "swap",
});

export const testimonialsBodyFont = localFont({
  src: "../fonts/SourceSans3-variable.woff2",
  weight: "200 900",
  display: "swap",
});
