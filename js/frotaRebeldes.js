// frotaRebeldes.js

const IMG_PLACEHOLDER = 'https://placehold.co/400x250/0a1526/ffffff?text=SCANNER+OFFLINE&font=oswald';

let currentFleet = [];
let playerFaction = null;
let playerName = "Operador Rebelde";
let playerId = null;

// 1. Função Global de Log (Injeção no Banco)
async function registrarLogTatico(nomeNave, acao, detalhes) {
    await supabaseClient.from('logs_taticos').insert([{
        user_id: playerId,
        nome_jogador: playerName,
        nave_nome: nomeNave,
        faccao: playerFaction, 
        acao: acao,
        detalhes: detalhes
    }]);
}

// 2. Identifica o jogador, sua facção, e puxa as naves dele + Império
async function carregarFrotaRebelde() {
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !userData.user) return;
    
    playerId = userData.user.id;

    // Busca o Personagem vinculado para descobrir a facção
    const { data: personagens } = await supabaseClient
        .from('personagens')
        .select('nome, grupo_faccao')
        .eq('user_id', playerId)
        .limit(1);

    if (personagens && personagens.length > 0) {
        playerName = personagens[0].nome;
        playerFaction = personagens[0].grupo_faccao;
        document.getElementById('player-faction-display').textContent = `SETOR AUTORIZADO: ${playerFaction.toUpperCase()}`;
    } else {
        document.getElementById('player-faction-display').textContent = "ERRO: PILOTO SEM FACÇÃO REGISTRADA";
        document.getElementById('player-faction-display').classList.replace('text-yellow-400', 'text-red-500');
        return;
    }

    // Puxa as naves SOMENTE dessa facção OU as naves do império visíveis
    const { data: frotaDB, error: frotaError } = await supabaseClient
        .from('frota_ativa')
        .select('*')
        .or(`faccao.eq.${playerFaction},and(faccao.eq.Império,visivel.eq.true)`)
        .order('created_at', { ascending: true });

    if (!frotaError && frotaDB) {
        currentFleet = frotaDB;
        renderFleet();
    } else {
        showAlert("Falha ao comunicar com a Holonet.", "error");
    }
}

