"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Menu,
  PlaySquare,
  ShoppingBag,
  X,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart, useFavoritesCount } from "@/store";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totals, openDrawer } = useCart();
  const favoritesCount = useFavoritesCount();
  const cartCount = totals.itemCount;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-text transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-surface-elevated">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-accent"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <path
                d="M8.5 12H15.5M12 8.5V15.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold tracking-tight">
              MECA
            </span>
            <span className="rounded border border-accent/35 bg-accent-muted px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
              Lab
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 md:flex"
        >
          {SITE_CONFIG.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-surface-elevated text-text"
                    : "text-text-secondary hover:bg-surface hover:text-text"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/reels"
            className="hidden items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-text sm:inline-flex"
          >
            <PlaySquare className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
            <span>Démos</span>
          </Link>

          <Link
            href="/favorites"
            aria-label={`Outils favoris (${favoritesCount})`}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text"
          >
            <Bookmark className="h-4 w-4" strokeWidth={1.75} />
            {favoritesCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold tabular-nums text-bg">
                {favoritesCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Ouvrir le panier (${cartCount} article${cartCount > 1 ? "s" : ""})`}
            className="flex h-9 items-center gap-2 rounded-lg border border-accent/40 bg-accent-muted px-3 text-xs font-semibold text-accent transition-transform active:scale-[0.98] hover:bg-accent hover:text-bg"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            <span className="hidden font-mono sm:inline">PANIER</span>
            <span className="min-w-5 rounded bg-bg/60 px-1 text-center font-mono text-xs tabular-nums">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav
          aria-label="Menu mobile"
          className="border-t border-border bg-surface px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {SITE_CONFIG.navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-surface-elevated text-accent"
                      : "text-text-secondary hover:bg-surface-elevated hover:text-text"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
