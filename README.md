# OpFix Hub

Per-client hub for OpFix engagement clients. Mobile-first. Frontend production-ready as of June 29, 2026 (v2.2 with admin section). Backend pending.

**Production target:** `hub.opfix.io`
**Current demo:** https://damon-imp.github.io/OpFix-Portal/

---

## Quick Start

Open `index.html` in a browser. It redirects to `hub.html` (the home screen). Click through all 5 primary screens via the bottom tab bar (mobile) or top nav (desktop ≥768px). Append `?demo=1` to any URL to show the demo mode banner.

Click the amber **ADMIN** button in the topbar (desktop only) to enter the admin console.

Every page uses sample data for **Acme Operations / John Smith / Day 67 of 180 / Phase 3 Build**.

---

## File Structure

```
.
├── index.html                  ← root redirect to hub.html (shows logo splash)
├── hub.html                    ← founder home: score + status + meetings + today's focus
├── score.html                  ← X-Ray score: Now / Over Time / By Pillar
├── install.html                ← 180-day phase timeline + calendar embed
├── actions.html                ← founder obligations + recently delivered
├── vault.html                  ← chronological deliverable archive
├── stress.html                 ← locked screen, unlocks Day 106
├── README.md                   ← you are here
│
├── shared/                     ← founder portal shared assets
│   ├── opfix-logo.svg          ← brand mark (used in topbar + splash)
│   ├── portal.css              ← design tokens + nav + common components
│   ├── portal-nav.js           ← topbar + bottom tab bar partial
│   └── portal-demo.js          ← demo helper (banner gated behind ?demo=1)
│
└── admin/                      ← admin console (Damon, Greg, Everett only)
    ├── index.html              ← all-clients overview + cross-client patterns
    ├── client.html             ← per-client mirror with edit affordances + internal queue
    ├── queue.html              ← cross-client OpFix build queue
    └── shared/
        ├── admin.css           ← admin chrome + queue styling + edit affordances
        ├── admin-nav.js        ← admin nav partial (strip + topbar)
        └── admin-demo.js       ← sample data (5 clients, 22 queue items) + toasts
```

---

## Doctrine (do not refactor without checking)

- **Score = identity, Phase = motion.** Don't blend axes. Score is the X-Ray output across 40 factors / 4 pillars. Phase is install progress against 180 days.
- **Evidence accumulates, never deletes.** Score history, gate sign-offs, completed actions, delivered files are permanent and timestamped. Drives the retainer pitch at Day 173.
- **Founders see what they owe and what was delivered. They NEVER see OpFix's forward-looking build queue.** The internal "drafting", "queued", "ETA" items live in `/admin/queue` and inside each per-client admin view's right sidebar — never on `/actions.html`. Violating this doctrine on the Actions screen will reverse the value of the entire portal.

---

## Two Layers

### Founder Layer (`hub.opfix.io/*.html`)
Six screens: Hub, Score, Install, Actions, Vault, Stress Test. Read-only for founders except for sign-offs, approvals, and uploads on the Actions screen. Designed for daily check-ins. Doctrine-correct: shows obligations + proof of work, not OpFix's forward queue.

### Admin Layer (`hub.opfix.io/admin/*.html`)
Three screens: Clients overview, per-client mirror, cross-client build queue. Edit affordances on every founder-visible field. Internal OpFix work queue visible. Access restricted to admin role on session JWT (`founders.is_admin = true`). For v1: Damon, Greg, Everett.

---

## What's Wired vs Mocked

### Wired (works as built):
- Navigation between all founder pages + admin pages.
- View switcher on Score (Now / Over Time / By Pillar).
- Pillar tile clicks on Score → scrolls to factor drill-down in By Pillar view.
- Phase expand/collapse on Install (P3 expanded by default).
- Tab + chip filtering on Actions (All / Overdue / This Week × pillar filter).
- Type filter + live search on Vault.
- Admin: clients overview table with live search filter.
- Admin: queue page with status tabs (All / In Progress / Queued / Blocked) and per-client filter chips, both wired to JS render.
- Admin: client switcher dropdown in per-client mirror header.
- Admin entry button in founder topbar (desktop only, hidden on mobile).
- Notifications dropdown (bell icon): sample notifs with mark-read.
- Account menu dropdown (hamburger icon): profile / billing / settings / sign out.
- Demo toasts on any dead link click (Sign Off, Approve, Upload, Join, Re-score, Mark Gate, etc.).
- Stress Test tab styled as locked but clickable for preview.
- Demo banner gated behind `?demo=1`.

### Mocked (waiting for backend):
- All score data, action lists, deliverables, meetings, client roster - hardcoded sample.
- Edit affordances toast confirmation instead of saving to GHL/Supabase.
- Notifications dropdown content - static.
- Google Calendar embed - placeholder div, ready for iframe.
- File downloads - toast only.

---

## How To Wire It

### Top-bar nav state (founder)
File: `shared/portal-nav.js`. Two flags at the top:
```js
const HAS_ACTIONS_ALERT = true;   // wire to API: true if open founder actions exist
const STRESS_UNLOCKED = false;    // wire to API: true when Day >= 106
```

### Admin role gate
The admin entry button in the founder topbar is currently always visible (demo mode). In production, gate its render on `founder.is_admin === true` from the auth session.

