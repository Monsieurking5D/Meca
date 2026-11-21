import type {
  Category,
  CategorySlug,
  Product,
  ProductFilterState,
  ReelItem,
} from "@/types";
import { CATEGORIES } from "./categories";
import { PRODUCTS } from "./products";
import { REELS } from "./reels";

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProductsByCategory(
  category: CategorySlug | "all"
): Product[] {
  if (category === "all") {
    return PRODUCTS;
  }
  return PRODUCTS.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((product) => product.featured);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getReelById(id: string): ReelItem | undefined {
  return REELS.find((reel) => reel.id === id);
}

export function getReelsByCategory(category: CategorySlug | "all"): ReelItem[] {
  if (category === "all") {
    return REELS;
  }
  return REELS.filter((reel) => reel.category === category);
}

export function getReelsByProductSlug(slug: string): ReelItem[] {
  return REELS.filter((reel) => reel.productSlug === slug);
}

export function filterProducts(
  products: Product[],
  filters: Partial<ProductFilterState>
): Product[] {
  const normalizedSearch = filters.search?.trim().toLowerCase() ?? "";

  const filtered = products.filter((product) => {
    if (
      filters.category &&
      filters.category !== "all" &&
      product.category !== filters.category
    ) {
      return false;
    }

    if (
      filters.durability &&
      filters.durability !== "all" &&
      product.durability !== filters.durability
    ) {
      return false;
    }

    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    if (
      typeof filters.maxPriceEur === "number" &&
      product.priceEur > filters.maxPriceEur
    ) {
      return false;
    }

    if (normalizedSearch.length > 0) {
      const haystack = [
        product.name,
        product.brand,
        product.tagline,
        product.problemSolved,
        product.theTwist,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(normalizedSearch)) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case "price-asc":
      sorted.sort((a, b) => a.priceEur - b.priceEur);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.priceEur - a.priceEur);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "featured":
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
  }

  return sorted;
}

export function searchProducts(query: string): Product[] {
  return filterProducts(PRODUCTS, { search: query });
}
