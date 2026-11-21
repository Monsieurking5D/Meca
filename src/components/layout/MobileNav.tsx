"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Home, PlaySquare, Scale, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavoritesCount } from "@/store";

const MOBILE_TABS = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Reels", href: "/reels", icon: PlaySquare },
  { label: "Boutique", href: "/shop", icon: ShoppingBag },
  { label: "Comparer", href: "/compare", icon: Scale },
  { label: "Favoris", href: "/favorites", icon: Bookmark },
];

export function MobileNav() {
  const pathname = usePathname();
  const favoritesCount = useFavoritesCount();

  return (
    <nav
      aria-label="Barre de navigation mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-5">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const showFavBadge = tab.href === "/favorites" && favoritesCount > 0;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                isActive ? "text-accent" : "text-text-muted hover:text-text"
              )}
            >
              <span className="relative">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {showFavBadge ? (
                  <span className="absolute -right-2.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-bold tabular-nums text-bg">
                    {favoritesCount}
                  </span>
                ) : null}
              </span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
