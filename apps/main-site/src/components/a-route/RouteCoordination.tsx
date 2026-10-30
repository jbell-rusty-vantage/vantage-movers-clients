import Image from "next/image";
import { aRouteCopy as copy, aRouteImages as images } from "@/content/a-route";
import { business } from "@/lib/content";

export function RouteCoordination() {
  return (
    <section id="coordination" className="route-services-76">
      <div className="wrap route-coordination-129">
        <div className="route-coordination-130">
          <Image
            src={images.coordinator}
            alt="A Vantage coordinator on a headset call with a customer"
            className="route-coordination-131"
            width={515}
            height={416}
            sizes="(max-width: 760px) 100vw, 50vw"
            loading="lazy"
          />
          <div className="route-coordination-132">
            <span className="route-coordination-133"></span>
            <span className="route-coordination-134">
              <span className="route-hero-60">
                {copy.coordinationCoordinatorsOnTheLine}
              </span>
              <span className="route-coordination-135">
                {copy.coordinationMonSun8am12am}
              </span>
            </span>
          </div>
        </div>
        <div className="route-coordination-136">
          <span className="route-hero-31">
            {copy.coordinationMovingCoordination}
          </span>
          <h2 className="route-services-80">
            {copy.coordinationTrustedMovingSupportFromStartTo}
          </h2>
          <p className="route-coordination-137">
            {copy.coordinationVantageDoesNotOwnTrucksYour}
          </p>
          <ol className="route-coordination-138">
            <li className="route-coordination-139">
              <span className="route-coordination-140">
                {copy.coordination01}
              </span>
              <span className="route-hero-60">
                {copy.coordinationReviewsLocationsSizeDatesAndServices}
              </span>
            </li>
            <li className="route-coordination-139">
              <span className="route-coordination-140">
                {copy.coordination02}
              </span>
              <span className="route-hero-60">
                {copy.coordinationBuildsYourEstimate}
              </span>
            </li>
            <li className="route-coordination-139">
              <span className="route-coordination-140">
                {copy.coordination03}
              </span>
              <span className="route-hero-60">
                {copy.coordinationArrangesALicensedInsuredCarrier}
              </span>
            </li>
            <li className="route-coordination-139">
              <span className="route-coordination-140">
                {copy.coordination04}
              </span>
              <span className="route-hero-60">
                {copy.coordinationStaysWithYouToFinalDelivery}
              </span>
            </li>
          </ol>
          <div className="route-coordination-141">
            <a
              href={business.phoneHref}
              className="btn-l route-coordination-142"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i"
              >
                <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 1.5-2 2-4 2"></path>
              </svg>
              {copy.coordinationSpeakWithACoordinator}
            </a>
            <span className="route-hero-51">
              {copy.coordinationBusinessPhoneDisplay}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
