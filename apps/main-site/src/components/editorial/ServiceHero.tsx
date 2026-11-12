import Image from "next/image";
import Link from "next/link";
import type { EditorialEntry } from "@/content/editorial/types";
import { Container } from "@/components/ui/Container";
import { directoryPaths } from "@/lib/publication";
import { servicePreparation } from "@/content/editorial/service-preparation";

const serviceImages: Record<string, string> = {
  "long-distance-moving": "/long_distance_traffic.webp",
  "residential-moving": "/images/preview/home-inventory.webp",
  "packing-services": "/images/preview/packing-detail.webp",
  "corporate-office-moving": "/images/preview/office-preparation.webp",
  "auto-transport": "/sitepictures/autotransport.jpg",
  "military-moving": "/images/preview/service-military-family-preparation-20261112.webp",
  "storage-options": "/images/preview/service-storage-preparation-20261112.webp",
  "senior-moving": "/images/preview/service-senior-downsizing-20261112.webp",
};

export function ServiceHero({ entry }: { entry: EditorialEntry }) {
  const es = entry.locale === "es";
  const paths = directoryPaths[entry.locale];
  const preparation = servicePreparation(entry.id, entry.locale);
  return <section className="overflow-hidden bg-cream">
    <Container className="py-8 sm:py-12">
      <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="mb-8 flex gap-3 text-sm text-brand-blue"><Link href={paths.home}>{es ? "Inicio" : "Home"}</Link><span aria-hidden>/</span><Link href={paths.service}>{es ? "Servicios" : "Services"}</Link></nav>
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="pb-4"><p className="mb-4 text-sm font-bold tracking-widest text-brand-blue-bright uppercase">{entry.navLabel}</p><h1 className="font-display text-[clamp(32px,3.5vw,52px)] leading-[1.1] font-extrabold text-brand-blue">{entry.title}</h1><p className="mt-6 text-lg leading-relaxed text-ink-soft">{entry.description}</p><div className="mt-7 flex flex-wrap items-center gap-5"><a className="editorial-cta" href="#quote">{es ? "Solicitar una cotización" : "Plan my move"} →</a><Link href="#service-details" className="font-semibold text-brand-blue">{es ? "Qué debe saber" : "What to know"} ↓</Link></div><p className="mt-6 text-sm text-ink-soft">{es ? "Su inventario. Su ruta. Una conversación personal." : "Your inventory. Your route. A personal conversation."}</p></div>
        <figure className="overflow-hidden rounded-[28px] bg-white shadow-lg"><div className="relative aspect-[3/2]"><Image src={serviceImages[entry.id] ?? "/images/preview/home-inventory.webp"} alt="" fill preload sizes="(min-width: 1024px) 550px, 100vw" className="object-contain" /></div><figcaption className="flex items-center justify-between gap-4 px-6 py-5 text-sm text-brand-blue"><span className="font-bold">{preparation?.caption ?? entry.navLabel}</span><span className="text-xs text-ink-soft">{es ? "Imagen ilustrativa" : "Illustrative image"}</span></figcaption></figure>
      </div>
    </Container>
    <div className="border-y border-cream-border bg-white"><Container className="grid gap-4 py-5 text-sm font-semibold text-brand-blue sm:grid-cols-3">{(preparation?.steps ?? []).map((text, index) => <p key={text}>{String(index + 1).padStart(2, "0")} · {text}</p>)}</Container></div>
  </section>;
}