// 3. Renderiza as grades separadamente
function renderFleet() {
    const rebelGrid = document.getElementById('fleetGrid');
    const empireGrid = document.getElementById('empireGrid');
    const empireSection = document.getElementById('empire-section');
    const combatAlert = document.getElementById('combat-alert');
    
    rebelGrid.innerHTML = '';
    empireGrid.innerHTML = '';

    let hasCritical = false;
    let hasEmpireShips = false;
    let hasRebelShips = false;

    currentFleet.forEach(ship => {
        const isDestroyed = ship.casco_atual <= 0;
        const shieldPercent = ship.escudo_maximo > 0 ? Math.max(0, Math.min(100, (ship.escudo_atual / ship.escudo_maximo) * 100)) : 0;
        const hullPercent = ship.casco_maximo > 0 ? Math.max(0, Math.min(100, (ship.casco_atual / ship.casco_maximo) * 100)) : 0;
        const isEmpire = ship.faccao === 'Império';

        let statusText = "OPERACIONAL";
        let statusColor = isEmpire ? "text-red-400" : "text-[#22c55e]"; 
        
        if (isDestroyed) {
            statusText = "SINAL PERDIDO";
            statusColor = "text-stone-500";
            if(!isEmpire) hasCritical = true;
        } else if (ship.escudo_atual <= 0 && ship.casco_atual <= (ship.casco_maximo * 0.3)) {
            statusText = "DANO CRÍTICO";
            statusColor = "text-yellow-500 animate-pulse";
            if(!isEmpire) hasCritical = true;
        } else if (ship.escudo_atual <= 0) {
            statusText = "ESCUDOS INOPERANTES";
            statusColor = "text-orange-400";
        }

        // Camadas do holograma
        let holoLayersHTML = '';
        for (let i = -7; i <= 7; i++) {
            const extraClass = (i === 0) ? 'holo-main' : 'holo-layer';
            // Império recebe um hue-rotate para ficar vermelho
            holoLayersHTML += `<img src="${ship.imagem || IMG_PLACEHOLDER}" class="holo-image ${extraClass} p-2 ${isEmpire ? 'hue-rotate-[140deg]' : ''}" style="transform: translateZ(${i * 1.5}px);" onerror="this.src='${IMG_PLACEHOLDER}'">`;
        }

        // Cores Dinâmicas Baseadas na Facção
        const borderColor = isEmpire ? 'border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-[#4da8da]/40 neon-border';
        const titleColor = isEmpire ? 'text-red-400' : 'text-cyan-300';
        const inputBorderColor = isEmpire ? 'border-red-500/50 text-red-500' : 'border-[#4da8da] text-[#4da8da]';
        
        const card = document.createElement('div');
        card.className = `ship-card p-4 flex flex-col justify-between border ${borderColor} bg-[#020610]/80 rounded ${isDestroyed ? 'is-destroyed' : ''}`;

        card.innerHTML = `
            ${isDestroyed ? '<div class="destroyed-x"></div>' : ''}
            
            <div class="mb-3">
                <div class="text-lg font-bold uppercase truncate hologram-text mb-1 ${titleColor}" title="${ship.nome}">
                    ${ship.nome}
                </div>
                <div class="text-[10px] tracking-widest ${statusColor}">${statusText}</div>
            </div>
            
            <div class="ship-image-container holo-container relative w-full h-40 bg-black mb-4 overflow-hidden border border-[#4da8da]/30 rounded-sm">
                <div class="projector-base"></div>
                <div class="holo-float-wrapper">
                    <div class="holo-spin-wrapper">
                        ${holoLayersHTML}
                    </div>
                </div>
                <div class="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
            </div>
            
            <div class="space-y-3 mb-4">
                <div>
                    <div class="flex justify-between items-center text-[10px] mb-1 font-bold tracking-widest">
                        <span class="text-[#3b82f6]">DEFLETOR (SHD)</span>
                        <span class="${ship.escudo_atual <= 0 && !isDestroyed ? 'text-orange-400' : 'text-[#3b82f6]'}">${ship.escudo_atual} / ${ship.escudo_maximo}</span>
                    </div>
                    <div class="status-bar-bg border border-[#3b82f6]/50">
                        <div class="shield-bar-fill" style="width: ${shieldPercent}%"></div>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between items-center text-[10px] mb-1 font-bold tracking-widest">
                        <span class="text-[#22c55e]">INTEGRIDADE (HULL)</span>
                        <span class="${ship.casco_atual <= ship.casco_maximo * 0.3 && !isDestroyed ? 'text-red-400' : 'text-[#22c55e]'}">${ship.casco_atual} / ${ship.casco_maximo}</span>
                    </div>
                    <div class="status-bar-bg border border-[#22c55e]/50">
                        <div class="health-bar-fill" style="width: ${hullPercent}%"></div>
                    </div>
                </div>
            </div>
            
            <div class="mt-auto relative z-20 p-2 bg-[#0a1526]/80 border border-[#4da8da]/40 rounded-sm">
                <div class="flex gap-2 mb-2">
                    <input type="number" id="val-${ship.id}" class="combat-input bg-black border ${inputBorderColor} w-20 text-center text-xs p-1 outline-none focus:border-white" value="25" min="1" ${isDestroyed ? 'disabled' : ''}>
                    
                    <select id="target-${ship.id}" class="combat-input bg-black border ${inputBorderColor} flex-1 text-xs p-1 outline-none focus:border-white" ${isDestroyed ? 'disabled' : ''}>
                        <option value="hull">Alvo: Casco (Verde)</option>
                        <option value="shield">Alvo: Escudo (Azul)</option>
                    </select>
                </div>
                
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="handleDamage('${ship.id}')" class="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-1.5 text-xs font-bold transition-all uppercase tracking-wider shadow-[0_0_5px_rgba(255,0,0,0.2)]" ${isDestroyed ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
                        DANO [-]
                    </button>
                    <button onclick="handleHealing('${ship.id}')" class="bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-1.5 text-xs font-bold transition-all uppercase tracking-wider shadow-[0_0_5px_rgba(0,255,0,0.2)]" ${isDestroyed ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
                        REPARO [+]
                    </button>
                </div>
            </div>
        `;

        if (isEmpire) {
            empireGrid.appendChild(card);
            hasEmpireShips = true;
        } else {
            rebelGrid.appendChild(card);
            hasRebelShips = true;
        }
    });

    // Avisos de Grid Vazia
    if (!hasRebelShips) {
        rebelGrid.innerHTML = '<div class="col-span-full text-center text-stone-500 py-10 tracking-widest text-xs uppercase border border-stone-800 bg-stone-900/30">Nenhuma unidade registrada neste setor.</div>';
    }

    // Oculta/Exibe a seção do Império
    if (hasEmpireShips) {
        empireSection.classList.remove('hidden');
    } else {
        empireSection.classList.add('hidden');
    }

    // Status da Frota Rebelde
    if (hasCritical) {
        combatAlert.textContent = "SISTEMA EM ALERTA VERMELHO";
        combatAlert.className = "text-xs animate-pulse text-red-400 font-bold tracking-widest";
    } else {
        combatAlert.textContent = "CONDIÇÃO VERDE";
        combatAlert.className = "text-xs text-green-500 font-bold tracking-widest";
    }
}

