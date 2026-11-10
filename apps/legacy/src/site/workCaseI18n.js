const locales = ["zh-Hant", "en", "ja", "ko"]

function localized(values) {
  return Object.fromEntries(locales.map((locale, index) => [locale, values[index]]))
}

function define(context, problem, outcome, steps, scope) {
  return {
    context: localized(context),
    problem: localized(problem),
    outcome: localized(outcome),
    steps: localized(steps),
    scope: localized(scope),
  }
}

const workCases = {
  morie: define(
    ["生活選品品牌的完整購物提案", "A complete shopping concept for a lifestyle brand", "暮らしのブランド向けECサイト提案", "라이프스타일 브랜드를 위한 쇼핑 사이트 제안"],
    ["品牌故事與購物流程缺少一致感", "The brand story and shopping experience feel disconnected", "ブランドの物語と購入体験がつながらない", "브랜드 이야기와 구매 경험이 이어지지 않음"],
    ["從品牌故事到商品與模擬結帳維持一致體驗", "One experience from brand story to products and demo checkout", "物語から商品と模擬購入まで一貫した体験", "브랜드 이야기부터 상품과 모의 결제까지 일관된 경험"],
    [["探索商品", "加入購物車", "完成模擬結帳"], ["Explore products", "Add to bag", "Try demo checkout"], ["商品を探す", "カートに追加", "模擬購入を試す"], ["상품 탐색", "장바구니 담기", "모의 결제 체험"]],
    [["品牌與商品頁", "搜尋 篩選與購物車", "模擬結帳與門市資訊"], ["Brand and product pages", "Search filters and bag", "Demo checkout and store details"], ["ブランドと商品ページ", "検索 絞り込み カート", "模擬購入と店舗情報"], ["브랜드와 상품 페이지", "검색 필터 장바구니", "모의 결제와 매장 안내"]],
  ),
  luluface: define(
    ["美容品牌的服務與商品網站提案", "A service and product website concept for a beauty brand", "美容ブランドのサービスと商品サイト提案", "뷰티 브랜드의 서비스와 상품 사이트 제안"],
    ["第一次來的客人不容易分辨服務差異", "New customers struggle to compare services", "初めての顧客にサービスの違いが伝わりにくい", "처음 온 고객이 서비스 차이를 알기 어려움"],
    ["清楚呈現服務 商品與預約入口", "Clear services products and a booking entry", "サービス 商品 予約入口を明確に", "서비스 상품 예약 입구를 명확하게"],
    [["比較服務", "查看商品", "找到預約入口"], ["Compare services", "Explore products", "Find booking"], ["サービス比較", "商品を見る", "予約入口へ"], ["서비스 비교", "상품 보기", "예약 입구 찾기"]],
    [["品牌版型", "服務與商品內容", "手機版與預約導線"], ["Brand layout", "Service and product content", "Mobile layout and booking path"], ["ブランドデザイン", "サービスと商品情報", "モバイルと予約導線"], ["브랜드 디자인", "서비스와 상품 정보", "모바일과 예약 동선"]],
  ),
  xinjiang: define(
    ["屏東在地泥作工程的品牌網站", "A website for a Pingtung renovation contractor", "屏東の左官工事会社のブランドサイト", "핑둥 미장 공사업체의 브랜드 사이트"],
    ["施工案例與詢價入口分散", "Project photos and inquiries are scattered", "施工事例と問い合わせ先が分散している", "시공 사례와 문의 창구가 흩어져 있음"],
    ["用真實施工照片介紹服務並提供線上詢價", "Real project photos explain services and lead to online inquiries", "実際の施工写真でサービスを伝え相談へつなぐ", "실제 시공 사진으로 서비스를 소개하고 온라인 문의 연결"],
    [["查看施工案例", "了解服務", "送出詢價"], ["View projects", "Explore services", "Send an inquiry"], ["施工事例を見る", "サービス確認", "見積もり相談"], ["시공 사례 보기", "서비스 확인", "견적 문의"]],
    [["品牌與服務頁面", "施工照片與手機導覽", "詢價表單與聯絡入口"], ["Brand and service content", "Project photos and mobile navigation", "Inquiry form and contact links"], ["ブランドとサービス", "施工写真とモバイルナビ", "相談フォームと連絡先"], ["브랜드와 서비스", "시공 사진과 모바일 탐색", "문의 양식과 연락처"]],
  ),
  "biomed-brand-site": define(
    ["生醫品牌的專業資訊網站提案", "A professional information site concept for a biomedical brand", "バイオ医療ブランドの情報サイト提案", "바이오메디컬 브랜드의 전문 정보 사이트 제안"],
    ["專業資訊太多讓重點不易閱讀", "Dense technical content hides the key message", "専門情報が多く要点を読み取りにくい", "전문 정보가 많아 핵심을 읽기 어려움"],
    ["以清楚層級呈現品牌與專業內容", "A clear hierarchy for the brand and specialist content", "ブランドと専門情報を読みやすい構成に", "브랜드와 전문 정보를 읽기 쉬운 구조로"],
    [["認識品牌", "查看專業內容", "找到聯絡方式"], ["Meet the brand", "Explore expertise", "Find contact details"], ["ブランド紹介", "専門情報を見る", "連絡先を確認"], ["브랜드 소개", "전문 정보 보기", "연락처 확인"]],
    [["品牌架構", "內容與視覺層級", "手機閱讀與聯絡入口"], ["Brand structure", "Content and visual hierarchy", "Mobile reading and contact links"], ["ブランド構成", "情報と視覚の階層", "モバイルと連絡先"], ["브랜드 구조", "정보와 시각적 계층", "모바일 읽기와 연락처"]],
  ),
  servicedesk: define(
    ["設備商收到客戶報修後由客服與技師接力處理", "An equipment team receives a repair request and hands it from support to service", "設備会社が修理依頼を受けサポートから技術担当へ引き継ぐ", "장비 회사가 수리 요청을 받아 고객 지원에서 기술 담당으로 이어서 처리"],
    ["報修 保固 派工與維修歷史分散", "Repair requests warranty dispatch and service history are scattered", "修理依頼 保証 手配 対応履歴が分散している", "수리 요청 보증 배정 서비스 이력이 흩어져 있음"],
    ["同一張服務單保留受理 派工 零件 RMA 與結案歷史", "One service record keeps intake dispatch parts RMA and closure history", "一つのサービス票に受付 手配 部品 RMA 完了履歴を保存", "하나의 서비스 기록에 접수 배정 부품 RMA 종료 이력을 저장"],
    [["送出報修", "判斷保固與派工", "記錄處理與結案"], ["Submit request", "Check warranty and dispatch", "Record service and close"], ["修理を依頼", "保証確認と手配", "対応記録と完了"], ["수리 접수", "보증 확인과 배정", "처리 기록과 종료"]],
    [["客戶報修入口", "保固與服務單", "派工 RMA 與售後歷史"], ["Customer request portal", "Warranty and service cases", "Dispatch RMA and service history"], ["顧客修理受付", "保証とサービス票", "手配 RMA 対応履歴"], ["고객 수리 접수", "보증과 서비스 건", "배정 RMA 서비스 이력"]],
  ),
  watchtower: define(
    ["採購或營運人員需要持續留意公開價格 庫存與公告", "Procurement or operations teams need to watch public prices stock and notices", "調達や運営担当が公開価格 在庫 お知らせを継続確認する", "구매 또는 운영팀이 공개 가격 재고 공지를 계속 확인"],
    ["人工重複查看容易錯過真正重要的變化", "Repeated manual checks make important changes easy to miss", "手作業の確認では重要な変化を見落としやすい", "반복 수동 확인으로 중요한 변화를 놓치기 쉬움"],
    ["系統保存檢查快照並只呈現符合規則的異動", "The system stores snapshots and surfaces only changes that match a rule", "確認スナップショットを保存し条件に合う変化だけ表示", "확인 스냅샷을 저장하고 조건에 맞는 변경만 표시"],
    [["建立監控規則", "執行受控檢查", "核對異動與通知"], ["Create a rule", "Run a controlled check", "Review changes and alerts"], ["監視条件を作成", "管理された確認を実行", "変化と通知を確認"], ["감시 조건 만들기", "제어된 확인 실행", "변경과 알림 확인"]],
    [["監控規則", "來源快照與差異", "異動歷史與站內通知"], ["Monitoring rules", "Source snapshots and diffs", "Change history and in app alerts"], ["監視ルール", "取得結果と差分", "変更履歴とサイト内通知"], ["감시 규칙", "소스 스냅샷과 차이", "변경 이력과 사이트 알림"]],
  ),
  docops: define(
    ["員工要從公司文件中找到可以回到原文核對的答案", "Employees need answers from company files that they can verify in the source", "社員が社内文書から原文で確認できる答えを探す", "직원이 회사 문서에서 원문으로 확인할 수 있는 답을 찾음"],
    ["文件 版本與閱讀權限分散讓答案難以確認", "Scattered files versions and access rules make answers hard to verify", "文書 版 権限が分散し答えを確認しにくい", "문서 버전 권한이 흩어져 답을 확인하기 어려움"],
    ["搜尋結果直接連到生效版本與支持答案的段落", "Search results open the active version and the passage supporting the answer", "検索結果から有効版と根拠となる段落を直接開ける", "검색 결과에서 적용 버전과 근거 문단을 바로 열 수 있음"],
    [["詢問公司資料", "查看符合的原文", "回到來源版本"], ["Ask company files", "Review matching text", "Open the source version"], ["社内資料に質問", "一致する原文を確認", "出典版を開く"], ["회사 문서에 질문", "일치 원문 확인", "출처 버전 열기"]],
    [["私有文件與版本", "權限內搜尋", "來源引用與查詢歷史"], ["Private files and versions", "Permission aware search", "Source citations and query history"], ["非公開文書と版管理", "権限に沿った検索", "出典表示と検索履歴"], ["비공개 문서와 버전", "권한 기반 검색", "출처 인용과 검색 이력"]],
  ),
  flowdesk: define(
    ["營運人員每天要整理供應商資料 訂單與回覆草稿", "Operations teams prepare supplier data orders and response drafts every day", "運営担当が仕入先データ 注文 返信案を毎日整理する", "운영팀이 공급사 자료 주문 답변 초안을 매일 정리"],
    ["重複工作分散在不同系統且重要動作缺少確認", "Repeat work is spread across tools and important actions lack review", "繰り返し業務が分散し重要操作の確認が足りない", "반복 업무가 여러 도구에 흩어지고 중요 작업 확인이 부족함"],
    ["系統先整理建議 人員確認後才執行並保留紀錄", "The system prepares a proposal then runs it only after human review and records the result", "システムが提案を準備し人が確認してから実行し履歴を残す", "시스템이 제안을 준비하고 사람이 확인한 뒤 실행하며 이력을 남김"],
    [["收到一筆工作", "查看建議與差異", "確認執行並核對歷史"], ["Receive a task", "Review proposal and diff", "Approve and verify history"], ["作業を受け取る", "提案と差分を確認", "承認して履歴を確認"], ["작업 받기", "제안과 차이 확인", "승인 후 이력 확인"]],
    [["工作收件與分類", "建議與人工確認", "執行 重試與稽核"], ["Task intake and routing", "Proposals and human review", "Execution retries and audit"], ["作業受付と分類", "提案と人の確認", "実行 再試行 監査"], ["작업 접수와 분류", "제안과 사람 확인", "실행 재시도 감사"]],
  ),
  fieldops: define(
    ["公司派工給現場技師並讓客戶確認完工", "An office dispatches field technicians and lets the customer confirm completion", "会社が現場担当を手配し顧客が完了を確認する", "회사가 현장 기술자를 배정하고 고객이 완료를 확인"],
    ["派工 照片 材料與簽名散在聊天與紙本", "Dispatch photos materials and signoff are scattered across chat and paper", "手配 写真 材料 署名がチャットと紙に分散している", "배정 사진 자재 서명이 대화와 종이에 흩어져 있음"],
    ["一張工單從安排 到場 施工 簽名到完工全部留存", "One work order keeps scheduling arrival work signoff and completion", "一枚の作業票に予定 到着 施工 署名 完了を保存", "한 작업 지시서에 일정 도착 작업 서명 완료를 저장"],
    [["公司建立派工", "技師回報現場", "客戶簽名完成"], ["Office creates a job", "Technician records the visit", "Customer signs off"], ["会社が作業を手配", "担当者が現場記録", "顧客が完了確認"], ["회사가 작업 배정", "기술자가 현장 기록", "고객이 완료 서명"]],
    [["公司 技師 客戶角色", "照片 材料與時間紀錄", "簽名與完工報告"], ["Office technician and customer roles", "Photos materials and time records", "Signoff and completion report"], ["会社 技術担当 顧客の役割", "写真 材料 時間記録", "署名と完了報告"], ["회사 기술자 고객 역할", "사진 자재 시간 기록", "서명과 완료 보고서"]],
  ),
  bookcrm: define(
    ["顧客預約後由員工執行服務並讓店長掌握會員狀態", "Customers book a service staff complete it and managers track the member record", "顧客が予約しスタッフが施術し店長が会員情報を確認する", "고객이 예약하고 직원이 서비스를 완료하며 점장이 회원 기록을 확인"],
    ["時段 顧客 套票與服務紀錄分散", "Schedules customers packages and service records are scattered", "予約枠 顧客 回数券 施術履歴が分散している", "시간 고객 이용권 서비스 기록이 흩어져 있음"],
    ["顧客 員工與店長使用同一筆預約與會員資料", "Customers staff and managers use the same booking and member record", "顧客 スタッフ 店長が同じ予約と会員記録を使う", "고객 직원 점장이 같은 예약과 회원 기록을 사용"],
    [["顧客選服務與時段", "員工完成報到與服務", "店長查看會員與營運"], ["Customer selects service and time", "Staff check in and complete service", "Manager reviews members and operations"], ["顧客がサービスと時間を選択", "スタッフが受付と施術を完了", "店長が会員と運営を確認"], ["고객이 서비스와 시간 선택", "직원이 체크인과 서비스 완료", "점장이 회원과 운영 확인"]],
    [["預約與班表規則", "顧客與會員資料", "套票 付款介面與營運紀錄"], ["Booking and schedule rules", "Customer and member records", "Packages payment interface and operations"], ["予約と勤務ルール", "顧客と会員情報", "回数券 決済画面 運営記録"], ["예약과 일정 규칙", "고객과 회원 기록", "이용권 결제 화면 운영 기록"]],
  ),
  quoteflow: define(
    ["業務建立報價後交給客戶確認並保留每個版本", "Sales creates a quote the customer reviews it and every version remains available", "営業が見積もりを作成し顧客が確認し各版を保存する", "영업이 견적을 만들고 고객이 확인하며 모든 버전을 보관"],
    ["成本 售價 折扣與報價版本難以追蹤", "Cost price discount and quote versions are hard to track", "原価 売価 値引き 見積もり版を追跡しにくい", "원가 판매가 할인 견적 버전을 추적하기 어려움"],
    ["從建價 修訂 客戶確認到成交保留完整歷史", "Pricing revisions customer approval and close stay in one history", "価格設定 修訂 顧客確認 成約を一つの履歴に保存", "가격 설정 수정 고객 확인 계약을 하나의 이력으로 저장"],
    [["建立品項與價格", "產生新版本並傳給客戶", "確認成交與歷史"], ["Build items and pricing", "Create a version for the customer", "Confirm the deal and history"], ["項目と価格を作成", "顧客用の版を作成", "成約と履歴を確認"], ["항목과 가격 만들기", "고객용 버전 생성", "계약과 이력 확인"]],
    [["成本與計價規則", "版本 審批與安全連結", "客戶確認 PDF 與稽核"], ["Cost and pricing rules", "Versions approval and secure links", "Customer approval PDF and audit"], ["原価と価格ルール", "版管理 承認 安全リンク", "顧客確認 PDF 監査"], ["원가와 가격 규칙", "버전 승인 보안 링크", "고객 확인 PDF 감사"]],
  ),
  floworder: define(
    ["客戶用文字下單後由業務核對並更新庫存", "A customer orders by message then sales verifies it and stock updates", "顧客が文章で注文し営業が確認して在庫を更新する", "고객이 문자로 주문하고 영업이 확인한 뒤 재고가 반영됨"],
    ["訊息訂單需要人工抄寫且商品 價格 庫存不同步", "Message orders need manual copying while products prices and stock fall out of sync", "メッセージ注文を転記し商品 価格 在庫が同期しない", "메시지 주문을 옮겨 적고 상품 가격 재고가 동기화되지 않음"],
    ["訊息解析 人工確認 正式訂單與庫存交易可以逐步核對", "Message parsing human review orders and stock transactions can be verified step by step", "解析 人の確認 正式注文 在庫取引を順に確認できる", "메시지 분석 사람 확인 정식 주문 재고 거래를 단계별로 확인"],
    [["客戶送出訂單訊息", "業務核對辨識結果", "建立訂單並查看庫存紀錄"], ["Customer sends an order message", "Sales verifies parsed items", "Create the order and review stock history"], ["顧客が注文を送信", "営業が解析結果を確認", "注文作成と在庫履歴を確認"], ["고객이 주문 메시지 전송", "영업이 분석 결과 확인", "주문 생성과 재고 이력 확인"]],
    [["訊息收件與規則解析", "客戶價格與訂單", "庫存交易 角色與稽核"], ["Message intake and rule parsing", "Customer pricing and orders", "Stock transactions roles and audit"], ["メッセージ受付とルール解析", "顧客価格と注文", "在庫取引 役割 監査"], ["메시지 접수와 규칙 분석", "고객 가격과 주문", "재고 거래 역할 감사"]],
  ),
  "wholesale-ordering": define(
    ["FlowOrder 的輕量導覽 用一分鐘看懂下單 出貨與月結", "A lightweight FlowOrder walkthrough of ordering shipping and monthly billing", "FlowOrderの簡易ガイドで注文 出荷 月次精算を確認", "FlowOrder 간단 안내로 주문 출하 월말 정산 확인"],
    ["LINE 接單容易漏單且專屬價格與月結難管理", "LINE orders are easy to miss and customer pricing and billing are hard to manage", "LINE 注文を見落としやすく顧客別価格と月次精算が管理しにくい", "LINE 주문을 놓치기 쉽고 고객 가격과 월말 정산 관리가 어려움"],
    ["預載資料呈現 FlowOrder 的下單 出貨與月結順序 不寫入正式資料", "Preloaded data shows the FlowOrder sequence without writing production data", "事前データでFlowOrderの注文 出荷 月次精算を示し本番データは更新しない", "미리 준비한 자료로 FlowOrder 흐름을 보여 주며 운영 자료는 변경하지 않음"],
    [["客戶選商品並送出", "老闆查看訂單並出貨", "查看月結結果"], ["Customer selects and submits", "Owner reviews and ships", "Open monthly billing"], ["顧客が商品を選び注文", "店主が確認して出荷", "月次精算を確認"], ["고객이 상품 선택 후 주문", "사장이 확인 후 출하", "월말 정산 확인"]],
    [["FlowOrder 入門導覽", "預載商品與訂單", "展示出貨與月結狀態"], ["FlowOrder introduction", "Preloaded products and orders", "Demo shipping and billing states"], ["FlowOrder入門ガイド", "事前設定の商品と注文", "出荷と月次精算の表示"], ["FlowOrder 입문 안내", "미리 준비한 상품과 주문", "출하와 월말 정산 상태"]],
  ),
  buildflow: define(
    ["承接鑫匠網站詢價後的工程追蹤概念", "A project tracking concept for inquiries received through the Xinjiang website", "鑫匠サイトの問い合わせ後を想定した工事追跡コンセプト", "신장 건설 사이트 문의 이후를 잇는 공사 추적 콘셉트"],
    ["詢價 報價 派工與現場回報散在 LINE 與紙本", "Inquiries quotes dispatch and site updates are scattered across LINE and paper", "問い合わせ 見積もり 手配 現場報告がLINEと紙に分散している", "문의 견적 배정 현장 보고가 LINE과 종이에 흩어져 있음"],
    ["預載案件串起查看 進度更新與客戶回報 不會真的通知客戶", "A preloaded case connects review progress updates and a customer report without sending a real notification", "事前設定の案件で確認 進捗更新 顧客報告をつなぎ実際の通知は送らない", "미리 준비한 프로젝트로 확인 진행 업데이트 고객 보고를 연결하며 실제 알림은 보내지 않음"],
    [["查看王小姐案件", "更新目前施工階段", "產生客戶進度回報"], ["Open Ms Wang project", "Update the current phase", "Prepare the customer update"], ["王さんの案件を確認", "現在工程を更新", "顧客向け進捗を作成"], ["왕 고객 프로젝트 확인", "현재 공정 업데이트", "고객 진행 보고 생성"]],
    [["鑫匠詢價後續概念", "案件進度與狀態", "展示客戶回報"], ["Xinjiang inquiry follow up concept", "Project progress and status", "Demo customer report"], ["鑫匠問い合わせ後の構想", "案件進捗と状態", "顧客報告の表示"], ["신장 건설 문의 후속 콘셉트", "프로젝트 진행과 상태", "고객 보고 예시"]],
  ),
  "rag-consultant": define(
    ["DocOps 入門導覽 使用預載範例文件理解問答與來源引用", "An introductory DocOps walkthrough using preloaded sample documents and citations", "DocOps入門ガイドで事前設定の文書と出典表示を確認", "DocOps 입문 안내에서 미리 준비한 문서와 출처 확인"],
    ["公司文件很多但員工難以快速找到有根據的答案", "Teams have many files but cannot quickly find a supported answer", "社内文書が多く根拠ある答えをすぐ見つけられない", "회사 문서가 많아 근거 있는 답을 빠르게 찾기 어려움"],
    ["預載資料呈現答案 來源與找不到狀態 不查詢正式文件", "Preloaded data shows answers sources and no result states without querying production files", "事前データで回答 出典 未検出を示し本番文書は検索しない", "미리 준비한 자료로 답변 출처 미검색 상태를 보여 주며 운영 문서는 조회하지 않음"],
    [["選擇範例問題", "查看答案", "展開來源與引用"], ["Choose a sample question", "Read the answer", "Open the source passage"], ["質問を選択", "回答を確認", "出典と引用を開く"], ["예시 질문 선택", "답변 확인", "출처와 인용 열기"]],
    [["DocOps 入門導覽", "預載文件與找不到狀態", "來源文件與引用段落"], ["DocOps introduction", "Preloaded files and no result state", "Source files and cited passages"], ["DocOps入門ガイド", "事前文書と未検出表示", "出典文書と引用段落"], ["DocOps 입문 안내", "미리 준비한 문서와 미검색 상태", "출처 문서와 인용 문단"]],
  ),
  linebot: define(
    ["訪客用預設問題體驗 LINE 詢價如何整理成老闆可跟進的資料", "Visitors use preset questions to see how a LINE inquiry becomes a lead", "用意された質問からLINE問い合わせが見込み客情報になる流れを体験", "준비된 질문으로 LINE 문의가 잠재 고객 자료가 되는 흐름을 체험"],
    ["客服重複追問且訊息一多容易漏掉需求", "Repeated follow up questions make customer needs easy to miss", "同じ確認が増え問い合わせ内容を見落としやすい", "반복 질문이 많아지며 고객 요구를 놓치기 쉬움"],
    ["引導對話把問題 規模與下一步整理成一張詢價卡", "A guided chat turns the question scope and next step into one lead card", "対話から質問 規模 次の対応を一枚の問い合わせカードに整理", "대화에서 질문 규모 다음 단계를 하나의 문의 카드로 정리"],
    [["點選一個常見問題", "回答一次追問", "切到展示後台確認資料"], ["Pick a common question", "Answer one follow up", "Open the demo dashboard"], ["よくある質問を選ぶ", "一つの追加質問に回答", "デモ管理画面で確認"], ["자주 묻는 질문 선택", "추가 질문 한 번 답변", "데모 관리자 화면에서 확인"]],
    [["預設詢問入口", "自動追問流程", "詢價資料卡與狀態回饋"], ["Preset inquiry entry", "Follow up flow", "Lead card and status feedback"], ["質問候補", "追加確認フロー", "問い合わせカードと状態表示"], ["미리 만든 문의 입구", "추가 질문 흐름", "문의 카드와 상태 피드백"]],
  ),
  "restaurant-ordering": define(
    ["服務人員替桌號點餐 廚房接單後更新製作與出餐狀態", "Staff order for a table and the kitchen updates accepted cooking and served states", "スタッフが卓ごとに注文し厨房が受付 調理 提供状態を更新", "직원이 테이블 주문을 넣고 주방이 접수 조리 출식 상태를 업데이트"],
    ["桌邊點餐 廚房控單與桌況分散", "Table ordering kitchen tickets and table status are disconnected", "テーブル注文 厨房伝票 卓状況が分散している", "테이블 주문 주방 주문표 테이블 상태가 분리되어 있음"],
    ["同一筆展示訂單從桌號 餐點 廚房接單到出餐保持一致", "One demo order keeps the table items kitchen receipt and served state together", "一つの注文で卓 料理 厨房受付 提供完了まで確認", "한 주문에서 테이블 메뉴 주방 접수 출식 완료까지 확인"],
    [["選擇桌號與餐點", "廚房接單並開始製作", "完成出餐並更新桌況"], ["Select the table and dishes", "Kitchen accepts and starts cooking", "Serve the order and update the table"], ["卓と料理を選択", "厨房が受付して調理開始", "提供完了と卓状態を更新"], ["테이블과 메뉴 선택", "주방 접수 후 조리 시작", "출식 완료와 테이블 상태 업데이트"]],
    [["桌號與菜單", "廚房接單與製作", "出餐與桌況狀態"], ["Tables and menu", "Kitchen acceptance and cooking", "Served and table states"], ["卓番号とメニュー", "厨房受付と調理", "提供と卓状態"], ["테이블과 메뉴", "주방 접수와 조리", "출식과 테이블 상태"]],
  ),
  "analytics-dashboard": define(
    ["老闆用少量指標判斷本月哪個廣告來源值得繼續", "An owner uses a few metrics to judge which channel deserves attention", "経営者が少数の指標で今月注力する広告流入を判断する", "사장이 핵심 지표로 이번 달 집중할 광고 유입을 판단"],
    ["瀏覽 搜尋 點擊與詢問分散讓成效難以理解", "Visits search clicks and inquiries are scattered and hard to interpret", "閲覧 検索 クリック 問い合わせが分散し成果を理解しにくい", "방문 검색 클릭 문의가 흩어져 성과를 이해하기 어려움"],
    ["展示看板把花費 詢問與訂單收斂成可讀摘要", "A demo dashboard reduces spend inquiries and orders to a clear summary", "デモ画面で費用 問い合わせ 注文を読みやすい要約に整理", "데모 화면에서 비용 문의 주문을 읽기 쉬운 요약으로 정리"],
    [["查看本月資料", "比較 LINE 廣告", "產生展示摘要"], ["Open this month", "Compare LINE ads", "Create a demo summary"], ["今月を確認", "LINE広告を比較", "デモ要約を作成"], ["이번 달 보기", "LINE 광고 비교", "데모 요약 만들기"]],
    [["三項老闆指標", "來源比較", "摘要與即時回饋"], ["Three owner metrics", "Channel comparison", "Summary and instant feedback"], ["三つの経営指標", "流入元比較", "要約と即時表示"], ["사장용 지표 세 개", "유입 비교", "요약과 즉시 피드백"]],
  ),
  "ai-tech-quest": define(
    ["用固定公司規定示範客服如何查找依據再確認回覆", "A fixed company policy shows how support finds evidence before replying", "固定の社内規定でサポートが根拠を確認して返信する流れを示す", "고정 회사 규정으로 고객 지원이 근거를 찾고 답변을 확인하는 흐름을 보여줌"],
    ["只列技術名稱無法說明 AI 在客服流程中的責任邊界", "A technology list does not explain where AI fits in a support workflow", "技術名だけではAIの役割と責任範囲が伝わらない", "기술 이름만으로는 고객 지원에서 AI 역할과 책임 범위를 알기 어려움"],
    ["原型把客戶問題 公司規定與人工確認排在同一條流程", "The prototype puts the customer question policy and human review in one flow", "顧客質問 社内規定 人の確認を一つの流れに配置", "고객 질문 회사 규정 사람 확인을 하나의 흐름으로 구성"],
    [["查看客戶問題", "查找範例規定", "確認展示回覆"], ["Open the question", "Find the sample policy", "Approve the demo reply"], ["質問を確認", "規定サンプルを検索", "デモ返信を確認"], ["고객 질문 확인", "예시 규정 찾기", "데모 답변 확인"]],
    [["客服情境", "規定查找", "人工確認與狀態紀錄"], ["Support scenario", "Policy lookup", "Human review and status log"], ["サポート場面", "規定検索", "人の確認と状態記録"], ["고객 지원 상황", "규정 검색", "사람 확인과 상태 기록"]],
  ),
  "ai-audit": define(
    ["用範例餐廳網站理解健檢如何排出改善順序", "Use a sample restaurant site to understand how an audit ranks improvements", "飲食店サンプルでサイト診断が改善順を決める方法を確認", "예시 식당 사이트로 진단이 개선 순서를 정하는 방법을 확인"],
    ["網站問題很多但不知道哪一項最值得先處理", "A site has many issues but the first priority is unclear", "課題が多く何から直すべきか分からない", "사이트 문제가 많지만 무엇부터 고칠지 알기 어려움"],
    ["功能原型把三個優先改善項目整理成清楚清單", "The prototype turns three priority changes into a clear list", "機能試作で優先度の高い三項目を一覧化", "기능 원형이 우선 개선 세 항목을 명확한 목록으로 정리"],
    [["選擇範例網站", "執行展示檢查", "查看優先清單"], ["Choose the sample site", "Run the demo check", "Review the priority list"], ["サイト例を選ぶ", "デモ診断を実行", "優先一覧を確認"], ["예시 사이트 선택", "데모 검사 실행", "우선 목록 확인"]],
    [["範例網站資料", "檢查狀態", "優先改善報告"], ["Sample site data", "Check states", "Priority report"], ["サイトサンプル", "診断状態", "優先改善レポート"], ["예시 사이트 자료", "검사 상태", "우선 개선 보고서"]],
  ),
  "api-automation": define(
    ["用預載訂單示範欄位映射 驗證 503 重試與去重", "A preloaded order demonstrates field mapping validation 503 retry and deduplication", "事前注文で項目対応 検証 503再試行 重複防止を確認", "미리 준비한 주문으로 필드 매핑 검증 503 재시도 중복 방지 확인"],
    ["表單送出後仍要手動複製資料並逐一通知", "After form submission data still needs manual copying and alerts", "フォーム送信後も転記と通知が手作業になる", "폼 제출 후에도 자료 복사와 알림을 수동으로 처리"],
    ["隔離原型呈現失敗與恢復 不連外部帳號也不顯示假同步", "The isolated prototype shows failure and recovery without external accounts or fake sync success", "外部アカウントに接続せず失敗と復旧を示し偽の同期成功は表示しない", "외부 계정 없이 실패와 복구를 보여 주며 가짜 동기화 성공을 표시하지 않음"],
    [["檢查欄位映射與驗證", "遇到 503 後重試", "以相同請求鍵重送並確認未重複"], ["Review field mapping and validation", "Retry after a 503 response", "Resend with the same request key and confirm no duplicate"], ["項目対応と検証を確認", "503応答後に再試行", "同じリクエストキーで再送し重複なしを確認"], ["필드 매핑과 검증 확인", "503 응답 후 재시도", "동일 요청 키로 다시 보내 중복 없음 확인"]],
    [["欄位映射與資料驗證", "503 錯誤與重試狀態", "相同請求去重紀錄", "不連外部帳號"], ["Field mapping and validation", "503 error and retry states", "Duplicate request record", "No external accounts"], ["項目対応とデータ検証", "503エラーと再試行状態", "同一リクエストの重複防止記録", "外部アカウント未接続"], ["필드 매핑과 자료 검증", "503 오류와 재시도 상태", "동일 요청 중복 방지 기록", "외부 계정 미연결"]],
  ),
  "commerce-platform": define(
    ["MORIÉ 是此案例共用的完整商店實作 從商品規格連到購物袋與模擬結帳", "MORIÉ is the shared working store for this case from product options to bag and simulated checkout", "MORIÉの共通ストア実装で商品仕様からバッグ 模擬決済まで確認", "MORIÉ 공용 상점 구현에서 상품 옵션 장바구니 모의 결제까지 확인"],
    ["平台商店常有內容層級不清楚與手機動線冗長的問題", "Platform stores often have unclear hierarchy and long mobile paths", "EC基盤では情報階層が曖昧でモバイル導線が長くなりやすい", "플랫폼 스토어는 정보 구조가 불분명하고 모바일 경로가 길어지기 쉬움"],
    ["直接使用 MORIÉ 的商品與購物流程 不另做一套假購物狀態", "The case uses the MORIÉ storefront instead of a separate fake shopping state", "別の偽ショッピング状態を作らずMORIÉの実装をそのまま使用", "별도 가짜 구매 상태 없이 MORIÉ 상점 구현을 그대로 사용"],
    [["在 MORIÉ 選擇商品與規格", "調整數量並查看購物袋", "核對模擬結帳與能力說明"], ["Choose a MORIÉ product and option", "Adjust quantity and open the bag", "Review simulated checkout and limitations"], ["MORIÉの商品と仕様を選択", "数量を変えてバッグを確認", "模擬決済と制限を確認"], ["MORIÉ 상품과 옵션 선택", "수량을 바꾸고 장바구니 확인", "모의 결제와 제한 확인"]],
    [["MORIÉ 品牌與商品頁", "規格 數量與本機購物袋", "模擬結帳不連正式金流", "手機購物流程"], ["MORIÉ brand and product pages", "Options quantity and local bag", "Simulated checkout without live payments", "Mobile shopping flow"], ["MORIÉブランドと商品ページ", "仕様 数量 ローカルバッグ", "正式決済に接続しない模擬決済", "モバイル購入導線"], ["MORIÉ 브랜드와 상품 페이지", "옵션 수량 로컬 장바구니", "실제 결제 없는 모의 결제", "모바일 구매 흐름"]],
  ),
  "commercial-visual": define(
    ["比較同一視覺方向如何延伸到桌機 手機與社群比例", "Compare one visual direction across desktop mobile and social formats", "一つのビジュアル方向をPC モバイル SNS比率で比較", "하나의 비주얼 방향을 데스크톱 모바일 소셜 비율로 비교"],
    ["廣告 社群與活動素材缺少一致的視覺語言", "Campaign social and event assets lack a consistent visual language", "広告 SNS イベント素材に一貫した表現がない", "광고 소셜 이벤트 소재에 일관된 비주얼 언어가 없음"],
    ["四組自製提案保留方向探索 製作過程與三種完成比例", "Four original studies keep direction process and three final formats together", "四つの自主提案で方向検討 制作過程 三種の完成比率をまとめて表示", "네 개의 자체 제안에서 방향 과정 세 가지 완성 비율을 함께 표시"],
    [["選擇一組提案", "查看方向與製作過程", "比較三種完成比例"], ["Choose a study", "Review direction and process", "Compare three final formats"], ["提案を選ぶ", "方向と制作過程を見る", "三つの完成比率を比較"], ["제안 선택", "방향과 제작 과정 확인", "세 가지 완성 비율 비교"]],
    [["四組自製視覺", "方向與製作過程", "桌機 手機 社群成品"], ["Four original visuals", "Direction and process", "Desktop mobile and social outputs"], ["四つの自主ビジュアル", "方向と制作過程", "PC モバイル SNS完成物"], ["자체 비주얼 네 세트", "방향과 제작 과정", "데스크톱 모바일 소셜 결과물"]],
  ),
}

