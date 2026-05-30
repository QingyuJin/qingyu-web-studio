import { useEffect, useState } from "react"

import { STORAGE_KEY } from "../data/demoData"
import { cloneDemoData, loadInitialData } from "../utils/helpers"

function useBuildFlowData() {
  const [data, setData] = useState(loadInitialData)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  function resetData() {
    localStorage.removeItem(STORAGE_KEY)
    setData(cloneDemoData())
  }

  return { data, resetData, setData }
}

export default useBuildFlowData
