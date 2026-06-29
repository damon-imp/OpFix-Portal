# OpFix Hub

Per-client hub for OpFix engagement clients. Mobile-first. Frontend production-ready as of June 29, 2026. Backend pending.

**Production target:** `hub.opfix.io`
**Current demo:** https://damon-imp.github.io/OpFix-Portal/

---

## Quick Start

Open `index.html` in a browser. It redirects to `hub.html` (the home screen). Click through all 5 primary screens via the bottom tab bar (mobile) or top nav (desktop ≥768px). Append `?demo=1` to any URL to show the demo mode banner.

Every page uses sample data for **Acme Operations / John Smith / Day 67 of 180 / Phase 3 Build**.

---

## File Structure

```
.
├── index.html              ← root redirect to hub.html (shows logo splash)
├── hub.html                ← home: score + status + meetings + today's focus
├── score.html              ← X-Ray score: Now / Over Time / By Pillar (40-factor drill-down)
├── install.html            ← 180-day phase timeline + Google Calendar embed slot
├── actions.html            ← founder obligations + recently delivered (proof-of-work)
├── vault.html              ← chronological deliverable archive with search
├── stress.html             ← locked screen, unlocks Day 106 (Phase 4)
└── shared/
    ├── opfix-logo.svg      ← brand mark (transparent SVG, used in topbar + splash)
    ├── portal.css          ← design tokens + nav + common components
    ├── portal-nav.js       ← topbar + bottom tab bar partial (data-active driven)
    └── portal-demo.js      ← demo helper: dropdowns + toasts (banner gated behind ?demo=1)
```

---

## Doctrine (do not refactor without checking)

- **Score = identity, Phase = motion.** Don't blend axes. Score is the X-Ray output across 40 factors / 4 pillars. Phase is install progress against 180 days.
- **Evidence accumulates, never deletes.** Score history, gate sign-offs, completed actions, delivered files are permanent and timestamped. Drives the retainer pitch at Day 173.
- **Founders see what they owe and what was delivered.** They NEVER see OpFix's forward-looking build queue. The internal "drafting", "queued", "ETA" items live in the admin control panel only. Violating this doctrine on the Actions screen will reverse the value of the entire portal.

---

## What's Wired vs Mocked

### Wired (works as built):
- Navigation between all 7 pages (index + 5 primary + stress).
- View switcher on Score (Now / Over Time / By Pillar).
- Pillar tile clicks on Score → scrolls to factor drill-down in By Pillar view.
- Phase expand/collapse on Install (P3 expanded by default, others click to expand).
- Tab + chip filtering on Actions (All / Overdue / This Week × pillar filter).
- Type filter + live search on Vault.
- Notifications dropdown (bell icon, top right): sample notifs with mark-read.
- Account menu dropdown (hamburger icon, top right): profile / billing / settings / sign out.
- Demo toasts on any button click that would hit an unbuilt backend (Sign Off, Approve, Upload, Join, etc.).
- Stress Test tab styled as locked but clickable for preview.
- Demo banner gated behind `?demo=1` (suppressed on production load).

### Mocked (waiting for backend):
- All score data, action lists, deliverables, meetings - hardcoded sample.
- Notifications dropdown content - static.
- Google Calendar embed - placeholder div, ready for iframe.
- File downloads - toast only.
- Sign-off, upload, approve flows - toast only.

---

## How To Wire It (when ready)

### Top-bar nav state
File: `shared/portal-nav.js`. Two flags at the top:
```js
const HAS_ACTIONS_ALERT = true;   // wire to API: true if open founder actions exist
const STRESS_UNLOCKED = false;    // wire to API: true when Day >= 106
```

### Active page indicator
Each page sets its active tab via:
```html
<div id="portal-nav" data-active="hub"></div>
```
Values: `hub | score | install | actions | vault | stress`

