import type { Product } from "@/types";


export const PRODUCTS: Product[] = [
  // ---------------------------------------------------------------------------
  // Mécanique & accès difficiles
  // ---------------------------------------------------------------------------
  {
    id: "prod-lozlin-ratchet",
    slug: "lozlin-cliquet-rotatif",
    name: "Cliquet rotatif multi-entraînement LOZLIN",
    brand: "LOZLIN",
    tagline:
      "3 modes d'entraînement dans les espaces où le manche est bloqué.",
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
    id: "prod-knipex-cobra-xs",
    slug: "knipex-cobra-xs",
    name: "Pince multiprise Cobra XS 100 mm Knipex",
    brand: "Knipex",
    tagline: "La pince multiprise qui tient dans une poche de jean.",
    category: "mecanique",
    problemSolved:
      "Les pinces multiprise classiques sont trop longues pour un écrou de 10 mm au fond d'une gaine ou sous un évier.",
    theTwist:
      "Mâchoires auto-serrantes sur 11 crans dans 100 mm de long, avec boutons de préhension usinés qui mordent les têtes arrondies.",
    description:
      "Pince multiprise miniature en acier chrome-vanadium forgé et trempé, ouverture jusqu'à 28 mm. Le réglage par bouton-poussoir s'actionne à une main et la denture croisée adhère sur les tubes chromés comme sur les écrous usés.",
    priceEur: 34,
    priceRangeEur: { min: 28, max: 42 },
    rating: 4.8,
    reviewCount: 1450,
    durability: "pro",
    durabilityNote:
      "Acier forgé Cr-V et denture trempée : la référence atelier pour un usage quotidien.",
    inStock: true,
    featured: true,
    tags: ["pince", "multiprise", "poche", "plomberie", "knipex"],
    specs: [
      { label: "Longueur", value: "100 mm" },
      { label: "Capacité", value: "0 – 28 mm" },
      { label: "Réglage", value: "11 positions, bouton poussoir" },
      { label: "Matière", value: "Acier Cr-V forgé, trempé" },
    ],
    pros: [
      "Mord sur les écrous arrondis sans glisser",
      "Réglage à une main par bouton poussoir",
      "Format poche réellement transportable",
    ],
    cons: [
      "Bras de levier court sur les gros serrages",
      "Aucune fonction coupe-fil",
    ],
    media: {
      thumbnailUrl: "/images/products/knipex-cobra-xs.svg",
      galleryUrls: ["/images/products/knipex-cobra-xs.svg"],
      externalDemoUrl: "https://www.knipex.com",
      officialUrl: "https://www.knipex.com",
    },
    reelId: "reel-knipex-cobra-xs",
    merchantUrl: "https://www.knipex.com",
  },
  {
    id: "prod-wera-zyklop-mini",
    slug: "wera-zyklop-mini-cliquet",
    name: "Mini cliquet 1/4\" Wera Zyklop Mini 1",
    brand: "Wera",
    tagline: "Un cliquet de 6,5 cm qui accepte les embouts standard.",
    category: "mecanique",
    problemSolved:
      "Aucun cliquet classique ne rentre entre deux tôles ou derrière un tableau de bord.",
    theTwist:
      "Tête à cliquet inversable dans un corps de 65 mm, porte-embout 1/4\" hex et bague de verrouillage : les embouts du quotidien deviennent un cliquet.",
    description:
      "Mini cliquet tout métal à 72 dents, corps moleté pour le grip et levier de sens manipulable au pouce. Il accepte les embouts 1/4\" hex et les douilles à queue hexagonale, sans rallonge supplémentaire.",
    priceEur: 45,
    priceRangeEur: { min: 38, max: 55 },
    rating: 4.7,
    reviewCount: 620,
    durability: "pro",
    durabilityNote:
      "Mécanisme 72 dents et corps forgé : conçu pour un usage intensif, pas pour le dépannage occasionnel.",
    inStock: true,
    featured: false,
    tags: ["cliquet", "embouts", "compact", "wera", "1/4"],
    specs: [
      { label: "Longueur", value: "65 mm" },
      { label: "Entrée", value: "1/4\" hex" },
      { label: "Denture", value: "72 dents" },
      { label: "Matière", value: "Acier forgé" },
    ],
    pros: [
      "Angles morts atteignables sous 70 mm",
      "Réutilise les embouts déjà possédés",
      "Inversion de sens au pouce",
    ],
    cons: [
      "Couple plafonné par la taille de l'embout",
      "Pas de douilles fournies",
    ],
    media: {
      thumbnailUrl: "/images/products/wera-zyklop-mini-cliquet.svg",
      galleryUrls: ["/images/products/wera-zyklop-mini-cliquet.svg"],
      externalDemoUrl: "https://www.wera.de",
      officialUrl: "https://www.wera.de",
    },
    merchantUrl: "https://www.wera.de",
  },
  {
    id: "prod-depstech-endoscope",
    slug: "endoscope-articule-depstech",
    name: "Endoscope articulé USB-C 8 mm DEPSTECH",
    brand: "DEPSTECH",
    tagline: "Voir derrière une cloison sans percer de trappe.",
    category: "mecanique",
    problemSolved:
      "L'inspection d'une gaine, d'un cylindre ou d'un châssis est impossible à l'œil nu et hors de portée de la main.",
    theTwist:
      "Sonde de 8 mm sur câble semi-rigide de 5 m, tête orientable et éclairage LED réglable, alimentée directement par l'USB-C du téléphone.",
    description:
      "Caméra d'inspection 1080p avec bague de mise au point manuelle et molette d'articulation. Elle se branche sur un smartphone ou un PC sans boîtier intermédiaire, ce qui évite d'immobiliser une valise de diagnostic.",
    priceEur: 78,
    priceRangeEur: { min: 65, max: 95 },
    rating: 4.4,
    reviewCount: 980,
    durability: "atelier",
    durabilityNote:
      "Câble renforcé et tête métallique ; le point de fragilité reste la connectique USB-C, à ménager.",
    inStock: true,
    featured: false,
    isNew: true,
    tags: ["endoscope", "inspection", "usb-c", "caméra", "gaine"],
    specs: [
      { label: "Diamètre sonde", value: "8 mm" },
      { label: "Longueur câble", value: "5 m" },
      { label: "Capteur", value: "1080p" },
      { label: "Éclairage", value: "8 LED réglables" },
    ],
    pros: [
      "Zéro boîtier : tout passe par le téléphone",
      "Tête orientable pour contourner un coude",
      "Lumière réglable pour ne pas surexposer la paroi",
    ],
    cons: [
      "Image bruitée en très faible luminosité",
      "Pas d'enregistrement vidéo natif sur tous les modèles",
    ],
    media: {
      thumbnailUrl: "/images/products/endoscope-articule-depstech.svg",
      galleryUrls: ["/images/products/endoscope-articule-depstech.svg"],
      externalDemoUrl: "https://www.depstech.com",
      officialUrl: "https://www.depstech.com",
    },
    reelId: "reel-endoscope-depstech",
    merchantUrl: "https://www.depstech.com",
  },
  {
    id: "prod-extracteurs-ecrous",
    slug: "jeu-extracteurs-ecrous",
    name: "Jeu de 5 douilles extractrices d'écrous",
    brand: "Atelier",
    tagline: "Dévisser un écrou arrondi au lieu de le percer.",
    category: "mecanique",
    problemSolved:
      "Un écrou rouillé ou arrondi fait patiner toutes les douilles standard et bloque le démontage.",
    theTwist:
      "Douilles à filetage hélicoïdal inversé : plus on force, plus la morsure se resserre sur la tête abîmée.",
    description:
      "Coffret de cinq douilles en acier trempé couvrant les tailles courantes de 9 à 19 mm, avec entraînement 3/8\". La spirale interne attaque la tête par les plats et non par les angles, ce qui sauve les écrous déjà entamés.",
    priceEur: 26,
    priceRangeEur: { min: 20, max: 34 },
    rating: 4.3,
    reviewCount: 740,
    durability: "atelier",
    durabilityNote:
      "Acier trempé efficace sur un écrou grippé ; à réserver aux têtes déjà abîmées, pas au serrage courant.",
    inStock: true,
    featured: false,
    tags: ["extracteur", "écrou", "rouille", "douille", "dépannage"],
    specs: [
      { label: "Tailles", value: "9 – 19 mm" },
      { label: "Entraînement", value: "3/8\"" },
      { label: "Filetage", value: "Hélicoïdal inversé" },
      { label: "Coffret", value: "5 pièces" },
    ],
    pros: [
      "Rattrape une tête déjà arrondie",
      "Compatible clé à cliquet standard",
      "Évite le perçage et l'extracteur à gauche",
    ],
    cons: [
      "Peu efficace sur les écrous totalement lisses",
      "Encombrement au-dessus de la tête",
    ],
    media: {
      thumbnailUrl: "/images/products/jeu-extracteurs-ecrous.svg",
      galleryUrls: ["/images/products/jeu-extracteurs-ecrous.svg"],
      externalDemoUrl: "https://www.amazon.fr/s?k=douille+extracteur+ecrou",
    },
    merchantUrl: "https://www.amazon.fr/s?k=douille+extracteur+ecrou",
  },

  // ---------------------------------------------------------------------------
  // Électricité & câblage
  // ---------------------------------------------------------------------------
  {
    id: "prod-klein-tire-fils",
    slug: "aiguille-magnetique-klein",
    name: "Aiguille magnétique tire-fils Klein Tools",
    brand: "Klein Tools",
    tagline: "Passer un câble dans une cloison fermée sans l'ouvrir.",
    category: "electricite",
    problemSolved:
      "Tirer un conducteur dans une cloison déjà montée relève de la pêche au fil et finit en trou dans le placo.",
    theTwist:
      "Aimant néodyme en tête et anneau métallique côté main : le fil se guide à travers l'isolant depuis l'extérieur.",
    description:
      "Kit d'aiguillage composé d'une perle magnétique fixée au conducteur et d'un anneau de guidage aimanté. Une fois la perle engagée dans la gaine, l'anneau la suit de l'autre côté de la paroi jusqu'à la sortie.",
    priceEur: 62,
    priceRangeEur: { min: 52, max: 75 },
    rating: 4.6,
    reviewCount: 410,
    durability: "pro",
    durabilityNote:
      "Aimant puissant et anneau métallique protégé ; l'outil ne s'use quasiment pas.",
    inStock: true,
    featured: false,
    tags: ["tire-fils", "aimant", "cloison", "câblage", "klein"],
    specs: [
      { label: "Longueur utile", value: "4,5 m" },
      { label: "Aimant", value: "Néodyme" },
      { label: "Guidage", value: "Anneau métallique" },
      { label: "Rangement", value: "Étui rigide" },
    ],
    pros: [
      "Évite d'ouvrir une cloison finie",
      "Aimant assez fort pour traverser 2 cm de placo",
      "Seul, sans deuxième personne",
    ],
    cons: [
      "Inefficace dans les parois avec treillis métallique",
      "Ne remplace pas une aiguille rigide sur les longs tirages",
    ],
    media: {
      thumbnailUrl: "/images/products/aiguille-magnetique-klein.svg",
      galleryUrls: ["/images/products/aiguille-magnetique-klein.svg"],
      externalDemoUrl: "https://www.kleintools.com",
      officialUrl: "https://www.kleintools.com",
    },
    merchantUrl: "https://www.kleintools.com",
  },
  {
    id: "prod-wago-221",
    slug: "wago-221-connecteurs-levier",
    name: "Connecteurs à levier WAGO 221 (boîte de 30)",
    brand: "WAGO",
    tagline: "Raccorder trois conducteurs rigides en trois secondes.",
    category: "electricite",
    problemSolved:
      "Les dominos à vis se desserrent avec les vibrations et font perdre un temps fou en boîte de dérivation.",
    theTwist:
      "Levier relevable et ressort à lame : le fil se pince sans outil, se retire en relevant le levier, sans reprendre le serrage.",
    description:
      "Boîte de trente bornes à levier pour conducteurs de 0,14 à 4 mm², trois entrées par bloc. La transparence du boîtier permet de vérifier l'insertion du cuivre avant refermeture.",
    priceEur: 19,
    priceRangeEur: { min: 14, max: 25 },
    rating: 4.8,
    reviewCount: 2300,
    durability: "pro",
    durabilityNote:
      "Ressort inox et boîtier polyamide : tenue à la vibration nettement supérieure au domino à vis.",
    inStock: true,
    featured: false,
    tags: ["wago", "raccordement", "borne", "levier", "électricité"],
    specs: [
      { label: "Sections", value: "0,14 – 4 mm²" },
      { label: "Entrées", value: "3 par bloc" },
      { label: "Conditionnement", value: "30 pièces" },
      { label: "Norme", value: "EN 60998" },
    ],
    pros: [
      "Aucun outil pour raccorder",
      "Démontable sans abîmer le fil",
      "Contrôle visuel du cuivre inséré",
    ],
    cons: [
      "Plus volumineux qu'une borne à sertir",
      "Pas adapté aux conducteurs souples non étamés",
    ],
    media: {
      thumbnailUrl: "/images/products/wago-221-connecteurs-levier.svg",
      galleryUrls: ["/images/products/wago-221-connecteurs-levier.svg"],
      externalDemoUrl: "https://www.wago.com",
      officialUrl: "https://www.wago.com",
    },
    reelId: "reel-wago-221",
    merchantUrl: "https://www.wago.com",
  },
  {
    id: "prod-knipex-denudeur",
    slug: "knipex-denudeuse-automatique",
    name: "Dénudeuse automatique Knipex 12 40 200",
    brand: "Knipex",
    tagline: "Dénuder sans entailler l'âme cuivre.",
    category: "electricite",
    problemSolved:
      "La pince à dénuder manuelle coupe des brins et entaille le cuivre sur les petites sections.",
    theTwist:
      "Mâchoires auto-adaptatives à came : la lame se règle seule sur la section et s'arrête au contact du conducteur.",
    description:
      "Pince de 200 mm pour conducteurs de 0,03 à 10 mm², avec butée de longueur réglable et poignées bi-matière. Le mécanisme automatique évite le réglage fastidieux de la lame avant chaque câble.",
    priceEur: 68,
    priceRangeEur: { min: 58, max: 80 },
    rating: 4.7,
    reviewCount: 530,
    durability: "pro",
    durabilityNote:
      "Corps métallique et lames remplaçables : l'outil survit à des années de chantier.",
    inStock: true,
    featured: false,
    tags: ["dénudeuse", "knipex", "câble", "automatique", "atelier"],
    specs: [
      { label: "Sections", value: "0,03 – 10 mm²" },
      { label: "Longueur", value: "200 mm" },
      { label: "Réglage", value: "Automatique" },
      { label: "Poignées", value: "Bi-matière" },
    ],
    pros: [
      "Aucun réglage avant la coupe",
      "Respecte les brins sur les petites sections",
      "Butée de longueur reproductible",
    ],
    cons: [
      "Prix supérieur aux pinces d'entrée de gamme",
      "Encombrement en gaine étroite",
    ],
    media: {
      thumbnailUrl: "/images/products/knipex-denudeuse-automatique.svg",
      galleryUrls: ["/images/products/knipex-denudeuse-automatique.svg"],
      externalDemoUrl: "https://www.knipex.com",
      officialUrl: "https://www.knipex.com",
    },
    merchantUrl: "https://www.knipex.com",
  },
  {
    id: "prod-fluke-1ac",
    slug: "fluke-1ac-ii-detecteur",
    name: "Détecteur de tension sans contact Fluke 1AC II",
    brand: "Fluke",
    tagline: "Savoir si le circuit est vraiment hors tension.",
    category: "electricite",
    problemSolved:
      "Un disjoncteur mal repéré laisse le circuit sous tension et le multimètre reste au fond du coffre.",
    theTwist:
      "Détection capacitive à travers le gainage, alerte sonore et visuelle continue, sans contact métallique ni réglage.",
    description:
      "Stylo détecteur de 90 à 1000 V AC, certifié CAT IV 1000 V, avec double niveau de sensibilité pour distinguer phase et câble voisin. Il tient dans la poche de chemise et s'allume sans être mis en marche.",
    priceEur: 52,
    priceRangeEur: { min: 45, max: 62 },
    rating: 4.8,
    reviewCount: 1900,
    durability: "pro",
    durabilityNote:
      "Électronique scellée et boîtier renforcé : pas de pièce mobile, donc pas d'usure mécanique.",
    inStock: true,
    featured: false,
    tags: ["fluke", "détecteur", "tension", "sécurité", "cat iv"],
    specs: [
      { label: "Tension détectée", value: "90 – 1000 V AC" },
      { label: "Catégorie", value: "CAT IV 1000 V" },
      { label: "Alerte", value: "Son + LED" },
      { label: "Format", value: "Stylo" },
    ],
    pros: [
      "Contrôle avant intervention en 2 secondes",
      "Deux sensibilités pour les câbles voisins",
      "Aucun contact avec le conducteur nu",
    ],
    cons: [
      "Ne mesure pas la tension",
      "Faux positifs possibles sur câbles blindés",
    ],
    media: {
      thumbnailUrl: "/images/products/fluke-1ac-ii-detecteur.svg",
      galleryUrls: ["/images/products/fluke-1ac-ii-detecteur.svg"],
      externalDemoUrl: "https://www.fluke.com",
      officialUrl: "https://www.fluke.com",
    },
    merchantUrl: "https://www.fluke.com",
  },
  {
    id: "prod-uni-t-ut210e",
    slug: "pince-amperemetrique-uni-t",
    name: "Pince ampèremétrique de poche UNI-T UT210E",
    brand: "UNI-T",
    tagline: "Mesurer un courant sans couper le circuit.",
    category: "electricite",
    problemSolved:
      "Une pince ampèremétrique classique est trop volumineuse pour un tableau déjà saturé de conducteurs.",
    theTwist:
      "Pince de 17 mm à effet Hall dans un format poche, avec calibre 2 A pour lire les faibles courants de fuite.",
    description:
      "Pince True RMS mesurant jusqu'à 100 A AC-DC, avec multimètre intégré (tension, résistance, continuité). Le calibre 2 A permet de traquer une fuite de quelques dizaines de milliampères sans débrancher.",
    priceEur: 58,
    priceRangeEur: { min: 48, max: 70 },
    rating: 4.5,
    reviewCount: 860,
    durability: "atelier",
    durabilityNote:
      "Boîtier ABS correct pour un usage de diagnostic ; ce n'est pas un instrument de laboratoire.",
    inStock: true,
    featured: false,
    tags: ["pince", "ampèremètre", "true rms", "diagnostic", "uni-t"],
    specs: [
      { label: "Calibres", value: "2 / 20 / 100 A AC-DC" },
      { label: "Ouverture", value: "17 mm" },
      { label: "Mesure", value: "True RMS" },
      { label: "Sécurité", value: "CAT II 600 V" },
    ],
    pros: [
      "Calibre 2 A pour les courants de fuite",
      "Tient dans une poche de veste",
      "Mesure tension et continuité en plus",
    ],
    cons: [
      "Mâchoires étroites sur les gros câbles",
      "Précision moyenne sur les très basses tensions",
    ],
    media: {
      thumbnailUrl: "/images/products/pince-amperemetrique-uni-t.svg",
      galleryUrls: ["/images/products/pince-amperemetrique-uni-t.svg"],
      externalDemoUrl: "https://www.uni-trend.com",
      officialUrl: "https://www.uni-trend.com",
    },
    merchantUrl: "https://www.uni-trend.com",
  },

  // ---------------------------------------------------------------------------
  // Menuiserie & vissage
  // ---------------------------------------------------------------------------
  {
    id: "prod-flex-90-driver",
    slug: "renvoi-angle-90-flexible",
    name: "Renvoi d'angle 90° à arbre flexible",
    brand: "CooperTool / Atelier",
    tagline:
      "Contournez les parois et vissez au fond d'un caisson sans démonter.",
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
    id: "prod-microjig-grr",
    slug: "microjig-grr-ripper",
    name: "Poussoir de sécurité GRR-Ripper MicroJig",
    brand: "MicroJig",
    tagline: "Garder les doigts à 15 cm de la lame.",
    category: "menuiserie",
    problemSolved:
      "Pousser une pièce courte à la main sur la toupie ou la scie sur table expose directement les doigts.",
    theTwist:
      "Semelle réglable sur deux niveaux et pont de guidage : la pièce reste plaquée sur la table et contre le guide en même temps.",
    description:
      "Poussoir professionnel à semelle télescopique pour pièces de 3 à 13 cm de hauteur. Les patins antidérapants maintiennent la pièce sans la marquer et le pont central enjambe la lame lors de refentes.",
    priceEur: 89,
    priceRangeEur: { min: 75, max: 105 },
    rating: 4.7,
    reviewCount: 620,
    durability: "pro",
    durabilityNote:
      "Corps ABS chargé et patins remplaçables : le poussoir survit à des centaines de passes.",
    inStock: true,
    featured: true,
    tags: ["sécurité", "scie sur table", "toupie", "poussoir", "atelier"],
    specs: [
      { label: "Hauteur de pièce", value: "3 – 13 cm" },
      { label: "Semelle", value: "Télescopique verrouillable" },
      { label: "Patins", value: "Antidérapants remplaçables" },
      { label: "Corps", value: "ABS chargé" },
    ],
    pros: [
      "Maintien vertical et latéral simultané",
      "Doigts hors de la zone de coupe",
      "Réglage fin pour les pièces courtes",
    ],
    cons: [
      "Investissement notable pour un bricoleur occasionnel",
      "Encombrant sur une petite table",
    ],
    media: {
      thumbnailUrl: "/images/products/microjig-grr-ripper.svg",
      galleryUrls: ["/images/products/microjig-grr-ripper.svg"],
      externalDemoUrl: "https://www.microjig.com",
      officialUrl: "https://www.microjig.com",
    },
    reelId: "reel-microjig-grr",
    merchantUrl: "https://www.microjig.com",
  },
  {
    id: "prod-hoto-tournevis",
    slug: "hoto-tournevis-usb-c",
    name: "Tournevis électrique USB-C HOTO",
    brand: "HOTO",
    tagline: "Monter un meuble entier sans forcer du poignet.",
    category: "menuiserie",
    problemSolved:
      "Le tournevis manuel fatigue sur les séries de vis et la visseuse à chocs est trop brutale pour du mobilier.",
    theTwist:
      "Couple limité électroniquement et arrêt net dans un corps cylindrique de 200 g, rechargeable en USB-C.",
    description:
      "Tournevis électrique compact délivrant 3 N·m à 200 tr/min, avec mandrin magnétique et douze embouts S2 rangés dans la base. Le couple volontairement bridé protège les panneaux mélaminés et les filetages de meuble.",
    priceEur: 49,
    priceRangeEur: { min: 39, max: 60 },
    rating: 4.5,
    reviewCount: 1200,
    durability: "edc",
    durabilityNote:
      "Moteur et batterie fiables pour un usage domestique ; inadapté au vissage structurel.",
    inStock: true,
    featured: false,
    tags: ["tournevis", "usb-c", "mobilier", "hoto", "sans fil"],
    specs: [
      { label: "Couple", value: "3 N·m" },
      { label: "Vitesse", value: "200 tr/min" },
      { label: "Batterie", value: "1500 mAh" },
      { label: "Embouts", value: "12 en acier S2" },
    ],
    pros: [
      "Couple bridé qui ne fend pas le mélaminé",
      "Recharge USB-C standard",
      "Silencieux comparé à une visseuse",
    ],
    cons: [
      "Pas de réglage d'embrayage",
      "Autonomie limitée sur les longues séries",
    ],
    media: {
      thumbnailUrl: "/images/products/hoto-tournevis-usb-c.svg",
      galleryUrls: ["/images/products/hoto-tournevis-usb-c.svg"],
      externalDemoUrl: "https://www.hoto.com",
      officialUrl: "https://www.hoto.com",
    },
    merchantUrl: "https://www.hoto.com",
  },
  {
    id: "prod-jauge-contour",
    slug: "jauge-contour-dents",
    name: "Jauge de contour à dents (paire 150 / 250 mm)",
    brand: "Atelier",
    tagline: "Reproduire une forme complexe sur une chute de bois.",
    category: "menuiserie",
    problemSolved:
      "Mesurer une moulure, un tuyau ou un chambranle au mètre ruban donne une épure fausse.",
    theTwist:
      "Dents glissantes bloquées par un levier : l'empreinte se copie directement sur l'outil puis se reporte au crayon.",
    description:
      "Paire de jauges à dents en plastique renforcé, largeurs 150 et 250 mm, avec blocage central par levier. L'empreinte se prend en une pression puis se reporte sans déformation sur la pièce à découper.",
    priceEur: 22,
    priceRangeEur: { min: 16, max: 29 },
    rating: 4.2,
    reviewCount: 410,
    durability: "atelier",
    durabilityNote:
      "Dents en plastique renforcé : suffisant pour le traçage, à ne pas confondre avec un outil de contrôle.",
    inStock: true,
    featured: false,
    tags: ["jauge", "contour", "traçage", "parquet", "moulure"],
    specs: [
      { label: "Largeurs", value: "150 et 250 mm" },
      { label: "Profondeur de dent", value: "30 mm" },
      { label: "Blocage", value: "Levier central" },
      { label: "Matière", value: "Plastique renforcé" },
    ],
    pros: [
      "Copie une moulure en quelques secondes",
      "Blocage franc, pas de dérive au report",
      "Deux largeurs pour les grandes courbes",
    ],
    cons: [
      "Dents qui prennent du jeu à long terme",
      "Report imprécis sur les très petits rayons",
    ],
    media: {
      thumbnailUrl: "/images/products/jauge-contour-dents.svg",
      galleryUrls: ["/images/products/jauge-contour-dents.svg"],
      externalDemoUrl: "https://www.amazon.fr/s?k=jauge+de+contour",
    },
    merchantUrl: "https://www.amazon.fr/s?k=jauge+de+contour",
  },
  {
    id: "prod-irwin-quickgrip",
    slug: "serre-joint-quick-grip",
    name: "Paire de serre-joints à pompe QUICK-GRIP 300 mm",
    brand: "Irwin",
    tagline: "Serrer d'une main, ajuster au millimètre.",
    category: "menuiserie",
    problemSolved:
      "Les serre-joints à vis demandent deux mains et se desserrent quand on repositionne la pièce.",
    theTwist:
      "Poignée à pompe : la mâchoire avance par impulsions puis se relâche d'un simple levier, sans dévisser.",
    description:
      "Paire de serre-joints de 300 mm d'ouverture, capacité de serrage 60 kg, mâchoires en polymère qui ne marquent pas le bois. Le système à pompe permet de maintenir la pièce d'une main et de serrer de l'autre.",
    priceEur: 42,
    priceRangeEur: { min: 34, max: 52 },
    rating: 4.6,
    reviewCount: 950,
    durability: "atelier",
    durabilityNote:
      "Rail acier et mâchoires polymère : bon compromis poids/robustesse pour l'atelier bois.",
    inStock: true,
    featured: false,
    tags: ["serre-joint", "quick-grip", "vissage", "bois", "irwin"],
    specs: [
      { label: "Ouverture", value: "300 mm" },
      { label: "Capacité", value: "60 kg" },
      { label: "Mâchoires", value: "Polymère anti-marque" },
      { label: "Conditionnement", value: "Paire" },
    ],
    pros: [
      "Serrage à une seule main",
      "Relâchement instantané par levier",
      "Mâchoires qui ne marquent pas le bois",
    ],
    cons: [
      "Moins de force qu'un serre-joint à vis",
      "Rail qui fléchit à pleine ouverture",
    ],
    media: {
      thumbnailUrl: "/images/products/serre-joint-quick-grip.svg",
      galleryUrls: ["/images/products/serre-joint-quick-grip.svg"],
      externalDemoUrl: "https://www.irwin.com",
      officialUrl: "https://www.irwin.com",
    },
    merchantUrl: "https://www.irwin.com",
  },

  // ---------------------------------------------------------------------------
  // Mesure & précision
  // ---------------------------------------------------------------------------
  {
    id: "prod-bosch-glm50",
    slug: "bosch-glm-50-27",
    name: "Télémètre laser GLM 50-27 C Bosch Professional",
    brand: "Bosch Professional",
    tagline: "Mesurer 50 m seul, sans mètre ruban qui fouette.",
    category: "mesure",
    problemSolved:
      "Mesurer une pièce seul au mètre ruban est imprécis au-delà de 3 m et impossible en hauteur.",
    theTwist:
      "Mesure continue, nivellement intégré et transfert Bluetooth vers l'application pour calculer surfaces et volumes.",
    description:
      "Télémètre laser professionnel de 50 m, précision ±1,5 mm, avec écran couleur rétroéclairé et niveau à bulle numérique. Le transfert Bluetooth évite la ressaisie des cotes dans le devis ou le plan.",
    priceEur: 149,
    priceRangeEur: { min: 125, max: 180 },
    rating: 4.7,
    reviewCount: 780,
    durability: "pro",
    durabilityNote:
      "Boîtier caoutchouté et optique protégée : conçu pour le chantier, pas pour un tiroir de bureau.",
    inStock: true,
    featured: true,
    tags: ["télémètre", "laser", "bosch", "bluetooth", "chantier"],
    specs: [
      { label: "Portée", value: "50 m" },
      { label: "Précision", value: "±1,5 mm" },
      { label: "Nivellement", value: "Intégré" },
      { label: "Liaison", value: "Bluetooth" },
    ],
    pros: [
      "Mesure seul jusqu'à 50 m",
      "Cotes transférées sans ressaisie",
      "Calcul de surface et volume direct",
    ],
    cons: [
      "Prix élevé pour un usage domestique",
      "Illisible en plein soleil sur certains écrans",
    ],
    media: {
      thumbnailUrl: "/images/products/bosch-glm-50-27.svg",
      galleryUrls: ["/images/products/bosch-glm-50-27.svg"],
      externalDemoUrl: "https://www.bosch-professional.com",
      officialUrl: "https://www.bosch-professional.com",
    },
    reelId: "reel-bosch-glm50",
    merchantUrl: "https://www.bosch-professional.com",
  },
  {
    id: "prod-duka-telmetre",
    slug: "telmetre-laser-poche-duka",
    name: "Télémètre laser de poche Duka",
    brand: "Duka",
    tagline: "Un télémètre qui tient dans la poche de veste.",
    category: "mesure",
    problemSolved:
      "Le télémètre d'atelier reste dans le camion et on finit par mesurer à l'estime.",
    theTwist:
      "Boîtier de 8 mm d'épaisseur, écran OLED rétroéclairé et trois modes de mesure dans un format carte de crédit.",
    description:
      "Télémètre laser compact de 40 m avec affichage OLED lisible en intérieur comme en extérieur. Trois modes couvrent la distance simple, la surface et le volume, sans menu imbriqué.",
    priceEur: 46,
    priceRangeEur: { min: 38, max: 58 },
    rating: 4.3,
    reviewCount: 1500,
    durability: "edc",
    durabilityNote:
      "Finition aluminium correcte ; à protéger de la chute, l'optique reste le point sensible.",
    inStock: true,
    featured: false,
    tags: ["télémètre", "poche", "oled", "usb-c", "mesure"],
    specs: [
      { label: "Portée", value: "40 m" },
      { label: "Précision", value: "±2 mm" },
      { label: "Écran", value: "OLED" },
      { label: "Recharge", value: "USB-C" },
    ],
    pros: [
      "Toujours sur soi, donc réellement utilisé",
      "Écran lisible en faible lumière",
      "Modes surface et volume directs",
    ],
    cons: [
      "Portée insuffisante en extérieur",
      "Boutons petits avec des gants",
    ],
    media: {
      thumbnailUrl: "/images/products/telmetre-laser-poche-duka.svg",
      galleryUrls: ["/images/products/telmetre-laser-poche-duka.svg"],
      externalDemoUrl: "https://www.amazon.fr/s?k=telemetre+laser+poche",
    },
    merchantUrl: "https://www.amazon.fr/s?k=telemetre+laser+poche",
  },
  {
    id: "prod-klein-inclino",
    slug: "klein-inclinemettre-935dag",
    name: "Inclinomètre numérique aimanté Klein 935DAG",
    brand: "Klein Tools",
    tagline: "Lire un angle au dixième de degré, sur l'acier.",
    category: "mesure",
    problemSolved:
      "Un niveau à bulle ne donne pas d'angle exploitable pour une coupe ou un réglage de châssis.",
    theTwist:
      "Semelle aimantée à gorge en V : l'appareil se fixe sur un tube ou une lame et affiche l'angle absolu comme relatif.",
    description:
      "Inclinomètre numérique de précision ±0,1° sur 360°, avec écran rétroéclairé et remise à zéro sur n'importe quelle surface. La semelle en V se pose sur les tubes ronds sans calage supplémentaire.",
    priceEur: 48,
    priceRangeEur: { min: 40, max: 58 },
    rating: 4.6,
    reviewCount: 340,
    durability: "pro",
    durabilityNote:
      "Boîtier renforcé et semelle usinée : la précision tient tant que l'appareil n'est pas choqué.",
    inStock: true,
    featured: false,
    tags: ["inclinomètre", "angle", "aimanté", "klein", "précision"],
    specs: [
      { label: "Précision", value: "±0,1°" },
      { label: "Plage", value: "0 – 360°" },
      { label: "Fixation", value: "Aimants + gorge en V" },
      { label: "Écran", value: "Rétroéclairé" },
    ],
    pros: [
      "Se fixe seul sur les tubes métalliques",
      "Angle relatif par remise à zéro",
      "Lisible dans un coin sombre",
    ],
    cons: [
      "Nécessite une calibration après choc",
      "Pile bouton à surveiller",
    ],
    media: {
      thumbnailUrl: "/images/products/klein-inclinemettre-935dag.svg",
      galleryUrls: ["/images/products/klein-inclinemettre-935dag.svg"],
      externalDemoUrl: "https://www.kleintools.com",
      officialUrl: "https://www.kleintools.com",
    },
    merchantUrl: "https://www.kleintools.com",
  },
  {
    id: "prod-metre-numerique",
    slug: "metre-ruban-numerique",
    name: "Mètre ruban numérique à double affichage",
    brand: "Atelier",
    tagline: "Lire la mesure dans l'écran, plus sur le ruban.",
    category: "mesure",
    problemSolved:
      "Sur un mètre ruban classique, la lecture en hauteur ou dans un angle sombre est illisible et source d'erreurs.",
    theTwist:
      "Codeur sur le tambour : l'écran affiche la longueur déroulée, avec mémorisation et conversion en pouces.",
    description:
      "Mètre de 5 m à double affichage, écran numérique quatre chiffres et graduation classique en secours. Trois mesures peuvent être mémorisées pour reporter une cote sans papier.",
    priceEur: 32,
    priceRangeEur: { min: 25, max: 42 },
    rating: 4.1,
    reviewCount: 620,
    durability: "atelier",
    durabilityNote:
      "Ruban acier correct ; l'électronique craint l'humidité, à éviter sur les chantiers mouillés.",
    inStock: false,
    featured: false,
    tags: ["mètre", "numérique", "ruban", "lecture", "mesure"],
    specs: [
      { label: "Longueur", value: "5 m" },
      { label: "Précision", value: "±1 mm" },
      { label: "Affichage", value: "4 chiffres" },
      { label: "Mémoire", value: "3 mesures" },
    ],
    pros: [
      "Lecture possible en hauteur",
      "Conversion pouces immédiate",
      "Mémorisation des cotes",
    ],
    cons: [
      "Ruban qui rentre moins vite",
      "Électronique sensible à l'humidité",
    ],
    media: {
      thumbnailUrl: "/images/products/metre-ruban-numerique.svg",
      galleryUrls: ["/images/products/metre-ruban-numerique.svg"],
      externalDemoUrl: "https://www.amazon.fr/s?k=metre+ruban+numerique",
    },
    merchantUrl: "https://www.amazon.fr/s?k=metre+ruban+numerique",
  },
  {
    id: "prod-huepar-9211g",
    slug: "niveau-laser-huepar-9211g",
    name: "Niveau laser croix vert Huepar 9211G",
    brand: "Huepar",
    tagline: "Aligner une pièce entière depuis un seul point.",
    category: "mesure",
    problemSolved:
      "Le trait de crayon et le niveau à bulle ne tiennent pas sur six mètres de mur.",
    theTwist:
      "Module laser vert 520 nm, autocalibrage au pendule et filetage 1/4\" pour trépied ou support magnétique.",
    description:
      "Niveau laser à lignes croisées vertes, portée 30 m, précision ±3 mm pour 10 m. Il s'autonivelle au pendule et clignote franchement hors plage, ce qui évite de travailler sur une ligne fausse.",
    priceEur: 72,
    priceRangeEur: { min: 60, max: 90 },
    rating: 4.5,
    reviewCount: 1100,
    durability: "atelier",
    durabilityNote:
      "Boîtier caoutchouté et pendule protégé ; à ranger dans sa mallette pour garder la calibration.",
    inStock: true,
    featured: true,
    isNew: true,
    tags: ["niveau", "laser", "vert", "croix", "cuisine"],
    specs: [
      { label: "Portée", value: "30 m" },
      { label: "Précision", value: "±3 mm / 10 m" },
      { label: "Lignes", value: "Verticale + horizontale" },
      { label: "Nivellement", value: "Automatique au pendule" },
    ],
    pros: [
      "Ligne verte très lisible en intérieur",
      "Autonivellement rapide",
      "Se monte sur un trépied photo",
    ],
    cons: [
      "Quasi invisible en plein soleil",
      "Requiert un support pour les grandes hauteurs",
    ],
    media: {
      thumbnailUrl: "/images/products/niveau-laser-huepar-9211g.svg",
      galleryUrls: ["/images/products/niveau-laser-huepar-9211g.svg"],
      externalDemoUrl: "https://www.huepar.com",
      officialUrl: "https://www.huepar.com",
    },
    merchantUrl: "https://www.huepar.com",
  },

  // ---------------------------------------------------------------------------
  // Bureau, tech & EDC
  // ---------------------------------------------------------------------------
  {
    id: "prod-luxafor-duo",
    slug: "luxafor-duo-statut-sans-fil",
    name: "Duo lumineux sans fil Luxafor",
    brand: "Luxafor",
    tagline:
      "Signalez votre disponibilité sur la porte sans quitter votre poste.",
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
  {
    id: "prod-porte-cles-carbone-findmy",
    slug: "porte-cles-carbone-find-my",
    name: "Porte-clés carbone pliant compatible Find My",
    brand: "Atelier",
    tagline:
      "Le trousseau qui se replie à plat et sait où il est.",
    category: "bureau-tech",
    problemSolved:
      "Un trousseau de six clés qui pend au fond d'une poche, raye le téléphone et disparaît dès qu'on le pose sur un établi.",
    theTwist:
      "Plaque carbone à charnière qui s'ouvre à 180° pour libérer les clés, puis se replie à plat contre le téléphone — avec un logement pour le module Apple Find My.",
    description:
      "Porte-clés en carbone pré-imprégné de 1,5 mm, découpé pour accueillir six clés à plat sans cliquetis. La charnière inox ouvre l'ensemble d'un geste et le referme sans forcer. Le module Apple Find My se loge dans l'épaisseur de la plaque : le trousseau devient localisable depuis l'app Localiser, sans boîtier électronique supplémentaire.",
    priceEur: 45,
    priceRangeEur: { min: 32, max: 59 },
    rating: 4.4,
    reviewCount: 620,
    durability: "edc",
    durabilityNote:
      "Carbone pré-imprégné et charnière inox : conçu pour la poche et la sacoche, pas pour un passage sous la meule.",
    inStock: true,
    featured: false,
    isNew: true,
    tags: ["edc", "find my", "porte-clés", "carbone", "atelier"],
    specs: [
      { label: "Matière", value: "Carbone pré-imprégné 1,5 mm" },
      { label: "Charnière", value: "Inox, ouverture 180°" },
      { label: "Capacité", value: "6 clés à plat" },
      { label: "Compatibilité", value: "Apple Find My (module non inclus)" },
      { label: "Dimensions replié", value: "9 × 6 × 0,8 cm" },
    ],
    pros: [
      "Se replie à plat : plus de clés suspendues qui raclent la poche",
      "Logement du module Find My intégré à l'épaisseur",
      "Ouverture à 180° pour changer une clé sans outil",
    ],
    cons: [
      "Module Apple Find My vendu séparément",
      "Six clés maximum : peu adapté à un trousseau de service",
    ],
    media: {
      thumbnailUrl: "/images/products/porte-cles-carbone-find-my.svg",
      galleryUrls: ["/images/products/porte-cles-carbone-find-my.svg"],
      externalDemoUrl: "https://www.instagram.com/p/Dd-jloQR6EA/",
    },
    reelId: "reel-porte-cles-carbone-findmy",
    merchantUrl: "https://www.amazon.fr/s?k=porte+cle+carbone+find+my",
  },
  {
    id: "prod-pave-macro",
    slug: "pave-macro-programmable",
    name: "Pavé macro 8 touches programmable",
    brand: "Atelier",
    tagline: "Huit raccourcis qui remplacent une dizaine de clics.",
    category: "bureau-tech",
    problemSolved:
      "Les actions répétitives (capture, mute, changement de scène) cassent le rythme de travail.",
    theTwist:
      "Chaque touche embarque son petit écran et sa macro stockée dans la mémoire du pavé, sans logiciel résident.",
    description:
      "Pavé de huit touches mécaniques à écran individuel, connecté en USB-C détachable. Les macros se programment une fois et restent dans l'appareil, ce qui permet de le brancher sur n'importe quelle machine.",
    priceEur: 55,
    priceRangeEur: { min: 45, max: 70 },
    rating: 4.4,
    reviewCount: 760,
    durability: "edc",
    durabilityNote:
      "Touches mécaniques et câble détachable : la pièce d'usure principale est remplaçable.",
    inStock: true,
    featured: false,
    tags: ["macro", "productivité", "usb-c", "streaming", "bureau"],
    specs: [
      { label: "Touches", value: "8 mécaniques" },
      { label: "Écrans", value: "1 par touche" },
      { label: "Mémoire", value: "Interne, sans pilote" },
      { label: "Connexion", value: "USB-C détachable" },
    ],
    pros: [
      "Macros conservées d'une machine à l'autre",
      "Écrans qui évitent les mauvaises touches",
      "Câble remplaçable",
    ],
    cons: [
      "Programmation initiale fastidieuse",
      "Pas de molette sur ce modèle",
    ],
    media: {
      thumbnailUrl: "/images/products/pave-macro-programmable.svg",
      galleryUrls: ["/images/products/pave-macro-programmable.svg"],
      externalDemoUrl: "https://www.amazon.fr/s?k=pave+macro+programmable",
    },
    merchantUrl: "https://www.amazon.fr/s?k=pave+macro+programmable",
  },
  {
    id: "prod-plaud-note",
    slug: "plaud-note-enregistreur",
    name: "Enregistreur de réunion Plaud Note",
    brand: "Plaud",
    tagline: "Le compte rendu se rédige pendant que vous parlez.",
    category: "bureau-tech",
    problemSolved:
      "Prendre des notes en réunion fait perdre le fil et le tri des actions arrive toujours trop tard.",
    theTwist:
      "Carte de crédit magnétique qui enregistre en local, transcrit puis résume les décisions via son application.",
    description:
      "Enregistreur de 3 mm d'épaisseur qui se fixe au dos d'un téléphone par aimant. Il capture la réunion en local, puis l'application transcrit et structure les points d'action en français comme en anglais.",
    priceEur: 179,
    priceRangeEur: { min: 155, max: 199 },
    rating: 4.2,
    reviewCount: 1300,
    durability: "edc",
    durabilityNote:
      "Format carte solide, mais la valeur dépend du service applicatif : à considérer comme un abonnement matériel.",
    inStock: true,
    featured: false,
    isNew: true,
    tags: ["réunion", "transcription", "ia", "enregistreur", "bureau"],
    specs: [
      { label: "Épaisseur", value: "3 mm" },
      { label: "Autonomie", value: "30 h" },
      { label: "Stockage", value: "64 Go" },
      { label: "Langues", value: "FR / EN" },
    ],
    pros: [
      "Aucune note à prendre pendant l'échange",
      "Compte rendu structuré automatiquement",
      "Se fixe au téléphone sans pince",
    ],
    cons: [
      "Prix et services liés à l'application",
      "Qualité dépendante de l'acoustique de la salle",
    ],
    media: {
      thumbnailUrl: "/images/products/plaud-note-enregistreur.svg",
      galleryUrls: ["/images/products/plaud-note-enregistreur.svg"],
      externalDemoUrl: "https://www.plaud.ai",
      officialUrl: "https://www.plaud.ai",
    },
    reelId: "reel-plaud-note",
    merchantUrl: "https://www.plaud.ai",
  },
  {
    id: "prod-hub-usbc",
    slug: "station-usb-c-anker",
    name: "Station d'accueil USB-C double écran Anker",
    brand: "Anker",
    tagline: "Deux écrans et le réseau sur un seul câble.",
    category: "bureau-tech",
    problemSolved:
      "Un portable à deux ports oblige à un carrousel d'adaptateurs et coupe le réseau à chaque débranchage.",
    theTwist:
      "Un seul lien USB-C alimente, affiche deux HDMI 4K et fait passer Ethernet, carte SD et 100 W de charge.",
    description:
      "Station d'accueil 9-en-1 avec deux sorties HDMI 4K 60 Hz, Ethernet gigabit, lecteur SD et deux USB-A. La charge 100 W traverse la station, ce qui libère le port d'alimentation du portable.",
    priceEur: 99,
    priceRangeEur: { min: 85, max: 120 },
    rating: 4.5,
    reviewCount: 2100,
    durability: "edc",
    durabilityNote:
      "Boîtier aluminium et câble tressé : solide, mais les ports restent la pièce d'usure.",
    inStock: true,
    featured: false,
    tags: ["usb-c", "hub", "double écran", "anker", "bureau"],
    specs: [
      { label: "Vidéo", value: "2 × HDMI 4K 60 Hz" },
      { label: "Réseau", value: "Ethernet 1 Gbit" },
      { label: "Charge", value: "100 W" },
      { label: "Ports", value: "2 × USB-A, SD, microSD" },
    ],
    pros: [
      "Un seul branchement pour tout le poste",
      "Charge traversante 100 W",
      "Deux écrans 4K simultanés",
    ],
    cons: [
      "Chauffe en usage intensif",
      "Le double 4K dépend de la norme USB-C du portable",
    ],
    media: {
      thumbnailUrl: "/images/products/station-usb-c-anker.svg",
      galleryUrls: ["/images/products/station-usb-c-anker.svg"],
      externalDemoUrl: "https://www.anker.com",
      officialUrl: "https://www.anker.com",
    },
    merchantUrl: "https://www.anker.com",
  },
];