const responsibility = {
  "zh-Hant": {
    workspace: "需求拆解 介面 資料模型 API 權限 測試與部署",
    controlled: "監控流程 資料模型 受控來源 排程與通知狀態",
    guided: "使用情境 資訊架構 互動流程與響應式介面",
    prototype: "問題拆解 操作原型 狀態回饋與錯誤情境",
    visual: "視覺方向 版型比例與完成稿整理",
    concept: "品牌方向 內容層級與互動提案",
  },
  en: {
    workspace: "Requirements interface data model APIs access testing and deployment",
    controlled: "Monitoring flow data model controlled sources scheduling and alert states",
    guided: "Scenario information architecture interaction and responsive interface",
    prototype: "Problem framing interaction prototype states and error cases",
    visual: "Visual direction formats and final asset system",
    concept: "Brand direction content hierarchy and interaction concept",
  },
  ja: {
    workspace: "要件整理 画面 データモデル API 権限 テスト 配備",
    controlled: "監視フロー データモデル 管理ソース スケジュール 通知状態",
    guided: "利用場面 情報設計 操作フロー レスポンシブ画面",
    prototype: "課題整理 操作試作 状態表示 エラー場面",
    visual: "ビジュアル方向 比率 完成稿の整理",
    concept: "ブランド方向 情報階層 操作提案",
  },
  ko: {
    workspace: "요구 정리 화면 자료 모델 API 권한 테스트 배포",
    controlled: "감시 흐름 자료 모델 제어 소스 일정 알림 상태",
    guided: "사용 상황 정보 구조 상호 작용 반응형 화면",
    prototype: "문제 정리 조작 원형 상태 피드백 오류 상황",
    visual: "비주얼 방향 비율 완성 결과 정리",
    concept: "브랜드 방향 콘텐츠 구조 상호 작용 제안",
  },
}

