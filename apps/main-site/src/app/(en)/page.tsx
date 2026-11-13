import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { business } from "@/lib/content";
import { siteDescription } from "@/lib/site";
import { getMainSiteTestimonials } from "@vantage/api-client";
import { entriesFor } from "@/lib/publication";

export const metadata: Metadata = {
  title: `${business.name} | Nationwide Long-Distance Moving Broker`,
  description: siteDescription,
  alternates: {
    canonical: "/",
    languages: entriesFor("es").length ? { en: "/", es: "/es" } : { en: "/" },
  },
};

export default function Home() {
  const testimonialsPromise = getMainSiteTestimonials({ limit: 100 })
    .then((items) => items.filter((item) => item.published))
    .catch((error) => {
      console.error("[main-site testimonials]", error);
      return [];
    });

  return <HomePage testimonialsPromise={testimonialsPromise} />;
}
