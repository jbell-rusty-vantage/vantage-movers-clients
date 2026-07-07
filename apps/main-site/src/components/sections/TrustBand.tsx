import { Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Stars } from "@/components/ui/Stars";

export function TrustBand() {
  return (
    <section className="border-b border-cream-border-2 bg-white">
      <Container className="flex flex-wrap items-center justify-between gap-8 py-[30px]">
        <div className="flex flex-wrap items-center gap-4">
          <Stars />
          <div className="text-[14.5px] text-[#64748B]">
            <b className="font-display text-brand-blue">Customer feedback nationwide</b>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3.5">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow-soft px-4 py-2 font-display text-[13px] font-bold text-brand-blue">
            <Shield className="size-[15px]" strokeWidth={2} aria-hidden />
            FMCSA Licensed &amp; Bonded
          </span>
        </div>
      </Container>
    </section>
  );
}
