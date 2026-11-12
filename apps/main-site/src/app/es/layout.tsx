import { AnchorFocus } from "@/components/layout/AnchorFocus";
import { SiteTelemetry } from "@/components/analytics/SiteTelemetry";
import { siteBodyFont, siteDisplayFont } from "@/lib/fonts";
import "../globals.css";
export { metadata } from "../(en)/layout";
export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es" className={`${siteDisplayFont.variable} ${siteBodyFont.variable}`}><body className="antialiased">{children}<AnchorFocus /><SiteTelemetry enabled={process.env.VERCEL_ENV === "production"} /></body></html>;
}
