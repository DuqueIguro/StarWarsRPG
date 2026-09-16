// StarWarsRPG/dev/controleUsuario/controleUsuario.js
'use strict';

/* ============================================================
   controleUsuario.js — Painel de Controle DEV/Mestre
   Gerencia personagens, facções e saldos econômicos com
   auditoria completa em log_bancario.
   ============================================================ */

const AUTHORIZED_USERS = {
    '94d1ed61-7955-40d8-a0a1-7733bd716b5d': { nome: 'Duque', tema: 'theme-duque' },
    'c28cf763-c1a9-4f31-b0b8-6bfe296810e2': { nome: 'Eiden', tema: 'theme-eiden' },
    'e5fc379a-fc6c-42bb-a3d4-b6984f1693b9': { nome: 'Mestre', tema: 'theme-mestre' }
};

const BALANCE_FIELDS = ['creditos', 'facecred', 'peggats', 'fichas'];
const BALANCE_LABELS = {
    creditos: 'Créditos Imperiais',
    facecred: 'FaceCred',
    peggats: 'Peggats',
    fichas: 'Fichas Galácticas'
};

const AVATAR_FALLBACK = 'https://placehold.co/200x200/030603/00ff41?text=SEM+DADOS';

let currentOperator = null; // { id, nome }
let allCharacters = [];
let selectedCharacter = null;

/* ============================================================
   1. GATEKEEPER — Verificação de Acesso Restrito
   ============================================================ */
async function verificarAcessoDev() {
    const overlay = document.getElementById('accessOverlay');

    try {
        const { data: userData, error: userError } = await supabaseClient.auth.getUser();

        if (userError || !userData?.user) {
            alert('ALERTA DE INTRUSÃO: Autenticação biométrica requerida.');
            window.location.href = '../index.html';
            return false;
        }

        const uid = userData.user.id;
        const authInfo = AUTHORIZED_USERS[uid];

        if (!authInfo) {
            alert('ACESSO NEGADO: Suas credenciais não possuem autorização nível DEV_CORE. O incidente foi registrado.');
            window.location.href = '../menu';
            return false;
        }

        currentOperator = { id: uid, nome: authInfo.nome };

        // Aplica o tema visual do operador
        document.body.classList.add(authInfo.tema);

        // Atualiza o nome do operador no header
        const opNameEl = document.getElementById('operatorName');
        if (opNameEl) opNameEl.textContent = authInfo.nome.toUpperCase();

        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 350);
        }

        return true;
    } catch (err) {
        console.error('[DEV_CORE] Falha crítica no gatekeeper:', err);
        alert('FALHA CRÍTICA DE SEGURANÇA. Redirecionando...');
        window.location.href = '../menu';
        return false;
    }
}

/* ============================================================
   2. CARREGAMENTO DO ROSTER DE PERSONAGENS
   ============================================================ */
async function carregarPersonagens() {
    const rosterList = document.getElementById('rosterList');
    const rosterCount = document.getElementById('rosterCount');

    rosterList.innerHTML = '<div class="roster-empty">Sincronizando dossiês da Holonet...</div>';

    const { data, error } = await supabaseClient
        .from('personagens')
        .select('id, nome, creditos, facecred, peggats, fichas, grupo_faccao, img_url')
        .order('nome', { ascending: true });

    if (error) {
        console.error('[DEV_CORE] Erro ao carregar personagens:', error);
        rosterList.innerHTML = '<div class="roster-empty">ERRO: Falha ao sincronizar com o banco de dados.</div>';
        return;
    }

    allCharacters = data || [];
    rosterCount.textContent = allCharacters.length;
    renderRoster(allCharacters);
}

