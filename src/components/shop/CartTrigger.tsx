"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store";
import { cn } from "@/lib/utils";

interface CartTriggerProps {
  className?: string;
}

/** Opens the CartDrawer and shows the live item count. Reusable in Header (T-008). */
export function CartTrigger({ className }: CartTriggerProps) {
  const { totals, openDrawer } = useCart();
  const count = totals.itemCount;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Ouvrir le panier (${count} article${count > 1 ? "s" : ""})`}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-lg border border-accent/40 bg-accent-muted px-3 text-sm font-semibold text-accent transition-[transform,background-color,color] active:scale-[0.98] hover:bg-accent hover:text-bg",
        className
      )}
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
      <span>Panier</span>
      <span className="min-w-5 rounded bg-bg/60 px-1 text-center font-mono text-xs tabular-nums">
        {count}
      </span>
    </button>
  );
}
