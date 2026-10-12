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
  // Navbar & Global Proposed Navigation
  "Productos": "Products",
  "Proyectos": "Projects",
  "Cómo construimos": "How We Build",
  "Soluciones": "Solutions",
  "Nosotros": "About",
  "Venta y Renta": "Sales & Rentals",
  "Venta renta": "Sales & Rentals",
  "Cotización": "Request a Quote",
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

  // Categories & US Official Terminology (PDF Page 4)
  "Oficinas móviles": "Mobile Offices",
  "Oficinas Móviles": "Mobile Offices",
  "Casetas": "Portable Booths",
  "Casetas de Vigilancia": "Portable Booths",
  "Dormitorios móviles": "Crew Quarters",
  "Dormitorios Móviles": "Crew Quarters",
  "Sanitarios móviles": "Restroom Units",
  "Sanitarios Móviles": "Restroom Units",
  "Comedores móviles": "Dining Units",
  "Comedores Móviles": "Dining Units",
  "Bodegas": "Storage Units",
  "Contenedores y Minibodegas": "Storage Units",
  "Contenedores Marítimos": "Storage Units",
  "Minibodegas y Almacenes": "Storage Units",
  "Consultorios móviles": "Mobile Medical Units",
  "Consultorios Móviles": "Mobile Medical Units",
  "Proyectos especiales": "Custom Builds",
  "Espacios modulares": "Modular Spaces",
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
  "Salud y Vacunación": "Health & Field Care",
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

  // Hero Section
  "Oficinas móviles diseñadas para tu operación.":
    "Mobile Offices Built Around Your Operation.",
  "Fabricamos espacios de trabajo móviles para la industria, la construcción y proyectos que necesitan soluciones prácticas, confiables y adaptadas a sus necesidades.":
    "We design and manufacture mobile workspaces for jobsites, teams, and demanding operations. Standard configurations where they work. Custom solutions where they matter.",
  "Explorar productos": "Explore Products",
  "Solicitar cotización": "Request a Quote",
  "RED LOGÍSTICA CAPELTON MÉXICO • COBERTURA EN LOS 32 ESTADOS":
    "CAPELTON MEXICO LOGISTICS NETWORK • 32 STATES COVERAGE",
  "Unidad de referencia CM-10M. Las configuraciones y especificaciones varían por modelo.":
    "Reference unit CM-10M. Configurations and specifications vary by model.",
  "PLANTA MATRIZ • DESPLIEGUE NACIONAL": "MAIN PLANT • NATIONWIDE DEPLOYMENT",
  "Flota Propia Grúa Hiab • 24-48h": "Own Hiab Crane Fleet • 24-48h",
  "Polo Industrial": "Industrial Hub",

  // Cómo construimos nuestros espacios móviles (Ficha técnica & Anatomía)
  "Cómo construimos nuestros espacios móviles": "How We Build Our Mobile Spaces",
  "Exteriores": "Exterior Architecture",
  "Interiores": "Interior Systems",
  "Perspectiva Exterior": "Exterior View",
  "Detalle Interior": "Interior View",
  "Chasis estructural reforzado": "Reinforced Steel Chassis",
  "Muros aislados": "Insulated Walls",
  "Techo de aluminio de una pieza": "One-Piece Aluminum Roof",
  "Ventanas abatibles": "Awning Windows",
  "Accesos y soportes": "Access & Leveling Supports",
  "Piso SPC": "SPC Rigid Core Flooring",
  "Iluminación LED": "LED Lighting",
  "Sistema de aire acondicionado": "Air Conditioning System",
  "Instalación eléctrica": "Electrical Installation",
  "Distribución y mobiliario según configuración": "Custom Layout & Furniture by Config",

  // Comparador de Modelos
  "Encuentra la unidad adecuada para tu proyecto.":
    "Find the Right Unit for Your Project.",
  "Compara dimensiones, capacidad, distribución y equipamiento entre nuestros modelos. Apóyate de las fichas técnicas.":
    "Compare dimensions, capacity, layout, and equipment between our models. Backed by official technical sheets.",
  "Plano de Distribución Interior": "Interior Floor Plan",
  "Equipamiento de Serie": "Standard Equipment",
  "Diferencial y Ventaja del Modelo": "Model Differentiator & Advantages",
  "Recomendación Operativa": "Operational Recommendation",
  "Seleccione Modelo A": "Select Model A",
  "Seleccione Modelo B": "Select Model B",
  "Dimensiones": "Dimensions",
  "Capacidad": "Capacity",
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

  // Catálogo Curado y General
  "Selección curada de los módulos más solicitados por la industria y la construcción en México.":
    "Curated selection of the most requested modular units across industry and construction in Mexico.",
  "Selección curada de los módulos más solicitados":
    "Curated selection of top modular units",
  "Unidades a la medida de cada operación.":
    "Tailored units for every operation.",
  "UNIDADES A LA MEDIDA DE CADA OPERACIÓN":
    "TAILORED UNITS FOR EVERY OPERATION",

  // Proyectos y Clientes
  "Clientes que confían en Capelton": "Clients who trust Capelton",
  "Instalaciones y Proyectos": "Installations & Projects",
  "Alianzas y Distribuidores": "Alliances & Distributors",
  "Distribuidor Autorizado Oficial": "Official Authorized Distributor",
  "Empresa Hermana de Capelton": "Capelton Sister Company",
  "Necesidad": "Client Need",
  "Solución entregada": "Delivered Solution",
  "Aplicación real": "Field Application",

  // Por Qué Capelton (3 Fundamentos)
  "Entendemos tu operación": "Understand the Operation",
  "Consideramos quién utilizará la unidad, qué actividades realizará y cuáles son las condiciones del entorno.":
    "We consider who will use the unit, the activities performed, and specific environmental conditions.",
  "Fabricamos con propósito": "Build with Purpose",
  "Partimos de soluciones probadas y adaptamos distribuciones, acabados y equipamiento cuando el proyecto lo requiere.":
    "We start from proven solutions and adapt layouts, finishes, and equipment when the project requires it.",
  "Acompañamos cada entrega": "Deliver with Care",
  "Coordinamos la preparación y el traslado para que cada espacio llegue donde la operación lo necesita.":
    "We coordinate preparation and logistics so each space arrives exactly where your operation demands.",

  // WhatsApp & Asesoría
  "Hablemos de lo que necesita tu proyecto.":
    "Let's talk about what your project needs.",
  "Nuestro equipo puede ayudarte a revisar configuraciones, especificaciones y opciones de entrega para encontrar una solución adecuada.":
    "Our team can help you review configurations, specifications, and delivery options to find the right solution.",

  // Capelton en Acción
  "Capelton en Acción.": "Capelton in Action.",
  "Historias de nuestros proyectos": "Stories from our projects",
  "Videos en planta y campo": "Factory & field videos",
  "Procesos reales de fabricación, pruebas de calidad y maniobras de entrega en campo.":
    "Real manufacturing processes, quality testing, and on-site delivery maneuvers.",

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
  "Cotizar en Venta": "Get Purchase Quote",
  "Cotizar en Renta": "Get Rental Quote",
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
