export type CategorySlug =
  | "mecanique"
  | "electricite"
  | "menuiserie"
  | "mesure"
  | "bureau-tech";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  accentLabel: string;
}
