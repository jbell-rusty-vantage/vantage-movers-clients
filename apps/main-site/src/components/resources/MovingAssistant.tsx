import { business } from "@/lib/content";

const answers = {
  en: [
    { question: "Who transports my belongings?", answer: "A motor carrier transports the shipment. A moving broker arranges transportation. Check the carrier name and contact details on your shipment paperwork; requesting a quote does not identify the carrier for your move.", source: "FMCSA: movers and brokers", href: "https://www.fmcsa.dot.gov/protect-your-move/movers-vs-brokers" },
    { question: "How should I compare two estimates?", answer: "Start with the same belongings and services. Mark differences in packing, access, storage and delivery terms, then ask for those differences to be addressed in writing before choosing an estimate.", source: "FMCSA moving checklist", href: "https://www.fmcsa.dot.gov/protect-your-move/moving-checklist" },
    { question: "What should I prepare for the inventory call?", answer: "Walk through every room, closet and storage area. Note items that need special handling and questions about access at both buildings. Keep a list of additions or removals to discuss with your coordinator.", source: "FMCSA moving checklist", href: "https://www.fmcsa.dot.gov/protect-your-move/moving-checklist" },
  ],
  es: [
    { question: "¿Quién transporta mis pertenencias?", answer: "Una empresa transportista realiza el traslado. Un intermediario de mudanzas organiza el transporte. Revise el nombre y los datos del transportista en los documentos de su envío; solicitar una cotización no identifica al transportista de su mudanza.", source: "FMCSA: transportistas e intermediarios (en inglés)", href: "https://www.fmcsa.dot.gov/protect-your-move/movers-vs-brokers" },
    { question: "¿Cómo comparo dos presupuestos?", answer: "Empiece con las mismas pertenencias y servicios. Señale las diferencias de embalaje, acceso, almacenamiento y condiciones de entrega; pida que se aclaren por escrito antes de elegir un presupuesto.", source: "Lista de mudanza de FMCSA (en inglés)", href: "https://www.fmcsa.dot.gov/protect-your-move/moving-checklist" },
    { question: "¿Qué preparo para la llamada de inventario?", answer: "Revise cada habitación, armario y espacio de almacenamiento. Anote los objetos que requieren cuidados especiales y las dudas sobre el acceso a ambos edificios. Mantenga una lista de cambios para conversar con su coordinador.", source: "Lista de mudanza de FMCSA (en inglés)", href: "https://www.fmcsa.dot.gov/protect-your-move/moving-checklist" },
  ],
};

/** Bounded source-linked prototype, not a model or access to a customer's shipment. */
export function MovingAssistant({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  return <section className="rounded-card border border-cream-border bg-cream p-6" aria-labelledby="moving-questions-title">
    <h2 id="moving-questions-title" className="mb-4 font-display text-2xl font-bold text-brand-blue">{es ? "Preguntas para preparar su mudanza" : "Questions to help plan your move"}</h2>
    <p className="mb-4">{es ? "Orientación general. Para fechas, servicios o condiciones de su envío, consulte sus documentos y hable con una persona de nuestro equipo." : "General planning guidance. For shipment dates, services or terms, check your paperwork and speak with our team."}</p>
    {answers[locale].map((item) => <details key={item.question} className="border-t border-cream-border py-4">
      <summary className="cursor-pointer font-semibold text-brand-blue">{item.question}</summary>
      <p className="my-3 leading-relaxed">{item.answer}</p>
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline">{item.source} <span className="text-sm">({es ? "nueva pestaña" : "new tab"})</span></a>
    </details>)}
    <a href={business.phoneHref} className="mt-4 inline-block rounded-lg2 bg-brand-blue px-5 py-3 font-bold text-white" data-analytics-location="resources">{es ? "Hablar con Vantage" : "Speak with Vantage"}: {business.phoneDisplay}</a>
  </section>;
}
