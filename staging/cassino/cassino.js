/* ==========================================================================
   DATAPAD CASINO - LÓGICA DE JOGOS, CÂMBIO & INTEGRAÇÃO SUPABASE
   ========================================================================== */

let imperialCredits = 0;
let casinoChips = 0;
let activeUser = null;
let activeCharacter = null;

let audioMuted = false;
let currentSelectedChip = 1;

function getSupabaseClient() {
  return typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient;
}

// 1. Inicialização de Sessão e Busca de Créditos / Fichas
async function initCasinoSession() {
  const client = getSupabaseClient();
  if (!client) {
    logConsole("Aviso: Supabase indisponível. Operando em modo offline.", "log-warn");
    return;
  }

  try {
    const { data: userData, error: userError } = await client.auth.getUser();
    if (userError || !userData?.user) {
      logConsole("Acesso anônimo: Faça login para salvar seu saldo na rede.", "log-warn");
      return;
    }

    activeUser = userData.user;

    const { data: charData, error: charError } = await client
      .from('personagens')
      .select('id, nome, creditos, fichas')
      .eq('user_id', activeUser.id)
      .limit(1)
      .maybeSingle();

    if (charData) {
      activeCharacter = charData;
      imperialCredits = parseInt(charData.creditos) || 0;
      casinoChips = parseInt(charData.fichas) || 0;
      updateDisplays();
      logConsole(`Operador conectado: <strong>${charData.nome}</strong>. Saldo sincronizado.`, "log-win");
    } else {
      logConsole("Nenhum registro de personagem vinculado a este usuário.", "log-warn");
    }
  } catch (err) {
    console.error("Erro ao sincronizar com Supabase:", err);
  }
}

// Atualizar saldo no banco de dados
async function persistirSaldoNoBanco() {
  const client = getSupabaseClient();
  if (!client || !activeCharacter) return;

  try {
    await client
      .from('personagens')
      .update({
        creditos: imperialCredits,
        fichas: casinoChips,
        updated_at: new Date().toISOString()
      })
      .eq('id', activeCharacter.id);
  } catch (err) {
    console.error("Erro ao salvar saldo:", err);
  }
}

// Registrar eventos no logs_cassino
async function registrarLogCassino(jogo, tipoEvento, descricao, deltaFichas = 0) {
  const client = getSupabaseClient();
  if (!client || !activeUser) return;

  try {
    await client.from('logs_cassino').insert([{
      user_id: activeUser.id,
      personagem_id: activeCharacter ? activeCharacter.id : null,
      jogo: jogo,
      tipo_evento: tipoEvento,
      descricao: descricao,
      delta_fichas: deltaFichas
    }]);
  } catch (err) {
    console.warn("Falha ao registrar log de cassino:", err);
  }
}

// ==========================================================================
// NAVEGAÇÃO & SAÍDA
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

async function voltarInicio() {
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
      const resgate = casinoChips * 10;
      const fichasDevolvidas = casinoChips;
      imperialCredits += resgate;
      casinoChips = 0;
      updateDisplays();
      await persistirSaldoNoBanco();
      await registrarLogCassino('CÂMBIO', 'RESGATE_TOTAL_SAIDA', `Resgatou ${fichasDevolvidas} FG por ${resgate} CI ao sair`, -fichasDevolvidas);
    }
  } else {
    await persistirSaldoNoBanco();
  }

  window.location.href = "../menu.html";
}

// ==========================================================================
// ÁUDIO & FUNDO VISUAL
// ==========================================================================
let audioCtx = null;
function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playSound(type) {
  if (audioMuted) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
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
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
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
  } catch (e) {}
}

function toggleAudio() {
  audioMuted = !audioMuted;
  document.getElementById('audioState').textContent = audioMuted ? 'MUDO' : 'LIGADO';
  document.getElementById('audioIcon').textContent = audioMuted ? '🔇' : '🔊';
  logConsole(`Sintetizador de áudio ${audioMuted ? 'desativado' : 'ativado'}.`, 'log-info');
}

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

function updateDisplays() {
  document.getElementById('imperialCreditsDisplay').textContent = imperialCredits.toLocaleString('pt-BR');
  document.getElementById('casinoChipsDisplay').textContent = casinoChips.toLocaleString('pt-BR');
}

