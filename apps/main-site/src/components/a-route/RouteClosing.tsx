import Image from "next/image";
import { aRouteCopy as copy, aRouteImages as images } from "@/content/a-route";
import { business } from "@/lib/content";

export function RouteClosing() {
  return (
    <section aria-label="Request a quote" className="route-closing-165">
      <div className="wrap">
        <div className="route-closing-166">
          <div className="route-closing-167">
            <div className="route-closing-168">
              <span className="route-closing-169">{copy.closingFree}</span>
              <span className="route-closing-169">
                {copy.closingNoObligation}
              </span>
            </div>
            <h2 className="route-services-80">
              {copy.closingPlanningALongDistanceMove}
            </h2>
            <div className="route-coordination-141">
              <a href="#quote" className="btn-o route-closing-170">
                {copy.closingRequestYourMovingQuote}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </a>
              <a href={business.phoneHref} className="btn-l route-closing-171">
                {copy.closingSpeakWithACoordinator}
              </a>
            </div>
          </div>
          <Image
            src={images.truck}
            alt="A moving truck loaded and ready for pickup"
            className="route-closing-172"
            width={459}
            height={263}
            sizes="(max-width: 760px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
