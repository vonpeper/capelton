"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Home, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";

interface TechPin {
  id: string;
  tab: "exterior" | "interior";
  x: string;
  y: string;
  title: string;
  titleEn: string;
  badge: string;
  badgeEn: string;
  description: string;
  descriptionEn: string;
}

const techPins: TechPin[] = [
  // --- EXTERIORES ---
  {
    id: "chasis",
    tab: "exterior",
    x: "26%",
    y: "76%",
    title: "Chasis estructural reforzado",
    titleEn: "Reinforced Steel Chassis",
    badge: "Base Estructural",
    badgeEn: "Structural Frame",
    description:
      "Perfiles electrogalvanizados de alta rigidez y soldadura continua certificada que soportan maniobras constantes de izaje y traslados severos en terracería sin fatiga estructural.",
    descriptionEn:
      "High-rigidity electrogalvanized beams engineered to endure continuous crane lifts and severe unpaved transit without structural deformation.",
  },
  {
    id: "muros",
    tab: "exterior",
    x: "54%",
    y: "44%",
    title: "Muros aislados",
    titleEn: "Insulated Walls",
    badge: "Núcleo Térmico",
    badgeEn: "Thermal Core",
    description:
      "Panel sándwich con espuma termoacústica continua de alta densidad que amortigua ruido exterior y reduce significativamente el consumo de climatización.",
    descriptionEn:
      "Continuous high-density thermoacoustic sandwich panel core dampening site noise and cutting HVAC power demand.",
  },
  {
    id: "techo",
    tab: "exterior",
    x: "60%",
    y: "22%",
    title: "Techo de aluminio de una pieza",
    titleEn: "One-Piece Aluminum Roof",
    badge: "Cero Filtraciones",
    badgeEn: "Leak-Proof",
    description:
      "Cubierta engargolada monolítica de una sola pieza sin traslapes ni uniones intermedias, protegiendo contra estancamiento de agua y goteras.",
    descriptionEn:
      "Monolithic single-piece aluminum roofing with seamless construction preventing water ponding and leaks.",
  },
  {
    id: "ventanas",
    tab: "exterior",
    x: "38%",
    y: "50%",
    title: "Ventanas abatibles",
    titleEn: "Awning Windows",
    badge: "Luz y Ventilación",
    badgeEn: "Air & Light",
    description:
      "Cancelería de aluminio reforzado con sellado perimetral contra polvo y lluvia, cristales de seguridad y mosquiteros integrados.",
    descriptionEn:
      "Reinforced aluminum framing with perimeter dust and rain seals, safety glass, and integrated screens.",
  },
  {
    id: "accesos",
    tab: "exterior",
    x: "80%",
    y: "72%",
    title: "Accesos y soportes",
    titleEn: "Access & Leveling Supports",
    badge: "Despliegue Rápido",
    badgeEn: "Fast Setup",
    description:
      "Puntos de apoyo reforzados para nivelación rápida en terreno natural y herrajes perimetrales para izaje seguro con grúa Hiab.",
    descriptionEn:
      "Reinforced support pads for swift on-ground leveling and dedicated perimeter rigging points for safe crane deployment.",
  },

  // --- INTERIORES ---
  {
    id: "piso",
    tab: "interior",
    x: "46%",
    y: "82%",
    title: "Piso SPC",
    titleEn: "SPC Rigid Core Flooring",
    badge: "Tráfico Pesado",
    badgeEn: "Heavy Traffic",
    description:
      "Duela vinílica SPC rígida de alta resistencia al desgaste, 100% impermeable, retardante al fuego y de limpieza sumamente rápida en campamentos y obras.",
    descriptionEn:
      "Heavy-duty rigid-core SPC flooring: 100% waterproof, fire-retardant, and effortless to sanitize in demanding environments.",
  },
  {
    id: "iluminacion",
    tab: "interior",
    x: "52%",
    y: "22%",
    title: "Iluminación LED",
    titleEn: "LED Lighting",
    badge: "Eficiencia y Confort",
    badgeEn: "Visual Comfort",
    description:
      "Luminarias LED empotradas de bajo consumo energético que proporcionan luz uniforme y descansada para jornadas intensivas de trabajo.",
    descriptionEn:
      "Recessed high-efficiency LED fixtures providing balanced, flicker-free illumination across all workstations.",
  },
  {
    id: "clima",
    tab: "interior",
    x: "82%",
    y: "34%",
    title: "Sistema de aire acondicionado",
    titleEn: "Air Conditioning System",
    badge: "Climatización Inverter",
    badgeEn: "Inverter Climate",
    description:
      "Unidad minisplit de alto rendimiento térmico con ductería oculta que garantiza temperatura confortable tanto en climas desérticos como en zonas frías.",
    descriptionEn:
      "High-efficiency inverter minisplit system with concealed routing ensuring stable comfort in extreme heat or mountain cold.",
  },
  {
    id: "electrica",
    tab: "interior",
    x: "22%",
    y: "58%",
    title: "Instalación eléctrica",
    titleEn: "Electrical Installation",
    badge: "Norma Oficial (NOM)",
    badgeEn: "NOM Standard",
    description:
      "Centro de carga homologado, cableado conduit canalizado y tomas polarizadas de uso rudo listas para conectar computadoras y equipo de oficina.",
    descriptionEn:
      "Certified industrial load center, conduit-routed concealed wiring, and heavy-duty grounded outlets ready for equipment.",
  },
  {
    id: "distribucion",
    tab: "interior",
    x: "66%",
    y: "64%",
    title: "Distribución y mobiliario según configuración",
    titleEn: "Custom Layout & Furniture by Config",
    badge: "A la Medida",
    badgeEn: "Tailored Layout",
    description:
      "Áreas abiertas colaborativas, privados con puerta, mamparas o módulos con medio baño privado según los requerimientos de tu equipo.",
    descriptionEn:
      "Open collaboration floorplans, private offices, or configurations with integrated half-bath according to your operation.",
  },
];

