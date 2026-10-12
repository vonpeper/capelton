"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MessageCircle,
  FileText,
  Check,
  ChevronDown,
  Building2,
  Shield,
  BedDouble,
  Bath,
  UtensilsCrossed,
  Boxes,
  HeartPulse,
  Compass,
  Sparkles,
  Maximize2,
  Info,
} from "lucide-react";
import { products, categories } from "@/lib/data";
import { ProductModel } from "@/lib/types";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { trackWhatsAppClick } from "@/lib/analytics";

const DUO_FEATURE_MAP: Record<string, string> = {
  "sistema de aire acondicionado": "Air conditioning system",
  "aire acondicionado": "Air conditioning system",
  "luminarias led": "LED lighting fixtures",
  "muros de lámina pintro": "Pre-painted steel sheet walls",
  "ventanas de aluminio": "Anodized aluminum windows",
  "sanitario completo": "Full private restroom",
  "lavamanos y regadera": "Sink and shower module",
  "mesa y bancas integradas": "Integrated table and benches",
  "cocina con tarja": "Kitchenette with sink",
  "piso de spc": "High-durability SPC flooring",
  "mesas de trabajo": "Integrated workstations",
  "aislamiento termoacústico": "Thermoacoustic insulation",
  "instalación eléctrica nom": "NOM-certified electrical system",
};

const DEFAULT_DUO_SPECS_ES = [
  "Chasis estructural monolítico reforzado",
  "Aislamiento termoacústico continuo",
  "Instalación eléctrica bajo norma NOM",
];

const DEFAULT_DUO_SPECS_EN = [
  "Reinforced monolithic structural chassis",
  "Continuous thermoacoustic insulation",
  "NOM-certified electrical installation",
];

const CATEGORY_MODEL_ORDER: Record<string, string[]> = {
  oficinas: ["cm3m", "cm3mr", "cm4m", "cm6m", "cm8m", "cm10m", "cm12m", "cm14m", "cm17m"],
  dormitorios: ["cmd4ib", "cmdbc6m", "cmd10br", "cmdc10m", "cmd12m", "cmd12x60", "hotel12x60"],
  comedores: ["cmk6m", "cmk8m", "cmm12co"],
  sanitarios: ["cml6x16", "cms10m", "cmb10m"],
  casetas: ["cmvc3m2", "cmv6m2"],
  contenedores: ["bodega8x32", "minibodega-casa-seca", "minibodega-contenedor"],
  consultorios: ["cm4-mm", "cm6-mm", "cm8-mm", "cm10-mm"],
};

const DEFAULT_CATEGORY_PAIRS: Record<string, [string, string]> = {
  oficinas: ["cm4m", "cm10m"],
  dormitorios: ["cmd10br", "hotel12x60"],
  comedores: ["cmk6m", "cmm12co"],
  sanitarios: ["cml6x16", "cms10m"],
  casetas: ["cmvc3m2", "cmv6m2"],
  contenedores: ["bodega8x32", "minibodega-contenedor"],
  consultorios: ["cm4-mm", "cm10-mm"],
};

