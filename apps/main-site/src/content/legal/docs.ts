import { business } from "@/lib/content";

const email = "support@vantagehomemovers.com";
const mailto = `mailto:${email}`;

export type LegalBlock =
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; html: string };

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  heroNote: string;
  lead: string;
  sections: {
    id: string;
    index: string;
    title: string;
    blocks: LegalBlock[];
  }[];
  contact: {
    heading: string;
    bodyHtml: string;
    actions: { label: string; href: string; variant: "gold" | "ghost" }[];
  };
}

const contactLine = `<a href="${business.phoneHref}">${business.phoneDisplay}</a>, <a href="${mailto}">${email}</a>, or ${business.address.join(", ")}.`;
const quoteAction = { label: "Get a Free Quote", href: "/#quote", variant: "gold" as const };

export const privacyPolicy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  description:
    "Vantage Movers Privacy Policy - how we collect, use, share, and protect your personal information.",
  lastUpdated: "June 5, 2026",
  heroNote: "Your privacy matters to us. This policy explains how we handle your information.",
  lead: `Vantage Movers ("Vantage Movers," "we," "us," or "our") is a licensed interstate moving broker that arranges household-goods relocations through independent, FMCSA-authorized motor carriers. This Privacy Policy describes how we collect, use, disclose, and protect personal information when you visit our website, request a quote, or otherwise interact with us.`,
  sections: [
    {
      id: "intro",
      index: "01",
      title: "Overview",
      blocks: [
        {
          type: "p",
          html: "By using our website and submitting a quote request, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our practices, please do not use the site or provide us with your information. This policy applies to information collected through our website, by phone, by email, and through our online forms.",
        },
      ],
    },
    {
      id: "collect",
      index: "02",
      title: "Information We Collect",
      blocks: [
        {
          type: "p",
          html: "We collect information that you provide directly to us, information collected automatically, and information from third parties. This may include:",
        },
        {
          type: "ul",
          items: [
            "<strong>Contact details</strong> - your name, telephone number(s), email address, and physical addresses.",
            "<strong>Move details</strong> - origin and destination locations, preferred move dates, inventory size, type of move, and special handling requirements.",
            "<strong>Communications</strong> - records of your calls, chats, emails, text messages, and form submissions with us or our partners.",
            "<strong>Technical data</strong> - IP address, browser type, device identifiers, pages visited, referring URLs, and similar usage information.",
            "<strong>Marketing data</strong> - the source of your inquiry and your interactions with our advertisements or marketing partners.",
          ],
        },
        {
          type: "p",
          html: "We do not request or knowingly collect sensitive information such as Social Security numbers, financial account numbers, or government-issued ID numbers through our quote forms.",
        },
      ],
    },
    {
      id: "use",
      index: "03",
      title: "How We Use Your Information",
      blocks: [
        { type: "p", html: "We use the information we collect to:" },
        {
          type: "ul",
          items: [
            "Prepare and deliver moving estimates and quotes you request.",
            "Arrange and coordinate your relocation with licensed, insured motor carriers.",
            "Respond to inquiries and provide support before, during, and after your move.",
            "Send service updates, scheduling information, and transactional messages.",
            "Send offers, promotions, and marketing communications where permitted by law and consistent with your consent.",
            "Operate, maintain, analyze, and improve our website and services.",
            "Detect and prevent fraud, and comply with legal and regulatory obligations.",
          ],
        },
      ],
    },
    {
      id: "comms",
      index: "04",
      title: "Communications & Consent",
      blocks: [
        {
          type: "p",
          html: "When you submit a quote request, you authorize Vantage Movers and the moving service providers we partner with to contact you at the telephone number(s) and email address you provided - including by phone call, text/SMS message, and email - regarding your move and related offers.",
        },
        {
          type: "p",
          html: "You agree that these communications may be made using automated technology, and that consent is not a condition of any purchase. Message and data rates may apply. You may opt out of marketing calls and texts at any time by replying <strong>STOP</strong> to a text message, by following unsubscribe instructions in emails, or by contacting us directly.",
        },
      ],
    },
    {
      id: "share",
      index: "05",
      title: "How We Share Information",
      blocks: [
        {
          type: "p",
          html: "As a moving broker, sharing your information is essential to arranging your relocation. We may share your information with:",
        },
        {
          type: "ul",
          items: [
            "<strong>Motor carriers and moving partners</strong> - independently owned, FMCSA-authorized carriers and affiliated providers who quote, schedule, and perform your move.",
            "<strong>Service providers</strong> - vendors who support hosting, analytics, communications, and customer-support operations.",
            "<strong>Marketing partners</strong> - where you have engaged with a partner advertisement or where permitted by law.",
            "<strong>Legal and safety</strong> - authorities or third parties when required by law, to enforce agreements, or to protect rights, property, or safety.",
            "<strong>Business transfers</strong> - in connection with a merger, acquisition, financing, or sale of assets.",
          ],
        },
        {
          type: "p",
          html: "The carriers and partners that receive your information are separate business entities responsible for their own privacy practices. We encourage you to review their policies directly.",
        },
      ],
    },
    {
      id: "cookies",
      index: "06",
      title: "Cookies & Tracking Technologies",
      blocks: [
        {
          type: "p",
          html: "We and our partners use cookies, web beacons, pixels, and similar technologies to operate the site, remember preferences, measure performance, and deliver relevant advertising. You can control cookies through browser settings, though disabling them may affect site functionality.",
        },
      ],
    },
    {
      id: "retention",
      index: "07",
      title: "Data Retention",
      blocks: [
        {
          type: "p",
          html: "We retain personal information for as long as necessary to fulfill the purposes described in this policy, including providing services, complying with legal obligations, resolving disputes, and enforcing agreements. When information is no longer needed, we take reasonable steps to delete or de-identify it.",
        },
      ],
    },
    {
      id: "security",
      index: "08",
      title: "Security",
      blocks: [
        {
          type: "p",
          html: "We use reasonable administrative, technical, and physical safeguards designed to protect your personal information. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
        },
      ],
    },
    {
      id: "rights",
      index: "09",
      title: "Your Privacy Rights",
      blocks: [
        {
          type: "p",
          html: "Depending on where you live, you may have rights regarding your personal information, including the right to request access to, correction of, or deletion of your information, and the right to opt out of certain uses. To exercise these rights, contact us using the details below.",
        },
        {
          type: "callout",
          html: "We will not discriminate against you for exercising any of your privacy rights, such as by denying services or providing a different level or quality of service.",
        },
      ],
    },
    {
      id: "dns",
      index: "10",
      title: "Do Not Sell or Share My Personal Information",
      blocks: [
        {
          type: "p",
          html: `We do not sell your personal information for money. Certain sharing with marketing or carrier partners may be considered a "sale" or "sharing" for targeted advertising under some state laws. You may opt out by emailing <a href="${mailto}">${email}</a> with the subject line "Do Not Sell My Personal Information," or by calling <a href="${business.phoneHref}">${business.phoneDisplay}</a>.`,
        },
      ],
    },
    {
      id: "thirdparty",
      index: "11",
      title: "Third-Party Links",
      blocks: [
        {
          type: "p",
          html: "Our website may contain links to third-party websites and services that we do not operate or control. This Privacy Policy does not apply to those sites, and we encourage you to review their policies before providing information.",
        },
      ],
    },
    {
      id: "children",
      index: "12",
      title: "Children's Privacy",
      blocks: [
        {
          type: "p",
          html: "Our services are intended for adults and are not directed to children under 18. We do not knowingly collect personal information from children.",
        },
      ],
    },
    {
      id: "changes",
      index: "13",
      title: "Changes to This Policy",
      blocks: [
        {
          type: "p",
          html: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. Your continued use of the website after changes are posted constitutes acceptance of the updated policy.',
        },
      ],
    },
    {
      id: "contact",
      index: "14",
      title: "Contact Us",
      blocks: [
        { type: "p", html: "If you have questions about this Privacy Policy or wish to exercise your privacy rights, please reach out to us." },
      ],
    },
  ],
  contact: {
    heading: "Vantage Movers - Privacy Team",
    bodyHtml: `Email <a href="${mailto}">${email}</a><br />Call <a href="${business.phoneHref}">${business.phoneDisplay}</a> - ${business.hours}<br />${business.address.join(", ")}`,
    actions: [
      quoteAction,
      { label: "Cancellation Policy", href: "/cancellation", variant: "ghost" },
    ],
  },
};

