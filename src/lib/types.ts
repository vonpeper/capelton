export interface ProductModel {
  id: number;
  slug: string;
  title: string;
  modelCode: string;
  category: string;
  categoryName: string;
  originalUrl: string;
  dimensions: string;
  weight: string;
  loadCapacity: string;
  peopleCapacity: string;
  features: string[];
  images: string[];
  technicalSheetUrl: string;
  blueprintUrl?: string;
  tagline: string;
  isFlagship?: boolean;
}

export interface Category {
  id: string;
  slug?: string;
  name: string;
  nameEn?: string;
  tagline: string;
  taglineEn?: string;
  modelsCount: number;
  image?: string;
  corteImage?: string;
  modelSlugs: string[];
}
