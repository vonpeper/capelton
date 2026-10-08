import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://capeltonmexico.com"),
  title: {
    default: "Capelton México | Casetas de Vigilancia, Oficinas Móviles y Módulos Prefabricados",
    template: "%s | Capelton México",
  },
  description:
    "Fabricación, venta y renta de oficinas móviles, casetas de vigilancia, dormitorios y espacios modulares para la industria y construcción en México. Cotiza hoy.",
  keywords: [
    "casetas de vigilancia",
    "oficinas móviles",
    "casetas modulares",
    "dormitorios móviles",
    "casetas prefabricadas",
    "contenedores de obra",
    "comedores industriales móviles",
    "sanitarios móviles",
    "arquitectura modular",
    "Capelton México",
    "renta de casetas",
    "venta de oficinas móviles",
    "casetas de seguridad",
    "espacios modulares México",
  ],
  alternates: {
    canonical: "https://capeltonmexico.com",
  },
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
    title: "Capelton México | Casetas de Vigilancia, Oficinas Móviles y Módulos Prefabricados",
    description:
      "Fabricación, venta y renta de oficinas móviles, casetas de vigilancia y arquitectura modular de rápida implementación en todo México.",
    images: [
      {
        url: "https://capeltonmexico.com/images/CM_10M_Vista_01_cropped.png",
        width: 1920,
        height: 627,
        alt: "Capelton México - Espacios Móviles y Casetas de Vigilancia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Capelton México | Casetas de Vigilancia y Oficinas Móviles",
    description: "Fabricación, venta y renta de oficinas móviles y casetas de vigilancia en todo México.",
    images: ["https://capeltonmexico.com/images/CM_10M_Vista_01_cropped.png"],
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/images/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://capeltonmexico.com/#website",
        "url": "https://capeltonmexico.com",
        "name": "Capelton México",
        "alternateName": [
          "Capelton",
          "Capelton de México",
          "Capelton de México S.A. de C.V."
        ],
        "description": "Fabricación, venta y renta de casetas de vigilancia, oficinas móviles y espacios modulares en México.",
        "inLanguage": "es-MX"
      },
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://capeltonmexico.com/#organization",
        "name": "Capelton México",
        "legalName": "Capelton de México S.A. de C.V.",
        "url": "https://capeltonmexico.com",
        "logo": "https://capeltonmexico.com/images/logo-capelton.png",
        "image": "https://capeltonmexico.com/images/CM_10M_Vista_01_cropped.png",
        "description": "Especialistas en ingeniería, diseño y manufactura de oficinas móviles, casetas de vigilancia, dormitorios y espacios modulares para la industria y construcción en México.",
        "telephone": "+52-55-2964-0104",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Metepec",
          "addressRegion": "Estado de México",
          "addressCountry": "MX",
          "postalCode": "52140"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.2564",
          "longitude": "-99.6048"
        },
        "priceRange": "$$$",
        "areaServed": {
          "@type": "Country",
          "name": "Mexico"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+52-55-2964-0104",
            "contactType": "sales",
            "areaServed": "MX",
            "availableLanguage": ["Spanish", "es"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+52-55-7948-3632",
            "contactType": "rentals",
            "areaServed": "MX",
            "availableLanguage": ["Spanish", "es"]
          }
        ],
        "sameAs": [
          "https://www.facebook.com/capeltonmexico",
          "https://www.instagram.com/capeltonmexico"
        ]
      }
    ]
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

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PLPC86J');
            `,
          }}
        />

        {/* Google Ads (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-5928991403"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-5928991403');
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-white text-[#1d1d1f] font-kanit antialiased selection:bg-capelton-green selection:text-white"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PLPC86J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <LanguageProvider>
          <AnalyticsTracker />
          <Navbar />
          <main className="relative flex flex-col min-h-screen">{children}</main>
          <Footer />
          <WhatsAppBubble />
        </LanguageProvider>
      </body>
    </html>
  );
}
