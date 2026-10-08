"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import SciFiHeading from "@/components/SciFiHeading";
import HeroFlagshipShowcase from "@/components/HeroFlagshipShowcase";
import { CONTACT_INFO } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function Hero() {
  const { t } = useLanguage();
  const [introStage, setIntroStage] = useState<"logo" | "heading">("logo");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIntroStage("heading");
      return;
    }

    // Showcase big logo for ~1.7 seconds, then dissolve and reveal animated heading
    const timer = setTimeout(() => {
      setIntroStage("heading");
    }, 1700);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="relative flex flex-col items-center justify-start text-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8 bg-white overflow-hidden">
      {/* Full-width Ambient Breathing Atmosphere in Capelton Green */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Panoramic horizon ambient glow in Capelton Green */}
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[140vw] max-w-[2400px] h-[820px] bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(0,177,64,0.13),rgba(0,177,64,0.03)_65%,transparent_100%)] blur-[130px] animate-pulse duration-[8000ms]" />
        {/* West lateral accent glow (Noroeste & Pacífico) */}
        <div className="absolute top-1/4 -left-28 w-[550px] h-[550px] bg-gradient-to-br from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[140px]" />
        {/* East lateral accent glow (Sureste & Golfo) */}
        <div className="absolute top-1/3 -right-28 w-[600px] h-[600px] bg-gradient-to-bl from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[150px]" />
      </div>

      {/* Full-Width Subtle Transparent Delivery Routes & Mexico Logistics Map Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 sm:opacity-30 select-none transition-opacity duration-700">
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="fullRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00b140" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#00b140" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1d1d1f" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="hubRadarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00b140" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#00b140" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#00b140" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00b140" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00b140" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Technical Coordinate Grid (Delicate latitude / longitude lines spanning full width) */}
          <g stroke="#1d1d1f" strokeOpacity="0.04" strokeWidth="0.8" strokeDasharray="3 6">
            <line x1="0" y1="200" x2="1600" y2="200" />
            <line x1="0" y1="400" x2="1600" y2="400" />
            <line x1="0" y1="600" x2="1600" y2="600" />
            <line x1="250" y1="0" x2="250" y2="800" />
            <line x1="550" y1="0" x2="550" y2="800" />
            <line x1="830" y1="0" x2="830" y2="800" />
            <line x1="1100" y1="0" x2="1100" y2="800" />
            <line x1="1380" y1="0" x2="1380" y2="800" />
          </g>

          {/* Subtle Schematic Silhouette of Mexico Mainland & Baja Peninsula */}
          <path
            d="M 110 140 C 105 180 130 260 170 340 C 200 400 230 460 250 510 C 255 530 240 535 235 515 C 220 460 190 390 160 300 C 135 230 130 180 145 140 M 110 140 L 280 150 L 350 155 L 470 165 L 580 230 L 680 250 L 760 310 L 860 315 L 910 335 C 890 390 890 450 900 480 C 930 520 980 550 1030 565 C 1080 580 1130 620 1180 625 C 1240 630 1280 590 1310 540 C 1330 490 1360 465 1410 460 C 1470 460 1500 475 1495 520 C 1485 560 1460 600 1430 610 L 1430 610 C 1370 620 1300 660 1250 710 C 1200 750 1160 760 1130 750 C 1050 720 980 725 910 715 C 830 705 770 690 730 680 C 660 655 590 610 545 565 C 500 520 460 460 410 380 C 360 310 300 260 250 200 C 200 160 160 145 110 140 Z"
            stroke="#1d1d1f"
            strokeOpacity="0.06"
            strokeWidth="1"
            fill="none"
          />

          {/* Delivery Route Arcs from Central Manufacturing Plant (x=830, y=570) Across Full Width */}
          {/* 1. Hub -> Tijuana / Baja California (Far West x=110) */}
          <path
            d="M 830 570 Q 420 220 110 140"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="4 6"
          />
          {/* 2. Hub -> Hermosillo / Sonora Minería (x=270) */}
          <path
            d="M 830 570 Q 510 320 270 240"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="4 6"
          />
          {/* 3. Hub -> Ciudad Juárez / Frontera Norte (x=470, y=160) */}
          <path
            d="M 830 570 Q 610 290 470 160"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="4 6"
          />
          {/* 4. Hub -> Chihuahua Industrial (x=470, y=260) */}
          <path
            d="M 830 570 Q 630 360 470 260"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="4 6"
          />
          {/* 5. Hub -> Monterrey / Polo Industrial Noreste (x=770, y=320) */}
          <path
            d="M 830 570 Q 800 420 770 320"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* 6. Hub -> Matamoros / Reynosa (x=900, y=330) */}
          <path
            d="M 830 570 Q 890 430 900 330"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="3 5"
          />
          {/* 7. Hub -> Guadalajara / Corredor Occidente (x=580, y=550) */}
          <path
            d="M 830 570 Q 690 580 580 550"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* 8. Hub -> Bajío / Querétaro (x=760, y=520) */}
          <path
            d="M 830 570 Q 795 540 760 520"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
          {/* 9. Hub -> Tampico / Altamira Puerto (x=890, y=440) */}
          <path
            d="M 830 570 Q 870 490 890 440"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="3 5"
          />
          {/* 10. Hub -> Veracruz Puerto Industrial (x=1020, y=560) */}
          <path
            d="M 830 570 Q 930 540 1020 560"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
          {/* 11. Hub -> Coatzacoalcos / Corredor Interoceánico (x=1130, y=620) */}
          <path
            d="M 830 570 Q 990 610 1130 620"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="4 6"
          />
          {/* 12. Hub -> Villahermosa / Dos Bocas (x=1210, y=630) */}
          <path
            d="M 830 570 Q 1030 600 1210 630"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.25"
            strokeDasharray="4 6"
          />
          {/* 13. Hub -> Chiapas / Presa Peñitas CFE (x=1230, y=690) */}
          <path
            d="M 830 570 Q 1040 680 1230 690"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* 14. Hub -> Mérida / Península (x=1390, y=470) */}
          <path
            d="M 830 570 Q 1120 480 1390 470"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          {/* 15. Hub -> Cancún / Corredor Tren Maya (Far East x=1490, y=480) */}
          <path
            d="M 830 570 Q 1190 470 1490 480"
            stroke="url(#fullRouteGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Inter-regional Hub Logistics Cross-links */}
          <path
            d="M 770 320 Q 620 220 470 160"
            stroke="#00b140"
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <path
            d="M 770 320 Q 670 450 580 550"
            stroke="#00b140"
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <path
            d="M 1020 560 Q 1200 480 1390 470"
            stroke="#00b140"
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <path
            d="M 1390 470 Q 1440 460 1490 480"
            stroke="#00b140"
            strokeOpacity="0.3"
            strokeWidth="1.2"
            strokeDasharray="3 5"
          />

          {/* Central Hub Radar Wave & Nodes (Planta Matriz Toluca / CDMX / AIFA) */}
          <circle cx="830" cy="570" r="48" fill="url(#hubRadarGlow)" />
          <circle cx="830" cy="570" r="28" stroke="#00b140" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="830" cy="570" r="14" fill="url(#nodeGlow)" />
          <circle cx="830" cy="570" r="4.5" fill="#00b140" />
          <circle cx="830" cy="570" r="2" fill="#ffffff" />
          <text x="830" y="598" textAnchor="middle" fill="#1d1d1f" fontSize="11" fontWeight="700" opacity="0.75" letterSpacing="0.04em">
            {t("PLANTA MATRIZ • DESPLIEGUE NACIONAL", "MAIN PLANT • NATIONWIDE DEPLOYMENT")}
          </text>
          <text x="830" y="612" textAnchor="middle" fill="#00b140" fontSize="9" fontWeight="600" opacity="0.9">
            {t("Flota Propia Grúa Hiab • 24-48h", "Own Hiab Crane Fleet • 24-48h")}
          </text>

          {/* Key Geographic & Industrial Destination Nodes */}
          {/* Tijuana / Noroeste */}
          <circle cx="110" cy="140" r="4" fill="#00b140" />
          <text x="110" y="126" textAnchor="middle" fill="#1d1d1f" fontSize="10" fontWeight="600" opacity="0.6">
            Tijuana
          </text>
          <text x="110" y="114" textAnchor="middle" fill="#86868b" fontSize="8" fontWeight="500" opacity="0.5">
            32°N 117°W
          </text>

          {/* Hermosillo / Sonora Minero */}
          <circle cx="270" cy="240" r="3.5" fill="#00b140" />
          <text x="270" y="228" textAnchor="middle" fill="#1d1d1f" fontSize="9" fontWeight="600" opacity="0.6">
            Sonora • Minería
          </text>

          {/* Cd. Juárez / Frontera */}
          <circle cx="470" cy="160" r="3.5" fill="#00b140" />
          <text x="470" y="148" textAnchor="middle" fill="#1d1d1f" fontSize="9" fontWeight="600" opacity="0.6">
            Cd. Juárez
          </text>

          {/* Chihuahua */}
          <circle cx="470" cy="260" r="3" fill="#00b140" />
          <text x="470" y="278" textAnchor="middle" fill="#86868b" fontSize="9" fontWeight="500" opacity="0.6">
            Chihuahua
          </text>

          {/* Monterrey / Polo Industrial */}
          <circle cx="770" cy="320" r="4" fill="#00b140" />
          <circle cx="770" cy="320" r="10" stroke="#00b140" strokeOpacity="0.3" strokeWidth="1" />
          <text x="770" y="306" textAnchor="middle" fill="#1d1d1f" fontSize="10" fontWeight="600" opacity="0.7">
            Monterrey
          </text>
          <text x="770" y="294" textAnchor="middle" fill="#86868b" fontSize="8" fontWeight="500" opacity="0.5">
            {t("Polo Industrial", "Industrial Hub")}
          </text>

          {/* Guadalajara / Occidente */}
          <circle cx="580" cy="550" r="3.5" fill="#00b140" />
          <text x="560" y="555" textAnchor="end" fill="#1d1d1f" fontSize="9.5" fontWeight="600" opacity="0.65">
            Guadalajara
          </text>

          {/* Bajío / Querétaro */}
          <circle cx="760" cy="520" r="3.5" fill="#00b140" />
          <text x="740" y="515" textAnchor="end" fill="#1d1d1f" fontSize="9.5" fontWeight="600" opacity="0.65">
            Bajío
          </text>

          {/* Tampico / Altamira */}
          <circle cx="890" cy="440" r="3" fill="#00b140" />
          <text x="905" y="445" textAnchor="start" fill="#86868b" fontSize="8.5" fontWeight="500" opacity="0.55">
            Altamira
          </text>

          {/* Veracruz Puerto */}
          <circle cx="1020" cy="560" r="3.5" fill="#00b140" />
          <text x="1035" y="565" textAnchor="start" fill="#1d1d1f" fontSize="9.5" fontWeight="600" opacity="0.65">
            Veracruz
          </text>

          {/* Chiapas / CFE Peñitas */}
          <circle cx="1230" cy="690" r="3.5" fill="#00b140" />
          <text x="1245" y="695" textAnchor="start" fill="#1d1d1f" fontSize="9" fontWeight="600" opacity="0.65">
            CFE Peñitas
          </text>

          {/* Villahermosa / Dos Bocas */}
          <circle cx="1210" cy="630" r="3" fill="#00b140" />
          <text x="1225" y="632" textAnchor="start" fill="#86868b" fontSize="8.5" fontWeight="500" opacity="0.55">
            Dos Bocas
          </text>

          {/* Mérida / Península */}
          <circle cx="1390" cy="470" r="3.5" fill="#00b140" />
          <text x="1390" y="456" textAnchor="middle" fill="#1d1d1f" fontSize="9.5" fontWeight="600" opacity="0.65">
            Mérida
          </text>

          {/* Cancún / Tren Maya */}
          <circle cx="1490" cy="480" r="4" fill="#00b140" />
          <circle cx="1490" cy="480" r="10" stroke="#00b140" strokeOpacity="0.3" strokeWidth="1" />
          <text x="1490" y="466" textAnchor="middle" fill="#1d1d1f" fontSize="10" fontWeight="600" opacity="0.7">
            Tren Maya
          </text>
          <text x="1490" y="504" textAnchor="middle" fill="#86868b" fontSize="8" fontWeight="500" opacity="0.5">
            Cancún / Riviera
          </text>

          {/* Subtle Technical Edge Telemetry Stamps */}
          <text x="50" y="760" fill="#1d1d1f" fontSize="9" fontWeight="600" opacity="0.25" letterSpacing="0.08em">
            {t(
              "RED LOGÍSTICA CAPELTON MÉXICO • COBERTURA EN LOS 32 ESTADOS",
              "CAPELTON MEXICO LOGISTICS NETWORK • 32 STATES COVERAGE"
            )}
          </text>
          <text x="1550" y="760" textAnchor="end" fill="#1d1d1f" fontSize="9" fontWeight="600" opacity="0.25" letterSpacing="0.08em">
            {t(
              "NORMA NOM • ACERO CALIBRE 14 • MANIOBRA CERTIFICADA HIAB",
              "NOM STANDARD • 14-GAUGE STEEL • HIAB CERTIFIED RIGGING"
            )}
          </text>
        </svg>
      </div>

      {/* Top Header Group - Permanent Structural Anchor with Zero Layout Shift */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Absolute Centered Logo Intro Overlay (Leaves 0 footprint on DOM flow) */}
        <AnimatePresence>
          {introStage === "logo" && (
            <motion.div
              key="hero-intro-logo"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIntroStage("heading")}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center select-none cursor-pointer"
              title={t("Clic para continuar", "Click to continue")}
            >
              {/* Radial ambient emerald bloom */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-[280px] sm:w-[420px] md:w-[500px] h-[160px] sm:h-[220px] bg-[radial-gradient(ellipse_at_center,rgba(0,177,64,0.32),rgba(0,177,64,0.06)_65%,transparent_100%)] rounded-full blur-[65px] pointer-events-none" />

                {/* Big Official Capelton Vector Logo */}
                <Image
                  src="/images/logo-capelton.webp"
                  alt="Capelton México"
                  width={500}
                  height={79}
                  priority
                  className="relative z-10 w-72 sm:w-96 md:w-[460px] lg:w-[500px] h-auto drop-shadow-[0_12px_40px_rgba(0,177,64,0.28)]"
                />
              </div>

              {/* Technical Precision Monospace Overline */}
              <div className="relative z-10 mt-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-capelton-green/30 backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-ping inline-block" />
                <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-capelton-green uppercase">
                  {t("INGENIERÍA MODULAR // MÉXICO", "MODULAR ENGINEERING // MEXICO")}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-capelton-green/70 inline-block" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Group (Occupies exact physical DOM flow space from frame 0) */}
        <div
          className={`w-full flex flex-col items-center transition-opacity duration-700 ${
            introStage === "logo" ? "opacity-0 pointer-events-none select-none" : "opacity-100"
          }`}
        >
          {/* Eyebrow: Sentence case, clean, no badge border */}
          <p className="text-base sm:text-lg font-semibold text-[#1d1d1f] mb-3">
            {t("Línea modular 2026", "2026 Modular Line")}
          </p>

          {/* Main Headline: Sci-Fi Decrypting HUD Atmosphere */}
          <SciFiHeading
            lines={[
              t("Espacios móviles.", "Mobile Spaces."),
              t("Redefinidos por la ingeniería.", "Redefined by Engineering.")
            ]}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-[#1d1d1f] leading-[1.06] mb-5"
            showLaser={true}
            showHudTag={true}
            hudTag={t("INGENIERÍA MODULAR // CALIBRE 14", "MODULAR ENGINEERING // 14-GAUGE")}
            trigger={introStage === "heading"}
            delay={100}
            duration={900}
          />

          {/* Breathable subtitle */}
          <p className="text-base sm:text-xl text-[#6e6e73] max-w-2xl font-normal leading-relaxed mb-8">
            {t(
              "Oficinas ejecutivas y casetas de alta especificación con entrega inmediata en todo México.",
              "Executive offices and high-specification booths with immediate delivery across Mexico."
            )}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-2 sm:mb-3">
            {/* Botón WhatsApp Ventas */}
            <a
              href={CONTACT_INFO.ventas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("ventas", "hero_cta")}
              title={t("WhatsApp Ventas Directas: 55 2964 0104", "WhatsApp Direct Sales: +52 55 2964 0104")}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all duration-300 shadow-[0_4px_15px_rgba(0,177,64,0.3)] hover:shadow-[0_6px_20px_rgba(0,177,64,0.45)] flex items-center gap-2 group"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>{t("WhatsApp Ventas", "WhatsApp Sales")}</span>
              <span className="hidden sm:inline text-[10px] opacity-80 font-normal">55 2964 0104</span>
            </a>

            {/* Botón WhatsApp Rentas */}
            <a
              href={CONTACT_INFO.rentas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("rentas", "hero_cta")}
              title={t("WhatsApp Rentas y Arrendamiento: 55 7948 3632", "WhatsApp Rentals: +52 55 7948 3632")}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-capelton-green" />
              <span>{t("WhatsApp Rentas", "WhatsApp Rentals")}</span>
              <span className="hidden sm:inline text-[10px] text-[#6e6e73] font-normal">55 7948 3632</span>
            </a>

            <Link
              href="#duo-comparator"
              className="text-xs font-semibold text-[#0066cc] hover:underline flex items-center gap-1 group ml-1"
            >
              <span>{t("Comparar modelos", "Compare Models")}</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Monumental Flagship Render at 2X Scale with Dynamic LiDAR Sci-Fi Animation */}
      <HeroFlagshipShowcase />
    </section>
  );
}
