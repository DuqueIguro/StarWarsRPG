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
let PRICES = { sublight: 10, hyperdrive: 20000 };
let userCredits = 0; // Controlado pelo Supabase agora
let currentShipKey = '';

// --- VARIÁVEIS DO BANCO DE DADOS (SUPABASE) ---
let currentUser = null;
let currentPersonagemId = null;

const registarLog = async (personagemId, tipoEvento, descricao, mudancaCreditos = 0) => {
    if (!personagemId) return;
    await supabaseClient.from('logs_auditoria').insert([{
        personagem_id: personagemId,
        tipo_evento: tipoEvento,
        descricao: descricao,
        mudanca_creditos: mudancaCreditos
    }]);
};

let pumpInterval = null;
let currentPumpingAmount = 0;
let initialPumpingCredits = 0; // Guarda o dinheiro antes de começar a abastecer
let isPumpingActive = false;   // Previne que a base de dados grave múltiplas vezes
let audioContext = null;
let pumpOsc = null;
let pumpGain = null;

// --- INICIALIZAÇÃO DE ELEMENTOS E EVENTOS ---
document.addEventListener('DOMContentLoaded', async () => {
    initDOMEvents();
    setupCanvases();
    addLog("Terminal de transponder inicializado. Autenticando com o Banco Galáctico...");
    await carregarDadosDoBanco();
});

async function carregarDadosDoBanco() {
    const creditsEl = document.getElementById('userCreditsInput');
    creditsEl.value = "AUTENTICANDO...";

    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !userData.user) {
        creditsEl.value = "NÃO LOGADO";
        addLog("ERRO: O acesso ao terminal requer autenticação biométrica.");
        return;
    }
    currentUser = userData.user;

    const { data: personagens, error: pError } = await supabaseClient
        .from('personagens')
        .select('id, creditos')
        .eq('user_id', currentUser.id)
        .limit(1);

    if (pError || !personagens || personagens.length === 0) {
        creditsEl.value = "S/ PERSONAGEM";
        addLog("ERRO: Nenhum registro de piloto ativo encontrado.");
        return;
    }

    currentPersonagemId = personagens[0].id;
    userCredits = personagens[0].creditos || 0;
    creditsEl.value = Math.floor(userCredits);
    addLog("Conexão segura estabelecida. Sincronização de carteira concluída.");

    // FASE 2: Puxar Naves Reais do Inventário
    const { data: invData, error: invError } = await supabaseClient
        .from('inventario')
        .select('*')
        .eq('personagem_id', currentPersonagemId);

    shipsData = {};
    if (!invError && invData) {
        invData.forEach(dbItem => {
            let baseItem = {};
            // Mistura os dados base da loja com os dados gravados no JSONB do jogador
            if (dbItem.item_id && typeof itemDatabase !== 'undefined') {
                baseItem = itemDatabase.find(i => i.id === dbItem.item_id) || {};
            }
            const itemFinal = { ...baseItem, ...dbItem.dados_customizados };

            // Verifica se o item é da categoria Nave
            const isShip = itemFinal.category === 'Naves Prontas' || itemFinal.categoria === 'Naves Prontas' || itemFinal.categoria === 'Nave';

            if (isShip) {
                shipsData[dbItem.id] = {
                    db_id: dbItem.id,
                    name: itemFinal.name || itemFinal.nome || 'Nave Desconhecida',
                    subCap: itemFinal.subCap || null, // Se for nulo, a nave veio da loja e precisa ser calibrada
                    subLevel: itemFinal.subLevel !== undefined ? itemFinal.subLevel : null,
                    hypCap: itemFinal.hypCap || null,
                    hypLevel: itemFinal.hypLevel !== undefined ? itemFinal.hypLevel : null,
                    quote: itemFinal.quote || "Sinalizador ativo do cockpit.",
                    dados_originais: itemFinal // Guarda a raiz do item para não apagarmos os atributos base ao atualizar
                };
            }
        });
    }

    const chavesNaves = Object.keys(shipsData);
    const savedSelection = loadFromStorage('posto_selected_ship');

    // Seleciona a última nave ou a primeira da lista
    if (chavesNaves.length > 0) {
        if (savedSelection && shipsData[savedSelection]) {
            currentShipKey = savedSelection;
        } else {
            currentShipKey = chavesNaves[0];
        }
    } else {
        currentShipKey = '';
    }

    rebuildShipSelect();
}

