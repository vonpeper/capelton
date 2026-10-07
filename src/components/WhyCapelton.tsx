"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";

interface Differentiator {
  id: string;
  eyebrow: string;
  eyebrowEn?: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  isCreditCard?: boolean;
  modalTitle: string;
  modalTitleEn?: string;
  modalSubtitle: string;
  modalSubtitleEn?: string;
  points: string[];
  pointsEn?: string[];
  ctaText: string;
  ctaTextEn?: string;
  whatsappMessage: string;
}

const differentiators: Differentiator[] = [
  {
    id: "manufactura",
    eyebrow: "Ingeniería Estructural",
    eyebrowEn: "Structural Engineering",
    title: "Estructura monolítica en acero Calibre 14.",
    titleEn: "Monolithic 14-Gauge Steel Structure.",
    description:
      "Diseñadas y ensambladas en planta propia con chasis electrogalvanizado de máxima rigidez contra torsión en terracerías severas.",
    descriptionEn:
      "Designed and assembled in our own manufacturing plant with electrogalvanized chassis for maximum anti-torsion rigidity on severe terrain.",
    image: "https://capeltonmexico.com/wp-content/uploads/2025/08/CM10MM_VISTA1-scaled.png",
    modalTitle: "Estructura Monolítica Calibre 14",
    modalTitleEn: "14-Gauge Monolithic Structure",
    modalSubtitle: "Fabricación 100% propia con estándares industriales de alto desempeño.",
    modalSubtitleEn: "100% in-house manufacturing meeting high-performance industrial standards.",
    points: [
      "Chasis y postes rolados en acero electrogalvanizado Calibre 14 de alta resistencia.",
      "Soldadura continua MIG/MAG certificada que soporta izaje, traslado constante y vibración.",
      "Recubrimiento primario epóxico y esmalte de grado marino resistente a la intemperie.",
      "Mayor durabilidad estructural que las adaptaciones comunes de contenedores marítimos usados."
    ],
    pointsEn: [
      "Heavy-duty 14-gauge electrogalvanized cold-rolled steel chassis and structural posts.",
      "Certified continuous MIG/MAG welding resisting hoisting, frequent transport, and vibration.",
      "Epoxy primer coating and marine-grade weather-resistant protective enamel.",
      "Significantly superior structural lifespan compared to standard used shipping container conversions."
    ],
    ctaText: "Cotizar modelo con estructura Cal. 14",
    ctaTextEn: "Quote model with 14-gauge structure",
    whatsappMessage: "Hola, me interesa conocer los modelos con chasis reforzado de acero Calibre 14."
  },
  {
    id: "aislamiento",
    eyebrow: "Eficiencia Térmica",
    eyebrowEn: "Thermal Efficiency",
    title: "Aislamiento continuo para climas extremos.",
    titleEn: "Continuous Insulation for Extreme Climates.",
    description:
      "Poliuretano inyectado de alta densidad y doble barrera térmica que reducen hasta un 40% el consumo eléctrico en climatización.",
    descriptionEn:
      "High-density injected polyurethane and dual thermal barrier reducing HVAC power consumption by up to 40%.",
    image: "https://capeltonmexico.com/wp-content/uploads/2025/08/CM10MM_VISTA2-1-scaled.png",
    modalTitle: "Aislamiento Termoacústico Continuo",
    modalTitleEn: "Continuous Thermo-Acoustic Insulation",
    modalSubtitle: "Confort climático y acústico garantizado en cualquier entorno operativo.",
    modalSubtitleEn: "Guaranteed thermal and acoustic comfort in any operating environment.",
    points: [
      "Muros panel tipo sándwich con espuma rígida de poliuretano inyectado de alta densidad.",
      "Rango de confort operativo estable en temperaturas extremas de -10°C a más de +45°C.",
      "Atenuación acústica de hasta 32 dB frente al ruido de maquinaria pesada en obra.",
      "Preparación integral para equipos minisplit inverter de bajo consumo energético."
    ],
    pointsEn: [
      "Sandwich panel walls with high-density rigid injected polyurethane core.",
      "Stable operational comfort range under extreme temperatures from -10°C to over +45°C.",
      "Acoustic attenuation up to 32 dB against heavy machinery noise on site.",
      "Integrated electrical and structural prep for high-efficiency inverter minisplit systems."
    ],
    ctaText: "Consultar especificación térmica",
    ctaTextEn: "Check thermal specification",
    whatsappMessage: "Hola, requiero información sobre el aislamiento térmico de los espacios modulares Capelton."
  },
  {
    id: "despliegue",
    eyebrow: "Despliegue Rápido",
    eyebrowEn: "Rapid Deployment",
    title: "Conéctala y empieza a operar en 24 horas.",
    titleEn: "Plug & Play: Operational in 24 Hours.",
    description:
      "Instalaciones eléctricas certificadas, iluminación LED, contactos y acabados listos para trabajar desde el primer minuto en obra.",
    descriptionEn:
      "Certified electrical systems, LED lighting, power outlets, and finishes ready to work from minute one on site.",
    image: "https://capeltonmexico.com/wp-content/uploads/2025/08/CM10MM_VISTA3-scaled.png",
    modalTitle: "Despliegue Inmediato Plug & Play",
    modalTitleEn: "Plug & Play Immediate Deployment",
    modalSubtitle: "Tu oficina o campamento listo para operar sin retrasos de construcción civil.",
    modalSubtitleEn: "Your office or camp ready to operate without civil construction delays.",
    points: [
      "Tablero de control y centro de carga homologado bajo norma oficial mexicana (NOM).",
      "Iluminación LED perimetral de bajo consumo y larga vida útil preinstalada.",
      "Contactos polarizados de uso rudo para computadoras, impresoras y servidores.",
      "Acometida exterior rápida para conexión directa a red de obra o generador."
    ],
    pointsEn: [
      "Certified electrical panel and load center under Mexican Official Standard (NOM).",
      "Pre-installed high-efficiency perimeter LED lighting with long service life.",
      "Heavy-duty polarized outlets for workstations, printers, and computer servers.",
      "Quick exterior utility connection for direct hookup to site grid or generator."
    ],
    ctaText: "Cotizar entrega inmediata 24-48h",
    ctaTextEn: "Quote 24-48h immediate delivery",
    whatsappMessage: "Hola, me gustaría cotizar una oficina móvil con entrega y despliegue rápido."
  },
  {
    id: "esquemas",
    eyebrow: "Modalidades de Adquisición",
    eyebrowEn: "Acquisition Options",
    title: "Venta o Renta flexible para tu presupuesto.",
    titleEn: "Flexible Sale or Rental for Your Budget.",
    description:
      "Arrendamiento operativo 100% deducible para campamentos temporales, o adquisición definitiva para patrimonio corporativo.",
    descriptionEn:
      "100% tax-deductible operating lease for temporary camps, or permanent asset acquisition for corporate equity.",
    isCreditCard: true,
    modalTitle: "Esquemas Financieros de Venta y Renta",
    modalTitleEn: "Financial Sale and Rental Options",
    modalSubtitle: "Flexibilidad contractual diseñada para la administración de obras y finanzas corporativas.",
    modalSubtitleEn: "Contractual flexibility designed for project management and corporate finance.",
    points: [
      "Renta mensual flexible adaptada a los plazos reales de tu proyecto u obra.",
      "100% deducible de impuestos como gasto operativo (OPEX) directo del ejercicio.",
      "Opción a compra con valor residual al concluir el contrato de arrendamiento.",
      "Facturación formal inmediata y contratos empresariales para licitaciones públicas y privadas."
    ],
    pointsEn: [
      "Flexible monthly rental terms tailored to the actual duration of your project.",
      "100% tax-deductible as an operating expense (OPEX) in the fiscal period.",
      "Option to purchase with residual value upon completion of the lease term.",
      "Immediate corporate invoicing and contracts ready for public and private tenders."
    ],
    ctaText: "Cotizar esquema de renta o venta",
    ctaTextEn: "Quote rental or purchase plan",
    whatsappMessage: "Hola, deseo solicitar una cotización formal bajo el esquema de Venta o Renta."
  },
  {
    id: "garantia",
    eyebrow: "Garantía de Fábrica",
    eyebrowEn: "Factory Warranty",
    title: "Cero intermediarios. Soporte directo de planta.",
    titleEn: "Zero Intermediaries. Direct Plant Support.",
    description:
      "Póliza de garantía estructural y técnica respaldada por ingenieros certificados antes, durante y después del montaje.",
    descriptionEn:
      "Structural and technical warranty policy backed by certified engineers before, during, and after assembly.",
    image: "https://capeltonmexico.com/wp-content/uploads/2025/02/Oficinas_Corte.png",
    modalTitle: "Garantía y Acompañamiento Técnico",
    modalTitleEn: "Warranty and Technical Guidance",
    modalSubtitle: "Respaldo directo de planta sin revendedores ni terceras partes.",
    modalSubtitleEn: "Direct manufacturer backing without brokers or third parties.",
    points: [
      "Póliza de garantía directa de fábrica contra vicios ocultos y filtraciones.",
      "Acompañamiento técnico especializado para la preparación del terreno y nivelación en sitio.",
      "Disponibilidad de refacciones originales, cerraduras y paneles de recambio inmediato.",
      "Atención prioritaria y soporte postventa a nivel nacional."
    ],
    pointsEn: [
      "Direct factory warranty against structural flaws and water leaks.",
      "Specialized technical support for ground prep and site leveling.",
      "Immediate availability of original spare parts, hardware, and replacement panels.",
      "Priority customer service and nationwide post-sale technical support."
    ],
    ctaText: "Hablar con un asesor técnico",
    ctaTextEn: "Talk to a technical advisor",
    whatsappMessage: "Hola, me gustaría conocer la cobertura de garantía de los modelos Capelton."
  },
  {
    id: "logistica",
    eyebrow: "Logística y Cobertura",
    eyebrowEn: "Nationwide Logistics",
    title: "Entrega y maniobra en cualquier rincón del país.",
    titleEn: "Delivery and Rigging to Every Corner of Mexico.",
    description:
      "Operativa de traslado terrestre, descarga especializada y nivelación en los 32 estados de la República Mexicana.",
    descriptionEn:
      "Land transport, specialized crane offloading, and leveling across all 32 Mexican states.",
    image: "https://capeltonmexico.com/wp-content/uploads/2025/01/CM_10M_Vista_01.png",
    modalTitle: "Cobertura y Logística en Todo México",
    modalTitleEn: "Nationwide Coverage & Logistics",
    modalSubtitle: "Presencia comprobada en megaproyectos y campamentos remotos.",
    modalSubtitleEn: "Proven track record in megaprojects and remote industrial camps.",
    points: [
      "Servicio de transporte en cama baja y maniobras de posicionamiento con grúa Hiab.",
      "Presencia comprobada en obras como AIFA, CFE Presa Peñitas, Poder Judicial e industria minera.",
      "Nivelación con gatos mecánicos de alta capacidad para terrenos irregulares o de terracería.",
      "Gestión de permisos de traslado para carga sobredimensionada en carreteras federales."
    ],
    pointsEn: [
      "Lowboy transportation service and precision positioning with Hiab articulated crane.",
      "Proven delivery track record at AIFA airport, CFE Peñitas Dam, federal courts, and mining camps.",
      "Heavy-duty mechanical leveling jacks for rough, unpaved terrain.",
      "Full oversize transport permitting handled on federal highways."
    ],
    ctaText: "Solicitar cotización de flete a mi estado",
    ctaTextEn: "Request freight quote to my location",
    whatsappMessage: "Hola, deseo cotizar el traslado y montaje de un espacio modular en mi ubicación."
  }
];

