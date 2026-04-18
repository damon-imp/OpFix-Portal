import { useState } from 'react';
import {
  LayoutDashboard, Activity, GitBranch, BookOpen, CheckSquare, TrendingUp,
  Shield, Settings, Bell, Moon, ChevronLeft, ChevronRight, FileText, Calendar,
  MessageSquare, Download, AlertCircle, CheckCircle2, Clock, XCircle,
  ArrowUpRight, ArrowDownRight, ExternalLink, HelpCircle, Layers,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, LineChart, Line,
} from 'recharts';
import { tokens, fonts } from '@/lib/tokens';
import {
  CLIENT, PHASES, MILESTONES, APPROVALS, SOPS, PILLAR_SCORES,
  KPI_DATA, STRESS_TESTS, ACTIVITY_FEED,
} from './data';
import { MetricCard } from './components/MetricCard';
import { StatusBadge } from './components/StatusBadge';
import { Card, SectionHeader } from './components/Card';

// ===== DASHBOARD =====
function DashboardView({ setView }: { setView: (v: string) => void }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>
          {CLIENT.companyName}
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>
          {CLIENT.industry} · Active Engagement
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <MetricCard label="Engagement Day" value={`${CLIENT.engagementDay} / ${CLIENT.totalDays}`} secondary="On track" iconColor={tokens.blue} icon={Calendar} help />
        <MetricCard label="Current Phase" value={`Phase ${CLIENT.currentPhase}`} secondary={CLIENT.currentPhaseName} iconColor={tokens.orange} icon={Layers} help />
        <MetricCard label="Diagnostic Score" value={`${CLIENT.diagnosticScore} / ${CLIENT.scoreMax}`} secondary={`${CLIENT.tier} tier`} iconColor={tokens.purple} icon={Activity} help />
        <MetricCard label="Pending Approvals" value={CLIENT.pendingApprovals} secondary="Action required" iconColor={tokens.red} icon={AlertCircle} help />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionHeader title="Engagement Phase Progress" subtitle="Four phases. 90 days. No lock-in between them." />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
          {PHASES.map((phase, i) => (
            <div key={phase.num} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: i === PHASES.length - 1 ? '1' : 'auto', minWidth: 0 }}>
              <div style={{
                flex: 1,
                background: phase.status === 'complete' ? tokens.green : phase.status === 'in_progress' ? tokens.blue : tokens.bgRaised,
                border: `1px solid ${phase.status === 'complete' ? tokens.green : phase.status === 'in_progress' ? tokens.blue : tokens.border}`,
                borderRadius: 8,
                padding: 16,
                position: 'relative',
              }}>
                <div style={{ fontFamily: fonts.body, fontSize: 11, color: phase.status === 'not_started' ? tokens.textMuted : 'rgba(255,255,255,0.8)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Phase {phase.num}
                </div>
                <div style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, color: phase.status === 'not_started' ? tokens.textMuted : '#FFFFFF', marginTop: 4 }}>
                  {phase.name}
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: phase.status === 'not_started' ? tokens.textMuted : 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                  {phase.startDate} → {phase.endDate}
                </div>
                {phase.status === 'complete' && <CheckCircle2 size={14} style={{ position: 'absolute', top: 12, right: 12 }} color="white" />}
                {phase.status === 'in_progress' && <Clock size={14} style={{ position: 'absolute', top: 12, right: 12 }} color="white" />}
              </div>
              {i < PHASES.length - 1 && <ChevronRight size={16} color={tokens.textMuted} style={{ flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionHeader title="Next Milestone" subtitle="What's up next for your engagement"
            action={
              <button onClick={() => setView('progress')} style={{ background: 'transparent', border: 'none', color: tokens.blue, fontFamily: fonts.body, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View all <ArrowUpRight size={14} />
              </button>
            } />
          {MILESTONES.filter((m) => m.status === 'pending_approval' || m.status === 'in_progress').slice(0, 2).map((m) => (
            <div key={m.id} style={{ padding: '16px 0', borderBottom: `1px solid ${tokens.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, color: tokens.textPrimary }}>{m.name}</div>
                <StatusBadge status={m.status} />
              </div>
              <div style={{ display: 'flex', gap: 16, fontFamily: fonts.mono, fontSize: 11, color: tokens.textMuted }}>
                <span>Due {m.due}</span>
                <span>Owner: {m.owner === 'client' ? 'You' : m.owner === 'damon' ? 'Damon' : m.owner}</span>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <SectionHeader title="Recent Activity" subtitle="Last 7 days of engagement activity" />
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {ACTIVITY_FEED.map((a, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < ACTIVITY_FEED.length - 1 ? `1px solid ${tokens.border}` : 'none' }}>
                <div style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textPrimary, marginBottom: 4 }}>{a.event}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: tokens.textMuted }}>{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { icon: Calendar, label: 'Book a Call with Damon', sub: 'Schedule your next check-in' },
          { icon: FileText, label: 'View Full Diagnostic Report', sub: 'Interactive breakdown' },
          { icon: MessageSquare, label: 'Message Damon', sub: 'Open GHL conversation' },
        ].map((action, i) => (
          <Card key={i} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: `${tokens.blue}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <action.icon size={18} color={tokens.blue} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, color: tokens.textPrimary }}>{action.label}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 12, color: tokens.textMuted }}>{action.sub}</div>
              </div>
              <ExternalLink size={14} color={tokens.textMuted} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== DIAGNOSTIC REPORT =====
function DiagnosticView() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const pillarData = PILLAR_SCORES.map((p) => ({ name: p.name.split(' ')[0], value: p.score, color: p.color }));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>Diagnostic Report</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>
          40 factors. 4 pillars. Scored out of 240. Baseline assessment from {CLIENT.companyName}'s Phase 1 Diagnosis.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <MetricCard label="Total Score" value="142 / 240" secondary="Baseline assessment" iconColor={tokens.blue} icon={Activity} help />
        <MetricCard label="Tier" value="Rebuild" secondary="Significant gaps, fixable in 90 days" iconColor={tokens.blue} icon={Shield} help />
        <MetricCard label="Factors Flagged" value="14 / 40" secondary="Priority remediation items" iconColor={tokens.orange} icon={AlertCircle} help />
        <MetricCard label="Risk Level" value="Moderate" secondary="Concentration risk critical" iconColor={tokens.orange} icon={TrendingUp} help />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionHeader title="Four Pillars Breakdown" subtitle="Click a pillar to highlight its contribution"
          action={
            <button style={{ background: tokens.bgRaised, border: `1px solid ${tokens.border}`, color: tokens.textPrimary, fontFamily: fonts.body, fontSize: 13, padding: '8px 14px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Download size={14} /> Export PDF
            </button>
          } />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
          <div style={{ height: 280, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pillarData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={2} dataKey="value">
                  {pillarData.map((entry, i) => (<Cell key={i} fill={entry.color} stroke="none" />))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 36, fontWeight: 500, color: tokens.textPrimary, letterSpacing: '-0.02em' }}>142</div>
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: tokens.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total / 240</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PILLAR_SCORES.map((p) => (
              <div key={p.name} onClick={() => setSelectedPillar(selectedPillar === p.name ? null : p.name)}
                style={{
                  padding: 16, borderRadius: 8,
                  border: `1px solid ${selectedPillar === p.name ? p.color : tokens.border}`,
                  background: selectedPillar === p.name ? `${p.color}10` : 'transparent',
                  cursor: 'pointer', transition: 'all 150ms ease-out',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: p.color }} />
                    <span style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, color: tokens.textPrimary }}>{p.name}</span>
                  </div>
                  <span style={{ fontFamily: fonts.mono, fontSize: 16, fontWeight: 500, color: tokens.textPrimary }}>
                    {p.score}<span style={{ color: tokens.textMuted, fontSize: 13 }}> / {p.max}</span>
                  </span>
                </div>
                <div style={{ height: 4, background: tokens.bgRaised, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(p.score / p.max) * 100}%`, background: p.color, transition: 'width 400ms ease-out' }} />
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: tokens.textMuted, marginTop: 6 }}>
                  {p.flagged} factors flagged for remediation
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Critical Risk Callouts" subtitle="Issues flagged for immediate attention" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { title: 'Client Concentration Risk', color: tokens.red, detail: 'Top client = 24% of revenue. Threshold is 15%. If lost, $142K annual revenue at risk.' },
            { title: 'Cash Runway', color: tokens.orange, detail: 'Current runway: 3.1 months. OpFix threshold: 2+ months core capital. At threshold but vulnerable to revenue drop.' },
            { title: 'Founder Dependency', color: tokens.orange, detail: 'Sales pipeline and new business intake stall when founder is unavailable. Single-point-of-failure risk.' },
            { title: 'Financial Visibility', color: tokens.red, detail: 'QuickBooks unreconciled for 9+ months. Monthly close not happening. Decisions being made on stale data.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: 16, background: tokens.bgRaised, border: `1px solid ${item.color}40`, borderLeft: `3px solid ${item.color}`, borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <AlertCircle size={16} color={item.color} />
                <span style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, color: tokens.textPrimary }}>{item.title}</span>
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textSecondary, lineHeight: 1.5 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ===== PROGRESS =====
function ProgressView() {
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const filtered = filter === 'mine' ? MILESTONES.filter((m) => m.owner === 'client') : MILESTONES;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>My Engagement</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>90-day engagement progress. Every milestone. Every deliverable. Every approval.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <MetricCard label="Current Phase" value="2 of 4" secondary="Design" iconColor={tokens.blue} icon={Layers} help />
        <MetricCard label="Milestones Complete" value="5 / 11" secondary="45% of engagement" iconColor={tokens.green} icon={CheckCircle2} help />
        <MetricCard label="On-Time Rate" value="92%" secondary="This phase" iconColor={tokens.green} icon={TrendingUp} help />
        <MetricCard label="Days Remaining" value="48" secondary="Until Day 90" iconColor={tokens.orange} icon={Clock} help />
      </div>

      <Card>
        <SectionHeader title="All Milestones" subtitle="Full engagement milestone list"
          action={
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setFilter('all')} style={{ background: filter === 'all' ? tokens.blue : 'transparent', border: `1px solid ${filter === 'all' ? tokens.blue : tokens.border}`, color: tokens.textPrimary, fontFamily: fonts.body, fontSize: 12, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>All</button>
              <button onClick={() => setFilter('mine')} style={{ background: filter === 'mine' ? tokens.blue : 'transparent', border: `1px solid ${filter === 'mine' ? tokens.blue : tokens.border}`, color: tokens.textPrimary, fontFamily: fonts.body, fontSize: 12, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>My Items</button>
            </div>
          } />

        {[1, 2, 3, 4].map((phaseNum) => {
          const phaseMs = filtered.filter((m) => m.phase === phaseNum);
          if (phaseMs.length === 0) return null;
          const phaseData = PHASES.find((p) => p.num === phaseNum)!;
          return (
            <div key={phaseNum}>
              <div style={{ padding: '16px 0 8px 0', borderBottom: `1px solid ${tokens.border}`, marginBottom: 8 }}>
                <span style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 500, color: tokens.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Phase {phaseNum}: {phaseData.name}
                </span>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: tokens.textMuted, marginLeft: 12 }}>
                  {phaseData.startDate} – {phaseData.endDate}
                </span>
              </div>
              {phaseMs.map((m) => (
                <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${tokens.border}` }}>
                  <div>
                    <div style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textPrimary, fontWeight: 500 }}>{m.name}</div>
                    {m.blocker && <div style={{ fontFamily: fonts.body, fontSize: 12, color: tokens.red, marginTop: 4 }}>⚠ {m.blocker}</div>}
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 12, color: tokens.textMuted, minWidth: 80 }}>
                    {m.owner === 'client' ? 'You' : m.owner === 'damon' ? 'Damon' : m.owner}
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 12, color: m.status === 'complete' ? tokens.green : tokens.textSecondary, minWidth: 80 }}>
                    {m.status === 'complete' ? `✓ ${m.completed}` : m.due}
                  </div>
                  <div style={{ minWidth: 120, textAlign: 'right' }}>
                    <StatusBadge status={m.status} />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ===== SOPS =====
function SOPsView() {
  const categories = [
    { id: 'sales' as const, name: 'Sales', color: tokens.blue },
    { id: 'ops' as const, name: 'Operations', color: tokens.blue },
    { id: 'financial' as const, name: 'Financial', color: tokens.orange },
    { id: 'team' as const, name: 'Team', color: tokens.purple },
  ];

  const total = SOPS.length;
  const installed = SOPS.filter((s) => s.status === 'installed' || s.status === 'adopted').length;
  const adopted = SOPS.filter((s) => s.status === 'adopted').length;
  const inReview = SOPS.filter((s) => s.status === 'reviewed' || s.status === 'delivered').length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>SOP Library</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>Every procedure being installed in your business. Tracked from draft to adoption.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <MetricCard label="Total SOPs" value={total} secondary="Planned for install" iconColor={tokens.blue} icon={BookOpen} help />
        <MetricCard label="Installed" value={installed} secondary={`${Math.round((installed / total) * 100)}% complete`} iconColor={tokens.green} icon={CheckCircle2} help />
        <MetricCard label="Adopted" value={adopted} secondary="Verified in daily use" iconColor={tokens.green} icon={Shield} help />
        <MetricCard label="In Review" value={inReview} secondary="Awaiting next step" iconColor={tokens.orange} icon={Clock} help />
      </div>

      {categories.map((cat) => {
        const catSops = SOPS.filter((s) => s.category === cat.id);
        return (
          <Card key={cat.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color }} />
              <span style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: tokens.textPrimary }}>{cat.name}</span>
              <span style={{ fontFamily: fonts.mono, fontSize: 12, color: tokens.textMuted }}>{catSops.length} SOPs</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {catSops.map((sop) => (
                <div key={sop.id}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: tokens.bgRaised, borderRadius: 8, border: `1px solid ${tokens.border}`, cursor: 'pointer', transition: 'border-color 150ms ease-out' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = tokens.borderHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = tokens.border)}>
                  <span style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textPrimary, fontWeight: 500 }}>{sop.name}</span>
                  <StatusBadge status={sop.status} />
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ===== APPROVALS =====
function ApprovalsView() {
  const [decision, setDecision] = useState<Record<number, string>>({});
  const pending = APPROVALS.filter((a) => a.status === 'pending');
  const approved = APPROVALS.filter((a) => a.status === 'approved');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>Approvals</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>Every approval logged. Every decision timestamped. Complete audit trail.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
        <MetricCard label="Pending Your Review" value={pending.length} secondary="Action required" iconColor={tokens.orange} icon={AlertCircle} help />
        <MetricCard label="Approved This Engagement" value={approved.length} secondary="Signed off" iconColor={tokens.green} icon={CheckCircle2} help />
        <MetricCard label="Median Response Time" value="2.3 days" secondary="Healthy cadence" iconColor={tokens.blue} icon={Clock} help />
      </div>

      {pending.length > 0 && (
        <Card style={{ marginBottom: 16, borderLeft: `3px solid ${tokens.orange}` }}>
          <SectionHeader title="Pending Your Review" subtitle={`${pending.length} items awaiting your approval`} />
          {pending.map((a) => {
            const d = decision[a.id];
            return (
              <div key={a.id} style={{ padding: '16px 0', borderBottom: `1px solid ${tokens.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: fonts.body, fontSize: 15, fontWeight: 500, color: tokens.textPrimary, marginBottom: 4 }}>{a.name}</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 12, color: tokens.textMuted }}>Submitted {a.submitted} · {a.age} {a.age === 1 ? 'day' : 'days'} ago · Type: {a.type}</div>
                  </div>
                </div>
                {d ? (
                  <div style={{ fontFamily: fonts.body, fontSize: 13, color: d === 'approved' ? tokens.green : d === 'rejected' ? tokens.red : tokens.orange, fontWeight: 500 }}>
                    {d === 'approved' ? '✓ Approved' : d === 'rejected' ? '✗ Rejected' : '⟳ Changes Requested'} (demo)
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setDecision({ ...decision, [a.id]: 'approved' })} style={{ background: tokens.green, border: 'none', color: 'white', fontFamily: fonts.body, fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}>Approve</button>
                    <button onClick={() => setDecision({ ...decision, [a.id]: 'changes' })} style={{ background: 'transparent', border: `1px solid ${tokens.orange}`, color: tokens.orange, fontFamily: fonts.body, fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}>Request Changes</button>
                    <button onClick={() => setDecision({ ...decision, [a.id]: 'rejected' })} style={{ background: 'transparent', border: `1px solid ${tokens.red}`, color: tokens.red, fontFamily: fonts.body, fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}>Reject</button>
                  </div>
                )}
              </div>
            );
          })}
        </Card>
      )}

      <Card>
        <SectionHeader title="Approval History" subtitle="Complete record of all approvals submitted during this engagement" />
        {approved.map((a) => (
          <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${tokens.border}` }}>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textPrimary, fontWeight: 500 }}>{a.name}</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, color: tokens.textMuted, marginTop: 2 }}>Submitted {a.submitted} · Responded in {a.age} days</div>
            </div>
            <StatusBadge status={a.status} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// ===== KPIS =====
function KPIsView() {
  const latest = KPI_DATA[KPI_DATA.length - 1];
  const baseline = KPI_DATA[0];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>Engagement KPIs</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>The numbers that define whether the engagement worked. Updated weekly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <MetricCard label="Close Rate" value={`${latest.closeRate}%`} secondary={`${baseline.closeRate}% → 35% target`} iconColor={tokens.green} icon={ArrowUpRight} help />
        <MetricCard label="Pipeline Value" value={`$${latest.pipeline}K`} secondary="Dead pipeline clearing" iconColor={tokens.blue} icon={ArrowDownRight} help />
        <MetricCard label="Top Client %" value={`${latest.concentration}%`} secondary="Target <15%" iconColor={tokens.orange} icon={ArrowDownRight} help />
        <MetricCard label="Cash Runway" value={`${latest.runway}mo`} secondary="Target 3.0+ months" iconColor={tokens.green} icon={ArrowUpRight} help />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionHeader title="Close Rate Trend" subtitle="Homeowner close rate, weekly (baseline 21% → target 35%)" />
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={KPI_DATA}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill: tokens.textMuted, fontFamily: fonts.body, fontSize: 11 }} />
              <YAxis tick={{ fill: tokens.textMuted, fontFamily: fonts.body, fontSize: 11 }} />
              <Tooltip contentStyle={{ background: tokens.bgRaised, border: `1px solid ${tokens.border}`, borderRadius: 8, fontFamily: fonts.body }} />
              <Line type="monotone" dataKey="closeRate" stroke={tokens.blue} strokeWidth={2} dot={{ fill: tokens.blue, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionHeader title="Pipeline & Concentration" subtitle="Pipeline dollar value + top client % of revenue" />
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={KPI_DATA}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: tokens.textMuted, fontFamily: fonts.body, fontSize: 11 }} />
                <YAxis tick={{ fill: tokens.textMuted, fontFamily: fonts.body, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: tokens.bgRaised, border: `1px solid ${tokens.border}`, borderRadius: 8 }} />
                <Line type="monotone" dataKey="pipeline" stroke={tokens.orange} strokeWidth={2} dot={{ fill: tokens.orange, r: 3 }} />
                <Line type="monotone" dataKey="concentration" stroke={tokens.purple} strokeWidth={2} dot={{ fill: tokens.purple, r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Cash Runway" subtitle="Months of operating expenses in core capital" />
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={KPI_DATA}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: tokens.textMuted, fontFamily: fonts.body, fontSize: 11 }} />
                <YAxis tick={{ fill: tokens.textMuted, fontFamily: fonts.body, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: tokens.bgRaised, border: `1px solid ${tokens.border}`, borderRadius: 8 }} />
                <Bar dataKey="runway" fill={tokens.green} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ===== STRESS TESTS =====
function StressTestView() {
  const passed = STRESS_TESTS.filter((t) => t.result === 'pass').length;
  const failed = STRESS_TESTS.filter((t) => t.result === 'fail').length;
  const marginal = STRESS_TESTS.filter((t) => t.result === 'marginal').length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>Stress Test Results</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>Phase 4 Lock. We break the business on paper so it doesn't break in reality.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
        <MetricCard label="Tests Passed" value={`${passed} / ${STRESS_TESTS.length}`} secondary="Business resilient" iconColor={tokens.green} icon={CheckCircle2} help />
        <MetricCard label="Tests Failed" value={`${failed} / ${STRESS_TESTS.length}`} secondary="Remediation required" iconColor={tokens.red} icon={XCircle} help />
        <MetricCard label="Marginal" value={`${marginal} / ${STRESS_TESTS.length}`} secondary="Monitoring needed" iconColor={tokens.orange} icon={AlertCircle} help />
        <MetricCard label="Retainer Recommended" value="Growth" iconColor={tokens.purple} icon={Shield} help secondary="See remediation anchor below" />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionHeader title="Failed & Marginal Tests" subtitle="Issues that surfaced under stress. These drive the retainer recommendation." />
        {STRESS_TESTS.filter((t) => t.result !== 'pass').map((t) => (
          <div key={t.id} style={{ padding: '16px 0', borderBottom: `1px solid ${tokens.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, color: tokens.textPrimary, marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, color: tokens.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.category}</div>
              </div>
              <StatusBadge status={t.result} />
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textSecondary, lineHeight: 1.6, marginTop: 8 }}>{t.detail}</div>
          </div>
        ))}
      </Card>

      <Card style={{ marginBottom: 16, borderLeft: `3px solid ${tokens.purple}`, background: `${tokens.purple}08` }}>
        <SectionHeader title="Retainer Recommendation: Growth Tier" subtitle="Based on stress test outcomes, here's what ongoing support addresses." />
        <div style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textSecondary, lineHeight: 1.7, marginTop: 12 }}>
          Your business passes {passed} of {STRESS_TESTS.length} stress tests. The {failed} failures cluster in financial resilience (concentration risk, revenue-drop runway) and team redundancy (key-person risk).
          <br /><br />
          The Growth retainer addresses these directly: monthly financial review with concentration tracking, active sales pipeline management to reduce single-client dependency, and quarterly team redundancy planning.
          <br /><br />
          If these aren't addressed, the operational gains from Phase 1-3 are at risk when stress arrives.
        </div>
        <button style={{ background: tokens.purple, border: 'none', color: 'white', fontFamily: fonts.body, fontSize: 14, fontWeight: 500, padding: '10px 20px', borderRadius: 8, cursor: 'pointer', marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          View Growth Retainer Proposal <ArrowUpRight size={16} />
        </button>
      </Card>

      <Card>
        <SectionHeader title="Tests Passed" subtitle={`${passed} stress tests confirm business resilience in these areas`} />
        {STRESS_TESTS.filter((t) => t.result === 'pass').map((t) => (
          <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${tokens.border}` }}>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textPrimary }}>{t.name}</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, color: tokens.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{t.category}</div>
            </div>
            <StatusBadge status={t.result} />
          </div>
        ))}
      </Card>
    </div>
  );
}

// ===== SETTINGS =====
function SettingsView() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, color: tokens.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textMuted, margin: '4px 0 0 0' }}>Account and preferences</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <SectionHeader title="Profile" subtitle="Your account details" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Name', value: CLIENT.userName },
              { label: 'Email', value: CLIENT.userEmail, locked: true },
              { label: 'Role', value: 'Owner' },
              { label: 'Company', value: CLIENT.companyName, locked: true },
            ].map((field, i) => (
              <div key={i}>
                <div style={{ fontFamily: fonts.body, fontSize: 11, color: tokens.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{field.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: tokens.bgRaised, borderRadius: 6, border: `1px solid ${tokens.border}` }}>
                  <span style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textPrimary, flex: 1 }}>{field.value}</span>
                  {field.locked && <span style={{ fontFamily: fonts.body, fontSize: 11, color: tokens.textMuted }}>Synced from GHL</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Notification Preferences" subtitle="How you want to hear from us" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Email on approval requests', enabled: true },
              { label: 'Email on phase transitions', enabled: true },
              { label: 'Email on milestone completions', enabled: false },
              { label: 'Weekly digest summary', enabled: true },
              { label: 'SMS for urgent items', enabled: false },
            ].map((pref, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? `1px solid ${tokens.border}` : 'none' }}>
                <span style={{ fontFamily: fonts.body, fontSize: 14, color: tokens.textPrimary }}>{pref.label}</span>
                <div style={{ width: 36, height: 20, borderRadius: 999, background: pref.enabled ? tokens.blue : tokens.bgRaised, position: 'relative', cursor: 'pointer', transition: 'background 150ms', border: `1px solid ${pref.enabled ? tokens.blue : tokens.border}` }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: pref.enabled ? 18 : 2, transition: 'left 150ms ease-out' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ===== MAIN SHELL =====
export default function DemoPortal() {
  const [view, setView] = useState('dashboard');
  const [navCollapsed, setNavCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'progress', icon: GitBranch, label: 'My Engagement' },
    { id: 'diagnostic', icon: Activity, label: 'Diagnostic Report' },
    { id: 'sops', icon: BookOpen, label: 'SOP Library' },
    { id: 'approvals', icon: CheckSquare, label: 'Approvals', badge: CLIENT.pendingApprovals },
    { id: 'kpis', icon: TrendingUp, label: 'Engagement KPIs' },
    { id: 'stress', icon: Shield, label: 'Stress Tests' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const viewMap: Record<string, React.ReactNode> = {
    dashboard: <DashboardView setView={setView} />,
    diagnostic: <DiagnosticView />,
    progress: <ProgressView />,
    sops: <SOPsView />,
    approvals: <ApprovalsView />,
    kpis: <KPIsView />,
    stress: <StressTestView />,
    settings: <SettingsView />,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: tokens.bgBase, fontFamily: fonts.body, color: tokens.textPrimary }}>
      <div style={{ width: navCollapsed ? 64 : 240, background: tokens.bgBase, borderRight: `1px solid ${tokens.border}`, display: 'flex', flexDirection: 'column', padding: '20px 12px', transition: 'width 200ms ease-out', flexShrink: 0 }}>
        <div style={{ padding: '4px 8px 24px 8px', display: 'flex', alignItems: 'center', justifyContent: navCollapsed ? 'center' : 'flex-start' }}>
          {navCollapsed ? (
            <span style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em' }}>
              <span style={{ color: tokens.textPrimary }}>O</span><span style={{ color: tokens.blue, fontStyle: 'italic' }}>F</span>
            </span>
          ) : (
            <div>
              <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
                <span style={{ color: tokens.textPrimary }}>Op</span><span style={{ color: tokens.blue, fontStyle: 'italic' }}>Fix</span>
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 9, color: tokens.textMuted, letterSpacing: '0.15em', marginTop: 2, textTransform: 'uppercase' }}>We Fix Operations</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {navItems.map((item) => {
            const active = view === item.id;
            return (
              <button key={item.id} onClick={() => setView(item.id)}
                style={{ background: active ? tokens.blue : 'transparent', border: 'none', color: active ? 'white' : tokens.textSecondary, fontFamily: fonts.body, fontSize: 13, fontWeight: active ? 500 : 400, padding: '10px 12px', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', transition: 'background 150ms ease-out' }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                <item.icon size={16} strokeWidth={1.75} />
                {!navCollapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                {!navCollapsed && item.badge && (
                  <span style={{ background: active ? 'rgba(255,255,255,0.25)' : tokens.red, color: 'white', fontFamily: fonts.mono, fontSize: 10, padding: '2px 6px', borderRadius: 999, fontWeight: 500 }}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        <button onClick={() => setNavCollapsed(!navCollapsed)}
          style={{ background: 'transparent', border: `1px solid ${tokens.border}`, color: tokens.textMuted, padding: 8, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
          {navCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ height: 56, borderBottom: `1px solid ${tokens.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: tokens.bgBase, flexShrink: 0 }}>
          <div style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textMuted }}>
            <span>Portal</span>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: tokens.textPrimary }}>{navItems.find((n) => n.id === view)?.label}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ background: 'transparent', border: 'none', color: tokens.textSecondary, cursor: 'pointer', padding: 6, position: 'relative', display: 'flex' }}>
              <Bell size={16} />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, background: tokens.red, borderRadius: '50%' }} />
            </button>
            <button style={{ background: 'transparent', border: 'none', color: tokens.textSecondary, cursor: 'pointer', padding: 6, display: 'flex' }}>
              <Moon size={16} />
            </button>
            <div style={{ width: 1, height: 20, background: tokens.border }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: tokens.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.body, fontSize: 12, fontWeight: 500 }}>{CLIENT.userInitials}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, color: tokens.textPrimary }}>{CLIENT.userName}</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: 24, overflow: 'auto', maxWidth: '100%' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {viewMap[view]}
          </div>
        </div>
      </div>
    </div>
  );
}
