"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { brand } from "@/data/brand";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

type FormData = { email: string; name: string; phone: string; city: string; district: string; address: string; delivery: "home" | "store"; card: string; expiry: string; cvc: string };
const initialForm: FormData = { email: "", name: "", phone: "", city: "", district: "", address: "", delivery: "home", card: "", expiry: "", cvc: "" };

export function CheckoutFlow() {
  const { items, clearCart, hydrated } = useCartStore();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [complete, setComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= brand.shippingThreshold ? 0 : 100;
  const total = subtotal + shipping;

  function update(key: keyof FormData, value: string) { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "請輸入有效的電子郵件";
    if (form.name.trim().length < 2) nextErrors.name = "請填寫收件人姓名";
    if (!/^09\d{8}$/.test(form.phone.replace(/\s/g, ""))) nextErrors.phone = "請輸入 09 開頭的 10 碼手機";
    if (!form.city) nextErrors.city = "請選擇縣市";
    if (!form.district.trim()) nextErrors.district = "請填寫鄉鎮市區";
    if (form.address.trim().length < 5) nextErrors.address = "請填寫完整地址";
    if (form.card.replace(/\s/g, "").length !== 16) nextErrors.card = "請輸入 16 碼測試卡號";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) nextErrors.expiry = "格式為 MM/YY";
    if (!/^\d{3}$/.test(form.cvc)) nextErrors.cvc = "請輸入 3 碼安全碼";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { document.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    clearCart();
    setOrderId(`MR-260722-${Date.now().toString().slice(-4)}`);
    setComplete(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (complete) return <div className="checkout-complete"><span><Check size={32} /></span><p className="eyebrow">ORDER DEMONSTRATION COMPLETE</p><h1>謝謝你，這段購物旅程已完成。</h1><p>模擬訂單 <strong>{orderId}</strong> 已建立。本展示不會進行實際扣款或配送。</p><Link href="/products" className="button-solid">繼續探索配方</Link></div>;

  if (hydrated && items.length === 0) return <div className="checkout-empty"><p className="eyebrow">CHECKOUT</p><h1>購物袋裡還沒有配方。</h1><p>挑選一件適合現在日常的產品，再回到這裡完成流程。</p><Link href="/products" className="button-solid">探索全系列</Link></div>;

  return <form className="checkout-layout" onSubmit={submit} noValidate>
    <div className="checkout-form"><Link href="/products" className="checkout-back"><ChevronLeft size={15} /> 繼續選購</Link><p className="eyebrow">SECURE DEMO CHECKOUT</p><h1>配送與付款</h1><section><div className="checkout-section-title"><span>01</span><h2>聯絡資訊</h2></div><div className="form-grid"><Field label="電子郵件" type="email" value={form.email} error={errors.email} onChange={(value) => update("email", value)} full /><Field label="收件人姓名" value={form.name} error={errors.name} onChange={(value) => update("name", value)} /><Field label="手機號碼" value={form.phone} error={errors.phone} onChange={(value) => update("phone", value)} placeholder="0912 345 678" /></div></section><section><div className="checkout-section-title"><span>02</span><h2>配送地址</h2></div><div className="delivery-options"><button type="button" className={form.delivery === "home" ? "selected" : ""} onClick={() => setForm((current) => ({ ...current, delivery: "home" }))}><strong>宅配到府</strong><span>2—3 個工作日</span></button><button type="button" className={form.delivery === "store" ? "selected" : ""} onClick={() => setForm((current) => ({ ...current, delivery: "store" }))}><strong>門市取貨</strong><span>可於三間 MORIÉ 門市取件</span></button></div><div className="form-grid"><label className={errors.city ? "field-error" : ""}><span>縣市</span><select value={form.city} onChange={(event) => update("city", event.target.value)}><option value="">請選擇</option><option>台北市</option><option>新北市</option><option>台中市</option><option>高雄市</option><option>其他縣市</option></select>{errors.city && <small>{errors.city}</small>}</label><Field label="鄉鎮市區" value={form.district} error={errors.district} onChange={(value) => update("district", value)} /><Field label="街道與門牌" value={form.address} error={errors.address} onChange={(value) => update("address", value)} full /></div></section><section><div className="checkout-section-title"><span>03</span><h2>模擬付款</h2></div><div className="payment-note"><LockKeyhole size={16} /><p>此處僅展示付款介面，不會傳送或儲存任何卡片資料。可輸入任意 16 碼完成測試。</p></div><div className="form-grid"><Field label="卡片號碼" value={form.card} error={errors.card} onChange={(value) => update("card", value.replace(/[^\d]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())} placeholder="4242 4242 4242 4242" full /><Field label="有效期限" value={form.expiry} error={errors.expiry} onChange={(value) => update("expiry", value)} placeholder="12/30" /><Field label="安全碼" value={form.cvc} error={errors.cvc} onChange={(value) => update("cvc", value.replace(/\D/g, "").slice(0, 3))} placeholder="123" /></div></section><button type="submit" className="button-solid checkout-submit">完成模擬訂單 · {formatPrice(total)}</button><p className="checkout-disclaimer">點擊後僅建立前端完成畫面，不會產生實際交易。</p></div>
    <aside className="order-summary"><p className="eyebrow">訂單摘要</p><h2>你的選擇</h2><div className="summary-items">{items.map((item) => <div key={item.key}><span className="summary-thumb"><Image src={item.image} alt={item.name} fill sizes="76px" className="object-cover" /></span><div><strong>{item.name}</strong><small>{item.size} · 數量 {item.quantity}</small></div><span>{formatPrice(item.price * item.quantity)}</span></div>)}</div><dl><div><dt>小計</dt><dd>{formatPrice(subtotal)}</dd></div><div><dt>運費</dt><dd>{shipping === 0 ? "免費" : formatPrice(shipping)}</dd></div><div className="summary-total"><dt>合計</dt><dd>{formatPrice(total)}</dd></div></dl></aside>
  </form>;
}

function Field({ label, value, error, onChange, type = "text", placeholder, full = false }: { label: string; value: string; error?: string; onChange: (value: string) => void; type?: string; placeholder?: string; full?: boolean }) {
  return <label className={`${full ? "field-full" : ""} ${error ? "field-error" : ""}`}><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />{error && <small>{error}</small>}</label>;
}
