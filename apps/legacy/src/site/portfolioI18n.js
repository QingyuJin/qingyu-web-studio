import { getWorkCaseContent } from "./workCaseI18n.js"

const languages = (en, ja, ko) => ({ en, ja, ko })

const workCopy = {
  servicedesk: {
    category: languages("Service support", "修理 保証 サポート", "수리 보증 고객 지원"),
    summary: languages("Repair warranty and service history in one place", "修理依頼から解決まで一つの流れ", "수리 접수부터 해결까지 한 흐름으로"),
  },
  watchtower: {
    category: languages("Change monitoring", "変化監視", "변경 모니터링"),
    summary: languages("Get notified only when something changes", "変化があった時だけ通知", "변화가 있을 때만 알림"),
  },
  docops: {
    category: languages("Company knowledge", "社内ナレッジ", "회사 지식"),
    summary: languages("Ask company files and verify the source", "社内資料に質問し出典を確認", "회사 문서에 질문하고 출처 확인"),
  },
  flowdesk: {
    category: languages("Workflow automation", "業務自動化", "업무 자동화"),
    summary: languages("Prepare repeat work for review", "繰り返す業務を確認前まで自動で準備", "반복 업무를 검토 전까지 자동 준비"),
  },
  fieldops: {
    category: languages("Field service", "現場業務", "현장 업무"),
    summary: languages("Dispatch records and signoff in one flow", "派遣 記録 完了確認を一つの流れに", "배정 기록 완료 확인을 한 흐름으로"),
  },
  bookcrm: {
    category: languages("Booking and members", "予約と会員", "예약과 회원"),
    summary: languages("Customers book while the team manages the schedule", "顧客は予約 店舗は予定を管理", "고객은 예약하고 매장은 일정을 관리"),
    action: languages("Try booking", "予約を試す", "예약 체험"),
  },
  quoteflow: {
    category: languages("Quotes and sales", "見積もりと成約", "견적과 계약"),
    summary: languages("Pricing versions and approval in one place", "価格 版管理 顧客確認を一つに", "가격 버전 고객 확인을 한곳에"),
    action: languages("Try quoting", "見積もりを試す", "견적 체험"),
  },
  floworder: {
    category: languages("Orders and stock", "注文と在庫", "주문과 재고"),
    summary: languages("Turn order messages into trackable work", "注文メッセージを追跡できる業務に", "주문 메시지를 추적 가능한 업무로"),
    action: languages("Try orders", "注文を試す", "주문 체험"),
  },
  "wholesale-ordering": {
    title: languages("Wholesale Orders", "卸売注文", "도매 주문"),
    category: languages("Wholesale orders", "卸売受注", "도매 접수"),
    summary: languages("Ordering shipping and monthly billing in one flow", "注文 出荷 月次精算を一つの流れに", "주문 출하 월말 정산을 한 흐름으로"),
  },
  buildflow: {
    title: languages("Project Management", "工事案件管理", "공사 프로젝트 관리"),
    category: languages("Project tracking", "工事管理", "공사 관리"),
    summary: languages("Inquiries dispatch and field progress in one place", "問い合わせ 手配 現場進捗を一元管理", "문의 배정 현장 진행을 한곳에서 관리"),
  },
  "rag-consultant": {
    title: languages("AI Knowledge Base", "AI 社内ナレッジ", "AI 회사 지식"),
    category: languages("Document answers", "文書検索", "문서 검색"),
    summary: languages("Ask company files and see the source", "社内文書に質問し出典を確認", "회사 문서에 질문하고 출처 확인"),
  },
  linebot: {
    title: languages("LINE Inquiry Assistant", "LINE 問い合わせ支援", "LINE 문의 도우미"),
    category: languages("Customer inquiries", "顧客問い合わせ", "고객 문의"),
    summary: languages("Gather needs and send complete leads to the dashboard", "要望を聞き取り管理画面へ記録", "요구를 확인하고 관리자 화면에 기록"),
  },
  "restaurant-ordering": {
    title: languages("Restaurant Ordering", "飲食店注文", "식당 주문"),
    category: languages("Restaurant operations", "店舗運営", "식당 운영"),
    summary: languages("Customer orders reach the kitchen at once", "顧客の注文を厨房へすぐ共有", "고객 주문을 주방에 바로 전달"),
  },
  "analytics-dashboard": {
    title: languages("Website Analytics", "サイト成果管理", "웹사이트 성과 관리"),
    category: languages("Website results", "サイト成果", "웹사이트 성과"),
    summary: languages("See where traffic and inquiries come from", "アクセスと問い合わせの流入元を確認", "방문과 문의 유입 경로 확인"),
  },
  "ai-tech-quest": {
    title: languages("AI Support Lab", "AIサポート実験", "AI 고객 지원 실험"),
    category: languages("AI support lab", "AIサポート実験", "AI 고객 지원 실험"),
    summary: languages("Test evidence lookup and human review", "根拠検索と人の確認を試す", "근거 검색과 사람 검토 체험"),
    action: languages("View support lab", "サポート実験を見る", "고객 지원 실험 보기"),
  },
  luluface: { summary: languages("Beauty website concept", "美容サイトのコンセプト", "뷰티 사이트 콘셉트"), action: languages("View concept", "提案を見る", "콘셉트 보기") },
  morie: { summary: languages("Lifestyle curation and branded commerce", "暮らしのセレクトとブランドEC", "라이프스타일 셀렉트와 브랜드 커머스"), action: languages("Try store", "ストアを試す", "스토어 체험") },
  xinjiang: {
    title: languages("Xinjiang Construction", "鑫匠工程", "신장 건설"),
    category: languages("Brand website", "ブランドサイト", "브랜드 웹사이트"),
    summary: languages("Pingtung renovation work and online inquiry", "屏東の左官工事とオンライン相談", "핑둥 미장 공사와 온라인 문의"),
  },
  "biomed-brand-site": {
    title: languages("Biomedical Brand Site", "バイオ医療ブランドサイト", "바이오메디컬 브랜드 사이트"),
    summary: languages("Professional content with a trusted brand image", "専門情報と信頼感あるブランド表現", "전문 정보와 신뢰도 높은 브랜드 표현"),
  },
  "commerce-platform": {
    title: languages("Commerce Store Upgrade", "EC ストア改善", "커머스 스토어 개선"),
    summary: languages("Clear categories and a smoother mobile shopping flow", "商品分類とモバイル購入導線を整理", "상품 분류와 모바일 구매 흐름 개선"),
    action: languages("Try shopping flow", "購入フローを試す", "구매 흐름 체험"),
  },
  "commercial-visual": {
    title: languages("Commercial Visuals", "商業ビジュアル", "상업 비주얼"),
    summary: languages("Campaign and social visual direction", "広告とSNSのビジュアル提案", "캠페인과 소셜 비주얼 제안"),
    action: languages("View visuals", "ビジュアルを見る", "비주얼 보기"),
  },
  "ai-audit": {
    title: languages("AI Website Audit", "AI サイト診断", "AI 웹사이트 진단"),
    category: languages("Website audit", "サイト診断", "웹사이트 진단"),
    summary: languages("Find the website changes worth doing first", "最初に直すべき箇所を確認", "먼저 개선할 부분을 확인"),
  },
  "api-automation": {
    title: languages("Order Sync", "注文自動連携", "주문 자동 연동"),
    category: languages("Workflow sync", "業務連携", "업무 연동"),
    summary: languages("Create records and alerts after form submission", "フォーム送信後に記録と通知を自動作成", "폼 제출 후 기록과 알림을 자동 생성"),
  },
}

