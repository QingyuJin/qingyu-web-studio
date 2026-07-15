# Security model

## Authentication

The web application uses Supabase Email Magic Link with the PKCE flow. Sessions
are stored and refreshed through `@supabase/ssr` cookies; application code does
not use `localStorage` as an authentication or authorization source. New users
cannot self-register because Supabase signup is disabled and the login request
uses `shouldCreateUser: false`.

## Authorization

Authorization is defense in depth:

1. Next protected routes validate signed claims and load memberships with the
   user's cookie-bound Supabase client.
2. Organization selection is accepted only when the selected ID occurs in the
   authenticated user's membership result.
3. Nest validates the bearer token with Supabase Auth, then independently loads
   organization membership and permission before any mutation.
4. Postgres RLS scopes every tenant read. No `anon` policy or `anon` table grant
   exists for platform tables.

Authenticated clients receive read-only grants required by the UI plus a
self-profile update grant. Organization, membership, invitation, audit,
notification, and file-metadata writes default to denied and are performed only
through trusted server workflows. Managers may invite only staff or customer
roles; only admins can invite another admin or manager.

## Service-role handling

`SUPABASE_SERVICE_ROLE_KEY` is accepted only by `apps/api` and must live in the
deployment secret manager. It must never use a `NEXT_PUBLIC_` prefix, enter a
browser bundle, be logged, or be committed. The publishable key is not a secret,
but it grants no tenant access without an authenticated session and passing RLS.

## Logging and errors

Every response carries `x-request-id`. Logs are JSON records and the public error
shape is stable. Validation details may be returned for bad input; internal
database errors, access tokens, cookies, provider responses, and service keys are
not returned to clients.

## Known foundation risks

- Supabase Auth email delivery and the invitation/audit database writes are not
  one atomic transaction. Compensation removes a pending database record when
  email delivery fails, but a failure after provider acceptance can still need
  operator reconciliation.
- Invitation acceptance and membership activation are deliberately not yet
  implemented. A pending invitation never grants membership by itself.
- Rate limiting, bot protection, security headers at the reverse proxy, and alert
  routing must be configured before public launch.
- `stored_files` contains metadata only. A later storage migration must add
  equivalent `storage.objects` policies before uploads are enabled.
- A service-role compromise bypasses RLS. Rotate immediately, review audit logs,
  and redeploy every server that held the key.
