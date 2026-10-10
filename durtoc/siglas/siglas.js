/* =====================================================================
   siglas.js — Núcleo do Léxico do Dur'toc
   Estado, busca/filtros, cards, modais, adicionar/editar/remover,
   favoritos, exportar/importar. Expõe window.Lexico para o
   sugestor (sugestoes.js) e o droide-guia (tino.js).
   ===================================================================== */
(function () {
  'use strict';

  const D = window.DURTOC_DEFAULTS || { version: 1, descricoes: {}, items: [] };
  const KEY = 'durtoc.lexico.v1';
  const FAVKEY = 'durtoc.lexico.fav.v1';
  const VIEWKEY = 'durtoc.lexico.view.v1';

  const TIPOS = {
    sigla: { rotulo: 'Sigla', plural: 'Siglas' },
    giria: { rotulo: 'Gíria', plural: 'Gírias' },
    expressao: { rotulo: 'Expressão', plural: 'Expressões' }
  };

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));

  /* ---------- Utilidades ---------- */
  // Minúsculas sem acento, preservando o comprimento da string (1 char -> 1 char)
  function fold(s) {
    s = String(s == null ? '' : s);
    let out = '';
    for (let i = 0; i < s.length; i++) {
      const c = s.charAt(i);
      const b = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      out += b.length === 1 ? b : (c.toLowerCase().charAt(0) || c);
    }
    return out;
  }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const str = v => (v == null ? '' : String(v).trim());
  const list = (v, sep) => {
    if (Array.isArray(v)) return v.map(str).filter(Boolean);
    if (typeof v === 'string') return v.split(sep || /\n/).map(str).filter(Boolean);
    return [];
  };
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  };

  /* ---------- Modelo ---------- */
  function clean(raw) {
    if (!raw || typeof raw !== 'object' || !TIPOS[raw.tipo]) return null;
    const it = {
      id: raw.id || uid(),
      tipo: raw.tipo,
      categoria: str(raw.categoria) || 'Sem categoria',
      definicao: str(raw.definicao),
      exemplos: list(raw.exemplos),
      tags: list(raw.tags, /[,\n]/).map(t => t.toLowerCase()),
      padrao: !!raw.padrao,
      editado: !!raw.editado,
      criado: Number(raw.criado) || 0
    };
    if (it.tipo === 'sigla') {
      it.termo = str(raw.termo);
      it.significado = str(raw.significado);
      it.pronuncia = raw.pronuncia === 'soletrada' ? 'soletrada' : 'palavra';
      if (!it.termo) return null;
    } else {
      it.texto = str(raw.texto);
      it.cena = str(raw.cena);
      if (!it.texto) return null;
    }
    return it;
  }

  function defaults() {
    return D.items.map((r, i) => {
      const c = clean(r);
      if (c) { c.id = 'p' + ('000' + (i + 1)).slice(-3); c.padrao = true; }
      return c;
    }).filter(Boolean);
  }

  function carregar() {
    const raw = store.get(KEY);
    if (raw) {
      try {
        const o = JSON.parse(raw);
        if (o && Array.isArray(o.items)) return o.items.map(clean).filter(Boolean);
      } catch (e) { /* cai para o padrão */ }
    }
    return defaults();
  }

  const state = {
    items: carregar(),
    favs: new Set(),
    f: { q: '', tipo: 'todos', cat: 'todas', pron: 'todas', fav: false, ord: 'padrao' },
    view: store.get(VIEWKEY) === 'list' ? 'list' : 'grid',
    lista: [], openId: null, editId: null, undo: null, lastQ: '', catSig: ''
  };
  try { JSON.parse(store.get(FAVKEY) || '[]').forEach(id => state.favs.add(id)); } catch (e) { /* ignora */ }

  function salvar() {
    const ok = store.set(KEY, JSON.stringify({ version: D.version, items: state.items }));
    if (!ok) toast('Não consegui salvar no navegador (armazenamento cheio ou bloqueado). As alterações valem só até fechar a página.');
  }
  const salvarFavs = () => store.set(FAVKEY, JSON.stringify(Array.from(state.favs)));

  const byId = id => state.items.find(i => i.id === id);
  const rotulo = it => it.termo || it.texto;
  const chaveDup = it => it.tipo + '|' + (it.tipo === 'sigla' ? fold(it.termo).replace(/[.\s]/g, '') : fold(it.texto).replace(/\s+/g, ' '));

  /* ---------- Eventos para o droide-guia ---------- */
  function emit(type, data) {
    document.dispatchEvent(new CustomEvent('lexico', { detail: Object.assign({ type: type }, data || {}) }));
  }

  /* ---------- Busca ---------- */
  const hayCache = new WeakMap();
  function hay(it) {
    let h = hayCache.get(it);
    if (h) return h;
    const parts = [it.termo, it.termo && it.termo.replace(/[.\s]/g, ''), it.significado, it.texto, it.cena,
      it.categoria, it.definicao, it.exemplos.join(' '), it.tags.join(' '), TIPOS[it.tipo].rotulo];
    h = fold(parts.filter(Boolean).join(' | '));
    hayCache.set(it, h);
    return h;
  }

  function hl(text, toks) {
    text = String(text == null ? '' : text);
    if (!toks || !toks.length) return esc(text);
    const f = fold(text), m = new Array(text.length).fill(false);
    toks.forEach(t => {
      if (!t) return;
      let i = f.indexOf(t);
      while (i > -1) { for (let j = i; j < i + t.length; j++) m[j] = true; i = f.indexOf(t, i + t.length); }
    });
    let out = '', run = '', on = false;
    for (let k = 0; k < text.length; k++) {
      if (m[k] !== on) { out += on ? '<mark class="sg-mark">' + esc(run) + '</mark>' : esc(run); run = ''; on = m[k]; }
      run += text.charAt(k);
    }
    return out + (on ? '<mark class="sg-mark">' + esc(run) + '</mark>' : esc(run));
  }

  function relevancia(it, toks) {
    const nome = fold(rotulo(it)).replace(/[.\s]/g, '');
    const sig = fold(it.significado || it.texto || '');
    let s = 0;
    toks.forEach(t => {
      const tt = t.replace(/\./g, '');
      if (nome === tt) s += 100;
      else if (nome.indexOf(tt) === 0) s += 50;
      else if (sig.indexOf(t) > -1) s += 10;
    });
    return s;
  }

  function filtrar(toks) {
    const f = state.f;
    let r = state.items.filter(it => {
      if (f.tipo !== 'todos' && it.tipo !== f.tipo) return false;
      if (f.cat !== 'todas' && it.categoria !== f.cat) return false;
      if (f.pron !== 'todas' && it.pronuncia !== f.pron) return false;
      if (f.fav && !state.favs.has(it.id)) return false;
      if (toks.length) { const h = hay(it); for (let i = 0; i < toks.length; i++) if (h.indexOf(toks[i]) < 0) return false; }
      return true;
    });
    const idx = new Map(state.items.map((it, i) => [it.id, i]));
    if (f.ord === 'az') r.sort((a, b) => fold(rotulo(a)).localeCompare(fold(rotulo(b)), 'pt'));
    else if (f.ord === 'cat') r.sort((a, b) => a.categoria.localeCompare(b.categoria, 'pt') || idx.get(a.id) - idx.get(b.id));
    else if (f.ord === 'recentes') r.sort((a, b) => (b.criado || 0) - (a.criado || 0) || idx.get(a.id) - idx.get(b.id));
    else if (toks.length) r.sort((a, b) => relevancia(b, toks) - relevancia(a, toks) || idx.get(a.id) - idx.get(b.id));
    return r;
  }

  function pesquisar(q, max) {
    const toks = fold(q).split(/\s+/).filter(Boolean);
    if (!toks.length) return [];
    const r = state.items.filter(it => { const h = hay(it); return toks.every(t => h.indexOf(t) > -1); });
    r.sort((a, b) => relevancia(b, toks) - relevancia(a, toks));
    return max ? r.slice(0, max) : r;
  }

  /* ---------- Cards ---------- */
  function cardHtml(it, toks) {
    const fav = state.favs.has(it.id);
    let h = `<article class="mcmt-card sg-card sg-t-${it.tipo}" tabindex="0" role="button" data-id="${esc(it.id)}" aria-label="Abrir ${esc(rotulo(it))}">`;
    h += `<span class="card-status sg-badge">${TIPOS[it.tipo].rotulo}</span>`;
    h += `<button type="button" class="sg-fav${fav ? ' on' : ''}" data-act="fav" aria-pressed="${fav}" aria-label="${fav ? 'Remover dos favoritos' : 'Favoritar'}">${fav ? '★' : '☆'}</button>`;
    h += '<div class="card-body">';
    if (it.tipo === 'sigla') {
      h += `<div class="card-designation">${esc(it.termo)}</div>`;
      h += `<div class="card-name sg-term">${hl(it.termo, toks)}</div>`;
      h += `<div class="card-alias">${hl(it.significado, toks)}</div>`;
      if (it.definicao) h += `<p class="sg-snippet">${hl(it.definicao, toks)}</p>`;
      h += `<div class="sg-meta"><span class="sg-pron sg-pron-${it.pronuncia}">${it.pronuncia === 'soletrada' ? 'soletrada' : 'como palavra'}</span></div>`;
    } else {
      h += `<div class="card-designation">${it.tipo === 'giria' ? 'giria' : 'expressao'}</div>`;
      if (it.cena) h += `<div class="sg-cena">(${hl(it.cena, toks)})</div>`;
      h += `<blockquote class="sg-quote">“${hl(it.texto, toks)}”</blockquote>`;
      if (it.definicao) h += `<p class="sg-snippet">${hl(it.definicao, toks)}</p>`;
    }
    h += `<div class="card-role">${hl(it.categoria, toks)}</div></div></article>`;
    return h;
  }

  /* ---------- Render ---------- */
  function categoriasDo(tipo) {
    const m = new Map();
    state.items.forEach(it => { if (tipo === 'todos' || it.tipo === tipo) m.set(it.categoria, (m.get(it.categoria) || 0) + 1); });
    return Array.from(m.entries());
  }

  function render() {
    const toks = fold(state.f.q).split(/\s+/).filter(Boolean);
    const r = filtrar(toks);
    state.lista = r;
    const grid = $('#sgGrid');
    grid.className = 'cards-grid sg-grid' + (state.view === 'list' ? ' sg-list' : '');
    grid.innerHTML = r.map(it => cardHtml(it, toks)).join('');
    $('#sgEmpty').hidden = r.length > 0;
    $('#sgCount').textContent = r.length === state.items.length
      ? `${r.length} registros no léxico`
      : `${r.length} de ${state.items.length} registros`;
    syncUI();
    if (state.f.q !== state.lastQ) {
      state.lastQ = state.f.q;
      emit('busca', { q: state.f.q.trim(), n: r.length });
    }
  }

  function syncUI() {
    const f = state.f;
    const cnt = { todos: state.items.length, sigla: 0, giria: 0, expressao: 0 };
    state.items.forEach(it => cnt[it.tipo]++);
    $$('#sgTabs .sg-tab').forEach(b => {
      const on = b.dataset.tipo === f.tipo;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on);
      b.querySelector('i').textContent = cnt[b.dataset.tipo];
    });
    // categorias
    const cats = categoriasDo(f.tipo);
    const sig = f.tipo + '|' + cats.map(c => c.join(':')).join(',');
    const sel = $('#sgCat');
    if (sig !== state.catSig) {
      state.catSig = sig;
      sel.innerHTML = '<option value="todas">Todas as categorias</option>' +
        cats.map(c => `<option value="${esc(c[0])}">${esc(c[0])} (${c[1]})</option>`).join('');
      const dl = $('#dlCats');
      if (dl) {
        dl.innerHTML = categoriasDo('todos').map(c => `<option value="${esc(c[0])}"></option>`).join('');
      }
    }
    if (f.cat !== 'todas' && !cats.some(c => c[0] === f.cat)) f.cat = 'todas';
    sel.value = f.cat;
    $('#sgPron').value = f.pron;
    $('#sgPron').disabled = f.tipo === 'giria' || f.tipo === 'expressao';
    $('#sgOrd').value = f.ord;
    const favBtn = $('#sgFavOnly');
    favBtn.setAttribute('aria-pressed', f.fav);
    favBtn.classList.toggle('active', f.fav);
    const ativo = f.q.trim() || f.tipo !== 'todos' || f.cat !== 'todas' || f.pron !== 'todas' || f.fav;
    $('#sgReset').hidden = !ativo;
    $('#sgClearQ').hidden = !f.q;
    $('#sgSearch').value = f.q;
    // descrição da categoria
    const info = $('#sgCatInfo');
    const d = f.cat !== 'todas' && D.descricoes ? D.descricoes[f.cat] : '';
    info.hidden = !d;
    info.textContent = d || '';
    // visualização
    $('#vwGrid').setAttribute('aria-pressed', state.view === 'grid');
    $('#vwList').setAttribute('aria-pressed', state.view === 'list');
    // estatísticas
    $('#stSig').textContent = cnt.sigla;
    $('#stGir').textContent = cnt.giria;
    $('#stExp').textContent = cnt.expressao;
    $('#stCat').textContent = categoriasDo('todos').length;
  }

  function setFiltro(obj) {
    Object.assign(state.f, obj || {});
    render();
  }

  /* ---------- Toast ---------- */
  function toast(msg, opt) {
    opt = opt || {};
    const box = $('#sgToasts');
    const t = document.createElement('div');
    t.className = 'sg-toast';
    t.setAttribute('role', 'status');
    const p = document.createElement('span');
    p.textContent = msg;
    t.appendChild(p);
    if (opt.acao) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = opt.acao.t;
      b.addEventListener('click', () => { opt.acao.fn(); t.remove(); });
      t.appendChild(b);
    }
    box.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, opt.ms || 3200);
  }

  function copiar(txt, msg) {
    const fallback = () => {
      const t = document.createElement('textarea');
      t.value = txt; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); toast(msg || 'Copiado.'); } catch (e) { toast('Não foi possível copiar.'); }
      t.remove();
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(() => toast(msg || 'Copiado.'), fallback);
    } else fallback();
  }

  function falar(it) {
    if (!('speechSynthesis' in window)) { toast('Este navegador não tem síntese de voz.'); return; }
    let txt;
    if (it.tipo === 'sigla') {
      txt = it.pronuncia === 'soletrada'
        ? it.termo.replace(/[^A-Za-zÀ-ÿ]/g, '').split('').join(', ')
        : it.termo.toLowerCase();
    } else txt = it.texto;
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = 'pt-BR'; u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  const textoCopia = it => it.tipo === 'sigla' ? `${it.termo} — ${it.significado}` : it.texto;

  /* ---------- Modais ---------- */
  function openModal(ov) {
    ov._prev = document.activeElement;
    ov.classList.add('open');
    document.body.classList.add('sg-lock');
    const f = ov.querySelector('[data-focus]') || ov.querySelector('input:not([type=hidden]),select,textarea,button');
    if (f) setTimeout(() => f.focus(), 30);
  }
  function closeModal(ov) {
    if (!ov.classList.contains('open')) return;
    ov.classList.remove('open');
    if (!$('.mcmt-modal-overlay.open')) document.body.classList.remove('sg-lock');
    if (ov._cancel) { const c = ov._cancel; ov._cancel = null; c(); }
    if (ov._prev && ov._prev.focus) { try { ov._prev.focus(); } catch (e) { /* ignora */ } }
  }

  function ask(titulo, msg, botoes) {
    return new Promise(res => {
      const ov = $('#sgConfirm');
      $('#sgConfirmTitle').textContent = titulo;
      $('#sgConfirmMsg').textContent = msg;
      const box = $('#sgConfirmBtns');
      box.innerHTML = '';
      botoes.forEach((b, i) => {
        const bt = document.createElement('button');
        bt.type = 'button';
        bt.className = 'sg-btn ' + (b.cls || '');
        if (i === 0) bt.setAttribute('data-focus', '');
        bt.textContent = b.t;
        bt.addEventListener('click', () => { ov._cancel = null; closeModal(ov); res(b.v); });
        box.appendChild(bt);
      });
      ov._cancel = () => res(null);
      openModal(ov);
    });
  }

  /* ---------- Detalhe ---------- */
  function detalheHtml(it) {
    const fav = state.favs.has(it.id);
    const origem = it.padrao ? (it.editado ? 'Arquivo padrão (editado)' : 'Arquivo padrão') : 'Adicionado por você';
    let h = '<div class="modal-close sg-modal-bar"><div class="sg-bar-actions">' +
      `<button type="button" class="sg-btn" data-act="fav">${fav ? '★ Favorito' : '☆ Favoritar'}</button>` +
      '<button type="button" class="sg-btn" data-act="copiar">Copiar</button>' +
      '<button type="button" class="sg-btn" data-act="ouvir">Ouvir</button>' +
      '<button type="button" class="sg-btn" data-act="editar">Editar</button>' +
      '<button type="button" class="sg-btn sg-danger" data-act="excluir">Excluir</button>' +
      '</div><button type="button" data-close data-focus>Fechar</button></div>';
    h += '<div class="modal-inner"><div class="modal-img-col sg-big-col">';
    if (it.tipo === 'sigla') {
      h += `<div class="sg-big">${esc(it.termo)}</div>`;
      h += `<div class="sg-big-pron">${it.pronuncia === 'soletrada' ? 'dita letra por letra' : 'dita como palavra'}</div>`;
    } else {
      h += '<div class="sg-big sg-big-quote">“</div>';
      h += `<div class="sg-big-pron">${TIPOS[it.tipo].rotulo}</div>`;
    }
    h += '</div><div class="modal-content-col">';
    h += `<div class="modal-eyebrow">${TIPOS[it.tipo].rotulo} · ${esc(it.categoria)}</div>`;
    if (it.tipo === 'sigla') {
      h += `<h3 class="modal-title">${esc(it.significado || it.termo)}</h3>`;
      h += `<div class="modal-subtitle">${esc(it.termo)}</div>`;
    } else {
      if (it.cena) h += `<div class="modal-subtitle">(${esc(it.cena)})</div>`;
      h += `<h3 class="modal-title sg-title-quote">“${esc(it.texto)}”</h3>`;
    }
    if (it.definicao) {
      h += `<div class="modal-section-label">${it.tipo === 'sigla' ? 'Definição' : 'Quando usar'}</div>`;
      h += `<p class="modal-desc">${esc(it.definicao)}</p>`;
    }
    if (it.exemplos.length) {
      h += '<div class="modal-section-label">Exemplos de uso</div>';
      it.exemplos.forEach((ex, i) => {
        h += `<div class="sg-example"><p>“${esc(ex)}”</p><button type="button" class="sg-btn sg-mini" data-act="copiar-ex" data-i="${i}">Copiar</button></div>`;
      });
    }
    if (it.tags.length) {
      h += '<div class="modal-section-label">Tags</div><div class="trait-list">' +
        it.tags.map(t => `<span class="trait">${esc(t)}</span>`).join('') + '</div>';
    }
    h += '<div class="modal-section-label">Ficha</div><table class="spec-table">';
    h += `<tr><td>Tipo</td><td>${TIPOS[it.tipo].rotulo}</td></tr>`;
    h += `<tr><td>Categoria</td><td>${esc(it.categoria)}</td></tr>`;
    if (it.tipo === 'sigla') h += `<tr><td>Pronúncia</td><td>${it.pronuncia === 'soletrada' ? 'Soletrada (letra por letra)' : 'Como palavra'}</td></tr>`;
    h += `<tr><td>Origem</td><td>${origem}</td></tr>`;
    h += '</table></div></div>';
    return h;
  }

  function abrir(id) {
    const it = byId(id);
    if (!it) return;
    state.openId = id;
    const ov = $('#sgDetail');
    const m = $('.mcmt-modal', ov);
    m.className = 'mcmt-modal sg-modal sg-t-' + it.tipo;
    m.innerHTML = detalheHtml(it);
    openModal(ov);
    emit('abrir', { id: id, tipo: it.tipo });
  }

  function refreshDetalhe() {
    const ov = $('#sgDetail');
    if (!ov.classList.contains('open')) return;
    const it = byId(state.openId);
    if (!it) { closeModal(ov); return; }
    $('.mcmt-modal', ov).innerHTML = detalheHtml(it);
  }

  function toggleFav(id) {
    if (state.favs.has(id)) state.favs.delete(id); else state.favs.add(id);
    salvarFavs();
    render();
    refreshDetalhe();
  }

  /* ---------- Remover (com desfazer) ---------- */
  function excluir(id) {
    const i = state.items.findIndex(x => x.id === id);
    if (i < 0) return;
    const it = state.items[i];
    state.items.splice(i, 1);
    state.undo = { it: it, i: i };
    salvar();
    closeModal($('#sgDetail'));
    render();
    emit('excluido', { id: id });
    toast(`“${rotulo(it).slice(0, 40)}” removido.`, {
      ms: 7000,
      acao: { t: 'Desfazer', fn: () => {
        if (!state.undo) return;
        state.items.splice(Math.min(state.undo.i, state.items.length), 0, state.undo.it);
        state.undo = null;
        salvar(); render();
        toast('Registro restaurado.');
      } }
    });
  }

  /* ---------- Formulário (adicionar / editar) ---------- */
  function syncTipo() {
    const t = $('#fTipo').value;
    $$('#sgFormEl [data-for]').forEach(el => { el.hidden = el.dataset.for.split(' ').indexOf(t) < 0; });
    $('#fDefLbl').textContent = t === 'sigla' ? 'Definição' : 'Quando usar / contexto (opcional)';
  }

  function abrirForm(it, pre) {
    const form = $('#sgFormEl');
    form.reset();
    $('#fErro').textContent = '';
    state.editId = it ? it.id : null;
    $('#sgFormTitle').textContent = it ? 'Editar registro' : 'Nova entrada';
    $('#fSalvar').textContent = it ? 'Salvar alterações' : 'Adicionar ao léxico';
    const v = it || pre || {};
    $('#fTipo').value = v.tipo || 'sigla';
    $('#fTipo').disabled = !!it;
    $('#fTermo').value = v.termo || '';
    $('#fSignificado').value = v.significado || '';
    $('#fTexto').value = v.texto || '';
    $('#fCena').value = v.cena || '';
    $('#fCat').value = v.categoria || '';
    $('#fDef').value = v.definicao || '';
    $('#fExemplos').value = (v.exemplos || []).join('\n');
    $('#fTags').value = (v.tags || []).join(', ');
    const pr = v.pronuncia === 'soletrada' ? 'soletrada' : 'palavra';
    $$('input[name=fPron]').forEach(r => { r.checked = r.value === pr; });
    form.dataset.pronManual = it ? '1' : '';
    syncTipo();
    openModal($('#sgForm'));
    setTimeout(() => {
      const alvo = it ? ($('#fTipo').value === 'sigla' ? $('#fTermo') : $('#fTexto')) : $('#fTipo');
      alvo.focus();
    }, 40);
  }

  function salvarForm(ev) {
    ev.preventDefault();
    const err = $('#fErro');
    err.textContent = '';
    const tipo = $('#fTipo').value;
    const o = {
      tipo: tipo,
      categoria: $('#fCat').value,
      definicao: $('#fDef').value,
      exemplos: $('#fExemplos').value,
      tags: $('#fTags').value
    };
    if (tipo === 'sigla') {
      o.termo = $('#fTermo').value;
      o.significado = $('#fSignificado').value;
      o.pronuncia = ($$('input[name=fPron]').find(r => r.checked) || {}).value;
      if (!str(o.termo)) { err.textContent = 'Informe a sigla (ex.: GAFO ou G.A.F.O).'; $('#fTermo').focus(); return; }
      if (!str(o.significado)) { err.textContent = 'Informe o significado por extenso.'; $('#fSignificado').focus(); return; }
    } else {
      o.texto = $('#fTexto').value;
      o.cena = $('#fCena').value;
      if (!str(o.texto)) { err.textContent = 'Escreva o texto da fala.'; $('#fTexto').focus(); return; }
    }
    const novo = clean(o);
    if (!novo) { err.textContent = 'Preencha os campos obrigatórios.'; return; }

    const dup = state.items.find(x => x.id !== state.editId && chaveDup(x) === chaveDup(novo));
    if (dup) { err.textContent = `Já existe um registro igual: “${rotulo(dup).slice(0, 60)}”.`; return; }

    if (state.editId) {
      const i = state.items.findIndex(x => x.id === state.editId);
      const antigo = state.items[i];
      novo.id = antigo.id; novo.padrao = antigo.padrao; novo.criado = antigo.criado; novo.editado = true;
      state.items[i] = novo;
      toast('Registro atualizado.');
    } else {
      novo.id = uid(); novo.criado = Date.now();
      state.items.unshift(novo);
      toast('Registro adicionado ao léxico.');
    }
    salvar();
    closeModal($('#sgForm'));
    render();
    refreshDetalhe();
    emit('salvo', { id: novo.id, novo: !state.editId, tipo: novo.tipo });
  }

  /* ---------- Exportar / Importar / Restaurar ---------- */
  function exportar() {
    const blob = new Blob([JSON.stringify({
      app: 'durtoc-lexico', version: D.version, exportadoEm: new Date().toISOString(), items: state.items
    }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url; a.download = 'lexico-durtoc.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    toast('Léxico exportado.');
  }

  function importar(file) {
    const r = new FileReader();
    r.onload = () => {
      let novos;
      try {
        const o = JSON.parse(r.result);
        const l = Array.isArray(o) ? o : o.items;
        if (!Array.isArray(l)) throw new Error('formato');
        novos = l.map(clean).filter(Boolean);
      } catch (e) { toast('Arquivo inválido. Use um JSON exportado por esta página.'); return; }
      if (!novos.length) { toast('Nenhum registro válido encontrado no arquivo.'); return; }
      ask('Importar léxico', `${novos.length} registro(s) válido(s) no arquivo. Como deseja importar?`, [
        { t: 'Mesclar (só o que não existe)', v: 'mesclar', cls: 'sg-btn-primary' },
        { t: 'Substituir tudo', v: 'substituir', cls: 'sg-danger' },
        { t: 'Cancelar', v: null }
      ]).then(modo => {
        if (!modo) return;
        if (modo === 'substituir') {
          state.items = novos;
          const ids = new Set(novos.map(n => n.id));
          state.favs.forEach(id => { if (!ids.has(id)) state.favs.delete(id); });
          salvarFavs();
          toast(`Léxico substituído (${novos.length} registros).`);
        } else {
          const chaves = new Set(state.items.map(chaveDup));
          const ids = new Set(state.items.map(x => x.id));
          let n = 0;
          novos.forEach(it => {
            if (chaves.has(chaveDup(it))) return;
            if (ids.has(it.id)) it.id = uid();
            state.items.push(it); chaves.add(chaveDup(it)); ids.add(it.id); n++;
          });
          toast(n ? `${n} registro(s) novo(s) mesclado(s).` : 'Nada novo para mesclar: tudo já existe.');
        }
        salvar(); render();
        emit('importado', { modo: modo });
      });
    };
    r.readAsText(file);
  }

  function restaurar() {
    ask('Restaurar padrão', 'Isso descarta todas as suas alterações (adições, edições e remoções) e volta ao arquivo original do léxico. Considere exportar antes.', [
      { t: 'Restaurar padrão', v: true, cls: 'sg-danger' },
      { t: 'Cancelar', v: null, cls: '' }
    ]).then(ok => {
      if (!ok) return;
      state.items = defaults();
      const ids = new Set(state.items.map(x => x.id));
      state.favs.forEach(id => { if (!ids.has(id)) state.favs.delete(id); });
      salvarFavs();
      store.set(KEY, JSON.stringify({ version: D.version, items: state.items }));
      state.f = { q: '', tipo: 'todos', cat: 'todas', pron: 'todas', fav: false, ord: 'padrao' };
      render();
      toast('Léxico restaurado ao padrão.');
    });
  }

  function aleatorio() {
    const base = state.lista.length ? state.lista : state.items;
    if (!base.length) return;
    abrir(base[Math.floor(Math.random() * base.length)].id);
  }

  /* ---------- Ligações da interface ---------- */
  function init() {
    // fundo em Aurebesh
    const bg = $('#aurebeshBg');
    if (bg) { let s = ''; for (let i = 0; i < 70; i++) s += 'engrenagem mestra durtoc oficina conserto torque graxa '; bg.textContent = s; }

    // busca (com debounce)
    let t;
    $('#sgSearch').addEventListener('input', e => {
      clearTimeout(t);
      const v = e.target.value;
      t = setTimeout(() => setFiltro({ q: v }), 110);
    });
    $('#sgClearQ').addEventListener('click', () => { setFiltro({ q: '' }); $('#sgSearch').focus(); });

    $('#sgTabs').addEventListener('click', e => {
      const b = e.target.closest('.sg-tab');
      if (b) setFiltro({ tipo: b.dataset.tipo });
    });
    $('#sgCat').addEventListener('change', e => setFiltro({ cat: e.target.value }));
    $('#sgPron').addEventListener('change', e => setFiltro({ pron: e.target.value }));
    $('#sgOrd').addEventListener('change', e => setFiltro({ ord: e.target.value }));
    $('#sgFavOnly').addEventListener('click', () => setFiltro({ fav: !state.f.fav }));
    $('#sgReset').addEventListener('click', () => setFiltro({ q: '', tipo: 'todos', cat: 'todas', pron: 'todas', fav: false }));
    $('#sgEmptyReset').addEventListener('click', () => setFiltro({ q: '', tipo: 'todos', cat: 'todas', pron: 'todas', fav: false }));
    $('#sgEmptyNovo').addEventListener('click', () => {
      const q = state.f.q.trim();
      abrirForm(null, q ? { tipo: 'giria', texto: q } : null);
    });

    $('#vwGrid').addEventListener('click', () => { state.view = 'grid'; store.set(VIEWKEY, 'grid'); render(); });
    $('#vwList').addEventListener('click', () => { state.view = 'list'; store.set(VIEWKEY, 'list'); render(); });

    $('#btnNovo').addEventListener('click', () => abrirForm(null));
    $('#btnAleatorio').addEventListener('click', aleatorio);
    $('#btnExport').addEventListener('click', exportar);
    $('#btnImport').addEventListener('click', () => $('#fileImport').click());
    $('#fileImport').addEventListener('change', e => { if (e.target.files[0]) importar(e.target.files[0]); e.target.value = ''; });
    $('#btnRestaurar').addEventListener('click', restaurar);

    // grid: abrir card / favoritar
    const grid = $('#sgGrid');
    grid.addEventListener('click', e => {
      const card = e.target.closest('.sg-card');
      if (!card) return;
      if (e.target.closest('[data-act="fav"]')) { toggleFav(card.dataset.id); return; }
      abrir(card.dataset.id);
    });
    grid.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('sg-card')) {
        e.preventDefault(); abrir(e.target.dataset.id);
      }
    });

    // detalhe
    $('#sgDetail').addEventListener('click', e => {
      const ov = e.currentTarget;
      if (e.target === ov || e.target.closest('[data-close]')) { closeModal(ov); return; }
      const b = e.target.closest('[data-act]');
      const it = byId(state.openId);
      if (!b || !it) return;
      switch (b.dataset.act) {
        case 'fav': toggleFav(it.id); break;
        case 'copiar': copiar(textoCopia(it), 'Copiado.'); break;
        case 'copiar-ex': copiar(it.exemplos[+b.dataset.i], 'Exemplo copiado.'); break;
        case 'ouvir': falar(it); break;
        case 'editar': closeModal(ov); abrirForm(it); break;
        case 'excluir':
          ask('Excluir registro', `Remover “${rotulo(it).slice(0, 80)}” do léxico? Dá para desfazer logo em seguida.`, [
            { t: 'Excluir', v: true, cls: 'sg-danger' }, { t: 'Cancelar', v: null }
          ]).then(ok => { if (ok) excluir(it.id); });
          break;
      }
    });

    // formulário
    const fo = $('#sgForm');
    fo.addEventListener('click', e => { if (e.target === fo || e.target.closest('[data-close]')) closeModal(fo); });
    $('#fTipo').addEventListener('change', syncTipo);
    $('#sgFormEl').addEventListener('submit', salvarForm);
    $('#fCancelar').addEventListener('click', () => closeModal(fo));
    $('#fTermo').addEventListener('input', e => {
      if ($('#sgFormEl').dataset.pronManual) return;
      const pt = e.target.value.indexOf('.') > -1 ? 'soletrada' : 'palavra';
      $$('input[name=fPron]').forEach(r => { r.checked = r.value === pt; });
    });
    $$('input[name=fPron]').forEach(r => r.addEventListener('change', () => { $('#sgFormEl').dataset.pronManual = '1'; }));

    // confirmação
    const cf = $('#sgConfirm');
    cf.addEventListener('click', e => { if (e.target === cf) closeModal(cf); });

    // atalhos
    document.addEventListener('keydown', e => {
      const tag = (e.target.tagName || '').toLowerCase();
      const digitando = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
      if (e.key === '/' && !digitando && !e.ctrlKey && !e.metaKey) {
        e.preventDefault(); $('#sgSearch').focus(); $('#sgSearch').select();
      } else if (e.key === 'Escape') {
        const abertos = $$('.mcmt-modal-overlay.open');
        if (abertos.length) closeModal(abertos[abertos.length - 1]);
        else if (document.activeElement === $('#sgSearch') && state.f.q) setFiltro({ q: '' });
      }
    });

    render();
  }

  /* ---------- API pública ---------- */
  window.Lexico = {
    TIPOS: TIPOS,
    fold: fold, esc: esc, hl: hl,
    items: () => state.items,
    byId: byId, rotulo: rotulo,
    pesquisar: pesquisar,
    abrir: abrir,
    abrirForm: abrirForm,
    setFiltro: setFiltro,
    focarBusca: () => { const s = $('#sgSearch'); s.focus(); s.select(); },
    aleatorio: aleatorio,
    copiar: copiar, toast: toast, emit: emit,
    descricoes: () => D.descricoes || {}
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();