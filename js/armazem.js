// Banco de Dados do Galpão de Exemplo
const mockInventory = [
  { id: "item-1", name: "Cristal Kyber Puro", quality: "lendario", qty: 2 },
  { id: "item-2", name: "Lingote de Beskar", quality: "imperial", qty: 15 },
  { id: "item-3", name: "Blaster DL-44", quality: "excelente", qty: 5 },
  { id: "item-4", name: "Núcleo de Hiperespaço", quality: "excelente", qty: 3 },
  { id: "item-5", name: "Escudo Defletor Portátil", quality: "boa", qty: 8 },
  { id: "item-6", name: "Célula Plasmática", quality: "boa", qty: 25 },
  { id: "item-7", name: "Rações de Sobrevivência", quality: "normal", qty: 100 },
  { id: "item-8", name: "Filtro de Ar de Traje", quality: "normal", qty: 40 },
  { id: "item-9", name: "Placa de Sucata de Aço", quality: "baixa", qty: 200 },
  { id: "item-10", name: "Fiação Elétrica Usada", quality: "baixa", qty: 85 }
];

let selectedItem = null;
let cargoKey = localStorage.getItem("cargo_warehouse_key");

document.addEventListener("DOMContentLoaded", () => {
  initCargoKey();
  renderInventory('all');
  setupFilterButtons();
  updateTime();
  setInterval(updateTime, 1000);
});

// Chave Única de Armazém de Carga (Ex: CRG-89B1-X902)
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

// Botão Copiar Chave
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

// Renderizar Inventário
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
    if (selectedItem && selectedItem.id === item.id) {
      card.classList.add("selected");
    }

    card.innerHTML = `
      <div class="item-name">${escapeHTML(item.name)}</div>
      <span class="quality-badge badge-${item.quality}">${item.quality}</span>
      <div class="item-qty">ESTOQUE: <strong>${item.qty}</strong></div>
    `;

    card.addEventListener("click", () => selectItem(item, card));
    grid.appendChild(card);
  });
}

// Configurar Filtros
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

// Seleção de Item
function selectItem(item, cardElement) {
  selectedItem = item;

  document.querySelectorAll(".item-card").forEach(c => c.classList.remove("selected"));
  cardElement.classList.add("selected");

  const previewBox = document.getElementById("selected-item-preview");
  previewBox.className = `item-preview-box has-item quality-${item.quality}`;
  previewBox.innerHTML = `
    <div>
      <strong>${escapeHTML(item.name)}</strong>
      <span class="quality-badge badge-${item.quality}" style="margin-left: 8px;">${item.quality}</span>
    </div>
    <small style="color: #aaa;">DISPONÍVEL: ${item.qty}</small>
  `;

  const qtyInput = document.getElementById("item-quantity");
  qtyInput.disabled = false;
  qtyInput.max = item.qty;
  qtyInput.value = 1;

  document.getElementById("dispatch-btn").disabled = false;
}

function updateInventoryCounter() {
  const total = mockInventory.reduce((acc, curr) => acc + curr.qty, 0);
  document.getElementById("inventory-count").innerText = total;
}

// Formulário de Transferência
const transferForm = document.getElementById("cargo-transfer-form");
const historyList = document.getElementById("cargo-history-list");

transferForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectedItem) {
    alert("ERRO: Nenhum item foi selecionado para transferência!");
    return;
  }

  const senderName = document.getElementById("sender-name").value.trim();
  const targetKey = document.getElementById("target-key").value.trim().toUpperCase();
  const dispatchQty = parseInt(document.getElementById("item-quantity").value);
  const message = document.getElementById("transfer-msg").value.trim();

  if (targetKey === cargoKey) {
    alert("ERRO DE PROTOCOLO: A chave de destino é a mesma deste galpão.");
    return;
  }

  if (dispatchQty > selectedItem.qty || dispatchQty <= 0) {
    alert("ERRO DE QUANTIDADE: Quantidade solicitada inválida ou superior ao estoque.");
    return;
  }

  // Abater do estoque
  selectedItem.qty -= dispatchQty;

  addCargoHistory({
    sender: senderName,
    target: targetKey,
    itemName: selectedItem.name,
    quality: selectedItem.quality,
    qty: dispatchQty,
    message: message,
    time: new Date().toLocaleTimeString()
  });

  updateInventoryCounter();
  
  if (selectedItem.qty <= 0) {
    const index = mockInventory.findIndex(i => i.id === selectedItem.id);
    if (index !== -1) mockInventory.splice(index, 1);
    resetFormSelection();
  } else {
    document.getElementById("item-quantity").max = selectedItem.qty;
    document.getElementById("item-quantity").value = 1;
  }

  const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-quality");
  renderInventory(activeFilter);

  alert(`CARGA DESPACHADA: ${dispatchQty}x item(ns) enviado(s) com sucesso!`);
});

function resetFormSelection() {
  selectedItem = null;
  const previewBox = document.getElementById("selected-item-preview");
  previewBox.className = "item-preview-box empty";
  previewBox.innerHTML = `<span>NENHUM ITEM SELECIONADO NO INVENTÁRIO</span>`;

  document.getElementById("item-quantity").value = 1;
  document.getElementById("item-quantity").disabled = true;
  document.getElementById("dispatch-btn").disabled = true;
}

function addCargoHistory(data) {
  const emptyMsg = historyList.querySelector(".empty-history");
  if (emptyMsg) emptyMsg.remove();

  const historyItem = document.createElement("div");
  historyItem.className = "history-item";

  historyItem.innerHTML = `
    <div class="tx-info">
      <div class="tx-item-name">${data.qty}x ${escapeHTML(data.itemName)} <span class="quality-badge badge-${data.quality}">${data.quality}</span></div>
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