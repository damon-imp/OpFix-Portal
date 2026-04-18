# Architecture

## One-line summary

Hybrid. GHL owns auth, messaging, booking, invoicing, and document storage. This app owns diagnostic scoring, phase progress, SOPs, approvals, and internal admin. Clients log into GHL, then hand off to this app via signed JWT.

## The seam (auth flow)

1. Client clicks login link in GHL welcome email
2. Authenticates on GHL portal
3. Clicks "Open Engagement Dashboard" button in GHL
4. GHL calls backend: `POST /api/auth/ghl-handoff` with GHL user ID + HMAC
5. Backend validates HMAC, looks up client_user by `ghl_user_id`, issues Supabase JWT
6. Redirect to `portal.opfix.io/auth/callback?token=<jwt>`
7. Frontend stores JWT in httpOnly cookie
8. All subsequent API calls carry JWT in Authorization header
9. Session TTL: 8 hours. No refresh tokens — re-auth through GHL.

## Source of truth

**GHL owns:**
- Contact info, payment status, calendar events, messages, PDF documents

**This app owns:**
- Diagnostic scores, phase progress, milestones, SOPs, approvals, stress tests, audit log

## Sync patterns

**GHL → this app (webhooks):**
- Contact created → create `client_user`
- Invoice paid → flag engagement status
- Appointment booked → log for internal admin

**This app → GHL (API calls):**
- Milestone complete → notify internal team
- Approval requested → trigger GHL workflow for client email/SMS
- Phase advanced → update GHL contact custom field
- Score re-scored → attach PDF to GHL contact

## Failure modes to test

- GHL webhook delivery failure → queue + retry 5x over 24hr
- JWT compromise → 8hr TTL, rotated shared secret quarterly
- Client deleted in GHL → archive locally, don't cascade delete
- Supabase down → GHL portal still works, show maintenance page with link back

## Week 1 gate

Auth prototype must work before any feature work starts. Everett logs into test client portal from sandbox GHL sub-account. If this fails, pause and reconsider architecture. Non-negotiable.
