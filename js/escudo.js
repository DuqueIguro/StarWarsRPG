// Configurações e variáveis de estado globais
const CORE_COOKIE_KEY = "sw_overlord_datapad_v6";
let activeRollMode = "normal"; // normal, advantage, disadvantage

// Base de Dados de Consulta Rápida (Abas)
const rulesDatabase = {
    "tab-cd": `<table class="cyber-matrix-table">
                <tr><th>Dificuldade</th><th>CD Alvo</th></tr>
                <tr><td>Muito Fácil</td><td>5</td></tr>
                <tr><td>Fácil</td><td>10</td></tr>
                <tr><td>Média</td><td>15</td></tr>
                <tr><td>Difícil</td><td>20</td></tr>
                <tr><td>Heroica</td><td>25</td></tr>
                <tr><td>Lendária</td><td>30</td></tr>
               </table>`,
    "tab-states": `<table class="cyber-matrix-table">
                <tr><th>Condição</th><th>Efeito no Fluxo</th></tr>
                <tr><td>Abalado</td><td>Incapaz de realizar ações voluntárias complexas.</td></tr>
                <tr><td>Caído</td><td>Vantagem Melee contra; Desvantagem nas próprias rolagens.</td></tr>
                <tr><td>Cego</td><td>Desvantagem em testes visuais. Ataques recebidos ganham Vantagem.</td></tr>
                <tr><td>Atordoado</td><td>Incapaz de agir. Derruba itens equipados imediatamente.</td></tr>
               </table>`,
    "tab-cover": `<table class="cyber-matrix-table">
                <tr><th>Cobertura</th><th>Modificador Defensivo</th></tr>
                <tr><td>Parcial (Metade)</td><td>+2 de bônus na CA e testes de Reflexos</td></tr>
                <tr><td>Pesada (3/4)</td><td>+5 de bônus na CA e testes de Reflexos</td></tr>
                <tr><td>Total</td><td>Alvo inválido para disparos ou ataques diretos.</td></tr>
               </table>`
};

// Banco de nomes extraído do projeto
const galacticNamesPool = {
    humano: ["Jax Pavan", "Kaelen Horn", "Corran Horn", "Talon Karrde", "Bria Tharen", "Dash Rendar"],
    twilek: ["Aayla Secura", "Bib Fortuna", "Oola Doneeta", "Tott Doneeta", "Nima-Da-Boda"],
    rodiano: ["Greedo", "Beedo Tee", "Navik o Vermelho", "Chio Fain", "Wald"],
    wookiee: ["Chewbacca", "Tarfful", "Lowbacca", "Groznik", "Salporin"],
    bothan: ["Borsk Fey'lya", "Koth Melan", "Tereb Ab'lon", "Tav Breil'lya"],
    sullustano: ["Nien Nunb", "Sian Tevv", "Aril Nunb", "Syub Snunb"]
};

document.addEventListener("DOMContentLoaded", () => {
    loadNotesFromCache();
    toggleDatabaseTab('tab-cd');

    // Sincronização contínua das notas
    document.getElementById("notes-text-area").addEventListener("input", (e) => {
        writeCookie(CORE_COOKIE_KEY, e.target.value, 14);
    });
});

// Manipuladores de quantidade de dados (Stepper)
function changeQty(value) {
    const qtyInput = document.getElementById("dice-qty");
    let calculated = parseInt(qtyInput.value) + value;
    if (calculated < 1) calculated = 1;
    if (calculated > 30) calculated = 30;
    qtyInput.value = calculated;
}

// Alterador de Modos de Jogo (Soma, Vantagem, Desvantagem)
function setRollMode(mode) {
    activeRollMode = mode;
    document.querySelectorAll(".mode-cyber-btn").forEach(b => b.classList.remove("active"));
    if (mode === 'normal') document.getElementById("mode-normal").classList.add("active");
    if (mode === 'advantage') document.getElementById("mode-advantage").classList.add("active");
    if (mode === 'disadvantage') document.getElementById("mode-disadvantage").classList.add("active");
}

// Disparador de animação de rolagem tática
function triggerComplexRoll(sides) {
    const totalDisplay = document.getElementById("hud-total");
    const breakdownDisplay = document.getElementById("hud-breakdown");
    
    totalDisplay.classList.add("roll-glitch-active");
    totalDisplay.innerText = "??";

    setTimeout(() => {
        totalDisplay.classList.remove("roll-glitch-active");
        executeCalculations(sides);
    }, 350);
}

