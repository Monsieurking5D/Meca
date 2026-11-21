"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/types";

export interface QuickViewContextValue {
  activeProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const openQuickView = useCallback((product: Product) => {
    setActiveProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setActiveProduct(null);
  }, []);

  const value = useMemo<QuickViewContextValue>(
    () => ({
      activeProduct,
      openQuickView,
      closeQuickView,
    }),
    [activeProduct, openQuickView, closeQuickView]
  );

  return (
    <QuickViewContext.Provider value={value}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView(): QuickViewContextValue {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error(
      "useQuickView doit être utilisé dans un <QuickViewProvider>."
    );
  }
  return context;
}
