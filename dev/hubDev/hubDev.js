(() => {
    const sb = typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient;

    // Acesso e tema pelo UUID do usuário (não depende do nome digitado).
    // Para liberar o hub a outro dev, adicione uma entrada aqui.
    const DEVS = {
        '94d1ed61-7955-40d8-a0a1-7733bd716b5d': { nome: 'Duque Iguro', tema: 'theme-duque' },
        'c28cf763-c1a9-4f31-b0b8-6bfe296810e2': { nome: 'EidenFox',     tema: 'theme-eiden' }
    };

    const ETAPAS_FINAIS = ['concluido', 'abandonado'];
    const ATALHOS = [
        { titulo: 'Chamados',            desc: 'Bugs e falhas que pedem correção',           href: 'controleBugs.html#bug',     icone: '⚠', count: 'bug' },
        { titulo: 'Posts',               desc: 'Novidades e comunicados da equipe',          href: 'controleBugs.html#post',    icone: '✉', count: 'post' },
        { titulo: 'Serviços',            desc: 'Demandas internas e tarefas de rotina',      href: 'controleBugs.html#servico', icone: '⚙', count: 'servico' },
        { titulo: 'Log de Atividade',    desc: 'Histórico de ações de todos os devs',        href: 'controleBugs.html#log',     icone: '≣' },
        { titulo: 'Controle de Usuário', desc: 'Saldos, créditos e ajustes de personagens',  href: 'controleUsuario.html',      icone: '◉' }
    ];

    // Levantamento de segurança do mapa_do_banco_de_dados.md (seção 9)
    const PENDENCIAS = [
        { nivel: 'critico', tabela: 'system_access / storage_access', problema: 'SELECT público expõe a coluna password.' },
        { nivel: 'alto',    tabela: 'personagens',                    problema: 'SELECT e UPDATE com true para authenticated: qualquer logado altera qualquer personagem.' },
        { nivel: 'alto',    tabela: 'inventario',                     problema: 'CRUD total para authenticated.' },
        { nivel: 'alto',    tabela: 'log_bancario / logs_auditoria',  problema: 'INSERT e SELECT com true: registros podem ser forjados ou lidos por qualquer logado.' },
        { nivel: 'medio',   tabela: 'dev_itens / logs_dev',           problema: 'holonet_is_mestre() também permite DELETE ao mestre pela API.' },
        { nivel: 'medio',   tabela: 'dev_itens',                      problema: 'A constraint de status não cruza com o tipo; a validação fica só no JS.' },
        { nivel: 'medio',   tabela: 'Políticas ISB',                  problema: 'Cargos inconsistentes: algumas usam só mestre/dev, outras incluem desenvolvedor.' },
        { nivel: 'baixo',   tabela: 'dev_itens (anon)',               problema: 'Insert anônimo da manutenção. Monitorar volume de chamados falsos.' }
    ];

    const S = { user: null, dev: null, items: [], logs: [] };

    const $ = s => document.querySelector(s);
    const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const fmt = d => d ? new Date(d).toLocaleString('pt-BR') : '';
    const finalizado = i => ETAPAS_FINAIS.includes(i.status);
    const abertos = () => S.items.filter(i => !finalizado(i));

    function toast(msg, tipo = 'info') {
        const f = $('#feedback');
        f.textContent = msg;
        f.className = 'feedback ' + tipo;
        clearTimeout(toast.t);
        toast.t = setTimeout(() => { f.textContent = ''; }, 4000);
    }

    function negar(msg) { $('#accessMsg').textContent = msg; }

    async function init() {
        if (!sb) return negar('ERRO: CLIENTE SUPABASE NÃO CARREGADO');
        if (!window.isbReady) return negar('ERRO: GATEKEEPER NÃO CARREGADO');

        const isb = await window.isbReady;
        if (!isb) return; // o gatekeeper já redirecionou

        S.user = isb.user;
        S.dev = DEVS[isb.user?.id];

        if (!S.dev) {
            negar('ACESSO RESTRITO AOS DESENVOLVEDORES');
            setTimeout(() => location.replace('../menu.html'), 1500);
            return;
        }

        document.body.classList.add(S.dev.tema);
        $('#operatorName').textContent = S.dev.nome.toUpperCase();
        renderPendencias();
        carregarNotas();
        bind();
        $('#accessOverlay').classList.add('hidden');

        await Promise.all([carregarItens(), carregarLogs()]);
        subscribe();
    }

    function bind() {
        $('#notas').addEventListener('input', salvarNotas);
    }

    async function carregarItens() {
        const { data, error } = await sb.from('dev_itens')
            .select('id, tipo, titulo, status, responsavel, origem, pagina, created_at')
            .order('created_at', { ascending: false });
        if (error) return toast('Erro ao carregar itens: ' + error.message, 'error');
        S.items = data;
        renderAll();
    }

    async function carregarLogs() {
        const { data, error } = await sb.from('logs_dev')
            .select('id, created_at, usuario_nome, acao, titulo_registro, resumo')
            .order('created_at', { ascending: false })
            .limit(15);
        if (error) return toast('Erro no log: ' + error.message, 'error');
        S.logs = data;
        renderAtividade();
        $('#ultimaSync').textContent = 'Sincronizado ' + new Date().toLocaleTimeString('pt-BR');
    }

    function subscribe() {
        sb.channel('hub_dev_sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'dev_itens' }, () => carregarItens())
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'logs_dev' }, () => carregarLogs())
            .subscribe();
    }

    function renderAll() {
        renderAtalhos();
        renderMetricas();
        renderMeus();
    }

    function renderAtalhos() {
        const ab = abertos();
        const counts = {
            bug: ab.filter(i => i.tipo === 'bug').length,
            post: ab.filter(i => i.tipo === 'post').length,
            servico: ab.filter(i => i.tipo === 'servico').length
        };
        $('#atalhos').innerHTML = ATALHOS.map(a => `
            <a class="atalho" href="${esc(a.href)}">
                <div class="atalho-topo">
                    <span class="atalho-icone">${a.icone}</span>
                    ${a.count ? `<span class="atalho-count">${counts[a.count]}</span>` : ''}
                </div>
                <div class="atalho-titulo">${esc(a.titulo)}</div>
                <div class="atalho-desc">${esc(a.desc)}</div>
            </a>`).join('');
    }

    function renderMetricas() {
        const ab = abertos();
        const m = [
            { label: 'Chamados abertos',   valor: ab.filter(i => i.tipo === 'bug').length },
            { label: 'Em andamento',       valor: ab.filter(i => i.status === 'em_andamento').length },
            { label: 'Sem responsável',    valor: ab.filter(i => i.tipo !== 'post' && !i.responsavel).length, alerta: true },
            { label: 'Via manutenção',     valor: ab.filter(i => i.origem === 'manutencao').length, alerta: true },
            { label: 'Serviços abertos',   valor: ab.filter(i => i.tipo === 'servico').length },
            { label: 'Posts ativos',       valor: ab.filter(i => i.tipo === 'post').length }
        ];
        $('#metricas').innerHTML = m.map(x => `
            <div class="metric">
                <div class="metric-valor ${x.alerta && x.valor > 0 ? 'alerta' : ''}">${x.valor}</div>
                <div class="metric-label">${esc(x.label)}</div>
            </div>`).join('');
    }

    function renderMeus() {
        const meus = abertos().filter(i => i.responsavel === S.dev.nome);
        $('#meusCount').textContent = meus.length;
        $('#meus').innerHTML = meus.length
            ? meus.slice(0, 15).map(i => `
                <a class="item-link" href="controleBugs.html#${esc(i.tipo)}">
                    <div class="item-titulo">
                        <span class="tag">${esc(i.tipo.toUpperCase())}</span>${esc(i.titulo)}
                    </div>
                    <div class="dim">${esc(i.pagina || '—')} · ${esc(i.status)}</div>
                </a>`).join('')
            : '<div class="vazio">Nenhum item atribuído a você.</div>';
    }

    function renderAtividade() {
        $('#atividade').innerHTML = S.logs.length
            ? S.logs.map(l => `
                <div class="atividade-row">
                    <span class="dim">${fmt(l.created_at)}</span><br>
                    <b>${esc(l.usuario_nome)}</b> <span class="tag">${esc(l.acao)}</span>${esc(l.titulo_registro || '')}
                    ${l.resumo ? `<div class="dim">${esc(l.resumo)}</div>` : ''}
                </div>`).join('')
            : '<div class="vazio">Nenhuma atividade registrada.</div>';
    }

    function renderPendencias() {
        $('#pendencias').innerHTML = PENDENCIAS.map(p => `
            <div class="pend ${p.nivel}">
                <div class="pend-tabela">${esc(p.tabela)}<span class="pend-nivel">${esc(p.nivel)}</span></div>
                <div class="dim">${esc(p.problema)}</div>
            </div>`).join('');
    }

    // Anotações pessoais, separadas por operador
    const notaKey = () => `hubDev:notas:${S.user.id}`;

    function carregarNotas() {
        try { $('#notas').value = localStorage.getItem(notaKey()) || ''; } catch (e) { /* storage indisponível */ }
    }

    let notasTimer;
    function salvarNotas() {
        clearTimeout(notasTimer);
        notasTimer = setTimeout(() => {
            try {
                localStorage.setItem(notaKey(), $('#notas').value);
                $('#notasStatus').textContent = 'salvo ' + new Date().toLocaleTimeString('pt-BR');
            } catch (e) {
                $('#notasStatus').textContent = 'não foi possível salvar';
            }
        }, 400);
    }

    document.addEventListener('DOMContentLoaded', init);
})();