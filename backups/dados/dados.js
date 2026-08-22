/* ==========================================================================
   TERMINAL TÁTICO HOLONET V6.00.0 - JAVASCRIPT
   ========================================================================== */

// --- TABELAS DOS DADOS DE MACRO (FACES EXATAS CONFORME SISTEMA) ---
const MACRO_DATA = {
    md6: [
        { face: 1, empty: true, s: 0, a: 0, p: 0 },
        { face: 2, empty: true, s: 0, a: 0, p: 0 },
        { face: 3, empty: false, s: 0, a: 0, p: 1 },
        { face: 4, empty: false, s: 0, a: 1, p: 1 },
        { face: 5, empty: false, s: 0, a: 1, p: 1 },
        { face: 6, empty: false, s: 1, a: 0, p: 0 }
    ],
    md10: [
        { face: 1, empty: true, s: 0, a: 0, p: 0 },
        { face: 2, empty: true, s: 0, a: 0, p: 0 },
        { face: 3, empty: false, s: 0, a: 0, p: 1 },
        { face: 4, empty: false, s: 0, a: 1, p: 1 },
        { face: 5, empty: false, s: 0, a: 1, p: 1 },
        { face: 6, empty: false, s: 1, a: 0, p: 0 },
        { face: 7, empty: false, s: 2, a: 0, p: 0 },
        { face: 8, empty: false, s: 1, a: 1, p: 0 },
        { face: 9, empty: false, s: 1, a: 1, p: 1 },
        { face: 10, empty: false, s: 2, a: 0, p: 1 }
    ],
    md12: [
        { face: 1, empty: true, s: 0, a: 0, p: 0 },
        { face: 2, empty: true, s: 0, a: 0, p: 0 },
        { face: 3, empty: false, s: 0, a: 0, p: 1 },
        { face: 4, empty: false, s: 0, a: 1, p: 1 },
        { face: 5, empty: false, s: 0, a: 1, p: 1 },
        { face: 6, empty: false, s: 1, a: 0, p: 0 },
        { face: 7, empty: false, s: 2, a: 0, p: 0 },
        { face: 8, empty: false, s: 1, a: 1, p: 0 },
        { face: 9, empty: false, s: 1, a: 1, p: 1 },
        { face: 10, empty: false, s: 2, a: 0, p: 1 },
        { face: 11, empty: false, s: 1, a: 2, p: 1 },
        { face: 12, empty: false, s: 0, a: 0, p: 2 }
    ]
};

// --- ESTADO DO SISTEMA ---
let pools = {
    standard: { d4: 0, d6: 0, d8: 0, d10: 0, d12: 0, d20: 0, d100: 0 },
    macro: { md6: 0, md10: 0, md12: 0 }
};

let currentMode = 'standard';
let isComputing = false;
let latestMacroResults = []; // Armazenamento para seleção manual de dados

