const configuredSiteUrl = (import.meta.env.VITE_LULUFACE_SITE_URL ?? "").trim().replace(/\/$/, "")

export function sitePath(path = "") {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "")
  return normalizedPath ? `/${normalizedPath}` : "/"
}

export const siteConfig = {
  route: sitePath(),
  seo: {
    title: "LULUFACE 嚕嚕臉｜嘉義做臉護膚與日常保養",
    description:
      "LULUFACE 嚕嚕臉提供嘉義做臉護膚、問題肌管理、居家保養建議與美容技術培訓，陪你建立清楚、安心且能持續的保養方式。",
    image: "/beauty-preview/service-detail.jpg",
    baseUrl: configuredSiteUrl || null,
    allowIndexing: import.meta.env.VITE_LULUFACE_ALLOW_INDEXING === "true",
    themeColor: "#D2B9B3",
  },
  analytics: {
    enabled: import.meta.env.VITE_LULUFACE_ANALYTICS_ENABLED === "true",
    ga4MeasurementId: (import.meta.env.VITE_LULUFACE_GA4_ID ?? "").trim() || null,
  },
  brand: {
    name: "LULUFACE",
    localName: "嚕嚕臉",
    tagline: "平價消費，高端體驗",
    heroTitle: "從專業護膚到日常保養，讓肌膚照護回到簡單。",
    heroDescription:
      "依照每個人的膚況，提供清楚、安心的做臉服務與居家保養建議，陪你建立可以持續的保養方式。",
  },
  contact: {
    storeName: "Lulu Face 嚕嚕臉",
    address: "嘉義市西區上海路 235 號",
    postalCode: "600",
    phoneLabel: "05-236-6800",
    hours: "採預約制，請透過 LINE 確認可預約時段。",
    instagramLabel: "@luluface_2022",
    lineLabel: "@202omqvz",
  },
  links: {
    line: "https://line.me/R/ti/p/@202omqvz",
    facebook: "https://www.facebook.com/lulufacetw",
    instagram: "https://www.instagram.com/luluface_2022",
    phone: "tel:+88652366800",
    map: "https://www.google.com/maps/search/?api=1&query=%E5%98%89%E7%BE%A9%E5%B8%82%E8%A5%BF%E5%8D%80%E4%B8%8A%E6%B5%B7%E8%B7%AF235%E8%99%9F",
  },
  pendingLinks: {
    shoplineStore: null,
    productCollection: null,
    ezPrettyBooking: null,
    franchiseForm: null,
  },
}

export const navigation = [
  { label: "護膚服務", href: "#services" },
  { label: "明星商品", href: "#products" },
  { label: "品牌特色", href: "#why-luluface" },
  { label: "美容案例", href: "#cases" },
  { label: "培訓與加盟", href: "#growth" },
  { label: "門市資訊", href: "#contact" },
]

export const siteNavigation = [
  { label: "首頁", path: siteConfig.route },
  { label: "品牌故事", path: sitePath("brand") },
  { label: "護膚服務", path: sitePath("services") },
  { label: "商品選購", path: sitePath("products") },
  { label: "美容案例", path: sitePath("cases") },
  { label: "培訓加盟", path: sitePath("training") },
  { label: "聯絡我們", path: sitePath("contact") },
]

export const utilityNavigation = [
  { label: "設備與流程", path: sitePath("equipment") },
  { label: "常見問題", path: sitePath("faq") },
  { label: "購物與隱私政策", path: sitePath("policies") },
]

