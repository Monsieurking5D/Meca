"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useToast } from "@/components/ui";
import { MAX_QUANTITY_PER_ITEM, useCart } from "@/store";
import type { Product } from "@/types";
import { cn, formatPriceEur } from "@/lib/utils";

interface ReelProductOverlayProps {
  product: Product;
}

/** Bottom product card: "Voir la fiche" + one-tap "+ Panier". */
export function ReelProductOverlay({ product }: ReelProductOverlayProps) {
  const { addItem, getQuantity, openDrawer } = useCart();
  const { push } = useToast();
  const quantity = getQuantity(product.id);
  const isAtMax = quantity >= MAX_QUANTITY_PER_ITEM;
  const isDisabled = !product.inStock || isAtMax;
  const isInCart = quantity > 0;

  const handleAdd = () => {
    addItem(product);
    push({
      title: "Ajouté au panier",
      description: product.name,
      tone: "success",
    });
  };

  const addLabel = !product.inStock
    ? "Rupture"
    : isAtMax
      ? "Max"
      : "Panier";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-bg/75 p-2.5 backdrop-blur-md">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-surface"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.media.thumbnailUrl}
          alt=""
          fill
          sizes="48px"
          className="object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text">
          {product.name}
        </p>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="font-mono text-sm font-semibold tabular-nums text-accent">
            {formatPriceEur(product.priceEur)}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="whitespace-nowrap text-xs text-text-secondary underline-offset-2 hover:text-text hover:underline"
          >
            Voir la fiche
          </Link>
          {isInCart ? (
            <button
              type="button"
              onClick={openDrawer}
              className="inline-flex items-center gap-0.5 font-mono text-[11px] text-success hover:underline"
            >
              <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
              {quantity} au panier
            </button>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={isDisabled}
        aria-label={`Ajouter ${product.name} au panier`}
        className={cn(
          "inline-flex h-10 shrink-0 items-center gap-1 rounded-lg bg-accent px-3 text-xs font-semibold text-bg transition-[transform,background-color] hover:bg-accent-hover active:scale-95",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        )}
      >
        <Plus className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        {addLabel}
      </button>
    </div>
  );
}
