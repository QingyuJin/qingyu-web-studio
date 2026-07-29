"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronRight, MapPin, Menu, Minus, Plus, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { brand, navigation } from "@/data/brand";
import { formatPrice, products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { Newsletter } from "./Newsletter";

const megaGroups = [
  { title: "依照日常", links: ["晨間潔淨", "夜間修護", "身體儀式", "空間香氣"] },
  { title: "依照膚況", links: ["乾燥與缺水", "敏感與脆弱", "混合與不穩定", "所有膚質"] },
  { title: "本月選讀", links: ["水溫，也是一種照料", "雨後植物的氣味地圖", "為緩慢時刻留一個房間"] },
];

function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, hydrated } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remaining = Math.max(brand.shippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / brand.shippingThreshold) * 100, 100);

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", isOpen);
    return () => document.body.classList.remove("lock-scroll");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button className="drawer-backdrop" aria-label="關閉購物袋" onClick={closeCart} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="購物袋" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <header className="drawer-header">
              <div><p className="eyebrow">你的選擇</p><h2 className="font-display text-3xl">購物袋</h2></div>
              <button type="button" onClick={closeCart} aria-label="關閉購物袋"><X size={22} /></button>
            </header>
            <div className="shipping-meter">
              <p>{remaining > 0 ? `再添 ${formatPrice(remaining)} 即享免運` : "已達免運門檻"}</p>
              <div><span style={{ width: `${progress}%` }} /></div>
            </div>
            <div className="cart-items">
              {!hydrated ? <p className="empty-note">正在整理你的選擇…</p> : items.length === 0 ? (
                <div className="empty-cart"><ShoppingBag size={30} strokeWidth={1} /><p className="font-display text-2xl">購物袋仍是一片留白</p><p>從一款日常配方開始。</p><Link href="/products" onClick={closeCart} className="text-link">探索全系列</Link></div>
              ) : items.map((item) => (
                <div key={item.key} className="cart-row">
                  <Link href={`/products/${item.slug}`} onClick={closeCart} className="cart-thumb"><Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" /></Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3"><div><Link href={`/products/${item.slug}`} onClick={closeCart} className="font-display text-lg">{item.name}</Link><p className="mt-1 text-xs text-ink/60">{item.size}</p></div><button type="button" onClick={() => removeItem(item.key)} className="text-xs underline-offset-4 hover:underline">移除</button></div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="quantity-stepper"><button type="button" aria-label="減少數量" onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button type="button" aria-label="增加數量" onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={13} /></button></div>
                      <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && <footer className="cart-footer"><div className="flex justify-between font-medium"><span>小計</span><span>{formatPrice(subtotal)}</span></div><p className="mt-2 text-xs text-ink/55">運費將於下一步依配送方式計算。</p><Link href="/checkout" onClick={closeCart} className="button-solid mt-5">前往模擬結帳 <ChevronRight size={16} /></Link></footer>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return products.filter((product) => [product.name, product.englishName, product.category, product.aroma, product.summary].join(" ").toLowerCase().includes(normalized));
  }, [query]);

  return (
    <AnimatePresence>
      {open && <motion.div className="search-overlay" role="dialog" aria-modal="true" aria-label="搜尋產品" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="search-top"><Link href="/" onClick={onClose} className="wordmark">{brand.name}</Link><button type="button" onClick={onClose} aria-label="關閉搜尋"><X size={24} /></button></div>
        <div className="search-inner">
          <label htmlFor="site-search" className="eyebrow">我想尋找</label>
          <div className="search-field"><Search size={23} strokeWidth={1.4} /><input id="site-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="輸入配方、香氣或膚質" /><button type="button" onClick={() => setQuery("")} className={query ? "visible" : "invisible"}>清除</button></div>
          {!query ? <div className="search-suggestions"><div><p className="eyebrow">熱門搜尋</p>{["夜間修護", "木質香氣", "乾性肌膚", "旅行組"].map((term) => <button key={term} type="button" onClick={() => setQuery(term)}>{term}</button>)}</div><div><p className="eyebrow">推薦分類</p>{navigation.slice(1, 5).map((item) => <Link key={item.label} href={item.href} onClick={onClose}>{item.label}<ChevronRight size={15} /></Link>)}</div></div> : <div className="search-results"><p className="eyebrow">{results.length ? `${results.length} 項結果` : "沒有相符結果"}</p>{results.length ? <div className="search-grid">{results.slice(0, 6).map((product) => <Link key={product.slug} href={`/products/${product.slug}`} onClick={onClose} className="search-result"><span className="relative aspect-square overflow-hidden bg-paper"><Image src={product.image} alt="" fill sizes="160px" className="object-cover" style={{ objectPosition: product.imagePosition }} /></span><span><strong>{product.name}</strong><small>{product.category} · {formatPrice(product.price)}</small></span></Link>)}</div> : <p className="mt-8 text-ink/60">試試「草本」、「保濕」或「香氛」。</p>}</div>}
        </div>
      </motion.div>}
    </AnimatePresence>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(true);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const total = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 48);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <>
      <div className="announcement"><span>全台配送滿 NT$2,200 免運</span><Link href="/stores">預約門市香氣諮詢</Link></div>
      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="header-main">
          <button type="button" className="mobile-only" onClick={() => setMobileOpen(true)} aria-label="開啟選單"><Menu size={22} /></button>
          <nav className="header-nav desktop-only" aria-label="主要導覽">
            <button type="button" onClick={() => setMegaOpen((value) => !value)} aria-expanded={megaOpen}>選購 <ChevronDown size={13} /></button>
            <Link href="/story">關於 MORIÉ</Link><Link href="/journal">閱讀</Link>
          </nav>
          <Link href="/" className="wordmark">{brand.name}</Link>
          <nav className="header-actions" aria-label="工具導覽">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="搜尋"><Search size={19} /></button>
            <Link href="/account" aria-label="帳戶" className="desktop-icon"><UserRound size={19} /></Link>
            <Link href="/stores" aria-label="門市" className="desktop-icon"><MapPin size={19} /></Link>
            <button type="button" onClick={openCart} aria-label={`購物袋，共 ${total} 件商品`} className="bag-button"><ShoppingBag size={19} /><span>{total}</span></button>
          </nav>
        </div>
        <nav className="category-nav desktop-only" aria-label="商品分類">
          {navigation.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
        </nav>
        <AnimatePresence>{megaOpen && <motion.div className="mega-menu desktop-only" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {megaGroups.map((group, index) => <div key={group.title}><p className="eyebrow">{group.title}</p>{group.links.map((label, linkIndex) => <Link key={label} href={index === 2 ? `/journal/${["the-temperature-of-water", "botanicals-after-rain", "a-room-for-slower-hours"][linkIndex]}` : `/products?search=${encodeURIComponent(label)}`}>{label}</Link>)}</div>)}
          <Link href="/products/nocturne-repair-serum" className="mega-feature"><span className="relative block h-full min-h-48 overflow-hidden"><Image src="/images/morie-collection.png" alt="夜間修護精華" fill sizes="28vw" className="object-cover" /></span><span><small>夜間儀式</small><strong>在夜色裡，讓肌膚慢慢回來</strong></span></Link>
        </motion.div>}</AnimatePresence>
      </header>
      <AnimatePresence>{mobileOpen && <><motion.button className="drawer-backdrop" aria-label="關閉選單" onClick={() => setMobileOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="mobile-menu" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.4 }}><div className="mobile-menu-head"><span className="wordmark">{brand.name}</span><button type="button" onClick={() => setMobileOpen(false)} aria-label="關閉選單"><X size={22} /></button></div><button type="button" className="mobile-menu-toggle" onClick={() => setMobileProducts((value) => !value)}>選購 <ChevronDown size={16} className={mobileProducts ? "rotate-180" : ""} /></button>{mobileProducts && <nav className="mobile-categories">{navigation.map((item) => <Link key={item.label} href={item.href}>{item.label}<ChevronRight size={16} /></Link>)}</nav>}<nav className="mobile-secondary"><Link href="/story">品牌故事</Link><Link href="/journal">閱讀文章</Link><Link href="/stores">門市</Link><Link href="/account">我的帳戶</Link></nav><div className="mobile-note"><p>{brand.tagline}</p><small>週一至週五 10:00—18:00</small></div></motion.aside></>}</AnimatePresence>
      <SearchOverlay key={searchOpen ? "search-open" : "search-closed"} open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="footer-news"><div><p className="eyebrow text-paper/60">山林來信</p><h2>接收配方、植物與空間的緩慢消息。</h2></div><Newsletter inverse /></div><div className="footer-grid"><div><p className="footer-heading">訂單與協助</p><Link href="/checkout">配送與結帳</Link><Link href="/account">訂單查詢</Link><a href={`mailto:${brand.contact.email}`}>聯絡我們</a><Link href="/stores">門市諮詢</Link></div><div><p className="footer-heading">探索 MORIÉ</p><Link href="/story">品牌故事</Link><Link href="/journal">閱讀文章</Link><Link href="/products?category=禮盒">禮盒與贈禮</Link><Link href="/stores">台灣門市</Link></div><div><p className="footer-heading">理念</p><p className="footer-copy">不以「天然」作為簡化的承諾。我們揭露配方思考、原料來源與包材選擇，讓每一次購買更清楚。</p><Link href="/story#sustainability">永續承諾</Link></div><div><p className="footer-heading">聯絡</p><a href={`tel:${brand.contact.phone.replace(/\s/g, "")}`}>{brand.contact.phone}</a><a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a><p className="footer-copy mt-6">台灣 · NT$ · 繁體中文</p></div></div><div className="footer-bottom"><span>© 2026 {brand.legalName}</span><span>僅供品牌設計提案與電商流程展示</span></div></footer>;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  return <><Header key={pathname} /><motion.main initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{children}</motion.main><Footer /></>;
}