const defaultActions = {
  demo: languages("Open demo", "デモを試す", "데모 체험"),
  site: languages("Open site", "サイトを見る", "사이트 보기"),
  fullSite: languages("Open full site", "完全版サイトを見る", "전체 사이트 보기"),
}

const previewCopy = {
  servicedesk: {
    en: { heading: "Today", subject: "Senyao Equipment", rows: [["E07", "Fuli Restaurant X200", "Under warranty"], ["Active", "Service history", "Connected"]], steps: ["Request", "Service", "Close"] },
    ja: { heading: "今日", subject: "森曜設備", rows: [["E07", "富利レストラン X200", "保証期間内"], ["対応中", "修理履歴", "一元管理"]], steps: ["修理依頼", "対応", "完了確認"] },
    ko: { heading: "오늘", subject: "선야오 설비", rows: [["E07", "푸리 식당 X200", "보증 기간"], ["처리 중", "수리 기록", "통합 관리"]], steps: ["수리 접수", "처리", "종료 확인"] },
  },
  watchtower: {
    en: { heading: "Today", subject: "Beichen Commerce", rows: [["Price", "X200 Air Purifier", "Down 15 percent"], ["Stock", "X300 Product", "Restocked"]], steps: ["Watch", "Compare", "Notify"] },
    ja: { heading: "今日", subject: "北辰EC", rows: [["価格", "X200 空気清浄機", "15パーセント低下"], ["在庫", "X300 商品", "入荷済み"]], steps: ["監視", "比較", "通知"] },
    ko: { heading: "오늘", subject: "베이천 커머스", rows: [["가격", "X200 공기청정기", "15퍼센트 하락"], ["재고", "X300 상품", "입고 완료"]], steps: ["감시", "비교", "알림"] },
  },
  docops: {
    en: { heading: "Ask company files", subject: "How long is the X200 warranty", rows: [["24 months", "Warranty policy version 4", "Page 8"], ["Verified", "Open source text", "Cited"]], steps: ["Ask", "Find answer", "Open source"] },
    ja: { heading: "社内資料に質問", subject: "X200の保証期間", rows: [["24か月", "保証規定 第4版", "8ページ"], ["根拠あり", "原文を確認", "引用済み"]], steps: ["質問", "回答確認", "原文へ"] },
    ko: { heading: "회사 문서에 질문", subject: "X200 보증 기간", rows: [["24개월", "보증 정책 4판", "8페이지"], ["근거 확인", "원문 보기", "인용 완료"]], steps: ["질문", "답변 확인", "원문 보기"] },
  },
}

