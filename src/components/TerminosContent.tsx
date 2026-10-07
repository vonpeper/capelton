"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, FileCheck2, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/context/LanguageContext";

export default function TerminosContent() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <article className="min-h-screen bg-white text-[#1d1d1f] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6e6e73] mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            {t("Inicio", "Home")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black font-semibold">
            {t("Términos del Servicio", "Terms of Service")}
          </span>
        </nav>

        {/* Header */}
        <FadeIn direction="up">
          <div className="border-b border-black/8 pb-8 mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3 py-1 rounded-full mb-4">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>{t("Marco Contractual y Operativo", "Contractual & Operational Framework")}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
              {t("Términos y Condiciones Generales", "General Terms and Conditions")}
            </h1>
            <p className="text-sm text-[#6e6e73]">
              {t(
                `Vigencia comercial: ${currentYear} • Capelton de México S.A. de C.V.`,
                `Commercial validity: ${currentYear} • Capelton de México S.A. de C.V.`
              )}
            </p>
          </div>
        </FadeIn>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#434344]">
          <FadeIn direction="up" delay={50}>
            <section className="bg-[#fbfbfd] border border-black/8 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("1. Objeto y Alcance", "1. Purpose and Scope")}
              </h2>
              <p>
                {t(
                  "Los presentes Términos y Condiciones regulan el suministro, fabricación, venta y arrendamiento temporal de módulos prefabricados, oficinas móviles, casetas de vigilancia, dormitorios y sanitarios de obra fabricados y comercializados por Capelton de México S.A. de C.V.",
                  "These Terms and Conditions govern the manufacturing, supply, direct sale, and temporary leasing of prefabricated modular units, mobile offices, guard booths, dormitories, and jobsite restrooms manufactured and marketed by Capelton de México S.A. de C.V."
                )}
              </p>
            </section>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <section className="bg-white border border-black/8 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("2. Modalidades de Contratación: Venta y Renta", "2. Contract Modes: Sale & Rental")}
              </h2>
              <p className="mb-3">
                {t(
                  "• Venta Directa: La adquisición definitiva transfiere la propiedad de la unidad modular con factura formal CFDI y certificado de garantía de fábrica.",
                  "• Direct Purchase: Definite acquisition transfers legal ownership of the modular unit with formal CFDI tax invoice and factory warranty certificate."
                )}
              </p>
              <p>
                {t(
                  "• Renta Mensual Flexible: Los contratos de arrendamiento operativo son 100% deducibles de impuestos para el cliente en el ejercicio fiscal corriente. El arrendatario se compromete al uso conforme al manual técnico de operación.",
                  "• Flexible Monthly Rental: Operating lease contracts are 100% tax-deductible for the client in the current fiscal period. The lessee agrees to use the unit in compliance with the technical operation manual."
                )}
              </p>
            </section>
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <section className="bg-[#fbfbfd] border border-black/8 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("3. Logística, Flete y Maniobras en Sitio", "3. Logistics, Freight, and Rigging")}
              </h2>
              <p>
                {t(
                  "Las maniobras de entrega se ejecutan con transportes especializados (cama baja) y grúas articuladas Hiab. El cliente es responsable de asegurar que el acceso carretero y el terreno en obra cuenten con la nivelación y dimensiones libres requeridas para el posicionamiento seguro de la unidad.",
                  "Deliveries are performed using specialized transport (lowboy trailers) and articulated Hiab cranes. The customer is responsible for ensuring road access and ground terrain meet required leveling and clearance specifications for safe positioning."
                )}
              </p>
            </section>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <section className="bg-white border border-black/8 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("4. Garantía de Fábrica Directa", "4. Direct Factory Warranty")}
              </h2>
              <p>
                {t(
                  "Capelton garantiza la integridad estructural del chasis de acero Calibre 14 contra vicios ocultos y defectos de manufactura, así como la hermeticidad de sellos contra filtraciones pluviales bajo condiciones normales de operación en obra.",
                  "Capelton warrants the structural integrity of the 14-gauge steel chassis against hidden defects and manufacturing flaws, as well as seal watertightness under standard jobsite operating conditions."
                )}
              </p>
            </section>
          </FadeIn>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-black hover:bg-capelton-green transition-all shadow-md"
          >
            <span>{t("Volver a la Página Principal", "Return to Home Page")}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