export const pageSeo = {
  brand: {
    title: "品牌故事｜LULUFACE 嚕嚕臉",
    description:
      "認識 LULUFACE 平價消費、高端體驗的品牌理念，以及專業、穩定且能持續的肌膚照護方式。",
  },
  services: {
    title: "護膚服務｜LULUFACE 嚕嚕臉",
    description: "了解 LULUFACE 做臉護膚、問題肌管理與美容課程，以及從預約到後續追蹤的服務流程。",
  },
  products: {
    title: "商品選購｜LULUFACE 嚕嚕臉",
    description: "瀏覽 LULUFACE 居家保養商品，並透過 LINE 詢問售價、庫存與適合自己的使用方式。",
  },
  cases: {
    title: "美容案例｜LULUFACE 嚕嚕臉",
    description: "了解 LULUFACE 的護膚服務情境與照護方向；實際安排依個人膚況與門市評估而不同。",
  },
  training: {
    title: "美容培訓與加盟｜LULUFACE 嚕嚕臉",
    description: "了解 LULUFACE 美容技術培訓、創業培訓與加盟合作方向，並透過 LINE 詢問。",
  },
  equipment: {
    title: "設備與專業流程｜LULUFACE 嚕嚕臉",
    description: "了解 LULUFACE 對服務流程、溝通、衛生與資訊透明的重視。",
  },
  faq: {
    title: "常見問題｜LULUFACE 嚕嚕臉",
    description: "查看 LULUFACE 預約、護膚服務、商品與案例資料的常見問題。",
  },
  contact: {
    title: "聯絡與預約｜LULUFACE 嚕嚕臉",
    description: "透過 LINE、電話或社群聯絡 LULUFACE，前往嘉義市西區上海路 235 號。",
  },
  policies: {
    title: "購物與隱私政策｜LULUFACE 嚕嚕臉",
    description: "查看 LULUFACE 網站資料使用、商品詢問、付款配送與售後處理原則。",
  },
}

export const imageAssets = {
  logo: {
    src: "/beauty-preview/luluface-logo.png",
    width: 1200,
    height: 354,
    alt: "LULUFACE 嚕嚕臉正式品牌標誌",
    sourceType: "client",
    source: "客戶提供 Illustrator 向量檔衍生",
  },
  hero: {
    src: "/beauty-preview/optimized/service-detail.webp",
    width: 1600,
    height: 1067,
    alt: "美容師進行專業臉部護膚服務的情境示意",
    sourceType: "placeholder",
    source: "Pexels 暫代圖",
  },
  service: {
    src: "/beauty-preview/optimized/service-treatment.webp",
    width: 1600,
    height: 1067,
    alt: "臉部護膚流程的情境示意",
    sourceType: "placeholder",
    source: "Pexels 暫代圖",
  },
  ritual: {
    src: "/beauty-preview/optimized/serum-ritual.webp",
    width: 1600,
    height: 1067,
    alt: "日常使用保養精華的情境示意",
    sourceType: "placeholder",
    source: "Pexels 暫代圖",
  },
  training: {
    src: "/beauty-preview/optimized/training-session.webp",
    width: 1600,
    height: 2397,
    alt: "美容技術教學與實務操作的情境示意",
    sourceType: "placeholder",
    source: "Pexels 暫代圖",
  },
  studio: {
    src: "/beauty-preview/optimized/studio-interior.webp",
    width: 1600,
    height: 1068,
    alt: "美容空間的情境示意",
    sourceType: "placeholder",
    source: "Pexels 暫代圖",
  },
}

export const brandValues = [
  {
    number: "01",
    icon: "professional",
    title: "專業護膚",
    english: "Professional Care",
    text: "先了解膚況與生活習慣，再規劃合適的護膚方向。",
  },
  {
    number: "02",
    icon: "attainable",
    title: "平價高端",
    english: "Attainable Quality",
    text: "用清楚透明的服務，讓高品質肌膚照護不再遙不可及。",
  },
  {
    number: "03",
    icon: "steady",
    title: "穩定安心",
    english: "Steady & Reassuring",
    text: "重視每一次服務的一致性，給肌膚剛剛好的照顧。",
  },
  {
    number: "04",
    icon: "essential",
    title: "回歸肌膚本質",
    english: "Back to Essentials",
    text: "減少不必要的複雜步驟，建立能真正持續的保養方式。",
  },
]

