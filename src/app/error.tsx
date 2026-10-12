"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Si el error se debe a un cambio de versión de chunks entre despliegues
    const msg = error?.message || "";
    if (
      msg.includes("Loading chunk") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("Unexpected token '<'") ||
      msg.includes("is not valid JSON")
    ) {
      const reloaded = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("capelton_chunk_reload") : null;
      if (!reloaded) {
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("capelton_chunk_reload", "true");
        }
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-4 py-16 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-black/5 text-black flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-capelton-green" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-3">
        Actualización de la plataforma
      </h2>
      <p className="text-sm text-[#6e6e73] max-w-md mx-auto mb-8 leading-relaxed">
        Se ha actualizado la plataforma con nuevos modelos y optimizaciones. Recarga para sincronizar los cambios.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (typeof sessionStorage !== "undefined") {
              sessionStorage.removeItem("capelton_chunk_reload");
            }
            window.location.reload();
          }}
          className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-black hover:bg-capelton-green transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Actualizar y continuar</span>
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-black/[0.04] hover:bg-black/[0.08] transition-colors inline-flex items-center gap-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Ir a Inicio</span>
        </Link>
      </div>
    </div>
  );
}
