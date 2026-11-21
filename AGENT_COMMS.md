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
| _Aucune_ | — | _Aucun verrou actif — Vague 1 (T-003) terminée. Prêt pour la Vague 2 en parallèle : Freebuff (T-004) \|\| Claude (T-005)._ | — | — | — |

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
- **Passation / Impact pour les autres agents :** Le hub est opérationnel. Prochaine étape (`T-002`) : validation de la direction visuelle avec l'utilisateur puis scaffolding Next.js + Tailwind CSS prêt pour GitHub et Vercel. Aucun verrou actif.

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
