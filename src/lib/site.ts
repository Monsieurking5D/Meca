export interface NavItem {
  label: string;
  href: string;
}

export const SITE_CONFIG = {
  name: "MECA Lab",
  shortName: "MECA",
  tagline: "Outils malins, mesure augmentée & hardware d'atelier",
  description:
    "Plateforme mixte de démos courtes façon Reels et boutique intégrée dédiée aux outils ingénieux, instruments de mesure et accessoires qui suppriment les frictions au travail.",
  navItems: [
    { label: "Accueil", href: "/" },
    { label: "Reels", href: "/reels" },
    { label: "Boutique", href: "/shop" },
    { label: "Comparer", href: "/compare" },
    { label: "À propos", href: "/about" },
  ] satisfies NavItem[],
};

export function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!configured) {
    return "https://meca-lab.vercel.app";
  }

  if (configured.startsWith("http://") || configured.startsWith("https://")) {
    return configured.replace(/\/+$/, "");
  }

  return `https://${configured.replace(/\/+$/, "")}`;
}
