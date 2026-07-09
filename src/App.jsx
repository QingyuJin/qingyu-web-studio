import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

const ProjectHub = lazy(() => import("./ProjectHub"))
const StudioHome = lazy(() => import("./StudioHome"))
const WorksPage = lazy(() => import("./site/Pages").then((module) => ({ default: module.WorksPage })))
const WorkDetailPage = lazy(() => import("./site/Pages").then((module) => ({ default: module.WorkDetailPage })))
const ServicesPage = lazy(() => import("./site/Pages").then((module) => ({ default: module.ServicesPage })))
const PricingPage = lazy(() => import("./site/Pages").then((module) => ({ default: module.PricingPage })))
const FreeAuditPage = lazy(() => import("./site/Pages").then((module) => ({ default: module.FreeAuditPage })))
const ContactPage = lazy(() => import("./site/Pages").then((module) => ({ default: module.ContactPage })))
const ProjectPlanner = lazy(() => import("./site/ProjectPlanner"))
const AiTransformation = lazy(() => import("./site/AiTransformation"))
const ProductPage = lazy(() => import("./site/ProductPage"))
const WebsiteRescue = lazy(() => import("./site/WebsiteRescue"))
const LineBotMission = lazy(() => import("./site/LineBotMission"))
const RestaurantOrdering = lazy(() => import("./RestaurantOrdering"))
const WholesaleOrdering = lazy(() => import("./WholesaleOrdering"))
const BiomedBrandSite = lazy(() => import("./BiomedBrandSite"))
const RagConsultant = lazy(() => import("./RagConsultant"))
const NotionBrandLanding = lazy(() => import("./NotionBrandLanding"))
const LoginPage = lazy(() => import("./LoginPage"))
const AdminDashboard = lazy(() => import("./AdminDashboard"))
const BuildFlow = lazy(() => import("./buildflow/BuildFlow"))
const ContractorSite = lazy(() => import("./ContractorSite"))

function PageFallback() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-slate-500">
      <p className="text-sm font-bold">Loading...</p>
    </main>
  )
}

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<StudioHome />} />
        <Route path="/works" element={<ProjectHub />} />
        <Route path="/works/restaurant-ordering" element={<RestaurantOrdering />} />
        <Route path="/works/wholesale-ordering" element={<WholesaleOrdering />} />
        <Route path="/works/biomed-brand-site" element={<BiomedBrandSite />} />
        <Route path="/works/rag-consultant" element={<RagConsultant />} />
        <Route path="/works/notion-brand-landing" element={<NotionBrandLanding />} />
        <Route path="/works/company-landing" element={<ProductPage slug="company-landing" />} />
        <Route path="/works/ecommerce-ordering" element={<ProductPage slug="ecommerce-ordering" />} />
        <Route path="/works/assessment-system" element={<ProductPage slug="assessment-system" />} />
        <Route path="/works/line-bot" element={<ProductPage slug="line-bot" />} />
        <Route path="/works/crm-admin" element={<ProductPage slug="crm-admin" />} />
        <Route path="/works/contractor-system" element={<ProductPage slug="contractor-system" />} />
        <Route path="/works/:slug" element={<WorkDetailPage />} />
        <Route path="/lab" element={<WorksPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/ai-transformation" element={<AiTransformation />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/free-audit" element={<FreeAuditPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tools/project-planner" element={<ProjectPlanner />} />
        <Route path="/tools/website-rescue" element={<WebsiteRescue />} />
        <Route path="/tools/linebot-mission" element={<LineBotMission />} />
        <Route path="/restaurant-ordering" element={<RestaurantOrdering />} />
        <Route path="/wholesale-ordering" element={<WholesaleOrdering />} />
        <Route path="/biomed-brand-site" element={<BiomedBrandSite />} />
        <Route path="/rag-consultant" element={<RagConsultant />} />
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

        <Route path="/buildflow" element={<BuildFlow />} />
        <Route path="/coachflow" element={<Navigate to="/works" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
