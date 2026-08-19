import type { Metadata } from "next";
import { ProductExplorer } from "@/components/ProductExplorer";

export const metadata: Metadata = { title: "所有配方", description: "探索 MORIÉ 肌膚保養、身體、香氛與居家配方。" };

export default function ProductsPage() {
  return <div className="catalog-page">
    <header className="catalog-hero"><p className="eyebrow">MORIÉ FORMULATIONS</p><h1 className="editorial-title">所有配方</h1><p>依照氣味、膚況與日常的需要，找到適合放在身邊的一款。</p></header>
    <ProductExplorer />
  </div>;
}
