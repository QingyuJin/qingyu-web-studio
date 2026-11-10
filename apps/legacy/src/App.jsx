import { Suspense, lazy, useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { LocaleProvider, useLocale } from "./i18n/LocaleContext"
import LocaleSwitcher from "./i18n/LocaleSwitcher"
import { ENABLE_MULTILINGUAL } from "./site/features"
const ExperiencePolish = lazy(() => import("./ExperiencePolish"))
const DemoExperience = lazy(() => import("./site/DemoExperience").then((module) => ({ default: module.DemoExperience })))

function LegacyPolish() {
  const { pathname } = useLocation()
  // Studio pages own their localized content and images; avoid observing their DOM.
  if (/^\/(?:$|works(?:\/|$)|services$|about$|contact$|engineering$)/.test(pathname)) return null
  return <Suspense fallback={null}><ExperiencePolish /></Suspense>
}

const StudioHome = lazy(() => import("./StudioHome"))
const ProjectHub = lazy(() => import("./ProjectHub"))
const ServicesPage = lazy(() => import("./site/ServicesPage"))
const PricingPage = lazy(() => import("./site/PricingPage"))
const ContactPage = lazy(() => import("./site/ContactPage"))
const MissionSystemDemo = lazy(() => import("./site/MissionSystemDemos"))
const OnePageHub = lazy(() => import("./onepage/OnePageHub"))
const BeautyTemplate = lazy(() => import("./onepage/BeautyClinicTemplates").then((module) => ({ default: module.BeautyTemplate })))
const ClinicTemplate = lazy(() => import("./onepage/BeautyClinicTemplates").then((module) => ({ default: module.ClinicTemplate })))
const ConstructionTemplate = lazy(() => import("./onepage/RestaurantConstructionTemplates").then((module) => ({ default: module.ConstructionTemplate })))
const RestaurantTemplate = lazy(() => import("./onepage/RestaurantConstructionTemplates").then((module) => ({ default: module.RestaurantTemplate })))
const ManufacturingTemplate = lazy(() => import("./onepage/ManufacturingSaasTemplates").then((module) => ({ default: module.ManufacturingTemplate })))
const SaasTemplate = lazy(() => import("./onepage/ManufacturingSaasTemplates").then((module) => ({ default: module.SaasTemplate })))

const WorksPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.WorksPage }))
)
const FreeAuditPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.FreeAuditPage }))
)
const AboutPage = lazy(() => import("./site/StudioAbout"))
const CollaborationPage = lazy(() => import("./site/StudioPages").then((module) => ({ default: module.CollaborationPage })))
const ProjectPlanner = lazy(() => import("./site/ProjectPlanner"))
const AiTransformation = lazy(() => import("./site/AiTransformation"))
const GrowthPage = lazy(() => import("./site/GrowthPage"))
const WebsiteRescue = lazy(() => import("./site/WebsiteRescue"))
const LineBotMission = lazy(() => import("./site/LineBotMission"))
const BiomedBrandSite = lazy(() => import("./BiomedBrandSite"))
const ContractorSite = lazy(() => import("./ContractorSite"))
const BeautyShoplinePreview = lazy(() => import("./beauty-shopline/BeautyShoplinePreview"))
const WorkDetailPageXinjiang = lazy(() => import("./site/WorkDetailPageXinjiang"))
const WorkCasePage = lazy(() => import("./site/WorkCasePage"))
const NotFoundPage = lazy(() => import("./site/NotFoundPage"))

function PageFallback() {
  const { locale } = useLocale()
  const label = { "zh-Hant": "頁面載入中", en: "Loading page", ja: "読み込み中", ko: "페이지 로딩 중" }[locale]
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#14211f]" aria-label={label}>
      <header className="h-16 border-b border-[#162321]/10 bg-[#f7f5f0]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3"><span className="h-px w-6 bg-[#9b8e69]" /><span className="text-xs font-semibold">{locale === "zh-Hant" ? "晴宇" : "Qingyu Web"}</span></div>
        </div>
      </header>
      <p className="mx-auto max-w-7xl px-5 py-10 text-sm font-medium text-[#65716d] sm:px-7 lg:px-9">{label}</p>
    </main>
  )
}

