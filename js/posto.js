// --- MECÂNICA DE PERSISTÊNCIA (COOKIES + LOCAL STORAGE) ---
function saveToStorage(key, value) {
    // Salvar no LocalStorage (mais estável para iframe previews)
    localStorage.setItem(key, JSON.stringify(value));
    // Salvar em Cookie também (exigência do escopo do usuário)
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
}

function loadFromStorage(key) {
    // Tenta obter do LocalStorage primeiro
    const localData = localStorage.getItem(key);
    if (localData) {
        try { return JSON.parse(localData); } catch (e) { }
    }
    // Fallback para os Cookies
    const nameEQ = key + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            try {
                return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
            } catch (e) { }
        }
    }
    return null;
}

// --- ESTADO INICIAL ---
let shipsData = {};
let PRICES = { sublight: 2, hyperdrive: 45 }; // Preços de mercado fixados
let userCredits = 15000;
let currentShipKey = '';

let pumpInterval = null;
let currentPumpingAmount = 0;
let audioContext = null;
let pumpOsc = null;
let pumpGain = null;

// --- INICIALIZAÇÃO DE ELEMENTOS E EVENTOS ---
document.addEventListener('DOMContentLoaded', () => {
    loadSavedDatabase();
    initDOMEvents();
    setupCanvases();
    addLog("Terminal de transponder inicializado. Sinal de rede local ativo.");
});

function loadSavedDatabase() {
    // Carrega créditos salvos
    const savedCredits = loadFromStorage('posto_credits');
    if (savedCredits !== null) {
        userCredits = parseFloat(savedCredits);
    }
    document.getElementById('userCreditsInput').value = userCredits;

    // Carrega naves cadastradas do usuário
    const savedShips = loadFromStorage('posto_ships');
    if (savedShips && Object.keys(savedShips).length > 0) {
        shipsData = savedShips;
    } else {
        // Inicia vazio para o usuário registrar as dele
        shipsData = {};
    }

    // Carrega última seleção de nave
    const savedSelection = loadFromStorage('posto_selected_ship');
    if (savedSelection && shipsData[savedSelection]) {
        currentShipKey = savedSelection;
    }

    rebuildShipSelect();
}

function initDOMEvents() {
    // Edição direta de Créditos
    document.getElementById('userCreditsInput').addEventListener('input', (e) => {
        userCredits = Math.max(0, parseFloat(e.target.value) || 0);
        saveToStorage('posto_credits', userCredits);
        updateShipUI();
    });

    // Configurar botões de segurar para reabastecimento interativo
    setupPumpTrigger('btnPumpSublight', 'sublight');
    setupPumpTrigger('btnPumpHyperdrive', 'hyperdrive');
}

function setupPumpTrigger(btnId, type) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    const startAction = (e) => {
        e.preventDefault();
        startPumping(type);
    };

    const stopAction = () => {
        stopPumping();
    };

    btn.addEventListener('mousedown', startAction);
    btn.addEventListener('mouseup', stopAction);
    btn.addEventListener('mouseleave', stopAction);

    // Suporte para telas de toque em celulares/tablets
    btn.addEventListener('touchstart', startAction, { passive: false });
    btn.addEventListener('touchend', stopAction);
}

// --- SISTEMA SCI-FI DE AUDIO SINTETIZADO ---
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playBeep(frequency = 550, duration = 0.08) {
    try {
        initAudio();
        if (!audioContext) return;
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
        gain.gain.setValueAtTime(0.04, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + duration);
    } catch (e) { }
}

function startPumpOscillator(type) {
    try {
        initAudio();
        if (!audioContext) return;
        pumpOsc = audioContext.createOscillator();
        pumpGain = audioContext.createGain();
        pumpOsc.type = 'sawtooth';
        const baseFreq = type === 'sublight' ? 90 : 200;
        pumpOsc.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
        pumpGain.gain.setValueAtTime(0.015, audioContext.currentTime);
        pumpOsc.connect(pumpGain);
        pumpGain.connect(audioContext.destination);
        pumpOsc.start();
    } catch (e) { }
}

function updatePumpFrequency(ratio) {
    if (pumpOsc && audioContext) {
        const currentFreq = pumpOsc.frequency.value;
        pumpOsc.frequency.setValueAtTime(currentFreq + ratio * 1.5, audioContext.currentTime);
    }
}

