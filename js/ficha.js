/* Substitua o seu defaultState atual por este */
const defaultState = {
    biografia: {
        nome: "", jogador: "", classe: "", multiclasse: [], nivel: 1, especie: "", tamanho: "", idade: "", sexo: "", peso: "", altura: "", destino: ""
    },
    atributosBase: {
        vigor: 10, destreza: 10, constituicao: 10, inteligencia: 10, sabedoria: 10, carisma: 10
    },
    recursos: {
        pontosVidaAtual: null, condicao: "0", pontosForca: 1, pontosDestino: 1, pontosLadoNegro: 0, creditos: 1000
    },
    modificadoresManuais: {
        status: {
            modVidaMaxima: 0,
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


/* INÍCIO DE FUNÇÃO DE [Inicialização do Estado]; Verifica se há backup no navegador */
if (typeof _internalState === 'undefined') {
    const savedState = localStorage.getItem('starWarsFichaAutoSave');
    if (savedState) {
        try {
            var _internalState = JSON.parse(savedState);
            console.log("[Backup] Ficha restaurada do auto-save local.");
        } catch (e) {
            console.error("[Backup] Erro ao ler auto-save. Carregando ficha limpa.");
            var _internalState = JSON.parse(JSON.stringify(defaultState));
        }
    } else {
        var _internalState = JSON.parse(JSON.stringify(defaultState));
    }
}
/* FIM DE FUNÇÃO DE [Inicialização do Estado] */

const appState = new Proxy(_internalState, {
    set(target, property, value, receiver) {
        // console.log(`[Estado] Propriedade alterada: ${property} para`, value);
        return Reflect.set(target, property, value, receiver);
    }
});

let timeoutAutoSave = null;

function setStateByPath(path, value) {
    const keys = path.split('.');
    let current = appState;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    if (current[lastKey] === value) return;

    current[lastKey] = value;

    if (typeof calcularMatematicaDaFicha === 'function') {
        calcularMatematicaDaFicha();
    }

    // Debounce: Aguarda o utilizador parar de digitar por 1 segundo antes de forçar o disco rígido
    // Mestre tem o auto-save de cache desligado para evitar poluir a própria ficha com a de outro jogador
    if (!isMestre) {
        clearTimeout(timeoutAutoSave);
        timeoutAutoSave = setTimeout(() => {
            localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
        }, 1000);
    }
}

/* INICIO DE FUNÇÃO DE [Integração Supabase - Variáveis Globais]; armazena o ID do banco de dados */
let personagemIdAtual = null;
let isMestre = false; // Controle de Autoridade ISB
/* FIM DE FUNÇÃO DE [Integração Supabase - Variáveis Globais] */

/* INICIO DE FUNÇÃO DE [Integração Supabase - Logout]; encerra a sessão e limpa a memória local para segurança */
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
        // Confirmação simples para evitar cliques acidentais
        const confirmar = confirm("Tem a certeza que deseja sair? As alterações não guardadas serão perdidas.");
        if (!confirmar) return;

        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            console.error("[Logout] Erro ao desconectar:", error);
            alert("Erro ao encerrar a sessão. Tente novamente.");
        } else {
            // CRÍTICO: Limpar o auto-save local impede que o próximo jogador 
            // a fazer login no mesmo computador veja a ficha anterior por uma fração de segundo.
            localStorage.removeItem('starWarsFichaAutoSave');

            console.log("[Logout] Sessão encerrada com sucesso.");
            window.location.href = 'login.html';
        }
    });
}
/* FIM DE FUNÇÃO DE [Integração Supabase - Logout] */

