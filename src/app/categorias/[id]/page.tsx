import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getProductsByCategory } from "@/lib/data";
import CategoryDetailContent from "@/components/CategoryDetailContent";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({
    id: c.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return {
      title: "Categoría no encontrada | Capelton México",
    };
  }

  return {
    title: `${category.name} | Catálogo Capelton México`,
    description: `${category.tagline} Venta y renta de ${category.name.toLowerCase()} con entrega y montaje inmediato en todo México.`,
    openGraph: {
      title: `${category.name} | Capelton México`,
      description: category.tagline,
    },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(id);

  return (
    <CategoryDetailContent
      category={category}
      categoryProducts={categoryProducts}
    />
  );
}
