"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";

const clientLogosMX = [
  { name: "CFE", src: "/images/clients/Logo_CFE-1.svg" },
  { name: "SEMAR", src: "/images/clients/Logo_Semar-1.svg" },
  { name: "Tren Maya", src: "/images/clients/Logo_TrenMaya-1.png" },
  { name: "Liverpool", src: "/images/clients/Logo_Liverpool-1.png" },
  { name: "Michelin", src: "/images/clients/Logo_Michelin-1.png" },
  { name: "Bayer", src: "/images/clients/Logo_Bayer-1.png" },
  { name: "Cemex", src: "/images/clients/Logo_Cemex-1.png" },
  { name: "Bosch", src: "/images/clients/Logo_Bosch-1.png" },
  { name: "ICA Fluor", src: "/images/clients/Logo_IcaFluor-1.png" },
  { name: "Engie", src: "/images/clients/Logo_Engie-1.png" },
  { name: "Poder Judicial", src: "/images/clients/Logo_PoderJudicial-1.png" },
  { name: "Steren", src: "/images/clients/Logo_Steren-1.png" },
];

const clientLogosUS = [
  { name: "Toyota", src: "/images/clients/Logo_Toyota-1.svg" },
  { name: "Nissan", src: "/images/clients/Logo_Nissan-1.svg" },
  { name: "Michelin", src: "/images/clients/Logo_Michelin-1.png" },
  { name: "Bosch", src: "/images/clients/Logo_Bosch-1.png" },
  { name: "Engie", src: "/images/clients/Logo_Engie-1.png" },
  { name: "Bayer", src: "/images/clients/Logo_Bayer-1.png" },
  { name: "Marriott", src: "/images/clients/Logo_Marriott-1.svg" },
  { name: "Fujita", src: "/images/clients/Logo_Fujita-1.svg" },
  { name: "NewFortress Energy", src: "/images/clients/Logo_NewFortress-1.svg" },
  { name: "ICA Fluor", src: "/images/clients/Logo_IcaFluor-1.png" },
  { name: "Cemex", src: "/images/clients/Logo_Cemex-1.png" },
  { name: "ITISA", src: "" },
];

const projects = [
  {
    title: "Campamento CFE",
    titleEn: "CFE Base Camp",
    location: "Presa Peñitas, Chis.",
    category: "Complejo Habitacional & Cocina",
    categoryEn: "Housing Complex & Kitchen",
    image: "/images/proyectos/proyecto-1.jpg",
    description: "Módulos de dormitorio masivo y cocina industrial CMK para cuadrillas de mantenimiento hidroeléctrico.",
    descriptionEn: "High-capacity sleeper modules and CMK industrial kitchen for hydroelectric maintenance crews.",
  },
  {
    title: "SEMAR • Secretaría de Marina",
    titleEn: "Mexican Navy (SEMAR)",
    location: "Aeropuerto AIFA, Edo. Méx.",
    category: "Mando Operativo CM-17M",
    categoryEn: "Operational Command CM-17M",
    image: "/images/proyectos/proyecto-2.jpg",
    description: "Espacio insignia de 17 metros para oficinas de alta dirección y centro de control estratégico.",
    descriptionEn: "17-meter flagship unit for executive management offices and strategic control center.",
  },
  {
    title: "Michelin Car Center",
    titleEn: "Michelin Car Center",
    location: "Polanco, CDMX",
    category: "Comercial & Taller Móvil",
    categoryEn: "Commercial & Mobile Workshop",
    image: "/images/proyectos/proyecto-3.jpg",
    description: "Módulo de atención corporativa y recepción de clientes con acabados ejecutivos.",
    descriptionEn: "Corporate customer service and reception unit with executive finishes.",
  },
  {
    title: "Liverpool Car Center",
    titleEn: "Liverpool Car Center",
    location: "Polanco, CDMX",
    category: "Logística y Servicio",
    categoryEn: "Logistics & Service",
    image: "/images/proyectos/proyecto-4.jpg",
    description: "Espacio climatizado de rápida instalación para servicios técnicos automotrices.",
    descriptionEn: "Rapid-installation climate-controlled space for automotive technical services.",
  },
  {
    title: "Juzgado Itinerante",
    titleEn: "Itinerant Courtroom",
    location: "Toluca, Edo. Méx.",
    category: "Poder Judicial",
    categoryEn: "Judicial Branch",
    image: "/images/proyectos/proyecto-5.jpg",
    description: "Oficina móvil adaptada para impartición de justicia y audiencias periciales en campo.",
    descriptionEn: "Mobile office adapted for judicial proceedings and on-site expert hearings.",
  },
  {
    title: "Unidad Médica de Mastografía",
    titleEn: "Mobile Mammography Clinic",
    location: "Tlalnepantla, Edo. Méx. (ISEM)",
    category: "Salud Comunitaria",
    categoryEn: "Community Health",
    image: "/images/proyectos/proyecto-6.jpg",
    description: "Clínica móvil con blindaje sanitario y climatización hospitalaria para brigadas de salud.",
    descriptionEn: "Mobile clinic with sanitary shielding and hospital-grade HVAC for health brigades.",
  },
];

const distributorHubs = [
  { id: 1, region: "Zona Bajío", regionEn: "Bajio Hub", city: "Querétaro / León" },
  { id: 2, region: "Zona Norte", regionEn: "North Hub", city: "Monterrey / Saltillo" },
  { id: 3, region: "Zona Centro", regionEn: "Central Hub", city: "Toluca / CDMX / Puebla" },
  { id: 4, region: "Zona Sureste", regionEn: "Southeast Hub", city: "Veracruz / Villahermosa" },
  { id: 5, region: "USA Logistics Hub", regionEn: "USA Logistics Hub", city: "Texas / International" },
];

