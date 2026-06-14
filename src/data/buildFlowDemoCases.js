export const buildFlowStatusProgress = {
  待整理: 20,
  估價中: 45,
  施工中: 75,
  已完成: 100,
}

export const buildFlowStatuses = Object.keys(buildFlowStatusProgress)

export const buildFlowDemoCases = [
  {
    id: "demo-bathroom-waterproof",
    name: "浴室防水修繕",
    client: "林先生 A-102",
    status: "待整理",
    updatedAt: "今天 09:42",
    photoCount: 18,
    noteCount: 6,
    quoteStatus: "已收到現場照片，等待確認施工範圍",
    notes: [
      "LINE 內有浴室牆角滲水照片，需要整理漏水位置。",
      "客戶希望先估基本防水，不確定是否需要拆磁磚。",
      "需提醒客戶補上浴室尺寸與可施工日期。",
    ],
    timeline: [
      ["09:42", "客戶傳送 8 張浴室照片"],
      ["10:18", "整理成防水、泥作、清潔三個工項"],
      ["待辦", "確認是否需要現場丈量"],
    ],
  },
  {
    id: "demo-shop-floor",
    name: "店面地坪工程",
    client: "青埔店面 B-07",
    status: "估價中",
    updatedAt: "昨天 17:20",
    photoCount: 24,
    noteCount: 9,
    quoteStatus: "報價草稿已建立，待業主確認材質",
    notes: [
      "店面目前地面不平，需先評估整平工序。",
      "業主在 LINE 提到希望使用耐磨、好清潔材質。",
      "報價單需拆成地面處理、材料、施工與完工清潔。",
    ],
    timeline: [
      ["昨天", "建立 Epoxy 地坪報價草稿"],
      ["今天", "補上坪數與材料單價"],
      ["下一步", "提供兩種材料方案比較"],
    ],
  },
  {
    id: "demo-old-house-wiring",
    name: "老屋電線更新",
    client: "陳小姐 C-18",
    status: "施工中",
    updatedAt: "今天 14:05",
    photoCount: 31,
    noteCount: 12,
    quoteStatus: "已轉成施工案件，師傅回報中",
    notes: [
      "現場照片已分成配電箱、插座、天花線路三類。",
      "師傅回報第二區完成，需要等待客戶確認追加插座。",
      "追加項目需產生變更單，避免口頭溝通漏記。",
    ],
    timeline: [
      ["06/12", "完成配電箱檢查"],
      ["06/13", "第二區線路更新完成"],
      ["今天", "等待追加插座確認"],
    ],
  },
  {
    id: "demo-kitchen-leak",
    name: "廚房漏水檢修",
    client: "王太太 D-03",
    status: "已完成",
    updatedAt: "06/10 16:30",
    photoCount: 16,
    noteCount: 5,
    quoteStatus: "已完成驗收，保固備註已歸檔",
    notes: [
      "完工照片已歸檔，可作為後續保固依據。",
      "客戶確認水槽下方不再滲水。",
      "保留材料品牌與施工日期，方便日後查詢。",
    ],
    timeline: [
      ["06/08", "完成漏水點檢修"],
      ["06/09", "補拍完工照片"],
      ["06/10", "客戶確認完成"],
    ],
  },
]
