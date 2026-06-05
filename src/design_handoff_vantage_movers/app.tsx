"use client";

import { useEffect, useState } from "react";
import { Icon } from "./components";
import {
  AutoTransport,
  Commitment,
  ExpertiseBanner,
  FinalCTA,
  Footer,
  PromoBanner,
  Services,
  Support,
  Testimonials,
} from "./sections-body";
import { Header, Hero, LicenseBar, TrustStrip } from "./sections-top";

function BackToTop() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const progress = max > 0 ? root.scrollTop / max : 0;
      setPct(progress);
      setShow(root.scrollTop > 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 23;

  return (
    <button
      className={`totop${show ? " show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      type="button"
    >
      <svg className="totop__ring" viewBox="0 0 52 52">
        <circle className="bg" cx="26" cy="26" r="23" />
        <circle
          className="fg"
          cx="26"
          cy="26"
          r="23"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
        />
      </svg>
      <Icon name="arrowUp" />
    </button>
  );
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal:not(.in)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export default function VantageMoversApp() {
  useReveal();

  return (
    <>
      <div id="top" />
      <LicenseBar />
      <Header />
      <main>
        <Hero variant="split" />
        <TrustStrip />
        <Services />
        <PromoBanner />
        <Testimonials />
        <ExpertiseBanner />
        <AutoTransport />
        <Commitment />
        <Support />
        <FinalCTA />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

