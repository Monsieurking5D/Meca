import type {
  Category,
  CategorySlug,
  Product,
  ProductFilterState,
  ReelItem,
} from "@/types";

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

export const PRODUCTS: Product[] = [
  {
    id: "prod-lozlin-ratchet",
    slug: "lozlin-cliquet-rotatif",
    name: "Cliquet rotatif multi-entraînement LOZLIN",
    brand: "LOZLIN",
    tagline: "3 modes d'entraînement dans les espaces où le manche est bloqué.",
    category: "mecanique",
    problemSolved:
      "Impossible de faire osciller le manche d'une clé à cliquet classique dans un compartiment moteur étroit.",
    theTwist:
      "Double pommeau rotatif sur la tête + entrée 1/4\" à l'extrémité du manche permettant d'entraîner la douille par visseuse.",
    description:
      "Clé à cliquet compacte en acier chromé brossé (~22 cm) dotée d'une poignée bi-matière et d'une transmission interne par renvoi d'angle. Elle fonctionne en cliquet standard, en rotation manuelle rapide via sa tourelle arrière ou entraînée directement par le talon du manche.",
    priceEur: 39,
    priceRangeEur: { min: 32, max: 48 },
    rating: 4.6,
    reviewCount: 214,
    durability: "atelier",
    durabilityNote:
      "Corps et col en acier chromé ; privilégier le déblocage final en mode manuel sur les boulons fortement grippés.",
    inStock: true,
    featured: true,
    isNew: true,
    tags: ["cliquet", "accès difficile", "auto", "visseuse", "3-en-1"],
    specs: [
      { label: "Longueur", value: "220 mm" },
      { label: "Entraînements", value: "Manche, tourelle, talon 1/4\"" },
      { label: "Finition", value: "Acier chromé brossé + grip" },
      { label: "Usage idéal", value: "Baies moteur & sous-ensembles" },
    ],
    pros: [
      "Visse et dévisse avec zéro débattement latéral",
      "Compatible avec une rallonge de visseuse sans fil",
      "Passage rapide entre approche au doigt et serrage manuel",
    ],
    cons: [
      "Couple maximal limité comparé à une barre de force",
      "Tête légèrement plus épaisse qu'un cliquet ultra-fin",
    ],
    media: {
      thumbnailUrl: "/images/products/lozlin-ratchet.svg",
      galleryUrls: ["/images/products/lozlin-ratchet.svg"],
      externalDemoUrl: "https://www.instagram.com/p/De4tnzBubEa/",
    },
    reelId: "reel-lozlin-ratchet",
  },
  {
    id: "prod-flex-90-driver",
    slug: "renvoi-angle-90-flexible",
    name: "Renvoi d'angle 90° à arbre flexible",
    brand: "CooperTool / Atelier",
    tagline: "Contournez les parois et vissez au fond d'un caisson sans démonter.",
    category: "menuiserie",
    problemSolved:
      "Le corps de la perceuse-visseuse ne passe pas face à une cloison, une étagère ou l'intérieur d'un meuble.",
    theTwist:
      "Gaine flexible de torsion (~28 cm) couplée à une tête métallique à 90° équipée d'une poignée stabilisatrice amovible.",
    description:
      "Accessoire de renvoi compact associant un arbre souple haute torsion à queue hexagonale 1/4\" et un carter d'engrenage en L tout métal avec porte-embout rapide. Permet de laisser la visseuse à l'extérieur du meuble ou derrière un montant pendant le vissage.",
    priceEur: 29,
    priceRangeEur: { min: 22, max: 39 },
    rating: 4.5,
    reviewCount: 389,
    durability: "atelier",
    durabilityNote:
      "Carter en alliage métallique indispensable ; éviter les copies à pignons plastique sur vis à bois longues.",
    inStock: true,
    featured: true,
    tags: ["renvoi d'angle", "arbre flexible", "menuiserie", "caisson", "1/4"],
    specs: [
      { label: "Angle tête", value: "90° compact (porte-embout 1/4\")" },
      { label: "Longueur flexible", value: "~280 mm" },
      { label: "Maintien", value: "Poignée latérale vissable" },
      { label: "Compatibilité", value: "Visseuses et perceuses 1/4\" hex" },
    ],
    pros: [
      "Passe à travers un perçage ou par-dessus un rebord",
      "Carter métallique compact avec bague de verrouillage rapide",
      "Poignée auxiliaire pour appliquer une pression franche",
    ],
    cons: [
      "Perte de rendement légère lorsque l'arbre est très courbé",
      "Moins adapté aux visseuses à chocs à pleine puissance",
    ],
    media: {
      thumbnailUrl: "/images/products/flex-90-driver.svg",
      galleryUrls: ["/images/products/flex-90-driver.svg"],
      externalDemoUrl: "https://www.instagram.com/p/Df064VUh2mb/",
    },
    reelId: "reel-flex-90-driver",
  },
  {
    id: "prod-luxafor-duo",
    slug: "luxafor-duo-statut-sans-fil",
    name: "Duo lumineux sans fil Luxafor",
    brand: "Luxafor",
    tagline: "Signalez votre disponibilité sur la porte sans quitter votre poste.",
    category: "bureau-tech",
    problemSolved:
      "Les interruptions constantes en open space ou devant un bureau fermé pendant les appels et phases de concentration.",
    theTwist:
      "Un cube diffuseur posé sur le bureau synchronise instantanément sans câble la balise lumineuse fixée côté couloir.",
    description:
      "Système composé d'un contrôleur cubique en polymère dépoli et d'une balise murale/porte assortie. D'un simple geste sur le bureau, les deux modules affichent la même couleur de statut (Occupé, En réunion, Pause, Disponible) sans tirage de câble.",
    priceEur: 89,
    priceRangeEur: { min: 75, max: 110 },
    rating: 4.7,
    reviewCount: 162,
    durability: "edc",
    durabilityNote:
      "Châssis polymère dépoli robuste et autonomie sans fil pensée pour un usage bureau quotidien.",
    inStock: true,
    featured: true,
    isNew: true,
    tags: ["bureau", "focus", "statut LED", "sans fil", "productivité"],
    specs: [
      { label: "Modules inclus", value: "1 cube bureau + 1 balise porte" },
      { label: "États couleur", value: "Rouge, Bleu, Ambre, Vert" },
      { label: "Liaison", value: "Synchronisation radio sans fil" },
      { label: "Installation", value: "Autonome sans câble apparent" },
    ],
    pros: [
      "Compréhension immédiate à distance sans lire de texte",
      "Zéro câble à faire passer sous la porte",
      "Rappel visuel symétrique sur le bureau et dans le couloir",
    ],
    cons: [
      "Recharge périodique nécessaire sur les modules autonomes",
      "N'affiche pas de message texte personnalisé",
    ],
    media: {
      thumbnailUrl: "/images/products/luxafor-status.svg",
      galleryUrls: ["/images/products/luxafor-status.svg"],
      externalDemoUrl: "https://www.instagram.com/p/Db-YbaKoqQ6/",
      officialUrl: "https://luxafor.com",
    },
    reelId: "reel-luxafor-duo",
    merchantUrl: "https://luxafor.com",
  },
];

