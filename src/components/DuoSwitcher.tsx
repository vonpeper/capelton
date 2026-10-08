"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MessageCircle,
  FileText,
  Check,
  Lock,
  Unlock,
  ChevronDown,
  Building2,
  Shield,
  BedDouble,
  Bath,
  UtensilsCrossed,
  Boxes,
  HeartPulse,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  "Chasis estructural monolítico Calibre 14",
  "Aislamiento termoacústico continuo",
  "Instalación eléctrica bajo norma NOM",
];

const DEFAULT_DUO_SPECS_EN = [
  "14-Gauge monolithic structural chassis",
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
  cmd4ib: { es: "CMD-4IB (Dormitorio 4m · 4-8 pers)", en: "CMD-4IB (Sleeper 4m · 4-8 pers)" },
  cmdbc6m: { es: "CMDBC6M (Dormitorio 6m · 2-4 pers)", en: "CMDBC6M (Sleeper 6m · 2-4 pers)" },
  cmd10br: { es: "CMD-10BR (Dormitorio / Baño 10m)", en: "CMD-10BR (Dorm / Restroom 10m)" },
  cmdc10m: { es: "CMDC-10M (Dormitorio Compartido 10m)", en: "CMDC-10M (Shared Dorm 10m)" },
  cmd12m: { es: "CMD-12M (Dormitorio Masivo 12m)", en: "CMD-12M (Mass Sleeper 12m)" },
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
  bodega8x32: { es: "BODEGA 8X32 (Almacén Móvil 8.5m)", en: "BODEGA 8X32 (Mobile Warehouse 8.5m)" },
  "minibodega-casa-seca": { es: "Minibodega Caja Seca (Resguardo)", en: "Dry Box Mini-Storage (Shelter)" },
  "minibodega-contenedor": { es: "Minibodega Contenedor (Seguridad)", en: "Container Mini-Storage (Security)" },

  // Consultorios Médicos
  "cm4-mm": { es: "CM-4MM (Consultorio Básico 4m)", en: "CM-4MM (Basic Clinic 4m)" },
  "cm6-mm": { es: "CM-6MM (Consultorio Clínico 6m)", en: "CM-6MM (Clinical Office 6m)" },
  "cm8-mm": { es: "CM-8MM (Consultorio Integral 8m)", en: "CM-8MM (Integral Clinic 8m)" },
  "cm10-mm": { es: "CM-10MM (Clínica Médica 10m)", en: "CM-10MM (Mobile Clinic 10m)" },
};

const CATEGORY_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    code: string;
    specs: { es: string; en: string };
  }