export default function WhyCapelton() {
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCard, setSelectedCard] = useState<Differentiator | null>(null);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth"
    });
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="por-que-capelton" className="py-20 sm:py-28 bg-[#f5f5f7] text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-r from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Row matching Apple screenshot */}
        <FadeIn direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <SciFiHeading
                text={t("Por qué Capelton es la mejor opción.", "Why Capelton is the best choice.")}
                as="h2"
                align="left"
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1]"
                showLaser={false}
                showHudTag={false}
                duration={700}
              />
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto">
              <Link
                href="#nosotros"
                className="text-sm font-semibold text-[#0066cc] hover:underline flex items-center gap-1 group whitespace-nowrap"
              >
                <span>{t("Conocer más sobre nosotros", "Learn more about us")}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Desktop Navigation Arrow Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  aria-label={t("Anterior", "Previous")}
                  className={`w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 transition-all ${
                    canScrollLeft
                      ? "text-[#1d1d1f] hover:bg-[#e8e8ed] active:scale-95 cursor-pointer"
                      : "text-[#d2d2d7] opacity-40 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  aria-label={t("Siguiente", "Next")}
                  className={`w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 transition-all ${
                    canScrollRight
                      ? "text-[#1d1d1f] hover:bg-[#e8e8ed] active:scale-95 cursor-pointer"
                      : "text-[#d2d2d7] opacity-40 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Horizontal Carousel Track with FadeIn */}
      <FadeIn direction="up" delay={150}>
        <div className="w-full">
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-2 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          style={{ scrollPaddingLeft: "1rem", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {differentiators.map((item) => {
            const currentEyebrow = language === "en" && item.eyebrowEn ? item.eyebrowEn : item.eyebrow;
            const currentTitle = language === "en" && item.titleEn ? item.titleEn : item.title;
            const currentDescription = language === "en" && item.descriptionEn ? item.descriptionEn : item.description;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCard(item)}
                className="w-[300px] sm:w-[340px] md:w-[360px] h-[480px] sm:h-[500px] shrink-0 bg-white rounded-[26px] sm:rounded-[28px] p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-neutral-100 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-300 relative snap-start group cursor-pointer select-none"
              >
                {/* Top Text Group */}
                <div>
                  <p className="text-xs sm:text-[13px] font-semibold text-[#86868b] tracking-normal mb-2">
                    {currentEyebrow}
                  </p>
                  <h3 className="text-xl sm:text-[23px] font-bold text-[#1d1d1f] tracking-tight leading-[1.18] mb-3">
                    {currentTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6e6e73] font-normal leading-relaxed">
                    {currentDescription}
                  </p>
                </div>

                {/* Visual Showcase Center */}
                <div className="relative w-full h-44 sm:h-48 flex items-center justify-center my-auto">
                  {item.isCreditCard ? (
                    /* Apple Card-style minimalist Capelton Card */
                    <div className="relative w-[230px] h-[142px] bg-gradient-to-tr from-[#fbfbfd] via-[#f5f5f7] to-[#ffffff] rounded-[16px] p-5 shadow-[0_16px_32px_rgba(0,0,0,0.08)] border border-neutral-200/80 transform rotate-[-6deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        {/* Chip visual */}
                        <div className="w-8 h-6 bg-gradient-to-r from-amber-200 to-amber-300 rounded-[4px] border border-amber-400/40 relative overflow-hidden flex items-center justify-center shadow-inner">
                          <div className="w-full h-[1px] bg-amber-500/30 absolute top-2" />
                          <div className="h-full w-[1px] bg-amber-500/30 absolute left-3" />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-capelton-green flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-capelton-green" />
                          <span>Capelton</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-[#1d1d1f] tracking-tight">
                          {t("VENTA & RENTA FLEX", "FLEX SALE & RENTAL")}
                        </p>
                        <p className="text-[9px] text-[#86868b] tracking-wider uppercase">
                          {t("100% Deducible • Entrega Inmediata", "100% Tax Deductible • Fast Delivery")}
                        </p>
                      </div>
                    </div>
                  ) : item.image ? (
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                      <Image
                        src={item.image}
                        alt={currentTitle}
                        fill
                        sizes="340px"
                        className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Bottom Row with circular + button matching Apple screenshot */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("Ver especificación", "View specification")}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(item);
                    }}
                    aria-label={`${t("Ver detalles de", "View details of")} ${currentTitle}`}
                    className="w-9 h-9 rounded-full bg-[#f5f5f7] group-hover:bg-black group-hover:text-white text-[#1d1d1f] flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 shadow-sm ml-auto"
                  >
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </FadeIn>

      {/* Detail Modal Dialog */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-[28px] max-w-lg w-full p-7 sm:p-9 shadow-2xl relative animate-in zoom-in-95 duration-200 border border-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              aria-label={t("Cerrar modal", "Close modal")}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center text-[#1d1d1f] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <span className="inline-block text-xs font-semibold text-capelton-green uppercase tracking-wider mb-2">
                {language === "en" && selectedCard.eyebrowEn ? selectedCard.eyebrowEn : selectedCard.eyebrow}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-2">
                {language === "en" && selectedCard.modalTitleEn ? selectedCard.modalTitleEn : selectedCard.modalTitle}
              </h3>
              <p className="text-sm text-[#6e6e73] font-normal leading-relaxed">
                {language === "en" && selectedCard.modalSubtitleEn ? selectedCard.modalSubtitleEn : selectedCard.modalSubtitle}
              </p>
            </div>

            {/* Modal Checklist */}
            <div className="space-y-3.5 mb-8">
              {(language === "en" && selectedCard.pointsEn ? selectedCard.pointsEn : selectedCard.points).map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#1d1d1f] font-normal leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/525529640104?text=${encodeURIComponent(selectedCard.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full text-xs font-semibold text-white bg-black hover:bg-capelton-green transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === "en" && selectedCard.ctaTextEn ? selectedCard.ctaTextEn : selectedCard.ctaText}</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full text-xs font-semibold text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#e8e8ed] transition-colors text-center"
              >
                {t("Cerrar", "Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