export const REELS: ReelItem[] = [
  {
    id: "reel-lozlin-ratchet",
    title: "Visser quand le manche du cliquet est bloqué",
    hook: "Deux canettes bloquent le manche : la visseuse s'emboîte au talon et entraîne quand même la douille.",
    creatorHandle: "@galaxee.auto",
    category: "mecanique",
    productSlug: "lozlin-cliquet-rotatif",
    durationSeconds: 22,
    sourceType: "instagram",
    posterUrl: "/images/products/lozlin-ratchet.svg",
    externalUrl: "https://www.instagram.com/p/De4tnzBubEa/",
    likesCount: 26300,
    highlights: [
      "Rotation manuelle par double pommeau arrière",
      "Entraînement visseuse par le bas du manche",
      "Zéro débattement latéral requis",
    ],
  },
  {
    id: "reel-flex-90-driver",
    title: "Contourner un caisson avec renvoi 90° flexible",
    hook: "La visseuse reste dehors pendant que la tête 90° passe à travers un montant et visse au ras du bois.",
    creatorHandle: "@daronbrutto",
    category: "menuiserie",
    productSlug: "renvoi-angle-90-flexible",
    durationSeconds: 26,
    sourceType: "instagram",
    posterUrl: "/images/products/flex-90-driver.svg",
    externalUrl: "https://www.instagram.com/p/Df064VUh2mb/",
    likesCount: 50400,
    highlights: [
      "Carter métallique compact avec poignée latérale",
      "Arbre souple qui passe par un perçage",
      "Porte-embout rapide 1/4\" hex",
    ],
  },
  {
    id: "reel-luxafor-duo",
    title: "Bloquer les interruptions avant la poignée de porte",
    hook: "Un tap sur le cube du bureau change instantanément la couleur de la balise côté couloir.",
    creatorHandle: "@luxafor_official",
    category: "bureau-tech",
    productSlug: "luxafor-duo-statut-sans-fil",
    durationSeconds: 18,
    sourceType: "instagram",
    posterUrl: "/images/products/luxafor-status.svg",
    externalUrl: "https://www.instagram.com/p/Db-YbaKoqQ6/",
    likesCount: 16500,
    highlights: [
      "4 codes couleur immédiats (Occupé, Réunion, Pause, Libre)",
      "Duo synchronisé sans câble",
      "Pose rapide sur chambranle ou cloison",
    ],
  },
];

export function getCategoryBySlug(slug: CategorySlug): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductsByCategory(
  category: CategorySlug | "all"
): Product[] {
  if (category === "all") {
    return PRODUCTS;
  }
  return PRODUCTS.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((product) => product.featured);
}

export function getReelById(id: string): ReelItem | undefined {
  return REELS.find((reel) => reel.id === id);
}

export function getReelsByCategory(category: CategorySlug | "all"): ReelItem[] {
  if (category === "all") {
    return REELS;
  }
  return REELS.filter((reel) => reel.category === category);
}

export function filterProducts(
  products: Product[],
  filters: Partial<ProductFilterState>
): Product[] {
  const normalizedSearch = filters.search?.trim().toLowerCase() ?? "";

  const filtered = products.filter((product) => {
    if (
      filters.category &&
      filters.category !== "all" &&
      product.category !== filters.category
    ) {
      return false;
    }

    if (
      filters.durability &&
      filters.durability !== "all" &&
      product.durability !== filters.durability
    ) {
      return false;
    }

    if (filters.inStockOnly && !product.inStock) {
      return false;
    }

    if (
      typeof filters.maxPriceEur === "number" &&
      product.priceEur > filters.maxPriceEur
    ) {
      return false;
    }

    if (normalizedSearch.length > 0) {
      const haystack = [
        product.name,
        product.brand,
        product.tagline,
        product.problemSolved,
        product.theTwist,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(normalizedSearch)) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case "price-asc":
      sorted.sort((a, b) => a.priceEur - b.priceEur);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.priceEur - a.priceEur);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "featured":
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
  }

  return sorted;
}

export function searchProducts(query: string): Product[] {
  return filterProducts(PRODUCTS, { search: query });
}
