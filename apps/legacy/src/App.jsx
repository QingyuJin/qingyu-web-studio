import { Suspense, lazy } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import ExperiencePolish from "./ExperiencePolish"
import { LocaleProvider } from "./i18n/LocaleContext"
import LocaleSwitcher from "./i18n/LocaleSwitcher"
import ProtectedRoute from "./ProtectedRoute"
import { ENABLE_MULTILINGUAL } from "./site/features"

const ProjectHub = lazy(() => import("./ProjectHub"))
const StudioHome = lazy(() => import("./StudioHome"))
const WorksPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.WorksPage }))
)
const WorkDetailPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.WorkDetailPage }))
)
const ServicesPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.ServicesPage }))
)
const PricingPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.PricingPage }))
)
const FreeAuditPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.FreeAuditPage }))
)
const ContactPage = lazy(() =>
  import("./site/Pages").then((module) => ({ default: module.ContactPage }))
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
const WorkDetailPageXinjiang = lazy(() => import("./site/WorkDetailPageXinjiang"))
const WorkDetailPageWholesale = lazy(() => import("./site/WorkDetailPageWholesale"))
const WorkDetailPageRag = lazy(() => import("./site/WorkDetailPageRag"))
const WorkDetailPageAnalytics = lazy(() => import("./site/WorkDetailPageAnalytics"))
const BeautyShoplinePreview = lazy(() => import("./beauty-shopline/BeautyShoplinePreview"))
const DemoExperience = lazy(() =>
  import("./site/DemoExperience").then((module) => ({ default: module.DemoExperience }))
)
const MissionSystemDemo = lazy(() => import("./site/MissionSystemDemos"))
const OnePageHub = lazy(() => import("./onepage/OnePageHub"))
const BeautyTemplate = lazy(() =>
  import("./onepage/BeautyClinicTemplates").then((module) => ({ default: module.BeautyTemplate }))
)
const ClinicTemplate = lazy(() =>
  import("./onepage/BeautyClinicTemplates").then((module) => ({ default: module.ClinicTemplate }))
)
const RestaurantTemplate = lazy(() =>
  import("./onepage/RestaurantConstructionTemplates").then((module) => ({ default: module.RestaurantTemplate }))
)
const ConstructionTemplate = lazy(() =>
  import("./onepage/RestaurantConstructionTemplates").then((module) => ({ default: module.ConstructionTemplate }))
)
const ManufacturingTemplate = lazy(() =>
  import("./onepage/ManufacturingSaasTemplates").then((module) => ({ default: module.ManufacturingTemplate }))
)
const SaasTemplate = lazy(() =>
  import("./onepage/ManufacturingSaasTemplates").then((module) => ({ default: module.SaasTemplate }))
)

function PageFallback() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#14211f]" aria-label="頁面載入中">
      <header className="h-16 border-b border-[#162321]/10 bg-[#f7f5f0]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3"><span className="h-px w-6 bg-[#9b8e69]" /><span className="text-xs font-semibold">晴宇 Qingyu Web</span></div>
          <span className="h-9 w-24 animate-pulse rounded-full bg-[#dfe4de]" />
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-9">
        <div className="h-3 w-28 animate-pulse rounded bg-[#d9ded8]" />
        <div className="mt-6 h-12 max-w-2xl animate-pulse rounded bg-[#d9ded8]" />
        <div className="mt-4 h-5 max-w-xl animate-pulse rounded bg-[#e3e6e1]" />
        <div className="mt-10 grid gap-4 md:grid-cols-2"><div className="aspect-[16/9] animate-pulse rounded-2xl bg-[#e0e4de]" /><div className="aspect-[16/9] animate-pulse rounded-2xl bg-[#e6e8e3]" /></div>
      </div>
    </main>
  )
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
      {ENABLE_MULTILINGUAL ? <LocaleSwitcher /> : null}
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
        <Route path="/demo/xinjiang/*" element={<DemoExperience slug="xinjiang"><ContractorSite /></DemoExperience>} />
        <Route path="/demo/linebot/*" element={<DemoExperience slug="linebot"><MissionSystemDemo slug="linebot" /></DemoExperience>} />
        <Route path="/demo/analytics-dashboard/*" element={<DemoExperience slug="analytics-dashboard"><MissionSystemDemo slug="analytics-dashboard" /></DemoExperience>} />
        <Route path="/demo/commerce-platform/*" element={<DemoExperience slug="commerce-platform"><MissionSystemDemo slug="commerce-platform" /></DemoExperience>} />
        <Route path="/demo/ai-audit/*" element={<DemoExperience slug="ai-audit"><MissionSystemDemo slug="ai-audit" /></DemoExperience>} />
        <Route path="/demo/api-automation/*" element={<DemoExperience slug="api-automation"><MissionSystemDemo slug="api-automation" /></DemoExperience>} />
        <Route path="/demo/ai-customer-support/*" element={<DemoExperience slug="ai-tech"><MissionSystemDemo slug="ai-tech" /></DemoExperience>} />
        <Route path="/demo/luluface/*" element={<DemoExperience slug="luluface"><BeautyShoplinePreview /></DemoExperience>} />
        <Route path="/works" element={<ProjectHub />} />
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
        <Route path="/works/line-bot" element={<ProductPage slug="line-bot" />} />
        <Route path="/works/crm-admin" element={<ProductPage slug="crm-admin" />} />
        <Route path="/works/contractor-system" element={<ProductPage slug="contractor-system" />} />
        <Route path="/works/xinjiang" element={<WorkDetailPageXinjiang />} />
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
