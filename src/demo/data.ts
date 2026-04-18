// Demo data for the OpFix Client Portal.
// Change CLIENT.companyName etc. to customize for a specific demo.

export const CLIENT = {
  companyName: 'Apex Industrial Services',
  industry: 'Commercial HVAC',
  engagementDay: 42,
  totalDays: 90,
  currentPhase: 2,
  currentPhaseName: 'Design',
  diagnosticScore: 142,
  scoreMax: 240,
  tier: 'Rebuild',
  pendingApprovals: 2,
  userName: 'Alex Morrison',
  userInitials: 'AM',
  userEmail: 'alex@apexindustrial.com',
};

export type PhaseStatus = 'complete' | 'in_progress' | 'not_started' | 'blocked';

export interface Phase {
  num: number;
  name: string;
  status: PhaseStatus;
  startDate: string;
  endDate: string;
}

export const PHASES: Phase[] = [
  { num: 1, name: 'Diagnose', status: 'complete', startDate: 'Mar 1', endDate: 'Mar 14' },
  { num: 2, name: 'Design', status: 'in_progress', startDate: 'Mar 15', endDate: 'Apr 11' },
  { num: 3, name: 'Build', status: 'not_started', startDate: 'Apr 12', endDate: 'May 23' },
  { num: 4, name: 'Lock', status: 'not_started', startDate: 'May 24', endDate: 'May 30' },
];

export type MilestoneStatus =
  | 'complete' | 'in_progress' | 'pending_approval'
  | 'not_started' | 'blocked' | 'approved';

export interface Milestone {
  id: number;
  name: string;
  phase: number;
  owner: 'damon' | 'client' | 'greg' | 'everett' | 'shared';
  status: MilestoneStatus;
  due: string;
  completed?: string;
  blocker?: string;
}

export const MILESTONES: Milestone[] = [
  { id: 1, name: 'Stakeholder interviews complete', phase: 1, owner: 'damon', status: 'complete', due: 'Mar 8', completed: 'Mar 7' },
  { id: 2, name: 'Diagnostic Report delivered', phase: 1, owner: 'damon', status: 'complete', due: 'Mar 14', completed: 'Mar 14' },
  { id: 3, name: 'Sales pipeline SOP drafted', phase: 2, owner: 'damon', status: 'complete', due: 'Mar 22', completed: 'Mar 21' },
  { id: 4, name: 'Approve Sales Pipeline SOP', phase: 2, owner: 'client', status: 'pending_approval', due: 'Mar 28' },
  { id: 5, name: 'Ops Manager hire profile drafted', phase: 2, owner: 'damon', status: 'complete', due: 'Apr 2', completed: 'Apr 1' },
  { id: 6, name: 'Approve Ops Manager Hire Profile', phase: 2, owner: 'client', status: 'pending_approval', due: 'Apr 8' },
  { id: 7, name: 'Profit First banking structure installed', phase: 2, owner: 'shared', status: 'in_progress', due: 'Apr 11' },
  { id: 8, name: 'Weekly scorecard KPIs defined', phase: 2, owner: 'damon', status: 'in_progress', due: 'Apr 11' },
  { id: 9, name: 'Client delivery SOP drafted', phase: 3, owner: 'damon', status: 'not_started', due: 'Apr 18' },
  { id: 10, name: 'CRM pipeline built in GHL', phase: 3, owner: 'greg', status: 'not_started', due: 'Apr 25' },
  { id: 11, name: 'Financial dashboard installed', phase: 3, owner: 'everett', status: 'blocked', due: 'Apr 28', blocker: 'Awaiting QuickBooks access' },
];

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'revision_requested';

export interface Approval {
  id: number;
  name: string;
  type: 'sop' | 'hire_profile' | 'deliverable' | 'plan';
  submitted: string;
  age: number;
  status: ApprovalStatus;
}

export const APPROVALS: Approval[] = [
  { id: 1, name: 'Sales Pipeline SOP', type: 'sop', submitted: 'Mar 24', age: 3, status: 'pending' },
  { id: 2, name: 'Ops Manager Hire Profile', type: 'hire_profile', submitted: 'Apr 4', age: 1, status: 'pending' },
  { id: 3, name: 'Diagnostic Report v1', type: 'deliverable', submitted: 'Mar 14', age: 14, status: 'approved' },
  { id: 4, name: 'Phase 2 Design Plan', type: 'plan', submitted: 'Mar 16', age: 12, status: 'approved' },
  { id: 5, name: 'Profit First Banking Plan', type: 'plan', submitted: 'Mar 30', age: 7, status: 'approved' },
];

export type SOPStatus = 'drafted' | 'reviewed' | 'delivered' | 'installed' | 'adopted';
export type SOPCategory = 'sales' | 'ops' | 'financial' | 'team';

export interface SOP {
  id: number;
  name: string;
  category: SOPCategory;
  status: SOPStatus;
}

