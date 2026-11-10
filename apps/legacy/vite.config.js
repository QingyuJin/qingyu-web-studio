import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const staticDemoRoutes = {
  "/demo/morie": "/demo/morie/index.html",
  "/demo/commercial-visual": "/demo/commercial-visual/index.html",
}
const moriePage = /^\/demo\/morie\/(account|checkout|journal|products|stores|story)(?:\/[^/?]+)?$/

function serveStaticDemos() {
  const configure = (server) => {
    server.middlewares.use((request, _response, next) => {
      const [path, query = ""] = (request.url ?? "").split("?")
      const clean = path.replace(/\/$/, "")
      const file = staticDemoRoutes[clean] ?? (moriePage.test(clean) ? `${clean}.html` : path)
      request.url = `${file}${query ? `?${query}` : ""}`
      next()
    })
  }
  return {
    name: "serve-static-demos",
    configureServer: configure,
    configurePreviewServer: configure,
  }
}

export default defineConfig({
  plugins: [serveStaticDemos(), react(), tailwindcss()],
})