const evidence = {
  "zh-Hant": {
    workspace: "獨立體驗工作區透過 API 保存 可在角色端與歷史中核對",
    controlled: "受控來源會產生快照 異動與站內通知 不會對外傳送",
    guided: "使用隔離展示狀態 不會寫入正式系統或對外傳送",
    prototype: "使用固定範例說明功能 不代表外部服務已串接",
    visual: "自製視覺提案 不代表客戶委託或廣告成效",
    concept: "概念提案使用展示資料 不代表正式品牌或營運內容",
    fullSite: "完整網站可直接瀏覽 互動與手機版可實際驗證",
  },
  en: {
    workspace: "An isolated workspace saves through APIs and can be checked across roles and history",
    controlled: "Controlled sources create snapshots changes and in app alerts without external delivery",
    guided: "Uses isolated page state and does not write to production or send externally",
    prototype: "Uses fixed examples to explain a function and does not claim external services are connected",
    visual: "An original visual study not a client commission or campaign result",
    concept: "A concept using sample content not a live brand or operation",
    fullSite: "The complete site interaction and mobile layout can be reviewed directly",
  },
  ja: {
    workspace: "独立体験環境はAPIで保存し役割画面と履歴で確認できる",
    controlled: "管理された情報源から取得結果 変化 サイト内通知を作成し外部送信しない",
    guided: "ページ内の独立デモ状態を使い本番保存や外部送信は行わない",
    prototype: "固定例で機能を説明し外部サービス接続済みとは表示しない",
    visual: "自主制作の表現提案で顧客案件や広告成果ではない",
    concept: "サンプル情報を使うコンセプトで実在ブランドや営業情報ではない",
    fullSite: "完成サイトの操作とモバイル表示を直接確認できる",
  },
  ko: {
    workspace: "분리된 체험 공간이 API로 저장되며 역할 화면과 이력에서 확인 가능",
    controlled: "제어된 소스에서 스냅샷 변경 사이트 알림을 만들고 외부로 보내지 않음",
    guided: "페이지 안의 분리된 데모 상태를 사용하며 운영 저장이나 외부 전송을 하지 않음",
    prototype: "고정 예시로 기능을 설명하며 외부 서비스 연결을 주장하지 않음",
    visual: "자체 제작 비주얼 제안이며 고객 의뢰나 광고 성과가 아님",
    concept: "예시 자료를 쓰는 콘셉트이며 실제 브랜드나 운영 정보가 아님",
    fullSite: "완성 사이트 상호 작용과 모바일 화면을 직접 확인 가능",
  },
}

export const caseLabels = {
  "zh-Hant": { context: "使用情境", responsibility: "負責內容", evidence: "驗證方式" },
  en: { context: "Use case", responsibility: "My scope", evidence: "How to verify" },
  ja: { context: "利用場面", responsibility: "担当範囲", evidence: "確認方法" },
  ko: { context: "사용 상황", responsibility: "담당 범위", evidence: "확인 방법" },
}

export function getWorkCaseContent(source, locale, group) {
  const language = locales.includes(locale) ? locale : "zh-Hant"
  const content = workCases[source.slug]
  const type = source.evidence in responsibility[language] ? source.evidence : source.nature === "concept" ? "concept" : "prototype"
  return {
    context: content?.context[language] ?? source.summary,
    responsibility: responsibility[language][type],
    problem: content?.problem[language] ?? (language === "zh-Hant" ? source.problem : group.problem),
    outcome: content?.outcome[language] ?? (language === "zh-Hant" ? source.solution : group.result),
    steps: content?.steps[language] ?? group.steps,
    scope: content?.scope[language] ?? group.features,
    evidence: evidence[language][source.evidence] ?? evidence[language][type],
  }
}
