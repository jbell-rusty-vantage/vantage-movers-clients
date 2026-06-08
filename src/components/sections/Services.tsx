import { services, servicesIntro } from "@/content/services";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { ImageFill } from "@/components/ui/ImageFill";

export function Services() {
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
                src={s.image}
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
                <a className="svc__link" href="#quote">
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