function initDOMEvents() {
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
        document.getElementById('btnDeleteShip').disabled = true;
        updateEmptyUI();
        return;
    }

    document.getElementById('btnDeleteShip').disabled = false;

    keys.forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = shipsData[key].name;
        select.appendChild(opt);
    });

    select.value = currentShipKey;
    selectShip();
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

    // LÓGICA DE PRIMEIRO ACESSO: Nave existe mas não tem tanques
    if (ship.subCap === null || ship.hypCap === null) {
        document.getElementById('shipStatusPanel').classList.add('opacity-40', 'pointer-events-none');
        document.getElementById('customShipForm').classList.remove('hidden');
        document.getElementById('customName').value = ship.name;
        document.getElementById('customName').readOnly = true; // Impede alterar o nome da nave da loja
        document.getElementById('customQuote').value = ship.quote;
        document.getElementById('customSubCap').value = "";
        document.getElementById('customSubLevel').value = "";
        document.getElementById('customHypCap').value = "";
        document.getElementById('customHypLevel').value = "";

        showToast("D-09 INFORMA", "Nova nave detectada. Por favor, calibre a capacidade dos tanques para iniciar o abastecimento.", "⚙️");
        return;
    } else {
        document.getElementById('shipStatusPanel').classList.remove('opacity-40', 'pointer-events-none');
        document.getElementById('customShipForm').classList.add('hidden');
        document.getElementById('customName').readOnly = false;
    }

    document.getElementById('shipName').textContent = ship.name;

    const subPercent = (ship.subLevel / ship.subCap) * 100;
    document.getElementById('shipSublightText').textContent = `${Math.floor(ship.subLevel)} / ${ship.subCap} L`;
    document.getElementById('shipSublightBar').style.width = `${subPercent}%`;

    const hypPercent = (ship.hypLevel / ship.hypCap) * 100;
    document.getElementById('shipHyperdriveText').textContent = `${Math.floor(ship.hypLevel)} / ${ship.hypCap} Kg`;
    document.getElementById('shipHyperdriveBar').style.width = `${hypPercent}%`;
}

function updateEmptyUI() {
    document.getElementById('shipStatusPanel').classList.add('opacity-40', 'pointer-events-none');
    document.getElementById('customShipForm').classList.remove('hidden');
    document.getElementById('customName').value = "";
    document.getElementById('customName').readOnly = false;

    document.getElementById('shipName').textContent = "SEM CONEXÃO";
    document.getElementById('shipSublightText').textContent = "0 / 0 L";
    document.getElementById('shipSublightBar').style.width = "0%";
    document.getElementById('shipHyperdriveText').textContent = "0 / 0 Kg";
    document.getElementById('shipHyperdriveBar').style.width = "0%";
    document.getElementById('droidQuote').textContent = "Cadastre sua nave no painel acima para abrir os bloqueios de fluxo de gás e calibrar as conexões de reabastecimento.";
}

