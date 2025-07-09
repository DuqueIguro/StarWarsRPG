// backup.js

const SAVE_KEY = 'fichaAutomaticaSagaData';

// Função para SALVAR todos os dados da ficha no localStorage
function saveData() {
    const data = {
        // Seção Superior
        nome: document.getElementById('nome').value,
        jogador: document.getElementById('jogador').value,
        classe: document.getElementById('classe').value,
        nivel: document.getElementById('nivel').value,
        especie: document.getElementById('especie').value,
        tamanho: document.getElementById('tamanho').value,
        idade: document.getElementById('idade').value,
        sexo: document.getElementById('sexo').value,
        peso: document.getElementById('peso').value,
        altura: document.getElementById('altura').value,
        destino: document.getElementById('destino').value,

        // Atributos Base
        atributos: {
            vig: document.getElementById('vig-base').value,
            des: document.getElementById('des-base').value,
            con: document.getElementById('con-base').value,
            int: document.getElementById('int-base').value,
            sab: document.getElementById('sab-base').value,
            car: document.getElementById('car-base').value,
        },

        // Defesas (Apenas os campos editáveis)
        defesasOutros: {
            fort: document.getElementById('def-outros-fort').value,
            ref: document.getElementById('def-outros-ref').value,
            von: document.getElementById('def-outros-von').value,
        },

        // Combate
        combate: {
            pvAtual: document.getElementById('pv-atual').value,
            pvTotal: document.getElementById('pv-total').value, // Salvar o total caso seja editado manualmente
            velocidade: document.getElementById('velocidade').value,
            bab: document.getElementById('bab').value,
            pontosForca: document.getElementById('pontos-forca').value,
            pontosDestino: document.getElementById('pontos-destino').value,
        },

        // Condição e Lado Negro
        condicao: document.getElementById('condicao').value,
        ladoNegro: document.getElementById('lado-negro').value,

        // Listas Dinâmicas
        talentos: Array.from(document.querySelectorAll('#talentos-list input')).map(input => input.value),
        poderes: Array.from(document.querySelectorAll('#poderes-list input')).map(input => input.value),
        idiomas: Array.from(document.querySelectorAll('#idiomas-list input')).map(input => input.value),
        aptidoes: Array.from(document.querySelectorAll('#aptidoes-list input')).map(input => input.value),

        // Perícias
        pericias: Array.from(document.querySelectorAll('.pericia-item')).map(item => ({
            id: item.dataset.skill,
            treinado: item.querySelector('.trained-check').checked,
            foco: item.querySelector('.focus-check').checked,
            outros: item.querySelector('.other-bonus').value
        })),

        // Equipamento
        equipamento: Array.from(document.querySelectorAll('#equipment-list .grid')).map(row => ({
            nome: row.querySelector('input[type="text"]').value,
            custo: row.querySelector('input[type="number"]').value,
            peso: row.querySelector('.item-weight').value
        })),

        // Armas
        armas: Array.from(document.querySelectorAll('.weapon-block-container')).map(row => ({
            nome: row.querySelector('.weapon-name').value,
            tipoAtaque: row.querySelector('.attack-type-select').value,
            dano: row.querySelector('.dano-input').value,
            notas: row.querySelector('input[placeholder="Crítico / Notas"]').value
        })),

        // Anotações
        anotacoes: document.querySelector('textarea').value
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    console.log("Ficha Salva!");
}

// Função para CARREGAR todos os dados da ficha do localStorage
function loadData() {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) return;

    const data = JSON.parse(savedData);

    // Preenche campos simples
    document.getElementById('nome').value = data.nome || '';
    document.getElementById('jogador').value = data.jogador || '';
    document.getElementById('classe').value = data.classe || '';
    document.getElementById('nivel').value = data.nivel || 1;
    document.getElementById('especie').value = data.especie || '';
    document.getElementById('tamanho').value = data.tamanho || 'medio';
    document.getElementById('idade').value = data.idade || '';
    document.getElementById('sexo').value = data.sexo || '';
    document.getElementById('peso').value = data.peso || '';
    document.getElementById('altura').value = data.altura || '';
    document.getElementById('destino').value = data.destino || '';
    document.getElementById('vig-base').value = data.atributos.vig || 10;
    document.getElementById('des-base').value = data.atributos.des || 10;
    document.getElementById('con-base').value = data.atributos.con || 10;
    document.getElementById('int-base').value = data.atributos.int || 10;
    document.getElementById('sab-base').value = data.atributos.sab || 10;
    document.getElementById('car-base').value = data.atributos.car || 10;
    document.getElementById('def-outros-fort').value = data.defesasOutros.fort || 0;
    document.getElementById('def-outros-ref').value = data.defesasOutros.ref || 0;
    document.getElementById('def-outros-von').value = data.defesasOutros.von || 0;
    document.getElementById('pv-atual').value = data.combate.pvAtual || 10; // Carrega para o input escondido
    document.getElementById('pv-total').value = data.combate.pvTotal || 10;
    document.getElementById('velocidade').value = data.combate.velocidade || 6;
    document.getElementById('bab').value = data.combate.bab || 0;
    document.getElementById('pontos-forca').value = data.combate.pontosForca || 1;
    document.getElementById('pontos-destino').value = data.combate.pontosDestino || 1;
    document.getElementById('condicao').value = data.condicao || '0';
    document.getElementById('lado-negro').value = data.ladoNegro || 0;
    document.querySelector('textarea').value = data.anotacoes || '';

    // Preenche Perícias
    if (data.pericias) {
        data.pericias.forEach(periciaData => {
            const periciaEl = document.querySelector(`.pericia-item[data-skill="${periciaData.id}"]`);
            if (periciaEl) {
                periciaEl.querySelector('.trained-check').checked = periciaData.treinado;
                periciaEl.querySelector('.focus-check').checked = periciaData.foco;
                periciaEl.querySelector('.other-bonus').value = periciaData.outros;
            }
        });
    }

    // Recria listas dinâmicas
    const recreateList = (listId, items, placeholder) => {
        const list = document.getElementById(listId);
        list.innerHTML = '';
        if (items && items.length > 0) {
            items.forEach(itemValue => {
                if (itemValue.trim() !== '') {
                    const row = document.createElement('div');
                    row.className = 'flex items-center gap-2';
                    row.innerHTML = `<input type="text" value="${itemValue}" class="w-full p-1"><button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg">X</button>`;
                    list.appendChild(row);
                }
            });
        }
    };
    recreateList('talentos-list', data.talentos, 'Novo talento...');
    recreateList('poderes-list', data.poderes, 'Novo poder da Força...');
    recreateList('idiomas-list', data.idiomas, 'Novo idioma...');
    recreateList('aptidoes-list', data.aptidoes, 'Nova aptidão...');

    // Recria Equipamentos
    const equipmentList = document.getElementById('equipment-list');
    equipmentList.innerHTML = '';
    if (data.equipamento && data.equipamento.length > 0) {
        data.equipamento.forEach(itemData => {
            const itemRow = document.createElement('div');
            itemRow.className = 'grid grid-cols-12 gap-2 items-center';
            itemRow.innerHTML = `
                <input type="text" value="${itemData.nome}" class="col-span-6 p-1">
                <input type="number" value="${itemData.custo}" class="col-span-3 p-1 text-center">
                <input type="number" step="0.1" value="${itemData.peso}" class="col-span-2 p-1 text-center item-weight">
                <button class="remove-item-btn col-span-1 text-red-500 hover:text-red-400 font-bold text-center text-lg">X</button>
            `;
            equipmentList.appendChild(itemRow);
        });
    }

    // Recria Armas
    const weaponList = document.getElementById('weapon-list');
    weaponList.innerHTML = '';
    if (data.armas && data.armas.length > 0) {
        data.armas.forEach(armaData => {
            const weaponRow = document.createElement('div');
            weaponRow.className = 'weapon-block-container';
            weaponRow.innerHTML = `
                <div class="grid grid-cols-2 gap-2 weapon-block">
                    <input type="text" class="weapon-name" value="${armaData.nome}">
                    <div class="flex items-center gap-1">
                        <input type="text" class="attack-bonus-display w-full p-1 text-center" readonly>
                        <select class="attack-type-select w-20 p-1">
                            <option value="vig" ${armaData.tipoAtaque === 'vig' ? 'selected' : ''}>VIG</option>
                            <option value="des" ${armaData.tipoAtaque === 'des' ? 'selected' : ''}>DES</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="text" class="dano-input w-full" value="${armaData.dano}">
                        <svg class="dice-icon w-6 h-6 rollable cursor-pointer" viewBox="0 0 24 24"><path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>
                    </div>
                    <input type="text" value="${armaData.notas}" placeholder="Crítico / Notas">
                </div>
                <button class="remove-weapon-btn mt-2 w-full text-xs text-red-500 hover:text-red-400">Remover Arma</button>
                <hr class="border-stone-700 mt-2">
            `;
            weaponList.appendChild(weaponRow);
        });
        const lastHr = weaponList.querySelector('.weapon-block-container:last-child hr');
        if (lastHr) lastHr.classList.add('hidden');
    }

    // Chama a função para aplicar modificadores e recalcular toda a ficha
    aplicarModificadoresDeTamanho();
    aplicarModificadoresRaciais(); // Isso chamará updateSheet() no final, que por sua vez chamará updateHpDisplay()
    console.log("Ficha Carregada!");
}

// Função para vincular a ação de salvar a todos os campos relevantes
function bindSaveOnChange() {
    const allInputsAndSelects = document.querySelectorAll('input, select, textarea');
    allInputsAndSelects.forEach(element => {
        element.addEventListener('change', saveData);
        element.addEventListener('keyup', saveData); // Salva enquanto digita
        element.addEventListener('input', saveData); // Salva ao digitar
        window.addEventListener('click', saveData); // Salva ao clicar
    });
    // Adiciona listener para botões de remover/adicionar
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn') || e.target.id.includes('add-')) {
            setTimeout(saveData, 100); // Pequeno delay para garantir que a DOM foi atualizada
        }
    });
}