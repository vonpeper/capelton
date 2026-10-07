"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Mail,
  Building,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SITE_CONFIG } from "@/config/site";

export default function PrelaunchLanding() {
  const { t } = useLanguage();
  const { contact } = SITE_CONFIG;

  return (
    <div className="min-h-screen bg-[#fafafc] text-[#1d1d1f] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Architectural Grid Pattern & Ambient Radial Glows */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1d1d1f 1px, transparent 1px), radial-gradient(#1d1d1f 1px, #fafafc 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] bg-gradient-to-b from-capelton-green/15 via-capelton-green/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 right-[-10%] w-[500px] h-[400px] bg-capelton-green/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar with Language Switcher */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-capelton-green animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#86868b]">
            Capelton México · Operaciones Activas
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col items-center text-center my-auto">
        {/* Official Brand Logo */}
        <div className="mb-8 sm:mb-10 transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src="/images/logo-capelton.webp"
            alt="Capelton México"
            width={480}
            height={76}
            priority
            className="h-10 sm:h-14 md:h-16 w-auto object-contain mx-auto drop-shadow-sm"
          />
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-capelton-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-capelton-green" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-neutral-800 tracking-wide uppercase">
            {t(
              "En proceso de renovación · Nueva plataforma digital",
              "Platform renewal in progress · New digital experience"
            )}
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1] max-w-3xl mb-5">
          {t("Estamos renovando nuestro sitio para ti.", "We are updating our website for you.")}
        </h1>

        {/* Subtitle / Explanatory Text */}
        <p className="text-base sm:text-lg md:text-xl text-[#6e6e73] font-normal leading-relaxed max-w-2xl mb-4">
          {t(
            "Muy pronto presentaremos una nueva experiencia interactiva con la ingeniería, tecnología y catálogo de espacios modulares más avanzado de México.",
            "We will soon launch a new interactive digital experience featuring the most advanced modular engineering and catalog in Mexico."
          )}
        </p>

        {/* Reassurance Banner */}
        <div className="bg-white/80 backdrop-blur-md border border-neutral-200/80 rounded-2xl px-5 py-3 max-w-2xl mx-auto mb-10 shadow-sm text-xs sm:text-sm text-neutral-700 leading-normal">
          <strong className="text-black font-semibold">
            {t("Nuestras operaciones continúan al 100%:", "Our operations continue at 100% capacity:")}
          </strong>{" "}
          {t(
            "Fabricación, entrega en obra y atención a clientes operan con total normalidad. Comunícate directamente con nuestros ejecutivos según tu necesidad:",
            "Manufacturing, jobsite delivery, and customer service operate normally. Contact our dedicated team directly for your project requirements:"
          )}
        </div>

        {/* VENTA and RENTA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl text-left">
          {/* Card 1: VENTA DIRECTA */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-neutral-200/80 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:scale-125 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                  {t("Patrimonio Permanente", "Permanent Asset")}
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                  <ShieldCheck className="w-4 h-4 text-capelton-green" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                {t(contact.ventas.label, "Direct Purchase")}
              </h2>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed mb-6">
                {t(
                  "Compra definitiva de oficinas móviles, casetas y espacios modulares diseñados y fabricados con especificaciones a tu medida.",
                  "Permanent purchase of mobile offices, guard booths, and bespoke modular units engineered to your specifications."
                )}
              </p>

              {/* Bullet Features */}
              <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Fabricación en planta (Acero Cal. 14)", "Factory manufactured (14-Gauge steel)")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Activo fijo propio 100% depreciable", "Owned fixed asset, fully depreciable")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Entrega y montaje en toda la República", "Delivery and assembly nationwide across Mexico")}</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <a
                href={contact.ventas.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-black hover:bg-capelton-green transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t("Cotizar en Venta por WhatsApp", "Get Purchase Quote via WhatsApp")}</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </a>

              <a
                href={contact.ventas.telHref}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>
                  {t("Llamar directo:", "Direct call:")}{" "}
                  <strong className="text-black">{contact.ventas.phone}</strong>
                </span>
              </a>
            </div>
          </div>

          {/* Card 2: RENTA FLEXIBLE */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,177,64,0.06)] border-2 border-capelton-green/35 hover:border-capelton-green hover:shadow-[0_20px_45px_rgba(0,177,64,0.12)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-capelton-green/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:scale-125 transition-transform" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{t("100% Deducible (OPEX)", "100% Tax-Deductible (OPEX)")}</span>
                </span>
                <div className="w-8 h-8 rounded-full bg-capelton-green/10 flex items-center justify-center text-capelton-green">
                  <Clock className="w-4 h-4 text-capelton-green" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                {t(contact.rentas.label, "Flexible Rental")}
              </h2>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed mb-6">
                {t(
                  "Arrendamiento inmediato de casetas de vigilancia y oficinas para obras, constructoras y proyectos temporales.",
                  "Immediate lease of guard booths and offices for worksites, contractors, and temporary operational deployments."
                )}
              </p>

              {/* Bullet Features */}
              <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Despliegue inmediato en obra (24 a 48 hrs)", "Rapid on-site delivery within 24 to 48 hours")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Gasto mensual deducible sin descapitalización", "100% deductible operating expense (OPEX)")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Soporte técnico y mantenimiento incluido", "Ongoing technical maintenance and support included")}</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <a
                href={contact.rentas.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all duration-300 shadow-[0_6px_20px_rgba(0,177,64,0.3)] hover:shadow-[0_8px_25px_rgba(0,177,64,0.45)] flex items-center justify-center gap-2 group/btn"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t("Cotizar en Renta por WhatsApp", "Get Rental Quote via WhatsApp")}</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </a>

              <a
                href={contact.rentas.telHref}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-capelton-green" />
                <span>
                  {t("Llamar directo:", "Direct call:")}{" "}
                  <strong className="text-black">{contact.rentas.phone}</strong>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Corporate Quick Summary */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#86868b]">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-capelton-green" />
            <span>{t("Planta y oficinas: Ciudad de México", "Plant & offices: Mexico City")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-capelton-green" />
            <span>{t("Atención: Lun - Vie 8:00 a 18:00 hrs", "Hours: Mon - Fri 8:00 AM - 6:00 PM")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-capelton-green" />
            <a
              href="mailto:contacto@capeltonmexico.com"
              className="hover:text-black underline underline-offset-2 transition-colors"
            >
              contacto@capeltonmexico.com
            </a>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full border-t border-neutral-200/80 bg-white/60 backdrop-blur-md py-6 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-[#86868b]">
          <p>© 2026 {SITE_CONFIG.legalName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/aviso-de-privacidad"
              className="hover:text-black transition-colors"
            >
              {t("Aviso de Privacidad", "Privacy Notice")}
            </Link>
            <span className="text-neutral-300">·</span>
            <Link
              href="/terminos-y-condiciones"
              className="hover:text-black transition-colors"
            >
              {t("Términos y Condiciones", "Terms & Conditions")}
            </Link>
            <span className="text-neutral-300">·</span>
            {/* Discreet Team Preview Link */}
            <Link
              href="/preview"
              className="text-neutral-400 hover:text-capelton-green transition-colors inline-flex items-center gap-1 font-medium"
              title="Acceso de previsualización para el equipo directivo"
            >
              <span>{t("Vista previa del sitio", "Site preview")}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
