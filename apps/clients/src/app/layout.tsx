import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import Script from "next/script";
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
import { BounceTracker } from "@/components/analytics/BounceTracker";

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

const INVOCA_TAG_ID = "2009/2140176962";
const INVOCA_SCRIPT_SRC = "solutions.invocacdn.com/js/invoca-latest.min.js";

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
        <BounceTracker />
        <Script id="invoca-tag" strategy="beforeInteractive">
          {`
            (function(i,n,v,o) {
              i.InvocaTagId = o;
              var s = n.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://' + v;
              var fs = n.getElementsByTagName('script')[0];
              fs.parentNode.insertBefore(s, fs);
            })(window, document, '${INVOCA_SCRIPT_SRC}', '${INVOCA_TAG_ID}');
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
