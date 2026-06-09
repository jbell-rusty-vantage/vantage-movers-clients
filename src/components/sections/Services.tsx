"use client";

import { services, servicesIntro } from "@/content/services";
import { resolveSiteImage, type SiteImageKey } from "@/content/images";
import { trackEvent } from "@/lib/analytics";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { ImageFill } from "@/components/ui/ImageFill";

const SERVICE_IMAGE_KEYS = {
  longdist: "longDistanceMoves",
  storage: "packingStorage",
  office: "officeMoves",
  military: "militaryMoves",
} as const;

function serviceImage(
  service: (typeof services)[number],
  overrides?: Partial<Record<SiteImageKey, string>>,
): string {
  const key = SERVICE_IMAGE_KEYS[service.scene as keyof typeof SERVICE_IMAGE_KEYS];
  return resolveSiteImage((key && overrides?.[key]) ?? service.image ?? "");
}

export interface ServicesProps {
  /** Override service card photos by registry key or public path. */
  images?: Partial<Record<SiteImageKey, string>>;
}

export function Services({ images }: ServicesProps = {}) {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="section__head reveal">
          <Eyebrow center>{servicesIntro.eyebrow}</Eyebrow>
          <h2>{servicesIntro.title}</h2>
          <p>{servicesIntro.body}</p>
        </div>
        <div className="services__grid">
          {services.map((s, i) => (
            <article className="svc reveal" data-d={(i % 3) + 1} key={s.title}>
              <ImageFill
                scene={s.scene}
                src={serviceImage(s, images)}
                alt={s.title}
                sizes="(max-width: 600px) 100vw, 33vw"
                className="svc__img"
              />
              <div className="svc__body">
                <span className="svc__ico">
                  <Icon name={s.icon} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <a
                  className="svc__link"
                  href="#quote"
                  onClick={() =>
                    trackEvent("cta_clicked", {
                      cta_location: "service_card",
                      move_type: s.title,
                    })
                  }
                >
                  Get a quote <Icon name="arrowRight" width={15} height={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
