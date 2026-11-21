# AGENTS.md — Instructions du projet MECA Lab

> **PROTOCOLE OBLIGATOIRE (`AGENT_COMMS.md`) — À LIRE EN PREMIER**
>
> Ce dépôt est développé en collaboration entre **3 agents** : **Antigravity**, **Claude** et **Freebuff**.
> Avant toute action et après chaque modification, tu **DOIS** respecter le protocole défini dans `AGENT_COMMS.md` :
> 1. **Avant de commencer :** Lire `AGENT_COMMS.md`, vérifier qu'aucun verrou actif n'entre en conflit avec les fichiers visés, ajouter ton verrou dans `## 2. Verrous actifs` et ajouter une entrée `[START]` en bas de `## 5. Journal` **avant** d'éditer un fichier.
> 2. **Pendant le travail :** Ne modifier que les fichiers verrouillés dans ta déclaration. Pour tout besoin sur un fichier partagé, poster une entrée `[REQUEST / MSG]` dans `AGENT_COMMS.md`.
> 3. **Après chaque changement :** Ajouter une entrée `[DONE]` (ou `[BLOCKED]`) en bas de `## 5. Journal` (append-only, ne jamais effacer les entrées existantes) avec la liste des fichiers touchés et les vérifications exécutées, puis libérer ton verrou dans `## 2`.

---

## 1. Vue d'ensemble du projet

- **Nom :** MECA Lab
- **Concept :** Plateforme mixte (**démos vidéo façon Reels + boutique intégrée**) consacrée aux outils malins, instruments de mesure et gadgets qui facilitent le travail (mécanique, atelier, électricité, menuiserie, bureau/tech).
- **Stack :** Next.js (App Router) · TypeScript · Tailwind CSS
- **Déploiement cible :** GitHub + Vercel
- **Feuille de route :** Consulter `PLAN.md` pour l'ordre des vagues (`T-003` à `T-008`), les dépendances entre tâches et la matrice de propriété des fichiers.

---

## 2. Identités et répartition par défaut

Dans `AGENT_COMMS.md`, identifie-toi avec ton nom exact (`Freebuff`, `Claude` ou `Antigravity`).

| Agent | Périmètre par défaut |
|---|---|
| `Freebuff` | Données catalogue & démos (`src/data/*`), composants UI réutilisables (`src/components/ui/*`), pages annexes (favoris, comparateur, à propos), SEO / métadonnées et QA / tests |
| `Claude` | Flux vidéo façon Reels (`src/components/reels/*`), boutique, fiches produits, filtres & panier (`src/components/shop/*`, `src/store/*`, `src/app/shop/*`, `src/app/product/*`) |
| `Antigravity` | Architecture globale, scaffolding Next.js/Tailwind/Vercel, `src/types/*`, `src/app/layout.tsx`, `src/app/globals.css`, intégration et revue |

### Fichiers partagés / protégés
Toute modification sur ces fichiers nécessite une coordination préalable via `[REQUEST / MSG]` dans `AGENT_COMMS.md` :
- `package.json`, `package-lock.json`
- `next.config.*`, `tsconfig.json`, `postcss.config.*`, `tailwind.config.*`
- `src/types/*`
- `src/app/layout.tsx`, `src/app/globals.css`

---

## 3. Hygiène Git

- Toujours vérifier `git status` avant de démarrer et après avoir terminé une tâche.
- Ne jamais utiliser `git push --force`, ne jamais réécrire l'historique partagé et ne jamais écraser les modifications non commitées d'un autre agent.
- Utiliser des messages de commit conventionnels : `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.

---

## 4. Commandes de vérification (après scaffolding Next.js)

Avant de passer une tâche en `[DONE]` dans `AGENT_COMMS.md`, exécuter les vérifications applicables :
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

---

## 5. Règles de compatibilité Vercel

- Aucune URL `localhost` codée en dur dans le code applicatif.
- Toutes les variables d'environnement passent par `process.env` (et `.env.local` non commité).
- Le build de production (`npm run build`) doit passer sans erreur TypeScript ni warning bloquant.
