/* ================================================
   HOLONET NEWS NETWORK — HNN Terminal Script
   StarWarsRPG Project | js/holonet.js
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

  const MERCADOS = [
    { nome: 'CRÉDITO GAL.',  val: '4.231',  variacao: '+0.8%',  dir: 'up' },
    { nome: 'BESKAR',        val: '8.800',  variacao: '+41.2%', dir: 'up' },
    { nome: 'TIBANNA GAS',   val: '1.154',  variacao: '+23.0%', dir: 'up' },
    { nome: 'CORTOSIS',      val: '622',    variacao: '-8.3%',  dir: 'down' },
    { nome: 'SPICE (KESSEL)',val: '3.410',  variacao: '-2.1%',  dir: 'down' },
    { nome: 'RHYDONIUM',     val: '290',    variacao: '+5.4%',  dir: 'up' },
  ];

  /* ─── Inicialização ─── */
  async function init() {
    try {
      const resp = await fetch('../data/holonet.json');
      dados = await resp.json();
    } catch (e) {
      // fallback: usa dados embutidos se o fetch falhar (desenvolvimento local)
      dados = window.__HNN_DATA__ || null;
    }

    if (!dados) {
      console.error('[HNN] Falha ao carregar holonet.json');
      return;
    }

    renderTicker();
    renderHeader();
    renderNav();
    renderNoticias();
    renderSidebar();
    renderFooter();
    initModal();
    iniciarRelogio();
  }

  /* ─── Ticker ─── */
  function renderTicker() {
    const track = document.getElementById('ticker-track');
    if (!track || !dados.ticker) return;

    // duplica para loop contínuo
    const items = [...dados.ticker, ...dados.ticker];
    track.innerHTML = items
      .map(t => `<span class="hnn-ticker-item">${t}</span>`)
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
                data-cat="${cat}"
                onclick="HNN.filtrar('${cat}')">
          ${cat}
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

    const lista = filtroAtivo === 'TODOS'
      ? dados.noticias
      : dados.noticias.filter(n => n.categoria === filtroAtivo);

    const [principal, ...resto] = lista;

    // Notícia em destaque
    const featured = document.getElementById('hnn-featured');
    if (featured) {
      featured.innerHTML = principal ? cardDestaque(principal) : '';
    }

    // Grade de notícias
    const grid = document.getElementById('hnn-news-grid');
    if (grid) {
      grid.innerHTML = resto.map(cardNoticia).join('');
    }
  }

  function cardDestaque(n) {
    const cls = CATEGORIA_CLASS[n.categoria] || 'urgente';
    const isUrgente = n.categoria === 'URGENTE' ? 'urgente-card' : '';
    return `
      <article class="hnn-featured-card ${isUrgente}" onclick="HNN.abrirModal('${n.id}')">
        <div class="corner-tl"></div>
        <div class="corner-br"></div>
        <span class="hnn-cat-badge ${cls}">${n.icone} ${n.categoria}</span>
        <h2 class="hnn-featured-title">${n.titulo}</h2>
        <p class="hnn-featured-sub">${n.subtitulo}</p>
        <p class="hnn-featured-body">${n.corpo}</p>
        <div class="hnn-featured-meta">
          <span class="hnn-meta-source">◆ ${n.fonte} — ${n.data}</span>
          <span class="hnn-meta-aure">${n.tag_aurebesh}</span>
        </div>
      </article>
    `;
  }

  function cardNoticia(n) {
    const cls = CATEGORIA_CLASS[n.categoria] || 'urgente';
    return `
      <article class="hnn-news-card" onclick="HNN.abrirModal('${n.id}')">
        <span class="hnn-news-icone">${n.icone}</span>
        <span class="hnn-cat-badge ${cls}">${n.categoria}</span>
        <h3 class="hnn-news-card-title">${n.titulo}</h3>
        <p class="hnn-news-card-sub">${n.subtitulo}</p>
        <div class="hnn-news-card-meta">
          <span>${n.fonte.split(' - ')[0]}</span>
          <span>${n.data}</span>
        </div>
      </article>
    `;
  }

  /* ─── Sidebar ─── */
  function renderSidebar() {
    renderTransmissoes();
    renderMercados();
    renderAlerta();
  }

  function renderTransmissoes() {
    const el = document.getElementById('hnn-transmissoes');
    if (!el || !dados.transmissoes_ao_vivo) return;

    el.innerHTML = dados.transmissoes_ao_vivo.map(tx => {
      const statusCls = tx.status === 'AO VIVO' ? 'ao-vivo' : 'gravado';
      return `
        <div class="hnn-transmissao-item">
          <span class="hnn-tx-canal">${tx.canal}</span>
          <div class="hnn-tx-info">
            <span class="hnn-tx-status ${statusCls}">${tx.status}</span>
            <p class="hnn-tx-desc">${tx.descricao}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderMercados() {
    const el = document.getElementById('hnn-mercados');
    if (!el) return;

    el.innerHTML = MERCADOS.map(m => `
      <div class="hnn-mercado-item">
        <span class="hnn-mercado-nome">${m.nome}</span>
        <span class="hnn-mercado-val ${m.dir}">${m.variacao}</span>
      </div>
    `).join('');
  }

  function renderAlerta() {
    // Alerta já está no HTML estático — nada a fazer aqui
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
    const noticia = dados.noticias.find(n => n.id === id);
    if (!noticia) return;

    noticiaAtiva = noticia;
    const overlay = document.getElementById('hnn-modal-overlay');
    const modal   = document.getElementById('hnn-modal-content');

    if (!overlay || !modal) return;

    const cls = CATEGORIA_CLASS[noticia.categoria] || 'urgente';

    modal.innerHTML = `
      <button class="hnn-modal-close" onclick="HNN.fecharModal()">[ FECHAR ]</button>
      <p class="hnn-modal-id">// TRANSMISSÃO ${noticia.id} — ${noticia.data}</p>
      <span class="hnn-cat-badge ${cls}" style="margin-bottom:16px">
        ${noticia.icone} ${noticia.categoria}
      </span>
      <h2 class="hnn-modal-title">${noticia.titulo}</h2>
      <p class="hnn-modal-sub">${noticia.subtitulo}</p>
      <p class="hnn-modal-body">${noticia.corpo}</p>
      <div class="hnn-modal-footer">
        <span class="hnn-modal-fonte">◆ FONTE: ${noticia.fonte}</span>
        <span class="hnn-modal-aure">${noticia.tag_aurebesh}</span>
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