# Qingyu Web Studio｜BuildFlow 工程管理 Demo

Qingyu Web Studio 的作品入口網站，主品牌是 Qingyu Web Studio。BuildFlow 是其中一個完整作品案例，示範「工程行 LINE Bot + 後台管理系統」如何把 LINE 裡的報價、施工回報、驗收、請款與保固整理成可追蹤資料。

## 專案簡介

BuildFlow 是為工程行、小型工班與維修團隊設計的 MVP Demo。客戶可以在 LINE 裡查看報價與確認施工，師傅可以用口語回報每日進度，老闆則在後台追蹤案件、排程、施工前準備、完工驗收、請款與保固。

這個專案的目的不是單純展示 UI，而是展示 Qingyu Web Studio 可以把真實工作流程整理成網站、後台、資料庫與 webhook 串接。

## 核心功能

- LINE Bot 報價單互動
- 業主同意後轉正式案件
- 工程排程與施工前準備 checklist
- LINE 每日施工回報同步
- 完工試水、驗收、請款、付款確認與保固流程
- BuildFlow 後台案件卡片、同步紀錄 Timeline、報價狀態卡片
- Supabase 資料庫同步
- Vercel Serverless Function LINE webhook
- localStorage Demo fallback
- Legacy LineBot data mode

## Demo 流程

主流程：

```text
LINE 報價
→ 業主同意
→ 轉正式案件
→ 安排施工日
→ 施工前準備
→ 開始施工
→ 每日施工回報
→ 完工試水
→ 業主驗收
→ 請款
→ 付款確認
→ 結案
→ 保固
```

### 60 秒展示口播

- `0:00 - 0:10`：介紹 BuildFlow，這是工程行 LINE Bot + 後台管理系統。
- `0:10 - 0:25`：LINE 端輸入「想看 PDF」，Bot 回報價單；輸入「同意」，系統記錄業主確認。
- `0:25 - 0:40`：BuildFlow 後台轉正式案件、安排施工日、完成施工前準備、開始施工。
- `0:40 - 0:50`：LINE 端師傅每日回報與完工試水，後台自動更新施工日誌與驗收狀態。
- `0:50 - 1:00`：後台建立請款、確認付款，案件結案並進入保固。

### LINE 端 Demo 腳本

1. `想看 PDF`
2. `同意`
3. `今日回報 q-001，2人出工，完成底層清潔，明天做防水底漆`
4. `q-001 屋頂防水完工，已試水 24 小時，目前沒有滲漏，完工照已傳`
5. `q-001 驗收通過，沒問題`

### BuildFlow 後台 Demo 腳本

1. 轉正式案件
2. 安排施工日
3. 完成施工前準備
4. 開始施工
5. 通知業主驗收
6. 建立請款紀錄
7. 確認已付款

## 技術架構

Frontend:

- Vite
- React
- Tailwind CSS

Backend / API:

- Vercel Serverless Function
- LINE Messaging API webhook

Database:

- Supabase
- `projects`
- `line_messages`
- `line_message_parses`
- `buildflow_sync_actions`
- `project_daily_reports`

## 環境變數

前端 `.env.local`：

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Vercel Serverless Function：

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LINE_CHANNEL_SECRET=
LINE_CHANNEL_ACCESS_TOKEN=
```

請不要把任何真實 key commit 到 repo。可參考 `.env.example` 建立自己的本機設定。

## 本機開發

```bash
npm install
npm run dev
```

常用路由：

- `/`：Qingyu Web Studio 首頁
- `/buildflow`：BuildFlow 工程管理 Demo
- `/contractor-site`：工程服務頁 Demo
- `/admin`：接案需求管理 Demo

BuildFlow 測試帳號：

- 管理者：`admin / admin123`
- 師傅：`aming / 1234`
- 師傅：`along / 1234`
- 師傅：`ming / 1234`

## Supabase schema

Schema 檔案：

- `supabase/schema.sql`
- `supabase/demo_policies.sql`

目前 BuildFlow MVP 使用的主要資料表：

- `projects`：案件狀態、進度、最近更新、缺少資料、來源標籤
- `line_messages`：LINE webhook 收到的訊息
- `line_message_parses`：rule-based intent / entities 解析結果
- `buildflow_sync_actions`：LINE 訊息或後台操作寫入 BuildFlow 的同步紀錄
- `project_daily_reports`：每日施工回報

Legacy LineBot data mode 會讀取既有資料表：

- `line_profiles`
- `line_projects`
- `line_tasks`
- `line_task_reports`

## BuildFlow Demo Seed

如果想讓 `/buildflow` 在沒有實際操作 LINE Bot 的情況下，也能看到完整 q-001 Demo 流程，可以手動執行 seed SQL。

1. 到 Supabase SQL Editor 執行 `supabase/seed_buildflow_demo.sql`。
2. 開啟 `/buildflow`。
3. 切到 `Supabase BuildFlow tables`。
4. 應該可以看到 q-001 完整流程、Timeline、QuoteStatusCard、每日施工回報與保固資訊。
5. 若要重跑 Demo，可先手動執行 `supabase/reset_buildflow_demo.sql`，再執行 `supabase/seed_buildflow_demo.sql`。

注意：`reset_buildflow_demo.sql` 只用來清除 q-001 demo seed 資料，不會全表清空，也不應用在正式客戶資料上。

## LINE webhook 部署

Webhook 檔案：

```text
api/line/webhook.js
```

部署到 Vercel 後，LINE Developers 的 Webhook URL 填：

```text
https://你的網域/api/line/webhook
```

LINE Developers 設定位置：

```text
Messaging API channel
→ Messaging API
→ Webhook settings
→ Webhook URL
```

啟用 `Use webhook` 後，可以用 LINE Developers 的 Verify 測試。直接用瀏覽器打開 webhook 可能只會看到健康檢查或 405；真正處理 LINE 資料時需要 POST，且必須通過 `x-line-signature` 驗證。驗證失敗回 `401` 是預期行為。

Webhook 目前會寫入：

- `line_messages`
- `line_message_parses`
- `buildflow_sync_actions`
- `projects`
- `project_daily_reports`

## 安全注意事項

- `SUPABASE_SERVICE_ROLE_KEY` 只能放 Vercel serverless function。
- `LINE_CHANNEL_SECRET` 不能放前端。
- `LINE_CHANNEL_ACCESS_TOKEN` 不能放前端。
- `VITE_SUPABASE_ANON_KEY` 可在前端使用，但正式上線前需搭配 Supabase RLS / policy。
- `.env.local` 不可 commit。
- 正式處理客戶資料前，建議改成 Supabase Auth、後端 API 或 Edge Function 控制寫入權限。

## 未來規劃

- 把請款與付款拆成 `payment_requests` 或 `invoices` table。
- 把保固拆成 `project_warranties` table。
- 增加 LINE 圖片下載與 Supabase Storage 歸檔。
- 增加管理員登入與權限控管。
- 增加真實案件搜尋、篩選、匯出報表。
- 將 rule-based parser 升級為可設定規則或 AI 輔助解析。
