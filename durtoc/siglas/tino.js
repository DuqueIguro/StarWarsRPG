/* =====================================================================
   tino.js — Droide-guia da página (Tino, assistente da oficina)
   - Chat de ajuda: explica a página, procura termos, sugere falas
   - Tour guiado com destaque dos elementos
   - Dicas reativas (busca sem resultado, registro salvo, etc.)
   Depende de window.Lexico (siglas.js) e, opcionalmente, do sugestor.
   ===================================================================== */
(function () {
  'use strict';

  const L = window.Lexico;
  if (!L) return;
  const fold = L.fold, esc = L.esc;

  const IMG = '../img/r2d2.ico';
  const K_MUDO = 'durtoc.tino.mudo';
  const K_VISTO = 'durtoc.tino.visto';
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignora */ } };

  const SVG_TINO = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="16" width="36" height="32" rx="10" fill="none" stroke="currentColor" stroke-width="3"/>' +
    '<circle cx="32" cy="32" r="7" fill="currentColor"/><path d="M32 16V8M26 8h12" stroke="currentColor" stroke-width="3" fill="none"/>' +
    '<rect x="20" y="50" width="24" height="6" rx="2" fill="currentColor"/></svg>';
  const avatar = () => `<img src="${IMG}" alt="" loading="lazy">`;

  const $ = (s, r) => (r || document).querySelector(s);

  /* ---------- Estrutura ---------- */
  const root = document.createElement('div');
  root.className = 'tino';
  root.innerHTML =
    '<div class="tino-slot-bubble"></div>' +
    '<section class="tino-panel" id="tinoPanel" hidden aria-label="Tino, droide-guia">' +
      `<header class="tino-head"><div class="tino-av">${avatar()}</div>` +
        '<div><h3>TINO</h3><p>Droide assistente · oficina Dur\'toc</p></div>' +
        '<div class="tino-tools"><button type="button" id="tinoMudo" title="Ligar ou desligar dicas automáticas"></button>' +
        '<button type="button" id="tinoFechar" aria-label="Fechar">✕</button></div></header>' +
      '<div class="tino-msgs" id="tinoMsgs" aria-live="polite"></div>' +
      '<div class="tino-quick" id="tinoQuick"></div>' +
      '<form class="tino-form" id="tinoForm"><input id="tinoInput" type="text" placeholder="Pergunte algo ao Tino…" autocomplete="off" aria-label="Pergunte ao Tino">' +
      '<button type="submit">Enviar</button></form>' +
    '</section>' +
    `<button type="button" class="tino-btn" id="tinoBtn" aria-label="Abrir ajuda do Tino" aria-expanded="false">${avatar()}</button>`;
  document.body.appendChild(root);

  // imagem ausente -> desenho simples
  root.addEventListener('error', e => {
    if (e.target && e.target.tagName === 'IMG') {
      const w = e.target.parentNode;
      w.innerHTML = SVG_TINO;
    }
  }, true);

  const el = {
    btn: $('#tinoBtn'), panel: $('#tinoPanel'), msgs: $('#tinoMsgs'), quick: $('#tinoQuick'),
    form: $('#tinoForm'), input: $('#tinoInput'), mudo: $('#tinoMudo'), slot: $('.tino-slot-bubble', root)
  };
  let mudo = get(K_MUDO) === '1';
  let aberto = false;
  let iniciou = false;
  let ultimaBolha = 0;
  let ultimaAcao = Date.now();
  let dicasDadas = 0;
  let bolhaTimer = null;

  const syncMudo = () => { el.mudo.textContent = mudo ? 'Dicas: desl.' : 'Dicas: lig.'; };
  syncMudo();

  /* ---------- Mensagens ---------- */
  function addMsg(from, html, acoes) {
    const d = document.createElement('div');
    d.className = 'tino-msg tino-' + from;
    d.innerHTML = '<div class="tino-txt">' + html + '</div>';
    if (acoes && acoes.length) {
      const w = document.createElement('div');
      w.className = 'tino-acoes';
      acoes.forEach(a => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = a.t;
        b.addEventListener('click', a.fn);
        w.appendChild(b);
      });
      d.appendChild(w);
    }
    el.msgs.appendChild(d);
    el.msgs.scrollTop = el.msgs.scrollHeight;
    return d;
  }
  function dizer(html, acoes, rapido) {
    const t = addMsg('tino', '…');
    t.classList.add('tino-typing');
    setTimeout(() => {
      t.remove();
      addMsg('tino', html, acoes);
    }, rapido ? 80 : 420);
  }

  /* ---------- Painel ---------- */
  function abrir() {
    aberto = true;
    esconderBolha();
    el.panel.hidden = false;
    el.btn.setAttribute('aria-expanded', 'true');
    el.btn.classList.remove('alerta');
    if (!iniciou) { iniciou = true; saudacao(); }
    setTimeout(() => el.input.focus(), 50);
  }
  function fechar() {
    aberto = false;
    el.panel.hidden = true;
    el.btn.setAttribute('aria-expanded', 'false');
  }
  el.btn.addEventListener('click', () => (aberto ? fechar() : abrir()));
  $('#tinoFechar').addEventListener('click', fechar);
  el.mudo.addEventListener('click', () => {
    mudo = !mudo; put(K_MUDO, mudo ? '1' : '0'); syncMudo();
    dizer(mudo ? 'Certo, chefe. Fico quieto, só respondo quando perguntarem.' : 'Dicas automáticas ligadas. Aviso quando tiver algo útil.', null, true);
  });

  /* ---------- Bolha de aviso ---------- */
  function bolha(html, forcar) {
    if (aberto || (mudo && !forcar)) return;
    const agora = Date.now();
    if (!forcar && agora - ultimaBolha < 9000) return;
    ultimaBolha = agora;
    el.slot.innerHTML = '';
    const b = document.createElement('div');
    b.className = 'tino-bubble';
    b.setAttribute('role', 'status');
    b.innerHTML = '<b>TINO</b><br>' + html + '<button type="button" aria-label="Dispensar">×</button>';
    b.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') { esconderBolha(); return; }
      abrir();
    });
    el.slot.appendChild(b);
    el.btn.classList.add('alerta');
    clearTimeout(bolhaTimer);
    bolhaTimer = setTimeout(esconderBolha, 9000);
  }
  function esconderBolha() { el.slot.innerHTML = ''; clearTimeout(bolhaTimer); }

  /* ---------- Conhecimento ---------- */
  const acaoBusca = { t: 'Ir para a busca', fn: () => { fechar(); L.focarBusca(); } };
  const TOPICOS = [
    { id: 'buscar', k: ['busca', 'buscar', 'procur', 'pesquis', 'achar', 'encontr', 'localiz'],
      r: 'A barra de busca varre tudo: siglas, significados, gírias, exemplos e categorias. Não precisa acentuar, e pode digitar várias palavras: todas precisam aparecer no registro. Atalho: aperte <strong>/</strong> em qualquer ponto da página.',
      a: () => [acaoBusca] },
    { id: 'filtrar', k: ['filtr', 'categoria', 'tipo', 'ordem', 'ordenar', 'separar', 'aba'],
      r: 'As abas escolhem o tipo (Tudo, Siglas, Gírias, Expressões). Depois dá para afinar por categoria, pronúncia e ordem. Os seletores se combinam com a busca.',
      a: () => [
        { t: 'Só siglas', fn: () => { L.setFiltro({ tipo: 'sigla' }); } },
        { t: 'Só soletradas', fn: () => { L.setFiltro({ tipo: 'sigla', pron: 'soletrada' }); } },
        { t: 'Limpar filtros', fn: () => { L.setFiltro({ q: '', tipo: 'todos', cat: 'todas', pron: 'todas', fav: false }); } }
      ] },
    { id: 'pronuncia', k: ['pronunc', 'soletr', 'ouvir', 'voz', 'falar sigla', 'como se le', 'ler sigla'],
      r: 'Siglas escritas com pontos (C.A.F.E., D.O.R.) o chefe soletra, letra por letra, para dar ênfase. As sem pontos (BIOS, FASCA) ele diz como palavra. Na ficha de cada sigla tem o botão <strong>Ouvir</strong>.' },
    { id: 'adicionar', k: ['adicion', 'nova', 'novo', 'criar', 'cadastr', 'inserir', 'incluir', 'acrescent'],
      r: 'Clique em <strong>+ Nova entrada</strong>. Para siglas preciso do termo e do significado; para gírias e expressões, só do texto. Eu aviso se já existir algo igual. Tags ajudam o Sugestor a encontrar o registro depois.',
      a: () => [{ t: 'Abrir formulário', fn: () => { fechar(); L.abrirForm(null); } }] },
    { id: 'editar', k: ['edit', 'alter', 'modific', 'corrig', 'mudar', 'atualiz'],
      r: 'Abra o registro (clique no card) e use <strong>Editar</strong>. As mudanças ficam salvas neste navegador.' },
    { id: 'remover', k: ['remov', 'exclu', 'apag', 'delet', 'desfaz', 'recuper'],
      r: 'Abra o registro e clique em <strong>Excluir</strong>. Logo depois aparece um aviso com <strong>Desfazer</strong> por alguns segundos. Passou disso, só restaurando o padrão ou importando um backup.' },
    { id: 'exportar', k: ['export', 'import', 'backup', 'arquivo', 'json', 'baixar', 'seguranca'],
      r: '<strong>Exportar</strong> baixa um JSON com tudo; <strong>Importar</strong> lê esse arquivo e você escolhe mesclar (entra só o que não existe) ou substituir tudo. As edições ficam no armazenamento do navegador, então exporte de vez em quando para não perder se os dados forem limpos.' },
    { id: 'restaurar', k: ['restaur', 'padrao', 'resetar', 'original', 'zerar'],
      r: '<strong>Restaurar padrão</strong> descarta as suas alterações e volta ao léxico original. Peço confirmação antes, e vale exportar um backup primeiro.' },
    { id: 'favoritos', k: ['favorit', 'estrela'],
      r: 'A estrela no canto do card marca como favorito. O botão <strong>★ Favoritos</strong> mostra só esses.' },
    { id: 'sugestor', k: ['sugestor', 'contexto', 'situac', 'recomend'],
      r: 'O <strong>Sugestor</strong> (mais abaixo) recebe uma situação, como “cliente reclamando do preço”, e devolve siglas, gírias e falas que combinam, explicando o motivo. Os atalhos de situação preenchem o campo para você. <strong>Outras sugestões</strong> embaralha as opções.',
      a: () => [{ t: 'Ir ao Sugestor', fn: () => { fechar(); const s = $('#sugestor'); if (s) s.scrollIntoView({ behavior: 'smooth' }); } }] },
    { id: 'tipos', k: ['diferenc', 'o que sao', 'que sao', 'tipos de'],
      r: '<strong>Sigla</strong>: abreviação do chefe, com significado (quase sempre um xingamento disfarçado). <strong>Gíria</strong>: frase curta de oficina. <strong>Expressão</strong>: fala mais longa, organizada por situação: clientes, fornecedores, navegação, tripulação e por aí vai.' },
    { id: 'atalhos', k: ['atalho', 'teclado', 'tecla'],
      r: '<strong>/</strong> foca na busca. <strong>Esc</strong> fecha janelas (ou limpa a busca). <strong>Enter</strong> abre o card em foco. No Sugestor, <strong>Ctrl + Enter</strong> sugere.' },
    { id: 'visual', k: ['lista', 'grade', 'layout', 'cards', 'visualiz'],
      r: 'Os botões ▦ e ☰ no fim da barra de ações alternam entre cards e lista compacta.' },
    { id: 'tour', k: ['tour', 'tutorial', 'guia', 'passo a passo', 'apresent', 'conhecer'],
      r: 'Posso fazer um tour rápido destacando cada parte da página.',
      a: () => [{ t: 'Iniciar tour', fn: iniciarTour }] },
    { id: 'quem', k: ['quem e voce', 'quem es', 'seu nome', 'quem e tino', 'voce e'],
      r: 'Sou o Tino, droide assistente da oficina. Cuido do léxico do chefe: localizo registros, explico a página e sugiro falas. Motor é com ele.' },
    { id: 'aleatorio', k: ['aleatori', 'surpre', 'sortei', 'curiosidade'],
      r: 'Vou sortear um registro para você.',
      run: () => { L.aleatorio(); } },
    { id: 'ajuda', k: ['ajuda', 'help', 'socorro', 'nao sei', 'o que posso', 'o que voce faz', 'o que voce pode'],
      r: 'Posso explicar a página, procurar um termo (“o que é FASCA?”), sugerir falas para uma situação (“sugira algo para cliente reclamando do preço”) ou fazer um tour.',
      a: () => [{ t: 'Iniciar tour', fn: iniciarTour }] }
  ];

  const RAPIDAS = [
    ['Como busco?', 'como busco'],
    ['Como adiciono?', 'como adiciono'],
    ['Sugestor de falas', 'como funciona o sugestor'],
    ['Soletrada ou palavra?', 'qual a pronuncia'],
    ['Backup', 'como exportar'],
    ['Iniciar tour', 'tour'],
    ['Sigla aleatória', 'aleatorio']
  ];
  el.quick.innerHTML = RAPIDAS.map((r, i) => `<button type="button" data-i="${i}">${esc(r[0])}</button>`).join('');
  el.quick.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (b) perguntar(RAPIDAS[+b.dataset.i][0], RAPIDAS[+b.dataset.i][1]);
  });

  function saudacao() {
    put(K_VISTO, '1');
    dizer('Bom dia, chefe. Sou o <strong>Tino</strong>, assistente da oficina. Posso explicar a página, achar um termo, sugerir uma fala para a situação ou guiar um tour. É só escolher abaixo ou escrever.',
      [{ t: 'Iniciar tour', fn: iniciarTour }], true);
  }

  /* ---------- Interpretação das perguntas ---------- */
  function pontuarTopico(t, q, tk) {
    let s = 0;
    t.k.forEach(k => {
      if (k.indexOf(' ') > -1) { if (q.indexOf(k) > -1) s += 2; }
      else if (tk.some(w => w.indexOf(k) === 0)) s += 1;
    });
    return s;
  }
  const botoesItens = (itens) => itens.map(it => ({
    t: (it.termo || it.texto).slice(0, 34) + ((it.termo || it.texto).length > 34 ? '…' : ''),
    fn: () => L.abrir(it.id)
  }));

  function responder(texto) {
    const q = fold(texto).replace(/\./g, '');
    const tk = q.split(/[^a-z0-9]+/).filter(Boolean);
    const perguntaComo = /\b(como|onde|para que|pra que|serve|funciona)\b/.test(q);
    let melhor = null, ms = 0;
    TOPICOS.forEach(t => { const s = pontuarTopico(t, q, tk); if (s > ms) { ms = s; melhor = t; } });

    // saudação
    if (/^(oi|ola|e ai|bom dia|boa tarde|boa noite|salve|opa)\b/.test(q) && tk.length <= 3) {
      return dizer('Às ordens, chefe. O que precisa?');
    }
    // "como..." + tópico de uso da página
    if (perguntaComo && melhor && ms >= 1 && !/sugir|sugest.*para/.test(q)) return mostrarTopico(melhor);

    // pedido de sugestão
    if (/(sugir|sugest|recomend|indic|o que (falar|dizer|responder)|que (sigla|giria|frase|fala)|qual (sigla|giria|frase|fala)|uma (fala|frase)|situacao|quando (o|a) cliente|cliente (esta|ta|quer|veio|mexeu|reclam))/.test(q) && tk.length >= 3) {
      return sugerirParaContexto(texto);
    }

    // "o que é X?" / sigla solta
    const intencaoBusca = /(o que (e|significa|quer dizer)|significado|defin|explica|que sigla|quem e)/.test(q);
    const achados = L.items().filter(it => it.tipo === 'sigla' && tk.indexOf(fold(it.termo).replace(/[^a-z0-9]/g, '')) > -1);
    if (achados.length && (intencaoBusca || tk.length === 1)) return mostrarSiglas(achados.slice(0, 3));

    if (melhor && ms >= 1) return mostrarTopico(melhor);

    // busca livre no léxico
    const util = tk.filter(w => w.length >= 3);
    if (util.length) {
      const r = L.pesquisar(util.join(' '));
      if (r.length) {
        return dizer(`Achei <strong>${r.length}</strong> registro(s) com “${esc(util.join(' '))}”. Os primeiros:`,
          botoesItens(r.slice(0, 3)).concat([{ t: 'Ver todos na biblioteca', fn: () => { fechar(); L.setFiltro({ q: util.join(' '), tipo: 'todos', cat: 'todas', pron: 'todas', fav: false }); const s = $('#lexico'); if (s) s.scrollIntoView({ behavior: 'smooth' }); } }]));
      }
    }
    dizer('Não captei, chefe. Tente perguntar sobre buscar, filtrar, adicionar, exportar ou o Sugestor. Ou descreva uma situação, tipo “cliente reclamando do preço”, que eu procuro uma fala.',
      [{ t: 'O que você faz?', fn: () => perguntar('O que você faz?', 'ajuda') }]);
  }

  function mostrarTopico(t) {
    if (t.run) { dizer(t.r, null, true); setTimeout(t.run, 300); return; }
    dizer(t.r, t.a ? t.a() : null);
  }

  function mostrarSiglas(lista) {
    const it = lista[0];
    let h = `<strong>${esc(it.termo)}</strong> — ${esc(it.significado)}.`;
    if (it.definicao) h += ' ' + esc(it.definicao);
    h += it.pronuncia === 'soletrada' ? ' <em>(soletrada)</em>' : '';
    const acoes = [{ t: 'Abrir ficha', fn: () => L.abrir(it.id) }];
    if (lista.length > 1) lista.slice(1).forEach(o => acoes.push({ t: 'Ver ' + o.termo, fn: () => L.abrir(o.id) }));
    dizer(h, acoes);
  }

  function sugerirParaContexto(texto) {
    if (!L.sugerir) return dizer('O Sugestor não carregou, chefe. Recarregue a página.');
    const res = L.sugerir(texto, { porGrupo: 2, jitter: 0.2 });
    if (!res.total) {
      return dizer('Não achei combinação boa para isso. Cite quem está envolvido e o problema: cliente, piloto, droide, peça, fornecedor, preço, defeito…');
    }
    const itens = [];
    ['sigla', 'giria', 'expressao'].forEach(t => res.grupos[t].forEach(x => itens.push(x.item)));
    const lido = res.conceitos.length ? `Li como: <strong>${esc(res.conceitos.slice(0, 3).join(', '))}</strong>. ` : '';
    dizer(lido + 'Isto combina:', botoesItens(itens.slice(0, 5)).concat([
      { t: 'Ver tudo no Sugestor', fn: () => { fechar(); if (L.sugestorExecutar) L.sugestorExecutar(texto); } }
    ]));
  }

  function perguntar(exibir, consulta) {
    addMsg('user', esc(exibir));
    responder(consulta || exibir);
  }
  el.form.addEventListener('submit', e => {
    e.preventDefault();
    const v = el.input.value.trim();
    if (!v) return;
    el.input.value = '';
    perguntar(v);
  });

  /* ---------- Tour guiado ---------- */
  const PASSOS = [
    { sel: '#sgSearch', t: 'Busca', r: 'Digite qualquer parte de uma sigla, significado, frase ou categoria. O resultado filtra enquanto você escreve. Atalho: tecla /.' },
    { sel: '#sgTabs', t: 'Tipos', r: 'Alterne entre siglas, gírias e expressões. Os números mostram quantos registros cada tipo tem.' },
    { sel: '#sgFiltros', t: 'Filtros', r: 'Refine por categoria, pronúncia (como palavra ou soletrada), ordem, ou veja só os favoritos.' },
    { sel: '#sgGrid .sg-card', t: 'Cards', r: 'Clique num card para abrir a ficha: definição, exemplos, ouvir a pronúncia, editar ou excluir. A estrela marca favoritos.' },
    { sel: '#btnNovo', t: 'Adicionar', r: 'Cadastre siglas, gírias e falas novas. Edição, exclusão com desfazer, exportar e importar ficam por perto.' },
    { sel: '#sugestor', t: 'Sugestor', r: 'Descreva a situação e receba siglas, gírias e falas que combinam, com o motivo de cada sugestão.' },
    { sel: '#tinoBtn', t: 'Eu', r: 'Eu fico aqui. Pergunte qualquer coisa ou peça uma fala para a situação.' }
  ];
  let tour = null;

  function iniciarTour() {
    fechar();
    esconderBolha();
    if (tour) return;
    const hole = document.createElement('div');
    hole.className = 'tino-hole';
    const tip = document.createElement('div');
    tip.className = 'tino-tip';
    tip.setAttribute('role', 'dialog');
    tip.setAttribute('aria-label', 'Tour da página');
    document.body.appendChild(hole);
    document.body.appendChild(tip);
    tour = { i: -1, hole: hole, tip: tip, alvo: null };
    tip.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.a === 'prox') passo(1);
      else if (b.dataset.a === 'ant') passo(-1);
      else fimTour();
    });
    window.addEventListener('resize', posicionar);
    window.addEventListener('scroll', posicionar, true);
    document.addEventListener('keydown', teclaTour, true);
    passo(1);
  }
  function teclaTour(e) {
    if (!tour) return;
    if (e.key === 'Escape') { e.stopPropagation(); fimTour(); }
    else if (e.key === 'ArrowRight') passo(1);
    else if (e.key === 'ArrowLeft') passo(-1);
  }
  function passo(d) {
    let i = tour.i + d;
    while (i >= 0 && i < PASSOS.length && !document.querySelector(PASSOS[i].sel)) i += d;
    if (i < 0) i = tour.i < 0 ? 0 : tour.i;
    if (i >= PASSOS.length) return fimTour(true);
    tour.i = i;
    const p = PASSOS[i];
    tour.alvo = document.querySelector(p.sel);
    tour.tip.innerHTML = `<h4>${esc(p.t)}</h4><p>${esc(p.r)}</p>` +
      `<div class="tino-tip-nav"><span>${i + 1} de ${PASSOS.length}</span><div>` +
      '<button type="button" class="sg-btn sg-mini" data-a="fim">Sair</button>' +
      (i > 0 ? '<button type="button" class="sg-btn sg-mini" data-a="ant">Voltar</button>' : '') +
      `<button type="button" class="sg-btn sg-btn-primary sg-mini" data-a="prox">${i === PASSOS.length - 1 ? 'Concluir' : 'Próximo'}</button>` +
      '</div></div>';
    tour.alvo.scrollIntoView({ behavior: 'smooth', block: i === 5 ? 'start' : 'center' });
    posicionar();
    setTimeout(posicionar, 420);
    const nx = tour.tip.querySelector('[data-a="prox"]');
    if (nx) nx.focus({ preventScroll: true });
  }
  function posicionar() {
    if (!tour || !tour.alvo) return;
    const r = tour.alvo.getBoundingClientRect();
    const vh = window.innerHeight, vw = window.innerWidth;
    // alvo muito alto (seção inteira): destaca só o topo visível
    const top = Math.max(r.top, 6), bottom = Math.min(r.bottom, vh - 6);
    const h = Math.max(Math.min(bottom - top, vh * 0.55), 28);
    const pad = 6;
    Object.assign(tour.hole.style, { left: (r.left - pad) + 'px', top: (top - pad) + 'px', width: (r.width + pad * 2) + 'px', height: (h + pad * 2) + 'px' });
    const tw = tour.tip.offsetWidth, th = tour.tip.offsetHeight;
    let y = top + h + pad + 12;
    if (y + th > vh - 8) y = Math.max(8, top - pad - th - 12);
    if (y < 8) y = 8;
    let x = Math.min(Math.max(8, r.left), vw - tw - 8);
    // alvo fixo no canto: encosta à direita
    if (tour.alvo.id === 'tinoBtn') { x = vw - tw - 8; y = Math.max(8, top - th - 18); }
    tour.tip.style.left = x + 'px';
    tour.tip.style.top = y + 'px';
  }
  function fimTour(concluiu) {
    if (!tour) return;
    window.removeEventListener('resize', posicionar);
    window.removeEventListener('scroll', posicionar, true);
    document.removeEventListener('keydown', teclaTour, true);
    tour.hole.remove(); tour.tip.remove();
    tour = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    abrir();
    dizer(concluiu ? 'Tour concluído, chefe. Qualquer dúvida, é só chamar.' : 'Tour encerrado. Se quiser retomar, é só pedir.', null, true);
  }

  /* ---------- Reações a eventos da página ---------- */
  const DICAS = [
    'Dica: aperte <b>/</b> para ir direto à busca.',
    'Dica: siglas com pontos o chefe soletra; sem pontos, diz como palavra.',
    'Dica: o Sugestor aceita frases soltas, tipo “cliente mexeu sozinho na nave”.',
    'Dica: exporte o léxico de vez em quando. As edições ficam só neste navegador.',
    'Dica: a estrela no card marca o que você mais usa.',
    'Dica: tags nos seus registros ajudam o Sugestor a achá-los.'
  ];
  let idxDica = Math.floor(Math.random() * DICAS.length);

  document.addEventListener('lexico', e => {
    const d = e.detail || {};
    switch (d.type) {
      case 'busca':
        if (d.q && d.q.length >= 2 && d.n === 0) bolha(`Nada com “${esc(d.q)}”, chefe. Tente menos palavras ou limpe os filtros. Também dá para cadastrar isso como novo registro.`);
        break;
      case 'salvo':
        bolha(d.novo === false ? 'Registro atualizado.' : 'Registro salvo. Se quiser que o Sugestor ache esse item, ajude com algumas tags.');
        break;
      case 'excluido':
        bolha('Excluído. O botão <b>Desfazer</b> fica no aviso por alguns segundos.');
        break;
      case 'sugestao':
        if (d.n === 0) bolha('Não achei combinação clara. Cite quem está envolvido e o problema.');
        break;
      case 'importado':
        bolha('Importação concluída.');
        break;
    }
  });

  ['click', 'keydown', 'input', 'scroll'].forEach(ev =>
    document.addEventListener(ev, () => { ultimaAcao = Date.now(); }, { passive: true, capture: true }));

  // dica por ociosidade
  setInterval(() => {
    if (aberto || mudo || tour || dicasDadas >= 4) return;
    if (Date.now() - ultimaAcao < 60000) return;
    bolha(DICAS[idxDica++ % DICAS.length]);
    dicasDadas++;
    ultimaAcao = Date.now();
  }, 20000);

  // boas-vindas na primeira visita
  if (get(K_VISTO) !== '1') {
    setTimeout(() => bolha('Bom dia, chefe. Sou o <b>Tino</b>. Precisa de ajuda com o léxico? Clique em mim.', true), 1400);
  }

  window.Tino = { abrir: abrir, tour: iniciarTour, dizer: dizer };
})();
