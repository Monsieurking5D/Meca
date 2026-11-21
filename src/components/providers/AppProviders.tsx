"use client";

import type { ReactNode } from "react";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { CompareDock } from "@/components/shop/CompareDock";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { ToastProvider } from "@/components/ui";
import { StoreProviders } from "@/store";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Conteneur client racine : monte une seule fois les contextes panier/favoris/comparateur/quickview,
 * les notifications toast, la modale d'aperçu rapide, la barre de comparaison et le tiroir panier.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StoreProviders>
      <ToastProvider>
        {children}
        <QuickViewModal />
        <CompareDock />
        <CartDrawer />
      </ToastProvider>
    </StoreProviders>
  );
}
