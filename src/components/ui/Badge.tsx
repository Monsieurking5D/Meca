import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeTone = "accent" | "neutral" | "success" | "danger" | "muted";
export type BadgeSize = "sm" | "md";

const TONES: Record<BadgeTone, string> = {
  accent: "border-accent/40 bg-accent-muted text-accent",
  neutral: "border-border-strong bg-surface-elevated text-text-secondary",
  success: "border-success/40 bg-success/10 text-success",
  danger: "border-danger/40 bg-danger/10 text-danger",
  muted: "border-border bg-bg text-text-muted",
};

const SIZES: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-1 text-[11px]",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
}

export function Badge({
  tone = "neutral",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border font-mono font-medium uppercase tracking-wider",
        TONES[tone],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
