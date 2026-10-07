"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, PhoneCall, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/lib/data";

export default function AboutSection() {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: "+15",
      label: t("Años de Trayectoria", "Years of Track Record"),
      sub: t("Ingeniería en manufactura modular", "Modular manufacturing engineering"),
    },
    {
      value: "100%",
      label: t("Cobertura en México", "Coverage across Mexico"),
      sub: t("Logística y traslados nacionales", "Nationwide logistics and transit"),
    },
    {
      value: "24-48h",
      label: t("Despliegue Inmediato", "Rapid Deployment"),
      sub: t("Instalación Plug & Play en obra", "Plug & Play on-site installation"),
    },
    {
      value: "Cal. 14",
      label: t("Acero Certificado", "Certified Steel"),
      sub: t("Garantía de integridad estructural", "Structural integrity warranty"),
    },
  ];

  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-[#f5f5f7] text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Text Column */}
          <FadeIn direction="up">
            <div>
              <p className="text-base sm:text-lg font-semibold text-[#1d1d1f] mb-3">
                {t("Identidad e ingeniería", "Identity & Engineering")}
              </p>
              <SciFiHeading
                text={t(
                  "Espacios de trabajo móviles. Seguros y de alta eficiencia.",
                  "Mobile workspaces. Secure and highly efficient."
                )}
                as="h2"
                align="left"
                className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08] mb-6"
                showLaser={false}
                showHudTag={false}
                duration={750}
              />
              <p className="text-sm sm:text-base text-[#6e6e73] font-light leading-relaxed mb-6">
                {language === "en" ? (
                  <>
                    At <strong className="text-black font-semibold">Capelton Mexico</strong> we develop rapid-implementation modular solutions for industry, mining, and construction.
                  </>
                ) : (
                  <>
                    En <strong className="text-black font-semibold">Capelton de México</strong> desarrollamos soluciones modulares de rápida implementación para la industria, la minería y la construcción.
                  </>
                )}
              </p>
              <p className="text-sm sm:text-base text-[#6e6e73] font-light leading-relaxed mb-8">
                {t(
                  "Espacios climatizados, ergonómicos y construidos con materiales de alto desempeño para adaptarse al ritmo de trabajo más demandante.",
                  "Climate-controlled, ergonomic spaces engineered with high-performance materials to adapt to the most demanding operational pace."
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <a
                  href={CONTACT_INFO.ventas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{t("WhatsApp Ventas", "WhatsApp Sales")}</span>
                  <span className="text-[10px] opacity-80 font-normal">55 2964 0104</span>
                </a>
                <a
                  href={CONTACT_INFO.rentas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold text-black bg-white hover:bg-gray-50 border border-black/10 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-capelton-green" />
                  <span>{t("WhatsApp Rentas", "WhatsApp Rentals")}</span>
                  <span className="text-[10px] text-[#6e6e73] font-normal">55 7948 3632</span>
                </a>
              </div>

              <Link
                href="/nosotros"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:underline group"
              >
                <span>
                  {t(
                    "Conoce nuestra historia completa y procesos de manufactura",
                    "Learn our complete history and manufacturing processes"
                  )}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Right Stats Grid (Apple Bento Style) */}
          <FadeIn direction="up" delay={200}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[28px] p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                >
                  <span className="text-4xl sm:text-5xl font-semibold text-black tracking-tight mb-3">
                    {stat.value}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-black">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] text-[#86868b] mt-0.5 font-light">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
