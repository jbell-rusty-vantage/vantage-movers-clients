import { ComplianceBar } from "@/components/layout/ComplianceBar";
import { AnchorFocus } from "@/components/layout/AnchorFocus";
import { SiteTelemetry } from "@/components/analytics/SiteTelemetry";
import { telemetryMode } from "@/lib/telemetry-mode";
import { siteBodyFont, siteDisplayFont } from "@/lib/fonts";
import "../globals.css";
export { metadata } from "../(en)/layout";
export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es" className={`${siteDisplayFont.variable} ${siteBodyFont.variable}`}><body className="antialiased"><ComplianceBar locale="es" />{children}<AnchorFocus /><SiteTelemetry mode={telemetryMode(process.env.VERCEL_ENV, process.env.VERCEL_GIT_COMMIT_SHA)} /></body></html>;
}