function calcularMatematicaDaFicha() {
    const nivel = parseInt(appState.biografia.nivel) || 1;
    const classeKey = appState.biografia.classe;
    const racaKey = appState.biografia.especie;
    const tamanhoKey = appState.biografia.tamanho;
    const halfLevel = Math.floor(nivel / 2);

    // 1. Calcular Modificadores de Atributo (Base + Raciais)
    const raciais = (racaKey && DADOS_RACAS[racaKey]) ? DADOS_RACAS[racaKey].modificadores : {};
    const atributosMapeamento = {
        vigor: { modText: 'mod-vigor', mod: 'vig' },
        destreza: { modText: 'mod-destreza', mod: 'des' },
        constituicao: { modText: 'mod-constituicao', mod: 'con' },
        inteligencia: { modText: 'mod-inteligencia', mod: 'int' },
        sabedoria: { modText: 'mod-sabedoria', mod: 'sab' },
        carisma: { modText: 'mod-carisma', mod: 'car' }
    };
    const mods = {};

    for (const [chaveEstado, cfg] of Object.entries(atributosMapeamento)) {
        const valorBase = parseInt(appState.atributosBase[chaveEstado]) || 10;
        const bonusRacial = raciais[cfg.mod] || 0;
        const valorFinal = valorBase + bonusRacial;
        const modificador = Math.floor((valorFinal - 10) / 2);
        mods[cfg.mod] = modificador;

        const modEl = document.getElementById(cfg.modText);
        if (modEl) modEl.textContent = (modificador >= 0 ? '+' : '') + modificador;
    }

    // 2. Calcular Defesas (Classe + Tamanho + Outros + Armadura + Manual)
    // Avalia a classe principal e todas as multiclasses para extrair o bônus máximo
    const classesAtuais = [];
    if (classeKey) classesAtuais.push(classeKey);
    if (appState.biografia.multiclasse) {
        appState.biografia.multiclasse.forEach(c => {
            // Aceita tanto dados antigos (strings) quanto os novos (objetos com nome e nível)
            if (typeof c === 'string' && c !== '') classesAtuais.push(c);
            else if (c && c.nome && c.nome !== '') classesAtuais.push(c.nome);
        });
    }

    const maxBonusClasse = { fort: 0, ref: 0, von: 0 };
    classesAtuais.forEach(cls => {
        if (DADOS_CLASSES[cls] && DADOS_CLASSES[cls].bonusDefesa) {
            maxBonusClasse.fort = Math.max(maxBonusClasse.fort, DADOS_CLASSES[cls].bonusDefesa.fort || 0);
            maxBonusClasse.ref = Math.max(maxBonusClasse.ref, DADOS_CLASSES[cls].bonusDefesa.ref || 0);
            maxBonusClasse.von = Math.max(maxBonusClasse.von, DADOS_CLASSES[cls].bonusDefesa.von || 0);
        }
    });

    const bonusTamanho = (tamanhoKey && DADOS_TAMANHOS[tamanhoKey]) ? DADOS_TAMANHOS[tamanhoKey].modDefesaReflexo : 0;

    const calcDefesa = (tipo, modAttr) => {
        const manualKey = tipo === 'von' ? 'vontade' : (tipo === 'ref' ? 'reflexo' : 'fortitude');
        const manual = appState.modificadoresManuais.defesas[manualKey];

        return 10 + nivel + modAttr +
            (maxBonusClasse[tipo] || 0) +
            (tipo === 'ref' ? bonusTamanho : 0) +
            (parseInt(manual.armadura) || 0) +
            (parseInt(manual.outros) || 0);
    };

    const defFort = calcDefesa('fort', mods.con);
    const defRef = calcDefesa('ref', mods.des);
    const defVon = calcDefesa('von', mods.sab);

    // Injeta Totais
    if (document.getElementById('def-total-fortitude')) document.getElementById('def-total-fortitude').textContent = defFort;
    if (document.getElementById('def-total-reflexo')) document.getElementById('def-total-reflexo').textContent = defRef;
    if (document.getElementById('def-total-vontade')) document.getElementById('def-total-vontade').textContent = defVon;

    // Injeta Subtotais (Nível + Atributo)
    if (document.getElementById('def-sub-fortitude')) document.getElementById('def-sub-fortitude').textContent = nivel + mods.con;
    if (document.getElementById('def-sub-reflexo')) document.getElementById('def-sub-reflexo').textContent = nivel + mods.des;
    if (document.getElementById('def-sub-vontade')) document.getElementById('def-sub-vontade').textContent = nivel + mods.sab;

    // Injeta Valores de Tamanho
    if (document.getElementById('def-tamanho-fortitude')) document.getElementById('def-tamanho-fortitude').textContent = 0;
    if (document.getElementById('def-tamanho-reflexo')) document.getElementById('def-tamanho-reflexo').textContent = bonusTamanho;
    if (document.getElementById('def-tamanho-vontade')) document.getElementById('def-tamanho-vontade').textContent = 0;

    // Injeta Valores de Classe (Extraindo do Max calculado)
    if (document.getElementById('def-classe-fortitude')) document.getElementById('def-classe-fortitude').textContent = maxBonusClasse['fort'] || 0;
    if (document.getElementById('def-classe-reflexo')) document.getElementById('def-classe-reflexo').textContent = maxBonusClasse['ref'] || 0;
    if (document.getElementById('def-classe-vontade')) document.getElementById('def-classe-vontade').textContent = maxBonusClasse['von'] || 0;

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

    // 4. Calcular Capacidade de Carga (Mantido por compatibilidade caso volte ao HTML)
    let pesoTotal = 0;
    (appState.inventario.equipamentos || []).forEach(item => pesoTotal += parseFloat(item.peso) || 0);
    const vigorFinal = (parseInt(appState.atributosBase.vigor) || 10) + (raciais['vig'] || 0);
    const maxWeight = (vigorFinal * vigorFinal) / 2;
    if (document.getElementById('current-weight')) document.getElementById('current-weight').textContent = pesoTotal.toFixed(1);
    if (document.getElementById('max-weight')) document.getElementById('max-weight').textContent = maxWeight.toFixed(1);

    // 5. Calcular Perícias
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

    // 6. Calcular e Atualizar BBA (Bônus Base de Ataque) Cumulativo
    let bbaTotal = 0;

    // A) Processa a Classe Principal
    const nivelPrincipal = parseInt(appState.biografia.nivel) || 1;
    if (classeKey && DADOS_CLASSES[classeKey] && DADOS_CLASSES[classeKey].bba) {
        const arrayBbaPrincipal = DADOS_CLASSES[classeKey].bba;
        // O array é zero-indexado, então o nível 1 é o índice 0. Subtrai 1 e limita entre 0 e 19 (nível max 20)
        const indicePrincipal = Math.max(0, Math.min(nivelPrincipal - 1, 19));
        bbaTotal += arrayBbaPrincipal[indicePrincipal];
    }

    // B) Processa todas as Multiclasses dinamicamente
    if (appState.biografia.multiclasse) {
        appState.biografia.multiclasse.forEach(c => {
            const multiNome = typeof c === 'string' ? c : (c.nome || "");
            const multiNivel = typeof c === 'string' ? 1 : (parseInt(c.nivel) || 1);

            if (multiNome && DADOS_CLASSES[multiNome] && DADOS_CLASSES[multiNome].bba) {
                const arrayBbaMulti = DADOS_CLASSES[multiNome].bba;
                const indiceMulti = Math.max(0, Math.min(multiNivel - 1, 9));
                bbaTotal += arrayBbaMulti[indiceMulti];
            }
        });
    }

    // C) Adiciona o ajuste manual (se houver) e renderiza na tela
    const ajusteManual = parseInt(appState.modificadoresManuais.combate.ataqueGeral) || 0;
    const bbaFinal = bbaTotal + ajusteManual;

    const bbaDisplay = document.getElementById('bba-display');
    if (bbaDisplay) {
        bbaDisplay.textContent = bbaFinal;
    }
    // 7. Dano Limite
    if (document.getElementById('limiar-dano-display')) document.getElementById('limiar-dano-display').textContent = defFort;
}

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

            const raca = DADOS_RACAS[e.target.value];
            document.getElementById('notas-raciais').textContent = raca ? raca.notas : '';
            calcularMatematicaDaFicha();
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

        // Correção do seletor para o novo layout (agora a div #pericias é o contêiner direto)
        const skillsContainer = document.getElementById('pericias');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        Object.entries(skillsList).forEach(([name, attr]) => {
            const skillId = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');

            // HTML injetado completamente refatorado para o padrão Sci-Fi
            const skillHTML = `
                <div class="pericia-item grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-stone-950/40 p-2 rounded border border-stone-800/50 hover:border-cyan-900/50 transition-colors" data-skill="${skillId}">
                    <div class="col-span-1 flex justify-center items-center" title="Treinada">
                        <input type="checkbox" data-json-path="pericias.${skillId}.treinada" class="trained-check h-4 w-4">
                    </div>
                    <div class="col-span-1 flex justify-center items-center" title="Foco">
                        <input type="checkbox" data-json-path="pericias.${skillId}.foco" class="focus-check h-4 w-4">
                    </div>
                    <div class="col-span-4 flex items-center justify-center sm:justify-start">
                        <label class="m-0 font-bold text-xs sm:text-sm text-stone-200 uppercase tracking-wider cursor-pointer">${name} <span class="text-stone-500">(${attr.toUpperCase()})</span></label>
                    </div>
                    <div class="col-span-2 text-center flex justify-center items-center gap-1">
                        <span class="total-skill text-lg font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">= +0</span>
                    </div>
                    <div class="col-span-2 flex justify-center items-center">
                        <input type="number" data-json-path="pericias.${skillId}.bonusManual" value="0" class="other-bonus w-16 p-1 text-center bg-stone-900/80 border border-stone-700 rounded text-stone-200 focus:border-cyan-500 outline-none text-sm" title="Ajuste Manual">
                    </div>
                    <div class="col-span-2 flex justify-center items-center">
                        <svg class="dice-icon w-6 h-6 rollable cursor-pointer text-amber-400 hover:text-amber-300 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] transition-all" data-roll-label="${name}" data-attr-base="${attr}" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.02c.86 0 1.68.17 2.45.5l5.55 2.22c1.54.62 2.45 2.2 2.45 3.85v6.82c0 1.65-.91 3.23-2.45 3.85l-5.55 2.22a4.95 4.95 0 0 1-4.9 0l-5.55-2.22A4.95 4.95 0 0 1 1.55 15.4V8.59c0-1.65.91-3.23 2.45-3.85l5.55-2.22c.77-.33 1.59-.5 2.45-.5m0 1.98c-.58 0-1.15.1-1.68.3l-5.55 2.22c-.93.37-1.52 1.29-1.52 2.3v6.82c0 1.01.59 1.93 1.52 2.3l5.55 2.22c.53.2 1.1.3 1.68.3s1.15-.1 1.68-.3l5.55-2.22c.93-.37 1.52-1.29 1.52-2.3V8.59c0-1.01-.59-1.93-1.52-2.3l-5.55-2.22A3.01 3.01 0 0 0 12 4zM11 7h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/>
                        </svg>
                    </div>
                </div>
            `;
            skillsContainer.insertAdjacentHTML('beforeend', skillHTML);
        });
    }

    function sincronizarTelaComEstado() {
        const stateInputs = document.querySelectorAll('[data-json-path]');
        stateInputs.forEach(input => {
            const path = input.dataset.jsonPath;
            const value = getValueFromPath(appState, path);

            if (value !== undefined && value !== null) {
                if (input.type === 'checkbox') {
                    input.checked = value;
                } else if (input.tagName === 'SELECT') {
                    input.value = value;
                } else {
                    input.value = value;
                }
            }
        });

        // Adicione este bloco: Atualiza o texto da nota racial na tela
        const racaSelecionada = appState.biografia.especie;
        const notasElement = document.getElementById('notas-raciais');
        if (notasElement && typeof DADOS_RACAS !== 'undefined') {
            notasElement.textContent = (racaSelecionada && DADOS_RACAS[racaSelecionada]) ? DADOS_RACAS[racaSelecionada].notas : '';
        }
    }



    // Configuração do Botão "Salvar" vinculado ao Supabase
    const btnSave = document.getElementById('btn-save');
    if (btnSave) {
        const novoBtnSave = btnSave.cloneNode(true);
        btnSave.parentNode.replaceChild(novoBtnSave, btnSave);

        novoBtnSave.addEventListener('click', async () => {
            if (!isMestre) localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
            await salvarFichaNoBanco();
        });
    }
    /* FIM DE FUNÇÃO DE [Sincronização Tela-Estado] */

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
            calcularMatematicaDaFicha();
        });
    }

    // Função para gerar os campos adicionais de multiclasse
    function renderizarMulticlasse() {
        const container = document.getElementById('multiclasse-container');
        if (!container) return;
        container.innerHTML = '';

        const multiclasses = getValueFromPath(appState, 'biografia.multiclasse') || [];

        multiclasses.forEach((clsObj, index) => {
            // Compatibilidade com o formato antigo (string) e o novo (objeto)
            let classeNome = typeof clsObj === 'string' ? clsObj : (clsObj.nome || "");
            let classeNivel = typeof clsObj === 'string' ? 1 : (clsObj.nivel || 1);

            const row = document.createElement('div');
            row.className = 'flex items-center gap-2';

            const select = document.createElement('select');
            select.className = 'p-2 dynamic-multiclass-input bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 outline-none focus:border-cyan-500 transition-all text-sm';
            select.style.flex = '1'; // Força o select a expandir e ocupar o espaço livre
            select.dataset.index = index;
            select.dataset.field = 'nome';

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Selecione a classe...';
            select.appendChild(defaultOption);

            for (const chaveClasse in DADOS_CLASSES) {
                const classeData = DADOS_CLASSES[chaveClasse];
                const option = document.createElement('option');
                option.value = chaveClasse;
                option.textContent = classeData.nome;
                if (chaveClasse === classeNome) option.selected = true;
                select.appendChild(option);
            }

            // Novo campo numérico do Nível da Multiclasse
            const inputNivel = document.createElement('input');
            inputNivel.type = 'number';
            inputNivel.className = 'p-2 dynamic-multiclass-input bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 outline-none focus:border-cyan-500 transition-all text-center text-sm';
            inputNivel.style.width = '4.5rem'; // Protege contra a regra global de 100% de largura
            inputNivel.style.flex = 'none';    // Impede que o input de número esmague o select
            inputNivel.dataset.index = index;
            inputNivel.dataset.field = 'nivel';
            inputNivel.min = '1';
            inputNivel.value = classeNivel;
            inputNivel.title = 'Nível na classe';

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-multiclass-btn px-3 py-2 text-red-500 font-bold hover:text-red-400 bg-stone-900/50 border border-stone-800 rounded-md transition-colors';
            removeBtn.dataset.index = index;
            removeBtn.textContent = 'X';
            removeBtn.title = "Remover classe";

            row.appendChild(select);
            row.appendChild(inputNivel);
            row.appendChild(removeBtn);
            container.appendChild(row);
        });

        // Eventos de alteração e deleção (Com correção de Reatividade)
        container.querySelectorAll('.dynamic-multiclass-input').forEach(input => {
            const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
            input.addEventListener(eventType, (e) => {
                const idx = e.target.dataset.index;
                const field = e.target.dataset.field;

                // Clona o array para forçar a reatividade matemática da ficha
                const currentArray = [...(getValueFromPath(appState, 'biografia.multiclasse') || [])];

                if (typeof currentArray[idx] === 'string') {
                    currentArray[idx] = { nome: currentArray[idx], nivel: 1 };
                } else {
                    currentArray[idx] = { ...currentArray[idx] };
                }

                currentArray[idx][field] = e.target.type === 'number' ? (parseInt(e.target.value) || 1) : e.target.value;
                setStateByPath('biografia.multiclasse', currentArray);
            });
        });

        container.querySelectorAll('.remove-multiclass-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.dataset.index;
                // Clona o array antes do splice
                const currentArray = [...(getValueFromPath(appState, 'biografia.multiclasse') || [])];
                currentArray.splice(idx, 1);
                setStateByPath('biografia.multiclasse', currentArray);
                renderizarMulticlasse();
            });
        });
    }

    // Função para popular o seletor de Tamanho
    function popularTamanhos() {
        for (const chaveTamanho in DADOS_TAMANHOS) {
            const tamanho = DADOS_TAMANHOS[chaveTamanho];
            const option = document.createElement('option');
            option.value = chaveTamanho;
            option.textContent = tamanho.nome;
            if (chaveTamanho === 'Médio') {
                option.selected = true;
            }
            selectTamanho.appendChild(option);
        }
        selectTamanho.addEventListener('change', (e) => {
            setStateByPath('biografia.tamanho', e.target.value);
            calcularMatematicaDaFicha();
        });
    }

    /* INICIO DE FUNÇÃO DE [Exibição de Fórmulas de Dados]; esta função gerencia o modal que instrui o jogador sobre quais dados rolar fisicamente na mesa */
    const diceModal = document.getElementById('dice-modal');

    // Função que injeta a fórmula matemática no modal HTML
    function showDiceFormula(label, formula, breakdown) {
        const titleEl = document.getElementById('modal-title');
        const resultEl = document.getElementById('roll-result');
        const detailsEl = document.getElementById('modal-details');

        if (titleEl) titleEl.textContent = label;
        if (resultEl) resultEl.innerHTML = `<span class="text-cyan-400 font-mono text-4xl">${formula}</span>`;
        if (detailsEl) detailsEl.textContent = breakdown;

        if (diceModal) diceModal.classList.add('show');
    }

    // O fechamento no botão agora é feito via onclick="fecharModal()" definido no escopo global
    if (diceModal) {
        diceModal.addEventListener('click', (event) => {
            if (event.target === diceModal) diceModal.classList.remove('show');
        });
    }

    // Evento global para capturar cliques nos ícones de dado (.rollable) de elementos que ainda usam essa classe (ex: Armas antigas)
    document.body.addEventListener('click', (event) => {
        const rollableElement = event.target.closest('.rollable');

        if (rollableElement) {
            const isWeapon = rollableElement.closest('.weapon-block');

            if (isWeapon) {
                const weaponName = isWeapon.querySelector('.weapon-name').value || 'Arma Desconhecida';
                const damageString = isWeapon.querySelector('.dano-input').value || 'Base da Arma';

                showDiceFormula(
                    `Ataque: ${weaponName}`,
                    `${damageString}`,
                    `Ataque: 1d20 + Bônus de Ataque`
                );
            }
        }
    });
    /* FIM DE FUNÇÃO DE [Exibição de Fórmulas de Dados] */

    // Função de Pesquisa de Perícias (Simplificada para o novo design contínuo)
    const searchInput = document.getElementById('search-pericia');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const allSkills = document.querySelectorAll('.pericia-item');

            allSkills.forEach(skillElement => {
                const skillLabel = skillElement.querySelector('label');
                if (skillLabel) {
                    const skillName = skillLabel.textContent.toLowerCase();
                    if (skillName.includes(searchTerm)) {
                        skillElement.style.display = ''; // Limpa o estilo inline, restaurando o 'grid' original do Tailwind
                    } else {
                        skillElement.style.display = 'none'; // Esconde se não bater com a busca
                    }
                }
            });
        });
    }

    /* INÍCIO DE FUNÇÃO DE [Listas de Objetos - Armas e Equipamentos]; esta função mapeia os arrays de objetos para o Estado e reconstrói o HTML */
    function renderizarArmas() {
        const weaponListEl = document.getElementById('weapon-list');
        if (!weaponListEl) return;
        weaponListEl.innerHTML = '';

        const armas = getValueFromPath(appState, 'combate.armas') || [];

        armas.forEach((arma, index) => {
            const weaponRow = document.createElement('div');
            weaponRow.className = 'weapon-block-container bg-stone-950/40 p-4 rounded-lg border border-stone-800/60 relative mb-2';
            weaponRow.innerHTML = `
                <button class="remove-weapon-btn absolute top-3 right-3 text-red-500 hover:text-red-400 font-bold px-2 py-1 bg-red-900/20 rounded border border-red-500/30 transition-all text-[0.65rem] tracking-wider uppercase" data-index="${index}">Remover</button>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 weapon-block mt-6 sm:mt-2">
                    <div>
                        <label class="text-[0.65rem] text-stone-500 uppercase tracking-widest mb-1 block">Nome da Arma</label>
                        <input type="text" class="weapon-name dynamic-weapon-input w-full p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all text-sm" data-field="nome" data-index="${index}" placeholder="Ex: Blaster Pesado" value="${arma.nome || ''}">
                    </div>
                    <div class="flex gap-2">
                        <div class="flex-1">
                            <label class="text-[0.65rem] text-stone-500 uppercase tracking-widest mb-1 block">Bônus Atq</label>
                            <div class="flex items-center gap-1">
                                <input type="number" class="attack-bonus-display dynamic-weapon-input w-full p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all text-center text-sm" data-field="bonusAtaque" data-index="${index}" placeholder="+0" value="${arma.bonusAtaque || ''}">
                                <select class="attack-type-select dynamic-weapon-input w-20 p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all text-sm uppercase" data-field="atributoBaseAtaque" data-index="${index}">
                                    <option value="vig" ${arma.atributoBaseAtaque === 'vig' ? 'selected' : ''}>Vig</option>
                                    <option value="des" ${arma.atributoBaseAtaque === 'des' ? 'selected' : ''}>Des</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="text-[0.65rem] text-stone-500 uppercase tracking-widest mb-1 block">Dano</label>
                        <div class="flex items-center gap-2">
                            <input type="text" class="dano-input dynamic-weapon-input w-full p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all text-sm" data-field="dadoDano" data-index="${index}" placeholder="Ex: 3d8+2" value="${arma.dadoDano || ''}">
                            <svg class="dice-icon w-8 h-8 rollable cursor-pointer text-cyan-400 hover:text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all" viewBox="0 0 24 24" fill="currentColor"><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M7,9c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S8.1,9,7,9z M7,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S8.1,19,7,19z M12,14c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,14,12,14z M17,9c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,9,17,9z M17,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,19,17,19z"/></svg>
                        </div>
                    </div>
                    <div>
                        <label class="text-[0.65rem] text-stone-500 uppercase tracking-widest mb-1 block">Efeito Crítico / Notas</label>
                        <input type="text" class="dynamic-weapon-input w-full p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all text-sm" data-field="notasCritico" data-index="${index}" placeholder="Ex: Atordoa" value="${arma.notasCritico || ''}">
                    </div>
                </div>
            `;
            weaponListEl.appendChild(weaponRow);
        });

        window.timeoutSyncArmas = window.timeoutSyncArmas || {};

        // Evento de Edição Direta (UPDATE) com memória local instantânea
        weaponListEl.querySelectorAll('.dynamic-weapon-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const idx = e.target.dataset.index;
                const field = e.target.dataset.field;
                const arma = appState.combate.armas[idx];

                if (!arma) return;

                arma[field] = e.target.type === 'number' ? (parseFloat(e.target.value) || 0) : e.target.value;
                setStateByPath('combate.armas', appState.combate.armas);

                if (!arma.db_id) return;

                // O Mestre tem o auto-save de banco bloqueado para evitar conflitos (exige clique no Salvar)
                if (!isMestre) {
                    clearTimeout(window.timeoutSyncArmas[arma.db_id]);
                    window.timeoutSyncArmas[arma.db_id] = setTimeout(async () => {
                        await supabaseClient.from('inventario')
                            .update({ dados_customizados: arma })
                            .eq('id', arma.db_id);
                    }, 800);
                }
            });
        });

        // Evento de Descarte Silencioso (DELETE)
        weaponListEl.querySelectorAll('.remove-weapon-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const idx = e.target.dataset.index;
                const arma = appState.combate.armas[idx];
                if (!arma || !arma.db_id) return;

                if (!confirm(`Tem a certeza que deseja descartar: ${arma.nome || 'Arma sem designação'}?`)) return;

                // 1. Exclui da base de dados
                const { error } = await supabaseClient.from('inventario').delete().eq('id', arma.db_id);
                if (!error) {
                    await registarLog(personagemIdAtual, 'DESCARTE_ITEM', `Arma removida da ficha: ${arma.nome || 'Desconhecida'}`);

                    // 2. Exclui da memória e redesenha SEM recarregar o banco inteiro
                    appState.combate.armas.splice(idx, 1);
                    setStateByPath('combate.armas', appState.combate.armas);
                    renderizarArmas();
                }
            });
        });
    }

    function renderizarEquipamentos() {
        const equipmentListEl = document.getElementById('equipment-list');
        if (!equipmentListEl) return;
        equipmentListEl.innerHTML = '';

        const equipamentos = getValueFromPath(appState, 'inventario.equipamentos') || [];
        const categorias = {};

        // Agrupa todos os itens pelas categorias (herdadas do itemDatabase ou definidas manualmente)
        equipamentos.forEach((item, index) => {
            const cat = item.categoria || item.category || 'Equipamento';
            if (!categorias[cat]) categorias[cat] = [];
            categorias[cat].push({ item, index });
        });

        // Ordena e desenha cada categoria individualmente
        Object.keys(categorias).sort().forEach(catNome => {
            const header = document.createElement('h4');
            header.className = 'text-cyan-500 font-bold border-b border-stone-800 pb-1 mt-6 mb-3 uppercase text-xs tracking-widest';
            header.textContent = catNome;
            equipmentListEl.appendChild(header);

            categorias[catNome].forEach(({ item, index }) => {
                const itemRow = document.createElement('div');
                itemRow.className = 'flex flex-wrap sm:flex-nowrap items-center gap-2 mb-2 bg-stone-950/30 p-2 rounded border border-stone-800/50';
                itemRow.innerHTML = `
                    <input type="text" placeholder="Designação do item" class="w-full sm:flex-1 p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all dynamic-item-input text-sm" data-field="nome" data-index="${index}" value="${item.nome || item.name || ''}">
                    
                    <div class="flex items-center gap-1 w-full sm:w-28 relative">
                        <span class="absolute left-2 text-emerald-500 font-bold text-xs">C$</span>
                        <input type="number" placeholder="0" class="w-full p-2 pl-7 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-emerald-500 outline-none transition-all text-center dynamic-item-input text-sm" data-field="custo" data-index="${index}" value="${item.custo !== undefined ? item.custo : (item.price || 0)}">
                    </div>
                    
                    <div class="flex items-center gap-1 w-full sm:w-24 relative">
                        <input type="number" step="0.1" placeholder="0.0" class="w-full p-2 pr-6 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all text-center item-weight dynamic-item-input text-sm" data-field="peso" data-index="${index}" value="${item.peso || 0}">
                        <span class="absolute right-2 text-stone-500 text-xs font-bold">kg</span>
                    </div>

                    <select class="w-full sm:w-36 p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all text-sm dynamic-item-input" data-field="categoria" data-index="${index}">
                        <option value="Naves Prontas" ${catNome === 'Naves Prontas' ? 'selected' : ''}>Nave</option>
                        <option value="Dróides Prontos" ${catNome === 'Dróides Prontos' ? 'selected' : ''}>Dróide</option>
                        <option value="Peças de Naves" ${catNome === 'Peças de Naves' ? 'selected' : ''}>Peça (Nave)</option>
                        <option value="Peças de Dróides" ${catNome === 'Peças de Dróides' ? 'selected' : ''}>Peça (Dróide)</option>
                        <option value="Equipamento" ${catNome === 'Equipamento' ? 'selected' : ''}>Equipamento</option>
                        <option value="Outros" ${catNome === 'Outros' ? 'selected' : ''}>Outros</option>
                    </select>

                    <button class="remove-item-btn text-red-500 hover:text-red-400 font-bold text-lg px-2 py-1 transition-colors w-full sm:w-auto text-center" title="Descartar Item" data-index="${index}">X</button>
                `;
                equipmentListEl.appendChild(itemRow);
            });
        });

        window.timeoutSyncEquip = window.timeoutSyncEquip || {};

        equipmentListEl.querySelectorAll('.dynamic-item-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const idx = e.target.dataset.index;
                const field = e.target.dataset.field;
                const item = appState.inventario.equipamentos[idx];

                if (!item) return;

                item[field] = e.target.type === 'number' ? (parseFloat(e.target.value) || 0) : e.target.value;
                if (field === 'categoria') item.category = item.categoria;

                setStateByPath('inventario.equipamentos', appState.inventario.equipamentos);

                if (!item.db_id) return;

                // O Mestre tem o auto-save de banco bloqueado para evitar conflitos (exige clique no Salvar)
                if (!isMestre) {
                    clearTimeout(window.timeoutSyncEquip[item.db_id]);
                    window.timeoutSyncEquip[item.db_id] = setTimeout(async () => {
                        await supabaseClient.from('inventario')
                            .update({ dados_customizados: item })
                            .eq('id', item.db_id);
                    }, 800);
                }
            });

            if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    renderizarEquipamentos();
                });
            }
        });
        equipmentListEl.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const idx = e.target.dataset.index;
                const item = appState.inventario.equipamentos[idx];
                if (!item || !item.db_id) return;

                if (!confirm(`Descartar definitivamente o item: ${item.nome || item.name || 'Sem designação'}?`)) return;

                const { error } = await supabaseClient.from('inventario').delete().eq('id', item.db_id);
                if (!error) {
                    await registarLog(personagemIdAtual, 'DESCARTE_ITEM', `Equipamento descartado: ${item.nome || item.name || 'Desconhecido'}`);

                    appState.inventario.equipamentos.splice(idx, 1);
                    setStateByPath('inventario.equipamentos', appState.inventario.equipamentos);
                    renderizarEquipamentos();
                }
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
        function renderList(listId, statePath, placeholder) {
            const listEl = document.getElementById(listId);
            if (!listEl) return;
            listEl.innerHTML = '';

            const arrayData = getValueFromPath(appState, statePath) || [];

            arrayData.forEach((itemText, index) => {
                const row = document.createElement('div');
                row.className = 'flex items-center gap-2 mb-2';
                // HTML injetado agora utiliza classes Tailwind compatíveis com o novo tema
                row.innerHTML = `
                    <input type="text" placeholder="${placeholder}" value="${itemText}" class="w-full p-2 bg-stone-900/80 border border-stone-700 rounded-md text-stone-200 focus:border-cyan-500 outline-none transition-all dynamic-input" data-index="${index}">
                    <button class="remove-btn text-red-500 hover:text-red-400 font-bold text-lg px-2 transition-colors" data-index="${index}">X</button>
                `;
                listEl.appendChild(row);
            });

            const inputs = listEl.querySelectorAll('.dynamic-input');
            inputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    const idx = e.target.dataset.index;
                    const currentArray = getValueFromPath(appState, statePath);
                    currentArray[idx] = e.target.value;
                    setStateByPath(statePath, currentArray);
                });
            });

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

        // Renderização direta sem a necessidade de procurar IDs de botões (o onclick trata disso)
        renderList('talentos-list', 'caracteristicas.talentos', 'Descreva o talento...');
        renderList('poderes-list', 'caracteristicas.poderesForca', 'Descreva o poder...');
        renderList('idiomas-list', 'caracteristicas.idiomas', 'Nome do idioma...');
        renderList('aptidoes-list', 'caracteristicas.aptidoes', 'Descreva a aptidão...');
    }

    renderizarListasDinamicas();
    renderizarArmas();
    renderizarEquipamentos();
    /* FIM DE FUNÇÃO DE [Listas Dinâmicas] */

    /* INICIO DE FUNÇÃO DE [Adicionar Talentos de Classe]; esta função insere os talentos iniciais no array de estado */
    window.adicionarTalentosIniciais = function () {
        const classesParaVerificar = [];

        // 1. Verifica e guarda a classe principal
        if (appState.biografia.classe) {
            classesParaVerificar.push(appState.biografia.classe);
        }

        // 2. Verifica e guarda todas as multiclasses dinamicamente
        if (appState.biografia.multiclasse && appState.biografia.multiclasse.length > 0) {
            appState.biografia.multiclasse.forEach(c => {
                // Aceita tanto dados antigos (string solta) quanto o novo objeto { nome, nivel }
                const multiNome = typeof c === 'string' ? c : (c.nome || "");
                if (multiNome) classesParaVerificar.push(multiNome);
            });
        }

        // 3. Trava de segurança caso nenhuma classe tenha sido selecionada ainda
        if (classesParaVerificar.length === 0) {
            alert("Selecione pelo menos uma classe na Biografia antes de extrair os talentos.");
            return;
        }

        let talentosAtuais = getValueFromPath(appState, 'caracteristicas.talentos') || [];
        let adicionouAlgo = false;

        // 4. Varre todas as classes encontradas e injeta os talentos se o jogador ainda não os tiver
        classesParaVerificar.forEach(classeKey => {
            if (DADOS_CLASSES[classeKey] && DADOS_CLASSES[classeKey].talentosIniciais) {
                const talentosClasse = DADOS_CLASSES[classeKey].talentosIniciais;

                talentosClasse.forEach(talento => {
                    if (!talentosAtuais.includes(talento)) {
                        talentosAtuais.push(talento);
                        adicionouAlgo = true;
                    }
                });
            }
        });

        // 5. Atualiza a tela e notifica o jogador
        if (adicionouAlgo) {
            setStateByPath('caracteristicas.talentos', talentosAtuais);
            renderizarListasDinamicas();
        } else {
            alert("Todos os talentos iniciais das suas classes atuais já constam na lista.");
        }
    };
    /* FIM DE FUNÇÃO DE [Adicionar Talentos de Classe] */


    /* INÍCIO DE FUNÇÃO DE [Controle da Barra de Vida corrigido] */
    window.alterarPV = function (acao) {
        const nivel = parseInt(appState.biografia.nivel) || 1;
        const classeKey = appState.biografia.classe;
        const modsCon = Math.floor(((parseInt(appState.atributosBase.constituicao) || 10) - 10) / 2);

        let pvBase = 0;
        if (classeKey && DADOS_CLASSES[classeKey]) {
            const classeData = DADOS_CLASSES[classeKey];
            pvBase = classeData.pvIniciais + ((nivel - 1) * classeData.dadoVida) + (modsCon * nivel);
        }
        const maxHp = pvBase + (parseInt(appState.modificadoresManuais.status.modVidaMaxima) || 0);

        let currentHp = (appState.recursos.pontosVidaAtual !== null) ? parseInt(appState.recursos.pontosVidaAtual) : maxHp;

        if (acao === 'min') {
            currentHp = 0;
        } else if (acao === 'max') {
            currentHp = maxHp;
        } else {
            currentHp += parseInt(acao);
        }

        currentHp = Math.max(0, Math.min(currentHp, maxHp));
        setStateByPath('recursos.pontosVidaAtual', currentHp);
    };
    /* FIM DE FUNÇÃO DE [Controle da Barra de Vida corrigido] */

    /* INÍCIO DE FUNÇÃO DE [Delegação de Ações Globais]; exporta as funções chamadas pelos botões do novo HTML */
    window.adicionarClasse = function () {
        // Clona o array existente para forçar o sistema reativo a ativar os cálculos
        const currentArray = appState.biografia.multiclasse ? [...appState.biografia.multiclasse] : [];
        // Insere o novo objeto composto por Nome da Classe e Nível
        currentArray.push({ nome: "", nivel: 1 });
        setStateByPath('biografia.multiclasse', currentArray);
        if (typeof window.apiRenderizarMulticlasse === 'function') window.apiRenderizarMulticlasse();
    };

    window.adicionarArma = async function () {
        if (!personagemIdAtual) return alert("Ficha não sincronizada com a nuvem.");

        const { data: userData } = await supabaseClient.auth.getUser();
        if (!userData || !userData.user) return;

        const novaArma = { nome: "", bonusAtaque: 0, atributoBaseAtaque: "vig", dadoDano: "", notasCritico: "", tipo_inventario: "arma" };

        // Adiciona .select() para forçar o Supabase a devolver a linha acabada de criar
        const { data, error } = await supabaseClient.from('inventario').insert([{
            personagem_id: personagemIdAtual,
            user_id: userData.user.id,
            item_id: null,
            quantidade: 1,
            origem: 'manual',
            dados_customizados: novaArma
        }]).select();

        if (!error && data && data.length > 0) {
            await registarLog(personagemIdAtual, 'CRIACAO_MANUAL', 'Nova diretriz de arma adicionada ao arsenal.');

            // Injeta a nova arma e o ID gerado na memória SEM baixar a ficha toda de novo
            novaArma.db_id = data[0].id;
            appState.combate.armas.push(novaArma);
            setStateByPath('combate.armas', appState.combate.armas);
            if (typeof window.apiRenderizarArmas === 'function') window.apiRenderizarArmas();
        } else {
            console.error("Erro ao adicionar arma:", error);
        }
    };

    window.adicionarEquipamento = async function () {
        if (!personagemIdAtual) return alert("Ficha não sincronizada com a nuvem.");

        const { data: userData } = await supabaseClient.auth.getUser();
        if (!userData || !userData.user) return;

        // Injeta a categoria padrão para não dar quebra no novo agrupador
        const novoEquip = { nome: "", custo: 0, peso: 0, tipo_inventario: "equipamento", categoria: "Equipamento" };

        const { data, error } = await supabaseClient.from('inventario').insert([{
            personagem_id: personagemIdAtual,
            user_id: userData.user.id,
            item_id: null,
            quantidade: 1,
            origem: 'manual',
            dados_customizados: novoEquip
        }]).select();

        if (!error && data && data.length > 0) {
            await registarLog(personagemIdAtual, 'CRIACAO_MANUAL', 'Novo item registado no compartimento de carga.');

            novoEquip.db_id = data[0].id;
            appState.inventario.equipamentos.push(novoEquip);
            setStateByPath('inventario.equipamentos', appState.inventario.equipamentos);
            if (typeof window.apiRenderizarEquipamentos === 'function') window.apiRenderizarEquipamentos();
        } else {
            console.error("Erro ao adicionar equipamento:", error);
        }
    };
    window.adicionarTalento = function () {
        const currentArray = appState.caracteristicas.talentos || [];
        currentArray.push("");
        setStateByPath('caracteristicas.talentos', currentArray);
        if (typeof window.apiRenderizarListas === 'function') window.apiRenderizarListas();
    };

    window.adicionarPoder = function () {
        const currentArray = appState.caracteristicas.poderesForca || [];
        currentArray.push("");
        setStateByPath('caracteristicas.poderesForca', currentArray);
        if (typeof window.apiRenderizarListas === 'function') window.apiRenderizarListas();
    };

    window.adicionarIdioma = function () {
        const currentArray = appState.caracteristicas.idiomas || [];
        currentArray.push("");
        setStateByPath('caracteristicas.idiomas', currentArray);
        if (typeof window.apiRenderizarListas === 'function') window.apiRenderizarListas();
    };

    window.adicionarAptidao = function () {
        const currentArray = appState.caracteristicas.aptidoes || [];
        currentArray.push("");
        setStateByPath('caracteristicas.aptidoes', currentArray);
        if (typeof window.apiRenderizarListas === 'function') window.apiRenderizarListas();
    };

    window.fecharModal = function () {
        const diceModal = document.getElementById('dice-modal');
        if (diceModal) diceModal.classList.remove('show');
    };

    window.rolarDadoAtributo = function (atributoId, label) {
        const modId = 'mod-' + atributoId;
        const modElement = document.getElementById(modId);
        const modValue = modElement ? modElement.textContent : '+0';

        const titleEl = document.getElementById('modal-title');
        const resultEl = document.getElementById('roll-result');
        const detailsEl = document.getElementById('modal-details');

        if (titleEl) titleEl.textContent = `Rolar: ${label}`;
        if (resultEl) resultEl.innerHTML = `<span class="text-cyan-400 font-mono text-5xl">1d20 ${modValue}</span>`;
        if (detailsEl) detailsEl.textContent = "Role o dado físico na mesa e aplique o modificador.";

        const diceModal = document.getElementById('dice-modal');
        if (diceModal) diceModal.classList.add('show');
    };
    /* FIM DE FUNÇÃO DE [Delegação de Ações Globais] */

    /* INÍCIO DE FUNÇÃO DE [Exportar Ficha]; esta função converte o estado reativo em um arquivo JSON e força o download */
    const exportBtn = document.getElementById('exportar-ficha-btn');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // Pegamos o estado atual através do Proxy
            const fichaParaExportar = JSON.parse(JSON.stringify(_internalState));
            if (fichaParaExportar.recursos && fichaParaExportar.recursos.creditos !== undefined) {
                delete fichaParaExportar.recursos.creditos;
            }
            const dataToSave = { ficha: fichaParaExportar };

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
                        /* INICIO DE FUNÇÃO DE [Blindagem de Importação de Créditos]; esta função impede que o arquivo JSON sobrescreva o dinheiro oficial do banco de dados */
                        if (importedData.ficha.recursos && importedData.ficha.recursos.creditos !== undefined) {
                            delete importedData.ficha.recursos.creditos;
                        }

                        const creditosAutenticos = appState.recursos.creditos;

                        Object.assign(appState, importedData.ficha);

                        appState.recursos.creditos = creditosAutenticos;
                        /* FIM DE FUNÇÃO DE [Blindagem de Importação de Créditos] */

                        // Força o auto-save do novo JSON importado
                        localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));

                        // Usa a nova função para atualizar a tela
                        sincronizarTelaComEstado();
                        renderizarListasDinamicas();
                        renderizarArmas();
                        renderizarEquipamentos();
                        calcularMatematicaDaFicha();

                        console.log("[Importação] Ficha carregada com sucesso!");

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
    sincronizarTelaComEstado();
    calcularMatematicaDaFicha();
    renderizarMulticlasse();

    // Força a gravação e a geração de LOG na nuvem IMEDIATAMENTE após alterar os créditos
    const creditosInput = document.querySelector('[data-json-path="recursos.creditos"]');
    if (creditosInput) {
        creditosInput.addEventListener('change', async () => {
            // Mestre não manda update de carteira na mesma hora (exige salvar)
            if (!isMestre) await salvarFichaNoBanco();
        });
    }


    // Exportação das funções para o escopo global (usado pelo Supabase)
    window.apiRenderizarMulticlasse = renderizarMulticlasse;
    window.apiRenderizarListas = renderizarListasDinamicas;
    window.apiRenderizarArmas = renderizarArmas;
    window.apiRenderizarEquipamentos = renderizarEquipamentos;
}


