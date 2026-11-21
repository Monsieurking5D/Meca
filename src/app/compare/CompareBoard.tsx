"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, type ReactNode } from "react";
import { ExternalLink, X } from "lucide-react";
import { CATEGORIES, PRODUCTS, getCategoryBySlug } from "@/data";
import {
  AddToCartButton,
  FavoriteButton,
} from "@/components/shop/ProductActions";
import { DurabilityBadge, RatingInline } from "@/components/shop/ProductMeta";
import { Button } from "@/components/ui";
import { formatPriceEur, formatPriceRangeEur } from "@/lib/utils";
import type { Product } from "@/types";

const ITEMS_PARAM = "items";
const MIN_ITEMS = 2;
const MAX_ITEMS = 3;
const DEFAULT_SLUGS = ["lozlin-cliquet-rotatif", "porte-cles-carbone-find-my"];

const PRODUCT_BY_SLUG = new Map(
  PRODUCTS.map((product) => [product.slug, product])
);

/** Keeps only known, unique slugs and fills up to MIN_ITEMS with defaults. */
function parseItems(raw: string | null): string[] {
  const seen = new Set<string>();
  const items: string[] = [];

  for (const part of (raw ?? "").split(",")) {
    const slug = part.trim();
    if (!slug || seen.has(slug) || !PRODUCT_BY_SLUG.has(slug)) {
      continue;
    }
    seen.add(slug);
    items.push(slug);
    if (items.length === MAX_ITEMS) {
      break;
    }
  }

  for (const fallback of DEFAULT_SLUGS) {
    if (items.length >= MIN_ITEMS) {
      break;
    }
    if (seen.has(fallback) || !PRODUCT_BY_SLUG.has(fallback)) {
      continue;
    }
    seen.add(fallback);
    items.push(fallback);
  }

  return items;
}

interface CompareRowProps {
  label: string;
  children: ReactNode[];
}

function CompareRow({ label, children }: CompareRowProps) {
  return (
    <tr className="border-t border-border align-top">
      <th
        scope="row"
        className="w-36 whitespace-nowrap px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-text-muted"
      >
        {label}
      </th>
      {children.map((cell, index) => (
        <td
          key={index}
          className="min-w-56 border-l border-border px-4 py-3 text-sm leading-relaxed text-text-secondary"
        >
          {cell}
        </td>
      ))}
    </tr>
  );
}

