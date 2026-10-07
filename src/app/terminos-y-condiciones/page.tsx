import React from "react";
import type { Metadata } from "next";
import TerminosContent from "@/components/TerminosContent";

export const metadata: Metadata = {
  title: "Términos del Servicio | Capelton de México",
  description:
    "Términos y condiciones comerciales de venta, renta y entrega de espacios modulares de Capelton de México S.A. de C.V.",
  openGraph: {
    title: "Términos del Servicio | Capelton México",
    description:
      "Términos comerciales de venta y arrendamiento de módulos prefabricados Capelton.",
  },
};

export default function TerminosPage() {
  return <TerminosContent />;
}
