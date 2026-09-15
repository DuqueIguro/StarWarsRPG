let playerKey = "";
let playerBalance = 0;      // Créditos Imperiais (CI)
let playerFacecred = 0;     // FaceCred (FC)
let playerPeggats = 0;      // Peggats (PG)
let playerName = "";
let playerId = "";
let playerUserId = "";

const DEFAULT_AVATAR = "../img/p2w.png";
const MASTER_ID = "e5fc379a-fc6c-42bb-a3d4-b6984f1693b9";

document.addEventListener("DOMContentLoaded", async () => {
    await initPlayerData();
    updateTime();
    setInterval(updateTime, 1000);
});

// Gera um ID Galáctico no padrão IMP-XXXX-XXXX
function generateGalacticKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({length: 4}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `IMP-${segment()}-${segment()}`;
}

/* INICIO DE FUNÇÃO DE initPlayerData; Integração com Supabase */
async function initPlayerData() {
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !userData.user) {
        alert("Acesso negado. Por favor, autentique-se no terminal.");
        window.location.href = '../index.html';
        return;
    }

    playerUserId = userData.user.id;

    const { data: pData } = await supabaseClient.from('personagens')
        .select('id, nome, creditos, facecred, peggats, chave_transferencia, img_url')
        .eq('user_id', userData.user.id).limit(1);

    if (pData && pData.length > 0) {
        const char = pData[0];
        playerId = char.id;
        playerName = char.nome;
        playerBalance = char.creditos || 0;
        playerFacecred = char.facecred || 0;
        playerPeggats = char.peggats || 0;
        playerKey = char.chave_transferencia;

        // Se o personagem ainda não tem chave, gera uma e salva no banco
        if (!playerKey) {
            playerKey = generateGalacticKey();
            await supabaseClient.from('personagens').update({ chave_transferencia: playerKey }).eq('id', playerId);
        }

        document.getElementById("my-key").innerText = playerKey;
        document.getElementById("my-key").classList.remove('animate-pulse');
        document.getElementById("sender-name").value = playerName;

        // Imagem do personagem com fallback
        const avatarImg = document.getElementById("avatar-img");
        avatarImg.src = char.img_url || DEFAULT_AVATAR;
        avatarImg.onerror = () => { avatarImg.onerror = null; avatarImg.src = DEFAULT_AVATAR; };

        renderBalances();
        setupExchangeUI();

        await carregarHistoricoTransacoes();
        await carregarDividas();
    }
}

/* Atualiza os 3 saldos exibidos em tela (CI, FC, PG). FG nunca é exibido aqui. */
function renderBalances() {
    document.getElementById("user-balance").innerText = playerBalance.toLocaleString();
    document.getElementById("user-facecred").innerText = playerFacecred.toLocaleString();
    document.getElementById("user-peggats").innerText = playerPeggats.toLocaleString();
}

/* INICIO DE FUNÇÃO DE gerarNovaChaveBackend; Invalida a anterior no DB */
async function gerarNovaChaveBackend() {
    if (!confirm("Gerar uma nova chave invalidará a sua atual. Tem certeza?")) return;

    const novaChave = generateGalacticKey();

    const { error } = await supabaseClient.from('personagens').update({ chave_transferencia: novaChave }).eq('id', playerId);

    if (!error) {
        playerKey = novaChave;
        document.getElementById("my-key").innerText = playerKey;
        alert("SISTEMA: Nova chave de transferência gerada e atrelada ao seu Dossiê.");
    } else {
        alert("ERRO DO SISTEMA: Falha ao registrar nova chave no banco de dados.");
    }
}

const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(playerKey).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "COPIADO!";
        copyBtn.style.background = "var(--primary)";
        copyBtn.style.color = "#000";

        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.background = "transparent";
            copyBtn.style.color = "var(--primary)";
        }, 2000);
    });
});

const generateBtn = document.getElementById("generate-key-btn");
if(generateBtn) {
    generateBtn.addEventListener("click", async () => {
        await gerarNovaChaveBackend();
    });
}

