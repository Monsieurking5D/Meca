import type { Metadata } from "next";
import { Suspense } from "react";
import { ReelFeed } from "@/components/reels/ReelFeed";

export const metadata: Metadata = {
  title: "Reels",
  description:
    "Démos courtes d'outils malins : le problème, l'astuce, et l'outil en un clic dans le panier.",
  alternates: { canonical: "/reels" },
};

export default function ReelsPage() {
  return (
    <>
      <h1 className="sr-only">Reels MECA Lab — démos d&apos;outils</h1>
      {/* useSearchParams (?cat=, ?reel=) needs a Suspense boundary for static prerendering. */}
      <Suspense
        fallback={
          <div
            aria-busy="true"
            aria-label="Chargement des Reels"
            className="mx-auto h-[calc(100dvh-8rem)] w-full max-w-md animate-pulse bg-surface md:my-4 md:h-[calc(100dvh-6rem)] md:rounded-2xl"
          />
        }
      >
        <ReelFeed />
      </Suspense>
    </>
  );
}