export default function AppleScrollytelling() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"exterior" | "interior">("exterior");
  const [activePinId, setActivePinId] = useState<string | null>("chasis");

  const currentPins = techPins.filter((p) => p.tab === activeTab);
  const activePin = techPins.find((p) => p.id === activePinId) || currentPins[0];

  const currentImage =
    activeTab === "exterior"
      ? "/images/CM_10M_Vista_01_cropped.png"
      : "/images/categoria-almacenes.png";

  return (
    <section
      id="como-construimos"
      className="py-20 sm:py-28 bg-white text-[#1d1d1f] relative overflow-hidden border-t border-black/5 scroll-mt-20"
    >
      {/* Anchor alias backward compatibility */}
      <div id="scrollytelling" className="absolute -top-24" />

      {/* Ambient Lighting in Capelton Green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-2">
              {t("Ficha Técnica & Anatomía del Producto", "Product Anatomy & Technical Specs")}
            </span>
            <SciFiHeading
              text={t(
                "Cómo construimos nuestros espacios móviles",
                "How We Build Our Mobile Spaces"
              )}
              as="h2"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.12] mb-3"
              showLaser={false}
              showHudTag={false}
              duration={700}
            />
            <p className="text-xs sm:text-sm text-[#86868b] font-medium max-w-2xl mx-auto">
              {t(
                "Unidad de referencia CM-10M. Las configuraciones y especificaciones varían por modelo.",
                "Reference unit CM-10M. Configurations and specifications vary by model."
              )}
            </p>

            {/* Apple View Switcher: Exteriores vs Interiores */}
            <div className="inline-flex items-center gap-1.5 p-1.5 mt-5 bg-[#f5f5f7] rounded-full border border-black/8 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("exterior");
                  setActivePinId("chasis");
                }}
                className={`flex items-center gap-2 px-5 py-2 text-xs sm:text-sm rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "exterior"
                    ? "bg-black text-white font-bold shadow-xs"
                    : "text-[#6e6e73] hover:text-black font-semibold"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t("Exteriores", "Exterior Architecture")}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("interior");
                  setActivePinId("piso");
                }}
                className={`flex items-center gap-2 px-5 py-2 text-xs sm:text-sm rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === "interior"
                    ? "bg-black text-white font-bold shadow-xs"
                    : "text-[#6e6e73] hover:text-black font-semibold"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t("Interiores", "Interior Systems")}</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Interactive Fluid 3D Product Stage */}
        <FadeIn direction="up" delay={80}>
          <div className="relative w-full max-w-5xl mx-auto bg-[#fafafc] rounded-[32px] sm:rounded-[40px] border border-black/8 p-4 sm:p-8 shadow-sm">
            {/* Stage Container */}
            <div className="relative w-full h-[280px] xs:h-[340px] sm:h-[440px] md:h-[500px] flex items-center justify-center select-none overflow-hidden rounded-2xl sm:rounded-3xl">
              {/* Product Render */}
              <div className="relative w-full h-full max-w-4xl transition-all duration-700 ease-out">
                <Image
                  src={currentImage}
                  alt={activeTab === "exterior" ? "Capelton Exterior" : "Capelton Interior"}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1100px"
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                />
              </div>

              {/* Interactive Floating Pins */}
              <div className="absolute inset-0 pointer-events-none">
                {currentPins.map((pin) => {
                  const isSelected = activePinId === pin.id;
                  const displayTitle = language === "en" ? pin.titleEn : pin.title;
                  const displayBadge = language === "en" ? pin.badgeEn : pin.badge;

                  return (
                    <div
                      key={pin.id}
                      style={{ left: pin.x, top: pin.y }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setActivePinId(pin.id)}
                        className="relative flex items-center justify-center cursor-pointer group focus:outline-none"
                        aria-label={displayTitle}
                      >
                        {/* Pulse Ring */}
                        <span
                          className={`animate-ping absolute inline-flex h-7 w-7 rounded-full bg-capelton-green/40 opacity-75 ${
                            isSelected ? "scale-125" : ""
                          }`}
                        />
                        {/* Pin Dot */}
                        <span
                          className={`relative inline-flex items-center justify-center rounded-full h-5 w-5 border-2 transition-all ${
                            isSelected
                              ? "bg-capelton-green border-white scale-125 shadow-[0_0_16px_rgba(0,177,64,0.9)]"
                              : "bg-white border-capelton-green text-capelton-green group-hover:scale-110 shadow-sm"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? "bg-white" : "bg-capelton-green"
                            }`}
                          />
                        </span>

                        {/* Floating Label Pill (Desktop) */}
                        <div
                          className={`hidden md:flex absolute left-7 items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm whitespace-nowrap transition-all duration-200 ${
                            isSelected
                              ? "bg-black text-white border-black shadow-md scale-105"
                              : "bg-white/95 backdrop-blur-md text-[#1d1d1f] border-black/8 group-hover:bg-white"
                          }`}
                        >
                          <span className="text-[11px] font-bold">{displayTitle}</span>
                          <span
                            className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full ${
                              isSelected
                                ? "bg-capelton-green text-white"
                                : "bg-capelton-green/10 text-capelton-green"
                            }`}
                          >
                            {displayBadge}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Pin Detailed Explanation Box (Floats on the card bottom) */}
            {activePin && (
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-black/8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-capelton-green/10 text-capelton-green flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-2 py-0.5 rounded-full">
                        {language === "en" ? activePin.badgeEn : activePin.badge}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-black">
                        {language === "en" ? activePin.titleEn : activePin.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#515154] leading-relaxed max-w-3xl">
                      {language === "en" ? activePin.descriptionEn : activePin.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-[11px] text-[#86868b] hidden lg:inline">
                    {t("Haz clic en cualquier punto para inspeccionar", "Click any dot to inspect")}
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Spec Summary & Direct Actions */}
            <div className="mt-5 pt-4 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
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

              <div className="flex items-center gap-2.5">
                <Link
                  href="/modelos/cm10m"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0066cc] hover:underline"
                >
                  <span>{t("Ver ficha completa CM-10M", "View full CM-10M spec sheet")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={getWhatsAppUrl(
                    "ventas",
                    t(
                      "Hola, me interesa conocer más sobre la fabricación y acabados del modelo CM-10M",
                      "Hello, I am interested in learning more about the engineering and specs of model CM-10M"
                    )
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", "como_construimos_cm10m")}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all shadow-xs"
                >
                  {t("Cotizar Ventas", "Quote Sales")}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
