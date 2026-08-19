export type Artwork = {
  kind: "Desktop Banner" | "Mobile Banner" | "Social Ad"
  size: "1920 × 720" | "750 × 900" | "1080 × 1080"
  src: string
  filename: string
  alt: string
}

export type Campaign = {
  id: "beauty" | "interior" | "patisserie" | "operations"
  index: string
  industry: string
  brand: string
  focus: string
  description: string
  accent: string
  artworks: Artwork[]
  process: {
    src: string
    filename: string
    alt: string
  }
}

const campaignData: Campaign[] = [
  {
    id: "beauty",
    index: "01",
    industry: "Skin Management",
    brand: "SOMME 肌理研究所",
    focus: "去背商品 × 人物肌膚 × 系列資訊",
    description:
      "重新建立琥珀瓶身商品組，完成去背、接觸陰影、標籤與人物光線匹配；三種尺寸各自調整人物視線、產品比例與資訊密度。",
    accent: "#72513e",
    artworks: [
      {
        kind: "Desktop Banner",
        size: "1920 × 720",
        src: "/campaigns/final/somme-desktop-1920x720.png",
        filename: "somme-desktop-1920x720.png",
        alt: "SOMME 美容品牌桌機 Banner，人物肌膚、去背精華瓶身、成分資訊與系列標籤完整合成",
      },
      {
        kind: "Mobile Banner",
        size: "750 × 900",
        src: "/campaigns/final/somme-mobile-750x900.png",
        filename: "somme-mobile-750x900.png",
        alt: "SOMME 美容品牌手機 Banner，以人物特寫與獨立商品情境重新構圖",
      },
      {
        kind: "Social Ad",
        size: "1080 × 1080",
        src: "/campaigns/final/somme-social-1080x1080.png",
        filename: "somme-social-1080x1080.png",
        alt: "SOMME 美容品牌社群廣告，產品合成、價格與促銷系列資訊清楚呈現",
      },
    ],
    process: {
      src: "/campaigns/process/somme-process-1800x1080.png",
      filename: "somme-process-1800x1080.png",
      alt: "SOMME 原始人物素材、去背商品與光影合成、最終桌機 Banner 的製作過程",
    },
  },
  {
    id: "interior",
    index: "02",
    industry: "Interior Architecture",
    brand: "序所空間",
    focus: "空間調色 × 平面線稿 × 材質系統",
    description:
      "保留木材、石材、庭院與自然採光，進行暖灰色調校正；加入住宅平面圖、材質編號與專案資訊，建立室內設計提案廣告感。",
    accent: "#a57a54",
    artworks: [
      {
        kind: "Desktop Banner",
        size: "1920 × 720",
        src: "/campaigns/final/xusuo-desktop-1920x720.png",
        filename: "xusuo-desktop-1920x720.png",
        alt: "序所空間桌機 Banner，住宅攝影、平面線稿、材質編號與作品資訊整合",
      },
      {
        kind: "Mobile Banner",
        size: "750 × 900",
        src: "/campaigns/final/xusuo-mobile-750x900.png",
        filename: "xusuo-mobile-750x900.png",
        alt: "序所空間手機 Banner，重新聚焦庭院光線並配置建築圖層",
      },
      {
        kind: "Social Ad",
        size: "1080 × 1080",
        src: "/campaigns/final/xusuo-social-1080x1080.png",
        filename: "xusuo-social-1080x1080.png",
        alt: "序所空間社群廣告，空間攝影、材質色票與完整案例資訊重新構圖",
      },
    ],
    process: {
      src: "/campaigns/process/xusuo-process-1800x1080.png",
      filename: "xusuo-process-1800x1080.png",
      alt: "序所空間原始攝影、調色與建築圖層、最終 Banner 的製作過程",
    },
  },
  {
    id: "patisserie",
    index: "03",
    industry: "Artisan Pâtisserie",
    brand: "MÛR 熟成菓製",
    focus: "食品攝影 × 包裝盒 × 食材情境",
    description:
      "將甜點攝影與獨立製作的禮盒、包裝紙、榛果及酥片素材合成，加入品牌貼紙、價格與限定日期，完成可直接投放的新品 Campaign。",
    accent: "#ad7441",
    artworks: [
      {
        kind: "Desktop Banner",
        size: "1920 × 720",
        src: "/campaigns/final/mur-desktop-1920x720.png",
        filename: "mur-desktop-1920x720.png",
        alt: "MÛR 甜點新品桌機 Banner，千層攝影與包裝禮盒、食材、價格完整合成",
      },
      {
        kind: "Mobile Banner",
        size: "750 × 900",
        src: "/campaigns/final/mur-mobile-750x900.png",
        filename: "mur-mobile-750x900.png",
        alt: "MÛR 甜點新品手機 Banner，甜點切面與包裝情境分層重新構圖",
      },
      {
        kind: "Social Ad",
        size: "1080 × 1080",
        src: "/campaigns/final/mur-social-1080x1080.png",
        filename: "mur-social-1080x1080.png",
        alt: "MÛR 甜點新品社群廣告，食品攝影、禮盒與期間限定資訊完整呈現",
      },
    ],
    process: {
      src: "/campaigns/process/mur-process-1800x1080.png",
      filename: "mur-process-1800x1080.png",
      alt: "MÛR 原始食品攝影、包裝與食材去背合成、最終 Banner 的製作過程",
    },
  },
  {
    id: "operations",
    index: "04",
    industry: "Business Operations",
    brand: "ORDO 營運協作系統",
    focus: "介面設計 × 裝置合成 × 企業品牌延伸",
    description:
      "從資訊架構開始設計營運工作台與手機摘要，保留真實訂單狀態、工作列表與下一步，再延伸品牌幾何、裝置與週報印刷物。",
    accent: "#b34931",
    artworks: [
      {
        kind: "Desktop Banner",
        size: "1920 × 720",
        src: "/campaigns/final/ordo-desktop-1920x720.png",
        filename: "ordo-desktop-1920x720.png",
        alt: "ORDO 企業服務桌機 Banner，可信營運介面、裝置畫面與週報印刷物完整設計",
      },
      {
        kind: "Mobile Banner",
        size: "750 × 900",
        src: "/campaigns/final/ordo-mobile-750x900.png",
        filename: "ordo-mobile-750x900.png",
        alt: "ORDO 企業服務手機 Banner，以獨立手機營運摘要與工作狀態重新設計",
      },
      {
        kind: "Social Ad",
        size: "1080 × 1080",
        src: "/campaigns/final/ordo-social-1080x1080.png",
        filename: "ordo-social-1080x1080.png",
        alt: "ORDO 企業服務社群廣告，產品介面、裝置與企業視覺延伸完整呈現",
      },
    ],
    process: {
      src: "/campaigns/process/ordo-process-1800x1080.png",
      filename: "ordo-process-1800x1080.png",
      alt: "ORDO 資訊架構草稿、介面與品牌系統、最終企業 Banner 的製作過程",
    },
  },
]

export const campaigns: Campaign[] = campaignData.map((campaign) => ({
  ...campaign,
  artworks: campaign.artworks.map((artwork) => ({
    ...artwork,
    src: `${import.meta.env.BASE_URL}${artwork.src.replace(/^\//, "")}`,
  })),
  process: {
    ...campaign.process,
    src: `${import.meta.env.BASE_URL}${campaign.process.src.replace(/^\//, "")}`,
  },
}))
