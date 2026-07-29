import fs from "node:fs/promises"
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool"

const outputDir = "C:/Users/USER/Desktop/qingyu-web-studio/outputs/019f7ce4-d1ff-73b3-b9f2-be09765701e6"
const outputPath = `${outputDir}/LULUFACE_SHOPLINE商品主資料.xlsx`

const colors = {
  pink: "#D2B9B3",
  pinkSoft: "#EADBD7",
  graphite: "#3E3A39",
  cream: "#F3EEE7",
  warmWhite: "#FBF8F3",
  coffee: "#8B796D",
  line: "#D9CFCA",
  white: "#FFFDF9",
  pending: "#FCE8E6",
  pendingText: "#9C2F2F",
  ready: "#E4F0E8",
  readyText: "#2F6A43",
}

const workbook = Workbook.create()

function setupSheet(sheet) {
  sheet.showGridLines = false
}

function titleBand(sheet, range, title, subtitle) {
  sheet.getRange(range).merge()
  sheet.getRange(range).values = [[title]]
  sheet.getRange(range).format = {
    fill: colors.graphite,
    font: { name: "Noto Serif TC", size: 20, bold: true, color: colors.white },
    verticalAlignment: "center",
    rowHeight: 38,
  }
  const lastColumn = range.split(":")[1].replace(/[0-9]/g, "")
  sheet.getRange(`A2:${lastColumn}2`).merge()
  sheet.getRange(`A2:${lastColumn}2`).values = [[subtitle]]
  sheet.getRange(`A2:${lastColumn}2`).format = {
    fill: colors.pinkSoft,
    font: { name: "Noto Sans TC", size: 10, color: colors.graphite },
    wrapText: true,
    verticalAlignment: "center",
    rowHeight: 34,
  }
}

function headerStyle(range) {
  range.format = {
    fill: colors.pink,
    font: { name: "Noto Sans TC", size: 10, bold: true, color: colors.graphite },
    verticalAlignment: "center",
    wrapText: true,
    rowHeight: 34,
    borders: { preset: "inside", style: "thin", color: colors.line },
  }
}

function bodyStyle(range) {
  range.format = {
    fill: colors.warmWhite,
    font: { name: "Noto Sans TC", size: 10, color: colors.graphite },
    verticalAlignment: "top",
    wrapText: true,
    borders: { insideHorizontal: { style: "thin", color: colors.line } },
  }
}

function addStatusFormatting(range) {
  range.conditionalFormats.add("containsText", {
    text: "待",
    format: { fill: colors.pending, font: { color: colors.pendingText, bold: true } },
  })
  range.conditionalFormats.add("containsText", {
    text: "完成",
    format: { fill: colors.ready, font: { color: colors.readyText, bold: true } },
  })
  range.conditionalFormats.add("containsText", {
    text: "可移植",
    format: { fill: colors.ready, font: { color: colors.readyText, bold: true } },
  })
}

const productSheet = workbook.worksheets.add("商品主資料")
setupSheet(productSheet)
titleBand(
  productSheet,
  "A1:X1",
  "LULUFACE｜SHOPLINE 商品主資料",
  "此檔是資料蒐集與移植工作表，不是可直接上傳的 SHOPLINE 官方模板。取得商店後台權限後，請先下載當期匯入模板再對應貼入。",
)
productSheet.getRange("A4:X4").values = [[
  "資料狀態",
  "商品編號（建議）",
  "SKU（建議）",
  "商品名稱",
  "英文名稱",
  "商品分類",
  "短描述",
  "完整描述",
  "容量／規格",
  "選項名稱",
  "選項內容",
  "售價（NT$）",
  "原價（NT$）",
  "成本（NT$）",
  "庫存數量",
  "重量（g）",
  "商品主圖 URL",
  "其他圖片 URL",
  "完整成分",
  "使用方式",
  "注意事項",
  "SEO 標題",
  "SEO 描述",
  "SHOPLINE 發布狀態",
]]
headerStyle(productSheet.getRange("A4:X4"))

