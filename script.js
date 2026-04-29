/* ===== PORTFOLIO INTERACTIVE BEHAVIORS ===== */

// ---------- CUSTOM CURSOR ----------
(function setupCursor() {
  if (window.matchMedia('(max-width: 900px)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  // Hover targets enlarge the ring
  const hoverSelectors = 'a, button, .project-row, .article-card, .skill-card, .article-tile, .stat, .portrait, .filter-chip';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelectors)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelectors)) ring.classList.remove('hover');
  });
})();

// ---------- REVEAL ON SCROLL ----------
(function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal, .article-hero .reveal').forEach((el) => el.classList.add('in'));
  });
})();

// ---------- ANIMATED COUNTERS ----------
(function setupCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = parseInt(el.dataset.decimals || '0');
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach((c) => io.observe(c));
})();
