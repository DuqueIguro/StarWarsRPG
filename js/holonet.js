/* ================================================
   HOLONET NEWS NETWORK — HNN Terminal Script
   StarWarsRPG Project | js/holonet.js
   Fonte de dados: Supabase (tabelas holonet_*)
   Fallback: arquivos JSON em /data (se o banco falhar)
   ================================================ */

'use strict';

const HNN = (() => {

  /* ─── Estado ─── */
  let dados = null;
  let noticiaAtiva = null;
  let filtroAtivo = 'TODOS';

  /* ─── Mapeamentos ─── */
  const CATEGORIA_CLASS = {
    'URGENTE':     'urgente',
    'POLÍTICA':    'politica',
    'ECONOMIA':    'economia',
    'CONFLITO':    'conflito',
    'TECNOLOGIA':  'tecnologia',
    'VARIEDADES':  'variedades',
  };

  /* Usado só se o banco estiver fora do ar */
  const MERCADOS_FALLBACK = [
    { nome: 'COAXIUM. (BRUTO)',   variacao: '-5.8%',  dir: 'down' },
    { nome: 'BACTA',              variacao: '+10.0%', dir: 'up' },
    { nome: 'GÁS TIBIANA',        variacao: '-6.2%',  dir: 'down' },
    { nome: 'DURASTEEL',          variacao: '-4.4%',  dir: 'down' },
    { nome: 'DROIDS DE TRABALHO', variacao: '+8.9%',  dir: 'up' },
    { nome: 'ESPECIARIA RYLL',    variacao: '-13.4%', dir: 'down' },
  ];

  const HOLONET_CATEGORY_FILES = [
    'UrgenteNews.json',
    'PoliticaNews.json',
    'EconomiaNews.json',
    'ConflitoNews.json',
    'TecnologiaNews.json',
    'VariedadesNews.json'
  ];

  /* ─── Utilitários ─── */
  function esc(v) {
    return String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* escapa e preserva quebras de linha digitadas no painel de mestre */
  function texto(v) {
    return esc(v).replace(/\r?\n/g, '<br>');
  }

  function setText(id, valor) {
    const el = document.getElementById(id);
    if (el && valor !== undefined && valor !== null && valor !== '') el.textContent = valor;
  }

  /* ─── Inicialização ─── */
  async function init() {
    const ok = await carregarDoBanco();
    if (!ok) {
      console.warn('[HNN] Banco indisponível — usando arquivos JSON locais.');
      await carregarDosJSON();
    }

    if (!Array.isArray(dados.noticias)) dados.noticias = [];
    window.__HNN_DATA__ = dados;

    renderHeader();
    renderNav();
    renderNoticias();
    renderSidebar();
    renderFooter();
    renderTicker();
    aplicarConfig();
    iniciarRelogio();
    initModal();
  }

  /* ─── Carga: Supabase ─── */
  async function carregarDoBanco() {
    if (typeof supabaseClient === 'undefined') return false;

    try {
      const lista = (tabela, filtroCampo) => {
        let q = supabaseClient.from(tabela).select('*');
        if (filtroCampo) q = q.eq(filtroCampo, true);
        return q.order('ordem', { ascending: true }).order('id', { ascending: true });
      };

      const [n, t, tx, m, c] = await Promise.all([
        lista('holonet_noticias', 'publicada'),
        lista('holonet_ticker', 'ativo'),
        lista('holonet_transmissoes', 'ativo'),
        lista('holonet_mercados', 'ativo'),
        supabaseClient.from('holonet_config').select('chave, valor'),
      ]);

      const erro = [n, t, tx, m, c].find(r => r.error);
      if (erro) throw erro.error;

      const config = {};
      (c.data || []).forEach(r => { config[r.chave] = r.valor; });

      dados = {
        config,
        hnn_version: config.hnn_version,
        ultima_atualizacao: config.data_universo,
        noticias: (n.data || []).map(r => ({
          id: String(r.id),
          categoria: r.categoria,
          icone: r.icone,
          titulo: r.titulo,
          subtitulo: r.subtitulo,
          corpo: r.corpo,
          fonte: r.fonte,
          data: r.data_texto,
          tag_aurebesh: r.tag_aurebesh,
        })),
        ticker: (t.data || []).map(r => r.texto),
        transmissoes_ao_vivo: (tx.data || []).map(r => ({
          canal: r.canal, status: r.status, descricao: r.descricao,
        })),
        mercados: (m.data || []).map(r => {
          const v = Number(r.variacao) || 0;
          return {
            nome: r.nome,
            variacao: `${v > 0 ? '+' : ''}${v.toFixed(1)}%`,
            dir: v >= 0 ? 'up' : 'down',
          };
        }),
      };
      return true;
    } catch (e) {
      console.error('[HNN] Erro ao ler do Supabase:', e);
      return false;
    }
  }

  /* ─── Carga: JSON (fallback) ─── */
  async function carregarDosJSON() {
    try {
      const resp = await fetch('../data/holonet.json');
      dados = await resp.json();
    } catch (e) {
      dados = window.__HNN_DATA__ || {};
    }

    const resultados = await Promise.all(
      HOLONET_CATEGORY_FILES.map(f =>
        fetch(`../data/holonet/${f}`)
          .then(r => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    );

    dados.noticias = resultados
      .filter(Boolean)
      .flatMap(file => (Array.isArray(file.noticias) ? file.noticias : []))
      .sort((a, b) => Number(a.id) - Number(b.id));
  }

  /* ─── Config (alerta, terminal) ─── */
  function aplicarConfig() {
    const c = dados.config;
    if (!c) return; // fallback JSON: mantém o HTML estático

    setText('hnn-terminal-id', c.terminal_id);
    setText('hnn-terminal-setor', c.terminal_setor);
    setText('hnn-terminal-cripto', c.terminal_cripto);

    if (c.terminal_sinal !== undefined && c.terminal_sinal !== '') {
      const pct = Math.max(0, Math.min(100, parseInt(c.terminal_sinal, 10) || 0));
      const cheios = Math.round(pct / 10);
      setText('hnn-terminal-sinal', `${'█'.repeat(cheios)}${'░'.repeat(10 - cheios)} ${pct}%`);
    }

    const painel = document.getElementById('hnn-alerta');
    if (painel) {
      painel.style.display = c.alerta_ativo === 'false' ? 'none' : '';
      setText('hnn-alerta-cab', c.alerta_cabecalho);
      setText('hnn-alerta-aure-cab', c.alerta_aure_cab);
      setText('hnn-alerta-titulo', c.alerta_titulo);
      setText('hnn-alerta-aure', c.alerta_aure_rodape);
      const corpo = document.getElementById('hnn-alerta-texto');
      if (corpo && c.alerta_texto) corpo.innerHTML = texto(c.alerta_texto);
    }
  }

  /* ─── Ticker ─── */
  function renderTicker() {
    const track = document.getElementById('ticker-track');
    if (!track || !Array.isArray(dados.ticker)) return;

    if (!dados.ticker.length) {
      track.innerHTML = '<span class="hnn-ticker-item">Sem transmissões no momento.</span>';
      return;
    }

    // duplica para loop contínuo
    const items = [...dados.ticker, ...dados.ticker];
    track.innerHTML = items
      .map(t => `<span class="hnn-ticker-item">${esc(t)}</span>`)
      .join('');
  }

  /* ─── Header ─── */
  function renderHeader() {
    const el = document.getElementById('hnn-version');
    if (el) el.textContent = dados.hnn_version || 'HNN-7';

    const data = document.getElementById('hnn-data');
    if (data) data.textContent = dados.ultima_atualizacao || '';
  }

  /* ─── Relógio ─── */
  function iniciarRelogio() {
    const el = document.getElementById('hnn-relogio');
    if (!el) return;
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      el.textContent = `${h}:${m}:${s} GST`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ─── Navegação / Filtros ─── */
  function renderNav() {
    const nav = document.getElementById('hnn-nav');
    if (!nav || !dados.noticias) return;

    const categorias = ['TODOS', ...new Set(dados.noticias.map(n => n.categoria))];
    nav.innerHTML = categorias
      .map(cat => `
        <button class="hnn-nav-btn ${cat === 'TODOS' ? 'active' : ''}"
                data-cat="${esc(cat)}"
                onclick="HNN.filtrar(this.dataset.cat)">
          ${esc(cat)}
        </button>
      `)
      .join('');
  }

  function filtrar(categoria) {
    filtroAtivo = categoria;
    document.querySelectorAll('.hnn-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === categoria);
    });
    renderNoticias();
  }

  /* ─── Notícias ─── */
  function renderNoticias() {
    if (!dados?.noticias) return;

    // a ordem já vem definida pelo painel de mestre (campo "ordem")
    const lista = filtroAtivo === 'TODOS'
      ? [...dados.noticias]
      : dados.noticias.filter(n => n.categoria === filtroAtivo);

    const [principal, ...resto] = lista;

    const featured = document.getElementById('hnn-featured');
    if (featured) {
      featured.innerHTML = principal
        ? cardDestaque(principal)
        : `<div class="hnn-featured-card" style="opacity:0.5;">
             <p style="font-family:var(--font-mono);color:var(--text-muted);font-size:12px;">
               // Nenhuma transmissão disponível nesta categoria.
             </p>
           </div>`;
    }

    const grid = document.getElementById('hnn-news-grid');
    if (grid) grid.innerHTML = resto.map(cardNoticia).join('');
  }

  function cardDestaque(n) {
    const cls = CATEGORIA_CLASS[n.categoria] || 'urgente';
    const isUrgente = n.categoria === 'URGENTE' ? 'urgente-card' : '';
    return `
      <article class="hnn-featured-card ${isUrgente}" onclick="HNN.abrirModal('${esc(n.id)}')">
        <div class="corner-tl"></div>
        <div class="corner-br"></div>
        <span class="hnn-cat-badge ${cls}">${esc(n.icone)} ${esc(n.categoria)}</span>
        <h2 class="hnn-featured-title">${esc(n.titulo)}</h2>
        <p class="hnn-featured-sub">${esc(n.subtitulo)}</p>
        <p class="hnn-featured-body">${texto(n.corpo)}</p>
        <div class="hnn-featured-meta">
          <span class="hnn-meta-source">◆ ${esc(n.fonte)} — ${esc(n.data)}</span>
          <span class="hnn-meta-aure">${esc(n.tag_aurebesh)}</span>
        </div>
      </article>
    `;
  }

  function cardNoticia(n) {
    const cls = CATEGORIA_CLASS[n.categoria] || 'urgente';
    return `
      <article class="hnn-news-card" onclick="HNN.abrirModal('${esc(n.id)}')">
        <span class="hnn-news-icone">${esc(n.icone)}</span>
        <span class="hnn-cat-badge ${cls}">${esc(n.categoria)}</span>
        <h3 class="hnn-news-card-title">${esc(n.titulo)}</h3>
        <p class="hnn-news-card-sub">${esc(n.subtitulo)}</p>
        <div class="hnn-news-card-meta">
          <span>${esc(String(n.fonte || '').split(' - ')[0])}</span>
          <span>${esc(n.data)}</span>
        </div>
      </article>
    `;
  }

  /* ─── Sidebar ─── */
  function renderSidebar() {
    renderTransmissoes();
    renderMercados();
  }

  function renderTransmissoes() {
    const el = document.getElementById('hnn-transmissoes');
    if (!el || !dados.transmissoes_ao_vivo) return;

    el.innerHTML = dados.transmissoes_ao_vivo.map(tx => {
      const statusCls = tx.status === 'AO VIVO' ? 'ao-vivo' : 'gravado';
      return `
        <div class="hnn-transmissao-item">
          <span class="hnn-tx-canal">${esc(tx.canal)}</span>
          <div class="hnn-tx-info">
            <span class="hnn-tx-status ${statusCls}">${esc(tx.status)}</span>
            <p class="hnn-tx-desc">${esc(tx.descricao)}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderMercados() {
    const el = document.getElementById('hnn-mercados');
    if (!el) return;

    const lista = Array.isArray(dados.mercados) ? dados.mercados : MERCADOS_FALLBACK;
    el.innerHTML = lista.map(m => `
      <div class="hnn-mercado-item">
        <span class="hnn-mercado-nome">${esc(m.nome)}</span>
        <span class="hnn-mercado-val ${m.dir}">${esc(m.variacao)}</span>
      </div>
    `).join('');
  }

  /* ─── Modal ─── */
  function initModal() {
    const overlay = document.getElementById('hnn-modal-overlay');
    if (!overlay) return;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) fecharModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fecharModal();
    });
  }

  function abrirModal(id) {
    if (!dados?.noticias) return;
    const noticia = dados.noticias.find(n => String(n.id) === String(id));
    if (!noticia) return;

    noticiaAtiva = noticia;
    const overlay = document.getElementById('hnn-modal-overlay');
    const modal   = document.getElementById('hnn-modal-content');
    if (!overlay || !modal) return;

    const cls = CATEGORIA_CLASS[noticia.categoria] || 'urgente';

    modal.innerHTML = `
      <button class="hnn-modal-close" onclick="HNN.fecharModal()">[ FECHAR ]</button>
      <p class="hnn-modal-id">// TRANSMISSÃO ${esc(noticia.id)} — ${esc(noticia.data)}</p>
      <span class="hnn-cat-badge ${cls}" style="margin-bottom:16px">
        ${esc(noticia.icone)} ${esc(noticia.categoria)}
      </span>
      <h2 class="hnn-modal-title">${esc(noticia.titulo)}</h2>
      <p class="hnn-modal-sub">${esc(noticia.subtitulo)}</p>
      <p class="hnn-modal-body">${texto(noticia.corpo)}</p>
      <div class="hnn-modal-footer">
        <span class="hnn-modal-fonte">◆ FONTE: ${esc(noticia.fonte)}</span>
        <span class="hnn-modal-aure">${esc(noticia.tag_aurebesh)}</span>
      </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    const overlay = document.getElementById('hnn-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    noticiaAtiva = null;
  }

  /* ─── Footer ─── */
  function renderFooter() {
    const el = document.getElementById('hnn-footer-ano');
    if (el) el.textContent = dados.ultima_atualizacao || '';
  }

  /* ─── API Pública ─── */
  return { init, filtrar, abrirModal, fecharModal };

})();

document.addEventListener('DOMContentLoaded', HNN.init);
