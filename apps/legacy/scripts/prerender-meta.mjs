import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { studioWorks, featuredWorks, studioSeo, serviceStories } from "../src/site/studioContent.js"
import { getHomeRevampCopy, homeFeaturedSlugs } from "../src/site/homeRevampContent.js"
import { contact } from "../src/site/siteConfig.js"
import { onepageTemplates } from "../src/onepage/onepageData.js"
import { estimateCopy } from "../src/site/estimatePolicy.js"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputRoot = path.join(projectRoot, "dist")
const template = await readFile(path.join(outputRoot, "index.html"), "utf8")
const siteUrl = "https://www.qingyuweb.com"
const brandName = "晴宇 Qingyu Web"

const legacyRoutes = [
  ["/demo/xinjiang", "鑫匠工程｜泥作裝修與工程服務", "鑫匠工程的服務介紹、施工照片與詢價入口。", "/og/cases/xinjiang.png", "", { xinjiang: true, canonical: "https://xinjiang-website.vercel.app/", robots: "noindex, follow, noarchive" }],
  ["/works/servicedesk", "ServiceDesk 客服工單系統 晴宇 Qingyu Web", "客戶問題 組織佇列 處理狀態與歷史紀錄集中管理", undefined, "SoftwareApplication", { productionProduct: true, preserveText: true }],
  ["/works/watchtower", "Watchtower 商業監控・異動通知｜晴宇 Qingyu Web", "不用一直看，有變化再通知你。價格、庫存、公告，系統幫你盯著。", undefined, "SoftwareApplication", { productionProduct: true }],
  ["/works/docops", "DocOps 文件・企業知識中心｜晴宇 Qingyu Web", "公司資料，直接問。以原文搜尋找到依據，不使用付費 AI。文件、版本、權限與詢問紀錄，一起留著。", "/demo-covers/rag-knowledge.svg", "SoftwareApplication", { productionProduct: true, preserveText: true }],
  ["/works/flowdesk", "FlowDesk 企業流程中心｜晴宇 Qingyu Web", "重複的工作，系統先做。資料整理、判斷、建單，確認後再執行。", undefined, "SoftwareApplication", { productionProduct: true, preserveText: true }],
  ["/works/fieldops", "FieldOps 現場工單・派工系統｜晴宇 Qingyu Web", "現場做完，公司馬上知道。派工、照片、材料、簽名，一張工單全部留著。", undefined, "SoftwareApplication", { productionProduct: true }],
  ["/works/quoteflow", "QuoteFlow 智慧報價・成交系統｜晴宇 Qingyu Web", "從詢價到成交，一套完成。成本算好、版本留著、客戶直接確認。", undefined, "SoftwareApplication", { productionProduct: true }],
  ["/services", "企業 Web 系統與網站開發服務｜晴宇 Qingyu Web", "企業管理系統 高質感網站 Landing Page LINE API AI RAG SEO 與成效追蹤的完整開發服務"],
  ["/seo-ads", "SEO 與 Google Ads 廣告落地頁｜Qingyu Web Studio", "整合技術 SEO、關鍵字與內容架構、Google Ads／Meta Ads 落地頁、GA4 與廣告轉換追蹤"],
  ["/works", "企業系統與網站作品 晴宇 Qingyu Web", "體驗 BookCRM 預約管理 QuoteFlow 報價成交 FlowOrder 訂單庫存 瀏覽晴宇的系統與網站作品"],
  ["/about", "關於晴宇｜晴宇 Qingyu Web", "認識晴宇 Qingyu Web 個人開發工作室的工作方式 合作範圍與交付原則"],
  ["/collaboration", "技術開發協作｜晴宇 Qingyu Web", "提供代理商 顧問 設計團隊與企業內部團隊的前後端開發 API 串接 測試與交付協作"],
  ["/showcase", "產業網站展示空間｜晴宇 Qingyu Web", "瀏覽美容 診所 餐飲 工程 製造與軟體服務的一頁式網站提案 看見清楚訊息 手機動線與轉換入口", "/assets/onepage/beauty/beauty-hero.webp", "ProfessionalService"],
  ["/pricing", ...estimateCopy["zh-Hant"].seo],
  ["/free-audit", "免費網站健檢｜手機體驗、SEO 與轉換檢查｜Qingyu Web Studio", "檢查網站手機版、速度、CTA、SEO、內容信任感與廣告承接路徑"],
  ["/contact", "企業系統與網站專案諮詢｜晴宇 Qingyu Web", "留下需求類型 產業 參考案例 預算與時程取得系統或網站的開發建議與估價"],
  ["/ai-transformation", "中小企業 AI 數位轉型實作服務｜Qingyu Web Studio", "企業網站、LINE 接待、訂貨流程、AI 知識庫與客製後台的數位轉型實作方案"],
  ["/onepage/beauty", "美容保養一頁式網站範本｜Qingyu Web Studio", "美容網站提案包含護膚方向 服務流程 空間與詢問入口", "/assets/onepage/beauty/beauty-hero.webp", "CreativeWork"],
  ["/onepage/clinic", "牙醫診所一頁式網站範本｜Qingyu Web Studio", "診所網站提案包含診療項目 看診流程 環境與預約入口", "/assets/onepage/clinic/clinic-hero.webp", "CreativeWork"],
  ["/onepage/restaurant", "精品餐飲一頁式網站範本｜Qingyu Web Studio", "餐飲網站提案包含代表料理 烹調流程 空間與訂位入口", "/assets/onepage/restaurant/restaurant-hero.webp", "CreativeWork"],
  ["/onepage/construction", "室內設計與工程一頁式網站範本｜Qingyu Web Studio", "工程網站提案包含服務 現勘流程 工法案例與估價入口", "/assets/onepage/construction/construction-hero.webp", "CreativeWork"],
  ["/onepage/manufacturing", "精密製造與金屬加工一頁式網站範本｜Qingyu Web Studio", "製造網站提案包含加工能力 生產流程 品質與詢價入口", "/assets/onepage/manufacturing/manufacturing-hero.webp", "CreativeWork"],
  ["/onepage/saas", "SaaS AI 與 ERP 一頁式網站範本｜Qingyu Web Studio", "軟體服務網站提案包含營運問題 流程 工作台與聯絡入口", "/assets/onepage/saas/saas-hero.webp", "CreativeWork"],
  ["/tools/project-planner", "網站需求診斷工具｜Qingyu Web Studio", "快速整理網站、SEO、LINE Bot、電商或客製系統的需求方向"],
  ["/tools/website-rescue", "網站健檢與優化互動展示｜Qingyu Web Studio", "互動檢查網站手機體驗、CTA、SEO 與信任內容查看改善前後差異"],
  ["/tools/linebot-mission", "LINE Bot 接待與後台同步展示｜Qingyu Web Studio", "體驗 LINE Bot 自動接待、需求追問與後台同步流程"],
  ["/works/ecommerce-platform-redesign", "Shopify、MeepShop 平台電商建置與優化｜Qingyu Web Studio", "平台電商首頁、分類、商品頁、手機購物、SEO 與成效追蹤優化展示"],
  ["/works/biomed-brand-site", "生醫品牌網站概念展示 晴宇 Qingyu Web", "以專業內容 品牌敘事與活動版型呈現生醫網站設計方向 本頁使用展示資料", undefined, "CreativeWork", { robots: "noindex, follow, noarchive", preserveText: true }],
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
  ["/works/bookcrm","預約會員管理系統｜BookCRM｜晴宇 Qingyu Web","客人自己約，員工看行程，店家掌握全店。BookCRM 串起預約、會員、套票與營運。","/bookcrm-og.png","SoftwareApplication",{productionProduct:true,imageWidth:1200,imageHeight:630,preserveText:true}],
  ["/works/floworder", "FlowOrder 智慧訂單中心｜晴宇 Qingyu Web", "把 LINE 與文字訊息訂單轉成可確認、可追蹤、可稽核的訂單與庫存流程。", "/floworder-og.png", "SoftwareApplication", { productionProduct: true }],
  ["/works/restaurant-ordering", "餐飲桌邊點餐與廚房控單系統｜Qingyu Web Studio", "手機桌邊點餐、廚房即時出單、桌況與營收管理的可操作展示"],
  ["/works/rag-consultant", "AI 公司知識庫與文件問答展示｜Qingyu Web Studio", "直接詢問公司文件並查看答案 來源文件與引用段落"],
  ["/works/analytics-dashboard", "網站成效追蹤與曝光管理後台｜Qingyu Web Studio", "整合瀏覽、搜尋曝光、CTA 點擊、表單與月報的成效後台展示"],
  ["/works/line-bot", "LINE Bot 自動接待與需求整理｜Qingyu Web Studio", "LINE 自動回覆、需求追問、Webhook 與後台案件同步展示"],
  ["/works/ai-audit", "AI 網站健檢工具展示｜Qingyu Web Studio", "以 AI 檢查網站 CTA、SEO、手機體驗與信任內容的互動工具"],
  ["/works/api-automation", "表單、API 與通知自動化展示｜Qingyu Web Studio", "表單送出、資料檢查、API、通知與後台追蹤的自動化流程"],
  ["/works/ai-tech-quest", "AI 客服技術實驗｜晴宇 Qingyu Web", "用固定規定示範客服查找依據與人工確認的技術實驗"],
  ["/works/buildflow", "工程案件管理系統展示 晴宇 Qingyu Web", "集中案件進度 現場回報與客戶更新的工程管理流程"],
  ["/works/commercial-visual", "商業視覺設計作品 晴宇 Qingyu Web", "展示桌機 手機與社群比例可延伸的品牌 Campaign 視覺系統"],
  ["/demo/wholesale-ordering", "批發訂貨任務展示 晴宇 Qingyu Web", "用三步體驗商品下單 出貨與月結流程", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/restaurant-ordering", "餐廳點餐任務展示 晴宇 Qingyu Web", "體驗桌邊點餐 售罄 廚房接單 製作與出餐", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/rag-consultant", "AI 公司知識庫任務展示 晴宇 Qingyu Web", "從範例文件查找答案 來源與引用段落", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/buildflow", "工程案件任務展示 晴宇 Qingyu Web", "體驗待辦 現場照片 施工進度與客戶回報", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/linebot", "LINE 詢價任務展示 晴宇 Qingyu Web", "體驗客戶詢問 Bot 追問與展示後台收件", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/analytics-dashboard", "廣告成效任務展示 晴宇 Qingyu Web", "比較範例廣告來源並產生展示摘要", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/ai-audit", "網站健檢任務展示 晴宇 Qingyu Web", "檢查範例網站並查看三項優先改善", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/api-automation", "訂單同步原型 晴宇 Qingyu Web", "核對欄位並體驗失敗 重試與重送去重", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/ai-customer-support", "AI 客服技術實驗 晴宇 Qingyu Web", "查看客戶問題並核對範例規定與人工確認", undefined, "SoftwareApplication", { robots: "noindex, follow, noarchive" }],
  ["/demo/luluface", "LULUFACE 護膚品牌網站展示 晴宇 Qingyu Web", "用三步找到護膚服務與預約方式", "/beauty-preview/service-detail.jpg", "CreativeWork", { robots: "noindex, follow, noarchive", preserveText: true }],
]

