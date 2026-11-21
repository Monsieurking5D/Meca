import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Check,
  CircleDollarSign,
  Ruler,
  ScanLine,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Le manifeste MECA Lab : comment on sélectionne un outil, comment on note sa robustesse et pourquoi on refuse les gadgets qui promettent trop.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: Wrench,
    title: "La friction d’abord",
    body: "Chaque référence part d’un geste concret qui coince : un manche bloqué, un fil trop court, une cote impossible à prendre seul. Si le problème n’existe pas sur le terrain, l’outil n’entre pas.",
  },
  {
    icon: ScanLine,
    title: "La démo avant la promesse",
    body: "On montre le geste, pas le slogan. Quand une vidéo fabricant existe, elle est liée à la source ; sinon la fiche assume un aperçu et le dit.",
  },
  {
    icon: ShieldCheck,
    title: "La robustesse nommée",
    body: "Pas de note vague : un grade explicite, un matériau vérifiable et une phrase qui dit où l’outil s’arrête. Un gadget peut être excellent — à condition d’être annoncé comme tel.",
  },
];

const GRADES = [
  {
    grade: "Pro",
    tone: "border-success/40 bg-success/10 text-success",
    recognition:
      "Acier Cr-V ou S2 forgé, garantie outillage professionnel, pièces d’usure remplaçables.",
    verdict: "Encaisse l’usage quotidien en atelier ou sur chantier.",
  },
  {
    grade: "Atelier",
    tone: "border-accent/40 bg-accent-muted text-accent",
    recognition:
      "Alliage sérieux, jeu maîtrisé, mais conçu pour un poste fixe plutôt que pour la ceinture.",
    verdict:
      "Le bon compromis pour un usage régulier non intensif, à prix contenu.",
  },
  {
    grade: "EDC",
    tone: "border-border-strong bg-surface-elevated text-text-secondary",
    recognition:
      "Compact et léger, finitions correctes, pensé pour être porté tous les jours.",
    verdict:
      "Excellent sur le terrain, à ne pas confondre avec du matériel de chantier.",
  },
  {
    grade: "Gadget",
    tone: "border-danger/40 bg-danger/10 text-danger",
    recognition:
      "Promesse spectaculaire, plastique apparent, pièce principale non remplaçable.",
    verdict:
      "Amusant et parfois utile, mais il ne remplace pas l’outil dédié.",
  },
];

const METHOD_STEPS = [
  "Repérer la friction dans une démo courte ou un retour d’atelier.",
  "Vérifier le mécanisme : quel geste devient possible, et à quel coût.",
  "Lire les matériaux et la disponibilité des pièces avant de retenir la fiche.",
  "Comparer le prix réel chez plusieurs revendeurs, pas le prix barré.",
];

const REFUSALS = [
  "Pas de visuel volé à un revendeur : les vignettes sont locales ou génériques par rayon.",
  "Pas d’avis inventés : les volumes affichés viennent des fiches publiques, arrondis.",
  "Pas de lien vidéo fabriqué : une démo non sourcée reste marquée comme aperçu.",
  "Pas de fausse fourchette de prix : le prix MECA et la fourchette revendeur sont distincts.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          À propos · Manifeste
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl lg:leading-tight">
          On ne vend pas des gadgets. On vend du temps d’atelier.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          MECA Lab est né d’un constat simple : la plupart des outils qui
          promettent de tout résoudre finissent au fond d’un tiroir. Ceux qui
          restent sur l’établi font une seule chose, mais la font à la place d’un
          geste pénible. C’est ce critère-là qu’on applique à chaque fiche.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
          Le catalogue couvre cinq rayons — mécanique, électricité, menuiserie,
          mesure, bureau et tech — parce que les frictions se ressemblent :
          accès impossible, cote introuvable, information qui n’arrive pas au bon
          moment.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {PRINCIPLES.map((principle) => (
          <article
            key={principle.title}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg text-accent">
              <principle.icon
                className="h-4 w-4"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
            <h2 className="mt-4 text-base font-semibold text-text">
              {principle.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {principle.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <div className="flex items-center gap-2">
          <Ruler className="h-4 w-4 text-accent" strokeWidth={1.75} />
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Vrai outil robuste vs gadget fragile
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Le grade affiché sur chaque fiche n’est pas une note de qualité
          abstraite : c’est une réponse à la question « est-ce que je peux le
          jeter dans une caisse à outils sans y penser ? ».
        </p>

        <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">
              Grades de robustesse MECA Lab et critères de reconnaissance
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="w-28 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-muted"
                >
                  Grade
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-muted"
                >
                  À quoi on le reconnaît
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-text-muted"
                >
                  Verdict
                </th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map((row) => (
                <tr key={row.grade} className="border-b border-border last:border-b-0">
                  <th scope="row" className="px-4 py-4 align-top">
                    <span
                      className={`inline-flex rounded border px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ${row.tone}`}
                    >
                      {row.grade}
                    </span>
                  </th>
                  <td className="px-4 py-4 align-top text-sm leading-relaxed text-text-secondary">
                    {row.recognition}
                  </td>
                  <td className="px-4 py-4 align-top text-sm leading-relaxed text-text-secondary">
                    {row.verdict}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-accent" strokeWidth={2} />
            <h2 className="text-xl font-semibold tracking-tight text-text">
              Comment un outil entre au catalogue
            </h2>
          </div>
          <ol className="mt-4 space-y-3">
            {METHOD_STEPS.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3"
              >
                <span className="font-mono text-xs tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-text-secondary">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Ban className="h-4 w-4 text-danger" strokeWidth={1.75} />
            <h2 className="text-xl font-semibold tracking-tight text-text">
              Ce qu’on refuse de faire
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {REFUSALS.map((refusal) => (
              <li key={refusal} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />
                <span className="text-sm leading-relaxed text-text-secondary">
                  {refusal}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border-strong bg-surface-elevated p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CircleDollarSign
                className="h-4 w-4 text-accent"
                strokeWidth={1.75}
              />
              <h2 className="text-lg font-semibold text-text">
                Un prix affiché, une fourchette assumée
              </h2>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
              Le prix MECA est une référence, pas une promesse de stock. La
              fourchette revendeur indique ce qu’on observe réellement ailleurs,
              et chaque fiche pointe vers un lien marchand pour vérifier.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/shop"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
            >
              Boutique
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <Link
              href="/compare"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border-strong bg-surface px-4 text-sm font-semibold text-text transition-colors hover:border-text-muted"
            >
              Comparateur
            </Link>
          </div>
        </div>
      </section>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-text-muted">
        MECA Lab · Catalogue indépendant · Aucun produit offert par une marque
      </p>
    </div>
  );
}
