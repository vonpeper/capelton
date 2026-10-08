import React from "react";
import type { Metadata } from "next";
import AvisoPrivacidadContent from "@/components/AvisoPrivacidadContent";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Capelton de México",
  description:
    "Aviso de privacidad integral de Capelton de México S.A. de C.V. conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).",
  alternates: {
    canonical: "https://capeltonmexico.com/aviso-de-privacidad",
  },
  openGraph: {
    title: "Aviso de Privacidad | Capelton México",
    description:
      "Aviso de privacidad y tratamiento de datos personales de Capelton de México S.A. de C.V.",
    url: "https://capeltonmexico.com/aviso-de-privacidad",
    siteName: "Capelton México",
    locale: "es_MX",
    type: "website",
  },
};

export default function AvisoPrivacidadPage() {
  return <AvisoPrivacidadContent />;
}
