"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, MessageCircle, SlidersHorizontal } from "lucide-react";
import { ProductModel, Category } from "@/lib/types";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";

interface ModelsCatalogProps {
  products: ProductModel[];
  categories: Category[];
}

export default function ModelsCatalog({ products, categories }: ModelsCatalogProps) {
  const { t, language } = useLanguage();
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Curated flagship selection representing core categories
  const flagshipSlugs = ["cm10m", "cmvc3m2", "cmd10br", "cms10m", "cmm12co", "bodega8x32"];
  const flagshipModels = flagshipSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as ProductModel[];

  const filteredFullList = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesQuery =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.modelCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dimensions.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="modelos" className="py-24 sm:py-32 bg-white text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curated Section Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg font-semibold text-[#1d1d1f] mb-3">
                {t("Línea insignia", "Flagship Line")}
              </p>
              <SciFiHeading
                text={t(
                  "Espacios esenciales. Fabricados con precisión.",
                  "Essential spaces. Engineered with precision."
                )}
                as="h2"
                align="left"
                className="text-4xl sm:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08]"
                showLaser={false}
                showHudTag={false}
                duration={750}
              />
            </div>
            <p className="text-sm text-[#6e6e73] max-w-sm font-light">
              {t(
                "Selección curada de los módulos más solicitados por la industria y la construcción en México.",
                "Curated selection of the most requested modular units across industry and construction in Mexico."
              )}
            </p>
          </div>
        </FadeIn>

        {/* Apple-style Curated Card Grid (Generous Whitespace, 32px Radius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {flagshipModels.map((model, idx) => (
            <FadeIn key={model.id} delay={idx * 70} direction="up">
              <div
                className="group bg-[#f5f5f7] rounded-[32px] p-8 flex flex-col justify-between hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-transparent hover:border-black/5 h-full"
              >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] block mb-1">
                  {t(model.categoryName)}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-black mb-2">
                  {model.modelCode}
                </h3>
                <p className="text-xs text-[#6e6e73] line-clamp-2 mb-6 font-light">
                  {model.tagline}
                </p>

                {/* Large Product Render with Natural Shadow */}
                <Link
                  href={`/modelos/${model.slug}`}
                  className="block relative w-full h-52 mb-8 overflow-hidden"
                >
                  <Image
                    src={model.images[0] || "/placeholder.png"}
                    alt={model.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-contain transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.06)]"
                  />
                </Link>

                {/* Clean Specs Row (No border lines) */}
                <div className="flex items-center justify-between text-xs text-[#6e6e73] pt-2 mb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868b] block">
                      {t("Medidas", "Dimensions")}
                    </span>
                    <span className="font-semibold text-black">{model.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#86868b] block">
                      {t("Peso", "Weight")}
                    </span>
                    <span className="font-semibold text-black">{model.weight}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#86868b] block">
                      {t("Aforo", "Capacity")}
                    </span>
                    <span className="font-semibold text-capelton-green">{model.peopleCapacity}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/modelos/${model.slug}`}
                  className="flex-1 py-3 rounded-full text-xs font-semibold text-center text-black bg-white hover:bg-black hover:text-white transition-all shadow-sm"
                >
                  {t("Conocer más", "Learn more")}
                </Link>
                <a
                  href={`https://wa.me/525529640104?text=${encodeURIComponent(
                    `${t("Hola, me interesa el modelo", "Hello, I am interested in model")} ${model.modelCode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-capelton-green hover:bg-capelton-darkgreen text-white transition-colors shadow-sm"
                  title={t("Cotizar por WhatsApp", "Quote via WhatsApp")}
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                </a>
              </div>
            </div>
          </FadeIn>
          ))}
        </div>

        {/* Collapsible Full Catalog Controller (Prevents Overload) */}
        <FadeIn direction="up" delay={80}>
          <div className="text-center pt-4">
            {!showFullCatalog ? (
              <button
                onClick={() => setShowFullCatalog(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-black bg-[#f5f5f7] hover:bg-black hover:text-white transition-all duration-300"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>
                  {t(
                    `Explorar el catálogo completo (${products.length} modelos)`,
                    `Explore full catalog (${products.length} models)`
                  )}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="pt-8 border-t border-black/5 animate-fade-in text-left">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-black">
                      {t("Catálogo Completo", "Complete Catalog")}
                    </h3>
                    <p className="text-xs text-[#6e6e73]">
                      {filteredFullList.length}{" "}
                      {t("configuraciones encontradas", "configurations found")}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowFullCatalog(false)}
                    className="text-xs font-semibold text-[#6e6e73] hover:text-black underline"
                  >
                    {t("Ocultar catálogo completo", "Hide complete catalog")}
                  </button>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === "all"
                        ? "bg-black text-white"
                        : "bg-[#f5f5f7] text-[#6e6e73] hover:text-black"
                    }`}
                  >
                    {t("Todos", "All")} ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? "bg-capelton-green text-white font-bold"
                          : "bg-[#f5f5f7] text-[#6e6e73] hover:text-black"
                      }`}
                    >
                      {t(cat.name)} ({cat.modelsCount})
                    </button>
                  ))}
                </div>

                {/* Grid of All Models */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFullList.map((m) => (
                    <Link
                      key={m.id}
                      href={`/modelos/${m.slug}`}
                      className="p-6 rounded-2xl bg-[#f5f5f7] hover:bg-white hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#86868b] block mb-1">
                          {t(m.categoryName)}
                        </span>
                        <h4 className="text-base font-semibold text-black group-hover:text-capelton-green transition-colors">
                          {m.modelCode}
                        </h4>
                        <p className="text-xs text-[#6e6e73] mt-1">{m.dimensions}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#86868b] group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
