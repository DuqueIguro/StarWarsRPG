document.addEventListener('DOMContentLoaded', async () => {
    const $ = id => document.getElementById(id);
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const fmt = n => Number(n || 0).toLocaleString('pt-BR');
    const pad = (n, l) => String(n).padStart(l, '0');

    // ---------- Constantes ----------
    const MECANICOS = ["Dur'toc", 'Faísca', 'Zarek Valerius', 'Vasctor', 'Gara', 'Renn', 'Brigada das Catracas'];
    const STATUS = ['Em Aberto', 'Em Progresso', 'Aguardando Peça', 'Concluído', 'Cancelado'];
    const BASES = { peca: 'Peça', mao_de_obra: 'Mão de Obra', mao_de_obra_improvisada: 'Mão de Obra Impr.', servico_total: 'Total do Serviço' };
    const CARGOS_ISB = ['mestre', 'dev', 'desenvolvedor', 'durtoc'];

    // Presets de taxa
    const TAXAS_PRESET = [
        { sigla: 'T.D.P', nome: 'Taxa de Diagnóstico Padrão', tipo: 'fixa', valor: 150, just: 'Aplicada para identificação precisa da causa-raiz do defeito.' },
        { sigla: 'S.E.V.I.R.A.', nome: 'Adicional Protocolo S.E.V.I.R.A.', tipo: 'percentual', base: 'mao_de_obra_improvisada', valor: 15, just: 'Adicional sobre a mão de obra improvisada por recusa do reparo adequado.' },
        { sigla: 'S.R.A.', nome: 'Taxa S.R.A. (Síndrome do Reparo Anterior)', tipo: 'percentual', base: 'mao_de_obra', valor: 100, just: 'Complexidade gerada por um reparo anterior malfeito.' },
        { sigla: 'C.I.C.', nome: 'Taxa C.I.C. (Circuito de Incompatibilidade Crônica)', tipo: 'percentual', base: 'mao_de_obra', valor: 25, just: 'Solução de compatibilidade entre sistemas incompatíveis.' },
        { sigla: 'GAFO', nome: 'Selo de Qualidade GAFO', tipo: 'percentual', base: 'mao_de_obra', valor: 20, just: 'Adicional pela solução de engenharia não ortodoxa.' },
        { sigla: 'FMEA', nome: 'Taxa FMEA (Faz Milagre E Agradece)', tipo: 'fixa', valor: 2000, just: 'Reparo em equipamento extremamente danificado que volta a funcionar sem explicação lógica.' },
        { sigla: 'CALADO', nome: 'Taxa CALADO', tipo: 'percentual', base: 'servico_total', valor: 25, just: 'Confidencialidade e operação fora dos registros.' },
        { sigla: 'GHOST', nome: 'Taxa GHOST', tipo: 'percentual', base: 'mao_de_obra', valor: 200, just: 'Ocultação sistêmica da modificação.' },
        { sigla: 'COISA', nome: 'Taxa COISA', tipo: 'percentual', base: 'peca', valor: 120, just: 'Risco legal e de segurança por peça de procedência duvidosa.' },
        { sigla: 'BIOS', nome: 'Taxa BIOS', tipo: 'percentual', base: 'mao_de_obra', valor: 0, just: 'Falha causada pelo operador.' },
        { sigla: 'I.D.A.', nome: 'Taxa I.D.A.', tipo: 'percentual', base: 'mao_de_obra', valor: 0, just: 'Interferência destrutiva do amador.' },
        { sigla: 'FIMEL', nome: 'Taxa FIMEL', tipo: 'percentual', base: 'servico_total', valor: 0, just: 'Cliente arrogante ou ignorante.' },
    ];

    const TERMOS_AUTO = [
        { id: 'sevira', siglas: ['S.E.V.I.R.A.'], texto: 'A solicitação de um serviço categorizado como S.E.V.I.R.A. anula automaticamente qualquer garantia sobre o componente ou sistema reparado. A oficina não se responsabiliza por falhas subsequentes decorrentes da natureza provisória da solução.' },
        { id: 'sigilo', siglas: ['CALADO', 'GHOST', 'COISA'], sigiloso: true, texto: 'O pagamento deve ser feito integralmente e adiantado, em créditos não rastreáveis. Não há garantia. A oficina opera sob negação plausível. Sem reembolso.' },
    ];

    // ---------- Estado ----------
    let isMestre = false, ordens = [], locais = [], catalogo = [];

    async function verificarMestre() {
        try {
            const { data: u } = await supabaseClient.auth.getUser();
            if (!u?.user) return false;
            const { data } = await supabaseClient.from('permissoes').select('cargo').eq('user_id', u.user.id);
            return (data || []).some(p => CARGOS_ISB.includes(String(p.cargo || '').toLowerCase()));
        } catch { return false; }
    }

    // ---------- Listas ----------
    async function carregarOrdens() {
        const { data, error } = await supabaseClient.from('ordens_servico_leitura').select('*')
            .order('ano_aby').order('sigla_localidade').order('serie');
        if (error) {
            console.error('Erro ao carregar OS:', error);
            $('os-list').innerHTML = '<div class="os-item p-3 rounded-md"><p class="font-bold text-red-300">Erro ao carregar ordens de serviço.</p></div>';
            return;
        }
        ordens = data || [];
    }

    function criarItem(os) {
        const sig = os.sigiloso;
        const div = document.createElement('div');
        div.className = `${sig ? 'os-item-sigiloso' : 'os-item'} p-3 rounded-md`;
        div.dataset.id = os.id;
        const st = `status-${os.status.toLowerCase().replace(/ /g, '-')}`;
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <p class="font-bold ${sig ? 'text-red-300' : 'text-[#7bcf9a]'}">${esc(os.titulo)}</p>
                <span class="text-xs font-bold px-2 py-1 rounded-full ${st}">${esc(os.status)}</span>
            </div>
            <p class="text-sm ${sig ? 'text-red-400' : 'text-[#5a9e74]'}">Cliente: ${esc(os.cliente?.nome)}</p>
            <p class="text-xs text-[#6a857a]">ID: ${esc(os.id)}</p>`;
        div.addEventListener('click', () => selecionar(os, div));
        return div;
    }

    function renderListas() {
        const nor = $('os-list'), sig =$('os-list-sigiloso');
        nor.innerHTML = ''; sig.innerHTML = '';
        ordens.forEach(os => (os.sigiloso ? sig : nor).appendChild(criarItem(os)));
        if (!nor.children.length) nor.innerHTML = '<p class="os-placeholder-text">Nenhuma ordem registrada.</p>';
        if (!sig.children.length) sig.innerHTML = '<p class="os-placeholder-text os-placeholder-sigiloso">Nenhum registro sigiloso.</p>';
    }

    const painel = sig => sig
        ? { det: $('os-details-container-sigiloso'), ph: $('os-placeholder-sigiloso'), body:$('os-details-sigiloso') }
        : { det: $('os-details-container'), ph: $('os-placeholder'), body:$('os-details') };

    function selecionar(os, el) {
        const C = painel(os.sigiloso), O = painel(!os.sigiloso);
        if (el.classList.contains('active')) {
            el.classList.remove('active'); C.det.classList.add('hidden'); C.ph.classList.remove('hidden'); return;
        }
        document.querySelectorAll('.os-item, .os-item-sigiloso').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        C.body.innerHTML = renderDetalhes(os);
        C.det.classList.remove('hidden'); C.ph.classList.add('hidden');
        O.det.classList.add('hidden'); O.ph.classList.remove('hidden');
        ligarControles(C.body, os);
    }

    async function recarregar(idSelecionado) {
        await carregarOrdens();
        renderListas();
        if (idSelecionado) {
            const os = ordens.find(o => o.id === idSelecionado);
            const el = document.querySelector(`[data-id="${CSS.escape(idSelecionado)}"]`);
            if (os && el) selecionar(os, el);
        }
    }

    // ---------- Detalhes ----------
    function renderDetalhes(os) {
        const sg = os.sigiloso;
        const th = sg
            ? { main: 'red', total: 'text-red-300', title: 'text-red-300', header: 'text-red-400', strong: 'text-red-300', border: 'border-red-800', borderStrong: 'border-red-500' }
            : { main: 'emerald', total: 'text-[#a8f5c0]', title: 'text-[#7bcf9a]', header: 'text-[#5a9e74]', strong: 'text-[#a8f5c0]', border: 'border-[#2a3d35]', borderStrong: 'border-[#3a6b50]' };
        const fin = os.financeiro || {};
        const moeda = esc(fin.moeda || 'Créditos Galácticos');
        const sub = 'text-sm text-[#6a857a] ml-4';

        const servicos = (os.itens || []).map(it => {
            const d = it.detalhes || {}, p = d.peca || {}, m = d.maoDeObra || {};
            return `<div class="border-t ${th.border} pt-3 mt-3">
                <p><strong class="${th.strong}">Serviço:</strong> ${esc(it.servico)}</p>
                <p><strong class="${th.strong}">Tipo:</strong> ${esc(it.tipo)}</p>
                <p><strong class="${th.strong}">Peça:</strong> ${esc(p.nome || 'N/A')}${p.cobrada === false ? ' (fornecida pelo cliente)' : ''}</p>
                <p><strong class="${th.strong}">Custo (Peças):</strong> ${fmt(p.custo)} créditos</p>
                <p><strong class="${th.strong}">Custo (Mão de Obra):</strong> ${fmt(m.custo)} créditos${m.expressao ? ` <span class="text-[#6a857a]">(${esc(m.expressao)})</span>` : ''}</p>
            </div>`;
        }).join('');

        const itens = os.itens || [];
        const pecasLn = itens.filter(i => i.detalhes?.peca?.custo > 0 && i.detalhes.peca.cobrada !== false)
            .map(i => `<div class="${sub}">${esc(i.detalhes.peca.nome)}: ${fmt(i.detalhes.peca.custo)} créditos</div>`).join('');
        const moLn = itens.filter(i => i.detalhes?.maoDeObra?.custo > 0)
            .map(i => `<div class="${sub}">${esc(i.servico)}: ${fmt(i.detalhes.maoDeObra.custo)} créditos</div>`).join('');

        const vis = os.taxas || [];
        const fixas = vis.filter(t => t.tipo !== 'percentual');
        const lnFixa = t => `<div class="${sub}">${esc(t.nome)}${t.sigla ? ` (${esc(t.sigla)})` : ''}: ${fmt(t.custo)} créditos</div>`;
        const lnPerc = (t, extra = '') => `<div class="${sub} ${extra}">+${t.percentual}% ${BASES[t.base] || ''} (${esc(t.sigla)}): ${fmt(t.custo)} créditos</div>`;
        const adic = [
            ...vis.filter(t => t.tipo === 'percentual').map(t => lnPerc(t)),
            ...(os.gorjeta ? [`<div class="${sub}">Gorjeta${os.gorjeta.tipo === 'percentual' ? ` (${os.gorjeta.percentual}% do total do serviço)` : ''}: ${fmt(os.gorjeta.custo)} créditos</div>`] : []),
            ...((isMestre ? os.taxas_ocultas || [] : []).map(t => (t.tipo === 'percentual' ? lnPerc(t, 'os-oculta') : lnFixa(t).replace('class="', 'class="os-oculta ')).replace('créditos</div>', 'créditos [oculta]</div>'))),
        ];

        const bloco = (titulo, valor, linhas, prefixo = '') =>
            `<div class="text-lg"><strong class="${th.title}">${titulo}:</strong> ${prefixo}${fmt(valor)} ${moeda}</div>${linhas}`;
        const pecasS = fin.subtotalPecas > 0 ? bloco('Subtotal (Peças)', fin.subtotalPecas, pecasLn) : '';
        const moS = fin.subtotalMaoDeObra > 0 ? bloco('Subtotal (Mão de Obra)', fin.subtotalMaoDeObra, moLn) : '';
        const fixasS = (fixas.length || fin.subtotalTaxasFixas > 0) ? bloco('Taxas Fixas', fin.subtotalTaxasFixas, fixas.map(lnFixa).join('')) : '';
        const adicS = (adic.length || fin.subtotalAdicionais > 0) ? bloco('Adicionais', fin.subtotalAdicionais, adic.join(''), '+') : '';

        const termosHtml = os.termos ? `<div class="mt-6 border-t ${th.border} pt-4"><h3 class="text-lg ${th.header} mb-2">Termos e Condições</h3><p class="text-sm text-${th.main}-200 bg-[#0d0f0e]/70 p-3 rounded-md italic">"${esc(os.termos)}"</p></div>` : '';
        const mecs = (os.mecanicos || []).join(' e ') || 'N/A';
        const cli = os.cliente || {};

        const controles = isMestre ? `
            <div class="os-controles mt-6 border-t ${th.border} pt-4">
                <label>Status
                    <select class="os-status-sel">${STATUS.map(s => `<option ${s === os.status ? 'selected' : ''}>${s}</option>`).join('')}</select>
                </label>
                <button type="button" class="os-btn os-btn-danger os-del">Excluir OS</button>
            </div>` : '';

        return `
            <h2 class="text-2xl ${th.title} mb-2">${esc(os.titulo)}</h2>
            <p class="text-sm text-[#6a857a] mb-4">ID da Ordem: ${esc(os.id)} | Data: ${esc(os.data_texto)} | Local: ${esc(os.localidade)}</p>
            <div class="bg-[#0d0f0e]/60 p-4 rounded-md mb-4">
                <h3 class="text-lg ${th.header} mb-2">Informações do Cliente</h3>
                <p><strong class="${th.strong}">Nome:</strong> ${esc(cli.nome)}</p>
                <p><strong class="${th.strong}">Afiliação:</strong> ${esc(cli.afiliacao)}</p>
                <p><strong class="${th.strong}">Contato HoloNet:</strong> ${esc(cli.contato_holonet)}</p>
            </div>
            <div class="bg-[#0d0f0e]/60 p-4 rounded-md mb-4">
                <h3 class="text-lg ${th.header} mb-2">Relatório do Problema</h3>
                <p class="text-[#c8ddd5]">${esc(os.relatorio_problema)}</p>
            </div>
            <div class="bg-[#0d0f0e]/60 p-4 rounded-md mb-4">
                <h3 class="text-lg ${th.header} mb-2">Serviços Executados</h3>
                ${servicos}
            </div>
            <div class="border-t-2 ${th.borderStrong} pt-4 mt-4 space-y-2">
                ${pecasS}${moS}${fixasS}${adicS}
                <h3 class="text-2xl ${th.total} mt-4 pb-4 border-b ${th.border}">Total a Pagar: ${fmt(fin.total)} ${moeda}</h3>
            </div>
            <div class="mt-6">
                <h3 class="text-lg ${th.header} mb-2">Notas do Mecânico (${esc(mecs)})</h3>
                <p class="text-[#c8ddd5] italic">"${esc(os.notas_mecanico)}"</p>
            </div>
            ${termosHtml}${controles}`;
    }

    function ligarControles(body, os) {
        const sel = body.querySelector('.os-status-sel');
        if (sel) sel.addEventListener('change', async () => {
            const { error } = await supabaseClient.from('ordens_servico').update({ status: sel.value }).eq('id', os.id);
            if (error) { alert('Não foi possível alterar o status: ' + error.message); sel.value = os.status; return; }
            await recarregar(os.id);
        });
        const del = body.querySelector('.os-del');
        if (del) del.addEventListener('click', async () => {
            if (!confirm(`Excluir a ${os.id}? Isso não pode ser desfeito.`)) return;
            const { error } = await supabaseClient.from('ordens_servico').delete().eq('id', os.id);
            if (error) { alert('Não foi possível excluir: ' + error.message); return; }
            const C = painel(os.sigiloso); C.det.classList.add('hidden'); C.ph.classList.remove('hidden');
            await recarregar();
        });
    }

    // =====================================================================
    //  CRIAÇÃO DE OS
    // =====================================================================
    const num = v => parseFloat(String(v ?? '').replace(',', '.')) || 0;
    const soma = s => String(s ?? '').split('+').reduce((a, p) => a + num(p), 0);
    const ceil = x => Math.ceil(Number(x.toFixed(6)));
    const opt = (v, t, sel) => `<option value="${esc(v)}" ${sel ? 'selected' : ''}>${esc(t)}</option>`;

    async function carregarApoio() {
        try {
            const r = await fetch('database/siglasLocalidade.json');
            const j = await r.json();
            locais = [
                ...j.codigos_planetas.map(p => ({ nome: p.planeta, sigla: p.codigo })),
                ...j.codigos_locais_extras.map(p => ({ nome: p.indentificador, sigla: p.codigo })),
            ].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        } catch (e) { console.error('siglasLocalidade.json', e); }
        try {
            const { data } = await supabaseClient.from('servicos_mcmt').select('*').order('oficina').order('nome_servico');
            catalogo = data || [];
        } catch (e) { console.error('servicos_mcmt', e); }
    }

    function montarFormulario() {
        // Autocomplete de Localidade
        $('lista-localidades').innerHTML = locais.map(l => `<option value="${esc(l.sigla)}">${esc(l.nome)} (${esc(l.sigla)})</option>`).join('');

        // Autocomplete de Catálogo de Serviços
        $('lista-catalogo-servicos').innerHTML = catalogo.map(s => 
            `<option value="${esc(s.nome_servico)}">[${esc(s.oficina || 'Geral')}] Peça: ${fmt(s.preco_componentes || 0)} cr | MO: ${fmt(s.mao_de_obra || 0)} cr</option>`
        ).join('');

        // Autocomplete de Taxas
        $('lista-taxas-preset').innerHTML = TAXAS_PRESET.map(p => 
            `<option value="${esc(p.sigla)}">${esc(p.nome)}</option>`
        ).join('');

        $('f-status').innerHTML = STATUS.map(s => opt(s, s)).join('');$('f-mecanicos').innerHTML = MECANICOS.map(m => `<label class="os-check"><input type="checkbox" value="${esc(m)}"> ${esc(m)}</label>`).join('');
        $('f-termos-auto').innerHTML = TERMOS_AUTO.map(t => `<label class="os-check"><input type="checkbox" data-termo="${t.id}"> ${esc(t.texto)}</label>`).join('');
    }

    function linhaServico() {
        const d = document.createElement('div');
        d.className = 'os-row'; d.dataset.row = 'servico';
        d.innerHTML = `
            <input class="f-servico" list="lista-catalogo-servicos" placeholder="Serviço (digite para buscar)" autocomplete="off">
            <input class="f-tipo" list="tipos-servico" placeholder="Tipo" value="Mão de Obra">
            <input class="f-causa" placeholder="Causa do problema">
            <input class="f-peca-nome" placeholder="Peça">
            <input class="f-peca-custo" inputmode="numeric" placeholder="Custo da peça">
            <label class="os-check"><input type="checkbox" class="f-peca-cobrada" checked> cobrar peça</label>
            <input class="f-mo" placeholder="Mão de obra (500+300)">
            <label class="os-check"><input type="checkbox" class="f-impr"> improvisado</label>
            <button type="button" class="os-btn os-x" title="Remover">&times;</button>`;
        return d;
    }

    function linhaTaxa() {
        const d = document.createElement('div');
        d.className = 'os-row'; d.dataset.row = 'taxa';
        d.innerHTML = `
            <input class="f-sigla" list="lista-taxas-preset" placeholder="Sigla/Preset" autocomplete="off">
            <input class="f-nome" placeholder="Nome da Taxa">
            <select class="f-tipo"><option value="fixa">Fixa (créditos)</option><option value="percentual">Percentual</option></select>
            <select class="f-base" disabled>${Object.entries(BASES).map(([k, v]) => opt(k, v)).join('')}</select>
            <input class="f-valor" inputmode="decimal" placeholder="Valor ou %">
            <input class="f-just" placeholder="Justificativa">
            <button type="button" class="os-btn os-x" title="Remover">&times;</button>`;
        return d;
    }

    // Lê o formulário e calcula valores
    function lerFormulario() {
        const itens = [...$('f-servicos').children].map(r => {
            const q = s => r.querySelector(s);
            const peca = num(q('.f-peca-custo').value), cobrada = q('.f-peca-cobrada').checked;
            const expr = q('.f-mo').value.trim(), mo = soma(expr);
            const nomeServ = q('.f-servico').value.trim();
            const servEncontrado = catalogo.find(c => c.nome_servico.toLowerCase() === nomeServ.toLowerCase());
            const mod = { custo: mo }; if (expr.includes('+')) mod.expressao = expr;
            return {
                servico_id: servEncontrado?.id ?? null,
                servico: nomeServ, tipo: q('.f-tipo').value.trim() || 'Mão de Obra',
                improvisado: q('.f-impr').checked, subtotal: (cobrada ? peca : 0) + mo,
                detalhes: { causaDoProblema: q('.f-causa').value.trim() || null, peca: { nome: q('.f-peca-nome').value.trim() || null, custo: peca, cobrada }, maoDeObra: mod },
            };
        }).filter(i => i.servico);

        let sp = 0, sm = 0, bPeca = 0, bImpr = 0;
        itens.forEach(i => {
            const p = i.detalhes.peca, m = i.detalhes.maoDeObra.custo;
            bPeca += p.custo; if (p.cobrada) sp += p.custo; sm += m; if (i.improvisado) bImpr += m;
        });
        const bases = { peca: bPeca, mao_de_obra: sm, mao_de_obra_improvisada: bImpr, servico_total: bPeca + sm };

        const lerTaxas = cont => [...$(cont).children].map(r => {
            const q = s => r.querySelector(s);
            const tipo = q('.f-tipo').value, v = num(q('.f-valor').value), sigla = q('.f-sigla').value.trim();
            const t = { nome: q('.f-nome').value.trim() || sigla, sigla, tipo, justificativa: q('.f-just').value.trim() };
            if (tipo === 'percentual') { t.base = q('.f-base').value; t.percentual = v; t.custo = ceil(bases[t.base] * v / 100); }
            else t.custo = v;
            return t;
        }).filter(t => t.nome);

        const taxas = lerTaxas('f-taxas'), ocultas = lerTaxas('f-ocultas');
        let gorjeta = null; const gt = $('f-g-tipo').value, gv = num($('f-g-valor').value);
        if (gt && gv > 0) {
            gorjeta = gt === 'percentual'
                ? { tipo: gt, percentual: gv, custo: ceil(bases.servico_total * gv / 100), justificativa: 'Gorjeta do Cliente' }
                : { tipo: gt, custo: gv, justificativa: 'Gorjeta do Cliente' };
        }
        const soc = a => a.reduce((s, t) => s + t.custo, 0);
        const fixas = soc(taxas.filter(t => t.tipo !== 'percentual'));
        const oc = soc(ocultas);
        const adic = soc(taxas.filter(t => t.tipo === 'percentual')) + (gorjeta?.custo || 0) + oc;
        const fin = { subtotalPecas: sp, subtotalMaoDeObra: sm, subtotalTaxasFixas: fixas, subtotalAdicionais: adic, subtotalTaxasOcultas: oc, moeda: 'Créditos Galácticos', total: sp + sm + fixas + adic };
        return { itens, taxas, ocultas, gorjeta, fin };
    }

    function atualizarResumo() {
        const { fin, taxas, ocultas, itens, gorjeta } = lerFormulario();
        const l = (t, v) => `<div><span>${t}</span><strong>${fmt(v)}</strong></div>`;
        $('f-resumo').innerHTML = l('Peças', fin.subtotalPecas) + l('Mão de obra', fin.subtotalMaoDeObra) + l('Taxas fixas', fin.subtotalTaxasFixas)
            + l('Adicionais', fin.subtotalAdicionais - fin.subtotalTaxasOcultas) + (ocultas.length ? l('Taxas ocultas', fin.subtotalTaxasOcultas) : '')
            + `<div class="os-total"><span>Total</span><strong>${fmt(fin.total)} créditos</strong></div>`;
        sugerirTermos([...taxas, ...ocultas]);
        renderizarPreviaAoVivo(fin, itens, taxas, ocultas, gorjeta);
    }

    function renderizarPreviaAoVivo(fin, itens, taxas, ocultas, gorjeta) {
        const container = $('f-live-preview');
        if (!container) return;

        const titulo = $('f-titulo').value.trim() || 'Sem título';
        const cliNome = $('f-cli-nome').value.trim() || 'Não informado';
        const cliAfil = $('f-cli-afil').value.trim() || 'Não informada';
        const idPrevia = $('f-id-previa').textContent;
        const mecs = [...$('f-mecanicos').querySelectorAll('input:checked')].map(i => i.value).join(', ') || 'Nenhum selecionado';
        const relatorio = $('f-relatorio').value.trim();

        const servicosLista = itens.length 
            ? itens.map(i => `<li class="flex justify-between border-b border-[#2a3d35]/50 py-1"><span>• <strong>${esc(i.servico)}</strong> (${esc(i.tipo)})</span><span class="text-[#a8f5c0]">${fmt(i.subtotal)} cr</span></li>`).join('')
            : '<li class="text-[#6a857a] italic">Nenhum serviço adicionado até o momento.</li>';

        const totalTaxas = [...taxas, ...(isMestre ? ocultas : [])];
        const taxasLista = totalTaxas.length
            ? totalTaxas.map(t => `<li class="flex justify-between text-[11px] text-[#6a857a]"><span>+ ${esc(t.nome)} (${esc(t.sigla || 'Taxa')})</span><span>${fmt(t.custo)} cr</span></li>`).join('')
            : '';

        container.innerHTML = `
            <div class="border-b border-[#2a3d35] pb-2 mb-2 flex justify-between items-center">
                <span class="text-[#7bcf9a] font-bold text-sm tracking-wide">${esc(titulo)}</span>
                <span class="text-[#5a9e74] font-mono text-xs">${esc(idPrevia)}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-[11px] text-[#c8ddd5] mb-2 bg-[#0d0f0e]/60 p-2 rounded">
                <div><strong>Cliente:</strong> ${esc(cliNome)} (${esc(cliAfil)})</div>
                <div><strong>Mecânicos:</strong> ${esc(mecs)}</div>
            </div>
            ${relatorio ? `<div class="text-[11px] text-[#6a857a] mb-2 italic">"${esc(relatorio)}"</div>` : ''}
            <div>
                <strong class="text-[#5a9e74] uppercase text-[10px] tracking-wider">Serviços:</strong>
                <ul class="mt-1 space-y-0.5">${servicosLista}</ul>
            </div>
            ${taxasLista ? `<div class="mt-2"><strong class="text-[#5a9e74] uppercase text-[10px] tracking-wider">Taxas:</strong><ul class="mt-1 space-y-0.5">${taxasLista}</ul></div>` : ''}
            ${gorjeta ? `<div class="mt-1 text-[11px] text-[#6a857a] flex justify-between"><span>Gorjeta:</span><span>${fmt(gorjeta.custo)} cr</span></div>` : ''}
            <div class="mt-3 pt-2 border-t border-[#3a6b50] flex justify-between text-[#a8f5c0] font-bold text-sm">
                <span>Total Estimado:</span>
                <span>${fmt(fin.total)} Créditos Galácticos</span>
            </div>
        `;
    }

    function sugerirTermos(todasTaxas) {
        const siglas = todasTaxas.map(t => t.sigla);
        TERMOS_AUTO.forEach(t => {
            const cb = document.querySelector(`[data-termo="${t.id}"]`);
            if (cb.dataset.tocado) return;
            cb.checked = t.siglas.some(s => siglas.includes(s)) || (t.sigiloso && $('f-sigiloso').checked);
        });
    }

    let previaToken = 0;
    async function atualizarPrevia() {
        const sigla = $('f-localidade').value.trim().toUpperCase();
        const ano = $('f-ano').value;
        const el = $('f-id-previa');
        if (!sigla || ano === '') { el.textContent = 'defina localidade e ano'; return; }
        const tok = ++previaToken;
        const { data } = await supabaseClient.from('ordens_servico').select('serie')
            .eq('ano_aby', Number(ano)).eq('sigla_localidade', sigla).order('serie', { ascending: false }).limit(1);
        if (tok !== previaToken) return;
        el.textContent = `OS-${pad(Number(ano), 2)}-${sigla}-${pad((data?.[0]?.serie || 0) + 1, 3)}`;
    }

    function abrirFormulario() {
        $('os-form').reset();
        ['f-servicos', 'f-taxas', 'f-ocultas'].forEach(i => $(i).innerHTML = '');
        document.querySelectorAll('[data-termo]').forEach(cb => { delete cb.dataset.tocado; cb.checked = false; });
        $('f-servicos').appendChild(linhaServico());
        $('f-msg').textContent = '';$('f-id-previa').textContent = 'defina localidade e ano';
        atualizarResumo();
        $('os-dialog').showModal();
    }

    function ligarFormulario() {
        const form = $('os-form');$('btn-nova-os').addEventListener('click', abrirFormulario);
        $('f-cancelar').addEventListener('click', () =>$('os-dialog').close());
        $('f-add-servico').addEventListener('click', () => {$('f-servicos').appendChild(linhaServico()); atualizarResumo(); });
        $('f-add-taxa').addEventListener('click', () => {$('f-taxas').appendChild(linhaTaxa()); atualizarResumo(); });
        $('f-add-oculta').addEventListener('click', () => {$('f-ocultas').appendChild(linhaTaxa()); atualizarResumo(); });
        $('f-localidade').addEventListener('input', atualizarPrevia);$('f-ano').addEventListener('input', atualizarPrevia);
        document.querySelectorAll('[data-termo]').forEach(cb => cb.addEventListener('change', () => cb.dataset.tocado = '1'));

        form.addEventListener('click', e => {
            const x = e.target.closest('.os-x');
            if (x) { x.closest('.os-row').remove(); atualizarResumo(); }
        });

        form.addEventListener('change', e => {
            const row = e.target.closest('.os-row');
            if (row && row.dataset.row === 'taxa') {
                row.querySelector('.f-base').disabled = row.querySelector('.f-tipo').value !== 'percentual';
            }
            atualizarResumo();
        });

        form.addEventListener('input', e => {
            const row = e.target.closest('.os-row');
            
            // Autocomplete de Serviço
            if (row && e.target.classList.contains('f-servico')) {
                const s = catalogo.find(item => item.nome_servico.toLowerCase() === e.target.value.trim().toLowerCase());
                if (s) {
                    const q = c => row.querySelector(c);
                    q('.f-peca-nome').value = s.peca || '';
                    q('.f-peca-custo').value = s.preco_componentes || 0;
                    q('.f-mo').value = s.mao_de_obra || 0;
                    q('.f-tipo').value = (s.preco_componentes > 0 || s.peca) ? 'Peça e Mão de Obra' : 'Mão de Obra';
                }
            }

            // Autocomplete de Taxas
            if (row && e.target.classList.contains('f-sigla')) {
                const p = TAXAS_PRESET.find(item => item.sigla.toLowerCase() === e.target.value.trim().toLowerCase());
                if (p) {
                    const q = c => row.querySelector(c);
                    q('.f-nome').value = p.nome;
                    q('.f-tipo').value = p.tipo;
                    q('.f-valor').value = p.valor;
                    q('.f-just').value = p.just;
                    if (p.base) q('.f-base').value = p.base;
                    q('.f-base').disabled = p.tipo !== 'percentual';
                }
            }

            atualizarResumo();
        });

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const msg = $('f-msg'); msg.className = 'os-msg';
            const { itens, taxas, ocultas, gorjeta, fin } = lerFormulario();
            const mecanicos = [...$('f-mecanicos').querySelectorAll('input:checked')].map(i => i.value);
            const ano = $('f-ano').value, sigla = $('f-localidade').value.trim().toUpperCase(), titulo =$('f-titulo').value.trim();
            const erro = !titulo ? 'Informe o título.' : !sigla ? 'Escolha a localidade.' : ano === '' ? 'Informe o ano (ABY).'
                : !mecanicos.length ? 'Escolha ao menos um mecânico responsável.' : !itens.length ? 'Adicione ao menos um serviço.'
                : !$('f-cli-nome').value.trim() ? 'Informe o nome do cliente.' : '';
            if (erro) { msg.textContent = erro; msg.classList.add('os-msg-erro'); return; }

            const autos = TERMOS_AUTO.filter(t => document.querySelector(`[data-termo="${t.id}"]`).checked).map(t => t.texto);
            const manual = $('f-termos-manual').value.trim();
            const termos = [...autos, manual].filter(Boolean).join(' ') || 'Sem termos adicionais.';
            const { data: u } = await supabaseClient.auth.getUser();

            const payload = {
                ano_aby: Number(ano), sigla_localidade: sigla, localidade: locais.find(l => l.sigla === sigla)?.nome || sigla,
                data_texto: `${Number(ano)} ABY`, sigiloso: $('f-sigiloso').checked, status:$('f-status').value, titulo,
                mecanicos, unidade_responsavel: $('f-unidade').value.trim() || null,
                cliente: { nome: $('f-cli-nome').value.trim(), afiliacao:$('f-cli-afil').value.trim() || 'Não informado', contato_holonet: $('f-cli-contato').value.trim() || 'Não informado' },
                relatorio_problema: $('f-relatorio').value.trim(), notas_mecanico:$('f-notas').value.trim(),
                itens, taxas, taxas_ocultas: ocultas, gorjeta, financeiro: fin,
                termos_automaticos: autos, termos_manuais: manual || null, termos,
                created_by: u?.user?.id,
            };
            $('f-salvar').disabled = true;
            const { data, error } = await supabaseClient.from('ordens_servico').insert([payload]).select('id').single();
            $('f-salvar').disabled = false;
            if (error) { msg.textContent = 'Erro ao salvar: ' + error.message; msg.classList.add('os-msg-erro'); return; }
            $('os-dialog').close();
            await recarregar(data.id);
        });
    }

    // ---------- Início ----------
    isMestre = await verificarMestre();
    if (isMestre) {
        $('secao-sigilosa').classList.remove('hidden');$('btn-nova-os').classList.remove('hidden');
        await carregarApoio();
        montarFormulario();
        ligarFormulario();
    }
    await carregarOrdens();
    renderListas();
});