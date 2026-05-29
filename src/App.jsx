import { Navigate, Route, Routes } from "react-router-dom"
import ProjectHub from "./ProjectHub"
import LoginPage from "./LoginPage"
import AdminDashboard from "./AdminDashboard"
import ProtectedRoute from "./ProtectedRoute"
import ProjectPlaceholder from "./ProjectPlaceholder"
import BuildFlow from "./BuildFlow"


function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectHub />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contractor-site"
        element={<ProjectPlaceholder type="contractor" />}
      />

      <Route path="/buildflow" element={<BuildFlow />} />

      <Route
        path="/coachflow"
        element={<ProjectPlaceholder type="coachflow" />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App