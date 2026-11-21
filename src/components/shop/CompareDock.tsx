"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Scale, Trash2, X } from "lucide-react";
import { MAX_COMPARE_ITEMS, useCompare } from "@/store";

export function CompareDock() {
  const pathname = usePathname();
  const { compareProducts, compareSlugs, count, removeCompare, clearCompare } =
    useCompare();

  if (count === 0 || pathname.startsWith("/compare")) {
    return null;
  }

  const compareHref = `/compare?items=${compareSlugs.join(",")}`;

  return (
    <aside
      aria-label="Barre de comparaison rapide"
      className="fixed bottom-16 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 md:bottom-5"
    >
      <div className="rounded-2xl border border-border-strong bg-bg/95 p-1.5 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-surface px-3.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent-muted text-accent">
              <Scale className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-mono text-xs font-semibold text-text">
                Comparateur ({count}/{MAX_COMPARE_ITEMS})
              </p>
              <p className="hidden text-[11px] text-text-muted sm:block">
                Sélectionnez 2 ou 3 outils pour les confronter côte à côte
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
            <div className="flex items-center gap-1.5">
              {compareProducts.map((product) => (
                <div
                  key={product.slug}
                  className="group relative flex items-center gap-1.5 rounded-lg border border-border-strong bg-bg px-2 py-1"
                >
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded bg-surface">
                    <Image
                      src={product.media.thumbnailUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="max-w-24 truncate font-mono text-[11px] text-text-secondary">
                    {product.brand}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCompare(product.slug)}
                    aria-label={`Retirer ${product.name} du comparateur`}
                    className="rounded p-0.5 text-text-muted transition-colors hover:text-text"
                  >
                    <X className="h-3 w-3" strokeWidth={2} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={clearCompare}
              aria-label="Vider le comparateur"
              title="Vider"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg text-text-muted transition-colors hover:border-border-strong hover:text-text"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>

            <Link
              href={compareHref}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 font-mono text-xs font-semibold text-bg transition-colors hover:bg-accent-hover"
            >
              <span>Comparer</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