function logConsole(msg, type = 'log-info') {
  const stream = document.getElementById('consoleStream');
  if (!stream) return;
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
// CÂMBIO GALÁCTICO
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
  input.value = amount === 'max' ? Math.floor(imperialCredits / 10) : amount;
  updateBuyCostPreview();
}

async function executeBuyChips() {
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
  logConsole(`CÂMBIO: -${cost} CI -> +${chipsToBuy} FG.`, 'log-win');

  await persistirSaldoNoBanco();
  await registrarLogCassino('CÂMBIO', 'COMPRA_FICHAS', `Comprou ${chipsToBuy} FG por ${cost} CI`, chipsToBuy);
  closeExchangeModal();
}

function updateSellReturnPreview() {
  const amount = parseInt(document.getElementById('sellChipsAmount').value) || 0;
  document.getElementById('sellReturnPreview').textContent = (amount * 10).toLocaleString('pt-BR');
}

function setSellChips(amount) {
  playSound('click');
  const input = document.getElementById('sellChipsAmount');
  input.value = amount === 'all' ? casinoChips : Math.min(amount, casinoChips);
  updateSellReturnPreview();
}

async function executeSellChips() {
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
  logConsole(`RESGATE: -${chipsToSell} FG -> +${revenue} CI.`, 'log-win');

  await persistirSaldoNoBanco();
  await registrarLogCassino('CÂMBIO', 'RESGATE_FICHAS', `Resgatou ${chipsToSell} FG recebendo ${revenue} CI`, -chipsToSell);
  closeExchangeModal();
}

// ==========================================================================
// ROLETA QUÂNTICA
// ==========================================================================
const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

let activeRouletteBets = { numbers: {}, colors: {}, even_odd: {}, halves: {}, dozens: {}, columns: {} };
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
  const arc = (Math.PI * 2) / ROULETTE_NUMBERS.length;

  rCtx.clearRect(0, 0, rCanvas.width, rCanvas.height);
  rCtx.save();
  rCtx.translate(cx, cy);
  rCtx.rotate(wheelAngle);

  for (let i = 0; i < ROULETTE_NUMBERS.length; i++) {
    const num = ROULETTE_NUMBERS[i];
    const angle = i * arc;
    rCtx.fillStyle = num === 0 ? '#008a47' : RED_NUMBERS.includes(num) ? '#b01030' : '#101622';
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
      const btn = document.createElement('button');
      btn.className = `bet-spot num-cell ${RED_NUMBERS.includes(num) ? 'red' : 'black'}`;
      btn.onclick = () => placeRouletteBet('number', num);
      btn.innerHTML = `<span>${num}</span><span class="chip-marker" id="marker-num-${num}"></span>`;
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
  if (casinoChips < currentSelectedChip) {
    logConsole("Fichas insuficientes! Abra a Casa de Câmbio.", "log-loss");
    playSound('loss');
    return;
  }

  playSound('chip');
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
    marker.textContent = parseInt(marker.textContent || '0') + currentSelectedChip;
  }

  updateRouletteTableTotal();
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
  logConsole("Apostas da mesa recolhidas.", "log-warn");
}

function spinRouletteWheel() {
  if (isRouletteSpinning) return;
  const totalBet = updateRouletteTableTotal();
  if (totalBet === 0) {
    logConsole("Posicione ao menos uma aposta na mesa!", "log-warn");
    return;
  }

  isRouletteSpinning = true;
  document.getElementById('btnSpinRoulette').disabled = true;
  document.getElementById('rouletteCenterNumber').textContent = '...';
  document.getElementById('rouletteCenterType').textContent = 'RODANDO';

  const winningNumber = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
  const winningIndex = ROULETTE_NUMBERS.indexOf(winningNumber);
  const arc = (Math.PI * 2) / ROULETTE_NUMBERS.length;
  const targetWheelAngle = Math.PI * 8 + (Math.PI * 1.5 - winningIndex * arc - arc / 2);
  const startWheelAngle = wheelAngle % (Math.PI * 2);
  const totalWheelSpin = targetWheelAngle - startWheelAngle;

  let startTime = null;
  function animateRoulette(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / 5000, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    wheelAngle = startWheelAngle + totalWheelSpin * easeOut;
    ballAngle = startWheelAngle - (Math.PI * 14 * (1 - easeOut));
    ballRadiusProgress = 1 - Math.pow(progress, 2) * 0.45;

    if (Math.random() < 0.2) playSound('spinTick');
    drawRouletteWheel();

    if (progress < 1) requestAnimationFrame(animateRoulette);
    else finalizeRouletteSpin(winningNumber, totalBet);
  }
  requestAnimationFrame(animateRoulette);
}