export const termsConditions: LegalDoc = {
  slug: "terms",
  title: "Terms & Conditions",
  description: `${business.name} Terms & Conditions for use of the website and moving quote services.`,
  lastUpdated: "June 2026",
  heroNote: "General website terms for quote requests and broker services.",
  lead: `These Terms & Conditions govern your use of the ${business.name} website and quote request services. By using our website or submitting a quote request, you agree to these terms.`,
  sections: [
    {
      id: "acceptance",
      index: "01",
      title: "Acceptance of Terms",
      blocks: [{ type: "p", html: "By accessing this website, requesting a quote, or communicating with us through the site, you agree to be bound by these Terms & Conditions and all applicable laws. If you do not agree, do not use the website or submit information through our forms." }],
    },
    {
      id: "services",
      index: "02",
      title: "Services Description",
      blocks: [{ type: "p", html: `${business.name} is a moving broker. We help consumers request moving quotes and coordinate household-goods relocations through independent, FMCSA-authorized motor carriers. We do not physically transport household goods.` }],
    },
    {
      id: "submissions",
      index: "03",
      title: "User Submissions & Accuracy",
      blocks: [{ type: "p", html: "You agree to provide accurate, complete, and current information when submitting a quote request. Estimates, scheduling, and carrier availability may depend on the accuracy of the information you provide, including origin and destination ZIP codes, move date, inventory size, and contact information." }],
    },
    {
      id: "communications",
      index: "04",
      title: "Communications",
      blocks: [{ type: "p", html: `By submitting a quote request, you ask ${business.name} to contact you about your request by phone, email, or other contact details you provide. SMS opt-in is optional and is not required to submit a quote request. If you choose to receive SMS messages, those messages are governed by our <a href="/sms-terms">SMS Terms & Conditions</a>.` }],
    },
    {
      id: "broker",
      index: "05",
      title: "No Guarantee of Estimate / Broker Disclosure",
      blocks: [
        { type: "p", html: business.brokerDisclaimer },
        { type: "p", html: "Any estimate provided through the website is for informational purposes only and is not a guaranteed final price. Final charges may vary based on carrier tariffs, actual services requested, inventory, access conditions, packing needs, storage, timing, and other move-specific factors." },
      ],
    },
    {
      id: "liability",
      index: "06",
      title: "Limitation of Liability",
      blocks: [{ type: "p", html: `${business.name} will not be liable for indirect, incidental, consequential, special, punitive, or exemplary damages arising from your use of the website, quote tools, or communications with us. Our liability for any claim related to the website or quote request process is limited to the amount you paid directly to us, if any, for the specific service giving rise to the claim.` }],
    },
    {
      id: "law",
      index: "07",
      title: "Governing Law",
      blocks: [{ type: "p", html: "These Terms & Conditions are governed by the laws of the State of Florida, without regard to conflict-of-law rules." }],
    },
    {
      id: "contact",
      index: "08",
      title: "Contact Information",
      blocks: [{ type: "p", html: `Questions about these Terms & Conditions may be directed to ${business.name} at ${contactLine}` }],
    },
  ],
  contact: {
    heading: `Contact ${business.name}`,
    bodyHtml: `Phone: <a href="${business.phoneHref}">${business.phoneDisplay}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${business.address.join(", ")}`,
    actions: [quoteAction, { label: "Privacy Policy", href: "/privacy", variant: "ghost" }],
  },
};

