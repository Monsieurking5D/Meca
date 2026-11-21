"use client";

import { CATEGORIES } from "@/data";
import type { CategorySlug } from "@/types";
import { cn } from "@/lib/utils";

interface ReelCategoryFilterProps {
  value: CategorySlug | "all";
  counts: Record<CategorySlug | "all", number>;
  onChange: (next: CategorySlug | "all") => void;
}

const OPTIONS: { value: CategorySlug | "all"; label: string }[] = [
  { value: "all", label: "Tout" },
  ...CATEGORIES.map((category) => ({
    value: category.slug,
    label: category.shortName,
  })),
];

export function ReelCategoryFilter({
  value,
  counts,
  onChange,
}: ReelCategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrer les Reels par rayon"
      className="flex gap-1.5 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {OPTIONS.map((option) => {
        const count = counts[option.value] ?? 0;
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            disabled={count === 0}
            aria-pressed={isSelected}
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium backdrop-blur-md transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40",
              isSelected
                ? "border-accent bg-accent text-bg"
                : "border-white/15 bg-bg/60 text-text-secondary hover:border-white/30 hover:text-text"
            )}
          >
            {option.label}
            <span
              className={cn(
                "font-mono text-[10px] tabular-nums",
                isSelected ? "text-bg/70" : "text-text-muted"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
