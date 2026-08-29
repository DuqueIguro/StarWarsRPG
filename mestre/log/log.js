// --- ISB AUDITORIA IMPERIAL - LOG.JS ---

function getSupabaseClient() {
    return typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient;
}

// 1. Carregar Personagens no Filtro e no Painel
async function carregarPersonagens() {
    const client = getSupabaseClient();
    if (!client) return;

    const rosterPanel = document.getElementById('roster-panel');
    const selectChar = document.getElementById('filter-char');

    const { data, error } = await client
        .from('personagens')
        .select('id, nome, creditos, fichas')
        .order('nome');

    if (!error && data) {
        if (rosterPanel) rosterPanel.innerHTML = '';
        if (selectChar) {
            const existingOptions = [...selectChar.options].map(opt => opt.value);
            data.forEach(p => {
                if (existingOptions.includes(p.id)) return;
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = p.nome;
                selectChar.appendChild(opt);
            });
        }

        if (rosterPanel) {
            data.forEach(p => {
                const card = document.createElement('a');
                if (p.id !== '6eef10e3-b1c0-475a-b2f6-811bc065706c' && p.id !== '2924a75f-6638-49c8-bb65-10e8ab55f134') {
                    card.href = `../pages/ficha.html?id=${p.id}`;
                }
                card.target = '_blank';
                card.className = 'bg-stone-900/40 border border-cyan-900/30 hover:border-cyan-500 hover:bg-stone-900 p-3 rounded flex flex-col justify-between transition-all cursor-pointer group shadow-sm';
                card.innerHTML = `
                    <span class="text-xs font-bold text-stone-300 group-hover:text-cyan-300 transition-colors uppercase tracking-wider">${p.nome}</span>
                    <div class="mt-2 pt-2 border-t border-stone-800 flex justify-between items-center text-[10px]">
                        <span class="text-green-400 font-bold">${p.creditos || 0} 💳</span>
                        <span class="text-yellow-400 font-bold">${p.fichas || 0} 🪙</span>
                    </div>
                `;
                rosterPanel.appendChild(card);
            });
        }
    } else {
        if (rosterPanel) rosterPanel.innerHTML = '<div class="text-red-500 text-xs">Erro ao carregar dossiês.</div>';
    }
}

