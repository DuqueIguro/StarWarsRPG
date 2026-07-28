// Utilitários de Inicialização e Dados
document.addEventListener("DOMContentLoaded", () => {
  initPlayerKey();
  updateTime();
  setInterval(updateTime, 1000);
});

// Gerador de Chave Galáctica Única (Exemplo: GAL-89A4-F29D)
function generateGalacticKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => {
    let str = '';
    for (let i = 0; i < 4; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };
  return `GAL-${segment()}-${segment()}`;
}

// Inicializa a Chave do Jogador no LocalStorage ou cria uma nova
let playerKey = localStorage.getItem("galactic_key");
let playerBalance = parseInt(localStorage.getItem("galactic_balance")) || 10000;

function initPlayerKey() {
  if (!playerKey) {
    playerKey = generateGalacticKey();
    localStorage.setItem("galactic_key", playerKey);
  }
  document.getElementById("my-key").innerText = playerKey;
  document.getElementById("user-balance").innerText = playerBalance.toLocaleString();
}

// Botão Copiar Chave
const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(playerKey).then(() => {
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "COPIADO!";
    copyBtn.style.background = "var(--primary)";
    copyBtn.style.color = "#000";

    setTimeout(() => {
      copyBtn.innerText = originalText;
      copyBtn.style.background = "transparent";
      copyBtn.style.color = "var(--primary)";
    }, 2000);
  });
});

// Formulário de Transferência
const transferForm = document.getElementById("transfer-form");
const historyList = document.getElementById("history-list");

transferForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const senderName = document.getElementById("sender-name").value.trim();
  const targetKey = document.getElementById("target-key").value.trim().toUpperCase();
  const amount = parseInt(document.getElementById("transfer-amount").value);
  const message = document.getElementById("transfer-msg").value.trim();

  // Validações Básicas
  if (targetKey === playerKey) {
    alert("ERRO DO SISTEMA: Não é possível transferir para a sua própria chave galáctica.");
    return;
  }

  if (amount > playerBalance) {
    alert("CRÉDITOS INSUFICIENTES: Operação recusada pelo Banco Central Galáctico.");
    return;
  }

  // Atualizar Saldo
  playerBalance -= amount;
  localStorage.setItem("galactic_balance", playerBalance);
  document.getElementById("user-balance").innerText = playerBalance.toLocaleString();

  // Adicionar ao Histórico
  addTransactionToHistory({
    sender: senderName,
    target: targetKey,
    amount: amount,
    message: message,
    date: new Date().toLocaleTimeString()
  });

  // Limpar formulário parcialmente
  document.getElementById("target-key").value = "";
  document.getElementById("transfer-amount").value = "";
  document.getElementById("transfer-msg").value = "";

  alert("TRANSMISSÃO CONCLUÍDA: Créditos enviados com sucesso através da rede!");
});

// Adicionar Registro Visual de Transação
function addTransactionToHistory(data) {
  // Remover a mensagem de histórico vazio se existir
  const emptyMsg = historyList.querySelector(".empty-history");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  const txElement = document.createElement("div");
  txElement.classList.add("history-item", "sent");

  txElement.innerHTML = `
    <div class="tx-info">
      <div><strong>DE:</strong> ${escapeHTML(data.sender)}</div>
      <div><strong>PARA CHAVE:</strong> ${escapeHTML(data.target)}</div>
      ${data.message ? `<div class="tx-msg">"${escapeHTML(data.message)}"</div>` : ''}
      <small style="color: var(--text-dim); font-size: 0.65rem;">${data.date}</small>
    </div>
    <div class="tx-amount">-${data.amount} CR</div>
  `;

  historyList.prepend(txElement);
}

// Sanitizador simples para evitar injeção de HTML
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Relógio Estilo Data Galáctica
function updateTime() {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const starDate = `STARDATE ${now.getFullYear()}.${now.getMonth() + 1}${now.getDate()}`;
  document.getElementById("system-time").innerText = `${starDate} // ${timeStr}`;
}