export default function ClientsAndDistributors() {
  const { t, language } = useLanguage();
  const currentLogos = language === "en" ? clientLogosUS : clientLogosMX;

  return (
    <section id="clientes" className="py-24 sm:py-32 bg-white text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-capelton-green/8 via-capelton-green/3 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse duration-[7000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. SECCIÓN CLIENTES */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-2">
              {t("EMPRESAS E INSTITUCIONES", "COMPANIES & INSTITUTIONS")}
            </span>
            <SciFiHeading
              text={t(
                "Clientes que confían en Capelton.",
                "Clients Who Trust Capelton Workspaces."
              )}
              as="h2"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-3"
              showLaser={false}
              showHudTag={false}
              duration={750}
            />
            <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed">
              {t(
                "Más de 15 años respaldando a dependencias públicas, consorcios de infraestructura y líderes industriales.",
                "Over 15 years manufacturing mobile workspaces that meet the standards of global engineering, automotive, and energy leaders."
              )}
            </p>
          </div>
        </FadeIn>

        {/* Clean Client Logos / Badges Grid */}
        <FadeIn direction="up" delay={80}>
          <div className="bg-[#f5f5f7] rounded-[32px] p-6 sm:p-10 mb-24 shadow-2xs border border-neutral-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 items-center justify-items-center">
              {currentLogos.map((client, idx) => (
                <div
                  key={idx}
                  className="w-full h-20 sm:h-22 flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-black/5 hover:border-capelton-green/40 shadow-2xs hover:shadow-xs transition-all duration-300 group"
                >
                  {client.src ? (
                    <div
                      className="relative w-24 sm:w-28 h-8 transition-transform duration-300 transform group-hover:scale-105"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(47%) sepia(75%) saturate(2300%) hue-rotate(110deg) brightness(92%) contrast(100%)",
                      }}
                    >
                      <Image
                        src={client.src}
                        alt={client.name}
                        fill
                        sizes="130px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#1d1d1f] group-hover:text-capelton-green transition-colors text-center font-heading">
                      {client.name}
                    </span>
                  )}
                  {client.src && (
                    <span className="text-[10px] font-semibold text-[#86868b] group-hover:text-black mt-1.5 transition-colors">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 2. SECCIÓN PROYECTOS (Anchor id="proyectos") */}
        <div id="proyectos" className="mb-24 scroll-mt-24">
          <FadeIn direction="up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-capelton-green block mb-1">
                  {t("EN TERRITORIO REAL", "ON THE GROUND")}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-black tracking-tight leading-[1.12]">
                  {t("Proyectos entregados en campo", "Field Projects & Deliveries")}
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6e73] font-normal leading-relaxed mt-2 max-w-xl">
                  {t(
                    "Espacios móviles diseñados y entregados para resolver retos operativos reales en obra civil, industria y gobierno.",
                    "Mobile workspaces engineered and deployed to solve real operational needs on jobsites, industry, and government."
                  )}
                </p>
              </div>
              <Link
                href="/nosotros"
                className="text-xs sm:text-sm font-semibold text-[#0066cc] hover:underline flex items-center gap-1 group whitespace-nowrap self-start sm:self-auto"
              >
                <span>{t("Conocer nuestra historia", "Learn our story")}</span>
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
                      <p className="text-xs text-[#515154] font-normal leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* 3. SECCIÓN ALIANZAS Y DISTRIBUIDORES AUTORIZADOS (Con destaque oficial a Vexon) */}
        <FadeIn direction="up">
          <div className="bg-[#f5f5f7] rounded-[32px] p-8 sm:p-12 border border-neutral-100">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3 py-1 rounded-full mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t("ALIANZAS Y DISTRIBUCIÓN", "ALLIANCES & DISTRIBUTION")}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-3">
                {t("Red de distribución y alianzas estratégicas", "Authorized Distribution & Strategic Alliances")}
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] font-normal leading-relaxed">
                {t(
                  "Puntos de venta, centros de exhibición y entrega técnica certificada con respaldo oficial directo de planta Capelton.",
                  "Points of sale, showroom centers, and certified technical delivery backed directly by the Capelton manufacturing plant."
                )}
              </p>
            </div>

            {/* Vexon Strategic Partner Callout Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-capelton-green/30 shadow-xs mb-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
              <div className="w-14 h-14 rounded-2xl bg-capelton-green/10 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 text-capelton-green" />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h4 className="text-base font-bold text-black">VEXON</h4>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-capelton-green text-white px-2 py-0.5 rounded-full">
                    {t("Empresa Hermana", "Sister Company")}
                  </span>
                </div>
                <p className="text-xs text-[#515154] leading-relaxed">
                  {t(
                    "Nuestro socio estratégico y brazo comercial para expansión, soporte logístico y distribución regional con homologación directa de planta Capelton.",
                    "Our strategic sister company and primary distribution partner for North American operations, providing regional logistics, fleet support, and certified technical service."
                  )}
                </p>
              </div>
            </div>

            {/* Authorized Regional Hubs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-center justify-items-center max-w-4xl mx-auto">
              {distributorHubs.map((hub) => (
                <div
                  key={hub.id}
                  className="w-full h-24 bg-white rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-2xs border border-black/5 hover:border-capelton-green/40 hover:shadow-xs transition-all group"
                >
                  <MapPin className="w-4 h-4 text-capelton-green mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-black">
                    {language === "en" ? hub.regionEn : hub.region}
                  </span>
                  <span className="text-[10px] text-[#6e6e73] mt-0.5">
                    {hub.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
