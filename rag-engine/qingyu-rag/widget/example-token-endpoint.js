/**
 * qingyuweb.com 後端範例（Node.js + Express）
 *
 * 這段程式碼跑在 qingyuweb.com 自己的伺服器上，不是 RAG Engine 的一部分。
 * 目的：長期有效的 API Key 只存在這裡（環境變數），絕不送到瀏覽器；
 *       瀏覽器只拿得到短期、範圍受限的 widget JWT。
 *
 * 使用方式：
 *   RAG_ENGINE_URL=https://api.your-domain.com \
 *   RAG_ENGINE_API_KEY=qyk_xxx... \
 *   node example-token-endpoint.js
 */
const express = require("express");
const app = express();

const RAG_ENGINE_URL = process.env.RAG_ENGINE_URL || "http://localhost:8000";
const RAG_ENGINE_API_KEY = process.env.RAG_ENGINE_API_KEY;

if (!RAG_ENGINE_API_KEY) {
  console.warn("警告：尚未設定 RAG_ENGINE_API_KEY，/api/widget-token 會失敗");
}

app.post("/api/widget-token", async (req, res) => {
  // 這裡通常還會先驗證 req 裡的使用者 session / cookie，
  // 確認「這個瀏覽器真的屬於某個已登入、有權限使用這個方塊的使用者」，
  // 再決定要幫哪個 tenant_id 換 token（tenant_id 已經綁定在 API Key 上了）。

  try {
    const resp = await fetch(`${RAG_ENGINE_URL}/auth/widget-token`, {
      method: "POST",
      headers: { Authorization: `Bearer ${RAG_ENGINE_API_KEY}` },
    });

    if (!resp.ok) {
      return res.status(502).json({ error: "無法向 RAG Engine 取得 token" });
    }

    const data = await resp.json();
    res.json(data); // { token, expires_in_seconds }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "內部錯誤" });
  }
});

app.listen(3000, () => console.log("qingyuweb.com 範例後端跑在 http://localhost:3000"));
