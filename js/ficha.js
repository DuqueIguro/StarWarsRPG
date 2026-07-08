/* Substitua o seu defaultState atual por este */
const defaultState = {
    biografia: {
        nome: "", jogador: "", classe: "", nivel: 1, especie: "", tamanho: "", idade: "", sexo: "", peso: "", altura: "", destino: ""
    },
    atributosBase: {
        vigor: 10, destreza: 10, constituicao: 10, inteligencia: 10, sabedoria: 10, carisma: 10
    },
    recursos: {
        pontosVidaAtual: null, condicao: "0", pontosForca: 1, pontosDestino: 1, pontosLadoNegro: 0, creditos: 1000
    },
    modificadoresManuais: {
        status: {
            modVidaMaxima: 0, // Adicionamos este campo
            velocidadeDeslocamento: 6
        },
        defesas: { fortitude: { classe: 0, armadura: 0, outros: 0 }, reflexo: { classe: 0, armadura: 0, outros: 0 }, vontade: { classe: 0, armadura: 0, outros: 0 } },
        combate: { ataqueGeral: 0 }
    },
    pericias: {
        acrobacia: { nome: "Acrobacia", atributoBase: "des", treinada: false, foco: false, bonusManual: 0 },
        conhecimento_burocracia: { nome: "Conhecimento (Burocracia)", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        conhecimento_ciencias_biologicas: { nome: "Conhecimento (Ciências Biológicas)", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        conhecimento_ciencias_exatas: { nome: "Conhecimento (Ciências Exatas)", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        conhecimento_ciencias_humanas: { nome: "Conhecimento (Ciências Humanas)", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        conhecimento_taticas: { nome: "Conhecimento (Táticas)", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        conhecimento_tecnologia: { nome: "Conhecimento (Tecnologia)", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        conhecimento_tradicoes_galacticas: { nome: "Conhecimento (Tradições Galácticas)", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        enganacao: { nome: "Enganação", atributoBase: "car", treinada: false, foco: false, bonusManual: 0 },
        escalar: { nome: "Escalar", atributoBase: "vig", treinada: false, foco: false, bonusManual: 0 },
        furtividade: { nome: "Furtividade", atributoBase: "des", treinada: false, foco: false, bonusManual: 0 },
        iniciativa: { nome: "Iniciativa", atributoBase: "des", treinada: false, foco: false, bonusManual: 0 },
        mecanica: { nome: "Mecânica", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 },
        montar: { nome: "Montar", atributoBase: "des", treinada: false, foco: false, bonusManual: 0 },
        nadar: { nome: "Nadar", atributoBase: "vig", treinada: false, foco: false, bonusManual: 0 },
        obter_informacao: { nome: "Obter Informação", atributoBase: "car", treinada: false, foco: false, bonusManual: 0 },
        percepcao: { nome: "Percepção", atributoBase: "sab", treinada: false, foco: false, bonusManual: 0 },
        persuasao: { nome: "Persuasão", atributoBase: "car", treinada: false, foco: false, bonusManual: 0 },
        pilotar: { nome: "Pilotar", atributoBase: "des", treinada: false, foco: false, bonusManual: 0 },
        resistencia: { nome: "Resistência", atributoBase: "con", treinada: false, foco: false, bonusManual: 0 },
        saltar: { nome: "Saltar", atributoBase: "vig", treinada: false, foco: false, bonusManual: 0 },
        sobrevivencia: { nome: "Sobrevivência", atributoBase: "sab", treinada: false, foco: false, bonusManual: 0 },
        tratar_ferimentos: { nome: "Tratar Ferimentos", atributoBase: "sab", treinada: false, foco: false, bonusManual: 0 },
        usar_a_forca: { nome: "Usar a Força", atributoBase: "sab", treinada: false, foco: false, bonusManual: 0 },
        usar_computadores: { nome: "Usar Computadores", atributoBase: "int", treinada: false, foco: false, bonusManual: 0 }
    },
    caracteristicas: {
        talentos: [], poderesForca: [], idiomas: [], aptidoes: []
    },
    combate: {
        armas: []
    },
    inventario: {
        equipamentos: []
    },
    campanha: {
        anotacoes: ""
    }
};

let _internalState = JSON.parse(JSON.stringify(defaultState));

const appState = new Proxy(_internalState, {
    set(target, property, value, receiver) {
        // console.log(`[Estado] Propriedade alterada: ${property} para`, value);
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

    // NOVIDADE: Recalcula a matemática após qualquer alteração de estado!
    if (typeof calcularMatematicaDaFicha === 'function') {
        calcularMatematicaDaFicha();
    }
    // console.log(`[Estado] ${path} = ${value}`);
}
/* FIM DE FUNÇÃO DE [Gerenciamento de Estado] */



/* INÍCIO DE FUNÇÃO DE [Matemática Reativa]; esta função lê o Estado atual, faz os cálculos e atualiza a parte visual dos atributos derivados */
// function calcularMatematicaDaFicha() {
//     // Definir Nível no topo para estar disponível em todo o bloco
//     const nivel = parseInt(appState.biografia.nivel) || 1;
//     const classeKey = appState.biografia.classe;
//     const racaKey = appState.biografia.especie;
//     const tamanhoKey = appState.biografia.tamanho;
//     const halfLevel = Math.floor(nivel / 2);

//     // 1. Atributos
//     const raciais = (racaKey && DADOS_RACAS[racaKey]) ? DADOS_RACAS[racaKey].modificadores : {};
//     const atributosMapeamento = {
//         vigor: { id: 'vig', mod: 'vig' }, destreza: { id: 'des', mod: 'des' }, constituicao: { id: 'con', mod: 'con' },
//         inteligencia: { id: 'int', mod: 'int' }, sabedoria: { id: 'sab', mod: 'sab' }, carisma: { id: 'car', mod: 'car' }
//     };
//     const mods = {};

//     for (const [chaveEstado, cfg] of Object.entries(atributosMapeamento)) {
//         const valorBase = parseInt(appState.atributosBase[chaveEstado]) || 10;
//         const bonusRacial = raciais[cfg.mod] || 0;
//         const valorFinal = valorBase + bonusRacial;
//         const modificador = Math.floor((valorFinal - 10) / 2);
//         mods[cfg.mod] = modificador;

//         if (document.getElementById(`${cfg.id}-final`)) document.getElementById(`${cfg.id}-final`).textContent = valorFinal;
//         if (document.getElementById(`${cfg.id}-mod`)) document.getElementById(`${cfg.id}-mod`).textContent = (modificador >= 0 ? '+' : '') + modificador;
//     }

//     // 2. Defesas (Calculadas aqui para serem usadas abaixo)
//     const bonusClasse = (classeKey && DADOS_CLASSES[classeKey]) ? DADOS_CLASSES[classeKey].bonusDefesa : { fort: 0, ref: 0, von: 0 };
//     const bonusTamanho = (tamanhoKey && DADOS_TAMANHOS[tamanhoKey]) ? DADOS_TAMANHOS[tamanhoKey].modDefesaReflexo : 0;

//     // Cálculo das defesas fixas
//     const defFort = 10 + nivel + mods.con + (bonusClasse.fort || 0) + (parseInt(appState.modificadoresManuais.defesas.fortitude.classe) || 0) + (parseInt(appState.modificadoresManuais.defesas.fortitude.armadura) || 0) + (parseInt(appState.modificadoresManuais.defesas.fortitude.outros) || 0);
//     const defRef = 10 + nivel + mods.des + (bonusClasse.ref || 0) + bonusTamanho + (parseInt(appState.modificadoresManuais.defesas.reflexo.classe) || 0) + (parseInt(appState.modificadoresManuais.defesas.reflexo.armadura) || 0) + (parseInt(appState.modificadoresManuais.defesas.reflexo.outros) || 0);
//     const defVon = 10 + nivel + mods.sab + (bonusClasse.von || 0) + (parseInt(appState.modificadoresManuais.defesas.vontade.classe) || 0) + (parseInt(appState.modificadoresManuais.defesas.vontade.armadura) || 0) + (parseInt(appState.modificadoresManuais.defesas.vontade.outros) || 0);

//     if (document.getElementById('def-fort')) document.getElementById('def-fort').textContent = defFort;
//     if (document.getElementById('def-ref')) document.getElementById('def-ref').textContent = defRef;
//     if (document.getElementById('def-von')) document.getElementById('def-von').textContent = defVon;

//     // 3. Atualizar Mostrador de Pontos de Vida (dentro da calcularMatematicaDaFicha)
//     let pvBase = 0;
//     const pvMaximoFinal = pvBase + (parseInt(appState.modificadoresManuais.status.modVidaMaxima) || 0);

//     // Se for a primeira vez (null), assume vida cheia
//     let pvExibicao = (appState.recursos.pontosVidaAtual !== null) ? appState.recursos.pontosVidaAtual : pvMaximoFinal;
//     const pvDisplay = document.getElementById('pv-atual-display');
//     if (pvDisplay) {
//         pvDisplay.textContent = `${pvExibicao} / ${pvMaximoFinal}`;
//     }

//     // 4. Calcular Capacidade de Carga
//     let pesoTotal = 0;
//     const equipamentos = appState.inventario.equipamentos || [];
//     equipamentos.forEach(item => {
//         pesoTotal += parseFloat(item.peso) || 0;
//     });

//     const vigorFinal = parseInt(appState.atributosBase.vigor) || 10;
//     const maxWeight = (vigorFinal * vigorFinal) / 2;

//     const currentWeightEl = document.getElementById('current-weight');
//     const maxWeightEl = document.getElementById('max-weight');

//     if (currentWeightEl) currentWeightEl.textContent = pesoTotal.toFixed(1);
//     if (maxWeightEl) maxWeightEl.textContent = maxWeight.toFixed(1);

//     // 5. Calcular Perícias
//     const mapShortToLong = { vig: 'vigor', des: 'destreza', con: 'constituicao', int: 'inteligencia', sab: 'sabedoria', car: 'carisma' };

//     if (appState.pericias) {
//         Object.keys(appState.pericias).forEach(skillId => {
//             const skillData = appState.pericias[skillId];
//             const attrLongo = mapShortToLong[skillData.atributoBase];
//             const attrMod = mods[attrLongo] || 0;

//             const isTrained = skillData.treinada ? 5 : 0;
//             const hasFocus = skillData.foco ? 5 : 0;
//             const otherBonus = parseInt(skillData.bonusManual) || 0;

//             const total = halfLevel + attrMod + isTrained + hasFocus + otherBonus;

//             // Encontrar os elementos no HTML
//             const skillEl = document.querySelector(`.pericia-item[data-skill="${skillId}"]`);
//             if (skillEl) {
//                 const totalEl = skillEl.querySelector('.total-skill');
//                 const halfLevelEl = skillEl.querySelector('.half-level');
//                 const attrModEl = skillEl.querySelector('.attr-mod');

//                 if (halfLevelEl) halfLevelEl.textContent = halfLevel;
//                 if (attrModEl) {
//                     const sinalAttr = attrMod >= 0 ? '+' : '';
//                     attrModEl.textContent = `${sinalAttr}${attrMod}`;
//                 }
//                 if (totalEl) {
//                     const sinalTotal = total >= 0 ? '+' : '';
//                     totalEl.textContent = `= ${sinalTotal}${total}`;
//                 }
//             }
//         });
//     }

//     // 6. Calcular Iniciativa
//     const modIniciativa = mods.destreza; // Aproveitamos o cálculo já feito para a Destreza
//     const iniEl = document.getElementById('iniciativa-total');
//     if (iniEl) {
//         const sinal = modIniciativa >= 0 ? '+' : '';
//         iniEl.textContent = `= ${sinal}${modIniciativa}`;
//     }

//     // 7. Dano Limite
//     if (document.getElementById('dano-limite-total')) document.getElementById('dano-limite-total').textContent = defFort;
// }
function calcularMatematicaDaFicha() {
    const nivel = parseInt(appState.biografia.nivel) || 1;
    const classeKey = appState.biografia.classe;
    const racaKey = appState.biografia.especie;
    const tamanhoKey = appState.biografia.tamanho;
    const halfLevel = Math.floor(nivel / 2);

    // 1. Calcular Modificadores de Atributo (Base + Raciais)
    const raciais = (racaKey && DADOS_RACAS[racaKey]) ? DADOS_RACAS[racaKey].modificadores : {};
    const atributosMapeamento = {
        vigor: { id: 'vig', mod: 'vig' }, destreza: { id: 'des', mod: 'des' }, constituicao: { id: 'con', mod: 'con' },
        inteligencia: { id: 'int', mod: 'int' }, sabedoria: { id: 'sab', mod: 'sab' }, carisma: { id: 'car', mod: 'car' }
    };
    const mods = {};

    for (const [chaveEstado, cfg] of Object.entries(atributosMapeamento)) {
        const valorBase = parseInt(appState.atributosBase[chaveEstado]) || 10;
        const bonusRacial = raciais[cfg.mod] || 0;
        const valorFinal = valorBase + bonusRacial;
        const modificador = Math.floor((valorFinal - 10) / 2);
        mods[cfg.mod] = modificador;

        if (document.getElementById(`${cfg.id}-final`)) document.getElementById(`${cfg.id}-final`).textContent = valorFinal;
        if (document.getElementById(`${cfg.id}-mod`)) document.getElementById(`${cfg.id}-mod`).textContent = (modificador >= 0 ? '+' : '') + modificador;
    }

    // 2. Calcular Defesas (Classe + Tamanho + Outros)
    const bonusClasse = (classeKey && DADOS_CLASSES[classeKey]) ? DADOS_CLASSES[classeKey].bonusDefesa : { fort: 0, ref: 0, von: 0 };
    const bonusTamanho = (tamanhoKey && DADOS_TAMANHOS[tamanhoKey]) ? DADOS_TAMANHOS[tamanhoKey].modDefesaReflexo : 0;

    const calcDefesa = (tipo, modAttr) => 10 + nivel + modAttr + 
        (bonusClasse[tipo] || 0) + (tipo === 'ref' ? bonusTamanho : 0) + 
        (parseInt(appState.modificadoresManuais.defesas[tipo === 'von' ? 'vontade' : tipo === 'ref' ? 'reflexo' : 'fortitude'].outros) || 0);

    const defFort = calcDefesa('fort', mods.con);
    if (document.getElementById('def-fort')) document.getElementById('def-fort').textContent = defFort;
    if (document.getElementById('def-ref')) document.getElementById('def-ref').textContent = calcDefesa('ref', mods.des);
    if (document.getElementById('def-von')) document.getElementById('def-von').textContent = calcDefesa('von', mods.sab);

    // 3. Calcular PV (Base Classe + Nível + Mod. Con)
    let pvBase = 0;
    if (classeKey && DADOS_CLASSES[classeKey]) {
        const classeData = DADOS_CLASSES[classeKey];
        pvBase = classeData.pvIniciais + ((nivel - 1) * classeData.dadoVida) + (mods.con * nivel);
    }
    const pvMaximoFinal = pvBase + (parseInt(appState.modificadoresManuais.status.modVidaMaxima) || 0);
    
    let pvExibicao = (appState.recursos.pontosVidaAtual !== null) ? appState.recursos.pontosVidaAtual : pvMaximoFinal;
    const pvDisplay = document.getElementById('pv-atual-display');
    if (pvDisplay) pvDisplay.textContent = `${pvExibicao} / ${pvMaximoFinal}`;

    // 4. Calcular Capacidade de Carga
    let pesoTotal = 0;
    (appState.inventario.equipamentos || []).forEach(item => pesoTotal += parseFloat(item.peso) || 0);
    const vigorFinal = parseInt(appState.atributosBase.vigor) || 10;
    const maxWeight = (vigorFinal * vigorFinal) / 2;

    if (document.getElementById('current-weight')) document.getElementById('current-weight').textContent = pesoTotal.toFixed(1);
    if (document.getElementById('max-weight')) document.getElementById('max-weight').textContent = maxWeight.toFixed(1);

    // 5. Calcular Perícias
    const mapShortToLong = { vig: 'vigor', des: 'destreza', con: 'constituicao', int: 'inteligencia', sab: 'sabedoria', car: 'carisma' };
    if (appState.pericias) {
        Object.keys(appState.pericias).forEach(skillId => {
            const skillData = appState.pericias[skillId];
            const attrMod = mods[skillData.atributoBase] || 0;
            const total = halfLevel + attrMod + (skillData.treinada ? 5 : 0) + (skillData.foco ? 5 : 0) + (parseInt(skillData.bonusManual) || 0);

            const skillEl = document.querySelector(`.pericia-item[data-skill="${skillId}"]`);
            if (skillEl) {
                if (skillEl.querySelector('.half-level')) skillEl.querySelector('.half-level').textContent = halfLevel;
                if (skillEl.querySelector('.attr-mod')) skillEl.querySelector('.attr-mod').textContent = (attrMod >= 0 ? '+' : '') + attrMod;
                if (skillEl.querySelector('.total-skill')) skillEl.querySelector('.total-skill').textContent = `= ${(total >= 0 ? '+' : '')}${total}`;
            }
        });
    }

    // 6. Calcular Iniciativa
    const iniEl = document.getElementById('iniciativa-total');
    if (iniEl) iniEl.textContent = `= ${(mods.des >= 0 ? '+' : '')}${mods.des}`;

    // 7. Dano Limite
    if (document.getElementById('dano-limite-total')) document.getElementById('dano-limite-total').textContent = defFort;
}
/* FIM DE FUNÇÃO DE [Matemática Reativa] */





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
        selectEspecie.addEventListener('change', (e) => {
            setStateByPath('biografia.especie', e.target.value);
            // Atualiza nota racial visualmente
            const raca = DADOS_RACAS[e.target.value];
            document.getElementById('notas-raciais').textContent = raca ? raca.notas : '';
            calcularMatematicaDaFicha(); // <--- Adicionar esta chamada
        });
    }

    /* INICIO DE FUNÇÃO DE [Geração Dinâmica de Perícias]; esta função recria o HTML das perícias injetando os data-json-path corretos */
    function renderizarPericias() {
        const skillsList = {
            'Acrobacia': 'des', 'Conhecimento (Burocracia)': 'int', 'Conhecimento (Ciências Biológicas)': 'int',
            'Conhecimento (Ciências Exatas)': 'int', 'Conhecimento (Ciências Humanas)': 'int', 'Conhecimento (Táticas)': 'int',
            'Conhecimento (Tecnologia)': 'int', 'Conhecimento (Tradições Galácticas)': 'int', 'Enganação': 'car', 'Escalar': 'vig',
            'Furtividade': 'des', 'Iniciativa': 'des', 'Mecânica': 'int', 'Montar': 'des', 'Nadar': 'vig', 'Obter Informação': 'car',
            'Percepção': 'sab', 'Persuasão': 'car', 'Pilotar': 'des', 'Resistência': 'con', 'Saltar': 'vig', 'Sobrevivência': 'sab',
            'Tratar Ferimentos': 'sab', 'Usar a Força': 'sab', 'Usar Computadores': 'int'
        };

        const skillsContainer = document.querySelector('#pericias .grid');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        Object.entries(skillsList).forEach(([name, attr]) => {
            const skillId = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');

            const skillHTML = `
                <div class="pericia-item col-span-1 border-b border-stone-700 py-3" data-skill="${skillId}">
                    <div class="flex justify-between items-center mb-2">
                        <label class="font-semibold text-base text-yellow-400">${name} (${attr.toUpperCase()})</label>
                        <div class="flex items-center gap-3">
                            <div class="total-skill stat-mod text-2xl font-bold">= +0</div>
                            <svg class="dice-icon w-6 h-6 rollable cursor-pointer" data-roll-label="${name}" data-attr-base="${attr}" viewBox="0 0 24 24"><path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>
                        </div>
                    </div>
                    <div class="grid grid-cols-5 gap-2 text-center text-xs">
                        <div><div class="half-level stat-box py-1 text-lg">0</div><div>1/2 NÍVEL</div></div>
                        <div><div class="attr-mod stat-box py-1 text-lg">+0</div><div>MOD.</div></div>
                        <div><input type="checkbox" data-json-path="pericias.${skillId}.treinada" class="trained-check h-6 w-6 mx-auto mb-1"><div>TREINO</div></div>
                        <div><input type="checkbox" data-json-path="pericias.${skillId}.foco" class="focus-check h-6 w-6 mx-auto mb-1"><div>FOCO</div></div>
                        <div><input type="number" data-json-path="pericias.${skillId}.bonusManual" value="0" class="other-bonus text-center w-full text-lg"><div>OUTROS</div></div>
                    </div>
                </div>
            `;
            skillsContainer.insertAdjacentHTML('beforeend', skillHTML);
        });
    }

    /* INÍCIO DE FUNÇÃO DE [Sincronização de Inputs com o Estado]; esta função escuta alterações no ecrã e atualiza o JSON dinamicamente */
    function bindInputsToState() {
        const stateInputs = document.querySelectorAll('[data-json-path]');
        stateInputs.forEach(input => {
            const eventType = (input.type === 'checkbox' || input.tagName === 'SELECT') ? 'change' : 'input';
            input.addEventListener(eventType, (event) => {
                const path = event.target.dataset.jsonPath;
                let value;
                if (event.target.type === 'checkbox') {
                    value = event.target.checked;
                } else if (event.target.type === 'number') {
                    value = parseFloat(event.target.value) || 0;
                } else {
                    value = event.target.value;
                }
                setStateByPath(path, value);
                // A chamada para a matemática já está dentro do setStateByPath, então aqui está coberto.
            });
        });
    }

    // Inicializa a escuta dos eventos
    renderizarPericias();
    bindInputsToState();
    /* FIM DE FUNÇÃO DE [Sincronização de Inputs com o Estado] */

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
        document.getElementById('classe').addEventListener('change', (e) => {
            setStateByPath('biografia.classe', e.target.value);
            calcularMatematicaDaFicha(); // <--- Adicionar esta chamada
        });
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
        selectTamanho.addEventListener('change', (e) => {
            setStateByPath('biografia.tamanho', e.target.value);
            calcularMatematicaDaFicha(); // <--- Adicionar esta chamada
        });
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


    // addItemBtn.addEventListener('click', createItemRow);
    // equipmentList.addEventListener('click', (e) => {
    //     if (e.target.classList.contains('remove-item-btn')) {
    //         e.target.parentElement.remove();
    //     }
    // });

    // addWeaponBtn.addEventListener('click', createWeaponRow);
    // weaponList.addEventListener('click', (e) => {
    //     if (e.target.classList.contains('remove-weapon-btn')) {
    //         e.target.closest('.weapon-block-container').remove();
    //         const lastContainer = weaponList.querySelector('.weapon-block-container:last-child');
    //         if (lastContainer) {
    //             lastContainer.querySelector('hr').classList.add('hidden');
    //         }
    //     }
    // });


    /* INÍCIO DE FUNÇÃO DE [Listas de Objetos - Armas e Equipamentos]; esta função mapeia os arrays de objetos para o Estado e reconstrói o HTML */
    function renderizarArmas() {
        const weaponListEl = document.getElementById('weapon-list');
        if (!weaponListEl) return;
        weaponListEl.innerHTML = '';

        const armas = getValueFromPath(appState, 'combate.armas') || [];

        armas.forEach((arma, index) => {
            const weaponRow = document.createElement('div');
            weaponRow.className = 'weapon-block-container';
            weaponRow.innerHTML = `
                <div class="grid grid-cols-2 gap-2 weapon-block">
                    <input type="text" class="weapon-name dynamic-weapon-input" data-field="nome" data-index="${index}" placeholder="Arma" value="${arma.nome || ''}">
                    <div class="flex items-center gap-1">
                        <input type="number" class="attack-bonus-display dynamic-weapon-input w-full p-1 text-center" data-field="bonusAtaque" data-index="${index}" placeholder="Bônus" value="${arma.bonusAtaque || ''}">
                        <select class="attack-type-select dynamic-weapon-input w-20 p-1" data-field="atributoBaseAtaque" data-index="${index}">
                            <option value="vig" ${arma.atributoBaseAtaque === 'vig' ? 'selected' : ''}>VIG</option>
                            <option value="des" ${arma.atributoBaseAtaque === 'des' ? 'selected' : ''}>DES</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="text" class="dano-input dynamic-weapon-input w-full" data-field="dadoDano" data-index="${index}" placeholder="Dano (ex: 3d8+2)" value="${arma.dadoDano || ''}">
                        <svg class="dice-icon w-6 h-6 rollable cursor-pointer" viewBox="0 0 24 24"><path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>
                    </div>
                    <input type="text" class="dynamic-weapon-input" data-field="notasCritico" data-index="${index}" placeholder="Crítico / Notas" value="${arma.notasCritico || ''}">
                </div>
                <button class="remove-weapon-btn mt-2 w-full text-xs text-red-500 hover:text-red-400" data-index="${index}">Remover Arma</button>
                <hr class="border-stone-700 mt-2">
            `;
            weaponListEl.appendChild(weaponRow);
        });

        if (weaponListEl.querySelector('.weapon-block-container:last-child hr')) {
            weaponListEl.querySelector('.weapon-block-container:last-child hr').classList.add('hidden');
        }

        weaponListEl.querySelectorAll('.dynamic-weapon-input').forEach(input => {
            const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
            input.addEventListener(eventType, (e) => {
                const idx = e.target.dataset.index;
                const field = e.target.dataset.field;
                const currentArray = getValueFromPath(appState, 'combate.armas');
                currentArray[idx][field] = e.target.value;
                setStateByPath('combate.armas', currentArray);
            });
        });

        weaponListEl.querySelectorAll('.remove-weapon-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.dataset.index;
                const currentArray = getValueFromPath(appState, 'combate.armas');
                currentArray.splice(idx, 1);
                setStateByPath('combate.armas', currentArray);
                renderizarArmas();
            });
        });
    }

    function renderizarEquipamentos() {
        const equipmentListEl = document.getElementById('equipment-list');
        if (!equipmentListEl) return;
        equipmentListEl.innerHTML = '';

        const equipamentos = getValueFromPath(appState, 'inventario.equipamentos') || [];

        equipamentos.forEach((item, index) => {
            const itemRow = document.createElement('div');
            itemRow.className = 'grid grid-cols-12 gap-2 items-center mb-2';
            itemRow.innerHTML = `
                <input type="text" placeholder="Nome do item" class="col-span-6 p-1 dynamic-item-input" data-field="nome" data-index="${index}" value="${item.nome || ''}">
                <input type="number" placeholder="0" class="col-span-3 p-1 text-center dynamic-item-input" data-field="custo" data-index="${index}" value="${item.custo || ''}">
                <input type="number" step="0.1" class="col-span-2 p-1 text-center item-weight dynamic-item-input" data-field="peso" data-index="${index}" value="${item.peso || 0}">
                <button class="remove-item-btn col-span-1 text-red-500 hover:text-red-400 font-bold text-center text-lg" data-index="${index}">X</button>
            `;
            equipmentListEl.appendChild(itemRow);
        });

        equipmentListEl.querySelectorAll('.dynamic-item-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const idx = e.target.dataset.index;
                const field = e.target.dataset.field;
                const currentArray = getValueFromPath(appState, 'inventario.equipamentos');
                currentArray[idx][field] = e.target.type === 'number' ? (parseFloat(e.target.value) || 0) : e.target.value;
                setStateByPath('inventario.equipamentos', currentArray);
            });
        });

        equipmentListEl.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.dataset.index;
                const currentArray = getValueFromPath(appState, 'inventario.equipamentos');
                currentArray.splice(idx, 1);
                setStateByPath('inventario.equipamentos', currentArray);
                renderizarEquipamentos();
            });
        });
    }

    // Configuração dos Botões de Adicionar
    const addWeaponBtn = document.getElementById('add-weapon-btn');
    if (addWeaponBtn) {
        const novoBotao = addWeaponBtn.cloneNode(true);
        addWeaponBtn.parentNode.replaceChild(novoBotao, addWeaponBtn);
        novoBotao.addEventListener('click', () => {
            const currentArray = getValueFromPath(appState, 'combate.armas') || [];
            // Adicionado o bonusAtaque inicializado como zero
            currentArray.push({ nome: "", bonusAtaque: 0, atributoBaseAtaque: "vig", dadoDano: "", notasCritico: "" });
            setStateByPath('combate.armas', currentArray);
            renderizarArmas();
        });
    }

    const addItemBtn = document.getElementById('add-item-btn');
    if (addItemBtn) {
        const novoBotao = addItemBtn.cloneNode(true);
        addItemBtn.parentNode.replaceChild(novoBotao, addItemBtn);
        novoBotao.addEventListener('click', () => {
            const currentArray = getValueFromPath(appState, 'inventario.equipamentos') || [];
            currentArray.push({ nome: "", custo: 0, peso: 0 });
            setStateByPath('inventario.equipamentos', currentArray);
            renderizarEquipamentos();
        });
    }

    renderizarArmas();
    renderizarEquipamentos();
    /* FIM DE FUNÇÃO DE [Listas de Objetos - Armas e Equipamentos] */

    /* INÍCIO DE FUNÇÃO DE [Listas Dinâmicas]; esta função mapeia os arrays textuais para o Estado e reconstrói o HTML */
    function renderizarListasDinamicas() {

        // Reconstrói a lista no HTML com base no array existente no appState
        function renderList(listId, statePath, placeholder) {
            const listEl = document.getElementById(listId);
            if (!listEl) return;
            listEl.innerHTML = '';

            const arrayData = getValueFromPath(appState, statePath) || [];

            arrayData.forEach((itemText, index) => {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-2 mb-2';
                row.innerHTML = `
                    <input type="text" placeholder="${placeholder}" value="${itemText}" class="w-full p-1 dynamic-input" data-index="${index}">
                    <button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg" data-index="${index}">X</button>
                `;
                listEl.appendChild(row);
            });

            // Regista as alterações de texto feitas pelo jogador no array
            const inputs = listEl.querySelectorAll('.dynamic-input');
            inputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    const idx = e.target.dataset.index;
                    const currentArray = getValueFromPath(appState, statePath);
                    currentArray[idx] = e.target.value;
                });
            });

            // Apaga o item do array e reconstrói a vista
            const removeBtns = listEl.querySelectorAll('.remove-btn');
            removeBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.dataset.index;
                    const currentArray = getValueFromPath(appState, statePath);
                    currentArray.splice(idx, 1);
                    setStateByPath(statePath, currentArray);
                    renderList(listId, statePath, placeholder);
                });
            });
        }

        // Configura o comportamento do botão "Adicionar"
        function setupList(listId, buttonId, statePath, placeholder) {
            const addButton = document.getElementById(buttonId);
            if (!addButton) return;

            // Removemos listeners antigos clonando o botão (útil durante a importação)
            const novoBotao = addButton.cloneNode(true);
            addButton.parentNode.replaceChild(novoBotao, addButton);

            novoBotao.addEventListener('click', () => {
                const currentArray = getValueFromPath(appState, statePath) || [];
                currentArray.push(""); // Insere item vazio
                setStateByPath(statePath, currentArray);
                renderList(listId, statePath, placeholder);
            });

            // Desenha a lista pela primeira vez
            renderList(listId, statePath, placeholder);
        }

        setupList('talentos-list', 'add-talento-btn', 'caracteristicas.talentos', 'Novo talento...');
        setupList('poderes-list', 'add-poder-btn', 'caracteristicas.poderesForca', 'Novo poder da Força...');
        setupList('idiomas-list', 'add-idioma-btn', 'caracteristicas.idiomas', 'Novo idioma...');
        setupList('aptidoes-list', 'add-aptidao-btn', 'caracteristicas.aptidoes', 'Nova aptidão...');
    }

    renderizarListasDinamicas();
    renderizarArmas();
    renderizarEquipamentos();
    /* FIM DE FUNÇÃO DE [Listas Dinâmicas] */



    /* INÍCIO DE FUNÇÃO DE [Controle da Barra de Vida corrigido] */
    function setupBarraDeVida() {
        const hpControlBar = document.getElementById('hp-control-bar');
        if (!hpControlBar) return;

        hpControlBar.addEventListener('click', (e) => {
            const button = e.target.closest('.hp-btn');
            if (!button) return;

            const action = button.dataset.action;
            const amount = button.dataset.amount;

            // RECALCULO DINÂMICO: Obtemos o PV máximo real baseado no nível e classe atuais
            const nivel = parseInt(appState.biografia.nivel) || 1;
            const classeKey = appState.biografia.classe;
            const modsCon = Math.floor(((parseInt(appState.atributosBase.constituicao) || 10) - 10) / 2);
            
            let pvBase = 0;
            if (classeKey && DADOS_CLASSES[classeKey]) {
                const classeData = DADOS_CLASSES[classeKey];
                pvBase = classeData.pvIniciais + ((nivel - 1) * classeData.dadoVida) + (modsCon * nivel);
            }
            const maxHp = pvBase + (parseInt(appState.modificadoresManuais.status.modVidaMaxima) || 0);

            // Valor atual
            let currentHp = (appState.recursos.pontosVidaAtual !== null) ? parseInt(appState.recursos.pontosVidaAtual) : maxHp;

            // Execução da ação
            if (action === 'decrease') {
                currentHp -= parseInt(amount);
            } else if (action === 'increase') {
                currentHp += parseInt(amount);
            } else if (action === 'set') {
                if (amount === '0') currentHp = 0;
                else if (amount === 'max') currentHp = maxHp;
            }

            // Limites (Nunca menor que 0, nunca maior que o máximo recalculado)
            currentHp = Math.max(0, Math.min(currentHp, maxHp));

            // Atualiza o estado
            setStateByPath('recursos.pontosVidaAtual', currentHp);
        });
    }
    setupBarraDeVida();
    /* FIM DE FUNÇÃO DE [Controle da Barra de Vida corrigido] */



    /* INÍCIO DE FUNÇÃO DE [Exportar Ficha]; esta função converte o estado reativo em um arquivo JSON e força o download */
    const exportBtn = document.getElementById('exportar-ficha-btn');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Pegamos o estado atual através do Proxy
            const dataToSave = { ficha: appState };

            // Converte para string JSON com indentação de 2 espaços para ficar bonito e legível
            const dataStr = JSON.stringify(dataToSave, null, 2);

            // Cria um "arquivo virtual" na memória do navegador
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            // Cria um link temporário e simula um clique para forçar o download
            const a = document.createElement('a');
            a.href = url;

            // Define o nome do arquivo. Se tiver nome, usa o nome, senão usa 'ficha_personagem'
            const nomePersonagem = appState.biografia && appState.biografia.nome ? appState.biografia.nome.replace(/\s+/g, '_') : 'personagem';
            a.download = `ficha_${nomePersonagem}.json`;

            document.body.appendChild(a);
            a.click();

            // Limpa a memória
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log("[Exportação] Ficha exportada com sucesso.");
        });
    }
    /* FIM DE FUNÇÃO DE [Exportar Ficha] */

    /* INÍCIO DE FUNÇÃO DE [Importar Ficha]; esta função lê um arquivo JSON, atualiza o Estado e preenche a tela */
    const importBtn = document.getElementById('importar-ficha-btn');
    const importInput = document.getElementById('importar-ficha-input');

    if (importBtn && importInput) {
        // Ao clicar no botão, simula um clique no input de arquivo oculto
        importBtn.addEventListener('click', () => {
            importInput.click();
        });

        importInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);

                    if (importedData.ficha) {
                        // 1. Atualiza o Estado (Proxy) fundindo os dados novos com o defaultState
                        Object.assign(appState, importedData.ficha);

                        // 2. Atualiza o HTML visualmente para refletir o JSON e sobrepor o cache do navegador
                        const stateInputs = document.querySelectorAll('[data-json-path]');
                        stateInputs.forEach(input => {
                            const path = input.dataset.jsonPath;
                            const value = getValueFromPath(importedData.ficha, path);

                            if (value !== undefined && value !== null) {
                                if (input.type === 'checkbox') {
                                    input.checked = value;
                                } else {
                                    input.value = value;
                                }
                            }
                        });
                        renderizarListasDinamicas();

                        console.log("[Importação] Ficha carregada com sucesso!");

                        // Exibe a notificação na tela
                        const notif = document.getElementById('notificacao');
                        if (notif) {
                            notif.textContent = '✅ Ficha importada com sucesso!';
                            notif.classList.remove('ocultday');
                            notif.classList.add('visivel');
                            setTimeout(() => {
                                notif.classList.remove('visivel');
                                notif.classList.add('ocultday');
                            }, 2500);
                        }
                    } else {
                        alert("O arquivo selecionado não parece ser uma ficha de RPG válida.");
                    }
                } catch (err) {
                    console.error("Erro ao ler JSON:", err);
                    alert("Erro ao importar a ficha. Arquivo corrompido ou formato inválido.");
                }

                // Limpa o input para permitir importar o mesmo arquivo novamente caso necessário
                importInput.value = '';
            };
            reader.readAsText(file);
        });
    }

    // Helper: Lê valores aninhados de um objeto a partir de uma string (ex: "biografia.nome")
    function getValueFromPath(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
    /* FIM DE FUNÇÃO DE [Importar Ficha] */

    popularEspecies();
    popularClasses();
    popularTamanhos();
    calcularMatematicaDaFicha();
}
initFicha();