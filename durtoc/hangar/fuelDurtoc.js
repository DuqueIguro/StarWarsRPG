document.addEventListener('DOMContentLoaded', () => {

    // --- OBJETOS E CONSTANTES DO JOGO ---
    const fuelRates = {
        subluz: { espaco: 0.1, atmosfera: 0.2, combate: 50 },
        hiperespaço: { curto: 0.2, medio: 0.5, longo: 1 },
        cinzel: 0.5,
        moedor: 0.01
    };

    const travelOptions = {
        subluz: [
            { value: 'espaco', text: 'Voo em Espaço (km)' },
            { value: 'atmosfera', text: 'Voo em Atmosfera (km)' },
            { value: 'combate', text: 'Combate (horas)' }
        ],
        hiperespaço: [
            { value: 'curto', text: 'Salto Curto' },
            { value: 'medio', text: 'Salto Médio' },
            { value: 'longo', text: 'Salto Longo' }
        ],
        cinzel: [{ value: 'voo', text: 'Voo Padrão (km)' }],
        moedor: [{ value: 'percurso', text: 'Percurso Terrestre (km)' }]
    };

    // --- SELETORES DE ELEMENTOS ---
    const fuelInputs = {
        cargueiroSubluz: document.getElementById('cargueiro-subluz'),
        cargueiroCoaxium: document.getElementById('cargueiro-coaxium'),
        cinzelSubluz: document.getElementById('cinzel-subluz'),
        moedorFuel: document.getElementById('moedor-fuel')
    };

    // ==========================================================
    // --- FUNÇÕES DE ARMAZENAMENTO LOCAL (localStorage) ---
    // ==========================================================
    function saveFuelLevels() {
        for (const key in fuelInputs) {
            if (fuelInputs[key]) {
                localStorage.setItem(key, fuelInputs[key].value);
            }
        }
    }

    function loadFuelLevels() {
        for (const key in fuelInputs) {
            if (fuelInputs[key]) {
                const savedValue = localStorage.getItem(key);
                if (savedValue !== null) {
                    fuelInputs[key].value = savedValue;
                }
            }
        }
    }

    // --- PAINEL DE DADOS DE COMBUSTÍVEL ---
    const fuelToggle = document.getElementById('fuel-toggle');
    if (fuelToggle) {
        const fuelContent = document.getElementById('fuel-content');
        const fuelPrompt = fuelToggle.querySelector('.toggle-prompt');
        fuelToggle.addEventListener('click', () => {
            fuelContent.classList.toggle('collapsed')
            fuelPrompt.innerHTML = fuelContent.classList.contains('collapsed') 
                ? '<i class="fa-solid fa-folder"></i> // Iniciar Transmissão...' 
                : '<i class="fa-solid fa-folder-open"></i> // Ocultar Transmissão...';
        });
    }

    // --- PAINEL DE GERENCIAMENTO DE COMBUSTÍVEL ---
    const managementToggle = document.getElementById('management-toggle');
    if (managementToggle) {
        const managementContent = document.getElementById('management-content');
        const managementPrompt = managementToggle.querySelector('.toggle-prompt');
        const saveButton = document.getElementById('save-fuel-btn');
        const saveFeedback = document.getElementById('save-feedback');

        managementToggle.addEventListener('click', () => {
            managementContent.classList.toggle('collapsed');
            managementPrompt.innerHTML = managementContent.classList.contains('collapsed') 
                ? '<i class="fa-solid fa-folder"></i> // Abrir Canal de Entrada...' 
                : '<i class="fa-solid fa-folder-open"></i> // Fechar Canal de Entrada...';
        });

        saveButton.addEventListener('click', () => {
            saveFuelLevels(); 
            saveFeedback.textContent = "> NÍVEIS DE COMBUSTÍVEL REGISTRADOS NO DATAPAD.";
            setTimeout(() => { saveFeedback.textContent = ""; }, 3000);
        });
    }


    // --- LÓGICA DO MODAL DE VIAGEM ---
    const modal = document.getElementById('travel-modal');
    const openModalBtn = document.getElementById('open-travel-modal-btn');
    const closeModalBtn = document.querySelector('#travel-modal .close-btn');
    const vehicleSelect = document.getElementById('vehicle-select');
    const propulsionStep = document.getElementById('propulsion-step');
    const propulsionSelect = document.getElementById('propulsion-select');
    const travelOptionsStep = document.getElementById('travel-options-step');
    const travelTypeSelect = document.getElementById('travel-type-select');
    const quantityStep = document.getElementById('quantity-step');
    const quantityLabel = document.getElementById('quantity-label');
    const travelQuantity = document.getElementById('travel-quantity');
    const calculateBtn = document.getElementById('calculate-trip-btn');
    const tripFeedback = document.getElementById('trip-feedback');

    if(openModalBtn) openModalBtn.addEventListener('click', () => modal.style.display = 'block');
    if(closeModalBtn) closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    vehicleSelect.addEventListener('change', () => {
        const vehicle = vehicleSelect.value;
        resetTripForm();
        if (vehicle === 'none') return;
        
        calculateBtn.disabled = false;
        if (vehicle === 'cargueiro') {
            propulsionStep.classList.remove('hidden');
            updateTravelOptions('subluz');
        } else {
            updateTravelOptions(vehicle);
        }
    });

    propulsionSelect.addEventListener('change', () => {
        updateTravelOptions(propulsionSelect.value);
    });
    
    travelTypeSelect.addEventListener('change', () => {
        const selection = travelTypeSelect.options[travelTypeSelect.selectedIndex].text;
        quantityLabel.textContent = `> ${selection}:`;
        quantityStep.classList.remove('hidden');
    });

    function updateTravelOptions(type) {
        travelTypeSelect.innerHTML = '';
        travelOptions[type].forEach(opt => {
            travelTypeSelect.add(new Option(opt.text, opt.value));
        });
        travelOptionsStep.classList.remove('hidden');
        travelTypeSelect.dispatchEvent(new Event('change'));
    }

    function resetTripForm() {
        propulsionStep.classList.add('hidden');
        travelOptionsStep.classList.add('hidden');
        quantityStep.classList.add('hidden');
        calculateBtn.disabled = true;
        tripFeedback.textContent = '';
        travelQuantity.value = '';
    }

    calculateBtn.addEventListener('click', () => {
        const vehicle = vehicleSelect.value;
        const propulsion = propulsionSelect.value;
        const travelType = travelTypeSelect.value;
        const quantity = parseFloat(travelQuantity.value);

        if (isNaN(quantity) || quantity <= 0) {
            tripFeedback.textContent = "> ERRO: Insira uma quantidade válida.";
            return;
        }

        let fuelCost = 0;
        let fuelInput;
        let rate;

        if (vehicle === 'cargueiro') {
            fuelInput = (propulsion === 'subluz') ? fuelInputs.cargueiroSubluz : fuelInputs.cargueiroCoaxium;
            rate = fuelRates[propulsion][travelType];
        } else {
            fuelInput = (vehicle === 'cinzel') ? fuelInputs.cinzelSubluz : fuelInputs.moedorFuel;
            rate = fuelRates[vehicle];
        }

        fuelCost = rate * quantity;
        const currentFuel = parseFloat(fuelInput.value) || 0;

        if (currentFuel >= fuelCost) {
            const newFuel = currentFuel - fuelCost;
            fuelInput.value = newFuel.toFixed(2);
            tripFeedback.textContent = `> VIAGEM CONCLUÍDA. Custo: ${fuelCost.toFixed(2)}L. Combustível restante: ${newFuel.toFixed(2)}L.`;
            saveFuelLevels();
        } else {
            tripFeedback.textContent = `> FALHA. Combustível insuficiente. Necessário: ${fuelCost.toFixed(2)}L. Disponível: ${currentFuel.toFixed(2)}L.`;
        }
    });

    loadFuelLevels(); 
});