const ui = {
  "zh-Hant": {
    home: {
      brand: "晴宇網站與系統", hero: ["中小企業網站與工作系統", "把詢問接單與管理連成一套"], copy: ["品牌網站 LINE Bot 訂單 預約 報價與派工", "從需求整理 設計開發到正式上線"], viewSystems: "查看代表作品", allWork: "說明需求",
      capabilitiesLabel: "依需求選擇", capabilities: [["客戶看不懂你的服務", "用品牌網站說清楚服務與詢問方式", "查看網站"], ["接單資料散在各處", "用系統整理訂單 預約 報價與派工", "體驗系統"], ["需要 LINE 或技術串接", "把詢問 通知 API 與後台接起來", "了解協作"]],
      latest: "代表作品", tryWork: "網站 LINE Bot 與企業系統", allSystems: "查看全部作品",
      direction: "交付方式", startNeeds: "範圍 帳號 驗收先說清楚", pricing: "了解服務", contactTitle: "先說最想改善哪一段", contactAction: "開始討論",
      services: [["需求確認", "先寫清楚目標 範圍與必要功能", "了解服務"], ["製作測試", "介面 資料與功能一起完成", "查看作品"], ["上線交付", "部署 驗收與維護依約定處理", "合作方式"]],
    },
    works: { label: "作品", title: "依工作需求查看", intro: "同類作品放在一起 快速找到適合的方向", filterLabel: "作品分類", filters: ["全部", "系統", "網站", "工具"], grouped: "完整作品", groupedTitle: "依七種需求查看", featured: "精選", featuredTitle: "六個代表作品", systems: "系統作品", start: "可直接操作", more: "更多系統", websites: "網站作品", brand: "完整網站與設計提案", tools: "工具展示", task: "處理一件小事", contactTitle: "需要適合自己的網站或系統", contactAction: "說明需求" },
    shared: { showcase: "概念提案", showcaseTitle: "產業網站展示", showcaseSummary: "美容 餐飲 工程等網站方向", showcaseAction: "查看展示", flow: "操作流程", statuses: { client: "客戶委託", product: "自主系統", concept: "概念提案" } },
    seo: { homeTitle: "企業系統 LINE Bot 與網站設計 晴宇 Qingyu Web", homeDescription: "晴宇 Qingyu Web 提供企業系統 LINE Bot 網站設計與流程自動化", worksTitle: "企業系統與網站作品 晴宇 Qingyu Web", worksDescription: "查看可操作系統 品牌網站與實用工具" },
  },
  en: {
    home: {
      brand: "Qingyu Web", hero: ["Websites and work systems", "Built for small businesses"], copy: ["Brand sites LINE bots orders booking quotes and field work", "From requirements and design to launch"], viewSystems: "View selected work", allWork: "Share your needs",
      capabilitiesLabel: "Choose by need", capabilities: [["Customers miss your value", "Explain services and inquiries with a clear website", "View websites"], ["Orders live everywhere", "Manage orders booking quotes and field work in one system", "Try systems"], ["You need LINE or API work", "Connect inquiries alerts APIs and dashboards", "View collaboration"]],
      latest: "Selected work", tryWork: "Websites LINE bots and business systems", allSystems: "View all work",
      direction: "Delivery", startNeeds: "Scope accounts and acceptance stay clear", pricing: "View services", contactTitle: "Start with the part that needs work", contactAction: "Start a conversation",
      services: [["Define", "Confirm goals scope and essential features", "View services"], ["Build and test", "Create interface data and functions together", "View work"], ["Launch and handoff", "Handle deployment acceptance and support by scope", "How we work"]],
    },
    works: { label: "Work", title: "Browse by business need", intro: "Similar work stays together so the right direction is easy to find", filterLabel: "Work categories", filters: ["All", "Systems", "Sites", "Tools"], grouped: "All work", groupedTitle: "Browse seven business needs", featured: "Selected", featuredTitle: "Six representative projects", systems: "System work", start: "Ready to try", more: "More systems", websites: "Website work", brand: "Complete sites and concepts", tools: "Useful tools", task: "Solve one task", contactTitle: "Need a website or system for your work", contactAction: "Share your needs" },
    shared: { showcase: "Concept work", showcaseTitle: "Industry website showcase", showcaseSummary: "Beauty dining construction and more", showcaseAction: "View showcase", flow: "Workflow", statuses: { client: "Client work", product: "Original system", concept: "Concept" } },
    seo: { homeTitle: "Business Systems LINE Bots and Website Design Qingyu Web", homeDescription: "Qingyu Web builds business systems LINE bots websites and workflow automation", worksTitle: "Systems and Website Portfolio Qingyu Web", worksDescription: "Explore working systems brand websites and useful tools" },
  },
  ja: {
    home: {
      brand: "Qingyu Web", hero: ["中小企業向けサイトと業務システム", "問い合わせから管理まで一つに"], copy: ["ブランドサイト LINE Bot 受注 予約 見積もり 現場管理", "要件整理 設計 開発 公開まで対応"], viewSystems: "代表実績を見る", allWork: "要望を伝える",
      capabilitiesLabel: "課題から選ぶ", capabilities: [["サービスの価値が伝わらない", "サイトでサービスと問い合わせ方法を明確に", "サイトを見る"], ["受注情報が散らばっている", "受注 予約 見積もり 現場管理を一つに", "システムを試す"], ["LINEやAPI連携が必要", "問い合わせ 通知 API 管理画面をつなぐ", "開発協力を見る"]],
      latest: "代表実績", tryWork: "サイト LINE Bot 業務システム", allSystems: "すべての実績",
      direction: "納品方法", startNeeds: "範囲 アカウント 検収を明確に", pricing: "サービスを見る", contactTitle: "改善したい部分から始める", contactAction: "相談する",
      services: [["要件確認", "目標 範囲 必要機能を明確に", "サービスを見る"], ["制作と検証", "画面 データ 機能をまとめて制作", "実績を見る"], ["公開と引き継ぎ", "公開 検収 保守を合意範囲で対応", "進め方を見る"]],
    },
    works: { label: "実績", title: "業務課題から探す", intro: "近い実績をまとめて適した方向を見つけやすく", filterLabel: "実績分類", filters: ["すべて", "システム", "サイト", "ツール"], grouped: "全実績", groupedTitle: "七つの課題から探す", featured: "代表実績", featuredTitle: "六つの代表プロジェクト", systems: "システム実績", start: "操作できるシステム", more: "その他のシステム", websites: "サイト実績", brand: "完成サイトと提案", tools: "便利なツール", task: "一つの課題を解決", contactTitle: "業務に合うサイトやシステムが必要", contactAction: "要望を伝える" },
    shared: { showcase: "コンセプト", showcaseTitle: "業種別サイト展示", showcaseSummary: "美容 飲食 工事などのサイト", showcaseAction: "展示を見る", flow: "操作フロー", statuses: { client: "依頼実績", product: "自主開発", concept: "コンセプト" } },
    seo: { homeTitle: "業務システム LINE Bot サイト制作 Qingyu Web", homeDescription: "Qingyu Webは業務システム LINE Bot サイト制作 業務自動化を提供", worksTitle: "システムとサイトの実績 Qingyu Web", worksDescription: "操作できるシステム ブランドサイト 便利なツールを紹介" },
  },
  ko: {
    home: {
      brand: "Qingyu Web", hero: ["중소기업 웹사이트와 업무 시스템", "문의부터 관리까지 하나로"], copy: ["브랜드 사이트 LINE Bot 주문 예약 견적 현장 관리", "요구 정리 디자인 개발 공개까지 진행"], viewSystems: "대표 작업 보기", allWork: "요구 전달",
      capabilitiesLabel: "문제로 선택", capabilities: [["고객이 서비스 가치를 모를 때", "사이트로 서비스와 문의 방법을 명확하게", "사이트 보기"], ["주문 정보가 흩어질 때", "주문 예약 견적 현장 관리를 한 시스템으로", "시스템 체험"], ["LINE 또는 API 연동이 필요할 때", "문의 알림 API 관리 화면을 연결", "기술 협업 보기"]],
      latest: "대표 작업", tryWork: "웹사이트 LINE Bot 업무 시스템", allSystems: "전체 작업",
      direction: "납품 방식", startNeeds: "범위 계정 검수를 명확하게", pricing: "서비스 보기", contactTitle: "가장 불편한 부분부터 시작", contactAction: "상담하기",
      services: [["요구 확인", "목표 범위 필수 기능 확인", "서비스 보기"], ["제작과 검증", "화면 데이터 기능을 함께 제작", "작업 보기"], ["공개와 인계", "배포 검수 유지보수를 합의 범위로 진행", "진행 방식"]],
    },
    works: { label: "작업", title: "업무 문제로 찾기", intro: "비슷한 작업을 함께 정리해 맞는 방향을 빠르게 찾습니다", filterLabel: "작업 분류", filters: ["전체", "시스템", "사이트", "도구"], grouped: "전체 작업", groupedTitle: "일곱 가지 문제로 찾기", featured: "대표 작업", featuredTitle: "여섯 개 대표 프로젝트", systems: "시스템 작업", start: "직접 쓰는 시스템", more: "다른 시스템", websites: "웹사이트 작업", brand: "완성 사이트와 제안", tools: "유용한 도구", task: "한 가지 문제 해결", contactTitle: "업무에 맞는 사이트나 시스템이 필요하다면", contactAction: "요구 전달" },
    shared: { showcase: "콘셉트", showcaseTitle: "업종별 사이트 전시", showcaseSummary: "뷰티 외식 공사 등 업종별 사이트", showcaseAction: "전시 보기", flow: "업무 흐름", statuses: { client: "고객 의뢰", product: "자체 시스템", concept: "콘셉트" } },
    seo: { homeTitle: "업무 시스템 LINE Bot 웹사이트 디자인 Qingyu Web", homeDescription: "Qingyu Web은 업무 시스템 LINE Bot 웹사이트 업무 자동화를 제작", worksTitle: "시스템과 웹사이트 포트폴리오 Qingyu Web", worksDescription: "직접 쓰는 시스템 브랜드 사이트 유용한 도구를 소개" },
  },
}

