import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { ProductModel, Category } from "./types";

export const products: ProductModel[] = productsData as ProductModel[];
export const categories: Category[] = categoriesData as Category[];

export function getProductBySlug(slug: string): ProductModel | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): ProductModel[] {
  return products.filter((p) => p.category === category);
}

export function getFlagshipProducts(): ProductModel[] {
  return products.filter((p) => p.isFlagship);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getRelatedProducts(slug: string, limit = 3): ProductModel[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export const CONTACT_INFO = {
  ventas: {
    label: "Ventas",
    badge: "Compra de Unidades",
    phone: "55 2964 0104",
    phoneFormatted: "+52 55 2964 0104",
    phoneRaw: "5529640104",
    telHref: "tel:5529640104",
    waLink: "https://wa.link/n81wvt",
    waNumber: "5215529640104",
    description: "Venta y fabricación de oficinas móviles, casetas y espacios modulares",
  },
  rentas: {
    label: "Rentas",
    badge: "Arrendamiento Deducible",
    phone: "55 7948 3632",
    phoneFormatted: "+52 55 7948 3632",
    phoneRaw: "5579483632",
    telHref: "tel:5579483632",
    waLink: "https://wa.link/x5qgqf",
    waNumber: "5215579483632",
    description: "Renta mensual de casetas y oficinas con entrega inmediata",
  },
} as const;

export function getWhatsAppUrl(type: "ventas" | "rentas", customMessage?: string): string {
  const info = CONTACT_INFO[type];
  if (customMessage) {
    return `https://wa.me/${info.waNumber}?text=${encodeURIComponent(customMessage)}`;
  }
  return info.waLink;
}

