import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Network, ShieldCheck, Truck } from "lucide-react";
import type { Testimonial } from "@vantage/api-client";
import type { ServicePageContent } from "@/content/services/types";
import { getServiceById } from "@/content/services/registry";
import { business } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { SERVICE_ICONS } from "@/lib/icons";
import { Header } from "@/components/layout/Header";
import { ComplianceBar } from "@/components/layout/ComplianceBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ServiceFaqs } from "./ServiceFaqs";
import { ServicePageJsonLd } from "@/components/seo/ServicePageJsonLd";

const sectionTitle = `${heroHeadingFont.className} text-balance text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-extrabold tracking-[-.025em] text-brand-blue`;
const body = `${heroBodyFont.className} leading-7 text-[#52647a]`;

export function ServicePage({ service, testimonials = [] }: { service: ServicePageContent; testimonials?: Testimonial[] }) {
  const es = service.locale === "es-US";
  const related = service.relatedServiceIds.map((id) => getServiceById(id, service.locale));

  return (
    <div lang={es ? "es" : "en"}>
      <ServicePageJsonLd service={service} />
      <ComplianceBar locale={service.locale} />
      <Header locale={service.locale} alternatePath={service.alternatePath} quoteHref={`${service.path}#quote`} />
      <main>
        <section className="relative overflow-hidden bg-[#061d3a] text-white">
          <picture className="absolute inset-0">
            <source media="(max-width: 639px)" srcSet={service.hero.mobileImage} />
            <Image src={service.hero.desktopImage} alt={service.hero.imageAlt} fill priority sizes="100vw" className="object-cover object-center" />
          </picture>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,20,43,.95)_0%,rgba(2,34,70,.82)_46%,rgba(2,24,51,.46)_100%)] sm:bg-[linear-gradient(90deg,rgba(2,20,43,.94)_0%,rgba(2,34,70,.8)_46%,rgba(2,24,51,.58)_100%)]" />
          <Container className="relative py-8 sm:py-12 lg:py-16">
            <nav aria-label={es ? "Migas de pan" : "Breadcrumb"} className={`${heroBodyFont.className} mb-8 flex flex-wrap items-center gap-2 text-sm text-white/75`}>
              <Link href="/" className="text-white/75 no-underline hover:text-white">{es ? "Inicio" : "Home"}</Link>
              <span aria-hidden>/</span><span>{es ? "Servicios" : "Services"}</span><span aria-hidden>/</span><span className="text-white">{service.navLabel}</span>
            </nav>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,.75fr)] lg:gap-14">
              <div className="max-w-3xl">
                <p className={`${heroHeadingFont.className} mb-4 text-sm font-extrabold tracking-[.13em] text-brand-yellow uppercase`}>{service.hero.eyebrow}</p>
                <h1 className={`${heroHeadingFont.className} text-balance text-[clamp(2.5rem,6vw,5.25rem)] leading-[.98] font-extrabold tracking-[-.045em]`}>{service.hero.title}</h1>
                <p className={`${heroBodyFont.className} mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl`}>{service.hero.body}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {service.hero.proofPoints.map((point) => (
                    <div key={point.value} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                      <strong className={`${heroHeadingFont.className} block text-base font-extrabold text-brand-yellow`}>{point.value}</strong>
                      <span className={`${heroBodyFont.className} mt-1 block text-sm leading-5 text-white/75`}>{point.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <QuoteWizard variant="panel" formId="quote" copy={service.quoteFormCopy} locale={service.locale} serviceId={service.id} />
            </div>
          </Container>
        </section>

        <section className="border-y border-[#dbe6f2] bg-white py-6">
          <Container className="grid gap-5 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-3"><ShieldCheck className="size-6 text-brand-blue-bright" aria-hidden /><span><strong className="block text-brand-blue">{es ? "Corredor autorizado" : "Licensed broker"}</strong>{es ? "Verifique USDOT y MC" : "Verify USDOT and MC authority"}</span></div>
            <div className="flex items-center gap-3"><Network className="size-6 text-brand-blue-bright" aria-hidden /><span><strong className="block text-brand-blue">{es ? "Transportistas autorizados" : "Authorized carriers"}</strong>{es ? "Transporte coordinado según la ruta" : "Transportation coordinated by route"}</span></div>
            <Link href="/consumer-information" className="flex items-center gap-3 text-inherit no-underline hover:text-brand-blue-bright"><ClipboardCheck className="size-6 text-brand-blue-bright" aria-hidden /><span><strong className="block text-brand-blue">{es ? "Recursos del consumidor" : "Consumer resources"}</strong>{es ? "Conozca sus derechos" : "Know your rights and responsibilities"}</span></Link>
          </Container>
        </section>

        <section className="bg-cream py-20 sm:py-24">
          <Container>
            <div className="max-w-2xl"><p className="mb-3 font-bold tracking-[.12em] text-brand-blue-bright uppercase">{es ? "Lo que incluye" : "What this service includes"}</p><h2 className={sectionTitle}>{es ? "Coordinación diseñada para los detalles" : "Coordination built around the details"}</h2></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {service.benefits.map((item) => { const Icon = SERVICE_ICONS[item.icon]; return <article key={item.title} className="rounded-2xl border border-[#e0d8ca] bg-white p-7 shadow-card"><span className="grid size-12 place-items-center rounded-xl bg-brand-yellow-soft text-brand-blue"><Icon className="size-6" aria-hidden /></span><h3 className={`${heroHeadingFont.className} mt-5 text-xl font-extrabold text-brand-blue`}>{item.title}</h3><p className={`${body} mt-3`}>{item.body}</p></article>; })}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container><div className="max-w-2xl"><p className="mb-3 font-bold tracking-[.12em] text-brand-blue-bright uppercase">{es ? "Cómo funciona" : "How it works"}</p><h2 className={sectionTitle}>{es ? "Un proceso claro en cuatro pasos" : "A clear four-step process"}</h2></div>
            <ol className="mt-10 grid gap-7 md:grid-cols-4">{service.process.map((step, index) => <li key={step.title} className="relative border-t-2 border-brand-yellow pt-6"><span className={`${heroHeadingFont.className} text-sm font-extrabold text-brand-blue-bright`}>{String(index + 1).padStart(2, "0")}</span><h3 className={`${heroHeadingFont.className} mt-3 text-xl font-extrabold text-brand-blue`}>{step.title}</h3><p className={`${body} mt-3`}>{step.body}</p></li>)}</ol>
          </Container>
        </section>

        <section className="bg-brand-blue py-20 text-white sm:py-24">
          <Container><div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/20 bg-white/10 p-7 sm:p-9"><Network className="size-8 text-brand-yellow" aria-hidden /><h2 className={`${heroHeadingFont.className} mt-5 text-3xl font-extrabold`}>{es ? "Responsabilidad de Vantage" : "Vantage's broker role"}</h2><p className={`${heroBodyFont.className} mt-4 leading-7 text-white/80`}>{es ? "Vantage revisa la información, ayuda a preparar el estimado y organiza el transporte con un transportista autorizado. No transporta los bienes ni opera una flota de mudanzas." : "Vantage reviews move information, helps prepare the estimate, and arranges transportation with an authorized motor carrier. Vantage does not transport household goods or operate a moving fleet."}</p></article>
            <article className="rounded-2xl border border-white/20 bg-white/10 p-7 sm:p-9"><Truck className="size-8 text-brand-yellow" aria-hidden /><h2 className={`${heroHeadingFont.className} mt-5 text-3xl font-extrabold`}>{es ? "Responsabilidad del transportista" : "Motor carrier's role"}</h2><p className={`${heroBodyFont.className} mt-4 leading-7 text-white/80`}>{es ? "El transportista autorizado realiza la recogida, el transporte y la entrega bajo sus documentos y tarifa aplicables. Revise la identidad y autoridad del transportista asignado." : "The authorized motor carrier performs pickup, transportation, and delivery under its applicable shipping documents and tariff. Review the assigned carrier's identity and authority."}</p></article>
          </div></Container>
        </section>

        <section className="bg-[#edf5ff] py-20 sm:py-24">
          <Container><div className="grid items-center gap-12 lg:grid-cols-[1fr_.85fr]">
            <div><p className="mb-3 font-bold tracking-[.12em] text-brand-blue-bright uppercase">{es ? "Prepárese" : "Plan ahead"}</p><h2 className={sectionTitle}>{service.planningTitle}</h2><p className={`${body} mt-5 max-w-2xl text-lg`}>{service.planningIntro}</p><ul className="mt-7 grid gap-4 sm:grid-cols-2">{service.planningChecklist.map((item) => <li key={item} className="flex gap-3"><span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-brand-yellow"><Check className="size-3.5 text-brand-blue" strokeWidth={3} aria-hidden /></span><span className={body}>{item}</span></li>)}</ul></div>
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl shadow-tile"><Image src="/images/services/broker-coordinator-detail.webp" alt={es ? "Coordinadora de mudanzas revisando un plan con un cliente" : "Moving coordinator reviewing a move plan with a customer"} fill sizes="(max-width:1024px) 100vw, 42vw" className="object-cover" /></div>
          </div></Container>
        </section>

        {testimonials.length ? <TestimonialsSection items={testimonials} /> : null}

        <section className="bg-white py-20 sm:py-24"><Container><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><p className="mb-3 font-bold tracking-[.12em] text-brand-blue-bright uppercase">{es ? "Cobertura nacional" : "Nationwide coverage"}</p><h2 className={sectionTitle}>{es ? "Coordinación en los 50 estados" : "Coordination across all 50 states"}</h2><p className={`${body} mt-5`}>{es ? "La disponibilidad depende de la ruta, las fechas, los servicios y los transportistas autorizados disponibles." : "Availability depends on route, timing, requested services, and authorized carrier availability."}</p></div><div><h2 className={`${heroHeadingFont.className} text-2xl font-extrabold text-brand-blue`}>{es ? "Servicios relacionados" : "Related services"}</h2><div className="mt-5 grid gap-4 sm:grid-cols-3">{related.map((item) => <Link key={item.id} href={item.path} className="group rounded-xl border border-[#d7e4f5] p-5 text-brand-blue no-underline transition hover:-translate-y-1 hover:shadow-card-hover"><strong className={`${heroHeadingFont.className} block text-lg`}>{item.navLabel}</strong><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-blue-bright">{es ? "Ver servicio" : "Explore service"}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden /></span></Link>)}</div></div></div></Container></section>

        <section className="bg-cream py-20 sm:py-24"><Container><div className="mx-auto max-w-4xl"><div className="text-center"><p className="mb-3 font-bold tracking-[.12em] text-brand-blue-bright uppercase">FAQ</p><h2 className={sectionTitle}>{es ? "Preguntas frecuentes" : "Frequently asked questions"}</h2></div><div className="mt-10"><ServiceFaqs items={service.faqs} /></div></div></Container></section>

        <section className="bg-[#061d3a] py-16 text-white sm:py-20"><Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div className="max-w-3xl"><p className={`${heroHeadingFont.className} text-sm font-bold tracking-[.12em] text-brand-yellow uppercase`}>{es ? "Cotización gratuita · Sin obligación" : "Free quote · No obligation"}</p><h2 className={`${heroHeadingFont.className} mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl`}>{es ? "¿Listo para revisar los detalles?" : "Ready to review your move details?"}</h2><p className={`${heroBodyFont.className} mt-4 text-lg text-white/75`}>{es ? "Hable con un coordinador o complete el mismo formulario seguro de cotización." : "Speak with a coordinator or complete the same secure quote form."}</p></div><div className="flex flex-wrap gap-3"><Link href="#quote" className="rounded-xl bg-brand-yellow px-6 py-4 font-bold text-brand-blue no-underline">{es ? "Solicitar cotización" : "Request a quote"}</Link><a href={business.phoneHref} className="rounded-xl border border-white/30 px-6 py-4 font-bold text-white no-underline">{business.phoneDisplay}</a></div></Container></section>
      </main>
      <SiteFooter locale={service.locale} alternatePath={service.alternatePath} />
    </div>
  );
}
