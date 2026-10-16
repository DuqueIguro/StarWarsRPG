let database = [];
let emergencyStopActive = false;
let travelMode = 'hiperespaco';
let selectedShip = null;

let selectedOriginPlanet = null;
let selectedDestPlanet = null;
let selectedEmergencyPlanet = null;

// Sessão / permissões
let currentUser = null;
let currentUserName = '';
let isISB = false;
let isBusy = false;

// Naves reais (linhas de public.inventario, categoria Nave) — carregadas após o login
let playerShips = [];

const regionWeights = {
    "Núcleo": 1,
    "Orla Interior": 3,
    "Orla Média": 5,
    "Orla Exterior": 8
};

const hyperdriveClassFactors = {
    "0.5": 0.4,
    "1": 0.8,
    "2": 1.5,
    "3": 2.5
};

const hyperspaceFuelRates = {
    "0.5": 0.2,
    "1": 0.5,
    "2": 0.5,
    "3": 1
};

const subluzFuelRates = {
    espaco: 0.1,
    atmosfera: 0.2,
    combate: 50
};

// Placeholders de SIMULAÇÃO: só o ISB (mestre/dev) enxerga. Nada daqui é gravado no banco.
const simulationShips = [
    {
        nome: "TIE Interceptor 'Sombra Negra'",
        classe: "Caça Estelar Leve",
        motor_hiperespacial: "3",
        tripulacao: "1 Piloto",
        status: "OPERACIONAL",
        combustivel_subluz_max: 150,
        combustivel_subluz_atual: 120,
        combustivel_hiperespacial_max: 100,
        combustivel_hiperespacial_atual: 100
    },
    {
        nome: "YT-1300 'Poeira Estelar'",
        classe: "Cargueiro Leve",
        motor_hiperespacial: "2",
        tripulacao: "2 Piloto / 6 Passageiros",
        status: "OPERACIONAL",
        combustivel_subluz_max: 600,
        combustivel_subluz_atual: 480,
        combustivel_hiperespacial_max: 250,
        combustivel_hiperespacial_atual: 180
    },
    {
        nome: "CR90 'Aurora Cinzenta'",
        classe: "Corveta Corelliana",
        motor_hiperespacial: "1",
        tripulacao: "30 Tripulantes / 600 Passageiros",
        status: "OPERACIONAL",
        combustivel_subluz_max: 2000,
        combustivel_subluz_atual: 1750,
        combustivel_hiperespacial_max: 900,
        combustivel_hiperespacial_atual: 900
    },
    {
        nome: "Protótipo 'Fantasma'",
        classe: "Interceptor Experimental",
        motor_hiperespacial: "0.5",
        tripulacao: "1 Piloto",
        status: "MANUTENÇÃO PARCIAL",
        combustivel_subluz_max: 300,
        combustivel_subluz_atual: 300,
        combustivel_hiperespacial_max: 150,
        combustivel_hiperespacial_atual: 150
    }
].map((ship) => ({ ...ship, simulada: true, calibrada: true }));

const gateOverlay = document.getElementById('gate');
const engineClassSelect = document.getElementById('engineClass');
const emergencyToggleBtn = document.getElementById('emergencyToggleBtn');
const emergencyBlock = document.getElementById('emergencyBlock');
const shipSelect = document.getElementById('shipSelect');
const hyperspaceFieldsBlock = document.getElementById('hyperspaceFields');
const subluzFieldsBlock = document.getElementById('subluzFields');
const engageBtn = document.getElementById('engageBtn');
const subluzContextSelect = document.getElementById('subluzContext');
const subluzHoursInput = document.getElementById('subluzHours');
const modeHyperLabel = document.getElementById('modeHyperLabel');
const modeSubluzLabel = document.getElementById('modeSubluzLabel');

