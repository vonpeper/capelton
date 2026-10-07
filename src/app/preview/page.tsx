import React from "react";
import type { Metadata } from "next";
import MainSiteContent from "@/components/MainSiteContent";

export const metadata: Metadata = {
  title: "Vista Previa del Sitio Oficial | Capelton México",
  description: "Entorno de previsualización interna de la plataforma completa de Capelton México.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewPage() {
  return (
    <>
      {/* Banner discreto de entorno de previsualización */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-white/20 backdrop-blur-md flex items-center gap-2 pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-capelton-green animate-pulse" />
        <span>Previsualización interna del sitio completo</span>
      </div>
      <MainSiteContent />
    </>
  );
}
