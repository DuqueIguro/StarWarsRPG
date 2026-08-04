let database = [];
let emergencyStopActive = false;
let travelMode = 'hiperespaco';
let selectedShip = null;

let selectedOriginPlanet = null;
let selectedDestPlanet = null;
let selectedEmergencyPlanet = null;

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

let shipDatabase = [
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
];

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

function populateShipSelector() {
    if (!shipSelect) return;

    shipSelect.innerHTML = '';

    shipDatabase
        .slice()
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach((ship) => {
            shipSelect.add(new Option(ship.nome, ship.nome));
        });

    if (shipDatabase.length) {
        shipSelect.selectedIndex = 0;
    }
}

function updateShipCard() {
    if (!shipDatabase.length || !shipSelect) return;

    selectedShip = shipDatabase.find((ship) => ship.nome === shipSelect.value) || null;
    if (!selectedShip) return;

    document.getElementById('shipNome').innerText = selectedShip.nome.toUpperCase();
    document.getElementById('shipNomeAur').innerText = selectedShip.nome.toUpperCase();
    document.getElementById('shipClasseStatus').innerText = `${selectedShip.classe} // ${selectedShip.status}`;

    if (selectedShip.motor_hiperespacial) {
        document.getElementById('shipMotorTripulacao').innerText = `Motor Classe ${selectedShip.motor_hiperespacial} // ${selectedShip.tripulacao}`;
        if (engineClassSelect) {
            engineClassSelect.value = selectedShip.motor_hiperespacial;
            engineClassSelect.disabled = true;
        }
    } else {
        document.getElementById('shipMotorTripulacao').innerText = `Motor Hiperespacial: NÃO INSTALADO // ${selectedShip.tripulacao}`;
        if (engineClassSelect) {
            engineClassSelect.disabled = true;
        }
    }

    renderFuelBars();
}

