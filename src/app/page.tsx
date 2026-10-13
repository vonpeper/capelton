import React from "react";
import PrelaunchLanding from "@/components/PrelaunchLanding";
import MainSiteContent from "@/components/MainSiteContent";
import { SITE_CONFIG } from "@/config/site";

export default function HomePage() {
  // En prev.capeltonmexico.com siempre se muestra el sitio completo de revisión
  if (SITE_CONFIG.prelaunchMode && SITE_CONFIG.domain !== "prev.capeltonmexico.com") {
    return <PrelaunchLanding />;
  }

  return <MainSiteContent />;
}
