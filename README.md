# OpFix Client Portal

The engagement dashboard clients see during their 90-day OpFix engagement. Hybrid architecture: GHL handles auth, messaging, booking, invoicing, and document storage. This app handles diagnostic score visualization, phase progress, SOP installation tracking, approvals, stress tests, and internal admin views.

## Status

**V1 build in progress.** A fully interactive demo lives at `/demo` for sales demos, visual reference, and design validation. Production paths (`/` for clients, `/admin` for internal) are stubs until the auth handoff with GHL is built out.

## Quick start

```bash
# Clone
git clone git@github.com:damon-imp/opfix-portal.git
cd opfix-portal

# Install
npm install

# Run dev server
npm run dev

# Open http://localhost:5173/demo to see the interactive demo
```

Node 18+ required. Vite will hot-reload on file changes.

## What's in this repo

- **`/src/demo/`** — Fully interactive demo with 8 client-facing views. Fake data hardcoded in `data.ts`. Used for sales demos, team walkthroughs, and aesthetic reference. Will be removed from production paths once V1 ships.
- **`/src/lib/tokens.ts`** — Brand color tokens from the OpFix brand kit. Authoritative source for colors in all UI.
- **`/docs/`** — Condensed architecture, design system, and build plan references pulled from the full build spec.

Full build spec lives in Drive: `opfix_client_portal_build_spec_v1_1.docx`. Read that for the complete picture.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui (being introduced in Phase 0)
- Recharts for data visualization
- Lucide React for icons
- Space Grotesk (display) + DM Sans (body) + JetBrains Mono (data) via Google Fonts

Backend and infrastructure (Supabase, Vercel, GHL integration) come online in Phase 0-1 of the build. Not in this repo yet.

## For Greg and Everett

Start here:
1. Clone this repo, run `npm install`, run `npm run dev`
2. Open `/demo` and click through every view
3. Read `/docs/ARCHITECTURE.md` to understand the GHL auth seam
4. Read `/docs/DESIGN_SYSTEM.md` for color tokens, typography, component specs
5. Read `/docs/BUILD_PLAN.md` for Phase 0 deliverables and weekly cadence

Questions or anything unclear: bring them to the Monday bandwidth check, don't silently absorb them.

## For Damon

- Demo is at `/demo` route. Share the local dev URL or deploy to Vercel preview for external viewing.
- To change fake client data for a specific demo, edit `/src/demo/data.ts`.
- Brand token changes: edit `/src/lib/tokens.ts`. Everything downstream uses those values.

## Diagnose. Fix. Scale.
