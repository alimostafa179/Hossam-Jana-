const CFG = {
  n1: 'Hossam', n2: 'Jana',
  date: '2027-01-15', time: '19:00',            // YYYY-MM-DD and HH:MM (24h)
  timeNote: 'Doors open at 6:30 PM',
  venueName: 'Mirage Hall ', venueSub: 'TRANSPORT OFFICERS CLUB', venueArea: 'NILE CORNICHE,SHUBRA EL KHEMA,Cairo, Egypt',
  mapUrl: 'https://maps.app.goo.gl/1XogsQor5jaPZ8Kb9',   // paste your Google Maps link
  whatsapp: '201001471931',              // international format without +, e.g. 201001234567
  audio: 'WhatsApp Audio 2026-10-17 at 3.27.09 PM.mp3'    // put your song in the audio folder with this name
};
/* =================================== */
const $ = i => document.getElementById(i);
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const d = new Date(CFG.date + 'T' + CFG.time + ':00');
const day = d.getDate(), names = CFG.n1 + ' & ' + CFG.n2;
const ord = n => n + (['th','st','nd','rd'][(n % 100 >> 3 ^ 1 && n % 10 < 4) ? n % 10 : 0]);
const dateLong = ord(day) + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
['c1','n1'].forEach(i => $(i).textContent = CFG.n1); ['c2','n2'].forEach(i => $(i).textContent = CFG.n2);
$('cDate').textContent = dateLong;
$('icoDay').textContent = day;
$('dVal').innerHTML = ord(day) + ' ' + months[d.getMonth()] + '<br>' + d.getFullYear();
$('dSub').textContent = d.toLocaleDateString('en-GB', {weekday: 'long'}) + ' Evening';
const h = d.getHours();
$('tVal').textContent = (h % 12 || 12) + ':' + String(d.getMinutes()).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
$('tSub').textContent = CFG.timeNote;
$('vName').textContent = $('vName2').textContent = CFG.venueName;
$('vAddr').innerHTML = CFG.venueSub + '<br>' + CFG.venueArea;
$('vArea').textContent = CFG.venueArea;
$('vFull').innerHTML = CFG.venueName + ' · ' + CFG.venueSub + '<br>' + CFG.venueArea;
$('dir').href = CFG.mapUrl;
$('fNames').textContent = names;
$('fNote').textContent = day + ' · ' + months[d.getMonth()] + ' · ' + d.getFullYear() + '  —  ' + CFG.venueArea;
const f = x => x.toISOString().replace(/[-:]|\.\d{3}/g, '');
$('gcal').href = 'https://www.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(names + ' Wedding') +
  '&dates=' + f(d) + '/' + f(new Date(d.getTime() + 3 * 36e5)) + '&location=' + encodeURIComponent(CFG.venueName + ', ' + CFG.venueArea);
if (CFG.whatsapp) $('rsvp').href = 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent('RSVP – ' + names + ' Wedding');
else $('rsvp').style.display = 'none';


/* countdown: live values, count-up on first view, flip on change */
const cdEls = [$('cdD'), $('cdH'), $('cdM'), $('cdS')];
document.querySelectorAll('.cd-box').forEach((b, i) => b.style.setProperty('--i', i));
let cdK = 0, cdVals = [0, 0, 0, 0];
function cdRender() {
  cdVals.forEach((v, i) => {
    const t = String(Math.floor(v * cdK));
    if (cdEls[i].textContent !== t) {
      cdEls[i].textContent = t;
      if (cdK >= 1) { cdEls[i].classList.remove('flip'); void cdEls[i].offsetWidth; cdEls[i].classList.add('flip'); }
    }
  });
}
function tick() {
  const s = Math.floor((d - new Date()) / 1000);
  if (s > 0) {
    cdVals = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
    cdRender();
    $('count').textContent = 'until the big day';
  } else {
    $('count').textContent = '';
  }
}
tick(); setInterval(tick, 1000);
function cdCountUp() {
  if (reduce) { cdK = 1; cdRender(); return; }
  const t0 = performance.now();
  (function f(n) { const p = Math.min(1, (n - t0) / 2200); cdK = 1 - Math.pow(1 - p, 4); cdRender(); if (p < 1) requestAnimationFrame(f); })(t0);
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('locked');

/* music */
const a = $('bgm'), mb = $('music');
if (CFG.audio) { a.src = CFG.audio; mb.classList.add('show'); }
a.addEventListener('error', () => mb.classList.remove('show'));
const sync = () => mb.classList.toggle('on', !a.paused);
a.addEventListener('play', sync); a.addEventListener('pause', sync);
mb.onclick = () => { a.paused ? a.play().catch(() => {}) : a.pause(); };


/* ===== split text: letters (names) and words (small lines) ===== */
const split = (el, dl) => { const t = el.textContent; el.textContent = '';
  [...t].forEach((c, i) => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c;
    s.style.setProperty('--i', i); s.style.setProperty('--d', dl + 'ms'); el.appendChild(s); }); };
