"use client";
import { useCopy } from "@/i18n";
import Image from "next/image";
import Link from "@/components/LocaleLink";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";



export default function StoryPage() {
  const t = useCopy();
  return <>
    <header className="story-hero"><div className="story-hero-copy"><p className="eyebrow">{t("ABOUT MORIÉ")}</p><h1 className="editorial-title">{t("在島嶼的濕度裡，")}<br />{t("尋找照料的尺度。")}</h1><p>{t("MORIÉ 誕生於一個簡單的問題：當生活已經足夠喧嘩，一款保養品還能否只做它真正需要做的事？")}</p></div><div className="story-hero-image"><Image src="/demo/morie/images/morie-forest.png" alt={t("雨霧中的台灣山林")} fill priority sizes="100vw" className="object-cover" /></div></header>
    <section className="story-intro section-shell"><MotionReveal><p className="eyebrow">{t("我們的起點")}</p><p className="story-lead">{t("我們以台灣山林的植物氣息為線索，與配方師、農作者和包材工藝夥伴一起，建立一套不把自然浪漫化，也不把科技神秘化的照料方式。")}</p></MotionReveal></section>
    <section className="story-chapter"><div className="story-chapter-image"><Image src="/demo/morie/images/morie-atelier.png" alt={t("MORIÉ 植物研究工房")} fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /></div><div className="story-chapter-copy"><MotionReveal><span>01</span><p className="eyebrow">{t("原料來源")}</p><h2>{t("從一片葉的產季，")}<br />{t("而不是流行開始。")}</h2><p>{t("我們優先與能清楚說明產地、採收與處理方式的小規模供應者合作。馬告、紫蘇、茶籽與紅藜，並非為了堆疊「在地」標籤，而是因為它們在這座島嶼的氣候裡展現獨特而真實的性格。")}</p><p>{t("原料抵達後，我們記錄色澤、氣味與批次差異，再用適合的方式萃取。植物不必每一次都長得一模一樣，安全標準與感官細節卻必須清楚。")}</p></MotionReveal></div></section>
    <section className="story-chapter reverse"><div className="story-chapter-image"><Image src="/demo/morie/images/morie-collection.png" alt={t("MORIÉ 原創保養瓶器")} fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /></div><div className="story-chapter-copy"><MotionReveal><span>02</span><p className="eyebrow">{t("製作哲學")}</p><h2>{t("配方的克制，")}<br />{t("來自更長的思考。")}</h2><p>{t("我們不以成分數量衡量效果。每一項原料都需要回答三件事：它為什麼存在、適合誰，以及能否用更少的負擔抵達相同目的。")}</p><p>{t("配方經過穩定性、相容性與使用感測試；香氣則維持在不掩蓋身體的程度。保養應該陪伴生活，而不是要求生活配合它。")}</p></MotionReveal></div></section>
    <section className="sustainability" id="sustainability"><div className="section-shell"><MotionReveal><p className="eyebrow">{t("03 · 永續資訊設計")}</p><h2>{t("不放沒有依據的數字，")}<br />{t("只呈現可以核對的選擇。")}</h2></MotionReveal><div className="commitment-grid"><div><strong>{t("包材")}</strong><h3>{t("材質說明")}</h3><p>{t("展示如何整理包材材質 拆解方式與回收提醒")}</p></div><div><strong>{t("補充")}</strong><h3>{t("測試狀態")}</h3><p>{t("未完成驗證的補充方案只標示為測試 不宣稱已經上線")}</p></div><div><strong>{t("紀錄")}</strong><h3>{t("公開依據")}</h3><p>{t("正式品牌可在此提供來源 年度紀錄與更新日期")}</p></div></div></div></section>
    <section className="story-closing"><Image src="/demo/morie/images/morie-hero.png" alt={t("MORIÉ 晨光瓶器靜物")} fill sizes="100vw" className="object-cover" /><div><p className="eyebrow">{t("A QUIET INVITATION")}</p><h2>{t("從一款真正需要的配方開始。")}</h2><Link href="/products" className="button-solid">{t("探索 MORIÉ")}<ArrowRight size={16} /></Link></div></section>
  </>;
}
