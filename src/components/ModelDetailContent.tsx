"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Box,
  Scale,
  Users,
  Weight,
  CheckCircle2,
  FileText,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { ProductModel } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ModelDetailContentProps {
  product: ProductModel;
  related: ProductModel[];
}

const DEFAULT_FEATURES_ES = [
  "Chasis monolítico en acero estructural rolado Calibre 14 de alta rigidez.",
  "Aislamiento termoacústico continuo de poliuretano inyectado de alta densidad.",
  "Instalación eléctrica certificada bajo Norma NOM con centro de carga bifásico.",
  "Iluminación perimetral LED empotrada de alta eficiencia energética.",
  "Muros tipo sándwich de lámina pintro electrogalvanizada con acabado arquitectónico.",
  "Ventanas de aluminio anodizado reforzado con película de seguridad.",
  "Preparación estructural y eléctrica integrada para equipo de aire acondicionado.",
  "Piso de vinil de tráfico pesado grado industrial sobre bastidor reforzado.",
];

const DEFAULT_FEATURES_EN = [
  "Monolithic structural chassis in 14-gauge cold-rolled electrogalvanized steel.",
  "Continuous high-density injected polyurethane thermo-acoustic insulation.",
  "Certified electrical installation complying with NOM standards and load center.",
  "High-efficiency energy-saving recessed perimeter LED lighting.",
  "Pre-painted electrogalvanized steel sandwich panel walls with architectural finish.",
  "Heavy-duty anodized aluminum windows equipped with security safety film.",
  "Integrated structural and electrical preparation for HVAC / air conditioning.",
  "Industrial-grade heavy-duty vinyl flooring mounted on reinforced frame.",
];

const RAW_KEYWORD_FILTERS = [
  "_blk", ".blk", "vista_", "vista", "planta", "ficha técnica", "ficha tecnica",
  "cm_", "cm-", "plano", "blueprint"
];

function isRawFeature(f: string): boolean {
  const lower = f.toLowerCase().trim();
  return RAW_KEYWORD_FILTERS.some((k) => lower.includes(k)) || lower.length < 5;
}

const FEATURE_TRANSLATIONS: Record<string, string> = {
  "sistema de aire acondicionado": "Air conditioning system",
  "luminarias led": "LED lighting fixtures",
  "muros de lámina pintro": "Pre-painted steel sheet walls",
  "ventanas de aluminio": "Anodized aluminum windows",
  "sanitario completo": "Full private restroom",
  "lavamanos y regadera": "Sink and shower module",
  "mesa y bancas integradas": "Integrated industrial table and benches",
  "cocina con tarja": "Kitchenette with stainless steel sink",
  "instalación eléctrica nom": "NOM-certified electrical installation",
  "piso de vinil uso rudo": "Heavy-duty vinyl flooring",
  "puerta de seguridad": "High-security exterior door",
  "extractor de aire": "Industrial air exhaust fan",
  "barra de servicio": "Stainless steel serving counter",
};

