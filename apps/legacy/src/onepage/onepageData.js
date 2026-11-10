import { contact as onepageContact } from "../site/siteConfig.js"
export { onepageContact }

const asset = (industry, file) => `/assets/onepage/${industry}/${file}`

export const onepageTemplates = [
  {
    slug: "beauty",
    industry: "美容保養",
    brand: "HANA ÉCLAT",
    eyebrow: "SKIN RITUAL",
    title: "先了解膚況 再安排適合的照護",
    summary: "依乾燥 敏感與疲憊狀態 提供清楚的護膚流程與居家建議",
    sectionCount: 6,
    primaryCta: "LINE 預約",
    audience: "美容工作室、肌膚管理、保養品牌",
    hero: asset("beauty", "beauty-hero.webp"),
    images: [
      "beauty-hero.webp",
      "beauty-treatment.webp",
      "beauty-specialist.webp",
      "beauty-products.webp",
      "beauty-space.webp",
      "beauty-result.webp",
    ].map((file) => asset("beauty", file)),
    seoTitle: "美容保養一頁式網站範本｜Qingyu Web Studio",
    seoDescription: "美容工作室一頁式網站提案包含肌膚需求 照護方向 服務流程 空間與詢問入口",
    schemaType: "BeautySalon",
    themeColor: "#eee6d8",
  },
  {
    slug: "clinic",
    industry: "牙醫診所",
    brand: "和煦牙醫",
    eyebrow: "GENTLE DENTAL CARE",
    title: "從理解開始安心完成每一次治療",
    summary: "先說明檢查結果 再一起確認合適的治療順序",
    sectionCount: 6,
    primaryCta: "預約掛號",
    audience: "牙醫診所、醫療院所、專業門診",
    hero: asset("clinic", "clinic-hero.webp"),
    images: [
      "clinic-hero.webp",
      "clinic-team.webp",
      "clinic-consultation.webp",
      "clinic-equipment.webp",
      "clinic-treatment.webp",
      "clinic-interior.webp",
    ].map((file) => asset("clinic", file)),
    seoTitle: "牙醫診所一頁式網站範本｜Qingyu Web Studio",
    seoDescription: "牙醫診所一頁式網站提案包含診療項目 看診流程 環境與預約入口",
    schemaType: "Dentist",
    themeColor: "#f2efe9",
  },
  {
    slug: "restaurant",
    industry: "精品餐飲",
    brand: "炙序",
    eyebrow: "FIRE · SEASON · CRAFT",
    title: "一席之間嚐見火候與季節",
    summary: "以大幅料理攝影、主廚敘事與訂位行動構成的餐飲雜誌式提案",
    sectionCount: 6,
    primaryCta: "門市訂位",
    audience: "餐廳、私廚、餐酒館、特色料理",
    hero: asset("restaurant", "restaurant-hero.webp"),
    images: [
      "restaurant-hero.webp",
      "restaurant-chef.webp",
      "restaurant-signature.webp",
      "restaurant-seasonal.webp",
      "restaurant-interior.webp",
      "restaurant-ingredients.webp",
    ].map((file) => asset("restaurant", file)),
    seoTitle: "精品餐飲一頁式網站範本｜Qingyu Web Studio",
    seoDescription: "餐廳一頁式網站提案包含代表料理 品牌敘事 用餐空間與訂位入口",
    schemaType: "Restaurant",
    themeColor: "#17120f",
  },
  {
    slug: "construction",
    industry: "室內工程",
    brand: "築序工程",
    eyebrow: "DESIGN THAT GETS BUILT",
    title: "從現勘到收尾把設計確實做出來",
    summary: "同時呈現設計判斷、工法細節、施工管理與保固承諾的工程提案",
    sectionCount: 6,
    primaryCta: "免費估價",
    audience: "室內設計、工程行、裝修與統包團隊",
    hero: asset("construction", "construction-hero.webp"),
    images: [
      "construction-hero.webp",
      "construction-planning.webp",
      "construction-site.webp",
      "construction-craft.webp",
      "construction-case.webp",
      "construction-extension.webp",
    ].map((file) => asset("construction", file)),
    seoTitle: "室內設計與工程一頁式網站範本｜Qingyu Web Studio",
    seoDescription: "工程行一頁式網站提案包含服務 現勘 施工流程 案例與估價入口",
    schemaType: "ProfessionalService",
    themeColor: "#ded7c9",
  },
  {
    slug: "manufacturing",
    industry: "精密製造",
    brand: "鉅衡精密",
    eyebrow: "PRECISION IN EVERY CUT",
    title: "從圖面到量產每一道公差都有依據",
    summary: "面向採購與工程端清楚呈現加工能力、量測流程與詢價資訊的 B2B 提案",
    sectionCount: 6,
    primaryCta: "取得加工評估",
    audience: "金屬加工、CNC、零組件與傳產製造",
    hero: asset("manufacturing", "manufacturing-hero.webp"),
    images: [
      "manufacturing-hero.webp",
      "manufacturing-inspection.webp",
      "manufacturing-cnc.webp",
      "manufacturing-quality.webp",
      "manufacturing-products.webp",
      "manufacturing-factory.webp",
    ].map((file) => asset("manufacturing", file)),
    seoTitle: "精密製造與金屬加工一頁式網站範本｜Qingyu Web Studio",
    seoDescription: "精密製造一頁式網站提案包含加工能力 生產流程 量測 品質與詢價入口",
    schemaType: "ProfessionalService",
    themeColor: "#111417",
  },
  {
    slug: "saas",
    industry: "軟體服務",
    brand: "NEXORA",
    eyebrow: "OPERATIONS, ORCHESTRATED",
    title: "把分散流程收進同一個營運工作台",
    summary: "用可操作 Dashboard、流程與方案比較呈現產品價值的軟體服務提案",
    sectionCount: 6,
    primaryCta: "申請試用",
    audience: "SaaS、AI 工具、ERP 與企業軟體",
    hero: asset("saas", "saas-hero.webp"),
    images: [
      "saas-hero.webp",
      "saas-workflow.webp",
      "saas-integrations.webp",
      "saas-security.webp",
      "saas-team.webp",
    ].map((file) => asset("saas", file)),
    seoTitle: "SaaS、AI 與 ERP 一頁式網站範本｜Qingyu Web Studio",
    seoDescription: "軟體服務一頁式網站提案包含常見問題 操作流程 工作台與詢問入口",
    schemaType: "SoftwareApplication",
    themeColor: "#f0e4d2",
  },
]

