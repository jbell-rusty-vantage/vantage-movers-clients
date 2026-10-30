import Image from "next/image";
import { aRouteCopy as copy, aRouteImages as images } from "@/content/a-route";

export function RouteServices() {
  return (
    <section id="services" className="route-services-76">
      <div className="wrap route-services-77">
        <div className="route-services-78">
          <div className="route-services-79">
            <span className="route-hero-31">{copy.servicesWhatWeDo}</span>
            <h2 className="route-services-80">
              {copy.servicesHelpingYouMoveWithConfidence}
            </h2>
          </div>
          <p className="route-services-81">
            {copy.servicesVantageDoesnTOwnTrucksWe}
          </p>
        </div>
        <div className="route-services-82">
          <article className="tile route-services-83">
            <div className="route-services-84">
              <span className="route-services-85">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </span>
              <h3 className="route-services-86">
                {copy.servicesLongDistanceMovingCoordinatedStepBy}
              </h3>
              <ul className="route-services-87">
                <li className="route-services-88">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="i route-services-89"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {copy.servicesAccurateDetailedEstimates}
                </li>
                <li className="route-services-88">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="i route-services-89"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {copy.servicesNetworkOfLicensedAndInsuredCarriers}
                </li>
                <li className="route-services-88">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="i route-services-89"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {copy.servicesSupportFromQuoteToDelivery}
                </li>
              </ul>
              <a href="#quote" className="route-services-90">
                {copy.servicesGetALongDistanceQuote}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </a>
            </div>
            <Image
              src={images.highway}
              alt="Moving truck driving a long-distance route"
              className="route-services-91"
              width={515}
              height={367}
              sizes="(max-width: 760px) 100vw, 50vw"
              loading="lazy"
            />
          </article>
          <article className="tile route-services-83">
            <div className="route-services-84">
              <span className="route-services-85">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M8 3l4 6 4-6"></path>
                  <circle cx="12" cy="15" r="6"></circle>
                  <path d="M12 12.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3z"></path>
                </svg>
              </span>
              <h3 className="route-services-86">
                {copy.servicesVeteranMilitaryMoves}
              </h3>
              <ul className="route-services-87">
                <li className="route-services-88">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="i route-services-89"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {copy.servicesPCSAndVeteranRelocations}
                </li>
                <li className="route-services-88">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="i route-services-89"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {copy.servicesWeightTicketsProvidedWhenRequested}
                </li>
                <li className="route-services-88">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="i route-services-89"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {copy.servicesNationwideCoverage}
                </li>
                <li className="route-services-88">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="i route-services-89"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {copy.servicesOrganizedAroundYourTimelineAndOrders}
                </li>
              </ul>
              <a href="#quote" className="route-services-90">
                {copy.servicesPlanAMilitaryMove}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </a>
            </div>
            <Image
              src={images.military}
              alt="A military family preparing for a relocation"
              className="route-services-91"
              width={515}
              height={367}
              sizes="(max-width: 760px) 100vw, 50vw"
              loading="lazy"
            />
          </article>
        </div>
        <div className="route-services-92">
          <a href="#quote" className="tile route-services-93">
            <span className="route-services-94">
              <span className="route-services-95">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M3 12h12M3 12l3-3M3 12l3 3"></path>
                  <circle cx="18" cy="12" r="3"></circle>
                </svg>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-header-5"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
            <span className="route-services-96">
              {copy.servicesLongDistanceMoving}
            </span>
            <span className="route-services-97">
              {copy.servicesStateToStateMovesArrangedWith}
            </span>
          </a>
          <a href="#quote" className="tile route-services-93">
            <span className="route-services-94">
              <span className="route-services-95">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"></path>
                </svg>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-header-5"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
            <span className="route-services-96">
              {copy.servicesPackingServices}
            </span>
            <span className="route-services-97">
              {copy.servicesPackingLoadingAndUnloadingForEveryday}
            </span>
          </a>
          <a href="#quote" className="tile route-services-93">
            <span className="route-services-94">
              <span className="route-services-95">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M3 21V9l9-5 9 5v12M7 21v-8h10v8M7 17h10"></path>
                </svg>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-header-5"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
            <span className="route-services-96">
              {copy.servicesStorageOptions}
            </span>
            <span className="route-services-97">
              {copy.servicesClimateControlledStorageForAFew}
            </span>
          </a>
          <a href="#quote" className="tile route-services-93">
            <span className="route-services-94">
              <span className="route-services-95">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M5 16l1.5-5a2 2 0 0 1 1.9-1.5h7.2a2 2 0 0 1 1.9 1.5L19 16M4 16h16v3H4zM7 19v1.5M17 19v1.5"></path>
                </svg>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-header-5"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
            <span className="route-services-96">
              {copy.servicesAutoTransport}
            </span>
            <span className="route-services-97">
              {copy.servicesOpenAndEnclosedVehicleTransportAlongside}
            </span>
          </a>
          <a href="#quote" className="tile route-services-93">
            <span className="route-services-94">
              <span className="route-services-95">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"></path>
                </svg>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-header-5"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
            <span className="route-services-96">
              {copy.servicesSeniorMoving}
            </span>
            <span className="route-services-97">
              {copy.servicesPatientStepByStepSupportFor}
            </span>
          </a>
          <a href="#quote" className="tile route-services-93">
            <span className="route-services-94">
              <span className="route-services-95">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3"></path>
                </svg>
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="i route-header-5"
              >
                <path d="M7 17L17 7M9 7h8v8"></path>
              </svg>
            </span>
            <span className="route-services-96">
              {copy.servicesCommercialOfficeMoving}
            </span>
            <span className="route-services-97">
              {copy.servicesCommercialAndOfficeRelocationsCoordinatedEnd}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
