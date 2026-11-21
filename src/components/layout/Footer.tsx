import Link from "next/link";
import { CATEGORIES } from "@/data";
import { SITE_CONFIG } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight text-text">
                MECA
              </span>
              <span className="rounded border border-accent/35 bg-accent-muted px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
                Lab
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
              {SITE_CONFIG.tagline}. Chaque fiche expose le problème réel,
              l&apos;astuce mécanique ou électronique et la limite de robustesse
              avant l&apos;achat.
            </p>
            <p className="mt-4 font-mono text-xs text-text-muted">
              CR-V · ACIER S2 · MESURE LASER · HARDWARE BUREAU
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
              Métiers & Rayons
            </h2>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
              Plateforme
            </h2>
            <ul className="mt-3 space-y-2">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/favorites"
                  className="text-sm text-text-secondary transition-colors hover:text-text"
                >
                  Favoris
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-sm text-text-secondary transition-colors hover:text-text"
                >
                  Panier & Commande
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Sélection
            indépendante d&apos;outillage et de matériel de précision.
          </p>
          <p className="font-mono">
            ARCHITECTURE NEXT.JS · PRÊT POUR VERCEL
          </p>
        </div>
      </div>
    </footer>
  );
}