export const smsPrivacyPolicy: LegalDoc = {
  slug: "sms-privacy",
  title: "SMS Privacy Policy",
  description: `${business.name} SMS Privacy Policy - how we collect, use, and protect information for our SMS program.`,
  lastUpdated: "June 2026",
  heroNote: "This policy applies specifically to SMS messages from our moving quote program.",
  lead: `${business.name} sends SMS messages only to customers who opt in on our website quote form. This SMS Privacy Policy explains how we use mobile numbers and SMS consent information for quote requests, scheduling updates, appointment reminders, service updates, and customer support.`,
  sections: [
    {
      id: "overview",
      index: "01",
      title: "Overview",
      blocks: [{ type: "p", html: `This SMS Privacy Policy applies to the ${business.name} SMS Program. It supplements our general <a href="/privacy">Privacy Policy</a> and describes privacy practices that apply to text messaging consent and communications.` }],
    },
    {
      id: "collect",
      index: "02",
      title: "Information We Collect",
      blocks: [{ type: "ul", items: ["Your mobile phone number.", "Your SMS opt-in status and the date, time, page, or form where consent was submitted.", "Quote request details you provide, such as your name, email, pickup ZIP, destination ZIP, move date, and move size.", "SMS communication records, including delivery status, replies, opt-out requests, and support requests."] }],
    },
    {
      id: "use",
      index: "03",
      title: "How We Use Your Information",
      blocks: [{ type: "ul", items: ["To respond to your moving quote request.", "To send appointment scheduling messages, appointment reminders, service updates, and customer support messages.", "To manage your SMS opt-in, opt-out, and help requests.", "To maintain compliance records for carrier and messaging-program requirements.", "To protect our services, prevent abuse, and comply with legal obligations."] }],
    },
    {
      id: "sms",
      index: "04",
      title: "SMS Communications",
      blocks: [
        { type: "p", html: `If you opt in, ${business.name} may send SMS messages about your moving quote request, scheduling updates, appointment reminders, service updates, and customer support. Message frequency may vary based on your move request and service needs, up to 4 messages per month. Message and data rates may apply.` },
        { type: "p", html: `You can reply <strong>STOP</strong> to unsubscribe from SMS messages at any time. You can reply <strong>HELP</strong> for assistance or contact us at <a href="${business.phoneHref}">${business.phoneDisplay}</a> or <a href="${mailto}">${email}</a>. SMS consent is optional and is not required to submit a quote request.` },
      ],
    },
    {
      id: "sharing",
      index: "05",
      title: "Information Sharing",
      blocks: [
        { type: "p", html: "We do not sell or share mobile information or SMS consent data with third parties for their marketing or promotional purposes. SMS consent is not shared with third parties or affiliates for marketing purposes." },
        { type: "p", html: "We may share information with service providers that help us operate our website, process quote requests, deliver SMS messages, provide customer support, maintain security, or comply with legal obligations. These providers are permitted to use the information only to provide services to us." },
      ],
    },
    {
      id: "security",
      index: "06",
      title: "Data Security",
      blocks: [{ type: "p", html: "We use reasonable safeguards designed to protect SMS consent records and mobile information. No method of transmission or storage is completely secure, but we work to protect your information from unauthorized access, use, or disclosure." }],
    },
    {
      id: "rights",
      index: "07",
      title: "Your Rights",
      blocks: [{ type: "ul", items: ["You may opt out of SMS messages at any time by replying <strong>STOP</strong>.", "You may request assistance by replying <strong>HELP</strong> or contacting us directly.", "You may ask us to update, correct, or delete your contact information, subject to legal and operational requirements.", "You may contact us with questions about how your SMS consent information is used."] }],
    },
    {
      id: "contact",
      index: "08",
      title: "Contact Information",
      blocks: [{ type: "p", html: `For questions about this SMS Privacy Policy or our SMS program, contact ${business.name} at ${contactLine}` }],
    },
  ],
  contact: {
    heading: `${business.name} SMS Support`,
    bodyHtml: `Phone: <a href="${business.phoneHref}">${business.phoneDisplay}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${business.address.join(", ")}`,
    actions: [quoteAction, { label: "SMS Terms", href: "/sms-terms", variant: "ghost" }],
  },
};