function XinjiangFallback() {
  return (
    <main className="min-h-screen bg-[#11100e] px-5 pt-28 text-[#f3e2c2]" aria-label="鑫匠網站載入中" data-preserve-text>
      <p className="font-['LXGW_WenKai_TC',serif] text-5xl font-bold text-[#ffd45a]">鑫匠</p>
      <p className="mt-5 font-['LXGW_WenKai_TC',serif] text-xl font-bold tracking-[.12em]">瓦刀執手砌日月 匠心巧思鑄千秋</p>
    </main>
  )
}

function GlobalControls() {
  const location = useLocation()
  useEffect(() => {
    // Keep independent showcase fonts off the studio's critical rendering path.
    if (!/^\/(demo|onepage|showcase|contractor-site)/.test(location.pathname)) return
    if (document.getElementById("qy-demo-fonts")) return
    const link = document.createElement("link")
    link.id = "qy-demo-fonts"
    link.rel = "stylesheet"
    link.href = "https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@400;700&family=Noto+Sans+TC:wght@400;500;600;700&family=Noto+Serif+TC:wght@400;500;600;700&display=swap"
    document.head.appendChild(link)
  }, [location.pathname])
  if (location.pathname === "/works/xinjiang" || location.pathname.startsWith("/demo/xinjiang")) return null
  return ENABLE_MULTILINGUAL ? <LocaleSwitcher /> : null
}

function LegacyBeautyRedirect() {
  return <Navigate to="/demo/luluface" replace />
}

