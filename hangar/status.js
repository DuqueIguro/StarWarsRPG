document.addEventListener('DOMContentLoaded', () => {
    // Objeto contendo os dados de vida e escudos para cada nave/droid
    const shipData = {
        // Veículos: Autorais do Dur'toc
        cargueiro: { vida: 400, escudo: 80 },
        cinzel: { vida: 90, escudo: 40 },
        moedor: { vida: 50, escudo: null }, // Moedor não tem escudo
        
        // Droids: Nenhum droid tem escudo
        tino: { vida: 29, escudo: null }, // Astromech
        vok: { vida: 10, escudo: null }, // Protocol
        comboio: { vida: 5, escudo: null }, // Light Cargo
        bruto: { vida: 60, escudo: null } // Heavy Cargo
    };

    // Função para carregar os valores salvos do localStorage
    const loadStatus = () => {
        for (const ship in shipData) {
            // Carregar Vida
            const vidaInput = document.getElementById(`vida-${ship}`);
            if (vidaInput) {
                const savedVida = localStorage.getItem(`vida-${ship}`);
                vidaInput.value = savedVida !== null ? savedVida : shipData[ship].vida;
            }

            // Carregar Escudo (se existir)
            const escudoInput = document.getElementById(`escudo-${ship}`);
            if (escudoInput) {
                const savedEscudo = localStorage.getItem(`escudo-${ship}`);
                escudoInput.value = savedEscudo !== null ? savedEscudo : shipData[ship].escudo;
            }
        }
    };

    // Função para salvar um valor no localStorage
    const saveStatus = (ship, type, value) => {
        localStorage.setItem(`${type}-${ship}`, value);
    };

    // Função para inicializar os valores máximos e os event listeners
    const initializeStatusBars = () => {
        const statusBars = document.querySelectorAll('.status-bar');

        statusBars.forEach(bar => {
            const ship = bar.dataset.ship;
            
            if (shipData[ship]) {
                // Preencher valor máximo de Vida
                const vidaMaxSpan = document.getElementById(`vida-${ship}-max`);
                if (vidaMaxSpan) {
                    vidaMaxSpan.textContent = `/ ${shipData[ship].vida}`;
                }
                
                // Preencher valor máximo de Escudo (se existir)
                const escudoMaxSpan = document.getElementById(`escudo-${ship}-max`);
                if (escudoMaxSpan && shipData[ship].escudo !== null) {
                    escudoMaxSpan.textContent = `/ ${shipData[ship].escudo}`;
                }
            }
        });

        const buttons = document.querySelectorAll('.status-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const ship = button.dataset.ship;
                const type = button.dataset.type;
                const action = button.dataset.action;
                const input = document.getElementById(`${type}-${ship}`);
                
                let currentValue = parseInt(input.value, 10);
                if (action === 'inc') {
                    currentValue++;
                } else {
                    currentValue--;
                }
                input.value = currentValue;
                saveStatus(ship, type, currentValue);
            });
        });

        const inputs = document.querySelectorAll('.status-input');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                const ship = input.id.split('-')[1];
                const type = input.id.split('-')[0];
                saveStatus(ship, type, input.value);
            });
        });
    };

    // Inicialização
    initializeStatusBars();
    loadStatus();
});