export const smsTerms: LegalDoc = {
  slug: "sms-terms",
  title: "SMS Terms & Conditions",
  description: `${business.name} SMS Terms & Conditions for the Vantage Movers SMS Program.`,
  lastUpdated: "June 2026",
  heroNote: "Terms for SMS messages related to moving quote requests and support.",
  lead: `These SMS Terms & Conditions apply to the ${business.name} SMS Program. By opting in to receive SMS messages, you agree to the terms below.`,
  sections: [
    { id: "program", index: "01", title: "Program Name", blocks: [{ type: "p", html: `${business.name} SMS Program` }] },
    { id: "description", index: "02", title: "Description", blocks: [{ type: "p", html: `${business.name} sends SMS messages to customers who opt in on our website quote form. Messages relate to moving quote requests, appointment scheduling, appointment reminders, service updates, and customer support.` }] },
    { id: "frequency", index: "03", title: "Message Frequency", blocks: [{ type: "p", html: "Up to 4 messages per month. Message frequency may vary based on your move request and service needs." }] },
    { id: "costs", index: "04", title: "Costs", blocks: [{ type: "p", html: "Message and data rates may apply." }] },
    { id: "optout", index: "05", title: "Opt-Out", blocks: [{ type: "p", html: "Reply <strong>STOP</strong> to any message to unsubscribe. After opting out, you will receive a confirmation and no further SMS messages from this program." }] },
    { id: "help", index: "06", title: "Help", blocks: [{ type: "p", html: `Reply <strong>HELP</strong> for assistance or contact us at <a href="${business.phoneHref}">${business.phoneDisplay}</a> or <a href="${mailto}">${email}</a>.` }] },
    { id: "consent", index: "07", title: "Consent", blocks: [{ type: "p", html: "SMS consent is optional and is not required to submit a quote request on our website." }] },
    { id: "privacy", index: "08", title: "Privacy", blocks: [{ type: "p", html: 'See our <a href="/sms-privacy">SMS Privacy Policy</a>.' }] },
    { id: "carrier", index: "09", title: "Carrier Liability", blocks: [{ type: "p", html: "Carriers are not liable for delayed or undelivered messages." }] },
    { id: "contact", index: "10", title: "Contact", blocks: [{ type: "p", html: `${business.name}<br />Phone: <a href="${business.phoneHref}">${business.phoneDisplay}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${business.address.join(", ")}` }] },
  ],
  contact: {
    heading: `${business.name} SMS Support`,
    bodyHtml: `Phone: <a href="${business.phoneHref}">${business.phoneDisplay}</a><br />Email: <a href="${mailto}">${email}</a><br />Address: ${business.address.join(", ")}`,
    actions: [
      { label: "SMS Privacy Policy", href: "/sms-privacy", variant: "gold" },
      { label: "Get a Free Quote", href: "/#quote", variant: "ghost" },
    ],
  },
};

