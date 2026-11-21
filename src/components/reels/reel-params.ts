import { CATEGORIES } from "@/data";
import type { CategorySlug } from "@/types";

/** Query keys shared with /shop (`cat`) so category links stay consistent. */
export const REEL_PARAM = {
  category: "cat",
  reel: "reel",
} as const;

const CATEGORY_SLUGS = new Set<string>(CATEGORIES.map((c) => c.slug));

interface ReadableParams {
  get: (name: string) => string | null;
}

/** Parses an untrusted `?cat=` value; anything unknown falls back to "all". */
export function parseReelCategory(params: ReadableParams): CategorySlug | "all" {
  const raw = params.get(REEL_PARAM.category);
  return raw && CATEGORY_SLUGS.has(raw) ? (raw as CategorySlug) : "all";
}

/** Builds the /reels query string, omitting defaults so URLs stay short. */
export function buildReelQuery(
  category: CategorySlug | "all",
  reelId: string | null
): string {
  const params = new URLSearchParams();
  if (category !== "all") {
    params.set(REEL_PARAM.category, category);
  }
  if (reelId) {
    params.set(REEL_PARAM.reel, reelId);
  }
  return params.toString();
}

export function formatReelDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
