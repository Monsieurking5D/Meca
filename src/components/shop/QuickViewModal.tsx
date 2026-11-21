"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  CircleMinus,
  Lightbulb,
  PlayCircle,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { getCategoryBySlug, getReelById } from "@/data";
import { Modal } from "@/components/ui";
import { formatPriceEur, formatPriceRangeEur } from "@/lib/utils";
import { useQuickView } from "@/store";
import {
  AddToCartButton,
  CompareToggleButton,
  FavoriteButton,
} from "./ProductActions";
import { DurabilityBadge, RatingInline } from "./ProductMeta";

export function QuickViewModal() {
  const { activeProduct, closeQuickView } = useQuickView();

  if (!activeProduct) {
    return null;
  }

  const category = getCategoryBySlug(activeProduct.category);
  const linkedReel = activeProduct.reelId
    ? getReelById(activeProduct.reelId)
    : undefined;

  return (
    <Modal
      open={Boolean(activeProduct)}
      onClose={closeQuickView}
      title={activeProduct.name}
      description={`${activeProduct.brand} · ${category?.name ?? activeProduct.category}`}
      size="lg"
      footer={
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FavoriteButton
              productId={activeProduct.id}
              productName={activeProduct.name}
            />
            <CompareToggleButton
              productSlug={activeProduct.slug}
              productName={activeProduct.name}
            />
            <Link
              href={`/product/${activeProduct.slug}`}
              onClick={closeQuickView}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-strong bg-surface px-3 text-xs font-medium text-text-secondary transition-colors hover:border-text-muted hover:text-text"
            >
              <span>Page complète</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block font-mono text-lg font-semibold tabular-nums text-accent">
                {formatPriceEur(activeProduct.priceEur)}
              </span>
              <span className="block font-mono text-[10px] text-text-muted">
                Marché :{" "}
                {formatPriceRangeEur(
                  activeProduct.priceRangeEur.min,
                  activeProduct.priceRangeEur.max
                )}
              </span>
            </div>
            <AddToCartButton
              product={activeProduct}
              openDrawerOnAdd
              className="h-10 px-4 text-xs"
            />
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Left column: Visual + Reel callout */}
        <div className="space-y-4 md:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-bg">
            <Image
              src={activeProduct.media.thumbnailUrl}
              alt={activeProduct.name}
              fill
              className="object-cover"
            />
            <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
              <DurabilityBadge grade={activeProduct.durability} />
            </div>
          </div>

          {linkedReel ? (
            <div className="rounded-xl border border-accent/35 bg-accent-muted p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Démo Reel · 00:
                  {String(linkedReel.durationSeconds).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] text-text-secondary">
                  {linkedReel.creatorHandle}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-text">
                {linkedReel.hook}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href={`/reels?reel=${linkedReel.id}`}
                  onClick={closeQuickView}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5 font-mono text-[11px] font-semibold text-bg transition-colors hover:bg-accent-hover"
                >
                  <PlayCircle className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span>Ouvrir le Reel</span>
                </Link>
                <a
                  href={activeProduct.media.externalDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-text-secondary transition-colors hover:text-text"
                >
                  <span>Source</span>
                  <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          ) : (
            <a
              href={activeProduct.media.externalDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated px-3.5 py-2.5 text-xs text-text-secondary transition-colors hover:border-accent/40 hover:text-text"
            >
              <span className="inline-flex items-center gap-2">
                <PlayCircle
                  className="h-4 w-4 text-accent"
                  strokeWidth={1.75}
                />
                <span>Voir la source / fiche fabricant</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          )}

          <div className="rounded-xl border border-border bg-surface-elevated p-3.5">
            <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
              <ShieldCheck
                className="h-3.5 w-3.5 text-accent"
                strokeWidth={1.75}
              />
              Verdict robustesse
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
              {activeProduct.durabilityNote}
            </p>
          </div>
        </div>

        {/* Right column: Problem / Twist / Specs / Pros & Cons */}
        <div className="space-y-4 md:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-text-secondary">
              {activeProduct.tagline}
            </p>
            <RatingInline
              rating={activeProduct.rating}
              reviewCount={activeProduct.reviewCount}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg/70 p-3.5">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-danger">
                <TriangleAlert className="h-3.5 w-3.5" strokeWidth={2} />
                Friction terrain
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                {activeProduct.problemSolved}
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent-muted p-3.5">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                <Lightbulb className="h-3.5 w-3.5" strokeWidth={2} />
                Le twist mécanique
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-text">
                {activeProduct.theTwist}
              </p>
            </div>
          </div>

          {/* Specs table */}
          <div className="rounded-xl border border-border bg-bg/50 p-3.5">
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
              Spécifications clés
            </h4>
            <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {activeProduct.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col border-b border-border/60 pb-1.5"
                >
                  <dt className="font-mono text-[10px] text-text-muted">
                    {spec.label}
                  </dt>
                  <dd className="mt-0.5 font-mono font-medium text-text">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-success">
                Points forts
              </h4>
              <ul className="mt-2 space-y-1.5">
                {activeProduct.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-1.5 text-xs text-text-secondary"
                  >
                    <CircleCheck
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success"
                      strokeWidth={1.75}
                    />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Limites honnêtes
              </h4>
              <ul className="mt-2 space-y-1.5">
                {activeProduct.cons.map((con) => (
                  <li
                    key={con}
                    className="flex items-start gap-1.5 text-xs text-text-secondary"
                  >
                    <CircleMinus
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-muted"
                      strokeWidth={1.75}
                    />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
