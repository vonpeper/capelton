"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, CheckCircle2, ArrowRight, ShieldCheck, Clock, FileCheck, Sparkles } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function VentaRentaSection() {
  const { t, language } = useLanguage();

  return (
    <section id="modalidades" className="py-24 sm:py-32 bg-[#f5f5f7] text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-capelton-green/12 via-capelton-green/4 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse duration-[5000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-2">
              {language === "en"
                ? "Direct Manufacturing & Supply"
                : "Modalidades de Adquisición"}
            </span>
            <SciFiHeading
              text={
                language === "en"
                  ? "Mobile Workspaces Built Around Your Operation."
                  : "Dos esquemas a tu medida. Venta directa o Renta flexible."
              }
              as="h2"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-3"
              showLaser={false}
              showHudTag={false}
              duration={750}
            />
            <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed">
              {language === "en"
                ? "Direct factory manufacturing for North American jobsites, contractors, and industrial facilities. Reliable standard configurations and custom solutions."
                : "Soluciones diseñadas para adaptarse al flujo operativo, duración y requerimientos de tu proyecto en cualquier estado del país."}
            </p>
          </div>
        </FadeIn>

        {/* Dual Cards Grid: US vs MX adaptation */}
        {language === "en" ? (
          /* USA VERSION: Direct Manufacturing + Core US Configurations */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Factory Direct Sale */}
            <FadeIn direction="up" delay={100}>
              <div className="bg-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-neutral-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#f5f5f7] px-3.5 py-1.5 rounded-full">
                      Factory Direct
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center text-black">
                      <ShieldCheck className="w-5 h-5 text-capelton-green" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-black tracking-tight mb-3">
                    Direct Purchase & Manufacturing
                  </h3>
                  <p className="text-sm text-[#6e6e73] font-normal leading-relaxed mb-8">
                    Standard configurations and custom mobile workspaces built in our own manufacturing plant, delivered with direct factory backing and no broker markups.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Factory-Direct Pricing:</strong> Direct manufacturing relationship eliminating middleman markups.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>One-Piece Aluminum Roof:</strong> Seamless continuous roof preventing leak risks on severe jobsite exposures.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Reinforced Steel Chassis:</strong> Engineered structural frame with certified crane lifting points and road durability.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Ready-to-Operate Fitout:</strong> Pre-wired electrical, air conditioning system, LED lighting, and SPC rigid-core flooring.
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={`https://wa.me/5215529640104?text=${encodeURIComponent(
                      "Hello, I would like to request a quote for direct purchase of Capelton mobile workspaces"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("ventas", "us_direct_purchase")}
                    className="w-full py-4 px-8 rounded-full text-sm font-bold text-white bg-black hover:bg-capelton-green transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Request Purchase Quote</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#86868b]">
                    <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-pulse" />
                    <span>
                      Direct Sales Desk: <strong className="text-black font-semibold">+52 55 2964 0104</strong>
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Card 2: Core US Workspace Configurations */}
            <FadeIn direction="up" delay={200}>
              <div className="bg-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border-2 border-capelton-green/30 hover:border-capelton-green hover:shadow-[0_20px_50px_rgba(0,177,64,0.12)] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Proven Field Configurations</span>
                    </span>
                    <div className="w-9 h-9 rounded-full bg-capelton-green/10 flex items-center justify-center text-capelton-green">
                      <Clock className="w-5 h-5 text-capelton-green" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-black tracking-tight mb-3">
                    Core US Workspace Models
                  </h3>
                  <p className="text-sm text-[#6e6e73] font-normal leading-relaxed mb-8">
                    Standard layouts optimized for North American operations, with rapid production schedules and flexible logistic options.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>CVCM-6M2 Portable Booth (8×8 ft):</strong> Access control, security checks, and jobsite entrance monitoring.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>CM-6M Field Office (20×8 ft):</strong> Ideal footprint for project managers, safety meetings, and site coordination.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>CM-8M with Restroom (26×8 ft):</strong> Executive on-site office with private built-in restroom facility.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Custom Builds & Complexes:</strong> Crew quarters, dining halls, and multi-unit complex configurations on demand.
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href="#duo-comparator"
                    className="w-full py-4 px-8 rounded-full text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all duration-300 shadow-[0_8px_25px_rgba(0,177,64,0.3)] hover:shadow-[0_12px_35px_rgba(0,177,64,0.45)] flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                  >
                    <span>Compare US Configurations</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#86868b]">
                    <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-pulse" />
                    <span>
                      Vexon Strategic Sister Partner in North America
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        ) : (
          /* MEXICO VERSION: Venta Directa + Renta Flexible */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* VENTA CARD */}
            <FadeIn direction="up" delay={100}>
              <div className="bg-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-neutral-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#86868b] bg-[#f5f5f7] px-3.5 py-1.5 rounded-full">
                      Patrimonio Propio
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center text-black">
                      <ShieldCheck className="w-5 h-5 text-capelton-green" />
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-3">
                    Venta Directa
                  </h3>
                  <p className="text-sm text-[#6e6e73] font-normal leading-relaxed mb-8">
                    Adquisición definitiva como activo fijo de alta durabilidad, diseñado con especificaciones personalizadas y respaldo de planta para tu empresa.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Activo fijo patrimonial:</strong> Fortalece la infraestructura de tu empresa con unidades durables y reubicables.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Configuración a tu medida:</strong> Distribución interior, privados, baños y acabados según tu frente de trabajo.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Garantía directa de planta:</strong> Fabricación con chasis de acero reforzado y techo de aluminio de una pieza.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Trato directo sin intermediarios:</strong> Disponibilidad continua de refacciones y soporte técnico de fábrica.
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={`https://wa.me/5215529640104?text=${encodeURIComponent(
                      "Hola, deseo cotizar la VENTA de un espacio móvil Capelton"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("ventas", "venta_renta_section")}
                    className="w-full py-4 px-8 rounded-full text-sm font-bold text-white bg-black hover:bg-capelton-green transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Cotizar en Venta</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#86868b]">
                    <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-pulse" />
                    <span>
                      WhatsApp Ventas Directas: <strong className="text-black font-semibold">55 2964 0104</strong>
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* RENTA CARD */}
            <FadeIn direction="up" delay={200}>
              <div className="bg-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border-2 border-capelton-green/30 hover:border-capelton-green hover:shadow-[0_20px_50px_rgba(0,177,64,0.12)] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Esquema Operativo</span>
                    </span>
                    <div className="w-9 h-9 rounded-full bg-capelton-green/10 flex items-center justify-center text-capelton-green">
                      <Clock className="w-5 h-5 text-capelton-green" />
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-3">
                    Renta Flexible
                  </h3>
                  <p className="text-sm text-[#6e6e73] font-normal leading-relaxed mb-8">
                    La solución práctica para frentes de obra temporales y contratos por proyecto sin comprometer flujo de capital inicial.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Flexibilidad operativa:</strong> Contratos mensuales adaptados al avance real de tu obra o licitación.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Despliegue ágil en sitio:</strong> Flota disponible en inventario para entrega rápida en tu ubicación.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Soporte y mantenimiento:</strong> Asistencia técnica y piezas incluidas durante la vigencia del servicio.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#1d1d1f]">
                        <strong>Opción a adquisición:</strong> Facilidad de compra con valor residual al concluir el periodo de renta.
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={`https://wa.me/5215579483632?text=${encodeURIComponent(
                      "Hola, deseo cotizar la RENTA de un espacio móvil Capelton"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("rentas", "venta_renta_section")}
                    className="w-full py-4 px-8 rounded-full text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all duration-300 shadow-[0_8px_25px_rgba(0,177,64,0.3)] hover:shadow-[0_12px_35px_rgba(0,177,64,0.45)] flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Cotizar en Renta</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#86868b]">
                    <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-pulse" />
                    <span>
                      WhatsApp Rentas y Arrendamiento: <strong className="text-black font-semibold">55 7948 3632</strong>
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </section>
  );
}
