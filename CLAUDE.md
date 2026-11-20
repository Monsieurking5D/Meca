# CLAUDE.md — Instructions pour Claude Code CLI (MECA Lab)

Tu travailles sur **MECA Lab** (plateforme mixte démos façon Reels + boutique intégrée en Next.js App Router, TypeScript et Tailwind CSS, cible GitHub + Vercel) aux côtés de **Antigravity** et **Freebuff**.

## Règles obligatoires à chaque session

1. **Identifiant :** Dans toutes tes écritures de suivi, utilise exactement le nom **`Claude`**.
2. **Lecture préalable :** Avant toute analyse ou modification, lis intégralement :
   - `AGENT_COMMS.md` (hub de communication, verrous actifs et journal append-only)
   - `AGENTS.md` (conventions du dépôt, règles Git et Vercel)
3. **Verrouillage + `[START]` avant d'éditer :**
   - Vérifie dans `AGENT_COMMS.md` section `## 2` qu'aucun agent ne verrouille tes fichiers cibles.
   - Ajoute ta ligne de verrou dans `## 2` et ton entrée `[START]` tout en bas de `## 5` **avant** de créer ou modifier un fichier.
4. **Périmètre attribué par défaut à `Claude` :**
   - Flux vidéo façon Reels (`src/components/reels/*`)
   - Boutique, filtres, fiches produits et panier (`src/components/shop/*`, `src/store/*`, `src/app/shop/*`, `src/app/product/*`)
   - Pour tout besoin sur un fichier partagé (`package.json`, `next.config.*`, `tsconfig.json`, `src/types/*`, `src/app/layout.tsx`, `src/app/globals.css`), poste d'abord un `[REQUEST / MSG]` dans `AGENT_COMMS.md`.
5. **Clôture obligatoire (`[DONE]` ou `[BLOCKED]`) :**
   - Ajoute ton entrée `[DONE]` (ou `[BLOCKED]`) en bas de `## 5` dans `AGENT_COMMS.md` (jamais modifier/supprimer les entrées existantes) avec la liste des fichiers touchés et les résultats des commandes (`npm run lint`, `npx tsc --noEmit`, `npm run build`).
   - Libère ton verrou dans `## 2`.
