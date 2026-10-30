import Image from "next/image";
import { aRouteCopy as copy, aRouteImages as images } from "@/content/a-route";
import { business } from "@/lib/content";
import { Suspense } from "react";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";

export function RouteHero() {
  return (
    <section id="quote" className="route-hero-11">
      <div className="wrap route-hero-12">
        <div className="route-hero-13">
          <div className="route-hero-14">
            <span className="route-hero-15"></span>
            <span>
              {copy.heroLicensedInterstateMovingBroker}
              <span className="route-hero-16">{copy.heroMCBusinessMc}</span>
            </span>
          </div>
          <h1 className="route-hero-17">{copy.heroYourWholeMoveCoordinated}</h1>
          <p className="route-hero-18">
            {copy.heroAffordableLongDistanceMovingForResidential}
          </p>
          <div className="route-hero-19">
            <Suspense fallback={<p>Loading quote form…</p>}>
              <div className="route-quote">
                <QuoteWizard variant="panel" formId="a-route-hero" />
              </div>
            </Suspense>

            <div className="route-hero-20">
              <span className="route-hero-21">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i route-hero-22"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                </svg>
                {copy.heroFreeEstimate}
              </span>
              <span className="route-hero-21">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i route-hero-22"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                </svg>
                {copy.heroBindingEstimates}
              </span>
              <span className="route-hero-21">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i route-hero-22"
                >
                  <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                </svg>
                {copy.heroNoHiddenFees}
              </span>
              <a href={business.phoneHref} className="route-hero-23">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 1.5-2 2-4 2"></path>
                </svg>
                {copy.heroSpeakWithACoordinator}
              </a>
            </div>
            <p className="route-hero-24">
              {copy.heroVantageMoversIsALicensedInterstate}
              <span className="route-hero-16">
                {copy.heroDOTBusinessDotMCBusinessMc}
              </span>
            </p>
          </div>
        </div>

        <div className="route-hero-25">
          <Image
            src={images.highway}
            alt="A moving truck on an interstate highway"
            className="route-hero-26"
            width={515}
            height={367}
            sizes="(max-width: 760px) 100vw, 50vw"
            loading="eager"
            fetchPriority="high"
          />
          <div className="route-hero-27">
            <div className="route-hero-28">
              <div className="route-hero-29">
                <div className="route-hero-30">{copy.heroMoveFile}</div>
                <div className="route-hero-31">{copy.heroFL33426TX78701}</div>
              </div>
              <span className="route-hero-32">{copy.heroExample}</span>
            </div>
            <ol aria-label="Example move timeline" className="route-hero-33">
              <li className="route-hero-34">
                <div className="route-hero-35">
                  <span className="route-hero-36">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="i route-hero-37"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span className="route-hero-38"></span>
                </div>
                <div className="route-hero-39">
                  <span className="route-hero-40">
                    {copy.heroInventoryReviewed}
                  </span>
                  <span className="route-hero-41">{copy.heroDone}</span>
                </div>
              </li>
              <li className="route-hero-34">
                <div className="route-hero-35">
                  <span className="route-hero-36">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="i route-hero-37"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span className="route-hero-38"></span>
                </div>
                <div className="route-hero-39">
                  <span className="route-hero-40">
                    {copy.heroBindingEstimateSent}
                  </span>
                  <span className="route-hero-41">{copy.heroDoneLabel}</span>
                </div>
              </li>
              <li className="route-hero-34">
                <div className="route-hero-35">
                  <span className="route-hero-36">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="i route-hero-37"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span className="route-hero-42"></span>
                </div>
                <div className="route-hero-39">
                  <span className="route-hero-43">
                    <span className="route-hero-40">
                      {copy.heroLicensedCarrierAssigned}
                    </span>
                    <span className="route-hero-44">
                      {copy.heroFMCSAAuthorizedInsured}
                    </span>
                  </span>
                  <span className="route-hero-41">{copy.heroDoneLabel2}</span>
                </div>
              </li>
              <li aria-current="step" className="route-hero-34">
                <div className="route-hero-35">
                  <span className="route-hero-45">
                    <span className="route-hero-46"></span>
                  </span>
                  <span className="route-hero-47"></span>
                </div>
                <div className="route-hero-48">
                  <div className="route-hero-49">
                    <span className="route-hero-43">
                      <span className="route-hero-50">
                        {copy.heroPickupWindow}
                      </span>
                      <span className="route-hero-51">{copy.heroNOV1214}</span>
                    </span>
                    <span className="route-hero-52">{copy.heroCurrent}</span>
                  </div>
                </div>
              </li>
              <li className="route-hero-34">
                <div className="route-hero-35">
                  <span className="route-hero-53"></span>
                </div>
                <div className="route-hero-54">
                  <span className="route-hero-55">{copy.heroDelivery}</span>
                  <span className="route-hero-56">{copy.heroPending}</span>
                </div>
              </li>
            </ol>
            <div className="route-hero-57">
              <span className="route-hero-58">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="i"
                >
                  <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 1.5-2 2-4 2"></path>
                </svg>
              </span>
              <span className="route-hero-59">
                <span className="route-hero-60">
                  {copy.heroOneCoordinatorQuoteToDelivery}
                </span>
                <span className="route-hero-44">{copy.heroMonSun8am12am}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
