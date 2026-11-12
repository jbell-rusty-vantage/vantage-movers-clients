import Link from "next/link";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { entryById } from "@/lib/publication";

export function MilitaryAppreciation({ locale = "en", servicePage = false }: { locale?: "en" | "es"; servicePage?: boolean }) {
  const entry = entryById("military-moving", locale);
  if (!entry) return null;
  const es = locale === "es";
  return <section id="military-appreciation" className="relative overflow-hidden bg-[#112e4f] py-16 text-white sm:py-24">
    <div aria-hidden className="absolute -right-20 top-0 size-96 rounded-full border-[45px] border-white/5" />
    <Container className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div><div className="mb-6 flex gap-3 text-brand-yellow" aria-hidden>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}</div><p className="mb-4 text-sm font-bold tracking-[.15em] text-brand-yellow uppercase">{es ? "Con gratitud, todo el año" : "With gratitude, all year long"}</p><h2 className="font-display text-3xl leading-tight font-extrabold sm:text-5xl">{es ? "Honramos su servicio. Y a quienes están a su lado." : "Honoring your service. And the family beside you."}</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{es ? "A nuestros militares, veteranos y sus familias: gracias. Cada nuevo destino es también un cambio para el hogar, y merece tiempo, atención y una planificación cuidadosa." : "To our service members, veterans and military families: thank you. Every new assignment is also a change for a household, and deserves time, attention and thoughtful planning."}</p></div>
      <div className="rounded-2xl border border-white/20 bg-white/5 p-7 sm:p-10"><p className="mb-3 text-sm text-brand-yellow">{es ? "Un nuevo destino. Un plan claro." : "A new destination. A clear plan."}</p><h3 className="font-display text-2xl font-bold">{es ? "Prepare el próximo capítulo de su familia." : "Prepare for your family’s next chapter."}</h3><p className="my-5 leading-relaxed text-white/85">{es ? "Reúna sus fechas, inventario y preguntas. Para una mudanza militar, consulte primero a su oficina de transporte sobre autorizaciones y requisitos antes de contratar servicios." : "Bring your dates, inventory and questions. For a military move, check authorizations and requirements with your transportation office before booking services."}</p><Link href={servicePage ? "#quote" : entry.path} className="inline-flex rounded-full bg-brand-yellow px-6 py-3 font-bold text-brand-blue no-underline">{es ? (servicePage ? "Hablemos de su mudanza →" : "Planificación para familias militares →") : (servicePage ? "Talk through your move →" : "Moving guidance for military families →")}</Link><p className="mt-5 text-xs leading-relaxed text-white/70">{es ? "El Día de los Veteranos se conmemora el 11 de noviembre. Nuestro agradecimiento continúa durante todo el año." : "Veterans Day is observed on November 11. Our appreciation continues throughout the year."}</p></div>
    </Container>
  </section>;
}