const MODEL_LABELS: Record<string, { es: string; en: string }> = {
  // Oficinas Móviles
  cm3m: { es: "CM-3M (Oficina Compacta 3m)", en: "CM-3M (Compact Office 3m)" },
  cm3mr: { es: "CM-3MR (Oficina Remolque 3m)", en: "CM-3MR (Trailer Office 3m)" },
  cm4m: { es: "CM-4M (Oficina Estándar 4m)", en: "CM-4M (Standard Office 4m)" },
  cm6m: { es: "CM-6M (Oficina / Sala 6m)", en: "CM-6M (Office / Meeting Room 6m)" },
  cm8m: { es: "CM-8M (Oficina Corporativa 8m)", en: "CM-8M (Corporate Office 8m)" },
  cm10m: { es: "CM-10M (Oficina Ejecutiva 10m)", en: "CM-10M (Executive Office 10m)" },
  cm12m: { es: "CM-12M (Oficina Gerencial 12m)", en: "CM-12M (Management Office 12m)" },
  cm14m: { es: "CM-14M (Oficina Macro 14m)", en: "CM-14M (Macro Office 14m)" },
  cm17m: { es: "CM-17M (Oficina Master 17m)", en: "CM-17M (Master Office 17m)" },

  // Casetas
  cmvc3m2: { es: "CMVC-3M2 (Caseta 2.4×1.2m · 1 pers)", en: "CMVC-3M2 (Booth 2.4×1.2m · 1 pers)" },
  cmv6m2: { es: "CMVC-6M2 (Caseta 2.4×2.4m · 2 pers)", en: "CMVC-6M2 (Booth 2.4×2.4m · 2 pers)" },

  // Dormitorios Móviles
  cmd4ib: { es: "CMD-4IB (Dormitorio 4m · 4-8 pers)", en: "CMD-4IB (Crew Quarters 4m · 4-8 pers)" },
  cmdbc6m: { es: "CMDBC6M (Dormitorio 6m · 2-4 pers)", en: "CMDBC6M (Crew Quarters 6m · 2-4 pers)" },
  cmd10br: { es: "CMD-10BR (Dormitorio / Baño 10m)", en: "CMD-10BR (Quarters / Restroom 10m)" },
  cmdc10m: { es: "CMDC-10M (Dormitorio Compartido 10m)", en: "CMDC-10M (Shared Quarters 10m)" },
  cmd12m: { es: "CMD-12M (Dormitorio Masivo 12m)", en: "CMD-12M (Mass Quarters 12m)" },
  cmd12x60: { es: "CMD-12X60 (Campamento Modular 17m)", en: "CMD-12X60 (Modular Camp 17m)" },
  hotel12x60: { es: "HOTEL 12X60 (Campamento Hotel 17m)", en: "HOTEL 12X60 (Work Camp Hotel 17m)" },

  // Sanitarios Móviles
  cml6x16: { es: "CML-6X16 (Sanitario Remolque 3.7m)", en: "CML-6X16 (Restroom Trailer 3.7m)" },
  cms10m: { es: "CMS-10M (Módulo Sanitario 10m)", en: "CMS-10M (Restroom Module 10m)" },
  cmb10m: { es: "CMB-10M (Sanitario con Regaderas 10m)", en: "CMB-10M (Shower Restroom 10m)" },

  // Comedores Móviles
  cmk6m: { es: "CMK-6M (Comedor 6m · 7-8 pers)", en: "CMK-6M (Dining Unit 6m · 7-8 pers)" },
  cmk8m: { es: "CMK-8M (Comedor 8m · 10-12 pers)", en: "CMK-8M (Dining Unit 8m · 10-12 pers)" },
  cmm12co: { es: "CMM-12CO (Comedor Masivo 12m · 35-37 pers)", en: "CMM-12CO (Mass Dining 12m · 35-37 pers)" },

  // Contenedores y Bodegas
  bodega8x32: { es: "BODEGA 8X32 (Almacén Móvil 8.5m)", en: "BODEGA 8X32 (Storage Unit 8.5m)" },
  "minibodega-casa-seca": { es: "Minibodega Caja Seca (Resguardo)", en: "Dry Box Storage (Shelter)" },
  "minibodega-contenedor": { es: "Minibodega Contenedor (Seguridad)", en: "Container Storage (Security)" },

  // Consultorios Médicos
  "cm4-mm": { es: "CM-4MM (Consultorio Básico 4m)", en: "CM-4MM (Basic Medical Unit 4m)" },
  "cm6-mm": { es: "CM-6MM (Consultorio Clínico 6m)", en: "CM-6MM (Clinical Unit 6m)" },
  "cm8-mm": { es: "CM-8MM (Consultorio Integral 8m)", en: "CM-8MM (Integral Medical Unit 8m)" },
  "cm10-mm": { es: "CM-10MM (Clínica Médica 10m)", en: "CM-10MM (Mobile Clinic 10m)" },
};