const studioRoutes = [
  ["/works", "作品｜Qingyu Web", "從品牌的第一印象，到每天使用的工作流程。看看網站、企業系統、LINE Bot 與 AI 工具的精選案例。"],
  ["/services", "服務｜網站修改、一頁式網站與自動化｜Qingyu Web", "從品牌網站、公司流程、LINE 接待到資料搜尋，先聊問題，再決定適合的做法。"],
  ["/about", "關於｜Qingyu Web", "Qingyu Web 是獨立的網站與系統開發工作室。直接和負責需求整理、設計、開發與上線的人合作。"],
  ["/contact", "聊聊需求｜Qingyu Web", "有東西想做？先聊聊也可以。還沒整理好規格也沒關係，可以直接說現在卡在哪裡。"],
  ...studioWorks.map(item => [item.caseUrl, `${item.headline}｜${item.shortTitle}｜Qingyu Web`, item.answer, `/og/cases/${item.slug}.png?v=20261018-v2`, "CreativeWork", { productionProduct: true, preserveText: true, imageWidth:1200, imageHeight:630 }]),
]
const studioPaths = new Set(studioRoutes.map(([route]) => route))
const routes = [...legacyRoutes.filter(([route]) => !studioPaths.has(route)), ...studioRoutes]

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

function portfolioLinks(items) {
  return `<section aria-label="精選作品"><ul>${items.map((item) => `<li><a href="${escapeHtml(item.caseUrl)}">${escapeHtml(item.headline)}</a><p>${escapeHtml(item.natureLabel)} · ${escapeHtml(item.answer)}</p></li>`).join("")}</ul></section>`
}

