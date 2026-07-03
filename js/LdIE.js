/* ============================================================
   LdIE.js — Loja de Itens Especiais
   Depende de databaseLojaSecreta.js (variável global LOJA_SECRETA_DB)
   ============================================================ */

const TIERS = {
  lendario:     { rotulo: "Lendário",     cor: "#d4af37", glow: "rgba(212,175,55,0.45)" },
  amaldicoado:  { rotulo: "Amaldiçoado",  cor: "#b565f5", glow: "rgba(181,101,245,0.45)" },
  proibido:     { rotulo: "Proibido",     cor: "#ff3b3b", glow: "rgba(255,59,59,0.45)" },
  classificado: { rotulo: "Classificado", cor: "#c9c9c9", glow: "rgba(0,0,0,0.65)" }
};

const COMPRADORES_RIVAIS = [
  "Corretor Anônimo // Setor Hutt",
  "Comprador Encoberto // Coruscant",
  "Agente sem Identificação",
  "Representante do Cartel Zann",
  "Colecionador Privado // Origem Oculta",
  "Intermediário Imperial (não confirmado)"
];

let filtroAtual = "todos";
let estadoLotes = {}; // id -> { lanceAtual, historico: [] }

function formatarCreditos(valor) {
  if (valor == null) return "sob consulta";
  return valor.toLocaleString("pt-BR") + " créditos";
}

function inicializarEstado() {
  LOJA_SECRETA_DB.forEach(item => {
    estadoLotes[item.id] = {
      lanceAtual: item.precoBase,
      historico: []
    };
  });
}

function itemPorId(id) {
  return LOJA_SECRETA_DB.find(i => i.id === id);
}

/* ---------------- boot sequence ---------------- */
function tocarBootSequence() {

  const alvo = document.getElementById("bootSequence");
  alvo.textContent = "";
  let li = 0, ci = 0;

}

/* ---------------- destaque (lote principal) ---------------- */
function renderDestaque() {
  const item = LOJA_SECRETA_DB.find(i => i.destaque) || LOJA_SECRETA_DB[0];
  const tier = TIERS[item.classificacao];
  const wrap = document.getElementById("destaqueWrap");
  wrap.innerHTML = `
    <div class="destaque" style="--tier-cor:${tier.cor}; --tier-glow:${tier.glow}; border-color:${tier.cor};">
      <div class="destaque-holo" style="color:${tier.cor}; border-color:${tier.cor};">${item.lote}</div>
      <div>
        <p class="destaque-eyebrow">Leilão em destaque // ${tier.rotulo}</p>
        <h2>${item.nome}</h2>
        <p>${item.descricao}</p>
      </div>
      <div class="destaque-lance">
        <div class="label">Lance atual</div>
        <div class="valor" id="destaqueValor">${formatarCreditos(estadoLotes[item.id].lanceAtual)}</div>
      </div>
    </div>
  `;
  wrap.querySelector(".destaque").addEventListener("click", () => abrirModal(item.id));

  // ambientação: lances simulados sobem o valor de tempos em tempos
  setInterval(() => {
    const est = estadoLotes[item.id];
    if (est.lanceAtual == null) return;
    est.lanceAtual += item.incremento || 100000;
    const el = document.getElementById("destaqueValor");
    if (el) el.textContent = formatarCreditos(est.lanceAtual);
  }, 9000);
}

