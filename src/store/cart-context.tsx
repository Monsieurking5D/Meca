"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/types";
import {
  addToCart,
  CART_STORAGE_KEY,
  computeCartTotals,
  EMPTY_CART,
  parseStoredCart,
  removeFromCart,
  setCartQuantity,
  type CartTotals,
} from "./cart-logic";
import { createPersistentStore } from "./persistent-store";

const cartStore = createPersistentStore<readonly CartItem[]>({
  key: CART_STORAGE_KEY,
  fallback: EMPTY_CART,
  parse: parseStoredCart,
});

const noopSubscribe = () => () => {};

export interface CartContextValue {
  /** False during SSR/hydration (cart not yet read from storage). */
  isHydrated: boolean;
  items: readonly CartItem[];
  totals: CartTotals;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const isHydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addItem = useCallback((product: Product, quantity = 1) => {
    cartStore.update((current) => addToCart(current, product, quantity));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    cartStore.update((current) =>
      setCartQuantity(current, productId, quantity)
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    cartStore.update((current) => removeFromCart(current, productId));
  }, []);

  const clearCart = useCallback(() => {
    cartStore.update(() => EMPTY_CART);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      isHydrated,
      items,
      totals: computeCartTotals(items),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      getQuantity: (productId) =>
        items.find((item) => item.productId === productId)?.quantity ?? 0,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
    }),
    [isHydrated, items, isDrawerOpen, addItem, setQuantity, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un <CartProvider>.");
  }
  return context;
}

/** Total number of units in the cart — for the Header badge (T-008). */
export function useCartCount(): number {
  return useCart().totals.itemCount;
}
