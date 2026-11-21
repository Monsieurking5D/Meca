"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { PRODUCTS } from "@/data";
import type { Product } from "@/types";
import { createPersistentStore } from "./persistent-store";

export const COMPARE_STORAGE_KEY = "meca-lab:compare:v1";
export const MAX_COMPARE_ITEMS = 3;

const EMPTY_COMPARE: readonly string[] = Object.freeze([]);

function parseStoredCompare(raw: unknown): readonly string[] {
  if (!Array.isArray(raw)) {
    return EMPTY_COMPARE;
  }
  const knownSlugs = new Set(PRODUCTS.map((product) => product.slug));
  const slugs = [
    ...new Set(
      raw.filter(
        (value): value is string =>
          typeof value === "string" && knownSlugs.has(value)
      )
    ),
  ].slice(0, MAX_COMPARE_ITEMS);
  return slugs.length > 0 ? slugs : EMPTY_COMPARE;
}

const compareStore = createPersistentStore<readonly string[]>({
  key: COMPARE_STORAGE_KEY,
  fallback: EMPTY_COMPARE,
  parse: parseStoredCompare,
});

export interface CompareContextValue {
  compareSlugs: readonly string[];
  compareProducts: readonly Product[];
  count: number;
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string) => "added" | "removed" | "full";
  removeCompare: (slug: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const compareSlugs = useSyncExternalStore(
    compareStore.subscribe,
    compareStore.getSnapshot,
    compareStore.getServerSnapshot
  );

  const toggleCompare = useCallback(
    (slug: string): "added" | "removed" | "full" => {
      const current = compareStore.getSnapshot();
      if (current.includes(slug)) {
        compareStore.update((list) => list.filter((item) => item !== slug));
        return "removed";
      }
      if (current.length >= MAX_COMPARE_ITEMS) {
        return "full";
      }
      compareStore.update((list) => [...list, slug]);
      return "added";
    },
    []
  );

  const removeCompare = useCallback((slug: string) => {
    compareStore.update((list) =>
      list.includes(slug) ? list.filter((item) => item !== slug) : list
    );
  }, []);

  const clearCompare = useCallback(() => {
    compareStore.update(() => EMPTY_COMPARE);
  }, []);

  const value = useMemo<CompareContextValue>(() => {
    const slugSet = new Set(compareSlugs);
    return {
      compareSlugs,
      compareProducts: compareSlugs
        .map((slug) => PRODUCTS.find((product) => product.slug === slug))
        .filter((product): product is Product => product !== undefined),
      count: compareSlugs.length,
      isCompared: (slug) => slugSet.has(slug),
      toggleCompare,
      removeCompare,
      clearCompare,
    };
  }, [compareSlugs, toggleCompare, removeCompare, clearCompare]);

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare doit être utilisé dans un <CompareProvider>.");
  }
  return context;
}

export function useCompareCount(): number {
  return useCompare().count;
}
