// --- SISTEMA DE PERSISTÊNCIA VIA COOKIES ---
function setCookie(name, value, days = 30) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            try {
                return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
            } catch (e) {
                return null;
            }
        }
    }
    return null;
}

// --- VARIÁVEIS DE ESTADO DO TERMINAL ---
let shipsData = {};
let PRICES = { sublight: 2, hyperdrive: 45 };
let userCredits = 15000;
let currentShipKey = '';

let pumpInterval = null;
let currentPumpingAmount = 0;
let audioContext = null;
let pumpOsc = null;
let pumpGain = null;

// --- INICIALIZAÇÃO DO SISTEMA ---
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    initDOMListeners();
    setupCanvases();
    addLog("Sistema carregado via HoloNet Cookies.");
});

function loadSavedData() {
    // Carregar Créditos
    const savedCredits = getCookie('posto_credits');
    if (savedCredits !== null) {
        userCredits = parseFloat(savedCredits);
    }
    document.getElementById('userCreditsInput').value = userCredits;

    // Carregar Preços
    const savedPrices = getCookie('posto_prices');
    if (savedPrices) {
        PRICES = savedPrices;
    }
    document.getElementById('priceSublightInput').value = PRICES.sublight;
    document.getElementById('priceHyperdriveInput').value = PRICES.hyperdrive;

    // Carregar Naves
    const savedShips = getCookie('posto_ships');
    if (savedShips && Object.keys(savedShips).length > 0) {
        shipsData = savedShips;
    } else {
        // Se vazio, inicia sem naves para o usuário preencher
        shipsData = {};
    }

    rebuildShipSelect();
}

function initDOMListeners() {
    // Listener de Créditos
    document.getElementById('userCreditsInput').addEventListener('input', (e) => {
        userCredits = Math.max(0, parseFloat(e.target.value) || 0);
        setCookie('posto_credits', userCredits);
        updateShipUI();
    });

    // Listeners de Preços
    document.getElementById('priceSublightInput').addEventListener('input', (e) => {
        PRICES.sublight = Math.max(0, parseFloat(e.target.value) || 0);
        setCookie('posto_prices', PRICES);
    });
    document.getElementById('priceHyperdriveInput').addEventListener('input', (e) => {
        PRICES.hyperdrive = Math.max(0, parseFloat(e.target.value) || 0);
        setCookie('posto_prices', PRICES);
    });

    // Configuração dos botões de segurar (Abastecimento)
    setupPumpButton('btnPumpSublight', 'sublight');
    setupPumpButton('btnPumpHyperdrive', 'hyperdrive');
}

function setupPumpButton(btnId, type) {
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
    
    btn.addEventListener('touchstart', startAction, { passive: false });
    btn.addEventListener('touchend', stopAction);
}

// --- CONEXÃO AUDIO SCI-FI NATIVA ---
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playBeep(frequency = 600, duration = 0.08) {
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
    } catch (e) {}
}

function startPumpSound(type) {
    try {
        initAudio();
        if (!audioContext) return;
        pumpOsc = audioContext.createOscillator();
        pumpGain = audioContext.createGain();
        pumpOsc.type = 'triangle';
        const baseFreq = type === 'sublight' ? 110 : 230;
        pumpOsc.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
        pumpGain.gain.setValueAtTime(0.02, audioContext.currentTime);
        pumpOsc.connect(pumpGain);
        pumpGain.connect(audioContext.destination);
        pumpOsc.start();
    } catch (e) {}
}

function updatePumpSoundFrequency(ratio) {
    if (pumpOsc && audioContext) {
        const currentFreq = pumpOsc.frequency.value;
        pumpOsc.frequency.setValueAtTime(currentFreq + ratio * 1.5, audioContext.currentTime);
    }
}

function stopPumpSound() {
    try {
        if (pumpOsc) {
            pumpOsc.stop();
            pumpOsc.disconnect();
            pumpOsc = null;
        }
    } catch (e) {}
}

