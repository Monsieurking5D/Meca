import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  ChevronLeft,
  CircleCheck,
  CircleMinus,
  Lightbulb,
  PlayCircle,
  TriangleAlert,
} from "lucide-react";
import {
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
  PRODUCTS,
} from "@/data";
import { CartTrigger } from "@/components/shop/CartTrigger";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { DurabilityBadge, RatingInline } from "@/components/shop/ProductMeta";
import { ProductPurchasePanel } from "@/components/shop/ProductPurchasePanel";
import { formatPriceEur, formatPriceRangeEur } from "@/lib/utils";

const RELATED_LIMIT = 4;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Produit introuvable" };
  }
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.media.thumbnailUrl, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const related = getProductsByCategory(product.category)
    .filter((candidate) => candidate.id !== product.id)
    .slice(0, RELATED_LIMIT);
  const gallery =
    product.media.galleryUrls.length > 0
      ? product.media.galleryUrls
      : [product.media.thumbnailUrl];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center justify-between gap-4"
      >
        <Link
          href={`/shop?cat=${product.category}`}
          className="inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent"
        >
          <ChevronLeft
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {category?.name ?? "Boutique"}
        </Link>
        <CartTrigger />
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery name={product.name} images={gallery} />

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-border-strong bg-surface px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
              {product.brand}
            </span>
            <DurabilityBadge grade={product.durability} />
            {product.isNew ? (
              <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-bg">
                Nouveau
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            {product.tagline}
          </p>
          <RatingInline
            rating={product.rating}
            reviewCount={product.reviewCount}
            className="mt-4"
          />

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-3xl font-semibold tabular-nums text-accent">
              {formatPriceEur(product.priceEur)}
            </span>
            <span className="text-xs text-text-muted">
              Revendeurs :{" "}
              {formatPriceRangeEur(
                product.priceRangeEur.min,
                product.priceRangeEur.max
              )}
            </span>
          </div>
          {!product.inStock ? (
            <p className="mt-2 text-sm text-danger">Rupture de stock</p>
          ) : null}

          <div className="mt-6">
            <ProductPurchasePanel product={product} />
          </div>

          <section
            aria-label="Problème et solution"
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-danger">
                <TriangleAlert
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Le problème
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text">
                {product.problemSolved}
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent-muted p-4">
              <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                <Lightbulb
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                L&apos;astuce
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text">
                {product.theTwist}
              </p>
            </div>
          </section>

          <a
            href={product.media.externalDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 self-start text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            <PlayCircle
              className="h-4 w-4"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            Voir la démo vidéo
            <ArrowUpRight
              className="h-3.5 w-3.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-[1.2fr_1fr]">
        <section aria-labelledby="product-description">
          <h2
            id="product-description"
            className="text-lg font-semibold text-text"
          >
            En détail
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {product.description}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-success">
                Points forts
              </h3>
              <ul className="mt-3 space-y-2">
                {product.pros.map((pro) => (
                  <li key={pro} className="flex gap-2 text-sm text-text">
                    <CircleCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">
                Limites
              </h3>
              <ul className="mt-3 space-y-2">
                {product.cons.map((con) => (
                  <li
                    key={con}
                    className="flex gap-2 text-sm text-text-secondary"
                  >
                    <CircleMinus
                      className="mt-0.5 h-4 w-4 shrink-0 text-text-muted"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section aria-labelledby="product-specs">
            <h2 id="product-specs" className="text-lg font-semibold text-text">
              Fiche technique
            </h2>
            <dl className="mt-3 divide-y divide-border rounded-xl border border-border bg-surface">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between gap-4 px-4 py-3 text-sm"
                >
                  <dt className="text-text-secondary">{spec.label}</dt>
                  <dd className="text-right font-medium text-text">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section
            aria-label="Robustesse"
            className="rounded-xl border border-border bg-surface-elevated p-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text">
                Robustesse
              </span>
              <DurabilityBadge grade={product.durability} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {product.durabilityNote}
            </p>
          </section>
        </aside>
      </div>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-products"
          className="mt-14 border-t border-border pt-10"
        >
          <h2
            id="related-products"
            className="text-lg font-semibold text-text"
          >
            Dans le même rayon
          </h2>
          <div className="mt-5">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
