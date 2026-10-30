import type { Testimonial } from "@vantage/api-client";
import { aRouteReviews as copy } from "@/content/a-route";

export async function RouteReviews({
  testimonialsPromise,
}: {
  testimonialsPromise: Promise<Testimonial[]>;
}) {
  const items = (await testimonialsPromise)
    .filter((item) => item.published)
    .slice(0, 3);
  if (!items.length) return <p>{copy.unavailable}</p>;
  return items.map((item) => (
    <figure className="route-review-card" key={item.id}>
      <div className="route-review-meta">
        <span role="img" aria-label={`${item.rating || 5} out of 5 stars`}>
          {"★".repeat(Math.max(1, Math.min(5, Math.round(item.rating || 5))))}
        </span>
        {item.source && (
          <span className="route-review-source">{item.source}</span>
        )}
      </div>
      <blockquote>“{item.review_text}”</blockquote>
      <figcaption>
        <span className="route-review-avatar">
          {(item.reviewer_name || copy.customer)
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </span>
        {item.reviewer_name || copy.customer}
      </figcaption>
    </figure>
  ));
}
