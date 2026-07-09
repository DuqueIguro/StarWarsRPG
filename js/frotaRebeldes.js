const IMG_PLACEHOLDER = 'https://placehold.co/400x250/0a1526/ffffff?text=SCANNER+OFFLINE&font=oswald';

let fleet = [
    {
        id: 1,
        name: "Cruzador Pesado Raddus",
        image: "https://lumiere-a.akamaihd.net/v1/images/the-raddus_024b4573.jpeg?region=183%2C0%2C1226%2C690",
        maxShield: 500,
        shield: 500,
        maxHull: 1000,
        hull: 1000
    },
    {
        id: 2,
        name: "Fragata Médica Ninka",
        image: "https://lumiere-a.akamaihd.net/v1/images/ninka-main_69e469be.jpeg?region=101%2C0%2C1181%2C664",
        maxShield: 200,
        shield: 0,
        maxHull: 300,
        hull: 0 // Começa destruída
    }
];

function renderFleet() {
    const grid = document.getElementById('fleetGrid');
    grid.innerHTML = '';

    fleet.forEach(ship => {
        const isDestroyed = ship.hull <= 0;

        const shieldPercent = ship.maxShield > 0 ? Math.max(0, Math.min(100, (ship.shield / ship.maxShield) * 100)) : 0;
        const hullPercent = Math.max(0, Math.min(100, (ship.hull / ship.maxHull) * 100));

        let statusText = "OPERACIONAL";
        let statusColor = "text-[#22c55e]"; // Verde
        if (isDestroyed) {
            statusText = "SINAL PERDIDO";
            statusColor = "text-red-500 animate-pulse";
        } else if (ship.shield <= 0 && ship.hull <= (ship.maxHull * 0.3)) {
            statusText = "DANO CRÍTICO";
            statusColor = "text-yellow-500 animate-pulse";
        } else if (ship.shield <= 0) {
            statusText = "ESCUDOS INOPERANTES";
            statusColor = "text-orange-400";
        }

        // Criação dinâmica das fatias em Z para volume 3D (Voxel/Stacking CSS Trick)
        let holoLayersHTML = '';
        const numLayers = 15; // Quantidade de camadas para "engrossar" a imagem 3D
        const zDistance = 1.5; // Distância em pixels entre as fatias

        for (let i = -Math.floor(numLayers / 2); i <= Math.floor(numLayers / 2); i++) {
            const isMain = i === 0;
            const extraClass = isMain ? 'holo-main' : 'holo-layer';
            holoLayersHTML += `<img src="${ship.image}" alt="" class="holo-image ${extraClass} p-2" style="transform: translateZ(${i * zDistance}px);" onerror="this.src='${IMG_PLACEHOLDER}'">`;
        }

        const card = document.createElement('div');
        card.className = `ship-card neon-border p-4 flex flex-col justify-between ${isDestroyed ? 'is-destroyed' : ''}`;

        card.innerHTML = `
                    <div class="destroyed-x"></div>
                    
                    <div class="mb-3">
                        <div class="text-lg font-bold uppercase truncate hologram-text mb-1" title="${ship.name}">
                            ${ship.name}
                        </div>
                        <div class="text-[10px] tracking-widest ${statusColor}">${statusText}</div>
                    </div>
                    
                    <!-- Imagem Holográfica 3D Volumétrica -->
                    <div class="ship-image-container holo-container relative w-full h-48 bg-black mb-4 overflow-hidden border border-[#4da8da]/30 rounded-sm">
                        <div class="projector-base"></div>
                        
                        <div class="holo-float-wrapper">
                            <div class="holo-spin-wrapper">
                                ${holoLayersHTML}
                            </div>
                        </div>
                        
                        <!-- Linhas de monitor -->
                        <div class="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
                    </div>
                    
                    <!-- Barras de Vida e Escudo -->
                    <div class="space-y-3 mb-4">
                        <!-- ESCUDO (AZUL) -->
                        <div>
                            <div class="flex justify-between items-center text-[10px] mb-1 font-bold tracking-widest">
                                <span class="text-[#3b82f6]">DEFLETOR (SHD)</span>
                                <span class="${ship.shield <= 0 && !isDestroyed ? 'text-orange-400' : 'text-[#3b82f6]'}">${ship.shield} / ${ship.maxShield}</span>
                            </div>
                            <div class="status-bar-bg border border-[#3b82f6]/50">
                                <div class="shield-bar-fill" style="width: ${shieldPercent}%"></div>
                            </div>
                        </div>

                        <!-- CASCO (VERDE) -->
                        <div>
                            <div class="flex justify-between items-center text-[10px] mb-1 font-bold tracking-widest">
                                <span class="text-[#22c55e]">INTEGRIDADE (HULL)</span>
                                <span class="${ship.hull <= ship.maxHull * 0.3 && !isDestroyed ? 'text-red-400' : 'text-[#22c55e]'}">${ship.hull} / ${ship.maxHull}</span>
                            </div>
                            <div class="status-bar-bg border border-[#22c55e]/50">
                                <div class="health-bar-fill" style="width: ${hullPercent}%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Controles de Combate Dinâmicos -->
                    <div class="mt-auto relative z-20 p-2 bg-[#0a1526]/80 border border-[#4da8da]/40 rounded-sm">
                        <div class="flex gap-2 mb-2">
                            <input type="number" id="val-${ship.id}" class="combat-input w-20 text-center text-xs p-1" value="25" min="1" ${isDestroyed ? 'disabled' : ''}>
                            
                            <select id="target-${ship.id}" class="combat-input flex-1 text-xs p-1" ${isDestroyed ? 'disabled' : ''}>
                                <option value="hull">Alvo: Casco (Verde)</option>
                                <option value="shield">Alvo: Escudo (Azul)</option>
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="handleDamage(${ship.id})" class="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-1.5 text-xs font-bold transition-all uppercase tracking-wider shadow-[0_0_5px_rgba(255,0,0,0.2)]" ${isDestroyed ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
                                DANO [-]
                            </button>
                            <button onclick="handleHealing(${ship.id})" class="bg-transparent border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-1.5 text-xs font-bold transition-all uppercase tracking-wider shadow-[0_0_5px_rgba(0,255,0,0.2)]" ${isDestroyed ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''}>
                                REPARO [+]
                            </button>
                        </div>
                    </div>
                `;
        grid.appendChild(card);
    });
}

