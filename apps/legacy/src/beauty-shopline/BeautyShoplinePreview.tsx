import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import { DemoStep, useDemoMission } from "../site/DemoMission"
import Seo from "../site/Seo"
import { imageAssets, siteConfig } from "./beautyShoplineData"
import "./beauty-shopline-preview.css"

const COPY = {
  "zh-Hant": {
    seo: ["LULUFACE 嚕嚕臉 嘉義護膚品牌網站展示", "以清楚服務流程 品牌質感與手機預約動線呈現 LULUFACE 護膚網站設計"],
    concept: "品牌網站設計展示 影像為情境示意",
    skip: "前往主要內容",
    nav: ["護膚服務", "品牌特色", "門市資訊"],
    menu: ["選單", "關閉", "網站選單"],
    hero: ["嘉義 專業護膚", "平價消費 高端體驗", "從膚況開始 找到剛好的照護", "先理解肌膚需求 再安排清楚安心且能持續的護膚方式"],
    actions: ["查看護膚服務", "查看預約方式"],
    promises: ["先了解膚況", "流程清楚", "延續日常保養"],
    values: ["品牌方向", "溫柔有感 專業有據", [["專業護膚", "先了解膚況與生活習慣"], ["平價高端", "用清楚透明的服務降低門檻"], ["穩定安心", "重視每一次服務的一致與舒適"], ["回歸本質", "減少複雜步驟 建立能持續的方式"]]],
    services: ["護膚服務", "先理解需求 再安排服務", "三種清楚入口 讓第一次到訪也知道怎麼選", [["做臉護膚", "膚況溝通 清潔與日常保養建議"], ["問題肌管理", "依乾燥 粗糙與不穩定狀態分階段照護"], ["美容課程", "依當下需求安排合適的預約制服務"]]],
    select: ["選擇這項服務", "已選擇"],
    process: ["第一次到訪", "三步完成預約準備", [["LINE 預約", "描述目前困擾並確認時段"], ["了解膚況", "整理日常習慣與保養方式"], ["安排照護", "由門市確認適合的服務流程"]]],
    why: ["品牌特色", "讓專業變得容易理解", "重要資訊先說清楚 不用在大量文字裡找答案", [["從需求開始", "先聽懂肌膚困擾 再安排服務"], ["流程看得懂", "預約 到店與後續照護都有清楚順序"], ["手機也舒服", "重點與主要操作保持簡單易讀"]]],
    contact: ["門市資訊", "準備好再開始", "地址", "電話", "預約", "開啟地圖"],
    hours: "採預約制 請先透過 LINE 確認時段",
    footer: ["聯絡方式", "網站導覽", "LULUFACE 品牌網站設計展示"],
    feedback: ["已前往護膚服務", "服務已選擇", "預約方式已確認"],
  },
  en: {
    seo: ["LULUFACE Chiayi Skincare Website Concept", "A refined skincare website concept with clear services and a simple mobile booking path"],
    concept: "Brand website concept with illustrative imagery",
    skip: "Skip to Content",
    nav: ["Services", "Brand Approach", "Visit"],
    menu: ["Menu", "Close", "Site Menu"],
    hero: ["Chiayi Facial Care", "Attainable Care Premium Experience", "Care That Starts With Your Skin", "Understand your skin first then choose a clear comfortable routine you can continue"],
    actions: ["View Services", "View Booking"],
    promises: ["Skin First", "Clear Process", "Everyday Care"],
    values: ["Brand Approach", "Gentle Care With Clear Reasoning", [["Professional Care", "Start with skin condition and daily habits"], ["Attainable Quality", "Keep the service clear and approachable"], ["Calm Consistency", "Make every visit comfortable and reliable"], ["Back to Essentials", "Remove needless steps and build a lasting routine"]]],
    services: ["Facial Services", "Understand First Then Choose", "Three clear options help first time visitors know where to begin", [["Facial Care", "Skin review cleansing and daily care guidance"], ["Skin Management", "Step by step care for dry rough or unsettled skin"], ["Beauty Treatment", "Appointment based care matched to current needs"]]],
    select: ["Choose This Service", "Selected"],
    process: ["First Visit", "Prepare in Three Steps", [["Book on LINE", "Share your concern and confirm a time"], ["Review Your Skin", "Discuss habits and current care"], ["Plan the Visit", "The studio confirms a suitable service"]]],
    why: ["Why LULUFACE", "Make Expertise Easy to Understand", "Essential information comes first so visitors never search through long copy", [["Start With Needs", "Listen first then plan the service"], ["See Every Step", "Booking visits and follow up follow a clear order"], ["Comfortable on Mobile", "Content and primary actions stay calm and readable"]]],
    contact: ["Visit", "Start When You Are Ready", "Address", "Phone", "Booking", "Open Map"],
    hours: "Appointment only Confirm a time on LINE",
    footer: ["Contact", "Explore", "LULUFACE Brand Website Concept"],
    feedback: ["Services Opened", "Service Selected", "Booking Details Confirmed"],
  },
  ja: {
    seo: ["LULUFACE 嘉義 スキンケアサイト提案", "サービスとモバイル予約導線を明確にした上質なスキンケアサイト提案"],
    concept: "ブランドサイト提案 画像はイメージです",
    skip: "本文へ",
    nav: ["ケアメニュー", "ブランドの考え方", "店舗案内"],
    menu: ["メニュー", "閉じる", "サイトメニュー"],
    hero: ["嘉義 フェイシャルケア", "通いやすさと上質な体験", "肌を知ることから始めるケア", "肌の状態を理解してから無理なく続けられるケアを提案します"],
    actions: ["ケアメニューを見る", "予約方法を見る"],
    promises: ["肌を知る", "明確な流れ", "毎日のケアへ"],
    values: ["ブランドの考え方", "やさしく実感できる確かなケア", [["プロのケア", "肌状態と生活習慣を先に確認"], ["身近な上質さ", "明確で通いやすいサービス"], ["安心と安定", "毎回心地よく一貫した体験"], ["本質へ戻る", "不要な手順を減らし続けられる習慣へ"]]],
    services: ["ケアメニュー", "理解してから選ぶ", "初めてでも迷わない三つの入口", [["フェイシャルケア", "肌確認 クレンジング 日常ケアの提案"], ["肌コンディション管理", "乾燥や不安定な状態を段階的にケア"], ["ビューティーケア", "今の状態に合わせた予約制サービス"]]],
    select: ["このケアを選ぶ", "選択済み"],
    process: ["初めての方へ", "予約準備は三つだけ", [["LINE予約", "悩みを伝えて時間を確認"], ["肌を確認", "生活習慣と現在のケアを整理"], ["内容を決定", "店舗が適した流れを案内"]]],
    why: ["LULUFACEの特徴", "専門性をわかりやすく", "必要な情報を先に整理して長い説明から探す手間をなくします", [["悩みから始める", "まず話を聞いてから内容を決定"], ["流れが見える", "予約 来店 アフターケアを順番に案内"], ["スマホでも快適", "大切な情報と操作を読みやすく整理"]]],
    contact: ["店舗案内", "準備ができたら始める", "住所", "電話", "予約", "地図を見る"],
    hours: "完全予約制 LINEで時間をご確認ください",
    footer: ["お問い合わせ", "サイト案内", "LULUFACE ブランドサイト提案"],
    feedback: ["ケアメニューを表示しました", "ケアを選択しました", "予約方法を確認しました"],
  },
  ko: {
    seo: ["LULUFACE 자이 스킨케어 웹사이트 콘셉트", "서비스와 모바일 예약 흐름을 명확하게 정리한 프리미엄 스킨케어 웹사이트 콘셉트"],
    concept: "브랜드 웹사이트 콘셉트 이미지 예시 포함",
    skip: "본문으로 이동",
    nav: ["케어 서비스", "브랜드 방향", "매장 안내"],
    menu: ["메뉴", "닫기", "사이트 메뉴"],
    hero: ["자이 페이셜 케어", "부담 없는 가격과 프리미엄 경험", "피부를 이해하는 데서 시작하는 케어", "피부 상태를 먼저 이해한 뒤 편안하게 이어 갈 수 있는 케어를 제안합니다"],
    actions: ["케어 서비스 보기", "예약 방법 보기"],
    promises: ["피부부터 이해", "명확한 과정", "일상 케어 연결"],
    values: ["브랜드 방향", "부드러운 경험과 분명한 전문성", [["전문 케어", "피부 상태와 생활 습관을 먼저 확인"], ["접근 가능한 품질", "명확하고 부담 없는 서비스"], ["편안한 일관성", "매번 안정적이고 편안한 경험"], ["본질에 집중", "불필요한 단계를 줄이고 지속 가능한 습관"]]],
    services: ["케어 서비스", "먼저 이해하고 선택하기", "처음 방문해도 쉽게 고를 수 있는 세 가지 시작점", [["페이셜 케어", "피부 상담 클렌징 일상 케어 안내"], ["피부 컨디션 관리", "건조하고 불안정한 피부를 단계별로 관리"], ["뷰티 케어", "현재 상태에 맞춘 예약제 서비스"]]],
    select: ["이 서비스 선택", "선택 완료"],
    process: ["첫 방문", "세 단계로 예약 준비", [["LINE 예약", "고민을 전하고 시간을 확인"], ["피부 확인", "생활 습관과 현재 케어를 정리"], ["방문 준비", "매장에서 알맞은 서비스를 안내"]]],
    why: ["LULUFACE의 특징", "전문성을 쉽게 이해하도록", "중요한 정보를 먼저 보여 긴 설명에서 답을 찾을 필요가 없습니다", [["고민부터 듣기", "먼저 듣고 알맞은 서비스를 결정"], ["과정이 보이게", "예약 방문 후속 케어를 순서대로 안내"], ["모바일도 편안하게", "핵심 정보와 주요 작업을 읽기 쉽게 정리"]]],
    contact: ["매장 안내", "준비되면 시작하세요", "주소", "전화", "예약", "지도 열기"],
    hours: "예약제로 운영되며 LINE에서 시간을 확인해 주세요",
    footer: ["문의", "사이트 안내", "LULUFACE 브랜드 웹사이트 콘셉트"],
    feedback: ["케어 서비스로 이동했습니다", "서비스를 선택했습니다", "예약 방법을 확인했습니다"],
  },
}