async function finalizeRouletteSpin(winningNum, totalBet) {
  isRouletteSpinning = false;
  document.getElementById('btnSpinRoulette').disabled = false;

  let numColor = winningNum === 0 ? 'zero' : RED_NUMBERS.includes(winningNum) ? 'red' : 'black';
  document.getElementById('rouletteCenterNumber').textContent = winningNum;
  document.getElementById('rouletteCenterType').textContent = numColor.toUpperCase();

  const container = document.getElementById('rouletteHistory');
  const chip = document.createElement('div');
  chip.className = `hist-badge hist-${numColor}`;
  chip.textContent = winningNum;
  container.prepend(chip);
  if (container.children.length > 8) container.removeChild(container.lastChild);

  let totalWonChips = 0;
  if (activeRouletteBets.numbers[winningNum]) totalWonChips += activeRouletteBets.numbers[winningNum] * 36;
  if (winningNum !== 0) {
    if (activeRouletteBets.colors[numColor]) totalWonChips += activeRouletteBets.colors[numColor] * 2;
    const isEven = (winningNum % 2 === 0);
    if (isEven && activeRouletteBets.even_odd['even']) totalWonChips += activeRouletteBets.even_odd['even'] * 2;
    else if (!isEven && activeRouletteBets.even_odd['odd']) totalWonChips += activeRouletteBets.even_odd['odd'] * 2;
    if (winningNum <= 18 && activeRouletteBets.halves[1]) totalWonChips += activeRouletteBets.halves[1] * 2;
    else if (winningNum >= 19 && activeRouletteBets.halves[2]) totalWonChips += activeRouletteBets.halves[2] * 2;
    const dozen = Math.ceil(winningNum / 12);
    if (activeRouletteBets.dozens[dozen]) totalWonChips += activeRouletteBets.dozens[dozen] * 3;
    let col = winningNum % 3 === 0 ? 3 : winningNum % 3;
    if (activeRouletteBets.columns[col]) totalWonChips += activeRouletteBets.columns[col] * 3;
  }

  casinoChips += totalWonChips;
  const delta = totalWonChips - totalBet;
  updateDisplays();

  if (totalWonChips > 0) {
    playSound('win');
    logConsole(`ROLETA: Venceu +${totalWonChips} FG no setor [${winningNum}]!`, "log-win");
    await registrarLogCassino('ROLETA', 'VITORIA', `Setor [${winningNum} - ${numColor}]. Apostou ${totalBet} FG e ganhou ${totalWonChips} FG`, delta);
  } else {
    playSound('loss');
    logConsole(`ROLETA: Setor [${winningNum}]. Perdeu ${totalBet} FG.`, "log-loss");
    await registrarLogCassino('ROLETA', 'DERROTA', `Setor [${winningNum} - ${numColor}]. Apostou e perdeu ${totalBet} FG`, delta);
  }

  await persistirSaldoNoBanco();

  activeRouletteBets = { numbers: {}, colors: {}, even_odd: {}, halves: {}, dozens: {}, columns: {} };
  document.querySelectorAll('.chip-marker').forEach(m => {
    m.classList.remove('active');
    m.textContent = '';
  });
  updateRouletteTableTotal();
}

// ==========================================================================
// BLACKJACK 21
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
      let val = ['J', 'Q', 'K'].includes(r) ? 10 : r === 'A' ? 11 : parseInt(r);
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
  let score = 0, aces = 0;
  for (let c of hand) {
    score += c.value;
    if (c.rank === 'A') aces++;
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
  let val = Math.max(1, Math.min(casinoChips, parseInt(input.value) + delta));
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
    logConsole("Saldo em fichas insuficiente!", "log-loss");
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
  document.getElementById('bjStatusBadge').textContent = `MÃO EM ANDAMENTO (APOSTA: ${bjCurrentBet} FG)`;
  document.getElementById('btnBjDouble').disabled = (casinoChips < bjCurrentBet);

  renderBjTable(true);
  if (getHandScore(bjPlayerHand) === 21) setTimeout(finishBlackjackRound, 800);
}