const CATEGORY_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    labelEs: string;
    labelEn: string;
  }
> = {
  oficinas: { icon: Building2, labelEs: "Oficinas Móviles", labelEn: "Mobile Offices" },
  casetas: { icon: Shield, labelEs: "Casetas", labelEn: "Portable Booths" },
  dormitorios: { icon: BedDouble, labelEs: "Dormitorios Móviles", labelEn: "Crew Quarters" },
  sanitarios: { icon: Bath, labelEs: "Sanitarios Móviles", labelEn: "Restroom Units" },
  comedores: { icon: UtensilsCrossed, labelEs: "Comedores Móviles", labelEn: "Dining Units" },
  contenedores: { icon: Boxes, labelEs: "Bodegas y Resguardo", labelEn: "Storage Units" },
  consultorios: { icon: HeartPulse, labelEs: "Consultorios Móviles", labelEn: "Mobile Medical Units" },
};

// Perfiles descriptivos y recomendaciones comerciales específicas para ayudar al comprador a decidir
const MODEL_PROFILES: Record<
  string,
  {
    diffEs: string;
    diffEn: string;
    recomEs: string;
    recomEn: string;
  }
> = {
  cm3m: {
    diffEs: "Huella mínima (3m) de colocación rápida en accesos reducidos.",
    diffEn: "Minimal 3m footprint for rapid deployment in restricted access points.",
    recomEs: "Supervisión técnica individual o caseta de control en espacios estrechos.",
    recomEn: "Individual technical supervision or control booth in tight spaces.",
  },
  cm3mr: {
    diffEs: "Chasis remolque con tirón y eje para reubicación diaria continua.",
    diffEn: "Towable trailer chassis with hitch and axle for agile continuous transit.",
    recomEs: "Obras carreteras lineales, tendido de ductos y frentes móviles.",
    recomEn: "Linear road construction, pipeline installations, and moving crews.",
  },
  cm4m: {
    diffEs: "Oficina estándar de 4m: maniobra rápida y espacio para 2 a 4 ingenieros.",
    diffEn: "Standard 4m office: quick hoisting and functional layout for 2 to 4 engineers.",
    recomEs: "Supervisión de obra civil directa, contratistas y oficinas de frente de trabajo.",
    recomEn: "Direct civil supervision, on-site contractors, and front-of-work offices.",
  },
  cm6m: {
    diffEs: "Equilibrio ideal (6m) entre espacio de trabajo y versatilidad logística.",
    diffEn: "Ideal 6m balance between productive workspace and logistics versatility.",
    recomEs: "Jefaturas de turno, laboratorios de control de calidad y salas técnicas.",
    recomEn: "Shift coordinators, on-site QA testing labs, and technical command rooms.",
  },
  cm8m: {
    diffEs: "Espacio de 8m que permite integrar privado gerencial y área de trabajo.",
    diffEn: "8m space allowing a private executive suite alongside workstations.",
    recomEs: "Coordinación de plantas industriales, campamentos y supervisión corporativa.",
    recomEn: "Industrial coordination, mining support bases, and corporate project teams.",
  },
  cm10m: {
    diffEs: "Módulo insignia de 10m con máxima amplitud ejecutiva, privado y baño.",
    diffEn: "Flagship 10m unit with executive capacity, private office, and restroom.",
    recomEs: "Gerencias generales de obra, consorcios de infraestructura y proyectos medianos/largos.",
    recomEn: "General site directors, infrastructure consortia, and mid-to-long term projects.",
  },
  cm12m: {
    diffEs: "Macro-espacio de 12m para consolidar múltiples departamentos técnicos.",
    diffEn: "12m macro-space consolidating multiple engineering teams in one footprint.",
    recomEs: "Centros administrativos de obra pesada y corporativos en planta.",
    recomEn: "Heavy construction administrative centers and plant management hubs.",
  },
  cm14m: {
    diffEs: "Oficina corporativa de 14m con doble privado ejecutivo y sala de juntas.",
    diffEn: "14m corporate office featuring dual executive suites and board room.",
    recomEs: "Direcciones de megaproyectos, dependencias gubernamentales y auditorías.",
    recomEn: "Megaproject directorates, government agencies, and on-site audit teams.",
  },
  cm17m: {
    diffEs: "Máxima escala modular (17m) para operaciones corporativas completas.",
    diffEn: "Maximum modular scale (17m) for full-scale on-site corporate operations.",
    recomEs: "Centros estratégicos de control, consorcios multinacionales y terminales.",
    recomEn: "Strategic command centers, multinational consortia, and logistics hubs.",
  },
  cmvc3m2: {
    diffEs: "Caseta compacta 2.4×1.2m con visibilidad 360° para 1 guardia.",
    diffEn: "Compact 2.4×1.2m booth with 360° visibility for 1 security guard.",
    recomEs: "Filtros peatonales, plumas vehiculares y casetas de control individual.",
    recomEn: "Pedestrian checkpoints, barrier gates, and single-operator security points.",
  },
  cmv6m2: {
    diffEs: "Caseta amplia 2.4×2.4m para 2 oficiales con espacio para CCTV.",
    diffEn: "Spacious 2.4×2.4m booth for 2 officers with space for CCTV consoles.",
    recomEs: "Accesos principales a parques industriales, aduanas y vigilancia 24/7.",
    recomEn: "Main industrial park entrances, customs checkpoints, and 24/7 monitoring.",
  },
  cmd10br: {
    diffEs: "Dormitorio de obra con baño privado y regadera para cuadrillas en campo.",
    diffEn: "Field quarters with private bathroom and shower for site crews.",
    recomEs: "Campamentos mineros, plantas fotovoltaicas y cuadrillas en sitios remotos.",
    recomEn: "Mining base camps, solar farms, and remote infrastructure projects.",
  },
  hotel12x60: {
    diffEs: "Complejo habitacional masivo modular tipo hotel para alta densidad.",
    diffEn: "High-density modular hotel-style living complex for workforce lodging.",
    recomEs: "Campamentos masivos de infraestructura y desarrollos energéticos.",
    recomEn: "Massive infrastructure work camps and energy development projects.",
  },
  cms10m: {
    diffEs: "Módulo sanitario industrial de alta capacidad con divisiones independientes.",
    diffEn: "High-capacity industrial restroom module with independent sanitary stalls.",
    recomEs: "Obras con cuadrillas de más de 30 trabajadores y eventos industriales.",
    recomEn: "Worksites with 30+ workers and heavy industrial turnaround operations.",
  },
  cml6x16: {
    diffEs: "Remolque sanitario móvil de rápido traslado con servicios autónomos.",
    diffEn: "Mobile restroom trailer with swift road transit and self-contained utilities.",
    recomEs: "Obras viales lineales, brigadas médicas y eventos corporativos.",
    recomEn: "Linear road works, health brigades, and corporate field events.",
  },
};

