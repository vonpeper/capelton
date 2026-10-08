"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  MessageCircle,
  Phone,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SITE_CONFIG } from "@/config/site";
import { trackWhatsAppClick, trackPhoneCallClick } from "@/lib/analytics";

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
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] bg-gradient-to-b from-amber-500/10 via-capelton-green/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
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
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center text-center my-auto">
        {/* Official Brand Logo */}
        <div className="mb-6 sm:mb-8 transition-transform duration-300 hover:scale-[1.02]">
          <Image
            src="/images/logo-capelton.webp"
            alt="Capelton México"
            width={480}
            height={76}
            priority
            className="h-10 sm:h-13 md:h-14 w-auto object-contain mx-auto drop-shadow-sm"
          />
        </div>

        {/* Big Warning Icon for Under-Construction / Platform Work */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-500/10 border-2 border-amber-500/35 flex items-center justify-center text-amber-500 shadow-[0_0_45px_rgba(245,158,11,0.25)]">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 stroke-[2.2] animate-bounce duration-[2000ms]" />
          </div>
          <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {t("En Construcción", "Under Construction")}
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.15] max-w-2xl mt-3 mb-3">
          {t("Casetas, Oficinas Móviles y Espacios Modulares", "Booths, Mobile Offices & Modular Spaces")}
        </h1>
        <p className="text-sm sm:text-base font-medium text-capelton-darkgreen mb-3">
          Capelton México · {t("Ingeniería y Manufactura Directa", "Direct Engineering & Manufacturing")}
        </p>

        {/* Texto breve y directo */}
        <div className="max-w-xl mx-auto mb-8 text-sm sm:text-base text-[#515154] leading-relaxed">
          <p>
            {t(
              "Estamos actualizando nuestra plataforma digital.",
              "We are updating our digital platform."
            )}{" "}
            <strong className="text-black font-semibold">
              {t(
                "Nuestras operaciones de fabricación, venta y renta continúan al 100% con total normalidad.",
                "Our manufacturing, sales and rental operations continue normally at 100% capacity."
              )}
            </strong>{" "}
            {t(
              "Contáctanos directamente para cotizar tu proyecto:",
              "Contact us directly to quote your project:"
            )}
          </p>
        </div>

        {/* VENTA and RENTA Cards Grid (Simple, direct, non-committal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-3xl text-left">
          {/* Card 1: VENTA DIRECTA */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-neutral-200/90 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                  {t("Compra Directa", "Direct Purchase")}
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                  <ShieldCheck className="w-4 h-4 text-capelton-green" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-1.5">
                {t(contact.ventas.label, "Direct Purchase")}
              </h2>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed mb-4">
                {t(
                  "Adquisición y cotización de oficinas móviles, casetas y espacios modulares para tus proyectos.",
                  "Quotation and acquisition of mobile offices, guard booths, and modular spaces for your projects."
                )}
              </p>

              {/* Simple Non-committal Points */}
              <ul className="space-y-2 mb-6 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Unidades nuevas y a la medida de tu proyecto", "New units tailored to your project")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Atención comercial y asesoría técnica directa", "Direct commercial and technical support")}</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <a
                href={contact.ventas.waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("ventas", "prelaunch_card")}
                className="w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-black hover:bg-capelton-green transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t("Cotizar en Venta por WhatsApp", "Get Purchase Quote via WhatsApp")}</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </a>

              <a
                href={contact.ventas.telHref}
                onClick={() => trackPhoneCallClick("ventas", contact.ventas.phone)}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>
                  {t("Llamar a Ventas:", "Call Sales:")}{" "}
                  <strong className="text-black">{contact.ventas.phone}</strong>
                </span>
              </a>
            </div>
          </div>

          {/* Card 2: RENTA DE UNIDADES */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,177,64,0.05)] border-2 border-capelton-green/35 hover:border-capelton-green hover:shadow-[0_16px_40px_rgba(0,177,64,0.12)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3 py-1 rounded-full">
                  {t("Arrendamiento", "Leasing")}
                </span>
                <div className="w-8 h-8 rounded-full bg-capelton-green/10 flex items-center justify-center text-capelton-green">
                  <Clock className="w-4 h-4 text-capelton-green" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-1.5">
                {t(contact.rentas.label, "Flexible Rental")}
              </h2>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed mb-4">
                {t(
                  "Arrendamiento de casetas y oficinas móviles para obras y campamentos temporales.",
                  "Rental of booths and mobile offices for construction sites and temporary projects."
                )}
              </p>

              {/* Simple Non-committal Points */}
              <ul className="space-y-2 mb-6 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Esquemas de renta mensual o por proyecto", "Monthly or project-based rental terms")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-capelton-green shrink-0" />
                  <span>{t("Disponibilidad y entrega de flota en sitio", "Fleet availability and on-site delivery")}</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <a
                href={contact.rentas.waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("rentas", "prelaunch_card")}
                className="w-full py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all duration-300 shadow-[0_4px_16px_rgba(0,177,64,0.3)] hover:shadow-[0_6px_22px_rgba(0,177,64,0.45)] flex items-center justify-center gap-2 group/btn"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t("Cotizar en Renta por WhatsApp", "Get Rental Quote via WhatsApp")}</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </a>

              <a
                href={contact.rentas.telHref}
                onClick={() => trackPhoneCallClick("rentas", contact.rentas.phone)}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-capelton-green" />
                <span>
                  {t("Llamar a Rentas:", "Call Rentals:")}{" "}
                  <strong className="text-black">{contact.rentas.phone}</strong>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Corporate Information (Planta y oficinas Metepec, Horario y Correo) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-[#6e6e73]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-capelton-green" />
            <span>{SITE_CONFIG.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-capelton-green" />
            <span>{t("Horario: " + SITE_CONFIG.schedule, "Hours: Mon - Sat until 6:00 PM")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-capelton-green" />
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-black font-medium underline underline-offset-2 hover:text-capelton-green transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full border-t border-neutral-200/80 bg-white/70 backdrop-blur-md py-5 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-[#86868b]">
          <p>© 2026 {SITE_CONFIG.legalName} · {SITE_CONFIG.domain}</p>
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
