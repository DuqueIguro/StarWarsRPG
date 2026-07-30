let playerKey = "";
let playerBalance = 0;
let playerName = "";
let playerId = "";

document.addEventListener("DOMContentLoaded", async () => {
    await initPlayerData();
    updateTime();
    setInterval(updateTime, 1000);
});

// Gera um ID Galáctico no padrão GAL-XXXX-XXXX
function generateGalacticKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({length: 4}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `GAL-${segment()}-${segment()}`;
}

/* INICIO DE FUNÇÃO DE initPlayerData; Integração com Supabase */
async function initPlayerData() {
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !userData.user) {
        alert("Acesso negado. Por favor, autentique-se no terminal.");
        window.location.href = '../index.html';
        return;
    }

    const { data: pData } = await supabaseClient.from('personagens').select('id, nome, creditos, chave_transferencia').eq('user_id', userData.user.id).limit(1);

    if (pData && pData.length > 0) {
        const char = pData[0];
        playerId = char.id;
        playerName = char.nome;
        playerBalance = char.creditos || 0;
        playerKey = char.chave_transferencia;

        // Se o personagem ainda não tem chave, gera uma e salva no banco
        if (!playerKey) {
            playerKey = generateGalacticKey();
            await supabaseClient.from('personagens').update({ chave_transferencia: playerKey }).eq('id', playerId);
        }

        document.getElementById("my-key").innerText = playerKey;
        document.getElementById("my-key").classList.remove('animate-pulse');
        document.getElementById("user-balance").innerText = playerBalance.toLocaleString();
        document.getElementById("sender-name").value = playerName;

        await carregarHistoricoTransacoes();
    }
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

// Lógica Principal de Transferência
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
    document.getElementById("user-balance").innerText = playerBalance.toLocaleString();
    
    document.getElementById("target-key").value = "";
    document.getElementById("transfer-amount").value = "";
    document.getElementById("transfer-msg").value = "";

    await carregarHistoricoTransacoes();

    sendBtn.disabled = false;
    sendBtn.innerText = "TRANSMITIR CRÉDITOS";
    alert(`TRANSMISSÃO CONCLUÍDA: ${amount} créditos enviados para ${targetData.nome}!`);
});

/* INICIO DE FUNÇÃO DE carregarHistoricoTransacoes */
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

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function updateTime() {
    const now = new Date();
    document.getElementById("system-time").innerText = `STARDATE ${now.getFullYear()}.${now.getMonth() + 1}${now.getDate()} // ${now.toTimeString().split(' ')[0]}`;
}