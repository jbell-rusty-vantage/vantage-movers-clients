import { Fragment } from "react";
import { finalCta, URGENCY_TEXT } from "@/content/sections";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageFill } from "@/components/ui/ImageFill";
import { Phone } from "@/components/ui/Phone";
import { Button } from "@/components/ui/Button";

export function FinalCTA({ phone }: { phone?: string } = {}) {
  return (
    <section className="finalcta reveal">
      <ImageFill
        scene={finalCta.scene}
        className="finalcta__bg"
        showLabel={false}
        overlay={finalCta.overlay ?? 0.7}
      />
      <div className="wrap finalcta__in">
        <Eyebrow center onDark>
          {finalCta.eyebrow}
        </Eyebrow>
        <h2>
          {finalCta.title.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h2>
        <Phone num={phone} dark analyticsLocation="final_cta" />
        <span className="urgency">
          <span className="urgency__dot" />
          {URGENCY_TEXT}
        </span>
        <Button variant="gold" size="lg" href="#quote">
          Request a Free Estimate
        </Button>
      </div>
    </section>
  );
}
