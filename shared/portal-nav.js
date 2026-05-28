/* ──────────────────────────────────────────────────────────────
   OPFIX PORTAL - SHARED NAV PARTIAL
   Drop a <div id="portal-nav" data-active="cockpit"></div> on each page.
   Active state options: cockpit | score | install | actions | vault
   ────────────────────────────────────────────────────────────── */
(function(){
  const ACTIVE = document.currentScript?.dataset.active
    || document.getElementById('portal-nav')?.dataset.active
    || 'cockpit';

  const ICONS = {
    cockpit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12L12 4l9 8M5 10v10h14V10"/></svg>',
    score:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    install: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    actions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l3 3 7-7"/><path d="M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h11"/></svg>',
    vault:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>',
    stress:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>',
    bell:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 16v-5a6 6 0 10-12 0v5l-2 3h16l-2-3z"/><path d="M10 21a2 2 0 004 0"/></svg>',
    menu:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
  };

  // Has open action items? (Greg wires this to API; static true for mock)
  const HAS_ACTIONS_ALERT = true;
  // Phase 4 unlocked? (static false for mock)
  const STRESS_UNLOCKED = false;

  const topbarHTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a href="cockpit.html" class="brand-mark" aria-label="OpFix">
          <span class="op">Op</span><span class="fix">Fix</span>
          <span class="pill">Portal</span>
        </a>
        <nav class="topbar-desktop-nav" aria-label="Primary">
          <a href="cockpit.html" class="nav-link${ACTIVE==='cockpit'?' active':''}">${ICONS.cockpit} Cockpit</a>
          <a href="score.html"   class="nav-link${ACTIVE==='score'?' active':''}">${ICONS.score} Score</a>
          <a href="install.html" class="nav-link${ACTIVE==='install'?' active':''}">${ICONS.install} Install</a>
          <a href="actions.html" class="nav-link${ACTIVE==='actions'?' active':''}">${ICONS.actions} Actions${HAS_ACTIONS_ALERT?'<span class="alert-dot"></span>':''}</a>
          <a href="vault.html"   class="nav-link${ACTIVE==='vault'?' active':''}">${ICONS.vault} Vault</a>
          <a href="stress.html" class="nav-link${ACTIVE==='stress'?' active':STRESS_UNLOCKED?'':' locked'}" ${ACTIVE==='stress'||STRESS_UNLOCKED?'':'title="Locked until Gate 3 - click to preview"'}>${ICONS.stress} Stress Test</a>
        </nav>
        <div class="topbar-utility">
          <button class="icon-btn" aria-label="Notifications">${ICONS.bell}<span class="badge"></span></button>
          <button class="icon-btn" aria-label="Menu" id="menuBtn">${ICONS.menu}</button>
        </div>
      </div>
    </header>
  `;

  const tabbarHTML = `
    <nav class="tabbar" aria-label="Primary mobile navigation">
      <div class="tabbar-inner">
        <a href="cockpit.html" class="tab${ACTIVE==='cockpit'?' active':''}">${ICONS.cockpit}<span>Cockpit</span></a>
        <a href="score.html"   class="tab${ACTIVE==='score'?' active':''}">${ICONS.score}<span>Score</span></a>
        <a href="install.html" class="tab${ACTIVE==='install'?' active':''}">${ICONS.install}<span>Install</span></a>
        <a href="actions.html" class="tab${ACTIVE==='actions'?' active':''}">${ICONS.actions}<span>Actions</span>${HAS_ACTIONS_ALERT?'<span class="alert-dot"></span>':''}</a>
        <a href="vault.html"   class="tab${ACTIVE==='vault'?' active':''}">${ICONS.vault}<span>Vault</span></a>
      </div>
    </nav>
  `;

  const mount = document.getElementById('portal-nav');
  if(mount){
    mount.outerHTML = topbarHTML + tabbarHTML;
  }else{
    document.body.insertAdjacentHTML('afterbegin', topbarHTML);
    document.body.insertAdjacentHTML('beforeend', tabbarHTML);
  }

  // Locked link styling but still navigable in demo mode
  // (Production: set STRESS_UNLOCKED true when Day 106 hits)
})();