export function CompareBoard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawItems = searchParams.get(ITEMS_PARAM);
  const items = useMemo(() => parseItems(rawItems), [rawItems]);

  const products = useMemo(
    () =>
      items
        .map((slug) => PRODUCT_BY_SLUG.get(slug))
        .filter((product): product is Product => product !== undefined),
    [items]
  );

  const update = useCallback(
    (next: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.length > 0) {
        params.set(ITEMS_PARAM, next.join(","));
      } else {
        params.delete(ITEMS_PARAM);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const changeSlot = (index: number, slug: string) => {
    const next = [...items];
    next[index] = slug;
    const unique: string[] = [];
    for (const value of next) {
      if (value && !unique.includes(value)) {
        unique.push(value);
      }
    }
    update(unique.slice(0, MAX_ITEMS));
  };

  const removeAt = (index: number) => {
    update(items.filter((_, position) => position !== index));
  };

  const specLabels = useMemo(() => {
    const labels: string[] = [];
    for (const product of products) {
      for (const spec of product.specs) {
        if (!labels.includes(spec.label)) {
          labels.push(spec.label);
        }
      }
    }
    return labels;
  }, [products]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Sélection
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {products.length} outils comparés ·{" "}
              {MAX_ITEMS - products.length > 0
                ? `encore ${MAX_ITEMS - products.length} emplacement(s) disponible(s)`
                : "comparaison complète"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => update(DEFAULT_SLUGS)}
          >
            Réinitialiser
          </Button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: MAX_ITEMS }, (_, index) => {
            const value = items[index] ?? "";
            return (
              <label key={index} className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Outil {index + 1}
                </span>
                <select
                  value={value}
                  onChange={(event) => changeSlot(index, event.target.value)}
                  className="h-10 rounded-lg border border-border bg-bg px-2 text-sm text-text focus-visible:border-accent focus-visible:outline-none"
                >
                  <option value="">— Choisir un outil —</option>
                  {CATEGORIES.map((category) => (
                    <optgroup key={category.slug} label={category.shortName}>
                      {PRODUCTS.filter(
                        (product) => product.category === category.slug
                      ).map((product) => (
                        <option
                          key={product.id}
                          value={product.slug}
                          disabled={
                            value !== product.slug &&
                            items.includes(product.slug)
                          }
                        >
                          {product.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full min-w-[680px] border-collapse">
          <caption className="sr-only">
            Comparaison côte à côte de {products.length} outils
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="w-36 px-4 py-4 text-left font-mono text-[11px] uppercase tracking-wider text-text-muted"
              >
                Critère
              </th>
              {products.map((product, index) => (
                <th
                  key={product.id}
                  scope="col"
                  className="border-l border-border px-4 py-4 text-left align-top"
                >
                  <div className="flex flex-col gap-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-bg">
                      <Image
                        src={product.media.thumbnailUrl}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                        {product.brand}
                      </p>
                      <Link
                        href={`/product/${product.slug}`}
                        className="mt-1 block text-sm font-semibold leading-snug text-text transition-colors hover:text-accent"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-text-muted">
                        {getCategoryBySlug(product.category)?.shortName ??
                          product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FavoriteButton
                        productId={product.id}
                        productName={product.name}
                      />
                      {items.length > MIN_ITEMS ? (
                        <button
                          type="button"
                          onClick={() => removeAt(index)}
                          aria-label={`Retirer ${product.name} de la comparaison`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg text-text-muted transition-colors hover:border-danger/50 hover:text-danger"
                        >
                          <X className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <CompareRow label="Prix">
              {products.map((product) => (
                <div key={product.id}>
                  <span className="block font-mono text-base font-semibold tabular-nums text-accent">
                    {formatPriceEur(product.priceEur)}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    {formatPriceRangeEur(
                      product.priceRangeEur.min,
                      product.priceRangeEur.max
                    )}{" "}
                    selon revendeur
                  </span>
                </div>
              ))}
            </CompareRow>

            <CompareRow label="Note">
              {products.map((product) => (
                <RatingInline
                  key={product.id}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              ))}
            </CompareRow>

            <CompareRow label="Robustesse">
              {products.map((product) => (
                <div key={product.id} className="space-y-1.5">
                  <DurabilityBadge grade={product.durability} />
                  <p className="text-xs text-text-muted">
                    {product.durabilityNote}
                  </p>
                </div>
              ))}
            </CompareRow>

            <CompareRow label="Stock">
              {products.map((product) => (
                <span
                  key={product.id}
                  className={
                    product.inStock ? "text-success" : "text-danger"
                  }
                >
                  {product.inStock ? "En stock" : "Rupture"}
                </span>
              ))}
            </CompareRow>

            <CompareRow label="Problème">
              {products.map((product) => (
                <span key={product.id}>{product.problemSolved}</span>
              ))}
            </CompareRow>

            <CompareRow label="Le twist">
              {products.map((product) => (
                <span key={product.id}>{product.theTwist}</span>
              ))}
            </CompareRow>

            {specLabels.map((label) => (
              <CompareRow key={label} label={label}>
                {products.map((product) => {
                  const spec = product.specs.find(
                    (entry) => entry.label === label
                  );
                  return spec ? (
                    <span key={product.id}>{spec.value}</span>
                  ) : (
                    <span key={product.id} className="text-text-muted">
                      —
                    </span>
                  );
                })}
              </CompareRow>
            ))}

            <CompareRow label="Points forts">
              {products.map((product) => (
                <ul key={product.id} className="space-y-1">
                  {product.pros.map((pro) => (
                    <li key={pro} className="text-xs">
                      <span className="text-success">+</span> {pro}
                    </li>
                  ))}
                </ul>
              ))}
            </CompareRow>

            <CompareRow label="Limites">
              {products.map((product) => (
                <ul key={product.id} className="space-y-1">
                  {product.cons.map((con) => (
                    <li key={con} className="text-xs">
                      <span className="text-danger">−</span> {con}
                    </li>
                  ))}
                </ul>
              ))}
            </CompareRow>

            <CompareRow label="Démo">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.media.externalDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-text transition-colors hover:text-accent"
                >
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Voir la démo
                </a>
              ))}
            </CompareRow>

            <CompareRow label="Actions">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-wrap items-center gap-2"
                >
                  <AddToCartButton product={product} />
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    Voir la fiche
                  </Link>
                </div>
              ))}
            </CompareRow>
          </tbody>
        </table>
      </div>

      <p className="text-xs leading-relaxed text-text-muted">
        Les prix sont indicatifs et suivent les revendeurs listés sur chaque
        fiche. Un grade <span className="text-text-secondary">EDC</span> signale
        un outil pensé pour être porté, pas pour un chantier intensif.
      </p>
    </div>
  );
}
