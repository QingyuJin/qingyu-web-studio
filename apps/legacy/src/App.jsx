import { Suspense, lazy } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import ExperiencePolish from "./ExperiencePolish"
import { LocaleProvider } from "./i18n/LocaleContext"
import LocaleSwitcher from "./i18n/LocaleSwitcher"
import ProtectedRoute from "./ProtectedRoute"
import { ENABLE_MULTILINGUAL } from "./site/features"
import ProjectHub from "./ProjectHub"
import StudioHome from "./StudioHome"
import ServicesPage from "./site/ServicesPage"
import PricingPage from "./site/PricingPage"
import ContactPage from "./site/ContactPage"
import WorkDetailPageWholesale from "./site/WorkDetailPageWholesale"
import WorkDetailPageRag from "./site/WorkDetailPageRag"
import WorkDetailPageLinebot from "./site/WorkDetailPageLinebot"
import { DemoExperience } from "./site/DemoExperience"
import MissionSystemDemo from "./site/MissionSystemDemos"
import OnePageHub from "./onepage/OnePageHub"
import { BeautyTemplate, ClinicTemplate } from "./onepage/BeautyClinicTemplates"
import { ConstructionTemplate, RestaurantTemplate } from "./onepage/RestaurantConstructionTemplates"
import { ManufacturingTemplate, SaasTemplate } from "./onepage/ManufacturingSaasTemplates"

const WorksPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.WorksPage }))
)
const WorkDetailPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.WorkDetailPage }))
)
const FreeAuditPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.FreeAuditPage }))
)
const AboutPage = lazy(() => import("./site/StudioPages").then((module) => ({ default: module.AboutPage })))
const CollaborationPage = lazy(() => import("./site/StudioPages").then((module) => ({ default: module.CollaborationPage })))
const ProjectPlanner = lazy(() => import("./site/ProjectPlanner"))
const AiTransformation = lazy(() => import("./site/AiTransformation"))
const GrowthPage = lazy(() => import("./site/GrowthPage"))
const ProductPage = lazy(() => import("./site/ProductPage"))
const ProductLandingPage = lazy(() => import("./site/ProductLandingPage"))
const WebsiteRescue = lazy(() => import("./site/WebsiteRescue"))
const LineBotMission = lazy(() => import("./site/LineBotMission"))
const RestaurantOrdering = lazy(() => import("./RestaurantOrdering"))
const BiomedBrandSite = lazy(() => import("./BiomedBrandSite"))
const NotionBrandLanding = lazy(() => import("./NotionBrandLanding"))
const LoginPage = lazy(() => import("./LoginPage"))
const AdminDashboard = lazy(() => import("./AdminDashboard"))
const ContractorSite = lazy(() => import("./ContractorSite"))
const WorkDetailPageAnalytics = lazy(() => import("./site/WorkDetailPageAnalytics"))
const BeautyShoplinePreview = lazy(() => import("./beauty-shopline/BeautyShoplinePreview"))
const WorkDetailPageXinjiang = lazy(() => import("./site/WorkDetailPageXinjiang"))
const FlowOrderWorkPage = lazy(() => import("./site/FlowOrderWorkPage"))

function PageFallback() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#14211f]" aria-label="頁面載入中">
      <header className="h-16 border-b border-[#162321]/10 bg-[#f7f5f0]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3"><span className="h-px w-6 bg-[#9b8e69]" /><span className="text-xs font-semibold">晴宇 Qingyu Web</span></div>
        </div>
      </header>
      <p className="mx-auto max-w-7xl px-5 py-10 text-sm font-medium text-[#65716d] sm:px-7 lg:px-9">頁面載入中</p>
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
  if (location.pathname === "/works/xinjiang" || location.pathname.startsWith("/demo/xinjiang")) return null
  return ENABLE_MULTILINGUAL ? <LocaleSwitcher /> : null
}

