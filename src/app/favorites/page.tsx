import type { Metadata } from "next";
import { FavoritesList } from "./FavoritesList";

export const metadata: Metadata = {
  title: "Favoris",
  description:
    "Votre sélection d’outils MECA Lab, enregistrée localement sur cet appareil.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Favoris · Sélection locale
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Les outils que vous gardez sous le coude.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          Aucun compte, aucun e-mail : la sélection vit dans le stockage local de
          ce navigateur. Elle survit au rechargement, pas au changement
          d’appareil.
        </p>
      </header>

      <div className="mt-8">
        <FavoritesList />
      </div>
    </div>
  );
}
