import type { NavLink } from "@/types";

/** Footer "Quick Links" column. Routes point at real Next.js paths. */
export const quickLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "SMS Privacy Policy", href: "/sms-privacy" },
  { label: "SMS Terms", href: "/sms-terms" },
  { label: "Cancellation Policy", href: "/cancellation" },
  { label: "Your Rights & Responsibilities", href: "/your-rights", newTab: true },
  { label: "Ready To Move", href: "/ready-to-move", newTab: true },
  { label: "Do Not Sell My Personal Information", href: "/privacy#dns" },
];
