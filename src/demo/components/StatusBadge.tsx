import { tokens, fonts } from '@/lib/tokens';

interface BadgeStyle {
  bg: string;
  text: string;
  label: string;
}

const MAP: Record<string, BadgeStyle> = {
  complete: { bg: `${tokens.green}26`, text: tokens.green, label: 'Complete' },
  in_progress: { bg: `${tokens.blue}26`, text: tokens.blue, label: 'In Progress' },
  pending_approval: { bg: `${tokens.orange}26`, text: tokens.orange, label: 'Your Approval' },
  not_started: { bg: `${tokens.muted}26`, text: tokens.muted, label: 'Not Started' },
  blocked: { bg: `${tokens.red}26`, text: tokens.red, label: 'Blocked' },
  approved: { bg: `${tokens.green}26`, text: tokens.green, label: 'Approved' },
  pending: { bg: `${tokens.orange}26`, text: tokens.orange, label: 'Pending' },
  drafted: { bg: `${tokens.muted}26`, text: tokens.muted, label: 'Drafted' },
  reviewed: { bg: `${tokens.blue}26`, text: tokens.blue, label: 'Reviewed' },
  delivered: { bg: `${tokens.orange}26`, text: tokens.orange, label: 'Delivered' },
  installed: { bg: `${tokens.green}26`, text: tokens.green, label: 'Installed' },
  adopted: { bg: '#065F46', text: '#6EE7B7', label: 'Adopted' },
  pass: { bg: `${tokens.green}26`, text: tokens.green, label: 'PASS' },
  fail: { bg: `${tokens.red}26`, text: tokens.red, label: 'FAIL' },
  marginal: { bg: `${tokens.orange}26`, text: tokens.orange, label: 'MARGINAL' },
};

export function StatusBadge({ status }: { status: string }) {
  const s = MAP[status] || MAP.not_started;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: s.bg,
        color: s.text,
        fontFamily: fonts.body,
        fontSize: 11,
        fontWeight: 500,
        padding: '4px 10px',
        borderRadius: 999,
        border: `1px solid ${s.text}40`,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {s.label}
    </span>
  );
}
