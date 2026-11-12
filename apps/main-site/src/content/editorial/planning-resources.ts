import { draft } from "./draft";
import type { EditorialEntry } from "./types";

/** Original planning aids. Carrier instructions and written terms remain authoritative. */
export const planningResources: EditorialEntry[] = [
  draft("en", {
    id: "moving-cost-guide", kind: "resource", path: "/resources/moving-cost-guide",
    navLabel: "What shapes moving costs", title: "What can change the cost of your move?",
    description: "Make a scope list before setting a budget: belongings, packing, access, storage and delivery arrangements all need written answers.",
    sourceIds: ["fmcsa-costs", "fmcsa-checklist"], relatedIds: ["comparing-moving-estimates", "before-the-inventory-call", "storage-options"],
    sections: [
      { heading: "Start with the work, not a price per bedroom", paragraphs: ["Two homes with the same bedroom count can contain very different shipments. Sketch your own cost worksheet with four columns: task, included or optional, written amount, and unanswered question. Leave unknown amounts blank until the provider supplies them. This guide contains no market rates or Vantage price promises."] },
      { heading: "List the details that deserve a line item", paragraphs: ["Use one inventory for every conversation. Note who packs each room, whether furniture needs attention, the route into each building and any gap between leaving and arriving. Ask which details affect the written offer for your shipment."], bullets: ["Packing: labor, boxes, wrapping and any unpacking requested.", "Access: stairs, elevator bookings, distance from parking and restricted loading hours.", "Storage: the planned period, handling, access and the process for final delivery.", "Changes: how additions, revised addresses or changed arrangements will be documented."] },
      { heading: "Ask which estimate terms apply", paragraphs: ["FMCSA advises getting a written estimate covering the charges and explains that a non-binding estimate does not guarantee final cost. Ask the provider to identify the estimate type and explain it using your actual inventory. A website estimate or initial conversation does not replace the shipment documents."], sourceIds: ["fmcsa-costs"] },
      { heading: "Keep a revision trail", paragraphs: ["Put the date and version on your worksheet. If you add a sofa or change the delivery entrance, note when you told the coordinator and where the updated terms appear. Keep payment timing, cancellation questions and unresolved items together. Compare the final written scope with your plan before agreeing; do not substitute an example from another household."] },
    ],
  }),
  draft("es", {
    id: "moving-cost-guide", kind: "resource", path: "/es/recursos/costos-de-mudanza",
    navLabel: "Qué influye en el costo", title: "¿Qué puede cambiar el costo de su mudanza?",
    description: "Antes de fijar un presupuesto, anote pertenencias, embalaje, accesos, almacenamiento y entrega. Pida respuestas por escrito para cada punto.",
    sourceIds: ["fmcsa-costs", "fmcsa-checklist"], relatedIds: ["comparing-moving-estimates", "before-the-inventory-call", "storage-options"],
    sections: [
      { heading: "Empiece por el trabajo, no por un precio por habitación", paragraphs: ["Dos viviendas con el mismo número de habitaciones pueden tener envíos muy distintos. Prepare una hoja con cuatro columnas: tarea, incluida u opcional, importe escrito y pregunta pendiente. Deje en blanco los importes desconocidos hasta que el proveedor los indique. Esta guía no contiene tarifas de mercado ni promesas de precio de Vantage."] },
      { heading: "Detalle lo que merece una partida propia", paragraphs: ["Use el mismo inventario en todas las conversaciones. Anote quién embala cada habitación, qué muebles requieren atención, cómo se accede a cada edificio y si habrá un intervalo entre la salida y la llegada. Pregunte qué detalles afectan a la propuesta escrita de su envío."], bullets: ["Embalaje: trabajo, cajas, envoltorios y desembalaje solicitado.", "Acceso: escaleras, reserva de ascensor, distancia desde el estacionamiento y horarios de carga.", "Almacenamiento: plazo previsto, manipulación, acceso y solicitud de entrega final.", "Cambios: cómo se documentan objetos añadidos, nuevos domicilios o acuerdos revisados."] },
      { heading: "Pregunte qué tipo de presupuesto recibe", paragraphs: ["FMCSA recomienda obtener un presupuesto escrito que detalle los cargos y explica que uno no vinculante no garantiza el costo final. Pida al proveedor que identifique el tipo y lo explique con su inventario real. Una estimación por internet o una conversación inicial no reemplaza los documentos del envío."], sourceIds: ["fmcsa-costs"] },
      { heading: "Conserve las revisiones", paragraphs: ["Anote fecha y versión en su hoja. Si añade un sofá o cambia la entrada de entrega, registre cuándo avisó al coordinador y dónde figuran las condiciones actualizadas. Guarde juntos el calendario de pagos, las preguntas de cancelación y los puntos pendientes. Compare el alcance escrito final con su plan antes de aceptar; el ejemplo de otra familia no sustituye sus condiciones."] },
    ],
  }),
  draft("en", {
    id: "items-to-check-before-packing", kind: "resource", path: "/resources/items-to-check-before-packing",
    navLabel: "Items to check before packing", title: "What should stay out of a moving box until you ask?",
    description: "Make a separate review list for potentially hazardous, perishable, personal and unusual belongings. Get the assigned carrier's restrictions before packing.",
    sourceIds: ["fmcsa-hazardous", "fmcsa-checklist"], relatedIds: ["packing-services", "before-the-inventory-call", "who-handles-my-move"],
    sections: [
      { heading: "Get the carrier's actual restricted-items list", paragraphs: ["A general checklist cannot authorize an item for transport. Ask the assigned carrier for its current instructions and identify anything you cannot confidently describe. FMCSA warns that offering hazardous materials for transportation brings specific shipper requirements. Do not hide a questionable item inside an ordinary box."], sourceIds: ["fmcsa-hazardous"] },
      { heading: "Build an ask-before-packing list", paragraphs: ["Walk through the garage, utility cupboard, kitchen and garden storage separately from the furniture inventory. Write down the product name and the concern; keep labels available for the carrier's review. These are examples to discuss, not a complete list of prohibited goods or permission to ship."], bullets: ["Fuel, paint, solvents, cleaners and compressed containers.", "Batteries and powered equipment with special preparation instructions.", "Food, plants and other items that may not tolerate time in transit.", "Unusual or regulated belongings that need an individual answer."] },
      { heading: "Separate essentials from transport restrictions", paragraphs: ["Something you choose to carry yourself is not necessarily prohibited. Create a personal travel bag for documents, keys, medication, chargers and everyday essentials. Plan separately for pets and family travel. Do not put private documents or medical details into an online moving inquiry."] },
      { heading: "Resolve each item before sealing the box", paragraphs: ["Record the carrier's answer beside each item: accepted with instructions, excluded, or still awaiting review. Keep unresolved items outside the shipment. If something cannot travel, ask the appropriate local authority about safe handling or disposal; do not improvise by draining, mixing or discarding materials."] },
    ],
  }),
  draft("es", {
    id: "items-to-check-before-packing", kind: "resource", path: "/es/recursos/articulos-antes-de-embalar",
    navLabel: "Artículos que debe consultar", title: "¿Qué conviene dejar fuera de las cajas hasta consultar?",
    description: "Separe para revisión los productos potencialmente peligrosos, perecederos, personales y poco comunes. Pida las restricciones del transportista antes de embalar.",
    sourceIds: ["fmcsa-hazardous", "fmcsa-checklist"], relatedIds: ["packing-services", "before-the-inventory-call", "who-handles-my-move"],
    sections: [
      { heading: "Pida la lista real de restricciones", paragraphs: ["Una guía general no autoriza el transporte de un objeto. Pida al transportista asignado sus instrucciones actuales e identifique lo que no pueda describir con seguridad. FMCSA advierte que ofrecer materiales peligrosos para transporte implica requisitos específicos para quien los envía. No oculte un artículo dudoso dentro de una caja corriente."], sourceIds: ["fmcsa-hazardous"] },
      { heading: "Haga una lista para consultar antes de embalar", paragraphs: ["Revise por separado garaje, armario de limpieza, cocina y almacén del jardín. Anote el nombre del producto y la duda; conserve las etiquetas para que el transportista pueda revisarlas. Son ejemplos para consultar, no una lista completa de artículos prohibidos ni permiso para enviarlos."], bullets: ["Combustibles, pintura, disolventes, limpiadores y recipientes a presión.", "Baterías y equipos que necesitan instrucciones especiales.", "Alimentos, plantas y objetos sensibles al tiempo de tránsito.", "Pertenencias poco comunes o reguladas que requieren una respuesta individual."] },
      { heading: "Distinga lo esencial de lo restringido", paragraphs: ["Que prefiera llevar algo consigo no significa que esté prohibido. Prepare una bolsa de viaje con documentos, llaves, medicamentos, cargadores y artículos cotidianos. Organice por separado el viaje de familiares y mascotas. No incluya documentos privados ni información médica en una consulta de mudanza por internet."] },
      { heading: "Resuelva cada duda antes de cerrar la caja", paragraphs: ["Anote junto a cada artículo la respuesta del transportista: aceptado con instrucciones, excluido o pendiente. Mantenga fuera del envío lo que no tenga respuesta. Si algo no puede viajar, consulte a la autoridad local competente sobre manejo o eliminación seguros; no improvise vaciando, mezclando o desechando materiales."] },
    ],
  }),
  draft("en", {
    id: "moving-paperwork-guide", kind: "resource", path: "/resources/moving-paperwork-guide",
    navLabel: "Organize moving paperwork", title: "Keep your moving paperwork useful from quote to delivery.",
    description: "Build one folder for estimates, inventory revisions, contact details and open questions, with a copy you can reach while travelling.",
    sourceIds: ["fmcsa-documents", "fmcsa-checklist"], relatedIds: ["comparing-moving-estimates", "who-handles-my-move", "long-distance-moving"],
    sections: [
      { heading: "Make a simple document index", paragraphs: ["Start with four dividers: proposal, agreed arrangements, pickup, and delivery. Add a cover sheet listing each company's role and contact, your document dates and anything still awaiting an answer. Keep sensitive details in your own folder; the worksheet does not need to be uploaded to this website."] },
      { heading: "Read the document in front of you", paragraphs: ["FMCSA identifies the estimate, bill of lading and inventory among important shipment documents. Ask the provider to explain each document's purpose, the charges and services, and any blanks or differences from the earlier version. Keep a copy of what you sign and the applicable consumer information."], sourceIds: ["fmcsa-documents"] },
      { heading: "Turn uncertainty into a written question", paragraphs: ["Use a short question log with a date, contact and answer location. For example: which company is transporting the shipment; how are pickup and delivery communicated; what payment and cancellation terms apply; and where are valuation and claim instructions? Ask for the answer in the relevant paperwork, not just in a note beside an estimate."] },
      { heading: "Keep the folder available after pickup", paragraphs: ["Carry the contacts and documents where you can reach them during travel. Add inventory observations and delivery paperwork without discarding earlier versions. If a concern arises, use the provider's documented contact and claim process; Vantage's contact page also offers the existing support channel. This organizing guide does not create a new complaint service, a response deadline or a refund entitlement."] },
    ],
  }),
  draft("es", {
    id: "moving-paperwork-guide", kind: "resource", path: "/es/recursos/documentos-de-mudanza",
    navLabel: "Organice sus documentos", title: "Mantenga sus documentos a mano desde la cotización hasta la entrega.",
    description: "Reúna presupuestos, revisiones del inventario, contactos y preguntas pendientes en una carpeta accesible durante el viaje.",
    sourceIds: ["fmcsa-documents", "fmcsa-checklist"], relatedIds: ["comparing-moving-estimates", "who-handles-my-move", "long-distance-moving"],
    sections: [
      { heading: "Prepare un índice sencillo", paragraphs: ["Use cuatro apartados: propuesta, acuerdos, recogida y entrega. Añada una portada con la función y contacto de cada empresa, fechas de los documentos y respuestas pendientes. Conserve los datos sensibles en su propia carpeta; no necesita cargar esta hoja en el sitio web."] },
      { heading: "Lea el documento que va a firmar", paragraphs: ["FMCSA incluye el presupuesto, el conocimiento de embarque y el inventario entre los documentos importantes. Pida al proveedor que explique para qué sirve cada uno, sus cargos y servicios, y cualquier espacio vacío o diferencia con una versión anterior. Guarde copia de lo que firma y de la información al consumidor aplicable."], sourceIds: ["fmcsa-documents"] },
      { heading: "Convierta cada duda en una pregunta escrita", paragraphs: ["Lleve un registro breve con fecha, contacto y ubicación de la respuesta. Por ejemplo: qué empresa transporta el envío; cómo se comunican recogida y entrega; qué condiciones de pago y cancelación se aplican; y dónde están las instrucciones de valoración y reclamación. Pida que las respuestas figuren en los documentos correspondientes, no solo en una nota junto al presupuesto."] },
      { heading: "Conserve la carpeta accesible después de la recogida", paragraphs: ["Lleve contactos y documentos a mano durante el viaje. Añada observaciones del inventario y documentos de entrega sin descartar versiones anteriores. Si surge una inquietud, siga el contacto y procedimiento de reclamación del proveedor; la página de contacto de Vantage ofrece también el canal de asistencia existente. Esta guía no crea un servicio nuevo de quejas, un plazo de respuesta ni un derecho a reembolso."] },
    ],
  }),
];
