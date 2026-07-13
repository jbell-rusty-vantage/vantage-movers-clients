/**
 * Vantage Movers main site — all copy and structured data.
 */

export const business = {
  name: "Vantage Movers",
  tagline: "MOVERS",
  phoneDisplay: "(888) 477-9232",
  phoneHref: "tel:8884779232",
  email: "support@vantagehomemovers.com",
  hours: "Mon-Sun . 8am-12am",
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
  headline: "Your Trusted Moving Partner",
  paragraph:
    "Vantage Movers provides affordable long-distance moving solutions for residential, commercial, and military relocations. Our team connects you with trusted full-service moving options that can include packing, loading/unloading, transportation, storage, and more, making your move easier from start to finish.",
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
  /**
   * Ultra-wide wordmarks (Get Movers) use a shorter display height
   * so optical weight matches the other marks.
   */
  wide?: boolean;
}

export const trustStrip = {
  label: "Trusted By",
  logos: [
    {
      src: "/partnerlogos/tbm_leads.svg",
      alt: "TBM",
      width: 190,
      height: 50,
    },
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
    {
      src: "/partnerlogos/getmovers.svg",
      alt: "Get Movers",
      width: 456,
      height: 44,
      wide: true,
    },
  ] satisfies TrustLogo[],
} as const;

export type IconKey =
  | "car"
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
  /** Hash target for nav links — must match an element id on the homepage. */
  anchorId: string;
}

export const services: Service[] = [
  {
    title: "Long Distance Moving",
    icon: "route",
    anchorId: "service-long-distance-moving",
    desc: "Moving from state to state requires coordination around your inventory, travel distance, carrier availability, pickup window, and delivery schedule. Get a customized quote for an easy long distance move.",
  },
  {
    title: "Packing Services",
    icon: "package-open",
    anchorId: "service-packing-services",
    desc: "Packing is one of the most important parts of a successful move, and Vantage Movers helps connect customers with professional packing services to help keep your belongings secure while giving you more time to focus on the rest of your move.",
  },
  {
    title: "Storage Options",
    icon: "box",
    anchorId: "service-storage-options",
    desc: "Flexible storage solutions for residential and business needs. With secure warehousing, climate-controlled storage, and organized inventory support, your belongings can stay protected until you're ready for delivery.",
  },
  {
    title: "Auto Transport",
    icon: "car",
    anchorId: "service-auto-transport",
    desc: "Whether you're shipping one vehicle or multiple vehicles, our team helps coordinate safe, affordable, and customized transportation solutions designed to fit your schedule, route, and specific needs. Open and enclosed options available.",
  },
  {
    title: "Senior Moving",
    icon: "users",
    anchorId: "service-senior-moving",
    desc: "Senior moves often require extra care and planning. Vantage helps seniors and their families coordinate long-distance relocation services by reviewing move details, timeline, destination, and any requested packing or handling needs.",
  },
  {
    title: "Commercial / Office Moving",
    icon: "office",
    anchorId: "service-commercial-office-moving",
    desc: "Whether you're relocating a small office or a larger workspace, our goal is to help reduce disruption, keep your move organized, and get your business settled into its new location as efficiently as possible.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How do I request a moving quote?",
    a: `You can request a moving quote by calling us directly at ${business.phoneDisplay} or by clicking here to provide your pickup location, destination, preferred move date, move size, and contact information. Once submitted, one of our moving coordinators will reach out by phone to review your exact inventory, discuss any additional services needed, and go over the details of your move in order to prepare your free quote.`,
  },
  {
    q: "Can I change my move date after reserving?",
    a: "Yes. You can change your move date after reserving as long as you notify us at least 7 days in advance, with no penalties. Date changes requested within 7 days of the scheduled move date may be subject to a $250 rescheduling fee.",
  },
  {
    q: "Are packing services available?",
    a: "Yes. Packing services are available and include both labor and materials. You may choose full-service white glove packing for your entire home or itemized packing for specific items you would like the movers to handle.",
  },
  {
    q: "Need a few days or months of storage?",
    a: "Storage options are available if you need extra time between pickup and delivery. Your belongings can be stored in a secure, climate-controlled warehouse until you are ready to schedule delivery to your new location.",
  },
  {
    q: "What type of estimates are provided?",
    a: "We offer binding not-to-exceed moving estimates based on the estimated cubic feet and/or weight of your shipment and services requested. This means your estimate is built around the space and/or weight your inventory is expected to use, helping provide a clear price structure before moving day.",
  },
  {
    q: "What could cause my moving estimate to change?",
    a: "Your moving estimate may change if there are updates to the shipment size, item list, packing needs, long-carry distance, access conditions, or additional services requested. We work to provide the most accurate estimate possible and will clearly explain any changes so you understand exactly what affected the price.",
  },
  {
    q: "Are deposits required to reserve a move?",
    a: "Many moving companies require a deposit to reserve your move. Vantage Movers will walk you through the process and clearly explain any deposit requirements, payment terms, and reservation policies before you book.",
  },
  {
    q: "What services are offered by Vantage Movers?",
    a: "We offer a wide range of moving solutions, including residential moves, commercial relocations, long-distance moving, packing services, storage options, and more. Our team works with you to create a moving plan tailored to your specific needs, schedule, and relocation details.",
  },
  {
    q: "Is Vantage Movers Licensed and Bonded?",
    a: "Yes, Vantage Movers operates with full compliance to industry regulations. We are a licensed and bonded moving brokerage, providing peace of mind as we connect you with reputable moving companies.",
  },
  {
    q: "How do we know our carrier for the move and if they are reputable?",
    a: "During your reservation call, you will sign a bill of lading with the carrier that best matches your scheduling needs, route, and move requirements. All carriers in our network are carefully vetted by our team to confirm proper licensing, insurance, service standards, and reputation. Each carrier also agrees to uphold the values, professionalism, and level of service we expect for every Vantage customer.",
  },
  {
    q: "What if there is an issue during the move?",
    a: "We take customer feedback seriously. If an issue arises during your move, our support team is here to listen, review the situation, and work with you toward a prompt and fair resolution.",
  },
  {
    q: "Why Choose Vantage Movers?",
    a: "Vantage Movers is committed to delivering a better moving experience through personalized service, competitive pricing, and access to a network of reputable moving professionals. We focus on clear communication, reliable coordination, and customer satisfaction from the first quote to final delivery.",
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
    desc: "Call us or fill out the form to get started. We'll go through a thorough inventory and review the services needed for your move so we can provide the most accurate estimate possible.",
  },
  {
    n: 2,
    title: "Set Your Target Move Date",
    desc: "Choose your preferred pickup date or window. Your target date can remain flexible, and changes can be made with at least 7 days' notice without penalties.",
  },
  {
    n: 3,
    title: "Prepare for Moving Day",
    desc: "Before pickup, review your item counts, label your boxes, separate important documents or valuables, and organize your travel plans so everything is ready when the movers arrive.",
  },
  {
    n: 4,
    title: "We Coordinate the Rest",
    desc: "We handle the coordination with the assigned carrier and professional moving team to help ensure a smooth pickup, safe transport, and seamless delivery to your new location.",
  },
] as const;

