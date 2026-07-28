// Banco de Dados de Exemplo (Cada item é único e individual)
const mockInventory = [
  { id: "item-101", name: "Cristal Kyber Puro", quality: "lendario" },
  { id: "item-102", name: "Cristal Kyber Puro", quality: "lendario" },
  { id: "item-103", name: "Lingote de Beskar #891", quality: "imperial" },
  { id: "item-104", name: "Lingote de Beskar #892", quality: "imperial" },
  { id: "item-105", name: "Blaster DL-44", quality: "excelente" },
  { id: "item-106", name: "Núcleo de Hiperespaço R-300", quality: "excelente" },
  { id: "item-107", name: "Escudo Defletor Portátil", quality: "boa" },
  { id: "item-108", name: "Célula Plasmática Alpha", quality: "boa" },
  { id: "item-109", name: "Ração de Sobrevivência", quality: "normal" },
  { id: "item-110", name: "Filtro de Ar de Traje", quality: "normal" },
  { id: "item-111", name: "Placa de Sucata de Aço", quality: "baixa" },
  { id: "item-112", name: "Fiação Elétrica Usada", quality: "baixa" }
];

// Array que guarda os itens atualmente selecionados
let selectedItems = [];
let cargoKey = localStorage.getItem("cargo_warehouse_key");

document.addEventListener("DOMContentLoaded", () => {
  initCargoKey();
  renderInventory('all');
  setupFilterButtons();
  updateTime();
  setInterval(updateTime, 1000);
});

// Gerador de Chave de Carga
function generateCargoKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => {
    let str = '';
    for (let i = 0; i < 4; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };
  return `CRG-${segment()}-${segment()}`;
}

function initCargoKey() {
  if (!cargoKey) {
    cargoKey = generateCargoKey();
    localStorage.setItem("cargo_warehouse_key", cargoKey);
  }
  document.getElementById("my-cargo-key").innerText = cargoKey;
  updateInventoryCounter();
}

// Copiar Chave
document.getElementById("copy-key-btn").addEventListener("click", () => {
  navigator.clipboard.writeText(cargoKey).then(() => {
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

// Renderizar Inventário por Categoria de Qualidade
function renderInventory(qualityFilter) {
  const grid = document.getElementById("item-grid");
  grid.innerHTML = "";

  const filteredItems = qualityFilter === 'all' 
    ? mockInventory 
    : mockInventory.filter(item => item.quality === qualityFilter);

  if (filteredItems.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 20px;">NENHUM ITEM NESTA CATEGORIA</div>`;
    return;
  }

  filteredItems.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("item-card", `quality-${item.quality}`);
    
    // Verifica se já está selecionado
    const isSelected = selectedItems.some(i => i.id === item.id);
    if (isSelected) {
      card.classList.add("selected");
    }

    card.innerHTML = `
      <div class="item-name">${escapeHTML(item.name)}</div>
      <span class="quality-badge badge-${item.quality}">${item.quality}</span>
      <div class="item-id">ID: <strong>${item.id}</strong></div>
    `;

    card.addEventListener("click", () => toggleItemSelection(item, card));
    grid.appendChild(card);
  });
}

// Configuração dos Botões de Filtro
function setupFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const quality = btn.getAttribute("data-quality");
      renderInventory(quality);
    });
  });
}

// Função de Alternar Múltipla Seleção
function toggleItemSelection(item, cardElement) {
  const index = selectedItems.findIndex(i => i.id === item.id);

  if (index > -1) {
    // Se já estava selecionado, remove da lista
    selectedItems.splice(index, 1);
    cardElement.classList.remove("selected");
  } else {
    // Se não estava selecionado, adiciona à lista
    selectedItems.push(item);
    cardElement.classList.add("selected");
  }

  updatePreview();
}

// Atualiza o painel de itens selecionados e estado do botão de despacho
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

// Permite remover um item direto clicando no 'x' do preview
function removeSingleItem(id) {
  selectedItems = selectedItems.filter(i => i.id !== id);
  const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-quality");
  renderInventory(activeFilter);
  updatePreview();
}

// Atualiza contador de capacidade total
function updateInventoryCounter() {
  document.getElementById("inventory-count").innerText = mockInventory.length;
}

// Submissão da Transferência
const transferForm = document.getElementById("cargo-transfer-form");
const historyList = document.getElementById("cargo-history-list");

transferForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (selectedItems.length === 0) {
    alert("ERRO: Selecione ao menos um item para despachar!");
    return;
  }

  const senderName = document.getElementById("sender-name").value.trim();
  const targetKey = document.getElementById("target-key").value.trim().toUpperCase();
  const message = document.getElementById("transfer-msg").value.trim();

  if (targetKey === cargoKey) {
    alert("ERRO DE PROTOCOLO: A chave de destino é idêntica à deste armazém.");
    return;
  }

  // Remove os itens despachados do banco de dados local
  selectedItems.forEach(selected => {
    const idx = mockInventory.findIndex(item => item.id === selected.id);
    if (idx !== -1) mockInventory.splice(idx, 1);
  });

  // Adiciona ao Histórico
  addCargoHistory({
    sender: senderName,
    target: targetKey,
    items: [...selectedItems],
    message: message,
    time: new Date().toLocaleTimeString()
  });

  // Limpa formulário e seleções
  alert(`CARGA DESPACHADA: ${selectedItems.length} item(ns) enviado(s) com sucesso!`);
  selectedItems = [];
  
  updatePreview();
  updateInventoryCounter();

  document.getElementById("target-key").value = "";
  document.getElementById("transfer-msg").value = "";

  const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-quality");
  renderInventory(activeFilter);
});

// Adiciona Entrada no Histórico
function addCargoHistory(data) {
  const emptyMsg = historyList.querySelector(".empty-history");
  if (emptyMsg) emptyMsg.remove();

  const historyItem = document.createElement("div");
  historyItem.className = "history-item";

  const itemListFormatted = data.items.map(i => 
    `${escapeHTML(i.name)} <span class="quality-badge badge-${i.quality}">${i.quality}</span>`
  ).join(", ");

  historyItem.innerHTML = `
    <div class="tx-info">
      <div class="tx-item-name">LOTE DESPACHADO (${data.items.length} ITENS):</div>
      <div class="tx-item-list">${itemListFormatted}</div>
      <div><strong>DESPACHANTE:</strong> ${escapeHTML(data.sender)}</div>
      <div><strong>ARMAZÉM DESTINO:</strong> ${escapeHTML(data.target)}</div>
      ${data.message ? `<div class="tx-msg">Manifesto: "${escapeHTML(data.message)}"</div>` : ''}
      <small style="color: #666; font-size: 0.65rem;">${data.time}</small>
    </div>
  `;

  historyList.prepend(historyItem);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function updateTime() {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const starDate = `LOG-DATE ${now.getFullYear()}.${now.getMonth() + 1}${now.getDate()}`;
  document.getElementById("system-time").innerText = `${starDate} // ${timeStr}`;
}