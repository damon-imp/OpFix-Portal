import { LucideIcon, HelpCircle } from 'lucide-react';
import { tokens, fonts } from '@/lib/tokens';

interface MetricCardProps {
  label: string;
  value: string | number;
  secondary?: string;
  iconColor?: string;
  icon?: LucideIcon;
  help?: boolean;
}

export function MetricCard({ label, value, secondary, iconColor = tokens.blue, icon: Icon, help }: MetricCardProps) {
  return (
    <div
      style={{
        background: tokens.bgSurface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 12,
        padding: 24,
        minHeight: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'border-color 150ms ease-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = tokens.borderHover)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = tokens.border)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textSecondary, fontWeight: 500 }}>{label}</span>
          {help && <HelpCircle size={13} color={tokens.textMuted} />}
        </div>
        {Icon && (
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: `${iconColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={18} color={iconColor} strokeWidth={2} />
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 36,
            fontWeight: 500,
            color: tokens.textPrimary,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </div>
        {secondary && (
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: tokens.textMuted, marginTop: 8 }}>
            {secondary}
          </div>
        )}
      </div>
    </div>
  );
}
