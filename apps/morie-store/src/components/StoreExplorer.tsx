"use client";
import { useCopy } from "@/i18n";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { stores } from "@/data/stores";

const cities = ["全部", "台北", "台中", "高雄"] as const;

export function StoreExplorer() {
  const t = useCopy();
  const [city, setCity] = useState<(typeof cities)[number]>("全部");
  const [selected, setSelected] = useState(0);
  const visible = stores.filter((store) => city === "全部" || store.city === city);
  const active = stores[selected];

  return <div className="store-explorer">
    <div className="store-list-panel"><div className="city-tabs" role="tablist" aria-label={t("依城市篩選")}>{cities.map((item) => <button key={item} type="button" className={city === item ? "active" : ""} onClick={() => setCity(item)}>{t(item)}</button>)}</div><div className="store-list">{visible.map((store) => { const index = stores.indexOf(store); return <button key={store.name} type="button" className={`store-row ${selected === index ? "selected" : ""}`} onClick={() => setSelected(index)}><span className="eyebrow">{t(store.city)}</span><strong>{t(store.name)}</strong><span>{t(store.address)}</span><span>{t(store.hours)}</span><span>{t(store.phone)}</span></button>; })}</div></div>
    <div className="map-placeholder" aria-label={t("{0}地圖位置示意", [active.name])}><div className="map-grid-lines" /><div className="map-river" /><div className="map-label label-north">{t("N")}</div><div className="map-label label-road">{t("MORIÉ · TAIWAN")}</div>{stores.map((store, index) => <button key={store.name} type="button" className={`map-pin ${index === selected ? "active" : ""}`} style={{ top: store.coordinates.top, left: store.coordinates.left }} onClick={() => setSelected(index)} aria-label={t("選擇{0}", [store.name])}><MapPin size={index === selected ? 34 : 24} fill={index === selected ? "currentColor" : "none"} /><span>{t(store.city)}</span></button>)}<div className="map-card"><span className="eyebrow">{t("目前選擇")}</span><strong>{t(active.name)}</strong><small>{t(active.address)}</small><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.address)}`} target="_blank" rel="noreferrer">{t("在 Google 地圖開啟")}</a></div></div>
  </div>;
}
