import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

const PRIORITY_COUNT = 4;

interface ProductGridProps {
  products: readonly Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} isPriority={index < PRIORITY_COUNT} />
        </li>
      ))}
    </ul>
  );
}
