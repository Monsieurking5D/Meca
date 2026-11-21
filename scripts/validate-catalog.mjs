#!/usr/bin/env node
/**
 * Valide le catalogue MECA Lab (src/data/*.ts) sans build préalable.
 *
 * S'appuie sur le type stripping natif de Node (>= 22.18) : les modules
 * TypeScript du catalogue n'importent que des types, donc ils s'évaluent
 * directement dans Node.
 *
 * Vérifie : unicité des ids/slugs, champs obligatoires, prix et fourchettes,
 * grades de robustesse, catégories, cohérence produit <-> reel, et existence
 * réelle des visuels locaux dans public/.
 *
 * Usage : node scripts/validate-catalog.mjs
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, "src", "data");

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_TEXT_FIELDS = {
  name: 3,
  brand: 2,
  tagline: 10,
  problemSolved: 10,
  theTwist: 10,
  description: 20,
};
const DURABILITY_GRADES = new Set(["pro", "atelier", "edc", "gadget"]);
const REEL_SOURCE_TYPES = new Set(["instagram", "youtube", "mp4", "preview"]);

const isText = (value, minLength = 1) =>
  typeof value === "string" && value.trim().length >= minLength;
const isPositiveNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) && value > 0;
const isHttpsUrl = (value) =>
  typeof value === "string" && /^https:\/\/[^\s]+$/.test(value);
const isLocalAsset = (value) =>
  isText(value) && value.startsWith("/") &&
  existsSync(path.join(ROOT, "public", value.replace(/^\/+/, "")));

async function loadCatalogue() {
  try {
    const load = (file) =>
      import(pathToFileURL(path.join(DATA_DIR, file)).href);
    const [{ PRODUCTS }, { CATEGORIES }, { REELS }] = await Promise.all([
      load("products.ts"),
      load("categories.ts"),
      load("reels.ts"),
    ]);
    return { PRODUCTS, CATEGORIES, REELS };
  } catch (error) {
    console.error("✖ Impossible d'importer src/data/*.ts.");
    console.error(`  ${error instanceof Error ? error.message : String(error)}`);
    console.error(
      "  Node >= 22.18 est requis (type stripping natif, aucune dépendance)."
    );
    process.exit(1);
  }
}

const { PRODUCTS, CATEGORIES, REELS } = await loadCatalogue();

if (!Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
  fail("Le catalogue ne contient aucun produit.");
}
if (!Array.isArray(CATEGORIES) || CATEGORIES.length === 0) {
  fail("Aucune catégorie définie.");
}
if (!Array.isArray(REELS) || REELS.length === 0) {
  fail("Aucun reel défini.");
}

const categorySlugs = new Set(CATEGORIES.map((category) => category.slug));
const productBySlug = new Map();
const productById = new Map();
const reelById = new Map();

for (const [index, product] of PRODUCTS.entries()) {
  const where = `products[${index}] (${product?.slug ?? product?.id ?? "sans identifiant"})`;

  if (!KEBAB_CASE.test(product?.id ?? "")) {
    fail(`${where} : id absent ou non kebab-case.`);
  } else if (productById.has(product.id)) {
    fail(`${where} : id dupliqué ("${product.id}").`);
  } else {
    productById.set(product.id, product);
  }

  if (!KEBAB_CASE.test(product?.slug ?? "")) {
    fail(`${where} : slug absent ou non kebab-case.`);
  } else if (productBySlug.has(product.slug)) {
    fail(`${where} : slug dupliqué ("${product.slug}").`);
  } else {
    productBySlug.set(product.slug, product);
  }

  for (const [field, minLength] of Object.entries(REQUIRED_TEXT_FIELDS)) {
    if (!isText(product?.[field], minLength)) {
      fail(
        `${where} : champ "${field}" manquant ou trop court (${minLength} caractères min).`
      );
    }
  }

  if (!categorySlugs.has(product?.category)) {
    fail(`${where} : catégorie inconnue ("${product?.category}").`);
  }

  if (!isPositiveNumber(product?.priceEur)) {
    fail(`${where} : prix invalide (${product?.priceEur}).`);
  }

  const range = product?.priceRangeEur ?? {};
  if (
    !isPositiveNumber(range.min) ||
    !isPositiveNumber(range.max) ||
    range.min > range.max
  ) {
    fail(`${where} : fourchette de prix invalide (${range.min} – ${range.max}).`);
  } else if (product.priceEur < range.min || product.priceEur > range.max) {
    warn(
      `${where} : prix ${product.priceEur} € hors de la fourchette ${range.min} – ${range.max} €.`
    );
  }

  if (
    typeof product?.rating !== "number" ||
    !Number.isFinite(product.rating) ||
    product.rating < 0 ||
    product.rating > 5
  ) {
    fail(`${where} : note hors de 0–5 (${product?.rating}).`);
  }
  if (!Number.isInteger(product?.reviewCount) || product.reviewCount < 0) {
    fail(`${where} : nombre d'avis invalide (${product?.reviewCount}).`);
  }

  if (!DURABILITY_GRADES.has(product?.durability)) {
    fail(`${where} : grade de robustesse inconnu ("${product?.durability}").`);
  }
  if (!isText(product?.durabilityNote, 10)) {
    fail(`${where} : "durabilityNote" manquant.`);
  }

  if (typeof product?.inStock !== "boolean") {
    fail(`${where} : "inStock" doit être un booléen.`);
  }
  if (typeof product?.featured !== "boolean") {
    fail(`${where} : "featured" doit être un booléen.`);
  }

  if (!Array.isArray(product?.tags) || product.tags.length < 3) {
    fail(`${where} : au moins 3 tags sont attendus.`);
  }
  if (!Array.isArray(product?.pros) || product.pros.length < 2) {
    fail(`${where} : au moins 2 points forts sont attendus.`);
  }
  if (!Array.isArray(product?.cons) || product.cons.length < 1) {
    fail(`${where} : au moins 1 limite est attendue.`);
  }

  if (!Array.isArray(product?.specs) || product.specs.length < 3) {
    fail(`${where} : au moins 3 spécifications sont attendues.`);
  } else {
    const labels = new Set();
    for (const spec of product.specs) {
      if (!isText(spec?.label) || !isText(spec?.value)) {
        fail(`${where} : spécification incomplète (label + value requis).`);
      } else if (labels.has(spec.label)) {
        fail(`${where} : spécification "${spec.label}" dupliquée.`);
      } else {
        labels.add(spec.label);
      }
    }
  }

  const media = product?.media ?? {};
  if (!isLocalAsset(media.thumbnailUrl)) {
    fail(`${where} : vignette introuvable (${media.thumbnailUrl}).`);
  }
  if (!Array.isArray(media.galleryUrls) || media.galleryUrls.length === 0) {
    fail(`${where} : "galleryUrls" doit contenir au moins un visuel.`);
  } else {
    for (const url of media.galleryUrls) {
      if (!isLocalAsset(url)) {
        fail(`${where} : visuel de galerie introuvable (${url}).`);
      }
    }
  }
  if (!isHttpsUrl(media.externalDemoUrl)) {
    fail(`${where} : "externalDemoUrl" doit être une URL https.`);
  }
  if (media.officialUrl !== undefined && !isHttpsUrl(media.officialUrl)) {
    fail(`${where} : "officialUrl" doit être une URL https.`);
  }
  if (product?.merchantUrl !== undefined && !isHttpsUrl(product.merchantUrl)) {
    fail(`${where} : "merchantUrl" doit être une URL https.`);
  }

  if (product?.reelId !== undefined && !reelById.size && !Array.isArray(REELS)) {
    fail(`${where} : "reelId" défini mais aucun reel chargé.`);
  }
}

const reelIds = new Set(REELS.map((reel) => reel.id));

for (const product of PRODUCTS) {
  if (product?.reelId === undefined) {
    continue;
  }
  const reel = REELS.find((entry) => entry.id === product.reelId);
  if (!reel) {
    fail(`products (${product.slug}) : "reelId" "${product.reelId}" introuvable.`);
  } else if (reel.productSlug !== product.slug) {
    fail(
      `products (${product.slug}) : le reel "${reel.id}" pointe vers "${reel.productSlug}".`
    );
  }
}

for (const [index, reel] of REELS.entries()) {
  const where = `reels[${index}] (${reel?.id ?? "sans identifiant"})`;

  if (!KEBAB_CASE.test(reel?.id ?? "")) {
    fail(`${where} : id absent ou non kebab-case.`);
  } else if (reelById.has(reel.id)) {
    fail(`${where} : id dupliqué ("${reel.id}").`);
  } else {
    reelById.set(reel.id, reel);
  }

  if (!isText(reel?.title, 10)) {
    fail(`${where} : "title" manquant.`);
  }
  if (!isText(reel?.hook, 10)) {
    fail(`${where} : "hook" manquant.`);
  }
  if (!/^@[a-z0-9._]+$/i.test(reel?.creatorHandle ?? "")) {
    fail(`${where} : "creatorHandle" doit commencer par @.`);
  }

  if (!categorySlugs.has(reel?.category)) {
    fail(`${where} : catégorie inconnue ("${reel?.category}").`);
  }

  const product = productBySlug.get(reel?.productSlug);
  if (!product) {
    fail(`${where} : "productSlug" "${reel?.productSlug}" introuvable.`);
  } else {
    if (product.category !== reel.category) {
      fail(
        `${where} : catégorie "${reel.category}" ≠ catégorie du produit "${product.category}".`
      );
    }
    if (product.reelId !== reel.id) {
      warn(
        `${where} : le produit "${product.slug}" ne renvoie pas vers ce reel (reelId).`
      );
    }
  }

  if (!Number.isInteger(reel?.durationSeconds) || reel.durationSeconds <= 0) {
    fail(`${where} : "durationSeconds" doit être un entier positif.`);
  }
  if (!REEL_SOURCE_TYPES.has(reel?.sourceType)) {
    fail(`${where} : "sourceType" inconnu ("${reel?.sourceType}").`);
  }
  if (
    (reel?.sourceType === "youtube" || reel?.sourceType === "mp4") &&
    !isText(reel.videoUrl)
  ) {
    fail(`${where} : "videoUrl" requis pour sourceType "${reel.sourceType}".`);
  }
  if (!isLocalAsset(reel?.posterUrl)) {
    fail(`${where} : poster introuvable (${reel?.posterUrl}).`);
  }
  if (!isHttpsUrl(reel?.externalUrl)) {
    fail(`${where} : "externalUrl" doit être une URL https.`);
  }
  if (
    typeof reel?.likesCount !== "number" ||
    !Number.isFinite(reel.likesCount) ||
    reel.likesCount < 0
  ) {
    fail(`${where} : "likesCount" invalide.`);
  }
  if (!Array.isArray(reel?.highlights) || reel.highlights.length < 2) {
    fail(`${where} : au moins 2 "highlights" sont attendus.`);
  }
}

for (const category of CATEGORIES) {
  if (!isText(category?.slug) || !KEBAB_CASE.test(category.slug)) {
    fail(`categories : slug invalide ("${category?.slug}").`);
  }
  if (!isText(category?.name, 3) || !isText(category?.shortName, 2)) {
    fail(`categories ("${category?.slug}") : nom ou nom court manquant.`);
  }
  if (!isText(category?.description, 10)) {
    fail(`categories ("${category?.slug}") : description manquante.`);
  }
  const count = PRODUCTS.filter(
    (product) => product.category === category?.slug
  ).length;
  if (count === 0) {
    warn(`categories ("${category?.slug}") : aucun produit dans ce rayon.`);
  }
}

const unusedReels = REELS.filter((reel) => !reelIds.has(reel.id));
if (unusedReels.length > 0) {
  warn(`${unusedReels.length} reel(s) sans identifiant exploitable.`);
}

const perCategory = CATEGORIES.map(
  (category) =>
    `${category.shortName}: ${
      PRODUCTS.filter((product) => product.category === category.slug).length
    }`
).join(" · ");

for (const warning of warnings) {
  console.warn(`⚠ ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`✖ ${error}`);
  }
  console.error(
    `\n${errors.length} erreur(s) — catalogue invalide (${PRODUCTS.length} produits, ${REELS.length} reels).`
  );
  process.exit(1);
}

console.log(
  `✔ Catalogue valide : ${PRODUCTS.length} produits · ${CATEGORIES.length} catégories · ${REELS.length} reels`
);
console.log(`  ${perCategory}`);
if (warnings.length > 0) {
  console.log(`  ${warnings.length} avertissement(s) non bloquant(s).`);
}
