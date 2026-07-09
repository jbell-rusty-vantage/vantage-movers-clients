import { business, faqs, quoteSection } from "@/lib/content";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

const address = {
  "@type": "PostalAddress",
  streetAddress: "1880 N Congress Ave Ste 401A",
  addressLocality: "Boynton Beach",
  addressRegion: "FL",
  postalCode: "33426",
  addressCountry: "US",
};

const organizationId = absoluteUrl("/#organization");

export function HomePageJsonLd() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      "@id": organizationId,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      telephone: business.phoneDisplay,
      email: business.email,
      address,
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "USDOT",
          value: business.dot,
        },
        {
          "@type": "PropertyValue",
          propertyID: "MC",
          value: business.mc,
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: quoteSection.rating.value,
        reviewCount: quoteSection.rating.reviewCount,
      },
      priceRange: "$$",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: siteName,
      url: siteUrl,
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": absoluteUrl("/#faq"),
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return <JsonLd data={structuredData} />;
}
