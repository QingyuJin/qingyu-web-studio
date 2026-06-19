export const siteUrl = "https://www.qingyuweb.com"

export const contact = {
  email: "a0988874324@gmail.com",
  line: "LINE 連結準備中",
  github: "https://github.com/QingyuJin/qingyu-web-studio",
}

export const seo = {
  home: {
    path: "/",
    title: "Qingyu Web Studio｜台灣網站製作、AI 工具與 LINE Bot 開發",
    description:
      "協助台灣個人品牌、小型店家、工作室與學生製作網站、作品集、AI 工具、LINE Bot、API 串接與簡易管理系統。",
  },
  works: {
    path: "/works",
    title: "作品案例｜網站、AI 工具、LINE Bot 與後台系統｜Qingyu Web Studio",
    description: "查看 Qingyu Web Studio 的精選作品，包含 AI 網站健檢、LINE Bot、工程案件管理系統與工作室主站。",
  },
  services: {
    path: "/services",
    title: "服務項目｜網站製作、AI 工具、LINE Bot 與 API 串接｜Qingyu Web Studio",
    description: "提供品牌網站、作品集網站、小型系統、AI 工具、LINE Bot 與 API 串接服務。",
  },
  pricing: {
    path: "/pricing",
    title: "價格方案｜Qingyu Web Studio",
    description: "小型網站可從基礎方案開始，系統與 AI 工具依需求估價。",
  },
  audit: {
    path: "/free-audit",
    title: "免費網站健檢｜Qingyu Web Studio",
    description: "協助檢查手機版、首頁文案、CTA、SEO、版面信任感與網站轉換問題。",
  },
  contact: {
    path: "/contact",
    title: "聯絡 Qingyu Web Studio｜網站製作、AI 工具與 LINE Bot 諮詢",
    description: "聯絡 Qingyu Web Studio，討論網站、作品集、AI 工具、LINE Bot、API 串接與簡易管理系統。",
  },
}

export const serviceCategories = [
  ["品牌網站", "讓服務、作品與聯絡方式清楚被看懂。"],
  ["作品集網站", "整理專題、履歷、GitHub 與作品脈絡。"],
  ["小型系統", "把表單、列表、搜尋、狀態與後台流程做成可操作 Demo。"],
  ["AI 工具", "把圖片、PDF、CSV 或文字流程包成好懂的前端工具。"],
  ["LINE Bot / API 串接", "把 LINE 訊息、表單、Webhook 與資料流程接起來。"],
]

export const techStack = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Vercel",
  "Supabase",
  "OpenAI API",
  "LINE Messaging API",
  "SEO",
  "RWD",
  "Dashboard UI",
]

export const processSteps = [
  ["01", "釐清需求", "先確認目標客群、網站用途與最重要的 CTA。"],
  ["02", "整理內容", "把服務、作品、案例與聯絡方式整理成清楚架構。"],
  ["03", "設計與開發", "製作手機友善版面、互動元件與必要資料流程。"],
  ["04", "部署上線", "Vercel 部署、SEO 基礎、Open Graph 與後續調整。"],
]

export const audience = ["個人品牌", "小型店家", "工作室", "學生", "新創", "工程服務業"]

export const pricing = [
  ["基礎", "NT$3,000～5,000", "適合作品集、一頁式網站、活動頁與簡單形象頁。"],
  ["標準", "NT$6,000～12,000", "適合品牌網站、店家網站、服務頁與需要完整 CTA 的網站。"],
  ["進階", "NT$15,000 起", "適合小型系統、AI 工具、LINE Bot、API 串接與後台 Demo。"],
]

export const projects = [
  {
    slug: "ai-audit",
    title: "AI 網站健檢工具 Demo",
    category: "AI 工具",
    summary: "輸入網站資訊後，整理手機版、CTA、SEO 與信任感檢查建議。",
    problem: "很多小型網站不知道問題在哪，只覺得不夠專業或客人不會聯絡。",
    solution: "把網站檢查拆成手機版、文案、CTA、SEO 與信任感幾個明確面向，產出可執行建議。",
    features: ["健檢表單", "規則式評分", "SEO 檢查", "CTA 建議", "報告摘要"],
    architecture: ["React UI", "Rule-based analyzer", "Report cards", "Future OpenAI API"],
    visuals: ["Audit Score", "Issue List", "Action Plan"],
    mobile: "手機版以一題一題填寫與卡片式報告為主，不把報告塞成大表格。",
    future: ["接 OpenAI API 產生更完整建議", "儲存健檢紀錄", "Email 寄送報告"],
  },
  {
    slug: "linebot",
    title: "LINE Bot 詢價 / 預約 Demo",
    category: "LINE Bot",
    summary: "模擬客戶在 LINE 詢問、留下需求，後台整理成可追蹤紀錄。",
    problem: "客戶需求常散在 LINE 訊息裡，店家很難追蹤誰問過、下一步是什麼。",
    solution: "用 LINE Bot 收集需求與關鍵欄位，再透過 Webhook 同步成後台資料。",
    features: ["LINE 對話流程", "Webhook 接收", "需求解析", "狀態標記", "後台 Inbox"],
    architecture: ["LINE Messaging API", "Vercel API", "Supabase-ready", "Dashboard UI"],
    visuals: ["Chat Preview", "Parsed Result", "Inbox Board"],
    mobile: "LINE 情境本身以手機為主，後台則用卡片和分頁避免小螢幕爆版。",
    future: ["正式 LINE webhook", "通知店家", "客戶預約狀態查詢"],
  },
  {
    slug: "xinjiang",
    title: "工程行案件管理系統 Demo",
    category: "後台系統",
    summary: "工程行網站與後台概念案例，將 LINE 報價、施工回報與案件狀態整理成流程。",
    problem: "工程服務常把照片、報價、施工回報與驗收紀錄散在 LINE，案件一多就難追。",
    solution: "把工程網站、估價入口與 BuildFlow 案件管理後台整理成一套示範流程。",
    features: ["案件列表", "報價流程", "每日回報", "驗收請款", "保固狀態", "同步 Timeline"],
    architecture: ["React", "Tailwind CSS", "Vercel", "Supabase concept", "LINE Bot concept"],
    visuals: ["Case Board", "Quote Status", "Flow Overview"],
    mobile: "手機版以案件卡、流程節點和重要 CTA 優先，不讓工程資訊變成密密麻麻表格。",
    future: ["Supabase 資料庫", "LINE 通知", "報價單 PDF", "客戶進度查詢"],
  },
  {
    slug: "studio",
    title: "Qingyu Web Studio 主站",
    category: "品牌網站",
    summary: "為個人工作室整理定位、服務、作品、技術力與聯絡 CTA 的主站。",
    problem: "單純作品集容易像履歷，客戶不一定看得懂可以委託什麼。",
    solution: "用短標題、清楚服務分類、精選作品與聯絡 CTA，把技術作品轉成可接案的網站。",
    features: ["服務分類", "作品入口", "技術能力", "價格摘要", "聯絡 CTA"],
    architecture: ["React", "Vite", "Tailwind CSS", "React Router", "SEO"],
    visuals: ["Home Layout", "Work Cards", "Contact Section"],
    mobile: "首頁第一屏保留標題、描述與兩個 CTA，避免在手機上過度壓迫。",
    future: ["文章系統", "案例詳情擴充", "表單收件"],
  },
]