export const SOPS: SOP[] = [
  { id: 1, name: 'Sales Pipeline SOP', category: 'sales', status: 'reviewed' },
  { id: 2, name: 'Lead Qualification Script', category: 'sales', status: 'delivered' },
  { id: 3, name: 'Discovery Call Framework', category: 'sales', status: 'installed' },
  { id: 4, name: 'Proposal Template System', category: 'sales', status: 'drafted' },
  { id: 5, name: 'Client Onboarding SOP', category: 'ops', status: 'installed' },
  { id: 6, name: 'Daily Operations Checklist', category: 'ops', status: 'adopted' },
  { id: 7, name: 'Weekly L10 Meeting Cadence', category: 'ops', status: 'adopted' },
  { id: 8, name: 'Service Delivery Standards', category: 'ops', status: 'installed' },
  { id: 9, name: 'Quality Control Process', category: 'ops', status: 'delivered' },
  { id: 10, name: 'Profit First Banking Structure', category: 'financial', status: 'installed' },
  { id: 11, name: 'Monthly Financial Review', category: 'financial', status: 'reviewed' },
  { id: 12, name: 'AR Collections Process', category: 'financial', status: 'drafted' },
  { id: 13, name: 'Pricing Review Cadence', category: 'financial', status: 'drafted' },
  { id: 14, name: 'Hire Profile Template', category: 'team', status: 'installed' },
  { id: 15, name: 'Performance Review Structure', category: 'team', status: 'delivered' },
  { id: 16, name: 'Accountability Chart', category: 'team', status: 'adopted' },
  { id: 17, name: 'Weekly 1:1 Framework', category: 'team', status: 'reviewed' },
];

export interface PillarScore {
  name: string;
  score: number;
  max: number;
  color: string;
  flagged: number;
}

export const PILLAR_SCORES: PillarScore[] = [
  { name: 'Operations & Systems', score: 38, max: 60, color: '#3B82F6', flagged: 3 },
  { name: 'Revenue & Sales', score: 32, max: 60, color: '#10B981', flagged: 4 },
  { name: 'Financial Structure', score: 28, max: 60, color: '#F59E0B', flagged: 5 },
  { name: 'Team & Leadership', score: 44, max: 60, color: '#8B5CF6', flagged: 2 },
];

export interface KPIWeek {
  week: string;
  closeRate: number;
  pipeline: number;
  concentration: number;
  runway: number;
}

export const KPI_DATA: KPIWeek[] = [
  { week: 'W1', closeRate: 21, pipeline: 208, concentration: 30, runway: 1.8 },
  { week: 'W2', closeRate: 21, pipeline: 205, concentration: 30, runway: 1.9 },
  { week: 'W3', closeRate: 22, pipeline: 198, concentration: 29, runway: 2.1 },
  { week: 'W4', closeRate: 23, pipeline: 185, concentration: 28, runway: 2.3 },
  { week: 'W5', closeRate: 25, pipeline: 168, concentration: 27, runway: 2.6 },
  { week: 'W6', closeRate: 28, pipeline: 142, concentration: 24, runway: 3.1 },
];

export type StressResult = 'pass' | 'fail' | 'marginal';

export interface StressTest {
  id: number;
  name: string;
  category: 'financial' | 'ops' | 'sales' | 'team';
  result: StressResult;
  detail: string;
}

export const STRESS_TESTS: StressTest[] = [
  { id: 1, name: 'Cash runway under 3 months revenue drop', category: 'financial', result: 'fail', detail: 'Current runway 3.1mo, but stress scenario (30% revenue drop) drops it to 1.8mo. Below threshold.' },
  { id: 2, name: 'Loss of top client (>20% revenue)', category: 'financial', result: 'fail', detail: 'Top client still represents 24% of revenue. Concentration risk above 15% threshold.' },
  { id: 3, name: 'Founder unavailable for 2 weeks', category: 'ops', result: 'marginal', detail: 'Daily ops continue. Sales pipeline stalls. New business intake breaks.' },
  { id: 4, name: 'Key technician resigns', category: 'team', result: 'fail', detail: 'No documented cross-training. 40% of service capacity affected.' },
  { id: 5, name: 'Weekly L10 meeting runs without founder', category: 'team', result: 'pass', detail: 'Ops manager runs it. Scorecard reviewed. Issues escalated properly.' },
  { id: 6, name: 'Close rate under 20%', category: 'sales', result: 'pass', detail: 'Close rate at 28% and trending up.' },
  { id: 7, name: 'Monthly financials close within 10 days', category: 'financial', result: 'pass', detail: 'Close now happening Day 7 consistently.' },
];

export const ACTIVITY_FEED = [
  { time: '2 hours ago', event: 'Damon submitted Ops Manager Hire Profile for your approval', link: true },
  { time: 'Yesterday', event: 'Milestone completed: Ops Manager Hire Profile drafted' },
  { time: 'Yesterday', event: 'Weekly KPI update: Close rate up to 28% (+3% vs last week)' },
  { time: '3 days ago', event: 'Milestone completed: Sales pipeline SOP drafted' },
  { time: '3 days ago', event: 'You approved: Profit First Banking Plan' },
  { time: '1 week ago', event: 'Milestone completed: Stakeholder interviews complete' },
  { time: '1 week ago', event: 'Diagnostic Report v1 delivered' },
];
