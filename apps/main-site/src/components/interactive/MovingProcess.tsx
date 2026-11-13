"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";

const frames = [
  { id: "request", image: "", screenshot: true,
    en: { title: "Request a quote", caption: "Start with your contact details, then share pickup and delivery ZIPs, your preferred date and move size.", alt: "Complete Vantage quote form contact step with fictional name, email and phone details" },
    es: { title: "Solicite una cotización", caption: "Empiece con sus datos de contacto y después comparta los códigos postales, la fecha preferida y el tamaño de la mudanza.", alt: "Paso completo de contacto del formulario Vantage con nombre, correo y teléfono ficticios" } },
  { id: "inventory", image: "inventory-call.webp", screenshot: false,
    en: { title: "Review your inventory", caption: "Discuss your belongings and access at both addresses with your coordinator.", alt: "Illustrative scene of a resident reviewing an inventory during a phone conversation" },
    es: { title: "Revise su inventario", caption: "Converse con su coordinador sobre sus pertenencias y el acceso a ambos domicilios.", alt: "Escena ilustrativa de una persona que revisa un inventario mientras habla por teléfono" } },
  { id: "estimate", image: "review-estimate.webp", screenshot: false,
    en: { title: "Read the written estimate", caption: "Compare the inventory, included services and optional charges. Ask questions before you agree.", alt: "Illustrative close-up of a person reviewing a sample moving document" },
    es: { title: "Lea el presupuesto escrito", caption: "Compare el inventario, los servicios incluidos y los cargos opcionales. Aclare sus dudas antes de aceptar.", alt: "Primer plano ilustrativo de una persona que revisa un documento de mudanza de ejemplo" } },
  { id: "prepare", image: "packing-detail.webp", screenshot: false,
    en: { title: "Prepare for pickup", caption: "Confirm the arrangements, keep the entrance clear and set important paperwork aside.", alt: "Illustrative close-up of hands wrapping a ceramic bowl in packing paper" },
    es: { title: "Prepare la recogida", caption: "Confirme los arreglos, despeje la entrada y guarde los documentos importantes a mano.", alt: "Primer plano ilustrativo de unas manos que envuelven un cuenco de cerámica con papel" } },
  { id: "carrier", image: "carrier-paperwork.webp", screenshot: false,
    en: { title: "Meet the assigned carrier", caption: "The assigned motor carrier handles pickup, transportation and delivery. Check its name and contact details on your paperwork.", alt: "Illustrative scene of a resident reviewing paperwork with an unbranded carrier representative" },
    es: { title: "Identifique al transportista", caption: "El transportista asignado realiza la recogida, el transporte y la entrega. Revise su nombre y datos de contacto en los documentos.", alt: "Escena ilustrativa de una persona que revisa documentos con un representante de transporte sin marca" } },
] as const;

