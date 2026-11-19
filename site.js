/* shared behaviours, each block isolated so pages without that feature still run */
;{try{
  // ---------- SKILLS GRID ----------
  (function setupElements() {
    const tiles = Array.from(document.querySelectorAll('.el'));
    const chips = document.querySelectorAll('.el-filters .el-chip');
    const cats = {ci: 'Connect', wh: 'Store', mp: 'Transform', bi: 'Serve', ai: 'Learn', lg: 'Underneath it all'};
    const tag = document.getElementById('elDTag'), nm = document.getElementById('elDName'), nt = document.getElementById('elDNote');
    chips.forEach((c) => c.addEventListener('click', () => {
      chips.forEach((x) => x.classList.toggle('active', x === c));
      const f = c.dataset.fil;
      tiles.forEach((t) => t.classList.toggle('dim', f !== 'all' && t.dataset.cat !== f));
    }));
    tiles.forEach((t) => t.addEventListener('click', () => {
      tiles.forEach((x) => x.classList.toggle('active', x === t));
      tag.textContent = cats[t.dataset.cat]; nm.textContent = t.dataset.name; nt.textContent = t.dataset.note;
    }));
  })();


}catch(e){}}
;{try{
  // ---------- SCROLL TO TOP ----------
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


}catch(e){}}
;{try{
  // ---------- THEME TOGGLE ----------
  (function setupTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');

    // On first load: respect saved preference, else default to dark
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    const initial = saved || 'dark';
    root.setAttribute('data-theme', initial);

    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    }
  })();


}catch(e){}}
;{try{
  // ---------- LIVE CLOCK (Michigan / ET) ----------
  (function setupClock() {
    const clock = document.getElementById('liveClock');
    if (!clock) return;
    function tick() {
      const now = new Date();
      // Format in America/New_York (handles EST/EDT automatically)
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).formatToParts(now);
      const h = parts.find(p => p.type === 'hour').value;
      const m = parts.find(p => p.type === 'minute').value;
      const s = parts.find(p => p.type === 'second').value;
      clock.textContent = `${h}:${m}:${s}`;
    }
    tick();
    setInterval(tick, 1000);
  })();


}catch(e){}}
