import React from "react";
import type { Metadata } from "next";
import NosotrosContent from "@/components/NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros | Capelton México - Ingeniería y Manufactura en Espacios Móviles",
  description:
    "Conoce la trayectoria de Capelton de México. Especialistas en diseño, ingeniería y manufactura de oficinas móviles, casetas y campamentos modulares en acero Calibre 14 con cobertura en todo el país.",
  alternates: {
    canonical: "https://capeltonmexico.com/nosotros",
  },
  openGraph: {
    title: "Nosotros | Capelton México - Ingeniería en Espacios Móviles",
    description:
      "Más de 15 años diseñando y fabricando oficinas móviles y casetas con estructura de acero Calibre 14 y entrega inmediata en todo México.",
    url: "https://capeltonmexico.com/nosotros",
    siteName: "Capelton México",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://capeltonmexico.com/images/CM_10M_Vista_01_cropped.png",
        width: 1920,
        height: 627,
        alt: "Capelton México Planta de Fabricación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Capelton México",
    description: "Ingeniería y manufactura de oficinas móviles y casetas en todo México.",
    images: ["https://capeltonmexico.com/images/CM_10M_Vista_01_cropped.png"],
  },
};

export default function NosotrosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Acerca de Capelton México",
    "description": "Especialistas en diseño, fabricación y personalización de oficinas móviles y espacios modulares.",
    "publisher": {
      "@type": "Organization",
      "name": "Capelton de México",
      "url": "https://capeltonmexico.com",
      "telephone": "+525529640104",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MX",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NosotrosContent />
    </>
  );
}
