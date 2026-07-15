import { useEffect, useState } from "react"

import { SESSION_KEY, loadInitialSession } from "../auth/session"

function useBuildFlowAuth() {
  const [session, setSession] = useState(loadInitialSession)

  useEffect(() => {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else localStorage.removeItem(SESSION_KEY)
  }, [session])

  return { session, setSession }
}

export default useBuildFlowAuth
