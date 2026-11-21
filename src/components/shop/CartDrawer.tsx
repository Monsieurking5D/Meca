"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD_EUR, useCart } from "@/store";
import { formatPriceEur } from "@/lib/utils";
import { QuantityStepper } from "./ProductActions";

/**
 * Slide-over cart. Opened through `useCart().openDrawer()`.
 * Uses a native <dialog> (modal) for focus trapping, Escape and inert page.
 */
export function CartDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { items, totals, isDrawerOpen, closeDrawer, setQuantity, removeItem } =
    useCart();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isDrawerOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isDrawerOpen && dialog.open) {
      dialog.close();
    }
  }, [isDrawerOpen]);

  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotalEur / FREE_SHIPPING_THRESHOLD_EUR) * 100)
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={closeDrawer}
      onClick={(event) => {
        // Click on the backdrop (the dialog element itself) closes the drawer.
        if (event.target === event.currentTarget) {
          closeDrawer();
        }
      }}
      aria-labelledby="cart-drawer-title"
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md border-l border-border bg-surface p-0 text-text backdrop:bg-bg/70 backdrop:backdrop-blur-sm open:animate-[cart-in_220ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:open:animate-none"
    >
      <style>{`@keyframes cart-in { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2
            id="cart-drawer-title"
            className="flex items-center gap-2 text-base font-semibold"
          >
            <ShoppingBag className="h-4 w-4 text-accent" strokeWidth={1.75} />
            Panier
            <span className="font-mono text-sm tabular-nums text-text-muted">
              ({totals.itemCount})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Fermer le panier"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-border-strong hover:text-text"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag
              className="h-10 w-10 text-text-muted"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="mt-4 text-sm font-medium text-text">
              Votre panier est vide
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Les outils ajoutés depuis la boutique ou les Reels arrivent ici.
            </p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
            >
              Parcourir la boutique
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-3">
              <p className="flex items-center gap-2 text-xs text-text-secondary">
                <Truck className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
                {totals.remainingForFreeShippingEur > 0 ? (
                  <span>
                    Plus que{" "}
                    <strong className="font-mono text-text">
                      {formatPriceEur(totals.remainingForFreeShippingEur)}
                    </strong>{" "}
                    pour la livraison offerte
                  </span>
                ) : (
                  <span className="text-success">Livraison offerte</span>
                )}
              </p>
              <div
                className="mt-2 h-1 overflow-hidden rounded-full bg-bg"
                aria-hidden="true"
              >
                <div
                  className="h-full origin-left rounded-full bg-accent transition-transform duration-300"
                  style={{ transform: `scaleX(${freeShippingProgress / 100})` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3 py-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-bg">
                    <Image
                      src={item.thumbnailUrl}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeDrawer}
                      className="line-clamp-2 text-sm font-medium text-text hover:text-accent"
                    >
                      {item.name}
                    </Link>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      {item.brand}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(next) => setQuantity(item.productId, next)}
                        label={`Quantité pour ${item.name}`}
                      />
                      <span className="font-mono text-sm font-semibold tabular-nums text-text">
                        {formatPriceEur(item.priceEur * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    aria-label={`Retirer ${item.name} du panier`}
                    className="self-start rounded-md p-1.5 text-text-muted transition-colors hover:bg-danger/10 hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="border-t border-border bg-surface-elevated px-5 py-4">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <dt>Sous-total</dt>
                  <dd className="font-mono tabular-nums">
                    {formatPriceEur(totals.subtotalEur)}
                  </dd>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <dt>Livraison</dt>
                  <dd className="font-mono tabular-nums">
                    {totals.shippingEur === 0
                      ? "Offerte"
                      : formatPriceEur(totals.shippingEur)}
                  </dd>
                </div>
                <div className="flex justify-between pt-1.5 text-base font-semibold text-text">
                  <dt>Total</dt>
                  <dd className="font-mono tabular-nums text-accent">
                    {formatPriceEur(totals.totalEur)}
                  </dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-accent text-sm font-semibold text-bg transition-[transform,background-color] active:scale-[0.99] hover:bg-accent-hover"
              >
                Commander
              </Link>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}
