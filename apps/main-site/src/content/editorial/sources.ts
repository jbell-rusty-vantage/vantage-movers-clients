import type { EditorialClaim, EditorialSource } from "./types";

const check = { checkedAt: "2026-11-12", checkedBy: "Codex source check" };

/** Source checks do not grant business, legal, translation or publication approval. */
export const editorialSources: EditorialSource[] = [
  {
    id: "fmcsa-roles", title: "FMCSA: Movers vs. Brokers",
    url: "https://www.fmcsa.dot.gov/protect-your-move/movers-vs-brokers",
    section: "What's the difference between a mover and broker? / What do I do if I am working with a broker?",
    scope: "United States interstate household goods moves", ...check,
    recheckTrigger: "Before publication, a federal rule change or a change to role/estimate wording.",
    finding: "The broker arranges transportation and is not the transporting company. Interstate brokers and carriers require FMCSA registration. The official page was updated April 27, 2026.",
    limitation: "General federal guidance does not establish Vantage's current registration, specific carrier assignment or service availability.",
  },
  {
    id: "fmcsa-checklist", title: "FMCSA: Moving Checklist",
    url: "https://www.fmcsa.dot.gov/protect-your-move/moving-checklist",
    section: "Planning: Before You Move / Moving Day / Delivery Day",
    scope: "United States interstate household goods moves", ...check,
    recheckTrigger: "Before publication or changes to estimate, paperwork, protection or delivery guidance.",
    finding: "The checklist addresses comparison of estimates and services, registration, contact arrangements, reading documents, inventory and delivery concerns. The page was updated November 4, 2024.",
    limitation: "The new checklist and fictional worked example are original editorial planning aids, not FMCSA forms or actual quotes.",
  },
  {
    id: "fmcsa-lookup", title: "FMCSA: Search for a Registered Mover",
    url: "https://www.fmcsa.dot.gov/protect-your-move/search-mover",
    section: "Search for a Registered Mover / Information you can review",
    scope: "United States interstate moving businesses", ...check,
    recheckTrigger: "Before publication or a change to the registration lookup destination.",
    finding: "The federal lookup provides company location, contact, business type, registration, complaint and safety information.",
    limitation: "No Vantage entity lookup or carrier-specific registration result is claimed by this check.",
  },
  {
    id: "vantage-broker-baseline", title: "Vantage existing consumer information and broker disclosure",
    url: "https://www.vantagehomemovers.com/consumer-information",
    section: "Existing production-control copy: apps/main-site/src/lib/content.ts business.brokerDisclaimer and hero.brokerNote at 145a4dd",
    scope: "Vantage interstate household goods coordination", ...check,
    recheckTrigger: "Operations/legal owner review before publication; business identity or workflow changes.",
    finding: "The current repository control says Vantage is a household goods broker and does not transport household goods; it arranges transportation through motor carriers.",
    limitation: "Internal baseline inspected, not independent current-authority verification or approval of new copy. No new USDOT/MC claim, date guarantee or capacity claim is introduced.",
  },
  {
    id: "wisconsin-new-residents", title: "Wisconsin DOT: New residents",
    url: "https://wisconsindot.gov/Pages/dmv/vehicles/title-plates/new-res-default.aspx",
    section: "Welcome to Wisconsin / Obtain a Wisconsin Driver License or ID / Apply online for a vehicle title and get new plates",
    scope: "Wisconsin resident driver/ID and vehicle processes", ...check,
    recheckTrigger: "Before publication, changed DMV processes or any proposed deadline/eligibility statement.",
    finding: "The state page links to driver license/ID and vehicle title/plate processes and Spanish information.",
    limitation: "Extraction contained partial unavailable blocks. No legal deadline, fee, residency test or eligibility rule is reproduced; readers are directed to current official instructions.",
  },
  {
    id: "madison-student-move", title: "City of Madison: August Student Move-Out",
    url: "https://www.cityofmadison.com/streets/trash-recycling/move-out-clean-outs/august-student-move-out",
    section: "Student move-out area / Work Orders and the Move Out / Electronics / Collection Guidelines",
    scope: "Defined Madison, Wisconsin student move-out area and applicable seasonal dates", ...check,
    recheckTrigger: "Before every August season, new annual notice, area map or collection policy change.",
    finding: "The page describes special 2026 seasonal collection arrangements limited by area, dates, property and item type, with separate electronics instructions.",
    limitation: "The 2026 dates are historical for future moves and are deliberately not repeated as an upcoming schedule. No inference that every Madison address is in scope.",
  },
  {
    id: "madison-lakeway", title: "City of Madison: Madison LakeWay / Lake Monona Waterfront",
    url: "https://www.cityofmadison.com/parks/projects/madison-lakeway-lake-monona-waterfront",
    section: "Project Updates: October 15, 2026",
    scope: "Madison LakeWay planned waterfront improvements", ...check,
    recheckTrigger: "New project update, construction start, access notice, or immediately before publication.",
    finding: "The October 15 update says project bidding is underway; construction is anticipated for June 2027 pending contract award. Improvements are future works, not currently completed attractions.",
    limitation: "This is a dated project status, not assurance of future schedule or present access.",
  },
  {
    id: "madison-washington-manor", title: "City of Madison Parks: Washington Manor Park",
    url: "https://www.cityofmadison.com/parks/find-a-park/park.cfm?id=1369",
    section: "At this Park: Basketball / Playground",
    scope: "Washington Manor Park, Madison, Wisconsin", ...check,
    recheckTrigger: "Before publication, park closures or amenity changes; visitor should check access before outing.",
    finding: "Official park listing includes a basketball court and playground.",
    limitation: "The listing is not a live opening-status or accessibility guarantee.",
  },
];

