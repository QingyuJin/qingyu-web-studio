import { workCatalog } from "./workCatalog.js"

export const studioSeo = {
  path: "/",
  title: "晴宇 品牌網站設計與企業系統開發",
  description:
    "晴宇為台灣店家與企業設計品牌網站 開發業務系統 串接 LINE 自動詢價 報價與預約",
  image: "/og/qingyuweb-20260915-9855ae14.png",
  imageWidth: 1200,
  imageHeight: 630,
}

// Public descriptions follow the capabilities and evidence in the existing catalog.
// Screenshots are captured from working demonstrations; no business metrics are invented.
const presentation = {
  morie: [
    "生活選品品牌網站",
    "想讓客人記得品牌 也輕鬆找到喜歡的商品",
    "從品牌故事 商品探索到購物流程 讓每一步都有一致的感受",
    "websites",
  ],
  luluface: [
    "美容品牌與服務網站",
    "服務很多 卻不知道怎麼讓客人看懂差別",
    "整理護膚服務 商品與預約入口 讓第一次來的客人也有方向",
    "websites",
  ],
  xinjiang: [
    "在地工程品牌網站",
    "手藝做得好 卻少了一個能介紹自己的地方",
    "用施工照片 服務說明與詢價入口 讓客人看見師傅的專業",
    "websites",
  ],
  "biomed-brand-site": [
    "生醫品牌形象網站",
    "專業資訊很多 客人卻找不到重點",
    "把品牌故事與專業內容排出層次 讓資訊容易閱讀",
    "websites",
  ],
  "commerce-platform": [
    "電商購物體驗整理",
    "商品上架了 手機上的購物動線卻不順",
    "重新整理分類 商品頁與購物流程 讓探索更直覺",
    "websites",
  ],
  "commercial-visual": [
    "品牌廣告與社群視覺",
    "網站 廣告與社群看起來不像同一個品牌",
    "建立一致的畫面語言 再延伸到不同版位與尺寸",
    "websites",
  ],
  bookcrm: [
    "美容預約與客戶管理",
    "預約寫在行事曆 客人紀錄又放在別處",
    "把預約 會員 套票與服務紀錄放在一起 顧客與店家都好操作",
    "systems",
  ],
  quoteflow: [
    "報價與成交管理",
    "報價改了好幾版 最後確認的是哪一份",
    "從成本 報價版本到客戶確認 都有清楚的紀錄可以回頭查",
    "systems",
  ],
  floworder: [
    "批發訂單與庫存管理",
    "LINE Excel 和紙本訂單常常混在一起",
    "把訊息整理成可核對的訂單 再接到庫存與處理紀錄",
    "systems",
  ],
  servicedesk: [
    "報修與售後服務管理",
    "客人又來問進度 卻找不到上一位同事的紀錄",
    "串起報修 保固 派工與結案 接手的人也能掌握事情",
    "systems",
  ],
  fieldops: [
    "現場派工與完工管理",
    "師傅人在現場 公司卻不知道做到哪裡",
    "安排工作 留下照片與材料 再由客戶簽名確認完工",
    "systems",
  ],
  watchtower: [
    "網站異動與通知管理",
    "每天反覆查看價格 庫存與公告",
    "保存檢查結果 符合條件的變化集中顯示 方便核對",
    "automation",
  ],
  flowdesk: [
    "企業流程自動化",
    "同一份資料 每天都要複製到不同系統",
    "先整理待辦與建議 重要動作經你確認後執行 並留下紀錄",
    "automation",
  ],
  docops: [
    "公司文件與知識搜尋",
    "文件很多 卻不確定哪個版本才是答案",
    "依閱讀權限搜尋文件 回到原文與版本核對依據",
    "ai",
  ],
  "rag-consultant": [
    "AI 文件問答與來源查詢",
    "同事一直問相同問題 答案散在不同文件",
    "以文件問答概念展示 呈現答案 來源與原文的閱讀流程",
    "ai",
  ],
  linebot: [
    "LINE 詢價與接待助手",
    "每天都在 LINE 回答相同問題",
    "用對話逐步收集需求 讓後台收到有重點的詢價內容",
    "automation",
  ],
  "wholesale-ordering": [
    "批發訂貨流程",
    "客戶價格 出貨與月結各記在不同地方",
    "用可操作的概念作品 走一次接單到對帳的流程",
    "systems",
  ],
  buildflow: [
    "工程案件與進度管理",
    "詢價 報價與工地回報散在聊天紀錄",
    "把案件資料與現場進度整理在同一條工作流程",
    "systems",
  ],
  "restaurant-ordering": [
    "餐飲點餐與廚房控單",
    "外場接到訂單 廚房卻還沒收到",
    "從顧客點餐 廚房佇列到桌況 展示同一筆訂單的流向",
    "systems",
  ],
  "analytics-dashboard": [
    "網站成效與詢問來源",
    "網站有人看 卻不知道詢問從哪裡來",
    "用範例呈現流量 點擊與表單的閱讀方式",
    "experiments",
  ],
  "ai-tech-quest": [
    "AI 客服互動實驗",
    "想先理解 AI 可以怎麼幫忙接待客人",
    "以固定範例體驗文件問答 分類與店家助手",
    "experiments",
  ],
  "ai-audit": [
    "網站健檢報告概念",
    "知道網站要改善 卻不知道先改哪裡",
    "以互動範例說明問題排序與可執行的改善建議",
    "experiments",
  ],
  "api-automation": [
    "訂單自動同步概念",
    "表單送出了 還得手動建檔和通知",
    "體驗資料核對 狀態回傳與失敗重試的流程",
    "automation",
  ],
}

