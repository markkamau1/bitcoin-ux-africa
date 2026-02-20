/**
 * ============================================================
 *  BITCOIN UX AFRICA — "YOU MAY ALSO LIKE" SLIDER
 * ============================================================
 *  REQUIRED on each blog post page (before this script):
 *
 *    <script>
 *      const CURRENT_POST_ID = "your-post-id-here";
 *    </script>
 *    <script src="../../blog/blog-posts-data.js"></script>
 *    <script src="../../blog/you-may-also-like.js"></script>
 *
 *  Place those 3 script tags just before </body>.
 * ============================================================
 */

(function () {

    // ── Path helper ──────────────────────────────────────────
    function rootPrefix() {
        const parts = window.location.pathname.split('/').filter(Boolean);
        const depth = parts.length - 1;
        return depth > 0 ? '../'.repeat(depth) : '';
    }

    // ── Build a single card ──────────────────────────────────
    function buildCard(post) {
        const root = rootPrefix();
        return `
        <article class="ymaal-card">
            <div class="ymaal-card-image">
                <img
                    src="${root}${post.image}"
                    alt="${post.imageAlt}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='';this.closest('.ymaal-card-image').classList.add('img-fallback');this.style.display='none';"
                >
            </div>
            <div class="ymaal-card-content">
                <div class="ymaal-card-meta">
                    <span class="ymaal-category">${post.category}</span>
                    <span class="ymaal-date">${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="${root}${post.url}" class="ymaal-link">${post.linkLabel}</a>
            </div>
        </article>`;
    }

    // ── Build the full section HTML ──────────────────────────
    function buildSection(posts) {
        const cards = posts.map(buildCard).join('');
        return `
        <section class="ymaal-section" id="you-may-also-like">
            <div class="ymaal-container">
                <div class="ymaal-header">
                    <span class="ymaal-eyebrow">Keep Reading</span>
                    <h2 class="ymaal-title">You May Also Like</h2>
                </div>

                <div class="ymaal-slider-wrapper">
                    <button class="ymaal-btn ymaal-prev" aria-label="Previous posts" disabled>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <div class="ymaal-viewport">
                        <div class="ymaal-track" id="ymaal-track">
                            ${cards}
                        </div>
                    </div>

                    <button class="ymaal-btn ymaal-next" aria-label="Next posts">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <div class="ymaal-dots" id="ymaal-dots"></div>
            </div>
        </section>`;
    }

    // ── Slider logic ─────────────────────────────────────────
    function initSlider() {
        const track   = document.getElementById('ymaal-track');
        const dotsEl  = document.getElementById('ymaal-dots');
        const prevBtn = document.querySelector('.ymaal-prev');
        const nextBtn = document.querySelector('.ymaal-next');
        if (!track) return;

        const cards = Array.from(track.querySelectorAll('.ymaal-card'));
        const total = cards.length;
        const GAP   = 30;
        let current = 0;

        function cardsPerView() {
            const w = window.innerWidth;
            if (w <= 640)  return 1;
            if (w <= 1024) return 2;
            return 3;
        }

        function cardWidth() {
            const vpWidth = track.parentElement.clientWidth;
            const cpv = cardsPerView();
            return (vpWidth - GAP * (cpv - 1)) / cpv;
        }

        function sizeCards() {
            const w = cardWidth();
            cards.forEach(c => {
                c.style.width     = w + 'px';
                c.style.minWidth  = w + 'px';
                c.style.flexShrink = '0';
            });
            // Remove any stale transform when resizing
            track.style.transition = 'none';
            track.style.transform  = 'translateX(0)';
            current = 0;
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }

        function maxIndex() {
            return Math.max(0, total - cardsPerView());
        }

        function goTo(index) {
            current = Math.max(0, Math.min(index, maxIndex()));
            const w = cardWidth();
            track.style.transform = `translateX(-${current * (w + GAP)}px)`;
            updateDots();
            updateButtons();
        }

        function updateButtons() {
            if (prevBtn) prevBtn.disabled = current === 0;
            if (nextBtn) nextBtn.disabled = current >= maxIndex();
        }

        function buildDots() {
            if (!dotsEl) return;
            dotsEl.innerHTML = '';
            const pages = Math.ceil(total / cardsPerView());
            for (let i = 0; i < pages; i++) {
                const btn = document.createElement('button');
                btn.className = 'ymaal-dot' + (i === 0 ? ' active' : '');
                btn.setAttribute('aria-label', 'Page ' + (i + 1));
                btn.addEventListener('click', () => goTo(i * cardsPerView()));
                dotsEl.appendChild(btn);
            }
        }

        function updateDots() {
            if (!dotsEl) return;
            dotsEl.querySelectorAll('.ymaal-dot').forEach((d, i) =>
                d.classList.toggle('active', i === Math.floor(current / cardsPerView()))
            );
        }

        // Touch swipe
        const vp = document.querySelector('.ymaal-viewport');
        if (vp) {
            let sx = 0;
            vp.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
            vp.addEventListener('touchend', e => {
                const diff = sx - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) goTo(diff > 0 ? current + cardsPerView() : current - cardsPerView());
            }, { passive: true });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - cardsPerView()));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + cardsPerView()));

        window.addEventListener('resize', () => {
            sizeCards();
            buildDots();
            updateButtons();
        });

        sizeCards();
        buildDots();
        updateButtons();
    }

    // ── Main ─────────────────────────────────────────────────
    function render() {
        if (typeof BLOG_POSTS === 'undefined') {
            console.warn('[YouMayAlsoLike] BLOG_POSTS not found. Did you include blog-posts-data.js?');
            return;
        }
        if (typeof CURRENT_POST_ID === 'undefined') {
            console.warn('[YouMayAlsoLike] CURRENT_POST_ID not set on this page.');
            return;
        }

        const others = BLOG_POSTS.filter(p => p.id !== CURRENT_POST_ID);
        if (others.length === 0) return;

        // Always inject directly before the .cta section
        const target = document.querySelector('section.cta') || document.querySelector('footer');
        if (!target) {
            console.warn('[YouMayAlsoLike] No .cta section or footer found.');
            return;
        }
        target.insertAdjacentHTML('beforebegin', buildSection(others));

        initSlider();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }

})();
