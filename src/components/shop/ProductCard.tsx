import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug } from "@/data";
import type { Product } from "@/types";
import { formatPriceEur } from "@/lib/utils";
import { AddToCartButton, FavoriteButton } from "./ProductActions";
import { DurabilityBadge, RatingInline } from "./ProductMeta";

interface ProductCardProps {
  product: Product;
  /** Eager-load images of the first row (LCP). */
  isPriority?: boolean;
}

export function ProductCard({ product, isPriority = false }: ProductCardProps) {
  const category = getCategoryBySlug(product.category);
  const href = `/product/${product.slug}`;

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-bg">
        <Image
          src={product.media.thumbnailUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={isPriority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded border border-border-strong bg-bg/90 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
            {product.brand}
          </span>
          {product.isNew ? (
            <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-bg">
              Nouveau
            </span>
          ) : null}
        </div>
        <FavoriteButton
          productId={product.id}
          productName={product.name}
          className="absolute right-3 top-3 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            {category?.shortName ?? product.category}
          </span>
          <DurabilityBadge grade={product.durability} />
        </div>

        <h3 className="mt-2 text-base font-semibold leading-snug text-text">
          {/* Stretched link: whole card is clickable, buttons stay on top (z-10). */}
          <Link
            href={href}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-accent"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm text-text-secondary">
          {product.tagline}
        </p>

        <RatingInline
          rating={product.rating}
          reviewCount={product.reviewCount}
          className="mt-3"
        />

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <span className="block font-mono text-lg font-semibold tabular-nums text-accent">
              {formatPriceEur(product.priceEur)}
            </span>
            {!product.inStock ? (
              <span className="text-xs text-danger">Rupture de stock</span>
            ) : null}
          </div>
          <AddToCartButton product={product} className="relative z-10" />
        </div>
      </div>
    </article>
  );
}
