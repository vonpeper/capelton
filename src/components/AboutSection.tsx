"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, PhoneCall, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function AboutSection() {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: "+15",
      label: t("Años de Trayectoria", "Years of Track Record"),
      sub: t("Manufactura especializada en planta", "Specialized in-house manufacturing"),
    },
    {
      value: "100%",
      label: t("Cobertura y Entrega", "Logistics & Delivery"),
      sub: t("Logística y maniobra en todo México", "Transport and crane placement on site"),
    },
    {
      value: "1 Pieza",
      label: t("Techo de Aluminio", "Seamless Aluminum Roof"),
      sub: t("Sin uniones ni riesgo de filtraciones", "Zero vulnerable seams, zero leaks"),
    },
    {
      value: "Directo",
      label: t("Soporte de Fábrica", "Direct Factory Support"),
      sub: t("Garantía y refacciones sin intermediarios", "Warranty and parts direct from plant"),
    },
  ];

  return (
    <section id="cotizacion-cierre" className="py-24 sm:py-32 bg-[#f5f5f7] text-[#1d1d1f] relative overflow-hidden border-t border-black/5">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <FadeIn direction="up">
              <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-3">
                {t("FABRICACIÓN DIRECTA · ASESORÍA EN SITIO", "DIRECT MANUFACTURING · FIELD GUIDANCE")}
              </span>
              <SciFiHeading
                text={t(
                  "¿Listo para cotizar el espacio móvil de tu proyecto?",
                  "Ready to Configure the Right Workspace for Your Project?"
                )}
                as="h2"
                align="left"
                className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-5"
                showLaser={false}
                showHudTag={false}
                duration={750}
              />
              <p className="text-sm sm:text-base text-[#515154] font-normal leading-relaxed mb-8">
                {t(
                  "Fabricamos en planta propia con chasis de acero reforzado, muros aislados y techo de aluminio continuo. Recibe asesoría técnica personalizada, planos de distribución y propuesta formal con logística incluida.",
                  "Manufactured in-house with reinforced steel chassis, continuous thermal insulation, and seamless aluminum roof. Receive tailored technical consultation, floor plans, and a formal proposal with delivery included."
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <a
                  href={CONTACT_INFO.ventas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", "closing_cta")}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all shadow-[0_4px_15px_rgba(0,177,64,0.3)] hover:shadow-[0_8px_25px_rgba(0,177,64,0.45)] flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t("Solicitar Cotización por WhatsApp", "Request Quote via WhatsApp")}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <Link
                href="/nosotros"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:underline group"
              >
                <span>
                  {t(
                    "Conoce más sobre nuestra historia, valores y planta en Nosotros",
                    "Learn more about our history, values, and manufacturing plant in About Us"
                  )}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeIn>
          </div>

          {/* Right Stats Grid (Apple Bento Style) */}
          <div className="lg:col-span-6">
            <FadeIn direction="up" delay={150}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-2xs border border-black/5 hover:border-capelton-green/40 transition-all"
                  >
                    <span className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-2">
                      {stat.value}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-black">
                        {stat.label}
                      </h4>
                      <p className="text-[11px] text-[#6e6e73] mt-0.5 leading-snug">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
