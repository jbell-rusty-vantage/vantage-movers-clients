import { CmsElement } from "@/components/cms/Content";
import { CmsText } from "@/components/cms/Content";
import { bbbReviewSnapshot, heroProofFacts } from "@/content/hero-proof";

export function HeroFacts({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const facts = heroProofFacts(locale);
  return <div><dl data-hero-facts className="grid grid-cols-2 gap-x-5 gap-y-5 border-t border-white/30 pt-5 text-white"><CmsText scope="components/sections/HeroFacts.tsx">{facts.map(([value, label]) => <div key={label}><dt className="text-xs leading-relaxed text-white/85"><CmsText scope="components/sections/HeroFacts.tsx">{label}</CmsText></dt><dd className="mt-1 font-display text-[clamp(20px,2vw,27px)] leading-tight font-extrabold text-brand-yellow"><CmsText scope="components/sections/HeroFacts.tsx">{value}</CmsText></dd></div>)}</CmsText></dl>
    <CmsElement element="a" scope="components/sections/HeroFacts.tsx" href={bbbReviewSnapshot.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs leading-relaxed text-white/85"><CmsText scope="components/sections/HeroFacts.tsx">{es ? `${bbbReviewSnapshot.count} reseñas en BBB · Consultado el 12 nov. 2026 · nueva pestaña` : `${bbbReviewSnapshot.count} customer reviews on BBB · Checked Nov 12, 2026 · opens a new tab`}</CmsText><CmsText scope="components/sections/HeroFacts.tsx">{" ↗"}</CmsText></CmsElement>
  </div>;
}