export function MovingProcess({ locale = "en" }: { locale?: "en" | "es" }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const captionId = useId();
  const es = locale === "es";
  const frame = frames[index];
  const copy = frame[locale];
  const change = (direction: number) => setIndex((current) => Math.max(0, Math.min(frames.length - 1, current + direction)));

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    // Arrow handling belongs to this region and its controls, never the document.
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowRight") { event.preventDefault(); change(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); }
  }

  return <div
    className="grid gap-8 lg:grid-cols-[1.15fr_1fr]"
    role="region"
    aria-roledescription={es ? "secuencia de imágenes" : "image sequence"}
    aria-label={es ? "Los cinco pasos de su mudanza" : "The five steps of your move"}
    tabIndex={0}
    onKeyDown={handleKey}
    data-testid="moving-process"
  >
    <div className="min-w-0">
      <figure className="overflow-hidden rounded-card border border-white/20 bg-white text-ink">
        <div className={`relative w-full bg-cream ${frame.screenshot ? `${es ? "aspect-[668/1226]" : "aspect-[668/1250]"} sm:aspect-[1034/1176]` : "aspect-[16/10]"}`} data-testid="process-image-slot">
          {failed.includes(frame.id) ? <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-brand-blue" role="status">
            <ImageOff size={32} aria-hidden />
            <p className="font-semibold">{es ? "La imagen no está disponible" : "Image unavailable"}</p>
            <p>{copy.caption}</p>
          </div> : <picture className="block h-full w-full">
            {frame.screenshot && <source media="(max-width: 639px)" srcSet={`/images/selected-20261112/quote-request-${locale}-mobile.webp`} />}
            <Image
            key={frame.id}
            src={frame.screenshot ? `/images/selected-20261112/quote-request-${locale}.webp` : `/images/preview/${frame.image}`}
            alt={copy.alt}
            width={frame.screenshot ? 1034 : 1280}
            height={frame.screenshot ? 1176 : 800}
            sizes="(min-width: 1024px) 620px, (min-width: 640px) 90vw, 100vw"
            loading={index === 0 ? "lazy" : "eager"}
            unoptimized={frame.screenshot}
            className={`h-full w-full ${frame.screenshot ? "object-contain" : "object-cover"}`}
            onError={() => setFailed((previous) => previous.includes(frame.id) ? previous : [...previous, frame.id])}
          /></picture>}
        </div>
        <figcaption id={captionId} className="min-h-[152px] p-5" aria-live="polite" aria-atomic="true">
          <p className="mb-1 text-sm font-semibold text-brand-blue">{es ? "Paso" : "Step"} {index + 1} / {frames.length} · {copy.title}</p>
          <p className="leading-relaxed">{copy.caption}</p>
          <p className="mt-3 text-xs text-slate-600">{frame.screenshot
            ? (es ? "Formulario real con datos ficticios." : "Actual form with fictional details.")
            : (es ? "Imagen ilustrativa generada; no representa a clientes ni personal de Vantage." : "Generated illustration; not a depiction of Vantage customers or staff.")}</p>
        </figcaption>
      </figure>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => change(-1)} aria-disabled={index === 0}
          aria-label={es ? "Paso anterior" : "Previous step"} aria-controls={captionId}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg2 border border-white/40 px-4 py-2 font-semibold text-white transition-colors hover:bg-white/10 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 motion-reduce:transition-none">
          <ArrowLeft size={18} aria-hidden />{es ? "Anterior" : "Previous"}
        </button>
        <span className="text-sm text-on-dark-100" data-testid="process-position">{index + 1} / {frames.length}</span>
        <button type="button" onClick={() => change(1)} aria-disabled={index === frames.length - 1}
          aria-label={es ? "Paso siguiente" : "Next step"} aria-controls={captionId}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg2 bg-brand-yellow px-4 py-2 font-semibold text-ink transition-colors hover:bg-brand-yellow-soft aria-disabled:cursor-not-allowed aria-disabled:opacity-40 motion-reduce:transition-none">
          {es ? "Siguiente" : "Next"}<ArrowRight size={18} aria-hidden />
        </button>
      </div>
    </div>

    {/* Always-rendered text keeps the sequence useful before hydration and without images. */}
    <ol className="m-0 list-none space-y-3 p-0" aria-label={es ? "Todos los pasos" : "All steps"}>
      {frames.map((item, stepIndex) => <li key={item.id} className={`rounded-card border p-4 ${stepIndex === index ? "border-brand-yellow bg-white/10" : "border-white/15"}`}>
        <button type="button" onClick={() => setIndex(stepIndex)} aria-current={index === stepIndex ? "step" : undefined}
          aria-controls={captionId} className="flex w-full items-start gap-3 text-left font-display font-bold text-white">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-yellow text-brand-blue" aria-hidden>{stepIndex + 1}</span>
          <span className="pt-1">{item[locale].title}</span>
        </button>
        <p className="mt-2 pl-11 text-sm leading-relaxed text-on-dark-100">{item[locale].caption}</p>
      </li>)}
    </ol>
  </div>;
}
