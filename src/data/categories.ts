import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "mecanique",
    name: "Mécanique & Accès difficiles",
    shortName: "Mécanique",
    description:
      "Cliquets multi-entraînement, rallonges déportées, extracteurs et endoscopes pour zones confinées.",
    icon: "Wrench",
    accentLabel: "Couple & accès",
  },
  {
    slug: "electricite",
    name: "Électricité & Câblage",
    shortName: "Électricité",
    description:
      "Tire-fils magnétiques, dénudeurs rapides et connecteurs à levier conçus pour gagner du temps en cloison.",
    icon: "Zap",
    accentLabel: "Passage & raccord",
  },
  {
    slug: "menuiserie",
    name: "Menuiserie & Vissage",
    shortName: "Menuiserie",
    description:
      "Renvois d'angle flexibles, poussoirs de sécurité et tournevis compacts USB-C pour l'atelier bois et montage.",
    icon: "Hammer",
    accentLabel: "Précision & sécurité",
  },
  {
    slug: "mesure",
    name: "Mesure & Précision",
    shortName: "Mesure",
    description:
      "Mètres numériques connectés, télémètres laser poche, règles d'échelle et inclinomètres aimantés.",
    icon: "Ruler",
    accentLabel: "Lecture directe",
  },
  {
    slug: "bureau-tech",
    name: "Bureau, Tech & EDC",
    shortName: "Bureau / Tech",
    description:
      "Indicateurs de statut sans fil, pavés macro programmables, enregistreurs IA et accessoires EDC.",
    icon: "Cpu",
    accentLabel: "Focus & EDC",
  },
];
