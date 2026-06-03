# Qingyu System Lab

做給工程行看的工作流。

工程案最容易亂的地方，常常不是施工，而是資料散在 LINE、口頭、Excel、紙本和 Pro360。BuildFlow 想處理的是這件事：誰要報價、什麼時候做、誰去做、做完怎麼回報。

## 目前可以看

### BuildFlow

把接案到回報整理成一條路。

- 收需求與照片
- 建案件與報價
- 管工項、材料、單價、日期
- 產生 PDF 摘要
- 派師傅、追回報
- LINE Bot 查任務與回報完成
- 老闆看進度、成本、毛利

### Contractor Site

給客戶填需求的前台。先問清楚，後面少來回。

### CoachFlow

另一條流程。用課表、學員與 Robot 回覆，說明同一套做法可以套到其他行業。

## 怎麼試

1. 打開首頁。
2. 進入「估價前台」，填估價資料。
3. 進入 `BuildFlow`。
4. 用 `admin / admin123` 登入。
5. 看案件、報價、發包、任務與 LINE Bot。
6. 查看報價單 `q-001` 與 PDF 摘要。
7. 加入 LINE Bot：`@550oexzn`。
8. 輸入 `業主 q-001`。
9. 輸入 `老闆總覽`。
10. 輸入 `綁定 BF-AMING-1234`。
11. 輸入 `今日任務`。
12. 輸入 `回報 t-001 現場已完成第一道防水`。
13. 輸入 `完成 t-001`。
14. 再輸入 `今日任務`，`t-001` 應不再出現。

## 帳號

### BuildFlow

- 管理者：`admin / admin123`
- 師傅：`aming / 1234`
- 師傅：`along / 1234`
- 師傅：`ming / 1234`

### 主控台

- Email：`admin@qingyu.dev`
- Password：`qgadmin`

## LINE Bot

帳號：`@550oexzn`

可試：

- `選單`
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
3. 部署 `main` 分支。
4. 檢查：

```text
/api/line/webhook?debug=1&health=1
```

看到 `status: 200` 就可以測 LINE Bot。

## 技術

React, Vite, Tailwind CSS, React Router, Supabase, Vercel Serverless Functions, LINE Messaging API.

## 下一步

- 正式 PDF 下載
- 照片上傳與任務綁定
- 業主確認連結
- 老闆成本與毛利報表
- 完整 Supabase Auth 與 RLS
