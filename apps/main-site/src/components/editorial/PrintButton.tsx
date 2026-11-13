"use client";
import { CmsText } from "@/components/cms/Content";

export function PrintButton({ locale }: { locale: "en" | "es" }) {
  return <button type="button" className="editorial-cta print:hidden" onClick={() => window.print()}><CmsText scope="components/editorial/PrintButton.tsx">{locale === "es" ? "Imprimir la hoja" : "Print worksheet"}</CmsText></button>;
}