const groupCopy = {
  "zh-Hant": {
    brand: { title: "品牌網站", summary: "品牌內容 商店與詢問入口", problem: "服務與品牌價值不容易被看懂", result: "讓客戶快速理解並找到下一步", steps: ["看懂服務", "查看內容", "開始詢問"], features: ["品牌架構", "手機版", "搜尋基礎"] },
    booking: { title: "預約與詢價", summary: "預約 接待與客戶建檔", problem: "詢問與預約散在不同對話", result: "客戶完成操作 後台收到資料", steps: ["選擇需求", "完成資料", "後台接手"], features: ["客戶入口", "自動整理", "跟進狀態"] },
    sales: { title: "接單與成交", summary: "訂單 報價 出貨與成交", problem: "接單資料分散又容易重複輸入", result: "每筆工作從收到到完成都能追蹤", steps: ["收到需求", "確認內容", "完成處理"], features: ["訂單整理", "狀態追蹤", "成交紀錄"] },
    "field-service": { title: "派工與售後", summary: "現場 派工 報修與完工", problem: "現場紀錄與服務進度分散", result: "公司與現場使用同一份工作紀錄", steps: ["建立工作", "現場處理", "確認完成"], features: ["派工", "現場紀錄", "服務歷史"] },
    knowledge: { title: "文件與知識", summary: "公司文件 查詢與引用", problem: "資料很多卻找不到可靠答案", result: "直接找到答案並回到來源", steps: ["提出問題", "找到答案", "查看來源"], features: ["文件查詢", "來源引用", "權限管理"] },
    automation: { title: "監控與自動化", summary: "異動監控 工作整理與通知", problem: "重複檢查與行政工作耗費時間", result: "系統先整理 有變化再通知", steps: ["設定條件", "自動處理", "確認結果"], features: ["條件規則", "異動紀錄", "即時通知"] },
    growth: { title: "成效與視覺", summary: "網站成效 品牌視覺與測試工具", problem: "網站與廣告效果缺少清楚依據", result: "用資料與視覺找到下一個改善方向", steps: ["查看現況", "找到重點", "開始改善"], features: ["成效整理", "視覺方向", "改善建議"] },
  },
  en: {
    brand: { title: "Brand websites", summary: "Brand content stores and inquiry paths", problem: "Customers cannot quickly understand the brand or service", result: "Make the offer clear and the next step obvious", steps: ["Understand", "Explore", "Contact"], features: ["Brand structure", "Mobile layout", "Search basics"] },
    booking: { title: "Booking and inquiries", summary: "Booking intake and customer records", problem: "Bookings and inquiries are scattered across chats", result: "Customers finish the task and the team gets clean data", steps: ["Choose a need", "Share details", "Team follow up"], features: ["Customer entry", "Data capture", "Follow up status"] },
    sales: { title: "Orders and sales", summary: "Orders quotes shipping and approval", problem: "Sales data is scattered and entered more than once", result: "Track every job from request to completion", steps: ["Receive", "Confirm", "Complete"], features: ["Order capture", "Status tracking", "Sales records"] },
    "field-service": { title: "Field service", summary: "Dispatch repair and completion", problem: "Field notes and service progress are scattered", result: "Office and field teams share one work record", steps: ["Create job", "Do the work", "Close job"], features: ["Dispatch", "Field records", "Service history"] },
    knowledge: { title: "Documents and knowledge", summary: "Company files answers and sources", problem: "The team cannot find a reliable answer in company files", result: "Find the answer and verify the source", steps: ["Ask", "Find", "Verify"], features: ["Document search", "Source links", "Access control"] },
    automation: { title: "Monitoring and automation", summary: "Change tracking workflow and alerts", problem: "Repeat checks and admin work consume time", result: "Let the system prepare the work and flag changes", steps: ["Set rules", "Run", "Review"], features: ["Rules", "Change history", "Alerts"] },
    growth: { title: "Growth and visuals", summary: "Website results brand visuals and audit tools", problem: "Website and campaign decisions lack clear evidence", result: "Use data and visuals to choose the next improvement", steps: ["Review", "Focus", "Improve"], features: ["Results", "Visual direction", "Recommendations"] },
  },
  ja: {
    brand: { title: "ブランドサイト", summary: "ブランド情報 EC 問い合わせ導線", problem: "サービスとブランド価値が伝わりにくい", result: "内容と次の行動をすぐ理解できる", steps: ["サービス確認", "内容を見る", "問い合わせ"], features: ["ブランド設計", "モバイル", "検索対策"] },
    booking: { title: "予約と問い合わせ", summary: "予約 受付 顧客記録", problem: "予約と問い合わせが会話ごとに分散する", result: "顧客が操作を終えると管理側に記録される", steps: ["内容選択", "情報入力", "担当対応"], features: ["顧客入口", "情報整理", "対応状況"] },
    sales: { title: "受注と成約", summary: "注文 見積もり 出荷 成約", problem: "受注情報が分散し二重入力が増える", result: "受付から完了まで一件ずつ追跡できる", steps: ["受付", "確認", "完了"], features: ["受注整理", "状態管理", "成約記録"] },
    "field-service": { title: "現場とサポート", summary: "手配 修理 現場記録 完了", problem: "現場記録と対応状況が分散する", result: "社内と現場で同じ作業記録を使える", steps: ["作業登録", "現場対応", "完了確認"], features: ["手配", "現場記録", "対応履歴"] },
    knowledge: { title: "文書とナレッジ", summary: "社内文書 検索 出典", problem: "社内資料から確かな答えを探しにくい", result: "答えを見つけて出典まで確認できる", steps: ["質問", "回答確認", "出典確認"], features: ["文書検索", "出典表示", "権限管理"] },
    automation: { title: "監視と自動化", summary: "変化監視 業務整理 通知", problem: "繰り返す確認と事務作業に時間がかかる", result: "システムが先に整理し変化だけ通知する", steps: ["条件設定", "自動処理", "結果確認"], features: ["条件ルール", "変更履歴", "通知"] },
    growth: { title: "成果とビジュアル", summary: "サイト成果 ブランド表現 診断ツール", problem: "サイトと広告の判断材料が足りない", result: "データと表現から次の改善点を選べる", steps: ["現状確認", "重点整理", "改善"], features: ["成果整理", "表現設計", "改善提案"] },
  },
  ko: {
    brand: { title: "브랜드 웹사이트", summary: "브랜드 콘텐츠 쇼핑 문의 흐름", problem: "고객이 브랜드와 서비스를 빠르게 이해하기 어렵습니다", result: "서비스와 다음 행동을 분명하게 보여줍니다", steps: ["서비스 이해", "콘텐츠 확인", "문의"], features: ["브랜드 구조", "모바일 화면", "검색 기본"] },
    booking: { title: "예약과 문의", summary: "예약 접수 고객 기록", problem: "예약과 문의가 여러 대화에 흩어집니다", result: "고객이 완료하면 관리 화면에 정보가 남습니다", steps: ["요구 선택", "정보 입력", "담당자 확인"], features: ["고객 화면", "정보 정리", "후속 상태"] },
    sales: { title: "주문과 계약", summary: "주문 견적 출하 계약", problem: "주문 정보가 흩어지고 중복 입력이 생깁니다", result: "요청부터 완료까지 한 건씩 추적합니다", steps: ["접수", "확인", "완료"], features: ["주문 정리", "상태 추적", "계약 기록"] },
    "field-service": { title: "현장과 고객 지원", summary: "배정 수리 현장 기록 완료", problem: "현장 기록과 처리 상태가 흩어집니다", result: "사무실과 현장이 같은 작업 기록을 봅니다", steps: ["작업 등록", "현장 처리", "완료 확인"], features: ["배정", "현장 기록", "서비스 이력"] },
    knowledge: { title: "문서와 지식", summary: "회사 문서 검색과 출처", problem: "회사 자료에서 믿을 수 있는 답을 찾기 어렵습니다", result: "답을 찾고 출처까지 확인합니다", steps: ["질문", "답변 확인", "출처 확인"], features: ["문서 검색", "출처 표시", "권한 관리"] },
    automation: { title: "모니터링과 자동화", summary: "변경 감시 업무 정리 알림", problem: "반복 확인과 행정 업무에 시간이 듭니다", result: "시스템이 먼저 정리하고 변화만 알립니다", steps: ["조건 설정", "자동 처리", "결과 확인"], features: ["조건 규칙", "변경 이력", "알림"] },
    growth: { title: "성과와 비주얼", summary: "웹사이트 성과 브랜드 비주얼 진단 도구", problem: "웹사이트와 광고 판단에 근거가 부족합니다", result: "데이터와 비주얼로 다음 개선점을 찾습니다", steps: ["현황 확인", "핵심 선택", "개선"], features: ["성과 정리", "비주얼 방향", "개선 제안"] },
  },
}

