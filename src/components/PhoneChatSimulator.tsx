"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, PhoneCall, Check, CheckCheck, Send, Sparkles, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import SciFiHeading from "@/components/SciFiHeading";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_INFO } from "@/lib/data";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function PhoneChatSimulator() {
  const { t, language } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<string>("renta");

  const quickReplies = [
    {
      id: "venta",
      label: t("🏢 Cotizar Venta Directa", "🏢 Direct Purchase Quote"),
      msg: t(
        "Hola, me gustaría cotizar la compra de una caseta u oficina móvil para entrega en mi obra.",
        "Hello, I would like to quote the purchase of a guard booth or mobile office for on-site delivery."
      ),
    },
    {
      id: "renta",
      label: t("🔄 Cotizar Renta 100% Deducible", "🔄 100% Tax-Deductible Rental"),
      msg: t(
        "Hola, requiero cotizar el arrendamiento mensual de un espacio modular con entrega rápida.",
        "Hello, I need to quote a monthly modular space rental with rapid delivery."
      ),
    },
    {
      id: "catalogo",
      label: t("📄 Solicitar Catálogo y Fichas PDF", "📄 Request Catalog & PDF Specs"),
      msg: t(
        "Hola, deseo recibir el catálogo completo de modelos y fichas técnicas de Capelton.",
        "Hello, I would like to receive Capelton's complete catalog of models and technical spec sheets."
      ),
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white text-[#1d1d1f] relative overflow-hidden">
      {/* Ambient Breathing Radial Pulse in Capelton Green */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-r from-capelton-green/10 via-capelton-green/3 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse duration-[6000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Call to Action Column */}
          <div className="lg:col-span-6">
            <FadeIn direction="up">
              <span className="text-xs sm:text-sm font-semibold text-capelton-green uppercase tracking-wider block mb-3">
                {t("Atención Técnica Inmediata", "Immediate Technical Consultation")}
              </span>
              <SciFiHeading
                text={t(
                  "Respuestas al instante. Tu cotización en minutos.",
                  "Instant responses. Your quotation in minutes."
                )}
                as="h2"
                align="left"
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08] mb-6"
                showLaser={false}
                showHudTag={false}
                duration={750}
              />
              <p className="text-base text-[#6e6e73] font-normal leading-relaxed mb-8">
                {t(
                  "Sin trámites engorrosos ni esperas de días. Habla directamente con nuestros ingenieros especialistas y recibe propuestas técnicas formales con flete, maniobra y especificaciones exactas.",
                  "No tedious paperwork or days of waiting. Speak directly with our specialist engineers and receive formal technical proposals including freight, certified rigging, and exact specifications."
                )}
              </p>

              {/* Direct Phone & WhatsApp Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <a
                  href={CONTACT_INFO.ventas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", "chat_simulator_channel")}
                  className="bg-[#f5f5f7] hover:bg-neutral-100 p-4 rounded-2xl border border-black/5 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-capelton-green shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4 fill-capelton-green text-capelton-green" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#86868b] block font-medium">
                      {t("WhatsApp Ventas Directas", "Direct Sales WhatsApp")}
                    </span>
                    <strong className="text-sm font-bold text-black group-hover:text-capelton-green transition-colors">
                      {CONTACT_INFO.ventas.phone}
                    </strong>
                  </div>
                </a>

                <a
                  href={CONTACT_INFO.rentas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("rentas", "chat_simulator_channel")}
                  className="bg-[#f5f5f7] hover:bg-neutral-100 p-4 rounded-2xl border border-black/5 flex items-center gap-3.5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-capelton-green shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4 fill-capelton-green text-capelton-green" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#86868b] block font-medium">
                      {t("WhatsApp Rentas y Arrendamiento", "Rentals WhatsApp")}
                    </span>
                    <strong className="text-sm font-bold text-black group-hover:text-capelton-green transition-colors">
                      {CONTACT_INFO.rentas.phone}
                    </strong>
                  </div>
                </a>
              </div>

              {/* Action Buttons for Ventas & Rentas */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={CONTACT_INFO.ventas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("ventas", "chat_simulator_cta")}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-capelton-green hover:bg-capelton-darkgreen transition-all shadow-[0_4px_15px_rgba(0,177,64,0.3)] hover:shadow-[0_8px_25px_rgba(0,177,64,0.45)] flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{t("Chatear con Ventas", "Chat with Sales")}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={CONTACT_INFO.rentas.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("rentas", "chat_simulator_cta")}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-black bg-black/[0.05] hover:bg-black/[0.1] border border-black/10 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-capelton-green" />
                  <span>{t("Chatear con Rentas", "Chat with Rentals")}</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <div className="flex items-center gap-6 mt-6 text-xs text-[#86868b]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-capelton-green" />
                  {t("Asesoría sin compromiso", "No-obligation consultation")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-capelton-green" />
                  {t("Tiempo de respuesta < 5 min", "Response time < 5 min")}
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right Phone Simulation Column */}
          <div className="lg:col-span-6 flex justify-center">
            <FadeIn direction="up" delay={150}>
              {/* Apple iPhone 16 Pro Mockup Frame */}
              <div className="relative w-[310px] sm:w-[350px] h-[640px] bg-[#1d1d1f] rounded-[50px] p-3 shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-4 border-neutral-300 ring-1 ring-black/10 select-none">
                {/* Dynamic Island */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-950" />
                  </div>
                </div>

                {/* Inner Screen */}
                <div className="w-full h-full bg-[#f6f6f6] rounded-[42px] overflow-hidden flex flex-col justify-between pt-10 pb-4 relative">
                  {/* Chat Top Bar */}
                  <div className="px-4 py-3 bg-white/95 backdrop-blur-md border-b border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-capelton-green flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        C
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-black">Capelton México</h4>
                          <span className="w-3.5 h-3.5 rounded-full bg-capelton-green flex items-center justify-center text-white text-[8px]">
                            ✓
                          </span>
                        </div>
                        <p className="text-[10px] text-capelton-green font-medium">
                          {t("En línea ahora", "Online now")}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#86868b] font-medium bg-[#f5f5f7] px-2 py-0.5 rounded-full">
                      {t("Oficial", "Official")}
                    </span>
                  </div>

                  {/* Chat Dialogue Message Feed */}
                  <div className="p-4 space-y-3.5 overflow-y-auto flex-1 text-xs">
                    {/* Date Divider */}
                    <div className="text-center my-1">
                      <span className="text-[9px] text-[#86868b] uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full border border-black/5">
                        {t("Hoy", "Today")}
                      </span>
                    </div>

                    {/* Client Bubble */}
                    <div className="flex flex-col items-end">
                      <div className="bg-[#e1f3e7] text-neutral-900 p-3 rounded-2xl rounded-tr-xs max-w-[85%] shadow-xs leading-relaxed">
                        {t(
                          "Hola, necesito una caseta de 6M y una oficina móvil para entrega en Querétaro el próximo lunes. ¿Tienen stock disponible?",
                          "Hello, I need a 6M guard booth and a mobile office for delivery in Querétaro next Monday. Do you have units in stock?"
                        )}
                      </div>
                      <span className="text-[9px] text-[#86868b] mt-1 flex items-center gap-0.5">
                        09:41 AM <CheckCheck className="w-3 h-3 text-blue-500" />
                      </span>
                    </div>

                    {/* Capelton Advisor Bubble */}
                    <div className="flex flex-col items-start">
                      <div className="bg-white text-neutral-900 p-3 rounded-2xl rounded-tl-xs max-w-[90%] shadow-xs border border-black/5 leading-relaxed">
                        {t(
                          "¡Hola! 👋 Con gusto. Tenemos unidades listas en planta con chasis Calibre 14 y entrega garantizada en 24-48h con maniobra incluida.",
                          "Hello! 👋 Gladly. We have units ready at our plant with 14-Gauge chassis and guaranteed 24-48h delivery with placement included."
                        )}
                      </div>
                      <div className="bg-white text-neutral-900 p-3 rounded-2xl max-w-[90%] shadow-xs border border-black/5 mt-1 leading-relaxed">
                        {language === "en" ? (
                          <>Do you prefer a <strong>100% tax-deductible monthly Rental (OPEX)</strong> or a <strong>Direct asset purchase</strong>?</>
                        ) : (
                          <>¿Prefieres esquema de <strong>Renta mensual 100% deducible (OPEX)</strong> o <strong>Venta directa patrimonial</strong>?</>
                        )}
                      </div>
                      <span className="text-[9px] text-[#86868b] mt-1">
                        09:42 AM
                      </span>
                    </div>

                    {/* Interactive Quick Reply Pills inside Simulator */}
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] text-[#86868b] font-semibold block px-1">
                        {t("Selecciona para continuar a WhatsApp:", "Select to continue to WhatsApp:")}
                      </span>
                      {quickReplies.map((reply) => (
                        <a
                          key={reply.id}
                          href={
                            reply.id === "renta"
                              ? `https://wa.me/${CONTACT_INFO.rentas.waNumber}?text=${encodeURIComponent(reply.msg)}`
                              : `https://wa.me/${CONTACT_INFO.ventas.waNumber}?text=${encodeURIComponent(reply.msg)}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick(reply.id === "renta" ? "rentas" : "ventas", "simulator_quick_reply")}
                          className="w-full bg-white hover:bg-capelton-green hover:text-white p-2.5 rounded-xl border border-black/8 shadow-xs flex items-center justify-between text-[11px] font-semibold text-black transition-all group/btn"
                        >
                          <span>{reply.label}</span>
                          <ArrowRight className="w-3 h-3 text-capelton-green group-hover/btn:text-white transform group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Input Bar */}
                  <div className="px-3 pt-2 pb-1 bg-white/95 border-t border-black/5 flex items-center gap-2">
                    <div className="flex-1 bg-[#f5f5f7] px-3 py-2 rounded-full text-[11px] text-[#86868b]">
                      {t("Escribe tu mensaje...", "Type your message...")}
                    </div>
                    <a
                      href={selectedTopic === "renta" ? CONTACT_INFO.rentas.waLink : CONTACT_INFO.ventas.waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick(selectedTopic === "renta" ? "rentas" : "ventas", "simulator_send_btn")}
                      className="w-8 h-8 rounded-full bg-capelton-green text-white flex items-center justify-center hover:bg-capelton-darkgreen transition-colors"
                      title={t("Enviar por WhatsApp", "Send via WhatsApp")}
                    >
                      <Send className="w-3.5 h-3.5 fill-white" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
