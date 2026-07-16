import { Clock, Phone } from "lucide-react";
import { business } from "@/lib/content";
import { heroBodyFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import type { ServiceLocale } from "@/content/services/types";

/** Relaxed spacing — layout-playground spacingScale.relaxed */
const BAR_SPACING = { py: 12, gap: 24 } as const;

export function ComplianceBar({ locale = "en-US" }: { locale?: ServiceLocale }) {
  const es = locale === "es-US";
  return (
    <div
      className={`${heroBodyFont.className} bg-brand-blue text-[12px] tracking-[.01em] text-on-dark-100`}
    >
      <Container>
        <div
          className="flex flex-wrap items-center justify-between"
          style={{
            gap: `${BAR_SPACING.gap}px`,
            paddingTop: `${BAR_SPACING.py}px`,
            paddingBottom: `${BAR_SPACING.py}px`,
          }}
        >
          <div
            className="flex flex-wrap items-center"
            style={{ gap: `${BAR_SPACING.gap}px` }}
          >
            <span className="inline-flex items-center gap-[7px] font-semibold text-white">
              <span className="inline-block size-[7px] rounded-full bg-brand-yellow" aria-hidden />
              {es ? "Corredor de mudanzas autorizado" : business.brokerLine}
            </span>
            <span className="text-on-dark-600">DOT {business.dot}</span>
            <span className="text-on-dark-600">MC {business.mc}</span>
          </div>
          <div
            className="flex flex-wrap items-center"
            style={{ gap: `${BAR_SPACING.gap}px` }}
          >
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
        </div>
      </Container>
    </div>
  );
}
