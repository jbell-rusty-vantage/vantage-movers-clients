import type { LegalDoc } from "@/types";
import { site, telHref } from "@/content/site";

const email = site.email;
const mailto = `mailto:${email}`;
const tel = telHref();

export const cancellationPolicy: LegalDoc = {
  slug: "cancellation",
  title: "Cancellation Policy",
  description:
    "Vantage Movers Cancellation Policy — broker fee disclosure, refund terms, and how to submit a cancellation request.",
  lastUpdated: "June 5, 2026",
  heroNote: "Please read carefully before requesting a cancellation or refund.",
  lead: "This Cancellation Policy explains the nature of the fee collected by Vantage Movers, how carrier payments work, and the terms that apply to cancellations and refunds. By signing your bill of lading and engaging our services, you acknowledge and agree to the terms below.",
  sections: [
    {
      id: "brokerfee",
      index: "01",
      title: "Broker Fee Disclosure",
      blocks: [
        {
          type: "p",
          html: "It has been disclosed that the fee collected by Vantage Movers is a <strong>broker fee</strong>. This is our fee for arranging a fully licensed/insured motor carrier to move and handle your household goods and possessions.",
        },
      ],
    },
    {
      id: "carrier",
      index: "02",
      title: "Carrier Charges & Payments",
      blocks: [
        {
          type: "p",
          html: "The carrier charges will be paid <strong>C.O.D.</strong> (unless arranged in advance to pay by credit or debit card) by you, the customer, to the independently owned carrier in two payments. The first half is due upon pickup and the second half is due upon delivery of your household goods at the intended destination address.",
        },
        {
          type: "p",
          html: "Vantage Movers does not participate in the collection of carrier payments, nor do we share in the proceeds of carrier charges.",
        },
      ],
    },
    {
      id: "separate",
      index: "03",
      title: "Separate Transactions",
      blocks: [
        {
          type: "p",
          html: "You are aware that these are separate transactions between you and the carrier, which is a different business entity from Vantage Movers.",
        },
      ],
    },
    {
      id: "nonrefundable",
      index: "04",
      title: "Non-Refundable Broker Fee",
      blocks: [
        {
          type: "p",
          html: "Since our fee for service begins immediately, you understand and agree to our broker fee being <strong>non-refundable with no exceptions 72 hours after signing your bill of lading</strong>.",
        },
        {
          type: "callout",
          html: "<strong>Important:</strong> Deposits are not refundable outside of the three-day window, if you are within five (5) days of your first scheduled pickup day, or after the mover has begun the physical moving services.",
        },
      ],
    },
    {
      id: "federal",
      index: "05",
      title: "Federal Regulation",
      blocks: [
        {
          type: "p",
          html: "In accordance with the U.S. Code <strong>49 CFR § 375.505(h)</strong>, an estimate/order may not be canceled, and deposits are not refundable outside of the three-day window, or if you are within five (5) days of your first scheduled pickup day, or after the mover has begun the physical moving services, including but not limited to: packing, loading, storage, transportation to and from the pick-up or delivery address, etc.",
        },
      ],
    },
    {
      id: "noncancelable",
      index: "06",
      title: "When Cancellation Is Not Permitted",
      blocks: [
        {
          type: "p",
          html: "Services may not be canceled after the customer's property has been loaded on the truck. This includes, but is not limited to, any of the following physical moving services once they have begun:",
        },
        {
          type: "ul",
          items: [
            "Packing of your household goods",
            "Loading of your property onto the truck",
            "Storage of your household goods",
            "Transportation to and from the pick-up or delivery address",
          ],
        },
      ],
    },
    {
      id: "howto",
      index: "07",
      title: "How to Cancel",
      blocks: [
        {
          type: "p",
          html: `All cancellation requests must be sent in writing to <a href="${mailto}">${email}</a>. For more information, please call us at <a href="${tel}">${site.phone}</a>.`,
        },
      ],
    },
  ],
  contact: {
    heading: "Need help with a cancellation?",
    bodyHtml: `Email <a href="${mailto}">${email}</a><br />Call <a href="${tel}">${site.phone}</a> · ${site.hours}`,
    actions: [
      { label: "Email Support", href: mailto, variant: "gold", icon: "arrowRight" },
      { label: "Privacy Policy", href: "/privacy", variant: "ghost" },
    ],
  },
};
