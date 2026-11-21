import { PRODUCTS } from "@/data";
import type { CartItem, Product } from "@/types";

export const CART_STORAGE_KEY = "meca-lab:cart:v1";
export const MAX_QUANTITY_PER_ITEM = 10;
/** Free shipping threshold for the demo checkout (EUR). */
export const FREE_SHIPPING_THRESHOLD_EUR = 60;
export const SHIPPING_FLAT_EUR = 5.9;

export const EMPTY_CART: readonly CartItem[] = Object.freeze([]);

export function toCents(amountEur: number): number {
  return Math.round(amountEur * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) {
    return 0;
  }
  return Math.min(MAX_QUANTITY_PER_ITEM, Math.max(0, Math.floor(quantity)));
}

export function toCartItem(product: Product, quantity: number): CartItem {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    priceEur: product.priceEur,
    thumbnailUrl: product.media.thumbnailUrl,
    quantity: clampQuantity(quantity),
  };
}

function findProductById(productId: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === productId);
}

/**
 * Validates persisted cart data and refreshes every line from the catalogue
 * (`@/data` is the source of truth for price, name and thumbnail). Lines whose
 * product no longer exists or is out of stock are dropped; duplicates merge.
 */
export function parseStoredCart(raw: unknown): readonly CartItem[] {
  if (!Array.isArray(raw)) {
    return EMPTY_CART;
  }

  const quantities = new Map<string, number>();
  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) {
      continue;
    }
    const { productId, quantity } = entry as Record<string, unknown>;
    if (typeof productId !== "string" || typeof quantity !== "number") {
      continue;
    }
    quantities.set(productId, (quantities.get(productId) ?? 0) + quantity);
  }

  const items: CartItem[] = [];
  quantities.forEach((quantity, productId) => {
    const product = findProductById(productId);
    if (!product || !product.inStock) {
      return;
    }
    const item = toCartItem(product, quantity);
    if (item.quantity > 0) {
      items.push(item);
    }
  });

  return items.length > 0 ? items : EMPTY_CART;
}

export function addToCart(
  items: readonly CartItem[],
  product: Product,
  quantity = 1
): readonly CartItem[] {
  if (!product.inStock || quantity <= 0) {
    return items;
  }
  const existing = items.find((item) => item.productId === product.id);
  if (!existing) {
    return [...items, toCartItem(product, quantity)];
  }
  return items.map((item) =>
    item.productId === product.id
      ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
      : item
  );
}

export function setCartQuantity(
  items: readonly CartItem[],
  productId: string,
  quantity: number
): readonly CartItem[] {
  const nextQuantity = clampQuantity(quantity);
  if (nextQuantity === 0) {
    return removeFromCart(items, productId);
  }
  return items.map((item) =>
    item.productId === productId ? { ...item, quantity: nextQuantity } : item
  );
}

export function removeFromCart(
  items: readonly CartItem[],
  productId: string
): readonly CartItem[] {
  const next = items.filter((item) => item.productId !== productId);
  return next.length > 0 ? next : EMPTY_CART;
}

export interface CartTotals {
  itemCount: number;
  subtotalEur: number;
  shippingEur: number;
  totalEur: number;
  remainingForFreeShippingEur: number;
}

/** Totals are computed in integer cents to avoid floating-point drift. */
export function computeCartTotals(items: readonly CartItem[]): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCents = items.reduce(
    (sum, item) => sum + toCents(item.priceEur) * item.quantity,
    0
  );
  const thresholdCents = toCents(FREE_SHIPPING_THRESHOLD_EUR);
  const shippingCents =
    itemCount === 0 || subtotalCents >= thresholdCents
      ? 0
      : toCents(SHIPPING_FLAT_EUR);

  return {
    itemCount,
    subtotalEur: fromCents(subtotalCents),
    shippingEur: fromCents(shippingCents),
    totalEur: fromCents(subtotalCents + shippingCents),
    remainingForFreeShippingEur: fromCents(
      Math.max(0, thresholdCents - subtotalCents)
    ),
  };
}
