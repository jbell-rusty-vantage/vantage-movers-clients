import { ContentScope } from "@/components/cms/Content";
import { editorialContentScope } from "@/lib/cms/resolve";
import { CmsText } from "@/components/cms/Content";
import { CmsImage as Image } from "@/components/cms/Content";
import { CmsLink as Link } from "@/components/cms/Content";
import { ArrowRight } from "lucide-react";
import type { EditorialEntry } from "@/content/editorial/types";
import { articleDetails, editorialAuthor } from "@/content/editorial/resource-center";
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
      <CmsText scope="components/editorial/EditorialCards.tsx">{entries.map(entry => {
        const serviceIcon = entry.kind === "service" ? serviceIcons[entry.id as ServiceId] : undefined;
        return (
          <ContentScope key={entry.id} source={editorialContentScope(entry)}><Link scope="components/editorial/EditorialCards.tsx" href={entry.path} className="group overflow-hidden rounded-card border border-cream-border bg-white no-underline shadow-card transition hover:border-brand-blue-bright hover:shadow-card-hover">
            <CmsText scope="components/editorial/EditorialCards.tsx">{entry.kind === "resource" && <div className="relative aspect-[3/2] overflow-hidden">
              <Image scope="components/editorial/EditorialCards.tsx" src={articleDetails(entry).poster} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform motion-safe:group-hover:scale-105" />
            </div>}</CmsText>
            <div className="p-6">
              <CmsText scope="components/editorial/EditorialCards.tsx">{entry.kind === "resource" && <div className="mb-4 text-ink-soft"><ArticleMetadata entry={entry} /></div>}</CmsText>
              <CmsText scope="components/editorial/EditorialCards.tsx">{serviceIcon && <span className="mb-4 grid size-11 place-items-center rounded-xl bg-brand-yellow-soft text-brand-blue"><ServiceIcon icon={serviceIcon} size={22} /></span>}</CmsText>
              <h3 className="mb-3 flex items-baseline justify-between gap-3 font-display text-xl font-extrabold text-brand-blue">
                <CmsText scope="components/editorial/EditorialCards.tsx">{entry.navLabel}</CmsText>
                <ArrowRight size={17} className="shrink-0 self-center transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden />
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft"><CmsText scope="components/editorial/EditorialCards.tsx">{entry.description}</CmsText></p>
              {entry.kind === "resource" && <p className="mt-5 border-t border-cream-border pt-4 text-xs font-semibold text-brand-blue"><CmsText scope="content/editorial/resource-center.ts">{editorialAuthor[entry.locale]}</CmsText></p>}
            </div>
          </Link></ContentScope>
        );
      })}</CmsText>
    </div>
  );
}