// Lógica Principal de Transferência (preservada)
const transferForm = document.getElementById("transfer-form");
transferForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const targetKey = document.getElementById("target-key").value.trim().toUpperCase();
    const amount = parseInt(document.getElementById("transfer-amount").value);
    const message = document.getElementById("transfer-msg").value.trim();
    const sendBtn = document.getElementById("send-btn");

    if (targetKey === playerKey) {
        alert("ERRO DO SISTEMA: Não é possível transferir para a sua própria chave galáctica.");
        return;
    }

    if (amount > playerBalance) {
        alert("CRÉDITOS INSUFICIENTES: Operação recusada pelo Banco Central Galáctico.");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.innerText = "PROCESSANDO...";

    // 1. Validar Chave do Destinatário
    const { data: targetData, error: targetError } = await supabaseClient
        .from('personagens')
        .select('id, nome, creditos')
        .eq('chave_transferencia', targetKey)
        .single();

    if (targetError || !targetData) {
        alert("ERRO DO SISTEMA: Chave de destinatário inválida ou não encontrada na Holonet.");
        sendBtn.disabled = false;
        sendBtn.innerText = "TRANSMITIR CRÉDITOS";
        return;
    }

    // 2. Executar a Transferência no Banco de Dados
    const novoSaldoRemetente = playerBalance - amount;
    const novoSaldoDestinatario = targetData.creditos + amount;

    await supabaseClient.from('personagens').update({ creditos: novoSaldoRemetente }).eq('id', playerId);
    await supabaseClient.from('personagens').update({ creditos: novoSaldoDestinatario }).eq('id', targetData.id);

    // 3. Registrar o Log na tabela de Transações (JSON no campo detalhes para leitura fácil)
    const detalhesLog = JSON.stringify({
        remetente_nome: playerName,
        destinatario_nome: targetData.nome,
        mensagem: message
    });

    await supabaseClient.from('transacoes_log').insert({
        tipo_transacao: 'CREDITOS',
        remetente_id: playerId,
        destinatario_id: targetData.id,
        valor_ou_quantidade: amount,
        detalhes: detalhesLog
    });

    // 4. Registrar Logs de Auditoria para o Painel do Mestre
    await supabaseClient.from('logs_auditoria').insert([
        { personagem_id: playerId, tipo_evento: 'TRANSFERENCIA', descricao: `Enviou ${amount} CR para ${targetData.nome}. Msg: ${message || 'Nenhuma'}`, mudanca_creditos: -amount },
        { personagem_id: targetData.id, tipo_evento: 'RECEBIMENTO', descricao: `Recebeu ${amount} CR de ${playerName}. Msg: ${message || 'Nenhuma'}`, mudanca_creditos: amount }
    ]);

    // Atualiza a tela local
    playerBalance = novoSaldoRemetente;
    renderBalances();

    document.getElementById("target-key").value = "";
    document.getElementById("transfer-amount").value = "";
    document.getElementById("transfer-msg").value = "";

    await carregarHistoricoTransacoes();

    sendBtn.disabled = false;
    sendBtn.innerText = "TRANSMITIR CRÉDITOS";
    alert(`TRANSMISSÃO CONCLUÍDA: ${amount} créditos enviados para ${targetData.nome}!`);
});

