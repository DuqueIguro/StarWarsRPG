/* ==========================================================================
   DATAPAD CASINO - LÓGICA DE JOGOS & SINTETIZADOR WEB AUDIO
   ========================================================================== */

// Estado Global do Jogador
let galacticCredits = 5000;
let audioMuted = false;
let currentSelectedChip = 10;

// Ordem dos números na Roleta Europeia real
const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

// Armazenamento de apostas na mesa da Roleta
let activeRouletteBets = {
  numbers: {},      // { "0": 50, "17": 100 }
  colors: {},       // { "red": 100, "black": 0 }
  even_odd: {},     // { "even": 50, "odd": 0 }
  halves: {},       // { "1": 50, "2": 0 } (1-18, 19-36)
  dozens: {},       // { "1": 100, "2": 0, "3": 0 }
  columns: {}       // { "1": 50, "2": 0, "3": 0 }
};

let isRouletteSpinning = false;
let rouletteHistoryList = [];

// ==========================================================================
// 1. MOTOR DE ÁUDIO SINTETIZADO (Web Audio API)
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
    } else if (type === 'spinTick') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
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
// 2. FUNDO CANVAS DE HIPERESPAÇO
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
// 3. UTILITÁRIOS GERAIS & NAVEGAÇÃO
// ==========================================================================
function updateCreditDisplay() {
  document.getElementById('creditBalance').textContent = galacticCredits.toLocaleString('pt-BR');
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

function switchGame(gameId, buttonElement) {
  playSound('click');
  document.querySelectorAll('.game-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-module').forEach(b => b.classList.remove('active'));
  
  document.getElementById(`game-${gameId}`).classList.add('active');
  buttonElement.classList.add('active');
  logConsole(`Interface alternada para o setor: ${gameId.toUpperCase()}`);
}

function voltarInicio() {
  playSound('click');
  logConsole("Comando recebido: Retornar ao Terminal Principal.");
  alert("Redirecionando para o Terminal Central / Hangar Principal...");
  // window.location.href = "index.html";
}

// ==========================================================================
// 4. MÓDULO ROLETA EUROPEIA COMPLETA
// ==========================================================================
const rCanvas = document.getElementById('rouletteCanvas');
const rCtx = rCanvas.getContext('2d');
let wheelAngle = 0;
let ballAngle = 0;
let ballRadiusProgress = 1; // 1 = borda externa, 0 = bolso do número

function drawRouletteWheel() {
  const cx = rCanvas.width / 2;
  const cy = rCanvas.height / 2;
  const radius = cx - 8;
  const numSegments = ROULETTE_NUMBERS.length;
  const arc = (Math.PI * 2) / numSegments;

  rCtx.clearRect(0, 0, rCanvas.width, rCanvas.height);

  // Anel Externo Metálico
  rCtx.save();
  rCtx.translate(cx, cy);
  rCtx.rotate(wheelAngle);

  for (let i = 0; i < numSegments; i++) {
    const num = ROULETTE_NUMBERS[i];
    const angle = i * arc;

    // Cor do Bolso
    if (num === 0) {
      rCtx.fillStyle = '#008a47'; // Verde
    } else if (RED_NUMBERS.includes(num)) {
      rCtx.fillStyle = '#b01030'; // Vermelho
    } else {
      rCtx.fillStyle = '#101622'; // Preto
    }

    rCtx.beginPath();
    rCtx.moveTo(0, 0);
    rCtx.arc(0, 0, radius, angle, angle + arc);
    rCtx.closePath();
    rCtx.fill();
    rCtx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    rCtx.lineWidth = 1;
    rCtx.stroke();

    // Texto do Número
    rCtx.save();
    rCtx.rotate(angle + arc / 2);
    rCtx.fillStyle = '#ffffff';
    rCtx.font = 'bold 11px Orbitron';
    rCtx.textAlign = 'right';
    rCtx.fillText(num, radius - 12, 4);
    rCtx.restore();
  }

  rCtx.restore();

  // Desenhar Bolinha Quântica de Plasma
  if (ballRadiusProgress > 0) {
    const bR = 60 + (radius - 75) * ballRadiusProgress;
    const bx = cx + Math.cos(ballAngle) * bR;
    const by = cy + Math.sin(ballAngle) * bR;

    rCtx.save();
    rCtx.beginPath();
    rCtx.arc(bx, by, 6, 0, Math.PI * 2);
    rCtx.fillStyle = '#00f0ff';
    rCtx.shadowColor = '#00f0ff';
    rCtx.shadowBlur = 12;
    rCtx.fill();
    rCtx.restore();
  }
}

// Inicializar Tabuleiro da Roleta
function initRouletteBoard() {
  const grid = document.getElementById('rouletteNumbersGrid');
  grid.innerHTML = '';

  // Organizar em 3 linhas:
  // Linha 1: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36
  // Linha 2: 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35
  // Linha 3: 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34
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
  playSound('chip');
  currentSelectedChip = amount;
  document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
  elem.classList.add('active');
}

function placeRouletteBet(category, target) {
  if (isRouletteSpinning) return;
  playSound('chip');

  if (galacticCredits < currentSelectedChip) {
    logConsole("Créditos Galácticos insuficientes para posicionar ficha!", "log-loss");
    playSound('loss');
    return;
  }

  galacticCredits -= currentSelectedChip;
  updateCreditDisplay();

  // Registrar aposta no modelo
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

  // Atualizar marcador visual
  const marker = document.getElementById(markerId);
  if (marker) {
    marker.classList.add('active');
    const currentVal = parseInt(marker.textContent || '0');
    marker.textContent = currentVal + currentSelectedChip;
  }

  updateRouletteTableTotal();
  logConsole(`Aposta de ${currentSelectedChip} CG posicionada em [${category.toUpperCase()}: ${target}].`);
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
    galacticCredits += total;
    updateCreditDisplay();
  }

  activeRouletteBets = {
    numbers: {}, colors: {}, even_odd: {}, halves: {}, dozens: {}, columns: {}
  };

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

  // Escolhe número vencedor
  const winningNumber = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
  const winningIndex = ROULETTE_NUMBERS.indexOf(winningNumber);
  const arc = (Math.PI * 2) / ROULETTE_NUMBERS.length;

  // Ângulo final onde o número ficará alinhado
  const targetWheelAngle = Math.PI * 8 + (Math.PI * 1.5 - winningIndex * arc - arc / 2);
  const startWheelAngle = wheelAngle % (Math.PI * 2);
  const totalWheelSpin = targetWheelAngle - startWheelAngle;

  let startTime = null;
  const duration = 5000; // 5 segundos de giro suave

  function animateRoulette(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing cúbico suave
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

  // Adicionar ao Histórico
  addRouletteHistory(winningNum, numColor);

  // Calcular Pagamentos
  let totalWon = 0;

  // 1. Números Plenos (36x)
  if (activeRouletteBets.numbers[winningNum]) {
    totalWon += activeRouletteBets.numbers[winningNum] * 36;
  }

  if (winningNum !== 0) {
    // 2. Cores (2x)
    if (activeRouletteBets.colors[numColor]) {
      totalWon += activeRouletteBets.colors[numColor] * 2;
    }
    // 3. Par / Ímpar (2x)
    const isEven = (winningNum % 2 === 0);
    if (isEven && activeRouletteBets.even_odd['even']) {
      totalWon += activeRouletteBets.even_odd['even'] * 2;
    } else if (!isEven && activeRouletteBets.even_odd['odd']) {
      totalWon += activeRouletteBets.even_odd['odd'] * 2;
    }
    // 4. Metades 1-18 / 19-36 (2x)
    if (winningNum <= 18 && activeRouletteBets.halves[1]) {
      totalWon += activeRouletteBets.halves[1] * 2;
    } else if (winningNum >= 19 && activeRouletteBets.halves[2]) {
      totalWon += activeRouletteBets.halves[2] * 2;
    }
    // 5. Dúzias (3x)
    const dozen = Math.ceil(winningNum / 12);
    if (activeRouletteBets.dozens[dozen]) {
      totalWon += activeRouletteBets.dozens[dozen] * 3;
    }
    // 6. Colunas (3x)
    let col = winningNum % 3;
    if (col === 0) col = 3;
    if (activeRouletteBets.columns[col]) {
      totalWon += activeRouletteBets.columns[col] * 3;
    }
  }

  // Notificar e Atualizar
  if (totalWon > 0) {
    galacticCredits += totalWon;
    updateCreditDisplay();
    playSound('win');
    logConsole(`VITÓRIA NA ROLETA! Número [${winningNum} - ${numColor.toUpperCase()}]. Prêmio: +${totalWon} CG!`, "log-win");
  } else {
    playSound('loss');
    logConsole(`Número sorteado: [${winningNum} - ${numColor.toUpperCase()}]. Nenhuma aposta vencedora nesta rodada.`, "log-loss");
  }

  // Limpar marcadores após rodada
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
// 5. MÓDULO SLOTS MATRIX (CAÇA-NÍQUEL)
// ==========================================================================
const SLOT_SYMBOLS = ['⚔️', '💎', '🪐', '🚀', '⚡', '👾'];
let isSlotSpinning = false;

function buildSlotReels() {
  for (let c = 0; c < 3; c++) {
    const strip = document.querySelector(`#slotCol${c} .slot-reel-strip`);
    strip.innerHTML = '';
    // Monta 20 símbolos para o efeito de rolagem contínua
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
  playSound('click');
  const input = document.getElementById('slotBetInput');
  let val = parseInt(input.value) + delta;
  if (val < 10) val = 10;
  if (val > galacticCredits) val = galacticCredits;
  input.value = val;
}

function setSlotBetMax() {
  playSound('chip');
  document.getElementById('slotBetInput').value = Math.max(10, galacticCredits);
}

function spinSlotMachine() {
  if (isSlotSpinning) return;
  const bet = parseInt(document.getElementById('slotBetInput').value);

  if (bet > galacticCredits || bet <= 0) {
    logConsole("Créditos insuficientes para acionar as bobinas de Coaxium!", "log-loss");
    playSound('loss');
    return;
  }

  galacticCredits -= bet;
  updateCreditDisplay();
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

    // Verificar prêmios
    const [s1, s2, s3] = results;
    if (s1 === s2 && s2 === s3) {
      let mult = 10;
      if (s1 === '⚔️') mult = 50;
      else if (s1 === '💎') mult = 25;
      else if (s1 === '🪐') mult = 15;
      else if (s1 === '🚀') mult = 10;
      else if (s1 === '⚡') mult = 5;

      const prize = bet * mult;
      galacticCredits += prize;
      updateCreditDisplay();
      playSound('win');
      logConsole(`HIPER-ALINHAMENTO TRIPLO [${s1} ${s2} ${s3}]! Ganhou +${prize} CG (x${mult})!`, "log-win");
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      const prize = bet * 2;
      galacticCredits += prize;
      updateCreditDisplay();
      playSound('win');
      logConsole(`Duplicata detectada [${s1} ${s2} ${s3}]. Retorno: +${prize} CG.`, "log-win");
    } else {
      playSound('loss');
      logConsole(`Sem alinhamento de Coaxium [${s1} ${s2} ${s3}]. -${bet} CG drenados.`, "log-loss");
    }

    // Reset da esteira suave
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
// 6. MÓDULO DADOS SABACC 3D
// ==========================================================================
let isSabaccRolling = false;

function rollSabaccDice(choice) {
  if (isSabaccRolling) return;
  const bet = parseInt(document.getElementById('sabaccBetInput').value);

  if (bet > galacticCredits || bet <= 0) {
    logConsole("Créditos Galácticos insuficientes para apostar nos dados!", "log-loss");
    playSound('loss');
    return;
  }

  galacticCredits -= bet;
  updateCreditDisplay();
  isSabaccRolling = true;
  playSound('spinTick');

  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const sum = d1 + d2;

  // Rotações 3D correspondentes aos lados do dado
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
      galacticCredits += prize;
      updateCreditDisplay();
      playSound('win');
      logConsole(`SABACC VITORIOSO! Dados [${d1}, ${d2}] -> Soma ${sum}. Prêmio: +${prize} CG (x${mult})!`, "log-win");
    } else {
      playSound('loss');
      logConsole(`Dados [${d1}, ${d2}] -> Soma ${sum}. Aposta em [${choice.toUpperCase()}] perdida. -${bet} CG.`, "log-loss");
    }
  }, 2200);
}

// Inicialização Global
window.addEventListener('DOMContentLoaded', () => {
  initRouletteBoard();
  buildSlotReels();
  updateCreditDisplay();
});