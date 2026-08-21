/* eslint-disable react-refresh/only-export-components */
import { useState } from "react"

/* ========== Shared mini demo frames ========== */

function Chrome({ label, tone = "light", children }) {
  const dark = tone === "dark"
  return (
    <div className={`overflow-hidden rounded-xl border ${dark ? "border-white/10 bg-[#0f1518]" : "border-[#e3ded3] bg-white"} shadow-sm`}>
      <div className={`flex items-center gap-2 border-b px-3 py-2 ${dark ? "border-white/10 bg-[#141c20]" : "border-[#eee9df] bg-[#f6f3ec]"}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#f0655c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f4c15f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#69cf7d]" />
        <span className={`ml-2 truncate rounded-md px-3 py-0.5 text-[11px] font-black ${dark ? "bg-white/8 text-white/55" : "bg-white text-[#8a938f]"}`}>{label}</span>
      </div>
      <div className={dark ? "text-white" : "text-[#111c22]"}>{children}</div>
    </div>
  )
}

/* ========== 鑫匠工程 demo components ========== */

function XinjiangFront() {
  const [sent, setSent] = useState(false)
  return (
    <Chrome label="qingyuweb.com/demo/xinjiang">
      <div className="bg-[#0c1518] p-4 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-sm font-black text-[#c49a35]">鑫匠工程</span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-black text-white/60">詢價</span>
        </div>
        <div className="mt-4 grid gap-3">
          <input placeholder="姓名" className="w-full rounded-md border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-white outline-none placeholder:text-white/40" />
          <input placeholder="電話 / LINE" className="w-full rounded-md border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-white outline-none placeholder:text-white/40" />
          <input placeholder="工程類型（防水／地坪／泥作）" className="w-full rounded-md border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-white outline-none placeholder:text-white/40" />
          <textarea placeholder="需求描述" className="min-h-20 w-full rounded-md border border-white/10 bg-white/8 px-3 py-2 text-xs font-bold text-white outline-none placeholder:text-white/40" />
          <button
            type="button"
            onClick={() => setSent(true)}
            className="rounded-md bg-[#c49a35] py-2.5 text-xs font-black text-[#0c1518]"
          >{sent ? "✓ 已送出需求" : "送出詢價"}</button>
        </div>
        {sent ? <p className="mt-3 text-center text-[10px] font-bold text-[#8fd6cc]">↳ 已同步到 BuildFlow 後台收件匣</p> : null}
      </div>
    </Chrome>
  )
}

function XinjiangBack() {
  return (
    <Chrome label="BuildFlow · 案件看板" tone="dark">
      <div className="grid grid-cols-4 gap-2 p-3">
        {[["詢價", ["浴室防水 林先生", "屋頂修繕 陳小姐"]], ["報價", ["店面地坪 王老闆"]], ["施工", ["透天翻新 吳先生"]], ["完成", ["磁磚修補 鄭太太"]]].map(([title, cards]) => (
          <div key={title} className="rounded-lg bg-white/5 p-1.5">
            <p className="px-1 pb-1.5 text-[10px] font-black text-white/50">{title}</p>
            <div className="grid gap-1.5">
              {cards.map((c) => <div key={c} className="rounded-md border border-white/10 bg-white/8 px-2 py-1.5 text-[10px] font-black">{c}</div>)}
            </div>
          </div>
        ))}
      </div>
    </Chrome>
  )
}

/* ========== 批發訂貨 demo components ========== */

function WholesaleFront() {
  const items = [
    ["高麗菜 20kg", "$480"],
    ["蘋果 8 箱", "$650"],
    ["有機番茄 10kg", "$900"],
    ["雞蛋 30 入", "$320"],
  ]
  return (
    <Chrome label="shop · 批發客戶端">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between border-b border-[#eee9df] pb-2">
          <span className="text-sm font-black">你的批發商城</span>
          <span className="rounded-full bg-[#111c22] px-3 py-1 text-[10px] font-black text-white">🛒 3</span>
        </div>
        <div className="mt-4 grid gap-2">
          {items.map(([name, price]) => (
            <div key={name} className="flex items-center justify-between rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 py-2">
              <span className="text-xs font-black">{name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#c86434]">{price}</span>
                <span className="rounded-md bg-[#111c22] px-2.5 py-1 text-[10px] font-black text-white">加入</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
}

function WholesaleBack() {
  return (
    <Chrome label="admin · 訂單管理" tone="dark">
      <div className="grid grid-cols-3 gap-2 p-3">
        {[["今日訂單", "18"], ["待出貨", "7"], ["本月營收", "$85,400"]].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-white/10 bg-white/6 p-2">
            <p className="text-[10px] font-bold text-white/45">{l}</p>
            <p className="mt-0.5 text-base font-black text-[#eac46f]">{v}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-3 py-2">
        <div className="grid gap-1.5">
          {[["#1045", "王老闆", "$4,800", "新訂單"], ["#1044", "林小姐", "$2,150", "處理中"], ["#1043", "陳先生", "$6,400", "已出貨"]].map(([id, name, amt, status]) => (
            <div key={id} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md bg-white/5 px-2.5 py-1.5">
              <span className="font-mono text-[10px] font-black text-white/50">{id}</span>
              <span className="text-[11px] font-black">{name} · {amt}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${status === "新訂單" ? "bg-[#3d54c4] text-white" : status === "處理中" ? "bg-[#a4701a] text-white" : "bg-[#2f7a3f] text-white"}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
}

/* ========== RAG demo components ========== */

function RagFront() {
  const [q, setQ] = useState("")
  const [asked, setAsked] = useState(false)
  return (
    <Chrome label="kb · 文件問答">
      <div className="min-h-48 bg-[#0d1a24] p-4 text-white">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <span className="rounded bg-[#8fd6cc]/20 px-2 py-0.5 text-[10px] font-black text-[#8fd6cc]">AI</span>
          <span className="text-xs font-black">知識庫問答</span>
        </div>
        <div className="mt-4 min-h-20 space-y-2">
          {asked ? (
            <div className="rounded-lg bg-[#1a2e39] p-3">
              <p className="text-xs font-bold leading-6 text-white/80">依據「報價規則.md」第 2.1 節 防水工程基本報價包含現場勘查、材料與施工 不含拆除與廢棄物清運</p>
              <div className="mt-2 flex items-center gap-2 text-[10px] font-black text-[#8fd6cc]">
                <span>↳ 引用 (2)</span>
                <span>來源：報價規則.md</span>
              </div>
            </div>
          ) : (
            <p className="text-xs font-bold text-white/40">輸入問題 AI 會回答並附引用來源</p>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="請輸入問題⋯" className="min-h-9 flex-1 rounded-md border border-white/10 bg-white/8 px-3 text-xs font-bold text-white outline-none placeholder:text-white/40" />
          <button type="button" onClick={() => { if (q.trim()) setAsked(true) }} className="min-h-9 rounded-md bg-[#8fd6cc] px-3 text-xs font-black text-[#0d1a24]">送出</button>
        </div>
      </div>
    </Chrome>
  )
}

function RagBack() {
  return (
    <Chrome label="admin · 文件管理" tone="dark">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#eac46f]">已上傳文件</p>
          <span className="rounded-md bg-[#69cf7d]/20 px-2 py-0.5 text-[9px] font-black text-[#8fe0a1]">+ 上傳</span>
        </div>
        <div className="mt-3 grid gap-1.5">
          {[["報價規則.md", "2.1k tokens", "啟用"], ["產品型錄.pdf", "8.7k tokens", "啟用"], ["施工SOP.docx", "3.4k tokens", "草稿"]].map(([name, tokens, status]) => (
            <div key={name} className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md bg-white/5 px-3 py-2">
              <span className="text-[11px] font-black">{name}</span>
              <span className="text-[9px] font-bold text-white/40">{tokens}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-black ${status === "啟用" ? "bg-[#2f7a3f] text-white" : "bg-white/10 text-white/50"}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
}

/* ========== Data exports ========== */

export const xinjiang = {
  seo: {
    path: "/works/xinjiang",
    title: "鑫匠工程案例｜工程網站與 BuildFlow 案件管理｜Qingyu Web Studio",
    description: "鑫匠工程——屏東泥作工程行黑金品牌官網、線上詢價、BuildFlow 案件管理後台一條龍真實上線營運中",
  },
  slug: "xinjiang",
  category: "真實客戶案例",
  title: "鑫匠工程",
  tagline: "40 年老師父經驗的泥作工程行 從品牌官網到詢價後台全部串起來",
  price: "30,000 元起",
  duration: "約 3–4 週",
  forWho: "工程行、服務業、到府安裝型店家",
  problem: {
    title: "客戶只看得到 Pro360",
    desc: "鑫匠工程長期在 Pro360 接案 但缺少自己的品牌入口客戶搜不到官網 案例無法展示 詢價與進度追蹤散在 LINE 和電話裡",
    pain: "沒有統一入口 詢價重複溝通 案件進度靠記憶",
    signs: ["沒有官網", "詢價散在 LINE", "案例無法展示", "進度不好追"],
  },
  solution: {
    title: "品牌官網 + 線上詢價 + 案件後台一條龍",
    desc: "從官網展示服務與案例 到線上詢價表單 再到 BuildFlow 後台收件與案件管理 全部串在一起",
    points: [
      { title: "黑金品牌官網", text: "書法風格深色官網 從此客戶搜得到、看得懂你是誰、做什麼工程" },
      { title: "線上詢價表單", text: "客戶在官網填寫需求 直接進 BuildFlow 後台收件匣 不再散在 LINE" },
      { title: "案件管理後台", text: "詢價一鍵轉案件 接著報價、派工、回報、完工 全部追得到" },
    ],
  },
  result: {
    title: "從詢價到完工 全部追得到",
    desc: "上線後客戶可以直接在官網看到案例與服務 詢價進後台自動整理",
    metrics: [
      { label: "實際上線", value: "2025 年 12 月" },
      { label: "詢價轉案件", value: "一鍵轉換" },
      { label: "案件狀態", value: "詢價到完工" },
      { label: "年資經驗", value: "40 年以上" },
    ],
  },
  demo: {
    title: "從詢價到後台 一次看",
    desc: "左邊是客戶在官網填寫詢價表單 右邊是需求進入 BuildFlow 後台的案件看板",
    Front: XinjiangFront,
    Back: XinjiangBack,
    livePath: "/contractor-site",
  },
  flow: {
    title: "客戶怎麼找你 你怎麼追案件",
    desc: "四個步驟 從官網詢價到完工驗收",
    steps: [
      { title: "客戶詢價", text: "在官網填寫姓名、聯絡方式與工程需求" },
      { title: "進收件匣", text: "需求即時進 BuildFlow 後台 含完整聯絡資訊與需求內容" },
      { title: "轉成案件", text: "一鍵建立案件 開始報價、派工與進度追蹤" },
      { title: "完工驗收", text: "案件狀態持續更新 從詢價到驗收全部在後台" },
    ],
  },
  deliverables: {
    title: "交付內容",
    desc: "品牌官網＋後台系統一次到位",
    items: [
      { title: "品牌官網", items: ["黑金風格視覺設計", "服務介紹區塊", "施工案例展示", "手機版 RWD", "基本 SEO"] },
      { title: "詢價系統", items: ["線上詢價表單", "欄位自訂", "LINE 導入口", "送出確認通知"] },
      { title: "案件後台", items: ["詢價收件匣", "案件看板管理", "狀態流轉", "LINE 回報功能"] },
    ],
  },
  pricing: {
    title: "報價範圍",
    desc: "官網＋詢價＋後台的完整方案實際依範圍調整",
    plans: [
      { name: "品牌官網 + 詢價", price: "18,000 元起", note: "官網設計、詢價表單、基本 SEO" },
      { name: "含案件後台", price: "30,000 元起", note: "收件匣、案件看板、狀態管理" },
      { name: "完整營運版", price: "依需求估價", note: "報價單、派工、通知、多角色權限" },
    ],
  },
  techStack: ["React / Vite", "Tailwind CSS", "Supabase", "Serverless API", "Vercel 部署"],
    liveUrl: "/demo/xinjiang",
    testimonial: {
    quote: "以前客戶看 Pro360 和拿名片 案子進度靠 LINE 記現在有自己的官網和後台 從詢價到完工全部追得到",
    name: "鑫匠工程負責人",
    title: "屏東泥作工程行",
  },
}

export const wholesale = {
  seo: {
    path: "/works/wholesale-ordering",
    title: "批發訂貨系統案例｜專屬價格、出貨管理、月結對帳｜Qingyu Web Studio",
    description: "客戶用手機下單 老闆在後台統一出貨與月結支援分級報價、出貨修量、月結對帳",
  },
  slug: "wholesale-ordering",
  category: "可操作產品",
  title: "批發訂貨系統",
  tagline: "不用 LINE 一筆一筆抄訂單 手機下單 後台出貨 月底對帳",
  price: "35,000 元起",
  duration: "14–25 天",
  forWho: "批發商、食材商、中盤商、想線上收單的店家",
  problem: {
    title: "訂單靠電話 LINE 手寫記",
    desc: "客戶用 LINE 或電話叫貨 老闆手寫記單數量、品項、價格常出錯 月底對帳更是噩夢",
    pain: "漏單、算錯、對帳累 每一關都在消耗時間",
    signs: ["LINE 抄單容易漏", "價格查詢麻煩", "出貨進度不好追", "月結對帳頭痛"],
  },
  solution: {
    title: "客戶專屬手機下單 後台統一管理",
    desc: "從商品目錄、客戶分級報價 到出貨管理與月結對帳 全部線上完成",
    points: [
      { title: "客戶手機下單", text: "看到專屬價格 加入購物車直接送出 不用再傳 LINE" },
      { title: "後台訂單管理", text: "即時看到所有訂單 修改數量、安排出貨、更新狀態" },
      { title: "月結對帳", text: "彙整每月訂單金額 列印明細或匯出報表" },
    ],
  },
  result: {
    title: "訂單正確率提升 對帳時間大幅縮短",
    desc: "從手寫抄單到手機下單 每一筆都有紀錄",
    metrics: [
      { label: "下單方式", value: "手機即時" },
      { label: "出貨管理", value: "狀態一覽" },
      { label: "對帳方式", value: "月結彙總" },
      { label: "價格管理", value: "分級報價" },
    ],
  },
  demo: {
    title: "客戶端下單 + 後台管理一次看",
    desc: "左邊是客戶在手機上看到的商品列表與價格 右邊是你的訂單管理後台",
    Front: WholesaleFront,
    Back: WholesaleBack,
    livePath: "/demo/wholesale-ordering",
  },
  flow: {
    title: "從下單到對帳 全部線上",
    desc: "客戶手機下單 → 你後台出貨 → 月底自動對帳",
    steps: [
      { title: "客戶下單", text: "手機看商品、專屬價格 加入購物車後送出" },
      { title: "後台收單", text: "訂單即時進後台 含客戶、品項、金額" },
      { title: "出貨管理", text: "更新出貨狀態 修改數量 安排配送" },
      { title: "月結對帳", text: "彙總每月訂單 列印明細或匯出 Excel" },
    ],
  },
  deliverables: {
    title: "交付內容",
    desc: "前後台系統一次到位",
    items: [
      { title: "客戶端", items: ["商品列表與分類", "客戶專屬價格", "購物車與結帳", "訂單記錄查詢"] },
      { title: "管理後台", items: ["訂單一覽", "出貨狀態管理", "商品價格編輯", "客戶管理"] },
      { title: "財務功能", items: ["月結彙總報表", "對帳明細匯出", "帳款狀態追蹤"] },
    ],
  },
  pricing: {
    title: "報價範圍",
    desc: "依規模與功能需求報價",
    plans: [
      { name: "基本訂購系統", price: "35,000 元起", note: "商品、購物車、訂單後台" },
      { name: "B2B 批發版", price: "35,000 元起", note: "分級報價、出貨修量、月結對帳" },
      { name: "金流 / 物流串接", price: "依需求估價", note: "綠界 / 藍新 / 超商等" },
    ],
  },
  techStack: ["React / Vite", "Tailwind CSS", "Supabase", "Serverless API", "Vercel 部署"],
}

export const rag = {
  seo: {
    path: "/works/rag-consultant",
    title: "AI 公司知識庫案例｜文件問答與來源引用｜晴宇 Qingyu Web",
    description: "把 SOP、規章、產品文件變成可問答的知識庫 回答附來源 用量與權限完整管理",
  },
  slug: "rag-consultant",
  category: "AI / 技術實驗",
  title: "AI 公司知識庫",
  tagline: "文件不再只是檔案 讓員工與 AI 直接問 直接答 附來源",
  price: "需求估價",
  duration: "依資料量估時",
  forWho: "公司、協會、工廠、有大量內部文件的組織",
  problem: {
    title: "文件很多 答案找不到",
    desc: "SOP、規章、產品型錄散在各處新進員工與客服每天重複問同樣的問題 老員工花時間回答 文件更新也沒人知道",
    pain: "重複回答、文件版本混亂、新人訓練慢",
    signs: ["文件散各處", "答案靠老人", "新人上手慢", "更新沒人知"],
  },
  solution: {
    title: "把文件變成可問答的知識庫",
    desc: "上傳文件 → AI 自動切分索引 → 問問題時附引用來源回答",
    points: [
      { title: "文件上傳與索引", text: "支援 PDF、Word、TXT 上傳後自動切分、嵌入、建立索引" },
      { title: "附來源問答", text: "問問題時 AI 搜尋相關段落 回答時顯示引用來源與相關度" },
      { title: "用量與權限管理", text: "每租戶 Token 用量統計、Rate Limit 保護、文件版本管理" },
    ],
  },
  result: {
    title: "從翻文件到直接問 效率提升",
    desc: "新人、客服、員工直接問 AI 答案有來源可驗證",
    metrics: [
      { label: "文件格式", value: "PDF / Word / TXT" },
      { label: "回答模式", value: "附引用來源" },
      { label: "租戶隔離", value: "多租戶支援" },
      { label: "文件版本", value: "版本管理" },
    ],
  },
  demo: {
    title: "文件問答 + 後台管理一次看",
    desc: "左邊是 AI 問答介面 右邊是文件管理後台",
    Front: RagFront,
    Back: RagBack,
    livePath: "/demo/rag-consultant",
  },
  flow: {
    title: "從上傳文件到 AI 回答",
    desc: "四個步驟完成知識庫建置",
    steps: [
      { title: "上傳文件", text: "上傳公司的 PDF、Word、TXT 等文件" },
      { title: "自動索引", text: "系統自動切分段落、embedding、建立搜尋索引" },
      { title: "提問回答", text: "員工或客服問問題 AI 搜尋相關內容並回答" },
      { title: "驗證來源", text: "每則回答附引用出處 可點擊查看原文" },
    ],
  },
  deliverables: {
    title: "交付內容",
    desc: "完整公司知識庫包含查詢畫面 來源引用與管理功能",
    items: [
      { title: "問答介面", items: ["嵌入網站的對話元件", "多輪對話支援", "引用來源顯示", "相關度評分"] },
      { title: "管理後台", items: ["文件上傳與管理", "版本控制與還原", "Token 用量統計", "Rate Limit 設定"] },
      { title: "技術支援", items: ["API 端點", "Widget 嵌入碼", "權限與租戶管理", "部署與維運文件"] },
    ],
  },
  pricing: {
    title: "報價範圍",
    desc: "依資料量與功能需求報價",
    plans: [
      { name: "基礎知識庫", price: "20,000 元起", note: "文件問答、引用來源、單一租戶" },
      { name: "企業版", price: "50,000 元起", note: "多租戶、權限管理、用量統計" },
      { name: "客製整合", price: "依需求估價", note: "現有系統串接、自訂流程、私有部署" },
    ],
  },
  techStack: ["React / Vite", "Tailwind CSS", "Python RAG Engine", "OpenAI API", "Supabase", "Vercel 部署"],
}
