import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputRoot = path.join(projectRoot, "dist")
const template = await readFile(path.join(outputRoot, "index.html"), "utf8")
const siteUrl = "https://www.qingyuweb.com"

const routes = [
  ["/services", "網站設計、SEO、電商與系統整合服務｜Qingyu Web Studio", "品牌網站、電商建置、SEO、廣告落地頁、LINE Bot、AI 工具、API 與客製後台的一站式服務"],
  ["/seo-ads", "SEO 與 Google Ads 廣告落地頁｜Qingyu Web Studio", "整合技術 SEO、關鍵字與內容架構、Google Ads／Meta Ads 落地頁、GA4 與廣告轉換追蹤"],
  ["/works", "網站、電商與客製系統作品案例｜Qingyu Web Studio", "瀏覽品牌網站、電商、廣告視覺、LINE Bot、接單後台與 AI 系統的可操作作品與完整案例"],
  ["/pricing", "網站設計、SEO 與客製系統參考價格｜Qingyu Web Studio", "網站、電商、SEO、廣告落地頁、LINE Bot 與客製後台參考價格"],
  ["/free-audit", "免費網站健檢｜手機體驗、SEO 與轉換檢查｜Qingyu Web Studio", "檢查網站手機版、速度、CTA、SEO、內容信任感與廣告承接路徑"],
  ["/contact", "網站、SEO 與數位成長專案諮詢｜Qingyu Web Studio", "留下產業、目前網站、目標、預算與時程取得適合的做法與估價"],
  ["/ai-transformation", "中小企業 AI 數位轉型實作服務｜Qingyu Web Studio", "企業網站、LINE 接待、訂貨流程、AI 知識庫與客製後台的數位轉型實作方案"],
  ["/onepage", "一頁式網站設計與六大產業範本｜Qingyu Web Studio", "8–10 個重點區塊把品牌、服務與預約集中在同一頁瀏覽美容、牙醫、餐飲、室內工程、精密製造與 SaaS 六套完整範本", "/assets/onepage/beauty/beauty-hero.webp", "ProfessionalService"],
  ["/onepage/beauty", "美容保養一頁式網站範本｜Qingyu Web Studio", "美容工作室與保養品牌一頁式網站提案包含肌膚需求、療程、產品成分、服務流程、顧客感受與 LINE 預約", "/assets/onepage/beauty/beauty-hero.webp", "BeautySalon"],
  ["/onepage/clinic", "牙醫診所一頁式網站範本｜Qingyu Web Studio", "牙醫診所一頁式網站提案包含醫師團隊、診療項目、諮詢規劃、設備環境、看診流程、FAQ、交通資訊與預約掛號", "/assets/onepage/clinic/clinic-hero.webp", "Dentist"],
  ["/onepage/restaurant", "精品餐飲一頁式網站範本｜Qingyu Web Studio", "餐廳與私廚一頁式網站提案包含主廚故事、招牌餐點、季節限定、食材職人、用餐空間、顧客感受與門市訂位", "/assets/onepage/restaurant/restaurant-hero.webp", "Restaurant"],
  ["/onepage/construction", "室內設計與工程一頁式網站範本｜Qingyu Web Studio", "室內設計、工程行與統包團隊一頁式網站提案包含服務、現勘、施工流程、工法、現場、案例、保固與免費估價", "/assets/onepage/construction/construction-hero.webp", "ProfessionalService"],
  ["/onepage/manufacturing", "精密製造與金屬加工一頁式網站範本｜Qingyu Web Studio", "金屬加工與精密製造一頁式網站提案包含加工能力、產品類別、CNC 設備、生產流程、精密量測、品質管理與詢價表單", "/assets/onepage/manufacturing/manufacturing-hero.webp", "ProfessionalService"],
  ["/onepage/saas", "SaaS、AI 與 ERP 一頁式網站範本｜Qingyu Web Studio", "SaaS、AI 與 ERP 一頁式網站提案包含互動 Dashboard、核心功能、自動化流程、系統整合、資安架構、方案比較與試用申請", "/assets/onepage/saas/saas-hero.webp", "SoftwareApplication"],
  ["/tools/project-planner", "網站需求診斷工具｜Qingyu Web Studio", "快速整理網站、SEO、LINE Bot、電商或客製系統的需求方向"],
  ["/tools/website-rescue", "網站健檢與優化互動展示｜Qingyu Web Studio", "互動檢查網站手機體驗、CTA、SEO 與信任內容查看改善前後差異"],
  ["/tools/linebot-mission", "LINE Bot 接待與後台同步展示｜Qingyu Web Studio", "體驗 LINE Bot 自動接待、需求追問與後台同步流程"],
  ["/works/beauty-shopline-preview", "LULUFACE 美容品牌電商提案｜Qingyu Web Studio", "美容品牌、商品、服務、培訓與手機購物流程的完整品牌電商設計"],
  ["/works/ecommerce-platform-redesign", "Shopify、MeepShop 平台電商建置與優化｜Qingyu Web Studio", "平台電商首頁、分類、商品頁、手機購物、SEO 與成效追蹤優化展示"],
  ["/works/product-landing-page", "電商商品銷售頁設計案例｜Qingyu Web Studio", "商品賣點、見證、方案與 CTA 集中成交的行動版銷售頁展示"],
  ["/works/company-landing", "公司一頁式品牌官網案例｜Qingyu Web Studio", "一頁整理品牌、服務、案例、流程與聯絡 CTA 的公司網站展示"],
  ["/works/biomed-brand-site", "生醫品牌網站設計案例｜Qingyu Web Studio", "品牌故事、專業內容、案例與講座活動的生醫品牌網站展示"],
  ["/works/xinjiang", "鑫匠工程網站與接案系統案例｜Qingyu Web Studio", "工程品牌官網、線上詢價與案件管理流程的完整案例"],
  ["/works/wholesale-ordering", "批發訂貨與月結系統展示｜Qingyu Web Studio", "客戶專屬價格下單、出貨狀態、月結與對帳的批發訂貨系統"],
  ["/works/restaurant-ordering", "餐飲桌邊點餐與廚房控單系統｜Qingyu Web Studio", "手機桌邊點餐、廚房即時出單、桌況與營收管理的可操作展示"],
  ["/works/rag-consultant", "RAG 企業知識庫與文件問答展示｜Qingyu Web Studio", "附來源引用的企業文件問答、用量控管與版本管理系統展示"],
  ["/works/analytics-dashboard", "網站成效追蹤與曝光管理後台｜Qingyu Web Studio", "整合瀏覽、搜尋曝光、CTA 點擊、表單與月報的成效後台展示"],
  ["/works/assessment-system", "互動測驗與自動計分系統｜Qingyu Web Studio", "線上作答、自動計分、結果報告與填答紀錄的互動系統"],
  ["/works/line-bot", "LINE Bot 自動接待與需求整理｜Qingyu Web Studio", "LINE 自動回覆、需求追問、Webhook 與後台案件同步展示"],
  ["/works/notion-brand-landing", "個人品牌落地頁設計案例｜Qingyu Web Studio", "個人品牌服務、資源內容與 LINE 名單導流的落地頁展示"],
  ["/works/ai-audit", "AI 網站健檢工具展示｜Qingyu Web Studio", "以 AI 檢查網站 CTA、SEO、手機體驗與信任內容的互動工具"],
  ["/works/api-automation", "表單、API 與通知自動化展示｜Qingyu Web Studio", "表單送出、資料檢查、API、通知與後台追蹤的自動化流程"],
]

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

