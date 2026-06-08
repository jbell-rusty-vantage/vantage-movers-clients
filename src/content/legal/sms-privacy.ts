import type { LegalDoc } from "@/types";
import { site, telHref } from "@/content/site";

const email = site.email;
const mailto = `mailto:${email}`;
const tel = telHref();

export const smsPrivacyPolicy: LegalDoc = {
  slug: "sms-privacy",
  title: "SMS Privacy Policy",
  description: `${site.name} SMS Privacy Policy — how we collect, use, and protect information for our SMS program.`,
  lastUpdated: "June 2026",
  heroNote: "This policy applies specifically to SMS messages from our moving quote program.",
  lead: `${site.name} sends SMS messages only to customers who opt in on our website quote form. This SMS Privacy Policy explains how we use mobile numbers and SMS consent information for quote requests, scheduling updates, appointment reminders, service updates, and customer support.`,
  sections: [
    {
      id: "overview",
      index: "01",
      title: "Overview",
      blocks: [
        {
          type: "p",
          html: `This SMS Privacy Policy applies to the ${site.name} SMS Program. It supplements our general <a href="/privacy">Privacy Policy</a> and is intended to describe the privacy practices that apply to text messaging consent and communications.`,
        },
      ],
    },
    {
      id: "collect",
      index: "02",
      title: "Information We Collect",
      blocks: [
        {
          type: "ul",
          items: [
            "Your mobile phone number.",
            "Your SMS opt-in status and the date, time, page, or form where consent was submitted.",
            "Quote request details you provide, such as your name, email, pickup ZIP, destination ZIP, move date, and move size.",
            "SMS communication records, including delivery status, replies, opt-out requests, and support requests.",
          ],
        },
      ],
    },
    {
      id: "use",
      index: "03",
      title: "How We Use Your Information",
      blocks: [
        {
          type: "ul",
          items: [
            "To respond to your moving quote request.",
            "To send appointment scheduling messages, appointment reminders, service updates, and customer support messages.",
            "To manage your SMS opt-in, opt-out, and help requests.",
            "To maintain compliance records for carrier and messaging-program requirements.",
            "To protect our services, prevent abuse, and comply with legal obligations.",
          ],
        },
      ],
    },
    {
      id: "sms",
      index: "04",
      title: "SMS Communications",
      blocks: [
        {
          type: "p",
          html: `If you opt in, ${site.name} may send SMS messages about your moving quote request, scheduling updates, appointment reminders, service updates, and customer support. Message frequency may vary based on your move request and service needs, up to 4 messages per month. Message and data rates may apply.`,
        },
        {
          type: "p",
          html: `You can reply <strong>STOP</strong> to unsubscribe from SMS messages at any time. You can reply <strong>HELP</strong> for assistance or contact us at <a href="${tel}">${site.phone}</a> or <a href="${mailto}">${email}</a>. SMS consent is optional and is not required to submit a quote request.`,
        },
      ],
    },
    {
      id: "sharing",
      index: "05",
      title: "Information Sharing",
      blocks: [
        {
          type: "p",
          html: "We do not sell or share mobile information or SMS consent data with third parties for their marketing or promotional purposes. SMS consent is not shared with third parties or affiliates for marketing purposes.",
        },
        {
          type: "p",
          html: "We may share information with service providers that help us operate our website, process quote requests, deliver SMS messages, provide customer support, maintain security, or comply with legal obligations. These providers are permitted to use the information only to provide services to us.",
        },
      ],
    },
    {
      id: "security",
      index: "06",
      title: "Data Security",
      blocks: [
        {
          type: "p",
          html: "We use reasonable administrative, technical, and physical safeguards designed to protect SMS consent records and mobile information. No method of transmission or storage is completely secure, but we work to protect your information from unauthorized access, use, or disclosure.",
        },
      ],
    },
    {
      id: "rights",
      index: "07",
      title: "Your Rights",
      blocks: [
        {
          type: "ul",
          items: [
            "You may opt out of SMS messages at any time by replying <strong>STOP</strong>.",
            "You may request assistance by replying <strong>HELP</strong> or contacting us directly.",
            "You may ask us to update, correct, or delete your contact information, subject to legal and operational requirements.",
            "You may contact us with questions about how your SMS consent information is used.",
          ],
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
          html: `For questions about this SMS Privacy Policy or our SMS program, contact ${site.name} at <a href="${tel}">${site.phone}</a>, <a href="${mailto}">${email}</a>, or ${site.address.line1}, ${site.address.line2}.`,
        },
      ],
    },
  ],
  contact: {
    heading: `${site.name} SMS Support`,
    bodyHtml: `Phone: <a href="${tel}">${site.phone}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${site.address.line1}, ${site.address.line2}`,
    actions: [
      { label: "Get a Free Quote", href: "/#quote", variant: "gold", icon: "arrowRight" },
      { label: "SMS Terms", href: "/sms-terms", variant: "ghost" },
    ],
  },
};
