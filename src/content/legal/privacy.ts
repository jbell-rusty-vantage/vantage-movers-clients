import type { LegalDoc } from "@/types";
import { site, telHref } from "@/content/site";

const email = site.email;
const mailto = `mailto:${email}`;
const tel = telHref();

export const privacyPolicy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  description:
    "Vantage Movers Privacy Policy — how we collect, use, share, and protect your personal information.",
  lastUpdated: "June 5, 2026",
  heroNote:
    "Your privacy matters to us. This policy explains how we handle your information.",
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
            "<strong>Contact details</strong> — your name, telephone number(s), email address, and physical addresses.",
            "<strong>Move details</strong> — origin and destination locations, preferred move dates, inventory size, type of move (residential, office, military, auto transport), and special handling requirements.",
            "<strong>Communications</strong> — records of your calls, chats, emails, text messages, and form submissions with us or our partners.",
            "<strong>Technical data</strong> — IP address, browser type, device identifiers, pages visited, referring URLs, and similar usage information collected automatically.",
            "<strong>Marketing data</strong> — the source of your inquiry and your interactions with our advertisements or marketing partners.",
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
            "Arrange and coordinate your relocation with one or more licensed, insured motor carriers.",
            "Respond to your inquiries and provide customer support before, during, and after your move.",
            "Send you service updates, scheduling information, and transactional messages.",
            "Send you offers, promotions, and marketing communications where permitted by law and consistent with your consent.",
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
          html: "When you submit a quote request, you authorize Vantage Movers and the moving service providers we partner with to contact you at the telephone number(s) and email address you provided — including by phone call, text/SMS message, and email — regarding your move and related offers.",
        },
        {
          type: "p",
          html: "You agree that these communications may be made using automated technology, and that consent is not a condition of any purchase. Message and data rates may apply. You may opt out of marketing calls and texts at any time by replying <strong>STOP</strong> to a text message, by following the unsubscribe instructions in our emails, or by contacting us directly. You may continue to receive transactional or service-related messages about an active move even after opting out of marketing communications.",
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
            "<strong>Motor carriers and moving partners</strong> — the independently owned, FMCSA-authorized carriers and affiliated providers who quote, schedule, and perform your move.",
            "<strong>Service providers</strong> — vendors who support our operations, such as hosting, analytics, communications, and customer-support platforms.",
            "<strong>Marketing partners</strong> — where you have engaged with a partner's advertisement or where permitted by law.",
            "<strong>Legal and safety</strong> — authorities or third parties when required by law, to enforce our agreements, or to protect the rights, property, or safety of any person.",
            "<strong>Business transfers</strong> — in connection with a merger, acquisition, financing, or sale of assets.",
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
          html: "We and our partners use cookies, web beacons, pixels, and similar technologies to operate the site, remember your preferences, measure performance, and deliver relevant advertising. You can control cookies through your browser settings, though disabling them may affect how the site functions. We honor recognized opt-out preference signals where required by applicable law.",
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
          html: "We retain personal information for as long as necessary to fulfill the purposes described in this policy, including providing services, complying with our legal and regulatory obligations, resolving disputes, and enforcing our agreements. When information is no longer needed, we take reasonable steps to delete or de-identify it.",
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
          html: "We use reasonable administrative, technical, and physical safeguards designed to protect your personal information. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security. You are responsible for keeping your account and contact information accurate and secure.",
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
          html: "Depending on where you live, you may have rights regarding your personal information, including the right to request access to, correction of, or deletion of your information, and the right to opt out of certain uses. To exercise any of these rights, contact us using the details below. We will respond consistent with applicable law and may need to verify your identity before fulfilling a request.",
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
          html: `We do not sell your personal information for money. Certain sharing of information with our marketing or carrier partners may be considered a "sale" or "sharing" for targeted advertising under some state laws. You may opt out of such sharing at any time by emailing us at <a href="${mailto}">${email}</a> with the subject line "Do Not Sell My Personal Information," or by calling <a href="${tel}">${site.phone}</a>.`,
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
          html: "Our website may contain links to third-party websites and services that we do not operate or control. This Privacy Policy does not apply to those sites. We are not responsible for the content or privacy practices of any third party, and we encourage you to review their policies before providing any information.",
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
          html: "Our services are intended for adults and are not directed to children under 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.",
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
          html: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. Material changes will be posted on this page, and your continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
        },
      ],
    },
    {
      id: "contact",
      index: "14",
      title: "Contact Us",
      blocks: [
        {
          type: "p",
          html: "If you have questions about this Privacy Policy or wish to exercise your privacy rights, please reach out to us:",
        },
      ],
    },
  ],
  contact: {
    heading: "Vantage Movers — Privacy Team",
    bodyHtml: `Email <a href="${mailto}">${email}</a><br />Call <a href="${tel}">${site.phone}</a> · ${site.hours}<br />${site.address.line1}, ${site.address.line2}`,
    actions: [
      { label: "Get a Free Quote", href: "/#quote", variant: "gold", icon: "arrowRight" },
      { label: "Cancellation Policy", href: "/cancellation", variant: "ghost" },
    ],
  },
};