/* INICIO DE FUNÇÃO DE [Sincronização e Supabase]; gerencia carregamento, salvamento e exclusão na nuvem */
function sincronizarTelaComEstadoGlobal() {
    const obterValorDoCaminho = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

    document.querySelectorAll('[data-json-path]').forEach(input => {
        const value = obterValorDoCaminho(appState, input.dataset.jsonPath);
        if (value !== undefined && value !== null) {
            if (input.type === 'checkbox') input.checked = value;
            else input.value = value;
        }
    });

    // Adicione este bloco: Atualiza o texto da nota racial na tela
    const racaSelecionada = appState.biografia.especie;
    const notasElement = document.getElementById('notas-raciais');
    if (notasElement && typeof DADOS_RACAS !== 'undefined') {
        notasElement.textContent = (racaSelecionada && DADOS_RACAS[racaSelecionada]) ? DADOS_RACAS[racaSelecionada].notas : '';
    }
}

async function registarLog(personagemId, tipoEvento, descricao, mudancaCreditos = 0) {
    if (!personagemId) return;

    const descricaoFinal = isMestre ? `[ISB OVERRIDE] ${descricao}` : descricao;

    await supabaseClient.from('logs_auditoria').insert([{
        personagem_id: personagemId,
        tipo_evento: tipoEvento,
        descricao: descricaoFinal,
        mudanca_creditos: mudancaCreditos
    }]);
}

