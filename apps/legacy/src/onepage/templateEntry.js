const copy = {
  "zh-Hant": {
    label: "一頁式模板",
    title: "六個產業 一頁說清楚",
    text: "從服務介紹到聯絡入口 找適合你的網站方向",
    action: "瀏覽六套模板",
    note: "概念展示 非真實客戶網站",
  },
  en: {
    label: "One page templates",
    title: "Six industries One clear page",
    text: "From services to contact Find a direction for your website",
    action: "Explore six templates",
    note: "Design concepts Not client websites",
  },
  ja: {
    label: "一ページテンプレート",
    title: "六つの業種を 一ページで",
    text: "サービスから問い合わせまで サイトの方向性を探す",
    action: "六つのテンプレートを見る",
    note: "デザイン提案 実際の顧客サイトではありません",
  },
  ko: {
    label: "원페이지 템플릿",
    title: "여섯 업종을 한 페이지에",
    text: "서비스 소개부터 문의까지 사이트 방향을 찾아보세요",
    action: "템플릿 여섯 개 보기",
    note: "디자인 제안 실제 고객 사이트가 아닙니다",
  },
}

export function getTemplateEntryCopy(locale) {
  return copy[locale] ?? copy["zh-Hant"]
}
