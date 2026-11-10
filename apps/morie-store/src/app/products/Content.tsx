"use client";
import { useCopy } from "@/i18n";
import { ProductExplorer } from "@/components/ProductExplorer";



export default function ProductsPage() {
  const t = useCopy();
  return <div className="catalog-page">
    <header className="catalog-hero"><p className="eyebrow">{t("MORIÉ FORMULATIONS")}</p><h1 className="editorial-title">{t("所有配方")}</h1><p>{t("依照氣味、膚況與日常的需要，找到適合放在身邊的一款。")}</p></header>
    <ProductExplorer />
  </div>;
}