/* INÍCIO DA FUNÇÃO DE PREPARAÇÃO DO FORMULÁRIO */
window.openNewShipForm = function () {
    // 1. Desmarca a nave atual para garantir que o sistema faça um INSERT limpo e não um UPDATE
    currentShipKey = '';
    document.getElementById('shipSelect').value = '';

    // 2. Limpa os campos e permite edição do nome
    document.getElementById('customName').readOnly = false;
    document.getElementById('customName').value = '';
    document.getElementById('customQuote').value = '';
    document.getElementById('customSubCap').value = '';
    document.getElementById('customSubLevel').value = '';
    document.getElementById('customHypCap').value = '';
    document.getElementById('customHypLevel').value = '';

    // 3. Mostra o formulário, oculta os status e foca no input de nome
    document.getElementById('customShipForm').classList.remove('hidden');
    document.getElementById('shipStatusPanel').classList.add('opacity-40', 'pointer-events-none');
    document.getElementById('customName').focus();
};
async function registerCustomShip() {
    if (!currentPersonagemId) return showToast("ERRO", "Nenhum piloto autenticado.", "❌");

    const name = document.getElementById('customName').value.trim();
    const quote = document.getElementById('customQuote').value.trim() || "Sinalizador ativo do cockpit.";
    const subCap = Math.max(1, parseInt(document.getElementById('customSubCap').value) || 100);
    const subLevel = Math.max(0, parseInt(document.getElementById('customSubLevel').value) || 0);
    const hypCap = Math.max(1, parseInt(document.getElementById('customHypCap').value) || 10);
    const hypLevel = Math.max(0, parseInt(document.getElementById('customHypLevel').value) || 0);

    if (!name) return showToast("ALERTA", "Forneça o nome ou modelo identificador da sua nave.", "❌");

    const btnForm = document.querySelector('#customShipForm button');
    const originalText = btnForm.textContent;
    btnForm.disabled = true;
    btnForm.textContent = "PROCESSANDO...";

    // CENÁRIO A (UPDATE): A nave já existe na DB (veio da loja) e estava sem tanque configurado
    if (currentShipKey && shipsData[currentShipKey] && shipsData[currentShipKey].subCap === null) {
        const shipToUpdate = shipsData[currentShipKey];

        // Fundimos os dados novos com a matriz original para não perder IDs da loja, categoria, etc.
        const novosDadosCustomizados = {
            ...shipToUpdate.dados_originais,
            subCap: subCap,
            subLevel: Math.min(subLevel, subCap),
            hypCap: hypCap,
            hypLevel: Math.min(hypLevel, hypCap),
            quote: quote
        };

        const { error } = await supabaseClient.from('inventario')
            .update({ dados_customizados: novosDadosCustomizados })
            .eq('id', shipToUpdate.db_id);

        if (!error) {
            await registarLog(currentPersonagemId, 'CALIBRACAO_NAVE', `Tanques calibrados para a nave ${name}.`);
            showToast("CALIBRADA", `Tanques de ${name} configurados.`, "✅");
        }
    }
    // CENÁRIO B (INSERT): Criando uma nave totalmente nova direto pelo formulário do Posto
    else {
        const novaNaveDB = {
            name: name,
            category: "Naves Prontas",
            tipo_inventario: "equipamento",
            subCap: subCap,
            subLevel: Math.min(subLevel, subCap),
            hypCap: hypCap,
            hypLevel: Math.min(hypLevel, hypCap),
            quote: quote
        };

        const { data, error } = await supabaseClient.from('inventario').insert([{
            personagem_id: currentPersonagemId,
            user_id: currentUser.id,
            item_id: null, // Sem ligação à loja
            quantidade: 1,
            origem: 'manual',
            dados_customizados: novaNaveDB
        }]).select();

        if (!error && data && data.length > 0) {
            await registarLog(currentPersonagemId, 'CRIACAO_MANUAL', `Nave registrada via Aurora-9: ${name}`);
            showToast("CONECTADA", `Transponder de ${name} sincronizado.`, "🛸");
            
            // Define a nave recém criada como a nave selecionada no seletor
            saveToStorage('posto_selected_ship', data[0].id);
        }
    }

    btnForm.disabled = false;
    btnForm.textContent = originalText;

    // Oculta o formulário após salvar
    document.getElementById('customShipForm').classList.add('hidden');
    
    // Zera os campos por garantia
    document.getElementById('customName').value = '';
    document.getElementById('customQuote').value = '';
    document.getElementById('customSubCap').value = '';
    document.getElementById('customSubLevel').value = '';
    document.getElementById('customHypCap').value = '';
    document.getElementById('customHypLevel').value = '';

    // Recarrega o banco inteiro para aplicar a matriz correta ao ecrã
    await carregarDadosDoBanco();
}