async function loadPlanetDatabase() {
    try {
        const response = await fetch('../data/planetas_database.json');
        if (!response.ok) {
            throw new Error(`Falha ao carregar a base de dados: ${response.status}`);
        }

        const payload = await response.json();
        database = Array.isArray(payload) ? payload : payload.planetas || [];

        if (!Array.isArray(database)) {
            throw new Error('Formato inesperado da base de dados.');
        }
    } catch (error) {
        console.error('Não foi possível carregar a base de planetas:', error);
        database = [];
    }
}

function setupAutocomplete(inputId, listId, onSelectCallback) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);

    if (!input || !list) return;

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        list.innerHTML = '';

        if (!query) {
            list.style.display = 'none';
            return;
        }

        const matches = database.filter(p => p.nome.toLowerCase().includes(query));

        if (matches.length === 0) {
            list.style.display = 'none';
            return;
        }

        matches.forEach(planet => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.innerHTML = `<span>${planet.nome}</span><span class="item-region">${planet.regiao}</span>`;
            
            item.addEventListener('click', () => {
                input.value = planet.nome;
                list.style.display = 'none';
                onSelectCallback(planet);
            });

            list.appendChild(item);
        });

        list.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !list.contains(e.target)) {
            list.style.display = 'none';
        }
    });
}

function setupPlanetAutocompletes() {
    setupAutocomplete('originInput', 'originList', (planet) => {
        selectedOriginPlanet = planet;
        document.getElementById('origRegion').innerText = planet.regiao.toUpperCase();
    });

    setupAutocomplete('destInput', 'destList', (planet) => {
        selectedDestPlanet = planet;
        document.getElementById('destRegion').innerText = planet.regiao.toUpperCase();
    });

    setupAutocomplete('emergencyInput', 'emergencyList', (planet) => {
        selectedEmergencyPlanet = planet;
    });

    if (database.length >= 2) {
        const sorted = database.slice().sort((a, b) => a.nome.localeCompare(b.nome));
        selectedOriginPlanet = sorted[0];
        selectedDestPlanet = sorted[1];

        document.getElementById('originInput').value = selectedOriginPlanet.nome;
        document.getElementById('origRegion').innerText = selectedOriginPlanet.regiao.toUpperCase();

        document.getElementById('destInput').value = selectedDestPlanet.nome;
        document.getElementById('destRegion').innerText = selectedDestPlanet.regiao.toUpperCase();
    }
}

function toggleEmergencyStop() {
    if (!emergencyBlock || !emergencyToggleBtn) return;

    emergencyStopActive = !emergencyStopActive;

    if (emergencyStopActive) {
        emergencyBlock.classList.add('show');
        emergencyToggleBtn.innerText = 'Remover Parada de Emergência';
        emergencyToggleBtn.classList.add('active');
    } else {
        emergencyBlock.classList.remove('show');
        emergencyToggleBtn.innerText = 'Adicionar Parada de Emergência';
        emergencyToggleBtn.classList.remove('active');
        document.getElementById('emergencyInput').value = '';
        selectedEmergencyPlanet = null;
    }
}

function allShips() {
    return [...(isISB ? simulationShips : []), ...playerShips];
}

function shipKey(ship) {
    return ship.simulada ? `sim:${ship.nome}` : `db:${ship.id}`;
}

function populateShipSelector() {
    if (!shipSelect) return;

    shipSelect.innerHTML = '';

    const addGroup = (label, ships) => {
        if (!ships.length) return;
        const group = document.createElement('optgroup');
        group.label = label;
        ships
            .slice()
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .forEach((ship) => group.appendChild(new Option(ship.nome, shipKey(ship))));
        shipSelect.appendChild(group);
    };

    if (isISB) addGroup('SIMULAÇÃO (PLACEHOLDERS)', simulationShips);
    addGroup(isISB ? 'NAVES DOS JOGADORES' : 'MINHAS NAVES', playerShips);

    if (!shipSelect.options.length) {
        const empty = new Option('Nenhuma nave registrada', '');
        empty.disabled = true;
        shipSelect.add(empty);
    }

    shipSelect.selectedIndex = 0;
}

