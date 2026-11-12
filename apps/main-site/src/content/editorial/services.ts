import { draft } from "./draft";
import type { EditorialEntry, EditorialLocale, EditorialSection } from "./types";

export const SERVICE_IDS = [
  "long-distance-moving", "auto-transport", "military-moving", "residential-moving",
  "corporate-office-moving", "packing-services", "storage-options", "senior-moving",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

const roles: Record<EditorialLocale, EditorialSection> = {
  en: {
    heading: "Who arranges the move, and who transports it?",
    paragraphs: [
      "Vantage describes its role as an interstate household goods moving broker: arranging transportation with a motor carrier. The assigned carrier, rather than Vantage, performs the transportation. Identify that company on your shipment paperwork and keep its contact details with your estimate.",
      "Use the federal mover lookup to check the broker and carrier separately. A directory listing does not identify the company assigned to your particular shipment; ask your coordinator for that information. Read the written terms before agreeing to services.",
    ],
    sourceIds: ["vantage-broker-baseline", "fmcsa-roles", "fmcsa-lookup"],
  },
  es: {
    heading: "¿Quién organiza la mudanza y quién transporta sus pertenencias?",
    paragraphs: [
      "Vantage describe su función como intermediario de mudanzas interestatales de bienes del hogar: organiza el transporte con una empresa transportista. El transportista asignado, y no Vantage, realiza el transporte. Identifique esa empresa en los documentos de su envío y guarde sus datos de contacto junto con el presupuesto.",
      "Consulte por separado al intermediario y al transportista en el buscador federal. Que una empresa aparezca en un directorio no significa que esté asignada a su mudanza; pida ese dato a su coordinador. Lea las condiciones por escrito antes de contratar servicios.",
    ],
    sourceIds: ["vantage-broker-baseline", "fmcsa-roles", "fmcsa-lookup"],
  },
};

function service(locale: EditorialLocale, id: ServiceId, slug: string, entry: {
  navLabel: string; title: string; description: string; sections: EditorialSection[]; relatedIds: string[];
}): EditorialEntry {
  return draft(locale, {
    ...entry, id, kind: "service", path: locale === "en" ? `/services/${slug}` : `/es/servicios/${slug}`,
    sections: [...entry.sections.slice(0, 2), roles[locale], ...entry.sections.slice(2)],
    sourceIds: ["vantage-broker-baseline", "fmcsa-roles", "fmcsa-lookup", "fmcsa-checklist"],
  });
}

export const serviceEntries: EditorialEntry[] = [
  service("en", "long-distance-moving", "long-distance-moving", {
    navLabel: "Long-distance moving",
    title: "Moving out of state? Start with the details that shape your estimate.",
    description: "Compare the belongings, services and access in each written estimate. Bring your route and preferred dates to a Vantage quote conversation.",
    sections: [
      { heading: "Start with the same inventory", paragraphs: ["A two-bedroom home is a starting point, not an item list. Walk through every room, open closets and include the garage, balcony and storage unit. Mark furniture you will sell separately from the items you intend to ship. If that list changes after the conversation, ask for the estimate to be updated."] },
      { heading: "What to prepare for your coordinator", paragraphs: ["Bring a preferred pickup period and the earliest date someone can receive the shipment. Explain where a truck can stop at both addresses. Ask which dates and services can be confirmed for your route before making arrangements that depend on them."], bullets: ["Inventory, approximate box count and unusual or fragile items.", "Stairs, elevator reservations, loading entrance and distance from parking to the door.", "Packing help, a possible storage gap and a contact available at delivery."], sourceIds: ["fmcsa-checklist"] },
      { heading: "Compare the work before comparing the total", paragraphs: ["Use the estimates worksheet to put two written offers side by side. If one omits packing or assumes an elevator that cannot be reserved, the totals describe different work. Ask each company to explain the differences and identify the applicable estimate terms in writing."], sourceIds: ["fmcsa-checklist"] },
      { heading: "Does an online request reserve my moving date?", paragraphs: ["A quote request begins a conversation. Treat pickup, delivery, carrier assignment and any optional services as unconfirmed until you have reviewed the arrangements and relevant documents. Keep the carrier's and coordinator's contacts together."] },
      { heading: "What if the delivery address changes?", paragraphs: ["Tell the coordinator as soon as you know. Update the city, building access and contact information, then ask whether the route, services or written estimate need to change. Use the destination guide for preparation; it does not establish availability for your shipment."] },
    ], relatedIds: ["comparing-moving-estimates", "packing-services", "storage-options", "wisconsin", "who-handles-my-move"],
  }),
  service("es", "long-distance-moving", "mudanzas-larga-distancia", {
    navLabel: "Mudanzas de larga distancia",
    title: "¿Se muda de un estado a otro? Empiece por los detalles de su presupuesto.",
    description: "Compare pertenencias, servicios y accesos en cada presupuesto escrito. Tenga a mano su ruta y las fechas que prefiere al solicitar una cotización a Vantage.",
    sections: [
      { heading: "Empiece con el mismo inventario", paragraphs: ["Una vivienda de dos habitaciones es una referencia inicial, no una lista de objetos. Recorra cada habitación, abra los armarios e incluya el garaje, el balcón y cualquier unidad de almacenamiento. Separe los muebles que venderá de los que enviará. Si la lista cambia después de hablar con el coordinador, pida que se actualice el presupuesto."] },
      { heading: "Qué preparar para hablar con su coordinador", paragraphs: ["Indique el período de recogida que prefiere y la primera fecha en que alguien podrá recibir el envío. Explique dónde puede detenerse un camión en ambos domicilios. Pregunte qué fechas y servicios pueden confirmarse para su ruta antes de hacer planes que dependan de ellos."], bullets: ["Inventario, cantidad aproximada de cajas y objetos frágiles o poco comunes.", "Escaleras, reserva de ascensor, entrada de carga y distancia desde el estacionamiento hasta la puerta.", "Ayuda para embalar, posible necesidad de almacenamiento y contacto para la entrega."], sourceIds: ["fmcsa-checklist"] },
      { heading: "Compare el trabajo antes de comparar el total", paragraphs: ["Use la hoja de comparación para revisar dos presupuestos escritos. Si uno no incluye el embalaje o supone un ascensor que no puede reservar, los totales corresponden a trabajos distintos. Pida a cada empresa que aclare las diferencias y las condiciones aplicables por escrito."], sourceIds: ["fmcsa-checklist"] },
      { heading: "¿La solicitud por internet reserva mi fecha?", paragraphs: ["Solicitar una cotización inicia una conversación. Considere pendientes la recogida, la entrega, la asignación de transportista y los servicios opcionales hasta revisar los acuerdos y documentos correspondientes. Guarde juntos los contactos del transportista y del coordinador."] },
      { heading: "¿Y si cambia el domicilio de entrega?", paragraphs: ["Avise al coordinador en cuanto lo sepa. Actualice la ciudad, el acceso al edificio y los datos de contacto; pregunte si deben cambiar la ruta, los servicios o el presupuesto escrito. La guía de destino sirve para prepararse, pero no confirma disponibilidad para su envío."] },
    ], relatedIds: ["comparing-moving-estimates", "packing-services", "storage-options", "wisconsin", "who-handles-my-move"],
  }),
  service("en", "residential-moving", "residential-moving", {
    navLabel: "Residential moving", title: "Plan an interstate move from your apartment or house.",
    description: "Build a room-by-room inventory and a practical access plan for both homes before reviewing your moving estimate.",
    sections: [
      { heading: "Walk the whole home, including the easy-to-miss spaces", paragraphs: ["Start at the entry and work room by room. Include the furniture behind a closed door, shelves in the garage and items stored elsewhere. Keep a separate list for things you will carry yourself, donate or leave behind. A short video or measurements can help you describe bulky pieces, but ask what your coordinator needs for the inventory review."] },
      { heading: "Describe the path from the truck to each room", paragraphs: ["An apartment move starts before the elevator door. Ask the building manager about permitted delivery hours, elevator reservations, loading access and any documents the carrier must provide. At a house, note narrow driveways, steps, low branches and a safe place to discuss unloading with the carrier."], bullets: ["Record the floor and number of stair flights at each address.", "Measure oversized pieces and the doors they must pass through.", "Identify who can authorize access if you are travelling."], sourceIds: ["fmcsa-checklist"] },
      { heading: "Is loading and unloading included?", paragraphs: ["Check the written estimate for the handling work it includes. Ask how stairs, long carries, disassembly or a different delivery vehicle would be addressed. Do not assume that a service label describes every task at either home."] },
      { heading: "Keep the first night separate", paragraphs: ["Choose a small set of items you will need before the shipment is unpacked: personal documents, medication, chargers and a change of clothes. Tell the carrier which belongings are staying with you, and review its restrictions before packing unusual items."] },
    ], relatedIds: ["before-the-inventory-call", "packing-services", "long-distance-moving", "who-handles-my-move"],
  }),
  service("es", "residential-moving", "mudanzas-residenciales", {
    navLabel: "Mudanzas residenciales", title: "Prepare su mudanza interestatal desde un apartamento o una casa.",
    description: "Haga un inventario por habitación y revise el acceso a ambas viviendas antes de comparar su presupuesto de mudanza.",
    sections: [
      { heading: "Recorra toda la vivienda, también los espacios que se olvidan", paragraphs: ["Empiece en la entrada y avance habitación por habitación. Incluya los muebles detrás de una puerta cerrada, las estanterías del garaje y los objetos guardados en otro lugar. Separe lo que llevará consigo, donará o dejará. Un video breve o las medidas pueden ayudar a describir piezas grandes; pregunte qué necesita su coordinador para revisar el inventario."] },
      { heading: "Describa el recorrido desde el camión hasta cada habitación", paragraphs: ["En un apartamento, la mudanza comienza antes de llegar al ascensor. Pregunte a la administración por los horarios de entrega, la reserva del ascensor, el acceso de carga y los documentos que debe presentar el transportista. En una casa, anote entradas estrechas, escalones, ramas bajas y un lugar seguro donde hablar con el transportista sobre la descarga."], bullets: ["Anote el piso y los tramos de escaleras de cada domicilio.", "Mida las piezas grandes y las puertas por donde deben pasar.", "Designe a alguien que pueda autorizar el acceso si usted está de viaje."], sourceIds: ["fmcsa-checklist"] },
      { heading: "¿Se incluyen la carga y la descarga?", paragraphs: ["Revise qué tareas incluye el presupuesto escrito. Pregunte cómo se tratarían las escaleras, los recorridos largos, el desmontaje o un vehículo distinto para la entrega. El nombre de un servicio no describe por sí solo todo el trabajo en ambas viviendas."] },
      { heading: "Separe lo necesario para la primera noche", paragraphs: ["Reserve los artículos que necesitará antes de desempacar: documentos personales, medicamentos, cargadores y una muda de ropa. Diga al transportista qué pertenencias llevará consigo y consulte sus restricciones antes de embalar objetos poco comunes."] },
    ], relatedIds: ["before-the-inventory-call", "packing-services", "long-distance-moving", "who-handles-my-move"],
  }),
  service("en", "corporate-office-moving", "corporate-office-moving", {
    navLabel: "Office moving", title: "Plan your office move around the work that needs to resume.",
    description: "Separate furniture, equipment and access needs from your reopening plan. Ask which work a carrier can include before committing to dates.",
    sections: [
      { heading: "Decide what must be ready first", paragraphs: ["List workstations, shared furniture, equipment and boxed files by department. Mark the pieces that need to be placed first so your own team can resume work. Keep your business continuity plan separate from transport dates; ask which pickup and delivery arrangements can actually be confirmed."] },
      { heading: "Prepare a handoff between both buildings", paragraphs: ["Choose one authorized contact for each location. Ask about loading docks, lift dimensions, delivery hours, security procedures and building documentation. Keep equipment shutdown, data protection and network setup with the appropriate people in your organization unless a separate written agreement assigns that work."], bullets: ["Label furniture and boxes by destination room or workstation.", "Identify leased, sensitive and unusually heavy equipment for individual review.", "Record building contacts and who approves changes to the moving scope."] },
      { heading: "Does the move include technology installation?", paragraphs: ["Do not assume it does. Ask what handling or disassembly is included and arrange technical disconnection and reconnection with qualified providers. A household moving worksheet can help organize questions, but commercial terms must be confirmed for your business shipment."] },
      { heading: "Keep changes visible", paragraphs: ["If the floor plan or item list changes, send a revised version before pickup. Ask the coordinator to identify any effect on services or timing in writing. Keep staff relocation needs separate from the office inventory so each request gets the appropriate review."] },
    ], relatedIds: ["before-the-inventory-call", "packing-services", "storage-options", "residential-moving"],
  }),
  service("es", "corporate-office-moving", "mudanzas-de-oficina", {
    navLabel: "Mudanzas de oficina", title: "Organice la mudanza de su oficina según el trabajo que debe reanudarse.",
    description: "Distinga los muebles, equipos y accesos del plan de reapertura. Pregunte qué puede incluir el transportista antes de comprometer fechas.",
    sections: [
      { heading: "Decida qué debe quedar listo primero", paragraphs: ["Enumere puestos de trabajo, muebles comunes, equipos y archivos en cajas por departamento. Marque las piezas que deben colocarse primero para que su equipo pueda retomar la actividad. Mantenga separado el plan de continuidad de las fechas de transporte y pregunte qué recogida y entrega pueden confirmarse."] },
      { heading: "Coordine el acceso a ambos edificios", paragraphs: ["Designe un contacto autorizado en cada sede. Pregunte por muelles de carga, medidas de los ascensores, horarios, seguridad y documentación del edificio. Deje el apagado de equipos, la protección de datos y la instalación de redes en manos de los responsables de su organización, salvo que otro acuerdo escrito asigne esas tareas."], bullets: ["Etiquete muebles y cajas con su habitación o puesto de destino.", "Señale equipos arrendados, delicados o de gran peso para revisarlos por separado.", "Anote los contactos del edificio y quién autoriza cambios en el alcance de la mudanza."] },
      { heading: "¿Se incluye la instalación de tecnología?", paragraphs: ["No lo dé por hecho. Pregunte qué manipulación o desmontaje se incluye y contrate la desconexión y reconexión técnica con proveedores cualificados. Una hoja para mudanzas del hogar puede ayudar a ordenar preguntas, pero las condiciones comerciales deben confirmarse para el envío de su empresa."] },
      { heading: "Comunique los cambios", paragraphs: ["Si cambian el plano o la lista de objetos, envíe una versión actualizada antes de la recogida. Pida al coordinador que explique por escrito cualquier efecto en servicios o fechas. Separe las necesidades de traslado de empleados del inventario de la oficina para revisar cada solicitud adecuadamente."] },
    ], relatedIds: ["before-the-inventory-call", "packing-services", "storage-options", "residential-moving"],
  }),
  service("en", "military-moving", "military-moving", {
    navLabel: "Military and veteran moves", title: "Planning a move around military orders? Start with the requirements.",
    description: "Bring your reporting dates and questions from your transportation office. Confirm documents and carrier capabilities before arranging an interstate move.",
    sections: [
      { heading: "Separate official requirements from the moving quote", paragraphs: ["Write down the dates and records your transportation or finance office tells you to use. Ask that office to confirm the rules that apply to your own move. A commercial quote conversation cannot establish eligibility, reimbursement or government authorization."] },
      { heading: "Prepare your questions before reserving services", paragraphs: ["Describe the household inventory, housing access and any gap between leaving one home and entering the next. If your move requires weight tickets or other records, ask the coordinator and proposed carrier whether they can supply exactly what your office requests before you agree to the arrangement."], bullets: ["Bring the required document names and instructions, without uploading sensitive orders to a public form.", "Identify dates that are fixed and dates that can change.", "Keep essential records and items your household needs during travel with you."] },
      { heading: "Can a quote confirm reimbursement?", paragraphs: ["No. Get that answer from the office responsible for your move. Keep the written service agreement and the official requirements together so you can see whether a proposed arrangement addresses both. This guide does not claim military endorsement or a special government program."] },
      { heading: "What if my orders or housing dates change?", paragraphs: ["Tell the coordinator promptly and ask for the revised options and applicable terms in writing. Do not assume storage, a new pickup date or a document request is included until the provider confirms it."] },
    ], relatedIds: ["before-the-inventory-call", "long-distance-moving", "storage-options", "comparing-moving-estimates"],
  }),
  service("es", "military-moving", "mudanzas-militares", {
    navLabel: "Mudanzas de militares y veteranos", title: "¿Su mudanza depende de órdenes militares? Empiece por los requisitos.",
    description: "Tenga a mano las fechas de presentación y las preguntas de su oficina de transporte. Confirme documentos y capacidad del transportista antes de contratar la mudanza.",
    sections: [
      { heading: "Separe los requisitos oficiales de la cotización", paragraphs: ["Anote las fechas y los documentos indicados por su oficina de transporte o finanzas. Pida a esa oficina que confirme las normas aplicables a su caso. Una conversación sobre un presupuesto comercial no determina la elegibilidad, el reembolso ni la autorización del gobierno."] },
      { heading: "Prepare las preguntas antes de reservar servicios", paragraphs: ["Describa el inventario del hogar, el acceso a las viviendas y cualquier intervalo entre la salida y la entrada. Si necesita comprobantes de peso u otros registros, pregunte al coordinador y al transportista propuesto si pueden entregar exactamente lo que pide su oficina antes de aceptar el acuerdo."], bullets: ["Tenga los nombres e instrucciones de los documentos; no cargue órdenes sensibles en un formulario público.", "Distinga las fechas fijas de las que pueden cambiar.", "Lleve consigo documentos esenciales y lo que su familia necesitará durante el viaje."] },
      { heading: "¿La cotización confirma un reembolso?", paragraphs: ["No. Consulte a la oficina responsable de su mudanza. Guarde juntos el acuerdo de servicios y los requisitos oficiales para comprobar si la propuesta responde a ambos. Esta guía no implica respaldo militar ni un programa especial del gobierno."] },
      { heading: "¿Y si cambian mis órdenes o las fechas de vivienda?", paragraphs: ["Avise pronto al coordinador y pida las nuevas opciones y condiciones por escrito. No dé por incluidos el almacenamiento, una nueva fecha de recogida o un documento hasta que el proveedor lo confirme."] },
    ], relatedIds: ["before-the-inventory-call", "long-distance-moving", "storage-options", "comparing-moving-estimates"],
  }),
  service("en", "senior-moving", "senior-moving", {
    navLabel: "Senior moving", title: "Plan the move with the people who know your home.",
    description: "Decide what will fit, who can help with arrangements and what you need close by. Build a clear inventory before reviewing moving services.",
    sections: [
      { heading: "Make decisions one room at a time", paragraphs: ["Use the new home's measurements to decide what to take. Start with everyday furniture and personal keepsakes, then work through cupboards and storage. Keep decisions about selling, donating and shipping in separate lists so an item does not accidentally enter the moving inventory twice."] },
      { heading: "Choose who can help coordinate", paragraphs: ["Decide who will join the estimate conversation and who can answer questions at each address. Ask how to authorize a family member or other trusted person to discuss the arrangements. If the destination is a managed community, ask its staff about arrival hours, elevator reservations and receiving procedures."], bullets: ["Keep medication, personal records and daily essentials accessible.", "Identify fragile, unusually heavy or sentimental pieces for individual discussion.", "Ask which packing or handling tasks can be included in writing."] },
      { heading: "Does moving coordination include personal care?", paragraphs: ["Do not assume it does. Arrange personal assistance, travel and health needs separately with the appropriate people. Keep those needs in your own plan without sharing medical information through the quote form."] },
      { heading: "How can I avoid last-minute inventory changes?", paragraphs: ["Schedule a final walk-through with the person helping you. Check closets, drawers and any off-site storage. Send additions or removals to the coordinator and review the resulting paperwork before pickup."] },
    ], relatedIds: ["before-the-inventory-call", "residential-moving", "packing-services", "who-handles-my-move"],
  }),
  service("es", "senior-moving", "mudanzas-para-personas-mayores", {
    navLabel: "Mudanzas para personas mayores", title: "Prepare la mudanza con quienes conocen su hogar.",
    description: "Decida qué cabe, quién puede ayudar con los acuerdos y qué necesita tener a mano. Prepare un inventario claro antes de revisar los servicios.",
    sections: [
      { heading: "Tome decisiones habitación por habitación", paragraphs: ["Use las medidas de la nueva vivienda para decidir qué llevar. Empiece por los muebles de uso diario y los recuerdos personales; después revise armarios y espacios de almacenamiento. Separe las listas de venta, donación y envío para no incluir un objeto dos veces en el inventario."] },
      { heading: "Elija quién puede ayudar a coordinar", paragraphs: ["Decida quién participará en la conversación sobre el presupuesto y quién responderá preguntas en cada domicilio. Consulte cómo autorizar a un familiar u otra persona de confianza para hablar de los acuerdos. Si se muda a una comunidad administrada, pregunte por horarios de llegada, reserva de ascensor y procedimientos de recepción."], bullets: ["Mantenga accesibles medicamentos, documentos personales y artículos de uso diario.", "Señale piezas frágiles, muy pesadas o de valor sentimental para revisarlas por separado.", "Pregunte qué tareas de embalaje o manipulación pueden incluirse por escrito."] },
      { heading: "¿La coordinación incluye cuidados personales?", paragraphs: ["No lo dé por hecho. Organice por separado la asistencia personal, el viaje y las necesidades de salud con las personas adecuadas. Incluya esas necesidades en su propio plan sin compartir información médica en el formulario de cotización."] },
      { heading: "¿Cómo evitar cambios de inventario de última hora?", paragraphs: ["Haga una revisión final con la persona que le ayuda. Comprueben armarios, cajones y cualquier almacén externo. Comunique al coordinador lo que añade o retira y revise los documentos actualizados antes de la recogida."] },
    ], relatedIds: ["before-the-inventory-call", "residential-moving", "packing-services", "who-handles-my-move"],
  }),
  service("en", "packing-services", "packing-services", {
    navLabel: "Packing services", title: "Choose what you would like help packing.",
    description: "Decide whether you need help with a room, fragile pieces or the whole home. Ask for materials, labor and handling to be described in the estimate.",
    sections: [
      { heading: "Separate the packing list from the shipping list", paragraphs: ["A piece may be travelling without needing packing help, while a small cupboard of dishes may need substantial preparation. Mark each room with what you will pack and what you want the provider to review. Include mirrors, artwork and other pieces that may need individual handling instructions."] },
      { heading: "Discuss the actual work and materials", paragraphs: ["Ask which boxes, wrapping materials, labor, disassembly and unpacking are included, which are optional and who will remove packing debris. Confirm whether packing happens before or on pickup day. If you are packing some items yourself, ask the carrier for its instructions and restrictions."], bullets: ["Identify fragile items and any original packaging you still have.", "Tell the coordinator about objects that are difficult to lift or describe.", "Keep documents, medications and travel essentials out of the packing area."] },
      { heading: "Does packing change protection for my belongings?", paragraphs: ["Ask the carrier to explain the applicable valuation and claims terms and how owner-packed items are treated. Do not infer coverage from the word 'professional' or from a packing service name. Read the official consumer materials and your shipment documents."], sourceIds: ["fmcsa-checklist"] },
      { heading: "What should I do if I add a room?", paragraphs: ["Update both the packing scope and shipment inventory. Ask for revised written terms before the added work starts. A clear list makes it easier to compare the same tasks across estimates."] },
    ], relatedIds: ["before-the-inventory-call", "comparing-moving-estimates", "residential-moving", "long-distance-moving"],
  }),
  service("es", "packing-services", "servicios-de-embalaje", {
    navLabel: "Servicios de embalaje", title: "Elija qué quiere que le ayuden a embalar.",
    description: "Decida si necesita ayuda con una habitación, objetos frágiles o toda la vivienda. Pida que el presupuesto detalle materiales, mano de obra y manipulación.",
    sections: [
      { heading: "Separe la lista de embalaje del inventario de envío", paragraphs: ["Un mueble puede viajar sin necesitar ayuda para embalarlo, mientras que una pequeña alacena de vajilla puede requerir bastante preparación. Anote por habitación qué embalará usted y qué quiere que revise el proveedor. Incluya espejos, obras de arte y otras piezas que puedan necesitar instrucciones particulares."] },
      { heading: "Revise el trabajo y los materiales concretos", paragraphs: ["Pregunte qué cajas, materiales, mano de obra, desmontaje y desembalaje se incluyen, cuáles son opcionales y quién retira los residuos. Confirme si el embalaje ocurre antes de la recogida o ese mismo día. Si usted embala parte del envío, pida al transportista sus instrucciones y restricciones."], bullets: ["Identifique objetos frágiles y embalajes originales que aún conserva.", "Describa los objetos difíciles de levantar o explicar.", "Deje documentos, medicamentos y artículos de viaje fuera de la zona de embalaje."] },
      { heading: "¿El embalaje cambia la protección de mis pertenencias?", paragraphs: ["Pida al transportista que explique las condiciones de valoración y reclamación, y cómo se tratan los objetos embalados por usted. No deduzca la cobertura de la palabra 'profesional' ni del nombre del servicio. Lea los materiales oficiales para consumidores y los documentos de su envío."], sourceIds: ["fmcsa-checklist"] },
      { heading: "¿Qué hago si añado una habitación?", paragraphs: ["Actualice tanto el alcance del embalaje como el inventario del envío. Pida las nuevas condiciones por escrito antes de que comience el trabajo adicional. Una lista clara facilita comparar las mismas tareas entre presupuestos."] },
    ], relatedIds: ["before-the-inventory-call", "comparing-moving-estimates", "residential-moving", "long-distance-moving"],
  }),
  service("en", "storage-options", "storage-options", {
    navLabel: "Storage questions", title: "Moving out before you can move in? Plan for the gap.",
    description: "Ask about storage availability for your shipment, access while stored, handling charges and the process for scheduling delivery.",
    sections: [
      { heading: "Explain the gap, including what you do not know", paragraphs: ["Give your earliest move-out date and the earliest date the destination could receive the shipment. Say whether that date is confirmed or depends on a closing, lease or construction work. Ask the coordinator what arrangements can be considered for your route; this page does not confirm a storage facility or space reservation."] },
      { heading: "Ask what happens between pickup and delivery", paragraphs: ["Before agreeing to storage, ask who holds the goods, how long the stated terms apply and how to request delivery. Ask whether you can access items during storage and what notice, handling or redelivery charges would apply. Describe anything with temperature, humidity or special handling requirements and ask for an explicit answer."], bullets: ["Who is the storage provider, and whom do I contact?", "What charges apply if the gap lasts longer than expected?", "What written protection and claim terms apply while the goods are stored?"] },
      { heading: "Does storage mean climate-controlled access whenever I need it?", paragraphs: ["No such conditions should be assumed. Facility conditions, customer access and service availability need confirmation for the actual arrangement. Keep essentials with you rather than relying on access to a particular box."] },
      { heading: "Compare the whole journey", paragraphs: ["Use the estimate worksheet to compare pickup, storage, handling and final delivery together. Ask what would change if the delivery address or date changes. Save the written instructions for requesting redelivery with the provider's contact details."], sourceIds: ["fmcsa-checklist"] },
    ], relatedIds: ["comparing-moving-estimates", "long-distance-moving", "residential-moving", "who-handles-my-move"],
  }),
  service("es", "storage-options", "opciones-de-almacenamiento", {
    navLabel: "Preguntas sobre almacenamiento", title: "¿Debe salir antes de poder entrar? Planifique ese intervalo.",
    description: "Pregunte por disponibilidad de almacenamiento para su envío, acceso a los objetos, cargos de manipulación y cómo programar la entrega.",
    sections: [
      { heading: "Explique el intervalo y lo que aún no sabe", paragraphs: ["Indique la primera fecha en que debe salir y cuándo podría recibirse el envío en destino. Aclare si esa fecha está confirmada o depende de una compraventa, contrato de alquiler u obra. Pregunte al coordinador qué acuerdos pueden estudiarse para su ruta; esta página no confirma un almacén ni una reserva de espacio."] },
      { heading: "Pregunte qué sucede entre la recogida y la entrega", paragraphs: ["Antes de aceptar el almacenamiento, pregunte quién guarda los bienes, cuánto duran las condiciones indicadas y cómo solicitar la entrega. Consulte si podrá acceder a objetos y qué aviso previo o cargos de manipulación y nueva entrega se aplicarían. Describa cualquier necesidad de temperatura, humedad o manejo especial y pida una respuesta expresa."], bullets: ["¿Quién presta el almacenamiento y con quién me comunico?", "¿Qué cargos se aplican si el intervalo se prolonga?", "¿Qué condiciones de protección y reclamación se aplican mientras los bienes están almacenados?"] },
      { heading: "¿Puedo suponer climatización y acceso cuando quiera?", paragraphs: ["No. Las condiciones del lugar, el acceso del cliente y la disponibilidad deben confirmarse para el acuerdo concreto. Lleve consigo lo esencial en vez de depender del acceso a una caja determinada."] },
      { heading: "Compare el recorrido completo", paragraphs: ["Use la hoja de comparación para revisar juntos recogida, almacenamiento, manipulación y entrega final. Pregunte qué cambiaría si cambia la fecha o el domicilio de entrega. Guarde las instrucciones escritas para pedir la entrega junto con los datos del proveedor."], sourceIds: ["fmcsa-checklist"] },
    ], relatedIds: ["comparing-moving-estimates", "long-distance-moving", "residential-moving", "who-handles-my-move"],
  }),
  service("en", "auto-transport", "auto-transport", {
    navLabel: "Vehicle transport questions", title: "Taking your car to your new home? Ask about a separate transport plan.",
    description: "Have the vehicle's year, make, model, condition and preferred dates ready. Confirm the provider and terms for vehicle shipping separately from household goods.",
    sections: [
      { heading: "Describe the vehicle and the route", paragraphs: ["Start with the year, make and model, whether the vehicle operates, any modifications and where it can be collected. Explain how its timing relates to your household move. Ask your coordinator whether vehicle shipping can be arranged for the route and dates; an inquiry does not confirm an option or a carrier."] },
      { heading: "Ask for the provider's preparation instructions", paragraphs: ["Ask which transport methods are available, what pickup and delivery access is required, and how vehicle condition will be documented. Confirm instructions for keys, fuel, personal belongings and any alarm or special operating procedure directly with the provider."], bullets: ["Who will transport the vehicle and who handles scheduling?", "What are the written payment, cancellation and condition-reporting terms?", "Is vehicle transport a separate agreement from the household shipment?"] },
      { heading: "Are open and enclosed transport always available?", paragraphs: ["Do not assume either option is available for your route. Ask the provider to identify the proposed method and any limitations before you agree. This guide makes no promise about equipment, coverage or delivery dates."] },
      { heading: "Keep the two plans coordinated", paragraphs: ["Save the vehicle provider's contacts separately from those for the household shipment. Confirm who can hand over and receive the car, and tell the provider if the access or travel plan changes. Use a separate written comparison if you receive more than one vehicle-shipping offer."] },
    ], relatedIds: ["long-distance-moving", "residential-moving", "who-handles-my-move"],
  }),
  service("es", "auto-transport", "transporte-de-autos", {
    navLabel: "Preguntas sobre transporte de autos", title: "¿Llevará su auto a su nuevo hogar? Pregunte por un plan de transporte separado.",
    description: "Tenga a mano año, marca, modelo, estado del vehículo y fechas preferidas. Confirme proveedor y condiciones del auto por separado del envío del hogar.",
    sections: [
      { heading: "Describa el vehículo y la ruta", paragraphs: ["Indique año, marca y modelo, si el vehículo funciona, sus modificaciones y dónde puede recogerse. Explique cómo se relacionan sus fechas con la mudanza del hogar. Pregunte al coordinador si puede organizarse el transporte del auto para esa ruta y fechas; una consulta no confirma una opción ni un transportista."] },
      { heading: "Pida las instrucciones de preparación del proveedor", paragraphs: ["Pregunte qué modalidades están disponibles, qué acceso se necesita para recoger y entregar, y cómo se documentará el estado del vehículo. Confirme directamente con el proveedor las instrucciones sobre llaves, combustible, objetos personales, alarmas y cualquier procedimiento especial."], bullets: ["¿Quién transportará el vehículo y quién coordina las fechas?", "¿Cuáles son las condiciones escritas de pago, cancelación y registro del estado del auto?", "¿El transporte del vehículo tiene un contrato separado del envío del hogar?"] },
      { heading: "¿Siempre hay transporte abierto y cerrado?", paragraphs: ["No suponga que ninguna de las dos opciones está disponible para su ruta. Pida al proveedor que identifique la modalidad propuesta y sus limitaciones antes de aceptar. Esta guía no promete equipos, cobertura ni fechas de entrega."] },
      { heading: "Mantenga coordinados ambos planes", paragraphs: ["Guarde los contactos del proveedor del vehículo separados de los del envío del hogar. Confirme quién entregará y recibirá el auto, y avise si cambian el acceso o el viaje. Compare por escrito y por separado las ofertas de transporte del vehículo."] },
    ], relatedIds: ["long-distance-moving", "residential-moving", "who-handles-my-move"],
  }),
];