async function deleteCurrentShip() {
    if (!currentShipKey || !shipsData[currentShipKey]) return;
    const ship = shipsData[currentShipKey];

    const confirmar = confirm(`ATENÇÃO: Deseja realmente sucatear a nave [${ship.name}]? Ela será excluída de todos os inventários de forma irreversível.`);
    if (!confirmar) return;

    // A deleção ocorre diretamente na nuvem
    const { error } = await supabaseClient.from('inventario').delete().eq('id', ship.db_id);

    if (!error) {
        addLog(`ALERTA: Nave [${ship.name}] foi descartada do inventário.`);
        showToast("DESACOPLADA", `${ship.name} removida com sucesso.`, "🗑️");
        await registarLog(currentPersonagemId, 'DESCARTE_ITEM', `Nave sucateada no Posto Aurora-9: ${ship.name}`);
        currentShipKey = '';
        saveToStorage('posto_selected_ship', '');
        await carregarDadosDoBanco();
    } else {
        showToast("ERRO", "Falha ao remover a nave do servidor.", "❌");
    }
}

// --- OPERAÇÃO INTERATIVA DE ABASTECIMENTO ---
function startPumping(type) {
    const ship = shipsData[currentShipKey];
    if (!ship) {
        showToast("D-09 ALERTA", "Nenhuma nave conectada à comporta.", "❌");
        return;
    }

    currentPumpingAmount = 0;
    isPumpingActive = true;
    initialPumpingCredits = userCredits; // Congela o saldo inicial para a auditoria final

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
        document.getElementById('userCreditsInput').value = Math.floor(userCredits);

        if (Math.random() < 0.2) playBeep(type === 'sublight' ? 300 : 600, 0.02);
    }, 80);
}

async function stopPumping() {
    if (pumpInterval) {
        clearInterval(pumpInterval);
        pumpInterval = null;
        stopPumpOscillator();
    }

    // Quando o jogador solta o botão, dispara 1 única gravação massiva na nuvem
    if (currentPumpingAmount > 0 && isPumpingActive) {
        isPumpingActive = false;
        const ship = shipsData[currentShipKey];
        const totalCost = initialPumpingCredits - userCredits;

        // Bloqueia a UI para evitar bugs de transação dupla
        document.getElementById('btnPumpSublight').disabled = true;
        document.getElementById('btnPumpHyperdrive').disabled = true;

        // 1. Desconta os Créditos
        await supabaseClient.from('personagens').update({ creditos: Math.floor(userCredits) }).eq('id', currentPersonagemId);

        // 2. Atualiza o Nível de Combustível da Nave
        const novosDados = { ...ship.dados_originais, subLevel: ship.subLevel, hypLevel: ship.hypLevel };
        await supabaseClient.from('inventario').update({ dados_customizados: novosDados }).eq('id', ship.db_id);

        addLog(`COMPRA DE FLUXO: Abastecidos +${currentPumpingAmount.toFixed(2)} na nave [${ship.name}].`);
        await registarLog(currentPersonagemId, 'ABASTECIMENTO', `Aeronave [${ship.name}] abastecida. +${currentPumpingAmount.toFixed(2)} combustível.`, -Math.floor(totalCost));
        playBeep(220, 0.2);

        document.getElementById('btnPumpSublight').disabled = false;
        document.getElementById('btnPumpHyperdrive').disabled = false;
    }
}

