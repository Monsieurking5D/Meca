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

export const FAVORITES_STORAGE_KEY = "meca-lab:favorites:v1";

const EMPTY_FAVORITES: readonly string[] = Object.freeze([]);

/** Keeps only unique ids of products that still exist in the catalogue. */
function parseStoredFavorites(raw: unknown): readonly string[] {
  if (!Array.isArray(raw)) {
    return EMPTY_FAVORITES;
  }
  const knownIds = new Set(PRODUCTS.map((product) => product.id));
  const ids = [
    ...new Set(
      raw.filter(
        (value): value is string =>
          typeof value === "string" && knownIds.has(value)
      )
    ),
  ];
  return ids.length > 0 ? ids : EMPTY_FAVORITES;
}

const favoritesStore = createPersistentStore<readonly string[]>({
  key: FAVORITES_STORAGE_KEY,
  fallback: EMPTY_FAVORITES,
  parse: parseStoredFavorites,
});

export interface FavoritesContextValue {
  /** Favourite product ids, in the order they were added. */
  favoriteIds: readonly string[];
  /** Favourite products resolved from `@/data`. */
  favoriteProducts: readonly Product[];
  count: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const favoriteIds = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot
  );

  const toggleFavorite = useCallback((productId: string) => {
    favoritesStore.update((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }, []);

  const removeFavorite = useCallback((productId: string) => {
    favoritesStore.update((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : current
    );
  }, []);

  const clearFavorites = useCallback(() => {
    favoritesStore.update(() => EMPTY_FAVORITES);
  }, []);

  const value = useMemo<FavoritesContextValue>(() => {
    const idSet = new Set(favoriteIds);
    return {
      favoriteIds,
      favoriteProducts: favoriteIds
        .map((id) => PRODUCTS.find((product) => product.id === id))
        .filter((product): product is Product => product !== undefined),
      count: favoriteIds.length,
      isFavorite: (productId) => idSet.has(productId),
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    };
  }, [favoriteIds, toggleFavorite, removeFavorite, clearFavorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites doit être utilisé dans un <FavoritesProvider>."
    );
  }
  return context;
}

/** Number of favourite products — for the Header badge (T-008). */
export function useFavoritesCount(): number {
  return useFavorites().count;
}
