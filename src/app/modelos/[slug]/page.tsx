import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/data";
import ModelDetailContent from "@/components/ModelDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Modelo no encontrado | Capelton México",
    };
  }

  return {
    title: `${product.modelCode} | ${product.categoryName} Capelton`,
    description: `${product.tagline} Dimensiones: ${product.dimensions}. Capacidad: ${product.peopleCapacity}. Venta y renta inmediata en México.`,
    openGraph: {
      title: `${product.modelCode} - ${product.categoryName} | Capelton México`,
      description: product.tagline,
      images: [
        {
          url: product.images[0] || "https://capeltonmexico.com/wp-content/uploads/2025/01/CM_10M_Vista_01.png",
          width: 1200,
          height: 630,
          alt: product.modelCode,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(slug, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Capelton ${product.modelCode}`,
    image: product.images,
    description: product.tagline,
    brand: {
      "@type": "Brand",
      name: "Capelton de México",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Capelton de México",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ModelDetailContent product={product} related={related} />
    </>
  );
}
