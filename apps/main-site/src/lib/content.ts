/**
 * Vantage Movers main site — all copy and structured data.
 */

export const business = {
  name: "Vantage Movers",
  tagline: "MOVERS",
  phoneDisplay: "(888) 477-9232",
  phoneHref: "tel:8884779232",
  email: "support@vantagehomemovers.com",
  hours: "Mon–Sun · 8am–11pm",
  dot: "4078939",
  mc: "1551322",
  address: ["1880 N Congress Ave Ste 401A", "Boynton Beach, FL 33426"],
  brokerLine: "Licensed Moving Broker",
  copyright: "© 2026 Vantage Movers. All rights reserved.",
  brokerDisclaimer:
    "Vantage Movers is a licensed interstate moving broker. Vantage is not a motor carrier and does not transport household goods. Vantage coordinates and arranges transportation of household goods through FMCSA-authorized motor carriers. Final charges are based on the carrier's tariff, shipment inventory, requested services, route, and move conditions. Carrier tariffs are available for inspection from the carrier upon reasonable request.",
} as const;

/** Header / nav chrome copy — Storybook Layout/Header Playground. */
export const headerChrome = {
  ctaLabel: "Free Quote",
  phoneLabel: "Moving Quote",
} as const;

export const hero = {
  headline: "Long-Distance Moving, Coordinated the Vantage Way",
  paragraph:
    "Vantage Movers helps customers coordinate long-distance relocations through licensed and insured motor carriers. From quote review to carrier coordination, we make moving clearer, more organized, and easier to manage.",
  supportingLine:
    "Tell us where you are moving, when you are moving, and what you need moved. We will help coordinate a quote based on your relocation details.",
  primaryCta: "Request A Free Quote",
  secondaryCta: "Speak With A Coordinator",
  brokerNote:
    "Vantage Movers is a licensed interstate household goods moving broker. We do not transport household goods directly. Instead, we arrange transportation through authorized motor carriers based on your move details, availability, route, and service needs.",
} as const;

/** Animated hero metrics — ranges match the partner landing page (`apps/clients`). */
export const heroMetrics = {
  recentMoves: {
    fallback: "20+",
    min: 20,
    max: 30,
    suffix: "+",
    label: "Moved In The Last Hour",
  },
  familiesMoved: {
    fallback: "50,000+",
    min: 50000,
    max: 55000,
    suffix: "+",
    label: "Families Moved",
  },
  coverage: {
    title: "51",
    subtitle: "Interstate coordination available",
  },
} as const;

/** Partner logos for the "Trusted By" marquee. */
export interface TrustLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const trustStrip = {
  label: "Trusted By",
  logos: [
    { src: "/partnerlogos/tbm_leads.svg", alt: "TBM", width: 190, height: 50 },
    {
      src: "/partnerlogos/tbm_prime_leads.svg",
      alt: "TBM Prime",
      width: 134,
      height: 40,
    },
    {
      src: "/partnerlogos/top10.svg",
      alt: "Top 10 Moving Companies",
      width: 130,
      height: 36,
    },
    {
      src: "/partnerlogos/convoice.svg",
      alt: "Consumer Voice",
      width: 99,
      height: 30,
    },
  ] satisfies TrustLogo[],
} as const;

export type IconKey =
  | "truck"
  | "route"
  | "home"
  | "office"
  | "shield"
  | "users"
  | "box"
  | "package-open"
  | "headphones";

export interface Service {
  title: string;
  icon: IconKey;
  desc: string;
}