export const services = [
  {
    number: "01",
    icon: "facial",
    title: "做臉護膚",
    english: "Facial Care",
    text: "從肌膚了解、溫和清潔到敷護保養，依當下膚況安排合適流程。",
    features: ["膚況溝通", "基礎清潔", "護膚與保養建議"],
    suitableSkin: "日常保養、乾燥或初次體驗",
    duration: null,
    price: null,
  },
  {
    number: "02",
    icon: "skin-management",
    title: "問題肌管理",
    english: "Skin Management",
    text: "針對粉刺、乾燥、粗糙與不穩定膚況，提供清楚且循序的照護建議。",
    features: ["需求評估", "分階段管理", "後續追蹤"],
    suitableSkin: "粉刺、粗糙或不穩定膚況",
    duration: null,
    price: null,
  },
  {
    number: "03",
    icon: "beauty-course",
    title: "美容課程",
    english: "Beauty Treatment",
    text: "依照當下膚況與需求安排合適的美容護膚課程，實際項目與流程由門市確認。",
    features: ["需求溝通", "護膚流程", "預約制服務"],
    suitableSkin: "希望進一步討論護膚方向",
    duration: null,
    price: null,
  },
]

export const careJourney = [
  {
    number: "01",
    title: "LINE 預約",
    text: "告訴我們想改善的肌膚困擾，先確認適合的到店時間。",
  },
  {
    number: "02",
    title: "肌膚了解",
    text: "從當下狀態、日常習慣與保養方式開始了解，不急著套用固定流程。",
  },
  {
    number: "03",
    title: "護膚課程",
    text: "依照實際膚況規劃當次照護內容，讓服務過程清楚、舒適。",
  },
  {
    number: "04",
    title: "保養建議",
    text: "提供容易實行的居家保養方向，讓門市照護能自然回到生活。",
  },
  {
    number: "05",
    title: "後續追蹤",
    text: "依實際肌膚狀態持續溝通，後續方式與時間以門市說明為準。",
  },
]

export const products = [
  {
    id: "blue-copper-peptide",
    label: "FEATURED 01",
    name: "藍銅胜肽緊緻精華",
    englishName: "Blue Copper Peptide Firming Essence",
    size: "30 ml",
    price: null,
    compareAtPrice: null,
    currency: "TWD",
    summary: "水潤、清爽的日常精華，協助維持柔嫩膚觸、彈性與光澤。",
    benefits: ["水潤清爽膚觸", "日常保養使用", "維持柔嫩與光澤"],
    ingredients: null,
    usage: null,
    cautions: null,
    stockStatus: "pending",
    shoplineUrl: null,
    confirmedFacts: ["商品名稱", "30 ml 容量", "品牌目前公開的產品定位"],
    pendingFacts: "售價、完整成分、使用方式、注意事項與供貨狀態請透過 LINE 確認。",
    image: {
      src: "/beauty-preview/optimized/serum-dropper.webp",
      width: 1600,
      height: 2400,
      alt: "藍銅胜肽緊緻精華商品情境暫代圖",
      sourceType: "placeholder",
    },
  },
  {
    id: "exosome-barrier-mask",
    label: "FEATURED 02",
    name: "外泌體屏障修護面膜",
    englishName: "Exosome Barrier Repair Mask",
    size: "25 ml / 片",
    price: null,
    compareAtPrice: null,
    currency: "TWD",
    summary: "為需要補水與舒緩的日常保養時刻，帶來柔潤且舒適的敷護體驗。",
    benefits: ["日常補水敷護", "柔潤舒適膚觸", "居家保養使用"],
    ingredients: null,
    usage: null,
    cautions: null,
    stockStatus: "pending",
    shoplineUrl: null,
    confirmedFacts: ["商品名稱", "25 ml / 片規格", "品牌目前公開的產品定位"],
    pendingFacts: "售價、完整成分、使用方式、注意事項與供貨狀態請透過 LINE 確認。",
    image: {
      src: "/beauty-preview/optimized/product-collection.webp",
      width: 1600,
      height: 2400,
      alt: "外泌體屏障修護面膜商品情境暫代圖",
      sourceType: "placeholder",
    },
  },
]

export const productCatalogCapacity = 10

export const shoplineProductFields = [
  "name",
  "price",
  "compareAtPrice",
  "size",
  "image",
  "benefits",
  "ingredients",
  "usage",
  "cautions",
  "stockStatus",
  "shoplineUrl",
]

export function getProductPurchaseConfig(product) {
  if (product.shoplineUrl) {
    return {
      mode: "shopline",
      href: product.shoplineUrl,
      label: "加入購物車",
    }
  }

  return {
    mode: "line",
    href: siteConfig.links.line,
    label: "LINE 詢問商品",
  }
}

