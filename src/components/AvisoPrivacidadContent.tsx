"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Mail, Phone, MapPin, FileText } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/lib/data";

export default function AvisoPrivacidadContent() {
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
            {t("Aviso de Privacidad", "Privacy Notice")}
          </span>
        </nav>

        {/* Header */}
        <FadeIn direction="up">
          <div className="border-b border-black/8 pb-8 mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-capelton-green bg-capelton-green/10 px-3 py-1 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("Protección de Datos Personales", "Personal Data Protection")}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
              {t("Aviso de Privacidad Integral", "Comprehensive Privacy Notice")}
            </h1>
            <p className="text-sm text-[#6e6e73]">
              {t(
                `Última actualización: Enero ${currentYear} • Cumplimiento LFPDPPP`,
                `Last updated: January ${currentYear} • LFPDPPP Compliance`
              )}
            </p>
          </div>
        </FadeIn>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#434344]">
          {/* Section 1 */}
          <FadeIn direction="up" delay={50}>
            <section className="bg-[#fbfbfd] border border-black/8 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t(
                  "1. Identidad y Domicilio del Responsable",
                  "1. Identity and Address of the Data Controller"
                )}
              </h2>
              <p className="mb-3">
                {language === "en" ? (
                  <>
                    <strong className="text-black">Capelton de México S.A. de C.V.</strong>, operating commercially as Capelton México, with address for notifications regarding personal data at Carretera Federal México-Puebla Km 28.5, Ixtapaluca, Estado de México, C.P. 56530, is responsible for the collection, treatment, and protection of your personal data in accordance with the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP).
                  </>
                ) : (
                  <>
                    <strong className="text-black">Capelton de México S.A. de C.V.</strong>, operando comercialmente como Capelton México, con domicilio para oír y recibir notificaciones relacionadas con datos personales en Carretera Federal México-Puebla Km 28.5, Ixtapaluca, Estado de México, C.P. 56530, es responsable del uso, tratamiento y protección de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
                  </>
                )}
              </p>
            </section>
          </FadeIn>

          {/* Section 2 */}
          <FadeIn direction="up" delay={100}>
            <section className="bg-white border border-black/8 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("2. Datos Personales que Recabamos", "2. Personal Data We Collect")}
              </h2>
              <p className="mb-4">
                {t(
                  "Para brindarle atención comercial, cotizaciones técnicas, contratos de arrendamiento y entrega en sitio de espacios modulares, podemos recabar los siguientes datos:",
                  "To provide commercial assistance, technical quotes, rental lease contracts, and on-site delivery of modular spaces, we may collect the following data:"
                )}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#434344]">
                <li>
                  <strong>{t("Datos de Identificación y Contacto:", "Identification & Contact Data:")}</strong>{" "}
                  {t(
                    "Nombre completo, cargo, empresa o razón social, teléfono móvil de contacto, teléfono de oficina y correo electrónico institucional.",
                    "Full name, job title, company name, contact mobile phone, office phone, and corporate email."
                  )}
                </li>
                <li>
                  <strong>{t("Datos Fiscales y de Facturación:", "Tax & Invoicing Data:")}</strong>{" "}
                  {t(
                    "Registro Federal de Contribuyentes (RFC), Constancia de Situación Fiscal (CSF), domicilio fiscal y régimen tributario.",
                    "Federal Taxpayer Registry (RFC), Tax Status Certificate (CSF), fiscal address, and tax regime."
                  )}
                </li>
                <li>
                  <strong>{t("Datos de Logística y Obra:", "Logistics & Site Data:")}</strong>{" "}
                  {t(
                    "Dirección de entrega, coordenadas GPS de la obra, condiciones del terreno, requisitos de acceso para transporte en cama baja y grúa Hiab, y datos de los receptores autorizados en sitio.",
                    "Delivery address, project site GPS coordinates, ground terrain conditions, lowboy truck and Hiab crane access requirements, and authorized site recipient contact info."
                  )}
                </li>
              </ul>
            </section>
          </FadeIn>

          {/* Section 3 */}
          <FadeIn direction="up" delay={150}>
            <section className="bg-[#fbfbfd] border border-black/8 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("3. Finalidades del Tratamiento", "3. Purposes of Processing")}
              </h2>
              <p className="font-semibold text-black mb-2 text-xs uppercase tracking-wider">
                {t("Finalidades Primarias (Necesarias):", "Primary Purposes (Necessary):")}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm mb-6">
                <li>{t("Elaboración y envío de cotizaciones comerciales formales de venta o renta.", "Preparation and delivery of formal purchase or rental quotes.")}</li>
                <li>{t("Celebración y ejecución de contratos de compraventa o arrendamiento modular.", "Execution and performance of modular sale or rental lease agreements.")}</li>
                <li>{t("Emisión de Comprobantes Fiscales Digitales por Internet (CFDI).", "Issuance of official digital tax invoices (CFDI).")}</li>
                <li>{t("Coordinación de maniobras logísticas, fletes terrestres, descarga y nivelación en sitio.", "Coordination of logistics freight, unloading, and on-site leveling.")}</li>
                <li>{t("Soporte postventa, póliza de garantía estructural y atención a garantías.", "After-sales support, structural warranty policy, and maintenance requests.")}</li>
              </ul>

              <p className="font-semibold text-black mb-2 text-xs uppercase tracking-wider">
                {t("Finalidades Secundarias:", "Secondary Purposes:")}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>{t("Envío de catálogos actualizados y fichas técnicas de nuevos modelos.", "Sending updated catalogs and spec sheets of new models.")}</li>
                <li>{t("Encuestas de satisfacción y calidad en el servicio de entrega e instalación.", "Customer satisfaction surveys regarding delivery and installation quality.")}</li>
              </ul>
            </section>
          </FadeIn>

          {/* Section 4 */}
          <FadeIn direction="up" delay={200}>
            <section className="bg-white border border-black/8 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("4. Ejercicio de Derechos ARCO", "4. Exercise of ARCO Rights")}
              </h2>
              <p className="mb-4">
                {t(
                  "Usted tiene derecho a Conocer qué datos personales tenemos de usted, para qué los utilizamos (Acceso); solicitar la corrección de su información en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros cuando considere que no está siendo utilizada adecuadamente (Cancelación); así como Oponerse al uso de sus datos personales para fines específicos (Oposición).",
                  "You have the right to know what personal data we hold about you, what we use it for (Access); request correction of your information if outdated, inaccurate, or incomplete (Rectification); request removal from our records when you consider it is not being properly handled (Cancellation); and object to the processing of your data for specific purposes (Opposition)."
                )}
              </p>
              <div className="bg-[#f5f5f7] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-black">
                    {t("Unidad de Atención ARCO Capelton:", "Capelton ARCO Contact Office:")}
                  </p>
                  <p className="text-xs text-[#6e6e73]">
                    {t("Correo electrónico directo para solicitudes:", "Direct email for formal requests:")}{" "}
                    <a href="mailto:ventas@capeltonmexico.com" className="text-capelton-green font-semibold underline">
                      ventas@capeltonmexico.com
                    </a>
                  </p>
                </div>
                <a
                  href={CONTACT_INFO.ventas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-black hover:bg-capelton-green transition-all shrink-0"
                >
                  {t("Contactar Asesor Legal", "Contact Advisor")}
                </a>
              </div>
            </section>
          </FadeIn>

          {/* Section 5 */}
          <FadeIn direction="up" delay={250}>
            <section className="bg-[#fbfbfd] border border-black/8 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("5. Uso de Cookies y Tecnologías Digitales", "5. Use of Cookies and Digital Technologies")}
              </h2>
              <p className="mb-3">
                {t(
                  "Nuestro sitio web capeltonmexico.com utiliza cookies técnicas y analíticas para optimizar el rendimiento de la plataforma, almacenar las preferencias de idioma (español/inglés) y analizar métricas anónimas de navegación. Usted puede configurar su navegador web en cualquier momento para rechazar o eliminar las cookies.",
                  "Our website capeltonmexico.com uses technical and analytical cookies to optimize platform performance, store language preferences (Spanish/English), and analyze anonymous traffic metrics. You may configure your web browser at any time to reject or remove cookies."
                )}
              </p>
            </section>
          </FadeIn>

          {/* Section 6 */}
          <FadeIn direction="up" delay={300}>
            <section className="bg-white border border-black/8 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-3">
                {t("6. Modificaciones al Aviso de Privacidad", "6. Changes to the Privacy Notice")}
              </h2>
              <p>
                {t(
                  "El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o de nuestras propias prácticas comerciales. Cualquier cambio sustancial será publicado directamente en este mismo sitio web oficial.",
                  "This privacy notice may undergo modifications, updates, or amendments resulting from new legal requirements or our internal business practices. Any material change will be published directly on this official website."
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
