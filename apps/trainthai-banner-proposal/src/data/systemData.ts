import type { Direction, PageData } from "../types"

export const directions: Direction[] = [
  {
    id: "original",
    name: "原版",
    label: "原版",
    description: "保留客戶現行 Banner，作為構圖與精修幅度的比較基準。",
  },
  {
    id: "A",
    name: "墨題",
    label: "A｜墨題",
    description:
      "一整塊墨黑承載頁名、白字反白，實拍照片守住右側的灰。黑與灰硬碰硬接邊，不做任何過渡。",
  },
  {
    id: "B",
    name: "嵌塊",
    label: "B｜嵌塊",
    description:
      "照片嵌成一個精確的方塊，四周留出寬闊的灰，右緣對齊內文版心。留白本身就是設計，標題上方一道墨色短棒定錨。",
  },
  {
    id: "C",
    name: "雙階",
    label: "C｜雙階",
    description:
      "深灰與淺灰以一條硬邊水平分割，照片直立跨過接縫，把上下兩階縫在一起。",
  },
  {
    id: "D",
    name: "錯位",
    label: "D｜錯位",
    description:
      "一塊更深的灰在後、照片錯開壓在其上，兩個區塊互相交疊而不是並排。不靠陰影做出景深。",
  },
]

export const pages: PageData[] = [
  {
    id: "about",
    englishName: "ABOUT TRAIN THAI",
    chineseName: "關於全泰工業",
    contentEyebrow: "TRAIN THAI CO., LTD.",
    contentTitle: "專業精密沖壓，卓越國際品質",
    contentParagraphs: [
      "全泰工業有限公司創立於民國97年，長期專注於金屬沖壓加工領域，致力於為全球客戶提供高品質且穩定的沖壓零組件。",
      "多年來，公司持續累積製造經驗與技術能量，已建立成熟且高效率的生產體系，能靈活應對不同產業與市場需求。",
    ],
    image: "/assets/client/about-press.webp",
    imageAlt: "全泰工業沖壓產線",
    bannerFocus: "58% 45%",
  },
  {
    id: "core",
    englishName: "CORE COMPETENCY",
    chineseName: "核心能力",
    contentEyebrow: "INTEGRATED MANUFACTURING",
    contentTitle: "精密製程整合，回應多元需求",
    contentParagraphs: [
      "從模具規劃、沖壓成型到後加工與組裝，全泰以完整的製程整合能力，協助客戶縮短溝通與交付流程。",
      "少量多樣與大量量產皆可彈性安排，兼顧品質穩定、成本與生產效率。",
    ],
    image: "/assets/client/core-process.webp",
    imageAlt: "模具與精密沖壓加工",
    bannerFocus: "52% 50%",
  },
  {
    id: "scope",
    englishName: "MACHINING CAPACITY",
    chineseName: "加工範圍",
    contentEyebrow: "FLEXIBLE PRODUCTION",
    contentTitle: "少量多樣／大量量產皆可承接",
    contentParagraphs: [
      "全泰依材料、零件結構與交期需求規劃合適製程，提供從試作到穩定量產的彈性生產服務。",
      "並可整合表面處理、後加工及組裝，降低跨供應商管理的時間成本。",
    ],
    image: "/assets/client/scope-material.webp",
    imageAlt: "全泰工業金屬材料加工",
    bannerFocus: "50% 52%",
  },
  {
    id: "techniques",
    englishName: "STAMPING TECHNIQUES",
    chineseName: "沖壓方式",
    contentEyebrow: "STAMPING SOLUTIONS",
    contentTitle: "依產品特性規劃最適製程",
    contentParagraphs: [
      "依零件精度、成型深度與量產規模，靈活運用連續沖模、單工程模、拉深模及精密沖裁。",
      "以成熟的模具與製程管理，維持每一次成型的穩定度與一致性。",
    ],
    image: "/assets/client/techniques-press.webp",
    imageAlt: "沖床與金屬成型設備",
    bannerFocus: "64% 58%",
  },
  {
    id: "quality",
    englishName: "QUALITY CONTROL",
    chineseName: "品質控管",
    contentEyebrow: "CONSISTENT QUALITY",
    contentTitle: "從首件到出貨，維持穩定一致",
    contentParagraphs: [
      "透過製程檢驗、量測設備與標準化品質管理，在生產各階段確認尺寸、外觀及功能要求。",
      "以可追溯的管理流程，確保產品符合客戶規格與國際市場需求。",
    ],
    image: "/assets/client/quality-inspection.webp",
    imageAlt: "全泰工業品質檢驗",
    bannerFocus: "48% 46%",
  },
]

export const aboutPage = pages[0]
