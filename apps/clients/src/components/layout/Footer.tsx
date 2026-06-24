"use client";

import Link from "next/link";
import { trackEvent, legalEventForHref } from "@/lib/analytics";
import { site } from "@/content/site";
import { quickLinks } from "@/content/navigation";
import { Icon } from "@/components/ui/Icon";
import { Phone } from "@/components/ui/Phone";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

function FooterLink({ href, label, newTab }: { href: string; label: string; newTab?: boolean }) {
  const handleClick = () => {
    const eventName = legalEventForHref(href);
    if (eventName) trackEvent(eventName, { link_location: "footer" });
  };

  if (newTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
        {label}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={handleClick}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} onClick={handleClick}>
      {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Logo dark />
          <p className="footer__blurb">
            A licensed nationwide moving broker helping families and businesses coordinate
            interstate relocations through authorized motor carriers.
          </p>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <p className="footer__line">
            <Icon name="clock" width={15} height={15} /> {site.hours}
          </p>
          <p className="footer__line">
            <Icon name="mail" width={15} height={15} /> {site.email}
          </p>
        </div>

        <div className="footer__col">
          <h4>Address</h4>
          <p className="footer__line">
            <Icon name="pin" width={15} height={15} />
            <span>
              {site.address.line1}
              <br />
              {site.address.line2}
            </span>
          </p>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href} label={l.label} newTab={l.newTab} />
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__cta">
          <h4>Get a Free Moving Estimate</h4>
          <Phone dark sm analyticsLocation="footer" />
          <Button variant="gold" href="#quote">
            Get a Quote
          </Button>
        </div>
      </div>

      <div className="footer__legal">
        <div className="wrap">
          <p className="footer__dot">
            {site.license.dot} &nbsp; {site.license.mc}
          </p>
          <p className="footer__disc">{site.brokerDisclaimer}</p>
          <p className="footer__copy">
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
