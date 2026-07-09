//Script de Logica Dinâmica

// --- BASE DE DADOS DE NAVES ---
const shipsData = {
    yt1300: {
        name: "YT-1300 Millennium Falcon",
        subCap: 1000,
        subLevel: 400,
        hypCap: 100,
        hypLevel: 12,
        quote: "Cargueiro leve com modificações extremas. O reator de fusão do sub-luz consome bastante Tibanna para manter esse monte de sucata voando."
    },
    xwing: {
        name: "T-65B X-Wing Fighter",
        subCap: 300,
        subLevel: 110,
        hypCap: 30,
        hypLevel: 4,
        quote: "Caça ágil com quatro canhões laser. O consumo de hiperespaço é otimizado para pequenos saltos de guerrilha. Dê um trato no hiperdrive."
    },
    lambda: {
        name: "Lançadeira Classe Lambda",
        subCap: 1500,
        subLevel: 950,
        hypCap: 150,
        hypLevel: 80,
        quote: "Transporte oficial do Império. Os tanques são reforçados com fibra de carbono. Certifique-se de que os oficiais imperiais pagaram suas taxas estatais."
    },
    bruto: {
        name: "Bruto Corelliano XT",
        subCap: 5000,
        subLevel: 1200,
        hypCap: 500,
        hypLevel: 45,
        quote: "Nave cargueira pesada de mineração. Tem o tanque de um dreadnought e bebe Tibanna como se estivesse de graça. Boa sorte pagando essa conta."
    }
};

// --- PREÇOS ---
const PRICES = {
    sublight: 2, // Créditos por Litro
    hyperdrive: 45 // Créditos por Kg
};

let currentShipKey = 'yt1300';
let userCredits = 15000;
let pumpInterval = null;
let currentPumpingAmount = 0;
let audioContext = null;

// --- SISTEMA DE SINAL SONORO (Web Audio API) ---
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
        gain.gain.setValueAtTime(0.05, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + duration);
    } catch (e) {
        // Navegadores impedem reprodução antes do primeiro toque
    }
}

// Sintetizador dinâmico para barulho de abastecimento contínuo
let pumpOsc = null;
let pumpGain = null;
function startPumpSound(type) {
    try {
        initAudio();
        if (!audioContext) return;
        pumpOsc = audioContext.createOscillator();
        pumpGain = audioContext.createGain();

        pumpOsc.type = 'triangle';
        // Subluz zumbido mais baixo, hiperespaço zumbido mais alto
        const baseFreq = type === 'sublight' ? 120 : 250;
        pumpOsc.frequency.setValueAtTime(baseFreq, audioContext.currentTime);

        pumpGain.gain.setValueAtTime(0.03, audioContext.currentTime);
        pumpOsc.connect(pumpGain);
        pumpGain.connect(audioContext.destination);
        pumpOsc.start();
    } catch (e) { }
}

function updatePumpSoundFrequency(ratio) {
    if (pumpOsc && audioContext) {
        // Frequência sobe sutilmente à medida que enche
        const currentFreq = pumpOsc.frequency.value;
        pumpOsc.frequency.setValueAtTime(currentFreq + ratio * 2, audioContext.currentTime);
    }
}

function stopPumpSound() {
    try {
        if (pumpOsc) {
            pumpOsc.stop();
            pumpOsc.disconnect();
            pumpOsc = null;
        }
    } catch (e) { }
}

// --- NOTIFICAÇÃO CUSTOMIZADA (Sem alert) ---
function showToast(title, message, icon = '📟') {
    const toast = document.getElementById('notificationToast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    document.getElementById('toastIcon').textContent = icon;

    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    playBeep(800, 0.15);

    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
    }, 3500);
}

