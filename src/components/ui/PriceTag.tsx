import { cn, formatPriceEur, formatPriceRangeEur } from "@/lib/utils";

export type PriceTagSize = "sm" | "md" | "lg";

const SIZES: Record<PriceTagSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

export interface PriceTagProps {
  priceEur: number;
  range?: { min: number; max: number };
  size?: PriceTagSize;
  className?: string;
}

export function PriceTag({
  priceEur,
  range,
  size = "md",
  className,
}: PriceTagProps) {
  return (
    <span className={cn("inline-flex flex-col items-end gap-0.5", className)}>
      <span
        className={cn(
          "font-mono font-semibold tabular-nums text-accent",
          SIZES[size]
        )}
      >
        {formatPriceEur(priceEur)}
      </span>
      {range ? (
        <span className="font-mono text-[11px] tabular-nums text-text-muted">
          {formatPriceRangeEur(range.min, range.max)} selon revendeur
        </span>
      ) : null}
    </span>
  );
}
