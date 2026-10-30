import { aRouteCopy as copy } from "@/content/a-route";

export function RouteHowItWorks() {
  return (
    <section id="how" className="route-howitworks-109">
      <div className="wrap route-howitworks-110">
        <div className="route-services-79">
          <span className="route-hero-31">{copy.howitworksHowItWorks}</span>
          <h2 className="route-howitworks-111">
            {copy.howitworksFourStopsFromQuoteToKeys}
          </h2>
        </div>
        <div className="route-howitworks-112">
          <div aria-hidden="true" className="route-line route-howitworks-113">
            <div className="route-draw route-howitworks-114"></div>
            <div className="truck route-howitworks-115">
              <svg width="22" height="22" viewBox="0 0 24 24" className="i">
                <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
            </div>
          </div>
          <ol className="route-howitworks-116">
            <li className="route-howitworks-117">
              <span className="route-howitworks-118">{copy.howitworks01}</span>
              <span className="route-howitworks-119">
                {copy.howitworksRequestAQuote}
              </span>
              <span className="route-howitworks-120">
                {copy.howitworksShareYourZIPCodesMoveDate}
              </span>
            </li>
            <li className="route-howitworks-117">
              <span className="route-howitworks-118">{copy.howitworks02}</span>
              <span className="route-howitworks-119">
                {copy.howitworksSetYourTargetMoveDate}
              </span>
              <span className="route-howitworks-120">
                {copy.howitworksPlansShiftDateChangesAreFree}
              </span>
            </li>
            <li className="route-howitworks-117">
              <span className="route-howitworks-121">{copy.howitworks03}</span>
              <span className="route-howitworks-119">
                {copy.howitworksPrepareForMovingDay}
              </span>
              <span className="route-howitworks-120">
                {copy.howitworksYourCoordinatorConfirmsInventoryServicesAnd}
              </span>
            </li>
            <li className="route-howitworks-117">
              <span className="route-howitworks-122">{copy.howitworks04}</span>
              <span className="route-howitworks-119">
                {copy.howitworksWeCoordinateTheRest}
              </span>
              <span className="route-howitworks-120">
                {copy.howitworksALicensedFMCSAAuthorizedCarrierHandles}
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
