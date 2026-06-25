import { ArrowRight } from "lucide-react";
import { featureRows, services } from "@/lib/content";
import { resolveSiteImage } from "@/lib/images";
import { SERVICE_ICONS } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckListItem } from "@/components/ui/CheckListItem";
import { ImageTile, TileBadge } from "@/components/ui/ImageTile";

export function ServicesSection() {
  return (
    <section id="services" className="bg-cream py-24">
      <Container>
        <div className="mx-auto mb-[52px] max-w-[680px] text-center">
          <Eyebrow className="justify-center">What We Coordinate</Eyebrow>
          <h2 className="mb-4 text-balance font-display text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold -tracking-[.02em] text-brand-blue">
            Long-Distance Moving Services, Arranged Through Authorized Carriers
          </h2>
          <p className="text-[17px] leading-[1.6] text-[#64748B]">
            Vantage Movers is a licensed interstate household goods moving broker. We help customers
            plan and coordinate relocations by reviewing move details and arranging transportation
            through FMCSA-authorized motor carriers.
          </p>
        </div>

        {featureRows.map((row) => {
          const BadgeIcon = SERVICE_ICONS[row.badge.icon];
          const content = (
            <div>
              <Eyebrow>{row.eyebrow}</Eyebrow>
              <h3 className="mb-4 text-balance font-display text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-extrabold -tracking-[.02em] text-brand-blue">
                {row.title}
              </h3>
              <p className="mb-[22px] text-[16.5px] leading-[1.65] text-[#475569]">{row.body}</p>
              <div className="mb-7 flex flex-col gap-3">
                {row.checklist.map((item) => (
                  <CheckListItem key={item}>{item}</CheckListItem>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#quote"
                  className="rounded-lg2 bg-brand-blue-bright px-[26px] py-3.5 font-display text-[15px] font-bold tracking-[.04em] text-white uppercase no-underline shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue"
                >
                  Request a Quote
                </a>
                <a
                  href="#services"
                  className="rounded-lg2 border-[1.5px] border-cream-border bg-white px-6 py-[13px] font-display text-[15px] font-bold tracking-[.04em] text-brand-blue uppercase no-underline transition hover:border-brand-blue"
                >
                  Learn More
                </a>
              </div>
            </div>
          );

          const image = (
            <ImageTile
              src={resolveSiteImage(row.image)}
              alt={row.imageAlt}
              badge={
                <TileBadge icon={<BadgeIcon size={15} strokeWidth={2} />}>
                  {row.badge.label}
                </TileBadge>
              }
            />
          );

          return (
            <div
              key={row.eyebrow}
              className="mb-16 grid items-center gap-14 last:mb-[72px] md:grid-cols-2"
            >
              {row.imageFirst ? (
                <>
                  {image}
                  {content}
                </>
              ) : (
                <>
                  {content}
                  {image}
                </>
              )}
            </div>
          );
        })}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <a
                key={s.title}
                href="#quote"
                className="flex flex-col rounded-card border border-cream-border-2 bg-white p-7 no-underline shadow-card transition duration-250 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <span className="mb-[18px] grid size-[52px] place-items-center rounded-xl2 bg-brand-yellow-soft text-brand-blue-bright">
                  <Icon size={26} aria-hidden />
                </span>
                <h3 className="mb-2 font-display text-xl font-extrabold -tracking-[.01em] text-brand-blue">
                  {s.title}
                </h3>
                <p className="mb-[18px] flex-1 text-[14.5px] leading-[1.55] text-[#64748B]">
                  {s.desc}
                </p>
                <span className="inline-flex items-center gap-[7px] font-display text-sm font-bold text-brand-blue-bright">
                  Request a Quote <ArrowRight size={15} strokeWidth={2.4} aria-hidden />
                </span>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
