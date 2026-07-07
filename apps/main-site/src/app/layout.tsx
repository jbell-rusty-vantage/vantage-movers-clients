import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { business } from "@/lib/content";
import { siteBodyFont, siteDisplayFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${business.name} | Nationwide Long-Distance Moving Broker`,
  description:
    "Licensed interstate moving broker helping families and businesses coordinate long-distance moves with FMCSA-authorized motor carriers.",
  applicationName: business.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${siteDisplayFont.variable} ${siteBodyFont.variable}`}>
      <body className="antialiased">
        {children}
        <SiteAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
