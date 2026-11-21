"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  name: string;
  images: readonly string[];
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-bg bg-workshop-grid">
        <Image
          src={active}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <ul className="flex gap-2" aria-label="Autres vues">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Vue ${index + 1} sur ${images.length}`}
                aria-current={index === activeIndex}
                className={cn(
                  "relative block h-16 w-16 overflow-hidden rounded-lg border bg-bg transition-colors",
                  index === activeIndex
                    ? "border-accent"
                    : "border-border hover:border-border-strong"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
