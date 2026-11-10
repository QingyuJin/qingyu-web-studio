const hub = {
  "zh-Hant": {
    eyebrow: "一頁完成重點", title: "六套產業網站提案", lead: "從美容 醫療到製造與軟體服務 看不同產業如何整理服務與行動入口",
    view: "查看六套網站", contact: "洽詢類似網站", mosaic: "六大產業網站預覽", tile: "查看範本",
    benefits: [["重點", "訊息集中"], ["手機", "版面好讀"], ["搜尋", "架構完整"], ["行動", "入口明確"]],
    catalog: "產業提案", catalogTitle: "六套產業作品", catalogMeta: "訊息 動態 表單 手機", preview: "預覽尺寸", desktop: "桌機", mobile: "手機", open: "查看網站",
    closing: "從一頁開始", closingTitle: ["從一頁開始", "讓品牌被看懂"], line: "LINE 諮詢", email: "電子郵件",
    seoTitle: "產業網站展示空間 晴宇 Qingyu Web", seoDescription: "瀏覽美容 診所 餐飲 工程 製造與軟體服務網站提案 看見清楚訊息 手機動線與詢問入口",
  },
  en: {
    eyebrow: "One page essentials", title: "Six industry site concepts", lead: "See how beauty health dining construction manufacturing and software sites clarify services and next actions",
    view: "View six sites", contact: "Discuss a similar site", mosaic: "Six industry site previews", tile: "View concept",
    benefits: [["Focus", "Clear message"], ["Mobile", "Easy reading"], ["Search", "Sound structure"], ["Action", "Clear next step"]],
    catalog: "Industry concepts", catalogTitle: "Six site directions", catalogMeta: "Message Motion Form Mobile", preview: "Preview size", desktop: "Desktop", mobile: "Mobile", open: "View site",
    closing: "Start with one page", closingTitle: ["Start with one page", "Make the brand clear"], line: "Talk on LINE", email: "Email",
    seoTitle: "Industry website showcase Qingyu Web", seoDescription: "Explore six concise responsive website concepts for beauty clinics dining construction manufacturing and software",
  },
  ja: {
    eyebrow: "一ページで要点を整理", title: "六つの業種別サイト提案", lead: "美容 医療 飲食 工事 製造 ソフトウェアのサービスと行動導線を比較できます",
    view: "六つのサイトを見る", contact: "同様のサイトを相談", mosaic: "六業種のサイトプレビュー", tile: "提案を見る",
    benefits: [["要点", "情報を集約"], ["モバイル", "読みやすい"], ["検索", "構造が明確"], ["行動", "次の一歩が明確"]],
    catalog: "業種別提案", catalogTitle: "六つのサイト作品", catalogMeta: "情報 動き フォーム モバイル", preview: "表示サイズ", desktop: "PC", mobile: "モバイル", open: "サイトを見る",
    closing: "一ページから", closingTitle: ["一ページから始める", "ブランドを伝わりやすく"], line: "LINEで相談", email: "メール",
    seoTitle: "業種別サイト展示 Qingyu Web", seoDescription: "美容 医療 飲食 工事 製造 ソフトウェア向けの簡潔で見やすいサイト提案を紹介",
  },
  ko: {
    eyebrow: "한 페이지에 핵심 정리", title: "여섯 가지 업종 사이트 제안", lead: "뷰티 의료 외식 공사 제조 소프트웨어 사이트의 서비스와 행동 경로를 비교하세요",
    view: "여섯 사이트 보기", contact: "비슷한 사이트 상담", mosaic: "여섯 업종 사이트 미리보기", tile: "제안 보기",
    benefits: [["핵심", "메시지 집중"], ["모바일", "편안한 읽기"], ["검색", "명확한 구조"], ["행동", "분명한 다음 단계"]],
    catalog: "업종 제안", catalogTitle: "여섯 가지 사이트", catalogMeta: "메시지 모션 폼 모바일", preview: "미리보기 크기", desktop: "데스크톱", mobile: "모바일", open: "사이트 보기",
    closing: "한 페이지부터", closingTitle: ["한 페이지부터 시작", "브랜드를 쉽게 이해"], line: "LINE 상담", email: "이메일",
    seoTitle: "업종별 사이트 전시 Qingyu Web", seoDescription: "뷰티 의료 외식 공사 제조 소프트웨어를 위한 간결하고 반응형인 사이트 제안을 확인하세요",
  },
}

