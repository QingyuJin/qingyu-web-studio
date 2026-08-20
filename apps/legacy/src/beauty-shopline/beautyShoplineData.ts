const configuredSiteUrl = (import.meta.env.VITE_LULUFACE_SITE_URL ?? "").trim().replace(/\/$/, "")

export const siteConfig = {
  route: "/demo/luluface",
  seo: {
    title: "LULUFACE 嚕嚕臉｜嘉義做臉護膚與日常保養",
    description:
      "LULUFACE 嚕嚕臉提供嘉義做臉護膚、問題肌管理、居家保養建議與美容技術培訓，陪你建立清楚、安心且能持續的保養方式",
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
    heroTitle: "從專業護膚到日常保養，讓肌膚照護回到簡單",
    heroDescription:
      "依照每個人的膚況，提供清楚、安心的做臉服務與居家保養建議，陪你建立可以持續的保養方式",
  },
  contact: {
    storeName: "Lulu Face 嚕嚕臉",
    address: "嘉義市西區上海路 235 號",
    postalCode: "600",
    phoneLabel: "05-236-6800",
    hours: "採預約制，請透過 LINE 確認可預約時段",
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
  { label: "品牌故事", path: `${siteConfig.route}/brand` },
  { label: "護膚服務", path: `${siteConfig.route}/services` },
  { label: "商品選購", path: `${siteConfig.route}/products` },
  { label: "美容案例", path: `${siteConfig.route}/cases` },
  { label: "培訓加盟", path: `${siteConfig.route}/training` },
  { label: "聯絡我們", path: `${siteConfig.route}/contact` },
]

export const utilityNavigation = [
  { label: "設備與流程", path: `${siteConfig.route}/equipment` },
  { label: "常見問題", path: `${siteConfig.route}/faq` },
  { label: "購物與隱私政策", path: `${siteConfig.route}/policies` },
]

export const pageSeo = {
  brand: {
    title: "品牌故事｜LULUFACE 嚕嚕臉",
    description:
      "認識 LULUFACE 平價消費、高端體驗的品牌理念，以及專業、穩定且能持續的肌膚照護方式",
  },
  services: {
    title: "護膚服務｜LULUFACE 嚕嚕臉",
    description: "了解 LULUFACE 做臉護膚、問題肌管理與美容課程，以及從預約到後續追蹤的服務流程",
  },
  products: {
    title: "商品選購｜LULUFACE 嚕嚕臉",
    description:
      "瀏覽 LULUFACE 居家保養商品；正式售價、成分與 SHOPLINE 購買功能將於資料確認後上線",
  },
  cases: {
    title: "美容案例｜LULUFACE 嚕嚕臉",
    description: "LULUFACE 美容案例版位與照護方式說明；正式案例將使用經顧客授權的真實資料",
  },
  training: {
    title: "美容培訓與加盟｜LULUFACE 嚕嚕臉",
    description: "了解 LULUFACE 美容技術培訓、創業培訓與加盟合作方向，並透過 LINE 詢問",
  },
  equipment: {
    title: "設備與專業流程｜LULUFACE 嚕嚕臉",
    description: "了解 LULUFACE 對服務流程、衛生與資訊透明的重視；設備型號與細節待品牌確認",
  },
  faq: {
    title: "常見問題｜LULUFACE 嚕嚕臉",
    description: "查看 LULUFACE 預約、護膚服務、商品與案例資料的常見問題",
  },
  contact: {
    title: "聯絡與預約｜LULUFACE 嚕嚕臉",
    description: "透過 LINE、電話或社群聯絡 LULUFACE，前往嘉義市西區上海路 235 號",
  },
  policies: {
    title: "購物與隱私政策｜LULUFACE 嚕嚕臉",
    description:
      "LULUFACE 網站隱私、付款配送與退換貨政策草稿；正式內容將於 SHOPLINE 設定完成後生效",
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
    text: "先了解膚況與生活習慣，再規劃合適的護膚方向",
  },
  {
    number: "02",
    icon: "attainable",
    title: "平價高端",
    english: "Attainable Quality",
    text: "用清楚透明的服務，讓高品質肌膚照護不再遙不可及",
  },
  {
    number: "03",
    icon: "steady",
    title: "穩定安心",
    english: "Steady & Reassuring",
    text: "重視每一次服務的一致性，給肌膚剛剛好的照顧",
  },
  {
    number: "04",
    icon: "essential",
    title: "回歸肌膚本質",
    english: "Back to Essentials",
    text: "減少不必要的複雜步驟，建立能真正持續的保養方式",
  },
]

export const services = [
  {
    number: "01",
    icon: "facial",
    title: "做臉護膚",
    english: "Facial Care",
    text: "從肌膚了解、溫和清潔到敷護保養，依當下膚況安排合適流程",
    features: ["膚況溝通", "基礎清潔", "護膚與保養建議"],
  },
  {
    number: "02",
    icon: "skin-management",
    title: "問題肌管理",
    english: "Skin Management",
    text: "針對粉刺、乾燥、粗糙與不穩定膚況，提供清楚且循序的照護建議",
    features: ["需求評估", "分階段管理", "後續追蹤"],
  },
  {
    number: "03",
    icon: "beauty-course",
    title: "美容課程",
    english: "Beauty Treatment",
    text: "依照當下膚況與需求安排合適的美容護膚課程，實際項目與流程由門市確認",
    features: ["需求溝通", "護膚流程", "預約制服務"],
  },
]

export const careJourney = [
  {
    number: "01",
    title: "LINE 預約",
    text: "告訴我們想改善的肌膚困擾，先確認適合的到店時間",
  },
  {
    number: "02",
    title: "肌膚了解",
    text: "從當下狀態、日常習慣與保養方式開始了解，不急著套用固定流程",
  },
  {
    number: "03",
    title: "護膚課程",
    text: "依照實際膚況規劃當次照護內容，讓服務過程清楚、舒適",
  },
  {
    number: "04",
    title: "保養建議",
    text: "提供容易實行的居家保養方向，讓門市照護能自然回到生活",
  },
  {
    number: "05",
    title: "後續追蹤",
    text: "依實際肌膚狀態持續溝通，後續方式與時間以門市說明為準",
  },
]

export const products = [
  {
    id: "blue-copper-peptide",
    label: "FEATURED 01",
    name: "藍銅胜肽緊緻精華",
    englishName: "Blue Copper Peptide Firming Essence",
    size: "30 ml",
    summary: "水潤、清爽的日常精華，協助維持柔嫩膚觸、彈性與光澤",
    confirmedFacts: ["商品名稱", "30 ml 容量", "品牌目前公開的產品定位"],
    pendingFacts: "正式售價、完整成分、使用方式、注意事項與商品照片",
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
    summary: "為需要補水與舒緩的日常保養時刻，帶來柔潤且舒適的敷護體驗",
    confirmedFacts: ["商品名稱", "25 ml / 片規格", "品牌目前公開的產品定位"],
    pendingFacts: "正式售價、完整成分、使用方式、注意事項與商品照片",
    image: {
      src: "/beauty-preview/optimized/product-collection.webp",
      width: 1600,
      height: 2400,
      alt: "外泌體屏障修護面膜商品情境暫代圖",
      sourceType: "placeholder",
    },
  },
]

export const reasons = [
  {
    title: "先了解，再開始保養",
    text: "每個人的肌膚狀況不同，我們會先了解您的肌膚需求，再規劃適合的護膚方式，而不是套用固定流程",
  },
  {
    title: "依膚況搭配合適護理",
    text: "依照不同膚況搭配適合的護理方式，讓每一次保養都有一致且安心的服務體驗",
  },
  {
    title: "門市與居家互相延續",
    text: "搭配日常保養商品，讓居家保養與門市護膚相互延續，建立更完整的肌膚照護",
  },
  {
    title: "舒適空間與服務節奏",
    text: "以溫暖、舒適的空間與服務節奏，讓護膚不只是保養，也是放鬆身心的過程",
  },
  {
    title: "一致透明的服務流程",
    text: "從肌膚了解、護膚服務到後續保養建議，建立一致且透明的服務流程",
  },
]

export const cases = [
  {
    number: "CASE 01",
    title: "基礎護膚",
    text: "適合日常肌膚保養與定期護理實際案例照片與顧客故事待客戶提供",
    image: {
      src: "/beauty-preview/optimized/hero-ritual.webp",
      width: 1800,
      height: 2741,
      alt: "基礎護膚案例版位示意",
    },
  },
  {
    number: "CASE 02",
    title: "問題肌管理",
    text: "依肌膚狀況提供適合的護膚方向正式版將換入經授權的真實案例",
    image: {
      src: "/beauty-preview/optimized/service-treatment.webp",
      width: 1600,
      height: 1067,
      alt: "問題肌管理案例版位示意",
    },
  },
  {
    number: "CASE 03",
    title: "客製化護膚",
    text: "依不同膚況規劃專屬流程成效說明會以客戶確認的真實資料為準",
    image: {
      src: "/beauty-preview/optimized/serum-ritual.webp",
      width: 1600,
      height: 1067,
      alt: "客製化護膚案例版位示意",
    },
  },
]

export const reviewPlaceholders = [
  {
    id: "service",
    label: "顧客回饋 01",
    title: "護膚服務回饋",
    text: "此處將替換為經顧客授權的真實 Google 評論，並保留原始評分與評論來源",
  },
  {
    id: "studio",
    label: "顧客回饋 02",
    title: "環境與服務感受",
    text: "正式內容將以門市目前公開的 Google 評論為準，不會使用虛構姓名或心得",
  },
  {
    id: "professional",
    label: "顧客回饋 03",
    title: "專業與安心感",
    text: "待客戶提供指定評論或授權擷取後，即可直接在集中資料檔中替換上線",
  },
]

export const growthPaths = [
  {
    number: "01",
    eyebrow: "TECHNIQUE",
    title: "美容技術培訓",
    text: "從基礎護膚知識到實務操作，協助建立穩定、清楚的美容專業能力",
    cta: "LINE 詢問培訓",
  },
  {
    number: "02",
    eyebrow: "ENTREPRENEURSHIP",
    title: "創業培訓",
    text: "分享品牌經營、顧客服務與實際經驗，陪伴有志投入美容產業的人持續成長",
    cta: "LINE 詢問課程",
  },
  {
    number: "03",
    eyebrow: "FRANCHISE",
    title: "加盟合作",
    text: "品牌方案內容仍待客戶確認；第一版先保留正式導流入口，避免填入未核准條件",
    cta: "LINE 詢問加盟",
  },
]

export const faqs = [
  {
    question: "第一次預約，需要先決定服務項目嗎？",
    answer:
      "不用急著選擇可以先透過 LINE 告訴我們目前在意的膚況，到店後再依實際狀態溝通合適方向",
  },
  {
    question: "要怎麼預約 LULUFACE？",
    answer:
      "目前採預約制，請加入 LINE 官方帳號 @202omqvz，確認希望的日期與時段；實際可預約時間以門市回覆為準",
  },
  {
    question: "網站上的商品可以直接購買嗎？",
    answer:
      "這一版尚未開放線上付款若想了解現有商品，可先透過 LINE 詢問；正式商城連結會在 SHOPLINE 串接後集中更新",
  },
  {
    question: "網站上的案例與評論是真實資料嗎？",
    answer:
      "案例照片與評論區會依品牌提供的授權內容更新",
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
    summary: "從溝通、清潔到敷護保養，依當次膚況安排服務節奏",
    suitableFor: ["想建立定期護膚習慣", "希望了解目前膚況", "需要清楚居家保養方向"],
    confirmed: ["採預約制", "到店前可先透過 LINE 說明需求", "實際流程由門市依膚況確認"],
    pending: "正式課程名稱、服務時間、價格、使用品項與注意事項",
  },
  {
    title: "問題肌管理",
    english: "Skin Management",
    summary: "針對粉刺、乾燥、粗糙或不穩定膚況，以循序方式討論照護方向",
    suitableFor: ["在意粉刺與粗糙感", "膚況容易乾燥或不穩定", "希望獲得後續追蹤建議"],
    confirmed: ["先了解膚況再安排", "不在網站做療效保證", "後續方式以門市說明為準"],
    pending: "細分項目、療程次數、價格、禁忌與術前術後說明",
  },
  {
    title: "美容課程",
    english: "Beauty Treatment",
    summary: "依照當下需求安排美容護膚課程，讓服務內容與預期更透明",
    suitableFor: ["想詢問進階護膚項目", "重視舒適與穩定流程", "希望由專人協助選擇"],
    confirmed: ["實際項目由門市確認", "未確認前不填入假價格", "可先透過 LINE 諮詢"],
    pending: "正式項目、時間、價格、設備與耗材資訊",
  },
]

export const trainingDetails = [
  {
    number: "01",
    title: "美容技術培訓",
    lead: "為想建立基礎知識與實務操作能力的學習者保留完整課程入口",
    outline: ["肌膚基礎與溝通概念", "服務流程與實務操作", "衛生、紀錄與顧客服務"],
    pending: "課程日期、時數、費用、師資、證書與招生資格",
  },
  {
    number: "02",
    title: "創業培訓",
    lead: "從服務設計、顧客溝通到日常營運，建立可執行的美容創業方向",
    outline: ["品牌與服務定位", "預約與顧客關係", "營運流程與實務經驗"],
    pending: "正式課綱、顧問方式、費用、梯次與報名條件",
  },
  {
    number: "03",
    title: "加盟合作",
    lead: "提供合作意向導流；所有條件均以品牌正式說明與合約為準",
    outline: ["合作需求初步了解", "品牌方案與區域評估", "正式文件與雙方確認"],
    pending: "加盟金、權利金、設備、供貨、區域與合約條件",
  },
]

export const policyDrafts = [
  {
    id: "privacy",
    title: "隱私權說明草稿",
    paragraphs: [
      "網站可能於預約、詢問或購物流程中收集使用者主動提供的姓名、電話、電子郵件、配送資訊與訊息內容，僅用於回覆、履約、售後服務及依法應辦事項",
      "正式站會依 SHOPLINE、付款、物流與分析工具的實際設定補上服務供應商、Cookie、資料保存期間、使用者權利及聯絡窗口",
      "本預覽站目前不設表單、不收付款資料，也不會在本站儲存顧客個人資料",
    ],
  },
  {
    id: "shipping",
    title: "付款與配送草稿",
    paragraphs: [
      "可使用的付款方式、配送區域、運費、免運門檻、出貨工作日與物流商，將以 SHOPLINE 正式商店設定及結帳頁顯示為準",
      "目前網站只提供 LINE 商品詢問，不會顯示尚未確認的價格、庫存或到貨承諾",
    ],
  },
  {
    id: "returns",
    title: "退換貨說明草稿",
    paragraphs: [
      "正式政策需依商品性質、包裝衛生、台灣消費者保護規範與品牌作業流程確認後發布退貨期限、申請方式、例外項目、退款時間與運費負擔目前均待客戶核定",
      "商品有瑕疵、錯寄或運送損壞時的照片與聯絡流程，將在客服作業確認後補入；未確認前不以草稿內容作為交易承諾",
    ],
  },
]