const detailUi = {
  "zh-Hant": { back: "返回作品", problem: "目前問題", outcome: "完成結果", flow: "操作流程", includes: "核心內容", related: "同類作品", open: "開啟體驗", contact: "討論類似需求", details: "查看細節", technology: "技術說明", technologyCopy: "依實際流程確認資料 權限與串接方式", safe: "展示使用獨立資料 不會對外傳送", seo: "作品細節" },
  en: { back: "Back to work", problem: "Current problem", outcome: "Result", flow: "Workflow", includes: "Core scope", related: "Related work", open: "Open experience", contact: "Discuss a similar need", details: "View details", technology: "Technical notes", technologyCopy: "Data access and integrations follow the agreed workflow", safe: "The demo uses isolated data and sends nothing outside", seo: "Work details" },
  ja: { back: "実績一覧へ", problem: "現在の課題", outcome: "完成後", flow: "操作フロー", includes: "主な内容", related: "同じ分野の実績", open: "体験を開く", contact: "同じ課題を相談", details: "詳細を見る", technology: "技術説明", technologyCopy: "データ 権限 連携方法は実際の業務に合わせて確認", safe: "デモは独立データを使用し外部送信しません", seo: "実績詳細" },
  ko: { back: "작업 목록", problem: "현재 문제", outcome: "완성 결과", flow: "업무 흐름", includes: "핵심 내용", related: "비슷한 작업", open: "체험 열기", contact: "비슷한 요구 상담", details: "자세히 보기", technology: "기술 안내", technologyCopy: "데이터 권한 연동 방식은 실제 업무에 맞춰 정합니다", safe: "체험은 분리된 데이터를 사용하며 외부로 전송하지 않습니다", seo: "작업 상세" },
}