function renderBjTable(hideDealerSecondCard = false) {
  const pContainer = document.getElementById('playerCards');
  const dContainer = document.getElementById('dealerCards');
  pContainer.innerHTML = '';
  dContainer.innerHTML = '';

  bjPlayerHand.forEach(c => pContainer.appendChild(renderBjCard(c)));
  bjDealerHand.forEach((c, idx) => dContainer.appendChild(renderBjCard(c, idx === 1 && hideDealerSecondCard)));

  document.getElementById('playerScore').textContent = `PONTOS: ${getHandScore(bjPlayerHand)}`;
  document.getElementById('dealerScore').textContent = hideDealerSecondCard 
    ? `PONTOS: ${bjDealerHand[0].value} + ?` 
    : `PONTOS: ${getHandScore(bjDealerHand)}`;
}

function bjPlayerHit() {
  if (!bjGameActive) return;
  playSound('card');
  bjPlayerHand.push(bjDeck.pop());
  document.getElementById('btnBjDouble').disabled = true;
  renderBjTable(true);
  if (getHandScore(bjPlayerHand) > 21) finishBlackjackRound();
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
  bjPlayerHand.push(bjDeck.pop());
  renderBjTable(true);
  finishBlackjackRound();
}

async function finishBlackjackRound() {
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
  const isPlayerBJ = bjPlayerHand.length === 2 && pScore === 21;
  const isDealerBJ = bjDealerHand.length === 2 && dScore === 21;

  if (pScore > 21) {
    statusText = `ESTOUROU! Pontos: ${pScore}. -${bjCurrentBet} FG.`;
    playSound('loss');
    logConsole(statusText, 'log-loss');
    await registrarLogCassino('BLACKJACK', 'ESTOUROU', `Estourou com ${pScore} pontos contra ${dScore}`, -bjCurrentBet);
  } else if (isPlayerBJ && !isDealerBJ) {
    prize = Math.floor(bjCurrentBet * 2.5);
    casinoChips += prize;
    statusText = `BLACKJACK NATURAL! +${prize} FG!`;
    playSound('win');
    logConsole(statusText, 'log-win');
    await registrarLogCassino('BLACKJACK', 'BLACKJACK_NATURAL', `Blackjack natural! Recebeu ${prize} FG`, prize - bjCurrentBet);
  } else if (dScore > 21 || pScore > dScore) {
    prize = bjCurrentBet * 2;
    casinoChips += prize;
    statusText = `VITÓRIA! (${pScore} vs ${dScore}). +${prize} FG!`;
    playSound('win');
    logConsole(statusText, 'log-win');
    await registrarLogCassino('BLACKJACK', 'VITORIA', `Venceu o crupiê (${pScore} vs ${dScore}) recebendo ${prize} FG`, prize - bjCurrentBet);
  } else if (pScore === dScore) {
    prize = bjCurrentBet;
    casinoChips += prize;
    statusText = `EMPATE! ${pScore} pontos. Fichas devolvidas.`;
    playSound('chip');
    logConsole(statusText, 'log-info');
    await registrarLogCassino('BLACKJACK', 'EMPATE', `Empatou com ${pScore} pontos`, 0);
  } else {
    statusText = `CRUPIÊ VENCEU (${dScore} vs ${pScore}). -${bjCurrentBet} FG.`;
    playSound('loss');
    logConsole(statusText, 'log-loss');
    await registrarLogCassino('BLACKJACK', 'DERROTA', `Derrota (${pScore} vs ${dScore})`, -bjCurrentBet);
  }

  updateDisplays();
  await persistirSaldoNoBanco();

  document.getElementById('bjStatusBadge').textContent = statusText;
  document.getElementById('bjBetControls').style.display = 'flex';
  document.getElementById('bjPlayActions').style.display = 'none';
}

// ==========================================================================
// TEXAS HOLD'EM 1v1
// ==========================================================================
const RANK_VALUES_POKER = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };

let pokerState = {
  active: false,
  phase: 'preflop',
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
  input.value = Math.max(2, Math.min(casinoChips, parseInt(input.value) + delta));
}