async function fillFully(type) {
    const ship = shipsData[currentShipKey];
    if (!ship) return;

    const price = PRICES[type];
    let cost = 0;
    let amount = 0;
    let logMsg = "";

    if (type === 'sublight') {
        const needed = ship.subCap - ship.subLevel;
        if (needed <= 0) return;
        cost = needed * price;
        if (userCredits < cost) {
            amount = userCredits / price;
            if (amount <= 0) return;
            ship.subLevel += amount;
            cost = userCredits;
            userCredits = 0;
            logMsg = `COMPRA PARCIAL: Abastecido +${amount.toFixed(2)}L de Tibanna. Saldo esgotado.`;
        } else {
            amount = needed;
            ship.subLevel = ship.subCap;
            userCredits -= cost;
            logMsg = `COMPRA COMPLETA: Enchimento automático de +${amount.toFixed(2)}L de Gás Tibanna.`;
            showToast("SUCESSO", "Tanque de Tibanna preenchido.", "⛽");
        }
    } else {
        const needed = ship.hypCap - ship.hypLevel;
        if (needed <= 0) return;
        cost = needed * price;
        if (userCredits < cost) {
            amount = userCredits / price;
            if (amount <= 0) return;
            ship.hypLevel += amount;
            cost = userCredits;
            userCredits = 0;
            logMsg = `COMPRA PARCIAL: Carregados +${amount.toFixed(2)}Kg de Coaxium. Saldo esgotado.`;
        } else {
            amount = needed;
            ship.hypLevel = ship.hypCap;
            userCredits -= cost;
            logMsg = `COMPRA COMPLETA: Carregamento completo de +${amount.toFixed(2)}Kg de Coaxium Puro.`;
            showToast("SUCESSO", "Reator de Coaxium alimentado.", "🔋");
        }
    }

    updateShipUI();
    document.getElementById('userCreditsInput').value = Math.floor(userCredits);

    document.body.style.pointerEvents = 'none'; // Blindagem de transação

    await supabaseClient.from('personagens').update({ creditos: Math.floor(userCredits) }).eq('id', currentPersonagemId);

    const novosDados = { ...ship.dados_originais, subLevel: ship.subLevel, hypLevel: ship.hypLevel };
    await supabaseClient.from('inventario').update({ dados_customizados: novosDados }).eq('id', ship.db_id);

    addLog(logMsg);
    await registarLog(currentPersonagemId, 'ABASTECIMENTO', logMsg, -Math.floor(cost));

    document.body.style.pointerEvents = 'auto';
}

// --- COMPRA DE EMBALAGENS PORTÁTEIS (CILINDROS) ---
async function buyCanister(type, price) {
    initAudio();
    if (userCredits < price) {
        showToast("COMPRA FALHOU", "Créditos insuficientes para o empacotamento.", "❌");
        return;
    }

    document.body.style.pointerEvents = 'none'; // Prevenir duplo clique fantasma

    userCredits -= price;
    document.getElementById('userCreditsInput').value = Math.floor(userCredits);

    const name = type === 'tibanna' ? "Cilindro de Tibanna" : "Cápsula de Coaxium";
    const desc = type === 'tibanna' ? "Conteúdo: 20L de Gás Criogênico" : "Conteúdo: 2Kg de Massa Refinada";

    const newItemDB = {
        name: name,
        description: desc,
        price: price,
        quality: "Normal",
        category: "Outros", // Cairá certinho no novo separador de categorias que fizemos
        tipo_inventario: "outros",
        is_custom: true
    };

    // 1. Debitar
    await supabaseClient.from('personagens').update({ creditos: Math.floor(userCredits) }).eq('id', currentPersonagemId);

    // 2. Injetar Item na Nuvem
    const { error } = await supabaseClient.from('inventario').insert([{
        personagem_id: currentPersonagemId,
        user_id: currentUser.id,
        item_id: null,
        quantidade: 1,
        origem: 'loja_posto',
        dados_customizados: newItemDB
    }]);

    document.body.style.pointerEvents = 'auto';

    if (!error) {
        addLog(`SUCESSO: Adquirido ${name} para o inventário.`);
        showToast("DESPACHADO", `${name} enviado ao compartimento de carga.`, "📦");
        await registarLog(currentPersonagemId, 'COMPRA_POSTO', `Adquiriu um ${name} no Posto Aurora-9.`, -price);
    } else {
        showToast("ERRO", "Falha de logística. Operação revertida.", "❌");
        await carregarDadosDoBanco(); // Restaura dados se houver quebra de rede
    }
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