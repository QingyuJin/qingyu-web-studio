# Qingyu System Lab

工程行接案、報價、發包與 LINE 回報系統作品。

## 核心作品

### BuildFlow

給統包與工程行使用的輕量管理系統。

- 前台收需求
- 後台建案件
- 工項、材料、單價、日期管理
- 報價單與 PDF 摘要
- 發包、派工、追加減項
- LINE Bot 回報任務
- 老闆查看成本、進度與毛利

### Contractor Site

工程前台頁面。負責收集客戶需求、照片、工種、坪數與預計施工日期。

### CoachFlow

第二個垂直領域範例。展示課表、學員、回報與 Robot 回覆邏輯。

## 試用路線

1. 打開首頁。
2. 進入「工程前台」，填估價資料。
3. 進入 `BuildFlow`。
4. 用 `admin / admin123` 登入。
5. 查看案件、報價、發包、任務與 LINE Bot 面板。
6. 查看報價單 `q-001` 與 PDF 摘要。
7. 加入 LINE Bot：`@550oexzn`。
8. 輸入 `業主 q-001` 查看案件進度。
9. 輸入 `老闆總覽` 查看待辦與毛利摘要。
10. 輸入 `綁定 BF-AMING-1234`。
11. 輸入 `今日任務`。
12. 輸入 `回報 t-001 現場已完成第一道防水`。
13. 輸入 `完成 t-001`。
14. 再輸入 `今日任務`，`t-001` 應不再出現在待完成列表。

## 試用帳號

### BuildFlow

- 管理者：`admin / admin123`
- 師傅：`aming / 1234`
- 師傅：`along / 1234`
- 師傅：`ming / 1234`

### 主控台

- Email：`admin@qingyu.dev`
- Password：`qgadmin`

## LINE Bot 部署

這個專案已包含 Vercel webhook 與 Supabase 最小資料表。

1. 在 Supabase SQL Editor 執行 `supabase/line_minimal_schema.sql`。
2. 在 Vercel 設定：
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LINE_CHANNEL_ACCESS_TOKEN`
   - `LINE_CHANNEL_SECRET`
3. 部署 `main` 分支。
4. 檢查健康狀態：

```text
/api/line/webhook?debug=1&health=1
```

健康檢查應回傳 `status: 200`。

## 技術

React, Vite, Tailwind CSS, React Router, Supabase, Vercel Serverless Functions, LINE Messaging API.

## 下一步

- 完整 Supabase Auth 與 RLS
- 報價 PDF 正式下載
- 照片上傳與任務綁定
- 業主確認連結
- 老闆成本與毛利報表
