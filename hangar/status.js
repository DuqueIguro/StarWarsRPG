// Configurações de máximos para cada nave
const STATUS_CONFIG = {
    cargueiro: { vida: 400, escudo: 80 },
    cinzel:    { vida: 90, escudo: 15 },
    moedor:    { vida: 50, escudo: 0 }
};

function getStatusKey(ship, type) {
    return `status_${ship}_${type}`;
}

function loadStatus(ship, type) {
    const max = STATUS_CONFIG[ship][type];
    const saved = localStorage.getItem(getStatusKey(ship, type));
    return saved !== null ? Math.max(0, Math.min(max, parseInt(saved))) : max;
}

function saveStatus(ship, type, value) {
    localStorage.setItem(getStatusKey(ship, type), value);
}

function updateStatusUI(ship, type) {
    const max = STATUS_CONFIG[ship][type];
    const input = document.getElementById(`${type}-${ship}`);
    const maxSpan = document.getElementById(`${type}-${ship}-max`);
    const value = loadStatus(ship, type);
    input.value = value;
    input.max = max;
    maxSpan.textContent = ` / ${max}`;
}

function setupStatusBar(ship) {
    // Se for o moedor, só vida
    const types = ship === "moedor" ? ["vida"] : ["vida", "escudo"];
    types.forEach(type => {
        updateStatusUI(ship, type);

        // Botões
        document.querySelectorAll(`.status-btn[data-ship="${ship}"][data-type="${type}"]`).forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const input = document.getElementById(`${type}-${ship}`);
                let val = parseInt(input.value) || 0;
                const max = STATUS_CONFIG[ship][type];
                const step = 5;
                if (action === 'inc' && val < max) val = Math.min(val + step, max);
                if (action === 'dec' && val > 0) val = Math.max(val - step, 0);
                input.value = val;
                saveStatus(ship, type, val);
                updateStatusUI(ship, type);
            });
        });

        // Input manual
        const input = document.getElementById(`${type}-${ship}`);
        input.addEventListener('input', () => {
            let val = parseInt(input.value) || 0;
            const max = STATUS_CONFIG[ship][type];
            if (val > max) val = max;
            if (val < 0) val = 0;
            input.value = val;
            saveStatus(ship, type, val);
            updateStatusUI(ship, type);
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    Object.keys(STATUS_CONFIG).forEach(setupStatusBar);
});
