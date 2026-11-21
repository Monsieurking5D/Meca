"use client";

import type { ReactNode } from "react";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { ToastProvider } from "@/components/ui";
import { StoreProviders } from "@/store";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Conteneur client racine : monte une seule fois les contextes panier/favoris,
 * les notifications toast et le tiroir panier global.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StoreProviders>
      <ToastProvider>
        {children}
        <CartDrawer />
      </ToastProvider>
    </StoreProviders>
  );
}
