import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Scale, ShieldCheck } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data";
import { WorkbenchHero } from "@/components/home/WorkbenchHero";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export default function HomePage() {
  return (
    <div className="bg-workshop-grid">
      {/* 1. Interactive Reels & 1-Click Workbench Studio */}
      <WorkbenchHero />

      {/* 2. Complete Filterable Catalog directly on Homepage (0 extra clicks to shop!) */}
      <section
        id="catalogue-atelier"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              Catalogue interactif · {PRODUCTS.length} outils ·{" "}
              {CATEGORIES.length} rayons
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text">
              Tous les outils filtrables en direct
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono">
              <ShieldCheck
                className="h-3.5 w-3.5 text-accent"
                strokeWidth={1.75}
              />
              Aperçu specs, comparateur &amp; panier en 1 clic sur chaque carte
            </span>
          </div>
        </div>

        <Suspense fallback={<ProductGrid products={PRODUCTS} />}>
          <ShopCatalog />
        </Suspense>
      </section>

      {/* 3. Compact Pro Durability & Comparison Footer Strip */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border-strong bg-surface/85 p-1.5 shadow-xl">
          <div className="grid grid-cols-1 divide-y divide-border rounded-[calc(1rem-2px)] border border-white/[0.04] bg-surface lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            <div className="flex flex-col justify-between p-6 lg:col-span-7">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  Grille d&apos;évaluation MECA Lab
                </p>
                <h2 className="mt-1.5 text-lg font-semibold text-text">
                  4 grades de robustesse pour séparer le vrai outillage du
                  gadget
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <div className="rounded-lg border border-success/35 bg-success/10 p-2.5">
                    <span className="font-mono text-xs font-bold text-success">
                      PRO
                    </span>
                    <p className="mt-1 text-[11px] leading-snug text-text-secondary">
                      Acier Cr-V / S2 forgé, usage intensif chantier.
                    </p>
                  </div>
                  <div className="rounded-lg border border-accent/35 bg-accent-muted p-2.5">
                    <span className="font-mono text-xs font-bold text-accent">
                      ATELIER
                    </span>
                    <p className="mt-1 text-[11px] leading-snug text-text-secondary">
                      Alliage sérieux, idéal établi &amp; maintenance.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-strong bg-surface-elevated p-2.5">
                    <span className="font-mono text-xs font-bold text-text">
                      EDC
                    </span>
                    <p className="mt-1 text-[11px] leading-snug text-text-secondary">
                      Compact, léger, pensé pour la poche ou le bureau.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-bg/60 p-2.5">
                    <span className="font-mono text-xs font-bold text-text-muted">
                      GADGET
                    </span>
                    <p className="mt-1 text-[11px] leading-snug text-text-secondary">
                      Astucieux mais couple ou usage limité annoncé.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary transition-colors hover:text-accent"
                >
                  <span>Méthode de sélection complète</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-surface-elevated/40 p-6 lg:col-span-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Arbitrage rapide
                </p>
                <h2 className="mt-1.5 text-lg font-semibold text-text">
                  Comparez 2 à 3 outils côte à côte
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  Cliquez sur l&apos;icône balance en haut à droite de
                  n&apos;importe quelle carte produit pour l&apos;épingler dans
                  la barre de comparaison, ou ouvrez directement le tableau
                  comparatif.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-bg transition-colors hover:bg-accent-hover"
                >
                  <Scale className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span>Ouvrir le comparateur</span>
                </Link>
                <Link
                  href="/reels"
                  className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-xs font-semibold text-text transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <span>Flux Reels plein écran</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
