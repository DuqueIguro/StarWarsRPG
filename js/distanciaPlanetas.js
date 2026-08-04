let database = [];
let emergencyStopActive = false;

const regionWeights = {
    "Núcleo": 1,
    "Orla Interior": 3,
    "Orla Média": 5,
    "Orla Exterior": 8
};

// Horas de viagem por parsec, de acordo com a classe do motor hiperespacial.
// Quanto menor a classe, mais rápido o motor (padrão canônico Star Wars).
const hyperdriveClassFactors = {
    "0.5": 0.4,
    "1": 0.8,
    "2": 1.5,
    "3": 2.5
};

const originSelect = document.getElementById('origin');
const destSelect = document.getElementById('destination');
const gateOverlay = document.getElementById('gate');
const engineClassSelect = document.getElementById('engineClass');
const emergencyToggleBtn = document.getElementById('emergencyToggleBtn');
const emergencyBlock = document.getElementById('emergencyBlock');
const emergencyStopSelect = document.getElementById('emergencyStop');

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
    buildHyperspaceLines();
    updatePlanetCard('origin');
}

function updatePlanetCard(type) {
    if (!database.length) return;

    const select = type === 'origin' ? originSelect : destSelect;
    const planet = database.find((item) => item.nome === select.value);

    if (!planet) return;

    document.getElementById(`${type}Region`).innerText = `${planet.regiao.toUpperCase()}`;
    document.getElementById('cardNome').innerText = planet.nome.toUpperCase();
    document.getElementById('cardLocal').innerText = `${planet.regiao} // ${planet.setor}`;
    document.getElementById('cardGov').innerText = `${planet.governo} [${planet.afiliacao}]`;
    document.getElementById('cardEspecies').innerText = planet.principais_especies.join(', ');
    document.getElementById('cardDesc').innerText = `${planet.descricao} Rota principal: ${planet.rota_utilizada} ${planet.outras_informacoes}`;
}

// Calcula a distância (em parsecs, inteiro arredondado para cima) entre dois planetas.
function calculateSegmentDistance(planetA, planetB) {
    const wA = regionWeights[planetA.regiao] || 4;
    const wB = regionWeights[planetB.regiao] || 4;

    let baseDistance = Math.abs(wA - wB) * 3500 + (Math.random() * 800 + 400);
    if (baseDistance === 0) baseDistance = 1200 + (Math.random() * 400);

    return Math.ceil(baseDistance);
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

    if (oName === dName) {
        consoleOut.innerText = "> ERRO CÓDIGO 0x44: COORDENADAS COINCIDENTES. ABORTANDO.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    const engineClass = engineClassSelect ? engineClassSelect.value : "1";
    const classFactor = hyperdriveClassFactors[engineClass] || hyperdriveClassFactors["1"];

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
        let totalHours = 0;
        let jumps = 1;
        let routeLabel = `${pOrig.sistema.toUpperCase()} AO ${pDest.sistema.toUpperCase()}`;

        if (pStop) {
            // Uma parada de emergência exige sair do hiperespaço, portanto a viagem
            // passa a ser composta por 2 saltos (origem->parada e parada->destino).
            const legA = calculateSegmentDistance(pOrig, pStop);
            const legB = calculateSegmentDistance(pStop, pDest);

            totalParsecs = legA + legB;
            totalHours = (legA * classFactor) + (legB * classFactor);
            jumps = 2;
            routeLabel = `${pOrig.sistema.toUpperCase()} > ${pStop.sistema.toUpperCase()} (PARADA DE EMERGÊNCIA) > ${pDest.sistema.toUpperCase()}`;
        } else {
            // Sem parada de emergência, a viagem é sempre concluída em um único salto.
            totalParsecs = calculateSegmentDistance(pOrig, pDest);
            totalHours = totalParsecs * classFactor;
            jumps = 1;
        }

        consoleOut.innerText = `> CÁLCULO CONCLUÍDO. ROTA ESTÁVEL CONECTANDO ${routeLabel}.`;
        consoleOut.style.color = "var(--neon-green)";

        document.getElementById('distOut').innerText = `${totalParsecs} PC`;
        document.getElementById('jumpsOut').innerText = jumps;
        document.getElementById('durationOut').innerText = formatDuration(totalHours);
        metricsBox.classList.add('show');
    }, 2200);
}

window.onload = initTerminal;