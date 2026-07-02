# Qingyu RAG Engine

企業文件知識庫問答系統的核心 pipeline，涵蓋六個模組：

1. **ingestion** — 文件上傳（支援 txt/pdf/docx）
2. **chunking** — 文件切片（遞迴切分 + overlap）
3. **embedding** — 向量化（可插拔，內建本地離線版，附雲端 API 範例）
4. **retrieval** — 語意搜尋（cosine similarity，支援多租戶隔離）
5. **generation** — AI 問答 + 引用來源標註
6. **metrics** — token、延遲與用量費用紀錄（每個階段自動記錄，可查彙總與帳務估算）
7. **auth** — API Key（伺服器對伺服器）+ 短期 Widget JWT（瀏覽器端）+ 租戶 rate limiting
8. **documents** — 文件版本管理（新版本上傳、版本列表、還原舊版本）
9. **widget** — 可嵌入 qingyuweb.com 方塊的聊天 widget（原生 Web Component，無需打包工具）

## 嵌入式 Widget（放進 qingyuweb.com 方塊）

`widget/` 資料夾是給前端用的，跟後端專案完全獨立，不需要打包工具：

```html
<script src="qingyu-widget.js"></script>
<qingyu-chat-widget
  api-base="https://api.your-domain.com"
  token-endpoint="https://qingyuweb.com/api/widget-token"
  title="客服小幫手"
  theme-color="#4f46e5"
></qingyu-chat-widget>
```

- `widget/qingyu-widget.js` — 核心元件，用 Shadow DOM 隔離樣式，不會跟 qingyuweb.com 頁面互相污染
- `widget/demo.html` — 展示頁面，可直接用瀏覽器打開看外觀
- `widget/example-token-endpoint.js` / `widget/example_token_endpoint.py` — qingyuweb.com 後端要實作的 `token-endpoint` 範例（Node 版和 Python 版都有），這一段程式碼要放在 qingyuweb.com 自己的伺服器上，用來安全地把長期 API Key 換成短期 widget JWT 再交給瀏覽器

widget 只認得 `token-endpoint` 給的短期 JWT，完全不需要（也不應該）知道長期 API Key。

## 快速開始

```bash
pip install -r requirements.txt

# 三個必要的環境變數
export ANTHROPIC_API_KEY=your_anthropic_key       # /chat 問答需要呼叫 LLM
export ADMIN_SECRET=$(openssl rand -hex 16)        # 管理 API Key 用
export WIDGET_JWT_SECRET=$(openssl rand -hex 32)   # 簽發/驗證 widget JWT 用

# 選填：用量計費估算，可依模型費率調整
export RAG_INPUT_USD_PER_1K_TOKENS=0.003
export RAG_OUTPUT_USD_PER_1K_TOKENS=0.015
export RAG_USD_TO_TWD=32

# 選填：租戶配額限制，設為 0 可關閉
export RAG_API_KEY_RATE_LIMIT_PER_MINUTE=120
export RAG_WIDGET_RATE_LIMIT_PER_MINUTE=60
export RAG_RATE_LIMIT_WINDOW_SECONDS=60

# 先跑測試（不需要 ANTHROPIC_API_KEY）
python test_pipeline.py   # 上傳/切片/向量化/搜尋四模組
python test_auth.py       # 驗證機制（API Key / widget JWT / 租戶隔離）

# 啟動 API 服務
uvicorn main:app --reload
```

啟動後可在 `http://localhost:8000/docs` 看到互動式 API 文件。

## 驗證機制與呼叫流程

系統分三種身份，各自的金鑰／token 不能互相冒用（已在 `test_auth.py` 驗證過）：

| 身份 | 用途 | 有效期 | 怎麼拿到 |
|---|---|---|---|
| **Admin Secret** | 建立/管理 API Key | 長期（環境變數） | 只在你的維運後台使用，絕不能進到前端 |
| **API Key**（`qyk_...`） | qingyuweb.com 後端呼叫上傳文件、查 metrics、換 widget token | 長期，可撤銷 | `POST /admin/api-keys` |
| **Widget JWT** | 瀏覽器端 widget 呼叫 `/chat` | 短期（預設 15 分鐘） | `POST /auth/widget-token`（用 API Key 換） |

典型流程：
```
1. 你（維運）用 Admin Secret 呼叫 POST /admin/api-keys，
   拿到 acme-corp 這個租戶的 API Key（明文只顯示這一次，要存好）

2. qingyuweb.com 後端把這個 API Key 存在自己的伺服器環境變數，
   使用者打開頁面時，後端用 API Key 呼叫 POST /auth/widget-token，
   拿到一個 15 分鐘內有效的 JWT

3. 後端把這個 JWT 交給前端 widget（例如寫進頁面的一個 <script> 變數）

4. 瀏覽器上的 widget 直接用這個 JWT 呼叫 POST /chat，
   長期有效的 API Key 全程不會出現在瀏覽器
```