// 4. Lógica de Dano
async function handleDamage(id) {
    const valInput = document.getElementById(`val-${id}`);
    const amount = parseInt(valInput.value) || 0;
    if (amount <= 0) return;

    const ship = currentFleet.find(s => s.id === id);
    if (!ship || ship.casco_atual <= 0) return;

    let remainingDamage = amount;
    let newShield = ship.escudo_atual;
    let newHull = ship.casco_atual;
    let logDesc = '';

    if (newShield > 0) {
        if (newShield >= remainingDamage) {
            newShield -= remainingDamage;
            remainingDamage = 0;
        } else {
            remainingDamage -= newShield;
            newShield = 0;
            logDesc += "Escudos caíram! ";
            showAlert(`ALERTA: Escudos da unidade '${ship.nome}' caíram!`, "warning");
        }
    }

    if (remainingDamage > 0) {
        newHull -= remainingDamage;
        if (newHull <= 0) {
            newHull = 0;
            logDesc += "Destruição Catastrófica! ";
            showAlert(`PERDA CATASTRÓFICA: Sinal da unidade '${ship.nome}' perdido.`, "error");
        }
    }

    // Desativa botões para evitar spam
    document.querySelectorAll('button').forEach(b => b.style.pointerEvents = 'none');

    const { error } = await supabaseClient.from('frota_ativa')
        .update({ escudo_atual: newShield, casco_atual: newHull })
        .eq('id', id);

    if (!error) {
        await registrarLogTatico(ship.nome, 'DANO', `${logDesc}A unidade sofreu impacto direto totalizando -${amount} pt(s). (Hull Restante: ${newHull})`);
        await carregarFrotaRebelde(); // Recarrega a tela com os dados do banco
    } else {
        showAlert("Erro de sincronização tática.", "error");
    }

    document.querySelectorAll('button').forEach(b => b.style.pointerEvents = 'auto');
}

// 5. Lógica de Reparo
async function handleHealing(id) {
    const valInput = document.getElementById(`val-${id}`);
    const targetSelect = document.getElementById(`target-${id}`);

    const amount = parseInt(valInput.value) || 0;
    const target = targetSelect.value;

    if (amount <= 0) return;

    const ship = currentFleet.find(s => s.id === id);
    if (!ship || ship.casco_atual <= 0) return;

    let newShield = ship.escudo_atual;
    let newHull = ship.casco_atual;
    let hasHealed = false;
    let logDesc = "";

    if (target === 'hull') {
        const potentialHull = Math.min(ship.casco_maximo, newHull + amount);
        if (potentialHull > newHull) {
            newHull = potentialHull;
            hasHealed = true;
            logDesc = `Equipes de danos repararam o casco em +${amount} pt(s).`;
            showAlert(`Equipes de dano repararam o casco de '${ship.nome}'.`, "success");
        }
    } else if (target === 'shield') {
        const potentialShield = Math.min(ship.escudo_maximo, newShield + amount);
        if (potentialShield > newShield) {
            newShield = potentialShield;
            hasHealed = true;
            logDesc = `Geradores de defletores recarregados em +${amount} pt(s).`;
            showAlert(`Geradores de escudo reiniciados em '${ship.nome}'.`, "success");
        }
    }

    if (!hasHealed) return; // Se a vida/escudo já tava full, não faz nada

    document.querySelectorAll('button').forEach(b => b.style.pointerEvents = 'none');

    const { error } = await supabaseClient.from('frota_ativa')
        .update({ escudo_atual: newShield, casco_atual: newHull })
        .eq('id', id);

    if (!error) {
        await registrarLogTatico(ship.nome, 'REPARO', logDesc);
        await carregarFrotaRebelde();
    } else {
        showAlert("Erro de sincronização tática.", "error");
    }

    document.querySelectorAll('button').forEach(b => b.style.pointerEvents = 'auto');
}

// 6. Alertas
let alertTimeout;
function showAlert(msg, type) {
    const box = document.getElementById('alertBox');
    box.textContent = msg;

    if (type === 'error') {
        box.className = 'mb-6 text-xs p-3 border block bg-red-900/40 border-red-500 text-red-400 uppercase tracking-wider text-center animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.3)]';
    } else if (type === 'warning') {
        box.className = 'mb-6 text-xs p-3 border block bg-orange-900/40 border-orange-500 text-orange-400 uppercase tracking-wider text-center shadow-[0_0_15px_rgba(255,165,0,0.3)]';
    } else {
        box.className = 'mb-6 text-xs p-3 border block bg-[#0a1526] border-[#4da8da] text-[#4da8da] uppercase tracking-wider text-center shadow-[0_0_10px_rgba(77,168,218,0.3)]';
    }

    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
        box.classList.add('hidden');
        box.classList.remove('block', 'animate-pulse');
    }, 4000);
}

// Inicializa o sistema
window.onload = carregarFrotaRebelde;