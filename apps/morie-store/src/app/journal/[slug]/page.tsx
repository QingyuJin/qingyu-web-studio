import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articles, getArticle } from "@/data/articles";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = getArticle((await params).slug); return article ? { title: article.title, description: article.excerpt, openGraph: { images: [article.image] } } : {}; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) return null;
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2);
  return <article className="article-page"><header><Link href="/journal" className="text-link"><ArrowLeft size={14} /> 返回閱讀</Link><p className="eyebrow">{article.category} · {article.readingTime} · {article.publishedAt}</p><h1 className="editorial-title">{article.title}</h1><p>{article.excerpt}</p></header><div className="article-cover"><Image src={article.image} alt={article.title} fill priority sizes="100vw" className="object-cover" /></div><div className="article-body"><aside><span>M</span><p>MORIÉ 編輯室</p><small>關於植物、空間與感官的觀察</small></aside><div>{article.content.map((section, index) => <section key={index}>{section.heading && <h2>{section.heading}</h2>}<p>{section.body}</p></section>)}</div></div><section className="article-related"><p className="eyebrow">接著閱讀</p><div>{related.map((item) => <Link href={`/journal/${item.slug}`} key={item.slug}><span className="relative aspect-[4/3] overflow-hidden"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, 45vw" className="object-cover" /></span><small>{item.category} · {item.readingTime}</small><strong>{item.title}</strong></Link>)}</div></section></article>;
}