// --- RELÓGIO EM TEMPO REAL ---
function startRealtimeClock() {
    const clockEl = document.getElementById('realtime-clock');
    function update() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hours}:${mins}:${secs} GST`;
    }
    update();
    setInterval(update, 1000);
}

// --- BOTÃO DE VOLTAR ---
function goBack() {
    playAudio('beep');
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '../index.html';
    }
}

// --- ÁUDIO SCI-FI VIA WEB AUDIO API ---
let audioContext = null;
function playAudio(type = 'click') {
    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') audioContext.resume();

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);

        const t = audioContext.currentTime;

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(650, t);
            osc.frequency.exponentialRampToValueAtTime(320, t + 0.04);
            gain.gain.setValueAtTime(0.12, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.04);
            osc.start(t);
            osc.stop(t + 0.04);
        } else if (type === 'roll') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, t);
            osc.frequency.exponentialRampToValueAtTime(1100, t + 0.35);
            gain.gain.setValueAtTime(0.15, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.38);
            osc.start(t);
            osc.stop(t + 0.38);
        } else if (type === 'sith') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, t);
            osc.frequency.exponentialRampToValueAtTime(450, t + 0.5);
            gain.gain.setValueAtTime(0.22, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.55);
            osc.start(t);
            osc.stop(t + 0.55);
        } else if (type === 'done') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, t);
            osc.frequency.setValueAtTime(660, t + 0.08);
            osc.frequency.setValueAtTime(880, t + 0.16);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.3);
            osc.start(t);
            osc.stop(t + 0.3);
        }
    } catch (e) {
        // Ignora silenciosamente caso o navegador restrinja áudio automático
    }
}

// --- ALTERNÂNCIA DE MODO & TEMA ---
function setRollMode(mode) {
    if (isComputing) return;
    currentMode = mode;
    playAudio('click');

    const navStd = document.getElementById('nav-btn-standard');
    const navMac = document.getElementById('nav-btn-macro');
    const panelStd = document.getElementById('panel-standard');
    const panelMac = document.getElementById('panel-macro');

    if (mode === 'standard') {
        document.body.className = 'mode-standard-theme';
        navStd.classList.add('active');
        navMac.classList.remove('active');
        panelStd.classList.add('active-panel');
        panelMac.classList.remove('active-panel');
        addTelemetryLog('[MODO] Frequência Amarela Padrão Selecionada.');
    } else {
        document.body.className = 'mode-macro-theme';
        navMac.classList.add('active');
        navStd.classList.remove('active');
        panelMac.classList.add('active-panel');
        panelStd.classList.remove('active-panel');
        addTelemetryLog('[MODO] Protocolo Sith Escarlate Ativado.');
    }
}

// --- GESTÃO DE POOLS DE DADOS ---
function alterDie(category, die, delta) {
    playAudio('click');
    pools[category][die] = Math.max(0, pools[category][die] + delta);
    const labelId = category === 'standard' ? `val-std-${die}` : `val-macro-${die}`;
    document.getElementById(labelId).textContent = pools[category][die];
}

function clearPool(category) {
    playAudio('click');
    for (let d in pools[category]) {
        pools[category][d] = 0;
        const labelId = category === 'standard' ? `val-std-${d}` : `val-macro-${d}`;
        document.getElementById(labelId).textContent = '0';
    }
    addTelemetryLog(`[POOL] Quantidades de ${category.toUpperCase()} resetadas.`);
}

function adjustInput(id, delta, min = null) {
    playAudio('click');
    const inp = document.getElementById(id);
    let val = parseInt(inp.value) || 0;
    val += delta;
    if (min !== null && val < min) val = min;
    inp.value = val;
}

// --- REGISTRO DE LOG ---
function addTelemetryLog(text) {
    const feed = document.getElementById('telemetry-feed');
    const item = document.createElement('div');
    item.className = 'telemetry-item';
    const time = new Date().toLocaleTimeString('pt-BR');
    item.innerHTML = `[${time}] ${text}`;
    feed.prepend(item);
}

function clearTelemetryLog() {
    playAudio('click');
    document.getElementById('telemetry-feed').innerHTML = '<div class="telemetry-item">[SISTEMA] Registro limpo.</div>';
}

// ==========================================================================
// ROLAGEM PADRÃO (AMARELA / NUMÉRICA)
// ==========================================================================
function rollStandard() {
    if (isComputing) return;

    let diceToRoll = [];
    for (let [die, count] of Object.entries(pools.standard)) {
        const sides = parseInt(die.replace('d', ''));
        for (let i = 0; i < count; i++) {
            diceToRoll.push({ type: die.toUpperCase(), sides: sides });
        }
    }

    if (diceToRoll.length === 0) {
        alert('Selecione ao menos um dado no Repositório.');
        return;
    }

    isComputing = true;
    playAudio('roll');

    // 9. Zerar a quantidade de dados após o disparo da rolagem
    clearPool('standard');

    const calcMode = document.getElementById('std-calc-mode').value;
    const modifier = parseInt(document.getElementById('std-mod-input').value) || 0;
    const disadvantage = parseInt(document.getElementById('std-disadv-input').value) || 0;

    const arena = document.getElementById('dice-hologram-arena');
    const telemetryStatus = document.getElementById('telemetry-status');
    const summaryBox = document.getElementById('tactical-summary-box');
    const manualPanel = document.getElementById('manual-selection-panel');

    summaryBox.classList.add('hidden');
    manualPanel.classList.add('hidden');
    telemetryStatus.textContent = 'PROJETANDO VETOR DE ROTAÇÃO POLIÉDRICA 3D...';
    arena.innerHTML = '';

    // Renderizar dados em animação 3D
    let cardElements = [];
    diceToRoll.forEach(d => {
        const wrapper = document.createElement('div');
        wrapper.className = 'die-3d-wrapper';
        wrapper.innerHTML = `
            <div class="die-3d-box spinning-3d">
                <span class="die-face-type">${d.type}</span>
                <span class="die-face-val">?</span>
                <span class="die-face-aurebesh aurebesh-font">POLY</span>
            </div>
        `;
        arena.appendChild(wrapper);
        cardElements.push({ die: d, wrapper: wrapper, box: wrapper.querySelector('.die-3d-box') });
    });

    setTimeout(() => {
        let rolledList = [];
        cardElements.forEach(item => {
            const val = Math.floor(Math.random() * item.die.sides) + 1;
            item.box.classList.remove('spinning-3d');
            item.box.querySelector('.die-face-val').textContent = val;
            rolledList.push({ type: item.die.type, value: val, box: item.box });
        });

        // Aplicação da regra de Desvantagem
        let activeDice = [...rolledList];
        let discCount = 0;

        if (disadvantage > 0) {
            const sortedDesc = [...rolledList].sort((a, b) => b.value - a.value);

            if (disadvantage >= rolledList.length) {
                // Elimina todos menos o menor
                const minVal = Math.min(...rolledList.map(r => r.value));
                let kept = false;
                rolledList.forEach(r => {
                    if (r.value === minVal && !kept) {
                        kept = true;
                    } else {
                        r.box.classList.add('discarded');
                        const tag = document.createElement('div');
                        tag.className = 'discard-tag';
                        tag.innerHTML = '<i class="fa-solid fa-xmark"></i> DESCARTADO';
                        r.box.appendChild(tag);
                    }
                });
                activeDice = rolledList.filter(r => !r.box.classList.contains('discarded'));
                discCount = rolledList.length - 1;
            } else {
                const toDiscard = sortedDesc.slice(0, disadvantage);
                toDiscard.forEach(r => {
                    r.box.classList.add('discarded');
                    const tag = document.createElement('div');
                    tag.className = 'discard-tag';
                    tag.innerHTML = '<i class="fa-solid fa-xmark"></i> DESCARTADO';
                    r.box.appendChild(tag);
                });
                activeDice = rolledList.filter(r => !r.box.classList.contains('discarded'));
                discCount = disadvantage;
            }
        }

        // Cálculo pelo Estilo
        let totalVal = 0;
        let styleDesc = '';

        if (calcMode === 'sum') {
            const sumBase = activeDice.reduce((acc, c) => acc + c.value, 0);
            totalVal = sumBase + modifier;
            styleDesc = `Soma dos ${activeDice.length} dados ativos (${sumBase}) ${modifier >= 0 ? '+' : ''}${modifier} = ${totalVal}`;
        } else if (calcMode === 'highest') {
            const high = Math.max(...activeDice.map(r => r.value));
            totalVal = high + modifier;
            styleDesc = `Maior valor (${high}) ${modifier >= 0 ? '+' : ''}${modifier} = ${totalVal}`;
        } else if (calcMode === 'lowest') {
            const low = Math.min(...activeDice.map(r => r.value));
            totalVal = low + modifier;
            styleDesc = `Menor valor (${low}) ${modifier >= 0 ? '+' : ''}${modifier} = ${totalVal}`;
        } else {
            totalVal = activeDice.map(r => r.value).join(', ');
            styleDesc = `Valores Individuais: [ ${totalVal} ] (Modificador: ${modifier >= 0 ? '+' : ''}${modifier})`;
        }

        // Sumário
        summaryBox.classList.remove('hidden');
        summaryBox.innerHTML = `
            <div class="summary-headline-row">
                <span class="headline-text"><i class="fa-solid fa-chart-line"></i> RESULTADO TÁTICO FINAL</span>
                <span class="headline-score">${totalVal}</span>
            </div>
            <div class="summary-breakdown">
                <div><strong>ESTILO:</strong> ${styleDesc}</div>
                <div><strong>DADOS ROLADOS:</strong> ${rolledList.map(r => `${r.type}: <strong>${r.value}</strong>`).join(' | ')}</div>
                ${disadvantage > 0 ? `<div><strong>DESVANTAGEM:</strong> ${discCount} melhor(es) dado(s) descartado(s).</div>` : ''}
            </div>
        `;

        playAudio('done');
        telemetryStatus.textContent = 'TELEMETRIA NUMÉRICA SINCRONIZADA';
        addTelemetryLog(`ROLAGEM PADRÃO: <strong>${totalVal}</strong> [${styleDesc}]`);

        isComputing = false;
    }, 1300);
}

// ==========================================================================
// ROLAGEM MACRO (VERMELHA SITH / SÍMBOLOS & SELEÇÃO MANUAL)
// ==========================================================================
function rollMacro() {
    if (isComputing) return;

    let macroToRoll = [];
    for (let [die, count] of Object.entries(pools.macro)) {
        for (let i = 0; i < count; i++) {
            macroToRoll.push({ type: die, label: die.toUpperCase() });
        }
    }

    if (macroToRoll.length === 0) {
        alert('Selecione ao menos um Dado de Macro (D6, D10 ou D12).');
        return;
    }

    isComputing = true;
    playAudio('sith');

    // 9. Zerar a quantidade de dados após a rolagem
    clearPool('macro');

    const calcMode = document.getElementById('macro-calc-mode').value;
    const modSuc = parseInt(document.getElementById('macro-mod-suc').value) || 0;
    const modAdp = parseInt(document.getElementById('macro-mod-adp').value) || 0;
    const modPrs = parseInt(document.getElementById('macro-mod-prs').value) || 0;

    const arena = document.getElementById('dice-hologram-arena');
    const telemetryStatus = document.getElementById('telemetry-status');
    const summaryBox = document.getElementById('tactical-summary-box');
    const manualPanel = document.getElementById('manual-selection-panel');

    summaryBox.classList.add('hidden');
    manualPanel.classList.add('hidden');
    telemetryStatus.textContent = 'CONVOCANDO ARTEFATOS SITH & PROJEÇÃO DE SÍMBOLOS...';
    arena.innerHTML = '';

    let elements = [];
    macroToRoll.forEach(m => {
        const wrapper = document.createElement('div');
        wrapper.className = 'die-3d-wrapper';
        wrapper.innerHTML = `
            <div class="die-3d-box spinning-3d">
                <span class="die-face-type">${m.label}</span>
                <div class="macro-symbol-grid"><i class="fa-solid fa-spinner fa-spin"></i></div>
                <span class="die-face-aurebesh aurebesh-font">SITH</span>
            </div>
        `;
        arena.appendChild(wrapper);
        elements.push({ die: m, wrapper: wrapper, box: wrapper.querySelector('.die-3d-box'), grid: wrapper.querySelector('.macro-symbol-grid') });
    });

    setTimeout(() => {
        latestMacroResults = [];

        elements.forEach((item, idx) => {
            const table = MACRO_DATA[item.die.type];
            const rolledFace = table[Math.floor(Math.random() * table.length)];

            item.box.classList.remove('spinning-3d');
            
            // Construção dos ícones vetoriais
            let icons = '';
            if (rolledFace.empty) {
                icons = '<span class="macro-icon-face sym-empty" title="Vazio"><i class="fa-solid fa-ban"></i></span>';
            } else {
                for (let i = 0; i < rolledFace.s; i++) icons += '<span class="macro-icon-face sym-success" title="Sucesso"><i class="fa-solid fa-bug"></i></span>';
                for (let i = 0; i < rolledFace.a; i++) icons += '<span class="macro-icon-face sym-adaptation" title="Adaptação"><i class="fa-solid fa-shield-cat"></i></span>';
                for (let i = 0; i < rolledFace.p; i++) icons += '<span class="macro-icon-face sym-pressure" title="Pressão"><i class="fa-solid fa-fire-flame-curved"></i></span>';
            }

            item.grid.innerHTML = icons;
            item.box.querySelector('.die-face-aurebesh').textContent = `FACE ${rolledFace.face}`;

            const resultObj = {
                id: idx,
                die: item.die.label,
                face: rolledFace.face,
                empty: rolledFace.empty,
                s: rolledFace.s,
                a: rolledFace.a,
                p: rolledFace.p,
                wrapper: item.wrapper,
                box: item.box,
                selectedToKeep: true // Padrão selecionado
            };

            latestMacroResults.push(resultObj);
        });

        // 8. Seletor de Manter Dados vs Soma Total
        if (calcMode === 'select_keep') {
            telemetryStatus.textContent = 'AGUARDANDO SELEÇÃO MANUAL DE DADOS PARA MANTER...';
            manualPanel.classList.remove('hidden');

            latestMacroResults.forEach(res => {
                res.wrapper.classList.add('selectable');
                res.box.classList.add('manual-selected');
                
                const selTag = document.createElement('div');
                selTag.className = 'selected-tag';
                selTag.innerHTML = '<i class="fa-solid fa-check"></i> MANTIDO';
                res.box.appendChild(selTag);

                res.wrapper.onclick = () => {
                    playAudio('click');
                    res.selectedToKeep = !res.selectedToKeep;
                    if (res.selectedToKeep) {
                        res.box.classList.add('manual-selected');
                        res.box.classList.remove('discarded');
                        selTag.style.display = 'block';
                    } else {
                        res.box.classList.remove('manual-selected');
                        res.box.classList.add('discarded');
                        selTag.style.display = 'none';
                    }
                };
            });

            isComputing = false;
        } else {
            // Consolidação imediata
            consolidateMacroResults(modSuc, modAdp, modPrs, false);
            isComputing = false;
        }

    }, 1300);
}

// Confirmar seleção manual de dados mantidos
function confirmManualKeepSelection() {
    playAudio('done');
    document.getElementById('manual-selection-panel').classList.add('hidden');
    
    // Desabilitar clique
    latestMacroResults.forEach(r => {
        r.wrapper.onclick = null;
        r.wrapper.classList.remove('selectable');
    });

    const modSuc = parseInt(document.getElementById('macro-mod-suc').value) || 0;
    const modAdp = parseInt(document.getElementById('macro-mod-adp').value) || 0;
    const modPrs = parseInt(document.getElementById('macro-mod-prs').value) || 0;

    consolidateMacroResults(modSuc, modAdp, modPrs, true);
}

// Consolidação e Exibição do Resultado Macro
function consolidateMacroResults(modSuc, modAdp, modPrs, isManualFiltered) {
    const summaryBox = document.getElementById('tactical-summary-box');
    const telemetryStatus = document.getElementById('telemetry-status');

    let keptResults = isManualFiltered ? latestMacroResults.filter(r => r.selectedToKeep) : latestMacroResults;

    let totS = modSuc;
    let totA = modAdp;
    let totP = modPrs;

    keptResults.forEach(r => {
        totS += r.s;
        totA += r.a;
        totP += r.p;
    });

    summaryBox.classList.remove('hidden');
    summaryBox.innerHTML = `
        <div class="summary-headline-row">
            <span class="headline-text"><i class="fa-solid fa-shield-halved"></i> BALANÇO DE ENERGIA SITH</span>
            <span class="headline-score">${totS} SUCESSOS</span>
        </div>
        <div class="summary-breakdown">
            <div><strong>MODO DE OPERAÇÃO:</strong> ${isManualFiltered ? `FILTRO MANUAL ATIVO (${keptResults.length} de ${latestMacroResults.length} dados mantidos)` : 'SOMA CONSOLIDADA COMPLETA'}</div>
            <div class="macro-pills-bar">
                <div class="macro-pill"><span class="sym-box sym-success"><i class="fa-solid fa-bug"></i></span> <strong>SUCESSOS:</strong> ${totS} (Mod: ${modSuc >= 0 ? '+' : ''}${modSuc})</div>
                <div class="macro-pill"><span class="sym-box sym-adaptation"><i class="fa-solid fa-shield-cat"></i></span> <strong>ADAPTAÇÕES:</strong> ${totA} (Mod: ${modAdp >= 0 ? '+' : ''}${modAdp})</div>
                <div class="macro-pill"><span class="sym-box sym-pressure"><i class="fa-solid fa-fire-flame-curved"></i></span> <strong>PRESSÕES:</strong> ${totP} (Mod: ${modPrs >= 0 ? '+' : ''}${modPrs})</div>
            </div>
        </div>
    `;

    playAudio('done');
    telemetryStatus.textContent = 'PROTOCOLO SITH PROCESSADO E CONSOLIDADO';
    addTelemetryLog(`ROLAGEM MACRO: Sucessos: <strong>${totS}</strong> | Adaptações: <strong>${totA}</strong> | Pressões: <strong>${totP}</strong>`);
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    startRealtimeClock();
});
