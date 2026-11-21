"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Cpu,
  Hammer,
  Lightbulb,
  Maximize2,
  Play,
  Ruler,
  TriangleAlert,
  Wrench,
  Zap,
} from "lucide-react";
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
  PRODUCTS,
  REELS,
} from "@/data";
import {
  AddToCartButton,
  CompareToggleButton,
  FavoriteButton,
  QuickViewButton,
} from "@/components/shop/ProductActions";
import { DurabilityBadge, RatingInline } from "@/components/shop/ProductMeta";
import { cn, formatCompactCount, formatPriceEur } from "@/lib/utils";
import type { CategorySlug } from "@/types";

const CATEGORY_ICONS = {
  Wrench,
  Zap,
  Hammer,
  Ruler,
  Cpu,
} as const;

export function WorkbenchHero() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReel = REELS[activeIndex] ?? REELS[0];
  const activeProduct = activeReel
    ? getProductBySlug(activeReel.productSlug)
    : undefined;
  const activeCategory = activeReel
    ? getCategoryBySlug(activeReel.category)
    : undefined;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REELS.length) % REELS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REELS.length);
  };

  const handleJumpToCategory = (slug: CategorySlug | "all") => {
    const targetUrl = slug === "all" ? "/" : `/?cat=${slug}`;
    router.replace(targetUrl, { scroll: false });
    const el = document.getElementById("catalogue-atelier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="border-b border-border bg-bg/95">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Workbench Pitch + 1-Click Category Jump + 10-Reel Switcher */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Banc d&apos;essai · {PRODUCTS.length} outils · {REELS.length} démos
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08]">
              Testez la démo, vérifiez le twist, commandez en 1 clic.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Tout est accessible sans changer de page : parcourez les{" "}
              <span className="text-text">{REELS.length} démos Reels</span>{" "}
              ci-contre, ouvrez la fiche technique en aperçu rapide ou filtrez
              directement les{" "}
              <span className="text-text">{PRODUCTS.length} outils</span>{" "}
              ci-dessous.
            </p>

            {/* 1-Click Direct Category Filter Pills (Scrolls & Filters inline!) */}
            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Accès direct au catalogue par métier (1 clic)
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleJumpToCategory("all")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-surface-elevated px-2.5 py-1.5 font-mono text-xs font-medium text-text transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <span>Tous</span>
                  <span className="rounded bg-bg px-1 text-[10px] tabular-nums text-accent">
                    {PRODUCTS.length}
                  </span>
                </button>
                {CATEGORIES.map((category) => {
                  const Icon =
                    CATEGORY_ICONS[
                      category.icon as keyof typeof CATEGORY_ICONS
                    ] ?? Wrench;
                  const count = getProductsByCategory(category.slug).length;
                  return (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => handleJumpToCategory(category.slug)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-accent/50 hover:bg-surface-elevated hover:text-text"
                    >
                      <Icon
                        className="h-3.5 w-3.5 text-accent"
                        strokeWidth={1.75}
                      />
                      <span>{category.shortName}</span>
                      <span className="font-mono text-[10px] tabular-nums text-text-muted">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive 10-Reel Switcher Grid (0 page load!) */}
            <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between gap-2 pb-2.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                  Sélecteur de démos ({activeIndex + 1}/{REELS.length})
                </span>
                <Link
                  href={`/reels?reel=${activeReel.id}`}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-accent transition-colors hover:underline"
                >
                  <Maximize2 className="h-3 w-3" strokeWidth={1.75} />
                  <span>Mode plein écran 9:16</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                {REELS.map((reel, index) => {
                  const isSelected = index === activeIndex;
                  const product = getProductBySlug(reel.productSlug);
                  return (
                    <button
                      key={reel.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isSelected}
                      className={cn(
                        "group flex flex-col justify-between rounded-xl border p-2 text-left transition-all",
                        isSelected
                          ? "border-accent bg-accent-muted shadow-sm"
                          : "border-border bg-bg/70 hover:border-border-strong hover:bg-surface-elevated"
                      )}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={cn(
                            "font-mono text-[10px] font-semibold tabular-nums",
                            isSelected ? "text-accent" : "text-text-muted"
                          )}
                        >
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                        <Play
                          className={cn(
                            "h-2.5 w-2.5",
                            isSelected
                              ? "fill-accent text-accent"
                              : "text-text-muted group-hover:text-text"
                          )}
                        />
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-[11px] font-medium leading-tight text-text">
                        {product?.brand ?? reel.title}
                      </p>
                      <span className="mt-1 block font-mono text-[10px] tabular-nums text-text-secondary">
                        {product ? formatPriceEur(product.priceEur) : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Double-Bezel Reel Console */}
          {activeReel && activeProduct ? (
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border-strong bg-surface/90 p-1.5 shadow-2xl">
                <div className="overflow-hidden rounded-[calc(1rem-2px)] border border-white/[0.05] bg-surface">
                  {/* Console Top Bar */}
                  <div className="flex items-center justify-between gap-2 border-b border-border bg-bg/60 px-4 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span className="truncate font-mono text-xs font-semibold uppercase tracking-wider text-text">
                        {activeReel.title}
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Démo précédente"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                      <span className="px-1.5 font-mono text-xs tabular-nums text-text-muted">
                        {activeIndex + 1}/{REELS.length}
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Démo suivante"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>

                  {/* Visual Stage + Highlights Overlay */}
                  <div className="relative aspect-[16/10] w-full bg-bg">
                    <Image
                      src={activeReel.posterUrl}
                      alt={activeProduct.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-md border border-border-strong bg-bg/90 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                        {activeProduct.brand}
                      </span>
                      <DurabilityBadge grade={activeProduct.durability} />
                      <span className="rounded-md border border-border bg-bg/90 px-2 py-0.5 font-mono text-[10px] text-text-secondary">
                        {activeCategory?.shortName}
                      </span>
                    </div>

                    <div className="absolute right-3 top-3 flex items-center gap-1.5">
                      <a
                        href={activeReel.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 items-center gap-1 rounded-lg border border-border-strong/80 bg-bg/85 px-2.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-text"
                      >
                        <span>Source</span>
                        <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
                      </a>
                      <QuickViewButton product={activeProduct} />
                      <CompareToggleButton
                        productSlug={activeProduct.slug}
                        productName={activeProduct.name}
                      />
                      <FavoriteButton
                        productId={activeProduct.id}
                        productName={activeProduct.name}
                      />
                    </div>

                    {/* Highlights pills at bottom of stage */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/90 to-transparent p-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {activeReel.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center gap-1 rounded-md border border-border-strong bg-surface/90 px-2 py-0.5 text-[11px] text-text"
                          >
                            <CircleCheck
                              className="h-3 w-3 text-accent"
                              strokeWidth={2}
                            />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Problem -> Twist Side-by-Side Diagnostic Strip */}
                  <div className="grid grid-cols-1 divide-y divide-border border-t border-border bg-bg/40 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                    <div className="p-3.5">
                      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-danger">
                        <TriangleAlert className="h-3 w-3" strokeWidth={2} />
                        Le problème
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                        {activeProduct.problemSolved}
                      </p>
                    </div>
                    <div className="bg-accent-muted/40 p-3.5">
                      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        <Lightbulb className="h-3 w-3" strokeWidth={2} />
                        Le twist mécanique
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text">
                        {activeProduct.theTwist}
                      </p>
                    </div>
                  </div>

                  {/* 1-Click Purchase & Inspection Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-elevated px-4 py-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/product/${activeProduct.slug}`}
                          className="truncate text-sm font-semibold text-text transition-colors hover:text-accent"
                        >
                          {activeProduct.name}
                        </Link>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2.5">
                        <RatingInline
                          rating={activeProduct.rating}
                          reviewCount={activeProduct.reviewCount}
                        />
                        <span className="font-mono text-[11px] text-text-muted">
                          · {formatCompactCount(activeReel.likesCount)}{" "}
                          réactions
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="mr-1 font-mono text-lg font-semibold tabular-nums text-accent">
                        {formatPriceEur(activeProduct.priceEur)}
                      </span>
                      <QuickViewButton product={activeProduct} variant="pill" />
                      <AddToCartButton
                        product={activeProduct}
                        openDrawerOnAdd
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
