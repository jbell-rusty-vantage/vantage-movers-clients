import type { LegalDoc } from "@/types";
import { site, telHref } from "@/content/site";

const email = site.email;
const mailto = `mailto:${email}`;
const tel = telHref();

export const termsConditions: LegalDoc = {
  slug: "terms",
  title: "Terms & Conditions",
  description: `${site.name} Terms & Conditions for use of the website and moving quote services.`,
  lastUpdated: "June 2026",
  heroNote: "General website terms for quote requests and broker services.",
  lead: `These Terms & Conditions govern your use of the ${site.name} website and quote request services. By using our website or submitting a quote request, you agree to these terms.`,
  sections: [
    {
      id: "acceptance",
      index: "01",
      title: "Acceptance of Terms",
      blocks: [
        {
          type: "p",
          html: "By accessing this website, requesting a quote, or communicating with us through the site, you agree to be bound by these Terms & Conditions and all applicable laws. If you do not agree, do not use the website or submit information through our forms.",
        },
      ],
    },
    {
      id: "services",
      index: "02",
      title: "Services Description",
      blocks: [
        {
          type: "p",
          html: `${site.name} is a moving broker. We help consumers request moving quotes and coordinate household-goods relocations through independent, FMCSA-authorized motor carriers. We do not physically transport household goods.`,
        },
      ],
    },
    {
      id: "submissions",
      index: "03",
      title: "User Submissions & Accuracy",
      blocks: [
        {
          type: "p",
          html: "You agree to provide accurate, complete, and current information when submitting a quote request. Estimates, scheduling, and carrier availability may depend on the accuracy of the information you provide, including origin and destination ZIP codes, move date, inventory size, and contact information.",
        },
      ],
    },
    {
      id: "communications",
      index: "04",
      title: "Communications",
      blocks: [
        {
          type: "p",
          html: `By submitting a quote request, you ask ${site.name} to contact you about your request by phone, email, or other contact details you provide. SMS opt-in is optional and is not required to submit a quote request. If you choose to receive SMS messages, those messages are governed by our <a href="/sms-terms">SMS Terms & Conditions</a>.`,
        },
      ],
    },
    {
      id: "broker",
      index: "05",
      title: "No Guarantee of Estimate / Broker Disclosure",
      blocks: [
        {
          type: "p",
          html: site.brokerDisclaimer,
        },
        {
          type: "p",
          html: "Any estimate provided through the website is for informational purposes only and is not a guaranteed final price. Final charges may vary based on carrier tariffs, actual services requested, inventory, access conditions, packing needs, storage, timing, and other move-specific factors.",
        },
      ],
    },
    {
      id: "liability",
      index: "06",
      title: "Limitation of Liability",
      blocks: [
        {
          type: "p",
          html: "To the fullest extent permitted by law, Vantage Home Movers will not be liable for indirect, incidental, consequential, special, punitive, or exemplary damages arising from your use of the website, quote tools, or communications with us. Our liability for any claim related to the website or quote request process is limited to the amount you paid directly to us, if any, for the specific service giving rise to the claim.",
        },
      ],
    },
    {
      id: "law",
      index: "07",
      title: "Governing Law",
      blocks: [
        {
          type: "p",
          html: "These Terms & Conditions are governed by the laws of the State of Florida, without regard to conflict-of-law rules.",
        },
      ],
    },
    {
      id: "contact",
      index: "08",
      title: "Contact Information",
      blocks: [
        {
          type: "p",
          html: `Questions about these Terms & Conditions may be directed to ${site.name} at <a href="${tel}">${site.phone}</a>, <a href="${mailto}">${email}</a>, or ${site.address.line1}, ${site.address.line2}.`,
        },
      ],
    },
  ],
  contact: {
    heading: `Contact ${site.name}`,
    bodyHtml: `Phone: <a href="${tel}">${site.phone}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${site.address.line1}, ${site.address.line2}`,
    actions: [
      { label: "Get a Free Quote", href: "/#quote", variant: "gold", icon: "arrowRight" },
      { label: "Privacy Policy", href: "/privacy", variant: "ghost" },
    ],
  },
};
