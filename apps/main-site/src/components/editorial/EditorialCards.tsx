import Image from "next/image";
import Link from "next/link";
import type { EditorialEntry } from "@/content/editorial/types";
import { articleDetails } from "@/content/editorial/resource-center";
import { ArticleMetadata } from "./ArticleMetadata";
export function EditorialCards({ entries }: { entries: EditorialEntry[] }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{entries.map(e => <Link key={e.id} href={e.path} className="group overflow-hidden rounded-card border border-cream-border bg-white no-underline shadow-card transition hover:border-brand-blue-bright">
    {e.kind === "resource" && <div className="relative aspect-[3/2] overflow-hidden"><Image src={articleDetails(e).poster} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform motion-safe:group-hover:scale-105" /></div>}
    <div className="p-6">{e.kind === "resource" && <div className="mb-4 text-ink-soft"><ArticleMetadata entry={e} /></div>}<h3 className="mb-3 font-display text-xl font-extrabold text-brand-blue">{e.navLabel} <span aria-hidden>→</span></h3><p className="text-sm leading-relaxed text-ink-soft">{e.description}</p></div>
  </Link>)}</div>;
}
