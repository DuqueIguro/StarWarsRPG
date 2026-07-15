/* ============================================================
   LdIE.js — Loja de Itens Especiais
   Depende de databaseLojaSecreta.js (variável global LOJA_SECRETA_DB)

   Integrado ao mesmo armazenamento do resto do site (STORAGE_KEY
   'starWarsRPGState', igual ao inventario.js), então os créditos
   pessoais e o inventário são compartilhados entre as páginas.
   Conversão: 10.000 créditos = R$ 1,00 (mesma taxa do inventario.js).
   ============================================================ */

const STORAGE_KEY = "starWarsRPGState";
const TAXA_CONVERSAO = 10000; // 10.000 créditos = R$ 1,00
const LINK_PAGAMENTO_REAIS = "https://livepix.gg/doisimperadores";

const TIERS = {
  lendario: { rotulo: "Lendário", cor: "#d4af37", glow: "rgba(212,175,55,0.45)" },
  amaldicoado: { rotulo: "Amaldiçoado", cor: "#b565f5", glow: "rgba(181,101,245,0.45)" },
  proibido: { rotulo: "Proibido", cor: "#ff3b3b", glow: "rgba(255,59,59,0.45)" },
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
let estadoLotes = {}; // id -> { lanceAtual, historico: [], arrematado: bool, arremataPor: 'creditos'|'reais'|null }

// Variáveis Nuvem
let currentUser = null;
let currentPersonagemId = null;
let userCredits = 0;

const registarLog = async (personagemId, tipoEvento, descricao, mudancaCreditos = 0) => {
  if (!personagemId) return;
  await supabaseClient.from('logs_auditoria').insert([{
    personagem_id: personagemId,
    tipo_evento: tipoEvento,
    descricao: descricao,
    mudanca_creditos: mudancaCreditos
  }]);
};

/* ---------------- formatação ---------------- */
function formatarCreditos(valor) {
  if (valor == null) return "sob consulta";
  return valor.toLocaleString("pt-BR") + " ⦻";
}

async function carregarDadosDoBanco() {
  const el = document.getElementById("creditosPessoais");
  el.textContent = "AUTENTICANDO...";

  const { data: userData, error: userError } = await supabaseClient.auth.getUser();
  if (userError || !userData.user) {
    el.textContent = "ACESSO NEGADO";
    mostrarNotificacao("Autenticação requerida para transações sombrias.", "erro");
    return;
  }
  currentUser = userData.user;

  const { data: personagens, error: pError } = await supabaseClient
    .from('personagens').select('id, creditos').eq('user_id', currentUser.id).limit(1);

  if (pError || !personagens || personagens.length === 0) {
    el.textContent = "S/ CONTA FANTASMA";
    return;
  }

  currentPersonagemId = personagens[0].id;
  userCredits = personagens[0].creditos || 0;
  renderCreditosPessoais();
}

function renderCreditosPessoais() {
  const el = document.getElementById("creditosPessoais");
  if (el) el.textContent = userCredits.toLocaleString("pt-BR") + " ⦻";
}

function formatarReais(valor) {
  if (valor == null) return "sob consulta";
  const emReais = valor / TAXA_CONVERSAO;
  return "R$ " + emReais.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ---------------- notificações ---------------- */
function mostrarNotificacao(mensagem, tipo = "sucesso") {
  const el = document.getElementById("notificacao");
  if (!el) return;
  el.textContent = mensagem;
  el.className = `notificacao ${tipo} visivel`;
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => el.classList.remove("visivel"), 3200);
}

function inicializarEstado() {
  LOJA_SECRETA_DB.forEach(item => {
    estadoLotes[item.id] = {
      lanceAtual: item.precoBase,
      historico: [],
      arrematado: false,
      arremataPor: null
    };
  });
}

function itemPorId(id) {
  return LOJA_SECRETA_DB.find(i => i.id === id);
}

/* ---------------- destaque (lote principal) ---------------- */
function renderDestaque() {
  const item = LOJA_SECRETA_DB.find(i => i.destaque) || LOJA_SECRETA_DB[0];
  const tier = TIERS[item.classificacao];
  const wrap = document.getElementById("destaqueWrap");
  const est = estadoLotes[item.id];
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
        <div class="valor" id="destaqueValor">${formatarCreditos(est.lanceAtual)}</div>
        <div class="valor-reais" id="destaqueValorReais">${formatarReais(est.lanceAtual)}</div>
      </div>
    </div>
  `;
  wrap.querySelector(".destaque").addEventListener("click", () => abrirModal(item.id));

  // ambientação: lances simulados sobem o valor de tempos em tempos
  setInterval(() => {
    if (est.arrematado || est.lanceAtual == null) return;
    est.lanceAtual += item.incremento || 100000;
    const el = document.getElementById("destaqueValor");
    const elReais = document.getElementById("destaqueValorReais");
    if (el) el.textContent = formatarCreditos(est.lanceAtual);
    if (elReais) elReais.textContent = formatarReais(est.lanceAtual);
  }, 9000);
}

/* ---------------- grid ---------------- */
function renderGrid() {
  const grid = document.getElementById("loteGrid");
  const itens = LOJA_SECRETA_DB.filter(i => filtroAtual === "todos" || i.categoria === filtroAtual);

  grid.innerHTML = itens.map(item => {
    const tier = TIERS[item.classificacao];
    const est = estadoLotes[item.id];
    const arrematadoClasse = est.arrematado ? "arrematado" : "";
    return `
      <article class="lote-card ${item.classificacao} ${arrematadoClasse}" style="--tier-cor:${tier.cor}; --tier-glow:${tier.glow};" data-id="${item.id}">
        <div class="lote-topo">
          <span class="lote-numero">${item.lote}</span>
          <span class="tier-badge">${est.arrematado ? "Arrematado" : tier.rotulo}</span>
        </div>
        <h3 class="lote-nome">${item.nome}</h3>
        <p class="lote-nome-aurebesh">${item.nome}</p>
        <p class="lote-desc-preview">${item.descricao}</p>
        <div class="lote-rodape">
          <div class="lote-lance">
            <div class="label">${item.consulta ? "Preço" : "Lance atual"}</div>
            <div class="valor">${formatarCreditos(est.lanceAtual)}</div>
            <div class="valor-reais">${formatarReais(est.lanceAtual)}</div>
          </div>
          <button class="btn-ver">${est.arrematado ? "Ver recibo" : "Ver lote"}</button>
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

  let painelInferior;

  if (est.arrematado) {
    painelInferior = `
      <div class="arremate-confirmado">
        Lote arrematado ${est.arremataPor === "reais" ? "via Livepix (R$)" : "com créditos pessoais"}.
        Verifique seu inventário pessoal.
      </div>
    `;
  } else if (item.consulta) {
    painelInferior = `<div class="consulta-aviso">Preço sob consulta. Nenhum vendedor sobreviveu para fixar um valor — entre em contato direto com o intermediário do leilão.</div>`;
  } else {
    painelInferior = `
      <div class="lance-painel">
        <div class="lance-info">
          <div class="label">Lance atual</div>
          <div class="valor-grande" id="modalValor">${formatarCreditos(est.lanceAtual)}</div>
          <div class="valor-reais" id="modalValorReais">${formatarReais(est.lanceAtual)}</div>
          <div class="comprador" id="modalComprador">${est.historico.length ? est.historico[est.historico.length - 1].texto : "Nenhum lance registrado ainda."}</div>
        </div>
        <button class="btn-lance" id="btnDarLance">Dar lance (+${formatarCreditos(item.incremento)})</button>
      </div>
      <div class="lance-feed" id="loteFeed"></div>

      <div class="arremate-painel">
        <p class="arremate-titulo">Arrematar agora por ${formatarCreditos(est.lanceAtual)} <span class="reais-inline">(${formatarReais(est.lanceAtual)})</span></p>
        <div class="arremate-botoes">
          <button class="btn-arrematar creditos" id="btnArremCreditos">Pagar com Créditos</button>
          <button class="btn-arrematar reais" id="btnArremReais">Pagar com Reais (Livepix)</button>
        </div>
      </div>
    `;
  }

  overlay.innerHTML = `
    <div class="modal" style="--tier-cor:${tier.cor}; --tier-glow:${tier.glow}; border-color:${tier.cor};">
      <button class="modal-fechar" id="fecharModal">✕</button>
      <span class="lote-numero">${item.lote} // ${tier.rotulo}</span>
      <h2>${item.nome}</h2>
      <p class="aurebesh-linha" style="color:${tier.cor};">${item.nome}</p>
      <p class="descricao-completa">${item.descricao}</p>
      ${painelInferior}
    </div>
  `;
  overlay.classList.remove("hidden");

  document.getElementById("fecharModal").addEventListener("click", fecharModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) fecharModal(); });

  if (!est.arrematado && !item.consulta) {
    renderFeed(id);
    document.getElementById("btnDarLance").addEventListener("click", () => darLance(id));
    document.getElementById("btnArremCreditos").addEventListener("click", () => arrematarLote(id, "creditos"));
    document.getElementById("btnArremReais").addEventListener("click", () => arrematarLote(id, "reais"));
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
  if (est.arrematado) return;

  est.lanceAtual += item.incremento;
  est.historico.push({ voce: true, texto: `Você // ${formatarCreditos(est.lanceAtual)}` });

  atualizarPainelLanceModal(est);
  renderFeed(id);
  renderGrid();
  atualizarTituloArremate(id);

  btn.disabled = true;
  btn.textContent = "Lance registrado...";

  // um rival encobre o lance para manter a tensão do leilão
  setTimeout(() => {
    if (est.arrematado) return;
    const rival = COMPRADORES_RIVAIS[Math.floor(Math.random() * COMPRADORES_RIVAIS.length)];
    const incrementoRival = item.incremento + Math.floor(Math.random() * item.incremento);
    est.lanceAtual += incrementoRival;
    est.historico.push({ voce: false, texto: `${rival} // ${formatarCreditos(est.lanceAtual)}` });

    atualizarPainelLanceModal(est);
    renderFeed(id);
    renderGrid();
    atualizarTituloArremate(id);

    if (btn) {
      btn.disabled = false;
      btn.textContent = `Dar lance (+${formatarCreditos(item.incremento)})`;
    }
  }, 100000 + Math.random() * 600000); // rival reage entre 1min e 10min
}

