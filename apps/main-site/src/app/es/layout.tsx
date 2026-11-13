import { getSiteContent } from "@/lib/cms/server";
import { ContentProvider } from "@/components/cms/Content";
import { ComplianceBar } from "@/components/layout/ComplianceBar";
import { AnchorFocus } from "@/components/layout/AnchorFocus";
import { SiteTelemetry } from "@/components/analytics/SiteTelemetry";
import { telemetryMode } from "@/lib/telemetry-mode";
import { siteBodyFont, siteDisplayFont } from "@/lib/fonts";
import "../globals.css";
import { sitePresentation } from "@/lib/presentation";
export { metadata } from "../(en)/layout";
export default async function SpanishLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return <html lang="es" data-presentation={sitePresentation.id} className={`${siteDisplayFont.variable} ${siteBodyFont.variable}`}><body className="antialiased"><ContentProvider values={content.values} fields={content.fields} locale="es"><ComplianceBar locale="es" />{children}<AnchorFocus /></ContentProvider><SiteTelemetry mode={telemetryMode(process.env.VERCEL_ENV, process.env.VERCEL_GIT_COMMIT_SHA)} /></body></html>;
}