function updateShipCard() {
    if (!shipSelect) return;

    selectedShip = allShips().find((ship) => shipKey(ship) === shipSelect.value) || null;

    const ownerEl = document.getElementById('shipOwner');

    if (!selectedShip) {
        document.getElementById('shipNome').innerText = '-';
        document.getElementById('shipNomeAur').innerText = '-';
        document.getElementById('shipClasseStatus').innerText = '-';
        document.getElementById('shipMotorTripulacao').innerText = '-';
        if (ownerEl) { ownerEl.innerText = '-'; ownerEl.classList.remove('sim'); }
        if (engageBtn) engageBtn.disabled = true;
        document.getElementById('subluzFuelText').innerText = '- / -';
        document.getElementById('hiperFuelText').innerText = '- / -';
        document.getElementById('subluzFuelBar').style.width = '0%';
        document.getElementById('hiperFuelBar').style.width = '0%';
        return;
    }

    if (engageBtn) engageBtn.disabled = isBusy;

    document.getElementById('shipNome').innerText = selectedShip.nome.toUpperCase();
    document.getElementById('shipNomeAur').innerText = selectedShip.nome.toUpperCase();
    document.getElementById('shipClasseStatus').innerText = `${selectedShip.classe} // ${selectedShip.status}`;

    if (ownerEl) {
        if (selectedShip.simulada) {
            ownerEl.innerText = 'SIMULAÇÃO — NADA SERÁ GRAVADO';
            ownerEl.classList.add('sim');
        } else {
            ownerEl.innerText = (selectedShip.dono_nome || 'DESCONHECIDO').toUpperCase();
            ownerEl.classList.remove('sim');
        }
    }

    document.getElementById('shipMotorTripulacao').innerText = selectedShip.motor_hiperespacial
        ? `Motor Classe ${selectedShip.motor_hiperespacial} // ${selectedShip.tripulacao}`
        : `Motor Hiperespacial: NÃO DEFINIDO // ${selectedShip.tripulacao}`;

    if (engineClassSelect) {
        engineClassSelect.value = selectedShip.motor_hiperespacial || '';
        // Jogador define uma única vez; ISB pode corrigir sempre. Simulação é fixa.
        const canEdit = !selectedShip.simulada && selectedShip.calibrada
            && (isISB || !selectedShip.motor_hiperespacial);
        engineClassSelect.disabled = !canEdit;
    }

    renderFuelBars();
}

function renderFuelBars() {
    if (!selectedShip) return;

    const subluzMax = selectedShip.combustivel_subluz_max || 0;
    const hiperMax = selectedShip.combustivel_hiperespacial_max || 0;

    const subluzPct = subluzMax ? Math.max(0, Math.min(100, (selectedShip.combustivel_subluz_atual / subluzMax) * 100)) : 0;
    const hiperPct = hiperMax ? Math.max(0, Math.min(100, (selectedShip.combustivel_hiperespacial_atual / hiperMax) * 100)) : 0;

    document.getElementById('subluzFuelText').innerText = `${Math.floor(selectedShip.combustivel_subluz_atual)} / ${subluzMax} L`;
    document.getElementById('hiperFuelText').innerText = hiperMax ? `${Math.floor(selectedShip.combustivel_hiperespacial_atual)} / ${hiperMax} Kg` : 'N/D';

    const subluzBar = document.getElementById('subluzFuelBar');
    const hiperBar = document.getElementById('hiperFuelBar');

    if (subluzBar) {
        subluzBar.style.width = `${subluzPct}%`;
        subluzBar.classList.toggle('low', subluzPct < 20);
    }

    if (hiperBar) {
        hiperBar.style.width = `${hiperPct}%`;
        hiperBar.classList.toggle('low', hiperPct < 20);
    }
}

