"use client";
import { useCopy } from "@/i18n";
import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ChevronDown, Minus, Plus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { formatPrice, products, type Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export function ProductDetail({ product }: { product: Product }) {
  const t = useCopy();
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
        <div className="gallery-main"><Image src={product.image} alt={t("{0}商品情境", [product.name])} fill priority sizes="(max-width: 900px) 100vw, 57vw" className="object-cover" style={{ objectPosition: product.imagePosition }} /></div>
        <div className="gallery-pair"><div><Image src={product.hoverImage} alt={t("{0}植物與材質情境", [product.name])} fill sizes="(max-width: 900px) 50vw, 28vw" className="object-cover" /></div><div className="gallery-material"><span className="eyebrow">{t("MORIÉ FORMULA")}</span><strong>{t(product.aroma)}</strong><small>{t(product.texture)}</small></div></div>
      </div>
      <aside className="product-info">
        <div className="product-info-inner"><p className="eyebrow">{t(product.category)}{" "}{t(product.aroma)}</p>{product.badge && <p className="detail-badge">{t(product.badge)}</p>}<h1>{t(product.name)}</h1><p className="detail-summary">{t(product.summary)}</p><p className="detail-price">{t(formatPrice(selected.price))}</p>
          <fieldset className="size-selector"><legend>{t("選擇容量")}</legend><div>{product.sizes.map((size, index) => <button key={size.label} type="button" onClick={() => setSizeIndex(index)} className={sizeIndex === index ? "selected" : ""}>{t(size.label)}<span>{t(formatPrice(size.price))}</span></button>)}</div></fieldset>
          <div className="buy-row"><div className="quantity-stepper detail-quantity"><button type="button" aria-label={t("減少數量")} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={14} /></button><span>{t(quantity)}</span><button type="button" aria-label={t("增加數量")} onClick={() => setQuantity((value) => value + 1)}><Plus size={14} /></button></div><button type="button" className="button-solid" onClick={add}>{t("加入購物袋")}<ShoppingBag size={16} /></button></div>
          <dl className="detail-specs"><div><dt>{t("香氣")}</dt><dd>{t(product.aroma)}{t("調，層次安靜而悠長")}</dd></div><div><dt>{t("質地")}</dt><dd>{t(product.texture)}</dd></div><div><dt>{t("適用膚質")}</dt><dd>{t(product.skinType)}</dd></div><div><dt>{t("使用方式")}</dt><dd>{t(product.usage)}</dd></div></dl>
          {[{ key: "ingredients", label: "主要成分", content: product.ingredients }, { key: "caution", label: "注意事項", content: product.caution }, { key: "delivery", label: "配送與退換", content: "台灣本島約 2—3 個工作日送達。未拆封商品可於到貨後七日內聯繫退換。" }].map((item) => <div className="detail-accordion" key={item.key}><button type="button" onClick={() => setOpenAccordion(openAccordion === item.key ? null : item.key)} aria-expanded={openAccordion === item.key}><span>{t(item.label)}</span><ChevronDown size={16} className={openAccordion === item.key ? "rotate-180" : ""} /></button>{openAccordion === item.key && <p>{t(item.content)}</p>}</div>)}
          <p className="consult-note">{t("仍在選擇？")}<Link href="/stores">{t("預約門市配方諮詢")}</Link></p>
        </div>
      </aside>
    </div>
    <section className="detail-story"><div><p className="eyebrow">{t("配方筆記")}</p><h2>{t(product.description)}</h2></div><p>{t("每一批植物萃取會因產季而呈現細微色澤與氣味差異。這些差異不是瑕疵，而是原料真實的時間記號。")}</p></section>
    <section className="related-products"><div className="section-shell"><div className="section-heading-row"><div><p className="eyebrow">{t("一同使用")}</p><h2 className="section-title mt-3">{t("完成這段日常儀式")}</h2></div><Link href="/products" className="text-link">{t("探索全系列")}</Link></div><div className="catalog-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div></div></section>
    <div className="mobile-buy-bar"><div><strong>{t(product.name)}</strong><span>{t(selected.label)}{" "}{t(formatPrice(selected.price))}</span></div><button type="button" onClick={add}>{t("加入購物袋")}</button></div>
  </>;
}