// Serve meaningful content before JavaScript without changing the existing Vite routing.
function publicPageContent(route) {
  const home = getHomeRevampCopy("zh-Hant")
  const estimate = estimateCopy["zh-Hant"]
  if (route === "/showcase") {
    return `<section><h2>六套一頁式模板</h2><ul>${onepageTemplates.map(({ slug, industry }) => `<li><a href="/onepage/${slug}">${escapeHtml(industry)}</a></li>`).join("")}</ul></section>`
  }
  if (route === "/pricing") {
    return `<section><h2>${estimate.factorsTitle}</h2><ul>${estimate.factors.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>${estimate.plans.map(plan => `<article><h2>${escapeHtml(plan.name)}</h2><p>${escapeHtml(plan.fit)}</p><p>${escapeHtml(plan.included)}</p><p>${escapeHtml(plan.price)}</p><a href="${plan.path}">${estimate.labels.case}</a></article>`).join("")}<ul>${estimate.rules.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul><a href="/contact">聊聊需求</a></section>`
  }
  if (route === "/services") {
    return `<section id="one-page"><h2>${escapeHtml(estimate.plans[1].name)}</h2><p>${escapeHtml(estimate.plans[1].included)}</p><p>${escapeHtml(estimate.quote)}</p><a href="/showcase">查看一頁式範例</a><a href="/contact?type=landing">聊聊需求</a></section><section id="website-updates"><h2>${home.updatesTitle}</h2><p>${home.updatesText}</p><p>${home.updatesScope}</p><a href="/contact?type=website-updates">聊聊需求</a></section>${serviceStories.map(service => `<section id="${service.id}"><h2>${escapeHtml(service.title)}</h2><p>${escapeHtml(service.text)}</p><p>${escapeHtml(service.includes)}</p><a href="/contact?type=${service.type}">聊聊需求</a></section>`).join("")}`
  }
  if (route === "/contact") {
    return `<section><h2>說明需求 留下聯絡方式</h2><p>稱呼 預算與時程皆為選填</p><a href="${contact.lineUrl}">加入 LINE 洽談</a><p>LINE ${contact.lineId}</p><a href="mailto:${contact.email}">${contact.email}</a><p>${home.privacy}</p></section>`
  }
  const work = studioWorks.find(item => item.caseUrl === route)
  if (!work) return ""
  return `<section><p>${escapeHtml(work.natureLabel)}</p><h2>使用情境與問題</h2><p>${escapeHtml(work.question)}</p><h2>我們怎麼處理</h2><p>${escapeHtml(work.approach)}</p><h2>可確認的功能</h2><p>${escapeHtml(work.effect)}</p><a href="${escapeHtml(work.entryPath)}">開啟展示</a><h2>想做類似的功能？</h2><a href="/contact?case=${work.slug}">聊聊需求</a></section>`
}