function renderRoster(list) {
    const rosterList = document.getElementById('rosterList');
    rosterList.innerHTML = '';

    if (!list.length) {
        rosterList.innerHTML = '<div class="roster-empty">Nenhum personagem corresponde à busca.</div>';
        return;
    }

    list.forEach(char => {
        const item = document.createElement('div');
        item.className = 'roster-item' + (selectedCharacter && selectedCharacter.id === char.id ? ' active' : '');
        item.dataset.id = char.id;

        const imgSrc = char.img_url && char.img_url.trim() !== '' ? char.img_url : AVATAR_FALLBACK;

        item.innerHTML = `
            <img src="${imgSrc}" alt="${escapeHTML(char.nome || 'Sem nome')}" onerror="this.src='${AVATAR_FALLBACK}'">
            <div class="roster-item-info">
                <span class="roster-item-name">${escapeHTML(char.nome || 'Identidade Desconhecida')}</span>
                <span class="roster-item-faction">${escapeHTML(char.grupo_faccao || 'Não Atribuído / Civil')}</span>
            </div>
        `;

        item.addEventListener('click', () => selecionarPersonagem(char.id));
        rosterList.appendChild(item);
    });
}

function filtrarPersonagens() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        renderRoster(allCharacters);
        return;
    }
    const filtered = allCharacters.filter(c => (c.nome || '').toLowerCase().includes(query));
    renderRoster(filtered);
}

/* ============================================================
   3. SELEÇÃO E RENDERIZAÇÃO DO EDITOR
   ============================================================ */
function selecionarPersonagem(id) {
    const char = allCharacters.find(c => c.id === id);
    if (!char) return;

    selectedCharacter = char;

    // Atualiza destaque visual na lista
    document.querySelectorAll('.roster-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === id);
    });

    document.getElementById('editorPlaceholder').classList.add('hidden');
    document.getElementById('editorContent').classList.remove('hidden');

    preencherEditor(char);
    limparFeedback();
}

function preencherEditor(char) {
    document.getElementById('charName').textContent = char.nome || 'Identidade Desconhecida';
    document.getElementById('charId').textContent = `ID: ${char.id}`;

    const imgSrc = char.img_url && char.img_url.trim() !== '' ? char.img_url : AVATAR_FALLBACK;
    document.getElementById('avatarPreview').src = imgSrc;
    document.getElementById('avatarPreview').onerror = function () { this.src = AVATAR_FALLBACK; };
    document.getElementById('imgUrlInput').value = char.img_url || '';

    document.getElementById('factionSelect').value = char.grupo_faccao || 'Não Atribuído / Civil';

    BALANCE_FIELDS.forEach(field => {
        const el = document.getElementById(`val-${field}`);
        if (el) el.textContent = (char[field] ?? 0).toLocaleString('pt-BR');
        const amtInput = document.getElementById(`amt-${field}`);
        if (amtInput) amtInput.value = '';
    });
}

/* ============================================================
   4. PRÉVIA DE AVATAR EM TEMPO REAL
   ============================================================ */
function initAvatarPreview() {
    const input = document.getElementById('imgUrlInput');
    input.addEventListener('input', () => {
        const val = input.value.trim();
        const preview = document.getElementById('avatarPreview');
        preview.src = val !== '' ? val : AVATAR_FALLBACK;
    });
}

/* ============================================================
   5. ATUALIZAÇÃO DE AVATAR (img_url)
   ============================================================ */
async function salvarAvatar() {
    if (!selectedCharacter) return;

    const novoUrl = document.getElementById('imgUrlInput').value.trim();
    const btn = document.getElementById('btnSaveAvatar');

    btn.disabled = true;
    btn.textContent = 'Sincronizando...';

    const { error } = await supabaseClient
        .from('personagens')
        .update({ img_url: novoUrl })
        .eq('id', selectedCharacter.id);

    btn.disabled = false;
    btn.textContent = 'Atualizar Imagem';

    if (error) {
        console.error('[DEV_CORE] Erro ao atualizar avatar:', error);
        mostrarFeedback('Falha ao atualizar a imagem do dossiê.', 'error');
        return;
    }

    selectedCharacter.img_url = novoUrl;
    const idx = allCharacters.findIndex(c => c.id === selectedCharacter.id);
    if (idx !== -1) allCharacters[idx].img_url = novoUrl;

    renderRoster(document.getElementById('searchInput').value.trim()
        ? allCharacters.filter(c => (c.nome || '').toLowerCase().includes(document.getElementById('searchInput').value.trim().toLowerCase()))
        : allCharacters);

    mostrarFeedback('Imagem do dossiê atualizada com sucesso.', 'success');
}

