/* ──────────────────────────────────────────────────────────────
   OPFIX ADMIN - DEMO HELPERS
   Provides edit affordance toasts + sample data exposure.
   Production: replace with real API calls + inline editors.
   ────────────────────────────────────────────────────────────── */
(function(){

  // ── ADMIN TOAST ──
  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  toast.innerHTML = '<span class="dot"></span><span class="msg"></span>';
  document.body.appendChild(toast);

  let toastTimer = null;
  window.showAdminToast = function(msg){
    toast.querySelector('.msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'), 2400);
  };

  // ── INTERCEPT EDITABLE CLICKS ──
  document.addEventListener('click', function(e){
    const editable = e.target.closest('.editable');
    if(editable){
      e.preventDefault();
      const label = editable.dataset.field || editable.textContent.trim().slice(0,40);
      window.showAdminToast(`Edit · ${label} · saves to GHL + Supabase via PATCH`);
      return;
    }

    // Intercept dead admin buttons
    const btn = e.target.closest('.admin-btn, .queue-action, [data-admin-action]');
    if(btn && (btn.tagName === 'BUTTON' || btn.getAttribute('href') === '#')){
      e.preventDefault();
      const label = btn.dataset.adminAction || btn.textContent.trim().slice(0,50);
      window.showAdminToast(`${label} · API hook ready, wiring deferred`);
      return;
    }
  });

  // ── ADMIN SAMPLE DATA (exposed for future use) ──
  window.ADMIN_CLIENTS = [
    {
      id: 'acme', company: 'Acme Operations', founder: 'John Smith',
      phase: 3, phase_name: 'Build', day: 67, total_days: 180,
      days_to_next_gate: 38, next_gate: 'G3',
      score: 168, score_baseline: 142, score_delta: 26,
      pillars: { ops: 43, rev: 40, fin: 37, team: 48 },
      open_actions: 3, overdue_actions: 1, opfix_queue: 5,
      last_login: '2h ago', status: 'active', tier: 'Rebuild',
      payment_status: 'current', timezone: 'America/Los_Angeles'
    },
    {
      id: 'cypress', company: 'Cypress Holdings', founder: 'Marisol Reyes',
      phase: 1, phase_name: 'Diagnose', day: 14, total_days: 180,
      days_to_next_gate: 7, next_gate: 'G1',
      score: 142, score_baseline: 142, score_delta: 0,
      pillars: { ops: 36, rev: 34, fin: 31, team: 41 },
      open_actions: 2, overdue_actions: 0, opfix_queue: 6,
      last_login: '1d ago', status: 'active', tier: 'Rebuild',
      payment_status: 'current', timezone: 'America/Chicago'
    },
    {
      id: 'riverstone', company: 'Riverstone Industries', founder: 'Daniel Park',
      phase: 4, phase_name: 'Lock', day: 142, total_days: 180,
      days_to_next_gate: 38, next_gate: 'G4',
      score: 198, score_baseline: 155, score_delta: 43,
      pillars: { ops: 52, rev: 48, fin: 47, team: 51 },
      open_actions: 1, overdue_actions: 0, opfix_queue: 3,
      last_login: '4h ago', status: 'active', tier: 'Rebuild',
      payment_status: 'current'
    },
    {
      id: 'pinnacle', company: 'Pinnacle Logistics', founder: 'Anya Chen',
      phase: 3, phase_name: 'Build', day: 95, total_days: 180,
      days_to_next_gate: 10, next_gate: 'G3',
      score: 175, score_baseline: 148, score_delta: 27,
      pillars: { ops: 45, rev: 42, fin: 40, team: 48 },
      open_actions: 4, overdue_actions: 2, opfix_queue: 8,
      last_login: '5d ago', status: 'warning', tier: 'Rebuild',
      payment_status: 'current'
    },
    {
      id: 'beacon', company: 'Beacon Systems', founder: 'Marcus Webb',
      phase: 4, phase_name: 'Lock', day: 178, total_days: 180,
      days_to_next_gate: 2, next_gate: 'G4',
      score: 215, score_baseline: 162, score_delta: 53,
      pillars: { ops: 56, rev: 53, fin: 52, team: 54 },
      open_actions: 1, overdue_actions: 0, opfix_queue: 0,
      last_login: '6h ago', status: 'active', tier: 'Overhaul',
      payment_status: 'current'
    }
  ];

  window.ADMIN_QUEUE = [
    { id: 'q1',  client_id: 'acme',       client: 'Acme Operations',      title: 'Revenue Forecast Dashboard build',     pillar: 'p2', type: 'build',  eta_day: 74,  days_to: 7,  sprint: 2, status: 'in_progress' },
    { id: 'q2',  client_id: 'acme',       client: 'Acme Operations',      title: 'SOP-05: Operational Reporting Cadence', pillar: 'p1', type: 'draft',  eta_day: 82,  days_to: 15, sprint: 2, status: 'in_progress' },
    { id: 'q3',  client_id: 'acme',       client: 'Acme Operations',      title: 'SOP-06: Margin Reporting',              pillar: 'p3', type: 'queued', eta_day: 89,  days_to: 22, sprint: 3, status: 'queued' },
    { id: 'q4',  client_id: 'acme',       client: 'Acme Operations',      title: 'Ops Manager job posting + sourcing',    pillar: 'p4', type: 'draft',  eta_day: 78,  days_to: 11, sprint: 2, status: 'in_progress' },
    { id: 'q5',  client_id: 'acme',       client: 'Acme Operations',      title: 'Pipeline visibility rebuild',           pillar: 'p2', type: 'queued', eta_day: 95,  days_to: 28, sprint: 3, status: 'queued' },
    { id: 'q6',  client_id: 'cypress',    client: 'Cypress Holdings',     title: 'X-Ray Baseline Report',                 pillar: null, type: 'build',  eta_day: 21,  days_to: 7,  sprint: 1, status: 'in_progress' },
    { id: 'q7',  client_id: 'cypress',    client: 'Cypress Holdings',     title: 'Quick win: cash flow visibility',       pillar: 'p3', type: 'build',  eta_day: 18,  days_to: 4,  sprint: 1, status: 'in_progress' },
    { id: 'q8',  client_id: 'cypress',    client: 'Cypress Holdings',     title: 'Stakeholder interview round 2',         pillar: null, type: 'draft',  eta_day: 19,  days_to: 5,  sprint: 1, status: 'queued' },
    { id: 'q9',  client_id: 'cypress',    client: 'Cypress Holdings',     title: 'Full Diagnosis Report compile',         pillar: null, type: 'queued', eta_day: 21,  days_to: 7,  sprint: 1, status: 'queued' },
    { id: 'q10', client_id: 'cypress',    client: 'Cypress Holdings',     title: 'Phase 2 Design Plan draft',             pillar: null, type: 'queued', eta_day: 28,  days_to: 14, sprint: 2, status: 'queued' },
    { id: 'q11', client_id: 'cypress',    client: 'Cypress Holdings',     title: 'Pillar-by-pillar priority matrix',      pillar: null, type: 'queued', eta_day: 30,  days_to: 16, sprint: 2, status: 'queued' },
    { id: 'q12', client_id: 'riverstone', client: 'Riverstone Industries',title: 'Stress Test 2 prep + scenario design',  pillar: null, type: 'build',  eta_day: 155, days_to: 13, sprint: 4, status: 'in_progress' },
    { id: 'q13', client_id: 'riverstone', client: 'Riverstone Industries',title: 'Final Operating Report compile',        pillar: null, type: 'draft',  eta_day: 175, days_to: 33, sprint: 4, status: 'queued' },
    { id: 'q14', client_id: 'riverstone', client: 'Riverstone Industries',title: 'Refinement: SOP-04 cash cadence v2',    pillar: 'p3', type: 'build',  eta_day: 148, days_to: 6,  sprint: 4, status: 'in_progress' },
    { id: 'q15', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'Customer concentration risk dashboard', pillar: 'p2', type: 'build',  eta_day: 100, days_to: 5,  sprint: 3, status: 'in_progress' },
    { id: 'q16', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'SOP-04: Inventory turnover cadence',    pillar: 'p1', type: 'build',  eta_day: 102, days_to: 7,  sprint: 3, status: 'blocked' },
    { id: 'q17', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'Phase 3 Build Report compile',          pillar: null, type: 'draft',  eta_day: 105, days_to: 10, sprint: 3, status: 'queued' },
    { id: 'q18', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'Team scorecard: VP Ops candidate',      pillar: 'p4', type: 'draft',  eta_day: 98,  days_to: 3,  sprint: 3, status: 'in_progress' },
    { id: 'q19', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'CFO interview round',                   pillar: 'p4', type: 'queued', eta_day: 108, days_to: 13, sprint: 3, status: 'queued' },
    { id: 'q20', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'Pre-Lock readiness checklist',          pillar: null, type: 'queued', eta_day: 105, days_to: 10, sprint: 3, status: 'queued' },
    { id: 'q21', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'Gate 3 Review deck prep',               pillar: null, type: 'queued', eta_day: 105, days_to: 10, sprint: 3, status: 'queued' },
    { id: 'q22', client_id: 'pinnacle',   client: 'Pinnacle Logistics',   title: 'Refinement: pricing model v3',          pillar: 'p2', type: 'queued', eta_day: 110, days_to: 15, sprint: 4, status: 'queued' }
  ];

})();
