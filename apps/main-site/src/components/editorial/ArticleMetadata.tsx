import { CmsText } from "@/components/cms/Content";
import type { EditorialEntry } from "@/content/editorial/types";
import { articleDetails, resourceTopic } from "@/content/editorial/resource-center";

export function ArticleMetadata({ entry }: { entry: EditorialEntry }) {
  const { minutes, date, published, updatedAt } = articleDetails(entry);
  const es = entry.locale === "es";
  return <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed">
    <span><CmsText scope="content/editorial/resource-center.ts">{resourceTopic(entry)[entry.locale]}</CmsText></span><span aria-hidden>·</span>
    <span><CmsText scope="components/editorial/ArticleMetadata.tsx">{minutes}</CmsText> <CmsText scope="components/editorial/ArticleMetadata.tsx">{es ? "min de lectura" : "min read"}</CmsText></span>
    <span><CmsText scope="components/editorial/ArticleMetadata.tsx">{published ? (es ? "Publicado: " : "Published: ") : (es ? "Borrador actualizado: " : "Draft updated: ")}</CmsText><time dateTime={date}>{new Intl.DateTimeFormat(es ? "es-US" : "en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`))}</time></span>
    {published && updatedAt > date && <span><CmsText scope="components/editorial/ArticleMetadata.tsx">{es ? "Actualizado: " : "Updated: "}</CmsText><time dateTime={updatedAt}>{new Intl.DateTimeFormat(es ? "es-US" : "en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${updatedAt}T00:00:00Z`))}</time></span>}
  </p>;
}
