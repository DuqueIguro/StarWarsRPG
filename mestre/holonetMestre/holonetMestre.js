/* ================================================
   HOLONET — Console do Mestre
   mestre/holonetMestre/holonetMestre.js
   Requer: supabaseClient (js/supabase.js) e as tabelas holonet_*
   ================================================ */

'use strict';

(() => {

  /* ─── Constantes ─── */
  const T = {
    noticias: 'holonet_noticias',
    ticker:   'holonet_ticker',
    canais:   'holonet_transmissoes',
    mercados: 'holonet_mercados',
    config:   'holonet_config',
  };

  const CARGOS_MESTRE = ['mestre', 'dev', 'desenvolvedor'];

  const CATEGORIAS = ['URGENTE', 'POLÍTICA', 'ECONOMIA', 'CONFLITO', 'TECNOLOGIA', 'VARIEDADES'];
  const CAT_CLASS = {
    'URGENTE': 'urgente', 'POLÍTICA': 'politica', 'ECONOMIA': 'economia',
    'CONFLITO': 'conflito', 'TECNOLOGIA': 'tecnologia', 'VARIEDADES': 'variedades',
  };
  const ICONE_PADRAO = {
    'URGENTE': '🚨', 'POLÍTICA': '🏛', 'ECONOMIA': '💰',
    'CONFLITO': '⚔', 'TECNOLOGIA': '⚙', 'VARIEDADES': '✦',
  };

  const CFG_PADRAO = {
    hnn_version: 'HNN-7.4.2', data_universo: '',
    terminal_id: 'HNN-NODE-0047', terminal_setor: 'INNER RIM / CORUSCANT',
    terminal_cripto: 'ATIVA ✓', terminal_sinal: '80',
    alerta_ativo: 'true', alerta_cabecalho: '⚠ ALERTA DE SEGURANÇA IMPERIAL',
    alerta_aure_cab: '', alerta_titulo: '', alerta_texto: '', alerta_aure_rodape: '',
  };

  /* Configuração das listas editáveis em linha */
  const LISTAS = {
    ticker: {
      tabela: T.ticker,
      cols: 'minmax(0,1fr)',
      vazio: 'Nenhuma manchete cadastrada. Clique em “Adicionar manchete”.',
      novo: () => ({ texto: '', ativo: true }),
      campos: [{ k: 'texto', tipo: 'text', ph: 'Texto da manchete' }],
      payload: r => ({ texto: r.texto.trim(), ativo: !!r.ativo }),
      valido: r => r.texto.trim() !== '',
    },
    canais: {
      tabela: T.canais,
      cols: 'minmax(0,1fr) 150px minmax(0,2fr)',
      vazio: 'Nenhum canal cadastrado. Clique em “Adicionar canal”.',
      novo: () => ({ canal: '', status: 'AO VIVO', descricao: '', ativo: true }),
      campos: [
        { k: 'canal', tipo: 'text', ph: 'Nome do canal' },
        { k: 'status', tipo: 'select', opcoes: ['AO VIVO', 'GRAVADO'] },
        { k: 'descricao', tipo: 'text', ph: 'Descrição da transmissão' },
      ],
      payload: r => ({ canal: r.canal.trim(), status: r.status, descricao: r.descricao.trim(), ativo: !!r.ativo }),
      valido: r => r.canal.trim() !== '',
    },
    mercados: {
      tabela: T.mercados,
      cols: 'minmax(0,2fr) minmax(0,1fr) 110px 80px',
      vazio: 'Nenhum item de mercado. Clique em “Adicionar item”.',
      novo: () => ({ nome: '', valor: '', variacao: 0, ativo: true }),
      campos: [
        { k: 'nome', tipo: 'text', ph: 'Mercadoria' },
        { k: 'valor', tipo: 'text', ph: 'Cotação (opcional)' },
        { k: 'variacao', tipo: 'number', ph: 'Variação %', step: '0.1' },
        { k: '_dir', tipo: 'dir' },
      ],
      payload: r => ({ nome: r.nome.trim(), valor: String(r.valor ?? '').trim(), variacao: num(r.variacao), ativo: !!r.ativo }),
      valido: r => r.nome.trim() !== '' && Number.isFinite(num(r.variacao)),
    },
  };

  /* ─── Estado ─── */
  const S = {
    noticias: [], ticker: [], canais: [], mercados: [],
    config: { ...CFG_PADRAO },
    filtroCat: 'TODOS', busca: '',
    editandoId: null,
    sujo: {},          // { ticker:true, ... }
    importacao: null,  // dados lidos dos arquivos
  };

  /* ─── Utilitários ─── */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function esc(v) {
    return String(v ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  const nl2br = v => esc(v).replace(/\r?\n/g, '<br>');
  function num(v) { return Number(String(v).replace(',', '.')); }
  const sb = () => supabaseClient;

  function toast(msg, tipo = '') {
    const el = document.createElement('div');
    el.className = `hm-toast ${tipo}`;
    el.textContent = msg;
    $('#hm-toasts').appendChild(el);
    setTimeout(() => el.remove(), tipo === 'erro' ? 6000 : 3000);
  }

  function erroBanco(error, contexto) {
    console.error(`[Holonet Mestre] ${contexto}:`, error);
    const m = error?.message || String(error);
    toast(`${contexto}: ${m}`, 'erro');
  }

  function marcarSujo(aba, v = true) {
    S.sujo[aba] = v;
    $('#hm-unsaved').hidden = !Object.values(S.sujo).some(Boolean);
  }

  /* ─── Gate: login e cargo ─── */
  function gate(msg, mostrarLink = true) {
    $('#hm-gate').hidden = false;
    $('#hm-app').hidden = true;
    $('#hm-gate-msg').textContent = msg;
    $('#hm-gate-link').hidden = !mostrarLink;
  }

  async function init() {
    if (typeof supabaseClient === 'undefined') {
      gate('Não encontrei o cliente do Supabase. Confira se ../js/supabase.js está sendo carregado.', false);
      return;
    }

    const { data: userData, error: authErr } = await sb().auth.getUser();
    const user = userData?.user;
    if (authErr || !user) {
      gate('Você precisa estar logado para acessar o console da Holonet.');
      return;
    }

    const { data: perms, error: permErr } = await sb()
      .from('permissoes').select('cargo, nome').eq('user_id', user.id);
    if (permErr) { gate('Não foi possível verificar suas permissões.'); return; }

    const perm = (perms || []).find(p => CARGOS_MESTRE.includes(String(p.cargo).toLowerCase()));
    if (!perm) {
      gate('Acesso negado. Esta área é exclusiva de Mestres e Desenvolvedores.');
      return;
    }

    $('#hm-user').textContent = `${perm.nome || user.email} (${perm.cargo})`;

    const ok = await carregarTudo();
    if (!ok) return;

    $('#hm-gate').hidden = true;
    $('#hm-app').hidden = false;
    montarUI();
  }

  /* ─── Carga ─── */
  async function carregarTudo() {
    try {
      const lista = tabela => sb().from(tabela).select('*')
        .order('ordem', { ascending: true }).order('id', { ascending: true });

      const [n, t, c, m, cfg] = await Promise.all([
        lista(T.noticias), lista(T.ticker), lista(T.canais), lista(T.mercados),
        sb().from(T.config).select('chave, valor'),
      ]);

      const falha = [n, t, c, m, cfg].find(r => r.error);
      if (falha) {
        const naoExiste = falha.error.code === '42P01' || /does not exist|relation/i.test(falha.error.message || '');
        gate(naoExiste
          ? 'As tabelas da Holonet ainda não existem. Rode o arquivo holonet_schema.sql no SQL Editor do Supabase e recarregue.'
          : `Erro ao carregar dados: ${falha.error.message}`, false);
        return false;
      }

      S.noticias = n.data;
      S.ticker = t.data;
      S.canais = c.data;
      S.mercados = m.data.map(r => ({ ...r, variacao: Number(r.variacao) }));
      S.config = { ...CFG_PADRAO };
      cfg.data.forEach(r => { S.config[r.chave] = r.valor; });
      return true;
    } catch (e) {
      gate(`Erro inesperado: ${e.message}`, false);
      return false;
    }
  }

  async function recarregarLista(nome) {
    const { data, error } = await sb().from(T[nome]).select('*')
      .order('ordem', { ascending: true }).order('id', { ascending: true });
    if (error) { erroBanco(error, 'Recarregar'); return; }
    S[nome] = nome === 'mercados' ? data.map(r => ({ ...r, variacao: Number(r.variacao) })) : data;
  }

  /* ─── UI: montagem e abas ─── */
  function montarUI() {
    // abas
    $('#hm-rail').addEventListener('click', e => {
      const b = e.target.closest('.hm-tab');
      if (b) abrirAba(b.dataset.tab);
    });

    // filtro de categoria
    $('#filtro-cat').innerHTML = ['TODOS', ...CATEGORIAS]
      .map(c => `<option value="${esc(c)}">${c === 'TODOS' ? 'Todas as categorias' : esc(c)}</option>`).join('');
    $('#filtro-cat').addEventListener('change', e => { S.filtroCat = e.target.value; renderNoticias(); });
    $('#busca-noticia').addEventListener('input', e => { S.busca = e.target.value; renderNoticias(); });

    // categorias no editor
    $('#f-categoria').innerHTML = CATEGORIAS.map(c => `<option>${esc(c)}</option>`).join('');

    initNoticias();
    initListas();
    initConfig();
    initDados();

    window.addEventListener('beforeunload', e => {
      if (Object.values(S.sujo).some(Boolean)) { e.preventDefault(); e.returnValue = ''; }
    });

    renderTudo();
  }

  function abrirAba(nome) {
    $$('.hm-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === nome));
    $$('.hm-section').forEach(s => { s.hidden = s.id !== `tab-${nome}`; });
  }

  function renderTudo() {
    renderNoticias();
    Object.keys(LISTAS).forEach(renderLista);
    preencherConfig();
    renderContadores();
  }

  function renderContadores() {
    $('#cnt-noticias').textContent = S.noticias.length;
    $('#cnt-ticker').textContent = S.ticker.length;
    $('#cnt-canais').textContent = S.canais.length;
    $('#cnt-mercados').textContent = S.mercados.length;
  }

  /* ═════════════ NOTÍCIAS ═════════════ */
  function noticiasFiltradas() {
    const q = S.busca.trim().toLowerCase();
    return S.noticias.filter(n =>
      (S.filtroCat === 'TODOS' || n.categoria === S.filtroCat) &&
      (!q || `${n.titulo} ${n.subtitulo} ${n.fonte}`.toLowerCase().includes(q))
    );
  }

  function renderNoticias() {
    const el = $('#lista-noticias');
    const lista = noticiasFiltradas();

    if (!lista.length) {
      el.innerHTML = `<div class="hm-empty">${S.noticias.length
        ? 'Nenhuma notícia encontrada com esse filtro.'
        : 'Ainda não há notícias no banco.<br>Crie uma nova ou importe seus JSON na aba “Importar e exportar”.'}</div>`;
      return;
    }

    const principalId = S.noticias.find(n => n.publicada)?.id;

    el.innerHTML = lista.map((n, i) => `
      <div class="hm-news-row ${n.publicada ? '' : 'rascunho'} ${n.id === principalId ? 'principal' : ''}" data-id="${n.id}">
        <div class="hm-move">
          <button type="button" data-act="up" ${i === 0 ? 'disabled' : ''} aria-label="Subir">▲</button>
          <button type="button" data-act="down" ${i === lista.length - 1 ? 'disabled' : ''} aria-label="Descer">▼</button>
        </div>
        <span class="hnn-cat-badge ${CAT_CLASS[n.categoria] || 'urgente'}">${esc(n.icone)} ${esc(n.categoria)}</span>
        <div class="hm-news-main">
          <strong>${esc(n.titulo)}</strong>
          <span>${esc(n.subtitulo)}</span>
          ${n.id === principalId ? '<span class="hm-tag-principal">Notícia principal da Holonet</span>' : ''}
        </div>
        <div class="hm-news-meta">
          <div><span>${esc(n.fonte)}</span><span>${esc(n.data_texto)}</span></div>
          <label class="hm-check"><input type="checkbox" data-act="pub" ${n.publicada ? 'checked' : ''}><span>Publicada</span></label>
        </div>
        <div class="hm-row-actions">
          <button type="button" class="hm-btn small" data-act="top" ${S.noticias[0]?.id === n.id ? 'disabled' : ''}>Tornar principal</button>
          <button type="button" class="hm-btn small" data-act="edit">Editar</button>
          <button type="button" class="hm-btn small danger" data-act="del">Excluir</button>
        </div>
      </div>`).join('');
  }

  function initNoticias() {
    $('#lista-noticias').addEventListener('click', async e => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const row = btn.closest('.hm-news-row');
      const id = Number(row.dataset.id);
      const n = S.noticias.find(x => x.id === id);
      if (!n) return;

      switch (btn.dataset.act) {
        case 'up':   await moverNoticia(n, -1); break;
        case 'down': await moverNoticia(n, +1); break;
        case 'top':  await tornarPrincipal(n); break;
        case 'edit': abrirEditor(n); break;
        case 'del':  await excluirNoticia(n); break;
      }
    });

    $('#lista-noticias').addEventListener('change', async e => {
      if (e.target.dataset.act !== 'pub') return;
      const id = Number(e.target.closest('.hm-news-row').dataset.id);
      const n = S.noticias.find(x => x.id === id);
      const { error } = await sb().from(T.noticias).update({ publicada: e.target.checked }).eq('id', id);
      if (error) { erroBanco(error, 'Atualizar publicação'); e.target.checked = !e.target.checked; return; }
      n.publicada = e.target.checked;
      renderNoticias();
      toast(n.publicada ? 'Notícia publicada.' : 'Notícia movida para rascunhos.');
    });

    $('#btn-nova-noticia').addEventListener('click', () => abrirEditor(null));

    // diálogo
    const dlg = $('#dlg-noticia');
    $('#dlg-fechar').addEventListener('click', () => dlg.close());
    $('#dlg-cancelar').addEventListener('click', () => dlg.close());
    $('#dlg-salvar').addEventListener('click', salvarNoticia);
    $('#form-noticia').addEventListener('submit', e => e.preventDefault());
    ['f-categoria', 'f-icone', 'f-titulo', 'f-subtitulo', 'f-corpo', 'f-fonte', 'f-data', 'f-aure']
      .forEach(id => $('#' + id).addEventListener('input', renderPreviewNoticia));

    $('#f-categoria').addEventListener('change', e => {
      const anterior = $('#f-icone').dataset.padrao;
      const atual = $('#f-icone').value.trim();
      if (!atual || atual === anterior) $('#f-icone').value = ICONE_PADRAO[e.target.value] || '◆';
      $('#f-icone').dataset.padrao = ICONE_PADRAO[e.target.value] || '◆';
      renderPreviewNoticia();
    });

    $('#btn-aure-titulo').addEventListener('click', () => {
      $('#f-aure').value = $('#f-titulo').value.toUpperCase().slice(0, 60);
      renderPreviewNoticia();
    });
  }

  /* Renumera a lista completa (10, 20, 30…) e grava só o que mudou */
  async function aplicarOrdemNoticias(novaOrdem) {
    const mudancas = [];
    novaOrdem.forEach((n, k) => {
      const o = (k + 1) * 10;
      if (n.ordem !== o) { mudancas.push({ id: n.id, ordem: o }); n.ordem = o; }
    });
    S.noticias = novaOrdem;
    renderNoticias();

    const res = await Promise.all(mudancas.map(m =>
      sb().from(T.noticias).update({ ordem: m.ordem }).eq('id', m.id)));
    const falha = res.find(r => r.error);
    if (falha) {
      erroBanco(falha.error, 'Salvar ordem');
      await recarregarLista('noticias');
      renderNoticias();
    }
  }

  async function moverNoticia(n, dir) {
    const filtrada = noticiasFiltradas();
    const i = filtrada.findIndex(x => x.id === n.id);
    const vizinho = filtrada[i + dir];
    if (!vizinho) return;
    const full = [...S.noticias];
    const a = full.indexOf(n), b = full.indexOf(vizinho);
    [full[a], full[b]] = [full[b], full[a]];
    await aplicarOrdemNoticias(full);
  }

  async function tornarPrincipal(n) {
    const full = [n, ...S.noticias.filter(x => x.id !== n.id)];
    await aplicarOrdemNoticias(full);
    toast('Notícia definida como principal.');
  }

  async function excluirNoticia(n) {
    if (!confirm(`Excluir a notícia “${n.titulo}”? Esta ação não pode ser desfeita.`)) return;
    const { error } = await sb().from(T.noticias).delete().eq('id', n.id);
    if (error) return erroBanco(error, 'Excluir notícia');
    S.noticias = S.noticias.filter(x => x.id !== n.id);
    renderNoticias(); renderContadores();
    toast('Notícia excluída.');
  }

  /* ─── Editor de notícia ─── */
  function abrirEditor(n) {
    S.editandoId = n ? n.id : null;
    $('#dlg-titulo').textContent = n ? 'Editar notícia' : 'Nova notícia';

    const cat = n?.categoria || 'URGENTE';
    $('#f-categoria').value = CATEGORIAS.includes(cat) ? cat : 'URGENTE';
    $('#f-icone').dataset.padrao = ICONE_PADRAO[$('#f-categoria').value] || '◆';
    $('#f-icone').value = n?.icone ?? ICONE_PADRAO[$('#f-categoria').value];
    $('#f-titulo').value = n?.titulo ?? '';
    $('#f-subtitulo').value = n?.subtitulo ?? '';
    $('#f-corpo').value = n?.corpo ?? '';
    $('#f-fonte').value = n?.fonte ?? 'HNN';
    $('#f-data').value = n?.data_texto ?? S.config.data_universo ?? '';
    $('#f-aure').value = n?.tag_aurebesh ?? '';
    $('#f-publicada').checked = n ? !!n.publicada : true;
    $('#wrap-destaque').hidden = !!n;
    $('#f-destaque').checked = true;

    renderPreviewNoticia();
    $('#dlg-noticia').showModal();
    $('#f-titulo').focus();
  }

  function lerFormNoticia() {
    return {
      categoria: $('#f-categoria').value,
      icone: $('#f-icone').value.trim() || '◆',
      titulo: $('#f-titulo').value.trim(),
      subtitulo: $('#f-subtitulo').value.trim(),
      corpo: $('#f-corpo').value,
      fonte: $('#f-fonte').value.trim() || 'HNN',
      data_texto: $('#f-data').value.trim(),
      tag_aurebesh: $('#f-aure').value.trim(),
      publicada: $('#f-publicada').checked,
    };
  }

  function renderPreviewNoticia() {
    const f = lerFormNoticia();
    const cls = CAT_CLASS[f.categoria] || 'urgente';
    $('#prev-destaque').innerHTML = `
      <article class="hnn-featured-card ${f.categoria === 'URGENTE' ? 'urgente-card' : ''}">
        <div class="corner-tl"></div><div class="corner-br"></div>
        <span class="hnn-cat-badge ${cls}">${esc(f.icone)} ${esc(f.categoria)}</span>
        <h2 class="hnn-featured-title">${esc(f.titulo) || '…'}</h2>
        <p class="hnn-featured-sub">${esc(f.subtitulo)}</p>
        <p class="hnn-featured-body">${nl2br(f.corpo)}</p>
        <div class="hnn-featured-meta">
          <span class="hnn-meta-source">◆ ${esc(f.fonte)} — ${esc(f.data_texto)}</span>
          <span class="hnn-meta-aure">${esc(f.tag_aurebesh)}</span>
        </div>
      </article>`;
    $('#prev-card').innerHTML = `
      <article class="hnn-news-card">
        <span class="hnn-news-icone">${esc(f.icone)}</span>
        <span class="hnn-cat-badge ${cls}">${esc(f.categoria)}</span>
        <h3 class="hnn-news-card-title">${esc(f.titulo) || '…'}</h3>
        <p class="hnn-news-card-sub">${esc(f.subtitulo)}</p>
        <div class="hnn-news-card-meta">
          <span>${esc(f.fonte.split(' - ')[0])}</span><span>${esc(f.data_texto)}</span>
        </div>
      </article>`;
  }

  async function salvarNoticia() {
    const f = lerFormNoticia();
    if (!f.titulo) { toast('Informe o título da notícia.', 'erro'); $('#f-titulo').focus(); return; }

    const btn = $('#dlg-salvar');
    btn.disabled = true;

    try {
      if (S.editandoId) {
        const { error } = await sb().from(T.noticias).update(f).eq('id', S.editandoId);
        if (error) throw error;
      } else {
        const ordens = S.noticias.map(n => n.ordem);
        f.ordem = $('#f-destaque').checked
          ? (ordens.length ? Math.min(...ordens) : 10) - 10
          : (ordens.length ? Math.max(...ordens) : 0) + 10;
        const { error } = await sb().from(T.noticias).insert([f]);
        if (error) throw error;
      }
      await recarregarLista('noticias');
      renderNoticias(); renderContadores();
      $('#dlg-noticia').close();
      toast('Notícia salva.');
    } catch (e) {
      erroBanco(e, 'Salvar notícia');
    } finally {
      btn.disabled = false;
    }
  }

  /* ═════════════ LISTAS EM LINHA (ticker / canais / mercados) ═════════════ */
  function renderLista(nome) {
    const cfg = LISTAS[nome];
    const el = $(`#rows-${nome}`);
    const itens = S[nome];

    if (!itens.length) { el.innerHTML = `<div class="hm-empty">${cfg.vazio}</div>`; return; }

    el.innerHTML = itens.map((r, i) => `
      <div class="hm-row" data-i="${i}" style="--cols:${cfg.cols}">
        <div class="hm-move">
          <button type="button" data-act="up" ${i === 0 ? 'disabled' : ''} aria-label="Subir">▲</button>
          <button type="button" data-act="down" ${i === itens.length - 1 ? 'disabled' : ''} aria-label="Descer">▼</button>
        </div>
        ${cfg.campos.map(c => campoHTML(c, r)).join('')}
        <label class="hm-check"><input type="checkbox" data-k="ativo" ${r.ativo ? 'checked' : ''}><span>Ativa</span></label>
        <button type="button" class="hm-btn small danger" data-act="del">Excluir</button>
      </div>`).join('');
  }

  function campoHTML(c, r) {
    if (c.tipo === 'select') {
      return `<select class="hm-input" data-k="${c.k}">${c.opcoes
        .map(o => `<option ${r[c.k] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    }
    if (c.tipo === 'dir') {
      const v = num(r.variacao) || 0;
      return `<span class="hm-dir ${v >= 0 ? 'up' : 'down'}">${v >= 0 ? '▲' : '▼'} ${v > 0 ? '+' : ''}${v.toFixed(1)}%</span>`;
    }
    const extra = c.tipo === 'number' ? `step="${c.step || '1'}"` : '';
    return `<input class="hm-input" type="${c.tipo}" ${extra} data-k="${c.k}" placeholder="${esc(c.ph || '')}" value="${esc(r[c.k] ?? '')}">`;
  }

  function initListas() {
    Object.keys(LISTAS).forEach(nome => {
      const el = $(`#rows-${nome}`);

      el.addEventListener('input', e => {
        const k = e.target.dataset.k;
        if (!k) return;
        const row = e.target.closest('.hm-row');
        const item = S[nome][Number(row.dataset.i)];
        item[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        marcarSujo(nome);
        if (nome === 'mercados' && k === 'variacao') {
          const v = num(item.variacao) || 0;
          const d = $('.hm-dir', row);
          d.className = `hm-dir ${v >= 0 ? 'up' : 'down'}`;
          d.textContent = `${v >= 0 ? '▲' : '▼'} ${v > 0 ? '+' : ''}${v.toFixed(1)}%`;
        }
      });

      el.addEventListener('click', async e => {
        const btn = e.target.closest('[data-act]');
        if (!btn) return;
        const i = Number(btn.closest('.hm-row').dataset.i);
        const arr = S[nome];

        if (btn.dataset.act === 'up' || btn.dataset.act === 'down') {
          const j = i + (btn.dataset.act === 'up' ? -1 : 1);
          if (j < 0 || j >= arr.length) return;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          marcarSujo(nome);
          renderLista(nome);
        } else if (btn.dataset.act === 'del') {
          const item = arr[i];
          if (item.id) {
            if (!confirm('Excluir este item? Esta ação não pode ser desfeita.')) return;
            const { error } = await sb().from(LISTAS[nome].tabela).delete().eq('id', item.id);
            if (error) return erroBanco(error, 'Excluir');
            toast('Item excluído.');
          }
          arr.splice(i, 1);
          renderLista(nome); renderContadores();
        }
      });
    });

    $$('[data-add]').forEach(b => b.addEventListener('click', () => {
      const nome = b.dataset.add;
      S[nome].push(LISTAS[nome].novo());
      marcarSujo(nome);
      renderLista(nome);
      const rows = $$(`#rows-${nome} .hm-row`);
      rows[rows.length - 1]?.querySelector('input,select')?.focus();
    }));

    $$('[data-save]').forEach(b => b.addEventListener('click', () => salvarLista(b.dataset.save, b)));
  }

  async function salvarLista(nome, btn) {
    const cfg = LISTAS[nome];
    const itens = S[nome];

    if (itens.some(r => !cfg.valido(r))) {
      toast('Há linhas vazias ou inválidas. Preencha ou exclua antes de salvar.', 'erro');
      return;
    }

    btn.disabled = true;
    try {
      const updates = [];
      const novos = [];
      itens.forEach((r, k) => {
        const p = { ...cfg.payload(r), ordem: (k + 1) * 10 };
        if (r.id) updates.push(sb().from(cfg.tabela).update(p).eq('id', r.id));
        else novos.push(p);
      });

      const res = await Promise.all(updates);
      const falha = res.find(r => r.error);
      if (falha) throw falha.error;

      if (novos.length) {
        const { error } = await sb().from(cfg.tabela).insert(novos);
        if (error) throw error;
      }

      await recarregarLista(nome);
      renderLista(nome); renderContadores();
      marcarSujo(nome, false);
      toast('Alterações salvas.');
    } catch (e) {
      erroBanco(e, 'Salvar');
    } finally {
      btn.disabled = false;
    }
  }

  /* ═════════════ CONFIG (alerta, cabeçalho, terminal) ═════════════ */
  function preencherConfig() {
    $$('[data-cfg]').forEach(el => {
      const v = S.config[el.dataset.cfg] ?? '';
      if (el.type === 'checkbox') el.checked = v !== 'false';
      else el.value = v;
    });
    renderPreviewAlerta();
  }

  function renderPreviewAlerta() {
    const c = lerConfigForm();
    $('#prev-alerta').innerHTML = `
      <div class="hnn-panel hnn-alerta" style="${c.alerta_ativo === 'false' ? 'opacity:.4' : ''}">
        <div class="hnn-panel-header" style="background:rgba(204,34,0,0.2); border-bottom-color: var(--red-hot);">
          <span class="hnn-panel-title" style="color:var(--red-warm);">${esc(c.alerta_cabecalho)}</span>
          <span class="hnn-panel-aure">${esc(c.alerta_aure_cab)}</span>
        </div>
        <div class="hnn-alerta-body">
          <p class="hnn-alerta-titulo">${esc(c.alerta_titulo)}</p>
          <p class="hnn-alerta-texto">${nl2br(c.alerta_texto)}</p>
          <p class="hnn-alerta-aure">${esc(c.alerta_aure_rodape)}</p>
        </div>
      </div>
      ${c.alerta_ativo === 'false' ? '<p class="hm-hint">O alerta está desligado e não aparece na Holonet.</p>' : ''}`;
  }

  function lerConfigForm() {
    const out = {};
    $$('[data-cfg]').forEach(el => {
      out[el.dataset.cfg] = el.type === 'checkbox' ? String(el.checked) : el.value;
    });
    return out;
  }

  function initConfig() {
    $$('[data-cfg]').forEach(el => {
      el.addEventListener('input', () => {
        const aba = el.closest('.hm-section').id.replace('tab-', '');
        marcarSujo(aba);
        if (aba === 'alerta') renderPreviewAlerta();
      });
    });

    $$('[data-save-cfg]').forEach(b => b.addEventListener('click', async () => {
      const aba = b.dataset.saveCfg;
      const secao = $(`#tab-${aba}`);
      const rows = $$('[data-cfg]', secao).map(el => ({
        chave: el.dataset.cfg,
        valor: el.type === 'checkbox' ? String(el.checked) : String(el.value).trim() === '' && el.dataset.cfg === 'terminal_sinal' ? '0' : el.value,
      }));

      b.disabled = true;
      const { error } = await sb().from(T.config).upsert(rows, { onConflict: 'chave' });
      b.disabled = false;
      if (error) return erroBanco(error, 'Salvar configurações');

      rows.forEach(r => { S.config[r.chave] = r.valor; });
      marcarSujo(aba, false);
      toast('Configurações salvas.');
    }));
  }

  /* ═════════════ IMPORTAR / EXPORTAR ═════════════ */
  function initDados() {
    $('#arq-import').addEventListener('change', lerArquivosImport);
    $('#btn-importar').addEventListener('click', executarImport);
    $('#btn-exportar').addEventListener('click', exportarBackup);
  }

  async function lerArquivosImport(e) {
    const arquivos = [...e.target.files];
    const acc = { noticias: [], ticker: [], canais: [], mercados: [], config: {}, arquivos: [] };

    for (const f of arquivos) {
      try {
        const j = JSON.parse(await f.text());
        acc.arquivos.push(f.name);

        if (Array.isArray(j.noticias)) acc.noticias.push(...j.noticias);
        if (Array.isArray(j.ticker)) {
          acc.ticker.push(...j.ticker.map(t => (typeof t === 'string' ? t : t.texto)).filter(Boolean));
        }
        const tx = j.transmissoes_ao_vivo || j.transmissoes;
        if (Array.isArray(tx)) acc.canais.push(...tx);
        if (Array.isArray(j.mercados)) acc.mercados.push(...j.mercados);

        if (j.config && typeof j.config === 'object') Object.assign(acc.config, j.config);
        if (j.hnn_version) acc.config.hnn_version = j.hnn_version;
        if (j.ultima_atualizacao) acc.config.data_universo = j.ultima_atualizacao;
      } catch (err) {
        toast(`${f.name}: JSON inválido.`, 'erro');
      }
    }

    S.importacao = acc;
    const total = acc.noticias.length + acc.ticker.length + acc.canais.length + acc.mercados.length + Object.keys(acc.config).length;
    $('#import-resumo').innerHTML = acc.arquivos.length
      ? `Arquivos lidos: ${acc.arquivos.length}<br>Notícias: ${acc.noticias.length}<br>Manchetes: ${acc.ticker.length}<br>Canais: ${acc.canais.length}<br>Mercados: ${acc.mercados.length}<br>Configurações: ${Object.keys(acc.config).length}`
      : '';
    $('#btn-importar').disabled = total === 0;
  }

  async function executarImport() {
    const d = S.importacao;
    if (!d) return;
    const limpar = $('#import-limpar').checked;

    const msg = limpar
      ? 'Isso vai APAGAR as notícias, manchetes e canais atuais e substituí-los pelo conteúdo dos arquivos. Continuar?'
      : 'Os itens importados serão adicionados aos que já existem. Continuar?';
    if (!confirm(msg)) return;

    const btn = $('#btn-importar');
    btn.disabled = true;

    try {
      if (limpar) {
        for (const t of [T.noticias, T.ticker, T.canais]) {
          const { error } = await sb().from(t).delete().gte('id', 0);
          if (error) throw error;
        }
        S.noticias = []; S.ticker = []; S.canais = [];
      }

      const maxOrdem = arr => (arr.length ? Math.max(...arr.map(x => x.ordem)) : 0);

      // notícias — mantém a ordem original pelo id numérico
      if (d.noticias.length) {
        const ordenadas = [...d.noticias].sort((a, b) => (Number(a.id) - Number(b.id)) || ((a.ordem ?? 0) - (b.ordem ?? 0)));
        let o = maxOrdem(S.noticias);
        const rows = ordenadas.map(n => ({
          ordem: (o += 10),
          categoria: String(n.categoria || 'VARIEDADES').trim().toUpperCase(),
          icone: n.icone || '◆',
          titulo: n.titulo || '(sem título)',
          subtitulo: n.subtitulo || '',
          corpo: String(n.corpo || '').replace(/<br\s*\/?>/gi, '\n'),
          fonte: n.fonte || 'HNN',
          data_texto: n.data_texto ?? n.data ?? '',
          tag_aurebesh: n.tag_aurebesh || '',
          publicada: n.publicada !== false,
        }));
        const { error } = await sb().from(T.noticias).insert(rows);
        if (error) throw error;
      }

      if (d.ticker.length) {
        let o = maxOrdem(S.ticker);
        const { error } = await sb().from(T.ticker).insert(d.ticker.map(t => ({ ordem: (o += 10), texto: t })));
        if (error) throw error;
      }

      if (d.canais.length) {
        let o = maxOrdem(S.canais);
        const { error } = await sb().from(T.canais).insert(d.canais.map(c => ({
          ordem: (o += 10), canal: c.canal || '(sem nome)',
          status: c.status || 'AO VIVO', descricao: c.descricao || '', ativo: c.ativo !== false,
        })));
        if (error) throw error;
      }

      if (d.mercados.length) {
        const { error: e1 } = await sb().from(T.mercados).delete().gte('id', 0);
        if (e1) throw e1;
        const { error } = await sb().from(T.mercados).insert(d.mercados.map((m, k) => ({
          ordem: (k + 1) * 10, nome: m.nome, valor: String(m.valor ?? ''),
          variacao: num(m.variacao) || 0, ativo: m.ativo !== false,
        })));
        if (error) throw error;
      }

      const cfgRows = Object.entries(d.config).map(([chave, valor]) => ({ chave, valor: String(valor) }));
      if (cfgRows.length) {
        const { error } = await sb().from(T.config).upsert(cfgRows, { onConflict: 'chave' });
        if (error) throw error;
      }

      await carregarTudo();
      renderTudo();
      S.importacao = null;
      $('#arq-import').value = '';
      $('#import-resumo').innerHTML = '';
      toast('Importação concluída.');
    } catch (e) {
      erroBanco(e, 'Importar');
      btn.disabled = false;
    }
  }

  function exportarBackup() {
    const backup = {
      exportado_em: new Date().toISOString(),
      config: S.config,
      noticias: S.noticias.map(({ id, created_at, updated_at, ...r }) => r),
      ticker: S.ticker.map(({ texto, ordem, ativo }) => ({ texto, ordem, ativo })),
      transmissoes: S.canais.map(({ canal, status, descricao, ordem, ativo }) => ({ canal, status, descricao, ordem, ativo })),
      mercados: S.mercados.map(({ nome, valor, variacao, ordem, ativo }) => ({ nome, valor, variacao, ordem, ativo })),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `holonet_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
