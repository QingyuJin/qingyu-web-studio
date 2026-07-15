import { Navigate } from "react-router-dom"
import { isAdmin } from "./auth"

function ProtectedRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
