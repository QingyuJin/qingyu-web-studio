import ArticleContent from "./ArticleContent";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = getArticle((await params).slug); return article ? { title: article.title, description: article.excerpt, openGraph: { images: [{ url: article.image, alt: article.title }] }, twitter: { card: "summary_large_image", images: [article.image] } } : {}; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return <ArticleContent article={article} />;
}