function AssetImage({ image, eager = false, alt }) {
  return <img src={image.src} width={image.width} height={image.height} alt={alt ?? image.alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

function scrollToSection(id) {
  window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 40)
}

function useRevealAnimations() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".luluface-site [data-reveal]"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add("is-visible")
      observer.unobserve(entry.target)
    }), { threshold: 0.12, rootMargin: "0px 0px -7%" })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function BeautyShoplinePreview() {
  const { locale } = useLocale()
  const language = locale in COPY ? locale : "zh-Hant"
  const t = COPY[language]
  const location = useLocation()
  const { completeStep } = useDemoMission()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const sections = ["services", "why-luluface", "contact"]

  useRevealAnimations()

  useEffect(() => {
    const script = document.createElement("script")
    script.id = "luluface-structured-data"
    script.type = "application/ld+json"
    script.text = JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: "LULUFACE Brand Website Concept", url: new URL(location.pathname, window.location.origin).href, description: t.seo[1], image: new URL(siteConfig.seo.image, window.location.origin).href })
    document.head.appendChild(script)
    return () => script.remove()
  }, [location.pathname, t.seo])

  const address = language === "zh-Hant" ? siteConfig.contact.address : language === "ja" ? "嘉義市西区上海路235号" : language === "ko" ? "대만 자이시 시구 상하이로 235" : "No 235 Shanghai Road West District Chiayi Taiwan"
  const openServices = () => { completeStep("view-services", t.feedback[0]); scrollToSection("services") }
  const chooseService = (index) => { setSelectedService(String(index)); completeStep("choose-service", t.feedback[1]) }
  const openBooking = () => { completeStep("view-booking", t.feedback[2]); scrollToSection("contact") }

  return <main className="luluface-site lf-refined-preview" id="top" data-preserve-text>
    <Seo page={{ path: location.pathname, title: t.seo[0], description: t.seo[1], image: siteConfig.seo.image, siteName: "LULUFACE", localizedCopy: true, robots: "noindex, follow, noarchive", themeColor: siteConfig.seo.themeColor }} />
    <a className="lf-skip-link" href="#main-content">{t.skip}</a>
    <p className="lf-concept-notice">{t.concept}</p>
    <header className="lf-header">
      <a className="lf-logo" href="#top" aria-label="LULUFACE"><AssetImage image={imageAssets.logo} eager alt="LULUFACE" /></a>
      <nav className="lf-desktop-nav" aria-label={t.menu[2]}>{t.nav.map((label, index) => <a key={label} href={`#${sections[index]}`}>{label}</a>)}</nav>
      <div className="lf-header-actions"><button className="lf-header-line" type="button" onClick={openBooking}>{t.actions[1]}</button><button className="lf-menu-button" type="button" aria-expanded={mobileOpen} aria-controls="lf-mobile-menu" onClick={() => setMobileOpen((value) => !value)}><span>{mobileOpen ? t.menu[1] : t.menu[0]}</span><i aria-hidden="true" /></button></div>
    </header>
    {mobileOpen ? <div className="lf-mobile-menu" id="lf-mobile-menu"><p className="lf-eyebrow">{t.menu[2]}</p><nav aria-label={t.menu[2]}>{t.nav.map((label, index) => <a key={label} href={`#${sections[index]}`} onClick={() => setMobileOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav><div className="lf-mobile-contact"><p>{address}</p><a href={siteConfig.links.phone}>{siteConfig.contact.phoneLabel}</a></div></div> : null}

    <div id="main-content" tabIndex={-1}>
      <section className="lf-hero" aria-labelledby="lf-hero-title">
        <div className="lf-hero-copy" data-reveal><p className="lf-hero-location">{t.hero[0]}</p><p className="lf-tagline">{t.hero[1]}</p><h1 id="lf-hero-title">{t.hero[2]}</h1><p className="lf-hero-description">{t.hero[3]}</p><div className="lf-hero-actions"><DemoStep id="view-services" as="span"><button className="lf-button lf-button--dark" type="button" onClick={openServices}>{t.actions[0]}<ArrowIcon /></button></DemoStep><button className="lf-button lf-button--ghost" type="button" onClick={openBooking}>{t.actions[1]}<ArrowIcon /></button></div><div className="lf-hero-promise">{t.promises.map((item) => <span key={item}>{item}</span>)}</div></div>
        <figure className="lf-hero-visual" data-reveal><AssetImage image={imageAssets.hero} eager alt={t.hero[2]} /><figcaption><span>LULUFACE</span><p>{t.hero[1]}</p></figcaption></figure>
      </section>

      <section className="lf-values" aria-labelledby="lf-values-title"><div className="lf-values-heading" data-reveal><p className="lf-eyebrow">{t.values[0]}</p><h2 id="lf-values-title">{t.values[1]}</h2></div><div className="lf-value-grid">{t.values[2].map(([title, text], index) => <article key={title} data-reveal><div className="lf-value-meta"><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{title}</h3><div className="lf-value-text">{text}</div></article>)}</div></section>

      <section className="lf-section lf-services" id="services"><div className="lf-shell"><div className="lf-section-heading" data-reveal><p className="lf-eyebrow">{t.services[0]}</p><h2>{t.services[1]}</h2><p className="lf-section-description">{t.services[2]}</p></div><div className="lf-services-layout"><figure className="lf-services-image" data-reveal><AssetImage image={imageAssets.service} alt={t.services[1]} /><figcaption>LULUFACE FACIAL CARE</figcaption></figure><DemoStep id="choose-service" className="lf-service-list">{t.services[3].map(([title, text], index) => <article key={title} data-reveal className={selectedService === String(index) ? "is-selected" : ""}><span className="lf-service-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><div className="lf-service-text">{text}</div></div><button type="button" onClick={() => chooseService(index)}>{selectedService === String(index) ? t.select[1] : t.select[0]}<ArrowIcon /></button></article>)}</DemoStep></div><div className="lf-care-journey"><div className="lf-care-journey-heading" data-reveal><p className="lf-eyebrow">{t.process[0]}</p><h3>{t.process[1]}</h3></div><ol>{t.process[2].map(([title, text], index) => <li key={title} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h4>{title}</h4><p>{text}</p></li>)}</ol></div></div></section>

      <section className="lf-why" id="why-luluface"><figure className="lf-why-image" data-reveal><AssetImage image={imageAssets.ritual} alt={t.why[1]} /><figcaption>LULUFACE DAILY RITUAL</figcaption></figure><div className="lf-why-copy"><div className="lf-section-heading lf-section-heading--light" data-reveal><p className="lf-eyebrow">{t.why[0]}</p><h2>{t.why[1]}</h2><p className="lf-section-description">{t.why[2]}</p></div><ol>{t.why[3].map(([title, text], index) => <li key={title} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol><DemoStep id="view-booking"><button className="lf-button lf-button--light" type="button" onClick={openBooking}>{t.actions[1]}<ArrowIcon /></button></DemoStep></div></section>

      <section className="lf-section lf-contact" id="contact"><div className="lf-shell lf-contact-layout"><div className="lf-contact-copy" data-reveal><p className="lf-eyebrow">{t.contact[0]}</p><h2>{t.contact[1]}</h2><dl><div><dt>{t.contact[2]}</dt><dd>{address}</dd></div><div><dt>{t.contact[3]}</dt><dd><a href={siteConfig.links.phone}>{siteConfig.contact.phoneLabel}</a></dd></div><div><dt>{t.contact[4]}</dt><dd>{t.hours}</dd></div></dl><div className="lf-contact-actions"><a className="lf-button lf-button--dark" href={siteConfig.links.line} target="_blank" rel="noreferrer">LINE<ArrowIcon /></a><a className="lf-button lf-button--ghost" href={siteConfig.links.map} target="_blank" rel="noreferrer">{t.contact[5]}<ArrowIcon /></a></div></div><figure className="lf-contact-image" data-reveal><AssetImage image={imageAssets.studio} alt={t.contact[1]} /><figcaption>{t.concept}</figcaption></figure></div></section>
    </div>

    <footer className="lf-footer"><div className="lf-footer-main"><div><a className="lf-logo lf-logo--footer" href="#top"><AssetImage image={imageAssets.logo} alt="LULUFACE" /></a><p>{t.hero[1]}</p></div><div><p className="lf-footer-title">{t.footer[0]}</p><a href={siteConfig.links.phone}>{siteConfig.contact.phoneLabel}</a><a href={siteConfig.links.line} target="_blank" rel="noreferrer">LINE</a><span>{address}</span></div><div><p className="lf-footer-title">{t.footer[1]}</p>{t.nav.map((label, index) => <a key={label} href={`#${sections[index]}`}>{label}</a>)}</div></div><div className="lf-footer-bottom"><p>{t.footer[2]}</p></div></footer>
  </main>
}
