import { draft } from "./draft";
import { floridaAnchor, northCarolinaAnchor } from "./state-geography";
import type { EditorialEntry } from "./types";

const sourceIds = ["fmcsa-roles", "fmcsa-checklist", "vantage-broker-baseline", "florida-preparedness", "nc-new-resident", "nc-road-conditions", "usps-mail-forwarding"];
const relatedIds = ["florida", "long-distance-moving", "packing-services", "storage-options", "auto-transport", "comparing-moving-estimates"];

export const movingRouteEntries: EditorialEntry[] = [
  draft("en", {
    id: "florida-to-north-carolina", kind: "route", path: "/moving-routes/florida-to-north-carolina", navLabel: "Florida to North Carolina",
    title: "Moving from Florida to North Carolina",
    description: "Close out your Florida home with a clear plan for the other end. From Charlotte and the Triangle to a mountain or coastal address, the details of your North Carolina arrival belong in the conversation from day one.",
    sourceIds, relatedIds,
    geography: {
      origin: { ...floridaAnchor, planningNote: "Departure: confirm the inventory, building access and who handles the Florida handover." }, destination: { ...northCarolinaAnchor, planningNote: "Arrival: confirm keys, unloading access and who receives your North Carolina shipment." }, eyebrow: "Two states. One considered plan.",
      quoteTitle: "Your Florida → North Carolina move",
      quoteDescription: "Tell us your actual Florida pickup and North Carolina destination. Your dates, inventory and access details help shape the next conversation; this guide does not prefill your quote.",
      planningTitle: "Plan the departure and the arrival together",
      planningCards: [
        { title: "Leave Florida with access settled", body: "Confirm your building’s elevator, gate and loading instructions. Include outdoor furniture, garage items and anything in a separate storage unit in the inventory." },
        { title: "Describe the North Carolina address", body: "A Charlotte apartment and a mountain driveway need different access questions. Share stairs, parking, slope, turnarounds and the route from unloading to the door." },
        { title: "Connect keys and delivery", body: "Name the earliest day someone can receive the shipment. If closing or lease dates remain uncertain, ask about storage terms and the process for changing delivery details." },
        { title: "Keep the handover easy to follow", body: "Save broker and carrier contacts with the written estimate and inventory. Confirm who communicates changes and who will meet the carrier at the destination." },
      ],
      citiesTitle: "Where are you landing in North Carolina?",
      citiesDescription: "Start with your new community, then share the exact destination so the carrier can assess the building and access conditions.",
      cities: [
        { name: "Charlotte", detail: "For an apartment, ask about loading bays and elevator reservations." },
        { name: "Raleigh & Durham", detail: "Coordinate keys, building contacts and the first available receiving date." },
        { name: "Greensboro & Winston-Salem", detail: "Check driveway access and space to unload at your specific home." },
        { name: "Asheville & mountain addresses", detail: "Ask the carrier to assess grades, narrow access and turnarounds." },
        { name: "Wilmington & coastal addresses", detail: "Check property access and current travel notices near departure." },
        { name: "Another North Carolina community", detail: "Start with its ZIP code and the details at your actual doorway." },
      ],
      serviceTitle: "The services that may belong in your route plan",
      serviceIntro: "Discuss each part of the move together, then confirm which provider handles it and what the written terms include.",
      serviceNotes: {
        "long-distance-moving": "Connect the Florida inventory to the North Carolina access plan and written delivery window.",
        "residential-moving": "Plan the whole household around the person receiving your shipment at the new home.",
        "packing-services": "Flag patio furniture, delicate items and packing tasks before the estimate is finalized.",
        "storage-options": "Explore a gap between Florida move-out and North Carolina key collection, including release costs.",
        "auto-transport": "Coordinate the car’s separate timing and handover without assuming it arrives with the household shipment.",
      },
      preparationTitle: "Packing, timing and your first days in North Carolina",
      routeTitle: "Keep planning your Florida departure",
      routeIntro: "Return to the Florida guide for building access, household preparation and state resources.",
      relatedRouteIds: ["florida"],
    },
    sections: [
      { heading: "Let the destination forecast shape your arrival bag", paragraphs: ["Check the forecast for your actual North Carolina town and arrival date. Keep suitable clothing, rain protection and first-night essentials with you, especially if you travel ahead of the shipment.", "Ask the carrier how to prepare items that need special handling. A state-to-state guide cannot determine safe packing for your furniture, artwork or equipment."] },
      { heading: "Build a timing plan without guessing a transit time", paragraphs: ["Keep pickup, your own travel, key collection and the delivery window as separate items on your calendar. Exact cities, carrier arrangements and access conditions matter; the line on this map is not a driving route or a delivery-time estimate.", "Use Florida’s official emergency guidance before departure and DriveNC for North Carolina travel information. Recheck near the move; neither this guide nor a saved road notice confirms current conditions."], sourceIds: ["florida-preparedness", "nc-road-conditions"] },
      { heading: "Compare the scope behind the price", paragraphs: ["Give each estimate conversation the same inventory and access notes. Ask how packing, stairs, a long carry, storage or separate auto transport would be reflected in the written terms.", "Read the agreed services, payment arrangements and delivery conditions before signing. Keep updated documents when your inventory or destination details change."], sourceIds: ["fmcsa-checklist"] },
      { heading: "Keep North Carolina resident tasks out of the moving boxes", paragraphs: ["NCDMV’s new-resident resource covers driver licensing, vehicle title and registration, documents and insurance. Use its current instructions to determine what applies to your situation rather than assuming Florida procedures carry over.", "Keep identification and vehicle documents accessible. Use USPS’s official forwarding and change-of-address instructions for mail, then add utility activation and your new building contact to a separate arrival checklist."], sourceIds: ["nc-new-resident", "usps-mail-forwarding"] },
    ],
  }),
  draft("es", {
    id: "florida-to-north-carolina", kind: "route", path: "/es/rutas/florida-a-carolina-del-norte", navLabel: "Florida a Carolina del Norte",
    title: "Mudarse de Florida a Carolina del Norte",
    description: "Cierre su etapa en Florida con un plan claro para la llegada. Ya sea en Charlotte, Raleigh, Durham, la montaña o la costa, los detalles del nuevo domicilio deben formar parte de la conversación desde el principio.",
    sourceIds, relatedIds,
    geography: {
      origin: { ...floridaAnchor, planningNote: "Salida: confirme inventario, acceso y quién entrega el domicilio en Florida." }, destination: { ...northCarolinaAnchor, name: "Carolina del Norte", planningNote: "Llegada: confirme llaves, acceso y quién recibe el envío en Carolina del Norte." }, eyebrow: "Dos estados. Un plan bien pensado.",
      quoteTitle: "Su mudanza de Florida a Carolina del Norte",
      quoteDescription: "Indique los domicilios reales de recogida y destino. Fechas, inventario y acceso orientan la conversación; esta guía no completa su cotización automáticamente.",
      planningTitle: "Prepare la salida y la llegada al mismo tiempo",
      planningCards: [
        { title: "Deje resuelto el acceso en Florida", body: "Confirme ascensor, portón y carga con el edificio. Incluya muebles exteriores, garaje y objetos de un almacén separado." },
        { title: "Describa el domicilio de destino", body: "Un apartamento de Charlotte y una entrada de montaña plantean preguntas distintas. Informe escaleras, pendientes, espacio para girar y distancia hasta la puerta." },
        { title: "Coordine las llaves y la entrega", body: "Indique el primer día en que alguien puede recibir. Si la fecha de vivienda es incierta, consulte almacenamiento y cómo actualizar la entrega." },
        { title: "Facilite el seguimiento de los acuerdos", body: "Guarde contactos del intermediario y transportista con presupuesto e inventario. Confirme quién comunica cambios y quién recibirá el envío." },
      ],
      citiesTitle: "¿A qué parte de Carolina del Norte llega?",
      citiesDescription: "Empiece por su nueva localidad y comparta el destino exacto para que el transportista evalúe acceso y edificio.",
      cities: [
        { name: "Charlotte", detail: "En apartamentos, consulte zona de carga y reserva de ascensor." },
        { name: "Raleigh y Durham", detail: "Coordine llaves, contactos y primera fecha de recepción." },
        { name: "Greensboro y Winston-Salem", detail: "Revise la entrada y el espacio para descargar en su vivienda." },
        { name: "Asheville y domicilios de montaña", detail: "Pida evaluar pendientes, accesos estrechos y espacio para girar." },
        { name: "Wilmington y la costa", detail: "Revise acceso al inmueble y avisos de viaje cerca de la salida." },
        { name: "Otra localidad del estado", detail: "Empiece por el código postal y los detalles de su puerta." },
      ],
      serviceTitle: "Servicios que pueden formar parte de esta ruta",
      serviceIntro: "Revise cada parte del traslado en conjunto y confirme quién la realiza y qué incluyen los acuerdos escritos.",
      serviceNotes: {
        "long-distance-moving": "Conecte inventario en Florida, acceso en destino y ventana escrita de entrega.",
        "residential-moving": "Organice el hogar según quién recibirá los bienes en la nueva vivienda.",
        "packing-services": "Mencione muebles exteriores, piezas delicadas y tareas de embalaje antes del presupuesto.",
        "storage-options": "Revise el intervalo entre salir de Florida y recibir las llaves, incluidos cargos de retirada.",
        "auto-transport": "Coordine el vehículo por separado, sin suponer que llega con el resto del hogar.",
      },
      preparationTitle: "Embalaje, fechas y primeros días en Carolina del Norte",
      routeTitle: "Siga preparando su salida de Florida",
      routeIntro: "Vuelva a la guía de Florida para revisar acceso, preparación del hogar y recursos estatales.",
      relatedRouteIds: ["florida"],
    },
    sections: [
      { heading: "Prepare su bolsa de llegada según el pronóstico", paragraphs: ["Consulte el tiempo para la localidad y fecha concretas de llegada. Lleve ropa adecuada, protección para lluvia y lo necesario para la primera noche, especialmente si llega antes del envío.", "Pregunte al transportista cómo preparar objetos delicados. Una guía entre estados no determina el embalaje adecuado para sus muebles, obras de arte o equipos."] },
      { heading: "Planifique las fechas sin adivinar el tiempo de tránsito", paragraphs: ["Separe recogida, viaje personal, entrega de llaves y ventana de entrega en su calendario. Importan las ciudades, acuerdos y acceso; la línea del mapa no es una ruta de conducción ni un plazo de entrega.", "Consulte la preparación oficial de Florida antes de salir y DriveNC para información vial de Carolina del Norte. Compruebe de nuevo cerca de la mudanza; esta guía no confirma condiciones actuales."], sourceIds: ["florida-preparedness", "nc-road-conditions"] },
      { heading: "Compare qué hay detrás del precio", paragraphs: ["Use el mismo inventario y notas de acceso para comparar presupuestos. Pregunte cómo se reflejarían embalaje, escaleras, recorridos largos, almacenamiento o transporte del auto.", "Lea servicios, pagos y condiciones de entrega antes de firmar. Conserve documentos actualizados cuando cambie el inventario o el destino."], sourceIds: ["fmcsa-checklist"] },
      { heading: "Deje accesibles los documentos para los trámites", paragraphs: ["El recurso de NCDMV para nuevos residentes explica licencia, título y registro, documentos y seguro. Revise instrucciones vigentes para su situación; no suponga que se aplican los procesos de Florida.", "Lleve identificación y documentos del vehículo consigo. Consulte las instrucciones oficiales de USPS para reenvío y cambio de dirección. Añada servicios de vivienda y contacto del edificio a una lista de llegada separada."], sourceIds: ["nc-new-resident", "usps-mail-forwarding"] },
    ],
  }),
];
