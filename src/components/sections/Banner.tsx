import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { resolveSiteImage } from "@/content/images";
import type { BannerContent } from "@/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageFill } from "@/components/ui/ImageFill";

export interface BannerProps {
  content: BannerContent;
  /** Override banner photo by registry key or public path. */
  image?: string;
  /** CTA row (buttons, phone, urgency pill). */
  children?: ReactNode;
}

/** Reusable full-bleed image banner (Promo / Expertise / Final CTA). */
export function Banner({ content, image, children }: BannerProps) {
  const { scene, eyebrow, title, body, tall, overlay } = content;
  const src = image ? resolveSiteImage(image) : content.image;
  return (
    <section className={cn("banner reveal", tall && "banner--tall")}>
      <ImageFill
        scene={scene}
        src={src}
        alt={title.join(" ")}
        className="banner__bg"
        showLabel={false}
        overlay={overlay ?? true}
      />
      <div className="wrap banner__in">
        <Eyebrow center onDark>
          {eyebrow}
        </Eyebrow>
        <h2>
          {title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        {body && <p className="banner__body">{body}</p>}
        {children && <div className="banner__cta">{children}</div>}
      </div>
    </section>
  );
}