const productRows = [
  [
    "待客戶補齊",
    "LF-BCP-030（待確認）",
    "LF-SERUM-BCP-30ML（待確認）",
    "藍銅胜肽緊緻精華",
    "Blue Copper Peptide Firming Essence",
    "居家保養／精華",
    "水潤、清爽的日常精華，協助維持柔嫩膚觸、彈性與光澤。",
    "待客戶提供正式商品文案；不得自行補寫未核准功效。",
    "30 ml",
    "",
    "",
    null,
    null,
    null,
    null,
    null,
    "待商品實拍或可公開圖片網址",
    "待提供",
    "待提供",
    "待提供",
    "待提供",
    "藍銅胜肽緊緻精華｜LULUFACE 嚕嚕臉",
    "待完整商品資料確認後撰寫。",
    "先隱藏",
  ],
  [
    "待客戶補齊",
    "LF-EXO-025（待確認）",
    "LF-MASK-EXO-25ML（待確認）",
    "外泌體屏障修護面膜",
    "Exosome Barrier Repair Mask",
    "居家保養／面膜",
    "為需要補水與舒緩的日常保養時刻，帶來柔潤且舒適的敷護體驗。",
    "待客戶提供正式商品文案；不得自行補寫未核准功效。",
    "25 ml / 片",
    "",
    "",
    null,
    null,
    null,
    null,
    null,
    "待商品實拍或可公開圖片網址",
    "待提供",
    "待提供",
    "待提供",
    "待提供",
    "外泌體屏障修護面膜｜LULUFACE 嚕嚕臉",
    "待完整商品資料確認後撰寫。",
    "先隱藏",
  ],
]
for (let index = 0; index < 8; index += 1) {
  productRows.push([
    "待客戶提供",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    null,
    null,
    null,
    null,
    null,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "先隱藏",
  ])
}
productSheet.getRange("A5:X14").values = productRows
bodyStyle(productSheet.getRange("A5:X14"))
productSheet.getRange("A5:A14").dataValidation = {
  rule: { type: "list", values: ["待客戶提供", "待客戶補齊", "待確認", "可移植", "已完成"] },
}
productSheet.getRange("X5:X14").dataValidation = {
  rule: { type: "list", values: ["先隱藏", "草稿", "排程發布", "立即發布"] },
}
addStatusFormatting(productSheet.getRange("A5:A14"))
productSheet.getRange("L5:P14").format.numberFormat = "#,##0"
productSheet.getRange("A4:X4").format.rowHeight = 44
productSheet.getRange("A5:X6").format.rowHeight = 74
productSheet.getRange("A7:X14").format.rowHeight = 34
productSheet.getRange("A:A").format.columnWidth = 14
productSheet.getRange("B:C").format.columnWidth = 22
productSheet.getRange("D:E").format.columnWidth = 25
productSheet.getRange("F:F").format.columnWidth = 18
productSheet.getRange("G:H").format.columnWidth = 34
productSheet.getRange("I:K").format.columnWidth = 16
productSheet.getRange("L:P").format.columnWidth = 14
productSheet.getRange("Q:R").format.columnWidth = 31
productSheet.getRange("S:U").format.columnWidth = 30
productSheet.getRange("V:W").format.columnWidth = 30
productSheet.getRange("X:X").format.columnWidth = 16
productSheet.freezePanes.freezeRows(4)
productSheet.freezePanes.freezeColumns(4)

const fieldSheet = workbook.worksheets.add("欄位說明")
setupSheet(fieldSheet)
titleBand(
  fieldSheet,
  "A1:E1",
  "SHOPLINE 商品欄位說明",
  "官方目前要求依商店後台提供的模板匯入。本表用於先收齊資料，不取代後台範例檔。",
)
fieldSheet.getRange("A4:E4").values = [["欄位", "蒐集必要性", "SHOPLINE 處理", "目前來源", "填寫注意事項"]]
headerStyle(fieldSheet.getRange("A4:E4"))
const fieldRows = [
  ["商品編號", "匯入必要", "依後台模板填入", "尚未確認", "每件主商品應保持唯一，不要重複匯入。"],
  ["商品名稱", "匯入必要", "依語系欄位填入", "已知 2 項", "使用品牌核准名稱。"],
  ["商品主圖", "匯入必要", "圖片網址或後台上傳，依模板規則", "尚未取得", "必須是客戶持有權利的商品實拍。"],
  ["SKU", "強烈建議", "每個款式使用唯一 SKU", "建議碼待確認", "先確認品牌編碼規則再上線。"],
  ["售價", "正式購物必要", "只填正整數", "尚未取得", "未填價格時先保持隱藏，避免無法結帳。"],
  ["庫存", "正式購物必要", "依實際庫存或無限數量設定", "尚未取得", "需確認門市與網店是否共用庫存。"],
  ["分類", "建議", "對應商品分類與主選單", "暫定居家保養", "分類名稱先經客戶確認。"],
  ["完整描述", "建議", "商品資訊／描述欄", "僅有短文案", "不得自行增加成分、療效或醫療宣稱。"],
  ["成分／用法／注意事項", "美妝商品必要", "依商品詳情版型填入", "尚未取得", "以包裝與品牌正式資料為準。"],
  ["重量／物流材積", "物流設定必要", "依物流與商品規格填入", "尚未取得", "需含包材後實際出貨資料。"],
  ["SEO 標題與描述", "建議", "商品 SEO 設定", "已建立初稿欄位", "完整商品資料確認後再定稿。"],
  ["發布狀態", "上架必要", "建議先隱藏或草稿", "預設先隱藏", "完成價格、圖片、庫存與政策後才發布。"],
]
fieldSheet.getRange("A5:E16").values = fieldRows
bodyStyle(fieldSheet.getRange("A5:E16"))
fieldSheet.getRange("A:A").format.columnWidth = 24
fieldSheet.getRange("B:B").format.columnWidth = 17
fieldSheet.getRange("C:C").format.columnWidth = 28
fieldSheet.getRange("D:D").format.columnWidth = 24
fieldSheet.getRange("E:E").format.columnWidth = 45
fieldSheet.getRange("A4:E16").format.rowHeight = 42
fieldSheet.freezePanes.freezeRows(4)

