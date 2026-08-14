/* --------------------------------------------------------------------------
       1. SISTEMA DE ÁUDIO SINTETIZADO (Web Audio API)
       -------------------------------------------------------------------------- */
let audioCtx = null;
let audioEnabled = true;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playTone(freq, type, duration, gainVal = 0.1) {
    if (!audioEnabled) return;
    initAudio();
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { }
}

function soundBeep() { playTone(800, 'sine', 0.08, 0.05); }
function soundSpin() { playTone(300, 'triangle', 0.05, 0.03); }
function soundWin() {
    playTone(523.25, 'sine', 0.1, 0.1);
    setTimeout(() => playTone(659.25, 'sine', 0.1, 0.1), 100);
    setTimeout(() => playTone(783.99, 'sine', 0.2, 0.1), 200);
}
function soundLoss() {
    playTone(200, 'sawtooth', 0.15, 0.08);
    setTimeout(() => playTone(150, 'sawtooth', 0.25, 0.08), 120);
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const btn = document.getElementById('audioToggleBtn');
    btn.innerHTML = audioEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    btn.style.color = audioEnabled ? 'var(--cyan-glow)' : 'var(--pink-glow)';
}

/* --------------------------------------------------------------------------
   2. CANVAS DE HIPERESPAÇO / ESTRELAS ANIMADAS
   -------------------------------------------------------------------------- */
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8,
        speed: Math.random() * 0.5 + 0.1
    });
}

function animateSpace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 243, 255, 0.7)';

    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateSpace);
}
animateSpace();

/* --------------------------------------------------------------------------
   3. ESTADO GLOBAL DO JOGADOR & DATAPAD
   -------------------------------------------------------------------------- */
let balance = 2500;
let xp = 350;
let totalBets = 0;
let winsCount = 0;
let maxWin = 0;

const ranks = [
    { name: 'SUCATEIRO', limit: 500 },
    { name: 'CONTRABANDISTA', limit: 1500 },
    { name: 'CAÇADOR DE RECOMPENSAS', limit: 3500 },
    { name: 'MESTRE DO SINDIRATO', limit: 10000 }
];

function updateUI() {
    document.getElementById('creditDisplay').textContent = balance.toLocaleString();
    document.getElementById('statBets').textContent = totalBets;
    document.getElementById('statMaxWin').textContent = maxWin.toLocaleString() + ' CG';

    const winRate = totalBets > 0 ? Math.round((winsCount / totalBets) * 100) : 0;
    document.getElementById('statWinRate').textContent = winRate + '%';

    // XP e Ranks
    let currentRank = ranks[0];
    for (let r of ranks) {
        if (xp >= r.limit) currentRank = r;
    }
    document.getElementById('rankTitle').textContent = currentRank.name;
    document.getElementById('xpText').textContent = `XP ${xp}/${currentRank.limit}`;
    const fillPct = Math.min((xp / currentRank.limit) * 100, 100);
    document.getElementById('xpFill').style.width = fillPct + '%';
}

function addXP(amount) {
    xp += amount;
    updateUI();
}

function addLog(msg, type = 'sys') {
    const box = document.getElementById('logTerminal');
    const line = document.createElement('div');
    line.className = `log-line log-${type}`;
    line.textContent = `> ${msg}`;
    box.prepend(line);
}

function setBet(inputId, amount) {
    soundBeep();
    document.getElementById(inputId).value = amount;
}

function switchSector(sectorId, btn) {
    soundBeep();
    document.querySelectorAll('.sector-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.game-view').forEach(v => v.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`sector-${sectorId}`).classList.add('active');
    addLog(`Setor alternado para: ${sectorId.toUpperCase()}`);
}

function triggerShake() {
    const frame = document.getElementById('datapadMain');
    frame.classList.add('shake');
    setTimeout(() => frame.classList.remove('shake'), 400);
}

function exitTerminal() {
    soundBeep();
    addLog('Encerrando sessão no datapad...');
    setTimeout(() => {
        alert('Sessão do Datapad encerrada. Retornando à ponte de comando.');
    }, 300);
}

/* --------------------------------------------------------------------------
   4. MECÂNICA - SLOTS DE HIPERESPAÇO
   -------------------------------------------------------------------------- */
const slotSymbols = ['🪐', '⚔️', '🚀', '💎', '👾', '⭐'];

