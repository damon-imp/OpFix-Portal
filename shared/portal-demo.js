/* ──────────────────────────────────────────────────────────────
   OPFIX PORTAL - DEMO MODE HELPER
   Wires every interactive element so the demo never breaks.
   - Toast on dead-link clicks
   - Notifications dropdown
   - Account/menu dropdown
   - DEMO MODE indicator (first-load only)
   - Keyboard shortcut: press D for demo info
   ────────────────────────────────────────────────────────────── */
(function(){
  // ─── STYLES ───
  const css = `
    #demo-toast{position:fixed;left:50%;bottom:calc(var(--tabbar-h) + var(--safe-bottom) + 16px);transform:translateX(-50%);background:rgba(20,20,20,.96);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.10);color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:12px 18px;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.5);z-index:200;display:flex;align-items:center;gap:10px;max-width:90vw;opacity:0;transition:opacity .25s,transform .25s;pointer-events:none}
    #demo-toast.show{opacity:1;transform:translateX(-50%) translateY(-6px)}
    #demo-toast .toast-dot{width:8px;height:8px;border-radius:50%;background:#3B82F6;flex-shrink:0;box-shadow:0 0 12px rgba(59,130,246,.6)}
    @media (min-width:768px){#demo-toast{bottom:24px}}

    #demo-banner{position:fixed;top:0;left:0;right:0;background:linear-gradient(90deg,#3B82F6,#2563EB);color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;padding:8px 16px;text-align:center;z-index:55;letter-spacing:.3px;transform:translateY(-100%);transition:transform .35s;display:flex;align-items:center;justify-content:center;gap:12px}
    #demo-banner.show{transform:translateY(0)}
    body.demo-banner-shown .topbar{top:36px}
    .topbar{transition:top .35s ease}
    #demo-banner .dot{width:6px;height:6px;border-radius:50%;background:#fff;animation:pulse 2s infinite}
    #demo-banner button{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);color:#fff;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;margin-left:8px}
    #demo-banner button:hover{background:rgba(255,255,255,.3)}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

    .demo-dropdown{position:absolute;top:calc(100% + 6px);right:8px;width:320px;max-width:calc(100vw - 24px);background:#141414;border:1px solid rgba(255,255,255,.10);border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,.6);z-index:100;opacity:0;transform:translateY(-8px);pointer-events:none;transition:opacity .18s,transform .18s;overflow:hidden}
    .demo-dropdown.show{opacity:1;transform:translateY(0);pointer-events:auto}
    .demo-dropdown-head{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between}
    .demo-dropdown-title{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#fff;letter-spacing:-.2px}
    .demo-dropdown-action{font-size:11px;font-weight:600;color:#3B82F6;cursor:pointer}
    .demo-dropdown-list{max-height:380px;overflow-y:auto}
    .demo-notif{display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;transition:background .12s}
    .demo-notif:last-child{border-bottom:none}
    .demo-notif:hover{background:rgba(255,255,255,.02)}
    .demo-notif.unread{background:rgba(59,130,246,.04)}
    .demo-notif.unread::before{content:'';position:absolute;left:6px;top:50%;transform:translateY(-50%);width:6px;height:6px;border-radius:50%;background:#3B82F6}
    .demo-notif{position:relative;padding-left:24px}
    .demo-notif-icon{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .demo-notif-icon svg{width:15px;height:15px;stroke-width:2}
    .demo-notif-icon.action{background:rgba(200,30,45,.10);color:#C81E2D;border:1px solid rgba(200,30,45,.20)}
    .demo-notif-icon.deliverable{background:rgba(16,185,129,.10);color:#10B981;border:1px solid rgba(16,185,129,.20)}
    .demo-notif-icon.meeting{background:rgba(59,130,246,.10);color:#3B82F6;border:1px solid rgba(59,130,246,.20)}
    .demo-notif-icon.gate{background:rgba(245,158,11,.10);color:#F59E0B;border:1px solid rgba(245,158,11,.20)}
    .demo-notif-body{flex:1;min-width:0}
    .demo-notif-title{font-size:13px;font-weight:600;color:#fff;line-height:1.3;margin-bottom:2px}
    .demo-notif-meta{font-size:11px;color:#64748B}
    .demo-dropdown-foot{padding:10px 16px;background:rgba(255,255,255,.02);text-align:center;font-size:12px;color:#64748B;border-top:1px solid rgba(255,255,255,.04)}

    .demo-menu-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;transition:background .12s;color:#E2E8F0;font-size:13px;font-weight:500}
    .demo-menu-item:last-child{border-bottom:none}
    .demo-menu-item:hover{background:rgba(255,255,255,.04)}
    .demo-menu-item svg{width:16px;height:16px;stroke-width:1.8;color:#64748B;flex-shrink:0}
    .demo-menu-item.danger{color:#C81E2D}
    .demo-menu-item.danger svg{color:#C81E2D}
    .demo-menu-header{padding:16px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:12px}
    .demo-menu-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#3B82F6,#2563EB);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:700;color:#fff;font-size:14px;letter-spacing:-.5px}
    .demo-menu-name{font-size:14px;font-weight:600;color:#fff;line-height:1.2}
    .demo-menu-email{font-size:11px;color:#64748B;margin-top:2px}

    .demo-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:90;opacity:0;pointer-events:none;transition:opacity .2s}
    .demo-backdrop.show{opacity:1;pointer-events:auto}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── TOAST ───
  const toast = document.createElement('div');
  toast.id = 'demo-toast';
  toast.innerHTML = '<span class="toast-dot"></span><span class="toast-msg"></span>';
  document.body.appendChild(toast);

  let toastTimer = null;
  window.showDemoToast = function(msg){
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'),2400);
  };

  // ─── DEMO BANNER (first load only via sessionStorage) ───
  // Skipped sessionStorage since artifacts block it; show on every fresh page load instead
  function showBanner(){
    const banner = document.createElement('div');
    banner.id = 'demo-banner';
    banner.innerHTML = `
      <span class="dot"></span>
      <span>DEMO MODE · sample data · not wired to backend</span>
      <button id="demoBannerClose">Got it</button>
    `;
    document.body.appendChild(banner);
    setTimeout(()=>{
      banner.classList.add('show');
      document.body.classList.add('demo-banner-shown');
    },300);
    document.getElementById('demoBannerClose').addEventListener('click',()=>{
      banner.classList.remove('show');
      document.body.classList.remove('demo-banner-shown');
      setTimeout(()=>banner.remove(),400);
    });
    // Auto-dismiss after 6s
    setTimeout(()=>{
      if(banner.parentNode){
        banner.classList.remove('show');
        document.body.classList.remove('demo-banner-shown');
        setTimeout(()=>banner.remove(),400);
      }
    },6000);
  }
  showBanner();

  // ─── BACKDROP for dropdowns ───
  const backdrop = document.createElement('div');
  backdrop.className = 'demo-backdrop';
  document.body.appendChild(backdrop);

  // ─── NOTIFICATIONS DROPDOWN ───
  function buildNotifications(){
    const dropdown = document.createElement('div');
    dropdown.className = 'demo-dropdown';
    dropdown.id = 'notifDropdown';
    dropdown.innerHTML = `
      <div class="demo-dropdown-head">
        <span class="demo-dropdown-title">Notifications</span>
        <span class="demo-dropdown-action" data-mark-read>Mark all read</span>
      </div>
      <div class="demo-dropdown-list">
        <div class="demo-notif unread">
          <div class="demo-notif-icon action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16v.01"/></svg></div>
          <div class="demo-notif-body">
            <div class="demo-notif-title">SOP-04 is overdue · sign off needed</div>
            <div class="demo-notif-meta">2 days overdue · Pillar 3</div>
          </div>
        </div>
        <div class="demo-notif unread">
          <div class="demo-notif-icon meeting"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg></div>
          <div class="demo-notif-body">
            <div class="demo-notif-title">Build Sync starts in 4 hours</div>
            <div class="demo-notif-meta">Today · 2:00p · Zoom</div>
          </div>
        </div>
        <div class="demo-notif">
          <div class="demo-notif-icon deliverable"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12l5 5L20 7"/></svg></div>
          <div class="demo-notif-body">
            <div class="demo-notif-title">SOP-03 delivered to your Vault</div>
            <div class="demo-notif-meta">3 days ago · Daily Standup Cadence</div>
          </div>
        </div>
        <div class="demo-notif">
          <div class="demo-notif-icon gate"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg></div>
          <div class="demo-notif-body">
            <div class="demo-notif-title">Gate 3 in 38 days · prepare for end of Build</div>
            <div class="demo-notif-meta">5 days ago · Day 105</div>
          </div>
        </div>
        <div class="demo-notif">
          <div class="demo-notif-icon deliverable"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12l5 5L20 7"/></svg></div>
          <div class="demo-notif-body">
            <div class="demo-notif-title">Score updated · +7 since Gate 2</div>
            <div class="demo-notif-meta">1 week ago · Now at 168</div>
          </div>
        </div>
      </div>
      <div class="demo-dropdown-foot">View all notifications</div>
    `;
    document.body.appendChild(dropdown);
    return dropdown;
  }

  // ─── ACCOUNT MENU DROPDOWN ───
  function buildAccountMenu(){
    const dropdown = document.createElement('div');
    dropdown.className = 'demo-dropdown';
    dropdown.id = 'menuDropdown';
    dropdown.innerHTML = `
      <div class="demo-menu-header">
        <div class="demo-menu-avatar">JS</div>
        <div>
          <div class="demo-menu-name">John Smith</div>
          <div class="demo-menu-email">john@acmeoperations.com</div>
        </div>
      </div>
      <div class="demo-menu-item" data-demo-msg="Profile screen - coming in next build round">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
        Founder Profile
      </div>
      <div class="demo-menu-item" data-demo-msg="Billing screen - coming in next build round">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>
        Billing & Payments
      </div>
      <div class="demo-menu-item" data-demo-msg="Service Agreement - view your engagement contract">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h6M9 17h3"/></svg>
        Service Agreement
      </div>
      <div class="demo-menu-item" data-demo-msg="Help & support - coming in next build round">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 015 0c0 1.5-2.5 1.5-2.5 4M12 18v.01"/></svg>
        Help & Contact
      </div>
      <div class="demo-menu-item" data-demo-msg="Notification preferences saved">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
        Settings
      </div>
      <div class="demo-menu-item danger" data-demo-msg="Sign out - would return to login screen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        Sign Out
      </div>
    `;
    document.body.appendChild(dropdown);
    return dropdown;
  }

  const notifDropdown = buildNotifications();
  const menuDropdown = buildAccountMenu();
  let openDropdown = null;

  function closeDropdowns(){
    notifDropdown.classList.remove('show');
    menuDropdown.classList.remove('show');
    backdrop.classList.remove('show');
    openDropdown = null;
  }

  function positionDropdown(btn, dropdown){
    const rect = btn.getBoundingClientRect();
    dropdown.style.position = 'fixed';
    dropdown.style.top = (rect.bottom + 8) + 'px';
    dropdown.style.right = (window.innerWidth - rect.right) + 'px';
  }

  // ─── ATTACH HANDLERS to icon buttons ───
  function attachIconButtonHandlers(){
    const iconBtns = document.querySelectorAll('.icon-btn');
    iconBtns.forEach(btn=>{
      const label = btn.getAttribute('aria-label') || '';
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        if(label.toLowerCase().includes('notif')){
          if(openDropdown === notifDropdown){closeDropdowns();return}
          closeDropdowns();
          positionDropdown(btn, notifDropdown);
          notifDropdown.classList.add('show');
          backdrop.classList.add('show');
          openDropdown = notifDropdown;
        }else if(label.toLowerCase().includes('menu')){
          if(openDropdown === menuDropdown){closeDropdowns();return}
          closeDropdowns();
          positionDropdown(btn, menuDropdown);
          menuDropdown.classList.add('show');
          backdrop.classList.add('show');
          openDropdown = menuDropdown;
        }
      });
    });
  }

  // wait for nav to inject, then attach
  setTimeout(attachIconButtonHandlers, 50);

  backdrop.addEventListener('click', closeDropdowns);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDropdowns()});

  // Reposition on resize
  window.addEventListener('resize',()=>{
    if(openDropdown){
      const btn = document.querySelector(openDropdown===notifDropdown ? '.icon-btn[aria-label*="Notif" i]' : '.icon-btn[aria-label*="Menu" i]');
      if(btn) positionDropdown(btn, openDropdown);
    }
  });

  // ─── MENU ITEM CLICK HANDLERS ───
  menuDropdown.querySelectorAll('[data-demo-msg]').forEach(item=>{
    item.addEventListener('click',e=>{
      e.stopPropagation();
      closeDropdowns();
      window.showDemoToast(item.dataset.demoMsg);
    });
  });

  // Notification click
  notifDropdown.querySelectorAll('.demo-notif').forEach(notif=>{
    notif.addEventListener('click',e=>{
      e.stopPropagation();
      notif.classList.remove('unread');
      const title = notif.querySelector('.demo-notif-title').textContent;
      closeDropdowns();
      window.showDemoToast('Opening: ' + title.substring(0,40) + (title.length>40?'...':''));
    });
  });

  // Mark all read
  notifDropdown.querySelector('[data-mark-read]')?.addEventListener('click',e=>{
    e.stopPropagation();
    notifDropdown.querySelectorAll('.demo-notif.unread').forEach(n=>n.classList.remove('unread'));
    window.showDemoToast('All notifications marked read');
  });

  // Foot click
  notifDropdown.querySelector('.demo-dropdown-foot')?.addEventListener('click',e=>{
    e.stopPropagation();
    closeDropdowns();
    window.showDemoToast('Full notifications page - coming in next build round');
  });

  // ─── GLOBAL DEAD-LINK INTERCEPT ───
  document.addEventListener('click',e=>{
    // Find closest link
    const link = e.target.closest('a, button');
    if(!link) return;

    // Skip nav links and intentionally wired buttons
    if(link.classList.contains('tab')) return;
    if(link.classList.contains('nav-link') && !link.classList.contains('locked')) return;
    if(link.classList.contains('brand-mark')) return;
    if(link.classList.contains('icon-btn')) return;
    if(link.classList.contains('view-switch')) return;
    if(link.classList.contains('action-tab')) return;
    if(link.classList.contains('filter-chip')) return;
    if(link.classList.contains('phase-head')) return;
    if(link.classList.contains('phase-chevron')) return;
    if(link.classList.contains('completed-toggle')) return;
    if(link.classList.contains('pillar-tile')) return;
    if(link.classList.contains('meetings-head-link')) return;
    if(link.classList.contains('demo-menu-item')) return;
    if(link.classList.contains('demo-notif')) return;
    if(link.classList.contains('demo-dropdown-action')) return;
    if(link.classList.contains('demo-dropdown-foot')) return;
    if(link.id === 'demoBannerClose') return;

    // Only intercept dead hrefs and # anchors that aren't real anchor jumps
    const href = link.getAttribute('href');
    if(href === '#' || href === undefined || href === null){
      e.preventDefault();
      // Generate context-aware message
      let msg = 'Demo: this action is not wired yet';
      const text = (link.textContent || '').trim().toLowerCase();
      if(text.includes('join')) msg = 'Would open Zoom meeting link';
      else if(text.includes('details')) msg = 'Would open meeting details';
      else if(text.includes('sign off')) msg = 'Would sign off and update Vault';
      else if(text.includes('approve')) msg = 'Would mark as approved';
      else if(text.includes('upload')) msg = 'Would open file upload dialog';
      else if(text.includes('view brief')) msg = 'Would open delivery brief';
      else if(text.includes('view progress')) msg = 'Would open build progress';
      else if(text.includes('review')) msg = 'Would open document viewer';
      else if(link.querySelector('svg path[d*="M12 3v14"]')) msg = 'Would download file';
      else if(link.querySelector('svg path[d*="M1 12s4-8"]')) msg = 'Would open file preview';
      else if(text.includes('all actions')) msg = '';  // real link, let it through
      else if(text.includes('full calendar')) msg = '';  // real anchor, let it through

      if(msg) window.showDemoToast(msg);
    }
  });

  // ─── KEYBOARD HELPER ───
  document.addEventListener('keydown',e=>{
    if(e.key === 'd' || e.key === 'D'){
      if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const pages = ['cockpit','score','install','actions','vault'];
      const current = document.querySelector('[data-active]')?.dataset.active || pages[0];
      const i = pages.indexOf(current);
      window.showDemoToast(`Demo · ${current.toUpperCase()} (${i+1}/${pages.length}) · use bottom tabs to navigate`);
    }
  });
})();