const serviceIds = ["long-distance-moving", "residential-moving", "corporate-office-moving", "military-moving", "senior-moving", "packing-services", "storage-options", "auto-transport"];

export const editorialClaims: EditorialClaim[] = [
  {
    id: "broker-carrier-roles", entryIds: [...serviceIds, "who-handles-my-move", "comparing-moving-estimates"], locales: ["en", "es"],
    wording: { en: "The assigned carrier, rather than Vantage, performs the transportation.", es: "El transportista asignado, y no Vantage, realiza el transporte." },
    sourceIds: ["fmcsa-roles", "vantage-broker-baseline"], status: "internal-baseline", reviewer: null,
    recheckTrigger: "Business and legal review before publication, or a role/workflow change.",
  },
  {
    id: "compare-scope-and-terms", entryIds: ["comparing-moving-estimates", "long-distance-moving", "storage-options", "packing-services", "before-the-inventory-call", "who-handles-my-move"], locales: ["en", "es"],
    wording: { en: "Compare both costs and services and check the companies' registration.", es: "Compare costos y servicios y compruebe el registro de las empresas." },
    sourceIds: ["fmcsa-checklist", "fmcsa-lookup"], status: "source-checked", reviewer: null,
    recheckTrigger: "Changed official guidance or changes to consumer-document wording.",
  },
  {
    id: "registration-not-assignment", entryIds: [...serviceIds, "who-handles-my-move", "comparing-moving-estimates"], locales: ["en", "es"],
    wording: { en: "Check the broker and carrier separately; a directory listing does not establish shipment assignment.", es: "Consulte por separado al intermediario y al transportista; un directorio no confirma la asignación a su envío." },
    sourceIds: ["fmcsa-lookup", "fmcsa-roles"], status: "source-checked", reviewer: null,
    recheckTrigger: "Lookup or carrier-identification flow changes.",
  },
  {
    id: "wisconsin-official-process-links", entryIds: ["wisconsin", "madison-wisconsin"], locales: ["en", "es"],
    wording: { en: "Wisconsin DOT's new-resident page links to driver license or ID information and vehicle title and plate instructions.", es: "La página de Wisconsin DOT para nuevos residentes enlaza información sobre licencia o identificación y trámites de título y placas del vehículo." },
    sourceIds: ["wisconsin-new-residents"], status: "source-checked", reviewer: null,
    recheckTrigger: "DMV page/process change; before adding deadlines or eligibility claims.",
  },
  {
    id: "madison-seasonal-area", entryIds: ["madison-wisconsin"], locales: ["en", "es"],
    wording: { en: "The special arrangements apply to the defined area and dates, not automatically to every Madison address.", es: "Esas medidas corresponden a una zona y unas fechas concretas; no se aplican automáticamente a todos los domicilios de Madison." },
    sourceIds: ["madison-student-move"], status: "source-checked", reviewer: null,
    recheckTrigger: "Each annual student move-out notice or area/policy revision.",
  },
  {
    id: "lakeway-future-work", entryIds: ["madison-wisconsin"], locales: ["en", "es"],
    wording: { en: "The city's October 15, 2026 update anticipated construction in June 2027, subject to contract award; planned improvements are not open attractions.", es: "La actualización del 15 de octubre de 2026 preveía obras en junio de 2027 sujetas a adjudicación; las mejoras proyectadas no se presentan como abiertas." },
    sourceIds: ["madison-lakeway"], status: "source-checked", reviewer: null,
    recheckTrigger: "Every project update, construction/access change and pre-publication check.",
  },
  {
    id: "washington-manor-amenities", entryIds: ["madison-wisconsin"], locales: ["en", "es"],
    wording: { en: "Washington Manor Park is listed by Madison Parks with a playground and basketball court.", es: "Madison Parks incluye Washington Manor Park con zona de juegos y cancha de baloncesto." },
    sourceIds: ["madison-washington-manor"], status: "source-checked", reviewer: null,
    recheckTrigger: "Park listing or access changes; check before publication and visit.",
  },
  {
    id: "unverified-offerings-withheld", entryIds: serviceIds, locales: ["en", "es"],
    wording: { en: "Climate control, unrestricted storage access, open/enclosed auto capacity, military weight-ticket availability, dates, discounts and specialized care are not promised.", es: "No se prometen climatización, acceso libre a almacén, modalidades de transporte de autos, comprobantes militares, fechas, descuentos ni cuidados especializados." },
    sourceIds: [], status: "withheld", reviewer: null,
    recheckTrigger: "Named operations owner supplies approved service-specific evidence and wording.",
  },
];