function atualizarPainelLanceModal(est) {
  const valorEl = document.getElementById("modalValor");
  const valorReaisEl = document.getElementById("modalValorReais");
  const compradorEl = document.getElementById("modalComprador");
  if (valorEl) valorEl.textContent = formatarCreditos(est.lanceAtual);
  if (valorReaisEl) valorReaisEl.textContent = formatarReais(est.lanceAtual);
  if (compradorEl) compradorEl.textContent = est.historico[est.historico.length - 1].texto;
}

function atualizarTituloArremate(id) {
  const est = estadoLotes[id];
  const titulo = document.querySelector(".arremate-titulo");
  if (titulo) {
    titulo.innerHTML = `Arrematar agora por ${formatarCreditos(est.lanceAtual)} <span class="reais-inline">(${formatarReais(est.lanceAtual)})</span>`;
  }
}

/* ---------------- arremate (pagamento e nuvem) ---------------- */
async function arrematarLote(id, metodo) {
  const item = itemPorId(id);
  const est = estadoLotes[id];
  if (est.arrematado) return;
  if (!currentPersonagemId) {
    mostrarNotificacao("Você precisa de uma conta ativa para arrematar.", "erro");
    return;
  }

  // Previne duplo clique durante o carregamento de rede
  const btnCred = document.getElementById("btnArremCreditos");
  const btnReais = document.getElementById("btnArremReais");
  if (btnCred) btnCred.disabled = true;
  if (btnReais) btnReais.disabled = true;
  if (btnCred) btnCred.textContent = "PROCESSANDO...";

  // Formata o item para o padrão da Ficha e do Inventário Pessoal
  const tier = TIERS[item.classificacao];
  const categoriaLegivel = item.categoria === "reliquias" ? "Relíquias e Antiguidades" : "Instrumentos de Poder";

  const customData = {
    name: item.nome,
    description: item.descricao,
    price: est.lanceAtual,
    quality: tier.rotulo,
    category: categoriaLegivel,
    tipo_inventario: "equipamento",
    is_custom: true // Marca como gerado e não pertencente à loja comum
  };

  if (metodo === "creditos") {
    // 1. Verificação de Saldo no Servidor (Anti-Fraude)
    const { data: dbData } = await supabaseClient.from('personagens').select('creditos').eq('id', currentPersonagemId).single();
    const saldoReal = dbData ? dbData.creditos : userCredits;

    if (saldoReal < est.lanceAtual) {
      mostrarNotificacao("Créditos insuficientes nas suas contas fantasma!", "erro");
      if (btnCred) { btnCred.disabled = false; btnCred.textContent = "Pagar com Créditos"; }
      if (btnReais) btnReais.disabled = false;
      return;
    }

    userCredits = saldoReal - est.lanceAtual;

    // 2. Debitar Conta
    await supabaseClient.from('personagens').update({ creditos: userCredits }).eq('id', currentPersonagemId);

    // 3. Inserir Item
    await supabaseClient.from('inventario').insert([{
      personagem_id: currentPersonagemId,
      user_id: currentUser.id,
      item_id: null,
      quantidade: 1,
      origem: 'leilao_clandestino',
      dados_customizados: customData
    }]);

    // 4. Auditar Log com histórico financeiro
    const logMsg = `Relíquia [${item.nome}] arrematada. Saldo anterior: ${saldoReal} | Novo Saldo: ${userCredits}`;
    await registarLog(currentPersonagemId, 'COMPRA_LEILAO', logMsg, -est.lanceAtual);

    est.arrematado = true;
    est.arremataPor = "creditos";
    renderCreditosPessoais();
    mostrarNotificacao(`${item.nome} transferido para seu compartimento de carga.`, "sucesso");

  } else {
    // Transação em Reais (Livepix)
    await supabaseClient.from('inventario').insert([{
      personagem_id: currentPersonagemId,
      user_id: currentUser.id,
      item_id: null,
      quantidade: 1,
      origem: 'leilao_reais',
      dados_customizados: customData
    }]);

    await registarLog(currentPersonagemId, 'COMPRA_REAIS', `Relíquia [${item.nome}] adquirida via Patrocínio (Livepix).`, 0);

    est.arrematado = true;
    est.arremataPor = "reais";
    window.open(LINK_PAGAMENTO_REAIS, "_blank");
    mostrarNotificacao("Redirecionando para o Terminal Externo...", "sucesso");
  }

  renderGrid();
  abrirModal(id);
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
document.addEventListener("DOMContentLoaded", async () => {
  inicializarEstado();
  renderDestaque();
  renderGrid();
  configurarTabs();
  await carregarDadosDoBanco(); // Aguarda a sincronização da nuvem
});