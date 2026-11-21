export {
  CartProvider,
  useCart,
  useCartCount,
  type CartContextValue,
} from "./cart-context";
export {
  FavoritesProvider,
  useFavorites,
  useFavoritesCount,
  type FavoritesContextValue,
} from "./favorites-context";
export { StoreProviders } from "./StoreProviders";
export {
  computeCartTotals,
  FREE_SHIPPING_THRESHOLD_EUR,
  MAX_QUANTITY_PER_ITEM,
  type CartTotals,
} from "./cart-logic";
