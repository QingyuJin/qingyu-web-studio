export const wholesaleCase = {
  seo: { path: "/works/wholesale-ordering", title: "批發訂貨系統｜晴宇 Qingyu Web", description: "客戶手機下單 後台收單 出貨與月結在同一套流程" },
  category: "批發訂貨系統", title: "批發訂貨系統", tagline: "客戶手機下單 後台收單 出貨與月結都在同一套流程", price: "35,000 元起",
  problem: { desc: "把容易漏掉的人工接單改成可追蹤流程", signs: ["LINE 與電話訂單容易漏", "不同客戶價格難管理", "出貨狀態不好追", "月底對帳耗時間"] },
  flow: { steps: [{ title: "客戶下單", text: "查看專屬價格並送出訂單" }, { title: "後台收單", text: "訂單進入同一個管理畫面" }, { title: "更新出貨", text: "店家確認數量與出貨狀態" }, { title: "完成月結", text: "系統彙整月結與對帳資料" }] },
  deliverables: { items: [{ title: "客戶端", items: ["商品與分類", "專屬價格", "購物車", "訂單紀錄"] }, { title: "管理端", items: ["訂單管理", "客戶管理", "商品價格", "出貨狀態"] }, { title: "帳務", items: ["月結彙總", "對帳明細", "帳款狀態"] }] },
  demo: { livePath: "/demo/wholesale-ordering" },
}

export const buildflowCase = {
  seo: { path: "/works/xinjiang", title: "鑫匠工程網站與案件系統｜晴宇 Qingyu Web", description: "品牌官網 線上詢價與工程案件管理案例" },
  category: "正式客戶案例", title: "鑫匠工程", tagline: "品牌官網 線上詢價與案件後台 將客戶入口與內部流程接在一起", price: "30,000 元起",
  problem: { desc: "讓詢價 案件與施工回報不再散落", signs: ["客戶入口不清楚", "詢價內容格式不一致", "案件進度散在訊息裡", "客戶回報容易漏掉"] },
  flow: { steps: [{ title: "收到詢價", text: "網站整理客戶需求" }, { title: "建立案件", text: "後台集中案件與待辦" }, { title: "更新進度", text: "現場回報目前施工狀態" }, { title: "同步通知", text: "客戶收到最新進度" }] },
  deliverables: { items: [{ title: "網站", items: ["品牌與服務", "案例內容", "線上詢價"] }, { title: "案件後台", items: ["案件列表", "進度狀態", "待辦更新"] }, { title: "通知", items: ["客戶資料", "狀態紀錄", "進度通知"] }] },
  demo: { livePath: "/demo/buildflow" },
}

export const knowledgeCase = {
  seo: { path: "/works/rag-consultant", title: "AI 公司知識庫｜晴宇 Qingyu Web", description: "直接問公司文件並核對來源與引用內容" },
  category: "AI 公司知識庫", title: "AI 公司知識庫", tagline: "把公司文件交給 AI 以後直接問 每個答案都能核對來源", price: "需求估價",
  problem: { desc: "減少找文件與重複回答的時間", signs: ["公司資料散在不同資料夾", "新人不知道去哪裡找", "客服重複回答相同問題", "答案缺少來源可以核對"] },
  flow: { steps: [{ title: "整理文件", text: "放入已確認的公司資料" }, { title: "直接提問", text: "用平常說話方式查詢" }, { title: "找到答案", text: "系統從文件內容整理回答" }, { title: "核對來源", text: "查看來源文件與引用段落" }] },
  deliverables: { items: [{ title: "查詢介面", items: ["常見問題", "答案顯示", "找不到提示"] }, { title: "來源核對", items: ["來源文件", "引用段落", "資料範圍"] }, { title: "管理", items: ["文件整理", "權限規則", "更新流程"] }] },
  demo: { livePath: "/demo/rag-consultant" },
}
