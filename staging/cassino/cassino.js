/* ==========================================================================
   DATAPAD CASINO - LÓGICA DE JOGOS, CÂMBIO, BLACKJACK 21 & TEXAS HOLD'EM 1v1
   ========================================================================== */

// Estado da Carteira Galáctica (1 Ficha = 10 Créditos Imperiais)
let imperialCredits = 10000; // Créditos Imperiais (CI)
let casinoChips = 200;       // Fichas Galácticas (FG)

let audioMuted = false;
let currentSelectedChip = 1; // 1, 5, 10, 50, 100 Fichas

// ==========================================================================
// 1. TRAVA DE NAVEGAÇÃO ENTRE JOGOS EM ANDAMENTO
// ==========================================================================
function isAnyGameInProgress() {
  if (isRouletteSpinning) return "a Roleta Quântica terminar de girar";
  if (bjGameActive) return "a rodada atual de Blackjack ser finalizada";
  if (pokerState.active) return "a mão de Texas Hold'em ser concluída ou você dar Fold";
  if (isSlotSpinning) return "as bobinas do Slot Matrix pararem";
  if (isSabaccRolling) return "os Dados de Sabacc terminarem de rolar";
  return null;
}

function switchGame(gameId, buttonElement) {
  const ongoing = isAnyGameInProgress();
  if (ongoing) {
    playSound('loss');
    logConsole(`ACESSO BLOQUEADO: Você deve aguardar ${ongoing} para trocar de setor!`, 'log-warn');
    alert(`Atenção: Finalize a rodada em andamento antes de trocar de jogo! (${ongoing})`);
    return;
  }

  playSound('click');
  document.querySelectorAll('.game-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-module').forEach(b => b.classList.remove('active'));
  
  document.getElementById(`game-${gameId}`).classList.add('active');
  buttonElement.classList.add('active');
  logConsole(`Interface alternada para o setor: ${gameId.toUpperCase()}`);
}

function voltarInicio() {
  const ongoing = isAnyGameInProgress();
  if (ongoing) {
    playSound('loss');
    alert(`Você não pode sair do cassino enquanto uma partida estiver em andamento! (${ongoing})`);
    return;
  }

  playSound('click');
  if (casinoChips > 0) {
    const querDevolver = confirm(`Você ainda possui ${casinoChips} Fichas Galácticas! Deseja converter tudo de volta para ${casinoChips * 10} Créditos Imperiais antes de sair?`);
    if (querDevolver) {
      imperialCredits += casinoChips * 10;
      casinoChips = 0;
      updateDisplays();
      logConsole("Todas as fichas foram devolvidas ao cofre central.", "log-win");
    } else {
      logConsole("Fichas mantidas no armazenamento de memória do Datapad.", "log-info");
    }
  }
  alert("Redirecionando para o Terminal Central");
  window.location.href = "../menu";
}

// ==========================================================================
// 2. MOTOR DE ÁUDIO SINTETIZADO (Web Audio API)
// ==========================================================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (audioMuted) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'chip') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'card') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.06);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'spinTick') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'allin') {
      [220, 440, 880, 1760].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(f, now + i * 0.05);
        g.gain.setValueAtTime(0.2, now + i * 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);
        o.start(now + i * 0.05);
        o.stop(now + i * 0.05 + 0.25);
      });
    } else if (type === 'win') {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'square';
        o.frequency.setValueAtTime(freq, now + i * 0.08);
        g.gain.setValueAtTime(0.15, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.2);
      });
    } else if (type === 'loss') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    console.error("Audio error", e);
  }
}

function toggleAudio() {
  audioMuted = !audioMuted;
  document.getElementById('audioState').textContent = audioMuted ? 'MUDO' : 'LIGADO';
  document.getElementById('audioIcon').textContent = audioMuted ? '🔇' : '🔊';
  logConsole(`Sintetizador de áudio ${audioMuted ? 'desativado' : 'ativado'}.`, 'log-info');
}

// ==========================================================================
// 3. FUNDO CANVAS DE HIPERESPAÇO
// ==========================================================================
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 150;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.8,
    speed: Math.random() * 0.4 + 0.1,
    alpha: Math.random()
  });
}

function renderSpace() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let s of stars) {
    s.y += s.speed;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
    ctx.fillStyle = `rgba(0, 240, 255, ${s.alpha * 0.6})`;
    ctx.fillRect(s.x, s.y, s.size, s.size);
  }
  requestAnimationFrame(renderSpace);
}
renderSpace();

// ==========================================================================
// 4. ATUALIZAÇÃO DE SALDOS E LOGS
// ==========================================================================
function updateDisplays() {
  document.getElementById('imperialCreditsDisplay').textContent = imperialCredits.toLocaleString('pt-BR');
  document.getElementById('casinoChipsDisplay').textContent = casinoChips.toLocaleString('pt-BR');
}

function logConsole(msg, type = 'log-info') {
  const stream = document.getElementById('consoleStream');
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  line.innerHTML = `> [${timestamp}] ${msg}`;
  stream.prepend(line);
}

function clearConsoleLog() {
  document.getElementById('consoleStream').innerHTML = '';
  logConsole('Buffer de telemetria limpo.', 'log-info');
}

// ==========================================================================
// 5. CASA DE CÂMBIO
// ==========================================================================
function openExchangeModal() {
  if (isAnyGameInProgress()) {
    playSound('loss');
    alert("Finalize a rodada do jogo em andamento antes de realizar câmbio!");
    return;
  }
  playSound('click');
  document.getElementById('exchangeModal').classList.add('active');
  updateBuyCostPreview();
  updateSellReturnPreview();
}

function closeExchangeModal() {
  playSound('click');
  document.getElementById('exchangeModal').classList.remove('active');
}

function updateBuyCostPreview() {
  const amount = parseInt(document.getElementById('buyChipsAmount').value) || 0;
  document.getElementById('buyCostPreview').textContent = (amount * 10).toLocaleString('pt-BR');
}

function setBuyChips(amount) {
  playSound('click');
  const input = document.getElementById('buyChipsAmount');
  if (amount === 'max') {
    input.value = Math.floor(imperialCredits / 10);
  } else {
    input.value = amount;
  }
  updateBuyCostPreview();
}

function executeBuyChips() {
  const chipsToBuy = parseInt(document.getElementById('buyChipsAmount').value) || 0;
  if (chipsToBuy <= 0) {
    alert("Informe uma quantidade válida de fichas.");
    return;
  }

  const cost = chipsToBuy * 10;
  if (cost > imperialCredits) {
    playSound('loss');
    alert("Créditos Imperiais insuficientes para esta conversão!");
    return;
  }

  imperialCredits -= cost;
  casinoChips += chipsToBuy;
  updateDisplays();
  playSound('chip');
  logConsole(`CÂMBIO REALIZADO: -${cost} CI -> +${chipsToBuy} Fichas Galácticas recebidas.`, 'log-win');
  closeExchangeModal();
}

