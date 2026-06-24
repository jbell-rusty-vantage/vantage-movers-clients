import { Fragment } from "react";
import { cn } from "@vantage/utils";
import { resolveSiteImage } from "@/content/images";
import type { TwoColContent } from "@/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageFill } from "@/components/ui/ImageFill";
import { Phone } from "@/components/ui/Phone";
import { Button } from "@/components/ui/Button";

export interface TwoColProps {
  content: TwoColContent;
  /** Override section photo by registry key or public path. */
  image?: string;
}

/** Two-column text + illustration section (Auto Transport / Support). */
export function TwoCol({ content, image }: TwoColProps) {
  const { id, reverse, scene, eyebrow, title, body, cta } = content;
  const src = image ? resolveSiteImage(image) : content.image;
  return (
    <section className={cn("section twocol", reverse && "twocol--rev")} id={id}>
      <div className="wrap twocol__in">
        <div className="twocol__text reveal">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>
            {title.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h2>
          <p>{body}</p>
          <div className="twocol__cta">
            <Phone analyticsLocation={id} />
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </div>
        <div className="twocol__media reveal" data-d="1">
          <ImageFill
            scene={scene}
            src={src}
            alt={title.join(" ")}
            sizes="(max-width: 900px) 100vw, 50vw"
            className="twocol__img"
          />
        </div>
      </div>
    </section>
  );
}