/* ============================================================
   6. ATUALIZAÇÃO DE FACÇÃO (grupo_faccao)
   ============================================================ */
async function salvarFaccao() {
    if (!selectedCharacter) return;

    const novaFaccao = document.getElementById('factionSelect').value;
    const valorAnterior = selectedCharacter.grupo_faccao || 'Não Atribuído / Civil';
    const btn = document.getElementById('btnSaveFaction');

    if (novaFaccao === valorAnterior) {
        mostrarFeedback('Nenhuma alteração de facção detectada.', 'info');
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Salvando...';

    const { error } = await supabaseClient
        .from('personagens')
        .update({ grupo_faccao: novaFaccao })
        .eq('id', selectedCharacter.id);

    btn.disabled = false;
    btn.textContent = 'Salvar';

    if (error) {
        console.error('[DEV_CORE] Erro ao atualizar facção:', error);
        mostrarFeedback('Falha ao atualizar a facção do personagem.', 'error');
        return;
    }

    // Auditoria
    await registrarLogBancario({
        personagem_id: selectedCharacter.id,
        tipo_evento: 'AJUSTE_ADMINISTRATIVO',
        descricao: `Facção de [${selectedCharacter.nome}] alterada por ${currentOperator.nome}. De "${valorAnterior}" para "${novaFaccao}".`,
        valor_creditos: 0,
        dados_adicionais: {
            operador_id: currentOperator.id,
            campo_alterado: 'grupo_faccao',
            delta: null,
            valor_anterior: valorAnterior,
            novo_valor: novaFaccao
        }
    });

    selectedCharacter.grupo_faccao = novaFaccao;
    const idx = allCharacters.findIndex(c => c.id === selectedCharacter.id);
    if (idx !== -1) allCharacters[idx].grupo_faccao = novaFaccao;

    filtrarPersonagens();
    mostrarFeedback('Facção atualizada e registrada na auditoria.', 'success');
}

/* ============================================================
   7. AJUSTE DE SALDOS (creditos, facecred, peggats, fichas)
   ============================================================ */
async function ajustarSaldo(field, operacao) {
    if (!selectedCharacter) return;

    const amountInput = document.getElementById(`amt-${field}`);
    const rawValue = parseInt(amountInput.value, 10);

    if (isNaN(rawValue) || rawValue <= 0) {
        mostrarFeedback('Informe um valor numérico válido e positivo para o ajuste.', 'error');
        return;
    }

    const valorAnterior = selectedCharacter[field] ?? 0;
    const delta = operacao === 'add' ? rawValue : -rawValue;
    let novoValor = valorAnterior + delta;

    if (novoValor < 0) novoValor = 0;

    // Trava os botões durante a transação
    const buttons = document.querySelectorAll(`[data-field="${field}"] button`);
    buttons.forEach(b => b.disabled = true);

    const { error } = await supabaseClient
        .from('personagens')
        .update({ [field]: novoValor })
        .eq('id', selectedCharacter.id);

    buttons.forEach(b => b.disabled = false);

    if (error) {
        console.error(`[DEV_CORE] Erro ao ajustar ${field}:`, error);
        mostrarFeedback(`Falha crítica ao ajustar ${BALANCE_LABELS[field]}.`, 'error');
        return;
    }

    // Auditoria
    const sinal = operacao === 'add' ? '+' : '-';
    await registrarLogBancario({
        personagem_id: selectedCharacter.id,
        tipo_evento: 'AJUSTE_ADMINISTRATIVO',
        descricao: `Saldo ${BALANCE_LABELS[field]} ajustado por ${currentOperator.nome}. Operação: ${sinal}${rawValue.toLocaleString('pt-BR')}`,
        valor_creditos: field === 'creditos' ? delta : 0,
        dados_adicionais: {
            operador_id: currentOperator.id,
            campo_alterado: field,
            delta: delta,
            valor_anterior: valorAnterior,
            novo_valor: novoValor
        }
    });

    // Atualiza estado local e tela
    selectedCharacter[field] = novoValor;
    const idx = allCharacters.findIndex(c => c.id === selectedCharacter.id);
    if (idx !== -1) allCharacters[idx][field] = novoValor;

    document.getElementById(`val-${field}`).textContent = novoValor.toLocaleString('pt-BR');
    amountInput.value = '';

    mostrarFeedback(`${BALANCE_LABELS[field]} ${sinal === '+' ? 'creditado' : 'debitado'} em ${rawValue.toLocaleString('pt-BR')}. Novo saldo: ${novoValor.toLocaleString('pt-BR')}.`, 'success');
}

/* ============================================================
   8. AUDITORIA — log_bancario
   ============================================================ */
async function registrarLogBancario({ personagem_id, tipo_evento, descricao, valor_creditos, dados_adicionais }) {
    try {
        const { error } = await supabaseClient.from('log_bancario').insert([{
            user_id: currentOperator.id,
            personagem_id: personagem_id,
            tipo_evento: tipo_evento,
            descricao: descricao,
            valor_creditos: valor_creditos || 0,
            dados_adicionais: dados_adicionais || {}
        }]);

        if (error) {
            console.error('[DEV_CORE] Falha ao gravar log de auditoria:', error);
        }
    } catch (err) {
        console.error('[DEV_CORE] Exceção ao gravar log de auditoria:', err);
    }
}

/* ============================================================
   9. FEEDBACK VISUAL
   ============================================================ */
let feedbackTimeout = null;
function mostrarFeedback(mensagem, tipo = 'info') {
    const bar = document.getElementById('feedbackBar');
    if (!bar) return;

    bar.textContent = mensagem;
    bar.className = `feedback-bar ${tipo}`;

    clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
        bar.textContent = '';
        bar.className = 'feedback-bar';
    }, 5000);
}