function App() {
  return (
    <LocaleProvider>
      <LegacyPolish />
      <GlobalControls />
      <Suspense fallback={<PageFallback />}>
        <Routes>
        <Route path="/" element={<StudioHome />} />
        <Route path="/works/docops" element={<WorkCasePage slug="docops" />} />
        <Route path="/works/flowdesk" element={<WorkCasePage slug="flowdesk" />} />
        <Route path="/onepage" element={<Navigate to="/showcase" replace />} />
        <Route path="/showcase" element={<OnePageHub />} />
        <Route path="/onepage/beauty" element={<BeautyTemplate />} />
        <Route path="/onepage/clinic" element={<ClinicTemplate />} />
        <Route path="/onepage/restaurant" element={<RestaurantTemplate />} />
        <Route path="/onepage/construction" element={<ConstructionTemplate />} />
        <Route path="/onepage/manufacturing" element={<ManufacturingTemplate />} />
        <Route path="/onepage/saas" element={<SaasTemplate />} />
        <Route path="/demo/wholesale-ordering/*" element={<DemoExperience slug="wholesale-ordering"><MissionSystemDemo slug="wholesale-ordering" /></DemoExperience>} />
        <Route path="/demo/restaurant-ordering/*" element={<DemoExperience slug="restaurant-ordering"><MissionSystemDemo slug="restaurant-ordering" /></DemoExperience>} />
        <Route path="/demo/rag-consultant/*" element={<DemoExperience slug="rag-consultant"><MissionSystemDemo slug="rag-consultant" /></DemoExperience>} />
        <Route path="/demo/buildflow/*" element={<DemoExperience slug="buildflow"><MissionSystemDemo slug="buildflow" /></DemoExperience>} />
        <Route path="/demo/xinjiang/*" element={<Suspense fallback={<XinjiangFallback />}><WorkDetailPageXinjiang /></Suspense>} />
        <Route path="/demo/biomed-brand-site" element={<BiomedBrandSite />} />
        <Route path="/demo/linebot/*" element={<DemoExperience slug="linebot"><MissionSystemDemo slug="linebot" /></DemoExperience>} />
        <Route path="/demo/analytics-dashboard/*" element={<DemoExperience slug="analytics-dashboard"><MissionSystemDemo slug="analytics-dashboard" /></DemoExperience>} />
        <Route path="/demo/commerce-platform/*" element={<Navigate to="/demo/morie" replace />} />
        <Route path="/demo/ai-audit/*" element={<DemoExperience slug="ai-audit"><MissionSystemDemo slug="ai-audit" /></DemoExperience>} />
        <Route path="/demo/api-automation/*" element={<DemoExperience slug="api-automation"><MissionSystemDemo slug="api-automation" /></DemoExperience>} />
        <Route path="/demo/ai-customer-support/*" element={<DemoExperience slug="ai-tech"><MissionSystemDemo slug="ai-tech" /></DemoExperience>} />
        <Route path="/demo/luluface" element={<DemoExperience slug="luluface"><BeautyShoplinePreview /></DemoExperience>} />
        <Route path="/demo/luluface/*" element={<Navigate to="/demo/luluface" replace />} />
        <Route path="/works" element={<ProjectHub />} />
        <Route path="/works/floworder" element={<WorkCasePage slug="floworder" />} />
        <Route path="/works/bookcrm" element={<WorkCasePage slug="bookcrm" />} />
        <Route path="/works/quoteflow" element={<WorkCasePage slug="quoteflow" />} />
        <Route path="/works/fieldops" element={<WorkCasePage slug="fieldops" />} />
        <Route path="/works/watchtower" element={<WorkCasePage slug="watchtower" />} />
        <Route path="/works/restaurant-ordering" element={<WorkCasePage slug="restaurant-ordering" />} />
        <Route path="/works/biomed-brand-site" element={<WorkCasePage slug="biomed-brand-site" />} />
        <Route path="/works/notion-brand-landing" element={<Navigate to="/showcase" replace />} />
        <Route path="/works/product-landing-page" element={<Navigate to="/showcase" replace />} />
        <Route path="/works/company-landing" element={<Navigate to="/showcase" replace />} />
        <Route path="/works/ecommerce-ordering" element={<Navigate to="/works/floworder" replace />} />
        <Route path="/works/assessment-system" element={<Navigate to="/works/ai-audit" replace />} />
        <Route path="/works/line-bot" element={<WorkCasePage slug="linebot" />} />
        <Route path="/works/crm-admin" element={<Navigate to="/works/bookcrm" replace />} />
        <Route path="/works/contractor-system" element={<Navigate to="/works/fieldops" replace />} />
        <Route path="/works/xinjiang" element={<WorkCasePage slug="xinjiang" />} />
        <Route path="/works/wholesale-ordering" element={<WorkCasePage slug="wholesale-ordering" />} />
        <Route path="/works/rag-consultant" element={<WorkCasePage slug="rag-consultant" />} />
        <Route path="/works/analytics-dashboard" element={<WorkCasePage slug="analytics-dashboard" />} />
        <Route path="/works/ecommerce-platform-redesign" element={<WorkCasePage slug="commerce-platform" />} />
        <Route path="/works/beauty-shopline-preview/*" element={<LegacyBeautyRedirect />} />
        <Route path="/works/:slug" element={<WorkCasePage />} />
        <Route path="/lab" element={<WorksPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/ai-transformation" element={<AiTransformation />} />
        <Route path="/seo-ads" element={<GrowthPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/free-audit" element={<FreeAuditPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
        <Route path="/tools/project-planner" element={<ProjectPlanner />} />
        <Route path="/tools/website-rescue" element={<WebsiteRescue />} />
        <Route path="/tools/linebot-mission" element={<LineBotMission />} />
        <Route path="/restaurant-ordering" element={<Navigate to="/demo/restaurant-ordering" replace />} />
        <Route path="/wholesale-ordering" element={<Navigate to="/demo/wholesale-ordering" replace />} />
        <Route path="/biomed-brand-site" element={<Navigate to="/works/biomed-brand-site" replace />} />
        <Route path="/rag-consultant" element={<Navigate to="/demo/rag-consultant" replace />} />
        <Route path="/engineering" element={<ProjectHub />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />

        <Route path="/contractor-site" element={<ContractorSite />} />

        <Route path="/buildflow" element={<Navigate to="/demo/buildflow" replace />} />
        <Route path="/coachflow" element={<Navigate to="/works" replace />} />

        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </LocaleProvider>
  )
}

export default App