function stopPumpOscillator() {
    try {
        if (pumpOsc) {
            pumpOsc.stop();
            pumpOsc.disconnect();
            pumpOsc = null;
        }
    } catch (e) { }
}

// --- MECÂNICA DE GERENCIAMENTO DE NAVES ---
function rebuildShipSelect() {
    const select = document.getElementById('shipSelect');
    select.innerHTML = '';

    const keys = Object.keys(shipsData);
    if (keys.length === 0) {
        const opt = document.createElement('option');
        opt.value = "";
        opt.textContent = "Nenhum transponder conectado";
        select.appendChild(opt);
        currentShipKey = '';
        document.getElementById('customShipForm').classList.remove('hidden');
        document.getElementById('shipStatusPanel').classList.add('opacity-40');
        document.getElementById('btnDeleteShip').disabled = true;
        updateEmptyUI();
        return;
    }

    document.getElementById('shipStatusPanel').classList.remove('opacity-40');
    document.getElementById('btnDeleteShip').disabled = false;

    keys.forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = shipsData[key].name;
        select.appendChild(opt);
    });

    if (!shipsData[currentShipKey]) {
        currentShipKey = keys[0];
    }
    select.value = currentShipKey;
    selectShip();
}

function toggleShipForm() {
    const form = document.getElementById('customShipForm');
    form.classList.toggle('hidden');
}

function registerCustomShip() {
    const name = document.getElementById('customName').value.trim();
    const quote = document.getElementById('customQuote').value.trim() || "Sinalizador ativo do cockpit.";
    const subCap = Math.max(1, parseInt(document.getElementById('customSubCap').value) || 100);
    const subLevel = Math.max(0, parseInt(document.getElementById('customSubLevel').value) || 0);
    const hypCap = Math.max(1, parseInt(document.getElementById('customHypCap').value) || 10);
    const hypLevel = Math.max(0, parseInt(document.getElementById('customHypLevel').value) || 0);

    if (!name) {
        showToast("ALERTA", "Forneça o nome ou modelo identificador da sua nave.", "❌");
        return;
    }

    const key = 'nave_' + Date.now();
    shipsData[key] = {
        name: name,
        subCap: subCap,
        subLevel: Math.min(subLevel, subCap),
        hypCap: hypCap,
        hypLevel: Math.min(hypLevel, hypCap),
        quote: quote
    };

    saveToStorage('posto_ships', shipsData);
    currentShipKey = key;
    saveToStorage('posto_selected_ship', key);
    rebuildShipSelect();

    // Limpa formulário
    document.getElementById('customName').value = '';
    document.getElementById('customQuote').value = '';
    document.getElementById('customShipForm').classList.add('hidden');

    addLog(`SUCESSO: Nave [${name}] acoplada à estação Aurora-9.`);
    showToast("CONECTADA", `Transponder de ${name} sincronizado.`, "🛸");
}

function deleteCurrentShip() {
    if (!currentShipKey || !shipsData[currentShipKey]) return;

    const name = shipsData[currentShipKey].name;
    delete shipsData[currentShipKey];
    saveToStorage('posto_ships', shipsData);

    addLog(`ALERTA: Nave [${name}] realizou a despressurização e desacoplou.`);
    showToast("DESACOPLADA", `${name} removeu os cabos de fluxo.`, "🗑️");

    currentShipKey = '';
    saveToStorage('posto_selected_ship', '');
    rebuildShipSelect();
}

function selectShip() {
    const select = document.getElementById('shipSelect');
    if (!select.value) return;

    currentShipKey = select.value;
    saveToStorage('posto_selected_ship', currentShipKey);
    const ship = shipsData[currentShipKey];

    if (ship) {
        document.getElementById('droidQuote').textContent = `"${ship.quote}"`;
        updateShipUI();
    }
}

function updateShipUI() {
    const ship = shipsData[currentShipKey];
    if (!ship) {
        updateEmptyUI();
        return;
    }

    document.getElementById('shipName').textContent = ship.name;

    // Subluz
    const subPercent = (ship.subLevel / ship.subCap) * 100;
    document.getElementById('shipSublightText').textContent = `${Math.floor(ship.subLevel)} / ${ship.subCap} L`;
    document.getElementById('shipSublightBar').style.width = `${subPercent}%`;

    // Hiperespaço
    const hypPercent = (ship.hypLevel / ship.hypCap) * 100;
    document.getElementById('shipHyperdriveText').textContent = `${Math.floor(ship.hypLevel)} / ${ship.hypCap} Kg`;
    document.getElementById('shipHyperdriveBar').style.width = `${hypPercent}%`;

    // Créditos
    document.getElementById('userCreditsInput').value = Math.floor(userCredits);
}

