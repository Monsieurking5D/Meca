import type { CategorySlug } from "./category";

export type ReelSourceType = "instagram" | "youtube" | "mp4" | "preview";

export interface ReelItem {
  id: string;
  title: string;
  hook: string;
  creatorHandle: string;
  category: CategorySlug;
  productSlug: string;
  durationSeconds: number;
  sourceType: ReelSourceType;
  videoUrl?: string;
  posterUrl: string;
  externalUrl: string;
  likesCount: number;
  highlights: string[];
  isParody?: boolean;
}