const templateMeta = {
  en: {
    beauty: ["Beauty care", "Understand the skin before choosing care", "A calm path from skin concerns to suitable care"],
    clinic: ["Dental clinic", "Understand first then begin treatment with confidence", "Clear treatment steps and a simple booking path"],
    restaurant: ["Dining", "Fire season and craft at one table", "Food space and reservations in one editorial flow"],
    construction: ["Interior work", "Build the plan from survey to handover", "Capabilities cases and estimate steps in one place"],
    manufacturing: ["Precision manufacturing", "Every tolerance has a clear basis", "Machining quality and inquiry details for buyers"],
    saas: ["Software service", "Bring scattered work into one operating space", "A product concept with a focused interactive workspace"],
  },
  ja: {
    beauty: ["美容ケア", "肌の状態を理解してからケアを選ぶ", "肌悩みから適切なケアまで穏やかに案内"],
    clinic: ["歯科医院", "理解してから安心して治療へ", "診療の流れと予約導線を分かりやすく整理"],
    restaurant: ["レストラン", "火入れと季節を一席で味わう", "料理 空間 予約を一つの流れで紹介"],
    construction: ["内装工事", "現地確認から引き渡しまで確実に", "工事力 事例 見積もり手順を一か所に整理"],
    manufacturing: ["精密製造", "すべての公差に根拠を", "加工 品質 問い合わせ情報を調達向けに整理"],
    saas: ["ソフトウェア", "分散した業務を一つの画面へ", "操作できる業務画面で価値を伝える提案"],
  },
  ko: {
    beauty: ["뷰티 케어", "피부 상태를 이해한 뒤 케어 선택", "피부 고민부터 알맞은 케어까지 차분하게 안내"],
    clinic: ["치과", "먼저 이해하고 안심하며 치료 시작", "진료 단계와 예약 경로를 명확하게 정리"],
    restaurant: ["다이닝", "불과 계절을 한 자리에서", "요리 공간 예약을 하나의 흐름으로 소개"],
    construction: ["인테리어 공사", "현장 확인부터 인계까지 정확하게", "공사 역량 사례 견적 단계를 한곳에 정리"],
    manufacturing: ["정밀 제조", "모든 공차에 분명한 근거", "가공 품질 문의 정보를 구매 담당자 중심으로 정리"],
    saas: ["소프트웨어", "흩어진 업무를 하나의 화면으로", "집중된 운영 화면으로 제품 가치를 보여주는 제안"],
  },
}

const templateIdentity = {
  "zh-Hant": {
    beauty: ["花映美研", "肌膚儀式"], clinic: ["和煦牙醫", "溫柔牙科"], restaurant: ["炙序", "火候與季節"],
    construction: ["築序工程", "設計確實落地"], manufacturing: ["鉅衡精密", "每一道公差都有依據"], saas: ["連序系統", "營運整合"],
  },
  en: {
    beauty: ["HANA ECLAT", "SKIN RITUAL"], clinic: ["HESU DENTAL", "GENTLE DENTAL CARE"], restaurant: ["EMBER SEQUENCE", "FIRE SEASON CRAFT"],
    construction: ["BUILD SEQUENCE", "DESIGN BUILT WELL"], manufacturing: ["AXIS PRECISION", "PRECISION IN EVERY CUT"], saas: ["NEXORA", "ORCHESTRATED OPERATIONS"],
  },
  ja: {
    beauty: ["花映ビューティー", "肌のケア習慣"], clinic: ["和煦歯科", "やさしい歯科診療"], restaurant: ["炙序", "火入れと季節"],
    construction: ["築序工務店", "設計を確実に形へ"], manufacturing: ["鉅衡精密", "すべての公差に根拠を"], saas: ["ネクソラ", "業務を一つの流れへ"],
  },
  ko: {
    beauty: ["하나 에클라", "피부 케어 습관"], clinic: ["헤수 치과", "편안한 치과 진료"], restaurant: ["지쉬 다이닝", "불과 계절"],
    construction: ["주쉬 건설", "설계를 정확하게 구현"], manufacturing: ["주헝 정밀", "모든 공차에 분명한 근거"], saas: ["넥소라", "업무를 하나의 흐름으로"],
  },
}

