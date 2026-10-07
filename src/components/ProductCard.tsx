"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, FileText, ArrowUpRight, Users, Scale, Box } from "lucide-react";
import { ProductModel } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: ProductModel;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const mainImage = product.images[0] || "/placeholder-model.png";

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

        {/* Product Image */}
        <Link
          href={`/modelos/${product.slug}`}
          className="block relative w-full h-48 sm:h-56 mb-6 overflow-hidden rounded-2xl bg-[#fbfbfd] border border-black/[0.03]"
        >
          <Image
            src={mainImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2 transform group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
          />
        </Link>

        {/* Title and Tagline */}
        <div className="mb-4">
          <Link href={`/modelos/${product.slug}`} className="group-hover:text-capelton-green transition-colors">
            <h3 className="text-xl sm:text-2xl font-black text-black">{product.modelCode}</h3>
          </Link>
          <p className="text-xs text-[#6e6e73] line-clamp-2 mt-1">{product.tagline}</p>
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