function LegacyBeautyRedirect() {
  const location = useLocation()
  const suffix = location.pathname.replace(/^\/works\/beauty-shopline-preview/, "")
  return <Navigate to={`/demo/luluface${suffix}${location.search}${location.hash}`} replace />
}

function App() {
  return (
    <LocaleProvider>
      <ExperiencePolish />
      <GlobalControls />
      <Suspense fallback={<PageFallback />}>
        <Routes>
        <Route path="/" element={<StudioHome />} />
        <Route path="/onepage" element={<OnePageHub />} />
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
        <Route path="/demo/xinjiang/*" element={<Navigate to="/works/xinjiang" replace />} />
        <Route path="/demo/linebot/*" element={<DemoExperience slug="linebot"><MissionSystemDemo slug="linebot" /></DemoExperience>} />
        <Route path="/demo/analytics-dashboard/*" element={<DemoExperience slug="analytics-dashboard"><MissionSystemDemo slug="analytics-dashboard" /></DemoExperience>} />
        <Route path="/demo/commerce-platform/*" element={<DemoExperience slug="commerce-platform"><MissionSystemDemo slug="commerce-platform" /></DemoExperience>} />
        <Route path="/demo/ai-audit/*" element={<DemoExperience slug="ai-audit"><MissionSystemDemo slug="ai-audit" /></DemoExperience>} />
        <Route path="/demo/api-automation/*" element={<DemoExperience slug="api-automation"><MissionSystemDemo slug="api-automation" /></DemoExperience>} />
        <Route path="/demo/ai-customer-support/*" element={<DemoExperience slug="ai-tech"><MissionSystemDemo slug="ai-tech" /></DemoExperience>} />
        <Route path="/demo/luluface/*" element={<DemoExperience slug="luluface"><BeautyShoplinePreview /></DemoExperience>} />
        <Route path="/works" element={<ProjectHub />} />
        <Route path="/works/floworder" element={<FlowOrderWorkPage />} />
        <Route path="/works/restaurant-ordering" element={<RestaurantOrdering />} />
        <Route path="/works/biomed-brand-site" element={<BiomedBrandSite />} />
        <Route path="/works/notion-brand-landing" element={<NotionBrandLanding />} />
        <Route path="/works/product-landing-page" element={<ProductLandingPage />} />
        <Route path="/works/company-landing" element={<ProductPage slug="company-landing" />} />
        <Route
          path="/works/ecommerce-ordering"
          element={<ProductPage slug="ecommerce-ordering" />}
        />
        <Route path="/works/assessment-system" element={<ProductPage slug="assessment-system" />} />
        <Route path="/works/line-bot" element={<WorkDetailPageLinebot />} />
        <Route path="/works/crm-admin" element={<ProductPage slug="crm-admin" />} />
        <Route path="/works/contractor-system" element={<ProductPage slug="contractor-system" />} />
        <Route path="/works/xinjiang" element={<Suspense fallback={<XinjiangFallback />}><WorkDetailPageXinjiang /></Suspense>} />
        <Route path="/works/wholesale-ordering" element={<WorkDetailPageWholesale />} />
        <Route path="/works/rag-consultant" element={<WorkDetailPageRag />} />
        <Route path="/works/analytics-dashboard" element={<WorkDetailPageAnalytics />} />
        <Route path="/works/beauty-shopline-preview/*" element={<LegacyBeautyRedirect />} />
        <Route path="/works/:slug" element={<WorkDetailPage />} />
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
        <Route path="/biomed-brand-site" element={<BiomedBrandSite />} />
        <Route path="/rag-consultant" element={<Navigate to="/demo/rag-consultant" replace />} />
        <Route path="/engineering" element={<ProjectHub />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/contractor-site" element={<ContractorSite />} />

        <Route path="/buildflow" element={<Navigate to="/demo/buildflow" replace />} />
        <Route path="/coachflow" element={<Navigate to="/works" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </LocaleProvider>
  )
}

export default App