function cleanDuoFeatures(features: string[], language: string): string[] {
  const filtered = (features || []).filter(
    (f) =>
      !f.includes("_blk") &&
      !f.toLowerCase().includes("vista") &&
      !f.toLowerCase().includes("ficha") &&
      f.trim().length > 4
  );
  if (filtered.length >= 3) {
    return filtered.slice(0, 4).map((f) => {
      if (language === "en") {
        return DUO_FEATURE_MAP[f.toLowerCase().trim()] || f;
      }
      return f;
    });
  }
  return language === "en" ? DEFAULT_DUO_SPECS_EN : DEFAULT_DUO_SPECS_ES;
}

function getModelPlantaImage(model: ProductModel): string | null {
  const planta = model.images.find(
    (img) => img.toLowerCase().includes("planta") || img.includes("blueprints")
  );
  if (planta) return planta;
  if (model.category === "casetas") {
    return "/images/blueprints/planta-caseta.svg";
  }
  return "/images/blueprints/planta-oficina.svg";
}

function getModelInteriorImage(model: ProductModel): string | null {
  const interior = model.images.find(
    (img) =>
      (img.toLowerCase().includes("vista_02") ||
        img.toLowerCase().includes("vista2") ||
        img.toLowerCase().includes("vista3") ||
        img.toLowerCase().includes("interior")) &&
      !img.toLowerCase().includes("planta")
  );
  if (interior) return interior;
  return model.images[1] || model.images[0] || null;
}

