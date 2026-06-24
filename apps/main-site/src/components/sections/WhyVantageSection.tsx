import { whyVantage } from "@/lib/content";
import { WHY_ICONS } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function WhyVantageSection() {
  return (
    <section className="bg-cream py-24">
      <Container>
        <div className="mx-auto mb-[52px] max-w-[640px] text-center">
          <Eyebrow className="justify-center">Why Vantage</Eyebrow>
          <h2 className="text-balance font-display text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold -tracking-[.02em] text-brand-blue">
            A Moving Broker Built Around Clarity &amp; Trust
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyVantage.map((item) => {
            const Icon = WHY_ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-card border border-cream-border-2 bg-white p-7 shadow-card"
              >
                <span className="mb-4 grid size-12 place-items-center rounded-xl bg-brand-yellow-soft">
                  {Icon && <Icon size={24} className="text-brand-blue-bright" strokeWidth={2} />}
                </span>
                <h3 className="mb-2 font-display text-[19px] font-extrabold text-brand-blue">
                  {item.title}
                </h3>
                <p className="text-[14.5px] leading-[1.55] text-[#64748B]">{item.desc}</p>
              </div>
            );
          })}

          <div
            className="flex flex-col justify-center rounded-card bg-gradient-to-br from-brand-blue-bright to-brand-blue p-7 text-white shadow-[0_12px_30px_rgba(2,71,153,.22)]"
            style={{ backgroundImage: "linear-gradient(140deg,#1763CF,#024799)" }}
          >
            <h3 className="mb-2 font-display text-xl font-extrabold text-white">
              Ready to plan your move?
            </h3>
            <p className="mb-[18px] text-[14.5px] leading-[1.55] text-on-dark-100">
              Get a free, no-obligation estimate in under a minute.
            </p>
            <a
              href="#quote"
              className="self-start rounded-lg2 bg-brand-yellow px-[22px] py-3 font-display text-sm font-bold tracking-[.04em] text-black uppercase no-underline transition hover:-translate-y-0.5"
            >
              Get a Free Estimate
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
