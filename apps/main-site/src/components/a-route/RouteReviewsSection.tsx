import { aRouteCopy as copy } from "@/content/a-route";
import { Suspense } from "react";
import type { Testimonial } from "@vantage/api-client";
import { RouteReviews } from "./RouteReviews";

export function RouteReviewsSection({
  testimonialsPromise,
}: {
  testimonialsPromise: Promise<Testimonial[]>;
}) {
  return (
    <section id="reviews" className="route-howitworks-109">
      <div className="wrap route-services-77">
        <div className="route-reviewssection-143">
          <div className="route-reviewssection-144">
            <span className="route-hero-31">{copy.reviewssectionReviews}</span>
            <h2 className="route-services-80">
              {copy.reviewssectionHearFromCustomersWeVeHelped}
            </h2>
          </div>
          <div className="route-reviewssection-145">
            <span className="route-reviewssection-146">
              {copy.reviewssection48}
            </span>
            <span className="route-reviewssection-147">
              <span
                aria-label="4.8 out of 5 stars"
                role="img"
                className="route-reviewssection-148"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z"
                    fill="#0f1a17"
                  ></path>
                </svg>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z"
                    fill="#0f1a17"
                  ></path>
                </svg>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z"
                    fill="#0f1a17"
                  ></path>
                </svg>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z"
                    fill="#0f1a17"
                  ></path>
                </svg>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="partstar">
                      <stop offset="80%" stopColor="#0f1a17"></stop>
                      <stop offset="80%" stopColor="#c9cfc8"></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8L3.5 9.7l5.9-.9z"
                    fill="url(#partstar)"
                  ></path>
                </svg>
              </span>
              <span className="route-hero-31">
                {copy.reviewssection530CustomerReviews}
              </span>
            </span>
          </div>
        </div>
        <div className="route-whyvantage-123">
          <Suspense fallback={<p>Loading customer reviews…</p>}>
            <RouteReviews testimonialsPromise={testimonialsPromise} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