function addShip() {
    const nameEl = document.getElementById('shipName');
    const imgEl = document.getElementById('shipImage');
    const shieldEl = document.getElementById('shipShield');
    const hullEl = document.getElementById('shipHull');

    const name = nameEl.value.trim();
    const image = imgEl.value.trim() || IMG_PLACEHOLDER;
    const maxShield = parseInt(shieldEl.value) || 0;
    const maxHull = parseInt(hullEl.value) || 0;

    if (!name || maxHull <= 0) {
        showAlert("ERRO: Designação e Casco > 0 são obrigatórios.", "error");
        return;
    }

    const newShip = {
        id: Date.now(),
        name: name,
        image: image,
        maxShield: maxShield,
        shield: maxShield,
        maxHull: maxHull,
        hull: maxHull
    };

    fleet.unshift(newShip);

    nameEl.value = '';
    imgEl.value = '';
    shieldEl.value = '100';
    hullEl.value = '100';

    showAlert(`UNIDADE '${name}' PROJETADA NO HOLOMONITOR.`, "success");
    renderFleet();
}

function handleDamage(id) {
    const valInput = document.getElementById(`val-${id}`);
    const amount = parseInt(valInput.value) || 0;
    if (amount <= 0) return;

    const ship = fleet.find(s => s.id === id);
    if (!ship || ship.hull <= 0) return;

    let remainingDamage = amount;

    if (ship.shield > 0) {
        if (ship.shield >= remainingDamage) {
            ship.shield -= remainingDamage;
            remainingDamage = 0;
        } else {
            remainingDamage -= ship.shield;
            ship.shield = 0;
            showAlert(`ALERTA: Escudos da unidade '${ship.name}' caíram!`, "warning");
        }
    }

    if (remainingDamage > 0) {
        ship.hull -= remainingDamage;
        if (ship.hull <= 0) {
            ship.hull = 0;
            showAlert(`PERDA CATASTRÓFICA: Sinal da unidade '${ship.name}' perdido.`, "error");
        }
    }

    renderFleet();
}

function handleHealing(id) {
    const valInput = document.getElementById(`val-${id}`);
    const targetSelect = document.getElementById(`target-${id}`);

    const amount = parseInt(valInput.value) || 0;
    const target = targetSelect.value;

    if (amount <= 0) return;

    const ship = fleet.find(s => s.id === id);
    if (!ship || ship.hull <= 0) return;

    if (target === 'hull') {
        const oldHull = ship.hull;
        ship.hull = Math.min(ship.maxHull, ship.hull + amount);
        if (ship.hull > oldHull) {
            showAlert(`Equipes de dano repararam o casco de '${ship.name}'.`, "success");
        }
    } else if (target === 'shield') {
        const oldShield = ship.shield;
        ship.shield = Math.min(ship.maxShield, ship.shield + amount);
        if (ship.shield > oldShield) {
            showAlert(`Geradores de escudo reiniciados em '${ship.name}'.`, "success");
        }
    }

    renderFleet();
}

let alertTimeout;
function showAlert(msg, type) {
    const box = document.getElementById('alertBox');
    box.textContent = msg;

    if (type === 'error') {
        box.className = 'mt-4 text-xs p-3 border block bg-red-900/40 border-red-500 text-red-400 uppercase tracking-wider text-center animate-pulse shadow-[0_0_15px_rgba(255,0,0,0.3)]';
    } else if (type === 'warning') {
        box.className = 'mt-4 text-xs p-3 border block bg-orange-900/40 border-orange-500 text-orange-400 uppercase tracking-wider text-center shadow-[0_0_15px_rgba(255,165,0,0.3)]';
    } else {
        box.className = 'mt-4 text-xs p-3 border block bg-[#0a1526] border-[#4da8da] text-[#4da8da] uppercase tracking-wider text-center shadow-[0_0_10px_rgba(77,168,218,0.3)]';
    }

    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
        box.classList.add('hidden');
        box.classList.remove('block', 'animate-pulse');
    }, 4000);
}

window.onload = renderFleet;