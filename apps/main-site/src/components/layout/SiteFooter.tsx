import { Footer } from "./Footer";
import type { ServiceLocale } from "@/content/services/types";

export function SiteFooter({ locale = "en-US", alternatePath }: { locale?: ServiceLocale; alternatePath?: string }) {
  return <Footer locale={locale} alternatePath={alternatePath} />;
}
