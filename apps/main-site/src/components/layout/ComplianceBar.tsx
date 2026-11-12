import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { business } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function ComplianceBar({ locale = "en" }: { locale?: "en" | "es" }) {
  return <div className="license-strip bg-brand-blue text-white">
    <Container className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-[11px] sm:text-xs">
      <span className="inline-flex items-center gap-1.5 font-semibold"><ShieldCheck size={14} className="text-brand-yellow" aria-hidden />{locale === "es" ? "Intermediario de mudanzas con licencia" : "Licensed Moving Broker"}</span>
      <Link href="/consumer-information" className="inline-flex gap-4 text-white no-underline hover:underline"><span>USDOT {business.dot}</span><span>MC {business.mc}</span></Link>
    </Container>
  </div>;
}