split($('c1'), 1400); split($('c2'), 1900); split($('n1'), 450); split($('n2'), 1000);
const words = el => { const t = el.textContent.trim().split(/\s+/); el.textContent = '';
  t.forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.textContent = w; s.style.setProperty('--i', i); el.appendChild(s);
    if (i < t.length - 1) el.appendChild(document.createTextNode(' ')); });
  el.classList.remove('r'); el.classList.add('rw'); };
document.querySelectorAll('.hero .tag,.hero .together,.hero .subtitle').forEach(words);
document.querySelectorAll('.detail-block').forEach(b => b.classList.add('r'));

/* section gold lines */
document.querySelectorAll('.details-section,.map-section,footer').forEach(sec => {
  sec.classList.add('sec'); const l = document.createElement('i'); l.className = 'sline'; sec.prepend(l); });

/* reveal observer. hero waits for the gates to open */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) {
  const t = x.target; t.classList.add('in'); io.unobserve(t);
  if (t.id === 'countdown') cdCountUp();
  if (t.tagName === 'FOOTER') shower(60);
} }), {threshold: .15});
const heroEls = [...document.querySelectorAll('.hero .r,.hero .rw')].filter(el => !el.classList.contains('arch'));
heroEls.forEach((el, i) => { const dl = i * .2 + .25; if (el.classList.contains('rw')) el.style.setProperty('--d', dl * 1000 + 'ms'); else el.style.transitionDelay = dl + 's'; });
document.querySelectorAll('.r,.rw,.sec').forEach(el => { if (!el.closest('.hero')) io.observe(el); });
if (document.querySelector('.hero .names')) { /* names are .r: delays set above */ }
function startHero() { $('main').querySelector('.hero').classList.add('live'); heroEls.forEach(el => io.observe(el)); setTimeout(() => document.querySelector('.hero .arch').classList.add('in'), 450); }

/* ===== canvas particles: petals, gold glints, bursts ===== */
const cvs = $('fx'), ctx = cvs.getContext('2d');
let W = 0, H = 0;
function size() { const dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
  cvs.width = W * dpr; cvs.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
size(); addEventListener('resize', size);
const mk = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w * 2; c.height = h * 2; const x = c.getContext('2d'); x.scale(2, 2); fn(x, w, h); return c; };
const petalSpr = [['#fffaf0', '#efdcb4'], ['#fde7e4', '#e9b4b4'], ['#f6e3a6', '#c9a24b']].map(([a, b]) => mk(28, 36, (x, w, h) => {
  const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g;
  x.beginPath(); x.moveTo(w / 2, 1); x.bezierCurveTo(w, h * .25, w * .95, h * .8, w / 2, h - 1); x.bezierCurveTo(w * .05, h * .8, 0, h * .25, w / 2, 1); x.fill();
  x.strokeStyle = 'rgba(160,120,40,.35)'; x.lineWidth = .6; x.beginPath(); x.moveTo(w / 2, 4); x.lineTo(w / 2, h - 5); x.stroke(); }));
