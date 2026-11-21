"use client";

import { Bookmark, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { MAX_QUANTITY_PER_ITEM, useCart, useFavorites } from "@/store";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const ADDED_FEEDBACK_MS = 1400;

interface FavoriteButtonProps {
  productId: string;
  productName: string;
  className?: string;
}

export function FavoriteButton({
  productId,
  productName,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isActive = isFavorite(productId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(productId)}
      aria-pressed={isActive}
      aria-label={
        isActive
          ? `Retirer ${productName} des favoris`
          : `Ajouter ${productName} aux favoris`
      }
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive
          ? "border-accent/50 bg-accent-muted text-accent"
          : "border-border bg-bg/80 text-text-secondary hover:border-border-strong hover:text-text",
        className
      )}
    >
      <Bookmark
        className={cn("h-4 w-4", isActive && "fill-current")}
        strokeWidth={1.75}
      />
    </button>
  );
}

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  size?: "sm" | "lg";
  openDrawerOnAdd?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  size = "sm",
  openDrawerOnAdd = false,
  className,
}: AddToCartButtonProps) {
  const { addItem, openDrawer, getQuantity } = useCart();
  const [isJustAdded, setIsJustAdded] = useState(false);
  const isAtMax = getQuantity(product.id) >= MAX_QUANTITY_PER_ITEM;
  const isDisabled = !product.inStock || isAtMax;

  useEffect(() => {
    if (!isJustAdded) {
      return;
    }
    const timer = window.setTimeout(
      () => setIsJustAdded(false),
      ADDED_FEEDBACK_MS
    );
    return () => window.clearTimeout(timer);
  }, [isJustAdded]);

  const handleClick = () => {
    addItem(product, quantity);
    setIsJustAdded(true);
    if (openDrawerOnAdd) {
      openDrawer();
    }
  };

  const label = !product.inStock
    ? "Rupture"
    : isAtMax
      ? "Quantité max"
      : isJustAdded
        ? "Ajouté"
        : "Ajouter";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={`${label} — ${product.name}`}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-[transform,background-color,color] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
        size === "lg" ? "h-12 px-6 text-sm" : "h-9 px-3 text-xs",
        isJustAdded
          ? "bg-success/15 text-success"
          : "bg-accent text-bg hover:bg-accent-hover",
        className
      )}
    >
      {isJustAdded ? (
        <Check className="h-4 w-4" strokeWidth={2} />
      ) : (
        <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
      )}
      <span aria-live="polite">{label}</span>
    </button>
  );
}

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY_PER_ITEM,
  label,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex h-9 items-center rounded-lg border border-border bg-bg"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
        className="flex h-full w-8 items-center justify-center text-text-secondary transition-colors hover:text-text disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
      <span className="min-w-7 text-center font-mono text-sm tabular-nums text-text">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
        className="flex h-full w-8 items-center justify-center text-text-secondary transition-colors hover:text-text disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
