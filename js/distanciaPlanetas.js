let database = [];

const regionWeights = {
    "Núcleo": 1,
    "Orla Interior": 3,
    "Orla Média": 5,
    "Orla Exterior": 8
};

const originSelect = document.getElementById('origin');
const destSelect = document.getElementById('destination');
const gateOverlay = document.getElementById('gate');

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
        .forEach((planet, index) => {
            originSelect.add(new Option(planet.nome, planet.nome));
            destSelect.add(new Option(planet.nome, planet.nome));
        });

    if (database.length) {
        originSelect.selectedIndex = 0;
        destSelect.selectedIndex = 1 < database.length ? 1 : 0;
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

    consoleOut.innerText = "> INICIANDO ALINHAMENTO DE MATRIZ... TRANSMITINDO IMPULSO HIPERESPAÇO.";
    consoleOut.style.color = "var(--amber)";
    metricsBox.classList.remove('show');

    gateOverlay.classList.add('active');

    setTimeout(() => {
        gateOverlay.classList.remove('active');

        const pOrig = database.find((planet) => planet.nome === oName);
        const pDest = database.find((planet) => planet.nome === dName);

        const wOrig = regionWeights[pOrig.regiao] || 4;
        const wDest = regionWeights[pDest.regiao] || 4;

        let baseDistance = Math.abs(wOrig - wDest) * 3500 + (Math.random() * 800 + 400);
        if (baseDistance === 0) baseDistance = 1200 + (Math.random() * 400);

        const parsecs = baseDistance.toFixed(1);
        const jumps = Math.max(1, Math.ceil(parsecs / (pDest.regiao === "Orla Exterior" ? 1400 : 2200)));

        consoleOut.innerText = `> CÁLCULO CONCLUÍDO. ROTA ESTÁVEL CONECTANDO ${pOrig.sistema.toUpperCase()} AO ${pDest.sistema.toUpperCase()}.`;
        consoleOut.style.color = "var(--neon-green)";

        document.getElementById('distOut').innerText = `${parsecs} PC`;
        document.getElementById('jumpsOut').innerText = jumps;
        metricsBox.classList.add('show');
    }, 2200);
}

window.onload = initTerminal;
