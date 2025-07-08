document.addEventListener('DOMContentLoaded', () => {

    // --- OBJETOS E CONSTANTES DO JOGO ---
    const fuelRates = {
        subluz: { // Custo por unidade
            espaco: 0.1, // 10L / 100km
            atmosfera: 0.2, // 20L / 100km
            combate: 50 // por hora
        },
        hiperespaço: { // Custo por salto
            curto: 0.2,
            medio: 0.5,
            longo: 1
        },
        cinzel: 0.5, // 50L / 100km (Exemplo)
        moedor: 0.01 // 1% / 10km (Exemplo)
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
        cinzel: [
            { value: 'voo', text: 'Voo Padrão (km)' }
        ],
        moedor: [
            { value: 'percurso', text: 'Percurso Terrestre (km)' }
        ]
    };


    // --- PAINEL DE DADOS DE COMBUSTÍVEL ---
    const fuelToggle = document.getElementById('fuel-toggle');
    if (fuelToggle) {
        const fuelContent = document.getElementById('fuel-content');
        const fuelPrompt = fuelToggle.querySelector('.toggle-prompt');
        fuelToggle.addEventListener('click', () => {
            fuelContent.classList.toggle('collapsed');
            fuelPrompt.textContent = fuelContent.classList.contains('collapsed') ? "// Iniciar Transmissão..." : "// Ocultar Transmissão...";
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
            managementPrompt.textContent = managementContent.classList.contains('collapsed') ? "// Abrir Canal de Entrada..." : "// Fechar Canal de Entrada...";
        });

        saveButton.addEventListener('click', () => {
            saveFeedback.textContent = "> NÍVEIS DE COMBUSTÍVEL REGISTRADOS NO DATAPAD.";
            setTimeout(() => { saveFeedback.textContent = ""; }, 3000);
        });
    }


    // --- LÓGICA DO MODAL DE VIAGEM ---
    const modal = document.getElementById('travel-modal');
    const openModalBtn = document.getElementById('open-travel-modal-btn');
    const closeModalBtn = document.querySelector('#travel-modal .close-btn');

    // Seletores dos passos do formulário
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

    // Abrir e fechar o modal
    if (openModalBtn) openModalBtn.addEventListener('click', () => modal.style.display = 'block');
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Lógica de seleção do formulário
    vehicleSelect.addEventListener('change', () => {
        const vehicle = vehicleSelect.value;
        resetTripForm();

        if (vehicle === 'none') return;

        calculateBtn.disabled = false;
        if (vehicle === 'cargueiro') {
            propulsionStep.classList.remove('hidden');
            updateTravelOptions('subluz'); // Padrão é subluz
        } else {
            updateTravelOptions(vehicle); // Cinzel ou Moedor
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
        travelTypeSelect.innerHTML = ''; // Limpa opções antigas
        travelOptions[type].forEach(opt => {
            const option = new Option(opt.text, opt.value);
            travelTypeSelect.add(option);
        });
        travelOptionsStep.classList.remove('hidden');
        // Aciona o evento change para atualizar o label da quantidade
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

    // Cálculo da viagem
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
            fuelInput = (propulsion === 'subluz') ? document.getElementById('cargueiro-subluz') : document.getElementById('cargueiro-coaxium');
            rate = fuelRates[propulsion][travelType];
        } else { // Cinzel ou Moedor
            fuelInput = document.getElementById(`${vehicle}-subluz`) || document.getElementById(`${vehicle}-fuel`);
            rate = fuelRates[vehicle];
        }

        fuelCost = rate * quantity;
        const currentFuel = parseFloat(fuelInput.value);

        if (currentFuel >= fuelCost) {
            const newFuel = currentFuel - fuelCost;
            fuelInput.value = newFuel.toFixed(2); // Atualiza o valor no painel de gerenciamento
            tripFeedback.textContent = `> VIAGEM CONCLUÍDA. Custo: ${fuelCost.toFixed(2)}L. Combustível restante: ${newFuel.toFixed(2)}L.`;
        } else {
            tripFeedback.textContent = `> FALHA. Combustível insuficiente. Necessário: ${fuelCost.toFixed(2)}L. Disponível: ${currentFuel.toFixed(2)}L.`;
        }
    });
});