const migrationSheet = workbook.worksheets.add("頁面移植對照")
setupSheet(migrationSheet)
titleBand(
  migrationSheet,
  "A1:G1",
  "Vercel → SHOPLINE 頁面移植對照",
  "將已完成的品牌內容映射至 SHOPLINE 必備分頁、進階分頁與商品頁；實際可用元件依客戶方案和後台版本確認。",
)
migrationSheet.getRange("A4:G4").values = [["現有頁面", "現有網址", "SHOPLINE 目標", "建議內容元件", "目前狀態", "移植前待補", "驗收重點"]]
headerStyle(migrationSheet.getRange("A4:G4"))
const baseRoute = "/works/beauty-shopline-preview"
const migrationRows = [
  ["首頁", baseRoute, "首頁／進階分頁", "Hero、品牌價值、服務、商品、案例、評論、培訓、LINE CTA、門市", "可移植", "正式照片與評論", "桌機與手機內容順序一致、CTA 正確"],
  ["品牌故事", `${baseRoute}/brand`, "商店介紹／進階分頁", "品牌理念、四大價值、資料狀態", "可移植", "成立故事、創辦人與專業經歷", "只保留品牌核准內容"],
  ["護膚服務", `${baseRoute}/services`, "進階分頁", "三種服務、適合對象、流程、LINE 預約", "可移植", "正式名稱、價格、時間、注意事項", "手機流程清楚、無假價格"],
  ["商品總覽", `${baseRoute}/products`, "所有商品／商品分類", "商品卡、分類、購買入口", "可移植", "完整約 10 項商品資料", "分類、排序、庫存與價格正確"],
  ["商品詳情", `${baseRoute}/products/:productId`, "SHOPLINE 商品詳情頁", "圖片、名稱、規格、描述、成分、用法、注意事項、購買", "模板完成", "正式商品內容與主圖", "加入購物車、庫存、付款配送測試"],
  ["美容案例", `${baseRoute}/cases`, "進階分頁", "案例卡、膚況、照護方式、期間", "可移植", "顧客授權案例", "不得使用未授權照片或療效保證"],
  ["培訓加盟", `${baseRoute}/training`, "進階分頁", "技術、創業、加盟三方案與 LINE 導流", "可移植", "費用、日期、師資、條件", "所有合作說明以核定文件為準"],
  ["設備流程", `${baseRoute}/equipment`, "進階分頁", "設備資料、服務前中後流程", "版型完成", "型號、原廠與實拍", "不寫未確認療效"],
  ["常見問題", `${baseRoute}/faq`, "進階分頁／FAQ 元件", "預約、商品與案例 FAQ", "可移植", "客戶補充問答", "答案與客服流程一致"],
  ["聯絡我們", `${baseRoute}/contact`, "進階分頁／頁尾", "地址、電話、LINE、社群、地圖", "可移植", "正式營業時間", "電話、地圖、LINE 實測"],
  ["政策", `${baseRoute}/policies`, "隱私／退換貨／運送／條款頁", "目前安全草稿", "待核定", "公司、付款、物流、客服與法律核定", "與實際結帳設定一致"],
]
migrationSheet.getRange("A5:G15").values = migrationRows
bodyStyle(migrationSheet.getRange("A5:G15"))
migrationSheet.getRange("E5:E15").dataValidation = {
  rule: { type: "list", values: ["版型完成", "可移植", "模板完成", "待核定", "已完成"] },
}
addStatusFormatting(migrationSheet.getRange("E5:E15"))
migrationSheet.getRange("A:A").format.columnWidth = 18
migrationSheet.getRange("B:B").format.columnWidth = 44
migrationSheet.getRange("C:C").format.columnWidth = 25
migrationSheet.getRange("D:D").format.columnWidth = 46
migrationSheet.getRange("E:E").format.columnWidth = 16
migrationSheet.getRange("F:G").format.columnWidth = 40
migrationSheet.getRange("A4:G15").format.rowHeight = 48
migrationSheet.freezePanes.freezeRows(4)