const evidenceCopy = {
  "zh-Hant": { fullSite: "完整網站", workspace: "完整系統", controlled: "受控資料", guided: "引導體驗", concept: "概念提案", prototype: "功能原型", visual: "視覺作品" },
  en: { fullSite: "Full site", workspace: "Working system", controlled: "Controlled data", guided: "Guided demo", concept: "Concept", prototype: "Prototype", visual: "Visual work" },
  ja: { fullSite: "完成サイト", workspace: "業務システム", controlled: "管理データ", guided: "操作デモ", concept: "コンセプト", prototype: "機能試作", visual: "ビジュアル" },
  ko: { fullSite: "완성 사이트", workspace: "업무 시스템", controlled: "관리 데이터", guided: "안내 체험", concept: "콘셉트", prototype: "기능 원형", visual: "비주얼 작업" },
}

export const siteChrome = {
  "zh-Hant": { brandLine: "網站 系統 自動化", nav: ["系統", "展示空間", "作品", "價格"], services: "服務", menu: [["企業系統", "管理後台與工作流程"], ["LINE Bot", "詢問分流 預約與自動建檔"], ["網站設計", "品牌架構與詢問動線"], ["流程自動化", "表單 API 通知與後台串接"]], start: "說明需求", footer: "企業系統 LINE Bot 與網站設計", footerNav: ["系統", "展示空間", "作品", "服務", "價格", "關於", "協作", "聯絡"], email: "電子郵件", footerNote: "好用也好看" },
  en: { brandLine: "Web systems and automation", nav: ["Systems", "Showcase", "Work", "Pricing"], services: "Services", menu: [["Business systems", "Dashboards and workflows"], ["LINE Bot", "Inquiry routing booking and lead capture"], ["Website design", "Brand structure and inquiry flow"], ["Workflow automation", "Forms APIs alerts and dashboard links"]], start: "Share your needs", footer: "Business systems LINE bots and website design", footerNav: ["Systems", "Showcase", "Work", "Services", "Pricing", "About", "Delivery", "Contact"], email: "Email", footerNote: "Useful and refined" },
  ja: { brandLine: "サイト システム 自動化", nav: ["システム", "サイト展示", "実績", "料金"], services: "サービス", menu: [["業務システム", "管理画面と業務フロー"], ["LINE Bot", "問い合わせ 予約 顧客記録"], ["サイト制作", "ブランド設計と問い合わせ導線"], ["業務自動化", "フォーム API 通知の連携"]], start: "要望を伝える", footer: "業務システム LINE Bot サイト制作", footerNav: ["システム", "サイト展示", "実績", "サービス", "料金", "概要", "開発協力", "相談"], email: "メール", footerNote: "使いやすく美しく" },
  ko: { brandLine: "웹사이트 시스템 자동화", nav: ["시스템", "사이트 전시", "포트폴리오", "가격"], services: "서비스", menu: [["업무 시스템", "관리 화면과 업무 흐름"], ["LINE Bot", "문의 분류 예약 고객 정보 저장"], ["웹사이트 디자인", "브랜드 구조와 문의 흐름"], ["업무 자동화", "폼 API 알림 관리 화면 연동"]], start: "요구 전달", footer: "업무 시스템 LINE Bot 웹사이트 디자인", footerNav: ["시스템", "사이트 전시", "포트폴리오", "서비스", "가격", "소개", "기술 협업", "문의"], email: "이메일", footerNote: "쉽고 세련되게" },
}

