let playerInventory = [];
let selectedItems = [];
let playerKey = "";
let playerName = "";
let playerId = "";

let globalTargetData = null; // Guarda o alvo validado para o modal usar

document.addEventListener("DOMContentLoaded", async () => {
  await initPlayerData();
  setupFilterButtons();
  updateTime();
  setInterval(updateTime, 1000);
});

// Gera um ID Galáctico no padrão GAL-XXXX-XXXX
function generateGalacticKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array.from({ length: 4 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  return `GAL-${segment()}-${segment()}`;
}

/* INICIO DE FUNÇÃO DE initPlayerData; Sincronização Supabase */
async function initPlayerData() {
  const { data: userData, error: userError } = await supabaseClient.auth.getUser();

  if (userError || !userData.user) {
    alert("Acesso negado. Autentique-se no terminal.");
    window.location.href = '../index.html';
    return;
  }

  const { data: pData } = await supabaseClient.from('personagens').select('id, nome, chave_transferencia').eq('user_id', userData.user.id).limit(1);

  if (pData && pData.length > 0) {
    playerId = pData[0].id;
    playerName = pData[0].nome;

    // Puxa a mesma chave gerada pelo Banco
    playerKey = pData[0].chave_transferencia;
    if (!playerKey) {
      playerKey = generateGalacticKey();
      await supabaseClient.from('personagens').update({ chave_transferencia: playerKey }).eq('id', playerId);
    }

    document.getElementById("my-cargo-key").innerText = playerKey;
    document.getElementById("my-cargo-key").classList.remove('animate-pulse');

    document.getElementById("sender-name").value = playerName;

    await fetchInventory();
    await carregarHistoricoArmazem();
  }
}

/* INICIO DE FUNÇÃO DE gerarNovaChaveBackend; Invalida a anterior no DB */
async function gerarNovaChaveBackend() {
  if (!confirm("Gerar uma nova chave invalidará a sua atual em todas as transferências (Banco e Armazém). Tem certeza?")) return;

  const novaChave = generateGalacticKey();

  const { error } = await supabaseClient.from('personagens').update({ chave_transferencia: novaChave }).eq('id', playerId);

  if (!error) {
    playerKey = novaChave;
    document.getElementById("my-cargo-key").innerText = playerKey;
    alert("SISTEMA: Nova chave logística gerada e atrelada ao seu Dossiê.");
  } else {
    alert("ERRO DO SISTEMA: Falha ao registrar nova chave no banco de dados.");
  }
}

const generateBtn = document.getElementById("generate-key-btn");
if (generateBtn) {
  generateBtn.addEventListener("click", async () => {
    await gerarNovaChaveBackend();
  });
}

async function fetchInventory() {
  const { data, error } = await supabaseClient.from('inventario').select('*').eq('personagem_id', playerId);

  if (!error && data) {
    playerInventory = data.map(dbItem => {
      // 1. Puxa os dados base do banco de itens da loja (se o arquivo databaseInventario.js estiver carregado no HTML)
      let baseData = {};
      if (dbItem.item_id && typeof itemDatabase !== 'undefined') {
        baseData = itemDatabase.find(i => String(i.id) === String(dbItem.item_id)) || {};
      }

      // 2. Garante que os dados customizados sejam lidos como Objeto (mesmo se o banco devolver como string)
      let customData = dbItem.dados_customizados;
      if (typeof customData === 'string') {
        try { customData = JSON.parse(customData); } catch (e) { customData = {}; }
      } else if (!customData) {
        customData = {};
      }

      // 3. Mescla tudo. Se a propriedade existir no customData, ela sobrescreve a do baseData.
      const specs = { ...baseData, ...customData };

      return {
        id: dbItem.id, // O UUID real da tabela 'inventario'
        name: specs.nome || specs.name || "Item Desconhecido",
        quality: (specs.qualidade || specs.quality || "normal").toLowerCase()
      };
    });

    selectedItems = [];
    updatePreview();
    updateInventoryCounter();
    const activeFilter = document.querySelector(".filter-btn.active")?.getAttribute("data-quality") || 'all';
    renderInventory(activeFilter);
  }
}

document.getElementById("copy-key-btn").addEventListener("click", () => {
  navigator.clipboard.writeText(playerKey).then(() => {
    const btn = document.getElementById("copy-key-btn");
    btn.innerText = "COPIADO!";
    btn.style.background = "var(--accent)";
    btn.style.color = "#000";
    setTimeout(() => {
      btn.innerText = "COPIAR CHAVE";
      btn.style.background = "transparent";
      btn.style.color = "var(--accent)";
    }, 2000);
  });
});

function renderInventory(qualityFilter) {
  const grid = document.getElementById("item-grid");
  grid.innerHTML = "";

  const filteredItems = qualityFilter === 'all'
    ? playerInventory
    : playerInventory.filter(item => item.quality === qualityFilter);

  if (filteredItems.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 20px;">NENHUM ITEM ENCONTRADO</div>`;
    return;
  }

  filteredItems.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("item-card", `quality-${item.quality}`);

    if (selectedItems.some(i => i.id === item.id)) {
      card.classList.add("selected");
    }

    // Formata o UUID para ficar pequeno na interface do cartão
    const shortId = item.id.split('-')[0].toUpperCase();

    card.innerHTML = `
            <div class="item-name">${escapeHTML(item.name)}</div>
            <span class="quality-badge badge-${item.quality}">${item.quality}</span>
            <div class="item-id">SR: <strong>${shortId}</strong></div>
        `;

    card.addEventListener("click", () => toggleItemSelection(item, card));
    grid.appendChild(card);
  });
}

function setupFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderInventory(btn.getAttribute("data-quality"));
    });
  });
}

function toggleItemSelection(item, cardElement) {
  const index = selectedItems.findIndex(i => i.id === item.id);
  if (index > -1) {
    selectedItems.splice(index, 1);
    cardElement.classList.remove("selected");
  } else {
    selectedItems.push(item);
    cardElement.classList.add("selected");
  }
  updatePreview();
}

function updatePreview() {
  const previewBox = document.getElementById("selected-item-preview");
  const dispatchBtn = document.getElementById("dispatch-btn");

  if (selectedItems.length === 0) {
    previewBox.className = "item-preview-box empty";
    previewBox.innerHTML = `<span>NENHUM ITEM SELECIONADO NO INVENTÁRIO</span>`;
    dispatchBtn.disabled = true;
    return;
  }

  previewBox.className = "item-preview-box has-items";
  previewBox.innerHTML = `
        <div class="selected-tags-container">
            ${selectedItems.map(item => `
                <span class="preview-item-tag quality-${item.quality}">
                    ${escapeHTML(item.name)}
                    <span class="remove-tag" onclick="removeSingleItem('${item.id}')">×</span>
                </span>
            `).join('')}
        </div>
        <div class="selected-count-badge">${selectedItems.length} ITEM(NS)</div>
    `;
  dispatchBtn.disabled = false;
}

window.removeSingleItem = function (id) {
  selectedItems = selectedItems.filter(i => i.id !== id);
  const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-quality");
  renderInventory(activeFilter);
  updatePreview();
}

function updateInventoryCounter() {
  document.getElementById("inventory-count").innerText = playerInventory.length;
}

/* INICIO DE FUNÇÃO DE Modal e Submissão */
const transferForm = document.getElementById("cargo-transfer-form");
transferForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (selectedItems.length === 0) return;

  const targetKey = document.getElementById("target-key").value.trim().toUpperCase();
  const btn = document.getElementById("dispatch-btn");

  if (targetKey === playerKey) {
    alert("ERRO DE PROTOCOLO: A chave de destino é idêntica à deste armazém.");
    return;
  }

  btn.disabled = true;
  btn.innerText = "VERIFICANDO ASSINATURAS...";

  // CORREÇÃO AQUI: Agora nós puxamos também o 'user_id' do destinatário
  const { data: targetData, error: targetError } = await supabaseClient
    .from('personagens')
    .select('id, nome, user_id')
    .eq('chave_transferencia', targetKey)
    .single();

  if (targetError || !targetData) {
    alert("ERRO DO SISTEMA: Armazém destinatário não localizado.");
    btn.disabled = false;
    btn.innerText = "GERAR ORDEM DE DESPACHO";
    return;
  }

  // Passou na validação? Prepara e abre o modal.
  globalTargetData = targetData;

  const ul = document.getElementById("modal-item-list");
  ul.innerHTML = selectedItems.map(i => `<li><span>${escapeHTML(i.name)}</span> <span style="color:var(--q-${i.quality})">${i.quality.toUpperCase()}</span></li>`).join('');

  document.getElementById("cargo-modal").style.display = "flex";
  btn.disabled = false;
  btn.innerText = "GERAR ORDEM DE DESPACHO";
});

window.closeCargoModal = function () {
  document.getElementById("cargo-modal").style.display = "none";
  globalTargetData = null;
}

