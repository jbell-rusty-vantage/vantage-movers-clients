import { CmsElement } from "@/components/cms/Content";
import { CmsText } from "@/components/cms/Content";
import { Phone } from "lucide-react";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { radiusClasses } from "@/lib/playground/layout-playground";

/** Playground args promoted to production — see FaqSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 44;

const spanishFaqs = [
  { q: "¿Quién realiza la mudanza?", a: "Vantage actúa como intermediario de mudanzas interestatales. El transportista asignado realiza la recogida, el transporte y la entrega. Revise la identidad y las responsabilidades de cada empresa en sus documentos." },
  { q: "¿Qué necesito para solicitar una cotización?", a: "Prepare las ubicaciones de origen y destino, las fechas previstas y un inventario. Indique escaleras, ascensores, restricciones de acceso y servicios adicionales." },
  { q: "¿La solicitud reserva una fecha?", a: "No. Enviar una solicitud de cotización no reserva un transportista ni una fecha. Confirme las condiciones y los servicios por escrito antes de decidir." },
  { q: "¿Cómo comparo dos propuestas?", a: "Use el mismo inventario y los mismos servicios. Revise el tipo de estimación, los cargos adicionales, la protección de sus bienes y las condiciones para cambios." },
  { q: "¿Cómo verifico una empresa?", a: "Consulte el registro de FMCSA para mudanzas interestatales y compare la identidad, el tipo de empresa y los datos de registro con sus documentos." },
];
export function FaqSection({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  return (
    <section id="faq" className="scroll-mt-36 bg-cream py-24">
      <Container className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div className="lg:sticky lg:top-[120px]">
          <h2
            className={`mb-[18px] text-balance leading-[1.08] font-extrabold -tracking-[.02em] text-brand-blue ${heroHeadingFont.className}`}
            style={{ fontSize: `clamp(30px, 3.4vw, ${HEADING_FONT_SIZE}px)` }}
          >
            <CmsText scope="components/sections/FaqSection.tsx">{es ? "Preguntas frecuentes" : "Frequently Asked Questions"}</CmsText>
          </h2>
          <p
            className={`mb-[26px] text-base leading-[1.6] text-[#64748B] ${heroBodyFont.className}`}
          >
            <CmsText scope="components/sections/FaqSection.tsx">{es ? "Resuelva las preguntas importantes antes de planificar su mudanza." : "Find answers to common questions and what to expect throughout the relocation process."}</CmsText>
          </p>
          <CmsElement element="a" scope="components/sections/FaqSection.tsx"
            href={business.phoneHref}
            className={`inline-flex items-center gap-2.5 border border-cream-border bg-white px-5 py-4 no-underline shadow-card ${radiusClasses.md2}`}
            data-analytics-location="faq"
          >
            <span
              className={`grid size-[42px] flex-none place-items-center bg-brand-yellow-soft ${radiusClasses.md2}`}
            >
              <Phone className="size-5 text-brand-blue" strokeWidth={2} aria-hidden />
            </span>
            <span>
              <span className={`block text-[13px] text-[#64748B] ${heroBodyFont.className}`}>
                <CmsText scope="components/sections/FaqSection.tsx">{es ? "¿Tiene más preguntas?" : "Still have questions?"}</CmsText>
              </span>
              <span
                className={`block text-[17px] font-extrabold text-brand-blue ${heroHeadingFont.className}`}
              >
                <CmsText scope="components/sections/FaqSection.tsx">{business.phoneDisplay}</CmsText>
              </span>
            </span>
          </CmsElement>
        </div>

        <FaqAccordion items={es ? spanishFaqs : undefined} />
      </Container>
    </section>
  );
}
