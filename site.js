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
;{try{
  // ---------- LIVE DEMO ----------
  (function(){
    const gates=['Customer consent on file','Account and vehicle active','Telemetry unit state','Connectivity signals agree','Recent push history'];
    const cases=[
      {vin:'DEMO0000000001001',res:[['pass','consent = granted'],['pass','account active, vehicle enrolled'],['fail','unit state = DORMANT since 3 days ago']],
        code:'UNIT_DORMANT',next:'Request a wake command and recheck in 30 minutes. If it stays dormant, escalate for a hardware check.',
        sum:'The vehicle has not reported because its telemetry unit went dormant.'},
      {vin:'DEMO0000000001002',res:[['pass','consent = granted'],['pass','account active, vehicle enrolled'],['pass','unit state = ACTIVE'],['pass','network reachable'],['fail','last 7 pushes: 2 delivered, 5 blocked (app ID mismatch)']],
        code:'PUSH_BLOCKED',next:'Correct the partner app mapping, then replay the blocked pushes.',
        sum:'The unit is healthy, but pushes are blocked by a partner mapping error.'},
      {vin:'DEMO0000000001003',res:[['pass','consent = granted'],['pass','account active, vehicle enrolled'],['pass','unit state = ACTIVE'],['pass','network reachable'],['pass','last push 4 minutes ago, 7 of 7 delivered']],
        code:'HEALTHY',next:'No action needed. Close the case with the evidence below.',
        sum:'The vehicle is reporting normally.'}];
    let cur=0,busy=false;
    const g=document.getElementById('dGates'),v=document.getElementById('dVerdict'),n=document.getElementById('dNote');
    if(!g)return;
    function reset(){g.innerHTML=gates.map(t=>'<div class="gate"><span class="ic">&middot;</span><div><b>'+t+'</b><small>not run</small></div></div>').join('');v.className='demo-verdict';n.textContent='Run the diagnostic to generate the note.';}
    document.querySelectorAll('.demo-pick').forEach(b=>b.addEventListener('click',()=>{if(busy)return;document.querySelectorAll('.demo-pick').forEach(x=>x.classList.remove('on'));b.classList.add('on');cur=+b.dataset.c;reset();}));
    document.getElementById('dRun').addEventListener('click',async()=>{
      if(busy)return;busy=true;reset();const c=cases[cur],rows=g.children;
      for(let i=0;i<c.res.length;i++){await new Promise(r=>setTimeout(r,550));const [st,d]=c.res[i],r=rows[i];r.classList.add('show',st);r.querySelector('.ic').textContent=st==='pass'?'\u2713':'\u2715';r.querySelector('small').textContent=d;if(st==='fail')break;}
      await new Promise(r=>setTimeout(r,400));
      v.innerHTML='Verdict <code>'+c.code+'</code><br>'+c.sum+'<br><b>Next step:</b> '+c.next;v.classList.add('show');
      const ev=c.res.map(x=>(x[0]==='pass'?'[ok]   ':'[FAIL] ')+x[1]).join('\n');
      const txt='VERDICT: '+c.code+'\nVIN: '+c.vin+'\n\nFINDINGS\n'+ev+'\n\nNEXT STEPS\n'+c.next;
      n.textContent='';for(let i=0;i<txt.length;i+=3){n.textContent=txt.slice(0,i+3);await new Promise(r=>setTimeout(r,12));}
      n.textContent=txt;busy=false;});
    reset();
  })();

}catch(e){}}
;{try{
  // ---------- TABS ----------
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.skill-panel').forEach((p) => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });

  // ---------- PROJECT EXPAND/COLLAPSE ----------
  document.querySelectorAll('.project-row .header-row').forEach((row) => {
    row.addEventListener('click', () => {
      row.parentElement.classList.toggle('expanded');
    });
  });


  // ---------- CASE FILE SLIDESHOW ----------
  const slideList = document.getElementById('slides');
  let slideIdx = 0;
  const visibleSlides = () => Array.from(slideList.querySelectorAll('.project-row')).filter((r) => !r.classList.contains('hidden'));
  const dotsEl = document.getElementById('slideDots');
  function renderSlides(scroll) {
    const vis = visibleSlides();
    if (!vis.length) return;
    slideIdx = (slideIdx + vis.length) % vis.length;
    slideList.querySelectorAll('.project-row').forEach((r) => r.classList.toggle('current', r === vis[slideIdx]));
    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('slideNow').textContent = pad(slideIdx + 1);
    document.getElementById('slideTotal').textContent = pad(vis.length);
    document.querySelector('.slide-now2').textContent = pad(slideIdx + 1);
    document.querySelector('.slide-total2').textContent = pad(vis.length);
    document.getElementById('slideTag').textContent = vis[slideIdx].dataset.featured ? 'Featured' : 'More work';
    dotsEl.innerHTML = '';
    vis.forEach((r, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'slide-dot' + (r.dataset.featured ? ' feat' : '') + (i === slideIdx ? ' on' : '');
      d.setAttribute('aria-label', 'Go to case file ' + (i + 1));
      d.addEventListener('click', () => { slideIdx = i; renderSlides(true); });
      dotsEl.appendChild(d);
    });
    if (scroll) {
      const top = document.querySelector('.slide-bar').getBoundingClientRect().top;
      if (top < 80) window.scrollTo({ top: window.scrollY + top - 96, behavior: 'smooth' });
    }
  }
  document.querySelectorAll('.slide-prev').forEach((b) => b.addEventListener('click', () => { slideIdx--; renderSlides(true); }));
  document.querySelectorAll('.slide-next').forEach((b) => b.addEventListener('click', () => { slideIdx++; renderSlides(true); }));
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
    const r = document.getElementById('projects').getBoundingClientRect();
    if (r.top > window.innerHeight * 0.6 || r.bottom < window.innerHeight * 0.3) return;
    if (e.key === 'ArrowRight') { slideIdx++; renderSlides(false); }
    if (e.key === 'ArrowLeft') { slideIdx--; renderSlides(false); }
  });
  let touchX = null;
  slideList.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  slideList.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 60) { slideIdx += dx < 0 ? 1 : -1; renderSlides(true); }
  }, { passive: true });
  renderSlides(false);

  // ---------- PROJECT FILTERS ----------
  const filters = document.querySelectorAll('.filter-chip');
  const rows = document.querySelectorAll('.project-row');
  // Pre-compute counts for each filter
  filters.forEach((f) => {
    const filter = f.dataset.filter;
    if (filter === 'all') return;
    const count = Array.from(rows).filter(r => (r.dataset.tags || '').split(',').includes(filter)).length;
    const span = document.createElement('span');
    span.className = 'count';
    span.textContent = count;
    f.appendChild(span);
  });

  filters.forEach((f) => {
    f.addEventListener('click', () => {
      const filter = f.dataset.filter;
      filters.forEach((b) => b.classList.toggle('active', b === f));
      rows.forEach((row) => {
        const tags = (row.dataset.tags || '').split(',');
        const show = filter === 'all' || tags.includes(filter);
        row.classList.toggle('hidden', !show);
        if (!show) row.classList.remove('expanded');
      });
      slideIdx = 0; renderSlides(false);
    });
  });



}catch(e){}}
