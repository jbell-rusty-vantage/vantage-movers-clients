import { Clock, Phone } from "lucide-react";
import { business } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function ComplianceBar() {
  return (
    <div className="bg-brand-blue text-[13px] tracking-[.01em] text-on-dark-100">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-[9px]">
        <div className="flex flex-wrap items-center gap-[18px]">
          <span className="inline-flex items-center gap-[7px] font-semibold text-white">
            <span className="inline-block size-[7px] rounded-full bg-brand-yellow" />
            {business.brokerLine}
          </span>
          <span className="text-on-dark-600">DOT {business.dot}</span>
          <span className="text-on-dark-600">MC {business.mc}</span>
        </div>
        <div className="flex flex-wrap items-center gap-[18px]">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-[13px] text-brand-yellow" strokeWidth={2} aria-hidden />
            {business.hours}
          </span>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-1.5 font-bold text-white no-underline"
          >
            <Phone className="size-[13px] text-brand-yellow" strokeWidth={2} aria-hidden />
            {business.phoneDisplay}
          </a>
        </div>
      </Container>
    </div>
  );
}