// --- LOG DO CONSOLE ---
function addLog(text) {
    const consoleEl = document.getElementById('logConsole');
    const now = new Date();
    const timeStr = `[${now.toTimeString().split(' ')[0]}]`;

    const div = document.createElement('div');
    div.className = "text-cyan-400";
    if (text.includes("SUCESSO")) div.className = "text-green-400";
    if (text.includes("ALERTA") || text.includes("FALHA")) div.className = "text-red-400";
    div.textContent = `${timeStr} ${text}`;

    consoleEl.appendChild(div);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

// --- SELEÇÃO DE NAVE ---
function selectShip() {
    const select = document.getElementById('shipSelect');
    const key = select.value;
    currentShipKey = key;

    if (key === 'custom') {
        document.getElementById('customShipForm').classList.remove('hidden');
        document.getElementById('shipName').textContent = "Aguardando Cadastro...";
        return;
    } else {
        document.getElementById('customShipForm').classList.add('hidden');
    }

    const ship = shipsData[key];
    updateShipUI();
    document.getElementById('droidQuote').textContent = `"${ship.quote}"`;
    addLog(`Nave acoplada: ${ship.name} - Pronta para abastecer.`);
    playBeep(450, 0.1);
}

function updateShipUI() {
    const ship = shipsData[currentShipKey];
    if (!ship) return;

    document.getElementById('shipName').textContent = ship.name;

    // Subluz
    const subPercent = (ship.subLevel / ship.subCap) * 100;
    document.getElementById('shipSublightText').textContent = `${Math.floor(ship.subLevel)} / ${ship.subCap} L`;
    document.getElementById('shipSublightBar').style.width = `${subPercent}%`;

    // Hiper
    const hypPercent = (ship.hypLevel / ship.hypCap) * 100;
    document.getElementById('shipHyperdriveText').textContent = `${Math.floor(ship.hypLevel)} / ${ship.hypCap} Kg`;
    document.getElementById('shipHyperdriveBar').style.width = `${hypPercent}%`;

    // Atualiza crédito exibido
    document.getElementById('userCredits').textContent = `${Math.floor(userCredits).toLocaleString()} 💳`;
}

// Registrar nave customizada
function registerCustomShip() {
    const name = document.getElementById('customName').value;
    const subCap = parseInt(document.getElementById('customSubCap').value) || 500;
    const hypCap = parseInt(document.getElementById('customHypCap').value) || 50;

    const customKey = 'registered_custom';
    shipsData[customKey] = {
        name: name,
        subCap: subCap,
        subLevel: 0,
        hypCap: hypCap,
        hypLevel: 0,
        quote: `Transponder personalizado registrado. Uma modificação espacial não licenciada. Monitore os níveis com cuidado.`
    };

    const select = document.getElementById('shipSelect');
    // Remove a opção antiga customizada se houver
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === customKey) {
            select.remove(i);
        }
    }

    // Criar nova opção
    const opt = document.createElement('option');
    opt.value = customKey;
    opt.textContent = `[REGISTRADO] ${name}`;
    select.insertBefore(opt, select.lastElementChild);

    select.value = customKey;
    currentShipKey = customKey;
    updateShipUI();

    document.getElementById('customShipForm').classList.add('hidden');
    document.getElementById('droidQuote').textContent = `"${shipsData[customKey].quote}"`;

    addLog(`SUCESSO: Transponder ${name} registrado e engatado no bocal #3.`);
    showToast("REGISTRADO", `Nave ${name} conectada à rede.`);
}

