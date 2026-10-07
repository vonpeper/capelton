"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Bandera SVG de Estados Unidos (precisa, nítida y ultraligera)
export function USAFlag({ className = "w-4 h-2.5 sm:w-[18px] sm:h-[12px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 741 390"
      className={`${className} inline-block shrink-0 rounded-[2px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.15)] ring-1 ring-black/15`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="741" height="390" fill="#B22234" />
      <path
        d="M0,30h741M0,90h741M0,150h741M0,210h741M0,270h741M0,330h741"
        stroke="#FFFFFF"
        strokeWidth="30"
      />
      <rect width="296.4" height="210" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        <circle cx="24.7" cy="17.5" r="7" />
        <circle cx="74.1" cy="17.5" r="7" />
        <circle cx="123.5" cy="17.5" r="7" />
        <circle cx="172.9" cy="17.5" r="7" />
        <circle cx="222.3" cy="17.5" r="7" />
        <circle cx="271.7" cy="17.5" r="7" />
        <circle cx="49.4" cy="35" r="7" />
        <circle cx="98.8" cy="35" r="7" />
        <circle cx="148.2" cy="35" r="7" />
        <circle cx="197.6" cy="35" r="7" />
        <circle cx="247" cy="35" r="7" />
        <circle cx="24.7" cy="52.5" r="7" />
        <circle cx="74.1" cy="52.5" r="7" />
        <circle cx="123.5" cy="52.5" r="7" />
        <circle cx="172.9" cy="52.5" r="7" />
        <circle cx="222.3" cy="52.5" r="7" />
        <circle cx="271.7" cy="52.5" r="7" />
        <circle cx="49.4" cy="70" r="7" />
        <circle cx="98.8" cy="70" r="7" />
        <circle cx="148.2" cy="70" r="7" />
        <circle cx="197.6" cy="70" r="7" />
        <circle cx="247" cy="70" r="7" />
        <circle cx="24.7" cy="87.5" r="7" />
        <circle cx="74.1" cy="87.5" r="7" />
        <circle cx="123.5" cy="87.5" r="7" />
        <circle cx="172.9" cy="87.5" r="7" />
        <circle cx="222.3" cy="87.5" r="7" />
        <circle cx="271.7" cy="87.5" r="7" />
        <circle cx="49.4" cy="105" r="7" />
        <circle cx="98.8" cy="105" r="7" />
        <circle cx="148.2" cy="105" r="7" />
        <circle cx="197.6" cy="105" r="7" />
        <circle cx="247" cy="105" r="7" />
        <circle cx="24.7" cy="122.5" r="7" />
        <circle cx="74.1" cy="122.5" r="7" />
        <circle cx="123.5" cy="122.5" r="7" />
        <circle cx="172.9" cy="122.5" r="7" />
        <circle cx="222.3" cy="122.5" r="7" />
        <circle cx="271.7" cy="122.5" r="7" />
        <circle cx="49.4" cy="140" r="7" />
        <circle cx="98.8" cy="140" r="7" />
        <circle cx="148.2" cy="140" r="7" />
        <circle cx="197.6" cy="140" r="7" />
        <circle cx="247" cy="140" r="7" />
        <circle cx="24.7" cy="157.5" r="7" />
        <circle cx="74.1" cy="157.5" r="7" />
        <circle cx="123.5" cy="157.5" r="7" />
        <circle cx="172.9" cy="157.5" r="7" />
        <circle cx="222.3" cy="157.5" r="7" />
        <circle cx="271.7" cy="157.5" r="7" />
      </g>
    </svg>
  );
}

// Bandera SVG de México (nítida y proporcional)
export function MexicoFlag({ className = "w-4 h-2.5 sm:w-[18px] sm:h-[12px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 400"
      className={`${className} inline-block shrink-0 rounded-[2px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.15)] ring-1 ring-black/15`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="233.3" height="400" fill="#006847" />
      <rect x="233.3" width="233.4" height="400" fill="#FFFFFF" />
      <rect x="466.7" width="233.3" height="400" fill="#CE1126" />
      <g transform="translate(350, 200) scale(0.65)">
        <ellipse cx="0" cy="10" rx="36" ry="14" fill="#006847" opacity="0.6" />
        <circle cx="0" cy="-6" r="22" fill="#8B5A2B" />
        <circle cx="0" cy="-14" r="14" fill="#6B4423" />
        <path d="M-10,-4 Q0,-24 12,-16 Q4,-8 0,4 Z" fill="#4A3018" />
        <path d="M6,-16 L18,-14 L12,-10 Z" fill="#D4AF37" />
      </g>
    </svg>
  );
}

interface LanguageSwitcherProps {
  className?: string;
  showLabels?: boolean;
}

export default function LanguageSwitcher({
  className = "",
  showLabels = true,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const id = useId();

  return (
    <div
      role="group"
      aria-label="Selector de idioma / Language selector"
      className={`inline-flex items-center p-0.5 bg-black/[0.05] hover:bg-black/[0.07] rounded-full border border-black/8 shadow-2xs backdrop-blur-md transition-colors shrink-0 ${className}`}
    >
      {/* Opción México / Español */}
      <button
        type="button"
        onClick={() => setLanguage("es")}
        className={`relative z-10 inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
          language === "es"
            ? "text-[#1d1d1f] font-bold"
            : "text-[#6e6e73] hover:text-[#1d1d1f] opacity-70 hover:opacity-100"
        }`}
        title="Español (México)"
        aria-label="Cambiar a Español (México)"
        aria-pressed={language === "es"}
      >
        {language === "es" && (
          <motion.div
            layoutId={`activeLangPill-${id}`}
            className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.06)] border border-black/8 -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <MexicoFlag className="w-4 h-2.5 sm:w-[18px] sm:h-[12px]" />
        {showLabels && <span className="tracking-tight leading-none">ES</span>}
      </button>

      {/* Opción USA / English */}
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`relative z-10 inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
          language === "en"
            ? "text-[#1d1d1f] font-bold"
            : "text-[#6e6e73] hover:text-[#1d1d1f] opacity-70 hover:opacity-100"
        }`}
        title="English (United States)"
        aria-label="Switch to English (United States)"
        aria-pressed={language === "en"}
      >
        {language === "en" && (
          <motion.div
            layoutId={`activeLangPill-${id}`}
            className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.06)] border border-black/8 -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <USAFlag className="w-4 h-2.5 sm:w-[18px] sm:h-[12px]" />
        {showLabels && <span className="tracking-tight leading-none">EN</span>}
      </button>
    </div>
  );
}
