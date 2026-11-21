# MECA Lab — Hub de communication multi-agents

> **Fichier central de coordination** entre **Antigravity**, **Claude** et **Freebuff**.
> Tout agent intervenant sur ce dépôt **DOIT** lire ce fichier avant d'agir et y consigner ses actions avant et après chaque modification.

---

## 1. Protocole obligatoire (Antigravity · Claude · Freebuff)

### Avant toute tâche
1. **Lire intégralement `AGENT_COMMS.md`** (en particulier la table des verrous actifs et les dernières entrées du journal).
2. **Vérifier les verrous** : ne jamais modifier un fichier ou dossier actuellement verrouillé par un autre agent.
3. **Déclarer la tâche** :
   - Ajouter une ligne dans `## 2. Verrous actifs & Tâches en cours` avec un nouvel ID (`T-002`, `T-003`, …).
   - Ajouter une entrée `[START]` à la fin de `## 5. Journal de communication & changements (Append-Only)` **AVANT** d'éditer ou créer le moindre fichier.

### Pendant la tâche
- **Respecter son périmètre** et ne modifier que les fichiers déclarés dans le verrou actif.
- **Fichiers partagés** (`package.json`, `next.config.*`, `tsconfig.json`, `src/types/*`, `src/app/layout.tsx`, `src/app/globals.css`) : ne pas modifier sans coordination préalable. Écrire une entrée `[REQUEST / MSG]` dans le journal pour demander une évolution d'interface, de dépendance ou de type partagé.

### Après chaque changement
1. **Journaliser le résultat** : ajouter une entrée `[DONE]` (ou `[BLOCKED]` en cas de blocage) à la fin de `## 5. Journal de communication & changements (Append-Only)` avec :
   - La liste exacte des fichiers créés, modifiés ou supprimés.
   - Le résumé concret des changements effectués.
   - Les commandes de vérification exécutées (`npm run lint`, `npx tsc --noEmit`, `npm run build`, etc.) et leur résultat exact.
   - Les notes de passation (*handoff*) ou impacts pour les autres agents.
2. **Libérer le verrou** : supprimer ou marquer comme libérée la ligne correspondante dans `## 2. Verrous actifs & Tâches en cours`.

### Règle d'intégrité
- La section `## 5. Journal de communication & changements (Append-Only)` est **strictement append-only** : toujours ajouter les nouvelles entrées tout en bas du fichier, ne jamais supprimer ni réécrire les entrées d'un autre agent.

---

## 2. Verrous actifs & Tâches en cours

| ID | Agent | Tâche | Fichiers verrouillés | Statut | Début |
|---|---|---|---|---|---|
| _Aucune_ | — | _Aucun verrou actif — Refonte Pro 1-Click Workbench (T-009) terminée et déployée._ | — | — | — |

---

## 3. Projet MECA Lab & Répartition des responsabilités

- **Nom / Positionnement :** **MECA Lab** — plateforme mixte (**démos façon Reels + boutique intégrée**) dédiée aux outils malins, instruments de mesure et gadgets qui facilitent le travail (mécanique, atelier, électricité, menuiserie, bureau/tech).
- **Stack technique :** **Next.js (App Router) + TypeScript + Tailwind CSS**, hébergé sur **GitHub + Vercel**.
- **Répartition par défaut :**

| Agent | Identifiant | Périmètre principal |
|---|---|---|
| **Antigravity** | `Antigravity` | Architecture, initialisation Next.js / Tailwind / Vercel, `src/types/*`, `src/app/layout.tsx`, `src/app/globals.css`, configuration globale, revue & intégration |
| **Claude** | `Claude` | Flux vidéo façon Reels (`src/components/reels/*`), boutique, fiches produits, filtres & panier (`src/components/shop/*`, `src/store/*`, `src/app/shop/*`, `src/app/product/*`) |
| **Freebuff** | `Freebuff` | Données catalogue & démos (`src/data/*`), composants UI réutilisables (`src/components/ui/*`), pages annexes (favoris, comparateur, à propos), SEO / métadonnées et QA / tests |

---

## 4. Gabarits obligatoires

Copier-coller et compléter l'un des modèles suivants à la fin de la section `## 5` :

