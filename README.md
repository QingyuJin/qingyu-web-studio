# Qingyu Web Studio

作品入口網站。

主網站保持簡潔，之後可以陸續放不同作品。目前主作品是工程行作品集。

## 路由

- `/`：Qingyu Web Studio 作品入口
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
