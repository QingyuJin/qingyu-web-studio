"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";

type FilterState = { category: string; aroma: string; skinType: string; price: string; search: string };
const emptyFilters: FilterState = { category: "全部", aroma: "全部", skinType: "全部", price: "全部", search: "" };

const filterOptions = [
  { key: "category", label: "類別", values: ["全部", "肌膚保養", "身體", "香氛", "居家", "禮盒"] },
  { key: "aroma", label: "香氣", values: ["全部", "草本", "木質", "柑橘", "花香", "無香"] },
  { key: "skinType", label: "膚質", values: ["全部", "全膚質", "乾性", "混合性", "敏感性"] },
  { key: "price", label: "價格", values: ["全部", "1,200 以下", "1,200—2,000", "2,000 以上"] },
] as const;

export function ProductExplorer({ initialCategory = "全部", initialSearch = "" }: { initialCategory?: string; initialSearch?: string }) {
  const [filters, setFilters] = useState<FilterState>({ ...emptyFilters, category: initialCategory, search: initialSearch });
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const search = params.get("search");
    if (!category && !search) return;
    const timer = window.setTimeout(() => {
      setFilters((current) => ({ ...current, category: category || current.category, search: search || current.search }));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const matchCategory = filters.category === "全部" || product.category === filters.category;
      const matchAroma = filters.aroma === "全部" || product.aroma === filters.aroma;
      const matchSkin = filters.skinType === "全部" || product.skinType === filters.skinType;
      const matchSearch = !filters.search || [product.name, product.englishName, product.summary, product.category, product.aroma, product.skinType].join(" ").toLowerCase().includes(filters.search.toLowerCase());
      const matchPrice = filters.price === "全部" || (filters.price === "1,200 以下" && product.price < 1200) || (filters.price === "1,200—2,000" && product.price >= 1200 && product.price <= 2000) || (filters.price === "2,000 以上" && product.price > 2000);
      return matchCategory && matchAroma && matchSkin && matchSearch && matchPrice;
    });
    return [...result].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name, "zh-TW") : Number(Boolean(b.badge)) - Number(Boolean(a.badge)));
  }, [filters, sort]);

  function update(key: keyof FilterState, value: string) { setFilters((current) => ({ ...current, [key]: value })); }
  const activeCount = Object.entries(filters).filter(([key, value]) => key === "search" ? Boolean(value) : value !== "全部").length;

  return <>
    <div className="catalog-toolbar">
      <button type="button" className="filter-trigger" onClick={() => setMobileFilters(true)}><SlidersHorizontal size={16} /> 篩選 {activeCount > 0 && `(${activeCount})`}</button>
      <p>{filtered.length} 項配方</p>
      <label className="sort-label">排序
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">精選推薦</option><option value="low">價格由低至高</option><option value="high">價格由高至低</option><option value="name">名稱</option>
        </select>
      </label>
    </div>
    <div className="catalog-layout">
      <aside className={`filter-panel ${mobileFilters ? "filter-panel-open" : ""}`}>
        <div className="filter-mobile-head"><h2 className="font-display text-2xl">篩選</h2><button type="button" onClick={() => setMobileFilters(false)} aria-label="關閉篩選"><X size={20} /></button></div>
        {filters.search && <div className="filter-search-note"><span>搜尋：{filters.search}</span><button type="button" onClick={() => update("search", "")}>清除</button></div>}
        {filterOptions.map((group) => <fieldset key={group.key} className="filter-group"><legend>{group.label}</legend>{group.values.map((value) => <label key={value}><input type="radio" name={group.key} value={value} checked={filters[group.key] === value} onChange={() => update(group.key, value)} /><span>{value}</span></label>)}</fieldset>)}
        <button type="button" className="button-outline w-full" onClick={() => setFilters(emptyFilters)}>清除所有篩選</button>
        <button type="button" className="button-solid filter-apply" onClick={() => setMobileFilters(false)}>查看 {filtered.length} 項結果</button>
      </aside>
      <section className="catalog-results" aria-live="polite">
        {filtered.length ? <div className="catalog-grid">{filtered.map((product, index) => <ProductCard key={product.slug} product={product} priority={index < 4} />)}</div> : <div className="catalog-empty"><p className="font-display text-3xl">沒有完全符合的配方</p><p>試著放寬一項篩選條件，或回到完整系列。</p><button type="button" className="text-link" onClick={() => setFilters(emptyFilters)}>清除所有篩選</button></div>}
      </section>
    </div>
    {mobileFilters && <button type="button" className="drawer-backdrop filter-backdrop" aria-label="關閉篩選" onClick={() => setMobileFilters(false)} />}
  </>;
}
