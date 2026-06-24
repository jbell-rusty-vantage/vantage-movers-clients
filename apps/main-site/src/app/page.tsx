import { Truck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-white/60 bg-white p-10 shadow-sm">
        <div className="mb-6 inline-flex rounded-full bg-trust-blue/10 p-3 text-trust-blue">
          <Truck aria-hidden className="size-8" />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-trust-blue">
          Vantage Main Site
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          Nationwide moving, built for Vantage.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          Next.js, Tailwind CSS, and pnpm are ready. This project is the
          dedicated home for Vantage&apos;s own organic traffic and in-house
          marketing site.
        </p>
      </div>
    </main>
  );
}
