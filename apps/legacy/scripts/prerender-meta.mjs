import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputRoot = path.join(projectRoot, "dist")
const template = await readFile(path.join(outputRoot, "index.html"), "utf8")
const siteUrl = "https://www.qingyuweb.com"
const brandName = "晴宇 Qingyu Web"

const routes = [
  ["/services", "企業 Web 系統與網站開發服務｜晴宇 Qingyu Web", "企業管理系統 高質感網站 Landing Page LINE API AI RAG SEO 與成效追蹤的完整開發服務"],
  ["/seo-ads", "SEO 與 Google Ads 廣告落地頁｜Qingyu Web Studio", "整合技術 SEO、關鍵字與內容架構、Google Ads／Meta Ads 落地頁、GA4 與廣告轉換追蹤"],
  ["/works", "客戶案例與可操作產品｜晴宇 Qingyu Web", "正式客戶專案、可操作系統與概念作品，清楚標示每個案例目前的完成狀態。"],
  ["/about", "關於晴宇｜晴宇 Qingyu Web", "認識晴宇 Qingyu Web 個人開發工作室的工作方式 合作範圍與交付原則"],
  ["/collaboration", "技術開發協作｜晴宇 Qingyu Web", "提供代理商 顧問 設計團隊與企業內部團隊的前後端開發 API 串接 測試與交付協作"],
  ["/showcase", "產業網站展示空間｜晴宇 Qingyu Web", "瀏覽美容 診所 餐飲 工程 製造與軟體服務的一頁式網站提案 看見清楚訊息 手機動線與轉換入口", "/assets/onepage/beauty/beauty-hero.webp", "ProfessionalService"],
  ["/pricing", "企業系統與網站開發價格｜晴宇 Qingyu Web", "企業 Web 系統 品牌網站 Landing Page 及客製開發支援的專案起始價格與合作範圍"],
  ["/free-audit", "免費網站健檢｜手機體驗、SEO 與轉換檢查｜Qingyu Web Studio", "檢查網站手機版、速度、CTA、SEO、內容信任感與廣告承接路徑"],
  ["/contact", "企業系統與網站專案諮詢｜晴宇 Qingyu Web", "留下需求類型 產業 參考案例 預算與時程取得系統或網站的開發建議與估價"],
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
  [
    "/works/xinjiang",
    "鑫匠｜屏東泥作、水泥、磁磚、油漆裝修工程",
    "鑫匠工程提供屏東與南部地區泥作、水泥施工、磁磚安裝修補、洗石子、油漆、拆除、裝修與增建服務，40 年老師父經驗，到場評估後實在報價。",
    "/xinjiang/project-photos/335941_0.jpg",
    "",
    {
      canonical: "https://xinjiang-website.vercel.app/",
      robots: "noindex, follow, noarchive",
      siteName: "鑫匠工程",
      imageWidth: 1280,
      imageHeight: 960,
      preserveText: true,
      xinjiang: true,
    },
  ],
  ["/works/wholesale-ordering", "批發訂貨與月結系統展示｜Qingyu Web Studio", "客戶專屬價格下單、出貨狀態、月結與對帳的批發訂貨系統"],
  ["/works/floworder", "FlowOrder 智慧訂單中心｜晴宇 Qingyu Web", "把 LINE 與文字訊息訂單轉成可確認、可追蹤、可稽核的訂單與庫存流程。", "/floworder-og.png", "SoftwareApplication", { productionProduct: true }],
  ["/works/restaurant-ordering", "餐飲桌邊點餐與廚房控單系統｜Qingyu Web Studio", "手機桌邊點餐、廚房即時出單、桌況與營收管理的可操作展示"],
  ["/works/rag-consultant", "AI 公司知識庫與文件問答展示｜Qingyu Web Studio", "直接詢問公司文件並查看答案 來源文件與引用段落"],
  ["/works/analytics-dashboard", "網站成效追蹤與曝光管理後台｜Qingyu Web Studio", "整合瀏覽、搜尋曝光、CTA 點擊、表單與月報的成效後台展示"],
  ["/works/assessment-system", "互動測驗與自動計分系統｜Qingyu Web Studio", "線上作答、自動計分、結果報告與填答紀錄的互動系統"],
  ["/works/line-bot", "LINE Bot 自動接待與需求整理｜Qingyu Web Studio", "LINE 自動回覆、需求追問、Webhook 與後台案件同步展示"],
  ["/works/notion-brand-landing", "個人品牌落地頁設計案例｜Qingyu Web Studio", "個人品牌服務、資源內容與 LINE 名單導流的落地頁展示"],
  ["/works/ai-audit", "AI 網站健檢工具展示｜Qingyu Web Studio", "以 AI 檢查網站 CTA、SEO、手機體驗與信任內容的互動工具"],
  ["/works/api-automation", "表單、API 與通知自動化展示｜Qingyu Web Studio", "表單送出、資料檢查、API、通知與後台追蹤的自動化流程"],
  ["/works/ai-tech-quest", "AI Technology Quest 互動展示｜晴宇 Qingyu Web", "操作 RAG 模型分類 FAQ 助手與任務進度的 AI 產品展示"],
]

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