export const reasons = [
  {
    title: "資訊先說清楚",
    text: "服務內容、可預約時段與居家保養方式，都先以門市最新說明為準。",
  },
  {
    title: "門市與居家照護銜接",
    text: "將門市服務與可執行的居家保養連在一起，減少複雜、不必要的步驟。",
  },
  {
    title: "預約制服務節奏",
    text: "預留溝通與服務時間，實際項目依當次需求確認，不以制式流程快速帶過。",
  },
]

export const cases = [
  {
    number: "CASE 01",
    title: "基礎護膚",
    text: "適合日常肌膚保養與定期護理；實際流程會依當次膚況與需求溝通。",
    concern: "日常乾燥、粗糙或想建立定期保養",
    serviceMethod: "資料待品牌確認",
    carePeriod: "資料待品牌確認",
    authorizationStatus: "待顧客書面授權",
    image: {
      src: "/beauty-preview/optimized/hero-ritual.webp",
      width: 1800,
      height: 2741,
      alt: "基礎護膚案例版位示意",
      sourceType: "placeholder",
    },
  },
  {
    number: "CASE 02",
    title: "問題肌管理",
    text: "依肌膚狀況討論合適的護膚方向，並以穩定、循序的方式安排照護。",
    concern: "粉刺、粗糙或不穩定膚況",
    serviceMethod: "資料待品牌確認",
    carePeriod: "資料待品牌確認",
    authorizationStatus: "待顧客書面授權",
    image: {
      src: "/beauty-preview/optimized/service-treatment.webp",
      width: 1600,
      height: 1067,
      alt: "問題肌管理案例版位示意",
      sourceType: "placeholder",
    },
  },
  {
    number: "CASE 03",
    title: "客製化護膚",
    text: "依不同膚況規劃合適流程；實際感受與照護方式會因個人狀況而不同。",
    concern: "希望依個人需求安排護膚方向",
    serviceMethod: "資料待品牌確認",
    carePeriod: "資料待品牌確認",
    authorizationStatus: "待顧客書面授權",
    image: {
      src: "/beauty-preview/optimized/serum-ritual.webp",
      width: 1600,
      height: 1067,
      alt: "客製化護膚案例版位示意",
      sourceType: "placeholder",
    },
  },
]

export const growthPaths = [
  {
    number: "01",
    eyebrow: "TECHNIQUE",
    title: "美容技術培訓",
    text: "從基礎護膚知識到實務操作，協助建立穩定、清楚的美容專業能力。",
    cta: "LINE 詢問培訓",
  },
  {
    number: "02",
    eyebrow: "ENTREPRENEURSHIP",
    title: "創業培訓",
    text: "分享品牌經營、顧客服務與實際經驗，陪伴有志投入美容產業的人持續成長。",
    cta: "LINE 詢問課程",
  },
  {
    number: "03",
    eyebrow: "FRANCHISE",
    title: "加盟合作",
    text: "有意了解合作方式者，可先透過 LINE 提供所在地與需求，後續條件以品牌書面說明為準。",
    cta: "LINE 詢問加盟",
  },
]

export const faqs = [
  {
    question: "第一次預約，需要先決定服務項目嗎？",
    answer:
      "不用急著選擇。可以先透過 LINE 告訴我們目前在意的膚況，到店後再依實際狀態溝通合適方向。",
  },
  {
    question: "要怎麼預約 LULUFACE？",
    answer:
      "目前採預約制，請加入 LINE 官方帳號 @202omqvz，確認希望的日期與時段；實際可預約時間以門市回覆為準。",
  },
  {
    question: "網站上的商品可以直接購買嗎？",
    answer:
      "這一版尚未開放線上付款。若想了解現有商品，可先透過 LINE 詢問；正式商城連結會在 SHOPLINE 串接後集中更新。",
  },
  {
    question: "網站上的案例與評論是真實資料嗎？",
    answer: "網站照片為服務情境示意，不代表特定顧客成果；顧客案例與評論僅於取得本人授權後公開。",
  },
]

