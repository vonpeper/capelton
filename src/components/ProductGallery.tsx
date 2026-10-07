"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  FileText,
  Sparkles,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProductGalleryProps {
  images: string[];
  modelCode: string;
  title: string;
  blueprintUrl?: string | null;
}

interface GalleryItem {
  url: string;
  label: string;
  labelEn: string;
  type: "render" | "blueprint";
}

const ICON_KEYWORDS = [
  "aire", "clima", "muro", "piso", "ventana", "luminaria", "luces",
  "estructura", "antiderrapante", "mesa", "torres", "suspension",
  "gato", "eslogan", "garantia", "garanti", "logo", "bano", "baño",
  "calentador", "cocina", "comedor", "cortina", "extractor", "lavamanos",
  "mingitorio", "regadera", "sanitario", "tarja", "_blk", ".blk"
];

function getLabelAndType(url: string, index: number): { label: string; labelEn: string; type: "render" | "blueprint" } | null {
  const name = url.split("/").pop()?.toLowerCase() || "";
  const base = name.split(".")[0];

  // Exclude numbers and any icon asset
  if (base.match(/^\d+$/) || ICON_KEYWORDS.some((k) => name.includes(k))) {
    return null;
  }

  if (name.includes("vista_01") || name.includes("vista1")) {
    return { label: "Vista Frontal 3D", labelEn: "3D Front View", type: "render" };
  }
  if (name.includes("vista_02") || name.includes("vista2")) {
    return { label: "Vista Lateral 3D", labelEn: "3D Side View", type: "render" };
  }
  if (name.includes("vista_03") || name.includes("vista3")) {
    return { label: "Vista Posterior 3D", labelEn: "3D Rear View", type: "render" };
  }
  if (name.includes("planta") || name.includes("plano") || name.includes("blueprint") || name.includes("_6b")) {
    return { label: "Plano Arquitectónico", labelEn: "Architectural Blueprint", type: "blueprint" };
  }
  if (name.includes("vista")) {
    return { label: `Perspectiva 3D #${index + 1}`, labelEn: `3D Perspective #${index + 1}`, type: "render" };
  }

  // Model-named renders like cm_10m...
  if (name.startsWith("cm_") || name.startsWith("cm") || name.startsWith("minibodega") || name.startsWith("hotel") || name.startsWith("bodega")) {
    return { label: "Vista Isométrica 3D", labelEn: "3D Isometric View", type: "render" };
  }

  return null;
}