export default function ModelDetailContent({
  product,
  related,
}: ModelDetailContentProps) {
  const { t, language } = useLanguage();

  const categoryName = t(product.categoryName);

  const displayFeatures = useMemo(() => {
    const rawClean = (product.features || []).filter((f) => !isRawFeature(f));
    if (rawClean.length >= 4) {
      return rawClean.map((feat) => {
        if (language === "en") {
          const lower = feat.toLowerCase().trim();
          return FEATURE_TRANSLATIONS[lower] || t(feat);
        }
        return feat;
      });
    }
    return language === "en" ? DEFAULT_FEATURES_EN : DEFAULT_FEATURES_ES;
  }, [product.features, language, t]);

  const formattedCapacity = useMemo(() => {
    if (language === "en") {
      return product.peopleCapacity
        .replace(/personas/gi, "people")
        .replace(/persona/gi, "person");
    }
    return product.peopleCapacity;
  }, [product.peopleCapacity, language]);

  const formattedLoad = useMemo(() => {
    if (language === "en" && product.loadCapacity.toLowerCase() === "suspensión") {
      return "Certified Suspension";
    }
    return product.loadCapacity;
  }, [product.loadCapacity, language]);

  const whatsappSaleMessage = encodeURIComponent(
    language === "en"
      ? `Hello, I want to quote the PURCHASE of model ${product.modelCode}`
      : `Hola, quiero cotizar la VENTA del modelo ${product.modelCode}`
  );

  const whatsappRentMessage = encodeURIComponent(
    language === "en"
      ? `Hello, I want to quote the RENTAL of model ${product.modelCode}`
      : `Hola, quiero cotizar la RENTA del modelo ${product.modelCode}`
  );

  const whatsappImmediateMessage = encodeURIComponent(
    language === "en"
      ? `Hello, I request an immediate quote for model ${product.modelCode}`
      : `Hola, solicito cotización inmediata del modelo ${product.modelCode}`
  );

  return (
    <article className="min-h-screen bg-white text-[#1d1d1f] pt-24 pb-20">
      {/* Sticky Secondary Product Bar */}
      <div className="sticky top-[61px] z-40 bg-white/90 backdrop-blur-xl border-b border-black/8 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-black">{product.modelCode}</span>
            <span className="hidden sm:inline-block text-[11px] text-[#6e6e73] font-medium border-l border-black/10 pl-3">
              {product.dimensions}
            </span>
            <span className="hidden md:inline-block text-[10px] font-semibold text-capelton-green bg-capelton-green/10 border border-capelton-green/20 px-2 py-0.5 rounded-full">
              {categoryName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {product.technicalSheetUrl && (
              <a
                href={product.technicalSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-black bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-capelton-green" />
                <span>{t("Ficha Técnica PDF", "PDF Spec Sheet")}</span>
              </a>
            )}
            <a
              href={`https://wa.me/5215529640104?text=${whatsappSaleMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("ventas", `detail_header_${product.modelCode}`)}
              title={t("WhatsApp Ventas: 55 2964 0104", "WhatsApp Sales: +52 55 2964 0104")}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all flex items-center gap-1.5 shadow-[0_2px_10px_rgba(0,177,64,0.3)]"
            >
              <MessageCircle className="w-3 h-3 fill-white" />
              <span>{t("Venta", "Buy")}</span>
            </a>
            <a
              href={`https://wa.me/5215579483632?text=${whatsappRentMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("rentas", `detail_header_${product.modelCode}`)}
              title={t("WhatsApp Rentas: 55 7948 3632", "WhatsApp Rentals: +52 55 7948 3632")}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-black bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-3 h-3 text-capelton-green" />
              <span>{t("Renta", "Rent")}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6e6e73] mb-8 flex-wrap">
          <Link href="/" className="hover:text-black transition-colors">
            {t("Inicio", "Home")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/#modelos" className="hover:text-black transition-colors">
            {t("Modelos", "Models")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/categorias/${product.category}`} className="hover:text-black transition-colors">
            {categoryName}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-semibold">{product.modelCode}</span>
        </nav>

        {/* Hero Section of Product */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Interactive Multi-Angle Product Gallery (Col 7) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              modelCode={product.modelCode}
              title={product.title}
              blueprintUrl={product.blueprintUrl}
            />
          </div>

          {/* Product Specifications & Order CTA (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <SciFiHeading
                text={product.modelCode}
                className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-black tracking-tighter leading-tight"
                align="left"
                showLaser={true}
                showHudTag={true}
                hudTag={`${categoryName.toUpperCase()} // ${t("ACERO CAL. 14", "14-GAUGE STEEL")}`}
              />
              <p className="text-sm text-[#6e6e73] mt-3 leading-relaxed">
                {language === "en"
                  ? `High-specification ${categoryName.toLowerCase()} unit engineered for rapid 24-48h deployment, certified seismic and anti-torsion structural rigidity, and optimal thermal performance.`
                  : product.tagline}
              </p>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-black/8">
              <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/8">
                <div className="flex items-center gap-2 text-[#6e6e73] text-xs mb-1">
                  <Box className="w-3.5 h-3.5 text-capelton-green" />
                  <span>{t("Dimensiones", "Dimensions")}</span>
                </div>
                <span className="text-base font-bold text-black">{product.dimensions}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/8">
                <div className="flex items-center gap-2 text-[#6e6e73] text-xs mb-1">
                  <Scale className="w-3.5 h-3.5 text-capelton-green" />
                  <span>{t("Peso Neto", "Net Weight")}</span>
                </div>
                <span className="text-base font-bold text-black">{product.weight}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/8">
                <div className="flex items-center gap-2 text-[#6e6e73] text-xs mb-1">
                  <Weight className="w-3.5 h-3.5 text-capelton-green" />
                  <span>{t("Carga Máxima", "Max Load Capacity")}</span>
                </div>
                <span className="text-base font-bold text-black">{formattedLoad}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/[0.02] border border-black/8">
                <div className="flex items-center gap-2 text-[#6e6e73] text-xs mb-1">
                  <Users className="w-3.5 h-3.5 text-capelton-green" />
                  <span>{t("Aforo", "Capacity")}</span>
                </div>
                <span className="text-base font-bold text-capelton-green">{formattedCapacity}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <div>
                <a
                  href={`https://wa.me/5215529640104?text=${whatsappSaleMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", `detail_main_${product.modelCode}`)}
                  className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,177,64,0.3)]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t("Cotizar Venta Inmediata", "Instant Purchase Quote")}</span>
                </a>
                <span className="block text-[10px] text-center text-[#86868b] mt-1 font-medium">
                  {t("Atención Ventas:", "Sales Department:")}{" "}
                  <strong className="text-black">55 2964 0104</strong>
                </span>
              </div>

              <div>
                <a
                  href={`https://wa.me/5215579483632?text=${whatsappRentMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("rentas", `detail_main_${product.modelCode}`)}
                  className="w-full py-3.5 rounded-full text-xs font-bold text-black bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-capelton-green" />
                  <span>{t("Solicitar Esquema de Renta", "Request Rental Plan")}</span>
                </a>
                <span className="block text-[10px] text-center text-[#86868b] mt-1 font-medium">
                  {t("Atención Rentas:", "Rentals Department:")}{" "}
                  <strong className="text-black">55 7948 3632</strong>
                </span>
              </div>

              {product.technicalSheetUrl && (
                <a
                  href={product.technicalSheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-xs font-semibold text-[#6e6e73] hover:text-black transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <FileText className="w-3.5 h-3.5 text-capelton-green" />
                  <span>{t("Descargar Ficha Técnica Oficial (PDF)", "Download Official Spec Sheet (PDF)")}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Features and Finishes List */}
        <div className="bg-[#fbfbfd] border border-black/8 rounded-3xl p-8 sm:p-12 mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-capelton-green block mb-2">
              {t("Especificación Constructiva", "Constructive Specification")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black">
              {t("Equipamiento e Ingeniería de Serie", "Standard Equipment & Engineering")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-black/8 flex items-start gap-3 shadow-sm hover:border-capelton-green/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#434344] leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-black">
                {t("Otros Modelos en", "Other Models in")} {categoryName}
              </h3>
              <Link
                href="/#modelos"
                className="text-xs font-bold text-capelton-green hover:underline flex items-center gap-1"
              >
                <span>{t("Ver catálogo completo", "View complete catalog")}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