function getModelOptionLabel(model: ProductModel, language: string): string {
  const custom = MODEL_LABELS[model.slug];
  if (custom) {
    return language === "en" ? custom.en : custom.es;
  }
  return `${model.modelCode} (${model.dimensions} · ${model.peopleCapacity})`;
}

export default function DuoSwitcher() {
  const { t, language } = useLanguage();
  const [activeCategoryId, setActiveCategoryId] = useState<string>("oficinas");
  const [modelAId, setModelAId] = useState<string>("cm4m");
  const [modelBId, setModelBId] = useState<string>("cm10m");

  // Filter only categories that have available models
  const availableCategories = useMemo(() => {
    return categories.filter((c) => products.some((p) => p.category === c.id));
  }, []);

  // Filter and order models strictly within active category
  const categoryModels = useMemo(() => {
    const list = products.filter((p) => p.category === activeCategoryId);
    const order = CATEGORY_MODEL_ORDER[activeCategoryId];
    if (order) {
      return [...list].sort((a, b) => {
        const indexA = order.indexOf(a.slug);
        const indexB = order.indexOf(b.slug);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
      });
    }
    return list;
  }, [activeCategoryId]);

  const modelA =
    categoryModels.find((p) => p.slug === modelAId) || categoryModels[0] || products[0];
  const modelB =
    categoryModels.find((p) => p.slug === modelBId) ||
    categoryModels[1] ||
    categoryModels[0] ||
    products[1];

  const currentCategory = categories.find((c) => c.id === activeCategoryId);

  const handleCategoryChange = (newCatId: string) => {
    setActiveCategoryId(newCatId);
    const defaultPair = DEFAULT_CATEGORY_PAIRS[newCatId];
    if (defaultPair) {
      setModelAId(defaultPair[0]);
      setModelBId(defaultPair[1]);
    } else {
      const prods = products.filter((p) => p.category === newCatId);
      if (prods.length >= 2) {
        setModelAId(prods[0].slug);
        setModelBId(prods[1].slug);
      } else if (prods.length === 1) {
        setModelAId(prods[0].slug);
        setModelBId(prods[0].slug);
      }
    }
  };

  const modelAProfile = MODEL_PROFILES[modelA.slug];
  const modelBProfile = MODEL_PROFILES[modelB.slug];

  const plantaA = getModelPlantaImage(modelA);
  const plantaB = getModelPlantaImage(modelB);

  const interiorA = getModelInteriorImage(modelA);
  const interiorB = getModelInteriorImage(modelB);

  return (
    <section id="duo-comparator" className="py-20 sm:py-28 bg-white text-[#1d1d1f] relative overflow-hidden border-t border-black/5 scroll-mt-20">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Explicitly guided by the project leader */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-capelton-green block mb-2">
              {t("Herramienta Comercial de Decisión", "Commercial Decision Tool")}
            </span>
            <SciFiHeading
              text={t(
                "Encuentra la unidad adecuada para tu proyecto.",
                "Find the Right Unit for Your Project."
              )}
              as="h2"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.12] mb-3"
              showLaser={false}
              showHudTag={false}
              duration={700}
            />
            <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed max-w-2xl mx-auto">
              {t(
                "Compara dimensiones, capacidad, distribución y equipamiento entre nuestros modelos. Apóyate de las fichas técnicas.",
                "Compare dimensions, capacity, layout, and equipment between our models. Backed by official technical sheets."
              )}
            </p>
          </div>
        </FadeIn>

        {/* Clean, Elegant Category Selector (Replaces heavy lock mechanism with clarity) */}
        <FadeIn direction="up" delay={80}>
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {availableCategories.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                const meta = CATEGORY_META[cat.id];
                const IconComp = meta?.icon || Building2;
                const catName = language === "en" ? cat.nameEn || cat.name : cat.name;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-black text-white border-black shadow-sm"
                        : "bg-[#f5f5f7] hover:bg-neutral-200 text-[#515154] border-transparent hover:text-black"
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-capelton-green" : "text-[#86868b]"}`} />
                    <span>{catName}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-black/5 text-[#86868b]"}`}>
                      {cat.modelsCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Side-by-Side Model Comparison Matrix */}
        <FadeIn direction="up" delay={140}>
          <div className="bg-[#fafafc] border border-black/8 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 lg:p-10 max-w-5xl mx-auto shadow-sm">
            {/* Top Products Comparison Row */}
            <div className="grid grid-cols-2 gap-4 sm:gap-10 pb-8 border-b border-black/8">
              {/* Model A Card */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 w-full max-w-xs">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#86868b] block mb-1.5">
                    {t("Modelo A", "Model A")}
                  </label>
                  <select
                    value={modelA.slug}
                    onChange={(e) => setModelAId(e.target.value)}
                    className="w-full bg-white border border-black/12 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black focus:outline-none focus:border-capelton-green transition-all shadow-2xs cursor-pointer"
                  >
                    {categoryModels.map((m) => (
                      <option key={m.slug} value={m.slug} className="text-black">
                        {getModelOptionLabel(m, language)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative w-full h-32 sm:h-44 mb-3 flex items-center justify-center">
                  {modelA.images[0] ? (
                    <Image
                      src={modelA.images[0]}
                      alt={modelA.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 380px"
                      className="object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.06)]"
                    />
                  ) : (
                    <div className="text-xs text-[#86868b]">{t("Render disponible", "Render available")}</div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-0.5">
                  {modelA.modelCode}
                </h3>
                <span className="text-[11px] font-semibold text-capelton-green mb-4 block">
                  {language === "en" ? currentCategory?.nameEn || currentCategory?.name : currentCategory?.name}
                </span>

                <a
                  href={`https://wa.me/525529640104?text=${encodeURIComponent(
                    language === "en"
                      ? `Hello, I want to quote model ${modelA.modelCode}`
                      : `Hola, me interesa cotizar el modelo ${modelA.modelCode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", `duo_quote_${modelA.modelCode}`)}
                  className="w-full max-w-xs py-2.5 px-3 rounded-full bg-capelton-green hover:bg-capelton-darkgreen text-white font-bold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{t(`Cotizar ${modelA.modelCode}`, `Quote ${modelA.modelCode}`)}</span>
                </a>
              </div>

              {/* Model B Card */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 w-full max-w-xs">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#86868b] block mb-1.5">
                    {t("Modelo B", "Model B")}
                  </label>
                  <select
                    value={modelB.slug}
                    onChange={(e) => setModelBId(e.target.value)}
                    className="w-full bg-white border border-black/12 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black focus:outline-none focus:border-capelton-green transition-all shadow-2xs cursor-pointer"
                  >
                    {categoryModels.map((m) => (
                      <option key={m.slug} value={m.slug} className="text-black">
                        {getModelOptionLabel(m, language)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative w-full h-32 sm:h-44 mb-3 flex items-center justify-center">
                  {modelB.images[0] ? (
                    <Image
                      src={modelB.images[0]}
                      alt={modelB.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 380px"
                      className="object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.06)]"
                    />
                  ) : (
                    <div className="text-xs text-[#86868b]">{t("Render disponible", "Render available")}</div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-0.5">
                  {modelB.modelCode}
                </h3>
                <span className="text-[11px] font-semibold text-capelton-green mb-4 block">
                  {language === "en" ? currentCategory?.nameEn || currentCategory?.name : currentCategory?.name}
                </span>

                <a
                  href={`https://wa.me/525529640104?text=${encodeURIComponent(
                    language === "en"
                      ? `Hello, I want to quote model ${modelB.modelCode}`
                      : `Hola, me interesa cotizar el modelo ${modelB.modelCode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", `duo_quote_${modelB.modelCode}`)}
                  className="w-full max-w-xs py-2.5 px-3 rounded-full bg-capelton-green hover:bg-capelton-darkgreen text-white font-bold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{t(`Cotizar ${modelB.modelCode}`, `Quote ${modelB.modelCode}`)}</span>
                </a>
              </div>
            </div>

            {/* Comprehensive Side-by-Side Comparison Matrix */}
            <div className="mt-6 bg-white rounded-2xl sm:rounded-3xl border border-black/8 overflow-hidden shadow-xs divide-y divide-black/5 text-xs sm:text-sm">
              {/* Row 1: Dimensiones */}
              <div className="py-3.5 px-4 sm:px-6">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("Dimensiones (Largo × Ancho × Alto)", "Dimensions (Length × Width × Height)")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                  <span className="text-sm sm:text-base font-bold text-black">{modelA.dimensions}</span>
                  <span className="text-sm sm:text-base font-bold text-black">{modelB.dimensions}</span>
                </div>
              </div>

              {/* Row 2: Aforo y Capacidad */}
              <div className="py-3.5 px-4 sm:px-6 bg-[#fbfbfd]">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("Capacidad sugerida de personal", "Suggested Personnel Capacity")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                  <span className="text-sm sm:text-base font-bold text-capelton-green">{modelA.peopleCapacity}</span>
                  <span className="text-sm sm:text-base font-bold text-capelton-green">{modelB.peopleCapacity}</span>
                </div>
              </div>

              {/* Row 3: Plano de Distribución Interior (Planta) */}
              <div className="py-4 px-4 sm:px-6">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-2">
                  {t("Plano de Distribución Interior (Planta)", "Interior Floor Plan")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 items-center">
                  <div className="relative w-full h-24 sm:h-32 bg-[#f5f5f7] rounded-xl p-2 flex items-center justify-center border border-black/5">
                    {plantaA ? (
                      <Image
                        src={plantaA}
                        alt={`Planta ${modelA.modelCode}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <span className="text-[11px] text-[#86868b]">{t("Planta en ficha técnica", "Floor plan in spec sheet")}</span>
                    )}
                  </div>
                  <div className="relative w-full h-24 sm:h-32 bg-[#f5f5f7] rounded-xl p-2 flex items-center justify-center border border-black/5">
                    {plantaB ? (
                      <Image
                        src={plantaB}
                        alt={`Planta ${modelB.modelCode}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <span className="text-[11px] text-[#86868b]">{t("Planta en ficha técnica", "Floor plan in spec sheet")}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 4: Perspectiva Interior */}
              {(interiorA || interiorB) && (
                <div className="py-4 px-4 sm:px-6 bg-[#fbfbfd]">
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-2">
                    {t("Perspectiva de Interiores", "Interior Perspective")}
                  </span>
                  <div className="grid grid-cols-2 gap-4 sm:gap-8 items-center">
                    <div className="relative w-full h-24 sm:h-32 bg-white rounded-xl p-1 flex items-center justify-center border border-black/5 overflow-hidden">
                      {interiorA ? (
                        <Image
                          src={interiorA}
                          alt={`Interior ${modelA.modelCode}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 240px"
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-[11px] text-[#86868b]">{t("Disponible", "Available")}</span>
                      )}
                    </div>
                    <div className="relative w-full h-24 sm:h-32 bg-white rounded-xl p-1 flex items-center justify-center border border-black/5 overflow-hidden">
                      {interiorB ? (
                        <Image
                          src={interiorB}
                          alt={`Interior ${modelB.modelCode}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 240px"
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-[11px] text-[#86868b]">{t("Disponible", "Available")}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Row 5: Diferencial y Ventaja del Modelo (¿Por qué elegir uno sobre el otro?) */}
              <div className="py-3.5 px-4 sm:px-6">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("¿Por qué elegir esta unidad?", "Why choose this unit?")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center sm:text-left">
                  <div className="bg-[#f5f5f7] p-3 rounded-xl border border-black/5">
                    <span className="text-[11px] font-bold text-black block mb-0.5">
                      {modelA.modelCode}
                    </span>
                    <p className="text-[11px] text-[#515154] leading-relaxed">
                      {modelAProfile
                        ? language === "en"
                          ? modelAProfile.diffEn
                          : modelAProfile.diffEs
                        : modelA.tagline}
                    </p>
                  </div>
                  <div className="bg-[#f5f5f7] p-3 rounded-xl border border-black/5">
                    <span className="text-[11px] font-bold text-black block mb-0.5">
                      {modelB.modelCode}
                    </span>
                    <p className="text-[11px] text-[#515154] leading-relaxed">
                      {modelBProfile
                        ? language === "en"
                          ? modelBProfile.diffEn
                          : modelBProfile.diffEs
                        : modelB.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 6: Recomendación Operativa */}
              <div className="py-3.5 px-4 sm:px-6 bg-[#fbfbfd]">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("Recomendación de Aplicación Operativa", "Operational Recommendation")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center sm:text-left">
                  <div className="flex items-start gap-2">
                    <Compass className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs text-[#1d1d1f] font-medium leading-relaxed">
                      {modelAProfile
                        ? language === "en"
                          ? modelAProfile.recomEn
                          : modelAProfile.recomEs
                        : t("Apto para operaciones en campo.", "Suitable for field operations.")}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Compass className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                    <span className="text-xs text-[#1d1d1f] font-medium leading-relaxed">
                      {modelBProfile
                        ? language === "en"
                          ? modelBProfile.recomEn
                          : modelBProfile.recomEs
                        : t("Apto para operaciones en campo.", "Suitable for field operations.")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 7: Estructura, Peso y Capacidad de Carga */}
              <div className="py-3.5 px-4 sm:px-6">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("Peso y capacidad de carga", "Weight & Load Capacity")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                  <div>
                    <span className="font-bold text-black block">{modelA.weight}</span>
                    <span className="text-[11px] text-[#86868b] mt-0.5 block">
                      {t("Carga máx:", "Max load:")} {modelA.loadCapacity}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-black block">{modelB.weight}</span>
                    <span className="text-[11px] text-[#86868b] mt-0.5 block">
                      {t("Carga máx:", "Max load:")} {modelB.loadCapacity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 8: Equipamiento de Serie */}
              <div className="py-3.5 px-4 sm:px-6 bg-[#fbfbfd]">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-2">
                  {t("Equipamiento base", "Standard Equipment")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  <ul className="space-y-1.5 max-w-xs mx-auto text-left">
                    {cleanDuoFeatures(modelA.features, language).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[#434344]">
                        <Check className="w-3.5 h-3.5 text-capelton-green shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="space-y-1.5 max-w-xs mx-auto text-left">
                    {cleanDuoFeatures(modelB.features, language).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[#434344]">
                        <Check className="w-3.5 h-3.5 text-capelton-green shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Row 9: Ficha Técnica PDF */}
              <div className="py-3 px-4 sm:px-6">
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                  <div>
                    {modelA.technicalSheetUrl ? (
                      <a
                        href={modelA.technicalSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t("Descargar ficha PDF", "Download PDF Sheet")}</span>
                      </a>
                    ) : (
                      <span className="text-xs text-[#86868b]">{t("Disponible bajo solicitud", "Available upon request")}</span>
                    )}
                  </div>
                  <div>
                    {modelB.technicalSheetUrl ? (
                      <a
                        href={modelB.technicalSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t("Descargar ficha PDF", "Download PDF Sheet")}</span>
                      </a>
                    ) : (
                      <span className="text-xs text-[#86868b]">{t("Disponible bajo solicitud", "Available upon request")}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
