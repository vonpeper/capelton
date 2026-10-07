import React from "react";
import PrelaunchLanding from "@/components/PrelaunchLanding";
import MainSiteContent from "@/components/MainSiteContent";
import { SITE_CONFIG } from "@/config/site";

interface PageProps {
  searchParams?: Promise<{ preview?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isPreview = params?.preview === "full";

  // Si el modo pre-lanzamiento está activo y no se solicitó vista previa completa en query param,
  // mostrar la Landing Previa con logotipo oficial, mensaje de renovación y accesos directos a Venta y Renta.
  if (SITE_CONFIG.prelaunchMode && !isPreview) {
    return <PrelaunchLanding />;
  }

  return <MainSiteContent />;
}
