"use client";

import type { ReactNode } from "react";
import {
  Bookmark,
  ExternalLink,
  Heart,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useToast } from "@/components/ui";
import { useFavorites } from "@/store";
import type { Product, ReelItem } from "@/types";
import { cn, formatCompactCount } from "@/lib/utils";
import { REEL_PARAM } from "./reel-params";

interface RailButtonProps {
  label: string;
  caption?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  href?: string;
  children: ReactNode;
}

const RAIL_ICON_CLASS =
  "flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-[transform,background-color,border-color,color] active:scale-90 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent";

function RailButton({
  label,
  caption,
  isActive = false,
  isDisabled = false,
  onClick,
  href,
  children,
}: RailButtonProps) {
  const icon = (
    <span
      className={cn(
        RAIL_ICON_CLASS,
        isActive
          ? "border-accent/60 bg-accent text-bg"
          : "border-white/15 bg-bg/50 text-text hover:border-white/30 hover:bg-bg/70",
        isDisabled && "opacity-40"
      )}
    >
      {children}
    </span>
  );
  const captionNode = caption ? (
    <span className="font-mono text-[11px] tabular-nums text-text drop-shadow [@media(max-height:760px)]:hidden">
      {caption}
    </span>
  ) : null;
  const className =
    "group flex flex-col items-center gap-1 focus-visible:outline-none disabled:cursor-not-allowed";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
      >
        {icon}
        {captionNode}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
      aria-pressed={onClick && !isDisabled ? isActive : undefined}
      className={className}
    >
      {icon}
      {captionNode}
    </button>
  );
}

interface ReelActionsProps {
  reel: ReelItem;
  product?: Product;
  hasAudio: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

const SOURCE_LABELS: Record<ReelItem["sourceType"], string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  mp4: "source",
  preview: "source",
};

export function ReelActions({
  reel,
  product,
  hasAudio,
  isMuted,
  onToggleMute,
}: ReelActionsProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { push } = useToast();
  const isSaved = product ? isFavorite(product.id) : false;

  const handleShare = async () => {
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set(REEL_PARAM.reel, reel.id);
    const shareData = { title: reel.title, text: reel.hook, url: url.toString() };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      push({ title: "Lien copié", description: reel.title, tone: "success" });
    } catch (error: unknown) {
      // The user closing the native share sheet is not an error.
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      push({
        title: "Partage impossible",
        description: "Copiez l'adresse depuis la barre du navigateur.",
        tone: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 [@media(max-height:760px)]:gap-2.5">
      <RailButton
        label={`${formatCompactCount(reel.likesCount)} mentions J'aime sur la source`}
        caption={formatCompactCount(reel.likesCount)}
        href={reel.externalUrl}
      >
        <Heart className="h-5 w-5" strokeWidth={1.75} />
      </RailButton>
      {product ? (
        <RailButton
          label={
            isSaved
              ? `Retirer ${product.name} des favoris`
              : `Ajouter ${product.name} aux favoris`
          }
          caption={isSaved ? "Gardé" : "Garder"}
          isActive={isSaved}
          onClick={() => toggleFavorite(product.id)}
        >
          <Bookmark
            className={cn("h-5 w-5", isSaved && "fill-current")}
            strokeWidth={1.75}
          />
        </RailButton>
      ) : null}
      <RailButton label="Partager ce Reel" caption="Partager" onClick={handleShare}>
        <Share2 className="h-5 w-5" strokeWidth={1.75} />
      </RailButton>
      <RailButton
        label={
          hasAudio
            ? isMuted
              ? "Activer le son (M)"
              : "Couper le son (M)"
            : "Aperçu sans son — son disponible sur la source"
        }
        caption={hasAudio ? (isMuted ? "Muet" : "Son") : "Muet"}
        isActive={hasAudio && !isMuted}
        isDisabled={!hasAudio}
        onClick={onToggleMute}
      >
        {hasAudio && !isMuted ? (
          <Volume2 className="h-5 w-5" strokeWidth={1.75} />
        ) : (
          <VolumeX className="h-5 w-5" strokeWidth={1.75} />
        )}
      </RailButton>
      <RailButton
        label={`Voir la démo complète sur ${SOURCE_LABELS[reel.sourceType]}`}
        caption="Source"
        href={reel.externalUrl}
      >
        <ExternalLink className="h-5 w-5" strokeWidth={1.75} />
      </RailButton>
    </div>
  );
}