function playSlots() {
    const bet = parseInt(document.getElementById('slotBet').value);
    if (bet > balance || bet <= 0) {
        addLog('Créditos insuficientes para ativar hiperdrive!', 'loss');
        soundLoss();
        return;
    }

    balance -= bet;
    totalBets++;
    addXP(15);
    updateUI();

    const r1 = document.getElementById('reel1');
    const r2 = document.getElementById('reel2');
    const r3 = document.getElementById('reel3');

    r1.classList.add('blur');
    r2.classList.add('blur');
    r3.classList.add('blur');

    let spinInterval = setInterval(() => {
        r1.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        r2.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        r3.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        soundSpin();
    }, 80);

    setTimeout(() => {
        clearInterval(spinInterval);
        r1.classList.remove('blur');
        r2.classList.remove('blur');
        r3.classList.remove('blur');

        const s1 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        const s2 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        const s3 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];

        r1.textContent = s1;
        r2.textContent = s2;
        r3.textContent = s3;

        if (s1 === s2 && s2 === s3) {
            const win = bet * 8;
            balance += win;
            winsCount++;
            if (win > maxWin) maxWin = win;
            addXP(100);
            soundWin();
            triggerShake();
            addLog(`ALINHAMENTO TRIPLO! Lucro: ${win} CG!`, 'win');
        } else if (s1 === s2 || s2 === s3 || s1 === s3) {
            const win = bet * 2;
            balance += win;
            winsCount++;
            if (win > maxWin) maxWin = win;
            soundWin();
            addLog(`Sinal duplo detectado. Ganhou ${win} CG.`, 'win');
        } else {
            soundLoss();
            addLog(`Falha de alinhamento. Perda: ${bet} CG.`, 'loss');
        }
        updateUI();
    }, 1200);
}

/* --------------------------------------------------------------------------
   5. MECÂNICA - ROLETA QUÂNTICA
   -------------------------------------------------------------------------- */
function playRoulette(choice) {
    const bet = parseInt(document.getElementById('rouletteBet').value);
    if (bet > balance || bet <= 0) {
        addLog('Créditos insuficientes para carregar a roleta!', 'loss');
        soundLoss();
        return;
    }

    balance -= bet;
    totalBets++;
    addXP(20);
    updateUI();

    const wheel = document.getElementById('rouletteWheel');
    const resultBox = document.getElementById('rouletteResult');

    const deg = Math.floor(Math.random() * 360) + 1440;
    wheel.style.transform = `rotate(${deg}deg)`;

    const spinAudio = setInterval(soundSpin, 120);

    const outcomes = ['red', 'blue', 'red', 'blue', 'gold'];
    const picked = outcomes[Math.floor(Math.random() * outcomes.length)];

    setTimeout(() => {
        clearInterval(spinAudio);
        resultBox.textContent = picked.toUpperCase();

        if (picked === choice) {
            const mult = choice === 'gold' ? 10 : 2;
            const win = bet * mult;
            balance += win;
            winsCount++;
            if (win > maxWin) maxWin = win;
            addXP(80);
            soundWin();
            if (mult === 10) triggerShake();
            addLog(`Reação quântica bem-sucedida! Ganhou ${win} CG em ${choice.toUpperCase()}!`, 'win');
        } else {
            soundLoss();
            addLog(`Plasma colapsou em ${picked.toUpperCase()}. Perdeu ${bet} CG.`, 'loss');
        }
        updateUI();
    }, 3000);
}

/* --------------------------------------------------------------------------
   6. MECÂNICA - DADOS SABACC
   -------------------------------------------------------------------------- */
function playDice(choice) {
    const bet = parseInt(document.getElementById('diceBet').value);
    if (bet > balance || bet <= 0) {
        addLog('Créditos insuficientes para lançar os dados!', 'loss');
        soundLoss();
        return;
    }

    balance -= bet;
    totalBets++;
    addXP(15);
    updateUI();

    const d1El = document.getElementById('die1');
    const d2El = document.getElementById('die2');

    d1El.classList.add('rolling');
    d2El.classList.add('rolling');

    const diceAudio = setInterval(soundSpin, 90);

    setTimeout(() => {
        clearInterval(diceAudio);
        d1El.classList.remove('rolling');
        d2El.classList.remove('rolling');

        const v1 = Math.floor(Math.random() * 6) + 1;
        const v2 = Math.floor(Math.random() * 6) + 1;
        const sum = v1 + v2;

        d1El.textContent = v1;
        d2El.textContent = v2;

        let won = false;
        let mult = 0;

        if (choice === 'seven' && sum === 7) { won = true; mult = 5; }
        else if (choice === 'high' && sum >= 8) { won = true; mult = 2; }
        else if (choice === 'low' && sum <= 6) { won = true; mult = 2; }

        if (won) {
            const win = bet * mult;
            balance += win;
            winsCount++;
            if (win > maxWin) maxWin = win;
            addXP(60);
            soundWin();
            if (mult === 5) triggerShake();
            addLog(`Dados Sabacc: Soma ${sum}. Vitória de ${win} CG!`, 'win');
        } else {
            soundLoss();
            addLog(`Dados Sabacc: Soma ${sum}. Aposta perdida: ${bet} CG.`, 'loss');
        }
        updateUI();
    }, 1000);
}

// Inicialização da interface
updateUI();