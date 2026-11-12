import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { EditorialEntry } from "@/content/editorial/types";
import { articleDetails } from "@/content/editorial/resource-center";
import type { ServiceId } from "@/content/editorial/services";
import type { IconKey } from "@/lib/content";
import { ServiceIcon } from "@/lib/icons";
import { ArticleMetadata } from "./ArticleMetadata";

const serviceIcons: Record<ServiceId, IconKey> = {
  "long-distance-moving": "route",
  "residential-moving": "home",
  "packing-services": "package-open",
  "corporate-office-moving": "office",
  "auto-transport": "car",
  "military-moving": "shield",
  "storage-options": "box",
  "senior-moving": "users",
};

export function EditorialCards({ entries }: { entries: EditorialEntry[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(entry => {
        const serviceIcon = entry.kind === "service" ? serviceIcons[entry.id as ServiceId] : undefined;
        return (
          <Link key={entry.id} href={entry.path} className="group overflow-hidden rounded-card border border-cream-border bg-white no-underline shadow-card transition hover:border-brand-blue-bright hover:shadow-card-hover">
            {entry.kind === "resource" && <div className="relative aspect-[3/2] overflow-hidden">
              <Image src={articleDetails(entry).poster} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform motion-safe:group-hover:scale-105" />
            </div>}
            <div className="p-6">
              {entry.kind === "resource" && <div className="mb-4 text-ink-soft"><ArticleMetadata entry={entry} /></div>}
              {serviceIcon && <span className="mb-4 grid size-11 place-items-center rounded-xl bg-brand-yellow-soft text-brand-blue"><ServiceIcon icon={serviceIcon} size={22} /></span>}
              <h3 className="mb-3 flex items-baseline justify-between gap-3 font-display text-xl font-extrabold text-brand-blue">
                {entry.navLabel}
                <ArrowRight size={17} className="shrink-0 self-center transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden />
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">{entry.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
