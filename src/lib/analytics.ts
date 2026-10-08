declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GTM_ID = "GTM-PLPC86J";
export const GOOGLE_ADS_ID = "AW-5928991403";

// Caché de deduplicación para evitar registrar dos veces el mismo clic en menos de 500ms
let lastEventKey = "";
let lastEventTimestamp = 0;

/**
 * Dispara un evento a window.dataLayer (Google Tag Manager) y window.gtag (Google Ads)
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const eventKey = `${eventName}_${JSON.stringify(eventParams)}`;
  const now = Date.now();
  if (now - lastEventTimestamp < 500 && lastEventKey === eventKey) {
    return;
  }
  lastEventTimestamp = now;
  lastEventKey = eventKey;

  // 1. Google Tag Manager dataLayer push
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    send_to: GOOGLE_ADS_ID,
    ...eventParams,
  });

  // 2. Google Ads directo via gtag
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      send_to: GOOGLE_ADS_ID,
      ...eventParams,
    });
  }
}

/**
 * Evento de conversión al interactuar con cualquier enlace o botón de WhatsApp
 */
export function trackWhatsAppClick(
  department: "ventas" | "rentas",
  context: string = "general"
) {
  const specificEvent = `whatsapp_${department}_conversion`;

  // Disparador específico para Tags de GTM
  trackEvent(specificEvent, {
    conversion_type: "whatsapp",
    department,
    context,
    value: 1.0,
    currency: "MXN",
  });

  // Disparador estándar de Google Ads / Analytics
  trackEvent("conversion", {
    send_to: GOOGLE_ADS_ID,
    conversion_type: "whatsapp",
    department,
    context,
    value: 1.0,
    currency: "MXN",
  });

  // Disparador general de generación de prospecto (Lead)
  trackEvent("generate_lead", {
    lead_type: `whatsapp_${department}`,
    department,
    context,
    value: 1.0,
    currency: "MXN",
  });

  // Disparador estándar de contacto
  trackEvent("contact", {
    method: "whatsapp",
    department,
    context,
  });
}

/**
 * Evento de conversión al hacer clic en un enlace de llamada telefónica (tel:)
 */
export function trackPhoneCallClick(
  department: "ventas" | "rentas",
  phone: string,
  context: string = "phone_link"
) {
  const specificEvent = `call_${department}_conversion`;

  trackEvent(specificEvent, {
    conversion_type: "phone_call",
    department,
    phone,
    context,
    value: 1.0,
    currency: "MXN",
  });

  trackEvent("conversion", {
    send_to: GOOGLE_ADS_ID,
    conversion_type: "phone_call",
    department,
    phone,
    context,
    value: 1.0,
    currency: "MXN",
  });

  trackEvent("generate_lead", {
    lead_type: `call_${department}`,
    department,
    phone,
    context,
  });
}

/**
 * Evento de contacto por correo electrónico (mailto:)
 */
export function trackEmailClick(email: string, context: string = "email_link") {
  trackEvent("email_contact_conversion", {
    conversion_type: "email",
    email,
    context,
  });

  trackEvent("generate_lead", {
    lead_type: "email",
    email,
    context,
  });
}
