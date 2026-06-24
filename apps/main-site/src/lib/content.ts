/**
 * Vantage Movers main site — all copy and structured data.
 */

export const business = {
  name: "Vantage Movers",
  tagline: "MOVERS",
  phoneDisplay: "(888) 477-9232",
  phoneHref: "tel:8884779232",
  hours: "Mon–Sun · 8am–11pm",
  dot: "4078939",
  mc: "1551322",
  address: ["1880 N Congress Ave Ste 401A", "Boynton Beach, FL 33426"],
  brokerLine: "Licensed Moving Broker",
  copyright: "© 2026 Vantage Movers. All rights reserved.",
  brokerDisclaimer:
    "Vantage Movers is a licensed interstate moving broker. Vantage is not a motor carrier and does not transport household goods. Vantage coordinates and arranges transportation of household goods through FMCSA-authorized motor carriers. Final charges are based on the carrier's tariff, shipment inventory, requested services, route, and move conditions. Carrier tariffs are available for inspection from the carrier upon reasonable request.",
} as const;

export type IconKey =
  | "truck"
  | "globe"
  | "route"
  | "home"
  | "office"
  | "shield"
  | "box"
  | "archive"
  | "car";

export interface Service {
  title: string;
  icon: IconKey;
  desc: string;
}

export const services: Service[] = [
  {
    title: "Long Distance Moving",
    icon: "truck",
    desc: "Coordinated long-haul relocations matched with licensed, authorized motor carriers for your route.",
  },
  {
    title: "Cross Country Moving",
    icon: "globe",
    desc: "Coast-to-coast moves planned with clear estimates and a single point of coordination.",
  },
  {
    title: "Interstate Moving",
    icon: "route",
    desc: "State-to-state moving support within our nationwide carrier network at fair, competitive rates.",
  },
  {
    title: "Residential Moving",
    icon: "home",
    desc: "From studios to large family homes, we help match the right carrier to your household.",
  },
  {
    title: "Corporate & Office",
    icon: "office",
    desc: "Business relocations coordinated to reduce downtime for teams of five or fifty.",
  },
  {
    title: "Military Moving",
    icon: "shield",
    desc: "PCS and military move coordination with attention to timing and clear communication.",
  },
  {
    title: "Packing Services",
    icon: "box",
    desc: "Optional packing and prep services arranged through professional partner carriers.",
  },
  {
    title: "Storage Services",
    icon: "archive",
    desc: "Short and long-term storage solutions coordinated as part of your moving plan.",
  },
  {
    title: "Auto Transport",
    icon: "car",
    desc: "Vehicle shipping arranged alongside your household move for a coordinated relocation.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Is Vantage a moving company or a moving broker?",
    a: "Vantage Movers is a licensed interstate moving broker. We do not own trucks or transport household goods ourselves. Instead, we help you plan and coordinate your move with FMCSA-authorized motor carriers.",
  },
  {
    q: "What types of moves does Vantage coordinate?",
    a: "We coordinate long-distance, cross-country, and interstate moves for residential, corporate, and military customers — including optional packing, storage, and auto transport services.",
  },
  {
    q: "How do I get a quote for my long-distance move?",
    a: "Use our instant estimate form or call (888) 477-9232. Share your pickup and destination, move size, and timing, and a coordinator will help match you with authorized carriers and clear estimate details.",
  },
  {
    q: "Does Vantage handle long-distance and interstate moves?",
    a: "Yes. Long-distance and interstate relocations are our focus. We help coordinate moves across nearly every U.S. state through our network of licensed motor carriers.",
  },
  {
    q: "Can Vantage help with packing, storage, or auto transport?",
    a: "Absolutely. We can arrange professional packing, short or long-term storage, and vehicle transport as part of a single coordinated moving plan.",
  },
  {
    q: "How are final moving charges determined?",
    a: "Final charges are based on the carrier\u2019s published tariff, your shipment inventory, requested services, route, and move conditions. Your coordinator helps you understand these factors up front so there are fewer surprises.",
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
      "The coordinator explained everything up front and matched us with a carrier that handled our cross-country move beautifully. No surprises on cost.",
    name: "Marcus C.",
    route: "FL → TX · Long Distance",
  },
  {
    initials: "SR",
    quote:
      "As a military family, timing mattered. Vantage helped coordinate our PCS move and kept us updated the entire way. Stress-free.",
    name: "Sgt. Sarah R.",
    route: "VA → CA · Military Move",
  },
  {
    initials: "JL",
    quote:
      "We relocated our small office across three states. The team coordinated everything and the quote held true. Highly recommend.",
    name: "Jenna L.",
    route: "IL → GA · Office Move",
  },
];

