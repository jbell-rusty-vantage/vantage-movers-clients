import { Footer } from "./Footer";
export function SiteFooter({ locale = "en" }: { locale?: "en" | "es" }) {
  return <Footer locale={locale} />;
}