// --- SISTEMA DE BOMBEAMENTO REALISTA (Segurar botão) ---
function startPumping(type) {
    initAudio();
    const ship = shipsData[currentShipKey];
    if (!ship) {
        showToast("ERRO DE COMUNICAÇÃO", "Por favor, selecione uma nave válida primeiro.", "❌");
        return;
    }

    currentPumpingAmount = 0;
    startPumpSound(type);

    pumpInterval = setInterval(() => {
        const price = PRICES[type];

        // Parar se o usuário ficar sem dinheiro
        if (userCredits < price) {
            addLog(`ALERTA: Créditos insuficientes para continuar abastecendo.`);
            showToast("CRÉDITOS INSUFICIENTES", "Por favor, recarregue seus créditos para continuar.", "💳");
            stopPumping();
            return;
        }

        // Parar se o tanque estiver cheio
        if (type === 'sublight') {
            if (ship.subLevel >= ship.subCap) {
                addLog(`CONCLUÍDO: Tanque de combustível de Subluz está cheio.`);
                showToast("TANQUE CHEIO", "Acoplamento de Subluz preenchido em 100%.", "⛽");
                stopPumping();
                return;
            }

            // Incrementa combustível
            const rate = 1.8; // Litros por tick
            ship.subLevel = Math.min(ship.subLevel + rate, ship.subCap);
            userCredits -= rate * price;
            currentPumpingAmount += rate;

            document.getElementById('sublightPumpDisplay').textContent = `${currentPumpingAmount.toFixed(2)} L`;
            document.getElementById('sublightCostDisplay').textContent = `${Math.floor(currentPumpingAmount * price)}`;
            updatePumpSoundFrequency(1.2);
        } else {
            if (ship.hypLevel >= ship.hypCap) {
                addLog(`CONCLUÍDO: Reservatório de Coaxium está cheio.`);
                showToast("NÚCLEO CHEIO", "Tanque de Hiperespaço carregado com sucesso.", "🔋");
                stopPumping();
                return;
            }

            // Incrementa combustível
            const rate = 0.15; // Kg por tick
            ship.hypLevel = Math.min(ship.hypLevel + rate, ship.hypCap);
            userCredits -= rate * price;
            currentPumpingAmount += rate;

            document.getElementById('hyperdrivePumpDisplay').textContent = `${currentPumpingAmount.toFixed(2)} Kg`;
            document.getElementById('hyperdriveCostDisplay').textContent = `${Math.floor(currentPumpingAmount * price)}`;
            updatePumpSoundFrequency(3.5);
        }

        updateShipUI();
        if (Math.random() < 0.25) playBeep(type === 'sublight' ? 400 : 700, 0.03); // Beep de fluxo constante

    }, 80); // Velocidade do tick de abastecimento
}

function stopPumping() {
    if (pumpInterval) {
        clearInterval(pumpInterval);
        pumpInterval = null;
        stopPumpSound();
        if (currentPumpingAmount > 0) {
            addLog(`Abastecimento finalizado. Foram inseridos ${currentPumpingAmount.toFixed(2)} unidades na nave.`);
            playBeep(300, 0.2); // Fim de bombeamento sinalizador
        }
    }
}

// Abastecer tudo de uma vez
function fillFully(type) {
    initAudio();
    const ship = shipsData[currentShipKey];
    if (!ship) return;

    const price = PRICES[type];
    if (type === 'sublight') {
        const needed = ship.subCap - ship.subLevel;
        if (needed <= 0) {
            showToast("TANQUE CHEIO", "Sua nave já está com 100% de Tibanna.", "⛽");
            return;
        }
        const cost = needed * price;
        if (userCredits < cost) {
            // Abastece o máximo possível com o dinheiro disponível
            const afford = userCredits / price;
            if (afford <= 0) {
                showToast("CRÉDITOS INSUFICIENTES", "Falta saldo na sua conta imperial.", "❌");
                return;
            }
            ship.subLevel += afford;
            userCredits = 0;
            addLog(`Abastecido parcialmente: +${afford.toFixed(2)}L de Tibanna. Créditos esgotados.`);
        } else {
            ship.subLevel = ship.subCap;
            userCredits -= cost;
            addLog(`SUCESSO: Tanque de Subluz cheio com +${needed.toFixed(2)}L. Custo: ${Math.floor(cost)} créditos.`);
            showToast("REABASTECIDO", `Tanque cheio! Gasto: ${Math.floor(cost)} 💳`, "⚡");
        }
    } else {
        const needed = ship.hypCap - ship.hypLevel;
        if (needed <= 0) {
            showToast("TANQUE CHEIO", "Seu reator hiperdrive já está com 100% de Coaxium.", "🔋");
            return;
        }
        const cost = needed * price;
        if (userCredits < cost) {
            const afford = userCredits / price;
            if (afford <= 0) {
                showToast("CRÉDITOS INSUFICIENTES", "Falta de créditos para o salto hiperespacial.", "❌");
                return;
            }
            ship.hypLevel += afford;
            userCredits = 0;
            addLog(`Abastecido parcialmente: +${afford.toFixed(2)}Kg de Coaxium.`);
        } else {
            ship.hypLevel = ship.hypCap;
            userCredits -= cost;
            addLog(`SUCESSO: Núcleo de Coaxium cheio com +${needed.toFixed(2)}Kg. Custo: ${Math.floor(cost)} créditos.`);
            showToast("REABASTECIDO", `Hiperdrive ativo! Gasto: ${Math.floor(cost)} 💳`, "⚡");
        }
    }
    updateShipUI();
}

