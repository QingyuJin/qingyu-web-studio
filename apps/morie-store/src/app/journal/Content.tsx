"use client";
import { useCopy } from "@/i18n";
import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";



export default function JournalPage() {
  const t = useCopy();
  const [featured, ...rest] = articles;
  return <div className="journal-page"><header className="journal-hero"><p className="eyebrow">{t("MORIÉ JOURNAL")}</p><h1 className="editorial-title">{t("寫給緩慢生活的")}<br />{t("植物與感官札記。")}</h1></header><article className="journal-feature"><Link href={`/journal/${featured.slug}`} className="journal-feature-image"><Image src={featured.image} alt={t(featured.title)} fill priority sizes="(max-width: 900px) 100vw, 58vw" className="object-cover" /></Link><div><p className="eyebrow">{t(featured.category)}{" "}{t(featured.readingTime)}</p><h2>{t(featured.title)}</h2><p>{t(featured.excerpt)}</p><Link href={`/journal/${featured.slug}`} className="text-link">{t("繼續閱讀")}<ArrowRight size={14} /></Link></div></article><section className="journal-list section-shell">{rest.map((article, index) => <article key={article.slug}><Link href={`/journal/${article.slug}`} className="journal-list-image"><Image src={article.image} alt={t(article.title)} fill sizes="(max-width: 700px) 100vw, 40vw" className="object-cover" /></Link><div><span className="journal-number">0{t(index + 2)}</span><p className="eyebrow">{t(article.category)}{" "}{t(article.readingTime)}</p><h2><Link href={`/journal/${article.slug}`}>{t(article.title)}</Link></h2><p>{t(article.excerpt)}</p><Link href={`/journal/${article.slug}`} className="text-link">{t("閱讀文章")}</Link></div></article>)}</section></div>;
}
