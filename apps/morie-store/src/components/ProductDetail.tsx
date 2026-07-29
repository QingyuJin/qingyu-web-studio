"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Minus, Plus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { formatPrice, products, type Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export function ProductDetail({ product }: { product: Product }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("ingredients");
  const addItem = useCartStore((state) => state.addItem);
  const selected = product.sizes[sizeIndex];
  const related = useMemo(() => products.filter((item) => item.slug !== product.slug && (item.category === product.category || item.aroma === product.aroma)).slice(0, 4), [product]);

  function add() { addItem(product, selected.label, selected.price, quantity); }

  return <>
    <div className="product-detail">
      <div className="product-gallery">
        <div className="gallery-main"><Image src={product.image} alt={`${product.name}商品情境`} fill priority sizes="(max-width: 900px) 100vw, 57vw" className="object-cover" style={{ objectPosition: product.imagePosition }} /></div>
        <div className="gallery-pair"><div><Image src={product.hoverImage} alt={`${product.name}植物與材質情境`} fill sizes="(max-width: 900px) 50vw, 28vw" className="object-cover" /></div><div className="gallery-material"><span className="eyebrow">MORIÉ FORMULA</span><strong>{product.aroma}</strong><small>{product.texture}</small></div></div>
      </div>
      <aside className="product-info">
        <div className="product-info-inner"><p className="eyebrow">{product.category} · {product.aroma}</p>{product.badge && <p className="detail-badge">{product.badge}</p>}<h1>{product.name}</h1><p className="english-name">{product.englishName}</p><p className="detail-summary">{product.summary}</p><p className="detail-price">{formatPrice(selected.price)}</p>
          <fieldset className="size-selector"><legend>選擇容量</legend><div>{product.sizes.map((size, index) => <button key={size.label} type="button" onClick={() => setSizeIndex(index)} className={sizeIndex === index ? "selected" : ""}>{size.label}<span>{formatPrice(size.price)}</span></button>)}</div></fieldset>
          <div className="buy-row"><div className="quantity-stepper detail-quantity"><button type="button" aria-label="減少數量" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={14} /></button><span>{quantity}</span><button type="button" aria-label="增加數量" onClick={() => setQuantity((value) => value + 1)}><Plus size={14} /></button></div><button type="button" className="button-solid" onClick={add}>加入購物袋 <ShoppingBag size={16} /></button></div>
          <dl className="detail-specs"><div><dt>香氣</dt><dd>{product.aroma}調，層次安靜而悠長</dd></div><div><dt>質地</dt><dd>{product.texture}</dd></div><div><dt>適用膚質</dt><dd>{product.skinType}</dd></div><div><dt>使用方式</dt><dd>{product.usage}</dd></div></dl>
          {[{ key: "ingredients", label: "主要成分", content: product.ingredients }, { key: "caution", label: "注意事項", content: product.caution }, { key: "delivery", label: "配送與退換", content: "台灣本島約 2—3 個工作日送達。未拆封商品可於到貨後七日內聯繫退換。" }].map((item) => <div className="detail-accordion" key={item.key}><button type="button" onClick={() => setOpenAccordion(openAccordion === item.key ? null : item.key)} aria-expanded={openAccordion === item.key}><span>{item.label}</span><ChevronDown size={16} className={openAccordion === item.key ? "rotate-180" : ""} /></button>{openAccordion === item.key && <p>{item.content}</p>}</div>)}
          <p className="consult-note">仍在選擇？<Link href="/stores">預約門市配方諮詢</Link></p>
        </div>
      </aside>
    </div>
    <section className="detail-story"><div><p className="eyebrow">配方筆記</p><h2>{product.description}</h2></div><p>每一批植物萃取會因產季而呈現細微色澤與氣味差異。這些差異不是瑕疵，而是原料真實的時間記號。</p></section>
    <section className="related-products"><div className="section-shell"><div className="section-heading-row"><div><p className="eyebrow">一同使用</p><h2 className="section-title mt-3">完成這段日常儀式</h2></div><Link href="/products" className="text-link">探索全系列</Link></div><div className="catalog-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div></div></section>
    <div className="mobile-buy-bar"><div><strong>{product.name}</strong><span>{selected.label} · {formatPrice(selected.price)}</span></div><button type="button" onClick={add}>加入購物袋</button></div>
  </>;
}