function limparFeedback() {
    const bar = document.getElementById('feedbackBar');
    if (bar) {
        bar.textContent = '';
        bar.className = 'feedback-bar';
    }
}

/* ============================================================
   10. UTILITÁRIOS
   ============================================================ */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

function iniciarRelogio() {
    const el = document.getElementById('footerClock');
    if (!el) return;
    const tick = () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        el.textContent = `${h}:${m}:${s}`;
    };
    tick();
    setInterval(tick, 1000);
}

/* ============================================================
   11. BINDINGS DE EVENTOS
   ============================================================ */
function initEventBindings() {
    document.getElementById('searchInput').addEventListener('input', filtrarPersonagens);
    document.getElementById('btnSaveAvatar').addEventListener('click', salvarAvatar);
    document.getElementById('btnSaveFaction').addEventListener('click', salvarFaccao);

    document.querySelectorAll('.balance-controls button[data-op]').forEach(btn => {
        btn.addEventListener('click', () => {
            const field = btn.dataset.field;
            const op = btn.dataset.op;
            ajustarSaldo(field, op);
        });
    });

    initAvatarPreview();
}

/* ============================================================
   12. INICIALIZAÇÃO GERAL
   ============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
    const autorizado = await verificarAcessoDev();
    if (!autorizado) return;

    initEventBindings();
    iniciarRelogio();
    await carregarPersonagens();
});