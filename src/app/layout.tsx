import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/content/site";
import { LicenseBar } from "@/components/layout/LicenseBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PromoProvider } from "@/components/promo/PromoProvider";
import { RevealManager } from "@/components/interactive/RevealManager";
import { BackToTop } from "@/components/interactive/BackToTop";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | Affordable Nationwide Moving Services`,
  description: `Get a free moving estimate from ${site.name}, a licensed nationwide moving broker for long-distance, office, military, packing, storage, and auto transport moves.`,
  applicationName: site.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${publicSans.variable} antialiased`}
    >
      <body>
        <PromoProvider>
          <div id="top" />
          <LicenseBar />
          <Header />
          {children}
          <Footer />
          <RevealManager />
          <BackToTop />
        </PromoProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
