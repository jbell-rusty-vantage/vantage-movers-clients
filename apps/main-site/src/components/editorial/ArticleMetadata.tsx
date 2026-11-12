import type { EditorialEntry } from "@/content/editorial/types";
import { articleDetails } from "@/content/editorial/resource-center";

export function ArticleMetadata({ entry }: { entry: EditorialEntry }) {
  const { minutes, date, published } = articleDetails(entry);
  const es = entry.locale === "es";
  return <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-relaxed">
    <span>{es ? "Guía de planificación" : "Planning guide"}</span><span aria-hidden>·</span>
    <span>{minutes} {es ? "min de lectura" : "min read"}</span>
    {(published || entry.review.status === "reviewed") && <span>{published ? (es ? "Publicado: " : "Published: ") : (es ? "Revisado: " : "Reviewed: ")}<time dateTime={date}>{new Intl.DateTimeFormat(es ? "es-US" : "en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`))}</time></span>}
  </p>;
}