export const services: Service[] = [
  {
    title: "Interstate Moving",
    icon: "route",
    desc: "Moving from one state to another involves inventory, route distance, carrier availability, pickup windows, and delivery timing. Vantage helps organize those details and connect customers with licensed motor carriers authorized for interstate household goods transportation.",
  },
  {
    title: "Residential Moving",
    icon: "home",
    desc: "Vantage helps homeowners, renters, and families coordinate long-distance residential moving services through authorized carriers — including transportation planning, packing options, inventory review, and move timing.",
  },

  {
    title: "Commercial / Office Moving",
    icon: "office",
    desc: "Business moves require planning around equipment, furniture, office contents, downtime, and access at both locations. Vantage coordinates commercial relocation services by collecting move details and arranging transportation through authorized carriers.",
  },
  {
    title: "Military Moving",
    icon: "shield",
    desc: "Military families often move on strict timelines. Vantage helps military customers request moving estimates and coordinate services through authorized carriers by gathering move date, origin, destination, inventory, and packing needs.",
  },
  {
    title: "Senior Moving",
    icon: "users",
    desc: "Senior moves often require extra care and planning. Vantage helps seniors and their families coordinate long-distance relocation services by reviewing move details, timeline, destination, and any requested packing or handling needs.",
  },

  {
    title: "Moving Coordination",
    icon: "headphones",
    desc: "A moving coordinator collects the details needed to arrange a long-distance move — origin, destination, move size, preferred dates, service needs, and contact information — then helps coordinate a quote and carrier assignment.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How do I request a moving quote?",
    a: "You can request a moving quote by providing your pickup location, destination, preferred move date, move size, contact information, and any additional service needs such as packing or storage. The more accurate your inventory and move details are, the more useful your estimate will be. After your information is submitted, a representative can help review the details and coordinate next steps.",
  },
  {
    q: "Is Vantage Movers a moving company or a moving broker?",
    a: "Vantage Movers is a licensed interstate household goods moving broker. This means Vantage does not directly transport household goods. Instead, Vantage helps arrange transportation through FMCSA-authorized motor carriers. Carrier charges are based on the carrier's published tariff and the details of the move.",
  },
  {
    q: "Who will transport my belongings?",
    a: "Your belongings are transported by an authorized motor carrier assigned for your move, not directly by Vantage Movers. Vantage helps coordinate the transportation arrangement and provides customer support during the planning process. The assigned carrier is responsible for the physical transportation of the household goods.",
  },
  {
    q: "Are moving estimates guaranteed?",
    a: "Moving estimates depend on the information provided at the time of the quote, including inventory, distance, services requested, access conditions, and timing. Final charges may vary if the inventory changes, additional services are requested, access conditions differ, or the move details are updated.",
  },
  {
    q: "What can change the final cost of my move?",
    a: "The final cost may change if the actual inventory is larger than listed, if additional packing or labor is requested, if pickup or delivery conditions require extra services, or if the customer changes the move date, route, or destination. Customers should provide complete and accurate information during the quote process to help reduce surprises.",
  },
  {
    q: "Can I change my move date?",
    a: "Move-date changes may be possible depending on carrier availability, route scheduling, and how much notice is provided. Customers should contact Vantage as soon as possible if their pickup date, delivery address, inventory, or service needs change. Schedule changes are easier to coordinate when they are communicated early.",
  },
  {
    q: "Do you offer packing services?",
    a: "Packing options may be available depending on the assigned carrier, move details, and requested service level. Customers should identify whether they need full packing, partial packing, fragile-only packing, or no packing support during the quote process. Packing services may affect the estimate and should be discussed before pickup.",
  },
  {
    q: "What if my delivery is delayed?",
    a: "Long-distance delivery timing can be affected by route distance, weather, traffic, carrier scheduling, mechanical issues, customer availability, and other logistics factors. If there is a delivery delay, customers should contact their coordinator or assigned carrier for updates. Delivery timing depends on route, carrier availability, and move conditions.",
  },
  {
    q: "Do you handle military, corporate, or commercial moves?",
    a: "Vantage Movers can help coordinate moving estimates for residential, military, corporate, and commercial relocations. The process begins by collecting the move details and identifying the services needed. Transportation is then arranged through authorized motor carriers based on availability, route, and move requirements.",
  },
  {
    q: "Are there hidden fees?",
    a: "Customers should receive information about anticipated charges based on the move details provided. However, additional charges may apply if the actual move conditions differ from the original estimate, if extra services are requested, or if inventory changes. A more accurate quote depends on accurate move information.",
  },
];

export interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  route: string;
}

