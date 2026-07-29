import { Route, Routes } from "react-router-dom"
import BeautyShoplinePreview from "./beauty-shopline/BeautyShoplinePreview"

function App() {
  return (
    <Routes>
      <Route path="/*" element={<BeautyShoplinePreview />} />
    </Routes>
  )
}

export default App