// --- COMPRAR CILINDROS PORTÁTEIS ---
function buyCanister(type, price) {
    initAudio();
    if (userCredits < price) {
        showToast("FALHA NA COMPRA", "Saldo insuficiente na rede bancária do setor.", "❌");
        return;
    }

    userCredits -= price;
    updateShipUI();

    const name = type === 'tibanna' ? "Canister de Tibanna (20L)" : "Núcleo de Coaxium Secundário (2Kg)";
    addLog(`SUCESSO: Adquirido ${name} por ${price} créditos. Despachado para o elevador de carga.`);
    showToast("COMPRA CONCLUÍDA", `${name} enviado para a baía de carga da nave.`, "📦");
}

function addMockCredits() {
    initAudio();
    userCredits += 10000;
    updateShipUI();
    addLog(`DEPÓSITO: Recebido 10.000 créditos via HoloNet Bank.`);
    showToast("DEPÓSITO CONFIRMADO", "Mais 10.000 créditos creditados.", "💳");
}


// --- ANIMAÇÃO CANVAS DO ESPAÇO E DA ESTAÇÃO ---
const spaceCanvas = document.getElementById('spaceCanvas');
const ctxS = spaceCanvas.getContext('2d');
const stationCanvas = document.getElementById('stationCanvas');
const ctxT = stationCanvas.getContext('2d');

let stars = [];
function resizeSpaceCanvas() {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * spaceCanvas.width,
            y: Math.random() * spaceCanvas.height,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.05 + 0.01,
            alpha: Math.random()
        });
    }
}
window.addEventListener('resize', resizeSpaceCanvas);
resizeSpaceCanvas();

function drawSpace() {
    ctxS.fillStyle = '#030712';
    ctxS.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Desenhar Nebulosa sutil ao fundo
    const gradient = ctxS.createRadialGradient(
        spaceCanvas.width * 0.7, spaceCanvas.height * 0.3, 50,
        spaceCanvas.width * 0.7, spaceCanvas.height * 0.3, spaceCanvas.width * 0.6
    );
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.6)');
    gradient.addColorStop(0.5, 'rgba(8, 47, 73, 0.2)');
    gradient.addColorStop(1, 'transparent');
    ctxS.fillStyle = gradient;
    ctxS.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Estrelas
    for (let star of stars) {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctxS.fillStyle = `rgba(56, 189, 248, ${Math.abs(star.alpha)})`;
        ctxS.fillRect(star.x, star.y, star.size, star.size);
    }
    requestAnimationFrame(drawSpace);
}
drawSpace();

