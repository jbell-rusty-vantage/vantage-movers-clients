import { aRouteCopy as copy } from "@/content/a-route";
import { business } from "@/lib/content";

export function RouteLicensing() {
  return (
    <section aria-label="Licensing and pricing" className="route-licensing-98">
      <div className="wrap route-licensing-99">
        <div className="route-licensing-100">
          <span className="route-licensing-101">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="i"
            >
              <path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </span>
          <span className="route-licensing-102">
            {copy.licensingFMCSALicensedBonded}
          </span>
          <span className="route-licensing-103">
            {copy.licensingDOTBusinessDotMCBusinessMc}
          </span>
        </div>
        <p className="route-licensing-104">
          {copy.licensingNoHiddenFeesNoObligations}
          <span className="route-licensing-105">
            {copy.licensingJustHonestPricing}
          </span>
        </p>
        <div className="route-licensing-106">
          <span className="route-licensing-107">
            {copy.licensingTalkToACoordinatorMonSun}
          </span>
          <a href={business.phoneHref} className="btn-o route-licensing-108">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="i"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"></path>
            </svg>
            {copy.licensingBusinessPhoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
