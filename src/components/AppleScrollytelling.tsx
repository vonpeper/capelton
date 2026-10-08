"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  ThermometerSnowflake,
  ArrowRight,
  Maximize2,
  FileText,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";

interface Hotspot {
  id: string;
  stageId: number;
  x: string; // percentage, e.g. "28%"
  y: string; // percentage, e.g. "76%"
  title: string;
  titleEn: string;
  badge: string;
  badgeEn: string;
  description: string;
  descriptionEn: string;
}

const hotspots: Hotspot[] = [
  {
    id: "chasis",
    stageId: 0,
    x: "28%",
    y: "76%",
    title: "Chasis Acero Cal. 14",
    titleEn: "14-Gauge Steel Chassis",
    badge: "Anti-torsión",
    badgeEn: "Anti-torsion",
    description:
      "Perfiles electrogalvanizados de alta rigidez que soportan traslados severos en terracería minera sin fatiga estructural.",
    descriptionEn:
      "High-rigidity electrogalvanized beams designed to endure severe mining dirt roads without structural fatigue.",
  },
  {
    id: "aislamiento",
    stageId: 1,
    x: "60%",
    y: "36%",
    title: "Poliuretano Inyectado",
    titleEn: "Injected Polyurethane",
    badge: "-10°C a +45°C",
    badgeEn: "-10°C to +45°C",
    description:
      "Aislamiento termoacústico continuo de alta densidad que reduce hasta un 40% el consumo eléctrico en climatización.",
    descriptionEn:
      "High-density continuous thermoacoustic insulation reducing HVAC electricity consumption by up to 40%.",
  },
  {
    id: "climatizacion",
    stageId: 1,
    x: "88%",
    y: "48%",
    title: "Clima Inverter Integrado",
    titleEn: "Integrated Inverter AC",
    badge: "Ahorro Energético",
    badgeEn: "Energy Saving",
    description:
      "Unidad exterior minisplit de alta eficiencia con ductería oculta y sellado perimetral contra humedad.",
    descriptionEn:
      "High-efficiency outdoor minisplit unit with concealed ductwork and perimeter moisture seal.",
  },
  {
    id: "electrico",
    stageId: 2,
    x: "16%",
    y: "56%",
    title: "Despliegue Plug & Play",
    titleEn: "Plug & Play Deployment",
    badge: "Norma NOM",
    badgeEn: "NOM Standard",
    description:
      "Centro de carga homologado, luminarias LED perimetrales y tomas polarizadas listas para operar en 24-48h.",
    descriptionEn:
      "Certified load center, perimeter LED fixtures, and grounded outlets ready to operate in 24-48h.",
  },
];

