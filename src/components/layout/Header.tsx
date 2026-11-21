"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Menu,
  PlaySquare,
  Scale,
  ShoppingBag,
  X,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart, useCompare, useFavoritesCount } from "@/store";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totals, openDrawer } = useCart();
  const favoritesCount = useFavoritesCount();
  const { count: compareCount, compareSlugs } = useCompare();
  const cartCount = totals.itemCount;

  const compareHref =
    compareCount > 0 ? `/compare?items=${compareSlugs.join(",")}` : "/compare";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-text transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
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
            <span className="rounded border border-accent/40 bg-accent-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
              LAB
            </span>
          </span>
        </Link>

        {/* Pill Navigation Container */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 rounded-xl border border-border bg-surface/90 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:flex"
        >
          {SITE_CONFIG.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const resolvedHref =
              item.href === "/compare" ? compareHref : item.href;
            const isCompareItem = item.href === "/compare";

            return (
              <Link
                key={item.href}
                href={resolvedHref}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-surface-elevated text-text shadow-sm"
                    : "text-text-secondary hover:bg-bg/60 hover:text-text"
                )}
              >
                <span>{item.label}</span>
                {isCompareItem && compareCount > 0 ? (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold tabular-nums text-bg">
                    {compareCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/reels"
            className="hidden items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[11px] font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text lg:inline-flex"
          >
            <PlaySquare className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
            <span>FLUX 9:16</span>
          </Link>

          <Link
            href={compareHref}
            aria-label={`Comparateur (${compareCount})`}
            title="Comparateur d'outils"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text md:hidden"
          >
            <Scale className="h-4 w-4" strokeWidth={1.75} />
            {compareCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-bold tabular-nums text-bg">
                {compareCount}
              </span>
            ) : null}
          </Link>

          <Link
            href="/favorites"
            aria-label={`Outils favoris (${favoritesCount})`}
            title="Outils favoris"
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
              const resolvedHref =
                item.href === "/compare" ? compareHref : item.href;
              return (
                <Link
                  key={item.href}
                  href={resolvedHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-surface-elevated text-accent"
                      : "text-text-secondary hover:bg-surface-elevated hover:text-text"
                  )}
                >
                  <span>{item.label}</span>
                  {item.href === "/compare" && compareCount > 0 ? (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 font-mono text-[10px] font-bold text-bg">
                      {compareCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
