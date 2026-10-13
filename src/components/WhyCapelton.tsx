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
    id: "operacion",
    eyebrow: "Pilar 1 · Entendemos tu operación",
    eyebrowEn: "Pillar 1 · Understand the Operation",
    title: "Diseñadas para las personas y la rutina en campo.",
    titleEn: "Engineered for Field Teams & Daily Operations.",
    description:
      "Pensamos en flujos reales de trabajo: ergonomía, distribución funcional, ventilación eficiente y espacios confortables tanto para supervisores como para cuadrillas completas.",
    descriptionEn:
      "Designed around real daily workflows: functional layouts, ergonomics, reliable ventilation, and spaces tailored to both site supervisors and work crews.",
    image: "/images/CM_10M_Vista_01_cropped.png",
    modalTitle: "Entendemos tu Operación",
    modalTitleEn: "Understand the Operation",
    modalSubtitle: "Espacios de trabajo funcionales que responden a lo que realmente pasa en obra.",
    modalSubtitleEn: "Functional workspaces designed around what actually happens on the jobsite.",
    points: [
      "Distribuciones estudiadas para optimizar el paso, mobiliario y estaciones técnicas.",
      "Espacios configurables: desde oficinas individuales hasta comedores masivos y dormitorios.",
      "Acabados durables con pisos de SPC rígido de alta resistencia y muros lavables.",
      "Flexibilidad operativa para adaptarse al tamaño y duración de cada proyecto."
    ],
    pointsEn: [
      "Floor plans tailored for workflow efficiency, technical stations, and circulation.",
      "Configurable spaces: from compact guard booths to multi-station executive offices and crew quarters.",
      "High-durability SPC rigid-core flooring and cleanable, impact-resistant wall surfaces.",
      "Flexible layouts adaptable to specific jobsite constraints and project durations."
    ],
    ctaText: "Cotizar unidad para mi operación",
    ctaTextEn: "Quote unit for my operation",
    whatsappMessage: "Hola, me interesa una oficina móvil adaptada a las necesidades operativas de mi proyecto."
  },
  {
    id: "fabricacion",
    eyebrow: "Pilar 2 · Fabricamos con propósito",
    eyebrowEn: "Pillar 2 · Build with Purpose",
    title: "Chasis estructural reforzado y techo de aluminio de una pieza.",
    titleEn: "Reinforced Steel Chassis & One-Piece Aluminum Roof.",
    description:
      "Fabricamos en planta propia con chasis de acero rolado de alta resistencia, muros aislados y techo continuo de una sola pieza sin uniones para eliminar goteras por completo.",
    descriptionEn:
      "Manufactured in-house with reinforced steel chassis, continuous thermal insulation panels, and seamless one-piece aluminum roof to eliminate water leaks.",
    image: "/images/models/cm10m-persp.png",
    modalTitle: "Fabricamos con Propósito",
    modalTitleEn: "Build with Purpose",
    modalSubtitle: "Materiales certificados y ensamblaje industrial para resistir intemperie y traslado continuo.",
    modalSubtitleEn: "Certified industrial materials engineered for harsh weather and repeated transport.",
    points: [
      "Chasis estructural reforzado con puntos de izaje seguros para grúa y transporte en cama baja.",
      "Techo de aluminio continuo de una sola pieza: sin uniones vulnerables ni filtraciones de agua.",
      "Aislamiento térmico perimetral que mantiene temperatura estable en calor o frío extremo.",
      "Instalación eléctrica certificada con cableado de uso rudo y centro de carga protegido."
    ],
    pointsEn: [
      "Heavy-duty structural steel chassis with certified lifting points and road transport durability.",
      "Seamless one-piece aluminum roof: no vulnerable lap joints, eliminating leaks entirely.",
      "Continuous thermal insulation maintaining stable interior climate in extreme weather.",
      "Certified electrical system with heavy-duty wiring, dedicated breakers, and safety grounds."
    ],
    ctaText: "Consultar especificaciones de fabricación",
    ctaTextEn: "Check manufacturing specifications",
    whatsappMessage: "Hola, requiero conocer las especificaciones estructurales y de materiales de Capelton."
  },
  {
    id: "acompanamiento",
    eyebrow: "Pilar 3 · Acompañamos cada entrega",
    eyebrowEn: "Pillar 3 · Deliver with Care",
    title: "Soporte directo de planta y entrega puntual en tu obra.",
    titleEn: "Direct Factory Support & Reliable On-Site Delivery.",
    description:
      "Trato directo sin intermediarios. Coordinamos logística de traslado, maniobra de descarga y nivelación en sitio, respaldados con garantía y refacciones de fábrica.",
    descriptionEn:
      "Direct relationship without brokers. We coordinate transport logistics, on-site crane positioning, and leveling, backed by direct factory warranty and support.",
    image: "/images/proyectos/proyecto-1.jpg",
    modalTitle: "Acompañamos Cada Entrega",
    modalTitleEn: "Deliver with Care",
    modalSubtitle: "Cero intermediarios: respaldo técnico antes, durante y después del montaje.",
    modalSubtitleEn: "Direct manufacturer backing before, during, and after site deployment.",
    points: [
      "Logística especializada y maniobra de posicionamiento en sitio en todo México.",
      "Asesoría técnica para preparación de terreno, nivelación y acometidas de servicios.",
      "Garantía directa de fábrica contra vicios ocultos y filtraciones.",
      "Disponibilidad continua de refacciones, accesorios y mantenimiento preventivo."
    ],
    pointsEn: [
      "Specialized transport and precision crane positioning to jobsite locations.",
      "Technical guidance on ground preparation, leveling, and utility connections.",
      "Direct factory warranty covering structural integrity and weather tightness.",
      "Ongoing access to OEM replacement parts, accessories, and unit expansions."
    ],
    ctaText: "Hablar con un asesor técnico",
    ctaTextEn: "Talk to a technical advisor",
    whatsappMessage: "Hola, deseo coordinar una cotización con entrega y logística para mi proyecto."
  },
  {
    id: "esquemas",
    eyebrow: "Flexibilidad Operativa",
    eyebrowEn: "Operational Flexibility",
    title: "Modalidades de Venta y Renta para tu proyecto.",
    titleEn: "Purchase & Flexible Rental Options.",
    description:
      "Renta mensual flexible para frentes de obra temporales o adquisición definitiva para patrimonio corporativo. Condiciones transparentes y facturación inmediata.",
    descriptionEn:
      "Flexible monthly rental terms for temporary worksites or direct purchase for long-term fleet assets. Clear terms and immediate corporate invoicing.",
    isCreditCard: true,
    modalTitle: "Modalidades de Adquisición",
    modalTitleEn: "Acquisition & Rental Options",
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
    whatsappMessage: "Hola, deseo solicitar una cotización bajo el esquema de Venta o Renta."
  },
  {
    id: "aislamiento",
    eyebrow: "Confort Climático",
    eyebrowEn: "Climate Comfort",
    title: "Aislamiento termoacústico para climas severos.",
    titleEn: "Continuous Thermo-Acoustic Comfort.",
    description:
      "Muros con aislamiento de alta densidad que protegen del calor del desierto o el frío de montaña, reduciendo el consumo eléctrico de aire acondicionado y el ruido exterior de obra.",
    descriptionEn:
      "Insulated sandwich panels protecting against extreme heat or cold, reducing HVAC energy load and dampening heavy machinery noise on site.",
    image: "/images/proyectos/oficinas-campo-real.png",
    modalTitle: "Aislamiento Termoacústico Continuo",
    modalTitleEn: "Continuous Thermo-Acoustic Insulation",
    modalSubtitle: "Confort térmico y acústico garantizado en cualquier entorno operativo.",
    modalSubtitleEn: "Guaranteed thermal and acoustic comfort in any operating environment.",
    points: [
      "Muros panel tipo sándwich con espuma aislante de alta densidad.",
      "Rango de confort operativo estable en temperaturas extremas de -10°C a más de +45°C.",
      "Atenuación acústica frente al ruido de maquinaria pesada y tránsito en obra.",
      "Preparación integral para minisplit inverter de bajo consumo energético."
    ],
    pointsEn: [
      "Sandwich panel walls with high-density rigid insulating core.",
      "Stable operational comfort range under extreme temperatures from -10°C to over +45°C.",
      "Acoustic attenuation against heavy machinery noise and site transit.",
      "Integrated electrical and structural prep for high-efficiency inverter minisplit systems."
    ],
    ctaText: "Consultar especificación térmica",
    ctaTextEn: "Check thermal specification",
    whatsappMessage: "Hola, requiero información sobre el aislamiento térmico de los espacios Capelton."
  },
  {
    id: "despliegue",
    eyebrow: "Listas para Trabajar",
    eyebrowEn: "Ready to Operate",
    title: "Conéctala y empieza a trabajar de inmediato.",
    titleEn: "Connect & Start Working Immediately.",
    description:
      "Instalación eléctrica certificada, iluminación LED, contactos de uso rudo y climatización preinstalada para empezar a operar desde el primer día en obra sin retrasos.",
    descriptionEn:
      "Certified electrical systems, LED lighting, heavy-duty outlets, and pre-installed climate control to start operating immediately on site without civil construction delays.",
    image: "/images/archived/oficinas_caapelton-04-2-2048x1365.png",
    modalTitle: "Despliegue Inmediato en Sitio",
    modalTitleEn: "Immediate Jobsite Deployment",
    modalSubtitle: "Tu oficina o espacio móvil listo para operar sin retrasos de construcción.",
    modalSubtitleEn: "Your office or mobile workspace ready to operate without civil construction delays.",
    points: [
      "Tablero de control y centro de carga homologado bajo norma oficial (NOM).",
      "Iluminación LED perimetral de bajo consumo y larga vida útil preinstalada.",
      "Contactos polarizados de uso rudo para computadoras, impresoras y servidores.",
      "Acometida exterior rápida para conexión directa a red de obra o generador."
    ],
    pointsEn: [
      "Certified electrical panel and load center under official safety standards.",
      "Pre-installed high-efficiency perimeter LED lighting with long service life.",
      "Heavy-duty polarized outlets for workstations, printers, and computer servers.",
      "Quick exterior utility connection for direct hookup to site grid or generator."
    ],
    ctaText: "Cotizar entrega y disponibilidad",
    ctaTextEn: "Quote delivery & availability",
    whatsappMessage: "Hola, me gustaría cotizar una oficina móvil con entrega y despliegue rápido."
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
              <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-2">
                {t(
                  "Entendemos tu operación · Fabricamos con propósito · Acompañamos cada entrega",
                  "Understand the Operation · Build with Purpose · Deliver with Care"
                )}
              </span>
              <SciFiHeading
                text={t("Por qué elegir espacios móviles Capelton.", "Why choose Capelton mobile workspaces.")}
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
