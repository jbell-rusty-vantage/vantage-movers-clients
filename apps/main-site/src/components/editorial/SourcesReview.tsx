import { ArrowUpRight, BookOpen } from "lucide-react";
import { editorialSources } from "@/content/editorial/sources";
import type { EditorialEntry } from "@/content/editorial/types";

export function SourcesReview({ entry }: { entry: EditorialEntry }) {
  const es = entry.locale === "es";
  const sources = editorialSources.filter(source => entry.sourceIds.includes(source.id));
  if (!sources.length) return null;

  const reviewedBy = entry.review.status === "reviewed" ? entry.review.reviewer : null;
  const dateFormat = new Intl.DateTimeFormat(es ? "es-US" : "en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  });

  return (
    <section className="my-12 rounded-card border border-cream-border bg-cream p-6 sm:p-8" aria-labelledby="sources-review-heading">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div className="flex items-center gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-yellow-soft text-brand-blue">
            <BookOpen size={22} aria-hidden />
          </span>
          <h2 id="sources-review-heading" className="font-display text-2xl font-extrabold text-brand-blue">
            {es ? "Fuentes y revisión" : "Sources and review"}
          </h2>
        </div>
        {reviewedBy && <p className="text-sm leading-relaxed text-ink-soft">{es ? "Revisión a cargo de" : "Reviewed by"} <strong>{reviewedBy}</strong></p>}
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {sources.map(source => (
          <li key={source.id} className="min-w-0">
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center justify-between gap-3 rounded-xl border border-cream-border bg-white p-4 text-brand-blue no-underline transition hover:border-brand-blue-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
              <span className="min-w-0">
                <span className="block break-words text-sm font-bold group-hover:underline">{source.id === "vantage-broker-baseline" ? (es ? "Vantage Movers · Información para consumidores" : "Vantage Movers · Consumer information") : source.title}</span>
                <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-soft">
                  <span className="break-words">{new URL(source.url).hostname.replace(/^www\./, "")}</span>
                  <span>{es ? "Consultado el" : "Checked"} <time dateTime={source.checkedAt}>{dateFormat.format(new Date(`${source.checkedAt}T00:00:00Z`))}</time></span>
                </span>
              </span>
              <ArrowUpRight size={18} className="shrink-0" aria-hidden />
              <span className="sr-only"> {es ? "(abre otra pestaña)" : "(opens in a new tab)"}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