export const cancellationPolicy: LegalDoc = {
  slug: "cancellation",
  title: "Cancellation Policy",
  description:
    "Vantage Movers Cancellation Policy - broker fee disclosure, refund terms, and how to submit a cancellation request.",
  lastUpdated: "June 5, 2026",
  heroNote: "Please read carefully before requesting a cancellation or refund.",
  lead: "This Cancellation Policy explains the nature of the fee collected by Vantage Movers, how carrier payments work, and the terms that apply to cancellations and refunds. By signing your bill of lading and engaging our services, you acknowledge and agree to the terms below.",
  sections: [
    { id: "brokerfee", index: "01", title: "Broker Fee Disclosure", blocks: [{ type: "p", html: "It has been disclosed that the fee collected by Vantage Movers is a <strong>broker fee</strong>. This is our fee for arranging a fully licensed/insured motor carrier to move and handle your household goods and possessions." }] },
    {
      id: "carrier",
      index: "02",
      title: "Carrier Charges & Payments",
      blocks: [
        { type: "p", html: "The carrier charges will be paid <strong>C.O.D.</strong> (unless arranged in advance to pay by credit or debit card) by you, the customer, to the independently owned carrier in two payments. The first half is due upon pickup and the second half is due upon delivery of your household goods at the intended destination address." },
        { type: "p", html: "Vantage Movers does not participate in the collection of carrier payments, nor do we share in the proceeds of carrier charges." },
      ],
    },
    { id: "separate", index: "03", title: "Separate Transactions", blocks: [{ type: "p", html: "You are aware that these are separate transactions between you and the carrier, which is a different business entity from Vantage Movers." }] },
    {
      id: "nonrefundable",
      index: "04",
      title: "Non-Refundable Broker Fee",
      blocks: [
        { type: "p", html: "Since our fee for service begins immediately, you understand and agree to our broker fee being <strong>non-refundable with no exceptions 72 hours after signing your bill of lading</strong>." },
        { type: "callout", html: "<strong>Important:</strong> Deposits are not refundable outside of the three-day window, if you are within five (5) days of your first scheduled pickup day, or after the mover has begun the physical moving services." },
      ],
    },
    { id: "federal", index: "05", title: "Federal Regulation", blocks: [{ type: "p", html: "In accordance with the U.S. Code <strong>49 CFR § 375.505(h)</strong>, an estimate/order may not be canceled, and deposits are not refundable outside of the three-day window, or if you are within five (5) days of your first scheduled pickup day, or after the mover has begun the physical moving services, including packing, loading, storage, or transportation." }] },
    {
      id: "noncancelable",
      index: "06",
      title: "When Cancellation Is Not Permitted",
      blocks: [
        { type: "p", html: "Services may not be canceled after the customer's property has been loaded on the truck. This includes, but is not limited to, any of the following physical moving services once they have begun:" },
        { type: "ul", items: ["Packing of your household goods", "Loading of your property onto the truck", "Storage of your household goods", "Transportation to and from the pick-up or delivery address"] },
      ],
    },
    { id: "howto", index: "07", title: "How to Cancel", blocks: [{ type: "p", html: `All cancellation requests must be sent in writing to <a href="${mailto}">${email}</a>. For more information, please call us at <a href="${business.phoneHref}">${business.phoneDisplay}</a>.` }] },
  ],
  contact: {
    heading: "Need help with a cancellation?",
    bodyHtml: `Email <a href="${mailto}">${email}</a><br />Call <a href="${business.phoneHref}">${business.phoneDisplay}</a> - ${business.hours}`,
    actions: [
      { label: "Email Support", href: mailto, variant: "gold" },
      { label: "Privacy Policy", href: "/privacy", variant: "ghost" },
    ],
  },
};

export const legalDocs = {
  privacyPolicy,
  termsConditions,
  smsPrivacyPolicy,
  smsTerms,
  cancellationPolicy,
};
