/* ──────────────────────────────────────────────────────────────
   OPFIX ADMIN - NAV PARTIAL
   Drop a <div id="admin-nav" data-active="clients"></div>
   Active state options: clients | queue | client (per-client mirror)
   ────────────────────────────────────────────────────────────── */
(function(){
  const ACTIVE = document.currentScript?.dataset.active
    || document.getElementById('admin-nav')?.dataset.active
    || 'clients';

  const CURRENT_USER = {
    name: 'Damon Aleczander',
    initials: 'DA',
    role: 'Founder · CEO'
  };

  const ICONS = {
    clients: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    queue:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    back:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'
  };

  // Detect if we're on a per-client mirror page
  const IS_CLIENT_MIRROR = ACTIVE === 'client';

  const stripHTML = `
    <div class="admin-strip">
      <div class="admin-strip-inner">
        <div class="admin-strip-left">
          <span class="admin-strip-badge">ADMIN</span>
          <span>${IS_CLIENT_MIRROR ? 'Viewing as admin · editing enabled' : 'Internal OpFix console · not visible to founders'}</span>
        </div>
        <div class="admin-strip-right">
          <a href="../hub.html" class="admin-strip-link">${ICONS.back} Exit to founder view</a>
        </div>
      </div>
    </div>
  `;

  const topbarHTML = `
    <header class="admin-topbar">
      <div class="admin-topbar-inner">
        <a href="index.html" class="brand-mark" aria-label="OpFix Admin">
          <img src="../shared/opfix-logo.svg" alt="OpFix" class="brand-logo">
        </a>
        <nav class="admin-topbar-nav" aria-label="Admin Primary">
          <a href="index.html" class="admin-nav-link${ACTIVE==='clients'?' active':''}">${ICONS.clients} Clients</a>
          <a href="queue.html" class="admin-nav-link${ACTIVE==='queue'?' active':''}">${ICONS.queue} Build Queue</a>
        </nav>
        <div class="admin-user">
          <div class="admin-user-avatar">${CURRENT_USER.initials}</div>
          <div class="admin-user-name">${CURRENT_USER.name}</div>
        </div>
      </div>
    </header>
  `;

  const mount = document.getElementById('admin-nav');
  if(mount){
    mount.outerHTML = stripHTML + topbarHTML;
  }else{
    document.body.insertAdjacentHTML('afterbegin', stripHTML + topbarHTML);
  }
})();
