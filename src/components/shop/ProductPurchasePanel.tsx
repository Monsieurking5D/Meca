"use client";

import { useState } from "react";
import { MAX_QUANTITY_PER_ITEM, useCart } from "@/store";
import type { Product } from "@/types";
import {
  AddToCartButton,
  FavoriteButton,
  QuantityStepper,
} from "./ProductActions";

interface ProductPurchasePanelProps {
  product: Product;
}

/** Quantity picker + add-to-cart + favourite, for the product detail page. */
export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { getQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const inCart = getQuantity(product.id);
  const maxAddable = Math.max(1, MAX_QUANTITY_PER_ITEM - inCart);
  const safeQuantity = Math.min(quantity, maxAddable);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {product.inStock ? (
          <QuantityStepper
            value={safeQuantity}
            onChange={setQuantity}
            max={maxAddable}
            label={`Quantité à ajouter pour ${product.name}`}
          />
        ) : null}
        <AddToCartButton
          product={product}
          quantity={safeQuantity}
          size="lg"
          openDrawerOnAdd
          className="flex-1 sm:flex-none"
        />
        <FavoriteButton
          productId={product.id}
          productName={product.name}
          className="h-12 w-12"
        />
      </div>
      {inCart > 0 ? (
        <p className="font-mono text-xs text-text-muted" aria-live="polite">
          Déjà {inCart} dans le panier
        </p>
      ) : null}
    </div>
  );
}
