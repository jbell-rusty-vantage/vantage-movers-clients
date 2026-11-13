import { CmsText } from "@/components/cms/Content";
import { CmsLink as Link } from "@/components/cms/Content";
import { ShieldCheck } from "lucide-react";
import { business } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function ComplianceBar({ locale = "en" }: { locale?: "en" | "es" }) {
  return <div className="license-strip bg-brand-blue text-white">
    <Container className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-[11px] sm:text-xs">
      <span className="inline-flex items-center gap-1.5 font-semibold"><ShieldCheck size={14} className="text-brand-yellow" aria-hidden /><CmsText scope="components/layout/ComplianceBar.tsx">{locale === "es" ? "Intermediario de mudanzas con licencia" : "Licensed Moving Broker"}</CmsText></span>
      <Link scope="components/layout/ComplianceBar.tsx" href="/consumer-information" className="inline-flex gap-4 text-white no-underline hover:underline"><span><CmsText scope="components/layout/ComplianceBar.tsx">{"USDOT "}</CmsText><CmsText scope="components/layout/ComplianceBar.tsx">{business.dot}</CmsText></span><span><CmsText scope="components/layout/ComplianceBar.tsx">{"MC "}</CmsText><CmsText scope="components/layout/ComplianceBar.tsx">{business.mc}</CmsText></span></Link>
    </Container>
  </div>;
}
