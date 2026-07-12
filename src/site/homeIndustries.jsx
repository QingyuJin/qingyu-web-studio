/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react"

const NAMES = ["陳先生", "林小姐", "王老闆", "張太太", "李先生", "趙小姐", "吳老闆"]
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

let rowSeq = 0
const nextId = () => {
  rowSeq += 1
  return `r${rowSeq}`
}

export const industries = [
  {
    id: "restaurant",
    emoji: "🍽",
    label: "餐飲店家",
    tagline: "桌邊點餐 廚房即時出單",
    front: {
      title: "客人這樣點餐",
      kind: "items",
      items: [
        ["炭烤牛小排飯", "$280"],
        ["松露野菇燉飯", "$240"],
        ["烏梅氣泡飲", "$120"],
      ],
    },
    back: {
      title: "你的廚房佇列",
      seed: [
        { id: nextId(), primary: "招牌牛肉麵", secondary: "桌號 A03", status: "備餐中", tone: "amber" },
        { id: nextId(), primary: "檸檬氣泡飲", secondary: "桌號 B01", status: "待送餐", tone: "green" },
      ],
      make: (label) => ({ id: nextId(), primary: label, secondary: `桌號 A0${1 + Math.floor(Math.random() * 8)}`, status: "新單", tone: "blue" }),
    },
    product: {
      system: "餐飲點餐系統",
      price: "25,000 元起",
      duration: "14–25 天",
      customerSees: "手機桌邊點餐、看菜單",
      youManage: "廚房佇列、桌況與出餐節奏",
      live: { path: "/works/restaurant-ordering", label: "打開點餐系統" },
    },
    recommend: {
      name: "餐廳內用點餐系統",
      desc: "已開發完成的可操作成品，手機點餐送廚房即時出單，適合內用型餐飲。",
      price: "25,000 元起",
      to: "/works/restaurant-ordering",
    },
  },
  {
    id: "wholesale",
    emoji: "📦",
    label: "批發 / 電商",
    tagline: "客戶線上下單 訂單直接進後台",
    front: {
      title: "客戶這樣下單",
      kind: "items",
      items: [
        ["高麗菜 20kg", "$480"],
        ["蘋果 8 箱", "$650"],
        ["番茄 10kg", "$900"],
      ],
    },
    back: {
      title: "你的訂單後台",
      seed: [
        { id: nextId(), primary: "青江菜 x15", secondary: "阿明火鍋店", status: "待出貨", tone: "amber" },
        { id: nextId(), primary: "香蕉 x10", secondary: "東港早餐", status: "已出貨", tone: "green" },
      ],
      make: (label) => ({ id: nextId(), primary: label, secondary: pick(NAMES), status: "新訂單", tone: "blue" }),
    },
    product: {
      system: "批發訂貨 / 電商系統",
      price: "25,000 元起",
      duration: "14–25 天",
      customerSees: "手機看商品、專屬報價、下單",
      youManage: "訂單、出貨狀態與月結對帳",
      live: { path: "/works/wholesale-ordering", label: "打開訂貨系統" },
    },
    recommend: {
      name: "批發訂貨系統",
      desc: "客戶手機下單、專屬價格、後台出貨與月結對帳，適合批發／中盤商。",
      price: "25,000 元起",
      to: "/works/wholesale-ordering",
    },
  },
  {
    id: "contractor",
    emoji: "🛠",
    label: "工程 / 服務業",
    tagline: "客戶線上詢價 案件自動進看板",
    front: {
      title: "客戶這樣詢價",
      kind: "button",
      buttonLabel: "送出「浴室防水」詢價",
    },
    back: {
      title: "你的案件看板",
      seed: [
        { id: nextId(), primary: "外牆抓漏", secondary: "林先生", status: "報價中", tone: "amber" },
        { id: nextId(), primary: "店面地坪", secondary: "陳老闆", status: "施工中", tone: "green" },
      ],
      make: () => ({ id: nextId(), primary: "浴室防水", secondary: pick(NAMES), status: "新詢價", tone: "blue" }),
    },
    product: {
      system: "工程接案系統",
      price: "30,000 元起",
      duration: "14–25 天",
      customerSees: "品牌官網、服務展示、線上詢價",
      youManage: "詢價收件匣、案件看板、派工回報",
      live: { path: "/contractor-site", label: "打開工程接案頁" },
    },
    recommend: {
      name: "鑫匠工程",
      desc: "真實上線的工程行案例。黑金官網 + 線上詢價，需求進 BuildFlow 後台一鍵轉案件。",
      price: "30,000 元起",
      to: "/works/xinjiang",
      tag: "真實客戶案例",
    },
  },
  {
    id: "company",
    emoji: "🏢",
    label: "公司行號",
    tagline: "一頁看懂你 聯絡直接進收件匣",
    front: {
      title: "訪客這樣聯絡你",
      kind: "button",
      buttonLabel: "送出官網聯絡表單",
    },
    back: {
      title: "你的聯絡收件匣",
      seed: [
        { id: nextId(), primary: "王小姐", secondary: "官網表單", status: "已聯絡", tone: "green" },
        { id: nextId(), primary: "李先生", secondary: "Google 搜尋", status: "跟進中", tone: "amber" },
      ],
      make: () => ({ id: nextId(), primary: pick(NAMES), secondary: "官網聯絡表單", status: "新詢問", tone: "blue" }),
    },
    product: {
      system: "公司一頁式官網",
      price: "12,000 元起",
      duration: "5–10 天",
      customerSees: "一頁看懂你是誰、做什麼",
      youManage: "聯絡收件匣、內容自行更新",
      live: { path: "/works/company-landing", label: "看公司官網成品" },
    },
    recommend: {
      name: "生醫品牌官網",
      desc: "醫療內容品牌形象站：故事、服務、案例與講座報名一頁整合。",
      price: "12,000 元起",
      to: "/works/biomed-brand-site",
      tag: "真實上線案例",
    },
  },
  {
    id: "education",
    emoji: "🎓",
    label: "教育 / 顧問",
    tagline: "學員線上測驗 成績自動計分入庫",
    front: {
      title: "學員這樣作答",
      kind: "button",
      buttonLabel: "送出一份測驗結果",
    },
    back: {
      title: "你的填答紀錄",
      seed: [
        { id: nextId(), primary: "陳同學", secondary: "82 分 · 成熟型", status: "已完成", tone: "green" },
        { id: nextId(), primary: "林同學", secondary: "58 分 · 發展型", status: "已完成", tone: "green" },
      ],
      make: () => {
        const score = 40 + Math.floor(Math.random() * 55)
        const tier = score >= 75 ? "成熟型" : score >= 50 ? "發展型" : "打底型"
        return { id: nextId(), primary: pick(NAMES), secondary: `${score} 分 · ${tier}`, status: "剛完成", tone: "blue" }
      },
    },
    product: {
      system: "互動測驗 / 問卷評分系統",
      price: "6,000 元起",
      duration: "3–8 天",
      customerSees: "線上測驗、自動計分、結果報告",
      youManage: "填答紀錄、統計與 Excel 匯出",
      live: { path: "/works/assessment-system", label: "直接玩測驗系統" },
    },
    recommend: {
      name: "互動測驗系統",
      desc: "可操作成品：線上作答、自動計分、結果報告，適合教育訓練與顧問。",
      price: "6,000 元起",
      to: "/works/assessment-system",
    },
  },
  {
    id: "creator",
    emoji: "✨",
    label: "個人品牌 / 創作者",
    tagline: "IG 導流入口 名單直接收進來",
    front: {
      title: "粉絲這樣行動",
      kind: "button",
      buttonLabel: "點「加入 LINE 官方帳號」",
    },
    back: {
      title: "你的名單 / 預約",
      seed: [
        { id: nextId(), primary: "小美", secondary: "預約一對一諮詢", status: "待回覆", tone: "amber" },
        { id: nextId(), primary: "阿哲", secondary: "下載現金流工具", status: "已加入", tone: "green" },
      ],
      make: () => ({ id: nextId(), primary: pick(NAMES), secondary: "加入 LINE 官方帳號", status: "新名單", tone: "blue" }),
    },
    product: {
      system: "個人品牌落地頁",
      price: "12,000 元起",
      duration: "5–10 天",
      customerSees: "深色系品牌入口、服務與資源",
      youManage: "名單、預約與 LINE 導流",
      live: { path: "/works/notion-brand-landing", label: "看個人品牌成品" },
    },
    recommend: {
      name: "Notion 風格落地頁",
      desc: "深色品牌形象頁 + LINE 名單導流，適合創作者與個人品牌。",
      price: "12,000 元起",
      to: "/works/notion-brand-landing",
    },
  },
]

