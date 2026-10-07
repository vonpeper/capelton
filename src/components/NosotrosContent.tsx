"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Clock,
  MapPin,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  ArrowRight,
  Layers,
  ThermometerSnowflake,
  Zap,
  Users
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/lib/data";

export default function NosotrosContent() {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: "+15",
      label: t("Años de Trayectoria", "Years of Track Record"),
      sub: t(
        "Ingeniería en manufactura modular de alta especificación",
        "High-specification modular manufacturing engineering"
      ),
    },
    {
      value: "100%",
      label: t("Cobertura Nacional", "Nationwide Coverage"),
      sub: t(
        "Logística y traslados en los 32 estados de la República",
        "Logistics and transit across all 32 Mexican states"
      ),
    },
    {
      value: "24-48h",
      label: t("Despliegue Inmediato", "Rapid Deployment"),
      sub: t(
        "Instalación y nivelación en sitio con llave en mano",
        "Turnkey on-site leveling and installation"
      ),
    },
    {
      value: "Cal. 14",
      label: t("Acero Certificado", "Certified Steel"),
      sub: t(
        "Estructura monolítica con garantía directa de fábrica",
        "Monolithic chassis with direct factory warranty"
      ),
    },
  ];

  const pillars = [
    {
      icon: <Layers className="w-6 h-6 text-capelton-green" />,
      title: t("Estructura Monolítica", "Monolithic Frame"),
      desc: t(
        "Chasis rolado en acero electrogalvanizado Calibre 14. Máxima rigidez contra torsión en terracerías mineras y sismos.",
        "14-Gauge electrogalvanized rolled steel chassis. Maximum rigidity against torsion in mining dirt roads and seismic zones."
      ),
    },
    {
      icon: <ThermometerSnowflake className="w-6 h-6 text-capelton-green" />,
      title: t("Blindaje Termoacústico", "Thermoacoustic Shielding"),
      desc: t(
        "Poliuretano inyectado continuo de alta densidad. Confort térmico de -10°C a +45°C con reducción del 40% en climatización.",
        "High-density continuous injected polyurethane. Thermal comfort from -10°C to +45°C with a 40% reduction in HVAC energy consumption."
      ),
    },
    {
      icon: <Zap className="w-6 h-6 text-capelton-green" />,
      title: t("Instalación Certificada", "Certified Electrical Systems"),
      desc: t(
        "Sistemas eléctricos bajo norma oficial mexicana (NOM), centros de carga bifásicos y luminarias LED empotradas.",
        "Electrical systems complying with official Mexican standards (NOM), two-phase load centers, and recessed LED fixtures."
      ),
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-capelton-green" />,
      title: t("Garantía de Fábrica", "Factory Warranty"),
      desc: t(
        "Cero intermediarios ni revendedores. Acompañamiento técnico de ingenieros antes, durante y después del montaje.",
        "Zero middlemen or resellers. Direct technical engineering support before, during, and after on-site placement."
      ),
    },
  ];

  const projects = [
    {
      title: "Campamento CFE Presa Peñitas",
      location: "Chiapas",
      type: t("Complejo Habitacional & Comedor", "Housing Complex & Dining"),
      image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Penitas.png",
    },
    {
      title: "Secretaría de Marina (SEMAR)",
      location: "AIFA, Zumpango",
      type: t("Centro de Mando CM-17M", "Command Center CM-17M"),
      image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Sedena.png",
    },
    {
      title: "Liverpool Car Center",
      location: "Polanco, CDMX",
      type: t("Módulo Comercial y Logístico", "Commercial & Logistics Unit"),
      image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Liverpool.png",
    },
    {
      title: "Michelin Car Center",
      location: "Polanco, CDMX",
      type: t("Centro de Operaciones", "Operations Center"),
      image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Michelin.png",
    },
    {
      title: "Juzgado Itinerante Poder Judicial",
      location: "Toluca, Méx.",
      type: t("Salas de Audiencia Móviles", "Mobile Courtrooms"),
      image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Poder_Judicial.png",
    },
    {
      title: "Unidad Móvil de Salud (ISEM)",
      location: "Tlalnepantla, Méx.",
      type: t("Clínica de Mastografía", "Mammography Clinic"),
      image: "https://capeltonmexico.com/wp-content/uploads/2024/10/Mastografia.png",
    },
  ];

  return (
    <div className="bg-white text-[#1d1d1f] pt-28 sm:pt-36 pb-24">
      {/* 1. Hero Institucional */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 sm:mb-28 text-center overflow-hidden">
        {/* Ambient Radial Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-b from-capelton-green/12 via-capelton-green/3 to-transparent rounded-full blur-[160px] pointer-events-none animate-pulse duration-[6000ms]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <SciFiHeading
            lines={
              language === "en"
                ? [
                    "Mobile work environments.",
                    "Safe, efficient, and highly engineered."
                  ]
                : [
                    "Espacios de trabajo móviles.",
                    "Seguros, eficientes y de alta ingeniería."
                  ]
            }
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-[1.05] mb-6"
            showLaser={true}
            showHudTag={true}
            hudTag={t(
              "TRAYECTORIA Y MANUFACTURA // CALIDAD CERTIFICADA",
              "HERITAGE & MANUFACTURING // CERTIFIED QUALITY"
            )}
            align="center"
            delay={200}
          />
          <p className="text-base sm:text-xl text-[#6e6e73] font-normal leading-relaxed max-w-3xl mx-auto mb-10">
            {language === "en" ? (
              <>
                At <strong className="text-black font-semibold">Capelton Mexico</strong> we specialize in the design, manufacture, and customization of mobile offices and modular spaces for the most demanding industries across the country.
              </>
            ) : (
              <>
                En <strong className="text-black font-semibold">Capelton de México</strong> somos especialistas en el diseño, fabricación y personalización de oficinas móviles y espacios modulares para las industrias más exigentes del país.
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={CONTACT_INFO.ventas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t("WhatsApp Ventas", "WhatsApp Sales")}</span>
              <span className="text-[11px] opacity-80 font-normal">55 2964 0104</span>
            </a>
            <a
              href={CONTACT_INFO.rentas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-black bg-[#f5f5f7] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 border border-black/8"
            >
              <MessageCircle className="w-4 h-4 text-capelton-green" />
              <span>{t("WhatsApp Rentas", "WhatsApp Rentals")}</span>
              <span className="text-[11px] text-[#6e6e73] font-normal">55 7948 3632</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Bento Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#f5f5f7] rounded-[28px] p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl sm:text-5xl font-bold text-black tracking-tight mb-4">
                {stat.value}
              </span>
              <div>
                <h3 className="text-base font-bold text-black mb-1">{stat.label}</h3>
                <p className="text-xs text-[#6e6e73] font-normal leading-relaxed">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Quiénes Somos - Relato Oficial */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#fbfbfd] border border-black/8 rounded-[36px] p-8 sm:p-14 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-capelton-green block mb-2">
            {t("Nuestra Esencia", "Our Essence")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-6">
            {t("¿Quiénes somos en Capelton de México?", "Who are we at Capelton Mexico?")}
          </h2>
          <div className="space-y-5 text-sm sm:text-base text-[#515154] leading-relaxed">
            {language === "en" ? (
              <>
                <p>
                  Our track record has allowed us to deliver large-scale projects for strategic sectors including <strong>construction, heavy industry, logistics, mining, and energy</strong>, providing turnkey workspaces tailored precisely to each client&apos;s requirements.
                </p>
                <p>
                  We operate with a multidisciplinary team of engineers, project planners, and specialized technicians committed to total quality, utilizing <strong>14-Gauge cold-rolled electrogalvanized steel</strong>, continuous high-density polyurethane injection, and manufacturing standards that guarantee unmatched durability, thermal comfort, and energy efficiency.
                </p>
                <p>
                  On every single project we aim to exceed customer expectations, manufacturing mobile offices and camp units that not only shelter personnel, but actively <strong>boost operational productivity</strong> and empower business growth under any climate condition across Mexico.
                </p>
              </>
            ) : (
              <>
                <p>
                  Nuestra experiencia nos ha permitido desarrollar proyectos de alta envergadura para sectores estratégicos como la <strong>construcción, la industria pesada, la logística, la minería y la energía</strong>, ofreciendo espacios de trabajo adaptados milimétricamente a las necesidades de cada cliente.
                </p>
                <p>
                  Trabajamos con un equipo de ingenieros, proyectistas y técnicos especialistas comprometidos con la calidad total, utilizando <strong>acero rolado electrogalvanizado Calibre 14</strong>, inyección continua de poliuretano y procesos de fabricación que garantizan durabilidad insuperable, confort térmico y eficiencia energética.
                </p>
                <p>
                  En cada proyecto buscamos superar las expectativas de nuestros clientes, desarrollando oficinas móviles que no solo albergan personas, sino que <strong>impulsan la productividad operativa</strong> y acompañan el crecimiento de sus empresas en cualquier condición climática de la República Mexicana.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. Los 4 Pilares de Ingeniería */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-capelton-green block mb-2">
            {t("Ingeniería de Planta", "Plant Engineering")}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight">
            {t("Los pilares de manufactura Capelton", "Capelton's Manufacturing Pillars")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pil, idx) => (
            <div
              key={idx}
              className="bg-[#f5f5f7] hover:bg-white rounded-[28px] p-8 border border-neutral-100 hover:border-black/5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-xs border border-black/5">
                {pil.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-black mb-2">{pil.title}</h3>
                <p className="text-xs text-[#6e6e73] font-normal leading-relaxed">{pil.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Galería de Proyectos Reales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-capelton-green block mb-1">
              {t("Portafolio en Operación", "Active Portfolio")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
              {t("Presencia comprobada en territorio nacional", "Proven Presence Nationwide")}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-md">
            {t(
              "Módulos activos entregados a dependencias de gobierno y firmas transnacionales.",
              "Active modules deployed for government agencies and transnational enterprises."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="group bg-[#f5f5f7] rounded-[28px] overflow-hidden border border-black/5 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="relative w-full h-56 bg-neutral-200 overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 bg-white/90 text-[10px] font-bold text-black px-2.5 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-capelton-green" />
                  <span>{proj.location}</span>
                </span>
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-capelton-green uppercase tracking-wider block mb-1">
                  {proj.type}
                </span>
                <h3 className="text-base font-bold text-black">{proj.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Final Institucional */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#1d1d1f] text-white rounded-[36px] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-capelton-green uppercase tracking-wider block mb-2">
              {t("Tu Proyecto en Manos Expertas", "Your Project in Expert Hands")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              {t(
                "Despliega tu espacio de trabajo donde lo necesites.",
                "Deploy your workspace wherever you need it."
              )}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-8">
              {t(
                "Elaboramos presupuestos formales para venta o renta inmediata con logística y nivelación en obra incluida.",
                "We provide formal proposals for immediate purchase or rental with logistics and on-site placement included."
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={CONTACT_INFO.ventas.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t("WhatsApp Ventas", "WhatsApp Sales")}</span>
                <span className="text-[11px] opacity-80 font-normal">55 2964 0104</span>
              </a>
              <a
                href={CONTACT_INFO.rentas.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-capelton-green" />
                <span>{t("WhatsApp Rentas", "WhatsApp Rentals")}</span>
                <span className="text-[11px] text-white/80 font-normal">55 7948 3632</span>
              </a>
              <Link
                href="/#modelos"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-1"
              >
                <span>{t("Explorar Modelos", "Explore Models")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