// Processamento matemático customizado com as regras de filtragem de resultados
function executeCalculations(sides) {
    const qty = parseInt(document.getElementById("dice-qty").value);
    const mod = parseInt(document.getElementById("dice-modifier").value) || 0;
    
    let rolls = [];
    for (let i = 0; i < qty; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    // Criamos uma cópia ordenada de forma decrescente para facilitar a extração dos maiores valores
    let sortedRolls = [...rolls].sort((a, b) => b - a);

    let finalValue = 0;
    let breakdownText = "";

    if (activeRollMode === "normal") {
        // Modo SOMA: Soma todos os dados gerados e adiciona o modificador fixo
        const sum = rolls.reduce((a, b) => a + b, 0);
        finalValue = sum + mod;
        breakdownText = `Pool: [${rolls.join(", ")}] ${mod >= 0 ? "+" : ""}${mod}`;
    } 
    else if (activeRollMode === "advantage") {
        // Modo VANTAGEM: Pega o maior valor absoluto rolado
        const highest = sortedRolls[0];
        finalValue = highest + mod;
        breakdownText = `Vantagem | Maior valor pinado de [${rolls.join(", ")}] -> ${highest} ${mod >= 0 ? "+" : ""}${mod}`;
    } 
    else if (activeRollMode === "disadvantage") {
        // Modo DESVANTAGEM: Pega o segundo maior valor rolado (se houver apenas 1 dado, usa ele mesmo)
        const secondHighest = sortedRolls.length > 1 ? sortedRolls[1] : sortedRolls[0];
        finalValue = secondHighest + mod;
        breakdownText = `Desvantagem | Segundo maior pino de [${rolls.join(", ")}] -> ${secondHighest} ${mod >= 0 ? "+" : ""}${mod}`;
    }

    // Atualização dos elementos da interface
    document.getElementById("hud-total").innerText = finalValue;
    document.getElementById("hud-breakdown").innerText = breakdownText;
    
    logToTerminalStream(finalValue, qty, sides, breakdownText);
}

function logToTerminalStream(total, qty, sides, details) {
    const logContainer = document.getElementById("console-stream");
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const paragraph = document.createElement("p");
    paragraph.className = "log-row-stream";
    paragraph.innerHTML = `<strong>[${timestamp}] CAPTURA: ${total}</strong> <br><small>Esquema: ${qty}d${sides} (${activeRollMode.toUpperCase()}) -> ${details}</small>`;
    logContainer.insertBefore(paragraph, logContainer.firstChild);
}

function purgeLogs() {
    document.getElementById("console-stream").innerHTML = `<p class="system-boot-string text-gray-500">>> Registros do Terminal Limpos.</p>`;
}

// Módulo de Combate / Iniciativa
let activeCombatants = [];
function addNewCombatant() {
    const name = document.getElementById("combat-name").value || "Alvo Não Identificado";
    const init = parseInt(document.getElementById("combat-init").value) || 0;
    const hp = parseInt(document.getElementById("combat-hp").value) || 0;
    
    activeCombatants.push({ id: Date.now(), name, init, hp });
    renderCombatHUD();
    
    document.getElementById("combat-name").value = "";
    document.getElementById("combat-init").value = "";
    document.getElementById("combat-hp").value = "";
}

function removeCombatant(id) {
    activeCombatants = activeCombatants.filter(c => c.id !== id);
    renderCombatHUD();
}

function renderCombatHUD() {
    const container = document.getElementById("combat-tracker-rows");
    container.innerHTML = "";
    activeCombatants.forEach(c => {
        const div = document.createElement("div");
        div.className = "combat-row-hud";
        div.innerHTML = `
            <span class="truncate pr-1">${c.name}</span>
            <span class="text-center">IN: ${c.init}</span>
            <span class="text-center">HP: <input type="number" value="${c.hp}" class="w-12 bg-black border border-red-600 text-white text-center text-xs p-0.5"></span>
            <button onclick="removeCombatant(${c.id})" class="text-red-500 font-bold hover:text-white transition text-right">X</button>
        `;
        container.appendChild(div);
    });
}

function executeInitiativeSort() {
    activeCombatants.sort((a, b) => b.init - a.init);
    renderCombatHUD();
}

// Módulo de Regras (Abas)
function toggleDatabaseTab(tabId) {
    document.querySelectorAll(".tab-cyber-btn").forEach(b => b.classList.remove("active"));
    // Se der merda remove o comentário da linha abaixo.
    // if(window.event && window.event.target) window.event.target.classList.add("active");
    document.getElementById("tab-data-box").innerHTML = rulesDatabase[tabId];
}

// Módulo Gerador de Nomes
function triggerNpcGeneration() {
    const species = document.getElementById("npc-species-select").value;
    const arrayNames = galacticNamesPool[species];
    const randomizedName = arrayNames[Math.floor(Math.random() * arrayNames.length)];
    document.getElementById("npc-identity-output").innerText = randomizedName;
}

// Mecânica de cookies criptografados por URI
function writeCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + date.toUTCString() + ";path=/";
}

function readCookie(name) {
    const match = name + "=";
    const decodedArray = document.cookie.split(';');
    for(let i=0; i < decodedArray.length; i++) {
        let cookieChar = decodedArray[i].trim();
        if (cookieChar.indexOf(match) == 0) return decodeURIComponent(cookieChar.substring(match.length, cookieChar.length));
    }
    return "";
}

function loadNotesFromCache() {
    const cache = readCookie(CORE_COOKIE_KEY);
    if (cache) document.getElementById("notes-text-area").value = cache;
}

function wipeNotesCookie() {
    if(confirm("Confirmar a destruição completa das notas locais?")) {
        document.getElementById("notes-text-area").value = "";
        writeCookie(CORE_COOKIE_KEY, "", -1);
    }
}

function triggerPDFExport() {
    window.print();
}