// --- GERENCIAMENTO DE NAVES ---
function rebuildShipSelect() {
    const select = document.getElementById('shipSelect');
    select.innerHTML = '';

    const keys = Object.keys(shipsData);
    if (keys.length === 0) {
        const opt = document.createElement('option');
        opt.value = "";
        opt.textContent = "Nenhuma nave registrada.";
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
    const quote = document.getElementById('customQuote').value.trim() || "Nave customizada do capitão.";
    const subCap = Math.max(1, parseInt(document.getElementById('customSubCap').value) || 100);
    const subLevel = Math.max(0, parseInt(document.getElementById('customSubLevel').value) || 0);
    const hypCap = Math.max(1, parseInt(document.getElementById('customHypCap').value) || 10);
    const hypLevel = Math.max(0, parseInt(document.getElementById('customHypLevel').value) || 0);

    if (!name) {
        showToast("ALERTA", "Dê um nome identificável à aeronave.", "❌");
        return;
    }

    const key = 'ship_' + Date.now();
    shipsData[key] = {
        name: name,
        subCap: subCap,
        subLevel: Math.min(subLevel, subCap),
        hypCap: hypCap,
        hypLevel: Math.min(hypLevel, hypCap),
        quote: quote
    };

    setCookie('posto_ships', shipsData);
    currentShipKey = key;
    rebuildShipSelect();
    
    document.getElementById('customName').value = '';
    document.getElementById('customQuote').value = '';
    document.getElementById('customShipForm').classList.add('hidden');
    
    addLog(`SUCESSO: Transponder de [${name}] sincronizado no bocal.`);
    showToast("CONECTADO", "Nave cadastrada com sucesso.", "🛸");
}

function deleteCurrentShip() {
    if (!currentShipKey || !shipsData[currentShipKey]) return;
    
    const name = shipsData[currentShipKey].name;
    delete shipsData[currentShipKey];
    setCookie('posto_ships', shipsData);
    
    addLog(`ALERTA: Transponder de [${name}] desconectado da comporta.`);
    showToast("DESCONECTADO", "Nave removida do terminal.", "🗑️");
    
    rebuildShipSelect();
}

function selectShip() {
    const select = document.getElementById('shipSelect');
    if (!select.value) return;
    
    currentShipKey = select.value;
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

    const subPercent = (ship.subLevel / ship.subCap) * 100;
    document.getElementById('shipSublightText').textContent = `${Math.floor(ship.subLevel)} / ${ship.subCap} L`;
    document.getElementById('shipSublightBar').style.width = `${subPercent}%`;

    const hypPercent = (ship.hypLevel / ship.hypCap) * 100;
    document.getElementById('shipHyperdriveText').textContent = `${Math.floor(ship.hypLevel)} / ${ship.hypCap} Kg`;
    document.getElementById('shipHyperdriveBar').style.width = `${hypPercent}%`;

    document.getElementById('userCreditsInput').value = Math.floor(userCredits);
}

function updateEmptyUI() {
    document.getElementById('shipName').textContent = "SEM CONEXÃO";
    document.getElementById('shipSublightText').textContent = "0 / 0 L";
    document.getElementById('shipSublightBar').style.width = "0%";
    document.getElementById('shipHyperdriveText').textContent = "0 / 0 Kg";
    document.getElementById('shipHyperdriveBar').style.width = "0%";
    document.getElementById('droidQuote').textContent = "Cadastre uma nave informando os transponders corretos para liberar as travas de fluxo.";
}

// --- PROCESSO DE ABASTECIMENTO REAL EM LOOP ---
function startPumping(type) {
    const ship = shipsData[currentShipKey];
    if (!ship) {
        showToast("ERRO", "Conecte uma nave ao posto antes de bombear.", "❌");
        return;
    }

    currentPumpingAmount = 0;
    startPumpSound(type);

    pumpInterval = setInterval(() => {
        const price = PRICES[type];

        if (userCredits < price) {
            addLog(`ALERTA: Créditos insuficientes no terminal.`);
            showToast("SALDO BAIXO", "Adicione créditos no seu painel.", "💳");
            stopPumping();
            return;
        }

        if (type === 'sublight') {
            if (ship.subLevel >= ship.subCap) {
                showToast("TANQUE CHEIO", "Válvula Subluz fechada automaticamente.", "⛽");
                stopPumping();
                return;
            }

            const rate = 2.0; 
            ship.subLevel = Math.min(ship.subLevel + rate, ship.subCap);
            userCredits -= rate * price;
            currentPumpingAmount += rate;

            document.getElementById('sublightPumpDisplay').textContent = `${currentPumpingAmount.toFixed(2)} L`;
            document.getElementById('sublightCostDisplay').textContent = `${Math.floor(currentPumpingAmount * price)}`;
            updatePumpSoundFrequency(1.5);
        } else {
            if (ship.hypLevel >= ship.hypCap) {
                showToast("TANQUE CHEIO", "Bocal de Coaxium fechado automaticamente.", "🔋");
                stopPumping();
                return;
            }

            const rate = 0.2; 
            ship.hypLevel = Math.min(ship.hypLevel + rate, ship.hypCap);
            userCredits -= rate * price;
            currentPumpingAmount += rate;

            document.getElementById('hyperdrivePumpDisplay').textContent = `${currentPumpingAmount.toFixed(2)} Kg`;
            document.getElementById('hyperdriveCostDisplay').textContent = `${Math.floor(currentPumpingAmount * price)}`;
            updatePumpSoundFrequency(4.0);
        }

        updateShipUI();
        setCookie('posto_ships', shipsData);
        setCookie('posto_credits', userCredits);

        if (Math.random() < 0.2) playBeep(type === 'sublight' ? 350 : 650, 0.02);
    }, 80);
}

function stopPumping() {
    if (pumpInterval) {
        clearInterval(pumpInterval);
        pumpInterval = null;
        stopPumpSound();
        if (currentPumpingAmount > 0) {
            addLog(`Fluxo interrompido. Transferência concluída.`);
            playBeep(250, 0.15);
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
        } else {
            ship.subLevel = ship.subCap;
            userCredits -= cost;
            showToast("BOMBA CONCLUÍDA", "Tanque Subluz cheio.", "⛽");
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
        } else {
            ship.hypLevel = ship.hypCap;
            userCredits -= cost;
            showToast("BOMBA CONCLUÍDA", "Câmara de Coaxium cheia.", "🔋");
        }
    }
    updateShipUI();
    setCookie('posto_ships', shipsData);
    setCookie('posto_credits', userCredits);
    addLog(`Carga instantânea acionada via Linha de Comando.`);
}

// --- INTERFACE TOAST ---
function showToast(title, message, icon = '📟') {
    const toast = document.getElementById('notificationToast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    document.getElementById('toastIcon').textContent = icon;
    
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    playBeep(750, 0.1);

    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
    }, 3000);
}