export const testimonials: Testimonial[] = [
  {
    initials: "MC",
    quote:
      "The coordinator explained everything up front and helped us understand what to expect from the assigned carrier on our cross-country move. The process felt organized from start to finish.",
    name: "Marcus C.",
    route: "FL → TX · Long Distance",
  },
  {
    initials: "SR",
    quote:
      "As a military family, timing mattered. Vantage helped coordinate our PCS move and kept us updated throughout the planning process.",
    name: "Sgt. Sarah R.",
    route: "VA → CA · Military Move",
  },
  {
    initials: "JL",
    quote:
      "We relocated our small office across three states. Vantage coordinated the estimate and carrier assignment, and communication stayed clear throughout.",
    name: "Jenna L.",
    route: "IL → GA · Office Move",
  },
];

export const howItWorksSection = {
  tagline: "No hidden fees. No obligations. Just honest pricing.",
  eyebrow: "How It Works",
  titleLead: "Your move in",
  titleAccent: "4 simple steps",
} as const;

export const howItWorks = [
  {
    n: 1,
    title: "Request a Quote",
    desc: "Call us or fill out the form. We'll ask a few questions about your move and provide a fast, free quote with no obligations.",
  },
  {
    n: 2,
    title: "Book Your Date",
    desc: "Pick a day that works for you — we're available 7 days a week. We'll confirm everything and lock in your time slot.",
  },
  {
    n: 3,
    title: "We Handle the Rest",
    desc: "Our experienced crew shows up on time with all the equipment and supplies. We pack, load, transport, and unload with care.",
  },
  {
    n: 4,
    title: "Settle Into Your New Space",
    desc: "We place everything where you want it and make sure you're completely satisfied before we leave. Moving made easy.",
  },
] as const;

export const whyVantage = [
  {
    icon: "shield" as const,
    title: "Licensed Moving Broker",
    desc: "FMCSA-licensed (DOT 4078939 · MC 1551322) and bonded. Vantage coordinates and arranges transportation through authorized motor carriers — we do not transport household goods directly.",
  },
  {
    icon: "dollar-sign" as const,
    title: "Clear Quote Review",
    desc: "We help you understand what shapes your estimate — inventory, distance, services, and access conditions — so you can review anticipated charges before committing.",
  },
  {
    icon: "globe" as const,
    title: "Nationwide Coordination",
    desc: "Vantage helps coordinate long-distance and interstate relocations across nearly every U.S. state by arranging transportation through licensed motor carriers.",
  },
  {
    icon: "headphones" as const,
    title: "Moving Coordination Support",
    desc: "Real coordinators who collect move details, answer questions, and help keep your relocation organized from the first quote request through carrier assignment.",
  },
  {
    icon: "briefcase" as const,
    title: "Flexible Service Options",
    desc: "Residential, military, corporate, and commercial relocations — with packing, loading, and related services available depending on the assigned carrier and move details.",
  },
];

