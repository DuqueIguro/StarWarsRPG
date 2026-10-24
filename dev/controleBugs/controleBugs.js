(() => {
    const sb = typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient;
    const DEVS = ['Duque Iguro', 'EidenFox'];
    const ETAPAS = {
        por_fazer: 'Por fazer',
        em_andamento: 'Em andamento',
        aguardando_revisao: 'Esperando revisão',
        abandonado: 'Abandonado',
        concluido: 'Concluído'
    };
    const S = { user: null, nome: '', cargo: '', tab: 'bug', items: [], logs: [] };

    const $ = s => document.querySelector(s);
    const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const agora = () => new Date().toISOString();
    const fmt = d => d ? new Date(d).toLocaleString('pt-BR') : '';

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

    async function init() {
        if (!sb) return negar('ERRO: CLIENTE SUPABASE NÃO CARREGADO');
        if (!window.isbReady) return negar('ERRO: GATEKEEPER NÃO CARREGADO');

        const isb = await window.isbReady;
        if (!isb) return; // o gatekeeper já redirecionou

        Object.assign(S, { user: isb.user, nome: isb.nome, cargo: isb.cargo });
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
    }

    async function carregar() {
        const { data, error } = await sb.from('dev_itens').select('*').order('created_at', { ascending: false });
        if (error) return toast('Erro ao carregar: ' + error.message, 'error');
        S.items = data;
        render();
    }

    async function carregarLog() {
        const { data, error } = await sb.from('logs_dev')
            .select('created_at, usuario_nome, usuario_cargo, acao, titulo_registro, resumo')
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
            status: tipo === 'servico' ? 'por_fazer' : 'aberto',
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

    function onAcao(e) {
        const b = e.target.closest('[data-act="toggle"]');
        if (!b) return;
        const item = S.items.find(i => i.id === Number(b.dataset.id));
        if (!item) return;
        const reabrir = item.status === 'concluido';
        atualizar(item,
            { status: reabrir ? 'aberto' : 'concluido', fechado_em: reabrir ? null : agora() },
            reabrir ? 'REABRIR' : 'CONCLUIR',
            reabrir ? 'Reabriu o chamado' : 'Concluiu/fechou o chamado');
    }

    function onMudanca(e) {
        const sel = e.target;
        if (!sel.dataset.act) return;
        const item = S.items.find(i => i.id === Number(sel.dataset.id));
        if (!item) return;
        if (sel.dataset.act === 'etapa') {
            atualizar(item,
                { status: sel.value, fechado_em: sel.value === 'concluido' ? agora() : null },
                'ETAPA', `Etapa: ${ETAPAS[sel.value]}`);
        } else if (sel.dataset.act === 'resp') {
            atualizar(item,
                { responsavel: sel.value || null },
                'ATRIBUIR', sel.value ? `Atribuiu a ${sel.value}` : 'Removeu responsável');
        }
    }

    function cardHTML(i) {
        const concl = i.status === 'concluido';
        const origem = i.origem === 'manutencao' ? '<span class="tag warn">VIA MANUTENÇÃO</span>' : '';
        const resp = `<select class="hud-input mini" data-act="resp" data-id="${i.id}">
            <option value="">— sem responsável —</option>
            ${DEVS.map(d => `<option ${d === i.responsavel ? 'selected' : ''}>${esc(d)}</option>`).join('')}
        </select>`;
        const acao = i.tipo === 'servico'
            ? `<select class="hud-input mini" data-act="etapa" data-id="${i.id}">
                ${Object.entries(ETAPAS).map(([k, v]) => `<option value="${k}" ${k === i.status ? 'selected' : ''}>${v}</option>`).join('')}
               </select>`
            : `<button class="btn-mini ${concl ? 'btn-add' : 'btn-confirm'}" data-act="toggle" data-id="${i.id}">${concl ? 'REABRIR' : 'CONCLUIR'}</button>`;
        return `<article class="item ${concl ? 'done' : ''}">
            <header><span class="tag">${esc(i.tipo.toUpperCase())}</span>${origem}<b class="titulo">${esc(i.titulo)}</b></header>
            <div class="meta">Página: ${esc(i.pagina || '—')} · Reportado por: ${esc(i.reportado_por || '—')} · ${fmt(i.created_at)}${i.fechado_em ? ` · Fechado: ${fmt(i.fechado_em)}` : ''}</div>
            ${i.descricao ? `<p class="desc">${esc(i.descricao)}</p>` : ''}
            <div class="acoes">${resp}${acao}</div>
        </article>`;
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
            b.textContent = S.items.filter(i => i.tipo === t && i.status !== 'concluido').length;
        });

        const cont = $('#lista');
        if (tab === 'log') {
            cont.innerHTML = S.logs.length
                ? S.logs.map(l => `<div class="item log-row">
                    <span class="dim">${fmt(l.created_at)}</span>
                    <b>${esc(l.usuario_nome)}</b> <span class="tag">${esc(l.acao)}</span>
                    ${esc(l.titulo_registro || '')}
                    <div class="dim">${esc(l.resumo || '')}</div></div>`).join('')
                : '<div class="empty">Sem registros.</div>';
            return;
        }

        const lista = S.items
            .filter(i => i.tipo === tab)
            .sort((a, b) => (a.status === 'concluido') - (b.status === 'concluido')
                || new Date(b.created_at) - new Date(a.created_at));
        cont.innerHTML = lista.length ? lista.map(cardHTML).join('') : '<div class="empty">Nada registrado aqui.</div>';
    }

    document.addEventListener('DOMContentLoaded', init);
})();