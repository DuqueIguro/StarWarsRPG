/* INICIO DE FUNÇÃO DE [Gerenciamento de Estado]; esta função inicializa o estado base da ficha e o Proxy reativo */
const defaultState = {
    atributosBase: {
        vigor: 10,
        destreza: 10,
        constituicao: 10,
        inteligencia: 10,
        sabedoria: 10,
        carisma: 10
    }
    // Adicionaremos o resto das chaves base aqui gradualmente
};

let _internalState = JSON.parse(JSON.stringify(defaultState));

const appState = new Proxy(_internalState, {
    set(target, property, value, receiver) {
        console.log(`[Estado] Propriedade alterada: ${property} para`, value);
        // O Adapter de Salvamento (localStorage ou Banco de Dados) será chamado aqui futuramente
        return Reflect.set(target, property, value, receiver);
    }
});

function setStateByPath(path, value) {
    const keys = path.split('.');
    let current = appState;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;

    console.log(`[Estado] ${path} = ${value}`);
}
/* FIM DE FUNÇÃO DE [Gerenciamento de Estado] */

function initFicha() {
    // Referências aos elementos da página
    const selectEspecie = document.getElementById('especie');
    const selectTamanho = document.getElementById('tamanho');
    const pNotasRaciais = document.getElementById('notas-raciais');

    // Função para criar o menu de espécies
    function popularEspecies() {
        const opcaoPadrao = document.createElement('option');
        opcaoPadrao.value = '';
        opcaoPadrao.textContent = 'Selecione...';
        selectEspecie.appendChild(opcaoPadrao);
        for (const chaveRaca in DADOS_RACAS) {
            const raca = DADOS_RACAS[chaveRaca];
            const option = document.createElement('option');
            option.value = chaveRaca;
            option.textContent = raca.nome;
            selectEspecie.appendChild(option);
        }
    }

    // Função para criar o menu de classes
    function popularClasses() {
        const selectClasse = document.getElementById('classe');
        const opcaoPadrao = document.createElement('option');
        opcaoPadrao.value = '';
        opcaoPadrao.textContent = 'Selecione...';
        selectClasse.appendChild(opcaoPadrao);
        for (const chaveClasse in DADOS_CLASSES) {
            const classe = DADOS_CLASSES[chaveClasse];
            const option = document.createElement('option');
            option.value = chaveClasse;
            option.textContent = classe.nome;
            selectClasse.appendChild(option);
        }
    }

    // Função para popular o seletor de Tamanho
    function popularTamanhos() {
        for (const chaveTamanho in DADOS_TAMANHOS) {
            const tamanho = DADOS_TAMANHOS[chaveTamanho];
            const option = document.createElement('option');
            option.value = chaveTamanho;
            option.textContent = tamanho.nome;
            if (chaveTamanho === 'medio') {
                option.selected = true;
            }
            selectTamanho.appendChild(option);
        }
    }

    // Variáveis e constantes globais
    const diceIconSvg = `<svg class="dice-icon w-6 h-6 rollable" viewBox="0 0 24 24"><path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>`;

    function rollDice(label, baseModifier) {
        const conditionEl = document.getElementById('condicao');
        let conditionPenalty = 0;
        if (conditionEl.value === 'incapaz') {
            showRollResult("Incapaz de Agir", "-", "O personagem está inconsciente ou desabilitado.");
            return;
        }
        conditionPenalty = parseInt(conditionEl.value) || 0;

        // Em vez de rodar o d20, mostramos a fórmula estruturada
        const totalMod = baseModifier + conditionPenalty;
        const sinal = totalMod >= 0 ? '+' : '';

        let breakdown = `Dado base: 1d20<br>Bônus: ${baseModifier}`;
        if (conditionPenalty !== 0) breakdown += `<br>Condição: ${conditionPenalty}`;

        showRollResult(label, `1d20 ${sinal}${totalMod}`, breakdown);
    }

    function showRollResult(label, result, breakdown) {
        document.getElementById('roll-label').textContent = label;
        // O elemento de resultado agora mostra o texto dos dados a rolar
        document.getElementById('roll-result').innerHTML = `<span class="text-yellow-400 font-mono">${result}</span>`;
        document.getElementById('roll-breakdown').innerHTML = breakdown;
        diceModal.classList.add('show');
    }

    /* INICIO DE FUNÇÃO DE [Exibição de Fórmulas de Dados]; esta função gerencia o modal que instrui o jogador sobre quais dados rolar fisicamente na mesa */
    const diceModal = document.getElementById('dice-modal');
    const closeModalButton = document.getElementById('close-modal');

    // Função que injeta a fórmula matemática no modal HTML
    function showDiceFormula(label, formula, breakdown) {
        document.getElementById('roll-label').textContent = label;
        // Substitui o número estático por uma string em destaque, ex: "1d20 + 5"
        document.getElementById('roll-result').innerHTML = `<span class="text-yellow-400 font-mono text-3xl">${formula}</span>`;
        document.getElementById('roll-breakdown').innerHTML = breakdown;
        diceModal.classList.add('show');
    }

    // Fechamento do modal
    closeModalButton.addEventListener('click', () => diceModal.classList.remove('show'));
    diceModal.addEventListener('click', (event) => { if (event.target === diceModal) diceModal.classList.remove('show'); });

    // Evento global para capturar cliques nos ícones de dado (.rollable)
    document.body.addEventListener('click', (event) => {
        const rollableElement = event.target.closest('.rollable');

        if (rollableElement) {
            const isWeapon = rollableElement.closest('.weapon-block');

            if (isWeapon) {
                // Lógica de exibição para armas
                const weaponName = isWeapon.querySelector('.weapon-name').value || 'Arma Desconhecida';
                const damageString = isWeapon.querySelector('.dano-input').value || 'Base da Arma';

                // Futuramente, esses valores de bônus virão do appState ou do cálculo final
                showDiceFormula(
                    `Ataque com: ${weaponName}`,
                    `Dano: ${damageString}`,
                    `Ataque: 1d20 + Bônus de Ataque (A ser implementado no Estado)`
                );
            } else {
                // Lógica de exibição para Atributos e Perícias
                const label = rollableElement.dataset.rollLabel || "Teste";
                const attrBase = rollableElement.dataset.attrBase || "";

                // Temporário: Enquanto a matemática do Estado não está pronta
                showDiceFormula(
                    `Rolar: ${label}`,
                    `1d20 + MODIFICADOR`,
                    attrBase ? `O modificador será derivado de: ${attrBase.toUpperCase()}` : "Adicione seus bônus aplicáveis"
                );
            }
        }
    });
    /* FIM DE FUNÇÃO DE [Exibição de Fórmulas de Dados] */

    // Função de Pesquisa de Perícias (Mantida por ser puramente visual)
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('skill-search');
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchIcon.classList.add('hidden');
        searchInput.classList.remove('hidden');
        searchInput.focus();
    });

    document.addEventListener('click', (e) => {
        if (e.target.id !== 'skill-search' && e.target.id !== 'search-icon') {
            if (searchInput.value.trim() === '') {
                searchInput.classList.add('hidden');
                searchIcon.classList.remove('hidden');
            }
        }
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const allSkills = document.querySelectorAll('.pericia-item');
        allSkills.forEach(skillElement => {
            const skillLabel = skillElement.querySelector('label');
            if (skillLabel) {
                const skillName = skillLabel.textContent.toLowerCase();
                if (skillName.includes(searchTerm)) {
                    skillElement.style.display = 'block';
                } else {
                    skillElement.style.display = 'none';
                }
            }
        });
    });

    const equipmentList = document.getElementById('equipment-list');
    const addItemBtn = document.getElementById('add-item-btn');

    function createItemRow() {
        const itemRow = document.createElement('div');
        itemRow.className = 'grid grid-cols-12 gap-2 items-center';
        itemRow.innerHTML = `
            <input type="text" placeholder="Nome do item" class="col-span-6 p-1">
            <input type="number" placeholder="0" class="col-span-3 p-1 text-center">
            <input type="number" step="0.1" value="0" class="col-span-2 p-1 text-center item-weight">
            <button class="remove-item-btn col-span-1 text-red-500 hover:text-red-400 font-bold text-center text-lg">X</button>
        `;
        equipmentList.appendChild(itemRow);
    }

    createItemRow();
    addItemBtn.addEventListener('click', createItemRow);
    equipmentList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            e.target.parentElement.remove();
        }
    });

    const weaponList = document.getElementById('weapon-list');
    const addWeaponBtn = document.getElementById('add-weapon-btn');

    function createWeaponRow() {
        const weaponRow = document.createElement('div');
        weaponRow.className = 'weapon-block-container';
        weaponRow.innerHTML = `
            <div class="grid grid-cols-2 gap-2 weapon-block">
                <input type="text" class="weapon-name" placeholder="Arma">
                <div class="flex items-center gap-1">
                    <input type="text" class="attack-bonus-display w-full p-1 text-center" placeholder="Bônus" readonly>
                    <select class="attack-type-select w-20 p-1">
                        <option value="vig">VIG</option>
                        <option value="des">DES</option>
                    </select>
                </div>
                <div class="flex items-center gap-2">
                    <input type="text" class="dano-input w-full" placeholder="Dano (ex: 3d8+2)">
                    <svg class="dice-icon w-6 h-6 rollable cursor-pointer" viewBox="0 0 24 24"><path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>
                </div>
                <input type="text" placeholder="Crítico / Notas">
            </div>
            <button class="remove-weapon-btn mt-2 w-full text-xs text-red-500 hover:text-red-400">Remover Arma</button>
            <hr class="border-stone-700 mt-2">
        `;
        const lastHr = weaponList.querySelector('.weapon-block-container:last-child hr');
        if (lastHr) lastHr.classList.remove('hidden');
        weaponList.appendChild(weaponRow);
        weaponList.querySelector('.weapon-block-container:last-child hr').classList.add('hidden');
    }

    createWeaponRow();
    addWeaponBtn.addEventListener('click', createWeaponRow);
    weaponList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-weapon-btn')) {
            e.target.closest('.weapon-block-container').remove();
            const lastContainer = weaponList.querySelector('.weapon-block-container:last-child');
            if (lastContainer) {
                lastContainer.querySelector('hr').classList.add('hidden');
            }
        }
    });

    function setupDynamicList(listId, buttonId, placeholder) {
        const list = document.getElementById(listId);
        const addButton = document.getElementById(buttonId);
        const createRow = () => {
            const row = document.createElement('div');
            row.className = 'flex items-center gap-2';
            row.innerHTML = `<input type="text" placeholder="${placeholder}" class="w-full p-1"><button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg">X</button>`;
            list.appendChild(row);
        };
        addButton.addEventListener('click', createRow);
        list.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                e.target.parentElement.remove();
            }
        });
        createRow();
    }

    setupDynamicList('talentos-list', 'add-talento-btn', 'Novo talento...');
    setupDynamicList('poderes-list', 'add-poder-btn', 'Novo poder da Força...');
    setupDynamicList('idiomas-list', 'add-idioma-btn', 'Novo idioma...');
    setupDynamicList('aptidoes-list', 'add-aptidao-btn', 'Nova aptidão...');

    popularEspecies();
    popularClasses();
    popularTamanhos();
}
initFicha();