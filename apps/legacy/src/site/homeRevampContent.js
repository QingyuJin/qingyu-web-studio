// Keep the full portfolio and its existing filters independent of the short home selection.
export const homeFeaturedSlugs = ["quoteflow", "bookcrm", "xinjiang"]

const copy = {
  "zh-Hant": {
    contactTitle: "從你的需求開始", contactIntro: "說明遇到的問題 我會回覆做法與估價", optionalShort: "選填", otherContact: "其他聯絡方式", proofNote: "系統使用展示資料 鑫匠工程為客戶網站",
    servicesTitle: "你需要哪種服務",
    servicesIntro: "先選最接近的需求",
    services: [
      ["品牌網站", "介紹服務與作品 引導客戶洽詢", "/services#business-website"],
      ["網站修改", "調整手機排版 更新內容或功能", "/services#website-updates"],
      ["LINE 自動客服", "自動接待詢價 整理客戶需求", "/services#line-automation"],
      ["業務管理系統", "集中處理報價 預約與客戶資料", "/services#web-systems"],
    ],
    selectedTitle: "三個實際案例",
    selectedIntro: "從報價管理到工地作品 看實際畫面",
    processTitle: "合作流程",
    processIntro: "確認範圍與費用後開始製作",
    steps: [
      ["說明需求", "從現有問題開始 不必先寫規格"],
      ["確認報價", "約定功能 交付內容 時間與費用"],
      ["製作與交付", "確認操作流程 完成測試再上線"],
    ],
    updatesTitle: "網站小型修改",
    updatesText: "從手機排版到內容與功能 都可依現況調整",
    updatesScope: "檢查現有程式後報價 除錯與額外串接另行評估",
    similar: "詢問類似功能",
    optional: "其他選填資訊",
    contactHint: "電子郵件或 LINE 帳號或電話",
    invalidProblem: "請用至少四個字說明需求",
    invalidContact: "請填有效的電子郵件或電話 或使用 4 至 20 碼的 LINE 帳號",
    privacy: "資料僅供工作室處理本次詢問 由 Supabase 保存並以電子郵件通知負責人 可來信更正或刪除",
    emailAddress: "也可以直接寄信至",
  },
  en: {
    contactTitle: "Tell us what you need", contactIntro: "Describe the problem for an approach and estimate", optionalShort: "optional", otherContact: "Other ways to reach us", proofNote: "Systems use demo data and Xinjiang is a client website",
    servicesTitle: "What do you need", servicesIntro: "Start with the service closest to your needs",
    services: [["Brand websites", "Show services and work and invite inquiries", "/services#business-website"], ["Website updates", "Improve mobile layouts and update content or features", "/services#website-updates"], ["LINE bots", "Collect inquiries and organize customer requests", "/services#line-automation"], ["Business software", "Manage quotes bookings and customer records", "/services#web-systems"]],
    selectedTitle: "Three projects to explore", selectedIntro: "See how quotes bookings and project photos work in practice", processTitle: "How we work", processIntro: "Agree on scope and fees before work begins",
    steps: [["Share your needs", "Start with the problem rather than a full brief"], ["Agree on a quote", "Confirm features deliverables timing and fees"], ["Build and hand over", "Review the workflow and test before launch"]],
    updatesTitle: "Small website updates", updatesText: "Improve an existing layout or update content and features", updatesScope: "Quoted after a code review with troubleshooting and integrations assessed separately", similar: "Ask about a similar project", optional: "Optional details", contactHint: "Email address or LINE ID or phone number", invalidProblem: "Describe your request in at least four characters", invalidContact: "Enter a valid email or phone number or a LINE ID of 4 to 20 characters", privacy: "Only the studio uses this inquiry Supabase stores it and the owner receives an email You can email us to correct or delete it", emailAddress: "You can also email",
  },
  ja: {
    contactTitle: "ご相談内容をお聞かせください", contactIntro: "課題をもとに制作方法と見積もりをご案内します", optionalShort: "任意", otherContact: "その他の連絡方法", proofNote: "システムはデモデータを使用 鑫匠はお客様の公開サイトです",
    servicesTitle: "ご希望のサービス", servicesIntro: "目的に近いものをお選びください",
    services: [["ブランドサイト", "サービスと実績を紹介して問い合わせへ", "/services#business-website"], ["サイトの改修", "スマホ表示や内容と機能を改善", "/services#website-updates"], ["LINE自動応答", "問い合わせを受け付けてご要望を整理", "/services#line-automation"], ["業務システム", "見積もりや予約と顧客情報を一元管理", "/services#web-systems"]],
    selectedTitle: "三つの制作事例", selectedIntro: "見積もりや予約の流れと施工事例を実際の画面で紹介", processTitle: "ご依頼の流れ", processIntro: "範囲と費用を確認してから制作します",
    steps: [["課題を共有", "仕様書がなくてもご相談いただけます"], ["見積もりを確認", "機能と納品物と日程や費用を確認"], ["制作と納品", "操作を確認してテスト後に公開"]],
    updatesTitle: "小規模なサイト修正", updatesText: "スマホ表示や内容の更新から機能の改善まで対応", updatesScope: "既存コードを確認して見積もります 不具合調査や追加連携は別途検討", similar: "同様の制作を相談", optional: "その他の任意項目", contactHint: "メールアドレスかLINE IDか電話番号", invalidProblem: "ご相談内容を4文字以上で入力してください", invalidContact: "有効なメールアドレスか電話番号または4文字から20文字のLINE IDを入力してください", privacy: "相談内容はSupabaseに保存し担当者にメールで通知します 今回の対応にのみ使用します 訂正や削除はメールでご依頼ください", emailAddress: "メールでも相談できます",
  },
  ko: {
    contactTitle: "필요한 작업을 알려주세요", contactIntro: "문제를 알려주시면 작업 방법과 견적을 안내합니다", optionalShort: "선택", otherContact: "다른 연락 방법", proofNote: "시스템에는 예시 데이터를 사용하며 신장은 실제 고객 사이트입니다",
    servicesTitle: "어떤 서비스가 필요한가요", servicesIntro: "원하는 작업에 가까운 서비스를 선택하세요",
    services: [["브랜드 웹사이트", "서비스와 작업 사례를 소개하고 문의로 연결", "/services#business-website"], ["웹사이트 수정", "모바일 레이아웃과 콘텐츠 및 기능 개선", "/services#website-updates"], ["LINE 자동 응대", "문의를 접수하고 고객 요청을 정리", "/services#line-automation"], ["업무 관리 시스템", "견적과 예약 및 고객 정보를 한곳에서 관리", "/services#web-systems"]],
    selectedTitle: "세 가지 제작 사례", selectedIntro: "견적과 예약 흐름부터 시공 사례까지 실제 화면으로 확인", processTitle: "작업 과정", processIntro: "범위와 비용을 확인한 뒤 제작합니다",
    steps: [["문제 공유", "기획서 없이도 현재 문제부터 상담할 수 있습니다"], ["견적 확인", "기능과 납품 범위 및 일정과 비용 확인"], ["제작 및 인계", "흐름을 확인하고 테스트 후 공개"]],
    updatesTitle: "소규모 사이트 수정", updatesText: "모바일 화면과 콘텐츠를 수정하고 필요한 기능을 개선합니다", updatesScope: "기존 코드 검토 후 견적을 안내하며 오류 분석과 추가 연동은 별도 검토합니다", similar: "비슷한 작업 문의", optional: "추가 선택 항목", contactHint: "이메일이나 LINE 아이디 또는 전화번호", invalidProblem: "요청 내용을 네 글자 이상 입력하세요", invalidContact: "유효한 이메일이나 전화번호 또는 4자에서 20자의 LINE 아이디를 입력하세요", privacy: "문의는 Supabase에 저장되며 담당자에게 이메일로 알립니다 해당 문의에만 사용하며 수정이나 삭제는 이메일로 요청할 수 있습니다", emailAddress: "이메일로도 문의할 수 있습니다",
  },
}
export function getHomeRevampCopy(locale) {
  return copy[locale] ?? copy["zh-Hant"]
}
