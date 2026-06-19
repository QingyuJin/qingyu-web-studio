import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

const ProjectHub = lazy(() => import("./ProjectHub"))
const StudioHome = lazy(() => import("./StudioHome"))
const WorksPage = lazy(() => import("./site/pages/WorksPage"))
const XinjiangCasePage = lazy(() => import("./site/pages/XinjiangCasePage"))
const ServicesPage = lazy(() => import("./site/pages/ServicesPage"))
const ConstructionWebsitePage = lazy(() => import("./site/pages/ConstructionWebsitePage"))
const PricingPage = lazy(() => import("./site/pages/PricingPage"))
const FreeAuditPage = lazy(() => import("./site/pages/FreeAuditPage"))
const BlogPage = lazy(() => import("./site/pages/BlogPage"))
const ContactPage = lazy(() => import("./site/pages/ContactPage"))
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
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/xinjiang" element={<XinjiangCasePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/construction-website" element={<ConstructionWebsitePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/free-audit" element={<FreeAuditPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
