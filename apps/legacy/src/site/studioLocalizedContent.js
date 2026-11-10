import { serviceStories, workingSteps } from "./studioContent"

const translations = {
  en: {
    services: [
      [
        "Give your brand a thoughtful website",
        "Help new visitors understand your work feel your style and find a clear way to get in touch",
        "Brand websites / Landing pages / Shopping flows / Mobile design",
        "We organize the content then bring your brand into every page",
      ],
      [
        "Bring order to everyday work",
        "Orders customer records and quotes live in different places making work hard to follow",
        "Admin tools / CRM / Orders / Case management",
        "Make one important workflow work well then extend it when needed",
      ],
      [
        "Stop repeating the same LINE replies",
        "Let a guided conversation collect the basics so you can focus on the questions that need your judgment",
        "LINE bots / Inquiries / Notifications / Integrations",
        "Keep a clear way for a person to take over",
      ],
      [
        "Find answers in your documents",
        "The answer is somewhere in the files versions and conversations—but finding it takes time",
        "Document search / Knowledge bases / AI answers / Citations",
        "Organize the sources and permissions before choosing search or AI",
      ],
    ],
    steps: [
      ["Talk about the problem", "Start where you are stuck; a finished brief is not required"],
      ["Clarify the needs", "Map the idea users and daily workflow"],
      ["Agree on scope", "Confirm deliverables timing and cost"],
      ["Design and build", "Review the screens and flow then build a working version"],
      ["Test together", "Check real scenarios mobile use data and errors"],
      ["Launch", "Complete deployment setup and operating instructions"],
      ["Maintain", "Handle agreed fixes and maintenance; scope new requests separately"],
    ],
  },
  ja: {
    services: [
      [
        "ブランドらしいサイトにしたい",
        "初めて訪れた人がサービスと雰囲気を理解し 相談先を見つけられるように",
        "ブランドサイト / LP / 購入導線 / モバイル",
        "内容を整理し 各ページにブランドの個性を反映します",
      ],
      [
        "日々の業務を整理したい",
        "注文 顧客 見積が別々に記録され 状況を追いにくくなっている",
        "管理画面 / CRM / 注文 / 案件管理",
        "まず重要な一つの流れを整え 必要に応じて広げます",
      ],
      [
        "LINEで同じ回答を繰り返している",
        "基本的な質問と情報収集を自動化し 判断が必要な相談に集中できます",
        "LINE Bot / 問い合わせ / 通知 / 連携",
        "人が引き継げる余地を残して設計します",
      ],
      [
        "資料から答えを見つけたい",
        "文書 版 会話に答えが埋もれ 探し直すのに時間がかかる",
        "文書検索 / 社内知識 / AI回答 / 出典",
        "資料と権限を整理してから 検索やAIの方法を選びます",
      ],
    ],
    steps: [
      ["課題を話す", "仕様書がなくても 困っていることから"],
      ["要件を整理", "利用者と日々の流れを明確にします"],
      ["範囲を確認", "納品物 期間 費用を合意します"],
      ["設計と開発", "画面と流れを確認し 動く形にします"],
      ["一緒にテスト", "実際の場面 モバイル データ エラーを確認"],
      ["公開", "配備 設定 操作説明を整えます"],
      ["保守", "合意した修正と保守を行い 追加要望は別途確認"],
    ],
  },
  ko: {
    services: [
      [
        "브랜드다운 웹사이트를 만들고 싶어요",
        "처음 온 사람이 서비스와 분위기를 이해하고 문의 방법을 쉽게 찾도록 합니다",
        "브랜드 사이트 / 랜딩 페이지 / 구매 흐름 / 모바일",
        "내용을 정리한 뒤 페이지마다 브랜드의 개성을 담습니다",
      ],
      [
        "회사 업무가 점점 복잡해져요",
        "주문 고객 견적이 따로 기록되어 진행 상황을 파악하기 어렵습니다",
        "관리 화면 / CRM / 주문 / 업무 관리",
        "중요한 한 가지 흐름부터 잘 만들고 필요에 맞춰 확장합니다",
      ],
      [
        "LINE에서 같은 답변을 반복해요",
        "기본 질문과 정보 수집을 도와 사람이 판단해야 할 상담에 집중합니다",
        "LINE Bot / 문의 / 자동 알림 / 연동",
        "사람이 이어받을 수 있는 흐름을 남깁니다",
      ],
      [
        "자료에서 답을 찾기 어려워요",
        "문서 버전 대화에 답이 흩어져 매번 다시 찾아야 합니다",
        "문서 검색 / 사내 지식 / AI 답변 / 출처",
        "자료와 권한을 정리한 뒤 검색이나 AI 방식을 선택합니다",
      ],
    ],
    steps: [
      ["문제부터 대화", "기획서 없이 막히는 일부터 시작합니다"],
      ["요구 정리", "사용자와 일상 업무를 명확하게 정리합니다"],
      ["범위 확인", "결과물 일정 비용을 합의합니다"],
      ["디자인과 개발", "화면과 흐름을 확인하고 작동하는 버전을 만듭니다"],
      ["함께 테스트", "실제 상황 모바일 데이터 오류를 확인합니다"],
      ["공개", "배포 설정 사용 설명을 준비합니다"],
      ["유지보수", "합의한 수정과 보수를 진행하고 추가 요구는 별도로 확인합니다"],
    ],
  },
}
export function getStudioServices(locale) {
  return serviceStories.map((story, i) => {
    const copy = translations[locale]?.services[i]
    return copy
      ? { ...story, title: copy[0], text: copy[1], includes: copy[2], result: copy[3] }
      : story
  })
}
export function getWorkingSteps(locale) {
  return translations[locale]?.steps ?? workingSteps
}