async function carregarFichaDoBanco() {
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    const btnLogout = document.getElementById('btn-logout');
    const btnLogin = document.getElementById('btn-login');

    if (userError || !userData.user) {
        if (btnLogout) btnLogout.classList.add('hidden');
        if (btnLogin) btnLogin.classList.remove('hidden');
        return;
    }

    if (btnLogout) btnLogout.classList.remove('hidden');
    if (btnLogin) btnLogin.classList.add('hidden');

    const currentUser = userData.user;
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('id');

    let dbFicha = null;

    // MODO INSPEÇÃO (Com Gatekeeper Híbrido)
    if (targetId) {
        const { data: fichaTarget, error: targetError } = await supabaseClient
            .from('personagens').select('*').eq('id', targetId).single();

        if (targetError || !fichaTarget) {
            alert("Dossiê não encontrado nos registros imperiais.");
            window.location.href = '../menu.html';
            return;
        }

        if (fichaTarget.user_id === currentUser.id) {
            // O próprio jogador acessou via URL direta
            dbFicha = fichaTarget;
        } else {
            // Verifica na tabela de permissões se o visitante tem cargo elevado
            const { data: perm } = await supabaseClient
                .from('permissoes').select('cargo').eq('user_id', currentUser.id).single();

            if (perm && (perm.cargo === 'mestre' || perm.cargo === 'dev')) {
                isMestre = true;
                dbFicha = fichaTarget;

                // Alerta Visual Permanente
                const avisoMestre = document.createElement('div');
                avisoMestre.className = 'w-full bg-red-900/90 text-white text-center py-1.5 text-xs font-bold tracking-widest uppercase border-b border-red-500 animate-pulse absolute top-0 left-0 z-50 shadow-lg';
                avisoMestre.innerHTML = '⚠️ MODO ISB: VOCÊ ESTÁ INSPECIONANDO O DOSSIÊ DE OUTRO PILOTO ⚠️';
                document.body.prepend(avisoMestre);
            } else {
                alert("ACESSO NEGADO: Você não possui autorização nível ISB para acessar este dossiê.");
                window.location.href = '../menu.html';
                return;
            }
        }
    } else {
        // MODO PADRÃO
        const { data: personagens, error: selectError } = await supabaseClient
            .from('personagens').select('*').eq('user_id', currentUser.id).limit(1);

        if (!selectError && personagens && personagens.length > 0) {
            dbFicha = personagens[0];
        }
    }

    // Se passou pelo Gatekeeper e carregou a ficha com sucesso, injeta no HTML
    if (dbFicha) {
        personagemIdAtual = dbFicha.id;

        Object.assign(appState, dbFicha.dados_ficha);
        setStateByPath('biografia.nome', dbFicha.nome);
        setStateByPath('recursos.creditos', dbFicha.creditos);

        const { data: invData, error: invError } = await supabaseClient
            .from('inventario')
            .select('*')
            .eq('personagem_id', personagemIdAtual);

        appState.combate.armas = [];
        appState.inventario.equipamentos = [];

        if (!invError && invData) {
            invData.forEach(dbItem => {
                let itemFinal = {};
                if (dbItem.item_id) {
                    const base = (typeof itemDatabase !== 'undefined' ? itemDatabase : []).find(i => i.id === dbItem.item_id);
                    itemFinal = base ? { ...base, ...dbItem.dados_customizados } : { ...dbItem.dados_customizados };
                } else {
                    itemFinal = { ...dbItem.dados_customizados };
                }

                itemFinal.db_id = dbItem.id;
                itemFinal.nome = itemFinal.nome || itemFinal.name || "";
                itemFinal.custo = itemFinal.custo !== undefined ? itemFinal.custo : (itemFinal.price || 0);

                if (itemFinal.dadoDano !== undefined || itemFinal.bonusAtaque !== undefined || itemFinal.tipo_inventario === 'arma') {
                    appState.combate.armas.push(itemFinal);
                } else {
                    appState.inventario.equipamentos.push(itemFinal);
                }
            });
        }

        sincronizarTelaComEstadoGlobal();

        if (typeof window.apiRenderizarListas === 'function') window.apiRenderizarListas();
        if (typeof window.apiRenderizarMulticlasse === 'function') window.apiRenderizarMulticlasse();
        if (typeof window.apiRenderizarArmas === 'function') window.apiRenderizarArmas();
        if (typeof window.apiRenderizarEquipamentos === 'function') window.apiRenderizarEquipamentos();
        if (typeof calcularMatematicaDaFicha === 'function') calcularMatematicaDaFicha();

        console.log("[Banco de Dados] Ficha e Inventário Relacional carregados da nuvem.");
    }
}

