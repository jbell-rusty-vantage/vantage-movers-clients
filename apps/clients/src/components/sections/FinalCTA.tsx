import { Fragment } from "react";
import { finalCta, URGENCY_TEXT } from "@/content/sections";
import { site } from "@/content/site";
import { telHref } from "@/lib/format";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageFill } from "@/components/ui/ImageFill";
import { Button } from "@/components/ui/Button";

export function FinalCTA({ phone }: { phone?: string } = {}) {
  const phoneNumber = phone ?? site.phone;

  return (
    <section className="finalcta reveal">
      <ImageFill
        scene={finalCta.scene}
        className="finalcta__bg"
        showLabel={false}
        overlay={finalCta.overlay ?? 0.7}
      />
      <div className="wrap finalcta__in">
        {finalCta.eyebrow && (
          <Eyebrow center onDark>
            {finalCta.eyebrow}
          </Eyebrow>
        )}
        <h2>
          {finalCta.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        {finalCta.body && <p className="finalcta__body">{finalCta.body}</p>}
        <p className="finalcta__call">
          Call <a href={telHref(phoneNumber)}>{phoneNumber}</a> for more information
        </p>
        <span className="urgency">
          <span className="urgency__dot" />
          {URGENCY_TEXT}
        </span>
        <Button variant="gold" size="lg" href="#quote">
          GET QUOTE
        </Button>
      </div>
    </section>
  );
}