/* INICIO DE FUNÇÃO DE carregarHistoricoTransacoes (preservada) */
async function carregarHistoricoTransacoes() {
    const historyList = document.getElementById("history-list");

    const { data: logs, error } = await supabaseClient.from('transacoes_log')
        .select('*')
        .eq('tipo_transacao', 'CREDITOS')
        .or(`remetente_id.eq.${playerId},destinatario_id.eq.${playerId}`)
        .order('data_transacao', { ascending: false })
        .limit(20);

    if (error || !logs || logs.length === 0) {
        historyList.innerHTML = '<div class="empty-history text-stone-500">NENHUMA TRANSMISSÃO REGISTRADA.</div>';
        return;
    }

    historyList.innerHTML = '';

    logs.forEach(log => {
        let detailsObj = {};
        try { detailsObj = JSON.parse(log.detalhes); } catch(e) {}

        const isSent = log.remetente_id === playerId;
        const time = new Date(log.data_transacao).toLocaleTimeString('pt-BR', { hour12: false });
        const date = new Date(log.data_transacao).toLocaleDateString('pt-BR');

        // Configuração Visual Baseado se enviou ou recebeu
        const labelText = isSent ? `PARA: ${escapeHTML(detailsObj.destinatario_nome || 'Desconhecido')}` : `DE: ${escapeHTML(detailsObj.remetente_nome || 'Desconhecido')}`;
        const amountColor = isSent ? 'color: var(--danger);' : 'color: var(--primary);';
        const amountPrefix = isSent ? '-' : '+';
        const cardClass = isSent ? 'history-item sent' : 'history-item';

        const txElement = document.createElement("div");
        txElement.className = cardClass;
        txElement.style.cursor = "pointer";
        txElement.style.flexDirection = "column";

        txElement.innerHTML = `
        <div class="tx-summary" style="display: flex; justify-content: space-between; width: 100%;">
            <div>
                <strong>${labelText}</strong><br>
                <small style="color: var(--text-dim); font-size: 0.65rem;">${date} às ${time} (CLIQUE PARA DETALHES)</small>
            </div>
            <div class="tx-amount" style="${amountColor} font-family: var(--font-title); font-size: 1.1rem; font-weight: bold;">
                ${amountPrefix}${log.valor_ou_quantidade} CR
            </div>
        </div>
        <div class="tx-details" style="display: none; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border-color); width: 100%;">
            <div class="tx-msg" style="margin-top: 5px;">"${detailsObj.mensagem ? escapeHTML(detailsObj.mensagem) : 'Nenhuma mensagem anexada.'}"</div>
        </div>
        `;

        txElement.addEventListener("click", function() {
            const details = this.querySelector('.tx-details');
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        });

        historyList.appendChild(txElement);
    });
}
/* FIM DE FUNÇÃO DE carregarHistoricoTransacoes */

/* =========================================================
   SISTEMA DE CÂMBIO GALÁCTICO
   Regras fixas:
   CI -> FC : 100.000 CI = 1 FC
   CI -> PG : 40.000 CI  = 1 PG
   FC -> CI : 1 FC = 100.000 CI
   FC -> PG : 1 FC = 200.000 PG
   PG -> FC : 200.000 PG = 1 FC
   PG -> CI : BLOQUEADO (requer PG -> FC -> CI)
   FG nunca aparece nesta tela.
   ========================================================= */

const CURRENCY_LABELS = { CI: 'CI — Créditos Imperiais', FC: 'FC — FaceCred', PG: 'PG — Peggats' };
const CURRENCY_COLUMN = { CI: 'creditos', FC: 'facecred', PG: 'peggats' };

// Pares de destino válidos para cada origem (PG->CI listado apenas para exibir o aviso de bloqueio)
const EXCHANGE_TARGETS = {
    CI: ['FC', 'PG'],
    FC: ['CI', 'PG'],
    PG: ['FC', 'CI']
};

function getPlayerSaldo(moeda) {
    if (moeda === 'CI') return playerBalance;
    if (moeda === 'FC') return playerFacecred;
    if (moeda === 'PG') return playerPeggats;
    return 0;
}

/* Calcula quanto da moeda de ORIGEM é necessário debitar para entregar exatamente
   "desejado" unidades da moeda de DESTINO. Trabalhar a partir do valor desejado
   (e não do valor a converter) garante que o débito seja sempre um número exato,
   nunca uma fração arredondada. Retorna null se a rota for bloqueada. */
function calcularOrigemNecessaria(de, para, desejado) {
    const chave = `${de}_${para}`;
    switch (chave) {
        case 'CI_FC': return desejado * 100000;   // 100.000 CI = 1 FC
        case 'CI_PG': return desejado * 40000;    // 40.000 CI = 1 PG
        case 'FC_CI': return desejado / 100000;   // 1 FC = 100.000 CI
        case 'FC_PG': return desejado / 200000;   // 1 FC = 200.000 PG
        case 'PG_FC': return desejado * 200000;   // 200.000 PG = 1 FC
        case 'PG_CI': return null;                // rota bloqueada
        default: return null;
    }
}

