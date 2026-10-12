"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Shield,
  Bed,
  Bath,
  Utensils,
  Box,
  Warehouse,
  HeartPulse,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";

interface BentoCategory {
  id: string;
  name: string;
  nameEn: string;
  badge: string;
  badgeEn: string;
  tagline: string;
  taglineEn: string;
  modelsLabel: string;
  modelsLabelEn: string;
  image: string;
  gridSpan: string;
  icon: React.ReactNode;
}

const bentoCategories: BentoCategory[] = [
  {
    id: "oficinas",
    name: "Oficinas Móviles",
    nameEn: "Mobile Offices",
    badge: "Línea Insignia",
    badgeEn: "Flagship Line",
    tagline:
      "Espacios de trabajo móviles para supervisión técnica, salas de juntas y centros de mando operativo.",
    taglineEn:
      "Mobile workspaces for site supervision, technical meetings, and project directors.",
    modelsLabel: "9 modelos",
    modelsLabelEn: "9 models",
    image: "/images/CM_10M_Vista_01_cropped.png",
    gridSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
    icon: <Building2 className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "casetas",
    name: "Casetas",
    nameEn: "Portable Booths",
    badge: "Control de Acceso",
    badgeEn: "Access Control",
    tagline:
      "Puntos de control perimetral con visibilidad 360° para seguridad y acceso en sitio.",
    taglineEn:
      "Perimeter access control booths with 360° visibility for site security.",
    modelsLabel: "2 modelos",
    modelsLabelEn: "2 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/02/Categoria_Casetas.png",
    gridSpan: "col-span-1 lg:col-span-1",
    icon: <Shield className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "dormitorios",
    name: "Dormitorios Móviles",
    nameEn: "Crew Quarters",
    badge: "Campamentos",
    badgeEn: "Workforce Housing",
    tagline:
      "Módulos habitacionales y campamentos de descanso para personal de obra y minería.",
    taglineEn:
      "Workforce lodging modules and base camps for civil and mining crews.",
    modelsLabel: "7 modelos",
    modelsLabelEn: "7 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/02/Dormitorios_Corte.png",
    gridSpan: "col-span-1 lg:col-span-1",
    icon: <Bed className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "sanitarios",
    name: "Sanitarios Móviles",
    nameEn: "Restroom Units",
    badge: "Higiene en Obra",
    badgeEn: "Site Hygiene",
    tagline:
      "Remolques y módulos sanitarios de alta capacidad con fácil mantenimiento e higiene garantizada.",
    taglineEn:
      "High-capacity mobile restroom trailers and modules with easy maintenance.",
    modelsLabel: "3 modelos",
    modelsLabelEn: "3 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/02/Sanitarios_Corte.png",
    gridSpan: "col-span-1 lg:col-span-1",
    icon: <Bath className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "comedores",
    name: "Comedores Móviles",
    nameEn: "Dining Units",
    badge: "Servicio y Alimentos",
    badgeEn: "Dining & Food Service",
    tagline:
      "Comedores industriales climatizados para cuadrillas y alta densidad de personal en campo.",
    taglineEn:
      "Spacious climate-controlled dining units for workforce crews in the field.",
    modelsLabel: "3 modelos",
    modelsLabelEn: "3 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/02/Comedores_Corte.png",
    gridSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
    icon: <Utensils className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "contenedores",
    name: "Bodegas y Resguardo",
    nameEn: "Storage Units",
    badge: "Resguardo en Sitio",
    badgeEn: "On-Site Storage",
    tagline:
      "Bodegas móviles reforzadas para resguardo seguro de maquinaria, planos y herramientas.",
    taglineEn:
      "Reinforced mobile storage units for secure tool, material, and equipment custody.",
    modelsLabel: "3 modelos",
    modelsLabelEn: "3 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/02/Contenedores_Corte.png",
    gridSpan: "col-span-1 lg:col-span-1",
    icon: <Box className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "consultorios",
    name: "Consultorios Móviles",
    nameEn: "Mobile Medical Units",
    badge: "Salud Ocupacional",
    badgeEn: "Occupational Health",
    tagline:
      "Unidades médicas y brigadas de atención primaria para frentes de trabajo y plantas.",
    taglineEn:
      "Mobile clinic units for employee health checkups and jobsite first aid.",
    modelsLabel: "4 modelos",
    modelsLabelEn: "4 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/07/Consultorios_Corte-min-scaled.png",
    gridSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
    icon: <HeartPulse className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "almacenes",
    name: "Almacenes Industriales",
    nameEn: "Custom Builds",
    badge: "Gran Capacidad",
    badgeEn: "High Capacity",
    tagline:
      "Espacios de almacenamiento y distribución industrial adaptados a requerimientos específicos.",
    taglineEn:
      "Custom industrial storage and modular complexes built to operational specifications.",
    modelsLabel: "A la Medida",
    modelsLabelEn: "Custom",
    image: "/images/categoria-almacenes.png",
    gridSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
    icon: <Warehouse className="w-5 h-5 text-capelton-green" />,
  },
];