export const featuredSlugs = [
  "morie",
  "quoteflow",
  "bookcrm",
  "linebot",
  "rag-consultant",
  "xinjiang",
]
const caseNarratives = {
  morie: [
    "先用品牌故事建立氛圍 再讓商品分類 詳情 購物車接成同一條路 桌面保留大圖與留白 手機把探索與購物入口放在容易找到的位置",
    "可以從首頁一路瀏覽商品 加入購物車並體驗模擬結帳 這是一個完整的品牌購物概念 沒有實際付款",
  ],
  luluface: [
    "把商品 護膚服務與培訓內容分開整理 讓使用者先找到適合自己的服務 再閱讀細節與預約方向 減少在大量資訊中來回找尋",
    "服務與商品都有清楚的探索入口 手機也能完成瀏覽 畫面呈現品牌提案與互動設計 內容為概念展示",
  ],
  xinjiang: [
    "以實際施工照片作為主要說服力 將工項 施作流程與聯絡方式整理在一起 網站文字貼近工程行平常和客人說話的方式 手機可直接找到詢價入口",
    "原本需要逐一傳送的服務與施工照片 有了可以一起分享的網站入口 客人能先了解服務 再帶著具體需求詢問",
  ],
  "biomed-brand-site": [
    "將品牌故事 專業內容與活動資訊分成不同閱讀層次 用清楚的標題和安靜的版面 讓想快速了解與想深入閱讀的人各自找到方向",
    "同一個網站可以承接品牌介紹與內容閱讀 這是資訊設計與視覺概念 人物 活動與營運內容是展示資料",
  ],
  "commerce-platform": [
    "先檢查分類到商品的路徑 再整理商品頁重點 購物車回饋與手機操作 透過品牌商店概念展示 讓購物流程能實際走一遍",
    "使用者可以從分類進入商品 核對選項並操作購物車 展示用來討論動線 不涉及真實交易",
  ],
  "commercial-visual": [
    "從各品牌的調性出發 確立畫面主次 字體與影像方向 再延伸成桌面 手機與社群素材",
    "可以比較同一套視覺在不同版位中的閱讀效果 作品是自主製作的視覺提案 不把它當成客戶投放成績",
  ],
  quoteflow: [
    "以一份報價作為工作主線 串起品項 成本 修改版本與客戶確認 每次修訂保留脈絡 讓業務與客戶對照的是明確的一份內容",
    "報價不只是一份寄出去的文件 可以回查修訂 確認狀態與成交歷史 接手時也看得到前後變化",
  ],
  bookcrm: [
    "分別整理顧客 員工與店長會做的事 再讓三個角色使用同一筆預約資料 顧客選服務與時段 員工處理服務 店長查看會員與套票",
    "預約與後續服務紀錄可以接在一起 不同角色看到各自需要的內容 資料能在體驗工作區中保存與核對",
  ],
  floworder: [
    "先收進原始訊息 將辨識結果交給人員確認 再建立正式訂單 商品 價格 庫存與後續處理狀態接在同一條流程",
    "訂單有來源可查 也有狀態與庫存紀錄可以核對 訊息辨識後保留人工確認 避免把未核對內容直接當成正式訂單",
  ],
  servicedesk: [
    "用一張服務單連接客戶報修 保固判斷 派工 零件與售後紀錄 客服和技師各自處理手上的工作 再把處理歷史留回同一處",
    "接手人員能追溯事情如何受理 交給誰 做過哪些處理 結案後仍保留服務歷史 方便下次詢問時查找",
  ],
  fieldops: [
    "先釐清公司 技師與客戶三方的流程 再把派工 到場 照片 材料與簽名接在同一張工單 手機畫面聚焦現場需要完成的動作",
    "現場紀錄可以回到公司端查看 完工也有客戶確認的依據 照片 材料與時間不必再各自尋找",
  ],
  watchtower: [
    "先定義要留意的來源與變化條件 再保存每次檢查的快照 符合規則的異動和通知集中呈現 方便回頭核對",
    "可以比較來源快照 查看異動歷史與站內通知 展示採受控來源 讓監控判斷過程可清楚驗證",
  ],
  flowdesk: [
    "把收到工作 整理建議 人工確認與執行結果拆成明確階段 需要判斷的地方停下來等人確認 執行後保留歷史與重試資訊",
    "看得見待確認內容 也能追溯執行結果 自動化先處理整理工作 重要決定仍留給使用者",
  ],
  docops: [
    "先處理文件的生效版本與閱讀權限 再讓搜尋結果連回支持答案的原文 這個版本採原文搜尋 重點是讓人找到可核對的依據",
    "員工可以在自己的權限範圍內查文件 從結果回到來源與版本 搜尋歷史也能留下 不必只憑印象轉述答案",
  ],
  "rag-consultant": [
    "以文件 問題 答案與來源四個部分組織操作畫面 先讓人理解提問與核對原文的流程 再討論正式資料 權限及模型串接需求",
    "可以操作文件問答的展示流程 閱讀回答與引用段落 這個概念使用固定展示資料 沒有把它當成正式 AI 服務",
  ],
  linebot: [
    "將常見詢價拆成幾個容易回答的小問題 對話一步步收集內容 再整理成後台可閱讀的需求 讓接手的人先掌握重點",
    "可以體驗問題選擇與需求收集 看到對話如何整理成詢價內容 展示不會真的向 LINE 或客戶發送訊息",
  ],
  "wholesale-ordering": [
    "先建立客戶下單與業務處理的兩個視角 再以同一筆訂單串起商品 價格 出貨與月結",
    "可以操作下單 處理與對帳的展示流程 確認每個角色需要哪些資料 範例狀態與正式營運資料分開",
  ],
  buildflow: [
    "將詢價到案件的資料接在一起 讓工程進度 施工紀錄與後續處理有共同的查看位置",
    "可以體驗案件進度更新與工作資料的整理方式 概念展示用來確認流程 不會更動正式案件",
  ],
  "restaurant-ordering": [
    "從顧客點餐到廚房接單建立連續流程 讓桌況與餐點狀態各有明確的位置 避免靠口頭重複轉達",
    "可以操作一筆示範點餐 查看餐點如何進入廚房佇列 畫面中的營收與桌況是展示資料",
  ],
  "analytics-dashboard": [
    "把瀏覽 搜尋 點擊與表單分成容易理解的層次 用範例說明數據應該如何幫忙回答營運問題",
    "可以探索指標與報表的閱讀方式 展示中的數值不是本工作室或客戶的真實流量與營收",
  ],
  "ai-tech-quest": [
    "將文件問答 分類與店家助手做成小型互動情境 每個情境只回答一個問題 方便先理解能力與限制",
    "可以透過固定範例查看不同互動方式 作為討論正式功能的起點 沒有把範例輸出當成外部服務已完成串接的證明",
  ],
  "ai-audit": [
    "將健檢結果按問題 影響與優先順序整理 讓閱讀者知道一項建議對應到哪個頁面或操作",
    "可以操作報告概念與改善排序 理解交付物會如何閱讀 展示結果來自範例 並非對你的網站完成真實掃描",
  ],
  "api-automation": [
    "把表單資料 欄位核對 送出與失敗重試分開呈現 讓同步不是只有成功畫面 也能看懂出錯時要如何處理",
    "可以查看資料同步與重試的互動流程 概念展示不會建立正式訂單或寄送通知",
  ],
}
export const studioWorks = workCatalog.map((source) => {
  const [headline, question, answer, category] = presentation[source.slug]
  return {
    ...source,
    headline,
    question,
    answer,
    category,
    approach: caseNarratives[source.slug][0],
    effect: caseNarratives[source.slug][1],
    caseUrl:
      source.slug === "linebot"
        ? "/works/line-bot"
        : source.slug === "commerce-platform"
          ? "/works/ecommerce-platform-redesign"
          : `/works/${source.slug}`,
    natureLabel:
      source.nature === "client"
        ? "客戶專案"
        : source.nature === "product"
          ? "自主開發"
          : "概念作品",
    screenshot: `/studio/work/${source.slug}${["quoteflow", "bookcrm", "xinjiang"].includes(source.slug) ? "-v2" : ""}.webp`,
    featured: featuredSlugs.includes(source.slug),
    image: `/studio/work/${source.slug}${["quoteflow", "bookcrm", "xinjiang"].includes(source.slug) ? "-v2" : ""}.webp`,
    entryPath:
      source.slug === "xinjiang"
        ? "/demo/xinjiang"
        : source.slug === "biomed-brand-site"
          ? "/demo/biomed-brand-site"
          : source.entryPath,
  }
})
export const featuredWorks = featuredSlugs.map((slug) =>
  studioWorks.find((work) => work.slug === slug)
)