const glint = mk(48, 48, (x, w, h) => {
  const g = x.createRadialGradient(24, 24, 0, 24, 24, 24); g.addColorStop(0, 'rgba(255,248,215,1)'); g.addColorStop(.18, 'rgba(240,215,140,.8)'); g.addColorStop(1, 'rgba(201,162,75,0)');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.fillStyle = 'rgba(255,246,210,.95)';
  x.beginPath(); x.moveTo(24, 1); x.quadraticCurveTo(25.5, 22.5, 47, 24); x.quadraticCurveTo(25.5, 25.5, 24, 47); x.quadraticCurveTo(22.5, 25.5, 1, 24); x.quadraticCurveTo(22.5, 22.5, 24, 1); x.fill(); });
const small = W < 600;
const ambient = [], glints = [], bursts = [];
const R = (a, b) => a + Math.random() * (b - a);
const newPetal = (initial) => ({ x: R(0, W), y: initial ? R(-H, H) : R(-60, -20), vy: R(34, 70), vx: R(-12, 16), rot: R(0, 6.28), vr: R(-1.4, 1.4), fl: R(0, 6.28), vf: R(1.5, 3.5), s: R(.55, 1.15), sw: R(18, 46), ph: R(0, 6.28), spr: petalSpr[(Math.random() * 3) | 0] });
for (let i = 0; i < (small ? 14 : 28); i++) ambient.push(newPetal(true));
for (let i = 0; i < (small ? 20 : 38); i++) glints.push({ x: R(0, W), y: R(0, H), sp: R(.8, 2), ph: R(0, 6.28), s: R(.35, 1), c: 0, vy: R(-14, -4) });
function shower(n) { if (reduce) return; for (let i = 0; i < n; i++) { const p = newPetal(false); p.y = R(-H * .6, -20); p.vy = R(80, 160); ambient.push(p); }
  setTimeout(() => { if (ambient.length > (small ? 14 : 28)) ambient.splice(0, ambient.length - (small ? 14 : 28)); }, 9000); }
function burst(x, y, n, gold) { if (reduce) return; const cap = small ? 70 : 120; n = Math.min(n, cap);
  for (let i = 0; i < n; i++) { const a = R(0, 6.28), v = R(120, gold ? 380 : 620), g = Math.random() < (gold ? .9 : .45);
    bursts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80, rot: R(0, 6.28), vr: R(-6, 6), fl: R(0, 6.28), s: g ? R(.25, .7) : R(.5, 1), g, spr: petalSpr[(Math.random() * 3) | 0], t: 0, life: R(1.2, 2.6) }); } }
