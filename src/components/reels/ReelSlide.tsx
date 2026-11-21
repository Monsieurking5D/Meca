"use client";

import { Pause, Play } from "lucide-react";
import { getCategoryBySlug } from "@/data";
import type { Product, ReelItem } from "@/types";
import { cn } from "@/lib/utils";
import { ReelActions } from "./ReelActions";
import { ReelMedia } from "./ReelMedia";
import { ReelProductOverlay } from "./ReelProductOverlay";
import { formatReelDuration } from "./reel-params";

interface ReelSlideProps {
  reel: ReelItem;
  product?: Product;
  index: number;
  total: number;
  isActive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isPriority: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export function ReelSlide({
  reel,
  product,
  index,
  total,
  isActive,
  isPlaying,
  isMuted,
  isPriority,
  onTogglePlay,
  onToggleMute,
}: ReelSlideProps) {
  const category = getCategoryBySlug(reel.category);
  const hasAudio = reel.sourceType === "mp4" && Boolean(reel.videoUrl);
  const shouldPlay = isActive && isPlaying;
  const isPreview = !hasAudio;

  return (
    <section
      data-reel-id={reel.id}
      aria-roledescription="Reel"
      aria-label={`${index + 1} sur ${total} : ${reel.title}`}
      className="relative flex h-full w-full snap-start snap-always overflow-hidden items-center justify-center md:gap-4 md:py-3"
    >
      <div className="relative h-full w-full overflow-hidden bg-surface md:aspect-[9/16] md:w-auto md:rounded-2xl md:border md:border-border">
        <ReelMedia
          reel={reel}
          isActive={isActive}
          isPlaying={isPlaying}
          isMuted={isMuted}
          isPriority={isPriority}
        />

        {/* Tap anywhere on the media to play / pause. */}
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={shouldPlay ? "Mettre en pause (Espace)" : "Lire (Espace)"}
          className="absolute inset-0 z-0 cursor-pointer focus-visible:outline-none"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/70 to-transparent"
        />

        {isActive && !isPlaying ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-bg/60 text-text backdrop-blur-md">
              <Play className="ml-1 h-7 w-7 fill-current" strokeWidth={1.5} />
            </span>
          </div>
        ) : null}

        <header className="pointer-events-none absolute inset-x-0 top-0 p-3 pt-14 md:pt-3">
          <div className="h-0.5 overflow-hidden rounded-full bg-white/20">
            <div
              key={isActive ? "on" : "off"}
              className={cn(
                "h-full origin-left scale-x-0 rounded-full bg-accent",
                isActive && "animate-[reel-progress_linear_infinite]"
              )}
              style={{
                animationDuration: `${reel.durationSeconds}s`,
                animationPlayState: shouldPlay ? "running" : "paused",
              }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-text drop-shadow">
              {reel.creatorHandle}
            </span>
            <span className="flex items-center gap-1.5">
              {reel.isParody ? (
                <span className="rounded bg-danger/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text">
                  Parodie
                </span>
              ) : null}
              <span className="rounded border border-white/15 bg-bg/50 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur-md">
                {category?.shortName ?? reel.category}
              </span>
              <span className="flex items-center gap-1 rounded border border-white/15 bg-bg/50 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-text-secondary backdrop-blur-md">
                {shouldPlay ? (
                  <Play className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                ) : (
                  <Pause className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                )}
                {formatReelDuration(reel.durationSeconds)}
              </span>
            </span>
          </div>
        </header>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 space-y-3 p-3 pb-4">
          <div className="pr-16 md:pr-0">
            {isPreview ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Aperçu · démo complète sur la source
              </p>
            ) : null}
            <h2 className="mt-1 text-lg font-semibold leading-snug text-text drop-shadow">
              {reel.title}
            </h2>
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-text-secondary">
              {reel.hook}
            </p>
            <ul className="mt-2 space-y-0.5 [@media(max-height:720px)]:hidden">
              {reel.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-1.5 text-xs text-text-secondary"
                >
                  <span aria-hidden="true" className="text-accent">
                    ›
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          {product ? (
            <div className="pointer-events-auto">
              <ReelProductOverlay product={product} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile: overlays the full-width stage. Desktop: rail beside the stage. */}
      <div className="absolute bottom-24 right-3 z-10 md:static md:mb-6 md:self-end">
        <ReelActions
          reel={reel}
          product={product}
          hasAudio={hasAudio}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
        />
      </div>
    </section>
  );
}
