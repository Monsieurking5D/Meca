import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Hammer,
  Play,
  PlayCircle,
  Ruler,
  Scale,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import {
  CATEGORIES,
  getFeaturedProducts,
  getProductBySlug,
  getProductsByCategory,
  getReelById,
  PRODUCTS,
  REELS,
} from "@/data";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { formatCompactCount, formatPriceEur } from "@/lib/utils";

const CATEGORY_ICONS = {
  Wrench,
  Zap,
  Hammer,
  Ruler,
  Cpu,
} as const;

const FLAGSHIP_REEL_IDS = [
  "reel-lozlin-ratchet",
  "reel-flex-90-driver",
  "reel-luxafor-duo",
  "reel-porte-cles-carbone-findmy",
];

export default function HomePage() {
  const heroReel = REELS[0];
  const heroProduct = heroReel
    ? getProductBySlug(heroReel.productSlug)
    : undefined;

  const flagshipReels = FLAGSHIP_REEL_IDS.map((id) => getReelById(id)).filter(
    (reel): reel is NonNullable<typeof reel> => Boolean(reel)
  );
  const showcaseReels =
    flagshipReels.length >= 4 ? flagshipReels : REELS.slice(0, 4);

  const quickJumpReels = REELS.slice(1, 3);
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <div className="bg-workshop-grid">
      {/* 1. Split Asymmetric Hero */}
      <section className="border-b border-border bg-bg/92">
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

              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-3 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
              >
                <Scale className="h-4 w-4" strokeWidth={1.75} />
                <span>Comparer 2 outils</span>
              </Link>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-border border-t border-border pt-6">
              <div className="pr-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Catalogue actif
                </dt>
                <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-text">
                  {PRODUCTS.length} outils
                </dd>
              </div>
              <div className="px-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Démos courtes
                </dt>
                <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-text">
                  {REELS.length} reels
                </dd>
              </div>
              <div className="pl-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Rayons métiers
                </dt>
                <dd className="mt-1 font-mono text-xl font-semibold tabular-nums text-accent">
                  {CATEGORIES.length} pôles
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

                <Link
                  href={`/reels?reel=${heroReel.id}`}
                  className="group relative block aspect-[4/3] w-full bg-bg"
                >
                  <Image
                    src={heroReel.posterUrl}
                    alt={heroProduct.name}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    priority
                  />
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-bg/90 px-2.5 py-1 font-mono text-[11px] text-accent">
                    <Play className="h-3 w-3 fill-current" strokeWidth={1.75} />
                    <span>Lancer</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/88 to-transparent p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      Problème → Twist
                    </p>
                    <p className="mt-1 text-sm font-medium text-text">
                      {heroReel.hook}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center justify-between gap-4 border-t border-border bg-surface-elevated px-4 py-3.5">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${heroProduct.slug}`}
                      className="block truncate text-sm font-semibold text-text transition-colors hover:text-accent"
                    >
                      {heroProduct.name}
                    </Link>
                    <p className="mt-0.5 font-mono text-xs tabular-nums text-text-secondary">
                      {formatPriceEur(heroProduct.priceEur)} ·{" "}
                      {formatCompactCount(heroReel.likesCount)} réactions
                    </p>
                  </div>
                  <Link
                    href={`/reels?reel=${heroReel.id}`}
                    className="shrink-0 rounded-lg border border-accent/40 bg-accent-muted px-3 py-2 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-bg"
                  >
                    VOIR CE REEL
                  </Link>
                </div>

                {quickJumpReels.length > 0 ? (
                  <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-bg/70">
                    {quickJumpReels.map((reel) => (
                      <Link
                        key={reel.id}
                        href={`/reels?reel=${reel.id}`}
                        className="group flex items-center gap-2 px-3 py-2.5 text-xs text-text-secondary transition-colors hover:bg-surface hover:text-text"
                      >
                        <PlayCircle
                          className="h-3.5 w-3.5 shrink-0 text-accent"
                          strokeWidth={1.75}
                        />
                        <span className="truncate font-medium group-hover:text-accent">
                          {reel.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 2. Aperçu du flux Reels */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Démos courtes · Problème → Twist
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text">
              Aperçu du flux Reels
            </h2>
          </div>
          <Link
            href="/reels"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent"
          >
            <span>Ouvrir les {REELS.length} Reels</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseReels.map((reel) => {
            const product = getProductBySlug(reel.productSlug);
            return (
              <Link
                key={reel.id}
                href={`/reels?reel=${reel.id}`}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/50 hover:bg-surface-elevated"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg">
                    <Image
                      src={reel.posterUrl}
                      alt={reel.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded border border-border-strong bg-bg/90 px-2 py-0.5 font-mono text-[10px] text-text-secondary">
                      {reel.creatorHandle}
                    </span>
                    <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded border border-border-strong bg-bg/90 px-2 py-0.5 font-mono text-[10px] tabular-nums text-accent">
                      <Play className="h-2.5 w-2.5 fill-current" />
                      00:{String(reel.durationSeconds).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold leading-snug text-text group-hover:text-accent">
                      {reel.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                      {reel.hook}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border bg-bg/50 px-4 py-2.5">
                  <span className="truncate font-mono text-[11px] text-text-muted">
                    {product ? product.brand : "Démo MECA"}
                  </span>
                  {product ? (
                    <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-accent">
                      {formatPriceEur(product.priceEur)}
                    </span>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Index des 5 Métiers */}
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
            const categoryCount = getProductsByCategory(category.slug).length;

            return (
              <Link
                key={category.slug}
                href={`/shop?cat=${category.slug}`}
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
                <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-text-muted group-hover:text-text">
                  <span className="tabular-nums">{categoryCount} outils</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={1.75} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Sélection phare MECA Lab (Boutique interactive) */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Banc d&apos;essai · {PRODUCTS.length} outils référencés
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text">
              Sélection phare MECA Lab
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.75} />
              <span>Ajout panier &amp; favoris en 1 clic</span>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-text"
            >
              <span>Voir les {PRODUCTS.length} outils</span>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* 5. Bandeau Atelier : Comparateur & Manifeste */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-2xl border border-border-strong bg-surface p-6 sm:p-8 lg:col-span-7">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                Outil d&apos;arbitrage
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text">
                Comparez jusqu&apos;à 3 outils côte à côte
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-text-secondary">
                Hésitation entre deux cliquets ou deux télémètres ? Alignez
                prix, fourchettes revendeurs, grades de robustesse,
                spécifications techniques et limites honnêtes dans un tableau
                partageable.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
              >
                <Scale className="h-4 w-4" strokeWidth={1.75} />
                <span>Ouvrir le comparateur</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8 lg:col-span-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Méthode MECA Lab
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-text">
                Vrai outil vs gadget fragile
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                Acier Cr-V/S2, jeu mécanique, ergonomie terrain et limites
                assumées : découvrez nos 4 grades de robustesse (Pro, Atelier,
                EDC, Gadget) avant de commander.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent/50 hover:text-accent"
              >
                <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <span>Lire le manifeste</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
