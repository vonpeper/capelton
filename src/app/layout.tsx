import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://capeltonmexico.com"),
  title: {
    default: "Capelton México | Espacios Móviles, Casetas y Oficinas Modulares de Alta Ingeniería",
    template: "%s | Capelton México",
  },
  description:
    "Especialistas en diseño, ingeniería y manufactura de oficinas móviles, casetas, dormitorios y módulos de rápida implementación para la industria, construcción y minería.",
  keywords: [
    "oficinas móviles",
    "casetas de vigilancia",
    "dormitorios móviles",
    "contenedores",
    "consultorios móviles",
    "comedores industriales",
    "arquitectura modular",
    "Capelton México",
    "renta de casetas",
    "venta de oficinas móviles",
  ],
  authors: [{ name: "Capelton de México" }],
  creator: "Capelton de México",
  publisher: "Capelton de México",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://capeltonmexico.com",
    siteName: "Capelton México",
    title: "Capelton México | Espacios Móviles y Arquitectura Modular de Vanguardia",
    description:
      "Ingeniería modular de rápida implementación para proyectos de alta exigencia: construcción, minería, logística e industria.",
    images: [
      {
        url: "https://capeltonmexico.com/wp-content/uploads/2025/01/CM_10M_Vista_01.png",
        width: 1200,
        height: 630,
        alt: "Capelton México Espacios Móviles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capelton México | Espacios Móviles y Arquitectura Modular",
    description: "Ingeniería modular de rápida implementación para la industria y construcción en México.",
    images: ["https://capeltonmexico.com/wp-content/uploads/2025/01/CM_10M_Vista_01.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://capeltonmexico.com/wp-content/uploads/2025/08/favicon-32x32-1.png",
    apple: "https://capeltonmexico.com/wp-content/uploads/2025/08/favicon-32x32-1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Capelton México",
    url: "https://capeltonmexico.com",
    logo: "https://capeltonmexico.com/wp-content/uploads/yootheme/cache/f6/logo-f66c954a.webp",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+52-55-2964-0104",
      contactType: "sales",
      areaServed: "MX",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://www.facebook.com/capeltonmexico",
      "https://www.instagram.com/capeltonmexico",
    ],
  };

  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
                const origRemove = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child.parentNode !== this) {
                    return child;
                  }
                  return origRemove.apply(this, arguments);
                };
                const origInsert = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, refNode) {
                  if (refNode && refNode.parentNode !== this) {
                    return newNode;
                  }
                  return origInsert.apply(this, arguments);
                };
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen bg-white text-[#1d1d1f] font-kanit antialiased selection:bg-capelton-green selection:text-white"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Navbar />
          <main className="relative flex flex-col min-h-screen">{children}</main>
          <Footer />
          <WhatsAppBubble />
        </LanguageProvider>
      </body>
    </html>
  );
}