async function salvarFichaNoBanco() {
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !userData.user) {
        alert("Sessão inválida. O progresso foi salvo apenas localmente.");
        return;
    }

    const jsonLimpo = JSON.parse(JSON.stringify(_internalState));
    if (jsonLimpo.recursos && jsonLimpo.recursos.creditos !== undefined) delete jsonLimpo.recursos.creditos;
    if (jsonLimpo.combate && jsonLimpo.combate.armas !== undefined) delete jsonLimpo.combate.armas;
    if (jsonLimpo.inventario && jsonLimpo.inventario.equipamentos !== undefined) delete jsonLimpo.inventario.equipamentos;

    const creditosAtuais = parseInt(appState.recursos.creditos) || 0;

    // REMOVIDO o user_id do payload base. Ele não deve ser sobrescrito em atualizações.
    const payload = {
        nome: appState.biografia.nome || 'Desconhecido',
        creditos: creditosAtuais,
        dados_ficha: jsonLimpo,
        updated_at: new Date().toISOString()
    };

    let dbError = null;

    // MODO ATUALIZAÇÃO (Ficha já existe)
    if (personagemIdAtual) {
        const { data: prevData } = await supabaseClient.from('personagens').select('creditos').eq('id', personagemIdAtual).single();
        if (prevData && prevData.creditos !== creditosAtuais) {
            const diferenca = creditosAtuais - prevData.creditos;
            await registarLog(personagemIdAtual, 'AJUSTE_CREDITOS', `Créditos alterados manualmente na ficha de ${prevData.creditos} para ${creditosAtuais}.`, diferenca);
        }

        // Atualiza apenas os dados permitidos, mantendo o dono original intacto
        const { error } = await supabaseClient.from('personagens').update(payload).eq('id', personagemIdAtual);
        dbError = error;

        // MESTRE: Salva os itens do inventário no banco
        if (isMestre) {
            for (const arma of appState.combate.armas) {
                if (arma.db_id) await supabaseClient.from('inventario').update({ dados_customizados: arma }).eq('id', arma.db_id);
            }
            for (const item of appState.inventario.equipamentos) {
                if (item.db_id) await supabaseClient.from('inventario').update({ dados_customizados: item }).eq('id', item.db_id);
            }
        }

        // MODO CRIAÇÃO (Ficha nova)
    } else {
        // Apenas na criação de uma ficha nova nós injetamos quem é o dono (criador)
        payload.user_id = userData.user.id;

        const { data, error } = await supabaseClient.from('personagens').insert([payload]).select();
        if (data && data.length > 0) personagemIdAtual = data[0].id;
        dbError = error;
        await registarLog(personagemIdAtual, 'CRIACAO', `Ficha inicializada com ${creditosAtuais} créditos.`, creditosAtuais);
    }

    const notif = document.getElementById('notificacao');
    if (!dbError) {
        console.log("[Banco de Dados] Salvo na nuvem com sucesso!");
        if (notif) {
            notif.textContent = '☁️ Ficha salva na nuvem com sucesso!';
            notif.classList.remove('ocultday');
            notif.classList.add('visivel');
            setTimeout(() => {
                notif.classList.remove('visivel');
                notif.classList.add('ocultday');
            }, 2500);
        }
    } else {
        console.error("[Banco de Dados] Erro ao salvar:", dbError);
        alert("Erro ao salvar na nuvem. Verifique a sua conexão.");
    }
}

