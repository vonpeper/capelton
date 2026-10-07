import React from "react";
import PrelaunchLanding from "@/components/PrelaunchLanding";
import MainSiteContent from "@/components/MainSiteContent";
import { SITE_CONFIG } from "@/config/site";

export default function HomePage() {
  // Si el modo pre-lanzamiento está activo, mostrar la Landing Previa con logotipo oficial,
  // mensaje de renovación y accesos directos a Venta y Renta.
  if (SITE_CONFIG.prelaunchMode) {
    return <PrelaunchLanding />;
  }

  return <MainSiteContent />;
}