const statusTone = {
  blue: "bg-[#eef2ff] text-[#3d54c4]",
  green: "bg-[#e9f5ec] text-[#2f7a3f]",
  amber: "bg-[#fff2d9] text-[#a4701a]",
}

export function LiveIndustryDemo({ industry, onInteract }) {
  const [rows, setRows] = useState(industry.back.seed)
  const [count, setCount] = useState(0)
  const [flash, setFlash] = useState(false)
  const timerRef = useRef(null)

  // 切換行業時，StudioHome 用 key 重掛此元件，狀態自動歸零，不需額外 effect。
  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  function addRow(label) {
    const row = industry.back.make(label)
    setRows((current) => [row, ...current].slice(0, 5))
    setCount((c) => c + 1)
    setFlash(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setFlash(false), 1600)
    onInteract?.()
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 md:items-stretch">
      {/* 前台 */}
      <div className="rounded-2xl border border-[#e0d8cc] bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-[#111c22]">{industry.front.title}</p>
          <span className="rounded-full bg-[#eef7f4] px-2.5 py-0.5 text-[11px] font-black text-[#0d6b62]">點點看</span>
        </div>

        {industry.front.kind === "items" ? (
          <div className="mt-4 grid gap-2">
            {industry.front.items.map(([label, price]) => (
              <button
                key={label}
                type="button"
                onClick={() => addRow(label)}
                className="flex items-center justify-between rounded-xl border border-[#e3ded3] bg-[#faf8f3] px-3 py-2.5 text-left transition hover:border-[#0d6b62] hover:bg-white"
              >
                <span className="text-sm font-black text-[#111c22]">{label}</span>
                <span className="rounded-lg bg-[#111c22] px-2.5 py-1 text-xs font-black text-white">加入 {price}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border border-dashed border-[#d7cbbb] bg-[#faf8f3] p-4 text-center text-xs font-bold text-[#8a7c6d]">
              模擬客戶端畫面
            </div>
            <button
              type="button"
              onClick={() => addRow()}
              className="min-h-11 rounded-xl bg-[#111c22] text-sm font-black text-white transition hover:bg-[#0d6b62]"
            >
              {industry.front.buttonLabel}
            </button>
          </div>
        )}
      </div>

      {/* 後台 */}
      <div className="relative overflow-hidden rounded-2xl border border-[#1c2d2e] bg-[#111c22] p-4 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-white">{industry.back.title}</p>
          {flash ? (
            <span className="rounded-full bg-[#8fd6cc]/15 px-2.5 py-0.5 text-[11px] font-black text-[#8fd6cc]">← 你剛按的，進來了</span>
          ) : (
            <span className="text-[11px] font-bold text-white/45">今日 {count} 筆</span>
          )}
        </div>

        <div className="mt-3 grid gap-2">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition ${
                index === 0 && flash ? "border-[#8fd6cc]/50 bg-white/[0.09] animate-[rowIn_.4s_ease]" : "border-white/10 bg-white/[0.05]"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{row.primary}</p>
                <p className="truncate text-[11px] font-bold text-white/55">{row.secondary}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${statusTone[row.tone]}`}>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
