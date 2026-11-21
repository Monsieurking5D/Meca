import { CATEGORIES } from "@/data";
import type {
  CategorySlug,
  DurabilityGrade,
  ProductFilterState,
  ProductSortOption,
} from "@/types";

/** URL query keys — short, stable and shareable (`/shop?cat=mesure&max=80`). */
export const FILTER_PARAM = {
  category: "cat",
  search: "q",
  maxPrice: "max",
  durability: "dur",
  inStock: "stock",
  sort: "sort",
} as const;

export const DEFAULT_FILTERS: ProductFilterState = {
  category: "all",
  search: "",
  maxPriceEur: null,
  durability: "all",
  inStockOnly: false,
  sortBy: "featured",
};

export const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "featured", label: "Sélection MECA" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating-desc", label: "Mieux notés" },
];

export const DURABILITY_LABELS: Record<DurabilityGrade, string> = {
  pro: "Pro",
  atelier: "Atelier",
  edc: "EDC",
  gadget: "Gadget",
};

const MAX_SEARCH_LENGTH = 80;

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map((c) => c.slug));
const DURABILITY_GRADES = new Set<string>(Object.keys(DURABILITY_LABELS));
const SORT_VALUES = new Set<string>(SORT_OPTIONS.map((option) => option.value));

interface ReadableParams {
  get: (name: string) => string | null;
}

/** Parses untrusted query params into a valid filter state (never throws). */
export function parseFilterParams(params: ReadableParams): ProductFilterState {
  const category = params.get(FILTER_PARAM.category);
  const durability = params.get(FILTER_PARAM.durability);
  const sort = params.get(FILTER_PARAM.sort);
  const maxPrice = Number(params.get(FILTER_PARAM.maxPrice));

  return {
    category:
      category && CATEGORY_SLUGS.has(category)
        ? (category as CategorySlug)
        : DEFAULT_FILTERS.category,
    search: (params.get(FILTER_PARAM.search) ?? "").slice(0, MAX_SEARCH_LENGTH),
    maxPriceEur:
      Number.isFinite(maxPrice) && maxPrice > 0 ? Math.round(maxPrice) : null,
    durability:
      durability && DURABILITY_GRADES.has(durability)
        ? (durability as DurabilityGrade)
        : DEFAULT_FILTERS.durability,
    inStockOnly: params.get(FILTER_PARAM.inStock) === "1",
    sortBy:
      sort && SORT_VALUES.has(sort)
        ? (sort as ProductSortOption)
        : DEFAULT_FILTERS.sortBy,
  };
}

/** Serialises filters, omitting defaults so URLs stay short. */
export function toFilterSearchParams(
  filters: ProductFilterState
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.category !== "all") {
    params.set(FILTER_PARAM.category, filters.category);
  }
  const search = filters.search.trim();
  if (search) {
    params.set(FILTER_PARAM.search, search);
  }
  if (filters.maxPriceEur !== null) {
    params.set(FILTER_PARAM.maxPrice, String(filters.maxPriceEur));
  }
  if (filters.durability !== "all") {
    params.set(FILTER_PARAM.durability, filters.durability);
  }
  if (filters.inStockOnly) {
    params.set(FILTER_PARAM.inStock, "1");
  }
  if (filters.sortBy !== DEFAULT_FILTERS.sortBy) {
    params.set(FILTER_PARAM.sort, filters.sortBy);
  }
  return params;
}

export function countActiveFilters(filters: ProductFilterState): number {
  return [
    filters.category !== "all",
    filters.search.trim() !== "",
    filters.maxPriceEur !== null,
    filters.durability !== "all",
    filters.inStockOnly,
  ].filter(Boolean).length;
}
