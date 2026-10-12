"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Category, ProductModel } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryDetailContentProps {
  category: Category;
  categoryProducts: ProductModel[];
}

export default function CategoryDetailContent({
  category,
  categoryProducts,
}: CategoryDetailContentProps) {
  const { t, language } = useLanguage();

  const categoryName = t(category.name);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            {t("Inicio", "Home")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/#categorias" className="hover:text-black transition-colors">
            {t("Categorías", "Categories")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-semibold">{categoryName}</span>
        </nav>

        {/* Category Header with Authentic Render */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 pb-12 border-b border-black/8">
          <div className="max-w-2xl">
            <SciFiHeading
              text={categoryName}
              className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-black tracking-tight mb-4 leading-[1.02]"
              align="left"
              showLaser={true}
              showHudTag={true}
              hudTag={`${t("SISTEMA MODULAR", "MODULAR SYSTEM")} // CAT-${category.id.toUpperCase()}`}
            />
            <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
              {(language === "en" && category.taglineEn) ? category.taglineEn : category.tagline}{" "}
              {categoryProducts.length > 0
                ? language === "en"
                  ? `We feature ${categoryProducts.length} field-proven engineering configurations ready for immediate deployment.`
                  : `Contamos con ${categoryProducts.length} configuraciones de ingeniería probada en campo para entrega inmediata.`
                : language === "en"
                ? "Turnkey modular solution for high-demand industrial projects."
                : "Solución modular integral para proyectos de alta demanda."}
            </p>
          </div>
          {(category.corteImage || category.image) && (
            <div className="relative w-full lg:w-96 h-48 sm:h-64 lg:h-72 shrink-0 flex items-center justify-center">
              <Image
                src={category.corteImage || category.image || ""}
                alt={categoryName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.08)]"
              />
            </div>
          )}
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#fbfbfd] border border-black/8 p-12 text-center rounded-3xl">
            <p className="text-[#6e6e73] text-sm">
              {t(
                "Estamos integrando nuevos modelos en esta categoría.",
                "We are currently integrating new models into this category."
              )}
            </p>
            <Link
              href="/#modelos"
              className="inline-block mt-4 text-xs font-bold text-capelton-green hover:underline"
            >
              {t("Explorar todos los modelos disponibles", "Explore all available models")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
