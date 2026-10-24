(() => {
    const sb = typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient;
    const DEVS = ['Duque Iguro', 'EidenFox', 'Equipe de Desenvolvimento'];
    const DEV_KEYS = ['duque', 'eiden'];
    const ETAPAS = {
        por_fazer: 'Por fazer',
        em_andamento: 'Em andamento',
        aguardando_revisao: 'Esperando revisão',
        abandonado: 'Abandonado',
        concluido: 'Concluído'
    };
    const ETAPAS_FINAIS = ['concluido', 'abandonado'];

    const S = {
        user: null,
        nome: '',
        cargo: '',
        tab: 'bug',
        items: [],
        logs: [],
        notas: {},          // registro_id -> [{ autor, data, texto }]
        isDev: false,
        expandidos: new Set(),
        rascunhos: {}
    };

    const $ = s => document.querySelector(s);
    const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const agora = () => new Date().toISOString();
    const fmt = d => d ? new Date(d).toLocaleString('pt-BR') : '';

    // 'aberto' é o valor legado de chamados. Para chamados, equivale a 'Por fazer'.
    const etapaDe = i => (i.tipo !== 'post' && i.status === 'aberto') ? 'por_fazer' : i.status;
    const finalizado = i => ETAPAS_FINAIS.includes(etapaDe(i));

    function toast(msg, tipo = 'info') {
        const f = $('#feedback');
        f.textContent = msg;
        f.className = 'feedback ' + tipo;
        clearTimeout(toast.t);
        toast.t = setTimeout(() => f.textContent = '', 4000);
    }

    function negar(msg) { $('#accessMsg').textContent = msg; }

    function aplicarTema() {
        const n = S.nome.toLowerCase();
        const tema = n.includes('duque') ? 'theme-duque'
            : n.includes('eiden') ? 'theme-eiden'
            : S.cargo === 'mestre' ? 'theme-mestre' : '';
        if (tema) document.body.classList.add(tema);
    }

    // Controles de dev (excluir, log) só para os devs. O cargo mestre tem prioridade.
    function calcularIsDev() {
        const n = S.nome.toLowerCase();
        return S.cargo !== 'mestre' && DEV_KEYS.some(k => n.includes(k));
    }

    const opcoesEtapa = atual => Object.entries(ETAPAS)
        .map(([k, v]) => `<option value="${k}" ${k === atual ? 'selected' : ''}>${v}</option>`).join('');

    async function init() {
        if (!sb) return negar('ERRO: CLIENTE SUPABASE NÃO CARREGADO');
        if (!window.isbReady) return negar('ERRO: GATEKEEPER NÃO CARREGADO');

        const isb = await window.isbReady;
        if (!isb) return;

        Object.assign(S, { user: isb.user, nome: isb.nome, cargo: isb.cargo });
        S.isDev = calcularIsDev();
        aplicarTema();
        $('#operatorName').textContent = S.nome.toUpperCase();
        $('#fResp').innerHTML = DEVS.map(d => `<option>${esc(d)}</option>`).join('')
            + '<option value="">Sem responsável</option>';

        bind();
        $('#accessOverlay').classList.add('hidden');
        await Promise.all([carregar(), carregarLog()]);

        sb.channel('dev_itens_sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'dev_itens' }, () => carregar())
            .subscribe();
    }

    function bind() {
        document.querySelectorAll('.tab').forEach(b => b.addEventListener('click', () => {
            S.tab = b.dataset.tab;
            document.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === b));
            if (S.tab === 'log') carregarLog();
            render();
        }));
        $('#formNovo').addEventListener('submit', criar);
        $('#lista').addEventListener('click', onAcao);
        $('#lista').addEventListener('change', onMudanca);
        $('#lista').addEventListener('input', onDigitar);
    }

    async function carregar() {
        const { data, error } = await sb.from('dev_itens').select('*').order('created_at', { ascending: false });
        if (error) return toast('Erro ao carregar: ' + error.message, 'error');
        S.items = data;
        await carregarNotas();
        render();
    }

    // Notas ficam no log (acao = 'NOTA'), então não precisam de coluna própria.
    async function carregarNotas() {
        const { data, error } = await sb.from('logs_dev')
            .select('registro_id, usuario_nome, created_at, resumo')
            .eq('tabela', 'dev_itens')
            .eq('acao', 'NOTA')
            .order('created_at', { ascending: true })
            .limit(5000);
        if (error) return toast('Erro ao carregar notas: ' + error.message, 'error');
        S.notas = {};
        data.forEach(n => {
            (S.notas[n.registro_id] ||= []).push({ autor: n.usuario_nome, data: n.created_at, texto: n.resumo });
        });
    }

    async function carregarLog() {
        const { data, error } = await sb.from('logs_dev')
            .select('id, created_at, usuario_nome, usuario_cargo, acao, titulo_registro, resumo')
            .order('created_at', { ascending: false }).limit(300);
        if (error) return toast('Erro no log: ' + error.message, 'error');
        S.logs = data;
        if (S.tab === 'log') render();
    }

    async function registrar(acao, item, resumo) {
        const { error } = await sb.from('logs_dev').insert([{
            user_id: S.user.id,
            usuario_nome: S.nome,
            usuario_cargo: S.cargo,
            acao,
            tabela: 'dev_itens',
            registro_id: String(item.id),
            titulo_registro: item.titulo,
            resumo
        }]);
        if (error) console.warn('Falha ao registrar log:', error.message);
        return !error;
    }

    async function criar(e) {
        e.preventDefault();
        const titulo = $('#fTitulo').value.trim();
        if (!titulo) return toast('Informe um título.', 'error');
        const tipo = $('#fTipo').value;
        const row = {
            tipo,
            titulo,
            pagina: $('#fPagina').value.trim() || null,
            descricao: $('#fDesc').value.trim() || null,
            status: tipo === 'post' ? 'aberto' : 'por_fazer',
            responsavel: $('#fResp').value || null,
            origem: 'dev',
            reportado_por: S.nome,
            updated_at: agora()
        };
        const { data, error } = await sb.from('dev_itens').insert([row]).select().single();
        if (error) return toast('Erro: ' + error.message, 'error');
        await registrar('CRIAR', data, `Criou ${tipo}`);
        e.target.reset();
        toast('Registro criado.', 'success');
        carregar();
        carregarLog();
    }

    async function atualizar(item, patch, acao, resumo) {
        const { error } = await sb.from('dev_itens')
            .update({ ...patch, updated_at: agora() }).eq('id', item.id);
        if (error) return toast('Erro: ' + error.message, 'error');
        Object.assign(item, patch);
        await registrar(acao, item, resumo);
        toast('Atualizado.', 'success');
        carregar();
        carregarLog();
    }

    async function adicionarNota(item) {
        const texto = (S.rascunhos[item.id] || '').trim();
        if (!texto) return toast('Escreva a nota antes de adicionar.', 'error');
        const ok = await registrar('NOTA', item, texto);
        if (!ok) return toast('Erro ao salvar a nota.', 'error');
        delete S.rascunhos[item.id];
        // Atualiza updated_at para disparar o realtime e os outros devs recarregarem as notas
        await sb.from('dev_itens').update({ updated_at: agora() }).eq('id', item.id);
        toast('Nota adicionada.', 'success');
        carregar();
        carregarLog();
    }

    async function excluirItem(item) {
        if (!S.isDev) return;
        if (!confirm(`Excluir o reporte "${item.titulo}"? Essa ação não pode ser desfeita.`)) return;
        const { error } = await sb.from('dev_itens').delete().eq('id', item.id);
        if (error) return toast('Erro ao excluir: ' + error.message, 'error');
        await registrar('EXCLUIR', item, 'Excluiu o reporte');
        S.items = S.items.filter(i => i.id !== item.id);
        S.expandidos.delete(item.id);
        delete S.rascunhos[item.id];
        delete S.notas[item.id];
        toast('Reporte excluído.', 'success');
        render();
        carregarLog();
    }

    async function excluirLog(id) {
        if (!S.isDev) return;
        if (!confirm('Excluir este registro do log?')) return;
        const { data, error } = await sb.from('logs_dev').delete().eq('id', id).select('id');
        if (error) return toast('Erro ao excluir log: ' + error.message, 'error');
        if (!data.length) return toast('Nada foi excluído. Verifique a policy de DELETE em logs_dev.', 'error');
        S.logs = S.logs.filter(l => l.id !== id);
        toast('Registro de log excluído.', 'success');
        render();
    }

    function toggleConcluir(item) {
        const reabrir = item.status === 'concluido';
        atualizar(item,
            { status: reabrir ? 'aberto' : 'concluido', fechado_em: reabrir ? null : agora() },
            reabrir ? 'REABRIR' : 'CONCLUIR',
            reabrir ? 'Reabriu o post' : 'Concluiu o post');
    }

    function alternarExpandido(id) {
        S.expandidos.has(id) ? S.expandidos.delete(id) : S.expandidos.add(id);
        render();
    }

    function onAcao(e) {
        const btn = e.target.closest('[data-act]');
        if (!btn) return;
        const act = btn.dataset.act;
        const id = Number(btn.dataset.id);

        if (act === 'excluir-log') return excluirLog(id);
        if (act === 'expandir') return alternarExpandido(id);

        const item = S.items.find(i => i.id === id);
        if (!item) return;

        if (act === 'toggle') return toggleConcluir(item);
        if (act === 'add-nota') return adicionarNota(item);
        if (act === 'excluir') return excluirItem(item);
    }

    function onMudanca(e) {
        const sel = e.target;
        const act = sel.dataset.act;
        if (!act || act === 'nota-rascunho') return;
        const item = S.items.find(i => i.id === Number(sel.dataset.id));
        if (!item) return;

        if (act === 'etapa') {
            const st = sel.value;
            atualizar(item,
                { status: st, fechado_em: ETAPAS_FINAIS.includes(st) ? agora() : null },
                'ETAPA', `Etapa: ${ETAPAS[st]}`);
        } else if (act === 'resp') {
            atualizar(item,
                { responsavel: sel.value || null },
                'ATRIBUIR', sel.value ? `Atribuiu a ${sel.value}` : 'Removeu responsável');
        }
    }

    // Guarda o rascunho da nota para não perder o texto quando o realtime re-renderiza
    function onDigitar(e) {
        const ta = e.target;
        if (ta.dataset.act !== 'nota-rascunho') return;
        S.rascunhos[Number(ta.dataset.id)] = ta.value;
    }

    function notaHTML(n) {
        return `<div class="nota">
            <div class="nota-meta">${esc(n.autor)} · ${fmt(n.data)}</div>
            <div class="nota-texto">${esc(n.texto)}</div>
        </div>`;
    }

    function cardHTML(i) {
        const expandido = S.expandidos.has(i.id);
        const etapa = etapaDe(i);
        const fin = finalizado(i);
        const origem = i.origem === 'manutencao' ? '<span class="tag warn">VIA MANUTENÇÃO</span>' : '';

        const controle = i.tipo === 'post'
            ? `<button class="btn-mini ${i.status === 'concluido' ? 'btn-add' : 'btn-confirm'}" data-act="toggle" data-id="${i.id}">${i.status === 'concluido' ? 'REABRIR' : 'CONCLUIR'}</button>`
            : `<select class="hud-input mini" data-act="etapa" data-id="${i.id}">${opcoesEtapa(etapa)}</select>`;

        const responsavel = i.responsavel
            ? `<span class="tag">${esc(i.responsavel)}</span>`
            : '<span class="dim">sem responsável</span>';

        const notas = S.notas[i.id] || [];
        const rascunho = S.rascunhos[i.id] || '';

        const detalhes = expandido ? `
            <div class="detalhes">
                <div class="bloco-titulo">DESCRIÇÃO</div>
                <p class="desc">${i.descricao ? esc(i.descricao) : '<span class="dim">Sem descrição.</span>'}</p>

                <div class="bloco-titulo">RESPONSÁVEL</div>
                <select class="hud-input mini" data-act="resp" data-id="${i.id}">
                    <option value="">— sem responsável —</option>
                    ${DEVS.map(d => `<option ${d === i.responsavel ? 'selected' : ''}>${esc(d)}</option>`).join('')}
                </select>

                <div class="bloco-titulo">NOTAS (${notas.length})</div>
                ${notas.length ? notas.map(notaHTML).join('') : '<div class="dim">Nenhuma nota ainda.</div>'}
                <div class="nota-form">
                    <textarea class="hud-input" rows="2" data-act="nota-rascunho" data-id="${i.id}" placeholder="Adicionar nota ou detalhe...">${esc(rascunho)}</textarea>
                    <button class="btn-mini btn-confirm" data-act="add-nota" data-id="${i.id}">ADICIONAR NOTA</button>
                </div>

                <div class="dim">Criado em ${fmt(i.created_at)}${i.fechado_em ? ` · Fechado em ${fmt(i.fechado_em)}` : ''}</div>

                ${S.isDev ? `<div class="acoes perigo"><button class="btn-danger" data-act="excluir" data-id="${i.id}">EXCLUIR REPORTE</button></div>` : ''}
            </div>` : '';

        const classeEstado = fin ? (etapa === 'abandonado' ? 'abandonado' : 'done') : '';

        return `<article class="item ${classeEstado} ${expandido ? 'expandido' : ''}">
            <div class="item-topo">
                <div>
                    <span class="tag">${esc(i.tipo.toUpperCase())}</span>${origem}
                    <b class="titulo">${esc(i.titulo)}</b>
                </div>
                <div class="acoes">
                    ${controle}
                    <button class="btn-expand" data-act="expandir" data-id="${i.id}">${expandido ? '▴ RECOLHER' : '▾ DETALHES'}</button>
                </div>
            </div>
            <div class="meta">Página: ${esc(i.pagina || '—')} · Responsável: ${responsavel} · Reportado por: ${esc(i.reportado_por || '—')} · ${fmt(i.created_at)}</div>
            ${detalhes}
        </article>`;
    }

    function logHTML(l) {
        return `<div class="item log-row">
            <div class="item-topo">
                <div>
                    <span class="dim">${fmt(l.created_at)}</span>
                    <b>${esc(l.usuario_nome)}</b> <span class="tag">${esc(l.acao)}</span>
                    ${esc(l.titulo_registro || '')}
                </div>
                ${S.isDev ? `<div class="acoes"><button class="btn-danger" data-act="excluir-log" data-id="${l.id}">EXCLUIR</button></div>` : ''}
            </div>
            <div class="dim">${esc(l.resumo || '')}</div>
        </div>`;
    }

    function render() {
        const tab = S.tab;
        $('#novoPanel').classList.toggle('hidden', tab === 'log');
        if (tab !== 'log') $('#fTipo').value = tab;
        $('#listTitle').textContent = {
            bug: '◈ CHAMADOS', post: '◈ POSTS', servico: '◈ SERVIÇOS', log: '◈ LOG DE ATIVIDADE DOS DEVS'
        }[tab];

        document.querySelectorAll('[data-count]').forEach(b => {
            const t = b.dataset.count;
            b.textContent = S.items.filter(i => i.tipo === t && !finalizado(i)).length;
        });

        const cont = $('#lista');
        if (tab === 'log') {
            cont.innerHTML = S.logs.length
                ? S.logs.map(logHTML).join('')
                : '<div class="empty">Sem registros.</div>';
            return;
        }

        const lista = S.items
            .filter(i => i.tipo === tab)
            .sort((a, b) => finalizado(a) - finalizado(b)
                || new Date(b.created_at) - new Date(a.created_at));
        cont.innerHTML = lista.length ? lista.map(cardHTML).join('') : '<div class="empty">Nada registrado aqui.</div>';
    }

    document.addEventListener('DOMContentLoaded', init);
})();