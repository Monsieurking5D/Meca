"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, ShoppingBag, Trash2 } from "lucide-react";
import { useFavorites } from "@/store";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Button, EmptyState, Modal, useToast } from "@/components/ui";

export function FavoritesList() {
  const { favoriteProducts, count, clearFavorites } = useFavorites();
  const { push } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClear = () => {
    clearFavorites();
    setIsConfirmOpen(false);
    push({
      title: "Favoris vidés",
      description: "La sélection enregistrée sur cet appareil a été effacée.",
      tone: "success",
    });
  };

  if (count === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="Votre sélection est vide"
        description="Touchez le marque-page sur une fiche produit : la sélection reste sur cet appareil, sans compte à créer."
        action={
          <Link
            href="/shop"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            Parcourir la boutique
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
        <p className="text-sm text-text-secondary">
          <span className="font-mono tabular-nums text-text">{count}</span>{" "}
          {count > 1 ? "outils enregistrés" : "outil enregistré"} sur cet
          appareil.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsConfirmOpen(true)}
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
          Vider la sélection
        </Button>
      </div>

      <ProductGrid products={favoriteProducts} />

      <Modal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Vider vos favoris ?"
        description="Cette action efface la sélection stockée localement sur cet appareil."
        size="sm"
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsConfirmOpen(false)}
            >
              Annuler
            </Button>
            <Button variant="danger" size="sm" onClick={handleClear}>
              Vider
            </Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          Vous pourrez enregistrer de nouveaux outils à tout moment depuis la
          boutique ou une fiche produit.
        </p>
      </Modal>
    </div>
  );
}