// Quantas unidades da moeda de destino equivalem a 1 unidade "indivisível" na rota,
// usado apenas para mensagens de erro quando o valor desejado não é exato.
function getMultiploExigido(de, para) {
    const chave = `${de}_${para}`;
    if (chave === 'FC_CI') return 100000;
    if (chave === 'FC_PG') return 200000;
    return 1;
}

const EPSILON = 1e-6;
function isValorInteiro(n) {
    return Math.abs(n - Math.round(n)) < EPSILON;
}

function setupExchangeUI() {
    const fromSelect = document.getElementById("exchange-from");
    const toSelect = document.getElementById("exchange-to");
    const amountInput = document.getElementById("exchange-amount");

    function populateToOptions() {
        const de = fromSelect.value;
        toSelect.innerHTML = '';
        EXCHANGE_TARGETS[de].forEach(moeda => {
            const opt = document.createElement('option');
            opt.value = moeda;
            opt.innerText = CURRENCY_LABELS[moeda];
            toSelect.appendChild(opt);
        });
        atualizarPreviewCambio();
    }

    function atualizarPreviewCambio() {
        const de = fromSelect.value;
        const para = toSelect.value;
        const desejado = parseFloat(amountInput.value);
        const preview = document.getElementById("exchange-preview");
        const warning = document.getElementById("exchange-warning");
        const exchangeBtn = document.getElementById("exchange-btn");

        warning.style.display = 'none';
        exchangeBtn.disabled = false;

        if (de === 'PG' && para === 'CI') {
            warning.innerText = "ROTA BLOQUEADA: Conversão direta PG → CI não é permitida pela Guilda Financeira. Realize PG → FC e, em seguida, FC → CI (haverá perda cambial nas duas etapas).";
            warning.style.display = 'block';
            preview.innerText = "Conversão indisponível nesta rota.";
            preview.classList.remove('ready');
            exchangeBtn.disabled = true;
            return;
        }

        if (!desejado || desejado <= 0) {
            preview.innerText = "Informe quanto deseja RECEBER na moeda de destino para simular a conversão.";
            preview.classList.remove('ready');
            return;
        }

        const origemNecessaria = calcularOrigemNecessaria(de, para, desejado);

        if (!isValorInteiro(origemNecessaria)) {
            const multiplo = getMultiploExigido(de, para);
            preview.innerText = `VALOR NÃO EXATO: para receber ${para} sem perdas nesta rota, o valor desejado precisa ser múltiplo de ${multiplo.toLocaleString()} ${para}.`;
            preview.classList.remove('ready');
            exchangeBtn.disabled = true;
            return;
        }

        const origemArredondada = Math.round(origemNecessaria);
        const saldoDisponivel = getPlayerSaldo(de);

        if (origemArredondada > saldoDisponivel) {
            preview.innerText = `Para receber ${desejado.toLocaleString()} ${para} seria necessário debitar ${origemArredondada.toLocaleString()} ${de} — SALDO INSUFICIENTE (disponível: ${saldoDisponivel.toLocaleString()} ${de}).`;
            preview.classList.remove('ready');
            exchangeBtn.disabled = true;
            return;
        }

        preview.innerText = `Será debitado ${origemArredondada.toLocaleString()} ${de} ➜ Você receberá ${desejado.toLocaleString()} ${para}`;
        preview.classList.add('ready');
    }

    fromSelect.addEventListener('change', populateToOptions);
    toSelect.addEventListener('change', atualizarPreviewCambio);
    amountInput.addEventListener('input', atualizarPreviewCambio);

    populateToOptions();

    const exchangeForm = document.getElementById("exchange-form");
    exchangeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await executarCambio();
    });
}

