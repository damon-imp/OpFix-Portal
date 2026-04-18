# Design System

Authoritative reference. When in doubt, default to these tokens. Full brand kit lives in `opfix_brand_kit.docx`.

## Color tokens

All tokens are in `src/lib/tokens.ts` and `tailwind.config.js`. Change in both places or refactor to a single source.

### Backgrounds (dark mode)
- `bg-base`: `#0A0A0A` — page background (never pure black)
- `bg-surface`: `#141414` — cards, modals
- `bg-raised`: `#1F1F1F` — hover states on cards

### Primary
- `brand-blue`: `#3B82F6` — primary CTA, active nav, "Fix" in logo, links
- `brand-blue-dark`: `#2563EB` — button hover

### Pillars (fixed, never swap)
- Operations & Systems: `#3B82F6` (blue)
- Revenue & Sales: `#10B981` (green)
- Financial Structure: `#F59E0B` (orange)
- Team & Leadership: `#8B5CF6` (purple)

### Status / Severity
- Success / Complete / Adopted: `#10B981`
- In Progress / Active: `#3B82F6`
- Pending / Warning: `#F59E0B`
- Blocked / Severe / Emergency: `#EF4444`
- Neutral / Not Started: `#64748B`
- Premium / Retainer: `#D97706`

### Text (dark mode)
- Primary: `#FFFFFF`
- Secondary: `rgba(255,255,255,0.7)`
- Muted: `rgba(255,255,255,0.5)`
- Accent: `#3B82F6`

## Typography

Three font families. Fixed. No substitutions.

- **Display / Headings:** Space Grotesk Bold (700) — page titles, section headers, card titles, logo
- **Body / Interface:** DM Sans (400, 500, 700) — body text, nav, labels, buttons, captions
- **Data / Numbers:** JetBrains Mono (400, 500) — every metric card number, prices, percentages, dates/times, scores

Headlines in DM Sans = bug. Metrics in DM Sans = bug. If it's a number, it's in Mono.

### Scale

- H1: 28px Space Grotesk Bold (page titles)
- H2: 22px Space Grotesk Bold (section headers)
- H3: 18px Space Grotesk Bold (card titles)
- Body: 14px DM Sans 400
- Small: 13px DM Sans 400 (secondary text)
- Caption: 11-12px DM Sans 500 (labels, pills, uppercase)
- Metric XL: 36px JetBrains Mono 500 (big metric card numbers)
- Metric M: 13-14px JetBrains Mono (in-line data)

## Spacing

Tailwind default 4px scale. Use 4, 8, 12, 16, 24, 32, 48, 64. No half-integer values.

## Components

### MetricCard (signature component)
- `bg-surface` background, 12px border radius, 24px padding, 130px min-height
- Icon badge top-right: 36x36, 8px radius, background = `${iconColor}20` (12% opacity)
- Label top-left: DM Sans 13px weight 500, text-secondary, optional `?` tooltip
- Value bottom-left: JetBrains Mono 36px weight 500
- Secondary context below value: DM Sans 12px text-muted
- Hover: border color lightens to `rgba(255,255,255,0.16)`

### Status Badge
- Pill shape (999px radius)
- 4px vertical, 10px horizontal padding
- DM Sans 11px weight 500 uppercase with 0.05em letter-spacing
- Color: background = `${color}26` (15% opacity), text = color, border = `${color}40` (25% opacity)

### Navigation
- 240px expanded, 64px collapsed
- Active item: `brand-blue` background, white text
- Inactive: text-secondary, hover background `rgba(255,255,255,0.04)`
- Badge counts: mono font, red background on inactive, white on active

### Buttons
- Primary: `brand-blue` bg, white text, 8px radius, 10px/20px padding, DM Sans 13px weight 500
- Secondary: transparent bg, 1px border `rgba(255,255,255,0.16)`, white text
- Destructive: `#EF4444` bg, white text
- Success: `#10B981` bg, white text

### Charts (Recharts)
- Grid lines: `rgba(255,255,255,0.04)`
- Axis labels: text-muted, DM Sans 11px
- Single series: `brand-blue`
- Multi-series: pillar colors
- Tooltip: `bg-raised` bg, 1px border, 8px radius

## Anti-patterns (what we don't do)

- Gradients (flat colors only)
- Stock illustrations, emoji, 3D renders
- Multiple accent colors on one page (brand blue is THE accent)
- Animations over 200ms (this is a tool, not a presentation)
- Decorative dividers (use spacing, not lines)
- Mixing icon libraries (Lucide only)
- Unicode bullets in data (use real components)
- Rounded everything (max 12px on cards, 8px on buttons, 999px on pills, stop there)

## Motion

- Hover transitions: 150ms ease-out
- Page transitions: none (hard swap, speed > polish)
- Card load: 200ms fade-in
- Progress bars: 400ms ease-out on value change

## Visual reference

AdvisorHub (Impruvu) = reference for component patterns and layout density. NOT for branding. Screenshots live with Damon. Request before starting visual work in Phase 2.
