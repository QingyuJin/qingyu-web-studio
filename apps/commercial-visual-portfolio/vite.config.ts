import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/demo/commercial-visual/",
  plugins: [react()],
  build: {
    sourcemap: false,
  },
})