window.executeCargoTransfer = async function () {
  if (!globalTargetData || selectedItems.length === 0) return;

  const message = document.getElementById("transfer-msg").value.trim();
  const itemIds = selectedItems.map(i => i.id);

  // CORREÇÃO AQUI: Atualiza a Titularidade no Banco trocando o Personagem e a Conta(user_id)
  await supabaseClient.from('inventario')
    .update({
      personagem_id: globalTargetData.id,
      user_id: globalTargetData.user_id
    })
    .in('id', itemIds);

  // 2. Prepara e salva o Log Tático com JSON
  const namesList = selectedItems.map(i => i.name).join(', ');
  const detalhesLog = JSON.stringify({
    remetente_nome: playerName,
    destinatario_nome: globalTargetData.nome,
    mensagem: message,
    itens: namesList
  });

  await supabaseClient.from('transacoes_log').insert({
    tipo_transacao: 'ITENS',
    remetente_id: playerId,
    destinatario_id: globalTargetData.id,
    valor_ou_quantidade: selectedItems.length,
    detalhes: detalhesLog
  });

  // 3. Auditoria do Mestre
  await supabaseClient.from('logs_auditoria').insert({
    personagem_id: playerId,
    tipo_evento: 'ENVIO_CARGA',
    descricao: `Enviou ${selectedItems.length} item(ns) para ${globalTargetData.nome}: [${namesList}]. Msg: ${message || 'Sem nota'}`,
    mudanca_creditos: 0
  });

  alert(`CARGA DESPACHADA: ${selectedItems.length} item(ns) enviados para ${globalTargetData.nome}!`);

  document.getElementById("target-key").value = "";
  document.getElementById("transfer-msg").value = "";

  closeCargoModal();
  await fetchInventory(); // Atualiza limpando o que foi enviado
  await carregarHistoricoArmazem();
}

/* INICIO DE FUNÇÃO DE carregarHistoricoArmazem */
async function carregarHistoricoArmazem() {
  const historyList = document.getElementById("cargo-history-list");

  const { data: logs, error } = await supabaseClient.from('transacoes_log')
    .select('*')
    .eq('tipo_transacao', 'ITENS')
    .or(`remetente_id.eq.${playerId},destinatario_id.eq.${playerId}`)
    .order('data_transacao', { ascending: false })
    .limit(20);

  if (error || !logs || logs.length === 0) {
    historyList.innerHTML = '<div class="empty-history text-stone-500">NENHUMA CARGA DESPACHADA NESTA SESSÃO.</div>';
    return;
  }

  historyList.innerHTML = '';

  logs.forEach(log => {
    let detailsObj = {};
    try { detailsObj = JSON.parse(log.detalhes); } catch (e) { }

    const isSent = log.remetente_id === playerId;
    const time = new Date(log.data_transacao).toLocaleTimeString('pt-BR', { hour12: false });
    const date = new Date(log.data_transacao).toLocaleDateString('pt-BR');

    const labelName = isSent ? `PARA: ${escapeHTML(detailsObj.destinatario_nome || 'Desconhecido')}` : `DE: ${escapeHTML(detailsObj.remetente_nome || 'Desconhecido')}`;
    const arrow = isSent ? '📤 ENVIO:' : '📥 RECEBIMENTO:';
    const colorBorder = isSent ? 'border-left: 4px solid var(--accent);' : 'border-left: 4px solid var(--q-boa); background: rgba(40,167,69,0.05);';

    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.style = `cursor: pointer; flex-direction: column; ${colorBorder}`;

    historyItem.innerHTML = `
        <div style="display: flex; justify-content: space-between; width: 100%;">
            <div>
                <strong>${arrow} ${labelName}</strong><br>
                <small style="color: #666; font-size: 0.65rem;">${date} às ${time} (CLIQUE PARA MANIFESTO)</small>
            </div>
            <div style="font-family: var(--font-title); font-weight: bold; color: var(--accent);">
                ${log.valor_ou_quantidade} LOTE(S)
            </div>
        </div>
        <div class="tx-details" style="display: none; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border-color); width: 100%;">
            <div style="font-size: 0.8rem; color: #ccc; margin-bottom: 8px;"><strong>Conteúdo:</strong> ${escapeHTML(detailsObj.itens || 'Itens não especificados.')}</div>
            <div class="tx-msg">Nota: "${detailsObj.mensagem ? escapeHTML(detailsObj.mensagem) : 'Sem nota de frete.'}"</div>
        </div>
        `;

    historyItem.addEventListener("click", function () {
      const details = this.querySelector('.tx-details');
      details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });

    historyList.appendChild(historyItem);
  });
}
/* FIM DE FUNÇÃO DE carregarHistoricoArmazem */

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function updateTime() {
  const now = new Date();
  document.getElementById("system-time").innerText = `LOG-DATE ${now.getFullYear()}.${now.getMonth() + 1}${now.getDate()} // ${now.toTimeString().split(' ')[0]}`;
}