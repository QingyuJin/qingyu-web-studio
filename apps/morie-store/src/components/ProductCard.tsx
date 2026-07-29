"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const addItem = useCartStore((state) => state.addItem);
  const firstSize = product.sizes[0];

  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={`查看${product.name}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Image
          src={product.image}
          alt={`${product.name}情境商品圖`}
          fill
          priority
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-image product-image-primary"
          style={{ objectPosition: product.imagePosition }}
        />
        <Image
          src={product.hoverImage}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-image product-image-hover"
        />
      </Link>
      <div className="product-copy">
        <div>
          <p className="eyebrow">{product.category} · {product.aroma}</p>
          <Link href={`/products/${product.slug}`} className="mt-2 block font-display text-xl leading-tight sm:text-2xl">
            {product.name}
          </Link>
          <p className="mt-2 hidden max-w-xs text-sm leading-6 text-ink/65 sm:block">{product.summary}</p>
          <p className="mt-3 text-sm">{firstSize.label} · {formatPrice(firstSize.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => addItem(product, firstSize.label, firstSize.price)}
          className="quick-add"
          aria-label={`快速加入${product.name}`}
        >
          <Plus size={16} />
          <span>加入</span>
        </button>
      </div>
    </article>
  );
}