let last = performance.now();
function frame(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  ctx.clearRect(0, 0, W, H);
  for (const p of ambient) {
    p.y += p.vy * dt; p.ph += dt * .9; p.x += (p.vx + Math.sin(p.ph) * p.sw) * dt; p.rot += p.vr * dt; p.fl += p.vf * dt;
    if (p.y > H + 50) { if (ambient.length > (small ? 14 : 28)) { ambient.splice(ambient.indexOf(p), 1); continue; } Object.assign(p, newPetal(false)); }
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(p.s, p.s * Math.cos(p.fl)); ctx.globalAlpha = .92; ctx.drawImage(p.spr, -14, -18, 28, 36); ctx.restore();
  }
  for (const g of glints) {
    g.ph += dt * g.sp; g.y += g.vy * dt; const a = Math.sin(g.ph); const c = Math.floor(g.ph / 3.14159);
    if (c !== g.c) { g.c = c; g.x = R(0, W); g.y = R(0, H); }
    if (a > 0) { const k = a * a * a; ctx.globalAlpha = k; const sz = 26 * g.s * (.5 + k * .7); ctx.drawImage(glint, g.x - sz / 2, g.y - sz / 2, sz, sz); }
  }
  for (let i = bursts.length - 1; i >= 0; i--) {
    const b = bursts[i]; b.t += dt; if (b.t > b.life) { bursts.splice(i, 1); continue; }
    const dr = Math.pow(.04, dt); b.vx *= dr; b.vy = b.vy * dr + 260 * dt; b.x += b.vx * dt; b.y += b.vy * dt; b.rot += b.vr * dt; b.fl += dt * 5;
    const al = Math.min(1, (b.life - b.t) * 1.2); ctx.globalAlpha = al;
    if (b.g) { const sz = 30 * b.s * (.6 + .4 * Math.sin(b.t * 14)); ctx.drawImage(glint, b.x - sz / 2, b.y - sz / 2, sz, sz); }
    else { ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot); ctx.scale(b.s, b.s * Math.cos(b.fl)); ctx.drawImage(b.spr, -14, -18, 28, 36); ctx.restore(); }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
if (!reduce) requestAnimationFrame(frame);

/* ===== open invitation: flash, gates, light beam, petal shower ===== */
let opened = false;
$('openBtn').onclick = e => {
  if (opened) return; opened = true;
  if (CFG.audio) a.play().catch(() => {});
  const cover = $('cover');
  if (reduce) { cover.remove(); document.body.classList.remove('locked'); startHero(); return; }
  const r = e.currentTarget.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const fl = document.createElement('div'); fl.className = 'flash'; fl.style.left = cx + 'px'; fl.style.top = cy + 'px'; cover.appendChild(fl);
  burst(cx, cy, 110, true);
  cover.classList.add('opening');
  setTimeout(() => burst(innerWidth / 2, innerHeight / 2, 90, false), 700);
  setTimeout(() => shower(small ? 18 : 30), 1000);
  setTimeout(startHero, 1150);
  setTimeout(() => document.body.classList.remove('locked'), 1500);
  setTimeout(() => cover.remove(), 3000);
};

/* ===== scroll: progress bar + parallax (transform/translate only) ===== */
const prog = $('prog'), pars = [...document.querySelectorAll('[data-par]')], pimg = document.querySelector('[data-pimg]'),
  pys = [document.querySelector('.details-section')];
let tk = false;
function onScroll() { tk = false;
  const h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
  if (reduce) return; const vh = innerHeight;
  const rs = pars.map(el => el.getBoundingClientRect()), ri = pimg && pimg.parentElement.getBoundingClientRect(), rp = pys.map(el => el.getBoundingClientRect());
  pars.forEach((el, i) => { const r = rs[i]; if (r.bottom < -200 || r.top > vh + 200) return;
    el.style.translate = '0 ' + ((r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.par)).toFixed(1) + 'px'; });
  if (ri && ri.bottom > -50 && ri.top < vh + 50) { const v = Math.max(-18, Math.min(18, (ri.top + ri.height / 2 - vh / 2) * -.06)); pimg.style.translate = '0 ' + v.toFixed(1) + 'px'; }
  pys.forEach((el, i) => { const r = rp[i]; if (r.bottom < 0 || r.top > vh) return; el.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * -.12).toFixed(1) + 'px'); });
}
addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(onScroll); } }, {passive: true});
addEventListener('resize', onScroll); onScroll();

/* ===== micro-interactions ===== */
document.addEventListener('pointerdown', e => {
  const b = e.target.closest('.map-btn,.open-btn');
  if (b) { const r = b.getBoundingClientRect(), s = document.createElement('i'); s.className = 'rip';
    s.style.left = e.clientX - r.left + 'px'; s.style.top = e.clientY - r.top + 'px'; b.appendChild(s); setTimeout(() => s.remove(), 750); return; }
  if (reduce || e.target.closest('a,button,input')) return;
  burst(e.clientX, e.clientY, 14, true);
});
if (matchMedia('(hover:hover)').matches && !reduce) {
  document.querySelectorAll('.map-btn,.open-btn').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.translate = ((e.clientX - r.left - r.width / 2) * .18) + 'px ' + ((e.clientY - r.top - r.height / 2) * .3) + 'px'; });
    b.addEventListener('pointerleave', () => { b.style.translate = '0 0'; });
  });
  let lastT = 0;
  document.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse' || performance.now() - lastT < 60) return; lastT = performance.now();
    bursts.push({ x: e.clientX, y: e.clientY, vx: R(-20, 20), vy: R(10, 50), g: true, s: R(.2, .5), t: 0, life: .9, rot: 0, vr: 0, fl: 0, spr: petalSpr[2] }); });
}
