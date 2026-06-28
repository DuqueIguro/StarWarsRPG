const CORE_COOKIE_KEY = "sw_overlord_datapad_v6";
let activeRollMode = "normal";

// Banco de dados dinâmico de regras para o painel de abas
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

// Banco de nomes extraído do mestre.html original do projeto
const galacticNamesPool = {
    humano: ["Jax Pavan", "Kaelen Horn", "Corran Horn", "Talon Karrde", "Garm Bel Iblis", "Bria Tharen", "Mirax Terrik", "Dash Rendar"],
    twilek: ["Orn Free Taa", "Aayla Secura", "Bib Fortuna", "Oola Doneeta", "Tott Doneeta", "Nima-Da-Boda"],
    rodiano: ["Greedo", "Beedo", "Navik o Vermelho", "Chio Fain", "Wald"],
    wookiee: ["Chewbacca", "Tarfful", "Lowbacca", "Groznik", "Rorworr", "Salporin"],
    bothan: ["Borsk Fey'lya", "Koth Melan", "Tereb Ab'lon", "Tav Breil'lya", "Karka Kre'fey"],
    sullustano: ["Nien Nunb", "Sian Tevv", "Aril Nunb", "Syub Snunb", "Dilr Nep"]
};

document.addEventListener("DOMContentLoaded", () => {
    loadNotesFromCache();
    toggleDatabaseTab('tab-cd');

    // Autosave instantâneo ativado nas notas
    document.getElementById("notes-text-area").addEventListener("input", (e) => {
        writeCookie(CORE_COOKIE_KEY, e.target.value, 14);
    });
});

function changeQty(value) {
    const qtyInput = document.getElementById("dice-qty");
    let calculated = parseInt(qtyInput.value) + value;
    if (calculated < 1) calculated = 1;
    if (calculated > 30) calculated = 30;
    qtyInput.value = calculated;
}

function setRollMode(mode) {
    activeRollMode = mode;
    document.querySelectorAll(".mode-cyber-btn").forEach(b => b.classList.remove("active"));
    if (mode === 'normal') document.getElementById("mode-normal").classList.add("active");
    if (mode === 'advantage') document.getElementById("mode-advantage").classList.add("active");
    if (mode === 'disadvantage') document.getElementById("mode-disadvantage").classList.add("active");
}

function triggerComplexRoll(sides) {
    const totalDisplay = document.getElementById("hud-total");
    const breakdownDisplay = document.getElementById("hud-breakdown");
    
    totalDisplay.classList.add("roll-glitch-active");
    totalDisplay.innerText = "??";

    setTimeout(() => {
        totalDisplay.classList.remove("roll-glitch-active");
        
        const qty = parseInt(document.getElementById("dice-qty").value);
        const mod = parseInt(document.getElementById("dice-modifier").value) || 0;
        
        let poolA = [];
        for(let i=0; i<qty; i++) poolA.push(Math.floor(Math.random() * sides) + 1);
        
        let finalValue = 0;
        let breakdownText = "";
        
        if (activeRollMode === "normal") {
            const sumA = poolA.reduce((a, b) => a + b, 0);
            finalValue = sumA + mod;
            breakdownText = `Pool: [${poolA.join(", ")}] ${mod >= 0 ? "+" : ""}${mod}`;
        } else {
            let poolB = [];
            for(let i=0; i<qty; i++) poolB.push(Math.floor(Math.random() * sides) + 1);
            
            const sumA = poolA.reduce((a, b) => a + b, 0);
            const sumB = poolB.reduce((a, b) => a + b, 0);
            
            if (activeRollMode === "advantage") {
                finalValue = Math.max(sumA, sumB) + mod;
                breakdownText = `Vantagem | Maior entre [${poolA.join(", ")}] (${sumA}) e [${poolB.join(", ")}] (${sumB}) ${mod >= 0 ? "+" : ""}${mod}`;
            } else {
                finalValue = Math.min(sumA, sumB) + mod;
                breakdownText = `Desvantagem | Menor entre [${poolA.join(", ")}] (${sumA}) e [${poolB.join(", ")}] (${sumB}) ${mod >= 0 ? "+" : ""}${mod}`;
            }
        }
        
        totalDisplay.innerText = finalValue;
        breakdownDisplay.innerText = breakdownText;
        
        logToTerminalStream(finalValue, qty, sides, breakdownText);
    }, 350);
}

function logToTerminalStream(total, qty, sides, details) {
    const logContainer = document.getElementById("console-stream");
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const paragraph = document.createElement("p");
    paragraph.className = "log-row-stream";
    paragraph.innerHTML = `<strong>[${timestamp}] JOGADA: ${total}</strong> <br><small>Esquema: ${qty}d${sides} (${activeRollMode.toUpperCase()}) -> ${details}</small>`;
    logContainer.insertBefore(paragraph, logContainer.firstChild);
}

function purgeLogs() {
    document.getElementById("console-stream").innerHTML = `<p class="system-boot-string text-gray-500">>> Registros do Terminal Limpos.</p>`;
}

// Monitor de turnos e gerenciador de HP
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

function toggleDatabaseTab(tabId) {
    document.querySelectorAll(".tab-cyber-btn").forEach(b => b.classList.remove("active"));
    if(event && event.target) event.target.classList.add("active");
    document.getElementById("tab-data-box").innerHTML = rulesDatabase[tabId];
}

function triggerNpcGeneration() {
    const species = document.getElementById("npc-species-select").value;
    const arrayNames = galacticNamesPool[species];
    const randomizedName = arrayNames[Math.floor(Math.random() * arrayNames.length)];
    document.getElementById("npc-identity-output").innerText = randomizedName;
}

// Cookies com encodeURIComponent para preservar quebras de linha e dados complexos nas anotações
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