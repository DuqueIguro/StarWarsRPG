let database = [];
let emergencyStopActive = false;
let travelMode = 'hiperespaco';
let selectedShip = null;

const regionWeights = {
    "Núcleo": 1,
    "Orla Interior": 3,
    "Orla Média": 5,
    "Orla Exterior": 8
};

// Horas de viagem por MIL parsecs, de acordo com a classe do motor hiperespacial.
const hyperdriveClassFactors = {
    "0.5": 0.4,
    "1": 0.8,
    "2": 1.5,
    "3": 2.5
};

// Unidades de combustível hiperespacial gastas por MIL parsecs percorridos.
const hyperspaceFuelRates = {
    "0.5": 0.2,
    "1": 0.5,
    "2": 0.5,
    "3": 1
};

// Unidades de combustível subluz gastas por HORA de operação, de acordo com o contexto.
const subluzFuelRates = {
    espaco: 0.1,
    atmosfera: 0.2,
    combate: 50
};

/* ATENÇÃO: não foi encontrado um arquivo de dados de naves no projeto.
Esta frota é apenas um placeholder embutido no próprio script. Assim que
você tiver o JSON real (ex: data/frota_database.json), me passe o caminho
e os nomes dos campos que eu substituo isso por um fetch, igual ao que já
é feito com a base de planetas.*/
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

const originSelect = document.getElementById('origin');
const destSelect = document.getElementById('destination');
const gateOverlay = document.getElementById('gate');
const engineClassSelect = document.getElementById('engineClass');
const emergencyToggleBtn = document.getElementById('emergencyToggleBtn');
const emergencyBlock = document.getElementById('emergencyBlock');
const emergencyStopSelect = document.getElementById('emergencyStop');
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

function populatePlanetSelectors() {
    if (!originSelect || !destSelect) return;

    originSelect.innerHTML = '';
    destSelect.innerHTML = '';

    database
        .slice()
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach((planet) => {
            originSelect.add(new Option(planet.nome, planet.nome));
            destSelect.add(new Option(planet.nome, planet.nome));
        });

    if (database.length) {
        originSelect.selectedIndex = 0;
        destSelect.selectedIndex = 1 < database.length ? 1 : 0;
    }

    populateEmergencyStopSelector();
}

function populateEmergencyStopSelector() {
    if (!emergencyStopSelect) return;

    emergencyStopSelect.innerHTML = '';
    emergencyStopSelect.add(new Option('— Selecione um planeta —', ''));

    database
        .slice()
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach((planet) => {
            emergencyStopSelect.add(new Option(planet.nome, planet.nome));
        });
}

function toggleEmergencyStop() {
    if (!emergencyBlock || !emergencyToggleBtn || !emergencyStopSelect) return;

    emergencyStopActive = !emergencyStopActive;

    if (emergencyStopActive) {
        emergencyBlock.classList.add('show');
        emergencyToggleBtn.innerText = 'Remover Parada de Emergência';
        emergencyToggleBtn.classList.add('active');
    } else {
        emergencyBlock.classList.remove('show');
        emergencyToggleBtn.innerText = 'Adicionar Parada de Emergência';
        emergencyToggleBtn.classList.remove('active');
        emergencyStopSelect.value = '';
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
    populatePlanetSelectors();
    populateShipSelector();
    buildHyperspaceLines();
    updatePlanetCard('origin');
    updateShipCard();
    setTravelMode('hiperespaco');
}

function updatePlanetCard(type) {
    if (!database.length) return;

    const select = type === 'origin' ? originSelect : destSelect;
    const planet = database.find((item) => item.nome === select.value);

    if (!planet) return;

    document.getElementById(`${type}Region`).innerText = `${planet.regiao.toUpperCase()}`;
}

// Calcula a distância (em parsecs, inteiro arredondado para cima) entre dois planetas.
function calculateSegmentDistance(planetA, planetB) {
    const wA = regionWeights[planetA.regiao] || 4;
    const wB = regionWeights[planetB.regiao] || 4;

    let baseDistance = Math.abs(wA - wB) * 3500 + (Math.random() * 800 + 400);
    if (baseDistance === 0) baseDistance = 1200 + (Math.random() * 400);

    return Math.ceil(baseDistance);
}

// Duração da viagem hiperespacial, com base 1000:1 (horas por MIL parsecs).
function calculateHyperspaceDuration(parsecs, engineClass) {
    const factor = hyperdriveClassFactors[engineClass] || hyperdriveClassFactors["1"];
    return (parsecs / 1000) * factor;
}

// Gasto de combustível hiperespacial, também na base 1000:1.
function calculateHyperspaceFuel(parsecs, engineClass) {
    const rate = hyperspaceFuelRates[engineClass] || hyperspaceFuelRates["1"];
    return (parsecs / 1000) * rate;
}

// Gasto de combustível subluz, por hora de operação, de acordo com o contexto.
function calculateSubluzFuel(context, hours) {
    const rate = subluzFuelRates[context] ?? subluzFuelRates.espaco;
    return rate * hours;
}

// Formata a duração (em horas) de forma legível para o holo-display.
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
    const oName = originSelect.value;
    const dName = destSelect.value;
    const consoleOut = document.getElementById('consoleOut');
    const metricsBox = document.getElementById('metricsBox');

    if (!database.length) {
        consoleOut.innerText = "> ERRO: BASE DE DADOS INDISPONÍVEL.";
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

    if (oName === dName) {
        consoleOut.innerText = "> ERRO CÓDIGO 0x44: COORDENADAS COINCIDENTES. ABORTANDO.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    const engineClass = selectedShip.motor_hiperespacial;

    const pOrig = database.find((planet) => planet.nome === oName);
    const pDest = database.find((planet) => planet.nome === dName);

    let pStop = null;
    if (emergencyStopActive && emergencyStopSelect && emergencyStopSelect.value) {
        pStop = database.find((planet) => planet.nome === emergencyStopSelect.value);

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
            // Uma parada de emergência exige sair do hiperespaço, portanto a viagem
            // passa a ser composta por 2 saltos (origem->parada e parada->destino).
            const legA = calculateSegmentDistance(pOrig, pStop);
            const legB = calculateSegmentDistance(pStop, pDest);

            totalParsecs = legA + legB;
            jumps = 2;
            routeLabel = `${pOrig.sistema.toUpperCase()} > ${pStop.sistema.toUpperCase()} (PARADA DE EMERGÊNCIA) > ${pDest.sistema.toUpperCase()}`;
        } else {
            // Sem parada de emergência, a viagem é sempre concluída em um único salto.
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