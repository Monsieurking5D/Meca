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
| _Aucune_ | — | _Aucun verrou actif — le dépôt est prêt pour la tâche suivante (T-002)._ | — | — | — |

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
