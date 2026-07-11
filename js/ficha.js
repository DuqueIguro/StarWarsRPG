/* ==========================================================================
   ESTADO INICIAL E DEFINIÇÕES PADRÃO (Mapeamento do JSON preservado)
   ========================================================================== */
const defaultState = {
    biografia: {
        nome: "", jogador: "", classe: "", nivel: 1, especie: "", tamanho: "Médio", idade: "", sexo: "", peso: "", altura: "", destino: ""
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
        defesas: { 
            fortitude: { classe: 0, armadura: 0, outros: 0 }, 
            reflexo: { classe: 0, armadura: 0, outros: 0 }, 
            vontade: { classe: 0, armadura: 0, outros: 0 } 
        },
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
    caracteristicas: { talentos: [], poderesForca: [], idiomas: [], aptidoes: [] },
    combate: { armas: [] },
    inventario: { equipamentos: [] },
    campanha: { anotacoes: "" }
};

/* ==========================================================================
   INICIALIZAÇÃO E PROXY REATIVO
   ========================================================================== */
let _internalState = JSON.parse(JSON.stringify(defaultState));
const savedState = localStorage.getItem('starWarsFichaAutoSave');
if (savedState) {
    try { _internalState = JSON.parse(savedState); } catch (e) { console.error("Erro no auto-save local."); }
}

const appState = new Proxy(_internalState, {
    set(target, property, value, receiver) {
        const res = Reflect.set(target, property, value, receiver);
        localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
        return res;
    }
});

function setStateByPath(path, value) {
    const keys = path.split('.');
    let current = appState;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    calcularMatematicaDaFicha();
}

function getValueFromPath(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

let personagemIdAtual = null;

/* ==========================================================================
   SISTEMA MATEMÁTICO CORE (Cálculos Automáticos)
   ========================================================================== */
function calcularMatematicaDaFicha() {
    const nivel = parseInt(appState.biografia.nivel) || 1;
    const halfLevel = Math.floor(nivel / 2);

    // 1. Modificadores de Atributo
    const mods = {};
    const atributosMapeamento = ['vigor', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
    
    atributosMapeamento.forEach(attr => {
        const valorBase = parseInt(appState.atributosBase[attr]) || 10;
        const modificador = Math.floor((valorBase - 10) / 2);
        mods[attr.substring(0, 3)] = modificador;
        
        const elMod = document.getElementById(`mod-${attr}`);
        if (elMod) elMod.textContent = (modificador >= 0 ? '+' : '') + modificador;
    });

    // 2. Cálculo de Defesas (10 + Nível + Mod. Atributo + Manuais)
    const calcDefesa = (modAttr, pathPrefix) => {
        const classe = parseInt(appState.modificadoresManuais.defesas[pathPrefix].classe) || 0;
        const armadura = parseInt(appState.modificadoresManuais.defesas[pathPrefix].armadura) || 0;
        const outros = parseInt(appState.modificadoresManuais.defesas[pathPrefix].outros) || 0;
        return 10 + nivel + modAttr + classe + armadura + outros;
    };

    const totalRef = calcDefesa(mods.des, 'reflexo');
    const totalFort = calcDefesa(mods.con, 'fortitude');
    const totalVon = calcDefesa(mods.sab, 'vontade');

    if (document.getElementById('def-total-reflexo')) document.getElementById('def-total-reflexo').textContent = totalRef;
    if (document.getElementById('def-total-fortitude')) document.getElementById('def-total-fortitude').textContent = totalFort;
    if (document.getElementById('def-total-vontade')) document.getElementById('def-total-vontade').textContent = totalVon;
    
    if (document.getElementById('def-sub-reflexo')) document.getElementById('def-sub-reflexo').textContent = `${nivel} + (${(mods.des >= 0 ? '+' : '')}${mods.des})`;
    if (document.getElementById('def-sub-fortitude')) document.getElementById('def-sub-fortitude').textContent = `${nivel} + (${(mods.con >= 0 ? '+' : '')}${mods.con})`;
    if (document.getElementById('def-sub-vontade')) document.getElementById('def-sub-vontade').textContent = `${nivel} + (${(mods.sab >= 0 ? '+' : '')}${mods.sab})`;

    // 3. Limiar de Dano & BBA Display
    if (document.getElementById('limiar-dano-display')) document.getElementById('limiar-dano-display').textContent = totalFort;
    if (document.getElementById('bba-display')) {
        const bbaManual = parseInt(appState.modificadoresManuais.combate.ataqueGeral) || 0;
        document.getElementById('bba-display').textContent = (bbaManual >= 0 ? '+' : '') + bbaManual;
    }

    // 4. Pontos de Vida (HP) Dinâmicos
    const hpAjuste = parseInt(appState.modificadoresManuais.status.modVidaMaxima) || 0;
    const maxHp = 10 + (nivel * 6) + (mods.con * nivel) + hpAjuste; // Regra genérica adaptável
    
    if (appState.recursos.pontosVidaAtual === null) {
        appState.recursos.pontosVidaAtual = maxHp;
    } else if (appState.recursos.pontosVidaAtual > maxHp) {
        appState.recursos.pontosVidaAtual = maxHp;
    }

    const pvDisplay = document.getElementById('pv-atual-display');
    if (pvDisplay) pvDisplay.textContent = `${appState.recursos.pontosVidaAtual} / ${maxHp}`;

    // 5. Renderização Reativa de Perícias Calculadas
    renderizarPericiasCalculadas(halfLevel, mods);
}

/* ==========================================================================
   RENDERIZAÇÃO DINÂMICA DE COMPONENTES HOLOGRÁFICOS
   ========================================================================== */
function renderizarPericiasCalculadas(halfLevel, mods) {
    const container = document.getElementById('pericias');
    if (!container) return;

    // Salva o termo de busca atual para não perder o foco
    const filtro = document.getElementById('search-pericia')?.value.toLowerCase() || "";
    container.innerHTML = "";

    Object.entries(appState.pericias).forEach(([key, skill]) => {
        if (filtro && !skill.nome.toLowerCase().includes(filtro)) return;

        const modAttr = mods[skill.atributoBase] || 0;
        const total = halfLevel + modAttr + (skill.treinada ? 5 : 0) + (skill.foco ? 5 : 0) + (parseInt(skill.bonusManual) || 0);

        const row = document.createElement('div');
        row.className = "grid grid-cols-12 gap-2 items-center bg-stone-900/40 p-2 rounded-lg border border-stone-800/60 hover:border-cyan-500/30 transition-all text-sm";
        row.innerHTML = `
            <div class="col-span-1 text-center">
                <input type="checkbox" class="h-4 w-4" ${skill.treinada ? 'checked' : ''} onchange="atualizarSkill('${key}', 'treinada', this.checked)">
            </div>
            <div class="col-span-1 text-center">
                <input type="checkbox" class="h-4 w-4" ${skill.foco ? 'checked' : ''} onchange="atualizarSkill('${key}', 'foco', this.checked)">
            </div>
            <div class="col-span-4 font-semibold text-stone-200">
                ${skill.nome} <span class="text-xs text-stone-500">(${skill.atributoBase.toUpperCase()})</span>
            </div>
            <div class="col-span-2 text-center font-bold text-cyan-400 text-base">
                ${total >= 0 ? '+' : ''}${total}
            </div>
            <div class="col-span-2">
                <input type="number" class="w-full text-center p-1 text-xs" value="${skill.bonusManual}" oninput="atualizarSkill('${key}', 'bonusManual', parseInt(this.value) || 0)">
            </div>
            <div class="col-span-2 text-center">
                <svg class="dice-icon w-6 h-6 mx-auto" viewBox="0 0 24 24" onclick="rolarDadoFisico('${skill.nome}', 20, ${total})"><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,14c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,14,12,14z"/></svg>
            </div>
        `;
        container.appendChild(row);
    });
}

function atualizarSkill(skillKey, campo, valor) {
    appState.pericias[skillKey][campo] = valor;
    localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
    calcularMatematicaDaFicha();
}

/* ARSENAL (Armas) */
function renderizarArmas() {
    const container = document.getElementById('weapon-list');
    if (!container) return;
    container.innerHTML = "";

    appState.combate.armas.forEach((arma, index) => {
        const div = document.createElement('div');
        div.className = "bg-stone-900/60 p-4 rounded-xl border border-stone-800 flex flex-col gap-3 relative group";
        div.innerHTML = `
            <button onclick="removerArma(${index})" class="absolute top-2 right-2 text-red-500 opacity-60 hover:opacity-100 font-bold text-sm transition-all">✖</button>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                    <label>Identificação do Armamento</label>
                    <input type="text" value="${arma.nome || ''}" oninput="atualizarArma(${index}, 'nome', this.value)" placeholder="Blaster, Sabre de Luz...">
                </div>
                <div>
                    <label>Ajuste de Ataque</label>
                    <input type="text" value="${arma.bonusAtaque || ''}" oninput="atualizarArma(${index}, 'bonusAtaque', this.value)" placeholder="ex: +5">
                </div>
                <div>
                    <label>Matriz de Dano</label>
                    <div class="flex items-center gap-2">
                        <input type="text" value="${arma.dadoDano || ''}" oninput="atualizarArma(${index}, 'dadoDano', this.value)" placeholder="ex: 3d8">
                        <svg class="dice-icon w-8 h-8 shrink-0" viewBox="0 0 24 24" onclick="rolarDadoFisico('${arma.nome || 'Arma'}', 'Dano', '${arma.dadoDano || '0'}')"><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,14c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,14,12,14z"/></svg>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function adicionarArma() {
    appState.combate.armas.push({ nome: "", bonusAtaque: "", dadoDano: "" });
    renderizarArmas();
}

function atualizarArma(index, campo, valor) {
    appState.combate.armas[index][campo] = valor;
    localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
}

function removerArma(index) {
    appState.combate.armas.splice(index, 1);
    setStateByPath('combate.armas', appState.combate.armas);
    renderizarArmas();
}

/* LISTAS DE TEXTO DINÂMICAS (Talentos, Poderes, Equipamentos) */
function renderizarListaSimples(listId, statePath, placeholder) {
    const container = document.getElementById(listId);
    if (!container) return;
    container.innerHTML = "";

    const items = getValueFromPath(appState, statePath) || [];
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "flex items-center gap-2";
        div.innerHTML = `
            <input type="text" value="${item}" placeholder="${placeholder}" class="p-2 text-sm" oninput="atualizarListaSimples('${statePath}', ${index}, this.value)">
            <button onclick="removerListaSimples('${listId}', '${statePath}', ${index})" class="text-red-500 font-bold hover:text-red-400 p-1">✖</button>
        `;
        container.appendChild(div);
    });
}

function adicionarItemLista(listId, statePath, placeholder) {
    const items = getValueFromPath(appState, statePath) || [];
    items.push("");
    setStateByPath(statePath, items);
    renderizarListaSimples(listId, statePath, placeholder);
}

function atualizarListaSimples(statePath, index, valor) {
    const items = getValueFromPath(appState, statePath);
    items[index] = valor;
    localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
}

function removerListaSimples(listId, statePath, index) {
    const items = getValueFromPath(appState, statePath);
    items.splice(index, 1);
    setStateByPath(statePath, items);
    renderizarListaSimples(listId, statePath, "Injetar diretriz...");
}

// Atalhos globais para botões HTML
window.adicionarTalento = () => adicionarItemLista('talentos-list', 'caracteristicas.talentos', 'Novo talento de combate...');
window.adicionarPoder = () => adicionarItemLista('poderes-list', 'caracteristicas.poderesForca', 'Nova manipulação da Força...');

/* INVENTÁRIO (Equipamentos) */
function renderizarEquipamentos() {
    const container = document.getElementById('equipment-list');
    if (!container) return;
    container.innerHTML = "";

    const items = appState.inventario.equipamentos || [];
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "grid grid-cols-12 gap-2 items-center bg-stone-900/30 p-2 rounded-lg border border-stone-800/40";
        div.innerHTML = `
            <input type="text" class="col-span-8 p-1.5 text-xs font-semibold" value="${item.nome || ''}" placeholder="Nome do Equipamento" oninput="atualizarEquipamento(${index}, 'nome', this.value)">
            <input type="number" class="col-span-3 p-1.5 text-xs text-center font-bold text-emerald-400" value="${item.custo || 0}" placeholder="Custo" oninput="atualizarEquipamento(${index}, 'custo', parseInt(this.value) || 0)">
            <button onclick="removerEquipamento(${index})" class="col-span-1 text-red-500 font-bold hover:text-red-400 text-center">✖</button>
        `;
        container.appendChild(div);
    });
}

function adicionarEquipamento() {
    appState.inventario.equipamentos.push({ nome: "", custo: 0 });
    renderizarEquipamentos();
}

function atualizarEquipamento(index, campo, valor) {
    appState.inventario.equipamentos[index][campo] = valor;
    localStorage.setItem('starWarsFichaAutoSave', JSON.stringify(_internalState));
}

function removerEquipamento(index) {
    appState.inventario.equipamentos.splice(index, 1);
    setStateByPath('inventario.equipamentos', appState.inventario.equipamentos);
    renderizarEquipamentos();
}

/* ==========================================================================
   INTERAÇÕES VIVAS: CONTROLE DE HP E SINAIS VITAIS
   ========================================================================== */
window.alterarPV = (acao) => {
    const nivel = parseInt(appState.biografia.nivel) || 1;
    const vigorBase = parseInt(appState.atributosBase.vigor) || 10;
    const modCon = Math.floor(((parseInt(appState.atributosBase.constituicao) || 10) - 10) / 2);
    const hpAjuste = parseInt(appState.modificadoresManuais.status.modVidaMaxima) || 0;
    const maxHp = 10 + (nivel * 6) + (modCon * nivel) + hpAjuste;

    let atual = appState.recursos.pontosVidaAtual !== null ? appState.recursos.pontosVidaAtual : maxHp;

    if (acao === 'min') atual = 0;
    else if (acao === 'max') atual = maxHp;
    else atual += acao;

    atual = Math.max(0, Math.min(atual, maxHp));
    setStateByPath('recursos.pontosVidaAtual', atual);
};

/* ==========================================================================
   DINAMISMO: MOTOR DE ROLAGEM DE DADOS E ANIMAÇÃO 3D
   ========================================================================== */
window.rolarDadoAtributo = (attrKey, label) => {
    const valorBase = parseInt(appState.atributosBase[attrKey]) || 10;
    const modificador = Math.floor((valorBase - 10) / 2);
    window.rolarDadoFisico(`Teste de ${label}`, 20, modificador);
};

window.rolarDadoFisico = (label, faces, mod) => {
    // 1. Encontra o ícone disparador para aplicar animação de rotação se houver evento ativo
    const clicado = event?.currentTarget;
    if (clicado) {
        clicado.classList.add('dice-spinning');
        setTimeout(() => clicado.classList.remove('dice-spinning'), 600);
    }

    const modal = document.getElementById('dice-modal');
    const titleEl = document.getElementById('modal-title');
    const resultEl = document.getElementById('roll-result');
    const detailsEl = document.getElementById('modal-details');

    if (!modal) return;

    titleEl.textContent = label.toUpperCase();

    // Se as faces forem "Dano", lidamos com exibição de strings complexas
    if (faces === "Dano") {
        resultEl.textContent = mod;
        detailsEl.textContent = `Rolar fórmula física na mesa de jogo`;
    } else {
        // Rolagem Real D20 Math
        const resultadoDado = Math.floor(Math.random() * faces) + 1;
        const totalFinal = resultadoDado + mod;

        resultEl.textContent = totalFinal;
        detailsEl.textContent = `Resultado do Dado: ${resultadoDado} | Modificador Aplicado: ${mod >= 0 ? '+' : ''}${mod}`;
    }

    modal.classList.add('show');
};

window.fecharModal = () => {
    document.getElementById('dice-modal')?.classList.remove('show');
};

/* ==========================================================================
   SINCRONIZAÇÃO DE TELAS, INPUTS E SUPABASE NUVEM
   ========================================================================== */
function sincronizarTelaCompleta() {
    document.querySelectorAll('[data-json-path]').forEach(input => {
        const path = input.dataset.jsonPath;
        const valor = getValueFromPath(appState, path);
        if (valor !== undefined && valor !== null) {
            input.value = valor;
        }
    });

    // Chama as renderizações estruturais
    calcularMatematicaDaFicha();
    renderizarArmas();
    renderizarEquipamentos();
    renderizarListaSimples('talentos-list', 'caracteristicas.talentos', 'Novo talento...');
    renderizarListaSimples('poderes-list', 'caracteristicas.poderesForca', 'Novo poder...');
}

function VincularEventosInputs() {
    document.querySelectorAll('[data-json-path]').forEach(input => {
        const tipoEvento = input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(tipoEvento, (e) => {
            let valor = e.target.value;
            if (e.target.type === 'number') valor = parseInt(valor) || 0;
            setStateByPath(e.target.dataset.jsonPath, valor);
        });
    });

    // Barra de pesquisa viva para as Perícias
    document.getElementById('search-pericia')?.addEventListener('input', () => {
        calcularMatematicaDaFicha();
    });
}

/* BANCO DE DADOS INTEGRADO */
async function carregarFichaDoBanco() {
    if (typeof supabaseClient === 'undefined') return;
    const { data: userData } = await supabaseClient.auth.getUser();
    if (!userData?.user) return;

    const { data: personagens } = await supabaseClient
        .from('personagens').select('*').eq('user_id', userData.user.id).limit(1);

    if (personagens && personagens.length > 0) {
        const dbFicha = personagens[0];
        personagemIdAtual = dbFicha.id;

        Object.assign(appState, dbFicha.dados_ficha);
        setStateByPath('biografia.nome', dbFicha.nome);
        setStateByPath('recursos.creditos', dbFicha.creditos);

        sincronizarTelaCompleta();
        ExibirNotificacao("☁️ Protocolos sincronizados da Nuvem.");
    }
}

async function salvarFichaNoBanco() {
    if (typeof supabaseClient === 'undefined') return;
    const { data: userData } = await supabaseClient.auth.getUser();
    
    if (!userData?.user) {
        ExibirNotificacao("✅ Salvo apenas localmente (Modo offline).");
        return;
    }

    const jsonLimpo = JSON.parse(JSON.stringify(_internalState));
    if (jsonLimpo.recursos?.creditos !== undefined) delete jsonLimpo.recursos.creditos;

    const payload = {
        user_id: userData.user.id,
        nome: appState.biografia.nome || 'Desconhecido',
        creditos: parseInt(appState.recursos.creditos) || 0,
        dados_ficha: jsonLimpo,
        updated_at: new Date().toISOString()
    };

    if (personagemIdAtual) {
        await supabaseClient.from('personagens').update(payload).eq('id', personajeIdAtual);
    } else {
        const { data } = await supabaseClient.from('personagens').insert([payload]).select();
        if (data?.length > 0) personagemIdAtual = data[0].id;
    }
    ExibirNotificacao("☁️ Registro criptografado na Nuvem!");
}

function ExibirNotificacao(msg) {
    const notif = document.getElementById('notificacao');
    if (!notif) return;
    notif.textContent = msg;
    notif.classList.remove('ocultday');
    notif.classList.add('visivel');
    setTimeout(() => {
        notif.classList.remove('visivel');
        notif.classList.add('ocultday');
    }, 3000);
}

/* ==========================================================================
   EXECUÇÃO E BOOT UP DO SISTEMA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    sincronizarTelaCompleta();
    VincularEventosInputs();
    
    // Vincula botões flutuantes principais
    document.querySelector('.btn-salvar-fixo')?.addEventListener('click', salvarFichaNoBanco);

    // Carregamento assíncrono pós boot para evitar gargalos na tela
    setTimeout(carregarFichaDoBanco, 300);
});