// --- GRAPHICS CANVAS SYSTEM ---
const spaceCanvas = document.getElementById('spaceCanvas');
const ctxS = spaceCanvas.getContext('2d');
const stationCanvas = document.getElementById('stationCanvas');
const ctxT = stationCanvas.getContext('2d');
let stars = [];

function setupCanvases() {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * spaceCanvas.width,
            y: Math.random() * spaceCanvas.height,
            size: Math.random() * 1.5,
            alpha: Math.random()
        });
    }
    drawSpace();
    drawStationLoop();
}

function drawSpace() {
    ctxS.fillStyle = '#020617';
    ctxS.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);
    for (let star of stars) {
        ctxS.fillStyle = `rgba(56, 189, 248, ${star.alpha})`;
        ctxS.fillRect(star.x, star.y, star.size, star.size);
    }
    requestAnimationFrame(drawSpace);
}

let rot = 0;
function drawStationLoop() {
    stationCanvas.width = stationCanvas.offsetWidth;
    stationCanvas.height = stationCanvas.offsetHeight;
    const w = stationCanvas.width, h = stationCanvas.height;
    ctxT.clearRect(0,0,w,h);
    
    rot += 0.006;
    ctxT.save();
    ctxT.translate(w/2, h/2);
    ctxT.rotate(rot);
    
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctxT.beginPath(); ctxT.arc(0,0, 25, 0, Math.PI*2); ctxT.stroke();
    ctxT.beginPath(); ctxT.arc(0,0, 45, 0, Math.PI*2); ctxT.stroke();
    
    ctxT.strokeStyle = 'rgba(249, 115, 22, 0.5)';
    ctxT.beginPath(); ctxT.moveTo(0,-45); ctxT.lineTo(0,-60); ctxT.stroke();
    ctxT.restore();
    
    requestAnimationFrame(drawStationLoop);
}