function setPokerBlindMax() {
  if (pokerState.active) return;
  playSound('chip');
  document.getElementById('pokerBlindInput').value = Math.max(2, casinoChips);
}

function evaluatePokerHand(allCards) {
  const cards = allCards.map(c => ({ rank: c.rank, val: RANK_VALUES_POKER[c.rank], suit: c.suit.name }));
  function get5CardCombinations(arr) {
    const results = [];
    function helper(start, combo) {
      if (combo.length === 5) { results.push(combo); return; }
      for (let i = start; i < arr.length; i++) helper(i + 1, combo.concat([arr[i]]));
    }
    helper(0, []);
    return results;
  }

  function score5Cards(hand) {
    hand.sort((a, b) => b.val - a.val);
    const isFlush = hand.every(c => c.suit === hand[0].suit);
    let isStraight = false, straightHigh = 0;
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

    if (isFlush && isStraight) return { rank: straightHigh === 14 ? 9 : 8, name: straightHigh === 14 ? 'Royal Flush' : 'Straight Flush', score: 8000000 + straightHigh };
    if (countPairs[0].count === 4) return { rank: 7, name: 'Quadra', score: 7000000 + countPairs[0].val * 100 + countPairs[1].val };
    if (countPairs[0].count === 3 && countPairs[1].count === 2) return { rank: 6, name: 'Full House', score: 6000000 + countPairs[0].val * 100 + countPairs[1].val };
    if (isFlush) return { rank: 5, name: 'Flush', score: 5000000 + hand.reduce((a, c, i) => a + c.val * Math.pow(15, 4 - i), 0) };
    if (isStraight) return { rank: 4, name: 'Sequência', score: 4000000 + straightHigh };
    if (countPairs[0].count === 3) return { rank: 3, name: 'Trinca', score: 3000000 + countPairs[0].val * 1000 + countPairs[1].val * 15 + countPairs[2].val };
    if (countPairs[0].count === 2 && countPairs[1].count === 2) return { rank: 2, name: 'Dois Pares', score: 2000000 + countPairs[0].val * 1000 + countPairs[1].val * 50 + countPairs[2].val };
    if (countPairs[0].count === 2) return { rank: 1, name: 'Um Par', score: 1000000 + countPairs[0].val * 10000 + countPairs[1].val * 200 + countPairs[2].val * 15 + countPairs[3].val };

    return { rank: 0, name: `Carta Alta (${hand[0].rank})`, score: hand.reduce((a, c, i) => a + c.val * Math.pow(15, 4 - i), 0) };
  }

  return get5CardCombinations(cards).reduce((best, combo) => {
    const ev = score5Cards(combo);
    return ev.score > best.score ? ev : best;
  }, { rank: -1, score: -1, name: '' });
}

