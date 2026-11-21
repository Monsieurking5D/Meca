import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type RatingStarsSize = "sm" | "md";

const STAR_SIZES: Record<RatingStarsSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
};

export interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: RatingStarsSize;
  showValue?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  showValue = true,
  className,
}: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const filledPercent = (clamped / 5) * 100;
  const stars = [0, 1, 2, 3, 4];

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      role="img"
      aria-label={`Note ${clamped.toFixed(1)} sur 5${
        typeof reviewCount === "number" ? `, ${reviewCount} avis` : ""
      }`}
    >
      <span aria-hidden="true" className="relative inline-flex">
        <span className="flex gap-0.5 text-border-strong">
          {stars.map((index) => (
            <Star key={index} className={STAR_SIZES[size]} strokeWidth={1.75} />
          ))}
        </span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${filledPercent}%` }}
        >
          <span className="flex gap-0.5 whitespace-nowrap text-accent">
            {stars.map((index) => (
              <Star
                key={index}
                className={cn(STAR_SIZES[size], "fill-current")}
                strokeWidth={1.75}
              />
            ))}
          </span>
        </span>
      </span>
      {showValue ? (
        <span className="font-mono text-[11px] tabular-nums text-text-secondary">
          {clamped.toFixed(1)}
          {typeof reviewCount === "number" ? ` (${reviewCount})` : ""}
        </span>
      ) : null}
    </span>
  );
}
