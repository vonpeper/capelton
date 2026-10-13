"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const msg = error?.message || "";
    if (
      msg.includes("Loading chunk") ||
      msg.includes("Unexpected token") ||
      msg.includes("Failed to fetch")
    ) {
      const reloaded = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("capelton_global_reload") : null;
      if (!reloaded) {
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem("capelton_global_reload", "true");
        }
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <html lang="es">
      <body style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#1d1d1f", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", textAlign: "center" }}>
        <div style={{ maxWidth: "420px", margin: "0 auto" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#e6f8ee", color: "#00b140", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", fontWeight: "bold", fontSize: "20px" }}>
            ⬡
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
            Actualización del sistema
          </h2>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px", lineHeight: "1.5" }}>
            Se ha desplegado una nueva versión de la plataforma. Haz clic abajo para sincronizar los cambios de inmediato.
          </p>
          <button
            type="button"
            onClick={() => {
              if (typeof sessionStorage !== "undefined") {
                sessionStorage.removeItem("capelton_global_reload");
              }
              window.location.reload();
            }}
            style={{ padding: "10px 24px", borderRadius: "9999px", fontSize: "12px", fontWeight: "bold", color: "#fff", backgroundColor: "#00b140", border: "none", cursor: "pointer" }}
          >
            Actualizar plataforma
          </button>
        </div>
      </body>
    </html>
  );
}
