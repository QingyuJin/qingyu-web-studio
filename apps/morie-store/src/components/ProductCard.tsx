"use client";
import { useCopy } from "@/i18n";
import Image from "next/image";
import Link from "@/components/LocaleLink";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const t = useCopy();
  const addItem = useCartStore((state) => state.addItem);
  const firstSize = product.sizes[0];

  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={t("查看{0}", [product.name])}>
        {product.badge && <span className="product-badge">{t(product.badge)}</span>}
        <Image
          src={product.image}
          alt={t("{0}情境商品圖", [product.name])}
          fill
          priority={priority}
          sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 33vw, 25vw"
          className="product-image product-image-primary"
          style={{ objectPosition: product.imagePosition }}
        />
        <Image
          src={product.hoverImage}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 33vw, 25vw"
          className="product-image product-image-hover"
        />
      </Link>
      <div className="product-copy">
        <div>
          <p className="eyebrow">{t(product.category)}{" "}{t(product.aroma)}</p>
          <Link href={`/products/${product.slug}`} className="mt-2 block font-display text-xl leading-tight sm:text-2xl">
            {t(product.name)}
          </Link>
          <p className="mt-2 hidden max-w-xs text-sm leading-6 text-ink/65 sm:block">{t(product.summary)}</p>
          <p className="mt-3 text-sm">{t(firstSize.label)}{" "}{t(formatPrice(firstSize.price))}</p>
        </div>
        <button
          type="button"
          onClick={() => addItem(product, firstSize.label, firstSize.price)}
          className="quick-add"
          aria-label={t("快速加入{0}", [product.name])}
        >
          <Plus size={16} />
          <span>{t("加入")}</span>
        </button>
      </div>
    </article>
  );
}
