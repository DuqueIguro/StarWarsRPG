/**
 * StarWars RPG - Motor de Pay-to-Win (P2W) Expansível
 * Gerenciamento dinâmico de vitrine via arquivo JSON.
 */

let listaPacotes = [];
let pacoteSelecionadoId = null;

async function carregarPacotesP2W() {
    try {
        const response = await fetch('../data/p2w.json');
        if (!response.ok) throw new Error('Erro ao conectar com as fundições de crédito.');
        listaPacotes = await response.json();
        
        if (Array.isArray(listaPacotes) && listaPacotes.length > 0) {
            renderizarVitrine();
        }
    } catch (error) {
        console.error('Erro de transação galáctica:', error);
    }
}

function renderizarVitrine() {
    const storeLayout = document.getElementById("storeLayout");
    storeLayout.innerHTML = ""; // Limpa a vitrine

    listaPacotes.forEach(pacote => {
        // Gera a lista de modificadores de ficha
        const statsHTML = pacote.estatisticas.map(st => `
            <li><span class="perk-icon">${st.icon}</span> <strong>${st.prop}</strong></li>
        `).join('');

        // Gera a lista de equipamentos inclusos
        const itensHTML = pacote.itens_fixos.map(it => `
            <li><span class="perk-icon">📦</span> ${it.nome} <small class="rarity">${it.raridade}</small></li>
        `).join('');

        // Gera o bloco de escolhas de rádio
        const escolhasHTML = pacote.itens_escolha.map((esc, index) => `
            <label class="radio-card">
                <input type="radio" name="escolha_${pacote.id}" value="${esc.value}" ${index === 0 ? 'checked' : ''}>
                <span class="radio-label">${esc.label}</span>
            </label>
        `).join('');

        // Constrói a estrutura do card individual
        const cardHTML = `
            <div class="card-p2w ${pacote.destaque ? 'card-destaque' : ''}" id="card_${pacote.id}">
                <div class="badge-unic">${pacote.restricao.toUpperCase()}</div>
                <div class="card-glow-layer"></div>
                
                <h2>${pacote.nome}</h2>
                <div class="price-tag">R$ ${pacote.preco}</div>

                <div class="perks-grid">
                    <div class="perk-section">
                        <h3>MODIFICADORES DE FICHA</h3>
                        <ul class="perk-list">${statsHTML}</ul>
                    </div>

                    <div class="perk-section">
                        <h3>EQUIPAMENTOS INCLUSOS</h3>
                        <ul class="perk-list">${itensHTML}</ul>
                    </div>
                </div>

                <div class="choice-section">
                    <h3>SELECIONE SEU COMPLEMENTO EXCLUSIVO:</h3>
                    <div class="choice-buttons">${escolhasHTML}</div>
                </div>

                <button class="btn-buy-p2w" onclick="abrirCheckout('${pacote.id}')">
                    💲 ADQUIRIR PODER AGORA 💲
                </button>
            </div>
        `;

        storeLayout.innerHTML += cardHTML;
    });
}

function criarChuvaDeDinheiro() {
    const container = document.getElementById("moneyRain");
    if (!container) return;
    const simbolos = ["$", "💲", "C$", "R$"];
    
    for (let i = 0; i < 40; i++) {
        const span = document.createElement("span");
        span.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDelay = Math.random() * 5 + "s";
        span.style.fontSize = Math.random() * 20 + 15 + "px";
        span.style.animationDuration = Math.random() * 3 + 4 + "s";
        container.appendChild(span);
    }
}

function abrirCheckout(idPacote) {
    const pacote = listaPacotes.find(p => p.id === idPacote);
    if (!pacote) return;

    pacoteSelecionadoId = idPacote;
    document.getElementById("checkoutPreco").innerText = `R$ ${pacote.preco}`;
    document.getElementById("checkoutPacoteNome").innerText = pacote.nome;
    document.getElementById("modalCheckout").style.display = "flex";
}

function fecharCheckout() {
    document.getElementById("modalCheckout").style.display = "none";
    pacoteSelecionadoId = null;
}

function confirmarInjecao() {
    if (!pacoteSelecionadoId) return;
    
    const inputEscolhido = document.querySelector(`input[name="escolha_${pacoteSelecionadoId}"]:checked`);
    const escolhaLabel = inputEscolhido ? inputEscolhido.nextElementSibling.innerText : "Padrão";
    
    alert(`Créditos enviados! Suas vantagens permanentes e a sua escolha [${escolhaLabel}] foram registradas na Holonet do Mestre.`);
    fecharCheckout();
}

document.addEventListener("DOMContentLoaded", () => {
    carregarPacotesP2W();
    criarChuvaDeDinheiro();
});