export default function AppleScrollytelling() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // High-resolution 2560x1248 official renders from Capelton
  const stages = [
    {
      id: 0,
      src: "https://capeltonmexico.com/wp-content/uploads/2025/08/CM10MM_VISTA1-scaled.png",
      label: "Perspectiva Exterior",
      labelEn: "Exterior Perspective",
      step: "01 / Chasis Monolítico",
      stepEn: "01 / Monolithic Chassis",
      title: "Acero Calibre 14",
      titleEn: "14-Gauge Steel",
      highlight: "Rigidez estructural certificada",
      highlightEn: "Certified structural rigidity",
      metric: "100% Anti-torsión",
      metricEn: "100% Anti-torsion",
      metricSub: "Terracería severa",
      metricSubEn: "Severe terrain",
      icon: <Layers className="w-5 h-5 text-capelton-green" />,
      description:
        "Estructura rolada en frío y electrogalvanizada. Diseñada para soportar izajes continuos y caminos de terracería sin deformarse.",
      descriptionEn:
        "Cold-rolled and electrogalvanized frame. Engineered to withstand continuous crane lifts and unpaved terrain without deformation.",
    },
    {
      id: 1,
      src: "https://capeltonmexico.com/wp-content/uploads/2025/08/CM10MM_VISTA2-1-scaled.png",
      label: "Blindaje Térmico",
      labelEn: "Thermal Shielding",
      step: "02 / Aislamiento Continuo",
      stepEn: "02 / Continuous Insulation",
      title: "Poliuretano Inyectado",
      titleEn: "Injected Polyurethane",
      highlight: "Confort de -10°C a +45°C",
      highlightEn: "Comfort from -10°C to +45°C",
      metric: "-40% Energía",
      metricEn: "-40% Energy",
      metricSub: "Consumo de clima",
      metricSubEn: "HVAC consumption",
      icon: <ThermometerSnowflake className="w-5 h-5 text-capelton-green" />,
      description:
        "Núcleo térmico de alta densidad con atenuación acústica de hasta 32 dB. Climatización eficiente en calor desértico o frío extremo.",
      descriptionEn:
        "High-density thermal core with up to 32 dB acoustic dampening. Efficient climate control in desert heat or extreme mountain cold.",
    },
    {
      id: 2,
      src: "https://capeltonmexico.com/wp-content/uploads/2025/08/CM10MM_VISTA3-scaled.png",
      label: "Habitabilidad Interior",
      labelEn: "Interior Living",
      step: "03 / Despliegue Inmediato",
      stepEn: "03 / Instant Deployment",
      title: "Plug & Play en 24h",
      titleEn: "Plug & Play in 24h",
      highlight: "Operativo al conectar acometida",
      highlightEn: "Fully operational upon grid hookup",
      metric: "24-48 Horas",
      metricEn: "24-48 Hours",
      metricSub: "Instalación en sitio",
      metricSubEn: "On-site installation",
      icon: <Zap className="w-5 h-5 text-capelton-green" />,
      description:
        "Instalaciones eléctricas industriales ocultas bajo norma NOM, iluminación LED empotrada y acabados ejecutivos listos para trabajar.",
      descriptionEn:
        "Industrial concealed electrical wiring under NOM standards, recessed LED lighting, and executive finishes ready to work.",
    },
  ];

  // Track scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Synchronize scroll position with active stage
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.35) {
        setActiveStage(0);
      } else if (latest < 0.7) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const current = stages[activeStage];

  return (
    <section
      id="scrollytelling"
      ref={containerRef}
      className="relative h-[280vh] bg-white text-[#1d1d1f]"
    >
      {/* Sticky Cinematic Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden">
        {/* Apple Pearl Ambient Stage Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-capelton-green/10 via-capelton-green/4 to-transparent rounded-full blur-[140px] pointer-events-none" />

        {/* 1. Header & Stage Switcher (Compact, Apple Rhythm) */}
        <FadeIn direction="up">
          <div className="relative z-10 text-center max-w-3xl shrink-0 pt-1 sm:pt-2">
            <p className="text-[11px] sm:text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1">
              {t("Ingeniería en Detalle • Modelo CM-10M", "Engineering in Detail • Model CM-10M")}
            </p>
            <SciFiHeading
              text={t(
                "Diseñado para durar. Construido para el trabajo rudo.",
                "Engineered to endure. Built for heavy-duty work."
              )}
              as="h2"
              className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f] leading-tight"
              showLaser={false}
              showHudTag={false}
              duration={750}
            />

            {/* Centered Apple View Switcher Pill */}
            <div className="inline-flex items-center gap-1 p-1 mt-2 sm:mt-2.5 bg-black/[0.04] backdrop-blur-md rounded-full border border-black/8 shadow-xs">
              {stages.map((stage) => {
                const label = language === "en" ? stage.labelEn : stage.label;
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => {
                      setActiveStage(stage.id);
                      setActiveHotspot(null);
                    }}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-black text-white font-semibold shadow-xs"
                        : "text-[#6e6e73] hover:text-black font-medium"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* 2. Responsive 3D Product Stage (Constrained to prevent screen crowding) */}
        <div className="relative z-10 w-full max-w-5xl flex-1 flex flex-col items-center justify-center min-h-[180px] max-h-[38vh] my-1 sm:my-2">
          <div className="relative w-full h-full max-w-4xl flex items-center justify-center">
            {/* 3D Model Image Render Layers */}
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  activeStage === idx
                    ? "opacity-100 scale-100 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <Image
                  src={stage.src}
                  alt={language === "en" ? stage.titleEn : stage.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-contain"
                />
              </div>
            ))}

            {/* Interactive Dynamic Radar Hotspots (Filtered strictly for active stage) */}
            <div className="absolute inset-0 pointer-events-none">
              {hotspots
                .filter((spot) => spot.stageId === activeStage)
                .map((spot) => {
                  const isHovered = activeHotspot === spot.id;
                  const displayTitle = language === "en" ? spot.titleEn : spot.title;
                  const displayBadge = language === "en" ? spot.badgeEn : spot.badge;
                  const displayDesc = language === "en" ? spot.descriptionEn : spot.description;
                  const isBottomHalf = parseInt(spot.y) > 50;

                  return (
                    <div
                      key={spot.id}
                      style={{ left: spot.x, top: spot.y }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300 opacity-100 scale-100"
                      onMouseEnter={() => setActiveHotspot(spot.id)}
                      onMouseLeave={() => setActiveHotspot(null)}
                      onClick={() => {
                        setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                      }}
                    >
                      {/* Pulsing Beacon Dot */}
                      <div className="relative flex items-center justify-center cursor-pointer group">
                        <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-capelton-green/40 opacity-75" />
                        <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-capelton-green text-white shadow-[0_0_12px_rgba(0,177,64,0.7)] border-2 border-white">
                          <span className="w-1 h-1 rounded-full bg-white" />
                        </span>

                        {/* Hotspot Floating Pill Tag */}
                        <div className="hidden sm:flex absolute left-6 items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-black/8 shadow-sm whitespace-nowrap transition-all duration-200">
                          <span className="text-[11px] font-bold text-[#1d1d1f]">
                            {displayTitle}
                          </span>
                          <span className="text-[9px] text-capelton-green font-semibold bg-capelton-green/10 px-1.5 py-0.2 rounded-full">
                            {displayBadge}
                          </span>
                        </div>
                      </div>

                      {/* Tooltip Card: opens UPWARDS if spot is in the bottom half so it never overlaps cards below */}
                      {isHovered && (
                        <div
                          className={`absolute ${
                            isBottomHalf ? "bottom-8" : "top-8"
                          } left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 w-60 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-black/10 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-200`}
                        >
                          <span className="text-[9px] font-bold text-capelton-green uppercase tracking-wider block mb-0.5">
                            {displayBadge}
                          </span>
                          <h4 className="text-xs font-bold text-black mb-1">
                            {displayTitle}
                          </h4>
                          <p className="text-[11px] text-[#6e6e73] leading-relaxed">
                            {displayDesc}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* 3. Modern Dynamic Feature Bento Selector */}
        <FadeIn direction="up" delay={100} className="w-full max-w-4xl shrink-0 pt-1 pb-1 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
            {stages.map((stage) => {
              const isActive = activeStage === stage.id;
              const title = language === "en" ? stage.titleEn : stage.title;
              const desc = language === "en" ? stage.descriptionEn : stage.description;
              const metric = language === "en" ? stage.metricEn : stage.metric;

              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    setActiveStage(stage.id);
                    setActiveHotspot(null);
                  }}
                  className={`cursor-pointer rounded-xl p-3 sm:p-3.5 transition-all duration-200 relative border select-none ${
                    isActive
                      ? "bg-white border-capelton-green/50 shadow-sm"
                      : "bg-[#f5f5f7]/70 hover:bg-white border-transparent hover:border-black/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Top Subtle Green Indicator Bar */}
                  {isActive && (
                    <div className="absolute top-0 left-3 right-3 h-[2px] bg-capelton-green rounded-full" />
                  )}

                  <div className="flex items-start justify-between mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs border border-black/5">
                      {stage.icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-capelton-green/10 text-capelton-green"
                          : "bg-black/5 text-[#86868b]"
                      }`}
                    >
                      {metric}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#1d1d1f] mb-0.5">
                    {title}
                  </h3>
                  <p className="text-[11px] text-[#6e6e73] font-normal leading-relaxed line-clamp-2">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* 4. Bottom Metric Row & CTA Bar */}
        <FadeIn direction="up" delay={180} className="w-full max-w-4xl shrink-0 pt-2 pb-1 border-t border-black/8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center justify-around w-full sm:w-auto gap-4 sm:gap-8">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#86868b] block">
                  {t("Dimensiones", "Dimensions")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-black">
                  10.0 × 2.5 × 3.4m
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#86868b] block">
                  {t("Peso neto", "Net weight")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-black">
                  2,000 kg
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#86868b] block">
                  {t("Aforo", "Capacity")}
                </span>
                <span className="text-xs sm:text-sm font-bold text-capelton-green">
                  {t("7 a 10 personas", "7 to 10 people")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/modelos/cm10m"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0066cc] hover:underline"
              >
                <span>{t("Ver ficha completa CM-10M", "View full CM-10M spec sheet")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={getWhatsAppUrl("ventas", t("Hola, me interesa conocer más del modelo CM-10M", "Hello, I am interested in learning more about the CM-10M model"))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("ventas", "scrollytelling_cm10m")}
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-black hover:bg-capelton-green transition-all shadow-xs"
              >
                {t("Cotizar Ventas", "Quote Sales")}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