export default function ProductGallery({
  images,
  modelCode,
  title,
  blueprintUrl,
}: ProductGalleryProps) {
  const { t, language } = useLanguage();

  // Build cleaned gallery list
  const galleryItems = useMemo(() => {
    const list: GalleryItem[] = [];
    const seen = new Set<string>();

    images.forEach((url, i) => {
      if (!url || seen.has(url)) return;
      const info = getLabelAndType(url, i);
      if (info) {
        seen.add(url);
        list.push({ url, label: info.label, labelEn: info.labelEn, type: info.type });
      }
    });

    // If blueprintUrl is provided and not already included, add it
    if (blueprintUrl && !seen.has(blueprintUrl)) {
      list.push({
        url: blueprintUrl,
        label: "Plano Arquitectónico Oficial",
        labelEn: "Official Architectural Blueprint",
        type: "blueprint",
      });
    }

    // Fallback if empty
    if (list.length === 0 && images.length > 0) {
      list.push({
        url: images[0],
        label: "Vista Principal",
        labelEn: "Primary View",
        type: "render",
      });
    }

    return list;
  }, [images, blueprintUrl]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "render" | "blueprint">("all");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Current item
  const currentItem = galleryItems[activeIndex] || galleryItems[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  }, [galleryItems.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  }, [galleryItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: galleryItems.length,
      render: galleryItems.filter((i) => i.type === "render").length,
      blueprint: galleryItems.filter((i) => i.type === "blueprint").length,
    };
  }, [galleryItems]);

  if (galleryItems.length === 0) {
    return (
      <div className="bg-[#fbfbfd] rounded-3xl p-8 flex items-center justify-center min-h-[420px] border border-black/8 text-[#6e6e73]">
        {t("Sin imágenes disponibles", "No images available")}
      </div>
    );
  }

  const currentLabel = language === "en" ? currentItem.labelEn : currentItem.label;

  return (
    <div className="space-y-4 select-none">
      {/* Visual Filter Category Tabs (Displayed only when both renders and blueprints exist) */}
      {counts.blueprint > 0 && counts.render > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 ${
              activeFilter === "all"
                ? "bg-black text-white shadow-sm"
                : "bg-black/[0.04] text-[#6e6e73] hover:text-black hover:bg-black/[0.08]"
            }`}
          >
            {t("Todas las vistas", "All Views")} ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("render")}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 ${
              activeFilter === "render"
                ? "bg-black text-white shadow-sm"
                : "bg-black/[0.04] text-[#6e6e73] hover:text-black hover:bg-black/[0.08]"
            }`}
          >
            <span>{t("Renders 3D", "3D Renders")} ({counts.render})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("blueprint")}
            className={`px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 ${
              activeFilter === "blueprint"
                ? "bg-black text-white shadow-sm"
                : "bg-black/[0.04] text-[#6e6e73] hover:text-black hover:bg-black/[0.08]"
            }`}
          >
            <span>{t("Planos", "Blueprints")} ({counts.blueprint})</span>
          </button>
        </div>
      )}

      {/* Main High-Resolution Visual Stage */}
      <div className="relative bg-[#fbfbfd] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px] border border-black/8 shadow-sm overflow-hidden group">
        {/* Soft Ambient Radial Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-capelton-green/10 rounded-full blur-[110px] pointer-events-none" />

        {/* Current View Pill / Tag */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md border border-black/10 text-black shadow-xs">
            {currentLabel}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/[0.04] text-[#6e6e73]">
            {activeIndex + 1} {t("de", "of")} {galleryItems.length}
          </span>
        </div>

        {/* Fullscreen Expand Action Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label={t("Ver imagen en pantalla completa", "View full screen")}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#6e6e73] hover:text-black hover:bg-white shadow-xs transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Previous Image Chevron Button */}
        {galleryItems.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label={t("Imagen anterior", "Previous image")}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-black shadow-md flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Image Chevron Button */}
        {galleryItems.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label={t("Siguiente imagen", "Next image")}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-black shadow-md flex items-center justify-center hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Primary Interactive Display Image */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full h-72 sm:h-96 cursor-zoom-in flex items-center justify-center"
        >
          <Image
            key={currentItem.url}
            src={currentItem.url}
            alt={`${modelCode} - ${currentLabel}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 750px"
            className={`object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 animate-in fade-in zoom-in-95 ${
              currentItem.type === "blueprint" ? "p-2 sm:p-4 bg-white/70 rounded-2xl border border-black/5" : ""
            }`}
          />
        </div>

        {/* Sub-bar hint */}
        <p className="text-[11px] text-[#86868b] mt-4 font-normal flex items-center gap-1.5">
          <span>{t("Haz clic en cualquier muestra inferior para cambiar de perspectiva", "Click any thumbnail below to change perspective")}</span>
        </p>
      </div>

      {/* Interactive Thumbnail Carousel Strip */}
      {galleryItems.length > 1 && (
        <div className="pt-2">
          <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 px-1 no-scrollbar">
            {galleryItems.map((item, idx) => {
              const isActive = activeIndex === idx;
              const isFilteredOut = activeFilter !== "all" && item.type !== activeFilter;
              const itemLabel = language === "en" ? item.labelEn : item.label;

              if (isFilteredOut) return null;

              return (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shrink-0 transition-all duration-200 cursor-pointer bg-white p-2.5 outline-none focus:outline-none focus:ring-0 ${
                    isActive
                      ? "border-2 border-capelton-green shadow-[0_4px_16px_rgba(0,177,64,0.2)] scale-105 z-10 opacity-100"
                      : "border-2 border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100 hover:scale-102"
                  }`}
                  aria-label={`${t("Ver", "View")} ${itemLabel}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.url}
                      alt={itemLabel}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="w-full max-w-7xl flex items-center justify-between text-white py-2 z-20">
            <div>
              <span className="text-xs uppercase font-bold text-capelton-green tracking-wider block">
                {modelCode}
              </span>
              <h4 className="text-base font-semibold">{currentLabel}</h4>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-white/60">
                {activeIndex + 1} {t("de", "of")} {galleryItems.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label={t("Cerrar modal", "Close modal")}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central High-Res Image Viewport */}
          <div className="relative w-full max-w-6xl h-[65vh] sm:h-[75vh] flex items-center justify-center my-auto">
            <Image
              src={currentItem.url}
              alt={`${modelCode} ${currentLabel}`}
              fill
              sizes="100vw"
              className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
            />

            {/* Left & Right Lightbox Arrows */}
            {galleryItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/15 transition-all"
                  aria-label={t("Anterior", "Previous")}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/15 transition-all"
                  aria-label={t("Siguiente", "Next")}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip in Lightbox */}
          <div className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2 no-scrollbar z-20">
            {galleryItems.map((item, idx) => {
              const itemLabel = language === "en" ? item.labelEn : item.label;
              return (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 transition-all bg-white/10 outline-none focus:outline-none border-2 ${
                    activeIndex === idx
                      ? "border-capelton-green scale-105 opacity-100"
                      : "border-white/20 opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image src={item.url} alt={itemLabel} fill sizes="56px" className="object-contain p-1" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
