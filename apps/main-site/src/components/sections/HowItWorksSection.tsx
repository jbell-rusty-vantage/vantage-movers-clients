import { howItWorks } from "@/lib/content";
import { HOW_ICONS } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-24">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Container className="relative">
        <div className="mx-auto mb-[52px] max-w-[640px] text-center">
          <Eyebrow onDark className="justify-center">
            How It Works
          </Eyebrow>
          <h2 className="text-balance font-display text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold -tracking-[.02em] text-white">
            From Quote Request To Moving Day, in Three Steps
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {howItWorks.map((step) => {
            const Icon = HOW_ICONS[step.icon];
            return (
              <div
                key={step.n}
                className="rounded-card border border-white/12 bg-white/6 p-[30px]"
              >
                <div className="mb-[18px] flex items-center gap-3.5">
                  <span className="font-display text-[36px] leading-none font-black text-[rgba(255,192,46,.4)]">
                    {step.n}
                  </span>
                  <span className="grid size-[46px] place-items-center rounded-xl bg-[rgba(255,192,46,.16)]">
                    {Icon && <Icon size={24} className="text-brand-yellow" strokeWidth={2} />}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl font-extrabold text-white">
                  {step.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-on-dark-300">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
