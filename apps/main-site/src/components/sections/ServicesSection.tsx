import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { featureRows, services } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { resolveSiteImage } from "@/lib/images";
import { SERVICE_ICONS } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageTile, TileBadge } from "@/components/ui/ImageTile";
import { radiusClasses } from "@/lib/playground/layout-playground";
import type { ServiceIconId } from "@/lib/playground/services-playground";

/** Playground args promoted to production — see ServicesSection.stories.tsx Playground. */
const SECTION_HEADING_FONT_SIZE = 40;
const SECTION_INTRO_FONT_SIZE = 16;
const FEATURE_TITLE_FONT_SIZE = 32;
const FEATURE_BODY_FONT_SIZE = 16;
const CHECKLIST_FONT_SIZE = 15.5;
const CARD_TITLE_FONT_SIZE = 20;
const CARD_DESC_FONT_SIZE = 14;
const CTA_FONT_SIZE = 15;
const CARD_RADIUS = "md2" as const;
const ICON_WRAPPER_RADIUS = "md2" as const;
const IMAGE_TILE_RADIUS = "md2" as const;
const BUTTON_RADIUS = "md2" as const;
const CARD_ICON_SIZE = 24;
const CARD_ICON_WRAPPER_SIZE = 44;
const BADGE_ICON_SIZE = 13;
const FEATURE_BADGE_ICONS: [ServiceIconId, ServiceIconId] = ["package-open", "box"];

function ServicesCheckListItem({
  children,
  bodyClassName,
}: {
  children: ReactNode;
  bodyClassName: string;
}) {
  return (
    <div
      className={`flex items-center gap-[11px] text-ink-soft ${bodyClassName}`}
      style={{ fontSize: `${CHECKLIST_FONT_SIZE}px` }}
    >
      <span className="grid size-6 flex-none place-items-center rounded-full bg-brand-yellow-soft">
        <Check className="size-3 text-brand-blue-bright" strokeWidth={3} aria-hidden />
      </span>
      {children}
    </div>
  );
}

export function ServicesSection() {
  const accentClass = heroHeadingFont.className;
  const bodyClass = heroBodyFont.className;

  return (
    <section id="services" className="bg-cream py-24">
      <Container>
        <div className="mx-auto mb-[52px] max-w-[680px] text-center">
          <Eyebrow className="justify-center">What We Coordinate</Eyebrow>
          <h2
            className={`${accentClass} mb-4 text-balance leading-[1.08] font-extrabold -tracking-[.02em] text-brand-blue`}
            style={{ fontSize: `${SECTION_HEADING_FONT_SIZE}px` }}
          >
            Long-Distance Moving Services, Arranged Through Authorized Carriers
          </h2>
          <p
            className={`${bodyClass} leading-[1.6] text-[#64748B]`}
            style={{ fontSize: `${SECTION_INTRO_FONT_SIZE}px` }}
          >
            Vantage Movers is a licensed interstate household goods moving broker. We help customers
            plan and coordinate relocations by reviewing move details and arranging transportation
            through FMCSA-authorized motor carriers.
          </p>
        </div>

        {featureRows.map((row, rowIndex) => {
          const badgeIconKey = FEATURE_BADGE_ICONS[rowIndex] ?? row.badge.icon;
          const BadgeIcon = SERVICE_ICONS[badgeIconKey];
          const content = (
            <div>
              <Eyebrow>{row.eyebrow}</Eyebrow>
              <h3
                className={`${accentClass} mb-4 text-balance leading-[1.1] font-extrabold -tracking-[.02em] text-brand-blue`}
                style={{ fontSize: `${FEATURE_TITLE_FONT_SIZE}px` }}
              >
                {row.title}
              </h3>
              <p
                className={`${bodyClass} mb-[22px] leading-[1.65] text-[#475569]`}
                style={{ fontSize: `${FEATURE_BODY_FONT_SIZE}px` }}
              >
                {row.body}
              </p>
              <div className="mb-7 flex flex-col gap-3">
                {row.checklist.map((item) => (
                  <ServicesCheckListItem key={item} bodyClassName={bodyClass}>
                    {item}
                  </ServicesCheckListItem>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#quote"
                  className={`${radiusClasses[BUTTON_RADIUS]} ${accentClass} bg-brand-blue-bright px-[26px] py-3.5 font-bold tracking-[.04em] text-white uppercase no-underline shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue`}
                  style={{ fontSize: `${CTA_FONT_SIZE}px` }}
                >
                  Request a Quote
                </a>
                <a
                  href="#services"
                  className={`${radiusClasses[BUTTON_RADIUS]} ${accentClass} border-[1.5px] border-cream-border bg-white px-6 py-[13px] font-bold tracking-[.04em] text-brand-blue uppercase no-underline transition hover:border-brand-blue`}
                  style={{ fontSize: `${CTA_FONT_SIZE}px` }}
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
              className={radiusClasses[IMAGE_TILE_RADIUS]}
              badge={
                <TileBadge icon={<BadgeIcon size={BADGE_ICON_SIZE} strokeWidth={2} />}>
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
                className={`flex flex-col border border-cream-border-2 bg-white p-7 no-underline shadow-card transition duration-250 hover:-translate-y-1.5 hover:shadow-card-hover ${radiusClasses[CARD_RADIUS]}`}
              >
                <span
                  className={`mb-[18px] grid place-items-center bg-brand-yellow-soft text-brand-blue-bright ${radiusClasses[ICON_WRAPPER_RADIUS]}`}
                  style={{
                    width: `${CARD_ICON_WRAPPER_SIZE}px`,
                    height: `${CARD_ICON_WRAPPER_SIZE}px`,
                  }}
                >
                  <Icon size={CARD_ICON_SIZE} aria-hidden />
                </span>
                <h3
                  className={`${accentClass} mb-2 font-extrabold -tracking-[.01em] text-brand-blue`}
                  style={{ fontSize: `${CARD_TITLE_FONT_SIZE}px` }}
                >
                  {s.title}
                </h3>
                <p
                  className={`${bodyClass} mb-[18px] flex-1 leading-[1.55] text-[#64748B]`}
                  style={{ fontSize: `${CARD_DESC_FONT_SIZE}px` }}
                >
                  {s.desc}
                </p>
                <span
                  className={`${accentClass} inline-flex items-center gap-[7px] font-bold text-brand-blue-bright`}
                  style={{ fontSize: `${Math.max(CTA_FONT_SIZE - 1, 12)}px` }}
                >
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
