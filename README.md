# 鑫匠工程｜BuildFlow

工程接案網站與後台管理系統。

工程案常亂在 LINE、口頭、Excel、紙本和 Pro360。這個專案把需求、報價、派工、回報整理成一條流程。

## 可以看什麼

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
2. 點「填需求」看工程前台。
3. 點「看後台」進 BuildFlow。
4. 用 `admin / admin123` 登入。
5. 看案件、報價、發包、任務與 LINE Bot。
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

## 部署

1. 在 Supabase SQL Editor 執行 `supabase/line_minimal_schema.sql`。
2. 在 Vercel 設定：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LINE_CHANNEL_ACCESS_TOKEN`
   - `LINE_CHANNEL_SECRET`
3. 部署 `main`。
4. 檢查：

```text
/api/line/webhook?debug=1&health=1
```

看到 `status: 200` 就可以測 LINE Bot。

## 技術

React, Vite, Tailwind CSS, React Router, Supabase, Vercel Serverless Functions, LINE Messaging API.

## 下一步

- PDF 報價單細節
- 更多工程案例
- 業主確認頁
- LINE 圖片回報
- Supabase Auth 與 RLS