### Active page indicator
Each page sets its active tab via:
```html
<div id="portal-nav" data-active="hub"></div>
<!-- or admin -->
<div id="admin-nav" data-active="clients"></div>
```
Founder values: `hub | score | install | actions | vault | stress`
Admin values: `clients | queue | client`

### Sample data contracts

**Hub** needs:
```js
GET /api/portal/dashboard
{
  founder: { firstName, companyName, timezone },
  score: { current, total, baseline, delta, tier },
  pillars: [{ id, name, score, total }],
  phase: { number, name, day, totalDays, progressPercent, nextGateDay, daysToNextGate, nextGateName },
  gates: [{ number, day, status: "complete"|"active"|"pending" }],
  meetings: [{ id, title, type, starts_at, duration_min, location, join_url, is_today, google_event_id }],
  quickStats: { openActions, overdueActions, deliverables, scoreChangePercent },
  todaysFocus: [/* top 3 priority items: overdue founder actions + recently delivered */]
}
```

**Actions** (doctrine-aware — returns ONLY owner='founder' items):
```js
GET /api/portal/actions
{
  summary: { overdue, owedByYou, delivered, completed },
  actions: [{ id, title, description, pillar, due_at, status, attachment, action_type }],
  recentlyDelivered: [{ id, title, type, pillar, delivered_day, drive_file_id }],
  completed: [{ id, title, pillar, completed_at }]
}
```

**Admin endpoints** (Section 18 of dev sheet v2.1):
```js
GET    /api/admin/clients              # list all engagements
GET    /api/admin/clients/:id          # full client state
PATCH  /api/admin/clients/:id          # update any field
POST   /api/admin/clients/:id/actions  # create action (owner=founder OR opfix)
POST   /api/admin/clients/:id/deliverables  # upload to vault
POST   /api/admin/clients/:id/score    # re-score (triggers cascade to GHL + history + notification)
POST   /api/admin/clients/:id/gate/:gn/signoff
POST   /api/admin/clients/:id/stress/:n  # record stress test results
GET    /api/admin/queue                # internal build queue across all clients
```

**Critical**: `/api/portal/actions` filters `WHERE owner='founder'`. The `owner='opfix'` rows are the internal build queue, accessible only via `/api/admin/queue` and `/api/admin/clients/:id`. Enforce in middleware, not just in queries.

Full backend spec in dev build sheet v2.1 (shared drive).

---

## Design Tokens (locked)

All in `shared/portal.css` `:root`. Match `opfix_brand_kit.docx` v1.0 + CHANGELOG v1.1.

- **Brand Blue:** `#3B82F6` (CTAs, Fix wordmark, founder active states, logo Fix color)
- **Amber:** `#F59E0B` (admin chrome, internal queue accents, OpFix-side actions)
- **Black:** `#0A0A0A` (NOT navy, NOT pure black)
- **Severe Red:** `#C81E2D` (severity ONLY — never decorative)
- **Good Green:** `#10B981` (delivered states, positive deltas)
- **Pillar 1 Ops:** `#3B82F6`
- **Pillar 2 Revenue:** `#10B981`
- **Pillar 3 Financial:** `#F59E0B`
- **Pillar 4 Team:** `#8B5CF6`

Fonts: Space Grotesk 700 (display), DM Sans 400/500/600/700 (body), JetBrains Mono 400/500/700 (data).

**No em dashes anywhere.** Hyphens only.

---

## Demo Mode

Demo banner is auto-suppressed on production load. To enable preview mode:
```
hub.opfix.io/?demo=1
```

The `?demo=1` flag shows the orange "DEMO MODE · sample data" banner. All other demo helpers (toasts on dead links, mock notifications, mock account menu, admin toasts) load on every page regardless.

When real API is wired:
- Strip hardcoded sample data from each HTML, hydrate via `fetch()` on `DOMContentLoaded`.
- Wire `.icon-btn` (bell, hamburger) to real notification + account endpoints.
- Wire `.editable` admin fields to PATCH endpoints with inline editor on click.
- Replace `href="#"` links with real routes.
- Delete `shared/portal-demo.js` and `admin/shared/admin-demo.js` once everything is wired.

---

## Browser Support

Tested intent: Safari iOS 15+, Chrome Android 14+, Chrome/Edge/Safari/Firefox latest desktop. Uses CSS variables, `aspect-ratio`, CSS Grid `auto-fit`, `backdrop-filter`. No build step.

---

## Notes for Greg

- The `data-active` pattern means you can drop the same nav block on any new page without touching the partial.
- Founder and admin layers are intentionally separated by folder. Founder pages live at root, admin at `/admin/*`. The session middleware gates `/admin/*` and `/api/admin/*` on `is_admin=true`.
- `.editable` class marks every field that should have an inline editor in production. The CSS gives them a pencil icon on hover. The demo helper intercepts clicks with a toast. Replace with real editors.
- Internal Build Queue panel on `admin/client.html` is the visual enforcement of the doctrine. Never duplicate that data into any founder-side endpoint.
- All animations respect `prefers-reduced-motion`.
- Mobile breakpoint is 768px.
- Admin entry button hidden on mobile (admin work isn't a phone task).
- No `<form>` tags. No build step. No dependencies.

If anything's off, ping Damon. Don't refactor structure without checking — the layout decisions are doctrine-driven.
