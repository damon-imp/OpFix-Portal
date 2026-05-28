# OpFix Client Portal

Per-client cockpit for OpFix engagement clients. Mobile-first. No backend yet.

---

## Quick Start

Open `index.html` in a browser. It redirects to `cockpit.html` (the home screen). Click around all 5 primary screens via the bottom tab bar (mobile) or top nav (desktop ≥768px).

Every page uses sample data for **Acme Operations / John Smith / Day 67 of 180 / Phase 3 Build**.

---

## File Structure

```
portal/
├── index.html              ← root redirect to cockpit
├── cockpit.html            ← home: score + status + meetings + actions
├── score.html              ← X-Ray score: Now / Over Time / By Pillar (40-factor drill-down)
├── install.html            ← 180-day phase timeline + Google Calendar embed slot
├── actions.html            ← all open actions, filtered by owner + pillar + date
├── vault.html              ← chronological deliverable archive with search
├── stress.html             ← locked screen, unlocks at Phase 4 (Day 106)
└── shared/
    ├── portal.css          ← all design tokens + nav + common components
    ├── portal-nav.js       ← top bar + bottom tab bar partial (data-active driven)
    └── portal-demo.js      ← demo mode: banner, toasts, notif/menu dropdowns, link interception
```

---

## What's Wired vs Mocked

### Wired (works as built):
- **Navigation** between all 6 pages (5 primary + stress).
- **View switcher** on Score (Now / Over Time / By Pillar).
- **Pillar tile clicks** on Score → scrolls to factor drill-down in By Pillar view.
- **Phase expand/collapse** on Install (P3 expanded by default, others click to expand).
- **Tab + chip filtering** on Actions (combinatorial: All/You/OpFix × pillar/date).
- **Type filter + live search** on Vault.
- **Notifications dropdown** (bell icon, top right): sample notifs with mark-read.
- **Account menu dropdown** (hamburger icon, top right): profile/billing/settings/sign out.
- **Demo banner** on first load of every page (auto-dismisses after 6s).
- **Demo toasts** on any button click that would hit an unbuilt backend (Sign Off, Approve, Upload, Join, etc.).
- **Stress Test tab** styled as locked but clickable for preview.

### Mocked (waiting for backend):
- All score data, action lists, deliverables, meetings - hardcoded sample.
- Notifications dropdown content - static.
- Google Calendar embed - placeholder div, ready for iframe.
- File downloads - toast only.
- Sign-off, upload, approve flows - toast only.

---

## How To Wire It (when ready)

### Top-bar nav state
File: `shared/portal-nav.js`. Top of file has two flags:
```js
const HAS_ACTIONS_ALERT = true;   // wire to API: returns true if open actions exist
const STRESS_UNLOCKED = false;    // wire to API: returns true when Day >= 106
```

### Active page indicator
Each page sets its active tab via:
```html
<div id="portal-nav" data-active="cockpit"></div>
```
Values: `cockpit | score | install | actions | vault | stress`

### Adding a new screen
1. Copy any existing HTML page as a template.
2. Change `<title>` and the `data-active` value.
3. Reference `shared/portal.css` and load both scripts at the bottom.
4. To add it to the nav, edit the `topbarHTML` and `tabbarHTML` strings in `portal-nav.js`.

### Sample data contracts

**Cockpit** needs:
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
  todaysFocus: [/* top 3 actions */]
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

**Actions** needs:
```js
GET /api/portal/actions
{
  summary: { overdue, owedByYou, owedByUs, completed },
  actions: [{ id, owner: "you"|"us", title, description, pillar: "p1"|..., due_at, status, attachment, action_type: "review"|"approve"|"upload"|... }]
  completed: [{ id, title, pillar, completed_at }]
}
POST /api/portal/actions/:id/signoff
POST /api/portal/actions/:id/upload
POST /api/portal/actions/:id/approve
```

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

---

## Design Tokens (locked, do not change without Damon)

All in `shared/portal.css` `:root`. Match `opfix_brand_kit.docx` v1.0 + CHANGELOG v1.1.

- **Brand Blue:** `#3B82F6` (CTAs, Fix wordmark, active states)
- **Black:** `#0A0A0A` (NOT navy, NOT pure black - explicit per CHANGELOG)
- **Severe Red:** `#C81E2D` (severity ONLY - never decorative)
- **Pillar 1 Ops:** `#3B82F6`
- **Pillar 2 Revenue:** `#10B981`
- **Pillar 3 Financial:** `#F59E0B`
- **Pillar 4 Team:** `#8B5CF6`

Fonts: Space Grotesk 700 (display), DM Sans 400/500/600/700 (body), JetBrains Mono 400/500/700 (data).

**No em dashes anywhere.** Hyphens only.

---

## Disabling Demo Mode

To strip the demo banner, dropdowns, and link interception when going to production:
- Remove the `<script src="shared/portal-demo.js"></script>` line from each HTML page.
- Replace dead `href="#"` links with real handlers/routes.
- Wire the icon buttons (`.icon-btn`) to your real notification + account menu logic.

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
- Tap targets are 40px+ everywhere they should be.
- No `<form>` tags used (per Damon's React/HTML rule).
- No external dependencies. No build. Pure HTML/CSS/JS.

If anything's off, ping Damon. Don't refactor structure without checking - the layout decisions are doctrine-driven (Score = identity, Phase = motion; evidence accumulates; etc).