export default function CategoryGrid() {
  const { t, language } = useLanguage();

  return (
    <section id="categorias" className="py-24 sm:py-32 bg-white text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with FadeIn */}
        <FadeIn direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-2">
              {t("SOLUCIONES POR OPERACIÓN", "WORKSPACES BY APPLICATION")}
            </span>
            <SciFiHeading
              text={t(
                "Espacios móviles diseñados para cada necesidad.",
                "Mobile Workspaces Designed for Every Need."
              )}
              as="h2"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-3"
              showLaser={false}
              showHudTag={false}
              duration={750}
            />
            <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed">
              {t(
                "Desde casetas individuales y oficinas ejecutivas hasta campamentos habitacionales y comedores industriales.",
                "From portable booths and executive offices to complete crew quarters and industrial dining units."
              )}
            </p>
          </div>
        </FadeIn>

        {/* Bento Grid with Allusive Imagery in Transparency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {bentoCategories.map((cat, index) => {
            const displayName = language === "en" && cat.nameEn ? cat.nameEn : cat.name;
            const displayBadge = language === "en" && cat.badgeEn ? cat.badgeEn : cat.badge;
            const displayTagline = language === "en" && cat.taglineEn ? cat.taglineEn : cat.tagline;
            const displayModels = language === "en" && cat.modelsLabelEn ? cat.modelsLabelEn : cat.modelsLabel;

            return (
              <FadeIn
                key={cat.id}
                delay={index * 60}
                direction="up"
                className={cat.gridSpan}
              >
                <Link
                  href={`/categorias/${cat.id}`}
                  id={`cat-${cat.id}`}
                  className="group relative h-[320px] sm:h-[340px] w-full rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 flex flex-col justify-between overflow-hidden bg-[#f5f5f7] hover:bg-white border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-500 block select-none scroll-mt-28 target:ring-2 target:ring-capelton-green target:ring-offset-4"
                >
                  {/* Background Allusive Image with Elegant Transparency */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px] sm:rounded-[32px]">
                    <div className="absolute -right-4 sm:right-0 -bottom-4 sm:bottom-0 w-[68%] sm:w-[62%] h-[74%] sm:h-[68%]">
                      <Image
                        src={cat.image}
                        alt={displayName}
                        fill
                        sizes="(max-width: 768px) 100vw, 550px"
                        className="object-contain object-bottom-right opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-out filter contrast-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
                      />
                    </div>
                    {/* Subtle Gradient Scrim ensuring 100% typography legibility */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f5f5f7]/95 via-[#f5f5f7]/65 to-transparent group-hover:from-white/95 group-hover:via-white/70 transition-colors duration-500" />
                  </div>

                  {/* Foreground Card Content */}
                  <div className="relative z-10">
                    {/* Top Bar with Icon and Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm border border-black/5 group-hover:scale-105 transition-transform duration-300">
                        {cat.icon}
                      </div>
                      <span className="text-[11px] font-semibold tracking-wide text-[#86868b] bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-black/5">
                        {displayBadge}
                      </span>
                    </div>

                    {/* Title and Tagline */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] group-hover:text-black transition-colors mb-2">
                      {displayName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6e6e73] font-normal leading-relaxed line-clamp-2 max-w-[85%]">
                      {displayTagline}
                    </p>
                  </div>

                  {/* Bottom Model Count and Apple Action Arrow */}
                  <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-semibold text-[#86868b] group-hover:text-black transition-colors">
                    <span className="text-xs font-medium text-[#86868b] group-hover:text-[#1d1d1f]">
                      {displayModels}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/90 group-hover:bg-capelton-green group-hover:text-white text-black flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
