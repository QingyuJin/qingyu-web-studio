export type ProjectStatus = "Live" | "Training" | "Design" | "Review"

export type ProjectCategory = "All" | "AI Tools" | "Web Systems" | "Dashboards" | "Experiments"

export type Project = {
  id: string
  name: string
  category: Exclude<ProjectCategory, "All">
  status: ProjectStatus
  progress: number
  accuracy: number
  views: string
  owner: string
  tone: string
  summary: string
  stack: string[]
  outcomes: Array<[string, string]>
  nextSteps: string[]
  github: string
  demo: string
  accent: string
}

export const categories: ProjectCategory[] = ["All", "AI Tools", "Web Systems", "Dashboards", "Experiments"]

export const projects: Project[] = [
  {
    id: "audit",
    name: "AI Website Audit",
    category: "AI Tools",
    status: "Live",
    progress: 92,
    accuracy: 88,
    views: "1.8k",
    owner: "Growth",
    tone: "SEO / CTA / Copy",
    summary: "輸入網站描述後，整理 CTA、SEO、信任感與下一步建議。",
    stack: ["React", "OpenAI API", "Prompt Flow", "Report UI"],
    outcomes: [
      ["Report score", "82"],
      ["Sections", "6"],
      ["Mode", "Demo + API"],
    ],
    nextSteps: ["加入產業模板", "接 Search Console", "匯出 PDF 報告"],
    github: "github.com/qingyu/ai-audit",
    demo: "/works/ai-audit#demo",
    accent: "#de5b2c",
  },
  {
    id: "linebot",
    name: "LINE Bot Reception",
    category: "Web Systems",
    status: "Training",
    progress: 78,
    accuracy: 91,
    views: "942",
    owner: "Client Ops",
    tone: "LINE / Webhook",
    summary: "把 LINE 訊息分類成需求，並同步到後台案件面板。",
    stack: ["LINE API", "Webhook", "Vercel Function", "Dashboard"],
    outcomes: [
      ["Auto handled", "74%"],
      ["Cases", "18"],
      ["Risk", "Low"],
    ],
    nextSteps: ["加入人工接手", "串接 Supabase", "建立通知紀錄"],
    github: "github.com/qingyu/linebot-demo",
    demo: "/tools/linebot-mission#demo",
    accent: "#b94722",
  },
  {
    id: "buildflow",
    name: "BuildFlow Case OS",
    category: "Dashboards",
    status: "Live",
    progress: 86,
    accuracy: 95,
    views: "2.4k",
    owner: "Field Ops",
    tone: "Cases / Quote / LINE",
    summary: "工程案件、照片、報價、施工狀態與 LINE 回報集中管理。",
    stack: ["React", "Supabase-ready", "State Workflow", "Quote Preview"],
    outcomes: [
      ["Cases", "24"],
      ["Quotes", "9"],
      ["Sync", "Ready"],
    ],
    nextSteps: ["接正式資料庫", "PDF 報價單", "LINE 查詢入口"],
    github: "github.com/qingyu/buildflow",
    demo: "/works/buildflow#demo",
    accent: "#c85a31",
  },
  {
    id: "stock",
    name: "StockTrendLab",
    category: "AI Tools",
    status: "Review",
    progress: 69,
    accuracy: 79,
    views: "678",
    owner: "ML Lab",
    tone: "CSV / ML / Chart",
    summary: "CSV 匯入後產生欄位摘要、模型比較與報告結論。",
    stack: ["CSV Parser", "Rule Engine", "SVG Chart", "Report UI"],
    outcomes: [
      ["Best accuracy", "79.26%"],
      ["Rows", "120"],
      ["Gap", "Watch"],
    ],
    nextSteps: ["加入資料清理建議", "模型版本比較", "匯出報告"],
    github: "github.com/qingyu/stocktrendlab",
    demo: "/works/api-automation#demo",
    accent: "#e17a32",
  },
  {
    id: "rescue",
    name: "Website Rescue",
    category: "Experiments",
    status: "Design",
    progress: 64,
    accuracy: 84,
    views: "1.1k",
    owner: "UX Lab",
    tone: "Before / After",
    summary: "點選改善項目，查看網站 CTA、SEO、手機版與信任感變化。",
    stack: ["React", "State Machine", "Scoring", "UX Preview"],
    outcomes: [
      ["Start score", "42"],
      ["Fixes", "6"],
      ["Final", "90+"],
    ],
    nextSteps: ["加入更多產業", "保存改善紀錄", "串需求診斷"],
    github: "github.com/qingyu/website-rescue",
    demo: "/tools/website-rescue#demo",
    accent: "#bf4a25",
  },
]

export const activity = [
  ["09:42", "BuildFlow 報價 preview 已更新"],
  ["10:18", "AI Audit 產生新的 SEO 建議"],
  ["11:05", "LINE Bot 新增一筆需求分類"],
  ["13:20", "StockTrendLab 完成 accuracy comparison"],
]
