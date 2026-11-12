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
    "Start with what you are taking, where you are moving and when you can be ready. Vantage helps you review those details and discuss transportation with an authorized motor carrier.",
  supportingLine:
    "Tell us where you are moving, when you are moving, and what you need moved. We will help coordinate a quote based on your relocation details.",
  primaryCta: "Request A Free Quote",
  secondaryCta: "Speak With A Coordinator",
  brokerNote:
    "Vantage Movers is a licensed interstate household goods moving broker. We do not transport household goods directly. Instead, we arrange transportation through authorized motor carriers based on your move details, availability, route, and service needs.",
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
    desc: "If your dates do not line up, ask about storage for your shipment. Review facility conditions, access, handling charges and how to request delivery before agreeing to terms.",
  },
  {
    title: "Auto Transport",
    icon: "car",
    anchorId: "service-auto-transport",
    desc: "Have your vehicle's year, make, model and preferred dates ready. Ask about transport options for your route and how vehicle pickup would fit with your household move.",
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
    a: "Contact Vantage before changing your plans. Check the change and cancellation terms in your signed agreement, and ask for any revised dates, availability and charges in writing.",
  },
  {
    q: "Are packing services available?",
    a: "Tell your coordinator which items you would like help packing. Ask whether labor, materials, unpacking and special handling are included in the written estimate for your shipment.",
  },
  {
    q: "Need a few days or months of storage?",
    a: "Describe the possible gap between pickup and delivery. Ask about storage availability, facility conditions, access to stored belongings, charges and notice needed for redelivery. Confirm the arrangements in writing.",
  },
  {
    q: "What type of estimates are provided?",
    a: "Read the estimate's stated type and terms before agreeing. Compare the inventory, included services and possible additional charges, and ask the coordinator and carrier to clarify anything that is unclear in writing.",
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
    q: "How do I check Vantage and the assigned carrier?",
    a: "Vantage is an interstate moving broker, identified on this site by USDOT 4078939 and MC 1551322. Use the official FMCSA mover search linked in Consumer Information to check current registration, and check the separately identified carrier on your shipment paperwork.",
  },
  {
    q: "How do we know our carrier for the move and if they are reputable?",
    a: "Ask for the assigned motor carrier's legal name, registration identifiers and contact information. Compare those details with your shipment paperwork and the official FMCSA registration lookup. The carrier performs pickup, transportation and delivery; Vantage arranges transportation as a broker.",
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
  tagline: "Review the inventory, services and written terms before you decide.",
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
    desc: "Share your preferred pickup window and delivery constraints. Confirm the agreed schedule and the terms for any date changes in your shipment paperwork.",
  },
  {
    n: 3,
    title: "Prepare for Moving Day",
    desc: "Before pickup, review your item counts, label your boxes, separate important documents or valuables, and organize your travel plans so everything is ready when the movers arrive.",
  },
  {
    n: 4,
    title: "We Coordinate the Rest",
    desc: "Vantage arranges transportation as a broker. Keep your coordinator's and assigned carrier's contact details handy; the carrier handles pickup, transport and delivery.",
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
    title: "Know Who Does What",
    desc: "Vantage arranges transportation as a broker. Identify the motor carrier on your shipment paperwork and keep both contacts handy.",
  },
  {
    icon: "dollar-sign" as const,
    title: "Clear Quote Review",
    desc: "We help you understand what shapes your estimate — inventory, distance, services, and access conditions — so you can review anticipated charges before committing.",
  },
  {
    icon: "truck" as const,
    title: "Auto Transport",
    desc: "Discuss your vehicle and route with a coordinator. Confirm transport options, pickup arrangements and terms separately from your household shipment.",
  },
  {
    icon: "package" as const,
    title: "Packing & Storage Services",
    desc: "List the items you would like packed and any gap between your move dates. Ask about availability, materials, storage conditions and charges for your shipment.",
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
  `Planning an interstate move involving ${stateName}? Have both addresses, your inventory and preferred dates ready. Ask your coordinator to confirm carrier availability and services for your specific route. Selecting a state here does not confirm service coverage or set your quote destination.`;

export const coverageSection = {
  eyebrow: "Destination Planning",
  title: "Start With Your Route",
  body: "Choose a state to start planning, or browse the destination guides. Guide availability is separate from service availability. Ask your coordinator to confirm your route, dates and requested services.",
} as const;

export const servicesSection = {
  eyebrow: "What We Do",
  title: "Helping You Move With Confidence",
  body: "Explore the questions that matter for your move: what is included, what to prepare and who handles each step. Bring your inventory, access details and preferred dates to the conversation.",
} as const;

export const featureRows = [
  {
    eyebrow: "Long-Distance Moving",
    anchorId: "service-long-distance-feature",
    title: "Long-Distance Moving, Coordinated Step by Step",
    body: "Start with your pickup and delivery locations, inventory, preferred dates and requested services. Vantage arranges transportation as a broker. Review the written estimate and identify the assigned motor carrier before pickup.",
    checklist: [
      "Compare the Inventory and Included Services",
      "Check the Assigned Carrier's Registration",
      "Keep Your Coordinator and Carrier Contacts Handy",
    ],
    image: "longDistanceMoves" as const,
    imageAlt: "Long-distance moving truck on the highway",
    badge: { label: "Plan Your Route", icon: "truck" as const },
    imageFirst: true,
  },
  {
    eyebrow: "Military Moving",
    anchorId: "service-military-moving",
    title: "Veteran & Military Moves",
    body: "If you are moving around military orders, bring your reporting date and the instructions from your transportation office. Confirm approval, paperwork and any reimbursement requirements with that office before making arrangements.",
    checklist: [
      "Ask Which Documents the Carrier Can Provide",
      "Confirm Service Availability for Your Route",
      "Discuss Reporting Dates and Access Restrictions",
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
  body: "Share your move details so a coordinator can review your inventory, access and requested services with you.",
  image: "expertiseBanner" as const,
  imageAlt: "Moving preparation beside a truck; illustrative image",
  formTitle: "Get My Free Quote",
  formSubtitle: "Prepare your inventory and questions",
  footerTrustItems: ["Review Your Inventory", "Compare Written Terms", "Know Your Carrier"],
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
  ctaBody: "Share your move details and the questions you want to discuss.",
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