export const navLinks = [
  { label: "Locations", href: "/#map" },
  { label: "About Us", href: "/#about" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export const stateNames: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

export const coverageCopy = (stateName: string) =>
  `Vantage helps coordinate long-distance and interstate moves to and from ${stateName} by reviewing your move details and arranging transportation through licensed, FMCSA-authorized motor carriers.`;

export const featureRows = [
  {
    eyebrow: "Long-Distance Moving",
    title: "Long-Distance Moving, Coordinated Step by Step",
    body: "Long-distance moves require planning, timing, and coordination across multiple stages. Vantage Movers helps customers arrange interstate moving services by reviewing the pickup location, delivery location, move size, preferred dates, and any additional service needs. Once those details are collected, Vantage works to coordinate transportation through authorized motor carriers. This helps customers get a clearer view of the moving process before committing to a route, estimate, or schedule.",
    checklist: [
      "Pickup, delivery, and move-size details reviewed up front",
      "Transportation arranged through authorized motor carriers",
      "Moving coordination support from quote request through carrier assignment",
    ],
    image: "longDistanceMoves" as const,
    imageAlt: "Long-distance moving truck on the highway",
    badge: { label: "Most Requested", icon: "truck" as const },
    imageFirst: true,
  },
  {
    eyebrow: "Military Moving",
    title: "Military Moving Coordination",
    body: "Military families often move on strict timelines and may need additional support coordinating long-distance transportation. Vantage Movers helps military customers and their families request moving estimates and coordinate services through authorized carriers. By gathering the move date, origin, destination, inventory, and packing needs, Vantage helps simplify the planning process for customers preparing for a duty-related or personal relocation.",
    checklist: [
      "Estimate requests coordinated for PCS and personal relocations",
      "Move details reviewed around your timeline and orders",
      "Packing options may be available through the assigned carrier",
    ],
    image: "militaryMoves" as const,
    imageAlt: "Military family preparing for a coordinated move",
    badge: { label: "Military Moves", icon: "shield" as const },
    imageFirst: false,
  },
] as const;

export const aboutSection = {
  eyebrow: "Moving Coordination",
  title: "Moving Coordination Support From Start to Finish",
  body: "Long-distance moving involves many details, and Vantage Movers helps customers organize those details before the move is assigned to a carrier. A moving coordinator can help review the origin and destination, move size, requested services, preferred dates, and any special circumstances that may affect the estimate. While the assigned motor carrier is responsible for transporting the household goods, Vantage helps support the coordination process so customers better understand what to expect.",
} as const;

export const quoteSection = {
  eyebrow: "Get in Touch",
  title: "Ready to plan your",
  titleAccent: "move?",
  body: "Fill out the form and we'll reach out shortly with a personalized quote. No pressure, no obligation.",
  image: "expertiseBanner" as const,
  imageAlt: "Vantage moving team with a loaded interstate moving truck",
  formTitle: "Get My Free Quote",
  formSubtitle: "No obligation · Most quotes in one call",
  rating: {
    value: 4.8,
    reviewCount: 530,
    label: "4.8 stars · 530+ reviews",
  },
  featuredReview: {
    quote:
      "The coordinator explained everything up front and helped us understand what to expect from the assigned carrier on our cross-country move. The process felt organized from start to finish.",
    name: "Marcus C.",
    source: "Google Review",
    rating: 5,
  },
} as const;

export const finalCta = {
  badge: "Free · No Obligation",
  title: "Planning a Long-Distance Move?",
  body: "A successful long-distance move starts with accurate information and clear coordination. Vantage Movers helps customers request estimates for interstate relocations by reviewing move details such as inventory, distance, dates, packing needs, and access conditions. Once your details are collected, Vantage can help arrange transportation through an authorized motor carrier and provide support during the planning process.",
  primaryCta: "Request Your Moving Quote",
  secondaryCta: "Speak With a Coordinator",
} as const;

export const footerChrome = {
  tagline:
    "A licensed interstate household goods moving broker helping families and businesses coordinate long-distance relocations through authorized motor carriers.",
  brokerBlockTitle: "Trusted Moving Broker",
} as const;

export const whyVantageSection = {
  eyebrow: "Why Vantage",
  heading: "A Licensed Moving Broker Built Around Clear Coordination",
  ctaTitle: "Ready to review your move details?",
  ctaBody: "Request a personalized moving estimate in under a minute.",
  ctaLabel: "Request a Free Moving Quote",
  /** Playground card icon overrides — see WhyVantageSection.stories.tsx Playground */
  cardIcons: ["shield", "users", "globe", "headphones", "briefcase"] as const,
} as const;

export const footerServiceLinks = [
  "Long-Distance Moving",
  "Interstate Moving",
  "Residential Moving",
  "Corporate Relocation",
  "Commercial / Office Moving",
  "Military Moving",
  "Senior Moving",
  "Packing Services",
  "Loading & Unloading",
  "Moving Coordination",
];

export const footerCompanyLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Service Areas", href: "/#map" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
  { label: "Join Our Carrier Network", href: "#" },
  { label: "Moving Checklist", href: "#" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "SMS Privacy Policy", href: "/sms-privacy" },
  { label: "SMS Terms", href: "/sms-terms" },
  { label: "Cancellation Policy", href: "/cancellation" },
  { label: "Your Rights & Responsibilities", href: "/your-rights" },
  { label: "Ready To Move", href: "/ready-to-move" },
  { label: "Do Not Sell My Info", href: "/privacy#dns" },
];