function updateEmptyUI() {
    document.getElementById('shipName').textContent = "SEM CONEXÃO";
    document.getElementById('shipSublightText').textContent = "0 / 0 L";
    document.getElementById('shipSublightBar').style.width = "0%";
    document.getElementById('shipHyperdriveText').textContent = "0 / 0 Kg";
    document.getElementById('shipHyperdriveBar').style.width = "0%";
    document.getElementById('droidQuote').textContent = "Cadastre sua nave no painel acima para abrir os bloqueios de fluxo de gás e calibrar as conexões de reabastecimento.";
}

// --- OPERAÇÃO INTERATIVA DE ABASTECIMENTO ---
function startPumping(type) {
    const ship = shipsData[currentShipKey];
    if (!ship) {
        showToast("D-09 ALERTA", "Nenhuma nave conectada à comporta.", "❌");
        return;
    }

    currentPumpingAmount = 0;
    startPumpOscillator(type);

    pumpInterval = setInterval(() => {
        const price = PRICES[type];

        if (userCredits < price) {
            addLog(`ALERTA: Créditos insuficientes para dar continuidade ao bombeamento.`);
            showToast("SALDO INSUFICIENTE", "Ajuste os créditos no seu painel para continuar.", "💳");
            stopPumping();
            return;
        }

        if (type === 'sublight') {
            if (ship.subLevel >= ship.subCap) {
                showToast("PROCESSO CONCLUÍDO", "Tanque de Gás Tibanna em 100%.", "⛽");
                stopPumping();
                return;
            }

            const rate = 1.5; // Litros por tick
            ship.subLevel = Math.min(ship.subLevel + rate, ship.subCap);
            userCredits -= rate * price;
            currentPumpingAmount += rate;

            document.getElementById('sublightPumpDisplay').textContent = `${currentPumpingAmount.toFixed(2)} L`;
            document.getElementById('sublightCostDisplay').textContent = `${Math.floor(currentPumpingAmount * price)}`;
            updatePumpFrequency(1.5);
        } else {
            if (ship.hypLevel >= ship.hypCap) {
                showToast("PROCESSO CONCLUÍDO", "Câmara de Coaxium em 100%.", "🔋");
                stopPumping();
                return;
            }

            const rate = 0.15; // Kg por tick
            ship.hypLevel = Math.min(ship.hypLevel + rate, ship.hypCap);
            userCredits -= rate * price;
            currentPumpingAmount += rate;

            document.getElementById('hyperdrivePumpDisplay').textContent = `${currentPumpingAmount.toFixed(2)} Kg`;
            document.getElementById('hyperdriveCostDisplay').textContent = `${Math.floor(currentPumpingAmount * price)}`;
            updatePumpFrequency(3.5);
        }

        updateShipUI();
        saveToStorage('posto_ships', shipsData);
        saveToStorage('posto_credits', userCredits);

        if (Math.random() < 0.2) playBeep(type === 'sublight' ? 300 : 600, 0.02);
    }, 80);
}

function stopPumping() {
    if (pumpInterval) {
        clearInterval(pumpInterval);
        pumpInterval = null;
        stopPumpOscillator();
        if (currentPumpingAmount > 0) {
            addLog(`COMPRA DE FLUXO: Abastecidos +${currentPumpingAmount.toFixed(2)} na nave [${shipsData[currentShipKey].name}].`);
            playBeep(220, 0.2);
        }
    }
}