export const onepageHubSeo = {
  path: "/onepage",
  title: "一頁式網站設計與六大產業範本｜Qingyu Web Studio",
  description: "六套產業網站提案把品牌 服務與行動入口集中在清楚的響應式頁面",
  image: onepageTemplates[0].hero,
  imageWidth: 1680,
  imageHeight: 945,
  imageAlt: "Qingyu Web Studio 一頁式網站設計與六大產業範本",
  themeColor: "#101817",
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.qingyuweb.com/onepage#webpage",
        url: "https://www.qingyuweb.com/onepage",
        name: "一頁式網站設計與六大產業範本",
        description: "六套可直接瀏覽的產業網站提案",
        inLanguage: "zh-Hant-TW",
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.qingyuweb.com/#studio",
        name: "Qingyu Web Studio",
        url: "https://www.qingyuweb.com/onepage",
        email: onepageContact.email,
        areaServed: { "@type": "Country", name: "Taiwan" },
        serviceType: "一頁式網站設計",
      },
    ],
  },
}

export function getOnepageTemplate(slug) {
  return onepageTemplates.find((template) => template.slug === slug)
}

export function createTemplateSeo(template, locale = "zh-Hant") {
  const url = `https://www.qingyuweb.com/onepage/${template.slug}`
  const language = { "zh-Hant": "zh-Hant-TW", en: "en", ja: "ja", ko: "ko" }[locale] || "zh-Hant-TW"
  const suffix = { "zh-Hant": "網站提案 晴宇 Qingyu Web", en: "website concept Qingyu Web", ja: "サイト提案 Qingyu Web", ko: "사이트 제안 Qingyu Web" }[locale] || "網站提案 晴宇 Qingyu Web"
  const title = `${template.industry} ${suffix}`
  const description = template.summary
  const entity = {
    "@type": "CreativeWork",
    "@id": `${url}#proposal`,
    name: `${template.brand} ${template.industry}`,
    url,
    description,
    inLanguage: language,
    creator: { "@type": "Organization", name: "Qingyu Web", url: "https://www.qingyuweb.com/" },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Content type",
      value: "Industry concept using sample content",
    },
  }

  return {
    path: `/onepage/${template.slug}`,
    title,
    description,
    image: template.hero,
    imageWidth: 1680,
    imageHeight: 945,
    imageAlt: `${template.industry} ${template.brand}`,
    themeColor: template.themeColor,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: language,
          isPartOf: { "@type": "WebSite", name: "Qingyu Web Studio", url: "https://www.qingyuweb.com/" },
        },
        entity,
      ],
    },
    localizedCopy: true,
  }
}

export const allOnepageImages = onepageTemplates.flatMap((template) => template.images)