// Estação flutuando na tela menor
let stationRotation = 0;
let dockPulse = 0;
function drawStationCanvas() {
    stationCanvas.width = stationCanvas.offsetWidth;
    stationCanvas.height = stationCanvas.offsetHeight;

    const w = stationCanvas.width;
    const h = stationCanvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctxT.clearRect(0, 0, w, h);

    // Desenhar Grade de Fundo Sci-fi
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctxT.lineWidth = 1;
    for (let i = 0; i < w; i += 20) {
        ctxT.beginPath();
        ctxT.moveTo(i, 0);
        ctxT.lineTo(i, h);
        ctxT.stroke();
    }
    for (let j = 0; j < h; j += 20) {
        ctxT.beginPath();
        ctxT.moveTo(0, j);
        ctxT.lineTo(w, j);
        ctxT.stroke();
    }

    stationRotation += 0.005;
    dockPulse += 0.05;

    ctxT.save();
    ctxT.translate(cx, cy);
    ctxT.rotate(stationRotation);

    // 1. Esfera Central de Armazenamento de Gás
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctxT.fillStyle = 'rgba(56, 189, 248, 0.05)';
    ctxT.lineWidth = 1.5;
    ctxT.beginPath();
    ctxT.arc(0, 0, 35, 0, Math.PI * 2);
    ctxT.stroke();
    ctxT.fill();

    // Detalhes da Esfera Central (Linhas de Grid)
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctxT.beginPath();
    ctxT.ellipse(0, 0, 35, 10, 0, 0, Math.PI * 2);
    ctxT.ellipse(0, 0, 10, 35, 0, 0, Math.PI * 2);
    ctxT.stroke();

    // 2. Anel de Energia Orbital (Gasoduto Externo)
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctxT.beginPath();
    ctxT.arc(0, 0, 60, 0, Math.PI * 2);
    ctxT.stroke();

    // Postes de Conexão entre a esfera e o anel
    for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctxT.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctxT.beginPath();
        ctxT.moveTo(Math.cos(angle) * 35, Math.sin(angle) * 35);
        ctxT.lineTo(Math.cos(angle) * 60, Math.sin(angle) * 60);
        ctxT.stroke();
    }

    // 3. Braços de Abastecimento para naves (Plataformas de Acoplamento)
    const dockAngle = Math.PI / 4;
    ctxT.strokeStyle = 'rgba(249, 115, 22, 0.7)'; // Laranja de Hiperespaço
    ctxT.lineWidth = 2;
    ctxT.beginPath();
    ctxT.moveTo(Math.cos(dockAngle) * 60, Math.sin(dockAngle) * 60);
    ctxT.lineTo(Math.cos(dockAngle) * 85, Math.sin(dockAngle) * 85);
    ctxT.stroke();

    // Ponto de acoplamento piscando
    const pulseRadius = 3 + Math.abs(Math.sin(dockPulse)) * 4;
    ctxT.fillStyle = `rgba(249, 115, 22, ${0.4 + Math.abs(Math.sin(dockPulse)) * 0.6})`;
    ctxT.beginPath();
    ctxT.arc(Math.cos(dockAngle) * 85, Math.sin(dockAngle) * 85, pulseRadius, 0, Math.PI * 2);
    ctxT.fill();

    ctxT.restore();

    // Desenhar nave de representação gráfica acoplada na lateral
    ctxT.strokeStyle = 'rgba(56, 189, 248, 0.7)';
    ctxT.lineWidth = 1;
    ctxT.beginPath();
    // Desenhar triângulo representativo de nave aproximando
    ctxT.moveTo(cx - 95, cy - 40);
    ctxT.lineTo(cx - 75, cy - 30);
    ctxT.lineTo(cx - 95, cy - 20);
    ctxT.closePath();
    ctxT.stroke();

    // Linha de combustível ligando a estação à nave do vetor
    ctxT.strokeStyle = 'rgba(249, 115, 22, 0.8)';
    ctxT.lineWidth = 1.5;
    ctxT.setLineDash([4, 4]);
    ctxT.beginPath();
    ctxT.moveTo(cx - 75, cy - 30); // Da nave
    ctxT.lineTo(cx + Math.cos(stationRotation + dockAngle) * 60, cy + Math.sin(stationRotation + dockAngle) * 60); // Para a comporta de acoplamento orbital
    ctxT.stroke();
    ctxT.setLineDash([]); // Limpa o dash

    requestAnimationFrame(drawStationCanvas);
}
setTimeout(drawStationCanvas, 100);

// Inicializar UI
updateShipUI();
