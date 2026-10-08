"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, CheckCircle2, ArrowRight, ShieldCheck, Clock, FileCheck, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function VentaRentaSection() {
  const { t } = useLanguage();

  return (
    <section id="modalidades" className="py-24 sm:py-32 bg-[#f5f5f7] text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-capelton-green/12 via-capelton-green/4 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse duration-[5000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-2">
              {t("Modalidades de Adquisición", "Acquisition Modes")}
            </span>
            <SciFiHeading
              text={t(
                "Dos esquemas a tu medida. Venta directa o Renta flexible.",
                "Two tailored solutions. Direct purchase or flexible rental."
              )}
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08] mb-4"
              showLaser={false}
              showHudTag={false}
              duration={750}
            />
            <p className="text-base text-[#6e6e73] font-normal leading-relaxed">
              {t(
                "Soluciones diseñadas para adaptarse al flujo de caja, duración y escala de tu proyecto en cualquier estado del país.",
                "Solutions engineered to adapt to your project's cash flow, timeline, and scale in any state across Mexico."
              )}
            </p>
          </div>
        </FadeIn>

        {/* Two Prominent Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* VENTA CARD */}
          <FadeIn direction="up" delay={100}>
            <div className="bg-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-neutral-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-neutral-100 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#86868b] bg-[#f5f5f7] px-3.5 py-1.5 rounded-full">
                    {t("Patrimonio Permanente", "Permanent Asset")}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center text-black">
                    <ShieldCheck className="w-5 h-5 text-capelton-green" />
                  </div>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-3">
                  {t("Venta Directa", "Direct Purchase")}
                </h3>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed mb-8">
                  {t(
                    "Adquisición definitiva como activo fijo de alta durabilidad, diseñado con especificaciones personalizadas para tu empresa.",
                    "Definitive acquisition as a high-durability fixed asset, custom-built to your company's exact operational requirements."
                  )}
                </p>

                {/* Features Checklist */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Activo Fijo Propio:", "Owned Fixed Asset:")}</strong>{" "}
                      {t(
                        "Incrementa el patrimonio corporativo y es depreciable contablemente.",
                        "Expands corporate equity and qualifies for standard accounting depreciation."
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Personalización Total:", "Total Customization:")}</strong>{" "}
                      {t(
                        "Distribución interior, colores institucionales y acabados a la medida.",
                        "Custom interior partitions, corporate branding colors, and bespoke executive finishes."
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Garantía Estructural Directa:", "Direct Structural Warranty:")}</strong>{" "}
                      {t(
                        "Fabricada en planta con acero Calibre 14 sin intermediarios.",
                        "Factory manufactured with heavy-duty 14-Gauge steel with no middlemen."
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Cero Pagos Recurrentes:", "Zero Recurring Fees:")}</strong>{" "}
                      {t(
                        "Máximo retorno de inversión para operaciones permanentes.",
                        "Maximum return on investment for long-term and permanent field operations."
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Impact Button */}
              <div>
                <a
                  href={`https://wa.me/5215529640104?text=${encodeURIComponent(
                    t(
                      "Hola, deseo cotizar la VENTA de un espacio modular Capelton",
                      "Hello, I would like to quote the PURCHASE of a Capelton modular space"
                    )
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", "venta_renta_section")}
                  className="w-full py-4 px-8 rounded-full text-sm font-bold text-white bg-black hover:bg-capelton-green transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t("Cotizar en Venta", "Get Purchase Quote")}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#86868b]">
                  <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-pulse" />
                  <span>
                    {t("WhatsApp Ventas Directas:", "Direct Sales WhatsApp:")}{" "}
                    <strong className="text-black font-semibold">55 2964 0104</strong>
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* RENTA CARD */}
          <FadeIn direction="up" delay={200}>
            <div className="bg-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border-2 border-capelton-green/30 hover:border-capelton-green hover:shadow-[0_20px_50px_rgba(0,177,64,0.12)] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group">
              {/* Subtle green ambient inside */}
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-capelton-green/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t("100% Deducible (OPEX)", "100% Tax-Deductible (OPEX)")}</span>
                  </span>
                  <div className="w-9 h-9 rounded-full bg-capelton-green/10 flex items-center justify-center text-capelton-green">
                    <Clock className="w-5 h-5 text-capelton-green" />
                  </div>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-3">
                  {t("Renta Flexible", "Flexible Rental")}
                </h3>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed mb-8">
                  {t(
                    "La solución ideal para obras, licitaciones y campamentos temporales sin descapitalizar tu presupuesto operativo.",
                    "The ideal solution for infrastructure worksites, government bids, and temporary base camps without depleting your capital budget."
                  )}
                </p>

                {/* Features Checklist */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Deducción Fiscal Inmediata:", "Immediate Tax Deduction:")}</strong>{" "}
                      {t(
                        "Gasto operativo 100% deducible mensual en su totalidad.",
                        "Monthly operating expense (OPEX) 100% tax-deductible."
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Despliegue Inmediato 24-48h:", "Rapid 24-48h Deployment:")}</strong>{" "}
                      {t(
                        "Flota disponible en inventario para entrega urgente en sitio.",
                        "Readily available inventory fleet dispatched urgently for on-site placement."
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Soporte y Mantenimiento:", "Support & Maintenance:")}</strong>{" "}
                      {t(
                        "Asistencia técnica y piezas incluidas durante todo el contrato.",
                        "Technical assistance and replacement parts included throughout the contract duration."
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#1d1d1f]">
                      <strong>{t("Sin Plazos Forzosos Injustos:", "Flexible Contract Terms:")}</strong>{" "}
                      {t(
                        "Renta por mes o por proyecto con opción a compra residual.",
                        "Rent on a month-to-month or project basis with residual buyout option."
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Impact Button */}
              <div>
                <a
                  href={`https://wa.me/5215579483632?text=${encodeURIComponent(
                    t(
                      "Hola, deseo cotizar la RENTA de un espacio modular Capelton",
                      "Hello, I would like to quote the RENTAL of a Capelton modular space"
                    )
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("rentas", "venta_renta_section")}
                  className="w-full py-4 px-8 rounded-full text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all duration-300 shadow-[0_8px_25px_rgba(0,177,64,0.3)] hover:shadow-[0_12px_35px_rgba(0,177,64,0.45)] flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t("Cotizar en Renta", "Get Rental Quote")}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#86868b]">
                  <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-pulse" />
                  <span>
                    {t("WhatsApp Rentas y Arrendamiento:", "Rentals WhatsApp:")}{" "}
                    <strong className="text-black font-semibold">55 7948 3632</strong>
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
