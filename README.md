# Qingyu Web Studio

## AI / LINE Bot Demo API

本專案的 AI 與 LINE Bot 展示使用 Vercel Serverless Functions，前端只呼叫自己的 `/api/*`，不會把 API key 放進前端 bundle。

### API Routes

- `POST /api/ai-audit`：AI 網站健檢，無 `OPENAI_API_KEY` 時會回傳 mock report。
- `POST /api/chat`：聊天式網站顧問 Demo，無 `OPENAI_API_KEY` 時會回傳 mock reply。
- `POST /api/line-webhook`：LINE Bot Demo webhook，會驗證 `x-line-signature`，再用 OpenAI 或 mock reply 回覆 LINE。

### Vercel Environment Variables

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=
```

LINE Developers 的 Webhook URL 可填：

```text
https://你的網域/api/line-webhook
```

正式部署時，`OPENAI_API_KEY`、`LINE_CHANNEL_ACCESS_TOKEN`、`LINE_CHANNEL_SECRET` 只能放在 Vercel 後端環境變數，不可放到 `src` 前端程式。

我幫小型店家、工作室、工程行與個人品牌製作可使用的網站與 AI 工具。從一頁式網站、LINE Bot、自動回覆，到接案表單、報價流程與小型後台，把零散流程整理成清楚、可操作、可展示的系統。

主網站現在負責三件事：

1. 讓一般客戶快速理解可以委託哪些網站、LINE Bot、自動回覆與後台服務。
2. 用 BuildFlow、AI 技術任務、店家 AI 助手與文件問答產品展示實作能力。
3. 把有興趣的訪客導到服務方案、作品案例、需求診斷、聯絡表單或 Email / LINE 討論。

## 對外展示入口

- 主站：https://www.qingyuweb.com
- 接案服務頁：https://www.qingyuweb.com/services
- AI 技術任務：https://ai-tech-quest.vercel.app
- AI 技術任務展示模式：https://ai-tech-quest.vercel.app/demo
- BuildFlow：https://www.qingyuweb.com/buildflow

## 建議展示順序

1. 先開 `https://www.qingyuweb.com/`，用首頁說明「網站、LINE Bot、自動回覆、接案流程」可以怎麼幫客戶。
2. 進 `/works`，第一張展示 BuildFlow 工程行接案與派工管理系統。
3. 再開 `https://ai-tech-quest.vercel.app`，用 AI 技術任務展示文件問答、模型分類、店家 AI 助手與產品展示室。
4. 最後進 `/contact`，說明客戶可以提供產業、目前流程、常見問題、預算與上線時間。

## 可接案服務

- BuildFlow / 小型後台。
- 網站 / 作品集與接案主站整理。
- 店家 AI 助手 / LINE Bot。
- 自動回覆與 FAQ 後台。
- 繁體中文文件問答系統。
- 互動式技術展示與專題作品包裝。

## 路由

- `/`：Qingyu Web Studio 接案主站
- `/services`：網站、LINE Bot、自動回覆與小型後台接案服務
- `/engineering`：工程行作品集
- `/contractor-site`：工程接案前台
- `/buildflow`：BuildFlow 工程後台
- `/login`：管理登入

## 工程行作品集

工程案常亂在 LINE、口頭、Excel、紙本和 Pro360。這個作品把需求、報價、派工、回報整理成一條流程。

### 工程前台

- 工程服務
- 施工案例
- 需求表單
- 估價摘要
- LINE Bot 帳號

### BuildFlow 後台

- 管理者登入
- 案件管理
- 報價與 PDF
- 發包與任務
- 師傅回報
- LINE Bot 查詢

## 怎麼試

1. 打開首頁。
2. 點「工程行作品集」。
3. 點「填需求」看工程前台。
4. 點「看後台」進 BuildFlow。
5. 用 `admin / admin123` 登入。
6. 加入 LINE Bot：`@550oexzn`。
7. 輸入 `業主 q-001`。
8. 輸入 `綁定 BF-AMING-1234`。
9. 輸入 `今日任務`。
10. 輸入 `回報 t-001 現場已完成第一道防水`。
11. 輸入 `完成 t-001`。

## 帳號

### BuildFlow

- 管理者：`admin / admin123`
- 師傅：`aming / 1234`
- 師傅：`along / 1234`
- 師傅：`ming / 1234`

## LINE Bot

帳號：`@550oexzn`

可試指令：

- `測試`
- `估價`
- `業主 q-001`
- `老闆總覽`
- `綁定 BF-AMING-1234`
- `今日任務`
- `回報 t-001 現場已完成第一道防水`
- `完成 t-001`

## 技術

React, Vite, Tailwind CSS, React Router, Supabase, Vercel Serverless Functions, LINE Messaging API.

## Supabase MVP

最小後端 schema 在 `supabase/mvp_schema.sql`，包含：

- `contact_requests`：前台接案需求
- `projects`：工程案件資料，之後可取代 mock data
- `project_files`：工程照片、報價單、附件 metadata

前端需要設定：

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

目前 MVP 流程：

1. 在 Supabase SQL Editor 執行 `supabase/mvp_schema.sql`。
2. 在 Vercel 設定上方兩個環境變數。
3. 前台 `/contractor-site#inquiry` 送出需求，會寫入 `contact_requests`。
4. 管理頁 `/admin` 可查看需求列表、更新狀態與管理備註。

注意：目前管理頁仍使用本專案的輕量 localStorage 登入。`mvp_schema.sql` 為了快速可用，讓 anon 可以讀取與更新 `contact_requests`。正式收真實客戶資料前，應改成 Supabase Auth + admin RLS。

## 互動式技術展示：AI 技術任務入口

Qingyu Web Studio 現在作為作品與接案主站，同時提供 AI 技術任務的外部實測入口。

- 線上實測：https://ai-tech-quest.vercel.app
- GitHub 原始碼：https://github.com/QingyuJin/ai-tech-quest
- 主站入口：首頁「互動實驗室」與 `/works` 作品案例頁

AI 技術任務是一個互動式技術展示 Demo，使用者可以體驗文件問答、模型分類、店家 AI 助手與產品展示室。這個作品用來展示文件檢索增強生成（RAG）、機器學習（ML）、全端開發（Full-stack）與未來 Unity WebGL 關卡的整合能力。
