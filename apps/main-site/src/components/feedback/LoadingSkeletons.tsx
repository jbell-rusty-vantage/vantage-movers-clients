import { SiteFooter } from "@/components/layout/SiteFooter";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { heroHeadingFont } from "@/lib/fonts";
import { radiusClasses } from "@/lib/playground/layout-playground";

function SkeletonBlock({
  className,
  onDark = false,
}: {
  className: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={`animate-pulse rounded ${onDark ? "bg-white/15" : "bg-brand-blue/10"} ${className}`}
    />
  );
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-card border border-cream-border bg-white p-6 shadow-card ${className}`}>
      <SkeletonBlock className="mb-5 size-12 rounded-md2" />
      <SkeletonBlock className="mb-3 h-5 w-2/3" />
      <SkeletonBlock className="mb-2 h-3.5 w-full" />
      <SkeletonBlock className="h-3.5 w-4/5" />
    </div>
  );
}

export function QuoteWizardSkeleton({
  variant = "hero",
}: {
  variant?: "hero" | "panel";
}) {
  const isPanel = variant === "panel";

  return (
    <div
      id={isPanel ? undefined : "quote"}
      className={`bg-white px-6 pt-0 pb-6 shadow-form-card ${isPanel ? radiusClasses.md2 : "rounded-panel px-[30px] pt-[30px] pb-[26px]"}`}
      aria-label="Loading quote form"
      role="status"
    >
      {isPanel && (
        <div className="-mx-6 mb-6 bg-brand-blue px-6 pt-6 pb-5">
          <SkeletonBlock className="h-7 w-2/3" onDark />
          <SkeletonBlock className="mt-2 h-4 w-1/2" onDark />
        </div>
      )}
      <div className="space-y-5">
        <SkeletonBlock className="h-5 w-3/4" />
        <div className="grid gap-3 sm:grid-cols-2">
          <SkeletonBlock className="h-12 w-full rounded-lg2" />
          <SkeletonBlock className="h-12 w-full rounded-lg2" />
        </div>
        <SkeletonBlock className="h-12 w-full rounded-lg2" />
        <SkeletonBlock className="h-12 w-full rounded-lg2" />
        <div className="flex gap-3">
          <SkeletonBlock className="h-12 flex-1 rounded-lg2" />
          <SkeletonBlock className="h-12 flex-1 rounded-lg2" />
        </div>
      </div>
    </div>
  );
}

export function FeaturedReviewSkeleton() {
  return (
    <figure
      className="rounded-card border border-white/12 bg-white/6 px-5 py-4 backdrop-blur-sm"
      aria-label="Loading featured review"
      role="status"
    >
      <SkeletonBlock className="mb-3 h-3.5 w-full" onDark />
      <SkeletonBlock className="mb-4 h-3.5 w-4/5" onDark />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="size-10 rounded-full" onDark />
          <span>
            <SkeletonBlock className="mb-2 h-3.5 w-28" onDark />
            <SkeletonBlock className="h-3 w-36" onDark />
          </span>
        </div>
        <SkeletonBlock className="h-4 w-20" onDark />
      </div>
    </figure>
  );
}

export function TestimonialsSectionSkeleton() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-24" aria-label="Loading testimonials">
      <div
        className="absolute -top-[100px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(46,134,222,.22),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <SkeletonBlock className="mx-auto mb-4 h-4 w-44" onDark />
          <SkeletonBlock className="mx-auto mb-3 h-10 w-72 max-w-full" onDark />
          <SkeletonBlock className="mx-auto h-4 w-full max-w-[520px]" onDark />
        </div>
      </Container>
      <div className="mx-auto flex max-w-[1400px] gap-6 overflow-hidden px-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[230px] flex-[0_0_320px] rounded-card bg-white p-7 shadow-[0_14px_36px_rgba(4,18,38,0.3)] md:flex-1"
          >
            <SkeletonBlock className="mb-4 h-4 w-24" />
            <SkeletonBlock className="mb-3 h-3.5 w-full" />
            <SkeletonBlock className="mb-3 h-3.5 w-11/12" />
            <SkeletonBlock className="mb-8 h-3.5 w-4/5" />
            <div className="flex items-center gap-3">
              <SkeletonBlock className="size-11 rounded-full" />
              <span className="flex-1">
                <SkeletonBlock className="mb-2 h-3.5 w-28" />
                <SkeletonBlock className="h-3 w-36" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeHeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[#04122a]">
      <Container className="relative z-[2] grid items-center gap-14 py-12 pb-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <SkeletonBlock className="mb-4 h-8 w-52" onDark />
          <SkeletonBlock className="mb-6 h-px w-full max-w-[420px]" onDark />
          <SkeletonBlock className="mb-5 h-24 w-full max-w-[650px]" onDark />
          <SkeletonBlock className="mb-3 h-4 w-full max-w-[620px]" onDark />
          <SkeletonBlock className="mb-7 h-4 w-4/5 max-w-[560px]" onDark />
          <div className="mb-9 flex flex-wrap gap-3.5">
            <SkeletonBlock className="h-16 w-[285px] rounded-md2" onDark />
            <SkeletonBlock className="h-16 w-[285px] rounded-md2" onDark />
          </div>
          <div className="flex flex-wrap gap-4">
            <SkeletonBlock className="h-24 min-w-[190px] flex-1 rounded-md2" onDark />
            <SkeletonBlock className="h-24 min-w-[190px] flex-1 rounded-md2" onDark />
          </div>
        </div>
        <QuoteWizardSkeleton />
      </Container>
    </section>
  );
}

export function HomePageSkeleton() {
  return (
    <>
      <Header />
      <main>
        <HomeHeroSkeleton />
        <section className="border-b border-cream-border-2 bg-white py-7">
          <Container className="flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-8 w-28" />
            ))}
          </Container>
        </section>
        <section className="bg-cream py-20">
          <Container>
            <div className="mb-10 text-center">
              <SkeletonBlock className="mx-auto mb-4 h-4 w-44" />
              <SkeletonBlock className="mx-auto h-10 w-80 max-w-full" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </Container>
        </section>
        <TestimonialsSectionSkeleton />
      </main>
      <SiteFooter />
    </>
  );
}

export function PolicyPageSkeleton() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="bg-brand-blue py-16 text-white">
          <Container>
            <SkeletonBlock className="mb-5 h-4 w-24" onDark />
            <SkeletonBlock className="mb-5 h-16 w-full max-w-xl" onDark />
            <SkeletonBlock className="h-10 w-full max-w-md rounded-full" onDark />
          </Container>
        </section>
        <Container className="grid gap-8 py-14 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-card border border-cream-border bg-white p-5 shadow-card">
            <SkeletonBlock className="mb-5 h-4 w-28" />
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBlock key={index} className="mb-3 h-8 w-full rounded-md2" />
            ))}
          </aside>
          <article className="rounded-panel border border-cream-border bg-white p-7 shadow-card md:p-10">
            <SkeletonBlock className="mb-10 h-5 w-full" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="mb-10">
                <SkeletonBlock className="mb-5 h-8 w-2/3" />
                <SkeletonBlock className="mb-3 h-4 w-full" />
                <SkeletonBlock className="mb-3 h-4 w-11/12" />
                <SkeletonBlock className="h-4 w-4/5" />
              </div>
            ))}
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

export function CarrierContactsPageSkeleton() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        <section className="bg-brand-blue py-8 text-white sm:py-10 lg:py-12">
          <Container>
            <div className="grid items-center gap-7 lg:grid-cols-[1fr_430px]">
              <div>
                <SkeletonBlock className="mb-5 h-4 w-24" onDark />
                <SkeletonBlock className="mb-3 h-4 w-44" onDark />
                <SkeletonBlock className="mb-4 h-16 w-full max-w-xl" onDark />
                <SkeletonBlock className="h-4 w-full max-w-2xl" onDark />
              </div>
              <div className="rounded-panel border border-white/15 bg-white p-6 shadow-[0_22px_54px_rgba(0,0,0,.22)] sm:p-7">
                <SkeletonBlock className="mb-4 size-13 rounded-card" />
                <SkeletonBlock className={`mb-3 h-8 w-44 ${heroHeadingFont.className}`} />
                <SkeletonBlock className="mb-3 h-4 w-full" />
                <SkeletonBlock className="mb-5 h-4 w-4/5" />
                <SkeletonBlock className="h-12 w-full rounded-lg2 sm:w-52" />
              </div>
            </div>
          </Container>
        </section>
        <section className="py-7">
          <Container>
            <SkeletonCard />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
