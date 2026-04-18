import { ReactNode, CSSProperties } from 'react';
import { tokens, fonts } from '@/lib/tokens';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  padding?: number;
}

export function Card({ children, style = {}, padding = 24 }: CardProps) {
  return (
    <div
      style={{
        background: tokens.bgSurface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 12,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div>
        <h3
          style={{
            fontFamily: fonts.display,
            fontSize: 18,
            fontWeight: 700,
            color: tokens.textPrimary,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textMuted, margin: '4px 0 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
