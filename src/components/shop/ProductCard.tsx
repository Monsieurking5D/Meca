"use client";

import Image from "next/image";
import Link from "next/link";
import { Lightbulb, Play } from "lucide-react";
import { getCategoryBySlug } from "@/data";
import { useQuickView } from "@/store";
import type { Product } from "@/types";
import { formatPriceEur, formatPriceRangeEur } from "@/lib/utils";
import {
  AddToCartButton,
  CompareToggleButton,
  FavoriteButton,
  QuickViewButton,
} from "./ProductActions";
import { DurabilityBadge, RatingInline } from "./ProductMeta";

interface ProductCardProps {
  product: Product;
  /** Eager-load images of the first row (LCP). */
  isPriority?: boolean;
}

export function ProductCard({ product, isPriority = false }: ProductCardProps) {
  const category = getCategoryBySlug(product.category);
  const { openQuickView } = useQuickView();
  const href = `/product/${product.slug}`;
  const keySpecs = product.specs.slice(0, 2);

  return (
    <article className="group relative flex w-full flex-col rounded-2xl border border-border bg-surface/75 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      <div className="flex flex-1 flex-col overflow-hidden rounded-[calc(1rem-2px)] border border-white/[0.04] bg-surface">
        {/* Blueprint Visual Header */}
        <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-border bg-bg">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            aria-label={`Aperçu rapide de ${product.name}`}
            className="relative block h-full w-full cursor-pointer text-left focus-visible:outline-none"
          >
            <Image
              src={product.media.thumbnailUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              priority={isPriority}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>

          {/* Top-left badges */}
          <div className="pointer-events-none absolute left-2.5 top-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md border border-border-strong bg-bg/90 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent backdrop-blur-sm">
              {product.brand}
            </span>
            {product.reelId ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-accent/40 bg-bg/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent backdrop-blur-sm">
                <Play className="h-2.5 w-2.5 fill-current" />
                REEL
              </span>
            ) : null}
          </div>

          {/* Top-right 1-click quick action cluster */}
          <div className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1">
            <QuickViewButton product={product} />
            <CompareToggleButton
              productSlug={product.slug}
              productName={product.name}
            />
            <FavoriteButton
              productId={product.id}
              productName={product.name}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
              {category?.shortName ?? product.category}
            </span>
            <div className="flex items-center gap-2">
              <RatingInline
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
              <DurabilityBadge grade={product.durability} />
            </div>
          </div>

          <h3 className="mt-2 text-base font-semibold leading-snug text-text">
            <Link
              href={href}
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:underline"
            >
              {product.name}
            </Link>
          </h3>

          {/* Direct zero-click "Le Twist" technical summary */}
          <div className="mt-2.5 rounded-lg border border-border/80 bg-bg/65 px-2.5 py-2">
            <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              <Lightbulb className="h-3 w-3 shrink-0" strokeWidth={2} />
              <span>Le twist</span>
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-secondary">
              {product.theTwist}
            </p>
          </div>

          {/* Key Specs pills (visible in 0 clicks) */}
          {keySpecs.length > 0 ? (
            <div className="mt-2.5 grid grid-cols-2 gap-1.5">
              {keySpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="truncate rounded-md border border-border/60 bg-surface-elevated/60 px-2 py-1"
                >
                  <span className="block truncate font-mono text-[9px] uppercase tracking-wider text-text-muted">
                    {spec.label}
                  </span>
                  <span className="block truncate font-mono text-[11px] font-medium tabular-nums text-text">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {/* Footer: Price + 1-click Quick-View + 1-click Add to Cart */}
          <div className="mt-auto flex items-end justify-between gap-2 border-t border-border/70 pt-3.5 mt-3.5">
            <div>
              <span className="block font-mono text-lg font-semibold leading-none tabular-nums text-accent">
                {formatPriceEur(product.priceEur)}
              </span>
              <span className="mt-1 block font-mono text-[10px] tabular-nums text-text-muted">
                {!product.inStock
                  ? "Rupture de stock"
                  : `Marché ${formatPriceRangeEur(product.priceRangeEur.min, product.priceRangeEur.max)}`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <QuickViewButton product={product} variant="pill" />
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
