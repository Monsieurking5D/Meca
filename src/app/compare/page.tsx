import type { Metadata } from "next";
import { Suspense } from "react";
import { PRODUCTS } from "@/data";
import { CompareBoard } from "./CompareBoard";

export const metadata: Metadata = {
  title: "Comparateur",
  description:
    "Comparez deux ou trois outils MECA Lab côte à côte : prix, robustesse, points forts, limites et spécifications.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Comparateur · {PRODUCTS.length} outils comparables
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Deux outils, un seul problème à résoudre.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          Mettez deux ou trois références face à face : le prix, le grade de
          robustesse et surtout le twist fonctionnel de chacun. La sélection est
          encodée dans l&apos;URL, donc partageable telle quelle.
        </p>
      </header>

      <div className="mt-8">
        {/* useSearchParams needs a Suspense boundary for static prerendering. */}
        <Suspense
          fallback={
            <p className="text-sm text-text-secondary">
              Chargement du comparateur…
            </p>
          }
        >
          <CompareBoard />
        </Suspense>
      </div>
    </div>
  );
}
