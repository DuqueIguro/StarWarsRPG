/* ===================================================
   CUPOM DE DESCONTO — compartilhado por pages/inventario.html
   e durtoc/inventarioOficina.html
   Depende de: supabaseClient (js/supabase.js) e da RPC consumir_cupom.
   =================================================== */
const CupomDesconto = (() => {
  const TAXA_BRL_PARA_CR = 10000;
  const ROTULO_MOEDA = { AMBAS: 'CR e R$', CREDITOS: 'CR', BRL: 'R$' };

  let aplicado = null;                       // linha de `cupons` (já validada na leitura)
  let feedback = { texto: '', tipo: '' };
  let slotEl = null;
  let aoMudar = () => {};

  const db = () => (typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtCR = v => `${Math.round(v).toLocaleString('pt-BR')} Créditos`;
  const fmtBRL = v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const seAplica = moeda => !!aplicado && (aplicado.moeda === 'AMBAS' || aplicado.moeda === moeda);

  const descontar = (valor, c) => c.tipo_desconto === 'PERCENTAGE'
    ? valor * (1 - Number(c.valor_desconto) / 100)
    : Math.max(0, valor - Number(c.valor_desconto));

  // Recebe o subtotal em créditos e devolve os totais finais nas duas moedas
  const totais = (subtotalCR) => {
    const subtotalBRL = subtotalCR / TAXA_BRL_PARA_CR;
    const finalCR = seAplica('CREDITOS')
      ? Math.max(0, Math.round(descontar(subtotalCR, aplicado)))
      : subtotalCR;
    const finalBRL = seAplica('BRL')
      ? Math.max(0, Math.round(descontar(subtotalBRL, aplicado) * 100) / 100)
      : subtotalBRL;
    return {
      subtotalCR, subtotalBRL, finalCR, finalBRL,
      descontoCR: subtotalCR - finalCR,
      descontoBRL: subtotalBRL - finalBRL
    };
  };

  const rotuloDesconto = c => {
    if (c.tipo_desconto === 'PERCENTAGE') return `-${Number(c.valor_desconto)}%`;
    const v = Number(c.valor_desconto).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
    if (c.moeda === 'AMBAS') return `-${v} CR / R$ ${v}`;
    return `-${v} ${c.moeda === 'BRL' ? 'R$' : 'CR'}`;
  };

  const erroRPC = msg => {
    if (msg.includes('CUPOM_ESGOTADO')) return 'Este cupom já atingiu o limite de usos.';
    if (msg.includes('CUPOM_INVALIDO')) return 'Cupom inválido ou desativado.';
    if (msg.includes('CUPOM_MOEDA_INVALIDA')) return 'Este cupom não se aplica a este método de pagamento.';
    return 'Falha ao registrar o cupom na HoloNet.';
  };

  // Validação de exibição (a validação definitiva acontece na RPC, no checkout)
  const aplicar = async (codigoDigitado) => {
    const codigo = (codigoDigitado || '').trim().toUpperCase();
    if (!codigo) return { ok: false, msg: 'Informe um código.' };

    const { data, error } = await db()
      .from('cupons')
      .select('codigo, moeda, tipo_desconto, valor_desconto, limite_usos, vezes_usado, is_ativo')
      .eq('codigo', codigo)
      .maybeSingle();

    if (error) return { ok: false, msg: 'Falha de comunicação com a HoloNet.' };
    if (!data || !data.is_ativo) return { ok: false, msg: 'Código inválido ou desativado.' };
    if (data.limite_usos !== null && data.vezes_usado >= data.limite_usos) {
      return { ok: false, msg: 'Este cupom já atingiu o limite de usos.' };
    }

    aplicado = data;
    return { ok: true, msg: `Cupom ${codigo} aplicado` };
  };

  // Chamado no checkout. moeda = 'CREDITOS' ou 'BRL'
  const consumir = async (moeda) => {
    if (!seAplica(moeda)) return { ok: true };

    const { error } = await db().rpc('consumir_cupom', { p_codigo: aplicado.codigo, p_moeda: moeda });
    if (error) {
      const msg = erroRPC(error.message || '');
      if (/CUPOM_(ESGOTADO|INVALIDO)/.test(error.message || '')) {
        aplicado = null;
        feedback = { texto: msg, tipo: 'erro' };
        renderBox();
        aoMudar();
      }
      return { ok: false, msg };
    }
    return { ok: true };
  };

  const renderBox = () => {
    if (!slotEl) return;

    if (aplicado) {
      slotEl.innerHTML = `
        <div class="cupom">
          <div class="cupom-applied">
            <span>
              <span class="cupom-code">${esc(aplicado.codigo)}</span>
              <span class="cupom-desc">${rotuloDesconto(aplicado)} · ${ROTULO_MOEDA[aplicado.moeda] || aplicado.moeda}</span>
            </span>
            <button type="button" class="cupom-remove" aria-label="Remover cupom">×</button>
          </div>
          <p class="cupom-msg ${feedback.tipo}">${esc(feedback.texto)}</p>
        </div>`;
      slotEl.querySelector('.cupom-remove').addEventListener('click', () => {
        aplicado = null;
        feedback = { texto: '', tipo: '' };
        renderBox();
        aoMudar();
      });
      return;
    }

    slotEl.innerHTML = `
      <div class="cupom">
        <div class="cupom-row">
          <input type="text" class="cupom-input" maxlength="20" placeholder="Cupom" autocomplete="off" spellcheck="false" aria-label="Código do cupom">
          <button type="button" class="cupom-btn">Aplicar</button>
        </div>
        <p class="cupom-msg ${feedback.tipo}">${esc(feedback.texto)}</p>
      </div>`;

    const input = slotEl.querySelector('.cupom-input');
    const btn = slotEl.querySelector('.cupom-btn');
    const msgEl = slotEl.querySelector('.cupom-msg');

    const acao = async () => {
      btn.disabled = true;
      const r = await aplicar(input.value);
      btn.disabled = false;
      if (r.ok) {
        feedback = { texto: r.msg, tipo: 'ok' };
        renderBox();
        aoMudar();
      } else {
        feedback = { texto: r.msg, tipo: 'erro' };
        msgEl.className = 'cupom-msg erro';
        msgEl.textContent = r.msg;
      }
    };

    btn.addEventListener('click', acao);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); acao(); }
    });
  };

  // Atualiza os dois spans de total, mostrando o valor original riscado quando há desconto
  const renderTotais = (subtotalCR, elCR, elBRL) => {
    const t = totais(subtotalCR);
    elCR.innerHTML = t.descontoCR > 0
      ? `<s class="cupom-old">${fmtCR(t.subtotalCR)}</s>${fmtCR(t.finalCR)}`
      : fmtCR(t.finalCR);
    elBRL.innerHTML = t.descontoBRL > 0
      ? `<s class="cupom-old">${fmtBRL(t.subtotalBRL)}</s>${fmtBRL(t.finalBRL)}`
      : fmtBRL(t.finalBRL);
  };

  const montar = (slot, onChange) => {
    slotEl = slot;
    aoMudar = onChange || (() => {});
    renderBox();
  };

  const limpar = () => {
    aplicado = null;
    feedback = { texto: '', tipo: '' };
    renderBox();
  };

  const descricaoLog = moeda => seAplica(moeda) ? ` Cupom [${aplicado.codigo}] aplicado.` : '';

  return { montar, totais, renderTotais, consumir, limpar, descricaoLog, fmtBRL };
})();