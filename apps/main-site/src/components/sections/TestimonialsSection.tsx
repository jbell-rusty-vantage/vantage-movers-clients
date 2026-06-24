import { testimonials } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-24">
      <div className="absolute -top-[100px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(46,134,222,.22),transparent_65%)]" />
      <Container className="relative">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow onDark className="justify-center">
            Customer Feedback
          </Eyebrow>
          <h2 className="mb-3 text-balance font-display text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold -tracking-[.02em] text-white">
            Hear It From Movers We&apos;ve Helped
          </h2>
          <p className="text-[15px] text-on-dark-500">
            Feedback from long-distance moves coordinated through Vantage.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-card bg-white p-7 shadow-[0_14px_36px_rgba(4,18,38,.3)]"
            >
              <Stars size={17} className="mb-3.5" />
              <p className="mb-5 text-[15.5px] leading-[1.65] text-ink-soft italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#2E86DE] to-brand-blue-bright font-display text-[15px] font-extrabold text-white">
                  {t.initials}
                </span>
                <div>
                  <div className="font-display text-[15px] font-bold text-brand-blue">
                    {t.name}
                  </div>
                  <div className="text-[13px] text-[#64748B]">{t.route}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