function fillFully(type) {
    const ship = shipsData[currentShipKey];
    if (!ship) return;

    const price = PRICES[type];
    if (type === 'sublight') {
        const needed = ship.subCap - ship.subLevel;
        if (needed <= 0) return;
        const cost = needed * price;
        if (userCredits < cost) {
            const afford = userCredits / price;
            if (afford <= 0) return;
            ship.subLevel += afford;
            userCredits = 0;
            addLog(`COMPRA PARCIAL: Abastecido +${afford.toFixed(2)}L de Tibanna. Saldo esgotado.`);
        } else {
            ship.subLevel = ship.subCap;
            userCredits -= cost;
            addLog(`COMPRA COMPLETA: Enchimento automático de +${needed.toFixed(2)}L de Gás Tibanna.`);
            showToast("SUCESSO", "Tanque de Tibanna preenchido.", "⛽");
        }
    } else {
        const needed = ship.hypCap - ship.hypLevel;
        if (needed <= 0) return;
        const cost = needed * price;
        if (userCredits < cost) {
            const afford = userCredits / price;
            if (afford <= 0) return;
            ship.hypLevel += afford;
            userCredits = 0;
            addLog(`COMPRA PARCIAL: Carregados +${afford.toFixed(2)}Kg de Coaxium. Saldo esgotado.`);
        } else {
            ship.hypLevel = ship.hypCap;
            userCredits -= cost;
            addLog(`COMPRA COMPLETA: Carregamento completo de +${needed.toFixed(2)}Kg de Coaxium Puro.`);
            showToast("SUCESSO", "Reator de Coaxium alimentado.", "🔋");
        }
    }
    updateShipUI();
    saveToStorage('posto_ships', shipsData);
    saveToStorage('posto_credits', userCredits);
}

// --- COMPRA DE EMBALAGENS PORTÁTEIS (CILINDROS) ---
function buyCanister(type, price) {
    initAudio();
    if (userCredits < price) {
        showToast("COMPRA FALHOU", "Créditos insuficientes para o empacotamento.", "❌");
        return;
    }

    userCredits -= price;
    updateShipUI();
    saveToStorage('posto_credits', userCredits);

    const name = type === 'tibanna' ? "Cilindro de Tibanna (20L)" : "Cápsula de Coaxium (2Kg)";
    addLog(`SUCESSO: Adquirido ${name} para o inventário da nave.`);
    showToast("DESPACHADO", `${name} enviado ao compartimento de carga.`, "📦");
}

