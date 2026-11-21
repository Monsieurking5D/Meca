"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./cart-context";
import { CompareProvider } from "./compare-context";
import { FavoritesProvider } from "./favorites-context";
import { QuickViewProvider } from "./quickview-context";

interface StoreProvidersProps {
  children: ReactNode;
}

export function StoreProviders({ children }: StoreProvidersProps) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <CompareProvider>
          <QuickViewProvider>{children}</QuickViewProvider>
        </CompareProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