function replaceAttribute(html, selector, value) {
  const escaped = escapeHtml(value)
  const expression = new RegExp(`(<meta ${selector} content=")[^"]*(" \/>)`)
  return html.replace(expression, `$1${escaped}$2`)
}

function buildPageHtml(route, title, description, robots = "index, follow, max-image-preview:large", imagePath = "/og.png", entityType = "") {
  const canonical = `${siteUrl}${route}`
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    inLanguage: "zh-Hant-TW",
    isPartOf: { "@type": "WebSite", name: "Qingyu Web Studio", url: `${siteUrl}/` },
  }
  const pageData = entityType
    ? {
        "@context": "https://schema.org",
        "@graph": [
          webPage,
          {
            "@type": entityType,
            name: `${title.split("｜")[0]}（產業提案範本）`,
            url: canonical,
            description: `${description}本頁為產業提案範本非實際營業單位或客戶實績`,
            additionalProperty: { "@type": "PropertyValue", name: "資料性質", value: "產業提案範本" },
            ...(entityType === "SoftwareApplication" ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" } : {}),
          },
        ],
      }
    : webPage
  const image = `${siteUrl}${imagePath}`

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = replaceAttribute(html, 'name="description"', description)
  html = replaceAttribute(html, 'name="robots"', robots)
  html = replaceAttribute(html, 'name="googlebot"', robots)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  html = html.replace(/(<link rel="alternate" hreflang="zh-Hant-TW" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  html = replaceAttribute(html, 'property="og:title"', title)
  html = replaceAttribute(html, 'property="og:description"', description)
  html = replaceAttribute(html, 'property="og:url"', canonical)
  html = replaceAttribute(html, 'property="og:image"', image)
  html = replaceAttribute(html, 'property="og:image:alt"', `${title.split("｜")[0]}預覽`)
  html = replaceAttribute(html, 'name="twitter:title"', title)
  html = replaceAttribute(html, 'name="twitter:description"', description)
  html = replaceAttribute(html, 'name="twitter:image"', image)
  html = html.replace("</head>", `    <script type="application/ld+json">${JSON.stringify(pageData).replaceAll("<", "\\u003c")}</script>\n  </head>`)
  return html
}

for (const [route, title, description, imagePath, entityType] of routes) {
  const destination = path.join(outputRoot, route.replace(/^\//, ""), "index.html")
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, buildPageHtml(route, title, description, undefined, imagePath, entityType), "utf8")
}

await writeFile(
  path.join(outputRoot, "404.html"),
  buildPageHtml("/404", "找不到頁面｜Qingyu Web Studio", "你要找的頁面不存在", "noindex, nofollow, noarchive"),
  "utf8"
)

console.log(`Generated static metadata for ${routes.length} public routes.`)
