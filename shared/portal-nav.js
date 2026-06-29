/* ──────────────────────────────────────────────────────────────
   OPFIX PORTAL - SHARED NAV PARTIAL
   Drop a <div id="portal-nav" data-active="hub"></div> on each page.
   Active state options: hub | score | install | actions | vault | stress
   ────────────────────────────────────────────────────────────── */
(function(){
  const ACTIVE = document.currentScript?.dataset.active
    || document.getElementById('portal-nav')?.dataset.active
    || 'hub';

  const ICONS = {
    hub:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12L12 4l9 8M5 10v10h14V10"/></svg>',
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
        <a href="hub.html" class="brand-mark" aria-label="OpFix Hub">
          <img src="shared/opfix-logo.svg" alt="OpFix" class="brand-logo">
        </a>
        <nav class="topbar-desktop-nav" aria-label="Primary">
          <a href="hub.html"     class="nav-link${ACTIVE==='hub'?' active':''}">${ICONS.hub} Hub</a>
          <a href="score.html"   class="nav-link${ACTIVE==='score'?' active':''}">${ICONS.score} Score</a>
          <a href="install.html" class="nav-link${ACTIVE==='install'?' active':''}">${ICONS.install} Install</a>
          <a href="actions.html" class="nav-link${ACTIVE==='actions'?' active':''}">${ICONS.actions} Actions${HAS_ACTIONS_ALERT?'<span class="alert-dot"></span>':''}</a>
          <a href="vault.html"   class="nav-link${ACTIVE==='vault'?' active':''}">${ICONS.vault} Vault</a>
          <a href="stress.html" class="nav-link${ACTIVE==='stress'?' active':STRESS_UNLOCKED?'':' locked'}" ${ACTIVE==='stress'||STRESS_UNLOCKED?'':'title="Locked until Gate 3 - click to preview"'}>${ICONS.stress} Stress Test</a>
        </nav>
        <div class="topbar-utility">
          <a href="admin/index.html" class="admin-entry" aria-label="Admin console" title="Switch to admin console">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width:12px;height:12px;stroke-width:2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            Admin
          </a>
          <button class="icon-btn" aria-label="Notifications">${ICONS.bell}<span class="badge"></span></button>
          <button class="icon-btn" aria-label="Menu" id="menuBtn">${ICONS.menu}</button>
        </div>
      </div>
    </header>
  `;

  const tabbarHTML = `
    <nav class="tabbar" aria-label="Primary mobile navigation">
      <div class="tabbar-inner">
        <a href="hub.html"     class="tab${ACTIVE==='hub'?' active':''}">${ICONS.hub}<span>Hub</span></a>
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