/* ---------------- grid ---------------- */
function renderGrid() {
  const grid = document.getElementById("loteGrid");
  const itens = LOJA_SECRETA_DB.filter(i => filtroAtual === "todos" || i.categoria === filtroAtual);

  grid.innerHTML = itens.map(item => {
    const tier = TIERS[item.classificacao];
    const est = estadoLotes[item.id];
    return `
      <article class="lote-card ${item.classificacao}" style="--tier-cor:${tier.cor}; --tier-glow:${tier.glow};" data-id="${item.id}">
        <div class="lote-topo">
          <span class="lote-numero">${item.lote}</span>
          <span class="tier-badge">${tier.rotulo}</span>
        </div>
        <h3 class="lote-nome">${item.nome}</h3>
        <p class="lote-nome-aurebesh">${item.nome}</p>
        <p class="lote-desc-preview">${item.descricao}</p>
        <div class="lote-rodape">
          <div class="lote-lance">
            <div class="label">${item.consulta ? "Preço" : "Lance atual"}</div>
            <div class="valor">${formatarCreditos(est.lanceAtual)}</div>
          </div>
          <button class="btn-ver">Ver lote</button>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".lote-card").forEach(card => {
    card.addEventListener("click", () => abrirModal(card.dataset.id));
  });

  document.getElementById("totalLotes").textContent = LOJA_SECRETA_DB.length;
}

/* ---------------- modal ---------------- */
function abrirModal(id) {
  const item = itemPorId(id);
  const tier = TIERS[item.classificacao];
  const est = estadoLotes[id];
  const overlay = document.getElementById("modalOverlay");

  const painelLance = item.consulta
    ? `<div class="consulta-aviso">Preço sob consulta. Nenhum vendedor sobreviveu para fixar um valor — entre em contato direto com o intermediário do leilão.</div>`
    : `
      <div class="lance-painel">
        <div class="lance-info">
          <div class="label">Lance atual</div>
          <div class="valor-grande" id="modalValor">${formatarCreditos(est.lanceAtual)}</div>
          <div class="comprador" id="modalComprador">${est.historico.length ? est.historico[est.historico.length - 1].texto : "Nenhum lance registrado ainda."}</div>
        </div>
        <button class="btn-lance" id="btnDarLance">Dar lance (+${formatarCreditos(item.incremento)})</button>
      </div>
      <div class="lance-feed" id="loteFeed"></div>
    `;

  overlay.innerHTML = `
    <div class="modal" style="--tier-cor:${tier.cor}; --tier-glow:${tier.glow}; border-color:${tier.cor};">
      <button class="modal-fechar" id="fecharModal">✕</button>
      <span class="lote-numero">${item.lote} // ${tier.rotulo}</span>
      <h2>${item.nome}</h2>
      <p class="aurebesh-linha" style="color:${tier.cor};">${item.nome}</p>
      <p class="descricao-completa">${item.descricao}</p>
      ${painelLance}
    </div>
  `;
  overlay.classList.remove("hidden");

  document.getElementById("fecharModal").addEventListener("click", fecharModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) fecharModal(); });

  if (!item.consulta) {
    renderFeed(id);
    document.getElementById("btnDarLance").addEventListener("click", () => darLance(id));
  }
}

function fecharModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
}

function renderFeed(id) {
  const feed = document.getElementById("loteFeed");
  if (!feed) return;
  feed.innerHTML = estadoLotes[id].historico
    .slice(-5)
    .reverse()
    .map(h => `<div class="${h.voce ? "voce" : ""}">${h.texto}</div>`)
    .join("");
}

function darLance(id) {
  const item = itemPorId(id);
  const est = estadoLotes[id];
  const btn = document.getElementById("btnDarLance");

  est.lanceAtual += item.incremento;
  est.historico.push({ voce: true, texto: `Você // ${formatarCreditos(est.lanceAtual)}` });

  document.getElementById("modalValor").textContent = formatarCreditos(est.lanceAtual);
  document.getElementById("modalComprador").textContent = est.historico[est.historico.length - 1].texto;
  renderFeed(id);
  renderGrid();

  btn.disabled = true;
  btn.textContent = "Lance registrado...";

  // um rival encobre o lance para manter a tensão do leilão
  setTimeout(() => {
    const rival = COMPRADORES_RIVAIS[Math.floor(Math.random() * COMPRADORES_RIVAIS.length)];
    const incrementoRival = item.incremento + Math.floor(Math.random() * item.incremento);
    est.lanceAtual += incrementoRival;
    est.historico.push({ voce: false, texto: `${rival} // ${formatarCreditos(est.lanceAtual)}` });

    const valorEl = document.getElementById("modalValor");
    const compradorEl = document.getElementById("modalComprador");
    if (valorEl) {
      valorEl.textContent = formatarCreditos(est.lanceAtual);
      compradorEl.textContent = est.historico[est.historico.length - 1].texto;
      renderFeed(id);
      renderGrid();
    }
    if (btn) {
      btn.disabled = false;
      btn.textContent = `Dar lance (+${formatarCreditos(item.incremento)})`;
    }
  }, 1600);
}

/* ---------------- filtros ---------------- */
function configurarTabs() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("ativo"));
      tab.classList.add("ativo");
      filtroAtual = tab.dataset.categoria;
      renderGrid();
    });
  });
}

/* ---------------- init ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  inicializarEstado();
  tocarBootSequence();
  renderDestaque();
  renderGrid();
  configurarTabs();
});