function renderFuelBars() {
    if (!selectedShip) return;

    const subluzMax = selectedShip.combustivel_subluz_max || 0;
    const hiperMax = selectedShip.combustivel_hiperespacial_max || 0;

    const subluzPct = subluzMax ? Math.max(0, Math.min(100, (selectedShip.combustivel_subluz_atual / subluzMax) * 100)) : 0;
    const hiperPct = hiperMax ? Math.max(0, Math.min(100, (selectedShip.combustivel_hiperespacial_atual / hiperMax) * 100)) : 0;

    document.getElementById('subluzFuelText').innerText = `${Math.round(selectedShip.combustivel_subluz_atual)} / ${subluzMax}`;
    document.getElementById('hiperFuelText').innerText = hiperMax ? `${Math.round(selectedShip.combustivel_hiperespacial_atual)} / ${hiperMax}` : 'N/D';

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

async function initTerminal() {
    await loadPlanetDatabase();
    setupPlanetAutocompletes();
    populateShipSelector();
    buildHyperspaceLines();
    updateShipCard();
    setTravelMode('hiperespaco');
}

function calculateSegmentDistance(planetA, planetB) {
    const wA = regionWeights[planetA.regiao] || 4;
    const wB = regionWeights[planetB.regiao] || 4;

    let baseDistance = Math.abs(wA - wB) * 3500 + (Math.random() * 800 + 400);
    if (baseDistance === 0) baseDistance = 1200 + (Math.random() * 400);

    return Math.ceil(baseDistance);
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
    if (totalHours < 1) {
        const minutes = Math.max(1, Math.round(totalHours * 60));
        return `${minutes} MIN`;
    }

    const days = Math.floor(totalHours / 24);
    const hours = Math.floor(totalHours % 24);
    const minutes = Math.round((totalHours - Math.floor(totalHours)) * 60);

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

function engageHyperspaceJump() {
    const consoleOut = document.getElementById('consoleOut');
    const metricsBox = document.getElementById('metricsBox');

    const origInputVal = document.getElementById('originInput').value.trim();
    const destInputVal = document.getElementById('destInput').value.trim();

    const pOrig = database.find(p => p.nome.toLowerCase() === origInputVal.toLowerCase()) || selectedOriginPlanet;
    const pDest = database.find(p => p.nome.toLowerCase() === destInputVal.toLowerCase()) || selectedDestPlanet;

    if (!pOrig || !pDest) {
        consoleOut.innerText = "> ERRO CÓDIGO 0x14: PLANETA DE ORIGEM OU DESTINO NÃO ENCONTRADO NA BASE.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    if (!selectedShip) {
        consoleOut.innerText = "> ERRO: NENHUMA NAVE SELECIONADA.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    if (!selectedShip.motor_hiperespacial) {
        consoleOut.innerText = `> ERRO CÓDIGO 0x60: ${selectedShip.nome.toUpperCase()} NÃO POSSUI MOTOR HIPERESPACIAL INSTALADO.`;
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    if (pOrig.nome === pDest.nome) {
        consoleOut.innerText = "> ERRO CÓDIGO 0x44: COORDENADAS COINCIDENTES. ABORTANDO.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    const engineClass = selectedShip.motor_hiperespacial;

    let pStop = null;
    if (emergencyStopActive) {
        const emergencyInputVal = document.getElementById('emergencyInput').value.trim();
        pStop = database.find(p => p.nome.toLowerCase() === emergencyInputVal.toLowerCase()) || selectedEmergencyPlanet;

        if (pStop && (pStop.nome === pOrig.nome || pStop.nome === pDest.nome)) {
            consoleOut.innerText = "> ERRO CÓDIGO 0x51: PARADA DE EMERGÊNCIA COINCIDE COM A ROTA PRINCIPAL.";
            consoleOut.style.color = "var(--neon-red)";
            metricsBox.classList.remove('show');
            return;
        }
    }

    consoleOut.innerText = "> INICIANDO ALINHAMENTO DE MATRIZ... TRANSMITINDO IMPULSO HIPERESPAÇO.";
    consoleOut.style.color = "var(--amber)";
    metricsBox.classList.remove('show');

    gateOverlay.classList.add('active');

    setTimeout(() => {
        gateOverlay.classList.remove('active');

        let totalParsecs = 0;
        let jumps = 1;
        let routeLabel = `${pOrig.sistema.toUpperCase()} AO ${pDest.sistema.toUpperCase()}`;

        if (pStop) {
            const legA = calculateSegmentDistance(pOrig, pStop);
            const legB = calculateSegmentDistance(pStop, pDest);

            totalParsecs = legA + legB;
            jumps = 2;
            routeLabel = `${pOrig.sistema.toUpperCase()} > ${pStop.sistema.toUpperCase()} (PARADA DE EMERGÊNCIA) > ${pDest.sistema.toUpperCase()}`;
        } else {
            totalParsecs = calculateSegmentDistance(pOrig, pDest);
            jumps = 1;
        }

        const totalHours = calculateHyperspaceDuration(totalParsecs, engineClass);
        const fuelNeeded = calculateHyperspaceFuel(totalParsecs, engineClass);

        if (fuelNeeded > selectedShip.combustivel_hiperespacial_atual) {
            consoleOut.innerText = `> ERRO CÓDIGO 0x72: COMBUSTÍVEL HIPERESPACIAL INSUFICIENTE. NECESSÁRIO ${fuelNeeded.toFixed(1)} UN, DISPONÍVEL ${selectedShip.combustivel_hiperespacial_atual.toFixed(1)} UN.`;
            consoleOut.style.color = "var(--neon-red)";
            metricsBox.classList.remove('show');
            return;
        }

        selectedShip.combustivel_hiperespacial_atual = Math.max(0, selectedShip.combustivel_hiperespacial_atual - fuelNeeded);
        renderFuelBars();

        consoleOut.innerText = `> CÁLCULO CONCLUÍDO. ROTA ESTÁVEL CONECTANDO ${routeLabel}.`;
        consoleOut.style.color = "var(--neon-green)";

        document.getElementById('distOut').innerText = `${totalParsecs} PC`;
        document.getElementById('jumpsOut').innerText = jumps;
        document.getElementById('durationOut').innerText = formatDuration(totalHours);
        document.getElementById('fuelOut').innerText = `${fuelNeeded.toFixed(1)} UN`;
        metricsBox.classList.add('show');
    }, 2200);
}

function engageSubluzManeuver() {
    const consoleOut = document.getElementById('consoleOut');
    const metricsBox = document.getElementById('metricsBox');

    if (!selectedShip) {
        consoleOut.innerText = "> ERRO: NENHUMA NAVE SELECIONADA.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    const context = subluzContextSelect ? subluzContextSelect.value : 'espaco';
    const hours = subluzHoursInput ? parseFloat(subluzHoursInput.value) || 0 : 0;

    if (hours <= 0) {
        consoleOut.innerText = "> ERRO CÓDIGO 0x30: DURAÇÃO DA MANOBRA INVÁLIDA.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    consoleOut.innerText = "> CALCULANDO CONSUMO DOS PROPULSORES SUBLUZ...";
    consoleOut.style.color = "var(--amber)";
    metricsBox.classList.remove('show');

    setTimeout(() => {
        const fuelNeeded = calculateSubluzFuel(context, hours);

        if (fuelNeeded > selectedShip.combustivel_subluz_atual) {
            consoleOut.innerText = `> ERRO CÓDIGO 0x73: COMBUSTÍVEL SUBLUZ INSUFICIENTE. NECESSÁRIO ${fuelNeeded.toFixed(1)} UN, DISPONÍVEL ${selectedShip.combustivel_subluz_atual.toFixed(1)} UN.`;
            consoleOut.style.color = "var(--neon-red)";
            metricsBox.classList.remove('show');
            return;
        }

        selectedShip.combustivel_subluz_atual = Math.max(0, selectedShip.combustivel_subluz_atual - fuelNeeded);
        renderFuelBars();

        const contextLabels = { espaco: 'ESPAÇO ABERTO', atmosfera: 'ATMOSFERA', combate: 'COMBATE' };
        const contextLabel = contextLabels[context] || context.toUpperCase();

        consoleOut.innerText = `> MANOBRA SUBLUZ CONCLUÍDA EM CONTEXTO: ${contextLabel}.`;
        consoleOut.style.color = "var(--neon-green)";

        document.getElementById('durationOut').innerText = formatDuration(hours);
        document.getElementById('fuelOut').innerText = `${fuelNeeded.toFixed(1)} UN`;
        metricsBox.classList.add('show');
    }, 1200);
}

window.onload = initTerminal;