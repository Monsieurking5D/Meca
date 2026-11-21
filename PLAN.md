# PLAN.md — Plan d'exécution multi-agents (MECA Lab)

> **Feuille de route opérationnelle** pour coordonner **Antigravity**, **Claude** et **Freebuff** avec un maximum d'efficacité, en parallélisant le travail sans conflits de fichiers ni retouches inutiles.
> Toujours consulter `AGENT_COMMS.md` en parallèle pour connaître les verrous actifs et l'historique réel.

---

## 1. Principe d'organisation (Pourquoi ce plan est rapide et sans conflits)

1. **Contrat d'abord (*Contract-First*) :**
   En Vague 1, `Antigravity` fige les types TypeScript (`src/types/*`), les routes principales, le système de design, le conteneur `AppProviders.tsx` et un stub minimal `@/data` (`src/data/index.ts`). Dès que cette vague est terminée, `Claude` et `Freebuff` peuvent coder **en parallèle et à pleine vitesse** sans jamais s'attendre.
2. **Propriété stricte par dossier :**
   Pendant une même vague, aucun dossier ni fichier n'est partagé en écriture entre deux agents. Chacun travaille uniquement dans sa zone assignée.
3. **Spécialisation par points forts :**
   - **`Antigravity`** — Architecture Next.js/Tailwind/Vercel, contrats TypeScript, intégration transversale, page d'accueil hybride et validation navigateur finale.
   - **`Claude`** — Logique interactive complexe et état client : boutique, filtres dynamiques, fiches produits, panier/favoris persistés (`localStorage`), tunnel de commande prêt pour Stripe, et flux vidéo façon Reels.
   - **`Freebuff`** — Données structurées riches (~25 produits réels sourcés + Reels démos), primitives UI réutilisables, pages annexes (comparateur, favoris, à propos), SEO/sitemap et script de validation du catalogue.

---

## 2. Feuille de route par vagues (`T-001` à `T-008`)

### Vague 0 — Gouvernance & Dépôt *(TERMINÉE)*
- **`T-001` (`Antigravity`)** ✅ : Création de `AGENT_COMMS.md`, `AGENTS.md`, `CLAUDE.md`, `.gitignore`, initialisation Git sur `main`.
- **`T-002` (`Antigravity`)** ✅ : Rédaction de `PLAN.md` et ajout des pointeurs dans `AGENTS.md` et `CLAUDE.md`.

---

### Vague 1 — Fondations, Contrats & Preview Vercel *(`Antigravity` seul — prérequis pour Vague 2)*

