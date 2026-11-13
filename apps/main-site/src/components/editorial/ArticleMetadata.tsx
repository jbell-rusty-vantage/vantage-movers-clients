import { CmsText } from "@/components/cms/Content";
import type { EditorialEntry } from "@/content/editorial/types";
import { articleDetails } from "@/content/editorial/resource-center";

export function ArticleMetadata({ entry }: { entry: EditorialEntry }) {
  const { minutes, date, published } = articleDetails(entry);
  const es = entry.locale === "es";
  return <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed">
    <span><CmsText scope="components/editorial/ArticleMetadata.tsx">{es ? "Guía de planificación" : "Planning guide"}</CmsText></span><span aria-hidden><CmsText scope="components/editorial/ArticleMetadata.tsx">{"·"}</CmsText></span>
    <span><CmsText scope="components/editorial/ArticleMetadata.tsx">{minutes}</CmsText> <CmsText scope="components/editorial/ArticleMetadata.tsx">{es ? "min de lectura" : "min read"}</CmsText></span>
    <CmsText scope="components/editorial/ArticleMetadata.tsx">{(published || entry.review.status === "reviewed") && <span><CmsText scope="components/editorial/ArticleMetadata.tsx">{published ? (es ? "Publicado: " : "Published: ") : (es ? "Revisado: " : "Reviewed: ")}</CmsText><time dateTime={date}><CmsText scope="components/editorial/ArticleMetadata.tsx">{new Intl.DateTimeFormat(es ? "es-US" : "en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`))}</CmsText></time></span>}</CmsText>
  </p>;
}
