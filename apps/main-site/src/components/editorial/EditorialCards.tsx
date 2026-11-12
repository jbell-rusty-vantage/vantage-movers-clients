import Link from "next/link";
import type { EditorialEntry } from "@/content/editorial/types";
export function EditorialCards({ entries }: { entries: EditorialEntry[] }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{entries.map(e => <Link key={e.id} href={e.path} className="group rounded-card border border-cream-border bg-white p-6 no-underline shadow-card transition hover:border-brand-blue-bright"><h2 className="mb-3 font-display text-xl font-extrabold text-brand-blue">{e.navLabel} <span aria-hidden className="inline-block transition group-hover:translate-x-1">→</span></h2><p className="text-sm leading-relaxed text-ink-soft">{e.description}</p></Link>)}</div>;
}
