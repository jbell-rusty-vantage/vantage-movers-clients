import { LandingPage } from "@/components/LandingPage";
import { PARTNERS } from "@/content/partners";
import { getTestimonials } from "@/lib/vantage/server";

export default async function TbmPrimesLanding() {
  const testimonials = await getTestimonials();
  return <LandingPage source={PARTNERS["tbm-primes"]} testimonials={testimonials} />;
}
