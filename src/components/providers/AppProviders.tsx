"use client";

import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Conteneur client racine pour les contextes globaux.
 * En T-008, Antigravity y raccordera CartProvider, FavoritesProvider et CartDrawer
 * exportés par Claude depuis @/store/* et @/components/shop/*.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>;
}
