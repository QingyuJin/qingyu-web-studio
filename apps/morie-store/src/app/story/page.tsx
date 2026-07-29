import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/MotionReveal";

export const metadata: Metadata = { title: "品牌故事", description: "認識 MORIÉ 的原料來源、製作哲學與永續承諾。" };

export default function StoryPage() {
  return <>
    <header className="story-hero"><div className="story-hero-copy"><p className="eyebrow">ABOUT MORIÉ</p><h1 className="editorial-title">在島嶼的濕度裡，<br />尋找照料的尺度。</h1><p>MORIÉ 誕生於一個簡單的問題：當生活已經足夠喧嘩，一款保養品還能否只做它真正需要做的事？</p></div><div className="story-hero-image"><Image src="/images/morie-forest.png" alt="雨霧中的台灣山林" fill priority sizes="100vw" className="object-cover" /></div></header>
    <section className="story-intro section-shell"><MotionReveal><p className="eyebrow">我們的起點</p><p className="story-lead">我們以台灣山林的植物氣息為線索，與配方師、農作者和包材工藝夥伴一起，建立一套不把自然浪漫化，也不把科技神秘化的照料方式。</p></MotionReveal></section>
    <section className="story-chapter"><div className="story-chapter-image"><Image src="/images/morie-atelier.png" alt="MORIÉ 植物研究工房" fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /></div><div className="story-chapter-copy"><MotionReveal><span>01</span><p className="eyebrow">原料來源</p><h2>從一片葉的產季，<br />而不是流行開始。</h2><p>我們優先與能清楚說明產地、採收與處理方式的小規模供應者合作。馬告、紫蘇、茶籽與紅藜，並非為了堆疊「在地」標籤，而是因為它們在這座島嶼的氣候裡展現獨特而真實的性格。</p><p>原料抵達後，我們記錄色澤、氣味與批次差異，再用適合的方式萃取。植物不必每一次都長得一模一樣，安全標準與感官細節卻必須清楚。</p></MotionReveal></div></section>
    <section className="story-chapter reverse"><div className="story-chapter-image"><Image src="/images/morie-collection.png" alt="MORIÉ 原創保養瓶器" fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /></div><div className="story-chapter-copy"><MotionReveal><span>02</span><p className="eyebrow">製作哲學</p><h2>配方的克制，<br />來自更長的思考。</h2><p>我們不以成分數量衡量效果。每一項原料都需要回答三件事：它為什麼存在、適合誰，以及能否用更少的負擔抵達相同目的。</p><p>配方經過穩定性、相容性與使用感測試；香氣則維持在不掩蓋身體的程度。保養應該陪伴生活，而不是要求生活配合它。</p></MotionReveal></div></section>
    <section className="sustainability" id="sustainability"><div className="section-shell"><MotionReveal><p className="eyebrow">03 · 永續承諾</p><h2>不把完美當作口號，<br />持續把選擇做得更好。</h2></MotionReveal><div className="commitment-grid"><div><strong>78%</strong><h3>再生材料比例</h3><p>現行紙材與運輸包裝的平均再生成分。瓶器則優先選用單一材質或可拆解結構。</p></div><div><strong>2028</strong><h3>補充系統目標</h3><p>我們正測試液態潔淨配方的門市補充系統，將於確認衛生與碳效益後逐步導入。</p></div><div><strong>1%</strong><h3>回到土地</h3><p>每年營收的百分之一投入台灣淺山生態與小農土壤復育計畫，並公開年度紀錄。</p></div></div></div></section>
    <section className="story-closing"><Image src="/images/morie-hero.png" alt="MORIÉ 晨光瓶器靜物" fill sizes="100vw" className="object-cover" /><div><p className="eyebrow">A QUIET INVITATION</p><h2>從一款真正需要的配方開始。</h2><Link href="/products" className="button-solid">探索 MORIÉ <ArrowRight size={16} /></Link></div></section>
  </>;
}