const setupSheetTab = workbook.worksheets.add("後台設定清單")
setupSheet(setupSheetTab)
titleBand(
  setupSheetTab,
  "A1:H1",
  "SHOPLINE 後台設定與驗收清單",
  "沒有後台權限也能先準備內容；標示「需要」的項目必須取得商店管理權限或由客戶在畫面上共同操作。",
)
setupSheetTab.getRange("A4:H4").values = [["階段", "工作項目", "狀態", "需後台權限", "前置資料", "執行內容", "驗收方式", "負責人"]]
headerStyle(setupSheetTab.getRange("A4:H4"))
const setupRows = [
  ["01 基礎", "確認方案、台灣區域與台幣商店", "待後台", "需要", "SHOPLINE 帳號與方案", "確認可用網店設計、付款、物流與網域功能", "功能清單與方案相符", "客戶＋製作方"],
  ["01 基礎", "商店名稱、Logo、Favicon、客服資料", "部分完成", "需要", "正式 Logo、電話、地址、Email", "填入商店基本資料並套用品牌色", "前台頁首、頁尾與通知信一致", "製作方"],
  ["02 設計", "建立首頁與共用頁首頁尾", "可移植", "需要", "現有預覽站", "使用進階分頁／Shop Builder 對照製作", "桌機手機與品牌規範一致", "製作方"],
  ["02 設計", "建立品牌、服務、案例、培訓等分頁", "可移植", "需要", "移植對照表", "建立分頁、URL、SEO 與選單", "所有選單與 CTA 可用", "製作方"],
  ["03 商品", "下載商店當期商品匯入模板", "待後台", "需要", "管理權限", "由商品及分類功能下載官方範例", "模板版本與商店後台一致", "製作方"],
  ["03 商品", "完成約 10 項商品資料", "待客戶", "否", "圖片、價格、庫存、成分、用法", "填入本工作簿後再映射官方模板", "抽查資料與包裝一致", "客戶"],
  ["03 商品", "匯入商品並建立分類", "待後台", "需要", "完整商品主資料", "先匯入隱藏商品、檢查後再發布", "無重複 SKU、圖價庫存正確", "製作方"],
  ["04 交易", "申請／設定付款方式", "待客戶", "需要", "公司、銀行與審核文件", "依方案設定信用卡／其他核准付款", "測試付款與退款流程", "客戶＋SHOPLINE"],
  ["04 交易", "設定物流、運費與免運門檻", "待客戶", "需要", "物流選擇、材積、運費策略", "建立宅配／超商等實際配送方式", "不同地區與金額測試", "客戶＋製作方"],
  ["04 交易", "設定電子發票與稅別", "待客戶", "需要", "公司與發票服務資料", "依實際稅別及發票方案串接", "測試單發票資訊正確", "客戶＋會計"],
  ["05 政策", "核定隱私、條款、運送與退換貨政策", "待客戶", "否", "公司、客服、付款物流流程", "由現有草稿更新成正式條款", "內容與結帳設定一致", "客戶＋顧問"],
  ["06 追蹤", "設定 GA4、Search Console、Meta Pixel", "待帳號", "需要", "平台帳號與授權", "安裝追蹤、排除測試流量、驗證事件", "瀏覽、加入購物車、購買事件可見", "客戶＋製作方"],
  ["06 網域", "設定正式網域與 DNS", "待客戶", "需要", "網域登入與年度方案確認", "依 SHOPLINE 指示設定並等待 DNS 生效", "HTTPS、主網域與轉址正常", "客戶＋製作方"],
  ["07 測試", "完成測試訂單與全裝置 QA", "待前置", "需要", "付款物流商品均完成", "桌機手機各跑一筆完整訂單", "通知、付款、出貨、退款皆正確", "製作方"],
  ["08 上線", "移除密碼／公開商店並監看", "待前置", "需要", "客戶最終驗收", "正式發布、提交索引、檢查訂單", "24 小時內無阻斷問題", "客戶＋製作方"],
]
setupSheetTab.getRange("A5:H19").values = setupRows
bodyStyle(setupSheetTab.getRange("A5:H19"))
setupSheetTab.getRange("C5:C19").dataValidation = {
  rule: { type: "list", values: ["待客戶", "待帳號", "待後台", "待前置", "部分完成", "可移植", "已完成"] },
}
setupSheetTab.getRange("D5:D19").dataValidation = { rule: { type: "list", values: ["需要", "否"] } }
addStatusFormatting(setupSheetTab.getRange("C5:C19"))
setupSheetTab.getRange("A:A").format.columnWidth = 15
setupSheetTab.getRange("B:B").format.columnWidth = 36
setupSheetTab.getRange("C:D").format.columnWidth = 15
setupSheetTab.getRange("E:H").format.columnWidth = 39
setupSheetTab.getRange("A4:H19").format.rowHeight = 48
setupSheetTab.freezePanes.freezeRows(4)

