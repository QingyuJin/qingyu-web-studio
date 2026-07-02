"""
qingyuweb.com 後端範例（Python + FastAPI）

跟 example-token-endpoint.js 做一樣的事，只是換成 Python，
如果 qingyuweb.com 的後端本來就是 Python 就直接照抄邏輯即可。

使用方式：
  export RAG_ENGINE_URL=https://api.your-domain.com
  export RAG_ENGINE_API_KEY=qyk_xxx...
  uvicorn example_token_endpoint:app --port 3000
"""
import os

import httpx
from fastapi import FastAPI, HTTPException

app = FastAPI()

RAG_ENGINE_URL = os.environ.get("RAG_ENGINE_URL", "http://localhost:8000")
RAG_ENGINE_API_KEY = os.environ.get("RAG_ENGINE_API_KEY")


@app.post("/api/widget-token")
async def get_widget_token():
    # 正式環境這裡通常還會先驗證使用者的 session / cookie，
    # 確認呼叫者真的有權限使用這個方塊，再決定要換哪個 tenant 的 token。
    if not RAG_ENGINE_API_KEY:
        raise HTTPException(500, "尚未設定 RAG_ENGINE_API_KEY")

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{RAG_ENGINE_URL}/auth/widget-token",
            headers={"Authorization": f"Bearer {RAG_ENGINE_API_KEY}"},
        )

    if resp.status_code != 200:
        raise HTTPException(502, "無法向 RAG Engine 取得 token")

    return resp.json()  # {token, expires_in_seconds}
