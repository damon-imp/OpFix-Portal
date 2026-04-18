// OpFix brand tokens
// Authoritative source. Change here, propagates everywhere.
// Mirrors Tailwind config in tailwind.config.js + design system spec Section 5.5

export const tokens = {
  // Backgrounds
  bgBase: '#0A0A0A',
  bgSurface: '#141414',
  bgRaised: '#1F1F1F',

  // Borders
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.16)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.5)',

  // Brand
  blue: '#3B82F6',
  blueDark: '#2563EB',
  blue50: '#EFF6FF',
  blue900: '#1E3A5F',

  // Pillars (fixed, never swap)
  pillar: {
    operations: '#3B82F6',
    revenue: '#10B981',
    financial: '#F59E0B',
    team: '#8B5CF6',
  },

  // Status
  status: {
    success: '#10B981',
    info: '#3B82F6',
    warning: '#F59E0B',
    error: '#EF4444',
    neutral: '#64748B',
    premium: '#D97706',
  },

  // Semantic aliases (use these in code)
  green: '#10B981',
  orange: '#F59E0B',
  red: '#EF4444',
  purple: '#8B5CF6',
  muted: '#64748B',
  gold: '#D97706',
} as const;

export const fonts = {
  display: "'Space Grotesk', 'Inter', -apple-system, sans-serif",
  body: "'DM Sans', 'Inter', -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'Menlo', 'Monaco', monospace",
} as const;

export type PillarKey = keyof typeof tokens.pillar;
export type StatusKey = keyof typeof tokens.status;
