import { JsonLd } from "./JsonLd";
import type { ServicePageContent } from "@/content/services/types";
import { absoluteUrl } from "@/lib/site";
import { business } from "@/lib/content";

export function ServicePageJsonLd({ service }: { service: ServicePageContent }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.navLabel,
        description: service.seo.description,
        url: absoluteUrl(service.path),
        provider: {
          "@type": "Organization",
          name: business.name,
          url: absoluteUrl("/"),
          telephone: business.phoneDisplay,
          identifier: [`USDOT ${business.dot}`, `MC ${business.mc}`],
        },
        areaServed: { "@type": "Country", name: "United States" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: service.locale === "es-US" ? "Inicio" : "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: service.locale === "es-US" ? "Servicios" : "Services", item: absoluteUrl("/#services") },
          { "@type": "ListItem", position: 3, name: service.navLabel, item: absoluteUrl(service.path) },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return <JsonLd data={data} />;
}
