"use client";
import { useCopy } from "@/i18n";
import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowLeft } from "lucide-react";
import { articles, type Article } from "@/data/articles";


export default function ArticleContent({ article }: { article: Article }) {
  const t = useCopy();
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2);
  return <article className="article-page"><header><Link href="/journal" className="text-link"><ArrowLeft size={14} />{t("返回閱讀")}</Link><p className="eyebrow">{t(article.category)}{" "}{t(article.readingTime)}{" "}{t(article.publishedAt)}</p><h1 className="editorial-title">{t(article.title)}</h1><p>{t(article.excerpt)}</p></header><div className="article-cover"><Image src={article.image} alt={t(article.title)} fill priority sizes="100vw" className="object-cover" /></div><div className="article-body"><aside><span>{t("M")}</span><p>{t("MORIÉ 編輯室")}</p><small>{t("關於植物、空間與感官的觀察")}</small></aside><div>{article.content.map((section, index) => <section key={index}>{section.heading && <h2>{t(section.heading)}</h2>}<p>{t(section.body)}</p></section>)}</div></div><section className="article-related"><p className="eyebrow">{t("接著閱讀")}</p><div>{related.map((item) => <Link href={`/journal/${item.slug}`} key={item.slug}><span className="relative aspect-[4/3] overflow-hidden"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, 45vw" className="object-cover" /></span><small>{t(item.category)}{" "}{t(item.readingTime)}</small><strong>{t(item.title)}</strong></Link>)}</div></section></article>;
}
