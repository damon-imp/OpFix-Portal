/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        'brand-blue': '#3B82F6',
        'brand-blue-dark': '#2563EB',
        'brand-blue-50': '#EFF6FF',
        'brand-blue-900': '#1E3A5F',

        // Surfaces (dark mode)
        'bg-base': '#0A0A0A',
        'bg-surface': '#141414',
        'bg-raised': '#1F1F1F',

        // Pillars (fixed, never swap)
        'pillar-operations': '#3B82F6',
        'pillar-revenue': '#10B981',
        'pillar-financial': '#F59E0B',
        'pillar-team': '#8B5CF6',

        // Status / Severity
        'status-success': '#10B981',
        'status-info': '#3B82F6',
        'status-warning': '#F59E0B',
        'status-error': '#EF4444',
        'status-neutral': '#64748B',
        'status-premium': '#D97706',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        body: ['"DM Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
