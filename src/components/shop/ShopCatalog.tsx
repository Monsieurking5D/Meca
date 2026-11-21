"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { filterProducts, PRODUCTS } from "@/data";
import type { ProductFilterState } from "@/types";
import { cn } from "@/lib/utils";
import { FilterBar } from "./FilterBar";
import {
  DEFAULT_FILTERS,
  parseFilterParams,
  toFilterSearchParams,
} from "./filter-params";
import { ProductGrid } from "./ProductGrid";

const PRICE_ROUNDING_EUR = 10;

const PRICE_CEILING_EUR =
  Math.ceil(
    Math.max(PRICE_ROUNDING_EUR, ...PRODUCTS.map((p) => p.priceEur)) /
      PRICE_ROUNDING_EUR
  ) * PRICE_ROUNDING_EUR;

/** Catalogue view whose filter state lives in the URL (shareable links). */
export function ShopCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [resetKey, setResetKey] = useState(0);

  const filters = useMemo(
    () => parseFilterParams(searchParams),
    [searchParams]
  );
  const products = useMemo(
    () => filterProducts(PRODUCTS, filters),
    [filters]
  );

  const navigate = (next: ProductFilterState) => {
    const query = toFilterSearchParams(next).toString();
    if (query === window.location.search.replace(/^\?/, "")) {
      return;
    }
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleReset = () => {
    setResetKey((key) => key + 1);
    navigate(DEFAULT_FILTERS);
  };

  return (
    <div className="space-y-6">
      <FilterBar
        filters={filters}
        priceCeilingEur={PRICE_CEILING_EUR}
        resultCount={products.length}
        resetKey={resetKey}
        onChange={(patch) =>
          // Merge with the live URL, not the render-time `filters`: the
          // debounced search may fire after another filter changed.
          navigate({
            ...parseFilterParams(new URLSearchParams(window.location.search)),
            ...patch,
          })
        }
        onReset={handleReset}
      />

      <div
        className={cn(
          "transition-opacity duration-150",
          isPending && "opacity-60"
        )}
      >
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
            <PackageSearch
              className="h-10 w-10 text-text-muted"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2 className="mt-4 text-base font-semibold text-text">
              Aucun outil ne correspond
            </h2>
            <p className="mt-1 max-w-sm text-sm text-text-secondary">
              Élargissez le prix, changez de catégorie ou essayez un autre mot
              clé.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 rounded-lg border border-accent/40 bg-accent-muted px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
