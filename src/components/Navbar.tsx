"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Building2,
  Shield,
  Bed,
  Bath,
  Utensils,
  Box,
  Warehouse,
  HeartPulse,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import { CONTACT_INFO } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";

const categoriesList = [
  {
    id: "oficinas",
    name: "Oficinas Móviles",
    models: "9 modelos",
    badge: "Línea Insignia",
    icon: Building2,
  },
  {
    id: "casetas",
    name: "Casetas",
    models: "3 modelos",
    badge: "Control de Acceso",
    icon: Shield,
  },
  {
    id: "dormitorios",
    name: "Dormitorios Móviles",
    models: "7 modelos",
    badge: "Campamentos",
    icon: Bed,
  },
  {
    id: "sanitarios",
    name: "Sanitarios Móviles",
    models: "2 modelos",
    badge: "Grado Sanitario",
    icon: Bath,
  },
  {
    id: "comedores",
    name: "Comedores Móviles",
    models: "3 modelos",
    badge: "Industrial",
    icon: Utensils,
  },
  {
    id: "contenedores",
    name: "Contenedores Marítimos",
    models: "1 modelo",
    badge: "Bodega",
    icon: Box,
  },
  {
    id: "almacenes",
    name: "Minibodegas y Almacenes",
    models: "2 modelos",
    badge: "Seguridad",
    icon: Warehouse,
  },
  {
    id: "salud",
    name: "Consultorios Móviles",
    models: "4 modelos",
    badge: "Salud y Vacunación",
    icon: HeartPulse,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (SITE_CONFIG.prelaunchMode && pathname === "/") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-black/8 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          : "bg-white/70 backdrop-blur-md border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Capelton México">
            <Image
              src="/images/logo-capelton.webp"
              alt="Capelton México"
              width={500}
              height={79}
              priority
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold tracking-wide uppercase">
            <Link
              href="/#scrollytelling"
              className="text-[#515154] hover:text-black transition-colors duration-200"
            >
              {t("Innovación", "Innovation")}
            </Link>
            <Link
              href="/#modelos"
              className="text-[#515154] hover:text-black transition-colors duration-200"
            >
              {t("Modelos", "Models")}
            </Link>
            <Link
              href="/#duo-comparator"
              className="text-[#515154] hover:text-black transition-colors duration-200 flex items-center gap-1.5"
            >
              <span>{t("Comparador Duo", "Duo Comparator")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-capelton-green animate-pulse"></span>
            </Link>
            <Link
              href="/#por-que-capelton"
              className="text-[#515154] hover:text-black transition-colors duration-200"
            >
              {t("Diferenciales", "Advantages")}
            </Link>
            {/* Categorías Dropdown Trigger & Popover */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`flex items-center gap-1 uppercase transition-colors duration-200 py-1 ${
                  categoriesDropdownOpen ? "text-black" : "text-[#515154] hover:text-black"
                }`}
                aria-expanded={categoriesDropdownOpen}
              >
                <span>{t("Categorías", "Categories")}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    categoriesDropdownOpen ? "rotate-180 text-capelton-green" : "text-[#86868b]"
                  }`}
                />
              </button>

              {/* Desktop Floating Megamenu Dropdown */}
              {categoriesDropdownOpen && (
                <div className="absolute top-full -left-48 xl:-left-36 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="w-[660px] bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.14)] border border-black/8 select-none">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-black/6">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-capelton-green" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-black">
                          {t("Líneas de Espacios Modulares", "Modular Spaces Lines")}
                        </span>
                        <span className="text-[10px] text-[#86868b] font-normal normal-case">
                          {t("(8 categorías oficiales)", "(8 official categories)")}
                        </span>
                      </div>
                      <Link
                        href="/#categorias"
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="text-[11px] font-semibold text-[#0066cc] hover:underline flex items-center gap-1 normal-case"
                      >
                        <span>{t("Ver sección completa", "View full section")}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* 2-Column Categories Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {categoriesList.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/#cat-${cat.id}`}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#f5f5f7] transition-all duration-150 group text-left"
                        >
                          <div className="w-9 h-9 rounded-xl bg-capelton-green/10 text-capelton-green flex items-center justify-center shrink-0 group-hover:bg-capelton-green group-hover:text-white transition-colors duration-200">
                            <cat.icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-black group-hover:text-capelton-green transition-colors truncate normal-case">
                                {t(cat.name)}
                              </span>
                              <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-black/[0.04] text-[#86868b] shrink-0 normal-case">
                                {t(cat.badge)}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#6e6e73] font-normal block truncate normal-case">
                              {t(cat.models)} • {t("Despliegue en obra", "Site deployment")}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Bottom Quick Advice Bar */}
                    <div className="mt-3 pt-3 border-t border-black/6 flex items-center justify-between text-[11px] text-[#6e6e73] px-1 normal-case">
                      <span>{t("¿Requieres dimensiones especiales o especificación a medida?", "Need custom dimensions or bespoke engineering?")}</span>
                      <a
                        href="https://wa.link/n81wvt"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick("ventas", "navbar_quick_advice")}
                        className="font-semibold text-capelton-green hover:underline flex items-center gap-1"
                      >
                        <span>{t("Asesoría Técnica Directa", "Direct Technical Support")}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/nosotros"
              className="text-[#515154] hover:text-black transition-colors duration-200"
            >
              {t("Sobre Nosotros", "About Us")}
            </Link>
          </nav>

          {/* CTA Buttons & Language Switcher (Ventas & Rentas) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a
              href={CONTACT_INFO.ventas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("ventas", "navbar_desktop_cta")}
              title={t("WhatsApp Ventas Directas: 55 2964 0104", "WhatsApp Sales: +52 55 2964 0104")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all duration-300 shadow-[0_2px_10px_rgba(0,177,64,0.3)] hover:shadow-[0_4px_15px_rgba(0,177,64,0.45)]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>{t("Ventas", "Sales")}</span>
            </a>

            <a
              href={CONTACT_INFO.rentas.waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("rentas", "navbar_desktop_cta")}
              title={t("WhatsApp Rentas y Arrendamiento: 55 7948 3632", "WhatsApp Rentals: +52 55 7948 3632")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 transition-all duration-300"
            >
              <MessageCircle className="w-3.5 h-3.5 text-capelton-green" />
              <span>{t("Rentas", "Rentals")}</span>
            </a>

            {/* Selector de Idioma con ambas banderas: México y USA */}
            <LanguageSwitcher />
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher className="sm:hidden" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-black hover:bg-black/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-black/10 flex flex-col gap-4 animate-fade-in bg-white/95 p-4 rounded-2xl shadow-xl">
            <Link
              href="/#scrollytelling"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-black hover:text-capelton-green"
            >
              {t("Innovación y Despiece", "Innovation & Breakdown")}
            </Link>
            <Link
              href="/#modelos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-black hover:text-capelton-green"
            >
              {t("Catálogo de Modelos", "Models Catalog")}
            </Link>
            <Link
              href="/#duo-comparator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-black hover:text-capelton-green flex items-center justify-between"
            >
              <span>{t("Comparador Duo", "Duo Comparator")}</span>
              <span className="text-[10px] bg-capelton-green/10 text-capelton-green font-bold px-2 py-0.5 rounded-full">
                {t("Interactivo", "Interactive")}
              </span>
            </Link>
            <Link
              href="/#por-que-capelton"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-black hover:text-capelton-green"
            >
              {t("Por qué Capelton", "Why Capelton")}
            </Link>
            {/* Categorías Accordion */}
            <div className="flex flex-col border-y border-black/5 py-1">
              <button
                type="button"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="text-sm font-semibold text-black hover:text-capelton-green flex items-center justify-between py-1.5"
              >
                <span>{t("Categorías", "Categories")}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#86868b] transition-transform duration-200 ${
                    mobileCategoriesOpen ? "rotate-180 text-capelton-green" : ""
                  }`}
                />
              </button>
              {mobileCategoriesOpen && (
                <div className="grid grid-cols-1 gap-1.5 pl-3 pt-1.5 pb-1 border-l-2 border-capelton-green/40 mt-1 animate-in fade-in duration-200">
                  {categoriesList.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/#cat-${cat.id}`}
                      onClick={() => {
                        setMobileCategoriesOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between py-1.5 text-xs font-medium text-[#515154] hover:text-capelton-green group"
                    >
                      <span className="flex items-center gap-2">
                        <cat.icon className="w-3.5 h-3.5 text-capelton-green shrink-0" />
                        <span className="text-black group-hover:text-capelton-green font-semibold">
                          {t(cat.name)}
                        </span>
                      </span>
                      <span className="text-[10px] text-[#86868b]">
                        {t(cat.models)}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/#categorias"
                    onClick={() => {
                      setMobileCategoriesOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="text-[11px] font-semibold text-[#0066cc] pt-1.5 flex items-center gap-1"
                  >
                    <span>{t("Ver sección general en Home →", "View all in Home →")}</span>
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-black hover:text-capelton-green"
            >
              {t("Sobre Nosotros", "About Us")}
            </Link>
            <div className="pt-3 border-t border-black/8 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-[#515154]">{t("Idioma / Language", "Language / Idioma")}</span>
                <LanguageSwitcher />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={CONTACT_INFO.ventas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", "navbar_mobile_menu")}
                  className="w-full text-center py-2.5 rounded-full text-xs font-bold text-white bg-capelton-green shadow-md hover:bg-capelton-darkgreen transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>{t("Ventas", "Sales")}</span>
                </a>
                <a
                  href={CONTACT_INFO.rentas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("rentas", "navbar_mobile_menu")}
                  className="w-full text-center py-2.5 rounded-full text-xs font-bold text-black bg-black/[0.05] hover:bg-black/[0.08] border border-black/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-capelton-green" />
                  <span>{t("Rentas", "Rentals")}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
