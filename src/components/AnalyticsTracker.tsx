"use client";

import { useEffect } from "react";
import { trackWhatsAppClick, trackPhoneCallClick, trackEmailClick } from "@/lib/analytics";

/**
 * Componente cliente invisible que intercepta de forma reactiva cualquier interacción
 * de contacto (WhatsApp, llamadas PBX, correos) en toda la aplicación, garantizando
 * que todos los eventos de conversión lleguen a Google Tag Manager y Google Ads.
 */
export default function AnalyticsTracker() {
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      if (!href) return;

      // 1. Detección de enlaces a WhatsApp
      if (
        href.includes("wa.me") ||
        href.includes("wa.link") ||
        href.includes("whatsapp.com")
      ) {
        const isRenta =
          href.includes("5579483632") ||
          href.includes("x5qgqf") ||
          href.toLowerCase().includes("renta") ||
          (target.textContent || "").toLowerCase().includes("renta");

        const department = isRenta ? "rentas" : "ventas";
        const rawContext =
          target.getAttribute("data-tracking-context") ||
          target.getAttribute("title") ||
          target.textContent?.trim() ||
          "whatsapp_cta";

        trackWhatsAppClick(department, rawContext.slice(0, 50));
        return;
      }

      // 2. Detección de enlaces telefónicos
      if (href.startsWith("tel:")) {
        const isRenta =
          href.includes("5579483632") ||
          (target.textContent || "").toLowerCase().includes("renta");

        const department = isRenta ? "rentas" : "ventas";
        const phone = href.replace("tel:", "").trim();
        const rawContext =
          target.getAttribute("data-tracking-context") ||
          target.getAttribute("title") ||
          "direct_call";

        trackPhoneCallClick(department, phone, rawContext.slice(0, 50));
        return;
      }

      // 3. Detección de enlaces mailto
      if (href.startsWith("mailto:")) {
        const email = href.replace("mailto:", "").split("?")[0].trim();
        trackEmailClick(email, "direct_email");
        return;
      }
    }

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  return null;
}