function replaceAttribute(html, selector, value) {
  const escaped = escapeHtml(value)
  const expression = new RegExp(`(<meta ${selector} content=")[^"]*(" \/>)`)
  return html.replace(expression, `$1${escaped}$2`)
}

function buildPageHtml(route, title, description, robots = "index, follow, max-image-preview:large", imagePath = "/og.png?v=20260820", entityType = "", options = {}) {
  if (!options.preserveText) {
    title = title.replaceAll("Qingyu Web Studio", brandName)
    description = description.replaceAll("Qingyu Web Studio", brandName)
  }
  robots = options.robots ?? robots
  const canonical = options.canonical ?? `${siteUrl}${route}`
  const pageSiteName = options.siteName ?? brandName
  const canonicalOrigin = new URL(canonical).origin
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    inLanguage: "zh-Hant-TW",
    isPartOf: { "@type": "WebSite", name: pageSiteName, url: `${canonicalOrigin}/` },
  }
  const pageData = entityType
    ? {
        "@context": "https://schema.org",
        "@graph": [
          webPage,
          {
            "@type": entityType,
            name: options.productionProduct ? title.split("｜")[0] : `${title.split("｜")[0]}（產業提案範本）`,
            url: canonical,
            description: options.productionProduct ? description : `${description}本頁為產業提案範本非實際營業單位或客戶實績`,
            ...(options.productionProduct ? {} : { additionalProperty: { "@type": "PropertyValue", name: "資料性質", value: "產業提案範本" } }),
            ...(entityType === "SoftwareApplication" ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" } : {}),
          },
        ],
      }
    : webPage
  const image = /^https?:\/\//.test(imagePath) ? imagePath : `${siteUrl}${imagePath}`

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = replaceAttribute(html, 'name="description"', description)
  html = replaceAttribute(html, 'name="robots"', robots)
  html = replaceAttribute(html, 'name="googlebot"', robots)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  html = html.replace(/(<link rel="alternate" hreflang="zh-Hant-TW" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  if (options.xinjiang) {
    html = html.replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  }
  html = replaceAttribute(html, 'property="og:title"', title)
  html = replaceAttribute(html, 'property="og:site_name"', pageSiteName)
  html = replaceAttribute(html, 'property="og:description"', description)
  html = replaceAttribute(html, 'property="og:url"', canonical)
  html = replaceAttribute(html, 'property="og:image"', image)
  html = replaceAttribute(html, 'property="og:image:width"', String(options.imageWidth ?? 1731))
  html = replaceAttribute(html, 'property="og:image:height"', String(options.imageHeight ?? 909))
  html = replaceAttribute(html, 'property="og:image:alt"', `${title.split("｜")[0]}預覽`)
  html = replaceAttribute(html, 'name="twitter:title"', title)
  html = replaceAttribute(html, 'name="twitter:description"', description)
  html = replaceAttribute(html, 'name="twitter:image"', image)
  const heading = title.split("｜")[0]
  const staticContent = options.xinjiang
    ? `<div id="root"><main data-prerendered="true" style="min-height:100vh;background:#11100e;color:#f3e2c2;padding:7rem 1.25rem 3rem;font-family:serif"><p style="margin:0;color:#ffd45a;font-size:3rem;font-weight:700">鑫匠</p><h1 style="margin:1rem 0 0;font-size:1.45rem;letter-spacing:.12em">瓦刀執手砌日月 匠心巧思鑄千秋</h1><p style="max-width:42rem;line-height:1.9;color:rgba(255,255,255,.72)">屏東在地泥作裝修工程 40 年老師父經驗 到場評估後實在報價</p></main></div>`
    : `<div id="root"><main data-prerendered="true"><nav aria-label="主要導覽"><a href="/">首頁</a> <a href="/works">作品</a> <a href="/showcase">展示空間</a> <a href="/services">服務</a> <a href="/about">關於</a> <a href="/collaboration">協作</a> <a href="/pricing">價格</a> <a href="/contact">聯絡</a></nav><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p><p><a href="/works">查看作品</a> <a href="/contact">啟動專案</a></p></main></div>`
  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<noscript>/, `${staticContent}\n    <noscript>`)
  html = html.replace("</head>", `    <script type="application/ld+json">${JSON.stringify(pageData).replaceAll("<", "\\u003c")}</script>\n  </head>`)
  return html
}

for (const [route, title, description, imagePath, entityType, options] of routes) {
  const destination = path.join(outputRoot, route.replace(/^\//, ""), "index.html")
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, buildPageHtml(route, title, description, undefined, imagePath, entityType, options), "utf8")
}

await writeFile(
  path.join(outputRoot, "404.html"),
  buildPageHtml("/404", "找不到頁面｜Qingyu Web Studio", "你要找的頁面不存在", "noindex, nofollow, noarchive"),
  "utf8"
)

console.log(`Generated static metadata for ${routes.length} public routes.`)
