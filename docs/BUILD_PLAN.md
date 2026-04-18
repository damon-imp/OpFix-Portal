# Build Plan

Full plan lives in `opfix_client_portal_build_spec_v1_1.docx` Section 8. This is the operational summary.

## Target

V1 ship in 10-12 weeks. Parallel to Seamless Brothers engagement. Seamless takes priority — if it falls behind, portal stops that week.

## Phases

### Phase 0 — Week 1: Foundation
- Supabase OpFix org provisioned, Vercel team created, repo done
- GHL sandbox with test client
- **Auth prototype working end-to-end** (decision gate — if this fails, pause)
- Base React app on `portal-dev.opfix.io`
- Design tokens loaded, fonts loaded

### Phase 1 — Weeks 2-3: Data Model & APIs
- All 10 Postgres tables with migrations
- Row-level security tested on every table
- Seamless seed data (baseline score, phases, ~20 milestones)
- CRUD APIs for clients, phases, milestones, approvals, SOPs, stress tests
- GHL webhook listeners (contact, invoice, appointment)
- Shared component library: MetricCard, StatusBadge, PhaseIndicator, SidebarNav

### Phase 2 — Weeks 4-6: Client Views V1
- Views 1-4: Dashboard, Diagnostic, Phase Progress, SOPs
- Mobile-responsive layouts
- **Design review gate:** Damon signs off on visual fidelity before Phase 3

### Phase 3 — Weeks 7-8: Approvals & Internal Admin
- View 5: Approvals workflow with audit log
- Approval → GHL notification flow
- Admin views A, B, D, E (all clients, client detail, delivery queue, approval queue)

### Phase 4 — Weeks 9-10: Analytics & Phase 4 Features
- Views 6, 7: Engagement KPIs + Stress Tests
- Diagnostic Report comparison view (baseline vs. final)
- Retainer readiness scoring
- Admin views C, F (engagement metrics, audit log)

### Phase 5 — Weeks 11-12: Polish & Production
- Sentry + Vercel Analytics
- PDF export for diagnostic report
- Load testing with 20 simulated clients
- Security audit (RLS policies, JWT handling, HMAC verification)
- Production deploy to `portal.opfix.io`
- Tyler onboarded as first real client

## Weekly cadence

- **Monday:** Greg bandwidth check. Portal work this week? If no, skip.
- **Mid-week:** Everett pushes branch for week's deliverables. Greg reviews.
- **Friday:** Preview deploy live on `portal-dev.opfix.io`. Damon reviews.
- **Friday async:** Greg posts status in Slack — what shipped, what's blocked, Seamless impact.

## Productive avoidance checkpoints

Portal can become a substitute for revenue activity. Two forcing functions:

- **Checkpoint 1 (end of Week 6):** If OpFix has < 2 additional paying clients beyond Tyler, portal pauses for 2 weeks. Damon focuses on pipeline.
- **Checkpoint 2 (end of Week 10):** If OpFix has < 4 total paying clients, V1 ships as-is. Polish/hardening reprioritized to revenue work.

## Definition of done (V1)

- All 8 client views shipped
- All 6 admin views shipped
- Auth handoff working in production
- RLS tested with multi-client data
- Mobile-responsive on Views 1, 3, 5
- Sentry + Analytics live
- PDF export working
- Tyler onboarded
- 99%+ uptime for first 30 days
- Zero data-level security incidents
- Design review passed against `DESIGN_SYSTEM.md`

## Out of scope for V1

- Client messaging (stays in GHL)
- Partner/referral portal (Impruvu use case)
- Self-serve diagnostic (separate public tool)
- QuickBooks sync
- Multi-language
- White-label partner deployments
- AI-generated SOP drafts
- Video content hosting
