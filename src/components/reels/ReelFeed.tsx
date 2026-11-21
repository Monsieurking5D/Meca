"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, Clapperboard } from "lucide-react";
import { CATEGORIES, getProductBySlug, getReelsByCategory, REELS } from "@/data";
import type { CategorySlug } from "@/types";
import { EmptyState } from "@/components/ui";
import { ReelCategoryFilter } from "./ReelCategoryFilter";
import { ReelSlide } from "./ReelSlide";
import { buildReelQuery, parseReelCategory, REEL_PARAM } from "./reel-params";

/** A slide counts as "active" once this share of it is on screen. */
const ACTIVE_VISIBILITY_RATIO = 0.6;

const REEL_KEYFRAMES = `
@keyframes reel-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes reel-kenburns { from { transform: scale(1); } to { transform: scale(1.08) translate3d(-1.5%, -1%, 0); } }
`;

const CATEGORY_COUNTS = Object.fromEntries([
  ["all", REELS.length],
  ...CATEGORIES.map((c) => [c.slug, getReelsByCategory(c.slug).length]),
]) as Record<CategorySlug | "all", number>;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ReelFeed() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const category = parseReelCategory(searchParams);
  const reels = useMemo(() => getReelsByCategory(category), [category]);

  const [activeId, setActiveId] = useState<string | null>(() => {
    const requested = searchParams.get(REEL_PARAM.reel);
    return reels.some((reel) => reel.id === requested) ? requested : null;
  });
  const initialIdRef = useRef(activeId);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const isPageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true
  );

  // Derived: an id missing from the current filter falls back to the first reel.
  const foundIndex = reels.findIndex((reel) => reel.id === activeId);
  const activeIndex = foundIndex === -1 ? 0 : foundIndex;
  const isPlaying = !isPaused && isPageVisible;

  // Scroll the feed container only: scrollIntoView would also scroll the window.
  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    const slide = container?.querySelectorAll<HTMLElement>("[data-reel-id]")[index];
    if (!container || !slide) {
      return;
    }
    container.scrollTo({
      top: slide.offsetTop,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  // Deep link (?reel=): jump to the requested slide once, without animation.
  useEffect(() => {
    const id = initialIdRef.current;
    if (!id) {
      return;
    }
    const container = containerRef.current;
    const slide = container?.querySelector<HTMLElement>(
      `[data-reel-id="${CSS.escape(id)}"]`
    );
    if (container && slide) {
      container.scrollTop = slide.offsetTop;
    }
  }, []);

  // Track which slide is on screen.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= ACTIVE_VISIBILITY_RATIO &&
            entry.target instanceof HTMLElement
          ) {
            setActiveId(entry.target.dataset.reelId ?? null);
          }
        }
      },
      { root: container, threshold: [ACTIVE_VISIBILITY_RATIO] }
    );
    container
      .querySelectorAll("[data-reel-id]")
      .forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [reels]);

  // Keep ?reel= in sync for sharing, without a navigation.
  const activeReelId = reels[activeIndex]?.id ?? null;
  useEffect(() => {
    const reelParam = activeIndex === 0 ? null : activeReelId;
    const query = buildReelQuery(category, reelParam);
    if (query !== window.location.search.replace(/^\?/, "")) {
      window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
    }
  }, [activeIndex, activeReelId, category, pathname]);

  // Keyboard: ↑/↓ (or K/J) navigate, Space toggles play, M toggles sound.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isTypingTarget(event.target) ||
        document.querySelector("dialog[open]")
      ) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === "arrowdown" || key === "j") {
        event.preventDefault();
        scrollToIndex(Math.min(reels.length - 1, activeIndex + 1));
      } else if (key === "arrowup" || key === "k") {
        event.preventDefault();
        scrollToIndex(Math.max(0, activeIndex - 1));
      } else if (key === " " && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault();
        setIsPaused((paused) => !paused);
      } else if (key === "m") {
        setIsMuted((muted) => !muted);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, reels.length, scrollToIndex]);

  const handleCategoryChange = (next: CategorySlug | "all") => {
    if (next === category) {
      return;
    }
    // No setActiveId here: a re-render before the navigation commits would let
    // the URL-sync effect overwrite the new ?cat= with the stale category.
    // The active index falls back to 0 when the id is not in the new list.
    const query = buildReelQuery(next, null);
    containerRef.current?.scrollTo({ top: 0 });
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="relative mx-auto h-[calc(100dvh-8rem)] w-full max-w-5xl md:flex md:h-[calc(100dvh-4rem)] md:flex-col">
      <style>{REEL_KEYFRAMES}</style>

      {/* Mobile: floats over the video. Desktop: sits above the stage. */}
      <div className="absolute inset-x-0 top-0 z-20 pt-1 md:static md:flex md:justify-center md:pt-2">
        <ReelCategoryFilter
          value={category}
          counts={CATEGORY_COUNTS}
          onChange={handleCategoryChange}
        />
      </div>

      {reels.length === 0 ? (
        <div className="flex h-full items-center justify-center px-4 md:min-h-0 md:flex-1">
          <EmptyState
            icon={Clapperboard}
            title="Aucun Reel dans ce rayon"
            description="Revenez bientôt ou explorez un autre rayon."
          />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative h-full snap-y snap-mandatory md:min-h-0 md:flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reels.map((reel, index) => (
            <ReelSlide
              key={reel.id}
              reel={reel}
              product={getProductBySlug(reel.productSlug)}
              index={index}
              total={reels.length}
              isActive={index === activeIndex}
              isPlaying={isPlaying}
              isMuted={isMuted}
              isPriority={index === 0}
              onTogglePlay={() => setIsPaused((paused) => !paused)}
              onToggleMute={() => setIsMuted((muted) => !muted)}
            />
          ))}
        </div>
      )}

      {reels.length > 1 ? (
        <div className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Reel précédent (↑)"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text disabled:opacity-30"
          >
            <ChevronUp className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <span className="text-center font-mono text-xs tabular-nums text-text-muted">
            {activeIndex + 1}/{reels.length}
          </span>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(reels.length - 1, activeIndex + 1))}
            disabled={activeIndex === reels.length - 1}
            aria-label="Reel suivant (↓)"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors hover:border-border-strong hover:text-text disabled:opacity-30"
          >
            <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