// --- SISTEMA DE LOGS DO CONSOLE ---
function addLog(text) {
    const consoleEl = document.getElementById('logConsole');
    if (!consoleEl) return;
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}]`;

    const div = document.createElement('div');
    div.className = "text-cyan-400 border-b border-cyan-950/20 py-0.5";
    if (text.includes("SUCESSO") || text.includes("COMPRA")) div.className = "text-green-400 py-0.5";
    if (text.includes("ALERTA")) div.className = "text-red-400 py-0.5";
    div.textContent = `${timeStr} ${text}`;

    consoleEl.appendChild(div);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

// --- SISTEMA DE NOTIFICAÇÃO TOAST ---
function showToast(title, message, icon = '📟') {
    const toast = document.getElementById('notificationToast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    document.getElementById('toastIcon').textContent = icon;

    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    playBeep(700, 0.12);

    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
    }, 3000);
}

// --- EXECUÇÃO DOS ELEMENTOS VETORIAIS CANVAS ---
const spaceCanvas = document.getElementById('spaceCanvas');
const ctxS = spaceCanvas.getContext('2d');
const stationCanvas = document.getElementById('stationCanvas');
const ctxT = stationCanvas.getContext('2d');
let stars = [];

function setupCanvases() {
    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);
    drawSpaceLoop();
    drawStationLoop();
}

function resizeCanvases() {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 90; i++) {
        stars.push({
            x: Math.random() * spaceCanvas.width,
            y: Math.random() * spaceCanvas.height,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        });
    }
}

function drawSpaceLoop() {
    ctxS.fillStyle = '#030712';
    ctxS.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Desenhar brilho de nebulosa azulada sutil no centro
    const neb = ctxS.createRadialGradient(
        spaceCanvas.width * 0.5, spaceCanvas.height * 0.5, 50,
        spaceCanvas.width * 0.5, spaceCanvas.height * 0.5, spaceCanvas.width * 0.7
    );
    neb.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
    neb.addColorStop(0.5, 'rgba(8, 47, 73, 0.15)');
    neb.addColorStop(1, 'transparent');
    ctxS.fillStyle = neb;
    ctxS.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    for (let star of stars) {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctxS.fillStyle = `rgba(56, 189, 248, ${Math.abs(star.alpha)})`;
        ctxS.fillRect(star.x, star.y, star.size, star.size);
    }
    requestAnimationFrame(drawSpaceLoop);
}

let rot = 0;
let pState = 0;
function drawStationLoop() {
    stationCanvas.width = stationCanvas.offsetWidth;
    stationCanvas.height = stationCanvas.offsetHeight;
    const w = stationCanvas.width, h = stationCanvas.height;
    const cx = w / 2, cy = h / 2;

    ctxT.clearRect(0, 0, w, h);

    // Desenhar linhas de grade militar do holograma
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctxT.lineWidth = 1;
    for (let i = 0; i < w; i += 24) {
        ctxT.beginPath(); ctxT.moveTo(i, 0); ctxT.lineTo(i, h); ctxT.stroke();
    }
    for (let j = 0; j < h; j += 24) {
        ctxT.beginPath(); ctxT.moveTo(0, j); ctxT.lineTo(w, j); ctxT.stroke();
    }

    rot += 0.005;
    pState += 0.08;

    ctxT.save();
    ctxT.translate(cx, cy);
    ctxT.rotate(rot);

    // Núcleo central do posto orbital
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctxT.fillStyle = 'rgba(56, 189, 248, 0.04)';
    ctxT.lineWidth = 1.5;
    ctxT.beginPath();
    ctxT.arc(0, 0, 32, 0, Math.PI * 2);
    ctxT.stroke(); ctxT.fill();

    // Detalhes do reator
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctxT.beginPath();
    ctxT.ellipse(0, 0, 32, 8, 0, 0, Math.PI * 2);
    ctxT.ellipse(0, 0, 8, 32, 0, 0, Math.PI * 2);
    ctxT.stroke();

    // Anel externo de estocagem de gás
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctxT.beginPath();
    ctxT.arc(0, 0, 58, 0, Math.PI * 2);
    ctxT.stroke();

    // Hastes de sustentação
    for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctxT.beginPath();
        ctxT.moveTo(Math.cos(angle) * 32, Math.sin(angle) * 32);
        ctxT.lineTo(Math.cos(angle) * 58, Math.sin(angle) * 58);
        ctxT.stroke();
    }

    // Mangueira de Abastecimento/Acoplador magnético piscando
    const dockAngle = Math.PI / 4;
    ctxT.strokeStyle = 'rgba(249, 115, 22, 0.8)';
    ctxT.lineWidth = 2;
    ctxT.beginPath();
    ctxT.moveTo(Math.cos(dockAngle) * 58, Math.sin(dockAngle) * 58);
    ctxT.lineTo(Math.cos(dockAngle) * 82, Math.sin(dockAngle) * 82);
    ctxT.stroke();

    // Ponto de acoplamento piscando
    const radius = 3 + Math.abs(Math.sin(pState)) * 3;
    ctxT.fillStyle = `rgba(249, 115, 22, ${0.4 + Math.abs(Math.sin(pState)) * 0.6})`;
    ctxT.beginPath();
    ctxT.arc(Math.cos(dockAngle) * 82, Math.sin(dockAngle) * 82, radius, 0, Math.PI * 2);
    ctxT.fill();

    ctxT.restore();

    // Se houver nave conectada, desenha sinalizador tático de ligação de fluxo
    if (currentShipKey && shipsData[currentShipKey]) {
        ctxT.strokeStyle = 'rgba(56, 189, 248, 0.8)';
        ctxT.lineWidth = 1.2;
        ctxT.beginPath();
        // Desenhar vetor em forma de nave tática na esquerda
        ctxT.moveTo(cx - 90, cy - 30);
        ctxT.lineTo(cx - 70, cy - 20);
        ctxT.lineTo(cx - 90, cy - 10);
        ctxT.closePath();
        ctxT.stroke();

        // Cabo de energia piscando ligando a estação à nave
        ctxT.strokeStyle = 'rgba(249, 115, 22, 0.7)';
        ctxT.setLineDash([4, 4]);
        ctxT.beginPath();
        ctxT.moveTo(cx - 70, cy - 20);
        ctxT.lineTo(cx + Math.cos(rot + dockAngle) * 58, cy + Math.sin(rot + dockAngle) * 58);
        ctxT.stroke();
        ctxT.setLineDash([]);
    }

    requestAnimationFrame(drawStationLoop);
}