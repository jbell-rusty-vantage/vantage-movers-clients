import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTestimonials } from "@vantage/api-client";
import { spanishServices, getServiceBySlug } from "@/content/services/registry";
import { ServicePage } from "@/components/service-pages/ServicePage";

export function generateStaticParams() { return spanishServices.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug("es-US", slug);
  if (!service) return {};
  return { title: service.seo.title, description: service.seo.description, alternates: { canonical: service.path, languages: { "en-US": service.alternatePath, "es-US": service.path, "x-default": service.alternatePath } }, openGraph: { locale: "es_US", type: "website", title: service.seo.title, description: service.seo.description, url: service.path, images: [{ url: service.hero.desktopImage, alt: service.hero.imageAlt }] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug("es-US", slug);
  if (!service) notFound();
  const testimonials = await getTestimonials({ limit: 12 }).then((items) => items.filter((item) => item.published)).catch(() => []);
  return <ServicePage service={service} testimonials={testimonials} />;
}
