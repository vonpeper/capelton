"use client";

import React, { useState } from "react";
import { MessageCircle, X, ArrowUpRight, Building2, Truck, PhoneCall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import { CONTACT_INFO } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppBubble() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (SITE_CONFIG.prelaunchMode && pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Floating Dual Sales / Rentals Selector Card */}
      {isOpen && (
        <div className="mb-3 bg-white/95 backdrop-blur-xl border border-black/10 shadow-2xl rounded-3xl p-4 w-[290px] sm:w-[320px] animate-in fade-in slide-in-from-bottom-3 duration-300 relative">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={t("Cerrar ventana", "Close window")}
            className="absolute top-3 right-3 text-[#86868b] hover:text-black p-1 rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-capelton-green animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-capelton-green">
              {t("Atención Oficial en Línea", "Official Support Online")}
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#1d1d1f] leading-tight mb-1">
            {t("¿Qué esquema requieres cotizar?", "Which solution do you need?")}
          </h3>
          <p className="text-[11px] text-[#6e6e73] mb-3 leading-snug">
            {t("Selecciona el área correspondiente para asignarte un asesor especializado:", "Select the department to connect with a specialist:")}
          </p>

          <div className="space-y-2">
            {/* Opción Ventas */}
            <a
              href={CONTACT_INFO.ventas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("ventas", "floating_bubble")}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-black/[0.03] hover:bg-capelton-green hover:text-white group/ventas transition-all border border-black/6"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-capelton-green/10 group-hover/ventas:bg-white/20 flex items-center justify-center text-capelton-green group-hover/ventas:text-white transition-colors">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block text-black group-hover/ventas:text-white transition-colors">
                    {t("WhatsApp Ventas", "WhatsApp Sales")}
                  </span>
                  <span className="text-[10px] text-[#6e6e73] group-hover/ventas:text-white/80 block transition-colors">
                    {CONTACT_INFO.ventas.phone} • {t("Compra", "Purchase")}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-capelton-green group-hover/ventas:text-white transition-colors mr-1" />
            </a>

            {/* Opción Rentas */}
            <a
              href={CONTACT_INFO.rentas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("rentas", "floating_bubble")}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-black/[0.03] hover:bg-black hover:text-white group/rentas transition-all border border-black/6"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-black/5 group-hover/rentas:bg-white/20 flex items-center justify-center text-black group-hover/rentas:text-white transition-colors">
                  <Truck className="w-4 h-4 text-capelton-green group-hover/rentas:text-capelton-green" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block text-black group-hover/rentas:text-white transition-colors">
                    {t("WhatsApp Rentas", "WhatsApp Rentals")}
                  </span>
                  <span className="text-[10px] text-[#6e6e73] group-hover/rentas:text-white/80 block transition-colors">
                    {CONTACT_INFO.rentas.phone} • {t("Arrendamiento", "Rental")}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-black group-hover/rentas:text-white transition-colors mr-1" />
            </a>
          </div>

          <div className="mt-2.5 pt-2 border-t border-black/6 flex items-center justify-between text-[10px] text-[#86868b]">
            <span>{t("Horario: L-V 8:00 a 19:00", "Hours: Mon-Fri 8am-7pm")}</span>
            <span className="text-capelton-green font-semibold">{t("Respuesta en minutos", "Fast reply")}</span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("Abrir canales de WhatsApp", "Open WhatsApp channels")}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-capelton-green hover:bg-capelton-darkgreen text-white shadow-[0_10px_30px_rgba(0,177,64,0.45)] hover:shadow-[0_14px_40px_rgba(0,177,64,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Pulsing Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-capelton-green opacity-40 animate-ping" />

        {/* Inner Icon */}
        <MessageCircle className="w-7 h-7 fill-white relative z-10" />

        {/* Floating Tooltip Label when Closed */}
        {!isOpen && (
          <span className="absolute right-16 bg-black/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
            {t("Ventas (55 2964 0104) y Rentas (55 7948 3632)", "Sales & Rentals WhatsApp")}
          </span>
        )}
      </button>
    </div>
  );
}
