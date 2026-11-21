"use client";

import type { ReactNode } from "react";
import { StoreProviders } from "@/store";
import { CartDrawer } from "./CartDrawer";

interface ShopShellProps {
  children: ReactNode;
}

/**
 * Route-level wrapper for /shop, /product and /checkout until T-008 mounts
 * `StoreProviders` + `CartDrawer` once in `AppProviders.tsx`.
 * Cart/favourites live in module-level stores, so state is shared across
 * segments even though each segment mounts its own provider instance.
 */
export function ShopShell({ children }: ShopShellProps) {
  return (
    <StoreProviders>
      {children}
      <CartDrawer />
    </StoreProviders>
  );
}