export const whyVantage = [
  {
    icon: "headphones" as const,
    title: "Free Consultation & Quote",
    desc: "Speak with a moving specialist to review your inventory, services, pickup details, and delivery needs. We'll build an accurate moving estimate and answer your questions with no obligation.",
  },
  {
    icon: "users" as const,
    title: "Highly Rated",
    desc: "We are one of the highest-rated moving brokerages for household goods and auto transport services.",
  },
  {
    icon: "dollar-sign" as const,
    title: "Clear Quote Review",
    desc: "We help you understand what shapes your estimate — inventory, distance, services, and access conditions — so you can review anticipated charges before committing.",
  },
  {
    icon: "truck" as const,
    title: "Auto Transport",
    desc: "Whether you need to ship a car, SUV, truck, or specialty vehicle, we help arrange transport options designed to fit your schedule, route, and relocation needs.",
  },
  {
    icon: "package" as const,
    title: "Packing & Storage Services",
    desc: "Full or partial packing services are available, along with storage options in climate-controlled warehouses to help keep your belongings protected and your move organized.",
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
  `Vantage Movers provides long distance moving services to and from ${stateName}, helping customers relocate across state lines with reliable coordination and nationwide coverage. From pickup planning to carrier assignment and delivery support, we help make your move easier from start to finish.`;

export const coverageSection = {
  eyebrow: "Nationwide Coverage",
  title: "Serving Moves Across the Entire U.S.",
  body: "With moving services available across all 50 states, we help make long distance relocations simple, affordable, and stress-free. Whether you're moving one state over or across the country, our nationwide carrier network allows us to coordinate reliable pickup, transportation, and delivery wherever life takes you.",
} as const;

export const servicesSection = {
  eyebrow: "What We Do",
  title: "Helping You Move With Confidence",
  body: "At Vantage, we make long-distance moving easier with nationwide coverage, and a customer-focused team ready to help from start to finish. Backed by hundreds of 5/5 Star Reviews and moving solutions to help you plan your move with confidence and peace of mind.",
} as const;

export const featureRows = [
  {
    eyebrow: "Long-Distance Moving",
    anchorId: "service-long-distance-feature",
    title: "Long-Distance Moving, Coordinated Step by Step",
    body: "Long-distance moves require careful planning, timing, and coordination from start to finish. Vantage Movers helps make the process easier by reviewing your pickup location, delivery location, move size, preferred dates, and any additional service needs before coordinating transportation with professional, licensed and insured carriers. From planning your estimate to preparing for pickup and delivery, our team is here to help you move with confidence.",
    checklist: [
      "Accurate & Detailed Moving Estimates",
      "Reputable Network of Licensed and Insured Motor Carriers",
      "Support from Initial Quote to Final Delivery",
    ],
    image: "longDistanceMoves" as const,
    imageAlt: "Long-distance moving truck on the highway",
    badge: { label: "Most Requested", icon: "truck" as const },
    imageFirst: true,
  },
  {
    eyebrow: "Military Moving",
    anchorId: "service-military-moving",
    title: "Veteran & Military Moves",
    body: "We understand how important a smooth, reliable moving experience is for military families. We help coordinate PCS relocations, veteran relocations, storage options, and long-distance moving services designed to make each transition easier. We are proud to support military members and families with dependable moving solutions tailored to their needs.",
    checklist: [
      "Weight Tickets Provided When Requested",
      "Nationwide Long-Distance Coverage",
      "Moves Organized Around Your Timeline And Orders",
    ],
    image: "militaryMoves" as const,
    imageAlt: "Military family preparing for a coordinated move",
    badge: { label: "Military Moves", icon: "shield" as const },
    imageFirst: false,
  },
] as const;

export const aboutSection = {
  eyebrow: "Moving Coordination",
  title: "Trusted Moving Support From Start to Finish",
  body: "At Vantage Movers, we help make the moving process easier by guiding you through every step of your relocation. From your first consultation and detailed inventory review to carrier coordination, pickup planning, transportation, and delivery support, our team is here to help keep your move organized from beginning to end. We focus on clear communication, accurate move details, and reliable coordination so you know what to expect before moving day arrives. From moving across state lines, to packing services, storage options, to specialty items that need extra care, Vantage helps connect you with the right moving solutions for your needs.",
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
  footerTrustItems: ["Free Estimate", "Binding Estimates", "No Hidden Fees"],
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
  body: "Every successful long-distance move begins with accurate details and organized coordination. Vantage Movers helps customers prepare for interstate relocations by reviewing important move information such as inventory, distance, preferred dates, packing needs, specialty items, and access conditions. Once your move details are confirmed, Vantage can help coordinate transportation through a reputable licensed motor carrier within our network and provide support throughout the planning process.",
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
  heading: "A Moving Experience Built Around You",
  ctaTitle: "Ready to review your move details?",
  ctaBody: "Request a personalized moving estimate in under a minute.",
  ctaLabel: "Request a Free Moving Quote",
  /** Playground card icon overrides — see WhyVantageSection.stories.tsx Playground */
  cardIcons: [
    "headphones",
    "users",
    "dollar-sign",
    "truck",
    "package",
  ] as const,
} as const;

export const footerServiceLinks = [
  { label: "Long-Distance Moving", href: "/#service-long-distance-moving" },
  { label: "Interstate Moving", href: "/#service-long-distance-moving" },
  { label: "Residential Moving", href: "/#service-long-distance-moving" },
  { label: "Corporate Relocation", href: "/#service-commercial-office-moving" },
  { label: "Commercial / Office Moving", href: "/#service-commercial-office-moving" },
  { label: "Military Moving", href: "/#service-military-moving" },
  { label: "Senior Moving", href: "/#service-senior-moving" },
  { label: "Packing Services", href: "/#service-packing-services" },
  { label: "Loading & Unloading", href: "/#service-packing-services" },
  { label: "Moving Coordination", href: "/#service-long-distance-feature" },
];

export const footerCompanyLinks = [
  { label: "Join Our Carrier Network", href: "/carrier-contacts" },
  { label: "Consumer Information", href: "/consumer-information" },
  { label: "About Us", href: "/#about" },
  { label: "Service Areas", href: "/#map" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const carrierContactsPage = {
  title: "Join Our Carrier Network",
  description:
    "Carriers interested in working with Vantage Movers can submit their company details through our carrier request form.",
  eyebrow: "Carrier Network",
  body: "If you are a licensed carrier and would like dispatch to review your company information, please complete the carrier request form. A member of our dispatch team will reach out after reviewing your submission.",
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfP_MQmuGVulFRFeBJW6uf508_8b421HK_ryNh24AD_OKt0Qw/viewform",
  ctaLabel: "Open Carrier Request Form",
} as const;

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "SMS Privacy Policy", href: "/sms-privacy" },
  { label: "SMS Terms", href: "/sms-terms" },
  { label: "Cancellation Policy", href: "/cancellation" },
  { label: "Your Rights & Responsibilities", href: "/your-rights", newTab: true },
  { label: "Ready To Move", href: "/ready-to-move", newTab: true },
  { label: "Do Not Sell My Info", href: "/privacy#dns", newTab: true },
];
