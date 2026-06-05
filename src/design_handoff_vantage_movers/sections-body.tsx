import type { ReactNode } from "react";
import { Btn, Icon, ImageFill, Phone, Stars } from "./components";
import { DOT, MC, PHONE, Logo } from "./sections-top";
import type { IconName, SceneName } from "./types";

const SERVICES: Array<{ scene: SceneName; icon: IconName; title: string; body: string }> = [
  {
    scene: "longdist",
    icon: "box",
    title: "Long Distance Moves",
    body: "Planning a move across the country or to a different state? Get a customized quote for an easy, fully-coordinated long distance move.",
  },
  {
    scene: "storage",
    icon: "box",
    title: "Packing & Storage",
    body: "Our moving team offers professional packing to keep your items safe during transit, with secure short- and long-term storage options afterward.",
  },
  {
    scene: "office",
    icon: "office",
    title: "Office Moves",
    body: "Relocating a small or large office? Request an instant moving quote and let us make moving your business to a new location a breeze.",
  },
  {
    scene: "military",
    icon: "shield",
    title: "Military Moves",
    body: "Vantage proudly supports military families. We're a premier choice for helping service members relocate with care, precision, and respect.",
  },
];

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow center">What we do</span>
          <h2>We Make Moving Easy</h2>
          <p>
            From packing and moving to storage and more, we know what it takes, and we have the moving experts
            ready to get you into your new home or office.
          </p>
        </div>
        <div className="services__grid">
          {SERVICES.map((service, index) => (
            <article className="svc reveal" data-d={(index % 3) + 1} key={service.title}>
              <ImageFill scene={service.scene} className="svc__img" />
              <div className="svc__body">
                <span className="svc__ico">
                  <Icon name={service.icon} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <a className="svc__link" href="#quote">
                  Get a quote <Icon name="arrowRight" style={{ width: 15, height: 15 }} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Banner({
  scene,
  eyebrow,
  title,
  body,
  children,
  tall,
}: {
  scene: SceneName;
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  children: ReactNode;
  tall?: boolean;
}) {
  return (
    <section className={`banner reveal${tall ? " banner--tall" : ""}`}>
      <ImageFill scene={scene} className="banner__bg" showLabel={false} overlay />
      <div className="wrap banner__in">
        {eyebrow ? (
          <span className="eyebrow center" style={{ color: "var(--gold)" }}>
            {eyebrow}
          </span>
        ) : null}
        <h2>{title}</h2>
        {body ? <p className="banner__body">{body}</p> : null}
        <div className="banner__cta">{children}</div>
      </div>
    </section>
  );
}

export function PromoBanner() {
  return (
    <Banner
      scene="promo"
      eyebrow="Save more"
      title={
        <>
          Save More With
          <br />
          Vantage Movers
        </>
      }
      body="Get competitive quotes and expert coordination for your long distance move."
    >
      <Btn variant="gold" size="lg" href="#quote">
        Request a Free Estimate
      </Btn>
      <span className="urgency">
        <span className="urgency__dot" />
        44+ booked a move in the last hour
      </span>
    </Banner>
  );
}

const REVIEWS = [
  {
    name: "Marcus T.",
    loc: "Austin to Denver",
    text: "I had a great experience. I paid close attention to the contract and there were no surprises. All parties were professional, communicative, and I was able to schedule exactly when I needed.",
  },
  {
    name: "Priya N.",
    loc: "Seattle to Boston",
    text: "The staff were amazing to work with! Super friendly and super efficient. They made moving so easy and hassle-free, I'd recommend them to anyone.",
  },
  {
    name: "Devon & Alyssa",
    loc: "Tampa to Nashville",
    text: "Between the first person I spoke to and the team in customer service, my experience with Vantage was seamless from the first call to delivery day.",
  },
];

export function Testimonials() {
  return (
    <section className="section testi" id="reviews">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow center">Real reviews</span>
          <h2>What Our 100,000+ Customers Say</h2>
          <p>Real reviews from satisfied customers who trusted us with their move.</p>
        </div>
        <div className="testi__grid">
          {REVIEWS.map((review, index) => (
            <figure className="tcard reveal" data-d={(index % 3) + 1} key={review.name}>
              <span className="tcard__quote">
                <Icon name="quote" />
              </span>
              <Stars size={18} />
              <blockquote>{review.text}</blockquote>
              <figcaption>
                <span className="tcard__avatar">{review.name[0]}</span>
                <span>
                  <b>{review.name}</b>
                  <br />
                  <span className="tcard__loc">{review.loc}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExpertiseBanner() {
  return (
    <Banner
      scene="expertise"
      tall
      eyebrow="Our expertise"
      title={
        <>
          Nationwide Long Distance
          <br />
          Moving Is Our Expertise
        </>
      }
      body="We focus on making every long distance move efficient, reliable, and tailored to your needs. Our professional moving experts are dedicated to careful planning and safe transportation, ensuring your move is smooth from start to finish."
    >
      <Phone num={PHONE} dark />
      <Btn variant="gold" href="#quote">
        Get a Quote
      </Btn>
    </Banner>
  );
}

function TwoCol({
  id,
  reverse,
  scene,
  eyebrow,
  title,
  body,
  children,
}: {
  id: string;
  reverse?: boolean;
  scene: SceneName;
  eyebrow: string;
  title: ReactNode;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className={`section twocol${reverse ? " twocol--rev" : ""}`} id={id}>
      <div className="wrap twocol__in">
        <div className="twocol__text reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{body}</p>
          <div className="twocol__cta">{children}</div>
        </div>
        <div className="twocol__media reveal" data-d="1">
          <ImageFill scene={scene} className="twocol__img" />
        </div>
      </div>
    </section>
  );
}

export function AutoTransport() {
  return (
    <TwoCol
      id="auto"
      scene="auto"
      eyebrow="Auto transport"
      title="Need Reliable Auto Transport?"
      body="Vantage Movers takes the hassle out of car transport. Our auto-transport experts handle everything, so you can focus on settling in. Contact us for a free quote and see why we offer the best car transport services in the country."
    >
      <Phone num={PHONE} />
      <Btn href="#quote">Request Free Quote</Btn>
    </TwoCol>
  );
}

export function Commitment() {
  return (
    <section className="section--tight commitment reveal">
      <div className="wrap commitment__in">
        <span className="eyebrow center">Why Vantage</span>
        <h2>Our Commitment To Excellence</h2>
        <p>
          Vantage Movers stands out by prioritizing our customers. Our goal is to simplify your moving process
          and provide the best moving services tailored to your specific needs. Choose Vantage for a smooth and
          easy move.
        </p>
      </div>
    </section>
  );
}

export function Support() {
  return (
    <TwoCol
      id="support"
      reverse
      scene="support"
      eyebrow="Always-on support"
      title={
        <>
          Support Is Available
          <br />
          Every Step Of The Way
        </>
      }
      body="Vantage Movers customer support is available every step of the way. From pickup to delivery, we are there with you to help make your move a breeze, by phone, email, or chat, seven days a week."
    >
      <Phone num={PHONE} />
      <Btn href="#quote">Get Instant Quote</Btn>
    </TwoCol>
  );
}

export function FinalCTA() {
  return (
    <section className="finalcta reveal">
      <ImageFill scene="finalcta" className="finalcta__bg" showLabel={false} overlay={0.7} />
      <div className="wrap finalcta__in">
        <span className="eyebrow center" style={{ color: "var(--gold)" }}>
          Ready when you are
        </span>
        <h2>
          Get A Free Moving
          <br />
          Estimate Today
        </h2>
        <Phone num={PHONE} dark />
        <span className="urgency">
          <span className="urgency__dot" />
          44+ booked a move in the last hour
        </span>
        <Btn variant="gold" size="lg" href="#quote">
          Request a Free Estimate
        </Btn>
      </div>
    </section>
  );
}

const QUICK_LINKS = [
  "Privacy Policy",
  "Consumer Information",
  "Cancellation Policy",
  "Your Rights & Responsibilities",
  "Ready To Move",
  "Moving Checklist",
  "Do Not Sell My Personal Information",
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo dark />
          <p className="footer__blurb">
            A licensed nationwide moving broker coordinating safe, affordable relocations for families and
            businesses across the country.
          </p>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <p className="footer__line">
            <Icon name="clock" style={{ width: 15, height: 15 }} /> Mon-Sun · 8am-11pm
          </p>
          <p className="footer__line">
            <Icon name="mail" style={{ width: 15, height: 15 }} /> admin@vantagemovers.com
          </p>
        </div>
        <div className="footer__col">
          <h4>Address</h4>
          <p className="footer__line">
            <Icon name="pin" style={{ width: 15, height: 15 }} /> 7789 NW Beacon Square Blvd
            <br />
            Boca Raton, FL 33487
          </p>
        </div>
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            {QUICK_LINKS.map((link) => (
              <li key={link}>
                <a href="#top">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col footer__cta">
          <h4>Get a Free Moving Estimate</h4>
          <Phone num={PHONE} dark sm />
          <Btn variant="gold" href="#quote" style={{ marginTop: 16 }}>
            Get a Quote
          </Btn>
        </div>
      </div>
      <div className="footer__legal">
        <div className="wrap">
          <p className="footer__dot">
            {DOT} &nbsp; {MC}
          </p>
          <p className="footer__disc">
            Please note that a properly licensed interstate broker, such as Vantage Movers, is not a motor
            carrier and will not transport an individual shipper&apos;s household goods, but will coordinate and
            arrange for the transportation of household goods by an FMCSA-authorized motor carrier, whose charges
            will be determined by its published tariff. All estimated charges and final actual charges will be
            based upon the carrier&apos;s tariff, which is available for inspection from the carrier upon
            reasonable request. (*) Up to 70% off on tariff rates.
          </p>
          <p className="footer__copy">© 2026 Vantage Movers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

