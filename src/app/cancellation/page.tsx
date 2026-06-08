import type { Metadata } from "next";
import { cancellationPolicy } from "@/content/legal/cancellation";
import { PolicyPage } from "@/components/policy/PolicyPage";

export const metadata: Metadata = {
  title: `${cancellationPolicy.title} — Vantage Movers`,
  description: cancellationPolicy.description,
};

export default function Cancellation() {
  return <PolicyPage doc={cancellationPolicy} />;
}
