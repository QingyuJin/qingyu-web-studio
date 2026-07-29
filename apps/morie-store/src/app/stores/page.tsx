import type { Metadata } from "next";
import Image from "next/image";
import { StoreExplorer } from "@/components/StoreExplorer";

export const metadata: Metadata = { title: "台灣門市", description: "尋找 MORIÉ 台北、台中與高雄門市。" };

export default function StoresPage() {
  return <><header className="store-hero"><div><p className="eyebrow">MORIÉ SPACES</p><h1 className="editorial-title">一處讓氣味<br />慢慢展開的地方。</h1><p>三間空間，三種與城市相處的方式。歡迎前來試聞、觸摸，或只是短暫停留。</p></div><div><Image src="/images/morie-atelier.png" alt="MORIÉ 門市空間" fill priority sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /></div></header><StoreExplorer /><section className="store-note"><p className="eyebrow">門市服務</p><h2>氣味諮詢、肌膚配方建議與企業贈禮，皆可於門市進行。</h2><p>本網站為品牌展示提案，門市資訊為虛構內容；正式營運前可集中替換資料。</p></section></>;
}