function setTravelMode(mode) {
    travelMode = mode;
    const isHyper = mode === 'hiperespaco';

    hyperspaceFieldsBlock.classList.toggle('hidden-mode', !isHyper);
    subluzFieldsBlock.classList.toggle('hidden-mode', isHyper);

    document.getElementById('distBox').classList.toggle('hidden-mode', !isHyper);
    document.getElementById('jumpsBox').classList.toggle('hidden-mode', !isHyper);

    if (modeHyperLabel) modeHyperLabel.classList.toggle('active', isHyper);
    if (modeSubluzLabel) modeSubluzLabel.classList.toggle('active', !isHyper);

    engageBtn.innerText = isHyper ? 'Engajar Hiperpropulsor' : 'Executar Manobra Subluz';

    document.getElementById('metricsBox').classList.remove('show');
    document.getElementById('consoleOut').innerText = "> PRONTO PARA ENTRADA DE COORDENADAS...";
    document.getElementById('consoleOut').style.color = "var(--neon-cyan)";
}

function buildHyperspaceLines() {
    if (!gateOverlay) return;

    gateOverlay.innerHTML = '';

    for (let i = 0; i < 60; i++) {
        const line = document.createElement('div');
        line.className = 'tunnel-line';
        line.style.setProperty('--angle', `${Math.random() * 360}deg`);
        line.style.top = `${Math.random() * 100}%`;
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 0.4}s`;
        gateOverlay.appendChild(line);
    }
}

async function initAuth() {
    if (typeof supabaseClient === 'undefined') {
        console.error('supabaseClient não encontrado. Verifique os scripts do Supabase no HTML.');
        return false;
    }

    const { data: userData, error } = await supabaseClient.auth.getUser();
    if (error || !userData || !userData.user) {
        window.location.href = '../index.html'; // ajuste se a tela de login for outra
        return false;
    }

    currentUser = userData.user;
    currentUserName = currentUser.email || 'Desconhecido';

    const { data: perms } = await supabaseClient
        .from('permissoes')
        .select('cargo, nome')
        .eq('user_id', currentUser.id);

    if (Array.isArray(perms) && perms.length) {
        isISB = perms.some((p) => ['mestre', 'dev', 'desenvolvedor'].includes((p.cargo || '').toLowerCase()));
        const named = perms.find((p) => p.nome);
        if (named) currentUserName = named.nome;
    }

    return true;
}

// Lê as naves do inventário — a MESMA fonte e a mesma regra de detecção usadas pelo Posto.
// Jogador: naves do seu personagem. ISB: naves de todos os personagens.
async function loadPlayerShips() {
    playerShips = [];

    // Personagens (nome/facção do dono)
    let personagensQuery = supabaseClient.from('personagens').select('id, nome, grupo_faccao');
    if (!isISB) personagensQuery = personagensQuery.eq('user_id', currentUser.id).limit(1); // igual ao Posto

    const { data: personagens, error: pError } = await personagensQuery;
    if (pError || !personagens || !personagens.length) {
        if (pError) console.error('Falha ao carregar personagens:', pError);
        return;
    }

    const personagemMap = {};
    personagens.forEach((p) => { personagemMap[p.id] = p; });

    let invQuery = supabaseClient.from('inventario').select('*');
    if (!isISB) invQuery = invQuery.eq('personagem_id', personagens[0].id);

    const { data: invData, error: invError } = await invQuery;
    if (invError) {
        console.error('Falha ao carregar inventário:', invError);
        return;
    }

    (invData || []).forEach((dbItem) => {
        let baseItem = {};
        if (dbItem.item_id && typeof itemDatabase !== 'undefined') {
            baseItem = itemDatabase.find((i) => i.id === dbItem.item_id) || {};
        }
        const item = { ...baseItem, ...dbItem.dados_customizados };

        const isShip = item.category === 'Naves Prontas' || item.categoria === 'Naves Prontas' || item.categoria === 'Nave';
        if (!isShip) return;

        const subCap = item.subCap || null;
        const hypCap = item.hypCap || null;
        const calibrada = subCap !== null && hypCap !== null;
        const dono = personagemMap[dbItem.personagem_id];

        playerShips.push({
            id: dbItem.id, // id da linha em public.inventario
            simulada: false,
            calibrada,
            nome: item.name || item.nome || 'Nave Desconhecida',
            classe: item.classe || 'Nave Registrada',
            motor_hiperespacial: item.motorClass ? String(item.motorClass) : null,
            tripulacao: item.tripulacao || '—',
            status: calibrada ? 'OPERACIONAL' : 'NÃO CALIBRADA — ABRA O POSTO',
            combustivel_subluz_max: Number(subCap) || 0,
            combustivel_subluz_atual: Number(item.subLevel) || 0,
            combustivel_hiperespacial_max: Number(hypCap) || 0,
            combustivel_hiperespacial_atual: Number(item.hypLevel) || 0,
            dono_nome: dono ? dono.nome : null,
            faccao: dono ? dono.grupo_faccao : null
        });
    });
}

async function initTerminal() {
    const logged = await initAuth();
    if (!logged) return;

    await Promise.all([loadPlanetDatabase(), loadPlayerShips()]);
    setupPlanetAutocompletes();
    populateShipSelector();
    buildHyperspaceLines();
    updateShipCard();
    setTravelMode('hiperespaco');

    if (!allShips().length) {
        setConsole('> NENHUMA NAVE ENCONTRADA NO INVENTÁRIO. COMPRE OU CADASTRE SUA NAVE NO POSTO.', 'var(--amber)');
    }
}

function setConsole(message, color) {
    const consoleOut = document.getElementById('consoleOut');
    consoleOut.innerText = message;
    consoleOut.style.color = color;
}

function setBusy(busy) {
    isBusy = busy;
    if (engageBtn) engageBtn.disabled = busy || !selectedShip;
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Sorteio local — usado SOMENTE em simulação de rota ainda não catalogada.
// (O sorteio oficial acontece no banco, em obter_ou_criar_rota.)
function generateRandomDistance(planetA, planetB) {
    const wA = regionWeights[planetA.regiao] || 4;
    const wB = regionWeights[planetB.regiao] || 4;
    return Math.ceil(Math.abs(wA - wB) * 3500 + (Math.random() * 800 + 400));
}

// Retorna { distancia, origem } onde origem = 'NOVA' | 'CATALOGADA' | 'SIMULADA'
async function resolveLegDistance(from, to) {
    if (selectedShip.simulada) {
        // Simulação: lê o que já existe, mas NUNCA grava rota nova.
        const { data, error } = await supabaseClient.rpc('consultar_rota', { p_a: from.nome, p_b: to.nome });
        if (error) throw error;
        if (data !== null && data !== undefined) return { distancia: data, origem: 'CATALOGADA' };
        return { distancia: generateRandomDistance(from, to), origem: 'SIMULADA' };
    }

    const { data, error } = await supabaseClient.rpc('obter_ou_criar_rota', {
        p_a: from.nome,
        p_b: to.nome,
        p_regiao_a: from.regiao,
        p_regiao_b: to.regiao
    });
    if (error) throw error;

    const row = Array.isArray(data) ? data[0] : data;
    return { distancia: row.distancia, origem: row.criada ? 'NOVA' : 'CATALOGADA' };
}

// Mesma regra do Posto: a função ajustar_combustivel (RPC) é quem altera o inventário.
async function spendFuel(type, amount) {
    const key = type === 'subluz' ? 'combustivel_subluz_atual' : 'combustivel_hiperespacial_atual';

    if (selectedShip.simulada) {
        selectedShip[key] = Math.max(0, selectedShip[key] - amount);
        return;
    }

    const { data, error } = await supabaseClient.rpc('ajustar_combustivel', {
        p_inventario_id: selectedShip.id,
        p_tipo: type,
        p_delta: -amount
    });
    if (error) throw error;

    selectedShip[key] = Number(data);
}

// Define a classe do motor quando a nave ainda não tem (ou quando o ISB corrige).
async function onEngineClassChange() {
    if (!selectedShip || selectedShip.simulada || !engineClassSelect.value) {
        updateShipCard();
        return;
    }

    const { error } = await supabaseClient.rpc('definir_motor_nave', {
        p_inventario_id: selectedShip.id,
        p_classe: engineClassSelect.value
    });

    if (error) {
        console.error(error);
        setConsole(`> ERRO CÓDIGO 0x93: ${friendlyDbError(error)}`, 'var(--neon-red)');
    } else {
        selectedShip.motor_hiperespacial = engineClassSelect.value;
        setConsole(`> CLASSE ${selectedShip.motor_hiperespacial} REGISTRADA PARA ${selectedShip.nome.toUpperCase()}.`, 'var(--neon-cyan)');
    }
    updateShipCard();
}

async function logTravel(acao, detalhes) {
    if (selectedShip.simulada) return;

    const { error } = await supabaseClient.from('logs_taticos').insert([{
        user_id: currentUser.id,
        nome_jogador: selectedShip.dono_nome || currentUserName,
        nave_nome: selectedShip.nome,
        faccao: selectedShip.faccao || null,
        acao,
        detalhes
    }]);
    if (error) console.warn('Não foi possível registrar o log da viagem:', error);
}

function friendlyDbError(error) {
    const msg = (error && error.message) || String(error);
    if (msg.includes('COMBUSTIVEL_INSUFICIENTE')) return 'COMBUSTÍVEL INSUFICIENTE (CONFIRMADO PELO SERVIDOR).';
    if (msg.includes('NAVE_NAO_CALIBRADA')) return 'NAVE NÃO CALIBRADA. CONFIGURE OS TANQUES NO POSTO.';
    if (msg.includes('MOTOR_JA_DEFINIDO')) return 'A CLASSE DO MOTOR JÁ FOI DEFINIDA. SOMENTE O MESTRE PODE ALTERÁ-LA.';
    if (msg.includes('SEM_PERMISSAO')) return 'VOCÊ NÃO TEM PERMISSÃO PARA USAR ESTA NAVE.';
    if (msg.includes('NAO_AUTENTICADO')) return 'SESSÃO EXPIRADA. FAÇA LOGIN NOVAMENTE.';
    return msg.toUpperCase();
}

function calculateHyperspaceDuration(parsecs, engineClass) {
    const factor = hyperdriveClassFactors[engineClass] || hyperdriveClassFactors["1"];
    return (parsecs / 1000) * factor;
}

function calculateHyperspaceFuel(parsecs, engineClass) {
    const rate = hyperspaceFuelRates[engineClass] || hyperspaceFuelRates["1"];
    return (parsecs / 1000) * rate;
}

function calculateSubluzFuel(context, hours) {
    const rate = subluzFuelRates[context] ?? subluzFuelRates.espaco;
    return rate * hours;
}

function formatDuration(totalHours) {
    const totalMinutes = Math.max(1, Math.round(totalHours * 60));

    if (totalMinutes < 60) {
        return `${totalMinutes} MIN`;
    }

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) {
        return `${days}D ${hours}H ${minutes}MIN`;
    }

    return `${hours}H ${minutes}MIN`;
}

function engageHyperdrive() {
    if (travelMode === 'hiperespaco') {
        engageHyperspaceJump();
    } else {
        engageSubluzManeuver();
    }
}

async function engageHyperspaceJump() {
    if (isBusy) return;

    const metricsBox = document.getElementById('metricsBox');
    const fail = (msg) => {
        setConsole(msg, 'var(--neon-red)');
        metricsBox.classList.remove('show');
    };

    const origInputVal = document.getElementById('originInput').value.trim();
    const destInputVal = document.getElementById('destInput').value.trim();

    const pOrig = database.find(p => p.nome.toLowerCase() === origInputVal.toLowerCase()) || selectedOriginPlanet;
    const pDest = database.find(p => p.nome.toLowerCase() === destInputVal.toLowerCase()) || selectedDestPlanet;

    if (!pOrig || !pDest) return fail("> ERRO CÓDIGO 0x14: PLANETA DE ORIGEM OU DESTINO NÃO ENCONTRADO NA BASE.");
    if (!selectedShip) return fail("> ERRO: NENHUMA NAVE SELECIONADA.");
    if (!selectedShip.calibrada) {
        return fail(`> ERRO CÓDIGO 0x61: ${selectedShip.nome.toUpperCase()} NÃO TEM TANQUES CALIBRADOS. CONFIGURE-A NO POSTO.`);
    }
    if (!selectedShip.motor_hiperespacial) {
        return fail(`> ERRO CÓDIGO 0x60: CLASSE DO MOTOR HIPERESPACIAL DE ${selectedShip.nome.toUpperCase()} NÃO DEFINIDA. SELECIONE-A NO PAINEL.`);
    }
    if (pOrig.nome === pDest.nome) return fail("> ERRO CÓDIGO 0x44: COORDENADAS COINCIDENTES. ABORTANDO.");

    const engineClass = selectedShip.motor_hiperespacial;

    let pStop = null;
    if (emergencyStopActive) {
        const emergencyInputVal = document.getElementById('emergencyInput').value.trim();
        pStop = database.find(p => p.nome.toLowerCase() === emergencyInputVal.toLowerCase()) || selectedEmergencyPlanet;

        if (pStop && (pStop.nome === pOrig.nome || pStop.nome === pDest.nome)) {
            return fail("> ERRO CÓDIGO 0x51: PARADA DE EMERGÊNCIA COINCIDE COM A ROTA PRINCIPAL.");
        }
    }

    setBusy(true);
    setConsole("> INICIANDO ALINHAMENTO DE MATRIZ... TRANSMITINDO IMPULSO HIPERESPAÇO.", 'var(--amber)');
    metricsBox.classList.remove('show');
    gateOverlay.classList.add('active');

    const minAnimation = wait(2200);

    // Cada trecho é resolvido individualmente: se já existe no banco, reaproveita;
    // se não, é sorteado uma única vez e fica gravado para as próximas viagens.
    const legs = pStop ? [[pOrig, pStop], [pStop, pDest]] : [[pOrig, pDest]];
    const resolved = [];
    let failure = null;

    try {
        for (const [from, to] of legs) {
            resolved.push(await resolveLegDistance(from, to));
        }
    } catch (error) {
        failure = error;
    }

    await minAnimation;
    gateOverlay.classList.remove('active');

    if (failure) {
        console.error(failure);
        fail(`> ERRO CÓDIGO 0x90: FALHA AO CONSULTAR A CARTA DE ROTAS. ${friendlyDbError(failure)}`);
        setBusy(false);
        return;
    }

    const totalParsecs = resolved.reduce((sum, leg) => sum + leg.distancia, 0);
    const jumps = legs.length;
    const routeLabel = pStop
        ? `${pOrig.sistema.toUpperCase()} > ${pStop.sistema.toUpperCase()} (PARADA DE EMERGÊNCIA) > ${pDest.sistema.toUpperCase()}`
        : `${pOrig.sistema.toUpperCase()} AO ${pDest.sistema.toUpperCase()}`;
    const legSummary = resolved.map(leg => leg.origem).join(' + ');

    const totalHours = calculateHyperspaceDuration(totalParsecs, engineClass);
    // arredonda para cima em 2 casas: o que a tela mostra é exatamente o que o servidor desconta
    const fuelNeeded = Math.ceil(calculateHyperspaceFuel(totalParsecs, engineClass) * 100) / 100;

    if (fuelNeeded > selectedShip.combustivel_hiperespacial_atual) {
        fail(`> ERRO CÓDIGO 0x72: COMBUSTÍVEL HIPERESPACIAL INSUFICIENTE. NECESSÁRIO ${fuelNeeded.toFixed(2)} KG, DISPONÍVEL ${selectedShip.combustivel_hiperespacial_atual.toFixed(2)} KG.`);
        setBusy(false);
        return;
    }

    try {
        await spendFuel('hiperespacial', fuelNeeded);
    } catch (error) {
        console.error(error);
        fail(`> ERRO CÓDIGO 0x91: ${friendlyDbError(error)}`);
        setBusy(false);
        return;
    }

    renderFuelBars();

    const tag = selectedShip.simulada ? ' [SIMULAÇÃO]' : '';
    setConsole(`> CÁLCULO CONCLUÍDO${tag}. ROTA ESTÁVEL CONECTANDO ${routeLabel}. TRECHOS: ${legSummary}.`, 'var(--neon-green)');

    document.getElementById('distOut').innerText = `${totalParsecs} PC`;
    document.getElementById('jumpsOut').innerText = jumps;
    document.getElementById('durationOut').innerText = formatDuration(totalHours);
    document.getElementById('fuelOut').innerText = `${fuelNeeded.toFixed(2)} KG`;
    metricsBox.classList.add('show');

    await logTravel(
        'VIAGEM_HIPERESPACO',
        `${routeLabel} | ${totalParsecs} PC | ${jumps} salto(s) | ${fuelNeeded.toFixed(2)} Kg | trechos: ${legSummary}`
    );

    setBusy(false);
}

async function engageSubluzManeuver() {
    if (isBusy) return;

    const metricsBox = document.getElementById('metricsBox');
    const fail = (msg) => {
        setConsole(msg, 'var(--neon-red)');
        metricsBox.classList.remove('show');
    };

    if (!selectedShip) return fail("> ERRO: NENHUMA NAVE SELECIONADA.");
    if (!selectedShip.calibrada) {
        return fail(`> ERRO CÓDIGO 0x61: ${selectedShip.nome.toUpperCase()} NÃO TEM TANQUES CALIBRADOS. CONFIGURE-A NO POSTO.`);
    }

    const context = subluzContextSelect ? subluzContextSelect.value : 'espaco';
    const hours = subluzHoursInput ? parseFloat(subluzHoursInput.value) || 0 : 0;

    if (hours <= 0) return fail("> ERRO CÓDIGO 0x30: DURAÇÃO DA MANOBRA INVÁLIDA.");

    setBusy(true);
    setConsole("> CALCULANDO CONSUMO DOS PROPULSORES SUBLUZ...", 'var(--amber)');
    metricsBox.classList.remove('show');

    await wait(1200);

    const fuelNeeded = Math.ceil(calculateSubluzFuel(context, hours) * 100) / 100;

    if (fuelNeeded > selectedShip.combustivel_subluz_atual) {
        fail(`> ERRO CÓDIGO 0x73: COMBUSTÍVEL SUBLUZ INSUFICIENTE. NECESSÁRIO ${fuelNeeded.toFixed(2)} L, DISPONÍVEL ${selectedShip.combustivel_subluz_atual.toFixed(2)} L.`);
        setBusy(false);
        return;
    }

    try {
        await spendFuel('subluz', fuelNeeded);
    } catch (error) {
        console.error(error);
        fail(`> ERRO CÓDIGO 0x92: ${friendlyDbError(error)}`);
        setBusy(false);
        return;
    }

    renderFuelBars();

    const contextLabels = { espaco: 'ESPAÇO ABERTO', atmosfera: 'ATMOSFERA', combate: 'COMBATE' };
    const contextLabel = contextLabels[context] || context.toUpperCase();
    const tag = selectedShip.simulada ? ' [SIMULAÇÃO]' : '';

    setConsole(`> MANOBRA SUBLUZ CONCLUÍDA${tag} EM CONTEXTO: ${contextLabel}.`, 'var(--neon-green)');

    document.getElementById('durationOut').innerText = formatDuration(hours);
    document.getElementById('fuelOut').innerText = `${fuelNeeded.toFixed(2)} L`;
    metricsBox.classList.add('show');

    await logTravel(
        'MANOBRA_SUBLUZ',
        `${contextLabel} | ${hours} h | ${fuelNeeded.toFixed(2)} L`
    );

    setBusy(false);
}

window.onload = initTerminal;