- **`T-003` (`Antigravity`) — Scaffolding & Contrats partagés**
  - **Fichiers ciblés :** `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `src/types/*`, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/layout/*`, `src/components/providers/AppProviders.tsx`, `src/lib/utils.ts`, stub `src/data/index.ts`.
  - **Livrables :**
    - Init **Next.js (App Router)**, **TypeScript strict**, **Tailwind CSS**, `lucide-react`, `clsx`, `tailwind-merge`.
    - Configuration Vercel & images (`next.config.ts`).
    - Contrats figés dans `src/types/` : `Category`, `Product`, `ReelItem`, `CartItem`, `ProductFilterState`, réexportés depuis `src/types/index.ts`.
    - Design system global (`src/app/globals.css`, `src/app/layout.tsx`) + coque navigation (`Header.tsx`, `Footer.tsx`, `MobileNav.tsx`).
    - Pass-through `src/components/providers/AppProviders.tsx` déjà branché dans `layout.tsx` (avec contrat clair des hooks/providers attendus par `Header` pour les compteurs panier/favoris).
    - Stub minimal `@/data` (`src/data/index.ts` exportant 2 produits et 2 reels conformes aux types + signatures des helpers `getProductBySlug`, `getProductsByCategory`, etc.) afin que `Claude` compile immédiatement en Vague 2 sans attendre `Freebuff`.
  - **Critères de fin :** `npm run lint`, `npx tsc --noEmit`, `npm run build` à 0 erreur + push sur `main` / liaison Vercel prête.

---

### Vague 2 — Cœur produit en PARALLÈLE *(`Freebuff` || `Claude` simultanément)*

> **Démarrage simultané** dès que `T-003` est `[DONE]`. Aucun chevauchement de fichiers entre `Freebuff` et `Claude`.

- **`T-004` (`Freebuff`) — Catalogue réel & Primitives UI**
  - **Fichiers exclusifs :**
    - `src/data/categories.ts`, `src/data/products.ts`, `src/data/reels.ts`, `src/data/helpers.ts`, `src/data/index.ts`
    - `src/components/ui/*` (`Button.tsx`, `Badge.tsx`, `Card.tsx`, `PriceTag.tsx`, `RatingStars.tsx`, `EmptyState.tsx`, `Modal.tsx`, `Toast.tsx`)
  - **Contenu attendu :**
    - Intégrer les vrais produits analysés et recherchés (Luxafor, clé à cliquet LOZLIN, organiseur pliant Find My, renvoi d'angle 90° à arbre flexible, plus ~22 outils répartis sur 5 catégories : **Mécanique**, **Électricité**, **Menuiserie**, **Mesure**, **Bureau / Tech**).
    - Chaque fiche produit renseigne : problème résolu, « le twist » fonctionnel, prix indicatif EUR, spécifications techniques, lien vidéo démo / lien marchand, note et badge robustesse.
    - Respecter strictement les types exportés par `src/types/index.ts` et conserver les exports du contrat `@/data`.
  - **Critères de fin :** 100 % typé, zéro erreur TS/lint/build.

- **`T-005` (`Claude`) — Boutique, Filtres, Fiches Produits & Panier**
  - **Fichiers exclusifs :**
    - `src/store/cart-context.tsx`, `src/store/favorites-context.tsx` (ou `src/store/*`)
    - `src/components/shop/*` (`ProductCard.tsx`, `ProductGrid.tsx`, `FilterBar.tsx`, `CartDrawer.tsx`, `CheckoutForm.tsx`)
    - `src/app/shop/page.tsx`, `src/app/product/[slug]/page.tsx`, `src/app/checkout/page.tsx`
  - **Règles anti-blocage :**
    - Importer les données uniquement depuis `@/data` (tableaux et helpers définis par le contrat `T-003`).
    - Styliser avec Tailwind CSS et les variables de `globals.css`, sans modifier `src/data/*`, `src/types/*` ni `src/app/layout.tsx`.
    - Pour le branchement dans `AppProviders.tsx` ou `Header.tsx`, soit préparer l'export propre documenté pour `T-008`, soit poster un `[REQUEST / MSG]` à `Antigravity` dans `AGENT_COMMS.md`.
  - **Critères de fin :** Filtrage par catégorie / prix / recherche, ajout/suppression/quantités panier persistés dans `localStorage`, tunnel de commande démo prêt pour Stripe, `npm run build` vert.

---

### Vague 3 — Flux Reels & Pages Secondaires en PARALLÈLE *(`Claude` || `Freebuff` simultanément)*

- **`T-006` (`Claude`) — Expérience Vidéo façon Reels**
  - **Fichiers exclusifs :** `src/components/reels/*` (`ReelFeed.tsx`, `ReelSlide.tsx`, `ReelProductOverlay.tsx`, `ReelActions.tsx`), `src/app/reels/page.tsx`.
  - **Fonctionnalités :**
    - Flux vertical plein écran fluide via `scroll-snap-type: y mandatory`.
    - Lecteur vidéo / aperçu démo avec contrôle lecture/pause et son.
    - Carte produit superposée en bas d'écran (« Voir la fiche » + « + Panier » en 1 clic).
    - Navigation clavier (`↑` / `↓`), swipe tactile mobile et filtre rapide par catégorie.

- **`T-007` (`Freebuff`) — Pages Annexes, Comparateur, SEO & Validation Catalogue**
  - **Fichiers exclusifs :** `src/app/compare/page.tsx`, `src/app/favorites/page.tsx`, `src/app/about/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `scripts/validate-catalog.mjs`.
  - **Fonctionnalités :**
    - Comparateur de 2 à 3 outils côte à côte (`compare/page.tsx`).
    - Page favoris (`favorites/page.tsx`) consommant le store créé en `T-005`.
    - Manifeste MECA Lab + guide « Vrai outil robuste vs gadget fragile » (`about/page.tsx`).
    - `sitemap.ts` et `robots.ts` dynamiques sans URL `localhost` codée en dur.
    - Script `scripts/validate-catalog.mjs` vérifiant l'unicité des slugs, la validité des prix et la présence des liens/champs obligatoires.

---

### Vague 4 — Assemblage, Intégration, QA & Production *(`Antigravity`)*

- **`T-008` (`Antigravity`) — Page d'accueil hybride, Branchements, Revue & Déploiement**
  - **Fichiers ciblés :** `src/app/page.tsx`, `src/components/providers/AppProviders.tsx`, `src/components/layout/Header.tsx`, corrections mineures d'intégration après revue.
  - **Livrables :**
    - Page d'accueil hybride `src/app/page.tsx` : Hero mêlant aperçu Reels interactif et accès direct boutique, bandeaux par métier, sélection « Problème → Solution », grille des produits phares.
    - Branchement final des providers, compteurs panier/favoris et `CartDrawer` dans `Header.tsx` et `AppProviders.tsx`.
    - Revue croisée du code produit par `Claude` et `Freebuff`.
    - Vérification complète : `npm run lint`, `npx tsc --noEmit`, `npm run build`, `node scripts/validate-catalog.mjs`.
    - Tests visuels desktop + mobile dans le navigateur et mise en production sur **GitHub → Vercel**.

---

## 3. Matrice anti-conflits (Qui touche quoi)

| Zone / Fichier | Propriétaire en écriture | Lecteurs autorisés | Coordination si besoin |
|---|---|---|---|
| `AGENT_COMMS.md` | Tous *(un à la fois)* | Tous | Toujours lire avant d'écrire ; section `## 5` strictement append-only |
| `PLAN.md`, `AGENTS.md`, `CLAUDE.md` | `Antigravity` | Tous | `[REQUEST / MSG]` dans `AGENT_COMMS.md` |
| `package.json`, `package-lock.json`, `next.config.*`, `tsconfig.json`, `postcss.config.*` | `Antigravity` | Tous | `[REQUEST / MSG]` obligatoire avant tout `npm install` |
| `src/types/*` | `Antigravity` | `Claude`, `Freebuff` | `[REQUEST / MSG]` si ajout/changement d'interface |
| `src/app/layout.tsx`, `src/app/globals.css`, `src/components/layout/*`, `src/components/providers/*`, `src/app/page.tsx` | `Antigravity` | `Claude`, `Freebuff` | `[REQUEST / MSG]` pour branchement ou styles globaux |
| `src/data/*` | `Freebuff` *(après stub `T-003`)* | `Claude`, `Antigravity` | `Claude` consomme via `@/data` uniquement |
| `src/components/ui/*` | `Freebuff` | `Claude`, `Antigravity` | `[REQUEST / MSG]` si nouvelle primitive UI requise |
| `src/app/compare/*`, `src/app/favorites/*`, `src/app/about/*`, `src/app/sitemap.ts`, `src/app/robots.ts`, `scripts/*` | `Freebuff` | `Antigravity`, `Claude` | Respect des contrats de `src/store/*` et `@/data` |
| `src/store/*`, `src/components/shop/*`, `src/app/shop/*`, `src/app/product/*`, `src/app/checkout/*` | `Claude` | `Freebuff`, `Antigravity` | Exporter des hooks stables pour `compare` / `favorites` / `Header` |
| `src/components/reels/*`, `src/app/reels/*` | `Claude` | `Antigravity`, `Freebuff` | Peut réutiliser les composants de `src/components/ui/*` |

---

## 4. Règles d'exécution parallèle

1. **Lecture préalable obligatoire :** Toujours lire `AGENT_COMMS.md` puis `PLAN.md` avant de démarrer.
2. **Verrou + `[START]` avant toute édition :** Inscrire le verrou dans `## 2` et l'entrée `[START]` en bas de `## 5` de `AGENT_COMMS.md` avant d'ouvrir les fichiers cibles.
3. **Éviter les conflits sur `AGENT_COMMS.md` et Git :**
   - En travail simultané dans deux terminaux, utiliser des commits atomiques fréquents ou des branches dédiées par agent (`feat/freebuff-t004`, `feat/claude-t005`) fusionnées sur `main` en fin de vague.
   - Ne modifier `AGENT_COMMS.md` qu'au début (`[START]`) et à la fin (`[DONE]` / `[BLOCKED]`) pour limiter les collisions d'écriture.
4. **Zéro dépendance surprise :** Ne jamais exécuter `npm install <pkg>` sans poster un `[REQUEST / MSG]` adressé à `Antigravity` (protège `package.json` et `package-lock.json`).
5. **Dépôt toujours compilable :** Aucune tâche ne passe en `[DONE]` si `npx tsc --noEmit` ou `npm run build` échoue.

---

## 5. Prompts prêts à copier-coller

### Lancer `Antigravity` sur `T-003` *(Vague 1 — à faire en premier)*
> Lis `AGENT_COMMS.md` et `PLAN.md`. Exécute la tâche `T-003` (Vague 1) avec la direction visuelle retenue : initialise Next.js + Tailwind + TypeScript, pose `src/types/*`, `AppProviders.tsx`, le layout, et le stub `@/data`, puis vérifie lint/tsc/build et mets à jour `AGENT_COMMS.md`.

### Lancer `Freebuff` sur `T-004` *(Vague 2 — en parallèle avec Claude)*
> Lis `AGENT_COMMS.md`, `AGENTS.md` et `PLAN.md`. Déclare le verrou pour `T-004` dans `AGENT_COMMS.md`, puis réalise `T-004` (catalogue réel dans `src/data/*` et primitives UI dans `src/components/ui/*`) en respectant strictement `src/types/*`. Vérifie `npm run lint`, `npx tsc --noEmit`, `npm run build` et clôture dans `AGENT_COMMS.md`.

### Lancer `Claude` sur `T-005` *(Vague 2 — en parallèle avec Freebuff)*
> Lis `AGENT_COMMS.md`, `CLAUDE.md` et `PLAN.md`. Déclare le verrou pour `T-005` dans `AGENT_COMMS.md`, puis implémente le store panier/favoris (`src/store/*`), les composants boutique (`src/components/shop/*`) et les pages `/shop`, `/product/[slug]`, `/checkout` en important uniquement depuis `@/data`. Vérifie `npm run lint`, `npx tsc --noEmit`, `npm run build` et clôture dans `AGENT_COMMS.md`.

### Lancer `Claude` sur `T-006` *(Vague 3 — en parallèle avec Freebuff)*
> Lis `AGENT_COMMS.md`, `CLAUDE.md` et `PLAN.md`. Déclare le verrou pour `T-006` dans `AGENT_COMMS.md`, puis crée le flux vidéo façon Reels (`src/components/reels/*` et `src/app/reels/page.tsx`) connecté au store panier et à `@/data`. Vérifie lint/tsc/build et clôture dans `AGENT_COMMS.md`.

### Lancer `Freebuff` sur `T-007` *(Vague 3 — en parallèle avec Claude)*
> Lis `AGENT_COMMS.md`, `AGENTS.md` et `PLAN.md`. Déclare le verrou pour `T-007` dans `AGENT_COMMS.md`, puis crée `/compare`, `/favorites`, `/about`, `sitemap.ts`, `robots.ts` et `scripts/validate-catalog.mjs`. Exécute toutes les vérifications dont le script catalogue et clôture dans `AGENT_COMMS.md`.

### Lancer `Antigravity` sur `T-008` *(Vague 4 — intégration finale)*
> Lis `AGENT_COMMS.md` et `PLAN.md`. Exécute `T-008` : assemble la page d'accueil hybride `src/app/page.tsx`, branche les compteurs/tiroir panier dans `Header.tsx` et `AppProviders.tsx`, fais la revue croisée de `T-004` à `T-007`, lance toute la batterie de tests + vérification visuelle navigateur et prépare le push GitHub / Vercel.