const primaryActions = {
  "zh-Hant": { beauty: "查看預約案例", clinic: "洽詢診所網站", restaurant: "洽詢餐飲網站", construction: "查看估價案例", manufacturing: "洽詢製造網站", saas: "洽詢軟體網站" },
  en: { beauty: "View booking case", clinic: "Discuss a clinic site", restaurant: "Discuss a dining site", construction: "View quote case", manufacturing: "Discuss a manufacturing site", saas: "Discuss a software site" },
  ja: { beauty: "予約事例を見る", clinic: "医院サイトを相談", restaurant: "飲食サイトを相談", construction: "見積もり事例を見る", manufacturing: "製造サイトを相談", saas: "ソフトウェアサイトを相談" },
  ko: { beauty: "예약 사례 보기", clinic: "병원 사이트 상담", restaurant: "외식 사이트 상담", construction: "견적 사례 보기", manufacturing: "제조 사이트 상담", saas: "소프트웨어 사이트 상담" },
}

const ui = {
  "zh-Hant": { concept: "產業概念展示 非實際品牌", main: "主要服務", flow: "服務流程", focus: "服務重點", more: "更多內容", moreTitle: "從服務到聯絡一次看懂", studio: "晴宇網站與系統", cta: "想做一個適合你產業的網站", contact: "洽詢類似網站", back: "返回展示空間", generic: "查看提案內容", steps: "步完成下一個行動", dashboard: "營運工作台", dashboardTitle: "切換畫面 看見需要的資訊", sample: "展示資料", tabs: [["訂單", "下一個動作", "確認三筆訂單"], ["客戶", "需要跟進", "查看待聯絡名單"], ["報表", "本週摘要", "核對訂單與詢問"]] },
  en: { concept: "Industry concept using sample content", main: "Main services", flow: "Service flow", focus: "Service focus", more: "More content", moreTitle: "Understand the service and contact path", studio: "Qingyu websites and systems", cta: "Need a site built for your industry", contact: "Discuss a similar site", back: "Back to showcase", generic: "View the concept", steps: "steps to the next action", dashboard: "Operations workspace", dashboardTitle: "Switch views and find the next task", sample: "Sample data", tabs: [["Orders", "Next action", "Review three orders"], ["Customers", "Needs follow up", "Open the contact list"], ["Reports", "Weekly summary", "Review orders and inquiries"]] },
  ja: { concept: "サンプル情報を使う業種別提案", main: "主なサービス", flow: "サービスの流れ", focus: "サービス要点", more: "その他の内容", moreTitle: "サービスから連絡まで一度で理解", studio: "Qingyu サイトとシステム", cta: "業種に合うサイトを作りたい方へ", contact: "同様のサイトを相談", back: "展示へ戻る", generic: "提案を見る", steps: "ステップで次の行動へ", dashboard: "業務画面", dashboardTitle: "画面を切り替えて必要な情報を確認", sample: "サンプルデータ", tabs: [["注文", "次の作業", "三件の注文を確認"], ["顧客", "要対応", "連絡リストを確認"], ["レポート", "今週の概要", "注文と問い合わせを確認"]] },
  ko: { concept: "예시 콘텐츠를 사용한 업종 제안", main: "주요 서비스", flow: "서비스 흐름", focus: "서비스 핵심", more: "추가 내용", moreTitle: "서비스부터 연락까지 한 번에 이해", studio: "Qingyu 웹사이트와 시스템", cta: "업종에 맞는 사이트가 필요하다면", contact: "비슷한 사이트 상담", back: "전시로 돌아가기", generic: "제안 보기", steps: "단계로 다음 행동 완료", dashboard: "운영 화면", dashboardTitle: "화면을 바꿔 필요한 정보 확인", sample: "예시 자료", tabs: [["주문", "다음 작업", "주문 세 건 확인"], ["고객", "후속 연락", "연락 목록 확인"], ["보고서", "이번 주 요약", "주문과 문의 확인"]] },
}

