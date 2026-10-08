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
      "Ingeniería modular para alta dirección, salas de juntas y centros de mando operativo.",
    taglineEn:
      "Modular engineering for executive management, boardrooms, and command centers.",
    modelsLabel: "9 modelos",
    modelsLabelEn: "9 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/02/Oficinas_Corte.png",
    gridSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
    icon: <Building2 className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "casetas",
    name: "Casetas",
    nameEn: "Guard & Security Booths",
    badge: "Control de Acceso",
    badgeEn: "Access Control",
    tagline:
      "Puntos de control perimetral con visibilidad 360° para seguridad y acceso en sitio.",
    taglineEn:
      "Perimeter access control points with 360° visibility for site security.",
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
    nameEn: "Mobile Sleeper Units",
    badge: "Campamentos",
    badgeEn: "Base Camps",
    tagline:
      "Módulos habitacionales y campamentos de descanso para personal de obra y minería.",
    taglineEn:
      "Residential modules and rest camps for construction and mining crews.",
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
    nameEn: "Mobile Restroom Units",
    badge: "Higiene y Confort",
    badgeEn: "Hygiene & Comfort",
    tagline:
      "Remolques y módulos hidrosanitarios autónomos con estándares hospitalarios de higiene.",
    taglineEn:
      "Autonomous mobile restroom trailers and modules with hospital-grade hygiene.",
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
    nameEn: "Mobile Dining Units",
    badge: "Servicio y Alimentos",
    badgeEn: "Dining & Food Service",
    tagline:
      "Grandes comedores industriales climatizados para alta densidad de personal en campo.",
    taglineEn:
      "Spacious climate-controlled industrial dining units for high-density crews.",
    modelsLabel: "3 modelos",
    modelsLabelEn: "3 models",
    image:
      "https://capeltonmexico.com/wp-content/uploads/2025/02/Comedores_Corte.png",
    gridSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
    icon: <Utensils className="w-5 h-5 text-capelton-green" />,
  },
  {
    id: "contenedores",
    name: "Contenedores y Minibodegas",
    nameEn: "Containers & Mini-Storage",
    badge: "Resguardo Industrial",
    badgeEn: "Industrial Storage",
    tagline:
      "Bodegas y minibodegas modulares de máxima seguridad para resguardo de herramienta y materiales.",
    taglineEn:
      "Modular high-security storage and warehouse units for tools and equipment.",
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
    nameEn: "Mobile Medical Clinics",
    badge: "Salud y Brigadas",
    badgeEn: "Health & Field Care",
    tagline:
      "Clínicas ambulatorias y unidades médicas de rápida respuesta para faenas y comunidades.",
    taglineEn:
      "Ambulatory clinics and rapid-response medical units for field crews and communities.",
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
    nameEn: "Industrial Warehouses",
    badge: "Gran Capacidad",
    badgeEn: "High Capacity",
    tagline:
      "Soluciones de almacenamiento y bodegas industriales modulares de instalación inmediata.",
    taglineEn:
      "Modular storage and industrial warehouse solutions with immediate installation.",
    modelsLabel: "Espacios Modulares",
    modelsLabelEn: "Modular Spaces",
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
            <p className="text-base sm:text-lg font-semibold text-[#1d1d1f] mb-3">
              {t("Sectores e industrias", "Sectors & Industries")}
            </p>
            <SciFiHeading
              text={t(
                "Unidades a la medida de cada operación.",
                "Tailored units for every operation."
              )}
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08] mb-4"
              showLaser={false}
              showHudTag={false}
              duration={750}
            />
            <p className="text-base text-[#6e6e73] font-normal leading-relaxed">
              {t(
                "Arquitectura modular para campamentos remotos, centros de mando y control perimetral.",
                "Modular architecture for remote base camps, command centers, and perimeter security."
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