function replaceAttribute(html, selector, value) {
  const escaped = escapeHtml(value)
  const expression = new RegExp(`(<meta ${selector} content=")[^"]*(" \/>)`)
  return html.replace(expression, `$1${escaped}$2`)
}

function buildPageHtml(route, title, description, robots = "index, follow, max-image-preview:large", imagePath = studioSeo.image, entityType = "", options = {}) {
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

  let html = template.replace(/<link[^>]*data-home-preload[^>]*>/, "").replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = replaceAttribute(html, 'name="description"', description)
  html = replaceAttribute(html, 'name="robots"', robots)
  html = replaceAttribute(html, 'name="googlebot"', robots)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  html = html.replace(/(<link rel="alternate" hreflang="zh-Hant-TW" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  html = html.replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
  html = replaceAttribute(html, 'property="og:title"', title)
  html = replaceAttribute(html, 'property="og:site_name"', pageSiteName)
  html = replaceAttribute(html, 'property="og:description"', description)
  html = replaceAttribute(html, 'property="og:url"', canonical)
  html = replaceAttribute(html, 'property="og:image"', image)
  html = replaceAttribute(html, 'property="og:image:width"', String(options.imageWidth ?? 1200))
  html = replaceAttribute(html, 'property="og:image:height"', String(options.imageHeight ?? 630))
  html = replaceAttribute(html, 'property="og:image:alt"', `${title.split("｜")[0]}預覽`)
  html = replaceAttribute(html, 'name="twitter:title"', title)
  html = replaceAttribute(html, 'name="twitter:description"', description)
  html = replaceAttribute(html, 'name="twitter:image"', image)
  const heading = title.split("｜")[0]
  const staticContent = options.xinjiang
    ? `<div id="root"><main data-prerendered="true" style="min-height:100vh;background:#11100e;color:#f3e2c2;padding:7rem 1.25rem 3rem;font-family:serif"><p style="margin:0;color:#ffd45a;font-size:3rem;font-weight:700">鑫匠</p><h1 style="margin:1rem 0 0;font-size:1.45rem;letter-spacing:.12em">瓦刀執手砌日月 匠心巧思鑄千秋</h1><p style="max-width:42rem;line-height:1.9;color:rgba(255,255,255,.72)">屏東在地泥作裝修工程 40 年老師父經驗 到場評估後實在報價</p></main></div>`
    : `<div id="root"><main data-prerendered="true"><nav aria-label="主要導覽"><a href="/">首頁</a> <a href="/works">作品</a> <a href="/showcase">展示空間</a> <a href="/services">服務</a> <a href="/about">關於</a> <a href="/collaboration">協作</a> <a href="/pricing">價格</a> <a href="/contact">聯絡</a></nav><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p><p><a href="/works">查看作品</a> <a href="/contact">啟動專案</a></p></main></div>`
  const extra = route === "/works" ? portfolioLinks(featuredWorks) : publicPageContent(route)
  const content = staticContent.replace("</main>", `${extra}</main>`)
  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<noscript>/, `${content}\n    <noscript>`)
  html = html.replace(/<script id="qingyu-static-structured-data"[\s\S]*?<\/script>/, `<script id="qingyu-static-structured-data" type="application/ld+json">${JSON.stringify(pageData).replaceAll("<", "\\u003c")}</script>`)
  return html
}

// Keep the newest product entries discoverable even before JavaScript starts
const homeCopy = getHomeRevampCopy("zh-Hant")
const homeContent = `<section aria-label="服務入口"><h2>${homeCopy.servicesTitle}</h2><ul>${homeCopy.services.map(([title, text, href]) => `<li><a href="${href}">${title}</a><p>${text}</p></li>`).join("")}</ul></section>${portfolioLinks(homeFeaturedSlugs.map(slug => studioWorks.find(item => item.slug === slug)))}<section><h2>${homeCopy.processTitle}</h2><ol>${homeCopy.steps.map(([title, text]) => `<li><h3>${title}</h3><p>${text}</p></li>`).join("")}</ol></section>`
await writeFile(path.join(outputRoot, "index.html"), template.replace("</main>", `${homeContent}</main>`), "utf8")

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
