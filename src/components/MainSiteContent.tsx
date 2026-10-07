import React from "react";
import Hero from "@/components/Hero";
import AppleScrollytelling from "@/components/AppleScrollytelling";
import DuoSwitcher from "@/components/DuoSwitcher";
import WhyCapelton from "@/components/WhyCapelton";
import VentaRentaSection from "@/components/VentaRentaSection";
import CategoryGrid from "@/components/CategoryGrid";
import ModelsCatalog from "@/components/ModelsCatalog";
import ClientsAndDistributors from "@/components/ClientsAndDistributors";
import InstagramCommsConsole from "@/components/InstagramCommsConsole";
import PhoneChatSimulator from "@/components/PhoneChatSimulator";
import AboutSection from "@/components/AboutSection";
import { products, categories } from "@/lib/data";

export default function MainSiteContent() {
  return (
    <>
      {/* 1. Apple Hero Section with Logistics Routes */}
      <Hero />

      {/* 2. Monumental 4X 3D Stage & Interactive Hotspots */}
      <AppleScrollytelling />

      {/* 3. Apple Duo Model Comparator */}
      <DuoSwitcher />

      {/* 4. Why Capelton (Horizontal Differentiators Slider) */}
      <WhyCapelton />

      {/* 5. Striking Venta vs Renta High-Impact Section */}
      <VentaRentaSection />

      {/* 6. Apple Bento Grid of Categories with Translucent Renders */}
      <CategoryGrid />

      {/* 7. Complete Interactive Catalog (31 Models strictly ordered by size) */}
      <ModelsCatalog products={products} categories={categories} />

      {/* 8. Corporate Clients Marquee, Real Projects & Authorized Distributors */}
      <ClientsAndDistributors />

      {/* 9. Tactical Instagram Reels Comms Console */}
      <InstagramCommsConsole />

      {/* 10. Interactive Phone Chat Simulator CTA */}
      <PhoneChatSimulator />

      {/* 11. Institutional Summary linking to /nosotros */}
      <AboutSection />
    </>
  );
}
