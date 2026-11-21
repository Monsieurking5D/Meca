import type { CategorySlug } from "./category";

export type DurabilityGrade = "pro" | "atelier" | "edc" | "gadget";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductMedia {
  thumbnailUrl: string;
  galleryUrls: string[];
  videoPreviewUrl?: string;
  externalDemoUrl: string;
  officialUrl?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  category: CategorySlug;
  problemSolved: string;
  theTwist: string;
  description: string;
  priceEur: number;
  priceRangeEur: {
    min: number;
    max: number;
  };
  rating: number;
  reviewCount: number;
  durability: DurabilityGrade;
  durabilityNote: string;
  inStock: boolean;
  featured: boolean;
  isNew?: boolean;
  tags: string[];
  specs: ProductSpec[];
  pros: string[];
  cons: string[];
  media: ProductMedia;
  reelId?: string;
  merchantUrl?: string;
}

export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export interface ProductFilterState {
  category: CategorySlug | "all";
  search: string;
  maxPriceEur: number | null;
  durability: DurabilityGrade | "all";
  inStockOnly: boolean;
  sortBy: ProductSortOption;
}