/* INICIO DE FUNÇÃO DE executarCambio; Valida saldo, atualiza colunas e registra log_bancario */
async function executarCambio() {
    const de = document.getElementById("exchange-from").value;
    const para = document.getElementById("exchange-to").value;
    const desejado = parseFloat(document.getElementById("exchange-amount").value);
    const exchangeBtn = document.getElementById("exchange-btn");

    if (de === para) {
        alert("ERRO DO SISTEMA: Selecione moedas diferentes para o câmbio.");
        return;
    }

    if (de === 'PG' && para === 'CI') {
        alert("ROTA BLOQUEADA: Conversão direta PG → CI não é permitida.");
        return;
    }

    if (!desejado || desejado <= 0) {
        alert("ERRO DO SISTEMA: Informe quanto deseja receber na moeda de destino.");
        return;
    }

    const origemNecessaria = calcularOrigemNecessaria(de, para, desejado);

    if (!isValorInteiro(origemNecessaria)) {
        const multiplo = getMultiploExigido(de, para);
        alert(`ERRO DO SISTEMA: Para receber ${para} sem perdas nesta rota, o valor desejado precisa ser múltiplo de ${multiplo.toLocaleString()}.`);
        return;
    }

    const valorDebitado = Math.round(origemNecessaria);
    const saldoAtual = getPlayerSaldo(de);

    if (valorDebitado > saldoAtual) {
        alert(`SALDO INSUFICIENTE: Seriam necessários ${valorDebitado.toLocaleString()} ${de}, mas você possui apenas ${saldoAtual.toLocaleString()} ${de}.`);
        return;
    }

    exchangeBtn.disabled = true;
    exchangeBtn.innerText = "PROCESSANDO...";

    const colunaOrigem = CURRENCY_COLUMN[de];
    const colunaDestino = CURRENCY_COLUMN[para];

    const novoSaldoOrigem = saldoAtual - valorDebitado;
    const novoSaldoDestino = getPlayerSaldo(para) + desejado;

    const { error } = await supabaseClient.from('personagens').update({
        [colunaOrigem]: novoSaldoOrigem,
        [colunaDestino]: novoSaldoDestino
    }).eq('id', playerId);

    if (error) {
        alert("ERRO DO SISTEMA: Falha ao processar o câmbio no Banco Central.");
        exchangeBtn.disabled = false;
        exchangeBtn.innerText = "CONFIRMAR CÂMBIO";
        return;
    }

    await supabaseClient.from('log_bancario').insert({
        user_id: playerUserId,
        personagem_id: playerId,
        tipo_evento: `CAMBIO_${de}_${para}`,
        descricao: `Converteu ${valorDebitado.toLocaleString()} ${de} para receber exatamente ${desejado.toLocaleString()} ${para}.`,
        valor_creditos: valorDebitado,
        dados_adicionais: JSON.stringify({ de, para, valor_debitado: valorDebitado, valor_recebido: desejado })
    });

    // Atualiza estado local
    if (de === 'CI') playerBalance = novoSaldoOrigem; else if (de === 'FC') playerFacecred = novoSaldoOrigem; else playerPeggats = novoSaldoOrigem;
    if (para === 'CI') playerBalance = novoSaldoDestino; else if (para === 'FC') playerFacecred = novoSaldoDestino; else playerPeggats = novoSaldoDestino;

    renderBalances();
    document.getElementById("exchange-amount").value = "";
    document.getElementById("exchange-preview").innerText = "SELECIONE OS VALORES PARA SIMULAR A CONVERSÃO.";
    document.getElementById("exchange-preview").classList.remove('ready');

    exchangeBtn.disabled = false;
    exchangeBtn.innerText = "CONFIRMAR CÂMBIO";
    alert(`CÂMBIO CONCLUÍDO: ${valorDebitado.toLocaleString()} ${de} debitados, ${desejado.toLocaleString()} ${para} creditados.`);
}
/* FIM DE FUNÇÃO DE executarCambio */

/* =========================================================
   SISTEMA DE DÍVIDAS, TAXAS E EMPRÉSTIMOS
   ========================================================= */

