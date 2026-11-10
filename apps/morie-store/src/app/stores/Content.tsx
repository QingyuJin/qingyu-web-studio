"use client";
import { useCopy } from "@/i18n";
import Image from "next/image";
import { StoreExplorer } from "@/components/StoreExplorer";



export default function StoresPage() {
  const t = useCopy();
  return <><header className="store-hero"><div><p className="eyebrow">{t("MORIÉ SPACES")}</p><h1 className="editorial-title">{t("一處讓氣味")}<br />{t("慢慢展開的地方。")}</h1><p>{t("三間空間，三種與城市相處的方式。歡迎前來試聞、觸摸，或只是短暫停留。")}</p></div><div><Image src="/demo/morie/images/morie-atelier.png" alt={t("MORIÉ 門市空間")} fill priority sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" /></div></header><StoreExplorer /><section className="store-note"><p className="eyebrow">{t("門市服務")}</p><h2>{t("氣味諮詢、肌膚配方建議與企業贈禮，皆可於門市進行。")}</h2><p>{t("本網站為品牌展示提案，門市資訊為虛構內容；正式營運前可集中替換資料。")}</p></section></>;
}
