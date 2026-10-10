/* =====================================================================
   sugestoes.js — Sugestor de siglas, gírias e falas por contexto
   O usuário descreve uma situação em texto livre. O texto é mapeado em
   "conceitos" (cliente, preço, droide, fornecedor...) e cada registro
   do léxico recebe uma pontuação pelo quanto combina com eles.
   Expõe: Lexico.sugerir(texto, opts) e Lexico.sugestorExecutar(texto)
   ===================================================================== */
(function () {
  'use strict';

  const L = window.Lexico;
  if (!L) return;
  const fold = L.fold, esc = L.esc;
  const K = (window.DURTOC_DEFAULTS || {}).CAT || {};

  /* ---------- Conceitos ----------
     kw: prefixos (sem acento). "=palavra" exige palavra exata.
     Termos com espaço são procurados no texto inteiro.
     cats: categorias do léxico que costumam combinar com o conceito. */
  const c = (id, label, kw, cats) => ({ id: id, label: label, kw: kw, cats: (cats || []).filter(Boolean) });

  const CONCEITOS = [
    c('cliente', 'cliente', ['client', 'piloto', 'dono', '=fregues', 'propriet', 'comprador', 'consumidor', 'visita'], [K.PC, K.IC]),
    c('preco', 'preço e cobrança', ['prec', '=caro', '=cara', 'cobr', '=conta', 'credit', 'descont', '=pagar', 'pagament', 'taxa', '=valor', 'orcament', 'barato', '=custo', 'custar', 'dinheiro', 'mao fechada', 'sovin'], [K.IC]),
    c('pressa', 'pressa e prazo', ['press', 'rapid', 'urgen', 'atras', 'prazo', 'amanha', 'depress', 'imediat', 'para ontem'], [K.PC]),
    c('diy', 'cliente que mexeu sozinho', ['sozinho', 'conta propria', 'jeitinho', 'mexeu', 'mexer', 'amador', 'interferi', 'caseiro', 'tentou consertar'], [K.CP]),
    c('peca', 'peça ruim ou errada', ['peca', 'componente', 'qualidade', 'fabric', 'original', 'defeituos', 'vagabund', 'recondicion', 'usada', 'sucata', 'jawa', 'imitac'], [K.CP]),
    c('droide', 'droides', ['droi', 'robo', 'astromec', 'protocolo', 'memoria', 'restritor', 'comboio', 'bruto', '=tino', '=vok', '=vox'], [K.MD]),
    c('lento', 'lentidão', ['lent', 'devagar', 'demor', 'ineficien', 'travad', 'tartaruga', 'moroso'], [K.CF]),
    c('fornecedor', 'fornecedor e entrega', ['fornecedor', 'entrega', 'remessa', 'lote', 'encomenda', 'mercado', 'pedido', 'estoque', 'importad', 'jakku', 'bespin', 'malastare', 'jedha', 'crait', 'kessel', 'endor'], [K.NF]),
    c('misterio', 'defeito misterioso', ['mister', 'aleatori', 'sem causa', 'inexplic', 'fantasma', 'intermit', 'sem explicacao', 'diagnostic', 'sensor', 'sensores', 'aparentemente'], [K.TD]),
    c('recorrente', 'defeito que volta', ['recorr', 'voltou', 'volta', 'novamente', 'repet', 'persist', 'de novo', 'sempre o mesmo'], [K.TD]),
    c('perigo', 'perigo e emergência', ['perig', 'explod', 'instavel', 'superaquec', 'risco', 'evacu', 'curto', 'reator', 'colaps', 'critic', 'emergenc', 'travou'], [K.TD, K.SR]),
    c('improviso', 'improviso e gambiarra', ['improvis', 'gambiarr', 'remend', 'adapt', 'tapa', 'provisor', 'temporar', 'alternativ', 'invent', 'sem peca', 'nao tem peca', 'macete', 'jeito'], [K.SR, K.GI]),
    c('sigilo', 'sigilo e peça ilegal', ['sigil', 'segred', 'discre', 'registr', 'ilegal', 'roubad', 'contrabando', 'oculta', 'clandestin', 'fora dos', 'proibid', 'mercado sombrio', 'jammer', 'numero de serie'], [K.DC]),
    c('burocracia', 'burocracia imperial', ['burocr', 'formular', 'autoriz', 'imperi', 'aprovac', 'licenca', 'norma', 'papelada'], [K.SR, K.CF]),
    c('confundir', 'impressionar o cliente', ['enganar', 'confundir', 'impression', 'complicad', 'justificar', 'leigo', 'ofuscar', 'cobrar mais', 'soar tecnico', 'parecer tecnico'], [K.SC]),
    c('tedio', 'tédio e oficina parada', ['tedio', 'entedi', 'sem servico', 'silenc', 'parado', 'parada', 'vazio', 'quieto', 'monoton', 'nada para fazer', 'nada pra fazer'], [K.TB]),
    c('admiracao', 'admiração técnica', ['admir', 'bonito', 'perfeit', 'elegan', 'obra de arte', 'incrivel', 'maravilh', 'orgulh', 'satisf', 'funcionou', 'encaixou', 'poesia'], [K.PA]),
    c('lamento', 'máquina perdida', ['irrepar', 'sucata', 'morto', 'morta', 'frita', 'perdid', 'luto', 'acabou', 'sem conserto', 'destru', 'rachad', 'lament', 'trist', 'nao tem conserto'], [K.LF]),
    c('nave', 'nave e motor', ['nav', 'cargueir', 'caca', 'fragata', 'motor', 'reator', 'hiperespaco', 'hipermotor', 'casco', 'blindagem', 'escudo', 'propuls'], [K.MD, K.TR]),
    c('tripulacao', 'tripulação', ['tripul', '=tino', '=vok', '=vox', 'bruto', 'comboio', 'ajudante', 'equipe', 'assistente'], [K.TR]),
    c('estatura', 'estatura', ['estatur', 'altura', 'baixinho', 'gigante', 'grandalhao', 'tamanho', 'olhando de cima', 'de cima', 'pequeno'], [K.ES]),
    c('navegacao', 'navegação e voo', ['navega', 'pouso', 'rota', 'curso', 'comunic', 'chamada', 'trafego', 'coruscant', 'vetor', 'salto', 'canal', 'voando', 'viagem'], [K.NV]),
    c('cafe', 'café', ['cafe', 'cafeina', 'caneca', 'bebida'], []),
    c('gabolice', 'orgulho de ofício', ['orgulh', 'genio', 'gabar', 'especialista', 'engenheir', 'competen', 'habilidad', 'me achar', 'melhor mecanico'], [K.FT]),
    c('garantia', 'garantia e culpa', ['garant', 'quebrou de novo', 'responsab', 'culpa'], [K.IC]),
    c('palpite', 'palpite e curioso', ['palpit', 'opini', 'tutorial', 'holonet', 'holovideo', 'intromet', 'atrapalh', 'curios', 'ajudar', 'sabe tudo'], [K.PC, K.IC]),
    c('ferramenta', 'ferramenta sumida', ['ferrament', 'sumiu', 'perdi', 'bancada', 'chave de torque', 'organiz', 'bagunc'], [K.CF]),
    c('incompat', 'incompatibilidade', ['incompat', 'padroniz', 'diferentes modelos', 'outro modelo', 'fabricantes', 'nao encaixa', 'compativel', 'misturar'], [K.CP, K.CF]),
    c('operador', 'piloto incompetente', ['operador', 'nao sabe pilotar', 'burro', 'ignorant', 'inept', 'bateu', 'asteroide', 'piloto ruim', 'amador'], [K.CP, K.PC]),
    c('insulto', 'insulto e bronca', ['insult', 'xing', 'ofend', 'idiot', 'tolo', 'imbecil', 'estupid', 'bronca', 'cala a boca'], [K.GI]),
    c('barulho', 'barulho e vazamento', ['barulh', 'ruido', 'zumbid', 'vibra', 'tosse', 'vazament', 'vazando', 'oleo', 'fumac', 'cheiro', 'engasg'], [K.GI]),
    c('velho', 'tecnologia antiga', ['antig', 'velh', 'obsolet', 'arcaic', 'republica', 'aposent', 'ferrugem'], [K.GI]),
    c('qualidade', 'trabalho de qualidade', ['durab', 'perform', 'eficien', 'upgrade', 'otimiz', 'superior', 'melhor que', 'refinad'], [K.SR]),
    c('silencio', 'silêncio e conversa demais', ['calar', 'tagarel', 'conversa demais', 'falando demais', 'explica demais', 'quieto'], [K.IC]),
    c('diagnostico', 'diagnóstico', ['diagnost', 'scanner', 'escanea', 'analis', 'investig', 'descobrir'], [K.TD, K.GI])
  ];

  const STOP = {};
  ('para com que uma uns umas dos das nos nas como mais muito muita quando sobre isso esse essa esta este ele ela eles elas ' +
   'seu sua seus suas meu minha nao sim por pra mas ainda ate tem ter foi era ser estar estao fica fazer faz vai vou quer ' +
   'querendo esta estou esse nesse nessa uma qual quais onde algo alguem tudo todo toda cada outro outra sem depois antes ' +
   'ficou ficar sendo mesmo mesma tambem entao porque pois isto aquele aquela aqui ali la quem viu servico oficina mandou ' +
   'dando dar quero falando maquina coisa pode podem preciso precisa').split(' ').forEach(w => { STOP[w] = 1; });

  const tokens = s => fold(s).split(/[^a-z0-9]+/).filter(Boolean);

  function kwHit(kw, words, text) {
    if (kw.indexOf(' ') > -1) return text.indexOf(kw) > -1;
    if (kw.charAt(0) === '=') return words.indexOf(kw.slice(1)) > -1;
    for (let i = 0; i < words.length; i++) if (words[i].indexOf(kw) === 0) return true;
    return false;
  }

  /* ---------- Informação por registro (em cache) ---------- */
  const cache = new WeakMap();
  function info(it) {
    let r = cache.get(it);
    if (r) return r;
    const texto = fold([it.termo, it.significado, it.texto, it.cena, it.definicao, (it.exemplos || []).join(' ')].filter(Boolean).join(' '));
    const words = tokens(texto);
    const ch = {};
    CONCEITOS.forEach(cc => {
      let n = 0;
      cc.kw.forEach(k => { if (kwHit(k, words, texto)) n++; });
      if (n) ch[cc.id] = n;
    });
    r = {
      words: words, ch: ch,
      termo: it.termo ? fold(it.termo).replace(/[^a-z0-9]/g, '') : '',
      tags: (it.tags || []).map(fold)
    };
    cache.set(it, r);
    return r;
  }

  function pontuar(it, ctx) {
    const inf = info(it);
    let s = 0;
    const mot = [];
    ctx.ativos.forEach(a => {
      const n = Math.min(3, inf.ch[a.c.id] || 0);
      const catHit = a.c.cats.indexOf(it.categoria) > -1;
      const tagHit = inf.tags.some(t => t === a.c.id || a.c.kw.some(k => kwHit(k, [t], t)));
      let v = n * 1.2 + (catHit ? (n > 0 ? 3 : 1) : 0) + (tagHit ? 2.5 : 0);
      v *= 0.85 + 0.15 * a.forca;
      if (v > 0) { s += v; if (v >= 1.5) mot.push({ l: a.c.label, v: v }); }
    });
    const diretos = [];
    ctx.tokens.forEach(t => {
      if (t.length < 3 || STOP[t]) return;
      if (inf.termo && inf.termo === t) {
        // citar a sigla em maiúsculas (ex.: BIOS) conta muito; a palavra comum, só um pouco
        const citada = ctx.raw.indexOf(it.termo) > -1 || ctx.raw.indexOf(it.termo.replace(/\./g, '')) > -1;
        s += citada ? 8 : 3; diretos.push(it.termo);
      }
      else if (inf.words.indexOf(t) > -1) { s += 2; diretos.push('“' + t + '”'); }
      else if (t.length >= 5 && inf.words.some(w => w.length >= 5 && (w.indexOf(t) === 0 || t.indexOf(w) === 0))) s += 1;
    });
    mot.sort((a, b) => b.v - a.v);
    const motivos = mot.slice(0, 3).map(m => m.l);
    diretos.slice(0, 2).forEach(d => { if (motivos.indexOf(d) < 0) motivos.push(d); });
    return { s: s, motivos: motivos };
  }

  /* ---------- API ---------- */
  L.CONCEITOS = CONCEITOS;
  L.sugerir = function (texto, opts) {
    opts = opts || {};
    const tipos = opts.tipos || ['sigla', 'giria', 'expressao'];
    const jit = opts.jitter == null ? 0.3 : opts.jitter;
    const por = opts.porGrupo || (tipos.length === 1 ? 6 : 3);
    const text = fold(texto), tk = tokens(texto);
    const ativos = [];
    CONCEITOS.forEach(cc => {
      let h = 0;
      cc.kw.forEach(k => { if (kwHit(k, tk, text)) h++; });
      if (h) ativos.push({ c: cc, forca: Math.min(2, h) });
    });
    const ctx = { tokens: tk, ativos: ativos, raw: String(texto || '') };
    const minimo = ativos.length ? 2.5 : 1.5;
    const grupos = {};
    tipos.forEach(t => { grupos[t] = []; });
    L.items().forEach(it => {
      if (tipos.indexOf(it.tipo) < 0) return;
      const r = pontuar(it, ctx);
      if (r.s < minimo) return;
      let sc = r.s + Math.random() * jit * 3;
      if (opts.excluir && opts.excluir.has(it.id)) sc -= 4;
      grupos[it.tipo].push({ item: it, score: sc, bruto: r.s, motivos: r.motivos });
    });
    let max = 0, total = 0;
    tipos.forEach(t => {
      grupos[t].sort((a, b) => b.score - a.score);
      grupos[t] = grupos[t].slice(0, por);
      grupos[t].forEach(x => { if (x.bruto > max) max = x.bruto; total++; });
    });
    tipos.forEach(t => grupos[t].forEach(x => { x.afinidade = Math.max(1, Math.min(5, Math.ceil(5 * x.bruto / (max || 1)))); }));
    return { grupos: grupos, conceitos: ativos.map(a => a.c.label), total: total };
  };

  /* ---------- Interface ---------- */
  if (typeof document === 'undefined') return;

  const SITUACOES = [
    'Cliente reclamando do preço',
    'Cliente com pressa querendo tudo para ontem',
    'Cliente mexeu sozinho na nave antes de trazer',
    'Peça de péssima qualidade quebrou o sistema',
    'Droide lento atrasando o serviço',
    'Fornecedor atrasou ou mandou peça errada',
    'Reparo improvisado que virou definitivo',
    'Defeito sem explicação nos diagnósticos',
    'Serviço que o cliente quer fora dos registros',
    'Máquina destruída, sem conserto possível',
    'Oficina parada, sem serviço, tédio',
    'Admirando um motor bem projetado',
    'Cliente dando palpite de quem viu tutorial',
    'Burocracia imperial travando uma peça',
    'Falando com a nave ou com o motor',
    'Piloto arrogante olhando de cima'
  ];

  function iniciarUI() {
    const inp = document.getElementById('ctxInput');
    if (!inp) return;
    const out = document.getElementById('sugOut');
    const chipsBox = document.getElementById('ctxChips');
    const mostrados = new Set();
    let ultimo = '';

    const hintHtml = '<p class="sg-sug-hint">Escreva a situação ou toque num atalho acima. Eu procuro no léxico as siglas, gírias e falas que combinam, e explico por que cada uma entrou.</p>';
    out.innerHTML = hintHtml;

    chipsBox.innerHTML = SITUACOES.map(s => `<button type="button" class="sg-chip">${esc(s)}</button>`).join('');
    chipsBox.addEventListener('click', e => {
      const b = e.target.closest('.sg-chip');
      if (!b) return;
      inp.value = b.textContent;
      executar(false);
    });

    const tiposSel = () => Array.prototype.slice.call(document.querySelectorAll('#sugTipos input:checked')).map(i => i.value);

    function pips(n) {
      let s = '';
      for (let i = 1; i <= 5; i++) s += `<i class="${i <= n ? 'on' : ''}"></i>`;
      return `<span class="sg-aff" role="img" aria-label="Afinidade ${n} de 5" title="Afinidade ${n} de 5">${s}</span>`;
    }

    function cardSug(x) {
      const it = x.item;
      const why = x.motivos.length ? `<div class="sg-why"><span>combina por:</span>${x.motivos.map(m => `<em>${esc(m)}</em>`).join('')}</div>` : '';
      let h = `<article class="sg-sug-card sg-t-${it.tipo}" data-id="${esc(it.id)}">`;
      h += `<header><span class="sg-badge-s">${L.TIPOS[it.tipo].rotulo}</span>${pips(x.afinidade)}</header>`;
      if (it.tipo === 'sigla') {
        h += `<div class="sg-sug-term">${esc(it.termo)}</div><p class="sg-sug-mean">${esc(it.significado)}</p>`;
        if (it.exemplos && it.exemplos[0]) h += `<blockquote class="sg-sug-line">“${esc(it.exemplos[0])}”</blockquote>`;
        else if (it.definicao) h += `<p class="sg-sug-mean sg-dim">${esc(it.definicao)}</p>`;
        h += why;
        h += '<footer><button type="button" class="sg-btn sg-mini" data-act="copiar-termo">Copiar sigla</button>';
        if (it.exemplos && it.exemplos[0]) h += '<button type="button" class="sg-btn sg-mini" data-act="copiar-ex">Copiar exemplo</button>';
      } else {
        if (it.cena) h += `<div class="sg-cena">(${esc(it.cena)})</div>`;
        h += `<blockquote class="sg-sug-line sg-sug-main">“${esc(it.texto)}”</blockquote>`;
        h += why;
        h += '<footer><button type="button" class="sg-btn sg-mini" data-act="copiar-fala">Copiar fala</button>';
      }
      h += '<button type="button" class="sg-btn sg-mini" data-act="ver">Ver ficha</button></footer></article>';
      return h;
    }

    function desenhar(res, txt) {
      if (!res.total) {
        out.innerHTML = '<p class="sg-sug-hint">Não achei combinação clara para essa situação. Tente citar quem está envolvido e o problema, por exemplo: cliente, piloto, droide, peça, fornecedor, preço, defeito, nave ou motor.</p>';
        return;
      }
      let h = '';
      if (res.conceitos.length) {
        h += `<p class="sg-sug-ctx">Li a situação como: ${res.conceitos.map(x => `<em>${esc(x)}</em>`).join('')}</p>`;
      }
      const titulos = { sigla: 'Siglas', giria: 'Gírias', expressao: 'Expressões e falas' };
      ['sigla', 'giria', 'expressao'].forEach(t => {
        const g = res.grupos[t];
        if (!g || !g.length) return;
        h += `<div class="sg-sug-group"><h3>${titulos[t]}</h3><div class="sg-sug-cards">${g.map(cardSug).join('')}</div></div>`;
      });
      out.innerHTML = h;
    }

    function executar(reroll) {
      const txt = inp.value.trim();
      if (!txt) { L.toast('Descreva a situação para eu sugerir algo.'); inp.focus(); return; }
      const tipos = tiposSel();
      if (!tipos.length) { L.toast('Marque pelo menos um tipo para sugerir.'); return; }
      if (!reroll || txt !== ultimo) mostrados.clear();
      const res = L.sugerir(txt, { tipos: tipos, jitter: reroll ? 2.5 : 0.3, excluir: reroll ? mostrados : null });
      ultimo = txt;
      tipos.forEach(t => res.grupos[t].forEach(x => mostrados.add(x.item.id)));
      desenhar(res, txt);
      L.emit('sugestao', { n: res.total, ctx: txt });
    }

    document.getElementById('btnSugerir').addEventListener('click', () => executar(false));
    document.getElementById('btnOutras').addEventListener('click', () => executar(true));
    document.getElementById('btnLimparCtx').addEventListener('click', () => {
      inp.value = ''; out.innerHTML = hintHtml; ultimo = ''; mostrados.clear(); inp.focus();
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); executar(false); } });

    out.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const card = b.closest('.sg-sug-card');
      const it = card && L.byId(card.dataset.id);
      if (!it) return;
      switch (b.dataset.act) {
        case 'ver': L.abrir(it.id); break;
        case 'copiar-termo': L.copiar(`${it.termo} — ${it.significado}`, 'Sigla copiada.'); break;
        case 'copiar-ex': L.copiar(it.exemplos[0], 'Exemplo copiado.'); break;
        case 'copiar-fala': L.copiar(it.texto, 'Fala copiada.'); break;
      }
    });

    L.sugestorExecutar = function (texto) {
      inp.value = texto;
      document.getElementById('sugestor').scrollIntoView({ behavior: 'smooth', block: 'start' });
      executar(false);
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarUI);
  else iniciarUI();
})();