const configs = {
  "zh-Hant": {
    beauty: { intro: "從膚況理解到療程預約 保留真正需要的資訊", nav: [["療程", "#services"], ["方式", "#process"], ["空間", "#space"]], sectionTitle: "三種照護方向", services: [["舒緩保濕", "補充水分並穩定乾燥"], ["平衡淨化", "整理毛孔與油水平衡"], ["亮采管理", "改善疲憊與暗沉感"]], process: ["了解膚況", "確認療程", "開始照護"], featureTitle: "先看懂現在的膚況", featureText: "照護方向與居家建議集中在同一頁", featureItems: ["乾燥緊繃", "敏感不適", "疲憊暗沉"], action: "體驗預約流程" },
    clinic: { intro: "先看懂療程與醫師 再安心完成預約", nav: [["診療", "#services"], ["流程", "#process"], ["環境", "#space"]], sectionTitle: "四項常見診療", services: [["初診檢查", "確認口腔與牙齒狀況"], ["牙周照護", "建立日常清潔計畫"], ["美學修復", "依需求規劃療程"], ["植牙評估", "完整影像與說明"]], process: ["預約與報到", "檢查與說明", "確認治療計畫"], featureTitle: "把專業說清楚 讓第一次來的人也安心", featureText: "醫師 診療與環境資訊維持清楚層級" },
    restaurant: { intro: "用料理 空間與訂位入口說清楚一間餐廳", nav: [["料理", "#services"], ["主廚", "#process"], ["空間", "#space"]], sectionTitle: "三道代表料理", services: [["炭香牛小排", "以炭火保留肉汁與香氣"], ["季節鮮魚", "依當日漁獲調整做法"], ["焦糖布丁", "以微苦焦糖收尾"]], processTitle: "料理跟著季節走", process: ["當季食材", "恰好的火候", "完整的用餐節奏"], featureTitle: "讓照片帶路 文字只留下必要資訊", featureText: "菜色 品牌與訂位行動在手機上連成一條路徑" },
    construction: { intro: "把工程能力 案例與估價流程整理清楚", nav: [["服務", "#services"], ["流程", "#process"], ["案例", "#space"]], sectionTitle: "四項工程服務", services: [["現場評估", "確認空間與需求"], ["工程規劃", "整理項目與工期"], ["施工管理", "同步進度與責任"], ["驗收保固", "完成交付與後續處理"]], process: ["現勘", "提案與報價", "施工管理", "驗收交付"], featureTitle: "案例與工法並列 讓屋主知道下一步", featureText: "減少來回詢問 先取得足夠資訊再安排現勘", action: "查看估價案例" },
    manufacturing: { intro: "讓採購快速確認加工能力 品質與詢價方式", nav: [["能力", "#services"], ["流程", "#process"], ["設備", "#space"]], sectionTitle: "四項加工能力", services: [["CNC 車削", "少量試作到穩定量產"], ["CNC 銑削", "複雜輪廓與精密孔位"], ["精密量測", "關鍵尺寸完整記錄"], ["零件整合", "依圖面提供加工評估"]], process: ["圖面確認", "可製造性評估", "生產與首件確認", "終檢交付"], featureTitle: "採購需要的資料直接看見", featureText: "加工範圍 品質流程與詢價入口不再分散" },
    saas: { intro: "把分散流程收進同一個營運工作台", nav: [["功能", "#services"], ["流程", "#process"], ["工作台", "#space"]], sectionTitle: "三個常見營運問題", services: [["重複輸入", "同一筆資料需要抄到不同工具"], ["狀態不一致", "每個人看到的進度不同"], ["例外沒人處理", "重要問題容易沉在訊息裡"]], process: ["統一收件", "自動分派", "狀態追蹤", "資料彙整"], featureTitle: "用一次操作看懂產品價值", featureText: "保留可切換工作台 移除重複功能說明" },
  },
  en: {
    beauty: { intro: "Keep only what matters from skin concerns to booking", nav: [["Care", "#services"], ["Steps", "#process"], ["Space", "#space"]], sectionTitle: "Three care directions", services: [["Calm and hydrate", "Support dry and tight skin"], ["Balance and clear", "Refine pores and oil balance"], ["Restore glow", "Care for dull tired skin"]], process: ["Understand skin", "Choose care", "Begin treatment"], featureTitle: "Start with the current skin condition", featureText: "Care direction and home advice stay on one page", featureItems: ["Dryness", "Sensitivity", "Dullness"], action: "Try the booking flow" },
    clinic: { intro: "Understand treatment and the team before booking", nav: [["Care", "#services"], ["Steps", "#process"], ["Clinic", "#space"]], sectionTitle: "Four common services", services: [["First exam", "Review oral and dental health"], ["Gum care", "Build a daily care plan"], ["Restoration", "Plan care around the need"], ["Implant review", "Use clear imaging and explanation"]], process: ["Book and arrive", "Examine and explain", "Confirm the care plan"], featureTitle: "Clear expertise for a calmer first visit", featureText: "Team treatment and space follow a clear hierarchy" },
    restaurant: { intro: "Explain a restaurant through food space and booking", nav: [["Menu", "#services"], ["Kitchen", "#process"], ["Space", "#space"]], sectionTitle: "Three signature dishes", services: [["Charred short rib", "Fire keeps the juice and aroma"], ["Seasonal fish", "Prepared around the daily catch"], ["Caramel pudding", "A lightly bitter finish"]], processTitle: "Cooking follows the season", process: ["Seasonal produce", "Measured heat", "A complete dining rhythm"], featureTitle: "Let imagery lead and keep words focused", featureText: "Menu brand and booking form one mobile path" },
    construction: { intro: "Clarify capability cases and the estimate process", nav: [["Services", "#services"], ["Steps", "#process"], ["Cases", "#space"]], sectionTitle: "Four project services", services: [["Site review", "Confirm space and needs"], ["Project plan", "Define work and timing"], ["Build control", "Track progress and responsibility"], ["Handover", "Complete review and follow up"]], process: ["Site visit", "Plan and quote", "Build control", "Handover"], featureTitle: "Show cases and methods beside the next step", featureText: "Collect useful details before arranging a site visit", action: "View quote case" },
    manufacturing: { intro: "Help buyers confirm capability quality and inquiry details", nav: [["Capability", "#services"], ["Steps", "#process"], ["Equipment", "#space"]], sectionTitle: "Four capabilities", services: [["CNC turning", "Prototype through stable production"], ["CNC milling", "Complex profiles and precise holes"], ["Measurement", "Record critical dimensions"], ["Part review", "Assess machining from drawings"]], process: ["Review drawing", "Assess production", "Run first article", "Inspect and deliver"], featureTitle: "Put purchasing details in view", featureText: "Machining quality and inquiry paths stay together" },
    saas: { intro: "Bring scattered work into one operating space", nav: [["Features", "#services"], ["Flow", "#process"], ["Workspace", "#space"]], sectionTitle: "Three common operating problems", services: [["Repeat entry", "The same data is copied between tools"], ["Conflicting status", "Each person sees different progress"], ["Missed exceptions", "Important issues disappear in messages"]], process: ["Collect work", "Assign automatically", "Track status", "Summarize data"], featureTitle: "Understand the product in one action", featureText: "Keep the useful workspace and remove repeated claims" },
  },
  ja: {
    beauty: { intro: "肌悩みから予約まで必要な情報だけを残す", nav: [["ケア", "#services"], ["流れ", "#process"], ["空間", "#space"]], sectionTitle: "三つのケア方向", services: [["保湿と鎮静", "乾燥とつっぱりを整える"], ["バランスケア", "毛穴と皮脂を整える"], ["透明感ケア", "疲れとくすみに対応"]], process: ["肌を知る", "ケアを選ぶ", "施術を始める"], featureTitle: "今の肌状態から始める", featureText: "ケア方向と自宅での助言を一ページに集約", featureItems: ["乾燥", "敏感", "くすみ"], action: "予約の流れを見る" },
    clinic: { intro: "診療と担当を理解してから安心して予約", nav: [["診療", "#services"], ["流れ", "#process"], ["院内", "#space"]], sectionTitle: "四つの主な診療", services: [["初診検査", "口腔と歯の状態を確認"], ["歯周ケア", "日常の清掃計画を作る"], ["審美修復", "要望に合わせて治療を計画"], ["インプラント相談", "画像と説明で確認"]], process: ["予約と受付", "検査と説明", "治療計画を確認"], featureTitle: "専門内容を分かりやすく 初診も安心", featureText: "担当 診療 院内情報を明確に整理" },
    restaurant: { intro: "料理 空間 予約導線で店の魅力を伝える", nav: [["料理", "#services"], ["厨房", "#process"], ["空間", "#space"]], sectionTitle: "三つの代表料理", services: [["炭火の牛ショートリブ", "肉汁と香りを炭火で保つ"], ["季節の鮮魚", "当日の魚に合わせて調理"], ["カラメルプリン", "ほろ苦い余韻で締める"]], processTitle: "料理は季節とともに", process: ["旬の食材", "適切な火入れ", "心地よい食事の流れ"], featureTitle: "写真を主役に 言葉は必要な分だけ", featureText: "料理 ブランド 予約をモバイルで一つの導線に" },
    construction: { intro: "施工力 事例 見積もりの流れを整理", nav: [["サービス", "#services"], ["流れ", "#process"], ["事例", "#space"]], sectionTitle: "四つの工事サービス", services: [["現地確認", "空間と要望を確認"], ["工事計画", "項目と期間を整理"], ["施工管理", "進捗と責任を共有"], ["検査と保証", "引き渡しと後続対応"]], process: ["現地調査", "提案と見積もり", "施工管理", "検査と引き渡し"], featureTitle: "事例と工法から次の一歩が分かる", featureText: "必要情報を先に確認して現地調査を手配", action: "見積もり事例を見る" },
    manufacturing: { intro: "調達担当が加工力 品質 問い合わせ方法をすぐ確認", nav: [["加工力", "#services"], ["流れ", "#process"], ["設備", "#space"]], sectionTitle: "四つの加工力", services: [["CNC旋削", "試作から安定量産まで"], ["CNCフライス", "複雑形状と精密穴加工"], ["精密測定", "重要寸法を記録"], ["部品検討", "図面から加工を評価"]], process: ["図面確認", "製造性評価", "初品確認", "最終検査と納品"], featureTitle: "調達に必要な情報をすぐ見せる", featureText: "加工範囲 品質 問い合わせ導線を一か所に" },
    saas: { intro: "分散した業務を一つの運営画面へ", nav: [["機能", "#services"], ["流れ", "#process"], ["画面", "#space"]], sectionTitle: "三つのよくある運営課題", services: [["重複入力", "同じ情報を複数のツールへ転記"], ["状態の不一致", "人によって進捗表示が異なる"], ["例外の見落とし", "重要な問題がメッセージに埋もれる"]], process: ["受付を集約", "自動で担当へ", "状態を追跡", "情報を要約"], featureTitle: "一度の操作で価値を理解", featureText: "必要な業務画面だけを残し重複説明を削減" },
  },
  ko: {
    beauty: { intro: "피부 고민부터 예약까지 필요한 정보만 유지", nav: [["케어", "#services"], ["과정", "#process"], ["공간", "#space"]], sectionTitle: "세 가지 케어 방향", services: [["진정과 보습", "건조하고 당기는 피부 케어"], ["균형과 정돈", "모공과 유분 균형 정리"], ["맑은 피부", "피로와 칙칙함 케어"]], process: ["피부 이해", "케어 선택", "관리 시작"], featureTitle: "현재 피부 상태부터 확인", featureText: "케어 방향과 홈케어 안내를 한 페이지에 정리", featureItems: ["건조함", "민감함", "칙칙함"], action: "예약 흐름 보기" },
    clinic: { intro: "진료와 담당자를 이해한 뒤 편안하게 예약", nav: [["진료", "#services"], ["과정", "#process"], ["공간", "#space"]], sectionTitle: "네 가지 주요 진료", services: [["초진 검사", "구강과 치아 상태 확인"], ["잇몸 관리", "일상 관리 계획 수립"], ["심미 수복", "필요에 맞춰 치료 계획"], ["임플란트 상담", "영상과 설명으로 확인"]], process: ["예약과 접수", "검사와 설명", "치료 계획 확인"], featureTitle: "전문 내용을 명확하게 첫 방문도 편안하게", featureText: "의료진 진료 공간 정보를 명확한 순서로 정리" },
    restaurant: { intro: "요리 공간 예약 경로로 식당을 명확하게 소개", nav: [["요리", "#services"], ["주방", "#process"], ["공간", "#space"]], sectionTitle: "세 가지 대표 요리", services: [["숯불 갈비", "숯불로 육즙과 향을 유지"], ["제철 생선", "당일 재료에 맞춰 조리"], ["캐러멜 푸딩", "은은한 쌉싸름함으로 마무리"]], processTitle: "계절을 따라가는 요리", process: ["제철 재료", "알맞은 불 조절", "완성된 식사 흐름"], featureTitle: "사진이 이끌고 글은 꼭 필요한 만큼", featureText: "메뉴 브랜드 예약을 모바일 한 경로로 연결" },
    construction: { intro: "공사 역량 사례 견적 과정을 명확하게 정리", nav: [["서비스", "#services"], ["과정", "#process"], ["사례", "#space"]], sectionTitle: "네 가지 공사 서비스", services: [["현장 확인", "공간과 요구 확인"], ["공사 계획", "항목과 기간 정리"], ["시공 관리", "진행과 책임 공유"], ["검수와 보증", "인계와 후속 처리"]], process: ["현장 조사", "제안과 견적", "시공 관리", "검수와 인계"], featureTitle: "사례와 공법으로 다음 단계 안내", featureText: "필요한 정보를 먼저 확인한 뒤 현장 조사 예약", action: "견적 사례 보기" },
    manufacturing: { intro: "구매 담당자가 가공 역량 품질 문의 방법을 빠르게 확인", nav: [["역량", "#services"], ["과정", "#process"], ["설비", "#space"]], sectionTitle: "네 가지 가공 역량", services: [["CNC 선삭", "시제품부터 안정적인 양산까지"], ["CNC 밀링", "복잡한 형상과 정밀 홀"], ["정밀 측정", "중요 치수를 기록"], ["부품 검토", "도면을 바탕으로 가공 평가"]], process: ["도면 확인", "제조성 평가", "초도품 확인", "최종 검사와 납품"], featureTitle: "구매에 필요한 정보를 바로 확인", featureText: "가공 범위 품질 문의 경로를 한곳에 정리" },
    saas: { intro: "흩어진 업무를 하나의 운영 화면으로", nav: [["기능", "#services"], ["과정", "#process"], ["화면", "#space"]], sectionTitle: "세 가지 흔한 운영 문제", services: [["반복 입력", "같은 자료를 여러 도구에 다시 입력"], ["서로 다른 상태", "사람마다 다른 진행 상황 확인"], ["놓친 예외", "중요한 문제가 메시지에 묻힘"]], process: ["업무 접수 통합", "자동 배정", "상태 추적", "자료 요약"], featureTitle: "한 번의 조작으로 제품 가치 이해", featureText: "필요한 운영 화면만 남기고 반복 설명 제거" },
  },
}