export function filterStudioWorks(value) {
  const category = value === "tools" ? "experiments" : value === "client" ? "websites" : value
  return ["websites", "systems", "automation", "ai", "experiments"].includes(category)
    ? studioWorks.filter((work) => work.category === category)
    : featuredWorks
}

export const serviceStories = [
  {
    id: "business-website",
    title: "想把品牌網站做好看",
    text: "讓第一次認識你的人 看得懂服務 喜歡你的風格 也找得到聯絡方式",
    includes: "品牌官網 / 一頁式網站 / 購物動線 / 手機體驗",
    result: "一起整理內容 再把品牌的個性放進每一個頁面",
    slug: "morie",
    type: "website",
  },
  {
    id: "web-systems",
    title: "公司流程越來越亂",
    text: "接單 客戶 報價與案件各記各的 花時間整理卻還是容易漏",
    includes: "管理後台 / 客戶管理 / 訂單 / 案件管理",
    result: "先把一條重要流程做好 再依需要往外延伸",
    slug: "quoteflow",
    type: "system",
  },
  {
    id: "line-automation",
    title: "LINE 每天回答相同問題",
    text: "讓重複的問答與資料收集先有人接住 你再處理需要判斷的部分",
    includes: "LINE 客服 / 詢價流程 / 自動通知 / 系統串接",
    result: "保留人工接手的空間 讓自動化幫忙 也讓溝通有溫度",
    slug: "linebot",
    type: "line",
  },
  {
    id: "knowledge",
    title: "資料很多 但很難找",
    text: "答案藏在文件 版本與聊天紀錄裡 同事每次都得重新找一次",
    includes: "文件搜尋 / 內部知識庫 / AI 問答 / 來源引用",
    result: "先整理資料與權限 再選擇原文搜尋或 AI 問答",
    slug: "rag-consultant",
    type: "ai",
  },
]

export const workingSteps = [
  ["先聊問題", "從現在卡住的地方開始 不需要先準備規格書"],
  ["整理需求", "把想法 使用者與日常流程整理成看得懂的方向"],
  ["確認範圍", "說清楚要做什麼 交付什麼 時間與費用"],
  ["設計與開發", "先確認畫面與流程 再逐步做出可以操作的版本"],
  ["一起測試", "用實際情境檢查手機 操作 資料與錯誤狀況"],
  ["正式上線", "完成部署 設定與使用說明 確認網站能正常使用"],
  ["後續維護", "依約定處理修正與維護 新增需求另外確認範圍"],
]
