"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroFlagshipShowcase() {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 w-full max-w-[1520px] mx-auto px-2 sm:px-4 lg:px-6 mt-0 sm:-mt-2 mb-2 select-none flex flex-col items-center">
      {/* Monumental Double-Size Floating Stage */}
      <div className="relative w-full h-[200px] xs:h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] xl:h-[520px] flex items-center justify-center">
        {/* Smooth Floating Effect */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full max-w-[1440px]">
            <Image
              src="/images/CM_10M_Vista_01_cropped.png"
              alt="Capelton CM-10M Flagship"
              fill
              priority
              sizes="(max-width: 1520px) 100vw, 1500px"
              className="object-contain filter drop-shadow-[0_22px_38px_rgba(0,0,0,0.08)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Understated Minimal Footnote */}
      <div className="relative z-10 text-xs font-medium text-[#86868b] tracking-normal pt-2 text-center">
        {t(
          "Modelo CM-10M • Acero Calibre 14 • Despliegue en 24h",
          "Model CM-10M • 14-Gauge Steel • 24h Deployment"
        )}
      </div>
    </div>
  );
}