export const howItWorks = [
  {
    n: "01",
    icon: "file" as const,
    title: "Request Your Estimate",
    desc: "Share your route, move size, and timing. It takes under a minute and there's no obligation.",
  },
  {
    n: "02",
    icon: "user-check" as const,
    title: "Review Your Options",
    desc: "A coordinator helps match you with licensed motor carriers and walks you through clear estimate details.",
  },
  {
    n: "03",
    icon: "truck" as const,
    title: "Coordinate Your Move",
    desc: "We help coordinate scheduling and logistics with your carrier so moving day runs smoothly.",
  },
];

export const whyVantage = [
  {
    icon: "shield" as const,
    title: "Licensed Moving Broker",
    desc: "FMCSA-licensed (DOT 4078939 · MC 1551322) and bonded, coordinating moves only with authorized motor carriers.",
  },
  {
    icon: "dollar-sign" as const,
    title: "Clear Estimate Support",
    desc: "We help you understand what shapes your estimate so there are fewer surprises on moving day.",
  },
  {
    icon: "globe" as const,
    title: "Nationwide Coordination",
    desc: "A national carrier network means we can help coordinate long-distance moves across nearly every state.",
  },
  {
    icon: "headphones" as const,
    title: "Responsive Coordinators",
    desc: "Real people who answer questions and help keep your move on track from quote to delivery.",
  },
  {
    icon: "briefcase" as const,
    title: "Flexible Service Options",
    desc: "From full-service to packing, storage, and auto transport — we help match the right service to your move.",
  },
];

export const navLinks = [
  { label: "Locations", href: "#map" },
  { label: "About Us", href: "#about" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const moveSizes = [
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4 Bedrooms",
  "5+ Bedrooms",
  "Commercial / Office",
];

export const serviceTypes = [
  "Long Distance Move",
  "Cross Country Move",
  "Interstate Move",
  "Corporate / Office Move",
  "Military Move",
  "Auto Transport",
];

export const stateNames: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
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
  `Vantage helps coordinate long-distance and interstate moves to and from ${stateName} with licensed, FMCSA-authorized motor carriers — clear estimates and a single point of contact.`;

export const featureRows = [
  {
    eyebrow: "Long Distance Moving",
    title: "Long-Distance Moves, Coordinated Door To Door",
    body: "Your long-distance move deserves attention to detail. Vantage helps build a plan that matches your route, inventory, and timeline with licensed, authorized motor carriers — so the right team handles your belongings across the state or across the country.",
    checklist: [
      "Matched only with FMCSA-authorized carriers",
      "Clear, upfront estimate support — fewer surprises",
      "One point of contact from quote to delivery",
    ],
    imageLabel: "long-distance-moving-day.jpg",
    badge: { label: "Most Requested", icon: "truck" as const },
    imageFirst: true,
  },
  {
    eyebrow: "Military Moving",
    title: "Coordinated Moves for Military Families",
    body: "We understand how much a smooth move matters to military families. Vantage helps coordinate PCS moves and storage with carriers experienced in military relocations — built around your orders, your timeline, and the people who matter most.",
    checklist: [
      "Coordination for PCS moves and storage",
      "Flexible scheduling around your orders",
      "Storage and auto transport options available",
    ],
    imageLabel: "military-family-home.jpg",
    badge: { label: "Veteran-Friendly", icon: "shield" as const },
    imageFirst: false,
  },
] as const;

export const footerServiceLinks = [
  "Long Distance Moving",
  "Cross Country Moving",
  "Interstate Moving",
  "Corporate & Office",
  "Military Moving",
  "Packing & Storage",
  "Auto Transport",
];

export const footerCompanyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Service Areas", href: "#map" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Join Our Carrier Network", href: "#" },
  { label: "Moving Checklist", href: "#" },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "SMS Privacy Policy", href: "#" },
  { label: "Cancellation Policy", href: "#" },
  { label: "Rights & Responsibilities", href: "#" },
  { label: "Do Not Sell My Info", href: "#" },
];
