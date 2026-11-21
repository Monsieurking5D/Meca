import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-xl flex-col items-start justify-center px-4 py-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent">
        <Wrench className="h-3.5 w-3.5" strokeWidth={1.75} />
        Erreur 404 · Module introuvable
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text">
        Cette page est en cours d&apos;assemblage ou n&apos;existe pas.
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        Consultez le plan multi-agents dans le dépôt ou revenez vers
        l&apos;accueil et la boutique MECA Lab.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          <span>Retour à l&apos;accueil</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-surface-elevated"
        >
          <span>Voir la boutique</span>
        </Link>
      </div>
    </div>
  );
}
