/* ==========================================================================
   TERMINAL TÁTICO HOLONET V6.00.0 - DADOS.JS (SQUARE CARDS & DIGITAL ROLLS)
   ========================================================================== */

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

let pools = {
    standard: { d4: 0, d6: 0, d8: 0, d10: 0, d12: 0, d20: 0, d100: 0 },
    macro: { md6: 0, md10: 0, md12: 0 }
};

let currentMode = 'standard';
let isComputing = false;
let latestMacroResults = [];

function startRealtimeClock() {
    const clockEl = document.getElementById('realtime-clock');
    function update() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hours}:${mins}:${secs} CORUSSANT`;
    }
    update();
    setInterval(update, 1000);
}

function goBack() {
    playAudio('click');
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '../index.html';
    }
}

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
            osc.frequency.setValueAtTime(700, t);
            osc.frequency.exponentialRampToValueAtTime(350, t + 0.04);
            gain.gain.setValueAtTime(0.12, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.04);
            osc.start(t);
            osc.stop(t + 0.04);
        } else if (type === 'roll') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, t);
            osc.frequency.exponentialRampToValueAtTime(1200, t + 0.35);
            gain.gain.setValueAtTime(0.16, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.38);
            osc.start(t);
            osc.stop(t + 0.38);
        } else if (type === 'done') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(520, t);
            osc.frequency.setValueAtTime(780, t + 0.09);
            osc.frequency.setValueAtTime(1040, t + 0.18);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.linearRampToValueAtTime(0.01, t + 0.32);
            osc.start(t);
            osc.stop(t + 0.32);
        }
    } catch (e) {}
}

function switchTerminalMode(mode) {
    if (isComputing) return;
    currentMode = mode;
    playAudio('click');

    const navStd = document.getElementById('nav-btn-standard');
    const navMac = document.getElementById('nav-btn-macro');
    const panelStd = document.getElementById('panel-standard');
    const panelMac = document.getElementById('panel-macro');

    if (mode === 'standard') {
        document.body.className = 'theme-standard';
        navStd.classList.add('active');
        navMac.classList.remove('active');
        panelStd.classList.add('active-panel');
        panelMac.classList.remove('active-panel');
        addTelemetryLog('[MODO] Frequência Padrão (Amarelo) Ativada.');
    } else {
        document.body.className = 'theme-macro';
        navMac.classList.add('active');
        navStd.classList.remove('active');
        panelMac.classList.add('active-panel');
        panelStd.classList.remove('active-panel');
        addTelemetryLog('[MODO] Frequência Macro (Vermelho) Ativada.');
    }
}

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
    document.getElementById('telemetry-feed').innerHTML = '<div class="telemetry-item">[SISTEMA] Registros limpos.</div>';
}

// ROLAGEM PADRÃO
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
    clearPool('standard');

    const calcMode = document.getElementById('std-calc-mode').value;
    const modifier = parseInt(document.getElementById('std-mod-input').value) || 0;
    const disadvantage = parseInt(document.getElementById('std-disadv-input').value) || 0;

    const arena = document.getElementById('std-dice-arena');
    const telemetryStatus = document.getElementById('std-telemetry-status');
    const summaryBox = document.getElementById('std-summary-box');

    summaryBox.classList.add('hidden');
    telemetryStatus.textContent = 'EXECUTANDO ROLAGEM DIGITAL...';
    arena.innerHTML = '';

    let cardElements = [];
    diceToRoll.forEach(d => {
        const card = document.createElement('div');
        card.className = 'die-square-card anim-rolling-sq';
        card.innerHTML = `
            <span class="die-tag-top">${d.type}</span>
            <span class="die-val-center">?</span>
            <span class="die-aurebesh-sub aurebesh-font">POLY</span>
        `;
        arena.appendChild(card);
        cardElements.push({ die: d, card: card });
    });

    setTimeout(() => {
        let rolledList = [];
        cardElements.forEach(item => {
            const val = Math.floor(Math.random() * item.die.sides) + 1;
            item.card.classList.remove('anim-rolling-sq');
            item.card.querySelector('.die-val-center').textContent = val;
            rolledList.push({ type: item.die.type, value: val, card: item.card });
        });

        let activeDice = [...rolledList];
        let discCount = 0;

        if (disadvantage > 0) {
            const sortedDesc = [...rolledList].sort((a, b) => b.value - a.value);

            if (disadvantage >= rolledList.length) {
                const minVal = Math.min(...rolledList.map(r => r.value));
                let kept = false;
                rolledList.forEach(r => {
                    if (r.value === minVal && !kept) {
                        kept = true;
                    } else {
                        r.card.classList.add('discarded');
                        const tag = document.createElement('div');
                        tag.className = 'discard-tag';
                        tag.innerHTML = '<i class="fa-solid fa-xmark"></i> DESCARTADO';
                        r.card.appendChild(tag);
                    }
                });
                activeDice = rolledList.filter(r => !r.card.classList.contains('discarded'));
                discCount = rolledList.length - 1;
            } else {
                const toDiscard = sortedDesc.slice(0, disadvantage);
                toDiscard.forEach(r => {
                    r.card.classList.add('discarded');
                    const tag = document.createElement('div');
                    tag.className = 'discard-tag';
                    tag.innerHTML = '<i class="fa-solid fa-xmark"></i> DESCARTADO';
                    r.card.appendChild(tag);
                });
                activeDice = rolledList.filter(r => !r.card.classList.contains('discarded'));
                discCount = disadvantage;
            }
        }

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
    }, 900);
}

// ROLAGEM MACRO
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
    playAudio('roll');
    clearPool('macro');

    const calcMode = document.getElementById('macro-calc-mode').value;
    const modSuc = parseInt(document.getElementById('macro-mod-suc').value) || 0;
    const modAdp = parseInt(document.getElementById('macro-mod-adp').value) || 0;
    const modPrs = parseInt(document.getElementById('macro-mod-prs').value) || 0;

    const arena = document.getElementById('macro-dice-arena');
    const telemetryStatus = document.getElementById('macro-telemetry-status');
    const summaryBox = document.getElementById('macro-summary-box');
    const manualPanel = document.getElementById('macro-selection-panel');

    summaryBox.classList.add('hidden');
    manualPanel.classList.add('hidden');
    telemetryStatus.textContent = 'PROCESSANDO SÍMBOLOS MACRO...';
    arena.innerHTML = '';

    let elements = [];
    macroToRoll.forEach(m => {
        const card = document.createElement('div');
        card.className = 'die-square-card anim-rolling-sq';
        card.innerHTML = `
            <span class="die-tag-top">${m.label}</span>
            <div class="macro-symbol-cluster"><i class="fa-solid fa-spinner fa-spin"></i></div>
            <span class="die-aurebesh-sub aurebesh-font">MACRO</span>
        `;
        arena.appendChild(card);
        elements.push({ die: m, card: card, cluster: card.querySelector('.macro-symbol-cluster') });
    });

    setTimeout(() => {
        latestMacroResults = [];

        elements.forEach((item, idx) => {
            const table = MACRO_DATA[item.die.type];
            const rolledFace = table[Math.floor(Math.random() * table.length)];

            item.card.classList.remove('anim-rolling-sq');

            let icons = '';
            if (rolledFace.empty) {
                icons = '<span class="macro-icon-item sym-empty" title="Vazio"><i class="fa-solid fa-ban"></i></span>';
            } else {
                for (let i = 0; i < rolledFace.s; i++) icons += '<span class="macro-icon-item sym-success" title="Sucesso"><i class="fa-solid fa-bug"></i></span>';
                for (let i = 0; i < rolledFace.a; i++) icons += '<span class="macro-icon-item sym-adaptation" title="Adaptação"><i class="fa-solid fa-shield-cat"></i></span>';
                for (let i = 0; i < rolledFace.p; i++) icons += '<span class="macro-icon-item sym-pressure" title="Pressão"><i class="fa-solid fa-fire-flame-curved"></i></span>';
            }

            item.cluster.innerHTML = icons;
            item.card.querySelector('.die-aurebesh-sub').textContent = `FACE ${rolledFace.face}`;

            const resultObj = {
                id: idx,
                die: item.die.label,
                face: rolledFace.face,
                empty: rolledFace.empty,
                s: rolledFace.s,
                a: rolledFace.a,
                p: rolledFace.p,
                card: item.card,
                selectedToKeep: true
            };

            latestMacroResults.push(resultObj);
        });

        if (calcMode === 'select_keep') {
            telemetryStatus.textContent = 'AGUARDANDO SELEÇÃO MANUAL DE DADOS PARA MANTER...';
            manualPanel.classList.remove('hidden');

            latestMacroResults.forEach(res => {
                res.card.classList.add('selectable');
                res.card.classList.add('manual-selected');

                const selTag = document.createElement('div');
                selTag.className = 'selected-tag';
                selTag.innerHTML = '<i class="fa-solid fa-check"></i> MANTIDO';
                res.card.appendChild(selTag);

                res.card.onclick = () => {
                    playAudio('click');
                    res.selectedToKeep = !res.selectedToKeep;
                    if (res.selectedToKeep) {
                        res.card.classList.add('manual-selected');
                        res.card.classList.remove('discarded');
                        selTag.style.display = 'block';
                    } else {
                        res.card.classList.remove('manual-selected');
                        res.card.classList.add('discarded');
                        selTag.style.display = 'none';
                    }
                };
            });

            isComputing = false;
        } else {
            consolidateMacroResults(modSuc, modAdp, modPrs, false);
            isComputing = false;
        }

    }, 900);
}

function confirmManualKeepSelection() {
    playAudio('done');
    document.getElementById('macro-selection-panel').classList.add('hidden');

    latestMacroResults.forEach(r => {
        r.card.onclick = null;
        r.card.classList.remove('selectable');
    });

    const modSuc = parseInt(document.getElementById('macro-mod-suc').value) || 0;
    const modAdp = parseInt(document.getElementById('macro-mod-adp').value) || 0;
    const modPrs = parseInt(document.getElementById('macro-mod-prs').value) || 0;

    consolidateMacroResults(modSuc, modAdp, modPrs, true);
}

function consolidateMacroResults(modSuc, modAdp, modPrs, isManualFiltered) {
    const summaryBox = document.getElementById('macro-summary-box');
    const telemetryStatus = document.getElementById('macro-telemetry-status');

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
            <span class="headline-text"><i class="fa-solid fa-cubes-stacked"></i> BALANÇO DE SÍMBOLOS MACRO</span>
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
    telemetryStatus.textContent = 'PROTOCOLO MACRO PROCESSADO E CONSOLIDADO';
    addTelemetryLog(`ROLAGEM MACRO: Sucessos: <strong>${totS}</strong> | Adaptações: <strong>${totA}</strong> | Pressões: <strong>${totP}</strong>`);
}

window.addEventListener('DOMContentLoaded', () => {
    startRealtimeClock();
});