function updateSellReturnPreview() {
  const amount = parseInt(document.getElementById('sellChipsAmount').value) || 0;
  document.getElementById('sellReturnPreview').textContent = (amount * 10).toLocaleString('pt-BR');
}

function setSellChips(amount) {
  playSound('click');
  const input = document.getElementById('sellChipsAmount');
  if (amount === 'all') {
    input.value = casinoChips;
  } else {
    input.value = Math.min(amount, casinoChips);
  }
  updateSellReturnPreview();
}

function executeSellChips() {
  const chipsToSell = parseInt(document.getElementById('sellChipsAmount').value) || 0;
  if (chipsToSell <= 0) {
    alert("Informe uma quantidade válida de fichas para devolver.");
    return;
  }

  if (chipsToSell > casinoChips) {
    playSound('loss');
    alert("Você não possui essa quantidade de fichas no saldo!");
    return;
  }

  const revenue = chipsToSell * 10;
  casinoChips -= chipsToSell;
  imperialCredits += revenue;
  updateDisplays();
  playSound('win');
  logConsole(`FICHAS RESGATADAS: -${chipsToSell} Fichas -> +${revenue} Créditos Imperiais adicionados.`, 'log-win');
  closeExchangeModal();
}

// ==========================================================================
// 6. MÓDULO ROLETA EUROPEIA COMPLETA
// ==========================================================================
const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

let activeRouletteBets = {
  numbers: {}, colors: {}, even_odd: {}, halves: {}, dozens: {}, columns: {}
};

let isRouletteSpinning = false;
const rCanvas = document.getElementById('rouletteCanvas');
const rCtx = rCanvas.getContext('2d');
let wheelAngle = 0;
let ballAngle = 0;
let ballRadiusProgress = 1;

function drawRouletteWheel() {
  const cx = rCanvas.width / 2;
  const cy = rCanvas.height / 2;
  const radius = cx - 8;
  const numSegments = ROULETTE_NUMBERS.length;
  const arc = (Math.PI * 2) / numSegments;

  rCtx.clearRect(0, 0, rCanvas.width, rCanvas.height);

  rCtx.save();
  rCtx.translate(cx, cy);
  rCtx.rotate(wheelAngle);

  for (let i = 0; i < numSegments; i++) {
    const num = ROULETTE_NUMBERS[i];
    const angle = i * arc;

    if (num === 0) {
      rCtx.fillStyle = '#008a47';
    } else if (RED_NUMBERS.includes(num)) {
      rCtx.fillStyle = '#b01030';
    } else {
      rCtx.fillStyle = '#101622';
    }

    rCtx.beginPath();
    rCtx.moveTo(0, 0);
    rCtx.arc(0, 0, radius, angle, angle + arc);
    rCtx.closePath();
    rCtx.fill();
    rCtx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    rCtx.lineWidth = 1;
    rCtx.stroke();

    rCtx.save();
    rCtx.rotate(angle + arc / 2);
    rCtx.fillStyle = '#ffffff';
    rCtx.font = 'bold 11px Orbitron';
    rCtx.textAlign = 'right';
    rCtx.fillText(num, radius - 10, 4);
    rCtx.restore();
  }

  rCtx.restore();

  if (ballRadiusProgress > 0) {
    const bR = 55 + (radius - 70) * ballRadiusProgress;
    const bx = cx + Math.cos(ballAngle) * bR;
    const by = cy + Math.sin(ballAngle) * bR;

    rCtx.save();
    rCtx.beginPath();
    rCtx.arc(bx, by, 5, 0, Math.PI * 2);
    rCtx.fillStyle = '#00f0ff';
    rCtx.shadowColor = '#00f0ff';
    rCtx.shadowBlur = 12;
    rCtx.fill();
    rCtx.restore();
  }
}

function initRouletteBoard() {
  const grid = document.getElementById('rouletteNumbersGrid');
  grid.innerHTML = '';

  const rows = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 12; c++) {
      const num = rows[r][c];
      const isRed = RED_NUMBERS.includes(num);
      const btn = document.createElement('button');
      btn.className = `bet-spot num-cell ${isRed ? 'red' : 'black'}`;
      btn.setAttribute('data-num', num);
      btn.onclick = () => placeRouletteBet('number', num);

      btn.innerHTML = `
        <span>${num}</span>
        <span class="chip-marker" id="marker-num-${num}"></span>
      `;
      grid.appendChild(btn);
    }
  }

  drawRouletteWheel();
}

function selectChip(amount, elem) {
  if (isRouletteSpinning) return;
  playSound('chip');
  currentSelectedChip = amount;
  document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
  elem.classList.add('active');
}

function placeRouletteBet(category, target) {
  if (isRouletteSpinning) return;
  playSound('chip');

  if (casinoChips < currentSelectedChip) {
    logConsole("Fichas insuficientes! Abra a Casa de Câmbio para converter Créditos.", "log-loss");
    playSound('loss');
    return;
  }

  casinoChips -= currentSelectedChip;
  updateDisplays();

  let markerId = '';
  if (category === 'number') {
    activeRouletteBets.numbers[target] = (activeRouletteBets.numbers[target] || 0) + currentSelectedChip;
    markerId = `marker-num-${target}`;
  } else if (category === 'color') {
    activeRouletteBets.colors[target] = (activeRouletteBets.colors[target] || 0) + currentSelectedChip;
    markerId = `marker-color-${target}`;
  } else if (category === 'even_odd') {
    activeRouletteBets.even_odd[target] = (activeRouletteBets.even_odd[target] || 0) + currentSelectedChip;
    markerId = `marker-${target}`;
  } else if (category === 'half') {
    activeRouletteBets.halves[target] = (activeRouletteBets.halves[target] || 0) + currentSelectedChip;
    markerId = `marker-half-${target}`;
  } else if (category === 'dozen') {
    activeRouletteBets.dozens[target] = (activeRouletteBets.dozens[target] || 0) + currentSelectedChip;
    markerId = `marker-dozen-${target}`;
  } else if (category === 'col') {
    activeRouletteBets.columns[target] = (activeRouletteBets.columns[target] || 0) + currentSelectedChip;
    markerId = `marker-col-${target}`;
  }

  const marker = document.getElementById(markerId);
  if (marker) {
    marker.classList.add('active');
    const currentVal = parseInt(marker.textContent || '0');
    marker.textContent = currentVal + currentSelectedChip;
  }

  updateRouletteTableTotal();
  logConsole(`Aposta de ${currentSelectedChip} Ficha(s) posicionada em [${category.toUpperCase()}: ${target}].`);
}

