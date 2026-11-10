import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocale } from "./i18n/LocaleContext"
import Seo from "./site/Seo"

const images = {
  hero: "/assets/onepage/clinic/clinic-team.webp",
  content: "/assets/onepage/clinic/clinic-consultation.webp",
  detail: "/assets/onepage/clinic/clinic-equipment.webp",
  space: "/assets/onepage/clinic/clinic-interior.webp",
}

const copyByLocale = {
  "zh-Hant": {
    notice: "品牌概念展示 使用範例內容 不代表實際人物 活動或營運資料",
    nav: [["內容", "#content"], ["製作", "#process"], ["活動", "#event"]],
    back: "返回晴宇作品", eyebrow: "生醫品牌內容", title: "讓醫療專業被清楚理解", lead: "以人物觀點 衛教內容與活動入口 建立可信任的品牌閱讀體驗", view: "查看內容設計", contact: "洽詢品牌網站",
    focusLabel: "內容方向", focusTitle: "專業清楚 人的感受也被保留", focusText: "每一種內容都先確認讀者問題 再決定適合的形式",
    focuses: [["人物觀點", "用訪談整理專業判斷與工作日常"], ["衛教內容", "把複雜知識拆成容易查找的主題"], ["活動入口", "讓活動資訊與參與方式維持清楚"]],
    editorialLabel: "內容示範", editorialTitle: "三種可長期累積的內容", sample: "範例編輯方向",
    articles: [["急診溝通", "把現場判斷轉成家屬能理解的資訊"], ["初診指南", "在看診前先回答常見疑問"], ["療程期待", "清楚說明選擇 風險與下一步"]],
    processLabel: "製作流程", processTitle: "先確認內容責任 再開始發布", steps: [["主題", "確認讀者與核心問題"], ["審閱", "由專業端確認用語與界線"], ["發布", "整理成網站與社群可用格式"]],
    eventLabel: "互動示範", eventTitle: "活動入口不用填真實資料", eventText: "選一種參與方式 看完整的畫面回饋", online: "線上參與", onsite: "現場參與", choose: "選擇參與方式", finish: "完成展示報名", complete: "展示狀態已完成 不會保存資料或寄送通知", replay: "重新體驗",
    closing: "需要可信任的專業品牌網站", closingText: "從內容結構 品牌介面到手機版一起完成", closingAction: "說明目前需求", footer: "生醫品牌網站概念設計",
    seoTitle: "生醫品牌網站概念 晴宇 Qingyu Web", seoDescription: "以人物觀點 衛教內容與活動入口呈現生醫品牌網站的內容結構與手機體驗",
  },
  en: {
    notice: "Brand concept using sample content with no real people events or operating data",
    nav: [["Content", "#content"], ["Process", "#process"], ["Event", "#event"]],
    back: "Back to Qingyu works", eyebrow: "Biomed brand content", title: "Make medical expertise clear", lead: "Build a trusted reading experience through expert views educational content and clear event paths", view: "View content design", contact: "Discuss a brand site",
    focusLabel: "Content direction", focusTitle: "Clear expertise with a human voice", focusText: "Each format begins with the reader question before choosing the right medium",
    focuses: [["Expert voice", "Turn interviews into clear professional judgement"], ["Education", "Break complex knowledge into searchable topics"], ["Event path", "Keep event details and participation simple"]],
    editorialLabel: "Content example", editorialTitle: "Three formats that can grow over time", sample: "Sample editorial direction",
    articles: [["Emergency communication", "Translate urgent decisions into clear family guidance"], ["First visit guide", "Answer common questions before the appointment"], ["Treatment expectations", "Explain choices risks and next steps"]],
    processLabel: "Production flow", processTitle: "Confirm responsibility before publishing", steps: [["Topic", "Define the reader and core question"], ["Review", "Have experts confirm language and boundaries"], ["Publish", "Prepare formats for site and social use"]],
    eventLabel: "Interaction example", eventTitle: "Try the event path without personal data", eventText: "Choose a participation format and see the complete interface state", online: "Join online", onsite: "Join onsite", choose: "Choose a format", finish: "Complete demo registration", complete: "Demo complete with no data saved or notification sent", replay: "Try again",
    closing: "Need a trusted professional brand site", closingText: "Content structure brand interface and mobile delivery in one project", closingAction: "Share the current need", footer: "Biomed brand website concept",
    seoTitle: "Biomed brand website concept Qingyu Web", seoDescription: "A concise biomed brand concept using expert views educational content and a clear event experience",
  },
  ja: {
    notice: "サンプル情報を使うブランド提案 実在人物 活動 営業情報ではありません",
    nav: [["内容", "#content"], ["制作", "#process"], ["イベント", "#event"]],
    back: "Qingyu作品へ戻る", eyebrow: "医療ブランドコンテンツ", title: "医療の専門性を分かりやすく", lead: "専門家の視点 衛教情報 イベント導線で信頼できる読書体験を作る", view: "内容設計を見る", contact: "ブランドサイトを相談",
    focusLabel: "内容の方向", focusTitle: "専門性を明確に 人の温度も残す", focusText: "読者の疑問を確認してから適切な表現を選びます",
    focuses: [["専門家の視点", "取材から判断と日常を整理"], ["衛教情報", "複雑な知識を探しやすい主題へ"], ["イベント導線", "情報と参加方法を明確に"]],
    editorialLabel: "内容例", editorialTitle: "長く積み重ねられる三つの形式", sample: "編集方向のサンプル",
    articles: [["救急時の説明", "現場判断を家族が理解できる情報へ"], ["初診ガイド", "受診前によくある疑問へ回答"], ["治療への期待", "選択 リスク 次の一歩を説明"]],
    processLabel: "制作の流れ", processTitle: "内容の責任を確認してから公開", steps: [["主題", "読者と中心課題を確認"], ["監修", "専門側が用語と境界を確認"], ["公開", "サイトとSNS用の形式へ整理"]],
    eventLabel: "操作例", eventTitle: "個人情報なしで参加導線を体験", eventText: "参加方法を選んで完了画面まで確認できます", online: "オンライン", onsite: "会場参加", choose: "参加方法を選ぶ", finish: "デモ登録を完了", complete: "デモ完了 データ保存や通知送信は行いません", replay: "もう一度",
    closing: "信頼できる専門ブランドサイトが必要なら", closingText: "内容構造 ブランド画面 モバイル対応をまとめて制作", closingAction: "現在の要望を伝える", footer: "医療ブランドサイト提案",
    seoTitle: "医療ブランドサイト提案 Qingyu Web", seoDescription: "専門家の視点 衛教情報 イベント導線を整理した医療ブランドサイト提案",
  },
  ko: {
    notice: "예시 콘텐츠를 사용한 브랜드 제안 실제 인물 행사 운영 자료가 아님",
    nav: [["콘텐츠", "#content"], ["제작", "#process"], ["행사", "#event"]],
    back: "Qingyu 작품으로", eyebrow: "바이오 브랜드 콘텐츠", title: "의료 전문성을 명확하게 전달", lead: "전문가 관점 교육 콘텐츠 행사 경로로 신뢰할 수 있는 읽기 경험 구성", view: "콘텐츠 설계 보기", contact: "브랜드 사이트 상담",
    focusLabel: "콘텐츠 방향", focusTitle: "전문성은 명확하게 사람의 온도도 유지", focusText: "독자의 질문을 먼저 확인한 뒤 알맞은 형식을 선택합니다",
    focuses: [["전문가 관점", "인터뷰로 전문 판단과 일상 정리"], ["교육 콘텐츠", "복잡한 지식을 찾기 쉬운 주제로 정리"], ["행사 경로", "행사 정보와 참여 방법을 명확하게"]],
    editorialLabel: "콘텐츠 예시", editorialTitle: "꾸준히 쌓을 수 있는 세 가지 형식", sample: "편집 방향 예시",
    articles: [["응급실 소통", "현장 판단을 가족이 이해할 정보로 전달"], ["첫 방문 안내", "진료 전에 자주 묻는 질문에 답변"], ["치료 기대", "선택 위험 다음 단계를 명확하게 설명"]],
    processLabel: "제작 과정", processTitle: "콘텐츠 책임을 확인한 뒤 공개", steps: [["주제", "독자와 핵심 질문 확인"], ["검토", "전문가가 표현과 경계 확인"], ["공개", "사이트와 소셜 형식으로 정리"]],
    eventLabel: "상호 작용 예시", eventTitle: "개인 정보 없이 행사 경로 체험", eventText: "참여 방법을 고르고 완료 화면까지 확인하세요", online: "온라인 참여", onsite: "현장 참여", choose: "참여 방법 선택", finish: "예시 등록 완료", complete: "예시 완료 자료 저장이나 알림 전송 없음", replay: "다시 체험",
    closing: "신뢰할 수 있는 전문 브랜드 사이트가 필요하다면", closingText: "콘텐츠 구조 브랜드 화면 모바일 구현을 함께 완성", closingAction: "현재 요구 전달", footer: "바이오 브랜드 사이트 제안",
    seoTitle: "바이오 브랜드 사이트 제안 Qingyu Web", seoDescription: "전문가 관점 교육 콘텐츠 행사 경로를 명확하게 정리한 바이오 브랜드 사이트 제안",
  },
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export default function BiomedBrandSite() {
  const { locale } = useLocale()
  const copy = copyByLocale[locale] ?? copyByLocale["zh-Hant"]
  const [format, setFormat] = useState("")
  const [complete, setComplete] = useState(false)

  function reset() {
    setFormat("")
    setComplete(false)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f0e6] text-[#243a32]" data-preserve-text data-skip-experience-polish>
      <Seo page={{ path: "/demo/biomed-brand-site", title: copy.seoTitle, description: copy.seoDescription, image: images.hero, robots: "noindex, follow, noarchive", localizedCopy: true }} />
      <p className="bg-[#243a32] px-4 py-2 text-center text-[10px] font-semibold leading-5 tracking-[.04em] text-[#eadcb9]">{copy.notice}</p>
      <header className="sticky top-0 z-40 border-b border-[#243a32]/10 bg-[#f4f0e6]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-5 px-5 sm:px-7">
          <a href="#top" className="mr-auto font-serif text-lg font-semibold tracking-[-.02em]">LightCare BioMed</a>
          <nav className="hidden items-center gap-5 text-[11px] font-semibold text-[#64766e] md:flex">{copy.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
          <Link to="/works" className="inline-flex min-h-11 items-center text-[11px] font-semibold text-[#52685f]">{copy.back}</Link>
        </div>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[74svh] max-w-[1500px] items-end overflow-hidden bg-[#1c2e27] lg:grid-cols-[.86fr_1.14fr]">
        <div className="relative z-10 order-2 p-7 text-white sm:p-10 lg:order-1 lg:p-16">
          <p className="text-[10px] font-semibold tracking-[.18em] text-[#dfc98f]">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-[12ch] font-serif text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-.045em]">{copy.title}</h1>
          <p className="mt-6 max-w-lg text-sm font-medium leading-7 text-white/68">{copy.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#content" className="inline-flex min-h-12 items-center rounded-full bg-[#dfc98f] px-6 text-xs font-bold text-[#20342b]">{copy.view}</a><Link to="/contact?case=biomed-brand-site&type=website" className="inline-flex min-h-12 items-center rounded-full border border-white/24 px-6 text-xs font-bold text-white">{copy.contact}</Link></div>
        </div>
        <div className="relative order-1 min-h-[46svh] lg:order-2 lg:h-full"><img src={images.hero} alt={`${copy.eyebrow} LightCare BioMed`} width="1680" height="945" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(28,46,39,.28))]" /></div>
      </section>

      <section id="content" className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><p className="text-[10px] font-bold tracking-[.16em] text-[#927b48]">{copy.focusLabel}</p><h2 className="mt-4 max-w-[15ch] font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.25] tracking-[-.035em]">{copy.focusTitle}</h2><p className="mt-5 max-w-md text-sm font-medium leading-7 text-[#64766e]">{copy.focusText}</p></div><div className="grid border-t border-[#243a32]/14 md:grid-cols-3">{copy.focuses.map(([title, text], index) => <article key={title} className="border-b border-[#243a32]/14 py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"><span className="text-[10px] font-semibold text-[#99845a]">0{index + 1}</span><h3 className="mt-8 font-serif text-xl font-semibold">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-[#677971]">{text}</p></article>)}</div></div>
      </section>

      <section className="bg-[#e9e3d5] px-5 py-16 sm:px-7 md:py-24">
        <div className="mx-auto max-w-7xl"><p className="text-[10px] font-bold tracking-[.16em] text-[#927b48]">{copy.editorialLabel}</p><h2 className="mt-4 font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold tracking-[-.035em]">{copy.editorialTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{copy.articles.map(([title, text], index) => <article key={title} className="group overflow-hidden bg-[#f8f5ed]"><div className="aspect-[4/3] overflow-hidden"><img src={[images.content, images.detail, images.space][index]} alt={title} width="1200" height="900" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div><div className="p-6"><p className="text-[9px] font-bold tracking-[.15em] text-[#99845a]">{copy.sample}</p><h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3><p className="mt-3 text-xs font-medium leading-6 text-[#66776f]">{text}</p></div></article>)}</div></div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-24">
        <p className="text-[10px] font-bold tracking-[.16em] text-[#927b48]">{copy.processLabel}</p><h2 className="mt-4 max-w-xl font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.25] tracking-[-.035em]">{copy.processTitle}</h2><ol className="mt-10 grid border-y border-[#243a32]/14 md:grid-cols-3">{copy.steps.map(([title, text], index) => <li key={title} className="min-h-40 border-b border-[#243a32]/14 py-6 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"><span className="text-[10px] font-semibold text-[#99845a]">0{index + 1}</span><h3 className="mt-8 text-sm font-bold">{title}</h3><p className="mt-2 text-xs font-medium leading-6 text-[#66776f]">{text}</p></li>)}</ol>
      </section>

      <section id="event" className="bg-[#243a32] px-5 py-16 text-white sm:px-7 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-[10px] font-bold tracking-[.16em] text-[#dfc98f]">{copy.eventLabel}</p><h2 className="mt-4 max-w-[16ch] font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.25] tracking-[-.035em]">{copy.eventTitle}</h2><p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/62">{copy.eventText}</p></div><div className="border border-white/14 bg-white/[.05] p-5 sm:p-7">{complete ? <div role="status"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#dfc98f] font-bold text-[#243a32]">✓</span><p className="mt-5 text-sm font-semibold leading-7 text-white/82">{copy.complete}</p><button type="button" onClick={reset} className="mt-6 min-h-11 text-xs font-semibold text-[#dfc98f] underline underline-offset-4">{copy.replay}</button></div> : <><p className="text-xs font-semibold text-white/58">{copy.choose}</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{[["online", copy.online], ["onsite", copy.onsite]].map(([value, label]) => <button key={value} type="button" aria-pressed={format === value} onClick={() => setFormat(value)} className={`min-h-12 border px-4 text-left text-sm font-semibold ${format === value ? "border-[#dfc98f] bg-[#dfc98f] text-[#243a32]" : "border-white/18 text-white"}`}>{label}</button>)}</div><button type="button" disabled={!format} onClick={() => setComplete(true)} className="mt-5 inline-flex min-h-12 w-full items-center justify-center bg-white px-6 text-sm font-bold text-[#243a32] disabled:opacity-35">{copy.finish}</button></>}</div></div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-16 sm:px-7 md:flex-row md:items-end md:justify-between md:py-24"><div><p className="text-[10px] font-bold tracking-[.16em] text-[#927b48]">QINGYU WEB</p><h2 className="mt-4 max-w-xl font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.25] tracking-[-.035em]">{copy.closing}</h2><p className="mt-4 text-sm font-medium text-[#66776f]">{copy.closingText}</p></div><Link to="/contact?case=biomed-brand-site&type=website" className="inline-flex min-h-12 shrink-0 items-center justify-between gap-8 rounded-full bg-[#243a32] px-6 text-xs font-bold text-white">{copy.closingAction}<Arrow /></Link></section>
      <footer className="border-t border-[#243a32]/12 px-5 py-6 text-[10px] font-semibold text-[#77857f] sm:px-7"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4"><span>LightCare BioMed {copy.footer}</span><Link to="/works">Qingyu Web</Link></div></footer>
    </main>
  )
}
