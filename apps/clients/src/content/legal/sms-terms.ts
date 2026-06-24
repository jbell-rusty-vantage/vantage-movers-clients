import type { LegalDoc } from "@/types";
import { site, telHref } from "@/content/site";

const email = site.email;
const mailto = `mailto:${email}`;
const tel = telHref();

export const smsTerms: LegalDoc = {
  slug: "sms-terms",
  title: "SMS Terms & Conditions",
  description: `${site.name} SMS Terms & Conditions for the Vantage Home Movers SMS Program.`,
  lastUpdated: "June 2026",
  heroNote: "Terms for SMS messages related to moving quote requests and support.",
  lead: `These SMS Terms & Conditions apply to the ${site.name} SMS Program. By opting in to receive SMS messages, you agree to the terms below.`,
  sections: [
    {
      id: "program",
      index: "01",
      title: "Program Name",
      blocks: [{ type: "p", html: `${site.name} SMS Program` }],
    },
    {
      id: "description",
      index: "02",
      title: "Description",
      blocks: [
        {
          type: "p",
          html: `${site.name} sends SMS messages to customers who opt in on our website quote form. Messages relate to moving quote requests, appointment scheduling, appointment reminders, service updates, and customer support.`,
        },
      ],
    },
    {
      id: "frequency",
      index: "03",
      title: "Message Frequency",
      blocks: [
        {
          type: "p",
          html: "Up to 4 messages per month. Message frequency may vary based on your move request and service needs.",
        },
      ],
    },
    {
      id: "costs",
      index: "04",
      title: "Costs",
      blocks: [{ type: "p", html: "Message and data rates may apply." }],
    },
    {
      id: "optout",
      index: "05",
      title: "Opt-Out",
      blocks: [
        {
          type: "p",
          html: "Reply <strong>STOP</strong> to any message to unsubscribe. After opting out, you will receive a confirmation and no further SMS messages from this program.",
        },
      ],
    },
    {
      id: "help",
      index: "06",
      title: "Help",
      blocks: [
        {
          type: "p",
          html: `Reply <strong>HELP</strong> for assistance or contact us at <a href="${tel}">${site.phone}</a> or <a href="${mailto}">${email}</a>.`,
        },
      ],
    },
    {
      id: "consent",
      index: "07",
      title: "Consent",
      blocks: [
        {
          type: "p",
          html: "SMS consent is optional and is not required to submit a quote request on our website.",
        },
      ],
    },
    {
      id: "privacy",
      index: "08",
      title: "Privacy",
      blocks: [{ type: "p", html: 'See our <a href="/sms-privacy">SMS Privacy Policy</a>.' }],
    },
    {
      id: "carrier",
      index: "09",
      title: "Carrier Liability",
      blocks: [
        { type: "p", html: "Carriers are not liable for delayed or undelivered messages." },
      ],
    },
    {
      id: "contact",
      index: "10",
      title: "Contact",
      blocks: [
        {
          type: "p",
          html: `${site.name}<br />Phone: <a href="${tel}">${site.phone}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${site.address.line1}, ${site.address.line2}`,
        },
      ],
    },
  ],
  contact: {
    heading: `${site.name} SMS Support`,
    bodyHtml: `Phone: <a href="${tel}">${site.phone}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${site.address.line1}, ${site.address.line2}`,
    actions: [
      { label: "SMS Privacy Policy", href: "/sms-privacy", variant: "gold", icon: "arrowRight" },
      { label: "Get a Free Quote", href: "/#quote", variant: "ghost" },
    ],
  },
};