/* INICIO DE FUNÇÃO DE carregarDividas */
async function carregarDividas() {
    const debtsList = document.getElementById("debts-list");

    const { data: dividas, error } = await supabaseClient.from('dividas_emprestimos')
        .select('*')
        .eq('personagem_id', playerId)
        .eq('status', 'PENDENTE')
        .order('created_at', { ascending: false });

    if (error || !dividas || dividas.length === 0) {
        debtsList.innerHTML = '<div class="empty-history text-stone-500">NENHUMA DÍVIDA OU TAXA PENDENTE.</div>';
        return;
    }

    debtsList.innerHTML = '';

    dividas.forEach(divida => {
        const item = document.createElement("div");
        item.className = "debt-item";

        const categoriaLabel = divida.categoria === 'EMPRESTIMO' ? 'EMPRÉSTIMO' : 'TAXA / IMPOSTO';

        item.innerHTML = `
        <div class="debt-info">
            <span class="debt-title">${escapeHTML(divida.titulo || categoriaLabel)}</span>
            <span class="debt-meta">${categoriaLabel}${divida.alvo_descricao ? ' • ' + escapeHTML(divida.alvo_descricao) : ''}</span>
        </div>
        <div class="debt-value">${Number(divida.valor_total).toLocaleString()} CI</div>
        <button class="btn-danger-small" data-id="${divida.id}" data-valor="${divida.valor_total}">QUITAR DÍVIDA</button>
        `;

        item.querySelector('button').addEventListener('click', async (e) => {
            const btn = e.currentTarget;
            await quitarDivida(btn.dataset.id, parseFloat(btn.dataset.valor), btn);
        });

        debtsList.appendChild(item);
    });
}
/* FIM DE FUNÇÃO DE carregarDividas */

/* INICIO DE FUNÇÃO DE quitarDivida; Transfere créditos para o Mestre e atualiza status */
async function quitarDivida(dividaId, valorTotal, btn) {
    if (!confirm(`Confirmar quitação de ${valorTotal.toLocaleString()} CI?`)) return;

    if (playerBalance < valorTotal) {
        alert("CRÉDITOS INSUFICIENTES: Saldo atual não cobre o valor total da dívida.");
        return;
    }

    if (btn) { btn.disabled = true; btn.innerText = "PROCESSANDO..."; }

    // Localiza a conta do Mestre (por id ou por user_id)
    const { data: mestreData, error: mestreError } = await supabaseClient.from('personagens')
        .select('id, creditos')
        .or(`id.eq.${MASTER_ID},user_id.eq.${MASTER_ID}`)
        .limit(1)
        .single();

    if (mestreError || !mestreData) {
        alert("ERRO DO SISTEMA: Conta do Mestre não localizada. Contate a administração.");
        if (btn) { btn.disabled = false; btn.innerText = "QUITAR DÍVIDA"; }
        return;
    }

    const novoSaldoJogador = playerBalance - valorTotal;
    const novoSaldoMestre = (mestreData.creditos || 0) + valorTotal;

    await supabaseClient.from('personagens').update({ creditos: novoSaldoJogador }).eq('id', playerId);
    await supabaseClient.from('personagens').update({ creditos: novoSaldoMestre }).eq('id', mestreData.id);

    // Apaga a dívida quitada do banco de dados (não apenas atualiza o status)
    const { error: deleteError } = await supabaseClient.from('dividas_emprestimos').delete().eq('id', dividaId);

    if (deleteError) {
        alert("ERRO DO SISTEMA: Créditos transferidos, mas houve falha ao remover o registro da dívida.");
    }

    // Log da página (log_bancario)
    await supabaseClient.from('log_bancario').insert([
        { user_id: playerUserId, personagem_id: playerId, tipo_evento: 'QUITACAO_DIVIDA', descricao: `Quitou dívida/taxa de ${valorTotal.toLocaleString()} CI.`, valor_creditos: -valorTotal, dados_adicionais: JSON.stringify({ divida_id: dividaId }) },
        { user_id: playerUserId, personagem_id: mestreData.id, tipo_evento: 'RECEBIMENTO_QUITACAO', descricao: `Recebeu quitação de ${valorTotal.toLocaleString()} CI de ${playerName}.`, valor_creditos: valorTotal, dados_adicionais: JSON.stringify({ divida_id: dividaId, origem: playerId }) }
    ]);

    // Log de auditoria do Mestre (mesmo padrão usado na transferência entre jogadores)
    await supabaseClient.from('logs_auditoria').insert([
        { personagem_id: playerId, tipo_evento: 'QUITACAO_DIVIDA', descricao: `Quitou dívida/taxa de ${valorTotal.toLocaleString()} CI.`, mudanca_creditos: -valorTotal },
        { personagem_id: mestreData.id, tipo_evento: 'RECEBIMENTO_QUITACAO', descricao: `Recebeu quitação de ${valorTotal.toLocaleString()} CI de ${playerName}.`, mudanca_creditos: valorTotal }
    ]);

    playerBalance = novoSaldoJogador;
    renderBalances();

    await carregarDividas();
    alert("DÍVIDA QUITADA E REMOVIDA COM SUCESSO. Registro atualizado junto à Guilda Financeira.");
}
/* FIM DE FUNÇÃO DE quitarDivida */

