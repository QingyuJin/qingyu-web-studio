import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";

export const metadata: Metadata = { title: "閱讀", description: "閱讀 MORIÉ 關於植物、照料、空間與日常儀式的文章。" };

export default function JournalPage() {
  const [featured, ...rest] = articles;
  return <div className="journal-page"><header className="journal-hero"><p className="eyebrow">MORIÉ JOURNAL</p><h1 className="editorial-title">寫給緩慢生活的<br />植物與感官札記。</h1></header><article className="journal-feature"><Link href={`/journal/${featured.slug}`} className="journal-feature-image"><Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 900px) 100vw, 58vw" className="object-cover" /></Link><div><p className="eyebrow">{featured.category} · {featured.readingTime}</p><h2>{featured.title}</h2><p>{featured.excerpt}</p><Link href={`/journal/${featured.slug}`} className="text-link">繼續閱讀 <ArrowRight size={14} /></Link></div></article><section className="journal-list section-shell">{rest.map((article, index) => <article key={article.slug}><Link href={`/journal/${article.slug}`} className="journal-list-image"><Image src={article.image} alt={article.title} fill sizes="(max-width: 700px) 100vw, 40vw" className="object-cover" /></Link><div><span className="journal-number">0{index + 2}</span><p className="eyebrow">{article.category} · {article.readingTime}</p><h2><Link href={`/journal/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link href={`/journal/${article.slug}`} className="text-link">閱讀文章</Link></div></article>)}</section></div>;
}
