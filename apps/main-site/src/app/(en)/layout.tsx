import { getSiteContent } from "@/lib/cms/server";
import { ContentProvider } from "@/components/cms/Content";
import { ComplianceBar } from "@/components/layout/ComplianceBar";
import { AnchorFocus } from "@/components/layout/AnchorFocus";
import type { Metadata } from "next";
import { SiteTelemetry } from "@/components/analytics/SiteTelemetry";
import { telemetryMode } from "@/lib/telemetry-mode";
import { business } from "@/lib/content";
import { siteBodyFont, siteDisplayFont } from "@/lib/fonts";
import { siteDescription, siteKeywords, siteName, siteUrl } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Nationwide Long-Distance Moving Broker`,
    template: `%s | ${business.name}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  category: "Moving and relocation services",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${business.name} | Nationwide Long-Distance Moving Broker`,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${business.name} moving coordination`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Nationwide Long-Distance Moving Broker`,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();
  return (
    <html lang="en" className={`${siteDisplayFont.variable} ${siteBodyFont.variable}`}>
      <body className="antialiased">
        <ContentProvider values={content.values} fields={content.fields} locale="en"><ComplianceBar />
        {children}<AnchorFocus /></ContentProvider>
        <SiteTelemetry mode={telemetryMode(process.env.VERCEL_ENV, process.env.VERCEL_GIT_COMMIT_SHA)} />
      </body>
    </html>
  );
}
