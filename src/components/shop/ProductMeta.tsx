import { ShieldCheck, Star } from "lucide-react";
import type { DurabilityGrade } from "@/types";
import { cn } from "@/lib/utils";
import { DURABILITY_LABELS } from "./filter-params";

const DURABILITY_STYLES: Record<DurabilityGrade, string> = {
  pro: "border-success/40 bg-success/10 text-success",
  atelier: "border-accent/40 bg-accent-muted text-accent",
  edc: "border-border-strong bg-surface-elevated text-text-secondary",
  gadget: "border-danger/40 bg-danger/10 text-danger",
};

interface DurabilityBadgeProps {
  grade: DurabilityGrade;
  className?: string;
}

export function DurabilityBadge({ grade, className }: DurabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider",
        DURABILITY_STYLES[grade],
        className
      )}
    >
      <ShieldCheck className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      {DURABILITY_LABELS[grade]}
    </span>
  );
}

interface RatingInlineProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

export function RatingInline({
  rating,
  reviewCount,
  className,
}: RatingInlineProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs text-text-secondary",
        className
      )}
    >
      <Star
        className="h-3.5 w-3.5 fill-accent text-accent"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span className="font-mono tabular-nums text-text">
        {rating.toFixed(1)}
      </span>
      <span className="sr-only">sur 5,</span>
      <span>({reviewCount} avis)</span>
    </span>
  );
}