> = {
  oficinas: {
    icon: Building2,
    code: "SEC-01",
    specs: { es: "9 Modelos · Oficinas Ejecutivas y Mando", en: "9 Models · Executive & Command Offices" },
  },
  casetas: {
    icon: Shield,
    code: "SEC-02",
    specs: { es: "2 Modelos · Control Perimetral 360°", en: "2 Models · 360° Perimeter Control" },
  },
  dormitorios: {
    icon: BedDouble,
    code: "SEC-03",
    specs: { es: "7 Modelos · Campamentos de Obra", en: "7 Models · Field Work Camps" },
  },
  sanitarios: {
    icon: Bath,
    code: "SEC-04",
    specs: { es: "3 Modelos · Módulos y Regaderas", en: "3 Models · Restrooms & Showers" },
  },
  comedores: {
    icon: UtensilsCrossed,
    code: "SEC-05",
    specs: { es: "3 Modelos · Cocina & Comedor Masivo", en: "3 Models · Kitchen & Dining" },
  },
  contenedores: {
    icon: Boxes,
    code: "SEC-06",
    specs: { es: "3 Modelos · Bodegas y Resguardo", en: "3 Models · Storage & Shelters" },
  },
  consultorios: {
    icon: HeartPulse,
    code: "SEC-07",
    specs: { es: "4 Modelos · Clínicas Médicas NOM", en: "4 Models · Mobile Medical NOM" },
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
    return filtered.slice(0, 3).map((f) => {
      if (language === "en") {
        return DUO_FEATURE_MAP[f.toLowerCase().trim()] || f;
      }
      return f;
    });
  }
  return language === "en" ? DEFAULT_DUO_SPECS_EN : DEFAULT_DUO_SPECS_ES;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
  const currentMeta = CATEGORY_META[activeCategoryId];

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

  return (
    <section id="duo-comparator" className="py-20 sm:py-28 bg-white text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[150px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-capelton-green mb-2">
              {t("Comparador Dúo Especializado", "Specialized Duo Comparator")}
            </p>
            <SciFiHeading
              text={t("Compara modelos de la misma categoría.", "Compare models within the same category.")}
              as="h2"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-3"
              showLaser={false}
              showHudTag={false}
              duration={700}
            />
            <p className="text-sm sm:text-base text-[#6e6e73] font-normal">
              {t(
                "Selecciona una categoría para analizar dimensiones, aforo y equipamiento con precisión.",
                "Select a category to analyze dimensions, headcount, and standard equipment with precision."
              )}
            </p>
          </div>
        </FadeIn>

        {/* Dynamic Heavy-Duty Industrial Lock / Rotary Latch Category Selector */}
        <FadeIn direction="up" delay={80}>
          <div ref={dropdownRef} className="relative max-w-xl mx-auto mb-10 z-40">
            {/* Main Mechanical Lock Trigger Button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              className="w-full relative group rounded-2xl bg-gradient-to-b from-[#252529] via-[#1a1a1d] to-[#121214] p-3 sm:p-3.5 border-2 border-neutral-700/80 hover:border-capelton-green/70 shadow-[0_10px_35px_rgba(0,0,0,0.25)] transition-all duration-300 text-left flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-capelton-green/50"
            >
              {/* 4 Corner Industrial Mechanical Rivets */}
              <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-900 pointer-events-none" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-900 pointer-events-none" />
              <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-900 pointer-events-none" />
              <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-neutral-600 border border-neutral-900 pointer-events-none" />

              {/* Left: Heavy-Duty Rotary Cylinder / Tumbler Lock */}
              <div className="flex items-center gap-3.5 sm:gap-4 pl-1">
                <div
                  className={`relative w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-700 via-neutral-900 to-black border-2 transition-all duration-500 flex items-center justify-center shadow-inner ${
                    isDropdownOpen
                      ? "border-capelton-green shadow-[0_0_15px_rgba(0,177,64,0.4)] rotate-90"
                      : "border-neutral-600 group-hover:border-neutral-500"
                  }`}
                >
                  {/* Mechanical dial notch marks */}
                  <span className="absolute top-1 w-1.5 h-0.5 bg-neutral-400 rounded-full" />
                  <span className="absolute bottom-1 w-1.5 h-0.5 bg-neutral-400 rounded-full" />
                  <span className="absolute left-1 w-0.5 h-1.5 bg-neutral-400 rounded-full" />
                  <span className="absolute right-1 w-0.5 h-1.5 bg-neutral-400 rounded-full" />

                  {/* Animated Lock State */}
                  {isDropdownOpen ? (
                    <Unlock className="w-5 h-5 text-capelton-green transition-transform -rotate-90 animate-in zoom-in-75 duration-200" />
                  ) : (
                    <Lock className="w-5 h-5 text-capelton-green group-hover:scale-110 transition-transform" />
                  )}

                  {/* Status Diode LED */}
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-capelton-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-capelton-green border border-black shadow-[0_0_8px_#00b140]" />
                  </span>
                </div>

                {/* Center: Sector Details */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-mono tracking-[0.22em] text-[#a1a1aa] uppercase font-semibold">
                      {t("CERRADURA DE SECTOR", "SECTOR CAM-LOCK")} • {currentMeta?.code || "SEC-01"}
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-bold bg-capelton-green/15 text-capelton-green border border-capelton-green/30">
                      <span className="w-1 h-1 rounded-full bg-capelton-green animate-pulse" />
                      {isDropdownOpen ? t("ABIERTO", "UNLOCKED") : t("BLOQUEADO", "LOCKED")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {language === "en" ? currentCategory?.nameEn || currentCategory?.name : currentCategory?.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                      {currentCategory?.modelsCount || 9} {language === "en" ? "MODELS" : "MODELOS"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Rotary Mechanical Latch Toggle */}
              <div className="pr-1.5 flex items-center">
                <div
                  className={`w-9 h-9 rounded-xl bg-black/60 border flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isDropdownOpen
                      ? "border-capelton-green text-capelton-green bg-capelton-green/10"
                      : "border-neutral-700 text-neutral-400 group-hover:text-white group-hover:border-neutral-500"
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </button>

            {/* Heavy-Duty Industrial Vault Selection Panel (Dropdown Popover) */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ backgroundColor: "#141416" }}
                  className="absolute top-full mt-2.5 left-0 right-0 border-2 border-neutral-700 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.7)] p-3 z-50 overflow-hidden ring-1 ring-white/10"
                >
                  {/* Header bar of the panel */}
                  <div className="flex items-center justify-between px-3 py-2.5 mb-2 rounded-xl bg-black/60 border border-neutral-800 text-[11px] font-mono text-neutral-300 uppercase tracking-wider">
                    <span className="flex items-center gap-2 font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-capelton-green shadow-[0_0_8px_#00b140]" />
                      {t("LÍNEAS MODULARES EN OBRA", "ACTIVE ON-SITE MODULAR LINES")}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-capelton-green font-bold border border-neutral-700 text-[10px]">
                      {availableCategories.length} {t("SECTORES", "SECTORS")}
                    </span>
                  </div>

                  {/* Category Options List */}
                  <div className="flex flex-col gap-1.5 max-h-[390px] overflow-y-auto pr-1">
                    {availableCategories.map((cat) => {
                      const isActive = activeCategoryId === cat.id;
                      const meta = CATEGORY_META[cat.id];
                      const IconComp = meta?.icon || Building2;
                      const catName = language === "en" ? cat.nameEn || cat.name : cat.name;
                      const catSpecs = meta ? (language === "en" ? meta.specs.en : meta.specs.es) : "";

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            handleCategoryChange(cat.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 cursor-pointer border group ${
                            isActive
                              ? "bg-[#002a10] border-2 border-capelton-green text-white shadow-[0_0_20px_rgba(0,177,64,0.18)]"
                              : "bg-[#1c1c20] hover:bg-[#26262c] border border-neutral-800 hover:border-neutral-600 text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                                isActive
                                  ? "bg-capelton-green text-black border-capelton-green shadow-[0_0_12px_rgba(0,177,64,0.5)] font-bold"
                                  : "bg-black/70 text-neutral-300 border-neutral-700 group-hover:text-capelton-green group-hover:border-capelton-green/60"
                              }`}
                            >
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm sm:text-base font-bold transition-colors ${
                                  isActive ? "text-white font-extrabold" : "text-white group-hover:text-capelton-green"
                                }`}>
                                  {catName}
                                </span>
                                {meta && (
                                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                                    isActive
                                      ? "text-capelton-green bg-capelton-green/20 border-capelton-green/40 font-bold"
                                      : "text-neutral-400 bg-black/40 border-neutral-700"
                                  }`}>
                                    {meta.code}
                                  </span>
                                )}
                              </div>
                              <span className={`text-xs block mt-0.5 leading-snug ${
                                isActive ? "text-emerald-100 font-medium" : "text-neutral-300 group-hover:text-neutral-100"
                              }`}>
                                {catSpecs || cat.tagline}
                              </span>
                            </div>
                          </div>

                          {/* Lock Pin Indicator */}
                          <div className="flex items-center gap-2.5 pl-3">
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                                isActive
                                  ? "bg-capelton-green text-black border-capelton-green shadow-xs"
                                  : "bg-black/50 text-neutral-300 border-neutral-700"
                              }`}
                            >
                              {cat.modelsCount} mod
                            </span>
                            {isActive ? (
                              <Lock className="w-4 h-4 text-capelton-green fill-capelton-green" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-neutral-600 group-hover:border-capelton-green transition-colors" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* Apple-style Comparison Matrix Card */}
        <FadeIn direction="up" delay={140}>
          <div className="bg-[#fbfbfd] border border-black/8 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 lg:p-10 max-w-4xl mx-auto shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
            {/* Top Products Comparison Row */}
            <div className="grid grid-cols-2 gap-4 sm:gap-10 pb-8 border-b border-black/8">
              {/* Model A Header Card */}
              <div className="flex flex-col items-center text-center">
                {/* Selector Dropdown */}
                <div className="mb-4 w-full max-w-xs">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#86868b] block mb-1.5">
                    {t("Modelo A", "Model A")}
                  </label>
                  <select
                    value={modelA.slug}
                    onChange={(e) => setModelAId(e.target.value)}
                    className="w-full bg-white border border-black/12 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black focus:outline-none focus:border-capelton-green transition-all shadow-sm cursor-pointer"
                  >
                    {categoryModels.map((m) => (
                      <option key={m.slug} value={m.slug} className="text-black">
                        {getModelOptionLabel(m, language)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Floating Product Render */}
                <div className="relative w-full h-32 sm:h-44 mb-3 flex items-center justify-center">
                  {modelA.images[0] ? (
                    <Image
                      src={modelA.images[0]}
                      alt={modelA.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 360px"
                      className="object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.06)]"
                    />
                  ) : (
                    <div className="text-xs text-[#86868b]">{t("Render disponible", "Render available")}</div>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-0.5">
                  {modelA.modelCode}
                </h3>
                <span className="text-[11px] font-semibold text-capelton-green mb-4 block">
                  {language === "en" ? currentCategory?.nameEn || currentCategory?.name : currentCategory?.name}
                </span>

                {/* Primary Action Button */}
                <a
                  href={`https://wa.me/525529640104?text=${encodeURIComponent(
                    language === "en"
                      ? `Hello, I want to quote model ${modelA.modelCode}`
                      : `Hola, me interesa cotizar el modelo ${modelA.modelCode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", `duo_quote_${modelA.modelCode}`)}
                  className="w-full max-w-xs py-2.5 px-3 rounded-full bg-black hover:bg-capelton-green text-white font-semibold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{t(`Cotizar ${modelA.modelCode}`, `Quote ${modelA.modelCode}`)}</span>
                </a>
              </div>

              {/* Model B Header Card */}
              <div className="flex flex-col items-center text-center">
                {/* Selector Dropdown */}
                <div className="mb-4 w-full max-w-xs">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#86868b] block mb-1.5">
                    {t("Modelo B", "Model B")}
                  </label>
                  <select
                    value={modelB.slug}
                    onChange={(e) => setModelBId(e.target.value)}
                    className="w-full bg-white border border-black/12 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black focus:outline-none focus:border-capelton-green transition-all shadow-sm cursor-pointer"
                  >
                    {categoryModels.map((m) => (
                      <option key={m.slug} value={m.slug} className="text-black">
                        {getModelOptionLabel(m, language)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Floating Product Render */}
                <div className="relative w-full h-32 sm:h-44 mb-3 flex items-center justify-center">
                  {modelB.images[0] ? (
                    <Image
                      src={modelB.images[0]}
                      alt={modelB.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 360px"
                      className="object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.06)]"
                    />
                  ) : (
                    <div className="text-xs text-[#86868b]">{t("Render disponible", "Render available")}</div>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black mb-0.5">
                  {modelB.modelCode}
                </h3>
                <span className="text-[11px] font-semibold text-capelton-green mb-4 block">
                  {language === "en" ? currentCategory?.nameEn || currentCategory?.name : currentCategory?.name}
                </span>

                {/* Primary Action Button */}
                <a
                  href={`https://wa.me/525529640104?text=${encodeURIComponent(
                    language === "en"
                      ? `Hello, I want to quote model ${modelB.modelCode}`
                      : `Hola, me interesa cotizar el modelo ${modelB.modelCode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", `duo_quote_${modelB.modelCode}`)}
                  className="w-full max-w-xs py-2.5 px-3 rounded-full bg-black hover:bg-capelton-green text-white font-semibold text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{t(`Cotizar ${modelB.modelCode}`, `Quote ${modelB.modelCode}`)}</span>
                </a>
              </div>
            </div>

            {/* Structured Side-by-Side Comparison Matrix - Compact & Space-Efficient */}
            <div className="mt-6 bg-white rounded-2xl sm:rounded-3xl border border-black/8 overflow-hidden shadow-sm divide-y divide-black/5 text-xs sm:text-sm">
              {/* Row 1: Dimensiones */}
              <div className="py-3 px-4 sm:px-6">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("Dimensiones (Largo × Ancho × Alto)", "Dimensions (Length × Width × Height)")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                  <span className="text-sm sm:text-base font-bold text-black">{modelA.dimensions}</span>
                  <span className="text-sm sm:text-base font-bold text-black">{modelB.dimensions}</span>
                </div>
              </div>

              {/* Row 2: Aforo y Capacidad */}
              <div className="py-3 px-4 sm:px-6 bg-[#fbfbfd]">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("Aforo y capacidad sugerida", "Suggested Headcount & Capacity")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                  <span className="text-sm sm:text-base font-bold text-capelton-green">{modelA.peopleCapacity}</span>
                  <span className="text-sm sm:text-base font-bold text-capelton-green">{modelB.peopleCapacity}</span>
                </div>
              </div>

              {/* Row 3: Peso y Carga Máxima (Consolidado) */}
              <div className="py-3 px-4 sm:px-6">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-1">
                  {t("Estructura y capacidad de carga", "Structural Weight & Load Capacity")}
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

              {/* Row 4: Equipamiento de Serie */}
              <div className="py-3 px-4 sm:px-6 bg-[#fbfbfd]">
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#86868b] block text-center mb-2">
                  {t("Equipamiento de serie", "Standard Equipment")}
                </span>
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  {/* Features Model A */}
                  <ul className="space-y-1.5 max-w-xs mx-auto text-left">
                    {cleanDuoFeatures(modelA.features, language).map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[#434344]">
                        <Check className="w-3.5 h-3.5 text-capelton-green shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Features Model B */}
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

              {/* Row 5: Ficha Técnica PDF */}
              <div className="py-2.5 px-4 sm:px-6">
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
