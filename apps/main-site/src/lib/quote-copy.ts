import type { QuoteLocale } from "./quote-journey";

export const quoteCopy = {
  en: {
    title: "Request Your Moving Quote", subtitle: "Four short steps. No obligation.",
    steps: ["Contact", "Location", "Details", "Quote"],
    pickup: "Moving From (ZIP)", destination: "Moving To (ZIP)", pickupPlaceholder: "Pickup ZIP code", destinationPlaceholder: "Destination ZIP code",
    date: "Estimated Move Date", datePlaceholder: "Select move date", size: "Move Size", sizePlaceholder: "Select move size…",
    name: "Full Name", namePlaceholder: "Your name", email: "Email", phone: "Phone", continue: "Continue", back: "Back", submit: "Request Free Quote", submitting: "Submitting…",
    received: "Request Received", confirmation: "A Vantage moving coordinator will follow up. To speak with someone now, call", reset: "Start Over",
    failure: "We couldn't confirm receipt. Your details are still here. Please try again or call us.",
    consent: "I agree to receive SMS messages from Vantage Movers about my moving quote request, scheduling updates, and customer support. Msg & data rates may apply. Reply STOP to opt out. Consent is not required to submit a quote request.",
    trust: ["No obligation", "SMS consent is optional"],
    resolving: "Checking ZIP…", unverified: "We couldn't verify this ZIP automatically, but you can still continue.", lookupFailed: "ZIP lookup is unavailable. You can continue with a five-digit ZIP.",
    confirmDestination: "Confirm delivery location", guide: "Plan for your destination", genericGuide: "Moving preparation guide", draft: "Your progress stays in this tab for up to one hour. Clear it when using a shared device.", clearDraft: "Clear saved progress",
  },
  es: {
    title: "Cotice su mudanza", subtitle: "Cuatro pasos breves. Sin compromiso.",
    steps: ["Contacto", "Ruta", "Detalles", "Cotización"],
    pickup: "Origen (código postal)", destination: "Destino (código postal)", pickupPlaceholder: "Código postal de origen", destinationPlaceholder: "Código postal de destino",
    date: "Fecha prevista de mudanza", datePlaceholder: "Elija la fecha", size: "Tamaño de la mudanza", sizePlaceholder: "Seleccione el tamaño…",
    name: "Nombre completo", namePlaceholder: "Su nombre", email: "Correo electrónico", phone: "Teléfono", continue: "Continuar", back: "Atrás", submit: "Solicitar cotización gratis", submitting: "Enviando…",
    received: "Solicitud recibida", confirmation: "Un coordinador de Vantage se pondrá en contacto con usted. Para hablar con alguien ahora, llame al", reset: "Empezar de nuevo",
    failure: "No pudimos confirmar la recepción. Sus datos siguen aquí. Inténtelo de nuevo o llámenos.",
    consent: "Acepto recibir mensajes SMS de Vantage Movers sobre mi solicitud de cotización de mudanza, actualizaciones de programación y atención al cliente. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para cancelar. No es necesario dar este consentimiento para enviar una solicitud de cotización.",
    trust: ["Sin compromiso", "Consentimiento SMS opcional"],
    resolving: "Verificando código postal…", unverified: "No pudimos verificar este código postal automáticamente, pero puede continuar.", lookupFailed: "La consulta no está disponible. Puede continuar con un código postal de cinco dígitos.",
    confirmDestination: "Confirmar lugar de entrega", guide: "Prepare su llegada", genericGuide: "Guía para preparar la mudanza", draft: "Su progreso se guarda en esta pestaña durante un máximo de una hora. Bórrelo si utiliza un dispositivo compartido.", clearDraft: "Borrar progreso guardado",
  },
} as const;

const spanishErrors: Record<string, string> = {
  "Enter a 5-digit ZIP": "Ingrese un código postal de cinco dígitos",
  "Pick a move date": "Elija una fecha de mudanza",
  "Move date can't be in the past": "La fecha de mudanza no puede ser anterior a hoy",
  "Select a move size": "Seleccione el tamaño de la mudanza",
  "Tell us your name": "Ingrese su nombre",
  "Enter a valid phone number": "Ingrese un número de teléfono válido",
  "Enter a valid email": "Ingrese un correo electrónico válido",
};
export function quoteError(message: string | undefined, locale: QuoteLocale) {
  return message && locale === "es" ? spanishErrors[message] ?? "Revise este campo" : message;
}
export function moveSizeLabel(size: string, locale: QuoteLocale) {
  if (locale === "en") return size;
  return ({ Studio: "Estudio", "1 Bedroom": "1 dormitorio", "2 Bedrooms": "2 dormitorios", "3 Bedrooms": "3 dormitorios", "4 Bedrooms": "4 dormitorios", "5+ Bedrooms": "5 o más dormitorios", Office: "Oficina" } as Record<string, string>)[size] ?? size;
}
