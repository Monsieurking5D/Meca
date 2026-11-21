"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/data";
import type {
  CategorySlug,
  DurabilityGrade,
  ProductFilterState,
  ProductSortOption,
} from "@/types";
import { cn, formatPriceEur } from "@/lib/utils";
import {
  countActiveFilters,
  DURABILITY_LABELS,
  SORT_OPTIONS,
} from "./filter-params";

const SEARCH_DEBOUNCE_MS = 250;
const PRICE_STEP_EUR = 5;

interface FilterBarProps {
  filters: ProductFilterState;
  priceCeilingEur: number;
  resultCount: number;
  /** Incremented by the parent on reset to clear the search input. */
  resetKey: number;
  onChange: (patch: Partial<ProductFilterState>) => void;
  onReset: () => void;
}

export function FilterBar({
  filters,
  priceCeilingEur,
  resultCount,
  resetKey,
  onChange,
  onReset,
}: FilterBarProps) {
  const activeCount = countActiveFilters(filters);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <section
      aria-label="Filtres de la boutique"
      className="rounded-xl border border-border bg-surface p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Remount on reset so the local input value follows the URL. */}
        <SearchField
          key={resetKey}
          initialValue={filters.search}
          onCommit={(search) => onChange({ search })}
        />

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="shop-sort">
            Trier par
          </label>
          <select
            id="shop-sort"
            value={filters.sortBy}
            onChange={(event) =>
              onChange({ sortBy: event.target.value as ProductSortOption })
            }
            className="h-10 rounded-lg border border-border bg-bg px-3 text-sm text-text focus-visible:outline-2 focus-visible:outline-accent"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsPanelOpen((open) => !open)}
            aria-expanded={isPanelOpen}
            aria-controls="shop-advanced-filters"
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors",
              isPanelOpen || activeCount > 0
                ? "border-accent/50 bg-accent-muted text-accent"
                : "border-border bg-bg text-text-secondary hover:text-text"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
            <span>Filtres</span>
            {activeCount > 0 ? (
              <span className="rounded bg-accent px-1.5 font-mono text-[11px] text-bg">
                {activeCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Catégorie"
        className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        <CategoryChip
          label="Tout"
          isActive={filters.category === "all"}
          onSelect={() => onChange({ category: "all" })}
        />
        {CATEGORIES.map((category) => (
          <CategoryChip
            key={category.slug}
            label={category.shortName}
            isActive={filters.category === category.slug}
            onSelect={() =>
              onChange({ category: category.slug as CategorySlug })
            }
          />
        ))}
      </div>

      {isPanelOpen ? (
        <div
          id="shop-advanced-filters"
          className="mt-4 grid gap-5 border-t border-border pt-4 sm:grid-cols-3"
        >
          <div>
            <label
              htmlFor="shop-max-price"
              className="flex items-baseline justify-between text-xs font-medium text-text-secondary"
            >
              <span>Prix max</span>
              <span className="font-mono tabular-nums text-text">
                {filters.maxPriceEur === null
                  ? "Aucun"
                  : formatPriceEur(filters.maxPriceEur)}
              </span>
            </label>
            <input
              id="shop-max-price"
              type="range"
              min={PRICE_STEP_EUR}
              max={priceCeilingEur}
              step={PRICE_STEP_EUR}
              value={filters.maxPriceEur ?? priceCeilingEur}
              onChange={(event) => {
                const value = Number(event.target.value);
                onChange({
                  maxPriceEur: value >= priceCeilingEur ? null : value,
                });
              }}
              className="mt-3 w-full accent-[var(--color-accent)]"
            />
          </div>

          <div>
            <label
              htmlFor="shop-durability"
              className="text-xs font-medium text-text-secondary"
            >
              Robustesse
            </label>
            <select
              id="shop-durability"
              value={filters.durability}
              onChange={(event) =>
                onChange({
                  durability: event.target.value as DurabilityGrade | "all",
                })
              }
              className="mt-2 h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-text"
            >
              <option value="all">Toutes</option>
              {Object.entries(DURABILITY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 self-end rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-text">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(event) =>
                onChange({ inStockOnly: event.target.checked })
              }
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            En stock uniquement
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-text-muted">
        <span aria-live="polite">
          <span className="font-mono tabular-nums text-text">
            {resultCount}
          </span>{" "}
          outil{resultCount > 1 ? "s" : ""}
        </span>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 font-medium text-text-secondary transition-colors hover:text-accent"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
            Réinitialiser
          </button>
        ) : null}
      </div>
    </section>
  );
}

interface SearchFieldProps {
  initialValue: string;
  onCommit: (value: string) => void;
}

function SearchField({ initialValue, onCommit }: SearchFieldProps) {
  const [value, setValue] = useState(initialValue);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    },
    []
  );

  const handleChange = (next: string) => {
    setValue(next);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(
      () => onCommit(next),
      SEARCH_DEBOUNCE_MS
    );
  };

  return (
    <div className="relative flex-1">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <label htmlFor="shop-search" className="sr-only">
        Rechercher un outil
      </label>
      <input
        id="shop-search"
        type="search"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Cliquet, laser, renvoi d'angle…"
        maxLength={80}
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-border bg-bg pl-9 pr-3 text-sm text-text placeholder:text-text-muted focus-visible:border-accent/60 focus-visible:outline-none"
      />
    </div>
  );
}

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onSelect: () => void;
}

function CategoryChip({ label, isActive, onSelect }: CategoryChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isActive}
      onClick={onSelect}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive
          ? "border-accent bg-accent text-bg"
          : "border-border bg-bg text-text-secondary hover:border-border-strong hover:text-text"
      )}
    >
      {label}
    </button>
  );
}
