import { CmsText } from "@/components/cms/Content";
import {
  ArrowLeftRight, CalendarDays, Car, Check, ClipboardList, DoorOpen, FileCheck,
  FileText, FolderLock, House, KeyRound, MapPin, Monitor, PackageCheck,
  PackageOpen, Ruler, Tag, Users, Warehouse, Wine,
} from "lucide-react";
import { SERVICE_IDS, type ServiceId } from "@/content/editorial/services";
import type { EditorialEntry } from "@/content/editorial/types";

const detailStyles = {
  "long-distance-moving": {
    heading: { en: "Plan both ends of your interstate move", es: "Planifique la recogida y la entrega" },
    icons: [ClipboardList, MapPin, ArrowLeftRight],
  },
  "residential-moving": {
    heading: { en: "Get both homes ready for moving day", es: "Prepare ambas viviendas para la mudanza" },
    icons: [House, DoorOpen, KeyRound],
  },
  "corporate-office-moving": {
    heading: { en: "Plan the office move around your reopening", es: "Organice la mudanza de oficina para retomar el trabajo" },
    icons: [Monitor, KeyRound, ClipboardList],
  },
  "military-moving": {
    heading: { en: "Build your plan around orders and housing dates", es: "Organice la mudanza según sus órdenes y fechas de vivienda" },
    icons: [FileCheck, CalendarDays, FolderLock],
  },
  "senior-moving": {
    heading: { en: "Plan what will fit, who will help and what stays close", es: "Decida qué cabe, quién ayuda y qué tener a mano" },
    icons: [Ruler, Users, PackageCheck],
  },
  "packing-services": {
    heading: { en: "Decide what to pack and where you need help", es: "Decida qué embalar y dónde necesita ayuda" },
    icons: [Tag, PackageOpen, Wine],
  },
  "storage-options": {
    heading: { en: "Plan the gap between pickup and delivery", es: "Planifique el intervalo entre recogida y entrega" },
    icons: [CalendarDays, Warehouse, ClipboardList],
  },
  "auto-transport": {
    heading: { en: "Prepare a separate plan for your car", es: "Prepare un plan de transporte para su auto" },
    icons: [Car, FileText, KeyRound],
  },
} satisfies Record<ServiceId, { heading: Record<EditorialEntry["locale"], string>; icons: (typeof ClipboardList)[] }>;

export function ServiceDetails({ entry }: { entry: EditorialEntry }) {
  const serviceId = SERVICE_IDS.find(id => id === entry.id);
  if (!serviceId) return null;
  const { heading, icons } = detailStyles[serviceId];
  const sections = entry.sections.filter(section => !section.heading.endsWith("?"));

  return (
    <section id="service-details" className="scroll-mt-36" aria-labelledby="service-details-heading">
      <h2 id="service-details-heading" className="mx-auto mb-8 max-w-3xl text-balance text-center font-display text-3xl font-extrabold leading-tight text-brand-blue sm:mb-10 sm:text-4xl">
        <CmsText scope="components/editorial/ServiceDetails.tsx">{heading[entry.locale]}</CmsText>
      </h2>
      <div className="grid gap-5 lg:grid-cols-3">
        <CmsText scope="components/editorial/ServiceDetails.tsx">{sections.map((section, index) => {
          const Icon = icons[index] ?? ClipboardList;
          return (
            <div key={section.heading} className="editorial-card rounded-card border border-cream-border bg-white p-6 shadow-card sm:p-7">
              <span className="editorial-card-icon mb-5 grid size-12 place-items-center rounded-xl bg-brand-yellow-soft text-brand-blue">
                <Icon size={24} aria-hidden />
              </span>
              <h3 className="mb-3 text-balance font-display text-xl font-extrabold leading-snug text-brand-blue"><CmsText scope="components/editorial/ServiceDetails.tsx">{section.heading}</CmsText></h3>
              <div className="space-y-4 leading-relaxed text-ink-soft">
                <CmsText scope="components/editorial/ServiceDetails.tsx">{section.paragraphs.map(paragraph => <p key={paragraph}><CmsText scope="components/editorial/ServiceDetails.tsx">{paragraph}</CmsText></p>)}</CmsText>
                <CmsText scope="components/editorial/ServiceDetails.tsx">{section.bullets && (
                  <ul className="space-y-2 border-t border-cream-border pt-4 text-sm">
                    <CmsText scope="components/editorial/ServiceDetails.tsx">{section.bullets.map(bullet => (
                      <li key={bullet} className="flex items-start gap-3">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-blue-bright" aria-hidden />
                        <span><CmsText scope="components/editorial/ServiceDetails.tsx">{bullet}</CmsText></span>
                      </li>
                    ))}</CmsText>
                  </ul>
                )}</CmsText>
              </div>
            </div>
          );
        })}</CmsText>
      </div>
    </section>
  );
}