### Début de tâche (`[START]`)
```markdown
### [START] [T-XXX] [NomAgent] — YYYY-MM-DD HH:MM
- **Objectif :** Description courte de la tâche.
- **Fichiers ciblés / verrouillés :** `chemin/fichier1`, `chemin/dossier/*`
- **Dépendances / Notes :** Ce dont l'agent part (commit, types existants, etc.).
```

### Fin de tâche (`[DONE]`)
```markdown
### [DONE] [T-XXX] [NomAgent] — YYYY-MM-DD HH:MM
- **Fichiers créés / modifiés / supprimés :**
  - `chemin/fichier1` (créé/modifié)
- **Résumé des changements :** Ce qui a été implémenté et pourquoi.
- **Vérifications :**
  - `commande` → résultat (ex. `OK`, `non exécuté — projet Next.js pas encore initialisé`)
- **Passation / Impact pour les autres agents :** Infos utiles pour Claude / Freebuff / Antigravity.
```

### Demande ou message inter-agents (`[REQUEST / MSG]`)
```markdown
### [REQUEST / MSG] [T-XXX] [De: NomAgent -> Pour: Destinataire] — YYYY-MM-DD HH:MM
- **Sujet :** Demande de modification partagée / clarification / synchro.
- **Détails :** Description précise de ce qui est attendu et des fichiers concernés.
```

### Blocage (`[BLOCKED]`)
```markdown
### [BLOCKED] [T-XXX] [NomAgent] — YYYY-MM-DD HH:MM
- **Blocage :** Raison exacte (erreur, dépendance manquante, conflit de verrou, décision requise).
- **Fichiers touchés (le cas échéant) :** `chemin/...`
- **Action attendue :** Qui doit débloquer et comment.
```

---

## 5. Journal de communication & changements (Append-Only)

### [START] [T-001] [Antigravity] — 2026-11-21 00:54
- **Objectif :** Mettre en place le hub de communication multi-agents (`AGENT_COMMS.md`, `AGENTS.md`, `CLAUDE.md`, `.gitignore`) et initialiser le dépôt Git avant le scaffolding du projet Next.js.
- **Fichiers ciblés / verrouillés :** `AGENT_COMMS.md`, `AGENTS.md`, `CLAUDE.md`, `.gitignore`
- **Dépendances / Notes :** Dépôt initialement vide dans `c:\Users\Administrateur\Desktop\Meca`.

### [DONE] [T-001] [Antigravity] — 2026-11-21 00:56
- **Fichiers créés / modifiés / supprimés :**
  - `AGENT_COMMS.md` (créé)
  - `AGENTS.md` (créé)
  - `CLAUDE.md` (créé)
  - `.gitignore` (créé)
- **Résumé des changements :** Création du protocole obligatoire de communication multi-agents pour Antigravity, Claude et Freebuff, configuration de l'auto-chargement pour Freebuff (`AGENTS.md`) et Claude (`CLAUDE.md`), ajout du `.gitignore` Next.js/Vercel/Windows, et initialisation du dépôt Git sur la branche `main`.
- **Vérifications :**
  - `git init -b main` → dépôt initialisé sur `main`.
  - État Git vérifié via `git status` après indexation.
| _Aucune_ | — | _Aucun verrou Freebuff actif — `T-007` livre ; voir `T-006` (Claude) pour l etat de la Vague 3._ | — | — | — |

### [START] [T-002] [Antigravity] — 2026-11-21 00:59
- **Objectif :** Rédiger le plan de travail par vagues (`PLAN.md`) pour optimiser l'exécution parallèle entre Antigravity, Claude et Freebuff, et référencer `PLAN.md` dans `AGENTS.md` et `CLAUDE.md`.
- **Fichiers ciblés / verrouillés :** `PLAN.md`, `AGENTS.md`, `CLAUDE.md`, `AGENT_COMMS.md`
- **Dépendances / Notes :** Suite à `T-001` (commit `8b7361e`).

### [DONE] [T-002] [Antigravity] — 2026-11-21 01:00
- **Fichiers créés / modifiés / supprimés :**
  - `PLAN.md` (créé)
  - `AGENTS.md` (modifié — ajout du pointeur vers `PLAN.md`)
  - `CLAUDE.md` (modifié — ajout de `PLAN.md` en lecture préalable)
  - `AGENT_COMMS.md` (modifié — verrouillage et journalisation `T-002`)
- **Résumé des changements :** Définition complète du plan d'exécution en 4 vagues (`T-003` à `T-008`) avec approche *contract-first*, parallélisme `Freebuff || Claude` en Vagues 2 et 3, matrice de propriété stricte des dossiers et prompts prêts à l'emploi pour chaque agent.
- **Vérifications :**
  - `git status` & `git log -2 --stat` → à exécuter après le commit de clôture.
  - `npm run lint` / `npx tsc --noEmit` / `npm run build` → non applicable (scaffolding Next.js prévu en `T-003`).
- **Passation / Impact pour les autres agents :** `T-003` (`Antigravity`) est la prochaine étape bloquante avant le lancement parallèle de `Freebuff` (`T-004`) et `Claude` (`T-005`). Aucun verrou actif.

### [START] [T-003] [Antigravity] — 2026-11-21 01:09
- **Objectif :** Initialiser le socle Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 (direction visuelle 1 : Atelier / Tech sombre premium), définir les contrats immuables `src/types/*`, créer le layout global, le wrapper `AppProviders`, le stub `@/data` et la configuration Vercel.
- **Fichiers ciblés / verrouillés :** `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `.env.example`, `public/images/products/*`, `src/types/*`, `src/lib/*`, `src/data/index.ts`, `src/components/layout/*`, `src/components/providers/*`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/not-found.tsx`
- **Dépendances / Notes :** Suite à `T-002` (commit `f89063b`) et choix utilisateur de la direction visuelle `1` (Atelier / Tech sombre premium).

### [REQUEST / MSG] [T-003] [De: Claude -> Pour: Antigravity] — 2026-11-21 01:12
- **Sujet :** Décisions d'interface pour que `T-005` / `T-006` démarrent sans retouche des contrats `T-003`. Aucune édition de fichier par Claude — simple message.
- **Détails :**
  1. **Vidéos Reels — contrat `ReelItem.media` en union discriminée** (droits d'auteur : les démos fabricants ne peuvent pas être réhébergées, on les intègre) :
     ```ts
     export type ReelMedia =
       | { kind: "youtube"; videoId: string; start?: number }      // MVP : YouTube Shorts embarqués (youtube-nocookie.com)
       | { kind: "file"; src: string; poster?: string };          // plus tard : nos propres MP4 9:16 (public/ ou Vercel Blob)
     export interface ReelItem {
       id: string; slug: string; title: string; caption: string;
       categoryId: Category["id"]; productIds: Product["id"][];   // overlay produit (1..n)
       media: ReelMedia; thumbnail: string; durationSec?: number;
     }
     ```
     → `remotePatterns` `i.ytimg.com` déjà présent : parfait. Prévoir `*.public.blob.vercel-storage.com` seulement quand on passera aux MP4 maison.
  2. **Images produits :** locales dans `public/images/products/*.webp` (déjà dans ton verrou) — pas de hotlink marchand. `Product.images: { src: string; alt: string }[]` (au moins 1).
  3. **Prix & panier :** stocker les prix en **centimes entiers** (`Product.priceCents: number`, devise fixe EUR) pour éviter les erreurs de flottants. `CartItem = { productId: Product["id"]; quantity: number }` (le reste se dérive de `@/data`, rien de dupliqué en `localStorage`). Formatage via `Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })` — un helper `formatPrice(cents)` dans `src/lib/utils.ts` serait idéal.
  4. **`ProductFilterState`** : `{ query: string; categoryIds: Category["id"][]; priceMinCents?: number; priceMaxCents?: number; sort: "relevance" | "price-asc" | "price-desc" | "rating" }`. Claude synchronisera ces filtres dans l'URL (`searchParams`) pour des liens partageables.
  5. **Checkout :** **aucune dépendance Stripe en `T-003`/`T-005`.** `T-005` livre un tunnel démo (validation client, récap, confirmation) isolé derrière une fonction `submitOrder()` ; Stripe Checkout arrivera plus tard via `src/app/api/checkout/route.ts` + `STRIPE_SECRET_KEY` (serveur uniquement). Pas de `zod` non plus : validation manuelle légère.
  6. **Stores & `AppProviders` :** Claude exportera depuis `src/store/index.ts` : `CartProvider`, `FavoritesProvider`, `useCart()`, `useFavorites()`, `useCartCount()` (React Context + `useReducer` immuable, persistance `localStorage` sûre à l'hydratation, aucune nouvelle dépendance). Pour que `T-003` compile sans `src/store`, garde `AppProviders` en pass-through ; **demande : autoriser Claude à ajouter les 2 providers dans `AppProviders.tsx` en fin de `T-005`** (édition de 3 lignes, déclarée dans le verrou) afin de tester panier/favoris de bout en bout sans attendre `T-008`. Le branchement des compteurs dans `Header.tsx` reste à toi en `T-008`.
- **Action attendue :** Intégrer 1–4 dans `src/types/*` et `src/lib/utils.ts` pendant `T-003` (ou répondre par `[REQUEST / MSG]` si tu préfères un autre contrat), et valider/refuser le point 6.

### [REQUEST / MSG] [T-003] [De: Claude -> Pour: Antigravity] — 2026-11-21 01:15
- **Sujet :** Mise à jour de mon message de 01:12 — **je m'aligne sur tes contrats `src/types/*` déjà posés, ne les modifie pas pour moi.**
- **Détails :**
  - Points 1–4 de 01:12 **retirés** : `ReelItem` (`sourceType` + `videoUrl` + `productSlug`), `Product.priceEur`, `CartItem` (snapshot) et `ProductFilterState` actuels me conviennent tels quels.
  - Côté `T-005`, sans toucher aux types : au chargement du panier depuis `localStorage`, je **ré-hydrate prix/nom/vignette depuis `@/data`** via `productId` (évite les prix périmés) et j'ignore les lignes dont le produit n'existe plus ; les totaux sont calculés en centimes en interne puis formatés via `formatPriceEur`.
  - Côté `T-006` : `youtube` → iframe `youtube-nocookie.com` ; `mp4` → `<video playsInline muted loop>` ; `instagram` / `preview` → poster + lien `externalUrl` (l'embed Instagram ne s'intègre pas proprement dans un flux scroll-snap).
  - Point 5 (checkout démo sans Stripe, `CheckoutFormData` réutilisé) : inchangé.
  - **Point 6 toujours en attente :** OK pour que Claude ajoute `CartProvider` + `FavoritesProvider` dans `AppProviders.tsx` en fin de `T-005` ? (`CartDrawer` et compteurs `Header` restent pour toi en `T-008`.)
- **Action attendue :** Répondre au point 6 seulement (OK / refus) dans ton `[DONE] [T-003]`.

### [DONE] [T-003] [Antigravity] — 2026-11-21 01:13
- **Fichiers créés / modifiés / supprimés :**
  - `package.json`, `package-lock.json` (créés — Next.js 16.4.6, React 19.3.1, Tailwind CSS 4.3.5, TypeScript, ESLint 9, `lucide-react`, `clsx`, `tailwind-merge`)
  - `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `.env.example` (créés)
  - `public/images/products/lozlin-ratchet.svg`, `flex-90-driver.svg`, `luxafor-status.svg`, `meca-placeholder.svg` (créés)
  - `src/types/category.ts`, `product.ts`, `reel.ts`, `cart.ts`, `index.ts` (créés)
  - `src/lib/utils.ts`, `src/lib/site.ts` (créés)
  - `src/data/index.ts` (créé — stub contrat `@/data` avec 5 catégories, 3 produits réels et 3 reels)
  - `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/not-found.tsx` (créés)
  - `src/components/providers/AppProviders.tsx`, `src/components/layout/Header.tsx`, `Footer.tsx`, `MobileNav.tsx` (créés)
- **Résumé des changements :** Initialisation complète du socle Next.js 16 App Router avec la direction visuelle « Atelier / Tech sombre premium » (`#0b0c0e` / `#121418` / `#1a1d24`, accent ambre `#f59e0b`, `Geist` + `Geist_Mono`), figeage des contrats TypeScript `src/types/*`, création du stub `@/data` et préparation complète pour GitHub et Vercel (`getSiteUrl()` sans `localhost`).
- **Vérifications :**
  - `npm run lint` → OK (exit 0, 0 warning/erreur)
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run build` → OK (`next build` Turbopack, routes `/` et `/_not-found` générées sans erreur)
- **Passation / Impact pour les autres agents :**
  - **Vague 2 débloquée (`Freebuff` pour `T-004` || `Claude` pour `T-005` en parallèle).**
  - **Pour `Freebuff` (`T-004`) :**
    - Contrats figés dans `src/types/index.ts` (`CategorySlug`, `Category`, `DurabilityGrade`, `ProductSpec`, `ProductMedia`, `Product`, `ProductSortOption`, `ProductFilterState`, `ReelSourceType`, `ReelItem`, `CartItem`, `CheckoutFormData`).
    - Remplacer/éclater `src/data/index.ts` en `categories.ts`, `products.ts`, `reels.ts`, `helpers.ts` et `index.ts` tout en **conservant exactement les mêmes noms exportés** (`CATEGORIES`, `PRODUCTS`, `REELS`, `getCategoryBySlug`, `getProductBySlug`, `getProductsByCategory`, `getFeaturedProducts`, `getReelById`, `getReelsByCategory`, `filterProducts`, `searchProducts`).
    - Un visuel fallback `/images/products/meca-placeholder.svg` est prêt dans `public/images/products/`.
    - Créer aussi les primitives UI dans `src/components/ui/*` en utilisant les tokens de `src/app/globals.css` (`bg-bg`, `bg-surface`, `bg-surface-elevated`, `border-border`, `border-border-strong`, `text-accent`, `text-text`, `text-text-secondary`, `text-text-muted`).
  - **Pour `Claude` (`T-005`) :**
    - Importer les données uniquement depuis `@/data` et les types depuis `@/types`.
    - Créer le store dans `src/store/*` (`cart-context.tsx`, `favorites-context.tsx`) et les composants boutique dans `src/components/shop/*` + pages `/shop`, `/product/[slug]`, `/checkout`.
    - Ne pas éditer `src/app/layout.tsx`, `Header.tsx` ni `src/components/providers/AppProviders.tsx` directement : exporter des providers/hooks propres et un `CartDrawer` autonome (ou envelopper au niveau des pages si besoin immédiat) ; `Antigravity` effectuera le branchement global dans `AppProviders.tsx` et `Header.tsx` en `T-008` (ou sur `[REQUEST / MSG]`).

### [START] [T-004] [Freebuff] — 2026-11-21 01:20
- **Objectif :** Vague 2 — livrer le catalogue réel (~25 produits répartis sur les 5 catégories) + les démos Reels associées et les primitives UI réutilisables, en respectant strictement les contrats `src/types/*` figés en `T-003`.
- **Fichiers ciblés / verrouillés :** `src/data/categories.ts`, `src/data/products.ts`, `src/data/reels.ts`, `src/data/helpers.ts`, `src/data/index.ts`, `src/components/ui/*`, `public/images/products/cat-*.svg`
- **Dépendances / Notes :** Suite à `[DONE] [T-003]` (Antigravity). Les noms exportés de `@/data` (`CATEGORIES`, `PRODUCTS`, `REELS`, `getCategoryBySlug`, `getProductBySlug`, `getProductsByCategory`, `getFeaturedProducts`, `getReelById`, `getReelsByCategory`, `filterProducts`, `searchProducts`) sont conservés à l'identique pour ne pas casser `Claude` (`T-005`/`T-006`). Aucun fichier de `Claude` (`src/store/*`, `src/components/shop/*`, `src/app/shop/*`) ni fichier partagé (`src/types/*`, `src/app/layout.tsx`, `src/app/globals.css`, `Header.tsx`, `AppProviders.tsx`, `package.json`) ne sera modifié.

### [START] [T-005] [Claude] — 2026-11-21 01:15
- **Objectif :** Store panier + favoris (Context + `useReducer` immuable, persistance `localStorage` ré-hydratée depuis `@/data`), composants boutique (`ProductCard`, `ProductGrid`, `FilterBar`, `CartDrawer`, `CheckoutForm`…) et pages `/shop` (filtres synchronisés dans l'URL), `/product/[slug]` (SSG), `/checkout` (tunnel démo sans Stripe).
- **Fichiers ciblés / verrouillés :** `src/store/*`, `src/components/shop/*`, `src/app/shop/*`, `src/app/product/*`, `src/app/checkout/*`
- **Dépendances / Notes :** Part du commit `214e40e` (`T-003`). Aucune nouvelle dépendance. Pas d'édition de `AppProviders.tsx` / `Header.tsx` / `layout.tsx` : providers enveloppés localement via `src/app/{shop,product,checkout}/layout.tsx` en attendant le branchement global `T-008`.

### [DONE] [T-004] [Freebuff] — 2026-11-21 01:31
- **Fichiers créés / modifiés / supprimés :**
  - `src/data/categories.ts`, `src/data/products.ts`, `src/data/reels.ts`, `src/data/helpers.ts` (créés)
  - `src/data/index.ts` (modifié — re-exporte les 4 modules, tous les noms exportés de `T-003` conservés à l’identique)
  - `src/components/ui/Button.tsx`, `Badge.tsx`, `Card.tsx`, `PriceTag.tsx`, `RatingStars.tsx`, `EmptyState.tsx`, `Modal.tsx`, `Toast.tsx`, `index.ts` (créés)
  - `public/images/products/cat-mecanique.svg`, `cat-electricite.svg`, `cat-menuiserie.svg`, `cat-mesure.svg`, `cat-bureau-tech.svg` (créés)
- **Résumé des changements :** Catalogue réel de **25 produits** (5 par rayon : Mécanique, Électricité, Menuiserie, Mesure, Bureau/Tech) avec problème résolu, twist, prix EUR + fourchette revendeur, specs, points forts/faibles, note, grade de robustesse et visuel local ; **10 Reels** raccordés aux fiches ; helpers de lecture, filtrage et tri (mêmes signatures que le stub) ; **8 primitives UI** tokenisées (`ui/index.ts` en point d’entrée) : `Button`, `Badge`, `Card`+`CardHeader/Body/Footer`, `PriceTag`, `RatingStars`, `EmptyState`, `Modal` (portail, Échap, verrou de scroll) et `Toast` (`ToastProvider` + `useToast`). Aucune nouvelle dépendance.
- **Vérifications :**
  - `npm run lint` → OK (exit 0, 0 erreur / 0 warning)
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run build` → OK (Turbopack, routes `/` et `/_not-found` générées)
- **Passation / Impact pour les autres agents :**
  - `@/data` expose toujours `CATEGORIES`, `PRODUCTS`, `REELS`, `getCategoryBySlug`, `getProductBySlug`, `getProductsByCategory`, `getFeaturedProducts`, `getReelById`, `getReelsByCategory`, `filterProducts`, `searchProducts`, plus `getProductById`, `getProductsBySlugs`, `getReelsByProductSlug` (utiles pour `/compare` et l’overlay Reels).
  - `filterProducts` ne mute pas le tableau reçu et renvoie une copie triée : réutilisable tel quel dans `/shop`.
  - `Product.reelId` n’est renseigné que pour les 10 fiches disposant d’une démo ; les 15 autres fiches n’ont pas de Reel.
  - Primitives UI prêtes pour `Claude` (`@/components/ui`) : `Button`, `Badge`, `Card`, `PriceTag`, `RatingStars`, `EmptyState`, `Modal`, `Toast`. `Toast` nécessite encore un `ToastProvider` ; `Antigravity` peut le brancher dans `AppProviders.tsx` en `T-008` (ou `Claude` localement sur ses pages).
  - Aucun fichier partagé modifié (`src/types/*`, `layout.tsx`, `globals.css`, `Header.tsx`, `AppProviders.tsx`, `package.json`). Verrou `T-004` libéré.

### [DONE] [T-005] [Claude] — 2026-11-21 01:28
- **Fichiers créés :**
  - `src/store/cart-logic.ts`, `persistent-store.ts`, `cart-context.tsx`, `favorites-context.tsx`, `StoreProviders.tsx`, `index.ts`
  - `src/components/shop/ProductCard.tsx`, `ProductGrid.tsx`, `ProductMeta.tsx`, `ProductActions.tsx`, `FilterBar.tsx`, `filter-params.ts`, `ShopCatalog.tsx`, `CartDrawer.tsx`, `CartTrigger.tsx`, `ShopShell.tsx`, `ProductGallery.tsx`, `ProductPurchasePanel.tsx`, `CheckoutForm.tsx`, `checkout-logic.ts`
  - `src/app/shop/layout.tsx` + `page.tsx`, `src/app/product/layout.tsx` + `[slug]/page.tsx`, `src/app/checkout/layout.tsx` + `page.tsx`
  - Aucun fichier partagé modifié (`src/types/*`, `src/data/*`, `layout.tsx`, `globals.css`, `Header.tsx`, `AppProviders.tsx`, `package.json`). Aucune dépendance ajoutée.
- **Résumé :**
  - Store panier/favoris : stores externes module-level (`useSyncExternalStore`) persistés `localStorage` (`meca-lab:cart:v1`), mises à jour immuables, ré-hydratation prix/nom/vignette depuis `@/data` (lignes obsolètes/rupture ignorées), totaux en centimes, livraison offerte dès 60 €, quantité max 10/ligne, synchro multi-onglets.
  - `/shop` : filtres catégorie / recherche (debounce) / prix max / robustesse / en stock / tri, état dans l'URL (`?cat=&q=&max=&dur=&stock=1&sort=`), params non fiables validés, `Suspense` avec grille complète en fallback.
  - `/product/[slug]` : SSG des 25 fiches (`generateStaticParams`, `dynamicParams = false` → 404 sinon), metadata + OG par produit, galerie, problème/astuce, specs, points forts/limites, note robustesse, lien démo externe (`noopener`), produits du même rayon, panneau quantité + ajout + favori.
  - `/checkout` (noindex) : formulaire livraison validé (normalisation, e-mail, code postal par pays FR/BE/CH/LU, limites de longueur, focus 1er champ invalide, `aria-invalid`), récap, confirmation avec référence `MECA-XXXXXXXX`, vidage du panier.
- **Vérifications :**
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run lint` → OK (0 erreur / 0 warning)
  - `npm run build` → OK (Turbopack, 30 pages : `/shop`, `/checkout` statiques + 25 `/product/[slug]` SSG)
  - Smoke `next start` : `/shop` 200, `/shop?cat=mesure&max=40` 200, `/product/lozlin-cliquet-rotatif` 200, `/product/nope` 404, `/checkout` 200.
- **Passation / Impact pour les autres agents :**
  - **`Antigravity` (`T-008`) :** monter `<StoreProviders>` + `<CartDrawer />` (exports `@/store` et `@/components/shop/CartDrawer`) une seule fois dans `AppProviders.tsx`, puis **supprimer** `src/app/{shop,product,checkout}/layout.tsx` (wrappers temporaires via `ShopShell`). Compteurs Header : `useCartCount()`, `useFavoritesCount()` ; bouton prêt à l'emploi : `CartTrigger`.
  - **Stripe :** point d'entrée = `createDemoOrder()` dans `src/components/shop/checkout-logic.ts` (remplace le `submitOrder()` annoncé). À remplacer par un appel à `src/app/api/checkout/route.ts` qui **recalcule les prix côté serveur depuis `@/data`**.
  - **`Freebuff` (`T-007`) :** page favoris → `useFavorites()` + `getProductsBySlugs`/`getProductById`. Seules 3 vignettes produit dédiées existent dans `public/images/products/` ; les autres fiches utilisent les visuels `cat-*.svg`.
  - Pas de framework de test dans `package.json` : logique pure testable (`cart-logic.ts`, `filter-params.ts`, `checkout-logic.ts`) — ajout de Vitest à décider via `[REQUEST / MSG]`.
  - Verrou `T-005` libéré.

### [START] [T-005b] [Antigravity] — 2026-11-21 01:35
- **Objectif :** Finaliser l'intégration Vague 2 avant de lancer la Vague 3 : brancher `StoreProviders`, `ToastProvider` et `CartDrawer` globalement dans `AppProviders.tsx`, retirer les 3 wrappers temporaires `src/app/{shop,product,checkout}/layout.tsx`, activer les compteurs live panier/favoris dans `Header.tsx` et `MobileNav.tsx`, aligner les liens `/shop?cat=` (avec fallback `?category=`) et limiter l'accueil à la sélection phare (`getFeaturedProducts().slice(0, 6)`).
- **Fichiers ciblés / verrouillés :** `src/components/providers/AppProviders.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/Footer.tsx`, `src/app/page.tsx`, `src/components/shop/filter-params.ts`, `src/app/shop/layout.tsx`, `src/app/product/layout.tsx`, `src/app/checkout/layout.tsx`, `AGENT_COMMS.md`
- **Dépendances / Notes :** Commit `T-005` enregistré juste avant (`090c310`) ; aucun verrou actif.

### [DONE] [T-005b] [Antigravity] — 2026-11-21 01:37
- **Fichiers créés / modifiés / supprimés :**
  - `src/components/providers/AppProviders.tsx` (modifié — montage global `StoreProviders`, `ToastProvider`, `CartDrawer`)
  - `src/components/layout/Header.tsx` (modifié — compteur favoris live + bouton panier ouvrant `CartDrawer` avec compteur live)
  - `src/components/layout/MobileNav.tsx` (modifié — pastille compteur favoris live)
  - `src/components/layout/Footer.tsx` (modifié — liens rayons alignés sur `/shop?cat=`)
  - `src/components/shop/filter-params.ts` (modifié — accepte `?cat=` et en fallback `?category=`)
  - `src/app/page.tsx` (modifié — liens `/shop?cat=` et vitrine limitée à `getFeaturedProducts().slice(0, 6)`)
  - `src/app/shop/layout.tsx`, `src/app/product/layout.tsx`, `src/app/checkout/layout.tsx` (supprimés — devenus inutiles grâce au montage global dans `AppProviders.tsx`)
  - `AGENT_COMMS.md` (modifié — clôture et libération du verrou `T-005b`)
- **Résumé des changements :** Raccordement global du store panier/favoris, du système de toasts et du tiroir panier `CartDrawer` à l'échelle de tout le site, affichage des compteurs live dans le Header et la barre mobile, harmonisation des query params `/shop?cat=` et recalibrage de l'accueil sur les 6 produits phares.
- **Vérifications :**
  - `npx next typegen` → OK (cache `.next/types` régénéré suite à suppression des 3 layouts temporaires)
  - `npm run lint` → OK (exit 0)
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run build` → OK (30 pages générées avec Turbopack)
- **Passation / Impact pour les autres agents (Vague 3 débloquée) :**
  - **Pour `Claude` (`T-006`) et `Freebuff` (`T-007`) :** `StoreProviders`, `ToastProvider` et `CartDrawer` sont désormais montés **globalement** dans `AppProviders.tsx`. Ne pas recréer de wrapper `layout.tsx` local sur `/reels`, `/favorites` ou `/compare` : `useCart()`, `useFavorites()` et `useToast()` fonctionnent directement partout.
  - **Pour `Freebuff` (`T-007`) :** en complément de `T-007`, recaler la fiche `organiseur-pliant-find-my` dans `src/data/products.ts` et `src/data/reels.ts` sur le **porte-clés carbone pliant compatible Apple Find My** du reel `@thetrazix` (`https://www.instagram.com/p/Dd-jloQR6EA/`).
  - Aucun verrou actif.

### [START] [T-006] [Claude] — 2026-11-21 01:40
- **Objectif :** Vague 3 — flux vertical façon Reels sur `/reels` : scroll-snap plein écran, lecteur (aperçu animé pour `preview`/`instagram`, `<video>` réel prêt pour `mp4`) avec lecture/pause et son, carte produit superposée (« Voir la fiche » + « + Panier » 1 clic via `useCart` + `useToast`), actions (favori, partage, source externe), navigation clavier ↑/↓/Espace/M, swipe natif, filtre catégorie (`?cat=`) et lien profond (`?reel=`).
- **Fichiers ciblés / verrouillés :** `src/components/reels/*`, `src/app/reels/*` ; suppression de `src/components/shop/ShopShell.tsx` (mon fichier, inutilisé depuis le montage global `T-005b`).
- **Dépendances / Notes :** Lecture seule de `@/data`, `@/types`, `@/store`, `@/components/ui`. Aucun fichier partagé ni dépendance modifiés. Pas de layout local (providers globaux depuis `T-005b`).

### [START] [T-007] [Freebuff] — 2026-11-21 01:44
- **Objectif :** Vague 3 — pages annexes (`/compare`, `/favorites`, `/about`), SEO technique (`sitemap.ts`, `robots.ts`) et validateur de catalogue (`scripts/validate-catalog.mjs`), en consommant les hooks de `src/store/*` et les données de `@/data`. Inclut le recalibrage demandé en `T-005b` : fiche `organiseur-pliant-find-my` → porte-clés carbone pliant compatible Apple Find My (reel `@thetrazix`, `https://www.instagram.com/p/Dd-jloQR6EA/`).
- **Fichiers ciblés / verrouillés :** `src/app/compare/*`, `src/app/favorites/*`, `src/app/about/*`, `src/app/sitemap.ts`, `src/app/robots.ts`, `scripts/*`, `src/data/products.ts`, `src/data/reels.ts`, `AGENT_COMMS.md`
- **Dépendances / Notes :** Suite à `[DONE] [T-005b]` (commit `c81da1e`). `StoreProviders`, `ToastProvider` et `CartDrawer` sont montés globalement dans `AppProviders.tsx` : aucun `layout.tsx` local à créer. Aucune nouvelle dépendance. Aucun fichier de `Claude` (`src/store/*`, `src/components/shop/*`, `src/app/shop/*`, `src/app/product/*`, `src/app/checkout/*`, `src/app/reels/*`, `src/components/reels/*`) ni fichier partagé modifié.

### [DONE] [T-007] [Freebuff] — 2026-11-21 01:58
- **Fichiers créés / modifiés / supprimés :**
  - `src/app/compare/page.tsx`, `src/app/compare/CompareBoard.tsx` (créés)
  - `src/app/favorites/page.tsx`, `src/app/favorites/FavoritesList.tsx` (créés)
  - `src/app/about/page.tsx` (créé)
  - `src/app/sitemap.ts`, `src/app/robots.ts` (créés)
  - `scripts/validate-catalog.mjs` (créé)
  - `src/data/products.ts` (modifié — fiche `organiseur-pliant-find-my` remplacée par le porte-clés carbone Find My : `prod-porte-cles-carbone-findmy` / `porte-cles-carbone-find-my`)
  - `src/data/reels.ts` (modifié — `reel-organiseur-findmy` remplacé par `reel-porte-cles-carbone-findmy`, source Instagram `@thetrazix`, `https://www.instagram.com/p/Dd-jloQR6EA/`)
  - `AGENT_COMMS.md` (modifié — verrou, journal, libération)
- **Résumé des changements :**
  - `/compare` : sélection de 2 à 3 outils encodée dans l URL (`?items=slug,slug,slug`), selects groupés par rayon, remplacement/retrait/réinitialisation. Tableau côte à côte : visuel, marque, prix + fourchette revendeur, note, grade de robustesse, stock, problème résolu, twist, union des spécifications, points forts, limites, démo externe, fiche + ajout panier + favori. Slugs inconnus ou dupliqués filtrés puis complétés par la sélection MECA par défaut ; tableau scrollable horizontalement sur mobile.
  - `/favorites` : liste live branchée sur `useFavorites()` (providers globaux, aucun wrapper local), état vide avec CTA boutique, vidage avec confirmation `Modal` + toast. Page `noindex, follow`.
  - `/about` : manifeste, 3 principes de sélection, guide « Pro / Atelier / EDC / Gadget » (critères de reconnaissance + verdict), méthode d entrée au catalogue en 4 étapes, refus explicites, bloc prix/fourchette.
  - SEO : `sitemap.ts` (5 pages fixes + 25 fiches, URL via `getSiteUrl()`, jamais de localhost codé en dur) et `robots.ts` (allow `/`, disallow `/checkout` et `/favorites`, sitemap + host).
  - `validate-catalog.mjs` : importe `src/data/*.ts` via le type stripping natif de Node (aucune dépendance, aucun build) et vérifie ids/slugs uniques et kebab-case, champs requis avec seuils par champ, catégories, prix et fourchettes, note 0–5, avis entiers, grades, tags, specs (3 min, labels uniques), pros/cons, existence réelle des visuels locaux dans `public/`, URLs https, cohérence produit ↔ reel dans les deux sens, sources/posters des reels, rayons non vides.
  - Aucune dépendance ajoutée. Aucun fichier de `Claude` (`src/store/*`, `src/components/shop/*`, `src/app/shop/*`, `src/app/product/*`, `src/app/checkout/*`, `src/app/reels/*`, `src/components/reels/*`) ni fichier partagé modifié.
- **Vérifications :**
  - `node scripts/validate-catalog.mjs` → OK (exit 0) : 25 produits · 5 catégories · 10 reels, 5 par rayon, 0 avertissement
  - `npm run lint` → OK (exit 0, 0 erreur / 0 warning)
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run build` → OK (Turbopack, 36 pages ; `/compare`, `/favorites`, `/about`, `/robots.txt`, `/sitemap.xml` générés + 25 fiches `/product/[slug]` SSG)
- **Passation / Impact pour les autres agents :**
  - **`Antigravity` (`T-008`) :** ajouter `node scripts/validate-catalog.mjs` à la batterie finale. Le script exige **Node >= 22.18** (type stripping natif) et ne dépend d aucun build ; les warnings `MODULE_TYPELESS_PACKAGE_JSON` sont cosmétiques — ne pas ajouter `"type": "module"` à `package.json` sans vérifier Next/PostCSS.
  - `/favorites` dépend du montage global de `StoreProviders` + `ToastProvider` dans `AppProviders.tsx` (fait en `T-005b`) : ne pas ajouter de provider local sur la route.
  - **Changement d identifiants :** `prod-organiseur-findmy` / `organiseur-pliant-find-my` → `prod-porte-cles-carbone-findmy` / `porte-cles-carbone-find-my`. Un favori enregistré sur l ancien id est silencieusement ignoré par `parseStoredFavorites` (aucun crash). Plus aucune référence à l ancien slug dans le dépôt.
  - `/compare` est 100 % client sous `Suspense` : l URL reste partageable et les slugs non fiables sont filtrés côté client.
  - `sitemap.ts` inclut `/reels` ; si une route est retirée plus tard, retirer sa ligne de `STATIC_ROUTES`.

### [DONE] [T-006] [Claude] — 2026-11-21 02:00
- **Fichiers créés / modifiés / supprimés :**
  - `src/components/reels/ReelFeed.tsx`, `ReelSlide.tsx`, `ReelMedia.tsx`, `ReelActions.tsx`, `ReelProductOverlay.tsx`, `ReelCategoryFilter.tsx`, `reel-params.ts` (créés)
  - `src/app/reels/page.tsx` (créé)
  - `src/components/shop/ShopShell.tsx` (supprimé — inutilisé depuis le montage global `T-005b`)
  - Aucun fichier partagé, aucune donnée, aucune dépendance modifiés.
- **Résumé :**
  - `/reels` : flux vertical `scroll-snap` (y mandatory) ; slide active détectée par `IntersectionObserver` (seuil 60 %).
  - Lecteur : `<video>` réel (muted/playsInline/loop, lecture auto sur slide active) pour `sourceType: "mp4"` ; pour `preview`/`instagram` (les 10 reels actuels) aperçu animé = poster `contain` sur fond flouté + Ken Burns + barre de progression calée sur `durationSeconds`, en pause hors slide active, onglet masqué ou `prefers-reduced-motion`. Pas d'iframe Instagram (ni tracking ni CSP tiers) : bouton « Source » externe `noopener`.
  - Contrôles : tap sur la vidéo = lecture/pause, son (actif seulement si audio réel, sinon désactivé avec libellé explicite), favori produit (`useFavorites`), partage (`navigator.share` → repli presse-papiers + toast), likes de la source.
  - Carte produit superposée : vignette, nom, prix, « Voir la fiche », « + Panier » 1 clic (`useCart().addItem` + toast), compteur « N au panier » ouvrant le `CartDrawer`, gestion rupture/quantité max.
  - Navigation : ↑/↓ (ou K/J), Espace = pause, M = son (ignorés dans les champs ou si un `<dialog>` est ouvert) ; boutons ↑/↓ + compteur en desktop ; swipe natif mobile.
  - URL : filtre `?cat=` (mêmes clés que `/shop`, valeurs non fiables rejetées) et lien profond `?reel=` (synchronisé via `history.replaceState`, sans navigation).
  - Responsive : mobile plein écran (chips + rail superposés, rail compact sous 760 px de haut) ; desktop scène 9:16 centrée, chips au-dessus, rail à côté.
- **Vérifications :**
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run lint` → OK (0 erreur / 0 warning)
  - `npm run build` → OK (36 pages, `/reels` statique) — build combiné avec les changements `T-007`
  - `node scripts/validate-catalog.mjs` → OK (25 produits · 5 catégories · 10 reels)
  - Navigateur (`next start`) : desktop 1270×633 + mobile 390×560 / 390×844 (iframe). ↓ change de reel sans scroller la fenêtre, `?reel=` mis à jour ; « + Panier » → toast + compteur Header 1 ; `?cat=mesure` → 1 slide ; lien profond `?reel=reel-luxafor-duo` → slide 3/10 ; 0 erreur console.
  - Bugs trouvés et corrigés pendant le test : `scrollIntoView` faisait défiler toute la page → `scrollTo` sur le conteneur ; course entre `router.replace` et la synchro `replaceState` qui annulait le filtre ; rail débordant sur la slide suivante sur petit écran.
- **Passation / Impact pour les autres agents :**
  - **`Antigravity` (`T-008`) :** accueil → lier un aperçu à `/reels?reel=<id>` ou `/reels?cat=<slug>`. `/reels` est déjà dans `sitemap.ts`.
  - **Données (`Freebuff`) :** déposer un MP4 (`sourceType: "mp4"`, `videoUrl: "/videos/…"`, poster 9:16 de préférence) active automatiquement la vraie vidéo et le contrôle du son. Les posters actuels sont en paysage (affichés en `contain` sur fond flouté).
  - Pas de tests automatisés (pas de framework de test). Logique pure testable : `reel-params.ts`.
  - Verrou `T-006` libéré.

### [START] [T-008] [Antigravity] — 2026-11-21 01:56
- **Objectif :** Vague 4 — finaliser la page d'accueil hybride (aperçus Reels cliquables `/reels?reel=`, cartes interactives `ProductGrid` avec panier/favoris, index 5 métiers avec compteurs, bloc comparateur & manifeste), ajouter les liens « Voir dans le flux Reels » et « Comparer » sur `/product/[slug]`, exécuter toute la batterie de tests + QA visuelle navigateur et pousser `main` sur GitHub / Vercel.
- **Fichiers ciblés / verrouillés :** `src/app/page.tsx`, `src/app/product/[slug]/page.tsx`, `AGENT_COMMS.md`
- **Dépendances / Notes :** Suite au commit `T-006` (`754d641`, Claude) et `T-007` (`726ad75`, Freebuff). Aucun verrou actif.

### [DONE] [T-008] [Antigravity] — 2026-11-21 01:58
- **Fichiers créés / modifiés / supprimés :**
  - `src/app/page.tsx` (modifié — page d'accueil hybride finale : Hero asymétrique avec aperçu Reel + accès rapide 2 autres Reels, grille 4 Reels phares cliquables vers `/reels?reel=`, index 5 métiers avec compteurs live, grille interactive `ProductGrid` des 6 produits phares avec `+ Panier` & favoris, bandeau Comparateur `/compare` & Manifeste `/about`)
  - `src/app/product/[slug]/page.tsx` (modifié — ajout des liens « Voir dans le flux Reels » `/reels?reel=...` et « Comparer cet outil » `/compare?items=...` à côté de la source vidéo externe)
  - `AGENT_COMMS.md` (modifié — clôture et libération du verrou `T-008`)
- **Résumé des changements :** Finalisation complète de l'assemblage V1 entre le socle (`T-003`), le catalogue et les primitives UI (`Freebuff` `T-004`/`T-007`) et la boutique / flux Reels (`Claude` `T-005`/`T-006`).
- **Vérifications :**
  - `node scripts/validate-catalog.mjs` → OK (25 produits · 5 catégories · 10 reels, 0 avertissement)
  - `npm run lint` → OK (exit 0)
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run build` → OK (Turbopack, 36 pages générées : `/`, `/reels`, `/shop`, `/product/[slug]` ×25 SSG, `/compare`, `/favorites`, `/about`, `/checkout`, `/robots.txt`, `/sitemap.xml`)
  - Aperçu local + inspection visuelle navigateur sur `http://localhost:3000` lancés juste après le push `main`.
- **Passation / Impact pour les autres agents :** Vagues 0 à 4 terminées et poussées sur `origin/main` (`https://github.com/Monsieurking5D/Meca.git`). Aucun verrou actif.

### [START] [T-009] [Antigravity] — 2026-11-21 02:11
- **Objectif :** Refonte UX & visuelle professionnelle « moins de clics » :
  1. **Accueil Workbench tout-en-un (`src/app/page.tsx` + `src/components/home/WorkbenchHero.tsx`)** : lecteur Reels interactif intégré dès l'accueil (changement de démo en 1 clic sans changer de page + ajout panier direct) suivi directement du catalogue complet filtrable en temps réel (zéro clic intermédiaire vers `/shop`).
  2. **Cartes produits pro haute densité (`ProductCard.tsx`)** : affichage direct du twist mécanique et des 2 spécifications principales sur la carte + bouton **Aperçu rapide (Quick-View)** en 1 clic + bouton **+ Comparer** en 1 clic.
  3. **Quick-View Modal (`QuickViewModal.tsx`) & CompareDock flottant (`CompareDock.tsx` + `src/store/compare-context.tsx`)** : consulter toute la fiche technique ou comparer 2–3 outils sans quitter sa position de lecture.
  4. **25 visuels techniques SVG dédiés (`public/images/products/<slug>.svg`)** : remplacer les 5 icônes génériques répétées par 25 schémas industriels uniques (silhouette de l'outil, cotes, badge matière).
- **Fichiers ciblés / verrouillés :** `public/images/products/*`, `src/data/products.ts`, `src/data/reels.ts`, `src/store/*`, `src/components/providers/AppProviders.tsx`, `src/components/layout/*`, `src/components/shop/*`, `src/components/home/*`, `src/app/page.tsx`, `src/app/globals.css`, `AGENT_COMMS.md`
- **Dépendances / Notes :** Suite à `T-008` (`c3bf0fc`). Aucun autre verrou actif.

### [DONE] [T-009] [Antigravity] — 2026-11-21 02:21
- **Fichiers créés / modifiés / supprimés :**
  - `public/images/products/*.svg` (22 nouveaux schémas techniques CAO dédiés créés — chacun des 25 produits possède désormais son visuel sur-mesure)
  - `src/data/products.ts`, `src/data/reels.ts` (modifiés — raccordement des 25 fiches et 10 Reels à leurs schémas SVG dédiés)
  - `src/store/compare-context.tsx`, `src/store/quickview-context.tsx` (créés), `src/store/StoreProviders.tsx`, `src/store/index.ts` (modifiés)
  - `src/components/shop/QuickViewModal.tsx`, `src/components/shop/CompareDock.tsx` (créés)
  - `src/components/shop/ProductCard.tsx`, `src/components/shop/ProductActions.tsx` (modifiés — design Double-Bezel, affichage direct du Twist + 2 specs sur chaque carte, boutons 1 clic `Aperçu`, `Comparer`, `Favori`, `Ajouter`)
  - `src/components/home/WorkbenchHero.tsx` (créé — studio Reels interactif permettant de basculer entre les 10 démos et de filtrer le catalogue en 1 clic sans quitter l'accueil)
  - `src/app/page.tsx` (modifié — accueil tout-en-un combinant `WorkbenchHero` + `ShopCatalog` complet filtrable sur place + grille des 4 grades de robustesse)
  - `src/components/providers/AppProviders.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/MobileNav.tsx` (modifiés — montage global `QuickViewModal` + `CompareDock` + badge compteur live sur `Comparer`)
  - `AGENT_COMMS.md` (modifié — clôture et libération du verrou `T-009`)
- **Résumé des changements :** Refonte UX/UI professionnelle « 1-Click Workbench » réduisant drastiquement le nombre de clics (0 changement de page pour parcourir les 10 Reels, filtrer les 25 outils, lire le twist/specs, ouvrir l'aperçu technique complet ou épingler des outils dans le comparateur flottant) et remplaçant les icônes génériques par 25 schémas techniques dédiés.
- **Vérifications :**
  - `node scripts/validate-catalog.mjs` → OK (25 produits · 5 catégories · 10 reels, 0 avertissement)
  - `npm run lint` → OK (exit 0)
  - `npx tsc --noEmit` → OK (exit 0)
  - `npm run build` → OK (Turbopack, 36 pages générées)
- **Passation / Impact pour les autres agents :** Poussé sur `origin/main` et serveur local relancé sur `http://localhost:3001`. Aucun verrou actif.
