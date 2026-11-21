import type { Metadata } from "next";
import { Suspense } from "react";
import { CATEGORIES, PRODUCTS } from "@/data";
import { CartTrigger } from "@/components/shop/CartTrigger";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Outils malins, instruments de mesure et hardware d'atelier sélectionnés par MECA Lab : filtrez par métier, prix et robustesse.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Boutique · {PRODUCTS.length} outils · {CATEGORIES.length} rayons
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Le bon outil pour le problème précis.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Chaque fiche répond à une friction réelle d&apos;atelier. Note de
            robustesse honnête : <span className="text-text">Pro</span> et{" "}
            <span className="text-text">Atelier</span> encaissent,{" "}
            <span className="text-text">Gadget</span> amuse.
          </p>
        </div>
        <CartTrigger className="self-start sm:self-auto" />
      </header>

      <div className="mt-8">
        {/* useSearchParams needs a Suspense boundary for static prerendering;
            the fallback renders the unfiltered grid so content is never blank. */}
        <Suspense fallback={<ProductGrid products={PRODUCTS} />}>
          <ShopCatalog />
        </Suspense>
      </div>
    </div>
  );
}
