"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./cart-context";
import { FavoritesProvider } from "./favorites-context";

interface StoreProvidersProps {
  children: ReactNode;
}

/**
 * Cart + favourites providers in one wrapper.
 * T-008: mount once in `AppProviders.tsx` (alongside `<CartDrawer />`), then the
 * route-level wrappers in `src/app/{shop,product,checkout}/layout.tsx` can go.
 */
export function StoreProviders({ children }: StoreProvidersProps) {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  );
}
