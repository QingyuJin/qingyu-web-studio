import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorBoundary from "./site/ErrorBoundary"

const root = document.getElementById("root")

if (!root) {
  throw new Error("LULUFACE application root was not found")
}

const application = (
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, application)
} else {
  createRoot(root).render(application)
}
