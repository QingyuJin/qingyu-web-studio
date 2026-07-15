# Qingyu Flow production slice

This issue tracks the first production-grade Qingyu Flow vertical slice. No item is considered complete until it is backed by persistent Supabase data, tenant-aware authorization, automated tests, and a reproducible verification command.

## Scope and constraints

- [ ] Preserve the legacy production application and keep `apps/legacy` buildable.
- [ ] Do not use mock records, frontend state as a data source, local-storage authentication, shared passwords, fake LINE delivery, or client-supplied LINE user IDs.
- [ ] Keep Supabase service-role credentials server-only and fail production startup when required database or LINE configuration is missing.
- [ ] Record actual passed, failed, blocked, and unimplemented acceptance items without overstating completion.

## Database and tenant isolation

- [ ] Add a Supabase migration for `contacts`, `companies`, `leads`, `cases`, `case_statuses`, `tasks`, `task_reports`, `activities`, `comments`, `attachments`, `line_channels`, `line_identities`, `line_bind_codes`, `line_webhook_events`, `line_messages`, and Flow notification delivery fields.
- [ ] Give every Flow table an `organization_id`, foreign keys, constraints, useful indexes, timestamps, and RLS.
- [ ] Implement server-side membership helpers and RLS for admin/manager, assigned worker, and linked customer access.
- [ ] Default-deny anonymous enterprise-data access and prevent all cross-organization references.
- [ ] Add audit triggers/functions for sensitive Flow mutations with actor, organization, request ID, timestamp, action, entity, and before/after metadata.
- [ ] Add private storage bucket policies and organization-scoped object paths.
- [ ] Add SQL tests for organization isolation, role access, customer identity access, and file access isolation.

## API, LINE, LIFF, and jobs

- [ ] Add authenticated Flow APIs for contacts, leads, cases, assignment, tasks, reports, comments, activities, attachments, search/filter/sort, and status changes.
- [ ] Verify the raw LINE webhook body with `x-line-signature` using constant-time comparison.
- [ ] Persist `webhookEventId` uniquely, acknowledge accepted webhooks quickly, and process pending events through a durable database-backed worker.
- [ ] Handle LINE follow, text, and one-time bind-code events idempotently.
- [ ] Verify LIFF ID tokens with LINE on the backend and derive the LINE subject only from the verified token.
- [ ] Persist every outbound LINE attempt, response status, provider error code, retry count, and terminal state; retry transient failures with bounded backoff.
- [ ] Send real notifications for lead creation, worker assignment, and case status changes.
- [ ] Validate upload MIME type, byte size, case ownership, and organization path before private storage upload.
- [ ] Apply per-IP and per-organization limits to demo creation, messaging, and uploads.

## Flow administration

- [ ] Implement Supabase login and organization switching in `apps/flow`.
- [ ] Implement customer list/detail, lead inbox, case list/detail, case status workflow, worker assignment, task CRUD, worker reports, attachments, timeline, and LINE delivery/identity status.
- [ ] Add database-backed search, filtering, sorting, pagination, loading, empty, error, and responsive mobile states.

## LIFF customer and worker journeys

- [ ] Customer: verified LIFF session, contact form, service selection, description, image upload, lead/case creation, and own-case status.
- [ ] Worker: verified LINE identity binding to an authenticated employee, today’s assigned tasks, case detail, work-photo upload, report submission, and task status update.
- [ ] Never persist a LINE identity from a frontend-provided user ID.

## Isolated product experience

- [ ] Implement “建立產品體驗” with an expiring organization, generated tenant-owned seed records, a one-time temporary-admin sign-in link, and a one-time LINE bind code.
- [ ] Prevent demo tenants from reading any other tenant and prevent shared credentials.
- [ ] Add scheduled cleanup for expired demo organizations and their private files.

## Documentation

- [ ] Document LINE channel/webhook setup, retry behavior, Rich Menu setup, LIFF URLs/scopes, environment variables, migrations, local development, deployment, operations, and cleanup.
- [ ] Document that real LINE acceptance requires configured LINE channels, public HTTPS callbacks, and designated test accounts/devices.

## Automated verification

- [ ] Unit tests: webhook signature, duplicate events, LIFF identity verification, notification retry, environment validation, and upload validation.
- [ ] Integration tests: customer creates lead, admin assigns task, worker submits report, status change queues/sends notification, and audit trail completeness.
- [ ] SQL tests: RLS roles, organization isolation, linked customer scope, and attachment isolation.
- [ ] Playwright desktop and mobile E2E against real app services and persistent test database; no intercepted/mock API data.
- [ ] Run and pass install, lint, typecheck, unit/integration tests, build, migration validation, RLS tests, and Playwright tests.

## Manual real-LINE acceptance

- [ ] A real LINE/LIFF account creates a request.
- [ ] Flow administration sees the persisted case after refresh.
- [ ] An administrator assigns an actual employee identity.
- [ ] The employee submits a persisted LIFF report.
- [ ] The administrator updates case status.
- [ ] The linked LINE account receives the real provider-delivered notification.
- [ ] Audit Log shows the complete actors and timestamps.
- [ ] A second organization cannot read any of the first organization’s records or files.

## Definition of done

- [ ] All required migrations apply from an empty database.
- [ ] No secrets, mock login, shared password, anonymous enterprise read policy, or production fallback mock is committed.
- [ ] CI is executable and all claimed checks have evidence.
- [ ] Final handoff lists passed, failed, blocked, and not-yet-implemented items separately.
