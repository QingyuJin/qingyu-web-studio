# Qingyu System Lab

A system portfolio focused on small business workflow tools.

This project demonstrates:

- public websites
- admin dashboards
- role-based login
- contractor workflow management
- training program management
- LINE Bot webhook with Supabase task workflow

## Main Projects

### Contractor Site

A public website prototype for contractor businesses.

### BuildFlow

A contractor operation system for projects, subcontracts, bids, change orders, vendors, users, tasks, worker reports, and LINE Bot task updates.

### CoachFlow

A fitness coaching system prototype for student programs, workout completion, check-ins, and LINE Bot style replies.

## Demo Accounts

### Main Admin

Email: `admin@qingyu.dev`

Password: `qgadmin`

### BuildFlow

Admin: `admin / admin123`

Worker: `aming / 1234`

Worker: `along / 1234`

Worker: `ming / 1234`

## System Capabilities

- Role-based login
- Admin dashboard
- CRUD workflow
- Search and filters
- Local data persistence
- Edit modal forms
- LINE Bot webhook for task lookup, reports, and completion
- Supabase minimal schema for LINE Bot demo data

## Demo Flow

1. Open Qingyu System Lab.
2. Enter Contractor Site to view the public website flow.
3. Enter BuildFlow.
4. Login as admin: `admin / admin123`.
5. Create a project.
6. Add subcontract items and assign a worker.
7. Add a change order and copy confirmation text.
8. Logout.
9. Login as worker: `aming / 1234`.
10. Complete assigned tasks and submit reports.

## LINE Bot Demo Flow

This repository includes a working Vercel webhook for LINE Messaging API and a minimal Supabase schema.

### Setup

1. Run `supabase/line_minimal_schema.sql` in Supabase SQL Editor.
2. Add these Vercel environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LINE_CHANNEL_ACCESS_TOKEN`
   - `LINE_CHANNEL_SECRET`
3. Deploy the latest `main` branch on Vercel.
4. Confirm the webhook health endpoint:

```text
/api/line/webhook?debug=1&health=1
```

The Supabase health check should return `status: 200`.

### Test Commands

Send these messages in LINE:

```text
測試
綁定 BF-AMING-1234
今日任務
回報 t-001 現場已完成第一道防水
完成 t-001
今日任務
```

Expected result:

- `綁定 BF-AMING-1234` binds the LINE user to 阿明師傅.
- `今日任務` returns task `t-001`.
- `回報 t-001 ...` saves the report to Supabase.
- `完成 t-001` marks the task as completed.
- The final `今日任務` no longer shows `t-001`.

## Tech Stack

React, Vite, Tailwind CSS, React Router, Supabase, Vercel Serverless Functions, localStorage prototype.

## Roadmap

- Refactor BuildFlow panels
- Replace prompt editing with modal forms
- Add Contractor Site inquiry form
- Expand Supabase Auth and Database from LINE minimal schema into the full BuildFlow schema
- Show LINE task reports inside the BuildFlow admin dashboard
