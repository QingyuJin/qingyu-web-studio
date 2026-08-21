import WorkDetailTemplate from "./WorkDetailTemplate"

const linebot = {
  seo: { path: "/works/line-bot", title: "LINE 詢價助手案例｜晴宇 Qingyu Web", description: "LINE 自動追問並在後台建立詢價資料" },
  category: "LINE 詢價助手",
  title: "LINE 詢價助手",
  tagline: "客戶直接選擇問題 系統完成追問並把資料送進後台",
  price: "需求估價",
  problem: { desc: "減少重複回覆與漏追蹤", signs: ["常見問題每天重複回答", "訊息一多就容易漏掉", "需求內容沒有固定格式", "老闆難以安排後續聯絡"] },
  flow: { steps: [{ title: "客戶提問", text: "從常見問題開始詢問" }, { title: "系統追問", text: "依回答收集需求規模" }, { title: "後台建檔", text: "整理成可以跟進的詢價資料" }] },
  deliverables: { items: [{ title: "客戶端", items: ["常見問題選單", "自動追問", "完成通知"] }, { title: "管理端", items: ["詢價清單", "需求摘要", "跟進狀態"] }, { title: "串接", items: ["LINE 官方帳號", "通知規則", "資料匯出"] }] },
  demo: { livePath: "/demo/linebot" },
}

export default function WorkDetailPageLinebot() { return <WorkDetailTemplate work={linebot} /> }