// Formulário de Solicitação de Empréstimo
const loanForm = document.getElementById("loan-form");
if (loanForm) {
    loanForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await solicitarEmprestimo();
    });
}

/* INICIO DE FUNÇÃO DE solicitarEmprestimo */
async function solicitarEmprestimo() {
    const amountInput = document.getElementById("loan-amount");
    const reasonInput = document.getElementById("loan-reason");
    const loanBtn = document.getElementById("loan-btn");

    const valor = parseFloat(amountInput.value);
    const justificativa = reasonInput.value.trim();

    if (!valor || valor <= 0) {
        alert("ERRO DO SISTEMA: Informe um valor de empréstimo válido.");
        return;
    }

    if (!justificativa) {
        alert("ERRO DO SISTEMA: A justificativa/garantia é obrigatória para análise da Guilda.");
        return;
    }

    loanBtn.disabled = true;
    loanBtn.innerText = "ENVIANDO...";

    const { error } = await supabaseClient.from('dividas_emprestimos').insert({
        categoria: 'EMPRESTIMO',
        titulo: `Solicitação de Empréstimo — ${playerName}`,
        alvo_descricao: playerName,
        personagem_id: playerId,
        valor_original: valor,
        taxa_juros: 0,
        valor_total: valor,
        frequencia: 'UNICA',
        ciclos_totais: 1,
        ciclos_pagos: 0,
        status: 'SOLICITADO',
        observacoes: justificativa
    });

    if (error) {
        alert("ERRO DO SISTEMA: Falha ao registrar a solicitação de empréstimo.");
        console.error(error);
        loanBtn.disabled = false;
        loanBtn.innerText = "ENVIAR SOLICITAÇÃO";
        return;
    }

    await supabaseClient.from('log_bancario').insert({
        user_id: playerUserId,
        personagem_id: playerId,
        tipo_evento: 'SOLICITACAO_EMPRESTIMO',
        descricao: `Solicitou empréstimo de ${valor.toLocaleString()} CI. Justificativa: ${justificativa}`,
        valor_creditos: valor,
        dados_adicionais: JSON.stringify({ justificativa })
    });

    amountInput.value = "";
    reasonInput.value = "";
    loanBtn.disabled = false;
    loanBtn.innerText = "ENVIAR SOLICITAÇÃO";
    alert("SOLICITAÇÃO ENVIADA: Seu pedido de empréstimo foi encaminhado ao Mestre para análise.");
}
/* FIM DE FUNÇÃO DE solicitarEmprestimo */

function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function updateTime() {
    const now = new Date();
    document.getElementById("system-time").innerText = `STARDATE ${now.getFullYear()}.${now.getMonth() + 1}${now.getDate()} // ${now.toTimeString().split(' ')[0]}`;
}