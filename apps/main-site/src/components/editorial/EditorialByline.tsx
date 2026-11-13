import { CmsText, CmsLink as Link } from "@/components/cms/Content";
import { editorialAuthor } from "@/content/editorial/resource-center";
import type { EditorialLocale } from "@/content/editorial/types";

export function EditorialByline({ locale }: { locale: EditorialLocale }) {
  return <div className="editorial-byline mt-6 flex items-center gap-3 text-sm">
    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-yellow font-display font-extrabold text-brand-blue">V</span>
    <div><p className="text-xs opacity-80"><CmsText scope="components/editorial/EditorialByline.tsx">{locale === "es" ? "Preparado por" : "Prepared by"}</CmsText></p>
      <Link href={`${locale === "es" ? "/es/recursos" : "/resources"}#editorial-team`} className="font-semibold text-inherit!"><CmsText scope="content/editorial/resource-center.ts">{editorialAuthor[locale]}</CmsText></Link>
    </div>
  </div>;
}