const missingSheet = workbook.worksheets.add("缺件清單")
setupSheet(missingSheet)
titleBand(
  missingSheet,
  "A1:F1",
  "正式上線缺件清單",
  "現有前端與移植架構已完成；以下資料會直接阻擋商品發布、交易設定或正式品牌內容。",
)
missingSheet.getRange("A4:B6").values = [
  ["摘要", "數量"],
  ["缺件總數", null],
  ["高優先缺件", null],
]
headerStyle(missingSheet.getRange("A4:B4"))
bodyStyle(missingSheet.getRange("A5:B6"))
missingSheet.getRange("B5").formulas = [["=COUNTA(A10:A22)"]]
missingSheet.getRange("B6").formulas = [["=COUNTIF(B10:B22,\"高\")"]]
missingSheet.getRange("A9:F9").values = [["缺件項目", "優先度", "目前狀態", "需要客戶提供／確認", "影響範圍", "取得後下一步"]]
headerStyle(missingSheet.getRange("A9:F9"))
const missingRows = [
  ["SHOPLINE 後台管理權限", "高", "未取得", "可編輯網店、商品與設定的管理員權限", "所有 SHOPLINE 實作", "下載模板並建立測試商店"],
  ["SHOPLINE 方案與商店區域", "高", "未確認", "方案名稱、台灣區域、台幣設定", "可用功能與網域", "確認建站方式與功能限制"],
  ["約 10 項完整商品資料", "高", "僅 2 項部分資料", "名稱、規格、價格、庫存、圖片、成分、用法、注意事項", "商品上架與結帳", "填入主資料並匯入隱藏商品"],
  ["正式商品實拍", "高", "未取得", "主圖與多角度圖，確認使用權", "商品頁與廣告", "壓縮、命名並上傳"],
  ["服務價目與時間", "高", "未取得", "正式名稱、價格、時間、注意事項", "服務頁與 LINE 預約", "替換現有待補欄位"],
  ["付款審核資料", "高", "未取得", "公司／負責人／銀行等 SHOPLINE 要求文件", "線上收款", "提交 SHOPLINE Payments 審核"],
  ["物流與運費策略", "高", "未取得", "物流商、運費、免運、出貨日、退件流程", "結帳與政策", "建立送貨選項並測試"],
  ["發票與稅務設定", "高", "未取得", "公司統編、發票服務、商品稅別", "合法交易與訂單", "串接並跑測試單"],
  ["正式政策核定", "高", "目前只有草稿", "公司資料、客服流程及法律核定", "正式上線", "更新必備政策頁"],
  ["真實案例與顧客授權", "中", "未取得", "照片、說明、使用範圍與授權", "案例與信任內容", "替換示意版位"],
  ["真實顧客評論", "中", "未取得", "指定 Google 評論或授權內容", "首頁評論", "保留來源並替換示意"],
  ["培訓與加盟條件", "中", "未取得", "課綱、日期、費用、師資、資格與合約條件", "培訓加盟頁", "核定文案並建立表單／LINE 流程"],
  ["網域與追蹤帳號", "中", "未取得", "網域 DNS、GA4、Search Console、Meta 權限", "正式網址與成效追蹤", "設定、驗證及提交索引"],
]
missingSheet.getRange("A10:F22").values = missingRows
bodyStyle(missingSheet.getRange("A10:F22"))
missingSheet.getRange("B10:B22").dataValidation = { rule: { type: "list", values: ["高", "中", "低"] } }
missingSheet.getRange("B10:B22").conditionalFormats.add("containsText", {
  text: "高",
  format: { fill: colors.pending, font: { color: colors.pendingText, bold: true } },
})
missingSheet.getRange("A:A").format.columnWidth = 32
missingSheet.getRange("B:B").format.columnWidth = 13
missingSheet.getRange("C:C").format.columnWidth = 23
missingSheet.getRange("D:F").format.columnWidth = 45
missingSheet.getRange("A9:F22").format.rowHeight = 48
missingSheet.freezePanes.freezeRows(9)

