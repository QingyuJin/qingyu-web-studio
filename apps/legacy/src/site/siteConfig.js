export const siteUrl = "https://www.qingyuweb.com"

import studioContact from "./studioContact.json" with { type: "json" }

export const contact = {
  ...studioContact,
  lineUrl: `https://line.me/R/ti/p/~${studioContact.lineId}`,
  line: "傳產業、需求、預算、時程即可",
  github: "https://github.com/QingyuJin/qingyu-web-studio",
}

export const seo = {
  home: {
    path: "/",
    title: "企業 Web 系統與高質感網站開發｜晴宇 Qingyu Web",
    description:
      "晴宇 Qingyu Web 為台灣企業打造管理後台 Web App 電商網站 AI 知識庫 LINE 與 API 串接及高質感品牌網站",
  },
  works: {
    path: "/works",
    title: "企業系統與網站作品｜晴宇 Qingyu Web",
    description: "瀏覽企業管理系統 電商網站 AI 知識庫 LINE 串接與成效工具並直接操作展示",
  },
  services: {
    path: "/services",
    title: "企業 Web 系統與網站開發服務｜晴宇 Qingyu Web",
    description:
      "企業管理系統 品牌網站 Landing Page LINE 串接 AI 公司知識庫 SEO 與成效追蹤的完整開發服務",
  },
  pricing: {
    path: "/pricing",
    title: "估價方式｜網站修改、一頁式網站與自動化｜Qingyu Web",
    description: "先確認需求、素材與預算，再討論合適的做法與個別報價。",
  },
  audit: {
    path: "/free-audit",
    title: "免費網站健檢｜手機體驗、SEO 與轉換檢查｜Qingyu Web Studio",
    description: "檢查網站手機版、速度、CTA、SEO、內容信任感與廣告承接路徑，整理下一步優化方向",
  },
  contact: {
    path: "/contact",
    title: "企業系統與網站專案諮詢｜晴宇 Qingyu Web",
    description: "留下需求類型 產業 參考案例 預算與時程取得系統或網站的開發建議與估價",
  },
  planner: {
    path: "/tools/project-planner",
    title: "網站需求診斷工具｜Qingyu Web Studio",
    description: "快速判斷適合的方向",
  },
  websiteRescue: {
    path: "/tools/website-rescue",
    title: "網站救援互動成品｜網站健檢與優化展示｜Qingyu Web Studio",
    description: "點選改善項目 看網站狀態變化",
  },
  lineBotMission: {
    path: "/tools/linebot-mission",
    title: "LINE Bot 接待模擬｜互動式 LINE Bot 成品｜Qingyu Web Studio",
    description: "體驗 LINE Bot 接待與後台同步",
  },
}