function updateRouletteTableTotal() {
  let total = 0;
  Object.values(activeRouletteBets.numbers).forEach(v => total += v);
  Object.values(activeRouletteBets.colors).forEach(v => total += v);
  Object.values(activeRouletteBets.even_odd).forEach(v => total += v);
  Object.values(activeRouletteBets.halves).forEach(v => total += v);
  Object.values(activeRouletteBets.dozens).forEach(v => total += v);
  Object.values(activeRouletteBets.columns).forEach(v => total += v);
  document.getElementById('rouletteTotalBetAmount').textContent = total;
  return total;
}

function clearRouletteBets() {
  if (isRouletteSpinning) return;
  playSound('click');
  const total = updateRouletteTableTotal();
  if (total > 0) {
    casinoChips += total;
    updateDisplays();
  }

  activeRouletteBets = { numbers: {}, colors: {}, even_odd: {}, halves: {}, dozens: {}, columns: {} };
  document.querySelectorAll('.chip-marker').forEach(m => {
    m.classList.remove('active');
    m.textContent = '';
  });

  updateRouletteTableTotal();
  logConsole("Todas as fichas foram recolhidas da mesa.", "log-warn");
}

function spinRouletteWheel() {
  if (isRouletteSpinning) return;
  const totalBet = updateRouletteTableTotal();
  if (totalBet === 0) {
    logConsole("Posicione ao menos uma ficha na mesa antes de girar!", "log-warn");
    return;
  }

  isRouletteSpinning = true;
  document.getElementById('btnSpinRoulette').disabled = true;
  document.getElementById('rouletteCenterNumber').textContent = '...';
  document.getElementById('rouletteCenterType').textContent = 'DESACELERANDO';

  const winningNumber = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
  const winningIndex = ROULETTE_NUMBERS.indexOf(winningNumber);
  const arc = (Math.PI * 2) / ROULETTE_NUMBERS.length;

  const targetWheelAngle = Math.PI * 8 + (Math.PI * 1.5 - winningIndex * arc - arc / 2);
  const startWheelAngle = wheelAngle % (Math.PI * 2);
  const totalWheelSpin = targetWheelAngle - startWheelAngle;

  let startTime = null;
  const duration = 5000;

  function animateRoulette(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    wheelAngle = startWheelAngle + totalWheelSpin * easeOut;
    ballAngle = startWheelAngle - (Math.PI * 14 * (1 - easeOut));
    ballRadiusProgress = 1 - Math.pow(progress, 2) * 0.45;

    if (Math.random() < 0.2) playSound('spinTick');
    drawRouletteWheel();

    if (progress < 1) {
      requestAnimationFrame(animateRoulette);
    } else {
      finalizeRouletteSpin(winningNumber);
    }
  }

  requestAnimationFrame(animateRoulette);
}

function finalizeRouletteSpin(winningNum) {
  isRouletteSpinning = false;
  document.getElementById('btnSpinRoulette').disabled = false;

  let numColor = 'black';
  if (winningNum === 0) numColor = 'zero';
  else if (RED_NUMBERS.includes(winningNum)) numColor = 'red';

  document.getElementById('rouletteCenterNumber').textContent = winningNum;
  document.getElementById('rouletteCenterType').textContent = numColor.toUpperCase();

  addRouletteHistory(winningNum, numColor);

  let totalWonChips = 0;

  if (activeRouletteBets.numbers[winningNum]) {
    totalWonChips += activeRouletteBets.numbers[winningNum] * 36;
  }

  if (winningNum !== 0) {
    if (activeRouletteBets.colors[numColor]) {
      totalWonChips += activeRouletteBets.colors[numColor] * 2;
    }
    const isEven = (winningNum % 2 === 0);
    if (isEven && activeRouletteBets.even_odd['even']) {
      totalWonChips += activeRouletteBets.even_odd['even'] * 2;
    } else if (!isEven && activeRouletteBets.even_odd['odd']) {
      totalWonChips += activeRouletteBets.even_odd['odd'] * 2;
    }
    if (winningNum <= 18 && activeRouletteBets.halves[1]) {
      totalWonChips += activeRouletteBets.halves[1] * 2;
    } else if (winningNum >= 19 && activeRouletteBets.halves[2]) {
      totalWonChips += activeRouletteBets.halves[2] * 2;
    }
    const dozen = Math.ceil(winningNum / 12);
    if (activeRouletteBets.dozens[dozen]) {
      totalWonChips += activeRouletteBets.dozens[dozen] * 3;
    }
    let col = winningNum % 3;
    if (col === 0) col = 3;
    if (activeRouletteBets.columns[col]) {
      totalWonChips += activeRouletteBets.columns[col] * 3;
    }
  }

  if (totalWonChips > 0) {
    casinoChips += totalWonChips;
    updateDisplays();
    playSound('win');
    logConsole(`VITÓRIA NA ROLETA! Setor [${winningNum} - ${numColor.toUpperCase()}]. Ganhou +${totalWonChips} Fichas!`, "log-win");
  } else {
    playSound('loss');
    logConsole(`Setor [${winningNum} - ${numColor.toUpperCase()}]. Nenhuma aposta vencedora.`, "log-loss");
  }

  activeRouletteBets = { numbers: {}, colors: {}, even_odd: {}, halves: {}, dozens: {}, columns: {} };
  document.querySelectorAll('.chip-marker').forEach(m => {
    m.classList.remove('active');
    m.textContent = '';
  });
  updateRouletteTableTotal();
}

function addRouletteHistory(num, color) {
  const container = document.getElementById('rouletteHistory');
  const chip = document.createElement('div');
  chip.className = `hist-badge hist-${color}`;
  chip.textContent = num;
  container.prepend(chip);
  if (container.children.length > 8) {
    container.removeChild(container.lastChild);
  }
}

// ==========================================================================
// 7. MOTOR DE CARTAS & BLACKJACK 21
// ==========================================================================
const CARD_SUITS = [
  { name: 'kyber', symbol: '♦', isRed: true },
  { name: 'plasma', symbol: '♥', isRed: true },
  { name: 'beskar', symbol: '♠', isRed: false },
  { name: 'coaxium', symbol: '♣', isRed: false }
];

