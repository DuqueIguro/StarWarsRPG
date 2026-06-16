/**
 * StarWars RPG - Motor de Pay-to-Win (P2W)
 * Gerenciamento de compras com dinheiro real e interface de ostentação.
 */

let dadosPacote = null;

async function carregarPacoteP2W() {
    try {
        const response = await fetch('../data/p2w.json');
        if (!response.ok) throw new Error('Erro ao conectar com as fundições de crédito.');
        const data = await response.json();
        
        dadosPacote = data.pacote_rebelde_ouro;
        if (dadosPacote) {
            renderizarPacote();
        }
    } catch (error) {
        console.error('Erro de transação:', error);
    }
}

function renderizarPacote() {
    document.getElementById("pacoteNome").innerText = dadosPacote.nome;

    // Renderiza Atributos de Ficha (Vida/Dano)
    const listaStats = document.getElementById("listaStats");
    listaStats.innerHTML = dadosPacote.estatisticas.map(st => `
        <li><span class="perk-icon">${st.icon}</span> <strong>${st.prop}</strong></li>
    `).join('');

    // Renderiza Equipamentos Fixos
    const listaItens = document.getElementById("listaItensFixos");
    listaItens.innerHTML = dadosPacote.itens_fixos.map(it => `
        <li><span class="perk-icon">📦</span> ${it.nome} <small class="rarity">${it.raridade}</small></li>
    `).join('');
}

// Criação dinâmica da chuva de cifrões de riqueza
function criarChuvaDeDinheiro() {
    const container = document.getElementById("moneyRain");
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

function abrirCheckout() {
    document.getElementById("modalCheckout").style.display = "flex";
}

function fecharCheckout() {
    document.getElementById("modalCheckout").style.display = "none";
}

function confirmarInjecao() {
    const escolha = document.querySelector('input[name="escolhaExclusiva"]:checked').value;
    alert(`Créditos enviados! Suas vantagens permanentes e sua escolha de complemento foram salvas na Holonet do Mestre.`);
    fecharCheckout();
}

// Inicializadores
document.addEventListener("DOMContentLoaded", () => {
    carregarPacoteP2W();
    criarChuvaDeDinheiro();
});