"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  FileText,
  ArrowUpRight,
  Users,
  Scale,
  Box,
  Building2,
  Shield,
  Bed,
  Bath,
  Utensils,
  HeartPulse,
  Boxes,
} from "lucide-react";
import { ProductModel } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ProductCardProps {
  product: ProductModel;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  oficinas: Building2,
  casetas: Shield,
  dormitorios: Bed,
  sanitarios: Bath,
  comedores: Utensils,
  consultorios: HeartPulse,
  contenedores: Boxes,
  almacenes: Boxes,
};

export default function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useLanguage();
  const mainImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const blueprintImage = product.blueprintUrl || null;
  const CatIcon = CATEGORY_ICONS[product.category] || Box;

  return (
    <div className="group bg-white rounded-3xl p-6 flex flex-col justify-between border border-black/8 hover:border-capelton-green/40 transition-all duration-500 shadow-sm hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-capelton-green px-2.5 py-1 rounded-full bg-capelton-green/10 border border-capelton-green/20">
            {t(product.categoryName)}
          </span>
          {product.isFlagship && (
            <span className="text-[10px] font-semibold text-[#515154] px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/8">
              {t("Insignia", "Flagship")}
            </span>
          )}
        </div>

        {/* Product Image / Blueprint / Technical Spec Card */}
        <Link
          href={`/modelos/${product.slug}`}
          className="block relative w-full h-48 sm:h-56 mb-6 overflow-hidden rounded-2xl bg-[#fbfbfd] border border-black/[0.03]"
        >
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2 transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
            />
          ) : blueprintImage ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <Image
                src={blueprintImage}
                alt={`Plano ${product.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-3 filter contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 right-2 text-[9px] font-semibold text-[#515154] bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-black/8 shadow-2xs">
                {t("Plano Oficial", "CAD Blueprint")}
              </span>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#f8f8fa] to-[#f0f0f4] border border-black/5 p-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-black/8 mb-2.5 text-capelton-green group-hover:scale-110 transition-transform duration-300">
                <CatIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-black text-black tracking-tight mb-0.5">{product.modelCode}</span>
              <span className="text-[11px] font-medium text-[#6e6e73] mb-2">{product.dimensions}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 border border-capelton-green/20 px-2.5 py-0.5 rounded-full">
                {t("Ficha Técnica Disponible", "Spec Sheet Available")}
              </span>
            </div>
          )}
        </Link>

        {/* Title and Tagline */}
        <div className="mb-4">
          <Link href={`/modelos/${product.slug}`} className="group-hover:text-capelton-green transition-colors">
            <h3 className="text-xl sm:text-2xl font-black text-black">{product.modelCode}</h3>
          </Link>
          <p className="text-xs text-[#6e6e73] line-clamp-2 mt-1">
            {language === "en" ? (product.taglineEn || product.tagline) : product.tagline}
          </p>
        </div>

        {/* Key Specs Pills */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y border-black/8 mb-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-[#515154]">
            <Box className="w-3.5 h-3.5 text-capelton-green shrink-0" />
            <span className="truncate">{product.dimensions}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#515154]">
            <Scale className="w-3.5 h-3.5 text-capelton-green shrink-0" />
            <span className="truncate">{product.weight}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#515154] col-span-2">
            <Users className="w-3.5 h-3.5 text-capelton-green shrink-0" />
            <span className="truncate font-medium">
              {t("Capacidad", "Capacity")}: {product.peopleCapacity}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex items-center gap-2 pt-2">
        <Link
          href={`/modelos/${product.slug}`}
          className="flex-1 py-2.5 px-3 rounded-full text-xs font-semibold text-center text-black bg-black/[0.04] hover:bg-black/[0.08] transition-all flex items-center justify-center gap-1 border border-black/8"
        >
          <span>{t("Ficha Técnica", "Spec Sheet")}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={`https://wa.me/525529640104?text=${encodeURIComponent(
            `${t("Hola, solicito cotización del modelo", "Hello, I request a quote for model")} ${product.modelCode}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("ventas", `product_card_${product.modelCode}`)}
          className="py-2.5 px-3 rounded-full text-xs font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all flex items-center justify-center gap-1 shadow-[0_2px_10px_rgba(0,177,64,0.25)]"
          title={t("Cotizar por WhatsApp", "Quote via WhatsApp")}
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span className="hidden sm:inline">{t("Cotizar", "Quote")}</span>
        </a>
      </div>
    </div>
  );
}