export function getPortfolioText(locale) {
  return ui[locale] ?? ui["zh-Hant"]
}

export function getWorkGroupText(group, locale) {
  const language = groupCopy[locale] ?? groupCopy["zh-Hant"]
  return language[group] ?? language.growth
}

export function getWorkDetailText(locale) {
  return detailUi[locale] ?? detailUi["zh-Hant"]
}

export function getWorkEvidenceLabel(item, locale) {
  const language = evidenceCopy[locale] ?? evidenceCopy["zh-Hant"]
  return language[item.evidence] ?? language.prototype
}

export function getLocalizedWork(item, locale) {
  if (locale === "zh-Hant") return item
  const copy = workCopy[item.slug] ?? {}
  const detail = getWorkCaseContent(item, locale, getWorkGroupText(item.group, locale))
  const actionType = item.nature === "client" ? "fullSite" : item.section === "websites" ? "site" : "demo"
  return {
    ...item,
    shortTitle: copy.title?.[locale] ?? item.shortTitle,
    categoryLabel: copy.category?.[locale] ?? item.categoryLabel,
    summary: copy.summary?.[locale] ?? item.summary,
    problem: detail.problem,
    solution: detail.outcome,
    entryLabel: copy.action?.[locale] ?? defaultActions[actionType][locale],
    preview: previewCopy[item.slug]?.[locale] ?? null,
  }
}

export function getWorkStatusLabel(item, locale) {
  const copy = getPortfolioText(locale)
  return copy.shared.statuses[item.nature] ?? copy.shared.statuses.concept
}

export function formatPortfolioCount(count, locale) {
  if (locale === "en") return `${count} works`
  if (locale === "ja") return `${count}件の実績`
  if (locale === "ko") return `작업 ${count}개`
  return `顯示 ${count} 件作品`
}

export const portfolioLanguages = ["zh-Hant", "en", "ja", "ko"]
