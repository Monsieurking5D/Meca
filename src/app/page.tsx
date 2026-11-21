import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  ExternalLink,
  Hammer,
  Play,
  Ruler,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { CATEGORIES, PRODUCTS, REELS } from "@/data";
import { formatCompactCount, formatPriceEur } from "@/lib/utils";

const CATEGORY_ICONS = {
  Wrench,
  Zap,
  Hammer,
  Ruler,
  Cpu,
} as const;

export default function HomePage() {
  const heroReel = REELS[0];
  const heroProduct = PRODUCTS.find((p) => p.slug === heroReel?.productSlug);

  return (
    <div className="bg-workshop-grid">
      {/* Split Asymmetric Hero */}
      <section className="border-b border-border bg-bg/90">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Atelier · Mesure · Hardware
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl lg:leading-[1.04]">
              Des outils malins qui suppriment les vraies frictions.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              MECA Lab réunit les meilleurs outils de contournement mécanique,
              instruments de mesure connectés et accessoires d&apos;atelier.
              Voyez l&apos;astuce en démo courte, comparez la robustesse, puis
              équipez-vous en direct.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/reels"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-bg transition-transform active:scale-[0.98] hover:bg-accent-hover"
              >
                <Play className="h-4 w-4 fill-current" strokeWidth={1.75} />
                <span>Explorer les Reels</span>
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface-elevated px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-text-muted hover:bg-surface"
              >
                <span>Ouvrir la boutique</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-border border-t border-border pt-6">
              <div className="pr-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Rayons métiers
                </dt>
                <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-text">
                  5 pôles
                </dd>
              </div>
              <div className="px-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Format démo
                </dt>
                <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-text">
                  &lt; 30 sec
                </dd>
              </div>
              <div className="pl-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Standard atelier
                </dt>
                <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-accent">
                  Cr-V &amp; S2
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Hardware Reel Preview Frame */}
          {heroReel && heroProduct ? (
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-secondary">
                      APERÇU REEL · {heroReel.creatorHandle}
                    </span>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-text-muted">
                    00:{String(heroReel.durationSeconds).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative aspect-[4/3] w-full bg-bg">
                  <Image
                    src={heroReel.posterUrl}
                    alt={heroProduct.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/85 to-transparent p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      Problème → Twist
                    </p>
                    <p className="mt-1 text-sm font-medium text-text">
                      {heroReel.hook}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-border bg-surface-elevated px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-text">
                      {heroProduct.name}
                    </p>
                    <p className="mt-0.5 font-mono text-xs tabular-nums text-text-secondary">
                      {formatPriceEur(heroProduct.priceEur)} ·{" "}
                      {formatCompactCount(heroReel.likesCount)} réactions
                    </p>
                  </div>
                  <Link
                    href="/reels"
                    className="shrink-0 rounded-lg border border-accent/40 bg-accent-muted px-3 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-bg"
                  >
                    VOIR LE FLUX
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 5 Métiers Index */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Index des métiers
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text">
              Chaque rayon cible une contrainte terrain
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent"
          >
            <span>Tout le catalogue</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => {
            const Icon =
              CATEGORY_ICONS[
                category.icon as keyof typeof CATEGORY_ICONS
              ] ?? Wrench;

            return (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-elevated"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-bg text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      {category.accentLabel}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-text group-hover:text-accent">
                    {category.shortName}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                    {category.description}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-text-muted group-hover:text-text">
                  <span>Explorer</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={1.75} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Starter Showcase (Expanded by Freebuff in T-004 & Antigravity in T-008) */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Banc d&apos;essai initial
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text">
              Sélection issue des premiers Reels analysés
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
            <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.75} />
            <span>Filtrage vrai outil vs gadget fragile</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong"
            >
              <div>
                <div className="relative aspect-[4/3] w-full border-b border-border bg-bg">
                  <Image
                    src={product.media.thumbnailUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded border border-border-strong bg-bg/90 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                    {product.brand}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-text">
                      {product.name}
                    </h3>
                    <span className="shrink-0 font-mono text-base font-semibold tabular-nums text-accent">
                      {formatPriceEur(product.priceEur)}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-text-secondary">
                    {product.tagline}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
                    <div>
                      <span className="font-mono uppercase tracking-wider text-text-muted">
                        Problème :{" "}
                      </span>
                      <span className="text-text-secondary">
                        {product.problemSolved}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono uppercase tracking-wider text-accent">
                        Le twist :{" "}
                      </span>
                      <span className="text-text">{product.theTwist}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border bg-surface-elevated px-5 py-3">
                <Link
                  href={`/product/${product.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-text transition-colors hover:text-accent"
                >
                  <span>Fiche technique</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>

                <a
                  href={product.media.externalDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-text-secondary transition-colors hover:text-text"
                >
                  <span>Reel source</span>
                  <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
