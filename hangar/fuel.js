// --- FUNCIONALIDADE DO PAINEL DE DADOS DE COMBUSTÍVEL ---

// Encontra os elementos do primeiro painel
const fuelToggle = document.getElementById('fuel-toggle');
const fuelContent = document.getElementById('fuel-content');
const fuelPrompt = document.querySelector('#fuel-toggle .toggle-prompt');

// Adiciona o evento de clique ao primeiro painel
if (fuelToggle) {
    fuelToggle.addEventListener('click', () => {
        fuelContent.classList.toggle('collapsed');
        fuelPrompt.textContent = fuelContent.classList.contains('collapsed') 
            ? "// Iniciar Transmissão..." 
            : "// Ocultar Transmissão...";
    });
}


// --- FUNCIONALIDADE DO PAINEL DE GERENCIAMENTO DE COMBUSTÍVEL ---

// Encontra os elementos do segundo painel
const managementToggle = document.getElementById('management-toggle');
const managementContent = document.getElementById('management-content');
const managementPrompt = document.querySelector('#management-toggle .toggle-prompt');
const saveButton = document.getElementById('save-fuel-btn');
const saveFeedback = document.getElementById('save-feedback');

// Adiciona o evento de clique ao segundo painel
if (managementToggle) {
    managementToggle.addEventListener('click', () => {
        managementContent.classList.toggle('collapsed');
        managementPrompt.textContent = managementContent.classList.contains('collapsed') 
            ? "// Abrir Canal de Entrada..." 
            : "// Fechar Canal de Entrada...";
    });
}

// Adiciona o evento de clique ao botão de salvar
if (saveButton) {
    saveButton.addEventListener('click', () => {
        saveFeedback.textContent = "> NÍVEIS DE COMBUSTÍVEL REGISTRADOS NO DATAPAD.";
        // Limpa a mensagem após 3 segundos
        setTimeout(() => {
            saveFeedback.textContent = "";
        }, 3000);
    });
}