// 2. Transações Financeiras (Créditos)
async function carregarLogs() {
    const client = getSupabaseClient();
    const tbody = document.getElementById('logs-body');
    if (!client || !tbody) return;

    const inputBusca = document.getElementById('filter-text');
    const selectChar = document.getElementById('filter-char');
    const selectAcao = document.getElementById('filter-action');
    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');

    tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-stone-500">Executando varredura na rede ISB com os parâmetros fornecidos...</td></tr>';

    let query = client
        .from('logs_auditoria')
        .select('*, personagens(nome)')
        .not('tipo_evento', 'ilike', 'MCMT_%')
        .order('created_at', { ascending: false })
        .limit(300);

    const txt = inputBusca ? inputBusca.value.trim() : '';
    if (txt) query = query.ilike('descricao', `%${txt}%`);
    if (selectChar && selectChar.value) query = query.eq('personagem_id', selectChar.value);
    if (selectAcao && selectAcao.value) query = query.ilike('tipo_evento', `%${selectAcao.value}%`);
    if (dateStart && dateStart.value) query = query.gte('created_at', `${dateStart.value}T00:00:00-03:00`);
    if (dateEnd && dateEnd.value) query = query.lte('created_at', `${dateEnd.value}T23:59:59-03:00`);

    const { data: logs, error } = await query;

    if (error) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-red-500 font-bold">Falha de decriptação: ${error.message}</td></tr>`;
        return;
    }

    if (!logs || logs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-stone-500">Nenhum registro financeiro encontrado.</td></tr>';
        return;
    }

    tbody.innerHTML = '';

    logs.forEach(log => {
        const dataObj = new Date(log.created_at);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR') + ' às ' + dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const nomePersonagem = log.personagens ? log.personagens.nome : 'Registro Fantasma';

        let deltaColor = 'text-stone-500';
        let deltaText = '0';
        if (log.mudanca_creditos > 0) {
            deltaColor = 'text-green-400';
            deltaText = '+' + log.mudanca_creditos;
        } else if (log.mudanca_creditos < 0) {
            deltaColor = 'text-red-400';
            deltaText = log.mudanca_creditos;
        }

        let eventoColor = 'text-cyan-400';
        if (log.tipo_evento.includes('DESCARTE')) eventoColor = 'text-orange-400';
        if (log.tipo_evento.includes('MANUAL')) eventoColor = 'text-purple-400';
        if (log.tipo_evento.includes('AJUSTE')) eventoColor = 'text-yellow-400';
        if (log.tipo_evento.includes('LEILAO') || log.tipo_evento.includes('REAIS')) eventoColor = 'text-pink-400';

        const tr = document.createElement('tr');
        tr.className = 'log-row transition-colors';

        const btnInspecionar = `
            <a href="../pages/ficha.html?id=${log.personagem_id}" target="_blank" class="text-red-400 hover:text-white underline decoration-red-900/50 hover:decoration-red-400 transition ml-2 text-[10px] tracking-wider uppercase" title="Inspecionar Dossiê Completo">
                [INSPECIONAR]
            </a>
        `;

        const btnDeletarFinanceiro = `
            <button onclick="deletarLog('${log.id}', 'logs_auditoria')" class="text-red-900 hover:text-red-400 transition-colors ml-4 cursor-pointer" title="Apagar Registro">
                <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;

        tr.innerHTML = `
            <td class="p-4 text-stone-400 text-xs">${dataFormatada}</td>
            <td class="p-4 font-bold text-stone-300">${nomePersonagem} ${btnInspecionar}</td>
            <td class="p-4 ${eventoColor} text-[10px] tracking-widest font-bold">${log.tipo_evento}</td>
            <td class="p-4 text-stone-300">${log.descricao}</td>
            <td class="p-4 text-right font-bold orbitron ${deltaColor} flex justify-end items-center">
                <span>${deltaText}</span>
                ${btnDeletarFinanceiro}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 3. Rolagens de Dados
async function carregarLogsDeDados() {
    const client = getSupabaseClient();
    const listaDados = document.getElementById('lista-logs-dados');
    if (!client || !listaDados) return;

    const selectChar = document.getElementById('filter-char');
    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');

    const charId = selectChar ? selectChar.value : '';
    const dataInicio = dateStart ? dateStart.value : null;
    const dataFim = dateEnd ? dateEnd.value : null;

    listaDados.innerHTML = '<tr><td colspan="7" class="p-4 text-center text-cyan-500 animate-pulse">Descriptografando rolagens orbitais...</td></tr>';

    let query = client
        .from('logs_dados')
        .select('*, personagens ( nome )')
        .order('created_at', { ascending: false })
        .limit(300);

    if (charId && charId !== '') query = query.eq('personagem_id', charId);
    if (dataInicio) query = query.gte('created_at', `${dataInicio}T00:00:00-03:00`);
    if (dataFim) query = query.lte('created_at', `${dataFim}T23:59:59-03:00`);

    const { data, error } = await query;

    if (error) {
        listaDados.innerHTML = '<tr><td colspan="7" class="p-4 text-center text-red-500 font-bold">⚠️ FALHA NA MATRIZ DE DADOS.</td></tr>';
        return;
    }

    if (!data || data.length === 0) {
        listaDados.innerHTML = '<tr><td colspan="7" class="p-4 text-center text-stone-500">Nenhuma rolagem detectada com estes parâmetros.</td></tr>';
        return;
    }

    listaDados.innerHTML = '';

    data.forEach(log => {
        const dataObj = new Date(log.created_at);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR') + ' às ' + dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const nomeJogador = log.personagens ? log.personagens.nome : 'Desconhecido';
        const nomeRolagem = log.nome_rolagem || 'Teste';
        const isMacro = nomeRolagem.toLowerCase().includes('macro');
        const isManual = nomeRolagem.toLowerCase().includes('manual');
        const isDano = nomeRolagem.toUpperCase().startsWith('DANO');

        let tagDiretriz = `<span class="text-stone-300 text-xs">${nomeRolagem}</span>`;
        if (isManual) tagDiretriz = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 border border-amber-500/50 text-amber-300 tracking-wider">🎲 ROLAGEM MANUAL</span>';
        else if (isMacro) tagDiretriz = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950/60 border border-red-500/50 text-red-300 tracking-wider">💥 ROLAGEM MACRO</span>';

        let displayD20 = '';
        let displayAjustes = `${log.bonus_total >= 0 ? '+' : ''}${log.bonus_total}`;
        let displayTotal = `<span class="text-amber-400 font-black text-xl drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]">${log.resultado_final}</span>`;

        if (isMacro) {
            displayD20 = `<span class="text-red-400 font-bold text-sm" title="Sucessos Puros">${log.dado_puro} 🐞</span>`;
            displayTotal = `<span class="text-red-400 font-black text-xl drop-shadow-[0_0_8px_rgba(255,17,58,0.5)]">${log.resultado_final} <span class="text-[10px] font-normal text-red-300">Suc</span></span>`;
        } else if (isDano) {
            displayD20 = '<span class="text-stone-700 font-black text-sm">❌</span>';
            displayAjustes = '<span class="text-stone-700 font-black text-xs">❌</span>';
        } else {
            let corDado = 'text-cyan-100 font-bold';
            let iconeDado = '';
            if (log.dado_puro === 20) {
                corDado = 'text-emerald-400 font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]';
                iconeDado = '🌟';
            } else if (log.dado_puro === 1) {
                corDado = 'text-red-500 font-black drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]';
                iconeDado = '💀';
            }
            displayD20 = `<span class="${corDado}">${log.dado_puro} ${iconeDado}</span>`;
        }

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-stone-900/50 transition-colors border-b border-stone-800/30';

        const btnDeletar = `
            <button onclick="deletarLog(${log.id}, 'logs_dados')" class="text-red-900 hover:text-red-400 transition-colors ml-3 cursor-pointer" title="Apagar Registro">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;

        tr.innerHTML = `
            <td class="p-3 text-[10px] text-stone-500 whitespace-nowrap">${dataFormatada}</td>
            <td class="p-3 text-cyan-300 font-bold uppercase text-xs tracking-wider">${nomeJogador}</td>
            <td class="p-3">${tagDiretriz}</td>
            <td class="p-3 text-center text-xl">${displayD20}</td>
            <td class="p-3 text-center text-xs text-stone-400">${displayAjustes}</td>
            <td class="p-3 text-center">${displayTotal}</td>
            <td class="p-3 text-[10px] text-stone-500 font-mono tracking-tighter opacity-80 flex justify-between items-center">
                <span>${log.detalhamento || '-'}</span>
                ${btnDeletar}
            </td>
        `;
        listaDados.appendChild(tr);
    });
}

// 4. Operações da Frota
async function carregarLogsTaticos() {
    const client = getSupabaseClient();
    const listaFrota = document.getElementById('lista-logs-frota');
    if (!client || !listaFrota) return;

    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');
    const dataInicio = dateStart ? dateStart.value : null;
    const dataFim = dateEnd ? dateEnd.value : null;

    listaFrota.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-red-500 animate-pulse">Estabelecendo link com os cruzadores...</td></tr>';

    let query = client
        .from('logs_taticos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(300);

    if (dataInicio) query = query.gte('created_at', `${dataInicio}T00:00:00-03:00`);
    if (dataFim) query = query.lte('created_at', `${dataFim}T23:59:59-03:00`);

    const { data, error } = await query;

    if (error) {
        listaFrota.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-red-500 font-bold">⚠️ FALHA CRÍTICA DE COMUNICAÇÃO.</td></tr>';
        return;
    }

    if (!data || data.length === 0) {
        listaFrota.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-stone-500">Nenhum evento tático registrado neste período.</td></tr>';
        return;
    }

    listaFrota.innerHTML = '';

    data.forEach(log => {
        const dataObj = new Date(log.created_at);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR') + ' às ' + dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        let actionColor = 'text-stone-300 bg-stone-800/50';
        if (log.acao === 'DANO') actionColor = 'text-red-400 bg-red-950/40 border border-red-900/50';
        if (log.acao === 'REPARO') actionColor = 'text-green-400 bg-green-950/40 border border-green-900/50';
        if (log.acao === 'MOBILIZAÇÃO') actionColor = 'text-cyan-400 bg-cyan-950/40 border border-cyan-900/50';
        if (log.acao === 'DESTRUIÇÃO/REMOÇÃO') actionColor = 'text-red-500 font-bold bg-red-900/30 border border-red-500/50';
        if (log.acao === 'ISB OVERRIDE') actionColor = 'text-yellow-400 font-bold bg-yellow-950/40 border border-yellow-700/50';
        if (log.acao === 'CONTRAMEDIDAS') actionColor = 'text-fuchsia-400 font-bold bg-fuchsia-950/40 border border-fuchsia-900/50';

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-stone-900/50 transition-colors border-b border-stone-800/30';

        const btnDeletar = `
            <button onclick="deletarLog('${log.id}', 'logs_taticos')" class="text-red-900 hover:text-red-400 transition-colors ml-3 cursor-pointer" title="Apagar Registro Tático">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;

        tr.innerHTML = `
            <td class="p-3 text-[10px] text-stone-500 whitespace-nowrap">${dataFormatada}</td>
            <td class="p-3 text-emerald-400 font-bold uppercase text-xs tracking-wider">${log.nome_jogador || 'Desconhecido'}</td>
            <td class="p-3 text-purple-400 font-bold text-xs">${log.faccao}</td>
            <td class="p-3 text-cyan-100 text-xs uppercase tracking-wider">${log.nave_nome}</td>
            <td class="p-3 text-center text-[10px]"><span class="px-2 py-1 rounded tracking-widest ${actionColor}">${log.acao}</span></td>
            <td class="p-3 text-[10px] text-stone-400 font-mono tracking-tighter opacity-90 flex justify-between items-center">
                <span>${log.detalhes}</span>
                ${btnDeletar}
            </td>
        `;
        listaFrota.appendChild(tr);
    });
}

// 5. Serviços MCMT
async function carregarLogsMCMT() {
    const client = getSupabaseClient();
    const tbodyMCMT = document.getElementById('logs-mcmt-body');
    if (!client || !tbodyMCMT) return;

    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');
    const dataInicio = dateStart ? dateStart.value : null;
    const dataFim = dateEnd ? dateEnd.value : null;

    tbodyMCMT.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-amber-500 animate-pulse">Recuperando registros das oficinas MCMT...</td></tr>';

    let query = client
        .from('logs_auditoria')
        .select('*, personagens(nome)')
        .ilike('tipo_evento', 'MCMT_%')
        .order('created_at', { ascending: false })
        .limit(200);

    if (dataInicio) query = query.gte('created_at', `${dataInicio}T00:00:00-03:00`);
    if (dataFim) query = query.lte('created_at', `${dataFim}T23:59:59-03:00`);

    const { data: logs, error } = await query;

    if (error) {
        tbodyMCMT.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-red-500 font-bold">Falha ao buscar logs MCMT: ${error.message}</td></tr>`;
        return;
    }

    if (!logs || logs.length === 0) {
        tbodyMCMT.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-stone-500">Nenhuma alteração de serviços registrada.</td></tr>';
        return;
    }

    tbodyMCMT.innerHTML = '';

    logs.forEach(log => {
        const dataObj = new Date(log.created_at);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR') + ' às ' + dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const nomePersonagem = log.personagens ? log.personagens.nome : 'Engenheiro MCMT / Dev';

        let tagColor = 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50';
        let labelTipo = log.tipo_evento;

        if (log.tipo_evento.includes('CRIAR')) {
            tagColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50';
            labelTipo = 'NOVO SERVIÇO';
        } else if (log.tipo_evento.includes('EDITAR')) {
            tagColor = 'text-amber-400 bg-amber-950/40 border-amber-800/50';
            labelTipo = 'EDIÇÃO';
        } else if (log.tipo_evento.includes('EXCLUIR')) {
            tagColor = 'text-rose-500 bg-rose-950/40 border-rose-800/50';
            labelTipo = 'EXCLUSÃO';
        }

        let descFormatada = log.descricao;
        if (log.tipo_evento.includes('EDITAR') && descFormatada.includes('➔')) {
            const partes = descFormatada.split('|');
            const titulo = partes[0];
            const diffs = partes.slice(1).map(d => {
                const item = d.trim();
                if (item.includes('➔')) {
                    const [de, para] = item.split('➔');
                    return `<span class="inline-block bg-stone-900 border border-stone-800 rounded px-2 py-0.5 my-0.5 text-xs"><span class="text-stone-400 line-through">${de.trim()}</span> <span class="text-amber-400 font-bold mx-1">➔</span> <span class="text-emerald-400 font-bold">${para.trim()}</span></span>`;
                }
                return `<span>${item}</span>`;
            }).join(' ');

            descFormatada = `<div class="font-bold text-stone-200 mb-1">${titulo}</div><div class="flex flex-wrap gap-1">${diffs}</div>`;
        }

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-stone-900/50 transition-colors border-b border-stone-800/30';

        const btnDeletar = `
            <button onclick="deletarLog('${log.id}', 'logs_auditoria')" class="text-red-900 hover:text-red-400 transition-colors ml-4 cursor-pointer" title="Apagar Registro">
                <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;

        tr.innerHTML = `
            <td class="p-4 text-stone-400 text-xs whitespace-nowrap">${dataFormatada}</td>
            <td class="p-4 font-bold text-amber-300 text-xs uppercase tracking-wider whitespace-nowrap">${nomePersonagem}</td>
            <td class="p-4 whitespace-nowrap"><span class="px-2 py-1 text-[10px] tracking-widest font-bold rounded border ${tagColor}">${labelTipo}</span></td>
            <td class="p-4 text-stone-300 text-xs">${descFormatada}</td>
            <td class="p-4 text-right">${btnDeletar}</td>
        `;
        tbodyMCMT.appendChild(tr);
    });
}

// 6. Logs de Apostas do Cassino (Fichas)
async function carregarLogsCassino() {
    const client = getSupabaseClient();
    const tbodyCassino = document.getElementById('logs-cassino-body');
    if (!client || !tbodyCassino) return;

    const selectChar = document.getElementById('filter-char');
    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');
    const inputBusca = document.getElementById('filter-text');

    const charId = selectChar ? selectChar.value : '';
    const dataInicio = dateStart ? dateStart.value : null;
    const dataFim = dateEnd ? dateEnd.value : null;
    const txt = inputBusca ? inputBusca.value.trim() : '';

    tbodyCassino.innerHTML = '<tr><td colspan="6" class="p-8 text-center text-yellow-500 animate-pulse">Rastreando telemetria das mesas de aposta...</td></tr>';

    let query = client
        .from('logs_cassino')
        .select('*, personagens(nome)')
        .order('created_at', { ascending: false })
        .limit(300);

    if (charId && charId !== '') query = query.eq('personagem_id', charId);
    if (txt) query = query.ilike('descricao', `%${txt}%`);
    if (dataInicio) query = query.gte('created_at', `${dataInicio}T00:00:00-03:00`);
    if (dataFim) query = query.lte('created_at', `${dataFim}T23:59:59-03:00`);

    const { data: logs, error } = await query;

    if (error) {
        tbodyCassino.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-red-500 font-bold">Falha ao buscar logs do Cassino: ${error.message}</td></tr>`;
        return;
    }

    if (!logs || logs.length === 0) {
        tbodyCassino.innerHTML = '<tr><td colspan="6" class="p-8 text-center text-stone-500">Nenhuma transação de fichas registrada neste período.</td></tr>';
        return;
    }

    tbodyCassino.innerHTML = '';

    logs.forEach(log => {
        const dataObj = new Date(log.created_at);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR') + ' às ' + dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const nomePersonagem = log.personagens ? log.personagens.nome : 'Apostador Desconhecido';

        let deltaColor = 'text-stone-500';
        let deltaText = '0 FG';
        if (log.delta_fichas > 0) {
            deltaColor = 'text-emerald-400 font-bold';
            deltaText = `+${log.delta_fichas} FG 🪙`;
        } else if (log.delta_fichas < 0) {
            deltaColor = 'text-rose-400 font-bold';
            deltaText = `${log.delta_fichas} FG 🪙`;
        }

        let tagClass = 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50';
        if (log.tipo_evento.includes('VITORIA') || log.tipo_evento.includes('TRIPLO') || log.tipo_evento.includes('NATURAL')) {
            tagClass = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50';
        } else if (log.tipo_evento.includes('DERROTA') || log.tipo_evento.includes('ESTOUROU')) {
            tagClass = 'text-rose-400 bg-rose-950/40 border-rose-800/50';
        } else if (log.tipo_evento.includes('COMPRA') || log.tipo_evento.includes('RESGATE')) {
            tagClass = 'text-yellow-400 bg-yellow-950/40 border-yellow-800/50';
        }

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-stone-900/50 transition-colors border-b border-stone-800/30';

        const btnDeletar = `
            <button onclick="deletarLog('${log.id}', 'logs_cassino')" class="text-red-900 hover:text-red-400 transition-colors ml-4 cursor-pointer" title="Apagar Registro">
                <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        `;

        tr.innerHTML = `
            <td class="p-4 text-stone-400 text-xs whitespace-nowrap">${dataFormatada}</td>
            <td class="p-4 font-bold text-yellow-300 text-xs uppercase tracking-wider">${nomePersonagem}</td>
            <td class="p-4 text-cyan-300 font-mono text-xs font-bold">${log.jogo}</td>
            <td class="p-4"><span class="px-2 py-1 text-[10px] tracking-widest font-bold rounded border ${tagClass}">${log.tipo_evento}</span></td>
            <td class="p-4 text-stone-300 text-xs">${log.descricao}</td>
            <td class="p-4 text-right orbitron ${deltaColor} whitespace-nowrap">
                <span>${deltaText}</span>
                ${btnDeletar}
            </td>
        `;
        tbodyCassino.appendChild(tr);
    });
}

// 7. Exclusão Universal de Registros
window.deletarLog = async function (id, tabela) {
    if (!confirm('ATENÇÃO: Deseja obliterar este registro dos arquivos da ISB? Esta ação é irreversível.')) return;

    const client = getSupabaseClient();
    if (!client) {
        alert('Supabase indisponível.');
        return;
    }

    const { error } = await client.from(tabela).delete().eq('id', id);

    if (error) {
        alert('Erro ao excluir registro: ' + error.message);
    } else {
        const contDados = document.getElementById('conteudo-dados');
        const contFrota = document.getElementById('conteudo-frota');
        const contMcmt = document.getElementById('conteudo-mcmt');
        const contCassino = document.getElementById('conteudo-cassino');

        if (contDados && !contDados.classList.contains('hidden')) carregarLogsDeDados();
        else if (contFrota && !contFrota.classList.contains('hidden')) carregarLogsTaticos();
        else if (contMcmt && !contMcmt.classList.contains('hidden')) carregarLogsMCMT();
        else if (contCassino && !contCassino.classList.contains('hidden')) carregarLogsCassino();
        else carregarLogs();
    }
};

// 8. Alternância de Abas
window.alternarAbas = function (aba) {
    const btnFinancas = document.getElementById('btn-tab-financas');
    const btnDados = document.getElementById('btn-tab-dados');
    const btnFrota = document.getElementById('btn-tab-frota');
    const btnMcmt = document.getElementById('btn-tab-mcmt');
    const btnCassino = document.getElementById('btn-tab-cassino');

    const contFinancas = document.getElementById('conteudo-financas');
    const contDados = document.getElementById('conteudo-dados');
    const contFrota = document.getElementById('conteudo-frota');
    const contMcmt = document.getElementById('conteudo-mcmt');
    const contCassino = document.getElementById('conteudo-cassino');

    const filtroTipo = document.getElementById('filter-action');
    const filtroBusca = document.getElementById('filter-text');

    const cssInativo = 'px-4 py-2 font-bold text-sm tracking-wider uppercase bg-stone-900/40 text-stone-500 border border-stone-800 rounded hover:text-stone-300 transition-colors';

    if (btnFinancas) btnFinancas.className = cssInativo;
    if (btnDados) btnDados.className = cssInativo;
    if (btnFrota) btnFrota.className = cssInativo;
    if (btnMcmt) btnMcmt.className = cssInativo;
    if (btnCassino) btnCassino.className = cssInativo;

    if (contFinancas) contFinancas.classList.replace('block', 'hidden');
    if (contDados) contDados.classList.replace('block', 'hidden');
    if (contFrota) contFrota.classList.replace('block', 'hidden');
    if (contMcmt) contMcmt.classList.replace('block', 'hidden');
    if (contCassino) contCassino.classList.replace('block', 'hidden');

    if (aba === 'financas') {
        if (btnFinancas) btnFinancas.className = 'px-4 py-2 font-bold text-sm tracking-wider uppercase bg-cyan-900/40 text-cyan-400 border border-cyan-500 rounded transition-colors';
        if (contFinancas) contFinancas.classList.replace('hidden', 'block');
        if (filtroTipo) {
            filtroTipo.disabled = false;
            filtroTipo.classList.remove('opacity-30', 'cursor-not-allowed');
        }
        if (filtroBusca) {
            filtroBusca.disabled = false;
            filtroBusca.classList.remove('opacity-30', 'cursor-not-allowed');
            filtroBusca.placeholder = 'Ex: Tibanna, 4000, Blaster...';
        }
        carregarLogs();
    } else if (aba === 'dados') {
        if (btnDados) btnDados.className = 'px-4 py-2 font-bold text-sm tracking-wider uppercase bg-amber-900/40 text-amber-400 border border-amber-500 rounded transition-colors';
        if (contDados) contDados.classList.replace('hidden', 'block');
        if (filtroTipo) {
            filtroTipo.disabled = true;
            filtroTipo.classList.add('opacity-30', 'cursor-not-allowed');
            filtroTipo.value = '';
        }
        if (filtroBusca) {
            filtroBusca.disabled = true;
            filtroBusca.classList.add('opacity-30', 'cursor-not-allowed');
            filtroBusca.value = '';
            filtroBusca.placeholder = 'Indisponível para dados';
        }
        carregarLogsDeDados();
    } else if (aba === 'frota') {
        if (btnFrota) btnFrota.className = 'px-4 py-2 font-bold text-sm tracking-wider uppercase bg-red-900/40 text-red-400 border border-red-500 rounded transition-colors';
        if (contFrota) contFrota.classList.replace('hidden', 'block');
        if (filtroTipo) {
            filtroTipo.disabled = true;
            filtroTipo.classList.add('opacity-30', 'cursor-not-allowed');
            filtroTipo.value = '';
        }
        if (filtroBusca) {
            filtroBusca.disabled = true;
            filtroBusca.classList.add('opacity-30', 'cursor-not-allowed');
            filtroBusca.value = '';
            filtroBusca.placeholder = 'Indisponível para frota';
        }
        carregarLogsTaticos();
    } else if (aba === 'mcmt') {
        if (btnMcmt) btnMcmt.className = 'px-4 py-2 font-bold text-sm tracking-wider uppercase bg-amber-900/40 text-amber-400 border border-amber-500 rounded transition-colors';
        if (contMcmt) contMcmt.classList.replace('hidden', 'block');
        if (filtroTipo) {
            filtroTipo.disabled = true;
            filtroTipo.classList.add('opacity-30', 'cursor-not-allowed');
            filtroTipo.value = '';
        }
        if (filtroBusca) {
            filtroBusca.disabled = true;
            filtroBusca.classList.add('opacity-30', 'cursor-not-allowed');
            filtroBusca.value = '';
            filtroBusca.placeholder = 'Indisponível para MCMT';
        }
        carregarLogsMCMT();
    } else if (aba === 'cassino') {
        if (btnCassino) btnCassino.className = 'px-4 py-2 font-bold text-sm tracking-wider uppercase bg-yellow-900/40 text-yellow-400 border border-yellow-500 rounded transition-colors';
        if (contCassino) contCassino.classList.replace('hidden', 'block');
        if (filtroTipo) {
            filtroTipo.disabled = true;
            filtroTipo.classList.add('opacity-30', 'cursor-not-allowed');
            filtroTipo.value = '';
        }
        if (filtroBusca) {
            filtroBusca.disabled = false;
            filtroBusca.classList.remove('opacity-30', 'cursor-not-allowed');
            filtroBusca.placeholder = 'Ex: Roleta, Blackjack, Poker...';
        }
        carregarLogsCassino();
    }
};

// 9. Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    const btnRefresh = document.getElementById('btn-refresh');
    const btnSearch = document.getElementById('btn-search');
    const btnClear = document.getElementById('btn-clear');
    const inputBusca = document.getElementById('filter-text');
    const selectChar = document.getElementById('filter-char');
    const selectAcao = document.getElementById('filter-action');
    const dateStart = document.getElementById('filter-date-start');
    const dateEnd = document.getElementById('filter-date-end');

    if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
            const contDados = document.getElementById('conteudo-dados');
            const contFrota = document.getElementById('conteudo-frota');
            const contMcmt = document.getElementById('conteudo-mcmt');
            const contCassino = document.getElementById('conteudo-cassino');

            if (contDados && !contDados.classList.contains('hidden')) carregarLogsDeDados();
            else if (contFrota && !contFrota.classList.contains('hidden')) carregarLogsTaticos();
            else if (contMcmt && !contMcmt.classList.contains('hidden')) carregarLogsMCMT();
            else if (contCassino && !contCassino.classList.contains('hidden')) carregarLogsCassino();
            else carregarLogs();
        });
    }

    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const contDados = document.getElementById('conteudo-dados');
            const contFrota = document.getElementById('conteudo-frota');
            const contMcmt = document.getElementById('conteudo-mcmt');
            const contCassino = document.getElementById('conteudo-cassino');

            if (contCassino && !contCassino.classList.contains('hidden')) carregarLogsCassino();
            else if (contMcmt && !contMcmt.classList.contains('hidden')) carregarLogsMCMT();
            else if (contDados && !contDados.classList.contains('hidden')) carregarLogsDeDados();
            else if (contFrota && !contFrota.classList.contains('hidden')) carregarLogsTaticos();
            else carregarLogs();
        });
    }

    if (inputBusca) {
        inputBusca.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const contCassino = document.getElementById('conteudo-cassino');
                if (contCassino && !contCassino.classList.contains('hidden')) carregarLogsCassino();
                else carregarLogs();
            }
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (inputBusca) inputBusca.value = '';
            if (selectChar) selectChar.value = '';
            if (selectAcao) selectAcao.value = '';
            if (dateStart) dateStart.value = '';
            if (dateEnd) dateEnd.value = '';
            carregarLogs();
        });
    }

    const selectsDeFiltro = [selectChar, dateStart, dateEnd];
    selectsDeFiltro.forEach(el => {
        if (el) {
            el.addEventListener('change', () => {
                const contDados = document.getElementById('conteudo-dados');
                const contFrota = document.getElementById('conteudo-frota');
                const contMcmt = document.getElementById('conteudo-mcmt');
                const contCassino = document.getElementById('conteudo-cassino');

                if (contDados && !contDados.classList.contains('hidden')) carregarLogsDeDados();
                else if (contFrota && !contFrota.classList.contains('hidden')) carregarLogsTaticos();
                else if (contMcmt && !contMcmt.classList.contains('hidden')) carregarLogsMCMT();
                else if (contCassino && !contCassino.classList.contains('hidden')) carregarLogsCassino();
            });
        }
    });

    await carregarPersonagens();
    await carregarLogs();
});