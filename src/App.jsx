import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

const ProjectHub = lazy(() => import("./ProjectHub"))
const StudioHome = lazy(() => import("./StudioHome"))
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
