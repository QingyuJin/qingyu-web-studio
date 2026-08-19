export const businessProblems = [
  {
    problem: "LINE 接單容易漏單",
    solution: "訂貨與客戶管理系統",
    detail: "訂單 客戶 專屬價格 出貨與月結集中管理",
    demoSlug: "wholesale-ordering",
  },
  {
    problem: "Excel 管理客戶與訂單",
    solution: "CRM 與 Management Dashboard",
    detail: "角色 狀態 任務與營運數據都有可追蹤流程",
    demoSlug: "buildflow",
  },
  {
    problem: "客服重複回答相同問題",
    solution: "LINE Bot 與 AI Assistant",
    detail: "常見問題自動處理 需要真人時再交接",
    demoSlug: "linebot",
  },
  {
    problem: "公司文件很多但找不到資料",
    solution: "RAG Knowledge System",
    detail: "文件可搜尋 答案附來源 並保留管理與權限",
    demoSlug: "rag-consultant",
  },
  {
    problem: "廣告有流量卻沒有詢問",
    solution: "Landing Page 與 Conversion Tracking",
    detail: "對應訴求的頁面搭配 GA4 GTM 與轉換事件",
    href: "/seo-ads",
  },
  {
    problem: "品牌很好但官網沒有價值感",
    solution: "Premium Brand Website",
    detail: "品牌視覺 手機體驗與內容層級一起整理",
    demoSlug: "luluface",
  },
]

export const architectureLayers = [
  { name: "Experience", items: ["Website", "Mobile Web", "Dashboard"] },
  { name: "Business Logic", items: ["Members", "Orders", "Booking", "Permissions", "Workflow"] },
  { name: "Integrations", items: ["LINE", "Payments", "Email", "Third party APIs", "GA4 GTM"] },
  { name: "Data", items: ["Database", "Documents", "Search", "Analytics"] },
  { name: "AI", items: ["RAG", "AI Assistant", "Automation"] },
]

export const capabilityGroups = [
  { name: "LINE", items: ["Messaging API", "LIFF", "Notification", "Member Binding"] },
  { name: "Growth", items: ["Technical SEO", "Landing Pages", "GA4", "GTM", "Meta Pixel"] },
  { name: "AI", items: ["RAG", "Search", "AI Assistant", "Workflow"] },
  { name: "Integrations", items: ["REST API", "Third party Services", "Database", "Business Data"] },
]

export const collaborationModels = [
  {
    name: "Business",
    title: "企業直接委託",
    text: "從需求整理到 UI 開發 上線與後續調整",
    items: ["Discovery", "Product Design", "Development", "Launch"],
    type: "business",
  },
  {
    name: "Agency Creative Marketing",
    title: "代理商與創意團隊",
    text: "你維持客戶關係與策略 晴宇負責技術實作與交付",
    items: ["White label", "Production Pricing", "Overflow Development", "Project Support"],
    type: "agency",
  },
  {
    name: "Consultants",
    title: "顧問與數位轉型夥伴",
    text: "顧問負責企業診斷與規劃 晴宇負責系統技術實作",
    items: ["Technical Feasibility", "System Build", "Integration", "Delivery"],
    type: "consultant",
  },
]

export const studioProcess = [
  ["01", "Understand", "理解目前怎麼工作"],
  ["02", "Define", "找出真正需要解決的問題"],
  ["03", "Design", "確認流程 介面與資訊架構"],
  ["04", "Build", "完成前端 後端 資料與整合"],
  ["05", "Launch Improve", "部署 測試 追蹤與後續調整"],
]

export const primaryPricing = [
  {
    name: "Web Systems",
    price: "NT$35,000 起",
    fit: "需要管理與營運流程",
    items: ["Management Dashboard", "Orders", "Members", "Booking", "Workflow", "API"],
    casePath: "/works/wholesale-ordering",
  },
  {
    name: "Business Website",
    price: "NT$25,000 起",
    fit: "企業品牌與正式數位門面",
    items: ["Brand Direction", "RWD", "Content", "SEO", "Inquiry"],
    casePath: "/works/xinjiang",
  },
  {
    name: "Landing Page",
    price: "NT$12,000 起",
    fit: "單一服務 活動或轉換目標",
    items: ["Message", "Mobile UX", "CTA", "Tracking", "Launch"],
    casePath: "/works/product-landing-page",
  },
  {
    name: "Development Support",
    price: "Custom Quote",
    fit: "代理商協作與既有專案支援",
    items: ["White label", "Existing Projects", "API", "Urgent Support"],
    casePath: "/contact?type=agency",
  },
]
