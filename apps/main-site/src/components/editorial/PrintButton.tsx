"use client";
export function PrintButton({ locale }: { locale: "en" | "es" }) {
  return <button type="button" className="editorial-cta print:hidden" onClick={() => window.print()}>{locale === "es" ? "Imprimir la hoja" : "Print worksheet"}</button>;
}
