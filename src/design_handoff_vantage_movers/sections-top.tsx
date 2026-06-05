"use client";

import { useEffect, useState } from "react";
import { Icon, ImageFill, Phone, Stars } from "./components";
import { QuoteForm } from "./quote-form";
import type { HeroVariant, IconName } from "./types";

export const PHONE = "(800) 555-0199";
export const DOT = "DOT: 3475743";
export const MC = "MC: 1139083-B";

export function Logo({ dark }: { dark?: boolean }) {
  return (
    <a className={`logo${dark ? " logo--dark" : ""}`} href="#top" aria-label="Vantage Movers">
      <span className="logo__mark">
        <Icon name="truck" />
      </span>
      <span className="logo__txt">
        <span className="logo__name">
          Vantage<span>Movers</span>
        </span>
        <span className="logo__tag">Nationwide Moving Network</span>
      </span>
    </a>
  );
}

export function ProBadge() {
  return (
    <span className="probadge">
      <Icon name="shield" style={{ width: 16, height: 16 }} />
      <span>
        <b>Best Moving</b>
        <br />Provider 2026
      </span>
    </span>
  );
}

export function LicenseBar() {
  return (
    <div className="licensebar">
      <div className="wrap licensebar__in">
        <span>
          <Icon name="shield" style={{ width: 14, height: 14 }} /> Licensed Moving Broker
        </span>
        <span className="dot-sep">.</span>
        <span>{DOT}</span>
        <span className="dot-sep">.</span>
        <span>{MC}</span>
      </div>
    </div>
  );
}

export function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 90);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${stuck ? " is-stuck" : ""}`}>
      <div className="wrap header__in">
        <div className="header__left">
          <Logo />
          <span className="header__badge">
            <ProBadge />
          </span>
        </div>
        <Phone num={PHONE} label="Call for a free quote" />
      </div>
    </header>
  );
}

function StatCard({ icon, big, small }: { icon: IconName; big: string; small: string }) {
  return (
    <div className="stat">
      <span className="stat__ico">
        <Icon name={icon} />
      </span>
      <div>
        <div className="stat__big">{big}</div>
        <div className="stat__small">{small}</div>
      </div>
    </div>
  );
}

function HeroCopy({ centered }: { centered?: boolean }) {
  return (
    <div className={`hero__copy${centered ? " is-center reveal in" : " reveal in"}`}>
      <span className="hero__rating">
        <Stars size={18} /> <b>4.9/5.0</b> <span>from 8,400+ reviews</span>
      </span>
      <h1>
        Get Affordable
        <br />
        Moving Services
      </h1>
      <p className="hero__sub">
        Find out how much we can help you save on your next move. Request a free, instant affordable moving
        quote now, no obligation.
      </p>
      <div className={`hero__stats${centered ? " is-center" : ""}`}>
        <StatCard icon="users" big="100,000+" small="Families moved nationwide" />
        <StatCard icon="clock" big="44+" small="Booked a move in the last hour" />
      </div>
    </div>
  );
}

export function Hero({ variant = "split" }: { variant?: HeroVariant }) {
  const centered = variant === "centered";

  return (
    <section className={`hero hero--${variant}`} id="quote">
      <ImageFill scene="hero" className="hero__bg" showLabel={false} />
      <div className="hero__overlay" />
      <div className="wrap hero__in">
        {centered ? (
          <>
            <HeroCopy centered />
            <div className="hero__form reveal in" data-d="1">
              <QuoteForm phone={PHONE} compact />
            </div>
          </>
        ) : (
          <>
            <HeroCopy />
            <div className="hero__form reveal in" data-d="1">
              <QuoteForm phone={PHONE} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const TRUST_LOGOS = ["TrustLink", "BestMoving", "GetMovers", "Relocation", "Consumer Voice", "MoverRated"];

export function TrustStrip() {
  const row = TRUST_LOGOS.map((label, index) => (
    <span key={`${label}-${index}`} className="trustlogo">
      <Icon name="shield" style={{ width: 15, height: 15 }} />
      {label}
    </span>
  ));

  return (
    <div className="truststrip">
      <div className="wrap truststrip__in reveal">
        <span className="truststrip__label">As trusted &amp; reviewed on</span>
        <div className="truststrip__viewport">
          <div className="truststrip__track" aria-hidden="false">
            {row}
            {row}
            {row}
          </div>
        </div>
      </div>
    </div>
  );
}