這樣即使瀏覽器端的 JWT 外洩，攻擊者也只能在 15 分鐘內做「問答」這一件事，
不能上傳/刪除文件、不能查其他租戶資料、也無法無限期使用。

## API 端點

| 方法 | 路徑 | 需要身份 | 說明 |
|---|---|---|---|
| POST | `/admin/api-keys` | Admin Secret | 建立新租戶的 API Key |
| GET | `/documents` | API Key | 文件列表與 active version |
| POST | `/documents` | API Key | 上傳文件（multipart file），可帶 `doc_id` 建立新版本 |
| GET | `/documents/{doc_id}/versions` | API Key | 查看文件版本紀錄 |
| POST | `/documents/{doc_id}/versions/{version}/restore` | API Key | 將舊版本還原成新的 active version |
| DELETE | `/documents/{doc_id}` | API Key | 刪除文件 |
| POST | `/auth/widget-token` | API Key | 換一個短期 widget JWT |
| POST | `/chat` | Widget JWT | 問答，body: `{query, top_k, model}` |
| GET | `/metrics/summary` | API Key | 依階段彙總的延遲/token/成本統計 |
| GET | `/metrics/billing` | API Key | 依 token 用量整理帳務估算 |
| GET | `/metrics/logs?stage=xxx` | API Key | 明細紀錄 |

所有需要驗證的端點都用 `Authorization: Bearer <key_or_token>` 帶入。

## 多租戶設計

所有向量資料與 metrics 都用 `tenant_id` 隔離，且 `tenant_id` **不是**由呼叫端直接指定，
而是從 API Key 或 Widget JWT 解析出來（見 `auth/dependencies.py`），
確保客戶端無法透過竄改參數讀到別的租戶的資料。

## API Key rate limiting

驗證通過後，系統會依 `tenant_id + scope` 計算每分鐘請求量。超過配額時回傳 `429`，
並帶 `Retry-After`、`X-RateLimit-Limit`、`X-RateLimit-Remaining`、`X-RateLimit-Reset` headers。

- `api_key` scope：文件上傳、刪除、metrics、換 widget token 等後端 API Key 呼叫
- `widget_chat` scope：瀏覽器 widget 的 `/chat` 問答呼叫

預設配額可用環境變數調整：`RAG_API_KEY_RATE_LIMIT_PER_MINUTE`、
`RAG_WIDGET_RATE_LIMIT_PER_MINUTE`、`RAG_RATE_LIMIT_WINDOW_SECONDS`。

## 文件版本管理

上傳文件時若帶入既有 `doc_id`，系統會建立新版本，重新索引 active chunks，
並保留舊版本 metadata 與原始文字，方便日後查看或還原。

- `GET /documents`：列出每份文件目前 active version
- `GET /documents/{doc_id}/versions`：列出版本歷史
- `POST /documents/{doc_id}/versions/{version}/restore`：把指定舊版本還原成新的 active version

搜尋只會使用目前 active version 的 chunks，避免舊版內容混進回答。

## 依 token 用量計費

`metrics` 會在 LLM 生成階段記錄 `input_tokens`、`output_tokens`，並自動依費率寫入
`cost_usd`。預設費率可用環境變數覆蓋，方便不同模型或不同供應商調整。

- `RAG_INPUT_USD_PER_1K_TOKENS`
- `RAG_OUTPUT_USD_PER_1K_TOKENS`
- `RAG_USD_TO_TWD`

可用 `GET /metrics/billing` 取得總 token、各階段成本、台幣估算與目前費率設定，
未來可接租戶後台、月結報表或方案額度。

## Embedding Provider 替換

`embedding/local_provider.py` 是不需要外部 API、開發測試用的離線版本（HashingVectorizer），
語意理解能力有限。正式上線建議換成 `embedding/remote_provider.py` 裡的 `OpenAIEmbeddingProvider`
（或自行實作 Voyage AI / Cohere 版本），只要實作 `EmbeddingProvider` 介面即可無痛替換：

```python
from embedding.base import EmbeddingProvider

class YourProvider(EmbeddingProvider):
    @property
    def dimension(self) -> int: ...
    def embed(self, texts: list[str]) -> list[list[float]]: ...
```

## VectorStore 替換

目前用 SQLite + numpy 算 cosine similarity，適合文件量在數萬筆以內的情境。
文件量再往上，建議換成 FAISS / pgvector / Milvus，並保持 `add_batch()` / `search()` 兩個方法簽名一致。

## 下一步（尚未實作）

- 把 mock 的 `/mock-token-endpoint` 換成真正的 qingyuweb.com 後端邏輯（含使用者 session 驗證）