initFicha();

setTimeout(() => {
    const btnSaveGlobal = document.getElementById('btn-save');
    if (btnSaveGlobal) {
        const newBtnSave = btnSaveGlobal.cloneNode(true);
        btnSaveGlobal.parentNode.replaceChild(newBtnSave, btnSaveGlobal);
        newBtnSave.addEventListener('click', async () => {
            if (!isMestre) localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
            await salvarFichaNoBanco();
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        const newBtnLogout = btnLogout.cloneNode(true);
        btnLogout.parentNode.replaceChild(newBtnLogout, btnLogout);
        newBtnLogout.addEventListener('click', async () => {
            if (!confirm("Tem certeza que deseja sair? O progresso não salvo será perdido.")) return;
            const { error } = await supabaseClient.auth.signOut();
            if (!error) {
                localStorage.removeItem('starWarsFichaAutoSave');
                window.location.href = '../menu.html';
            }
        });
    }

    const btnDeletar = document.getElementById('deletar-ficha-btn');
    if (btnDeletar) {
        const newBtnDeletar = btnDeletar.cloneNode(true);
        btnDeletar.parentNode.replaceChild(newBtnDeletar, btnDeletar);
        newBtnDeletar.addEventListener('click', async () => {
            if (!personagemIdAtual) {
                alert("Ainda não há nenhuma ficha vinculada na nuvem para deletar.");
                return;
            }

            const confirmacao = confirm("CUIDADO: Você quer mesmo deletar esta ficha? Os dados não poderão ser recuperados.");
            if (!confirmacao) return;

            const senha = prompt("Para confirmar a exclusão, digite sua senha de acesso:");
            if (!senha) {
                alert("Exclusão cancelada. Senha não fornecida.");
                return;
            }

            const { data: userData } = await supabaseClient.auth.getUser();
            const { error: authError } = await supabaseClient.auth.signInWithPassword({
                email: userData.user.email,
                password: senha
            });

            if (authError) {
                alert("Senha incorreta. Exclusão abortada por segurança.");
                return;
            }

            const { error: deleteError } = await supabaseClient.from('personagens').delete().eq('id', personagemIdAtual);

            if (deleteError) {
                alert("Erro interno ao deletar ficha no banco de dados.");
                console.error(deleteError);
            } else {
                alert("Ficha obliterada com sucesso da nuvem. O terminal será resetado.");
                localStorage.removeItem('starWarsFichaAutoSave');
                window.location.reload();
            }
        });
    }

    carregarFichaDoBanco();
}, 400);
/* FIM DE FUNÇÃO DE [Sincronização e Supabase] */