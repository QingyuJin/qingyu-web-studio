import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Gift, Leaf, MessageCircleMore, Truck } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";
import { ProductCard } from "@/components/ProductCard";
import { articles } from "@/data/articles";
import { products } from "@/data/products";

const categories = [
  { number: "01", title: "肌膚保養", description: "潔淨、調理與滋養，配合肌膚每日不同的節奏。", href: "/products?category=肌膚保養", color: "rgba(141,93,54,.12)" },
  { number: "02", title: "身體", description: "從掌心到肩頸，讓照料延伸到每一寸日常。", href: "/products?category=身體", color: "rgba(96,99,75,.15)" },
  { number: "03", title: "香氛", description: "木質、草本與微光花香，描繪貼近皮膚的風景。", href: "/products?category=香氛", color: "rgba(88,72,56,.13)" },
  { number: "04", title: "居家", description: "為空間留下清醒、安定與沉默的餘韻。", href: "/products?category=居家", color: "rgba(70,74,61,.13)" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <MotionReveal><p className="eyebrow">MORIÉ · Taiwan botanical care</p></MotionReveal>
            <MotionReveal delay={0.08}><h1 className="editorial-title">讓日常，<br />循著植物<br />慢下來。</h1></MotionReveal>
            <MotionReveal delay={0.16}><p className="hero-description">以島嶼山林的濕度、木質與微光為靈感，調製不喧嘩的肌膚與感官配方。</p></MotionReveal>
            <MotionReveal delay={0.24} className="hero-actions"><Link href="/products" className="button-solid">探索全系列 <ArrowRight size={16} /></Link><Link href="/story" className="text-link">閱讀品牌故事</Link></MotionReveal>
          </div>
          <div className="hero-index"><ArrowDown size={14} /> SCROLL TO UNFOLD</div>
        </div>
        <div className="hero-visual"><Image src="/images/morie-hero.png" alt="琥珀瓶器、陶瓷罐與橄欖枝構成的 MORIÉ 品牌靜物" fill priority sizes="(max-width: 900px) 100vw, 51vw" /><span className="hero-caption">晨霧系列 · 2026</span></div>
      </section>

      <section className="story-feature">
        <div className="story-feature-image image-reveal"><Image src="/images/morie-collection.png" alt="MORIÉ 植萃保養瓶器系列" fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" /></div>
        <div className="story-feature-copy"><MotionReveal><p className="eyebrow">夜間儀式 · No. 03</p><h2 className="section-title">深夜不是終點，<br />是肌膚重新整理<br />自己的時間。</h2><p>神經醯胺、紅藜與植物角鯊烷構成輕盈的修護層。沒有張揚氣味，只在每一次按壓之間，讓乾燥與疲倦慢慢退去。</p><Link href="/products/nocturne-repair-serum" className="text-link">認識夜間修護精華 <ArrowRight size={14} /></Link></MotionReveal></div>
      </section>

      <section className="product-section">
        <div className="section-shell section-heading-row"><div><p className="eyebrow">精選配方</p><h2 className="section-title mt-4">此刻，適合放在手邊</h2><p>依照台灣季節與日常步調選出的六款配方。</p></div><Link href="/products" className="text-link">查看全部商品 <ArrowRight size={14} /></Link></div>
        <div className="product-row">{products.slice(0, 6).map((product, index) => <ProductCard key={product.slug} product={product} priority={index < 2} />)}</div>
      </section>

      <section className="category-section"><div className="category-grid">{categories.map((category) => <Link key={category.title} href={category.href} className="category-tile" style={{ "--tile-color": category.color } as React.CSSProperties}><span className="category-number">{category.number}</span><div><h3>{category.title}</h3><p>{category.description}</p><ArrowRight size={18} className="mt-6" /></div></Link>)}</div></section>

      <section className="philosophy">
        <div className="philosophy-copy"><MotionReveal><span className="quote-mark">“</span><blockquote>我們不追趕自然，<br />只學著聽懂它的速度。</blockquote><p>每一款 MORIÉ 配方，都從「是否真正需要」開始。理解原料的產季、肌膚的界線與包材的去向，比堆疊更多成分更重要。</p><Link href="/story" className="text-link mt-8">我們的製作哲學 <ArrowRight size={14} /></Link></MotionReveal></div>
        <div className="philosophy-image image-reveal"><Image src="/images/morie-forest.png" alt="雨後山林、岩石與蕨類" fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /></div>
      </section>

      <section className="journal-section"><div className="section-shell"><div className="section-heading-row"><div><p className="eyebrow">編輯選讀</p><h2 className="section-title mt-4">關於植物，也關於生活</h2></div><Link href="/journal" className="text-link">所有文章 <ArrowRight size={14} /></Link></div><div className="article-grid">{articles.map((article) => <article className="article-card" key={article.slug}><Link href={`/journal/${article.slug}`} className="article-image"><Image src={article.image} alt={article.title} fill sizes="(max-width: 900px) 100vw, 33vw" /></Link><div className="article-copy"><p className="eyebrow">{article.category} · {article.readingTime}</p><h3><Link href={`/journal/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p></div></article>)}</div></div></section>

      <section className="brand-quote"><MotionReveal><blockquote>「好的照料不是改變你，<br />而是讓你更靠近原來的自己。」</blockquote><cite>— MORIÉ FORMULATION NOTE 01</cite></MotionReveal></section>

      <section className="services"><div className="service"><Truck size={20} strokeWidth={1.3} /><h3>滿額免運</h3><p>全台單筆消費滿 NT$2,200，享標準配送免運。</p></div><div className="service"><MessageCircleMore size={20} strokeWidth={1.3} /><h3>配方諮詢</h3><p>由門市夥伴依膚況、氣味偏好與生活節奏提供建議。</p></div><div className="service"><Gift size={20} strokeWidth={1.3} /><h3>克制包裝</h3><p>免費以再生棉紙包裝，亦可留下贈禮短箋。</p></div><div className="service"><Leaf size={20} strokeWidth={1.3} /><h3>安心試用</h3><p>每筆訂單可選擇兩款體驗包，找到更適合的日常。</p></div></section>
    </>
  );
}