export const inventoryNotes = {
  clientAssets: [
    "LULUFACE Illustrator Logo 原始向量檔",
    "LULUFACE VI 視覺識別摘要 PDF",
    "LULUFACE 正式 Logo 網站衍生圖",
  ],
  placeholderAssets: [
    "主視覺與護膚服務情境照",
    "明星商品情境照",
    "美容案例版位照片",
    "培訓與門市空間照片",
  ],
}

export const serviceDetails = [
  {
    title: "做臉護膚",
    english: "Facial Care",
    summary: "從溝通、清潔到敷護保養，依當次膚況安排服務節奏。",
    suitableFor: ["想建立定期護膚習慣", "希望了解目前膚況", "需要清楚居家保養方向"],
    confirmed: ["採預約制", "到店前可先透過 LINE 說明需求", "實際流程由門市依膚況確認"],
    pending: "正式課程名稱、服務時間、價格、使用品項與注意事項",
  },
  {
    title: "問題肌管理",
    english: "Skin Management",
    summary: "針對粉刺、乾燥、粗糙或不穩定膚況，以循序方式討論照護方向。",
    suitableFor: ["在意粉刺與粗糙感", "膚況容易乾燥或不穩定", "希望獲得後續追蹤建議"],
    confirmed: ["先了解膚況再安排", "不在網站做療效保證", "後續方式以門市說明為準"],
    pending: "細分項目、療程次數、價格、禁忌與術前術後說明",
  },
  {
    title: "美容課程",
    english: "Beauty Treatment",
    summary: "依照當下需求安排美容護膚課程，讓服務內容與預期更透明。",
    suitableFor: ["想詢問進階護膚項目", "重視舒適與穩定流程", "希望由專人協助選擇"],
    confirmed: ["實際項目由門市確認", "未確認前不填入假價格", "可先透過 LINE 諮詢"],
    pending: "正式項目、時間、價格、設備與耗材資訊",
  },
]

export const trainingDetails = [
  {
    number: "01",
    title: "美容技術培訓",
    lead: "為想建立基礎知識與實務操作能力的學習者保留完整課程入口。",
    outline: ["肌膚基礎與溝通概念", "服務流程與實務操作", "衛生、紀錄與顧客服務"],
    pending: "課程日期、時數、費用、師資、證書與招生資格",
  },
  {
    number: "02",
    title: "創業培訓",
    lead: "從服務設計、顧客溝通到日常營運，建立可執行的美容創業方向。",
    outline: ["品牌與服務定位", "預約與顧客關係", "營運流程與實務經驗"],
    pending: "正式課綱、顧問方式、費用、梯次與報名條件",
  },
  {
    number: "03",
    title: "加盟合作",
    lead: "提供合作意向導流；所有條件均以品牌正式說明與合約為準。",
    outline: ["合作需求初步了解", "品牌方案與區域評估", "正式文件與雙方確認"],
    pending: "加盟金、權利金、設備、供貨、區域與合約條件",
  },
]

export const policyDrafts = [
  {
    id: "privacy",
    title: "隱私權說明",
    paragraphs: [
      "本站目前不設站內表單或線上結帳，因此不會直接透過本站要求或儲存姓名、電話、付款資料與配送資訊。",
      "若您透過 LINE、Facebook 或 Instagram 主動聯絡，提供的資料將用於回覆詢問、安排預約與後續服務，並同時適用各平台的隱私政策。",
      "若未來啟用購物、表單、Cookie 或網站分析功能，我們會先更新本說明，再依實際服務提供必要的告知與選擇。",
    ],
  },
  {
    id: "shipping",
    title: "付款與配送說明",
    paragraphs: [
      "本站目前不提供線上付款。商品售價、庫存、付款方式、配送或取貨安排，請透過 LINE 向門市確認。",
      "完成確認前，網站內容不構成庫存保留、到貨日期或交易成立的承諾；實際條件以雙方確認內容為準。",
    ],
  },
  {
    id: "returns",
    title: "退換貨與售後說明",
    paragraphs: [
      "本站目前沒有線上結帳。透過 LINE 或門市完成的交易，退換貨條件會依商品性質、衛生安全、雙方確認內容與適用法令辦理。",
      "若收到的商品有瑕疵、錯寄或運送損壞，請保留商品、包裝與相關照片，並儘速透過 LINE 聯絡門市協助確認。",
    ],
  },
]
