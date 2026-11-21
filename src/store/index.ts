export {
  CartProvider,
  useCart,
  useCartCount,
  type CartContextValue,
} from "./cart-context";
export {
  CompareProvider,
  MAX_COMPARE_ITEMS,
  useCompare,
  useCompareCount,
  type CompareContextValue,
} from "./compare-context";
export {
  FavoritesProvider,
  useFavorites,
  useFavoritesCount,
  type FavoritesContextValue,
} from "./favorites-context";
export {
  QuickViewProvider,
  useQuickView,
  type QuickViewContextValue,
} from "./quickview-context";
export { StoreProviders } from "./StoreProviders";
export {
  computeCartTotals,
  FREE_SHIPPING_THRESHOLD_EUR,
  MAX_QUANTITY_PER_ITEM,
  type CartTotals,
} from "./cart-logic";
