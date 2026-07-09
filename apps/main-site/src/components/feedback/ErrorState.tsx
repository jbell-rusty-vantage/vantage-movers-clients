"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { business } from "@/lib/content";
import { heroHeadingFont } from "@/lib/fonts";

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error & { digest?: string };
  errorContext?: string;
  reset?: () => void;
}

function ErrorFallbackHeader() {
  return (
    <header className="border-b border-cream-border-2 bg-white px-6 py-4 shadow-[0_2px_12px_rgba(2,71,153,.05)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className={`text-lg font-extrabold tracking-[.02em] text-brand-blue no-underline ${heroHeadingFont.className}`}
        >
          {business.name}
        </Link>
        <a
          href={business.phoneHref}
          className={`rounded-md2 bg-brand-yellow-soft px-4 py-2 text-sm font-extrabold tracking-[.03em] text-brand-blue uppercase no-underline ${heroHeadingFont.className}`}
        >
          Call
        </a>
      </div>
    </header>
  );
}

function ErrorFallbackFooter() {
  return (
    <footer className="bg-white px-6 py-8 text-center text-sm leading-[1.7] text-[#64748B]">
      <p>
        {business.brokerLine} - DOT {business.dot} - MC {business.mc}
      </p>
    </footer>
  );
}

export function ErrorState({
  title = "Something went wrong.",
  message = "We could not load this page. Please try again or return home.",
  error,
  errorContext = "main-site route",
  reset,
}: ErrorStateProps) {
  useEffect(() => {
    if (!error) return;

    console.error(`[${errorContext}]`, {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error, errorContext]);

  return (
    <>
      <ErrorFallbackHeader />
      <main className="min-h-screen bg-cream">
        <section className="relative overflow-hidden bg-brand-blue px-6 py-24 text-white">
          <div
            className="absolute -top-24 -right-24 size-80 rounded-full bg-brand-blue-bright/25 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl rounded-panel border border-white/15 bg-white/10 p-8 text-center shadow-[0_28px_64px_rgba(2,47,102,.28)] backdrop-blur-md sm:p-10">
            <div className="mx-auto mb-6 grid size-16 place-items-center rounded-card bg-brand-yellow-soft text-brand-blue">
              <AlertTriangle className="size-8" strokeWidth={2.2} aria-hidden />
            </div>
            <p
              className={`mb-3 text-sm font-extrabold tracking-[.14em] text-brand-yellow uppercase ${heroHeadingFont.className}`}
            >
              {business.name}
            </p>
            <h1
              className={`mb-4 text-balance text-[clamp(34px,5vw,56px)] leading-[1.04] font-extrabold tracking-[-.02em] ${heroHeadingFont.className}`}
            >
              {title}
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-[16px] leading-[1.7] text-on-dark-100">
              {message}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              {reset && (
                <button
                  type="button"
                  onClick={reset}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg2 border-0 bg-brand-yellow px-5 py-3 font-extrabold tracking-[.04em] text-black uppercase shadow-cta-yellow transition hover:-translate-y-0.5 ${heroHeadingFont.className}`}
                >
                  <RefreshCw className="size-4" strokeWidth={2.4} aria-hidden />
                  Try Again
                </button>
              )}
              <Link
                href="/"
                className={`inline-flex items-center justify-center gap-2 rounded-lg2 border border-white/25 bg-white/10 px-5 py-3 font-extrabold tracking-[.04em] text-white no-underline transition hover:-translate-y-0.5 hover:bg-white/15 ${heroHeadingFont.className}`}
              >
                <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
                Back Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ErrorFallbackFooter />
    </>
  );
}
