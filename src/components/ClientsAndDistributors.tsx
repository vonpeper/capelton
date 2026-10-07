"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";

const clientLogos = [
  { name: "CFE", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_CFE-1.png" },
  { name: "SEMAR", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Semar-1.png" },
  { name: "Tren Maya", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_TrenMaya-1.png" },
  { name: "Liverpool", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Liverpool-1.png" },
  { name: "Michelin", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Michelin-1.png" },
  { name: "Bayer", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Bayer-1.png" },
  { name: "Cemex", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Cemex-1.png" },
  { name: "Bosch", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Bosch-1.png" },
  { name: "Steren", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Steren-1.png" },
  { name: "ICA Fluor", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_IcaFluor-1.png" },
  { name: "Engie", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_Engie-1.png" },
  { name: "Poder Judicial", src: "https://capeltonmexico.com/wp-content/uploads/2024/10/Logo_PoderJudicial-1.png" },
];

const projects = [
  {
    title: "Campamento CFE",
    titleEn: "CFE Base Camp",
    location: "Presa Peñitas, Chis.",
    category: "Complejo Habitacional & Cocina",
    categoryEn: "Housing Complex & Kitchen",
    image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Penitas.png",
    description: "Módulos de dormitorio masivo y cocina industrial CMK para cuadrillas de mantenimiento hidroeléctrico.",
    descriptionEn: "High-capacity sleeper modules and CMK industrial kitchen for hydroelectric maintenance crews.",
  },
  {
    title: "SEMAR • Secretaría de Marina",
    titleEn: "Mexican Navy (SEMAR)",
    location: "Aeropuerto AIFA, Edo. Méx.",
    category: "Mando Operativo CM-17M",
    categoryEn: "Operational Command CM-17M",
    image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Sedena.png",
    description: "Espacio insignia de 17 metros para oficinas de alta dirección y centro de control estratégico.",
    descriptionEn: "17-meter flagship unit for executive management offices and strategic control center.",
  },
  {
    title: "Michelin Car Center",
    titleEn: "Michelin Car Center",
    location: "Polanco, CDMX",
    category: "Comercial & Taller Móvil",
    categoryEn: "Commercial & Mobile Workshop",
    image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Michelin.png",
    description: "Módulo de atención corporativa y recepción de clientes con acabados ejecutivos.",
    descriptionEn: "Corporate customer service and reception unit with executive finishes.",
  },
  {
    title: "Liverpool Car Center",
    titleEn: "Liverpool Car Center",
    location: "Polanco, CDMX",
    category: "Logística y Servicio",
    categoryEn: "Logistics & Service",
    image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Liverpool.png",
    description: "Espacio climatizado de rápida instalación para servicios técnicos automotrices.",
    descriptionEn: "Rapid-installation climate-controlled space for automotive technical services.",
  },
  {
    title: "Juzgado Itinerante",
    titleEn: "Itinerant Courtroom",
    location: "Toluca, Edo. Méx.",
    category: "Poder Judicial",
    categoryEn: "Judicial Branch",
    image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Poder_Judicial.png",
    description: "Oficina móvil adaptada para impartición de justicia y audiencias periciales en campo.",
    descriptionEn: "Mobile office adapted for judicial proceedings and on-site expert hearings.",
  },
  {
    title: "Unidad Médica de Mastografía",
    titleEn: "Mobile Mammography Clinic",
    location: "Tlalnepantla, Edo. Méx. (ISEM)",
    category: "Salud Comunitaria",
    categoryEn: "Community Health",
    image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Mastografia.png",
    description: "Clínica móvil con blindaje sanitario y climatización hospitalaria para brigadas de salud.",
    descriptionEn: "Mobile clinic with sanitary shielding and hospital-grade HVAC for health brigades.",
  },
];

const distributors = [
  { id: 1, src: "https://capeltonmexico.com/wp-content/uploads/2025/11/1.png" },
  { id: 2, src: "https://capeltonmexico.com/wp-content/uploads/2025/11/2.png" },
  { id: 3, src: "https://capeltonmexico.com/wp-content/uploads/2025/11/3.png" },
  { id: 4, src: "https://capeltonmexico.com/wp-content/uploads/2025/11/4.png" },
  { id: 5, src: "https://capeltonmexico.com/wp-content/uploads/2025/11/5.png" },
];

export default function ClientsAndDistributors() {
  const { t, language } = useLanguage();

  return (
    <section id="clientes" className="py-24 sm:py-32 bg-white text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-capelton-green/8 via-capelton-green/3 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse duration-[7000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-2">
              {t("Trayectoria y Confianza", "Track Record & Trust")}
            </span>
            <SciFiHeading
              text={t(
                "Proyectos de alta exigencia. Clientes que confían en Capelton.",
                "High-demand projects. Clients who trust Capelton."
              )}
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08] mb-4"
              showLaser={false}
              showHudTag={false}
              duration={750}
            />
            <p className="text-base text-[#6e6e73] font-normal leading-relaxed">
              {t(
                "Más de 15 años respaldando a dependencias gubernamentales, megaproyectos de infraestructura y líderes industriales en todo México.",
                "Over 15 years supporting government agencies, infrastructure megaprojects, and industrial leaders across Mexico."
              )}
            </p>
          </div>
        </FadeIn>

        {/* 1. Client Logos Grid (Vibrant Capelton Green Branding) */}
        <FadeIn direction="up" delay={100}>
          <div className="bg-[#f5f5f7] rounded-[32px] p-8 sm:p-12 mb-20 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-neutral-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-capelton-green text-center mb-8 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-capelton-green" />
              <span>{t("Alianzas y Proyectos Estratégicos", "Strategic Alliances & Projects")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-capelton-green" />
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-center justify-items-center">
              {clientLogos.map((client, idx) => (
                <div
                  key={idx}
                  className="w-full h-24 flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-black/5 hover:border-capelton-green/40 shadow-xs hover:shadow-[0_8px_20px_rgba(0,177,64,0.08)] transition-all duration-300 group"
                >
                  <div
                    className="relative w-28 sm:w-32 h-10 transition-transform duration-300 transform group-hover:scale-105"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(47%) sepia(75%) saturate(2300%) hue-rotate(110deg) brightness(92%) contrast(100%)",
                    }}
                  >
                    <Image
                      src={client.src}
                      alt={client.name}
                      fill
                      sizes="150px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10.5px] font-semibold text-[#86868b] group-hover:text-black mt-2 transition-colors">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 2. Real Project Photo Bento Showcase */}
        <div className="mb-24">
          <FadeIn direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-capelton-green block mb-1">
                  {t("En Territorio Real", "On The Ground")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                  {t("Instalaciones y obras activas", "Active Worksites & Installations")}
                </h3>
              </div>
              <Link
                href="/nosotros"
                className="text-xs sm:text-sm font-semibold text-[#0066cc] hover:underline flex items-center gap-1 group"
              >
                <span>{t("Conocer todos los proyectos", "View all projects")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => {
              const title = language === "en" && proj.titleEn ? proj.titleEn : proj.title;
              const category = language === "en" && proj.categoryEn ? proj.categoryEn : proj.category;
              const description = language === "en" && proj.descriptionEn ? proj.descriptionEn : proj.description;

              return (
                <FadeIn key={idx} delay={idx * 60} direction="up">
                  <div className="group bg-[#f5f5f7] hover:bg-white rounded-[28px] overflow-hidden border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between h-full select-none">
                    {/* Photo Container */}
                    <div className="relative w-full h-52 sm:h-56 bg-neutral-200 overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-bold text-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <MapPin className="w-3 h-3 text-capelton-green" />
                        <span>{proj.location}</span>
                      </span>
                    </div>

                    {/* Content Container */}
                    <div className="p-6">
                      <span className="text-[11px] font-semibold text-capelton-green uppercase tracking-wider block mb-1">
                        {category}
                      </span>
                      <h4 className="text-lg font-bold text-black tracking-tight mb-2">
                        {title}
                      </h4>
                      <p className="text-xs text-[#6e6e73] font-normal leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* 3. Authorized Distributors Slider / Grid */}
        <FadeIn direction="up">
          <div className="bg-[#f5f5f7] rounded-[32px] p-8 sm:p-12 text-center border border-neutral-100">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("Red Oficial Homologada", "Certified Official Network")}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-3">
              {t("Distribuidores Autorizados", "Authorized Distributors")}
            </h3>
            <p className="text-xs sm:text-sm text-[#6e6e73] max-w-xl mx-auto font-normal leading-relaxed mb-8">
              {t(
                "Puntos de venta, centros de exhibición y entrega técnica certificada con respaldo oficial de planta Capelton.",
                "Points of sale, showroom centers, and certified technical delivery backed directly by the Capelton factory."
              )}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center max-w-4xl mx-auto">
              {distributors.map((dist) => (
                <div
                  key={dist.id}
                  className="w-full h-24 bg-white rounded-2xl p-4 flex items-center justify-center shadow-xs border border-black/5 hover:shadow-md transition-all group"
                >
                  <div className="relative w-28 h-14 filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-105">
                    <Image
                      src={dist.src}
                      alt={`Distribuidor Autorizado ${dist.id}`}
                      fill
                      sizes="140px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
