"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (esText: string, enText?: string) => string;
}

// Diccionario de traducciones globales para soporte automático o guiado
const DICTIONARY: Record<string, string> = {
  // Navbar & Global
  "Innovación": "Innovation",
  "Modelos": "Models",
  "Comparador Duo": "Duo Comparator",
  "Diferenciales": "Advantages",
  "Categorías": "Categories",
  "Sobre Nosotros": "About Us",
  "Cotizar Inmediato": "Get a Quote",
  "Innovación y Despiece": "Innovation & Breakdown",
  "Catálogo de Modelos": "Models Catalog",
  "Por qué Capelton": "Why Capelton",
  "Cotizar por WhatsApp": "Quote via WhatsApp",
  "Idioma / Language": "Language / Idioma",
  "Inicio": "Home",

  // Categories
  "Oficinas Móviles": "Mobile Offices",
  "Casetas": "Booths",
  "Casetas de Vigilancia": "Guard & Security Booths",
  "Dormitorios Móviles": "Mobile Sleeper Units",
  "Sanitarios Móviles": "Mobile Restroom Units",
  "Comedores Móviles": "Mobile Dining Units",
  "Contenedores y Minibodegas": "Containers & Mini-Storage",
  "Contenedores Marítimos": "Shipping Containers",
  "Minibodegas y Almacenes": "Mini-Storage & Warehouses",
  "Consultorios Móviles": "Mobile Medical Clinics",
  "Almacenes Industriales": "Industrial Warehouses",
  "Espacios Modulares": "Modular Spaces",
  "1 modelo": "1 model",
  "2 modelos": "2 models",
  "3 modelos": "3 models",
  "4 modelos": "4 models",
  "7 modelos": "7 models",
  "9 modelos": "9 models",
  "Línea Insignia": "Flagship Line",
  "Control de Acceso": "Access Control",
  "Campamentos": "Base Camps",
  "Higiene y Confort": "Hygiene & Comfort",
  "Grado Sanitario": "Sanitary Grade",
  "Servicio y Alimentos": "Food & Dining Service",
  "Resguardo Industrial": "Industrial Storage",
  "Salud y Brigadas": "Health & Field Care",
  "Salud y Vacunación": "Health & Vaccines",
  "Gran Capacidad": "High Capacity",
  "Bodega": "Storage",
  "Seguridad": "Security",
  "Industrial": "Industrial",
  "Líneas de Espacios Modulares": "Modular Spaces Lines",
  "(8 categorías oficiales)": "(8 official categories)",
  "Ver sección completa": "View full section",
  "Despliegue en obra": "Site deployment",
  "¿Requieres dimensiones especiales o especificación a medida?":
    "Need custom dimensions or bespoke engineering?",
  "Asesoría Técnica Directa": "Direct Technical Support",
  "Ver sección general en Home →": "View all in Home →",

  // Hero
  "Línea modular 2026": "2026 Modular Line",
  "Espacios móviles.": "Mobile Spaces.",
  "Redefinidos por la ingeniería.": "Redefined by Engineering.",
  "Oficinas ejecutivas y casetas de alta especificación con entrega inmediata en todo México.":
    "Executive offices and high-specification booths with immediate delivery across Mexico.",
  "Cotizar Venta o Renta": "Quote Sale or Rental",
  "Comparar modelos": "Compare Models",
  "RED LOGÍSTICA CAPELTON MÉXICO • COBERTURA EN LOS 32 ESTADOS":
    "CAPELTON MEXICO LOGISTICS NETWORK • 32 STATES COVERAGE",
  "NORMA NOM • ACERO CALIBRE 14 • MANIOBRA CERTIFICADA HIAB":
    "NOM STANDARD • 14-GAUGE STEEL • HIAB CERTIFIED RIGGING",
  "Modelo CM-10M • Acero Calibre 14 • Despliegue en 24h":
    "Model CM-10M • 14-Gauge Steel • 24h Deployment",
  "PLANTA MATRIZ • DESPLIEGUE NACIONAL": "MAIN PLANT • NATIONWIDE DEPLOYMENT",
  "Flota Propia Grúa Hiab • 24-48h": "Own Hiab Crane Fleet • 24-48h",
  "Polo Industrial": "Industrial Hub",

  // Duo Comparator
  "Comparador Dinámico": "Dynamic Comparator",
  "Comparador Dúo": "Duo Comparator",
  "Enfrente dos unidades modulares lado a lado": "Compare two modular units side-by-side",
  "Seleccione Modelo A": "Select Model A",
  "Seleccione Modelo B": "Select Model B",
  "Dimensiones": "Dimensions",
  "Capacidad": "Capacity",
  "Material": "Material",
  "Tiempo de Entrega": "Delivery Time",
  "Medidas": "Dimensions",
  "Peso": "Weight",
  "Peso Neto": "Net Weight",
  "Peso neto": "Net Weight",
  "Carga Máxima": "Max Load Capacity",
  "Aforo": "Capacity",
  "Equipamiento de serie": "Standard Equipment",
  "Documentación técnica": "Technical Documentation",
  "Descargar ficha PDF": "Download PDF Sheet",
  "Disponible bajo solicitud": "Available upon request",

  // Model Detail Page Specs
  "Especificación Constructiva": "Constructive Specification",
  "Equipamiento e Ingeniería de Serie": "Standard Equipment & Engineering",
  "ACERO CAL. 14": "14-GAUGE STEEL",
  "ACERO CALIBRE 14": "14-GAUGE STEEL",
  "Otros Modelos en": "Other Models in",

  // Common CTAs & Buttons
  "Conocer más": "Learn more",
  "Cotizar": "Quote",
  "Cotizar Ahora": "Quote Now",
  "Ficha Técnica": "Spec Sheet",
  "Ficha Técnica PDF": "PDF Spec Sheet",
  "Descargar Ficha Técnica Oficial (PDF)": "Download Official Spec Sheet (PDF)",
  "Cotizar Venta Inmediata": "Instant Purchase Quote",
  "Solicitar Esquema de Renta": "Request Rental Plan",
  "Hablar con un Asesor": "Speak with an Advisor",
  "Hablar con un Ingeniero Asesor": "Speak with an Engineer",
  "Chatear por WhatsApp con un Asesor": "Chat via WhatsApp with an Advisor",
  "Ver catálogo completo": "View full catalog",
  "Insignia": "Flagship",

  // Venta vs Renta
  "Modalidades de Adquisición": "Acquisition Modes",
  "Venta Directa": "Direct Purchase",
  "Renta Flexible": "Flexible Rental",
  "Patrimonio Permanente": "Permanent Asset",
  "100% Deducible (OPEX)": "100% Tax-Deductible (OPEX)",
  "Cotizar en Venta": "Get Purchase Quote",
  "Cotizar en Renta": "Get Rental Quote",
  "Cotizaciones formales en menos de 2 horas": "Formal quotes delivered in under 2 hours",
  "Disponibilidad inmediata con cobertura en toda la República": "Immediate availability with nationwide coverage",

  // Footer
  "Especialistas en ingeniería, diseño y manufactura de oficinas móviles, casetas y espacios modulares para la industria, minería, construcción y logística en todo México.":
    "Specialists in engineering, design, and manufacturing of mobile offices, guard booths, and modular spaces for industry, mining, construction, and logistics throughout Mexico.",
  "Garantía Estructural Certificada": "Certified Structural Warranty",
  "Modelos Insignia": "Flagship Models",
  "Modelos Destacados": "Featured Models",
  "Atención Inmediata": "Direct Contact",
  "WhatsApp Ventas y Rentas": "WhatsApp Sales & Rentals",
  "Cobertura y Envíos a todo México": "Nationwide Coverage & Delivery",
  "Aviso de Privacidad": "Privacy Policy",
  "Términos del Servicio": "Terms of Service",
  "Mapa del Sitio": "Sitemap",
  "Todos los derechos reservados.": "All rights reserved.",
};

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (esText: string, enText?: string) => enText || esText,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    // 1. Limpiar de raíz cualquier residuo de cookies de Google Translate que rompa React 19
    try {
      const expired = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const hostname = window.location.hostname;
      const domains = [hostname, `.${hostname}`, "", "localhost"];
      const paths = ["/", "/es", "/en", ""];

      domains.forEach((d) => {
        paths.forEach((p) => {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}; ${
            d ? `domain=${d};` : ""
          }`;
        });
      });

      // Remover cualquier iframe, script o widget residual de Google Translate
      const oldScript = document.getElementById("google-translate-script");
      if (oldScript) oldScript.remove();
      const oldElement = document.getElementById("google_translate_element");
      if (oldElement) oldElement.remove();
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.remove();

      // 2. Restaurar preferencia de idioma guardada por el usuario
      const saved = localStorage.getItem("capelton_lang") as Language | null;
      if (saved === "en" || saved === "es") {
        setLanguageState(saved);
        if (typeof document !== "undefined") {
          document.documentElement.lang = saved;
        }
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("capelton_lang", lang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    } catch (e) {
      // safe fallback
    }
  };

  const toggleLanguage = () => {
    const next = language === "es" ? "en" : "es";
    setLanguage(next);
  };

  const t = (esText: string, enText?: string): string => {
    if (language === "es") return esText;
    if (enText) return enText;
    const lookup = DICTIONARY[esText.trim()];
    return lookup || esText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
