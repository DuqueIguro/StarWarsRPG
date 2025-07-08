let ultimoPvCalculado = 0;

function initFicha() {
    function updateSheet() {

    console.log('Atualizando ficha...');
    console.log('TESTE DO UPDATE SHEET');
    aplicarBonusDeClasse();
    const nivelEl = document.getElementById('nivel');
    const classeEl = document.getElementById('classe');
    const nivel = parseInt(nivelEl.value) || 0;
    const nomeClasse = classeEl.value.toLowerCase().trim();
    const babInput = document.getElementById('bab');
    if (nomeClasse && DADOS_CLASSES[nomeClasse] && nivel >= 1 && nivel <= 20) {
        const classeData = DADOS_CLASSES[nomeClasse];
        babInput.value = classeData.bba[nivel - 1];
    } else {
        babInput.value = '0';
    }
    ['vig', 'des', 'con', 'int', 'sab', 'car'].forEach(attr => {
        const baseInput = document.getElementById(`${attr}-base`);
        const finalEl = document.getElementById(`${attr}-final`);
        const modEl = document.getElementById(`${attr}-mod`);
        const baseValue = parseInt(baseInput.value) || 0;
        const modRacial = modificadoresRaciais[attr] || 0;
        const finalValue = baseValue + modRacial;
        const mod = calculateModifier(finalValue);
        mods[attr] = mod;
        finalEl.textContent = finalValue;
        modEl.textContent = mod >= 0 ? `+${mod}` : mod;
        const rollIcon = modEl.nextElementSibling;
        if (rollIcon) {
            rollIcon.dataset.rollModifier = mod;
            rollIcon.dataset.rollLabel = `Teste de ${baseInput.previousElementSibling.textContent}`;
        }
    });

    const pvTotalInput = document.getElementById('pv-total');
    const pvAtualInput = document.getElementById('pv-atual');
    const pontosDestinoInput = document.getElementById('pontos-destino');

    // Calcula o PV teórico
    let pvCalculado = 0;
    if (nomeClasse && DADOS_CLASSES[nomeClasse] && nivel >= 1) {
        const classeData = DADOS_CLASSES[nomeClasse];
        const modCon = mods.con || 0;
        const vidaMediaPorNivel = Math.floor(classeData.dadoVida / 2) + 1;
        let totalPv = classeData.pvIniciais;
        if (nivel > 1) {
            totalPv += (nivel - 1) * vidaMediaPorNivel;
        }
        totalPv += modCon * nivel;
        pvCalculado = totalPv;
        pontosDestinoInput.value = nivel;
    } else {
        pvCalculado = 10; // Valor base se não houver classe/nível
        pontosDestinoInput.value = '1';
    }

    // Verifica se o valor atual foi editado manualmente
    const pvAtualNoInput = parseInt(pvTotalInput.value) || 0;

    // Se o valor no input for igual ao último calculado, atualiza.
    if (pvAtualNoInput === ultimoPvCalculado || ultimoPvCalculado === 0 || pvAtualNoInput > pvCalculado) {
        pvTotalInput.value = pvCalculado;
        // Se o PV atual era maior que o novo máximo, ou estava no valor padrão de 10, reseta para o máximo.
        if (parseInt(pvAtualInput.value) > pvCalculado || pvAtualInput.value === '10' || pvAtualNoInput === ultimoPvCalculado) {
            pvAtualInput.value = pvCalculado;
        }
    }

    ultimoPvCalculado = pvCalculado;

    // Garante que o PV atual não seja maior que o total
    if (parseInt(pvAtualInput.value) > parseInt(pvTotalInput.value)) {
        pvAtualInput.value = pvTotalInput.value;
    }

    // Atualiza o display de PV/HP
    updateHpDisplay();

    calculateCarryingCapacity();
    updateTotalWeight();

    const bonusClasseFort = parseInt(document.getElementById('def-classe-fort').value) || 0;
    const bonusClasseRef = parseInt(document.getElementById('def-classe-ref').value) || 0;
    const bonusClasseVon = parseInt(document.getElementById('def-classe-von').value) || 0;
    const bonusArmaduraFort = parseInt(document.getElementById('def-armadura-fort').value) || 0;
    const bonusArmaduraRef = parseInt(document.getElementById('def-armadura-ref').value) || 0;
    const bonusArmaduraVon = parseInt(document.getElementById('def-armadura-von').value) || 0;
    const bonusTamanhoRef = parseInt(document.getElementById('def-tamanho-ref').value) || 0;
    const bonusOutrosFort = parseInt(document.getElementById('def-outros-fort').value) || 0;
    const bonusOutrosRef = parseInt(document.getElementById('def-outros-ref').value) || 0;
    const bonusOutrosVon = parseInt(document.getElementById('def-outros-von').value) || 0;
    const reflexBase = Math.max(nivel, bonusArmaduraRef);
    document.getElementById('def-fort').textContent = 10 + nivel + (mods.con || 0) + bonusClasseFort + bonusArmaduraFort + bonusOutrosFort;
    document.getElementById('def-ref').textContent = 10 + reflexBase + (mods.des || 0) + bonusClasseRef + bonusTamanhoRef + bonusOutrosRef;
    document.getElementById('def-von').textContent = 10 + nivel + (mods.sab || 0) + bonusClasseVon + bonusArmaduraVon + bonusOutrosVon;
    document.getElementById('dano-limite-total').textContent = (parseInt(document.getElementById('def-fort').textContent) || 0) + (modificadoresTamanho.modDanoLimite || 0);
    const halfLevel = Math.floor(nivel / 2);
    document.querySelectorAll('.pericia-item').forEach(item => {
        const attrName = item.dataset.attr;
        const attrMod = mods[attrName] || 0;
        item.querySelector('.half-level').textContent = halfLevel;
        item.querySelector('.attr-mod').textContent = attrMod >= 0 ? `+${attrMod}` : attrMod;
        let total = calculateSkillTotal(item);
        if (item.dataset.skill === 'furtividade') {
            total += (modificadoresTamanho.modFurtividade || 0);
        }
        item.querySelector('.total-skill').textContent = total >= 0 ? `+${total}` : total;
        const rollIcon = item.querySelector('.rollable');
        if (rollIcon) {
            rollIcon.dataset.rollModifier = total;
            rollIcon.dataset.rollLabel = `Teste de ${item.querySelector('label').textContent.split('(')[0].trim()}`;
        }
    });
    const iniciativaPericiaTotal = calculateSkillTotal(document.querySelector('[data-skill="iniciativa"]'));
    const iniciativaContainer = document.getElementById('iniciativa-total').parentElement;
    iniciativaContainer.querySelector('.stat-mod').textContent = `= ${iniciativaPericiaTotal >= 0 ? '+' : ''}${iniciativaPericiaTotal}`;
    iniciativaContainer.querySelector('.rollable').dataset.rollModifier = iniciativaPericiaTotal;
    iniciativaContainer.querySelector('.rollable').dataset.rollLabel = 'Teste de Iniciativa';
    updateAttackBonuses();
}
    // Referências aos elementos da página
    const selectEspecie = document.getElementById('especie');
    const selectTamanho = document.getElementById('tamanho');
    const pNotasRaciais = document.getElementById('notas-raciais');

    // Objeto para guardar os modificadores
    let modificadoresRaciais = {};
    let modificadoresTamanho = {};

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

    // Função para aplicar modificadores de tamanho
    function aplicarModificadoresDeTamanho() {
        const chaveSelecionada = selectTamanho.value;
        modificadoresTamanho = DADOS_TAMANHOS[chaveSelecionada] || { modDefesaReflexo: 0, modFurtividade: 0, modDanoLimite: 0 };

        // Atualiza o campo de bônus de Reflexo pelo tamanho
        document.getElementById('def-tamanho-ref').value = modificadoresTamanho.modDefesaReflexo || 0;

        updateSheet();
    }

    // Função que é executada quando o jogador troca a espécie
    function aplicarModificadoresRaciais() {
        const chaveSelecionada = selectEspecie.value;
        const raca = DADOS_RACAS[chaveSelecionada] || { modificadores: {}, bonusDefesa: {}, linguagens: [], notas: '' };
        modificadoresRaciais = raca.modificadores;
        const bonusDefesa = raca.bonusDefesa || {};
        document.getElementById('def-outros-fort').value = bonusDefesa.fort || 0;
        document.getElementById('def-outros-ref').value = bonusDefesa.ref || 0;
        document.getElementById('def-outros-von').value = bonusDefesa.von || 0;
        const idiomasList = document.getElementById('idiomas-list');
        idiomasList.innerHTML = '';
        const linguagens = raca.linguagens || [];
        if (linguagens.length > 0) {
            linguagens.forEach(lang => {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-2 py-1';
                row.innerHTML = `<input type="text" value="${lang}" class="w-full p-1" readonly><button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg">X</button>`;
                idiomasList.appendChild(row);
            });
        } else {
            const list = document.getElementById('idiomas-list');
            const row = document.createElement('div');
            row.className = 'flex items-center gap-2 py-1';
            row.innerHTML = `<input type="text" placeholder="Novo idioma..." class="w-full p-1"><button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg">X</button>`;
            list.appendChild(row);
        }
        pNotasRaciais.textContent = raca.notas || 'Nenhuma nota especial para esta espécie.';
        updateSheet();
    }

    // Funções para adicionar e remover itens e armas automáticos
    function adicionarArmaPadrao(id, nome, dano, tipoAtaque = 'vig') {
        const weaponList = document.getElementById('weapon-list');
        if (weaponList.querySelector(`[data-automatic-id="${id}"]`)) return;

        const weaponRow = document.createElement('div');
        weaponRow.className = 'weapon-block-container arma-automatica';
        weaponRow.dataset.automaticId = id;
        weaponRow.innerHTML = `
            <div class="grid grid-cols-2 gap-2 weapon-block">
                <input type="text" class="weapon-name" value="${nome}">
                <div class="flex items-center gap-1">
                    <input type="text" class="attack-bonus-display w-full p-1 text-center" readonly>
                    <select class="attack-type-select w-20 p-1">
                        <option value="vig" ${tipoAtaque === 'vig' ? 'selected' : ''}>VIG</option>
                        <option value="des" ${tipoAtaque === 'des' ? 'selected' : ''}>DES</option>
                    </select>
                </div>
                <div class="flex items-center gap-2">
                    <input type="text" class="dano-input w-full" value="${dano}">
                    <svg class="dice-icon w-6 h-6 rollable cursor-pointer" viewBox="0 0 24 24"><path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>
                </div>
                <input type="text" value="19-20/x2 Ignora RD" placeholder="Crítico / Notas">
            </div>
            <button class="remove-weapon-btn mt-2 w-full text-xs text-red-500 hover:text-red-400">Remover Arma</button>
            <hr class="border-stone-700 mt-2 hidden">
        `;
        weaponList.appendChild(weaponRow);
        updateSheet();
    }

    function removerArmaPadrao(id) {
        const armaParaRemover = document.querySelector(`.arma-automatica[data-automatic-id="${id}"]`);
        if (armaParaRemover) armaParaRemover.remove();
    }

    function adicionarItemPadrao(id, nome, peso) {
        const equipmentList = document.getElementById('equipment-list');
        if (equipmentList.querySelector(`[data-automatic-id="${id}"]`)) return;
        const itemRow = document.createElement('div');
        itemRow.className = 'grid grid-cols-12 gap-2 items-center item-automatico';
        itemRow.dataset.automaticId = id;
        itemRow.innerHTML = `
            <input type="text" value="${nome}" class="col-span-6 p-1">
            <input type="number" placeholder="0" class="col-span-3 p-1 text-center">
            <input type="number" step="0.1" value="${peso}" class="col-span-2 p-1 text-center item-weight">
            <button class="remove-item-btn col-span-1 text-red-500 hover:text-red-400 font-bold text-center text-lg">X</button>
        `;
        equipmentList.appendChild(itemRow);
        updateTotalWeight();
    }

    function removerItemPadrao(id) {
        const itemParaRemover = document.querySelector(`.item-automatico[data-automatic-id="${id}"]`);
        if (itemParaRemover) itemParaRemover.remove();
        updateTotalWeight();
    }

    // Função que aplica os bônus da classe
    function aplicarBonusDeClasse() {
        const nomeClasse = document.getElementById('classe').value.toLowerCase().trim();
        const classeData = DADOS_CLASSES[nomeClasse] || { bonusDefesa: {}, talentosIniciais: [] };
        const bonus = classeData.bonusDefesa;
        document.getElementById('def-classe-fort').value = bonus.fort || 0;
        document.getElementById('def-classe-ref').value = bonus.ref || 0;
        document.getElementById('def-classe-von').value = bonus.von || 0;
        const talentosList = document.getElementById('talentos-list');
        talentosList.querySelectorAll('.talento-automatico').forEach(el => el.remove());
        const placeholderInput = talentosList.querySelector('input[placeholder="Novo talento..."]');
        if (placeholderInput) placeholderInput.parentElement.remove();
        const talentos = classeData.talentosIniciais || [];
        if (talentos.length > 0) {
            talentos.forEach(talento => {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-2 py-1 talento-automatico';
                row.innerHTML = `<input type="text" value="${talento}" class="w-full p-1" readonly><button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg">X</button>`;
                talentosList.appendChild(row);
            });
        }
        if (talentosList.children.length === 0) {
            const row = document.createElement('div');
            row.className = 'flex items-center gap-2 py-1';
            row.innerHTML = `<input type="text" placeholder="Novo talento..." class="w-full p-1"><button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg">X</button>`;
            talentosList.appendChild(row);
        }
        const weaponList = document.getElementById('weapon-list');
        if (nomeClasse === 'jedi') {
            const currentWeaponInputs = weaponList.querySelectorAll('.weapon-name');
            let allPlaceholders = currentWeaponInputs.length > 0;
            currentWeaponInputs.forEach(input => {
                if (input.value !== '') allPlaceholders = false;
            });
            if (allPlaceholders) weaponList.innerHTML = '';
            adicionarArmaPadrao('sabre-jedi', 'Sabre de Luz', '2d8', 'des');
            adicionarItemPadrao('sabre-jedi', 'Sabre de Luz', 1.0);
        } else {
            removerArmaPadrao('sabre-jedi');
            removerItemPadrao('sabre-jedi');
            if (weaponList.children.length === 0) {
                createWeaponRow();
            }
        }
    }

    // Variáveis e constantes globais
    const mods = {};
    const diceIconSvg = `<svg class="dice-icon w-6 h-6 rollable" viewBox="0 0 24 24"><path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>`;
    const skillsList = {
        'Acrobacia': 'des', 'Conhecimento (Burocracia)': 'int', 'Conhecimento (Ciências Biológicas)': 'int',
        'Conhecimento (Ciências Exatas)': 'int', 'Conhecimento (Ciências Humanas)': 'int', 'Conhecimento (Táticas)': 'int',
        'Conhecimento (Tecnologia)': 'int', 'Conhecimento (Tradições Galácticas)': 'int', 'Enganação': 'car', 'Escalar': 'vig',
        'Furtividade': 'des', 'Iniciativa': 'des', 'Mecânica': 'int', 'Montar': 'des', 'Nadar': 'vig', 'Obter Informação': 'car',
        'Percepção': 'sab', 'Persuasão': 'car', 'Pilotar': 'des', 'Resistência': 'con', 'Saltar': 'vig', 'Sobrevivência': 'sab',
        'Tratar Ferimentos': 'sab', 'Usar a Força': 'sab', 'Usar Computadores': 'int'
    };

    // Criação dinâmica da lista de perícias
    const skillsContainer = document.querySelector('#pericias .grid');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        Object.entries(skillsList).forEach(([name, attr]) => {
            const skillId = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const skillHTML = `
                <div class="pericia-item col-span-1 border-b border-stone-700 py-3" data-skill="${skillId}" data-attr="${attr}">
                    <div class="flex justify-between items-center mb-2">
                        <label class="font-semibold text-base text-yellow-400">${name} (${attr.toUpperCase()})</label>
                        <div class="flex items-center gap-3">
                            <div class="total-skill stat-mod text-2xl font-bold">= +0</div>
                            ${diceIconSvg}
                        </div>
                    </div>
                    <div class="grid grid-cols-5 gap-2 text-center text-xs">
                        <div><div class="half-level stat-box py-1 text-lg">0</div><div>1/2 NÍVEL</div></div>
                        <div><div class="attr-mod stat-box py-1 text-lg">+0</div><div>MOD.</div></div>
                        <div><input type="checkbox" class="trained-check h-6 w-6 mx-auto mb-1"><div>TREINO</div></div>
                        <div><input type="checkbox" class="focus-check h-6 w-6 mx-auto mb-1"><div>FOCO</div></div>
                        <div><input type="number" value="0" class="other-bonus text-center w-full text-lg"><div>OUTROS</div></div>
                    </div>
                </div>
            `;
            skillsContainer.innerHTML += skillHTML;
        });
    }

    // Demais constantes e funções globais
    const diceModal = document.getElementById('dice-modal');
    const closeModalButton = document.getElementById('close-modal');
    const allInputs = document.querySelectorAll('input, select');
    const calculateModifier = (value) => Math.floor((value - 10) / 2);

    function updateAttackBonuses() {
        const bba = parseInt(document.getElementById('bab').value) || 0;
        document.querySelectorAll('.weapon-block').forEach(block => {
            const bonusDisplay = block.querySelector('.attack-bonus-display');
            const typeSelect = block.querySelector('.attack-type-select');
            const rollIcon = block.querySelector('.rollable.cursor-pointer');
            if (bonusDisplay && typeSelect) {
                const selectedAttrKey = typeSelect.value;
                const selectedAttrText = typeSelect.options[typeSelect.selectedIndex].text;
                const attrMod = mods[selectedAttrKey] || 0;
                const totalBonus = bba + attrMod;
                bonusDisplay.value = `${bba} + ${selectedAttrText}`;
                if (rollIcon) {
                    rollIcon.dataset.rollType = "attack"; // Garante que o tipo seja ataque
                    rollIcon.dataset.attackModifier = totalBonus;
                    const weaponName = block.querySelector('.weapon-name').value || 'Ataque';
                    rollIcon.dataset.rollLabel = `Ataque com ${weaponName}`;
                }
            }
        });
    }

    // Função para atualizar o mostrador de PV
    function updateHpDisplay() {
        const pvAtualInput = document.getElementById('pv-atual');
        const pvTotalInput = document.getElementById('pv-total');
        const pvDisplay = document.getElementById('pv-atual-display');

        if (pvDisplay) {
            const currentHp = pvAtualInput.value || 0;
            const maxHp = pvTotalInput.value || 0;
            pvDisplay.textContent = `${currentHp} / ${maxHp}`;
        }
    }


    function calculateSkillTotal(skillElement) {
        if (!skillElement) return 0;
        const nivel = parseInt(document.getElementById('nivel').value) || 0;
        const halfLevel = Math.floor(nivel / 2);
        const attrName = skillElement.dataset.attr;
        const attrMod = mods[attrName] || 0;
        const isTrained = skillElement.querySelector('.trained-check').checked;
        const hasFocus = skillElement.querySelector('.focus-check').checked;
        const otherBonus = parseInt(skillElement.querySelector('.other-bonus').value) || 0;
        const trainedBonus = isTrained ? 5 : 0;
        const focusBonus = hasFocus ? 5 : 0;
        if (skillElement.dataset.skill === 'iniciativa') {
            return attrMod + trainedBonus + focusBonus + otherBonus;
        }
        return halfLevel + attrMod + trainedBonus + focusBonus + otherBonus;
    }

    function rollDice(label, baseModifier) {
        const conditionEl = document.getElementById('condicao');
        let conditionPenalty = 0;
        if (conditionEl.value === 'incapaz') {
            showRollResult("Incapaz de Agir", "-", "O personagem está inconsciente ou desabilitado.");
            return;
        }
        conditionPenalty = parseInt(conditionEl.value) || 0;
        const d20Roll = Math.floor(Math.random() * 20) + 1;
        const total = d20Roll + baseModifier + conditionPenalty;
        let breakdown = `(Rolagem: ${d20Roll}) + (Bônus: ${baseModifier})`;
        if (conditionPenalty !== 0) breakdown += ` + (Condição: ${conditionPenalty})`;
        showRollResult(label, total, breakdown);
    }

    function rollDamage(damageString) {
        const regex = /(\d+)d(\d+)\s*([\+\-]\s*\d+)?/i;
        const match = damageString.replace(/\s/g, '').match(regex);
        if (!match) return { total: 'Inválido', breakdown: 'Formato de dano inválido. Use "XdY+Z".' };
        const numDice = parseInt(match[1]);
        const dieType = parseInt(match[2]);
        const modifier = match[3] ? parseInt(match[3].replace(/\s/g, '')) : 0;
        let total = 0;
        let rolls = [];
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * dieType) + 1;
            rolls.push(roll);
            total += roll;
        }
        total += modifier;
        let breakdown = `Rolagens: [${rolls.join(', ')}]`;
        if (modifier !== 0) breakdown += ` ${modifier > 0 ? '+' : '-'} ${Math.abs(modifier)}`;
        return { total, breakdown };
    }

    function showRollResult(label, result, breakdown) {
        document.getElementById('roll-label').textContent = label;
        document.getElementById('roll-result').innerHTML = result;
        document.getElementById('roll-breakdown').innerHTML = breakdown;
        diceModal.classList.add('show');
    }

    document.body.addEventListener('click', (event) => {
        const rollableElement = event.target.closest('.rollable');
        if (rollableElement) {
            const weaponBlock = rollableElement.closest('.weapon-block');
            if (weaponBlock) { // É uma rolagem de arma
                const weaponName = weaponBlock.querySelector('.weapon-name').value || 'Arma';
                const attackModifier = parseInt(rollableElement.dataset.attackModifier) || 0;
                const damageString = weaponBlock.querySelector('.dano-input').value;
                const conditionEl = document.getElementById('condicao');
                let conditionPenalty = 0;
                if (conditionEl.value === 'incapaz') {
                    showRollResult("Incapaz de Agir", "-", "O personagem está inconsciente ou desabilitado.");
                    return;
                }
                conditionPenalty = parseInt(conditionEl.value) || 0;
                const d20Roll = Math.floor(Math.random() * 20) + 1;
                const attackTotal = d20Roll + attackModifier + conditionPenalty;
                let attackBreakdown = `Ataque: (${d20Roll}) + (${attackModifier}) + (${conditionPenalty}) = ${attackTotal}`;
                const damageResult = rollDamage(damageString);
                showRollResult(
                    `Ataque e Dano: ${weaponName}`,
                    `Ataque: ${attackTotal} | Dano: ${damageResult.total}`,
                    `${attackBreakdown}<br>${damageResult.breakdown}`
                );
            } else { // É uma rolagem de perícia/atributo
                rollDice(rollableElement.dataset.rollLabel || 'Rolagem', parseInt(rollableElement.dataset.rollModifier) || 0);
            }
        }
    });

    closeModalButton.addEventListener('click', () => diceModal.classList.remove('show'));
    diceModal.addEventListener('click', (event) => { if (event.target === diceModal) diceModal.classList.remove('show'); });
    selectEspecie.addEventListener('change', aplicarModificadoresRaciais);
    selectTamanho.addEventListener('change', aplicarModificadoresDeTamanho);

    allInputs.forEach(input => {
        if (input.id !== 'especie' && input.id !== 'tamanho') {
            input.addEventListener('input', updateSheet);
            input.addEventListener('change', updateSheet);
        }
    });
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
    function calculateCarryingCapacity() {
        const forcaFinal = parseInt(document.getElementById('vig-final').textContent) || 0;
        const maxWeight = (forcaFinal * forcaFinal) / 2;
        document.getElementById('max-weight').textContent = maxWeight.toFixed(1);
    }
    function updateTotalWeight() {
        let currentWeight = 0;
        document.querySelectorAll('.item-weight').forEach(input => {
            currentWeight += parseFloat(input.value) || 0;
        });
        document.getElementById('current-weight').textContent = currentWeight.toFixed(1);
    }
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
            updateTotalWeight();
        }
    });
    equipmentList.addEventListener('input', (e) => {
        if (e.target.classList.contains('item-weight')) {
            updateTotalWeight();
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
    const customRollBtn = document.getElementById('custom-roll-btn');
    function rollCustomDice(diceString, method, modifier) {
        const regex = /(\d+)d(\d+)/i;
        const match = diceString.match(regex);
        if (!match) return { total: 'Inválido', breakdown: 'Formato de dado inválido. Use "XdY".' };
        const numDice = parseInt(match[1]);
        const dieType = parseInt(match[2]);
        let result = 0;
        let rolls = [];
        for (let i = 0; i < numDice; i++) {
            rolls.push(Math.floor(Math.random() * dieType) + 1);
        }
        let breakdown = `Rolagens: [${rolls.join(', ')}]`;
        switch (method) {
            case 'vantagem':
                result = Math.max(...rolls);
                breakdown += ` -> Vantagem: ${result}`;
                break;
            case 'desvantagem':
                result = Math.min(...rolls);
                breakdown += ` -> Desvantagem: ${result}`;
                break;
            case 'soma':
            default:
                result = rolls.reduce((a, b) => a + b, 0);
                breakdown += ` -> Soma: ${result}`;
                break;
        }
        const finalTotal = result + modifier;
        if (modifier !== 0) breakdown += ` ${modifier > 0 ? '+' : '-'} ${Math.abs(modifier)}`;
        return { total: finalTotal, breakdown };
    }
    customRollBtn.addEventListener('click', () => {
        const diceInput = document.getElementById('custom-roll-dice');
        const methodInput = document.getElementById('custom-roll-method');
        const modifierInput = document.getElementById('custom-roll-modifier');
        const diceString = diceInput.value;
        const method = methodInput.value;
        const modifier = parseInt(modifierInput.value) || 0;
        if (!diceString) {
            showRollResult('Erro', 'Dados não especificados', 'Por favor, insira os dados no formato XdY.');
            return;
        }
        const result = rollCustomDice(diceString, method, modifier);
        showRollResult('Rolagem Personalizada', result.total, result.breakdown);
        diceInput.value = '';
        modifierInput.value = '0';
        methodInput.value = 'soma';
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

    // Event listener para o botão de resetar PV
    const resetPvBtn = document.getElementById('reset-pv-btn');
    if (resetPvBtn) {
        resetPvBtn.addEventListener('click', () => {
            // Força a atualização do campo de PV para o valor calculado mais recente
            // A própria chamada a updateSheet() vai fazer isso se resetarmos a variável de controle
            ultimoPvCalculado = 0;
            updateSheet();
            console.log("Cálculo de PV restaurado para automático.");
        });
    }

    const hpControlBar = document.getElementById('hp-control-bar');
    if (hpControlBar) {
        hpControlBar.addEventListener('click', (e) => {
            const button = e.target.closest('.hp-btn');
            if (!button) return;

            const action = button.dataset.action;
            const amount = button.dataset.amount;
            const pvAtualInput = document.getElementById('pv-atual');
            const pvTotalInput = document.getElementById('pv-total');

            let currentHp = parseInt(pvAtualInput.value) || 0;
            const maxHp = parseInt(pvTotalInput.value) || 0;

            if (action === 'decrease') {
                currentHp -= parseInt(amount);
            } else if (action === 'increase') {
                currentHp += parseInt(amount);
            } else if (action === 'set') {
                if (amount === '0') {
                    currentHp = 0;
                } else if (amount === 'max') {
                    currentHp = maxHp;
                }
            }

            // Garante que a vida não passe dos limites
            if (currentHp < 0) currentHp = 0;
            if (currentHp > maxHp) currentHp = maxHp;

            // Atualiza o input escondido e o mostrador
            pvAtualInput.value = currentHp;
            updateHpDisplay();

            // Salva as alterações
            saveData();
        });
    }

    // Chave para o localStorage
const SAVE_KEY = 'starwarsrpg_ficha_save';

// Função para salvar os dados do formulário
function saveData() {
    const data = {};
    // Campos dentro de pericia-item
    document.querySelectorAll('input, select, textarea').forEach(el => {
        // Campos dentro de pericia-item
        if (
            el.closest('.pericia-item') &&
            (
                (el.type === 'checkbox' && (el.classList.contains('trained-check') || el.classList.contains('focus-check'))) ||
                el.classList.contains('other-bonus')
            )
        ) {
            const pericia = el.closest('.pericia-item').dataset.skill;
            if (el.type === 'checkbox') {
                const tipo = el.classList.contains('trained-check') ? 'trained' : 'focus';
                data[`pericia_${pericia}_${tipo}`] = el.checked;
            } else if (el.classList.contains('other-bonus')) {
                data[`pericia_${pericia}_other`] = el.value;
            }
        }
        // Checkboxes genéricas
        else if (el.type === 'checkbox') {
            data[el.id || el.name || el.className + el.value] = el.checked;
        }
        // Outros campos
        else {
            data[el.id || el.name || el.className + el.value] = el.value;
        }
    });
    // Salva todas as armas corretamente, mesmo com múltiplas armas
    document.querySelectorAll('.weapon-block-container').forEach((container, idx) => {
        // Use sempre o índice como identificador único para garantir ordem e unicidade
        const weaponId = idx;
        const nomeArma = container.querySelector('.weapon-name');
        if (nomeArma) {
            data[`weapon_${weaponId}_name`] = nomeArma.value;
        }
        const bonusAtaqueArma = container.querySelector('.attack-bonus-display');
        if (bonusAtaqueArma) {
            data[`weapon_${weaponId}_bonus`] = bonusAtaqueArma.value;
        }
        const tipoAtaqueArma = container.querySelector('.attack-type-select');
        if (tipoAtaqueArma) {
            data[`weapon_${weaponId}_type`] = tipoAtaqueArma.value;
        }
        const danoArma = container.querySelector('.dano-input');
        if (danoArma) {
            data[`weapon_${weaponId}_dano`] = danoArma.value;
        }
        // O campo de notas/crítico é o ÚLTIMO input[type="text"] que não é .weapon-name nem .dano-input
        const allTextInputs = Array.from(container.querySelectorAll('input[type="text"]'));
        const notasArma = allTextInputs.find(
            el => !el.classList.contains('weapon-name') && !el.classList.contains('dano-input')
        );
        if (notasArma) {
            data[`weapon_${weaponId}_notas`] = notasArma.value;
        }
    });
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

// Função para carregar os dados do formulário
function loadData() {
    const data = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    document.querySelectorAll('input, select, textarea').forEach(el => {
        // Campos dentro de pericia-item
        if (
            el.closest('.pericia-item') &&
            (
                (el.type === 'checkbox' && (el.classList.contains('trained-check') || el.classList.contains('focus-check'))) ||
                el.classList.contains('other-bonus')
            )
        ) {
            const pericia = el.closest('.pericia-item').dataset.skill;
            if (el.type === 'checkbox') {
                const tipo = el.classList.contains('trained-check') ? 'trained' : 'focus';
                const key = `pericia_${pericia}_${tipo}`;
                if (data.hasOwnProperty(key)) {
                    el.checked = data[key];
                }
            } else if (el.classList.contains('other-bonus')) {
                const key = `pericia_${pericia}_other`;
                if (data.hasOwnProperty(key)) {
                    el.value = data[key];
                }
            }
        }
        // Checkboxes genéricas
        else if (el.type === 'checkbox') {
            const key = el.id || el.name || el.className + el.value;
            if (data.hasOwnProperty(key)) {
                el.checked = data[key];
            }
        }
        // Outros campos
        else {
            const key = el.id || el.name || el.className + el.value;
            if (data.hasOwnProperty(key)) {
                el.value = data[key];
            }
        }
    });
    // Carrega todas as armas corretamente, mesmo com múltiplas armas
    document.querySelectorAll('.weapon-block-container').forEach((container, idx) => {
        const weaponId = idx;
        const nomeArma = container.querySelector('.weapon-name');
        if (nomeArma) {
            const key = `weapon_${weaponId}_name`;
            if (data.hasOwnProperty(key)) nomeArma.value = data[key];
        }
        const bonusAtaqueArma = container.querySelector('.attack-bonus-display');
        if (bonusAtaqueArma) {
            const key = `weapon_${weaponId}_bonus`;
            if (data.hasOwnProperty(key)) bonusAtaqueArma.value = data[key];
        }
        const tipoAtaqueArma = container.querySelector('.attack-type-select');
        if (tipoAtaqueArma) {
            const key = `weapon_${weaponId}_type`;
            if (data.hasOwnProperty(key)) tipoAtaqueArma.value = data[key];
        }
        const danoArma = container.querySelector('.dano-input');
        if (danoArma) {
            const key = `weapon_${weaponId}_dano`;
            if (data.hasOwnProperty(key)) danoArma.value = data[key];
        }
        // O campo de notas/crítico é o ÚLTIMO input[type="text"] que não é .weapon-name nem .dano-input
        const allTextInputs = Array.from(container.querySelectorAll('input[type="text"]'));
        const notasArma = allTextInputs.find(
            el => !el.classList.contains('weapon-name') && !el.classList.contains('dano-input')
        );
        if (notasArma) {
            const key = `weapon_${weaponId}_notas`;
            if (data.hasOwnProperty(key)) notasArma.value = data[key];
        }
    });

    // ...existing code for generic checkboxes and other fields...
    document.querySelectorAll('input, select, textarea').forEach(el => {
        // ...existing code for pericia-item...
        // ...existing code for generic checkboxes and other fields...
    });
}

// Função para salvar automaticamente ao alterar qualquer campo
function bindSaveOnChange() {
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('change', saveData);
        el.addEventListener('input', saveData);
    });
}

    loadData();
    bindSaveOnChange();
    updateSheet();

    // Se não houver dados salvos, faz um cálculo inicial da ficha.
    if (!localStorage.getItem(SAVE_KEY)) {
        aplicarModificadoresDeTamanho();
        updateSheet();
    }

}

// Chama a função de inicialização imediatamente
initFicha();