### Adding a new screen
1. Copy any existing HTML page as a template.
2. Change `<title>` and the `data-active` value.
3. Reference `shared/portal.css` and load both scripts at the bottom.
4. To add it to the nav, edit `topbarHTML` and `tabbarHTML` strings in `portal-nav.js`.

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
  meetings: [{ id, title, type, starts_at, duration_min, location, join_url, is_today, ghl_event_id, google_event_id }],
  quickStats: { openActions, overdueActions, deliverables, scoreChangePercent },
  todaysFocus: [/* top 3 priority items: overdue founder actions + recently delivered */]
}
```

**Score** needs:
```js
GET /api/portal/score
{
  current: 168, baseline: 142, projected: 212, total: 240, tier: "Rebuild",
  pillars: [{ id, name, score, total, factors: [{ id, num, name, description, score, total, severity: "none"|"minor"|"moderate"|"severe" }] }],
  history: [{ day: 1, score: 142, label: "Baseline" }, { day: 42, score: 161, label: "Gate 2" }, ...]
}
```

**Install** needs:
```js
GET /api/portal/install
{
  phase: { current: 3, day: 67, totalDays: 180 },
  phases: [{ number, name, days: "1-21", status, completedDay, items: [{ status: "done"|"active"|"pending", text }], gate: { label, detail } }]
}
GET /api/portal/calendar/iframe-url
→ returns signed Google Calendar embed URL for founder's calendar
```

**Actions** needs (doctrine-aware — returns ONLY owner='founder' items):
```js
GET /api/portal/actions
{
  summary: { overdue, owedByYou, delivered, completed },
  actions: [{ id, title, description, pillar: "p1"|..., due_at, status, attachment, action_type: "review"|"approve"|"upload"|"signoff" }],
  recentlyDelivered: [{ id, title, type, pillar, delivered_day, drive_file_id }],
  completed: [{ id, title, pillar, completed_at }]
}
POST /api/portal/actions/:id/signoff
POST /api/portal/actions/:id/upload
POST /api/portal/actions/:id/approve
```

**Note for Greg:** opfix-owned items (drafting, queued, ETAs) live in actions table with `owner='opfix'` and are exposed via `/api/admin/queue`, NEVER via `/api/portal/actions`. Enforce in the API layer, not just the frontend.

**Vault** needs:
```js
GET /api/portal/vault
{
  totals: { all, by_type: { report, sop, framework, gate, stress } },
  groups: [{ phase: 1, label: "Phase 1 · Diagnose · Days 1–21", items: [{ id, title, type, pillar, description, delivered_day, file_url, preview_url }] }]
}
```

**Stress Test** (Day 106+):
```js
GET /api/portal/stress
{
  unlocked: true,
  tests: [{ day: 130, name, status, results, refinements }, ...]
}
```

Full backend spec in dev build sheet v2.1 (in shared drive).

---

## Design Tokens (locked)

All in `shared/portal.css` `:root`. Match `opfix_brand_kit.docx` v1.0 + CHANGELOG v1.1.

- **Brand Blue:** `#3B82F6` (CTAs, Fix wordmark, active states, logo Fix color)
- **Black:** `#0A0A0A` (NOT navy, NOT pure black — explicit per CHANGELOG)
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

The `?demo=1` flag shows the orange "DEMO MODE · sample data" banner with dismiss button. All other demo helpers (toasts on dead links, mock notifications, mock account menu) load on every page regardless — they exist to prevent broken UX while backend is incomplete.

When the real API is wired:
- Strip hardcoded sample data from each HTML, hydrate via `fetch()` on `DOMContentLoaded`.
- Wire `.icon-btn` (bell, hamburger) to real notification + account endpoints.
- Replace `href="#"` links with real routes.
- Delete `shared/portal-demo.js` entirely once dropdowns are real.

---

## Browser Support

Tested intent: Safari iOS 15+, Chrome Android 14+, Chrome/Edge/Safari/Firefox latest desktop. Uses CSS variables, `aspect-ratio`, `backdrop-filter`, modern grid. No build step required.

---

## Notes for Greg

- The `data-active` pattern means you can drop the same nav block on any new page without touching the partial.
- The demo script is one file - easy to delete or feature-flag for prod.
- Stress Test screen is intentionally clickable in demo even though it's "locked," so you can preview the page.
- All animations respect `prefers-reduced-motion`.
- Mobile breakpoint is 768px. Below that = bottom tab bar. Above = top nav.
- Tap targets are 40px+ everywhere.
- No `<form>` tags used.
- No external dependencies. No build. Pure HTML/CSS/JS.

If anything's off, ping Damon. Don't refactor structure without checking — the layout decisions are doctrine-driven (Score = identity, Phase = motion; evidence accumulates; founders see proof of work, not OpFix's forward queue).
