(function () {
  // ── Inject nav HTML ──────────────────────────────────────────
  const navHTML = `
<nav class="site-nav" id="site-nav" role="navigation" aria-label="Main navigation">
  <a href="/index.html" aria-label="Bitcoin UX Africa, Home">
    <img src="/images/bitcoinUX_Logo.svg" alt="Bitcoin UX Africa">
  </a>
  <div class="nav-links" id="nav-links">
    <a href="/index.html">Home</a>
    <a href="/index.html#bitcoin-ux-insights">Research</a>
    <a href="/about.html">About</a>
    <a href="/uxsupport.html" class="nav-cta">Get UX Support</a>
  </div>
  <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  </button>
  <button class="nav-close" id="nav-close" aria-label="Close menu">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  </button>
</nav>`;

  // ── Inject nav CSS ───────────────────────────────────────────
  const navCSS = `
    .site-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:12px 48px;display:flex;justify-content:space-between;align-items:center;transition:background .3s;}
    .site-nav.scrolled{background:rgba(10,13,11,0.95);backdrop-filter:blur(8px);}
    .site-nav img{height:72px;width:auto;}
    .nav-links{display:flex;gap:32px;align-items:center;}
    .nav-links a{color:rgba(255,255,255,0.75);text-decoration:none;font-size:0.85rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;transition:color .2s;}
    .nav-links a:hover{color:white;}
    .nav-links a[aria-current="page"]{color:white;}
    .nav-cta{background:#f97316 !important;color:white !important;padding:9px 22px;border-radius:6px;opacity:1 !important;}
    .nav-cta:hover{background:#fb923c !important;}
    .nav-hamburger{display:none;background:none;border:none;cursor:pointer;color:white;padding:4px;}
    .nav-close{display:none;position:fixed;top:20px;right:20px;z-index:201;background:none;border:none;cursor:pointer;color:white;padding:8px;line-height:1;}
    .nav-close.visible{display:block;}
    @media(max-width:768px){
      .site-nav{padding:16px 20px 20px;}
      .site-nav img{height:62px;width:auto;}
      .nav-links{display:none;}
      .nav-links.open{display:flex;flex-direction:column;position:fixed;inset:0;background:rgba(10,13,11,0.97);align-items:center;justify-content:center;gap:40px;z-index:200;}
      .nav-links.open a{font-size:1.4rem;}
      .nav-hamburger{display:block;}
    }
  `;

  // Insert CSS
  const style = document.createElement('style');
  style.textContent = navCSS;
  document.head.appendChild(style);

  // Insert nav HTML at top of body
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Mark current page link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // ── Behaviour ────────────────────────────────────────────────
  const nav       = document.getElementById('site-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const navClose  = document.getElementById('nav-close');
  const navLinks  = document.getElementById('nav-links');
  const navParent = navLinks.parentNode;

  // Scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Keep nav solid on pages without a dark hero
  if (document.body.dataset.navSolid !== undefined) {
    nav.classList.add('scrolled');
  }

  // Mobile open/close
  function closeMenu() {
    navLinks.classList.remove('open');
    navClose.classList.remove('visible');
    hamburger.setAttribute('aria-expanded', 'false');
    if (navLinks.parentNode === document.body) {
      navParent.insertBefore(navLinks, hamburger);
      navParent.insertBefore(navClose, hamburger);
    }
  }

  hamburger.addEventListener('click', () => {
    const willOpen = !navLinks.classList.contains('open');
    if (willOpen) {
      document.body.appendChild(navLinks);
      document.body.appendChild(navClose);
    }
    navLinks.classList.toggle('open');
    navClose.classList.toggle('visible', willOpen);
    hamburger.setAttribute('aria-expanded', willOpen);
  });

  navClose.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();