function startHoldemHand() {
  if (pokerState.active) return;
  const blind = parseInt(document.getElementById('pokerBlindInput').value) || 10;
  if (blind > casinoChips || blind <= 0) {
    playSound('loss');
    logConsole("Fichas insuficientes!", "log-loss");
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

  const playerEvalCards = [...pokerState.playerHand, ...pokerState.communityCards];
  document.getElementById('pokerPlayerEval').textContent = playerEvalCards.length >= 5
    ? `MÃO: ${evaluatePokerHand(playerEvalCards).name.toUpperCase()}`
    : `MÃO: ${pokerState.playerHand[0].rank} & ${pokerState.playerHand[1].rank}`;
}

function updatePokerTurnButtons() {
  const toCall = pokerState.currentHighBet - pokerState.playerRoundBet;
  document.getElementById('btnPokerCheck').style.display = toCall === 0 ? 'inline-flex' : 'none';
  document.getElementById('btnPokerCall').style.display = toCall === 0 ? 'none' : 'inline-flex';
  document.getElementById('btnPokerCall').disabled = (casinoChips < toCall);

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

async function pokerActionFold() {
  if (!pokerState.active) return;
  playSound('loss');
  pokerState.active = false;
  document.getElementById('pokerStatusBadge').textContent = `VOCÊ DESISTIU (FOLD)!`;
  logConsole(`PÔQUER: Desistência. Perda de ${pokerState.playerRoundBet} FG.`, 'log-loss');
  
  await persistirSaldoNoBanco();
  await registrarLogCassino('POKER', 'FOLD', `Desistiu da mão (Fold). Perda de ${pokerState.playerRoundBet} FG`, -pokerState.playerRoundBet);
  endPokerHandUI();
}

function pokerActionCheck() {
  if (!pokerState.active) return;
  playSound('click');
  dealerTurnDecision('check');
}

function pokerActionCall() {
  if (!pokerState.active) return;
  const toCall = pokerState.currentHighBet - pokerState.playerRoundBet;
  if (casinoChips < toCall) return;

  casinoChips -= toCall;
  pokerState.playerRoundBet += toCall;
  pokerState.pot += toCall;
  updateDisplays();
  playSound('chip');
  advancePokerPhase();
}

function pokerActionRaise() {
  if (!pokerState.active) return;
  const raiseVal = parseInt(document.getElementById('pokerRaiseAmountInput').value) || pokerState.minRaise;
  const toCall = pokerState.currentHighBet - pokerState.playerRoundBet;
  const totalNeeded = toCall + raiseVal;
  if (casinoChips < totalNeeded) return;

  casinoChips -= totalNeeded;
  pokerState.playerRoundBet += totalNeeded;
  pokerState.pot += totalNeeded;
  pokerState.currentHighBet = pokerState.playerRoundBet;
  updateDisplays();
  playSound('chip');
  dealerTurnDecision('facing_raise', totalNeeded);
}

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
  dealerTurnDecision('facing_allin', allInAmount);
}

function dealerTurnDecision(context, raiseAmount = 0) {
  updatePokerHUD();
  const currentDealerCards = [...pokerState.dealerHand, ...pokerState.communityCards];
  let dealerStrength = currentDealerCards.length >= 5 ? evaluatePokerHand(currentDealerCards).rank : 0;

  setTimeout(async () => {
    if (context === 'check') {
      if (dealerStrength >= 2 && Math.random() < 0.6) {
        const dBet = 10;
        pokerState.dealerRoundBet += dBet;
        pokerState.pot += dBet;
        pokerState.currentHighBet = pokerState.dealerRoundBet;
        playSound('chip');
        document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ APOSTOU ${dBet} FG!`;
        updatePokerHUD();
        updatePokerTurnButtons();
      } else {
        advancePokerPhase();
      }
    } else if (context === 'facing_raise') {
      const toCallDealer = pokerState.currentHighBet - pokerState.dealerRoundBet;
      if (dealerStrength >= 1 || Math.random() < 0.45) {
        pokerState.dealerRoundBet += toCallDealer;
        pokerState.pot += toCallDealer;
        playSound('chip');
        advancePokerPhase();
      } else {
        playSound('win');
        casinoChips += pokerState.pot;
        updateDisplays();
        document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ DESISTIU! Ganhou ${pokerState.pot} FG!`;
        pokerState.active = false;
        await persistirSaldoNoBanco();
        await registrarLogCassino('POKER', 'CRUPIE_FOLD', `Crupiê desistiu perante o Raise. Ganhou ${pokerState.pot} FG`, pokerState.pot - pokerState.playerRoundBet);
        endPokerHandUI();
      }
    } else if (context === 'facing_allin') {
      const toCallDealer = pokerState.currentHighBet - pokerState.dealerRoundBet;
      if (dealerStrength >= 1 || Math.random() < 0.3) {
        pokerState.dealerRoundBet += toCallDealer;
        pokerState.pot += toCallDealer;
        playSound('allin');
        runAllInShowdownSequence();
      } else {
        playSound('win');
        casinoChips += pokerState.pot;
        updateDisplays();
        document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ FOLDOU DIANTE DO ALL-IN! Ganhou ${pokerState.pot} FG!`;
        pokerState.active = false;
        await persistirSaldoNoBanco();
        await registrarLogCassino('POKER', 'ALLIN_FOLD', `Crupiê desistiu do All-In. Ganhou ${pokerState.pot} FG`, pokerState.pot - pokerState.playerRoundBet);
        endPokerHandUI();
      }
    }
  }, 750);
}

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

    if (pokerState.communityCards.length < 5) setTimeout(revealNextCommunityCard, 900);
    else setTimeout(finalizePokerShowdown, 1000);
  }
  setTimeout(revealNextCommunityCard, 800);
}

function advancePokerPhase() {
  pokerState.playerRoundBet = 0;
  pokerState.dealerRoundBet = 0;
  pokerState.currentHighBet = 0;

  if (pokerState.phase === 'preflop') {
    pokerState.phase = 'flop';
    pokerState.communityCards.push(pokerState.deck.pop(), pokerState.deck.pop(), pokerState.deck.pop());
  } else if (pokerState.phase === 'flop') {
    pokerState.phase = 'turn';
    pokerState.communityCards.push(pokerState.deck.pop());
  } else if (pokerState.phase === 'turn') {
    pokerState.phase = 'river';
    pokerState.communityCards.push(pokerState.deck.pop());
  } else if (pokerState.phase === 'river') {
    finalizePokerShowdown();
    return;
  }

  playSound('card');
  renderPokerTable(true);
  updatePokerHUD();
  updatePokerTurnButtons();
}

async function finalizePokerShowdown() {
  pokerState.phase = 'showdown';
  pokerState.active = false;
  renderPokerTable(false);

  const playerEval = evaluatePokerHand([...pokerState.playerHand, ...pokerState.communityCards]);
  const dealerEval = evaluatePokerHand([...pokerState.dealerHand, ...pokerState.communityCards]);

  document.getElementById('pokerPlayerEval').textContent = `SUA MÃO: ${playerEval.name.toUpperCase()}`;
  document.getElementById('pokerDealerEval').textContent = `CRUPIÊ: ${dealerEval.name.toUpperCase()}`;

  if (playerEval.score > dealerEval.score) {
    casinoChips += pokerState.pot;
    playSound('win');
    const msg = `SHOWDOWN VITORIOSO! (${playerEval.name}). Ganhou +${pokerState.pot} FG!`;
    document.getElementById('pokerStatusBadge').textContent = msg;
    logConsole(msg, 'log-win');
    await registrarLogCassino('POKER', 'VITORIA_SHOWDOWN', `Venceu showdown com ${playerEval.name} vs ${dealerEval.name}`, pokerState.pot - pokerState.playerRoundBet);
  } else if (playerEval.score === dealerEval.score) {
    const split = Math.floor(pokerState.pot / 2);
    casinoChips += split;
    playSound('chip');
    document.getElementById('pokerStatusBadge').textContent = `EMPATE NO SHOWDOWN! +${split} FG.`;
    await registrarLogCassino('POKER', 'EMPATE_SHOWDOWN', `Empate com ${playerEval.name}`, 0);
  } else {
    playSound('loss');
    document.getElementById('pokerStatusBadge').textContent = `CRUPIÊ VENCEU NO SHOWDOWN (${dealerEval.name}).`;
    await registrarLogCassino('POKER', 'DERROTA_SHOWDOWN', `Derrota no showdown (${playerEval.name} vs ${dealerEval.name})`, -pokerState.playerRoundBet);
  }

  updateDisplays();
  await persistirSaldoNoBanco();
  endPokerHandUI();
}

function endPokerHandUI() {
  document.getElementById('pokerStartControls').style.display = 'flex';
  document.getElementById('pokerTurnActions').style.display = 'none';
}

// ==========================================================================
// SLOTS MATRIX
// ==========================================================================
const SLOT_SYMBOLS = ['⚔️', '💎', '🪐', '🚀', '⚡', '👾'];
let isSlotSpinning = false;

function buildSlotReels() {
  for (let c = 0; c < 3; c++) {
    const strip = document.querySelector(`#slotCol${c} .slot-reel-strip`);
    strip.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const div = document.createElement('div');
      div.className = 'slot-symbol-item';
      div.textContent = SLOT_SYMBOLS[i % SLOT_SYMBOLS.length];
      strip.appendChild(div);
    }
  }
}

function adjustSlotBet(delta) {
  if (isSlotSpinning) return;
  playSound('click');
  const input = document.getElementById('slotBetInput');
  input.value = Math.max(1, Math.min(casinoChips, parseInt(input.value) + delta));
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
    logConsole("Fichas insuficientes!", "log-loss");
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
    strip.style.transition = `transform ${2.5 + c * 0.5}s cubic-bezier(0.1, 0.9, 0.2, 1)`;
    strip.style.transform = `translateY(-${(10 + targetIdx) * 150}px)`;
  }

  setTimeout(async () => {
    isSlotSpinning = false;
    document.getElementById('btnSpinSlot').disabled = false;
    const [s1, s2, s3] = results;

    if (s1 === s2 && s2 === s3) {
      let mult = s1 === '⚔️' ? 50 : s1 === '💎' ? 25 : s1 === '🪐' ? 15 : s1 === '🚀' ? 10 : 5;
      const prize = bet * mult;
      casinoChips += prize;
      updateDisplays();
      playSound('win');
      logConsole(`HIPER-ALINHAMENTO [${s1} ${s2} ${s3}]! +${prize} FG (x${mult})!`, "log-win");
      await registrarLogCassino('SLOTS', 'TRIPLO', `Alinhamento [${s1} ${s2} ${s3}] (x${mult}). Ganhou ${prize} FG`, prize - bet);
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      const prize = bet * 2;
      casinoChips += prize;
      updateDisplays();
      playSound('win');
      logConsole(`Par alinhado [${s1} ${s2} ${s3}]. +${prize} FG.`, "log-win");
      await registrarLogCassino('SLOTS', 'DUPLA', `Duplicata [${s1} ${s2} ${s3}]. Ganhou ${prize} FG`, prize - bet);
    } else {
      playSound('loss');
      logConsole(`Sem alinhamento [${s1} ${s2} ${s3}]. -${bet} FG.`, "log-loss");
      await registrarLogCassino('SLOTS', 'DERROTA', `Sem alinhamento [${s1} ${s2} ${s3}]. Perdeu ${bet} FG`, -bet);
    }

    await persistirSaldoNoBanco();

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
// DADOS DE SABACC
// ==========================================================================
let isSabaccRolling = false;

function rollSabaccDice(choice) {
  if (isSabaccRolling) return;
  const bet = parseInt(document.getElementById('sabaccBetInput').value);
  if (bet > casinoChips || bet <= 0) {
    logConsole("Fichas insuficientes!", "log-loss");
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
    1: { x: 0, y: 0 }, 2: { x: -90, y: 0 }, 3: { x: 0, y: -90 },
    4: { x: 0, y: 90 }, 5: { x: 90, y: 0 }, 6: { x: 0, y: 180 }
  };

  document.getElementById('cube1').style.transform = `rotateX(${cubeRotations[d1].x + 720}deg) rotateY(${cubeRotations[d1].y + 720}deg)`;
  document.getElementById('cube2').style.transform = `rotateX(${cubeRotations[d2].x + 1080}deg) rotateY(${cubeRotations[d2].y + 1080}deg)`;

  setTimeout(async () => {
    isSabaccRolling = false;
    document.getElementById('sabaccDie1Val').textContent = d1;
    document.getElementById('sabaccDie2Val').textContent = d2;
    document.getElementById('sabaccSumVal').textContent = sum;

    let won = false, mult = 0;
    if (choice === 'low' && sum >= 2 && sum <= 6) { won = true; mult = 2.0; }
    else if (choice === 'high' && sum >= 8 && sum <= 12) { won = true; mult = 2.0; }
    else if (choice === 'seven' && sum === 7) { won = true; mult = 4.5; }
    else if (choice === 'double' && d1 === d2) { won = true; mult = 5.5; }

    if (won) {
      const prize = Math.floor(bet * mult);
      casinoChips += prize;
      updateDisplays();
      playSound('win');
      logConsole(`SABACC: Dados [${d1}, ${d2}] -> Soma ${sum}. Ganhou +${prize} FG!`, "log-win");
      await registrarLogCassino('SABACC', 'VITORIA', `Aposta ${choice} ganha com dados [${d1}, ${d2}]. Recebeu ${prize} FG`, prize - bet);
    } else {
      playSound('loss');
      logConsole(`SABACC: Dados [${d1}, ${d2}] -> Soma ${sum}. -${bet} FG.`, "log-loss");
      await registrarLogCassino('SABACC', 'DERROTA', `Aposta ${choice} perdida com dados [${d1}, ${d2}]`, -bet);
    }

    await persistirSaldoNoBanco();
  }, 2200);
}

// Inicialização Geral
window.addEventListener('DOMContentLoaded', async () => {
  initRouletteBoard();
  buildSlotReels();
  await initCasinoSession();
});