const details = {
  "zh-Hant": {
    beauty: { title: "預約前先確認", items: [["服務時間", "照護示例 60 至 90 分鐘"], ["預約前", "告知膚況 過敏與目前保養"], ["到店前", "維持平常保養 暫停新增刺激性產品"]] },
    clinic: { title: "初診需要的資訊", items: [["醫師資訊", "頁面呈現負責醫師與專長 資格由診所確認"], ["初診流程", "報到 檢查 影像與治療說明"], ["交通資訊", "預約前確認地址 大眾運輸與停車方式"]] },
    restaurant: { title: "訂位前就能看懂", items: [["供應時段", "晚餐與週末午餐為版面示例"], ["價格區間", "套餐 NT$1,680 起為展示資料"], ["席位訂位", "選擇人數 日期與時段後送出需求"]] },
    construction: { title: "從範圍到驗收", items: [["工作範圍", "丈量 拆除 泥作 木作與收尾依現勘確認"], ["工期規劃", "報價前拆分階段與預計時間"], ["驗收方式", "照片 清單與現場確認後交付"]] },
    manufacturing: { title: "詢價需要的技術資料", items: [["材料示例", "鋁合金 不鏽鋼與碳鋼依圖面評估"], ["設備示例", "CNC 車床 銑床與三次元量測"], ["品質紀錄", "首件與關鍵尺寸留下量測結果"], ["詢價資料", "圖面 材料 數量 公差與交期"]] },
    saas: { title: "方案差異看工作範圍", items: [["單一任務", "收到需求 指派負責人 完成並留下紀錄"], ["基礎方向", "單一流程與清楚狀態"], ["團隊方向", "多角色 權限與操作歷史"], ["整合方向", "API 資料移轉與例外處理個別評估"]] },
  },
  en: {
    beauty: { title: "Know before booking", items: [["Session", "Sample care session 60 to 90 minutes"], ["Before booking", "Share skin concerns allergies and current products"], ["Before arrival", "Keep the usual routine and avoid new active products"]] },
    clinic: { title: "What a first visit needs", items: [["Dentist profile", "Show the treating dentist and focus areas with clinic verified credentials"], ["First visit", "Check in examination imaging when needed and treatment review"], ["Getting there", "Confirm address transit and parking before booking"]] },
    restaurant: { title: "Know before reserving", items: [["Service hours", "Dinner and weekend lunch shown as sample content"], ["Price range", "Set menu from NT$1,680 shown as sample data"], ["Reservation", "Choose party size date and time before sending a request"]] },
    construction: { title: "Scope through handover", items: [["Work scope", "Survey removal masonry carpentry and finish work confirmed on site"], ["Schedule", "Split work into stages and estimated timing before quotation"], ["Handover", "Review photos checklist and site condition before signoff"]] },
    manufacturing: { title: "Details buyers need", items: [["Sample materials", "Aluminium stainless steel and carbon steel reviewed from drawings"], ["Sample equipment", "CNC turning milling and coordinate measurement"], ["Quality record", "Record first article and critical dimension results"], ["Inquiry input", "Drawing material quantity tolerance and required date"]] },
    saas: { title: "Plans defined by work scope", items: [["One task", "Receive assign complete and keep the activity record"], ["Core direction", "One workflow with clear status"], ["Team direction", "Multiple roles permissions and history"], ["Integration direction", "API migration and exception handling assessed separately"]] },
  },
  ja: {
    beauty: { title: "予約前に確認", items: [["施術時間", "ケア時間 60 から 90 分の表示例"], ["予約前", "肌悩み アレルギー 使用中の製品を共有"], ["来店前", "普段のケアを続け新しい刺激性製品を避ける"]] },
    clinic: { title: "初診に必要な情報", items: [["担当医情報", "担当医と専門分野を掲載し資格は医院が確認"], ["初診の流れ", "受付 検査 必要な画像撮影 治療説明"], ["アクセス", "予約前に住所 交通 駐車方法を確認"]] },
    restaurant: { title: "予約前に分かること", items: [["提供時間", "ディナーと週末ランチの表示例"], ["価格帯", "コース NT$1,680 からのサンプル情報"], ["席の予約", "人数 日付 時間を選んでリクエスト"]] },
    construction: { title: "範囲から引き渡しまで", items: [["工事範囲", "採寸 解体 左官 木工 仕上げを現地で確認"], ["工程計画", "見積もり前に工程と予定期間を整理"], ["検査方法", "写真 チェックリスト 現地確認後に引き渡し"]] },
    manufacturing: { title: "見積もりに必要な技術情報", items: [["材料例", "アルミ ステンレス 炭素鋼を図面から評価"], ["設備例", "CNC旋盤 フライス 三次元測定"], ["品質記録", "初品と重要寸法の測定結果を記録"], ["見積もり資料", "図面 材料 数量 公差 希望納期"]] },
    saas: { title: "作業範囲で見るプラン", items: [["一つの作業", "受付 担当割り当て 完了 履歴まで確認"], ["基本", "一つの流れと明確な状態"], ["チーム", "複数の役割 権限 操作履歴"], ["連携", "API 移行 例外処理は個別に評価"]] },
  },
  ko: {
    beauty: { title: "예약 전 확인", items: [["관리 시간", "60분에서 90분 관리 예시"], ["예약 전", "피부 고민 알레르기 사용 제품 공유"], ["방문 전", "평소 루틴을 유지하고 새 자극 제품은 피하기"]] },
    clinic: { title: "첫 방문에 필요한 정보", items: [["의료진 정보", "담당 의료진과 진료 분야를 표시하고 자격은 병원이 확인"], ["첫 방문", "접수 검사 필요 시 촬영 진료 설명"], ["오시는 길", "예약 전 주소 교통 주차 방법 확인"]] },
    restaurant: { title: "예약 전 확인", items: [["운영 시간", "저녁과 주말 점심을 예시로 표시"], ["가격 범위", "코스 NT$1,680부터인 예시 자료"], ["좌석 예약", "인원 날짜 시간을 선택해 요청 전송"]] },
    construction: { title: "범위부터 인계까지", items: [["공사 범위", "측정 철거 조적 목공 마감을 현장에서 확인"], ["일정 계획", "견적 전에 단계와 예상 기간 정리"], ["검수 방식", "사진 체크리스트 현장 확인 후 인계"]] },
    manufacturing: { title: "견적에 필요한 기술 자료", items: [["재료 예시", "알루미늄 스테인리스 탄소강을 도면으로 평가"], ["설비 예시", "CNC 선반 밀링과 3차원 측정"], ["품질 기록", "초도품과 중요 치수 측정 결과 기록"], ["문의 자료", "도면 재료 수량 공차 희망 납기"]] },
    saas: { title: "업무 범위로 보는 구성", items: [["한 가지 업무", "접수 담당 배정 완료와 기록 확인"], ["기본", "한 가지 흐름과 명확한 상태"], ["팀", "여러 역할 권한과 작업 기록"], ["연동", "API 이전과 예외 처리는 별도 검토"]] },
  },
}

function fallbackConfig(locale, slug) {
  const english = configs.en[slug]
  return english
}

export function getOnepageHubCopy(locale) {
  return hub[locale] ?? hub["zh-Hant"]
}

export function localizeOnepageTemplate(template, locale) {
  const identity = templateIdentity[locale]?.[template.slug] ?? templateIdentity["zh-Hant"][template.slug]
  if (locale === "zh-Hant" || !templateMeta[locale]?.[template.slug]) {
    return { ...template, brand: identity[0], eyebrow: identity[1] }
  }
  const [industry, title, summary] = templateMeta[locale][template.slug]
  return { ...template, industry, title, summary, brand: identity[0], eyebrow: identity[1] }
}

export function getIndustryConfig(locale, slug) {
  const config = configs[locale]?.[slug] ?? fallbackConfig(locale, slug)
  return { ...config, action: primaryActions[locale]?.[slug] ?? primaryActions.en[slug] }
}

export function getIndustryDetails(locale, slug) {
  return details[locale]?.[slug] ?? details.en[slug]
}

export function getIndustryUi(locale) {
  return ui[locale] ?? ui["zh-Hant"]
}