const sourceSheet = workbook.worksheets.add("官方來源")
setupSheet(sourceSheet)
titleBand(
  sourceSheet,
  "A1:D1",
  "SHOPLINE 官方來源",
  "查核日期：2026-07-21。功能、方案與後台欄位可能更新，實作前仍以客戶商店後台與官方說明為準。",
)
sourceSheet.getRange("A4:D4").values = [["主題", "用途", "官方網址", "採用重點"]]
headerStyle(sourceSheet.getRange("A4:D4"))
const sourceRows = [
  ["大量匯入商品", "匯入規則", "https://support.shoplineapp.com/hc/zh-tw/articles/5971689646617", "使用後台提供模板；商品編號、名稱、主圖為關鍵必填欄位。"],
  ["新增商品", "商品建立", "https://support.shoplineapp.com/hc/zh-tw/articles/208614546", "商品至少需要名稱與主圖；其他欄位依商品與方案設定。"],
  ["商品 SKU", "庫存識別", "https://support.shoplineapp.com/hc/zh-tw/articles/204207069", "每個商品款式應使用唯一 SKU。"],
  ["管理網店分頁", "必備政策與頁面", "https://support.shoplineapp.com/hc/zh-tw/articles/360031978392", "SHOPLINE 建議保留首頁、商店介紹、所有商品及多種政策頁。"],
  ["進階分頁", "品牌內容移植", "https://support.shoplineapp.com/hc/zh-tw/articles/208389023", "可使用 SHOP Builder 元件建立品牌與服務內容。"],
  ["SHOPLINE Payments", "付款設定", "https://support.shoplineapp.com/hc/zh-tw/articles/900006275146", "需完成帳戶驗證，並依台灣與方案資格設定。"],
  ["物流運費及款項", "物流設定", "https://support.shoplineapp.com/hc/zh-tw/articles/360035113232", "實際物流、運費與款項流程需於後台確認。"],
  ["全新網域設置", "正式網域", "https://support.shoplineapp.com/hc/zh-tw/articles/900003319686", "方案與 DNS 設定需確認，網域生效需要時間。"],
]
sourceSheet.getRange("A5:D12").values = sourceRows
bodyStyle(sourceSheet.getRange("A5:D12"))
sourceSheet.getRange("A:A").format.columnWidth = 25
sourceSheet.getRange("B:B").format.columnWidth = 24
sourceSheet.getRange("C:C").format.columnWidth = 73
sourceSheet.getRange("D:D").format.columnWidth = 52
sourceSheet.getRange("A4:D12").format.rowHeight = 48
sourceSheet.freezePanes.freezeRows(4)

await fs.mkdir(outputDir, { recursive: true })

for (const sheetName of ["商品主資料", "欄位說明", "頁面移植對照", "後台設定清單", "缺件清單", "官方來源"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" })
  const safeName = sheetName.replace(/[\\/:*?"<>|]/g, "_")
  await fs.writeFile(`${outputDir}/preview_${safeName}.png`, new Uint8Array(await preview.arrayBuffer()))
}

const exported = await SpreadsheetFile.exportXlsx(workbook)
await exported.save(outputPath)

const inspectResult = await workbook.inspect({
  kind: "table",
  range: "缺件清單!A4:F22",
  include: "values,formulas",
  tableMaxRows: 22,
  tableMaxCols: 6,
})
console.log(inspectResult.ndjson)

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
})
console.log(errors.ndjson)
console.log(outputPath)
