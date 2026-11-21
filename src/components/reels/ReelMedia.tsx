"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ReelItem } from "@/types";
import { cn } from "@/lib/utils";

interface ReelMediaProps {
  reel: ReelItem;
  isActive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isPriority: boolean;
}

/**
 * Real `<video>` for `mp4` sources; animated poster preview otherwise
 * (Instagram/YouTube demos are linked out, never embedded: no third-party
 * iframes, no tracking, predictable performance).
 */
export function ReelMedia({
  reel,
  isActive,
  isPlaying,
  isMuted,
  isPriority,
}: ReelMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = reel.sourceType === "mp4" && Boolean(reel.videoUrl);
  const shouldPlay = isActive && isPlaying;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (shouldPlay) {
      // Autoplay can be refused by the browser policy; the poster stays
      // visible and the user can start playback with the play button.
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  if (hasVideo) {
    return (
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.posterUrl}
        muted={isMuted}
        loop
        playsInline
        preload={isActive ? "auto" : "metadata"}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={reel.title}
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-bg bg-workshop-grid">
      {/* Landscape posters: blurred cover backdrop + full poster contained on top. */}
      <Image
        src={reel.posterUrl}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 768px) 420px, 100vw"
        className="scale-125 object-cover opacity-40 blur-2xl"
      />
      <Image
        src={reel.posterUrl}
        alt={reel.title}
        fill
        priority={isPriority}
        sizes="(min-width: 768px) 420px, 100vw"
        className={cn(
          "object-contain will-change-transform motion-reduce:animate-none",
          isActive && "animate-[reel-kenburns_14s_ease-in-out_infinite_alternate]"
        )}
        style={{ animationPlayState: shouldPlay ? "running" : "paused" }}
      />
    </div>
  );
}
