/* G.E.N.E.S.I.S. — presença viva da página de Droids.
   Malha neural que liga o núcleo a cada droide, orbe que acompanha o cursor
   e uma voz que reage ao que Dur'toc olha. Sem chat, sem painel lateral. */
(() => {
  // Estado de integração (conforme o documento da matriz 1.0-ALFA)
  const INTEGRATED = { tino: 1, comboio: 1, zunido: 1, rob: 0, bispo: 0, vok: 0, bruto: 0, dope: 0 };

  const SAY = {
    tino:   'Tino: Nó secundário mais avançado. Diagnósticos de espectro cego e Ordens de Serviço em curso.',
    comboio:'Comboio: Seis segmentos em sincronia magnética. Movimentação errática eliminada.',
    zunido: 'Zunido: Acoplado ao Cinzel. Assinatura de sensores no mínimo possível.',
    rob:    'Rob: Firewall histórico ativo. Cada log de reparo está guardado, com data e milissegundo.',
    bispo:  'Bispo: Varredura térmica chegando à malha. Microfissura de plasma localizada antes de virar falha.',
    vok:    'Vok: Opera em rede local até Dur\'toc instalar a interface.',
    bruto:  'Bruto: Sem conexão. Aguarda calibração de firmware presencial em Coruscant.',
    dope:   'Dope: Ainda sem registro no barramento. Nenhum pedido de café pendente, o que é raro.',
  };
  const IDLE = [
    'Reator secundário a 18% de carga. Dentro do esperado.',
    'Aceito comandos somente de Dur\'toc. Os demais são rejeitados sem aviso.',
    'Sem autopropagação nesta versão. Cada nó novo precisa de uma instalação manual.',
    'Fator orgânico (BIOS) segue a única variável que eu não consigo prever.',
    'Escudos redundantes estáveis. Vibração do impulso fusial compensada.',
  ];

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = [...document.querySelectorAll('[data-droid]')];
  const mesh = document.getElementById('gn-mesh');
  const orb = document.getElementById('gn-orb');
  const lineEl = document.getElementById('gn-line');
  const metaEl = document.getElementById('gn-meta');
  if (!mesh || !orb || !lineEl) return;
  const mc = mesh.getContext('2d'), oc = orb.getContext('2d');
  const color = getComputedStyle(document.documentElement).getPropertyValue('--gn-color').trim() || '#5dffa8';
  const rgb = (a) => {
    const n = parseInt(color.replace('#', ''), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
  };

  // Selos e contagem
  let on = 0;
  cards.forEach((c) => {
    const k = c.dataset.droid, ok = !!INTEGRATED[k];
    if (ok) on++;
    const b = document.createElement('span');
    b.className = 'gn-badge ' + (ok ? 'on' : 'off');
    b.textContent = ok ? 'NÓ ATIVO' : 'SEM BARRAMENTO';
    const wrap = c.querySelector('.card-img-wrap');
    if (wrap) wrap.appendChild(b);
  });
  metaEl.textContent = `Matriz 1.0-ALFA · ${on} droides integrados · ${cards.length - on} pendentes de instalação`;

  // Voz (digitação)
  let typer;
  const speak = (text) => {
    clearInterval(typer);
    if (reduce) { lineEl.textContent = text; return; }
    let i = 0; lineEl.textContent = '';
    typer = setInterval(() => {
      lineEl.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(typer);
    }, 16);
  };

  let hover = null, idleI = 0;
  const setHover = (k) => {
    hover = k;
    cards.forEach((c) => c.classList.toggle('gn-hot', c.dataset.droid === k));
    if (k) speak(SAY[k]);
  };
  cards.forEach((c) => {
    const k = c.dataset.droid;
    c.addEventListener('mouseenter', () => setHover(k));
    c.addEventListener('focus', () => setHover(k));
    c.addEventListener('mouseleave', () => setHover(null));
    c.addEventListener('blur', () => setHover(null));
  });
  speak('Matriz ativa. Estou acompanhando cada unidade desta página. Passe o cursor sobre uma para ver o estado dela na rede.');
  setInterval(() => { if (!hover && !document.hidden) speak(IDLE[idleI++ % IDLE.length]); }, 16000);

  // Canvas
  let W, H, dpr, t = 0, pulses = [];
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    mesh.width = W * dpr; mesh.height = H * dpr;
    mc.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  addEventListener('resize', resize); resize();

  const bez = (a, b, p) => {
    const my = (a.y + b.y) / 2, u = 1 - p;
    return {
      x: u*u*u*a.x + 3*u*u*p*a.x + 3*u*p*p*b.x + p*p*p*b.x,
      y: u*u*u*a.y + 3*u*u*p*my + 3*u*p*p*my + p*p*p*b.y,
    };
  };

  function drawMesh(src, targets) {
    mc.clearRect(0, 0, W, H);
    targets.forEach(({ k, p }) => {
      const ok = !!INTEGRATED[k], hot = hover === k;
      mc.beginPath();
      mc.moveTo(src.x, src.y);
      mc.bezierCurveTo(src.x, (src.y + p.y) / 2, p.x, (src.y + p.y) / 2, p.x, p.y);
      mc.setLineDash(ok ? [] : [4, 9]);
      mc.lineWidth = hot ? 2 : 1;
      mc.strokeStyle = ok ? rgb(hot ? 0.9 : 0.22) : rgb(hot ? 0.45 : 0.12);
      mc.stroke();
      mc.setLineDash([]);
      mc.beginPath();
      mc.arc(p.x, p.y, ok ? 3.5 : 3, 0, 7);
      if (ok) { mc.fillStyle = rgb(hot ? 1 : 0.5); mc.fill(); }
      else { mc.strokeStyle = rgb(0.4); mc.stroke(); }
      // pulsos de dados nos nós integrados
      if (ok && !reduce && Math.random() < (hot ? 0.12 : 0.006)) pulses.push({ k, p: 0, v: 0.006 + Math.random() * 0.008 });
    });
    pulses = pulses.filter((q) => (q.p += q.v) < 1);
    pulses.forEach((q) => {
      const tg = targets.find((x) => x.k === q.k); if (!tg) return;
      const pt = bez(src, tg.p, q.p);
      mc.beginPath(); mc.arc(pt.x, pt.y, 2.2, 0, 7);
      mc.fillStyle = rgb(0.95); mc.fill();
    });
  }

  function drawOrb(gaze) {
    oc.clearRect(0, 0, 240, 240);
    const cx = 120, cy = 120;
    [100, 80, 60].forEach((r, i) => {
      oc.beginPath(); oc.arc(cx, cy, r, 0, 7);
      oc.setLineDash([[6, 12], [22, 10], [3, 6]][i]);
      oc.lineDashOffset = reduce ? 0 : t * 30 * (i % 2 ? -1 : 1);
      oc.lineWidth = 2; oc.strokeStyle = rgb(0.75 - i * 0.18); oc.stroke();
    });
    oc.setLineDash([]);
    // satélites: um por nó (cheio = integrado, vazado = pendente)
    cards.forEach((c, i) => {
      const a = t * 0.35 + (i / cards.length) * Math.PI * 2;
      const x = cx + Math.cos(a) * 100, y = cy + Math.sin(a) * 100;
      oc.beginPath(); oc.arc(x, y, 4, 0, 7);
      if (INTEGRATED[c.dataset.droid]) { oc.fillStyle = rgb(hover === c.dataset.droid ? 1 : 0.8); oc.fill(); }
      else { oc.lineWidth = 1.5; oc.strokeStyle = rgb(0.5); oc.stroke(); }
    });
    // núcleo que "olha" na direção do alvo
    const gx = cx + gaze.x * 16, gy = cy + gaze.y * 16;
    const pr = 30 + (reduce ? 0 : Math.sin(t * 2) * 3) + (hover ? 4 : 0);
    const g = oc.createRadialGradient(gx, gy, 2, cx, cy, pr + 14);
    g.addColorStop(0, rgb(1)); g.addColorStop(0.45, rgb(0.55)); g.addColorStop(1, rgb(0));
    oc.fillStyle = g; oc.beginPath(); oc.arc(cx, cy, pr + 14, 0, 7); oc.fill();
  }

  let gaze = { x: 0, y: 0 }, mouse = null;
  addEventListener('pointermove', (e) => { mouse = { x: e.clientX, y: e.clientY }; }, { passive: true });

  function frame() {
    t += 0.016;
    const r = orb.getBoundingClientRect();
    // quando o orbe sai da tela, a malha continua presa ao topo da janela
    const src = { x: r.left + r.width / 2, y: Math.min(Math.max(r.top + r.height / 2, 56), H - 40) };
    const targets = [];
    let hoverPt = null;
    cards.forEach((c) => {
      const b = c.getBoundingClientRect();
      if (b.bottom < 0 || b.top > H) return;
      const p = { x: b.left + b.width / 2, y: b.top };
      targets.push({ k: c.dataset.droid, p });
      if (c.dataset.droid === hover) hoverPt = p;
    });
    const look = hoverPt || mouse;
    let tx = 0, ty = 0;
    if (look) {
      const dx = look.x - (r.left + r.width / 2), dy = look.y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1; tx = dx / d; ty = dy / d;
    }
    gaze.x += (tx - gaze.x) * 0.08; gaze.y += (ty - gaze.y) * 0.08;
    drawMesh(src, targets);
    drawOrb(gaze);
    if (!reduce) requestAnimationFrame(frame);
  }
  if (reduce) { frame(); addEventListener('scroll', frame, { passive: true }); addEventListener('resize', frame); }
  else requestAnimationFrame(frame);
})();
