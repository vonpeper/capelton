"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, MapPin, ShieldCheck } from "lucide-react";
import { categories, CONTACT_INFO } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";
import FadeIn from "@/components/FadeIn";
import { trackWhatsAppClick, trackPhoneCallClick } from "@/lib/analytics";

const pulseColumns = [
  { left: "7%", delay: 0, breatheDur: 4.8, beamDur: 5.2, nodeTop: "24%" },
  { left: "21%", delay: 1.6, breatheDur: 5.5, beamDur: 4.6, nodeTop: "68%" },
  { left: "36%", delay: 0.8, breatheDur: 4.2, beamDur: 5.8, nodeTop: "35%" },
  { left: "50%", delay: 2.3, breatheDur: 5.0, beamDur: 4.4, nodeTop: "50%" },
  { left: "64%", delay: 1.1, breatheDur: 4.6, beamDur: 5.4, nodeTop: "28%" },
  { left: "79%", delay: 2.8, breatheDur: 5.8, beamDur: 4.8, nodeTop: "72%" },
  { left: "93%", delay: 0.4, breatheDur: 4.4, beamDur: 5.0, nodeTop: "40%" },
];

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (SITE_CONFIG.prelaunchMode && pathname === "/") {
    return null;
  }

  return (
    <footer
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
      className="bg-black !bg-black text-white !text-white border-t border-white/10 pt-16 pb-12 w-full relative z-10 overflow-hidden"
    >
      {/* Dynamic SVG Grid Background with Vertical Line Pulses */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Ambient Top Subtle Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[340px] bg-[radial-gradient(ellipse_at_top,rgba(0,177,64,0.14),transparent_70%)]" />

        {/* SVG Grid with Soft Vignette Mask */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="footer-grid-pattern"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="footer-grid-vignette" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
            </radialGradient>
            <mask id="footer-vignette-mask">
              <rect width="100%" height="100%" fill="url(#footer-grid-vignette)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#footer-grid-pattern)"
            mask="url(#footer-vignette-mask)"
          />
        </svg>

        {/* Vertical Pulse Columns */}
        {pulseColumns.map((col, idx) => (
          <div
            key={idx}
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: col.left }}
          >
            {/* Base Vertical Line with Breathing Glow */}
            <div
              className="w-px h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 177, 64, 0.3) 0%, rgba(0, 177, 64, 0.12) 60%, transparent 100%)",
                animation: `footerLineBreathe ${col.breatheDur}s ease-in-out infinite ${col.delay}s`,
              }}
            />
            {/* Dynamic Traveling Beam Pulse */}
            <div
              className="absolute top-0 -left-[1px] w-[3px] h-36 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(0, 177, 64, 0.3) 25%, #00b140 70%, #6ee7b7 95%, transparent 100%)",
                filter: "drop-shadow(0 0 6px rgba(0, 177, 64, 0.9))",
                animation: `footerVerticalBeam ${col.beamDur}s cubic-bezier(0.4, 0, 0.2, 1) infinite ${col.delay}s`,
              }}
            />
            {/* Glowing Coordinate Intersection Node */}
            <div
              className="absolute w-2 h-2 rounded-full bg-capelton-green -left-[3.5px]"
              style={{
                top: col.nodeTop,
                animation: `footerNodePulse ${col.breatheDur}s ease-in-out infinite ${col.delay}s`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            {/* Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="inline-block group" aria-label="Capelton México">
                <Image
                  src="/images/logo-capelton.webp"
                  alt="Capelton México"
                  width={500}
                  height={79}
                  className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
              <p className="text-sm leading-relaxed max-w-sm text-neutral-300" style={{ color: "#d1d5db" }}>
                {t(
                  "Especialistas en ingeniería, diseño y manufactura de oficinas móviles, casetas y espacios modulares para la industria, minería, construcción y logística en todo México.",
                  "Specialists in engineering, design, and manufacturing of mobile offices, guard booths, and modular spaces for industry, mining, construction, and logistics throughout Mexico."
                )}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <span
                  style={{ backgroundColor: "rgba(0, 177, 64, 0.12)", borderColor: "rgba(0, 177, 64, 0.35)", color: "#00b140" }}
                  className="inline-flex items-center gap-1.5 text-xs text-capelton-green font-bold px-3 py-1 rounded-full border shadow-[0_0_15px_rgba(0,177,64,0.15)]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-capelton-green" />
                  {t("Garantía Estructural Certificada", "Certified Structural Warranty")}
                </span>
              </div>
            </div>

            {/* Categorías modulares */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ color: "#ffffff" }}>
                {t("Espacios Modulares", "Modular Spaces")}
              </h4>
              <ul className="space-y-2 text-xs">
                {categories.slice(0, 7).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categorias/${cat.id}`}
                      className="text-neutral-300 hover:text-capelton-green transition-colors duration-200"
                      style={{ color: "#d1d5db" }}
                    >
                      {t(cat.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modalidades y Servicios */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ color: "#ffffff" }}>
                {t("Modalidades & Servicios", "Modes & Services")}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/#modalidades" className="text-neutral-300 hover:text-capelton-green transition-colors" style={{ color: "#d1d5db" }}>
                    {t("Venta Directa de Fábrica", "Direct Factory Purchase")}
                  </Link>
                </li>
                <li>
                  <Link href="/#modalidades" className="text-neutral-300 hover:text-capelton-green transition-colors" style={{ color: "#d1d5db" }}>
                    {t("Renta 100% Deducible (OPEX)", "100% Tax-Deductible Rental")}
                  </Link>
                </li>
                <li>
                  <Link href="/#duo-comparator" className="text-neutral-300 hover:text-capelton-green transition-colors" style={{ color: "#d1d5db" }}>
                    {t("Comparador Técnico Dúo", "Duo Technical Comparator")}
                  </Link>
                </li>
                <li>
                  <Link href="/#modelos" className="text-neutral-300 hover:text-capelton-green transition-colors" style={{ color: "#d1d5db" }}>
                    {t("Catálogo de 31 Configuraciones", "Catalog of 31 Configurations")}
                  </Link>
                </li>
                <li>
                  <Link href="/#por-que-capelton" className="text-neutral-300 hover:text-capelton-green transition-colors" style={{ color: "#d1d5db" }}>
                    {t("Despliegue Inmediato 24-48h", "Rapid 24-48h Deployment")}
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="text-neutral-300 hover:text-capelton-green transition-colors" style={{ color: "#d1d5db" }}>
                    {t("Flete y Maniobras con Grúa Hiab", "Freight & Hiab Crane Rigging")}
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="text-neutral-300 hover:text-capelton-green transition-colors" style={{ color: "#d1d5db" }}>
                    {t("Póliza de Garantía Estructural", "Structural Warranty Policy")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto Directo */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white" style={{ color: "#ffffff" }}>
                {t("Atención Inmediata", "Direct Contact")}
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-capelton-green shrink-0" style={{ color: "#00b140" }} />
                  <a
                    href={CONTACT_INFO.ventas.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("ventas", "footer_link")}
                    className="text-neutral-300 hover:text-capelton-green transition-colors"
                    style={{ color: "#d1d5db" }}
                  >
                    <span className="font-semibold text-white">{t("WhatsApp Ventas:", "WhatsApp Sales:")}</span>{" "}
                    {CONTACT_INFO.ventas.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-capelton-green shrink-0" style={{ color: "#00b140" }} />
                  <a
                    href={CONTACT_INFO.rentas.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("rentas", "footer_link")}
                    className="text-neutral-300 hover:text-capelton-green transition-colors"
                    style={{ color: "#d1d5db" }}
                  >
                    <span className="font-semibold text-white">{t("WhatsApp Rentas:", "WhatsApp Rentals:")}</span>{" "}
                    {CONTACT_INFO.rentas.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a
                    href={CONTACT_INFO.ventas.telHref}
                    onClick={() => trackPhoneCallClick("ventas", CONTACT_INFO.ventas.phone, "footer_pbx")}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {t("Línea PBX:", "PBX Line:")} {CONTACT_INFO.ventas.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-capelton-green shrink-0" style={{ color: "#00b140" }} />
                  <span className="text-neutral-300" style={{ color: "#d1d5db" }}>
                    {t("Cobertura y Envíos a todo México", "Nationwide Coverage & Delivery")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Apple-style Bottom Disclaimer & Credits */}
        <FadeIn direction="up" delay={80}>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-4" style={{ color: "#9ca3af" }}>
            <div>
              <p>© {currentYear} Capelton de México S.A. de C.V. {t("Todos los derechos reservados.", "All rights reserved.")}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/aviso-de-privacidad" className="hover:text-capelton-green transition-colors">
                {t("Aviso de Privacidad", "Privacy Policy")}
              </Link>
              <Link href="/terminos-y-condiciones" className="hover:text-capelton-green transition-colors">
                {t("Términos del Servicio", "Terms of Service")}
              </Link>
              <Link href="/sitemap.xml" className="hover:text-capelton-green transition-colors">
                {t("Mapa del Sitio", "Sitemap")}
              </Link>
            </div>
            <div className="text-neutral-400 text-xs text-center md:text-right">
              <span>{t("Desarrollo web por", "Web development by")}{" "}</span>
              <a
                href="https://prosuite.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-200 hover:text-capelton-green font-medium transition-colors underline-offset-4 hover:underline"
              >
                prosuite.mx
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