const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function createShuffledDeck() {
  const deck = [];
  for (let s of CARD_SUITS) {
    for (let r of CARD_RANKS) {
      let val = parseInt(r);
      if (['J', 'Q', 'K'].includes(r)) val = 10;
      if (r === 'A') val = 11;
      deck.push({ rank: r, suit: s, value: val });
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

let bjDeck = [];
let bjPlayerHand = [];
let bjDealerHand = [];
let bjCurrentBet = 10;
let bjGameActive = false;

function getHandScore(hand) {
  let score = 0;
  let aces = 0;
  for (let card of hand) {
    score += card.value;
    if (card.rank === 'A') aces++;
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

function adjustBjBet(delta) {
  if (bjGameActive) return;
  playSound('click');
  const input = document.getElementById('bjBetInput');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > casinoChips) val = Math.max(1, casinoChips);
  input.value = val;
}

function setBjBetMax() {
  if (bjGameActive) return;
  playSound('chip');
  document.getElementById('bjBetInput').value = Math.max(1, casinoChips);
}

function renderBjCard(card, isHidden = false) {
  const div = document.createElement('div');
  div.className = `holo-card ${card.suit.isRed ? 'red-suit' : ''} ${isHidden ? 'card-hidden' : ''}`;
  div.innerHTML = `
    <div class="card-top"><span class="card-val">${card.rank}</span></div>
    <div class="card-symbol">${card.suit.symbol}</div>
    <div class="card-bottom"><span class="card-val">${card.rank}</span></div>
  `;
  return div;
}

function startBlackjackHand() {
  if (bjGameActive) return;
  const bet = parseInt(document.getElementById('bjBetInput').value) || 0;

  if (bet <= 0 || bet > casinoChips) {
    playSound('loss');
    logConsole("Saldo em fichas insuficiente para esta rodada de Blackjack!", "log-loss");
    return;
  }

  casinoChips -= bet;
  bjCurrentBet = bet;
  updateDisplays();

  bjDeck = createShuffledDeck();
  bjPlayerHand = [bjDeck.pop(), bjDeck.pop()];
  bjDealerHand = [bjDeck.pop(), bjDeck.pop()];
  bjGameActive = true;

  playSound('card');

  document.getElementById('bjBetControls').style.display = 'none';
  document.getElementById('bjPlayActions').style.display = 'flex';
  document.getElementById('bjStatusBadge').textContent = `MÃO EM ANDAMENTO (APOSTA: ${bjCurrentBet} FICHAS)`;
  document.getElementById('btnBjDouble').disabled = (casinoChips < bjCurrentBet);

  renderBjTable(true);

  const pScore = getHandScore(bjPlayerHand);
  if (pScore === 21) {
    setTimeout(() => {
      finishBlackjackRound();
    }, 800);
  }
}

function renderBjTable(hideDealerSecondCard = false) {
  const pContainer = document.getElementById('playerCards');
  const dContainer = document.getElementById('dealerCards');
  pContainer.innerHTML = '';
  dContainer.innerHTML = '';

  bjPlayerHand.forEach(card => pContainer.appendChild(renderBjCard(card)));

  bjDealerHand.forEach((card, idx) => {
    const isHidden = (idx === 1 && hideDealerSecondCard);
    dContainer.appendChild(renderBjCard(card, isHidden));
  });

  const pScore = getHandScore(bjPlayerHand);
  document.getElementById('playerScore').textContent = `PONTOS: ${pScore}`;

  if (hideDealerSecondCard) {
    document.getElementById('dealerScore').textContent = `PONTOS: ${bjDealerHand[0].value} + ?`;
  } else {
    document.getElementById('dealerScore').textContent = `PONTOS: ${getHandScore(bjDealerHand)}`;
  }
}

function bjPlayerHit() {
  if (!bjGameActive) return;
  playSound('card');
  bjPlayerHand.push(bjDeck.pop());
  document.getElementById('btnBjDouble').disabled = true;

  renderBjTable(true);
  const pScore = getHandScore(bjPlayerHand);

  if (pScore > 21) {
    finishBlackjackRound();
  }
}

function bjPlayerStand() {
  if (!bjGameActive) return;
  playSound('click');
  finishBlackjackRound();
}

function bjPlayerDouble() {
  if (!bjGameActive || casinoChips < bjCurrentBet) return;
  casinoChips -= bjCurrentBet;
  bjCurrentBet *= 2;
  updateDisplays();

  playSound('chip');
  playSound('card');
  bjPlayerHand.push(bjDeck.pop());
  renderBjTable(true);

  finishBlackjackRound();
}

function finishBlackjackRound() {
  bjGameActive = false;

  let dScore = getHandScore(bjDealerHand);
  const pScore = getHandScore(bjPlayerHand);

  if (pScore <= 21) {
    while (dScore < 17) {
      bjDealerHand.push(bjDeck.pop());
      dScore = getHandScore(bjDealerHand);
    }
  }

  renderBjTable(false);

  let prize = 0;
  let statusText = '';

  const isPlayerBJ = (bjPlayerHand.length === 2 && pScore === 21);
  const isDealerBJ = (bjDealerHand.length === 2 && dScore === 21);

  if (pScore > 21) {
    statusText = `ESTOUROU! Você somou ${pScore}. Perda de ${bjCurrentBet} Fichas.`;
    playSound('loss');
    logConsole(statusText, 'log-loss');
  } else if (isPlayerBJ && !isDealerBJ) {
    prize = Math.floor(bjCurrentBet * 2.5);
    casinoChips += prize;
    statusText = `BLACKJACK NATURAL! Pagamento 3:2 -> Ganhou +${prize} Fichas!`;
    playSound('win');
    logConsole(statusText, 'log-win');
  } else if (dScore > 21) {
    prize = bjCurrentBet * 2;
    casinoChips += prize;
    statusText = `CRUPIÊ ESTOUROU (${dScore})! Vitória -> Ganhou +${prize} Fichas!`;
    playSound('win');
    logConsole(statusText, 'log-win');
  } else if (pScore > dScore) {
    prize = bjCurrentBet * 2;
    casinoChips += prize;
    statusText = `VITÓRIA TÁTICA! ${pScore} contra ${dScore} do Crupiê -> +${prize} Fichas!`;
    playSound('win');
    logConsole(statusText, 'log-win');
  } else if (pScore === dScore) {
    prize = bjCurrentBet;
    casinoChips += prize;
    statusText = `EMPATE (PUSH)! Ambos somaram ${pScore}. Fichas devolvidas.`;
    playSound('chip');
    logConsole(statusText, 'log-info');
  } else {
    statusText = `CRUPIÊ VENCEU com ${dScore} contra seus ${pScore}. -${bjCurrentBet} Fichas.`;
    playSound('loss');
    logConsole(statusText, 'log-loss');
  }

  updateDisplays();
  document.getElementById('bjStatusBadge').textContent = statusText;

  document.getElementById('bjBetControls').style.display = 'flex';
  document.getElementById('bjPlayActions').style.display = 'none';
}

// ==========================================================================
// 8. MÓDULO TEXAS HOLD'EM 1v1 (COM SISTEMA DE ALL-IN)
// ==========================================================================
const RANK_VALUES_POKER = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

let pokerState = {
  active: false,
  phase: 'preflop', // 'preflop', 'flop', 'turn', 'river', 'showdown'
  deck: [],
  playerHand: [],
  dealerHand: [],
  communityCards: [],
  pot: 0,
  playerRoundBet: 0,
  dealerRoundBet: 0,
  currentHighBet: 0,
  minRaise: 10,
  isAllIn: false
};

function adjustPokerBlind(delta) {
  if (pokerState.active) return;
  playSound('click');
  const input = document.getElementById('pokerBlindInput');
  let val = parseInt(input.value) + delta;
  if (val < 2) val = 2;
  if (val > casinoChips) val = Math.max(2, casinoChips);
  input.value = val;
}

function setPokerBlindMax() {
  if (pokerState.active) return;
  playSound('chip');
  document.getElementById('pokerBlindInput').value = Math.max(2, casinoChips);
}

// Avaliador Universal de Mãos de Poker (Texas Hold'em 7 cartas)
function evaluatePokerHand(allCards) {
  const cards = allCards.map(c => ({
    rank: c.rank,
    val: RANK_VALUES_POKER[c.rank],
    suit: c.suit.name
  }));

  function get5CardCombinations(arr) {
    const results = [];
    function helper(start, combo) {
      if (combo.length === 5) {
        results.push(combo);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        helper(i + 1, combo.concat([arr[i]]));
      }
    }
    helper(0, []);
    return results;
  }

  function score5Cards(hand) {
    hand.sort((a, b) => b.val - a.val);

    const isFlush = hand.every(c => c.suit === hand[0].suit);
    let isStraight = false;
    let straightHigh = 0;
    const uniqueVals = [...new Set(hand.map(c => c.val))];

    if (uniqueVals.length === 5) {
      if (uniqueVals[0] - uniqueVals[4] === 4) {
        isStraight = true;
        straightHigh = uniqueVals[0];
      } else if (uniqueVals[0] === 14 && uniqueVals[1] === 5 && uniqueVals[2] === 4 && uniqueVals[3] === 3 && uniqueVals[4] === 2) {
        isStraight = true;
        straightHigh = 5;
      }
    }

    const counts = {};
    hand.forEach(c => counts[c.val] = (counts[c.val] || 0) + 1);
    const countPairs = Object.entries(counts).map(([v, count]) => ({ val: parseInt(v), count }));
    countPairs.sort((a, b) => b.count - a.count || b.val - a.val);

    if (isFlush && isStraight) {
      if (straightHigh === 14) return { rank: 9, name: 'Royal Flush', score: 9000000 + straightHigh };
      return { rank: 8, name: 'Straight Flush', score: 8000000 + straightHigh };
    }

    if (countPairs[0].count === 4) {
      return { rank: 7, name: 'Quadra (Four of a Kind)', score: 7000000 + countPairs[0].val * 100 + countPairs[1].val };
    }

    if (countPairs[0].count === 3 && countPairs[1].count === 2) {
      return { rank: 6, name: 'Full House', score: 6000000 + countPairs[0].val * 100 + countPairs[1].val };
    }

    if (isFlush) {
      const tieBreaker = hand.reduce((acc, c, idx) => acc + c.val * Math.pow(15, 4 - idx), 0);
      return { rank: 5, name: 'Flush Galáctico', score: 5000000 + tieBreaker };
    }

    if (isStraight) {
      return { rank: 4, name: 'Sequência (Straight)', score: 4000000 + straightHigh };
    }

    if (countPairs[0].count === 3) {
      return { rank: 3, name: 'Trinca (3 of a Kind)', score: 3000000 + countPairs[0].val * 1000 + countPairs[1].val * 15 + countPairs[2].val };
    }

    if (countPairs[0].count === 2 && countPairs[1].count === 2) {
      return { rank: 2, name: 'Dois Pares', score: 2000000 + countPairs[0].val * 1000 + countPairs[1].val * 50 + countPairs[2].val };
    }

    if (countPairs[0].count === 2) {
      return { rank: 1, name: 'Um Par', score: 1000000 + countPairs[0].val * 10000 + countPairs[1].val * 200 + countPairs[2].val * 15 + countPairs[3].val };
    }

    const tieBreaker = hand.reduce((acc, c, idx) => acc + c.val * Math.pow(15, 4 - idx), 0);
    return { rank: 0, name: `Carta Alta (${hand[0].rank})`, score: tieBreaker };
  }

  const allCombos = get5CardCombinations(cards);
  let bestScore = { rank: -1, score: -1, name: '' };

  for (let combo of allCombos) {
    const evaluated = score5Cards(combo);
    if (evaluated.score > bestScore.score) {
      bestScore = evaluated;
    }
  }

  return bestScore;
}

// Inicia a Mão de Hold'em
function startHoldemHand() {
  if (pokerState.active) return;
  const blind = parseInt(document.getElementById('pokerBlindInput').value) || 10;

  if (blind > casinoChips || blind <= 0) {
    playSound('loss');
    logConsole("Fichas insuficientes para os Blinds do Pôquer!", "log-loss");
    return;
  }

  casinoChips -= blind;
  updateDisplays();

  pokerState.active = true;
  pokerState.isAllIn = false;
  pokerState.phase = 'preflop';
  pokerState.deck = createShuffledDeck();
  pokerState.playerHand = [pokerState.deck.pop(), pokerState.deck.pop()];
  pokerState.dealerHand = [pokerState.deck.pop(), pokerState.deck.pop()];
  pokerState.communityCards = [];
  pokerState.pot = blind * 2;
  pokerState.playerRoundBet = blind;
  pokerState.dealerRoundBet = blind;
  pokerState.currentHighBet = blind;
  pokerState.minRaise = Math.max(5, blind);

  playSound('card');

  document.getElementById('pokerStartControls').style.display = 'none';
  document.getElementById('pokerTurnActions').style.display = 'flex';
  document.getElementById('pokerDealerEval').textContent = "CARTAS OCULTAS";
  
  updatePokerHUD();
  renderPokerTable(true);
  updatePokerTurnButtons();
}

function updatePokerHUD() {
  document.getElementById('pokerPotValue').textContent = pokerState.pot;
  document.getElementById('pokerPlayerBetTag').textContent = `APOSTADO: ${pokerState.playerRoundBet} FG`;
  document.getElementById('pokerDealerBetTag').textContent = `APOSTADO: ${pokerState.dealerRoundBet} FG`;
  document.getElementById('pokerPhaseIndicator').textContent = `FASE: ${pokerState.phase.toUpperCase()}`;

  const toCall = pokerState.currentHighBet - pokerState.playerRoundBet;
  document.getElementById('pokerToCallAmount').textContent = toCall;
  document.getElementById('pokerCallBtnAmount').textContent = toCall;
  document.getElementById('pokerAllInBtnAmount').textContent = casinoChips;

  // Avalia mão atual do jogador
  const playerEvalCards = [...pokerState.playerHand, ...pokerState.communityCards];
  if (playerEvalCards.length >= 5) {
    const ev = evaluatePokerHand(playerEvalCards);
    document.getElementById('pokerPlayerEval').textContent = `MÃO: ${ev.name.toUpperCase()}`;
  } else {
    document.getElementById('pokerPlayerEval').textContent = `MÃO: ${pokerState.playerHand[0].rank} & ${pokerState.playerHand[1].rank}`;
  }
}

function updatePokerTurnButtons() {
  const toCall = pokerState.currentHighBet - pokerState.playerRoundBet;
  
  if (toCall === 0) {
    document.getElementById('btnPokerCheck').style.display = 'inline-flex';
    document.getElementById('btnPokerCall').style.display = 'none';
  } else {
    document.getElementById('btnPokerCheck').style.display = 'none';
    document.getElementById('btnPokerCall').style.display = 'inline-flex';
    document.getElementById('btnPokerCall').disabled = (casinoChips < toCall);
  }

  const raiseInput = document.getElementById('pokerRaiseAmountInput');
  raiseInput.min = pokerState.minRaise;
  raiseInput.value = Math.max(pokerState.minRaise, toCall + pokerState.minRaise);

  document.getElementById('btnPokerRaise').disabled = (casinoChips <= toCall);
  document.getElementById('btnPokerAllIn').disabled = (casinoChips === 0);
}

function renderPokerTable(hideDealer = true) {
  const pCards = document.getElementById('pokerPlayerCards');
  const dCards = document.getElementById('pokerDealerCards');
  const cCards = document.getElementById('pokerCommunityCards');

  pCards.innerHTML = '';
  dCards.innerHTML = '';
  cCards.innerHTML = '';

  pokerState.playerHand.forEach(c => pCards.appendChild(renderBjCard(c)));
  pokerState.dealerHand.forEach(c => dCards.appendChild(renderBjCard(c, hideDealer)));
  pokerState.communityCards.forEach(c => cCards.appendChild(renderBjCard(c)));
}

// Ações do Jogador
function pokerActionFold() {
  if (!pokerState.active) return;
  playSound('loss');
  
  pokerState.active = false;
  document.getElementById('pokerStatusBadge').textContent = `VOCÊ DESISTIU (FOLD)! Pote de ${pokerState.pot} FG recolhido pelo Crupiê.`;
  logConsole(`PÔQUER: Você desistiu. Perda de ${pokerState.playerRoundBet} FG nesta mão.`, 'log-loss');

  endPokerHandUI();
}

function pokerActionCheck() {
  if (!pokerState.active) return;
  playSound('click');
  logConsole("PÔQUER: Você deu Mesa (Check).", "log-info");

  dealerTurnDecision('check');
}

function pokerActionCall() {
  if (!pokerState.active) return;
  const toCall = pokerState.currentHighBet - pokerState.playerRoundBet;
  
  if (casinoChips < toCall) {
    playSound('loss');
    logConsole("Fichas insuficientes para pagar a aposta!", "log-loss");
    return;
  }

  casinoChips -= toCall;
  pokerState.playerRoundBet += toCall;
  pokerState.pot += toCall;
  updateDisplays();

  playSound('chip');
  logConsole(`PÔQUER: Você pagou (Call) ${toCall} FG.`, "log-info");

  advancePokerPhase();
}

function pokerActionRaise() {
  if (!pokerState.active) return;
  const raiseVal = parseInt(document.getElementById('pokerRaiseAmountInput').value) || pokerState.minRaise;
  const toCall = pokerState.currentHighBet - pokerState.playerRoundBet;
  const totalNeeded = toCall + raiseVal;

  if (casinoChips < totalNeeded) {
    playSound('loss');
    logConsole("Fichas insuficientes para aumentar a aposta! Use All-In.", "log-loss");
    return;
  }

  casinoChips -= totalNeeded;
  pokerState.playerRoundBet += totalNeeded;
  pokerState.pot += totalNeeded;
  pokerState.currentHighBet = pokerState.playerRoundBet;
  updateDisplays();

  playSound('chip');
  logConsole(`PÔQUER: Você aumentou (Raise) em +${raiseVal} FG! (Total apostado: ${pokerState.playerRoundBet} FG)`, "log-win");

  dealerTurnDecision('facing_raise', totalNeeded);
}

// SISTEMA DE ALL-IN DO JOGADOR
function pokerActionAllIn() {
  if (!pokerState.active || casinoChips <= 0) return;
  
  const allInAmount = casinoChips;
  casinoChips = 0;
  pokerState.playerRoundBet += allInAmount;
  pokerState.pot += allInAmount;
  pokerState.currentHighBet = Math.max(pokerState.currentHighBet, pokerState.playerRoundBet);
  pokerState.isAllIn = true;
  updateDisplays();

  playSound('allin');
  document.getElementById('pokerStatusBadge').textContent = `⚡ ALL-IN DO JOGADOR! ${allInAmount} FICHAS NO POTE!`;
  logConsole(`⚡ ALL-IN! Você arriscou todas as suas ${allInAmount} Fichas Galácticas!`, 'log-warn');
  
  updatePokerHUD();

  dealerTurnDecision('facing_allin', allInAmount);
}

// IA do Crupiê Androide
function dealerTurnDecision(context, raiseAmount = 0) {
  updatePokerHUD();
  const currentDealerCards = [...pokerState.dealerHand, ...pokerState.communityCards];
  let dealerStrength = 0;
  
  if (currentDealerCards.length >= 5) {
    const ev = evaluatePokerHand(currentDealerCards);
    dealerStrength = ev.rank;
  } else {
    const r1 = RANK_VALUES_POKER[pokerState.dealerHand[0].rank];
    const r2 = RANK_VALUES_POKER[pokerState.dealerHand[1].rank];
    if (r1 === r2) dealerStrength = 2;
    else if (r1 >= 10 || r2 >= 10) dealerStrength = 1;
  }

  setTimeout(() => {
    if (context === 'check') {
      if (dealerStrength >= 2 && Math.random() < 0.6) {
        const dBet = 10;
        pokerState.dealerRoundBet += dBet;
        pokerState.pot += dBet;
        pokerState.currentHighBet = pokerState.dealerRoundBet;
        playSound('chip');
        document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ APOSTOU ${dBet} FG! PAGUE (CALL), AUMENTE OU ALL-IN.`;
        logConsole(`CRUPIÊ: Apostou +${dBet} FG na mesa!`, 'log-warn');
        updatePokerHUD();
        updatePokerTurnButtons();
      } else {
        logConsole("CRUPIÊ: Deu Mesa (Check). Avançando rodada...", "log-info");
        advancePokerPhase();
      }
    } else if (context === 'facing_raise') {
      const toCallDealer = pokerState.currentHighBet - pokerState.dealerRoundBet;
      if (dealerStrength >= 1 || Math.random() < 0.45) {
        pokerState.dealerRoundBet += toCallDealer;
        pokerState.pot += toCallDealer;
        playSound('chip');
        logConsole(`CRUPIÊ: Pagou o seu Raise (+${toCallDealer} FG).`, "log-info");
        advancePokerPhase();
      } else {
        playSound('win');
        casinoChips += pokerState.pot;
        updateDisplays();
        document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ DESISTIU (FOLD)! Você venceu o pote de ${pokerState.pot} FG!`;
        logConsole(`PÔQUER: Crupiê desistiu! Você levou o pote de +${pokerState.pot} FG!`, 'log-win');
        pokerState.active = false;
        endPokerHandUI();
      }
    } else if (context === 'facing_allin') {
      const toCallDealer = pokerState.currentHighBet - pokerState.dealerRoundBet;
      
      if (dealerStrength >= 1 || (dealerStrength === 0 && Math.random() < 0.25)) {
        pokerState.dealerRoundBet += toCallDealer;
        pokerState.pot += toCallDealer;
        playSound('allin');
        document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ PAGOU SEU ALL-IN (+${toCallDealer} FG)! REVELANDO O BORDO...`;
        logConsole(`⚡ CRUPIÊ: Aceitou e pagou o seu ALL-IN! Distribuindo cartas restantes...`, 'log-warn');
        
        runAllInShowdownSequence();
      } else {
        playSound('win');
        casinoChips += pokerState.pot;
        updateDisplays();
        document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ FOLDOU DIANTE DO ALL-IN! Pote total de ${pokerState.pot} FG é seu!`;
        logConsole(`PÔQUER: Crupiê não pagou o All-In. Você recolheu +${pokerState.pot} FG!`, 'log-win');
        pokerState.active = false;
        endPokerHandUI();
      }
    }
  }, 750);
}

// Sequência dramática de cartas quando o All-In é pago
function runAllInShowdownSequence() {
  document.getElementById('pokerTurnActions').style.display = 'none';

  function revealNextCommunityCard() {
    if (pokerState.communityCards.length < 3) {
      pokerState.communityCards.push(pokerState.deck.pop(), pokerState.deck.pop(), pokerState.deck.pop());
    } else if (pokerState.communityCards.length < 5) {
      pokerState.communityCards.push(pokerState.deck.pop());
    }
    
    playSound('card');
    renderPokerTable(true);
    updatePokerHUD();

    if (pokerState.communityCards.length < 5) {
      setTimeout(revealNextCommunityCard, 900);
    } else {
      setTimeout(finalizePokerShowdown, 1000);
    }
  }

  setTimeout(revealNextCommunityCard, 800);
}

// Avanço Normal de Fases
function advancePokerPhase() {
  pokerState.playerRoundBet = 0;
  pokerState.dealerRoundBet = 0;
  pokerState.currentHighBet = 0;

  if (pokerState.phase === 'preflop') {
    pokerState.phase = 'flop';
    pokerState.communityCards.push(pokerState.deck.pop(), pokerState.deck.pop(), pokerState.deck.pop());
    playSound('card');
    document.getElementById('pokerStatusBadge').textContent = "FLOP NA MESA! AVALIE SUAS CARTAS E DEFINA A APOSTA.";
  } else if (pokerState.phase === 'flop') {
    pokerState.phase = 'turn';
    pokerState.communityCards.push(pokerState.deck.pop());
    playSound('card');
    document.getElementById('pokerStatusBadge').textContent = "TURN NA MESA! QUARTA CARTA COMUNITÁRIA ABERTA.";
  } else if (pokerState.phase === 'turn') {
    pokerState.phase = 'river';
    pokerState.communityCards.push(pokerState.deck.pop());
    playSound('card');
    document.getElementById('pokerStatusBadge').textContent = "RIVER NA MESA! ÚLTIMA RODADA DE APOSTAS ANTES DO SHOWDOWN.";
  } else if (pokerState.phase === 'river') {
    finalizePokerShowdown();
    return;
  }

  renderPokerTable(true);
  updatePokerHUD();
  updatePokerTurnButtons();
}

function finalizePokerShowdown() {
  pokerState.phase = 'showdown';
  pokerState.active = false;

  renderPokerTable(false);

  const playerEval = evaluatePokerHand([...pokerState.playerHand, ...pokerState.communityCards]);
  const dealerEval = evaluatePokerHand([...pokerState.dealerHand, ...pokerState.communityCards]);

  document.getElementById('pokerPlayerEval').textContent = `SUA MÃO: ${playerEval.name.toUpperCase()}`;
  document.getElementById('pokerDealerEval').textContent = `CRUPIÊ: ${dealerEval.name.toUpperCase()}`;

  if (playerEval.score > dealerEval.score) {
    casinoChips += pokerState.pot;
    updateDisplays();
    playSound('win');
    const msg = `SHOWDOWN VITORIOSO! Seu ${playerEval.name} venceu ${dealerEval.name} do Crupiê! Ganhou o Pote de +${pokerState.pot} FG!`;
    document.getElementById('pokerStatusBadge').textContent = msg;
    logConsole(msg, 'log-win');
  } else if (playerEval.score === dealerEval.score) {
    const split = Math.floor(pokerState.pot / 2);
    casinoChips += split;
    updateDisplays();
    playSound('chip');
    const msg = `EMPATE NO SHOWDOWN (${playerEval.name})! Pote dividido: +${split} FG.`;
    document.getElementById('pokerStatusBadge').textContent = msg;
    logConsole(msg, 'log-info');
  } else {
    playSound('loss');
    const msg = `CRUPIÊ VENCEU NO SHOWDOWN com ${dealerEval.name} contra seu ${playerEval.name}. Pote perdido.`;
    document.getElementById('pokerStatusBadge').textContent = msg;
    logConsole(msg, 'log-loss');
  }

  endPokerHandUI();
}

function endPokerHandUI() {
  document.getElementById('pokerStartControls').style.display = 'flex';
  document.getElementById('pokerTurnActions').style.display = 'none';
}

// ==========================================================================
// 9. MÓDULO SLOTS MATRIX (EM FICHAS)
// ==========================================================================
const SLOT_SYMBOLS = ['⚔️', '💎', '🪐', '🚀', '⚡', '👾'];
let isSlotSpinning = false;

function buildSlotReels() {
  for (let c = 0; c < 3; c++) {
    const strip = document.querySelector(`#slotCol${c} .slot-reel-strip`);
    strip.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const sym = SLOT_SYMBOLS[i % SLOT_SYMBOLS.length];
      const div = document.createElement('div');
      div.className = 'slot-symbol-item';
      div.textContent = sym;
      strip.appendChild(div);
    }
  }
}

function adjustSlotBet(delta) {
  if (isSlotSpinning) return;
  playSound('click');
  const input = document.getElementById('slotBetInput');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > casinoChips) val = Math.max(1, casinoChips);
  input.value = val;
}

function setSlotBetMax() {
  if (isSlotSpinning) return;
  playSound('chip');
  document.getElementById('slotBetInput').value = Math.max(1, casinoChips);
}

function spinSlotMachine() {
  if (isSlotSpinning) return;
  const bet = parseInt(document.getElementById('slotBetInput').value);

  if (bet > casinoChips || bet <= 0) {
    logConsole("Fichas insuficientes para acionar as bobinas de Coaxium!", "log-loss");
    playSound('loss');
    return;
  }

  casinoChips -= bet;
  updateDisplays();
  isSlotSpinning = true;
  document.getElementById('btnSpinSlot').disabled = true;

  const results = [];

  for (let c = 0; c < 3; c++) {
    const targetIdx = Math.floor(Math.random() * SLOT_SYMBOLS.length);
    results.push(SLOT_SYMBOLS[targetIdx]);
    
    const strip = document.querySelector(`#slotCol${c} .slot-reel-strip`);
    const offset = (10 + targetIdx) * 150;
    
    strip.style.transition = `transform ${2.5 + c * 0.5}s cubic-bezier(0.1, 0.9, 0.2, 1)`;
    strip.style.transform = `translateY(-${offset}px)`;
  }

  setTimeout(() => {
    isSlotSpinning = false;
    document.getElementById('btnSpinSlot').disabled = false;

    const [s1, s2, s3] = results;
    if (s1 === s2 && s2 === s3) {
      let mult = 10;
      if (s1 === '⚔️') mult = 50;
      else if (s1 === '💎') mult = 25;
      else if (s1 === '🪐') mult = 15;
      else if (s1 === '🚀') mult = 10;
      else if (s1 === '⚡') mult = 5;

      const prize = bet * mult;
      casinoChips += prize;
      updateDisplays();
      playSound('win');
      logConsole(`HIPER-ALINHAMENTO TRIPLO [${s1} ${s2} ${s3}]! Ganhou +${prize} Fichas (x${mult})!`, "log-win");
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      const prize = bet * 2;
      casinoChips += prize;
      updateDisplays();
      playSound('win');
      logConsole(`Duplicata detectada [${s1} ${s2} ${s3}]. Retorno: +${prize} Fichas.`, "log-win");
    } else {
      playSound('loss');
      logConsole(`Sem alinhamento de Coaxium [${s1} ${s2} ${s3}]. -${bet} Fichas.`, "log-loss");
    }

    setTimeout(() => {
      for (let c = 0; c < 3; c++) {
        const strip = document.querySelector(`#slotCol${c} .slot-reel-strip`);
        strip.style.transition = 'none';
        strip.style.transform = 'translateY(0px)';
      }
    }, 1000);

  }, 3600);
}

// ==========================================================================
// 10. MÓDULO DADOS SABACC 3D (EM FICHAS)
// ==========================================================================
let isSabaccRolling = false;

function rollSabaccDice(choice) {
  if (isSabaccRolling) return;
  const bet = parseInt(document.getElementById('sabaccBetInput').value);

  if (bet > casinoChips || bet <= 0) {
    logConsole("Fichas insuficientes para apostar nos dados!", "log-loss");
    playSound('loss');
    return;
  }

  casinoChips -= bet;
  updateDisplays();
  isSabaccRolling = true;
  playSound('spinTick');

  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const sum = d1 + d2;

  const cubeRotations = {
    1: { x: 0, y: 0 },
    2: { x: -90, y: 0 },
    3: { x: 0, y: -90 },
    4: { x: 0, y: 90 },
    5: { x: 90, y: 0 },
    6: { x: 0, y: 180 }
  };

  const rot1 = cubeRotations[d1];
  const rot2 = cubeRotations[d2];

  const cube1 = document.getElementById('cube1');
  const cube2 = document.getElementById('cube2');

  cube1.style.transform = `rotateX(${rot1.x + 720}deg) rotateY(${rot1.y + 720}deg)`;
  cube2.style.transform = `rotateX(${rot2.x + 1080}deg) rotateY(${rot2.y + 1080}deg)`;

  setTimeout(() => {
    isSabaccRolling = false;
    document.getElementById('sabaccDie1Val').textContent = d1;
    document.getElementById('sabaccDie2Val').textContent = d2;
    document.getElementById('sabaccSumVal').textContent = sum;

    let won = false;
    let mult = 0;

    if (choice === 'low' && sum >= 2 && sum <= 6) {
      won = true;
      mult = 2.0;
    } else if (choice === 'high' && sum >= 8 && sum <= 12) {
      won = true;
      mult = 2.0;
    } else if (choice === 'seven' && sum === 7) {
      won = true;
      mult = 4.5;
    } else if (choice === 'double' && d1 === d2) {
      won = true;
      mult = 5.5;
    }

    if (won) {
      const prize = Math.floor(bet * mult);
      casinoChips += prize;
      updateDisplays();
      playSound('win');
      logConsole(`SABACC VITORIOSO! Dados [${d1}, ${d2}] -> Soma ${sum}. Ganhou +${prize} Fichas (x${mult})!`, "log-win");
    } else {
      playSound('loss');
      logConsole(`Dados [${d1}, ${d2}] -> Soma ${sum}. Aposta perdida: -${bet} Fichas.`, "log-loss");
    }
  }, 2200);
}

// Inicialização Global
window.addEventListener('DOMContentLoaded', () => {
  initRouletteBoard();
  buildSlotReels();
  updateDisplays();
});