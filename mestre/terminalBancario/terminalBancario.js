/* ===================================================
   DATAPAD BANCÁRIO IMPERIAL - STAR WARS RPG
   =================================================== */

const CONVERSION_RATE_BRL_TO_CREDITS = 10000;

let cupons = [];
let emprestimos = [];
let taxas = [];
let personagensCache = [];
let saldoAtualBanco = 5000000;

function getSupabase() {
  if (typeof supabaseClient !== 'undefined') return supabaseClient;
  if (typeof supabase !== 'undefined' && supabase.from) return supabase;
  if (window.supabase && typeof window.supabase.from === 'function') return window.supabase;
  console.error("ERRO IMPERIAL: Supabase não identificado.");
  return null;
}

document.addEventListener('DOMContentLoaded', async () => {
  iniciarRelogioEmTempoReal();
  await carregarUsuariosCadastrados();
  await carregarTodosOsDados();
});

async function carregarTodosOsDados() {
  await Promise.all([
    carregarDadosBancarios(),
    carregarEmprestimosETaxas(),
    carregarCupons()
  ]);
}

function iniciarRelogioEmTempoReal() {
  const clockElement = document.getElementById('realtime-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    clockElement.innerText = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * REGISTRO UNIVERSAL DE AUDITORIA BANCÁRIA
 */
async function registrarLogBancario({ tipo_evento, descricao, valor_creditos = null, personagem_id = null, dados_adicionais = {} }) {
  const client = getSupabase();
  if (!client) return;

  const { data: { user } } = await client.auth.getUser();

  const payload = {
    user_id: user ? user.id : null,
    personagem_id: personagem_id || null,
    tipo_evento: tipo_evento,
    descricao: descricao,
    valor_creditos: valor_creditos !== null ? Math.round(Number(valor_creditos)) : null,
    dados_adicionais: dados_adicionais
  };

  const { error } = await client.from('log_bancario').insert([payload]);
  if (error) console.error('Erro ao gravar log_bancario:', error.message);
}

/**
 * 1. DROPDOWN DE USUÁRIOS COM FILTRAGEM
 */
async function carregarUsuariosCadastrados() {
  const client = getSupabase();
  if (!client) return;

  const { data: { user } } = await client.auth.getUser();
  const currentUserId = user ? user.id.toLowerCase() : null;

  const DEV_USER_IDS = [
    'c28cf763-c1a9-4f31-b0b8-6bfe296810e2', // Eiden
    '94d1ed61-7955-40d8-a0a1-7733bd716b5d'  // Duque
  ];
  const MESTRE_USER_ID = 'e5fc379a-fc6c-42bb-a3d4-b6984f1693b9';
  const MCMT_SHARED_ID = 'f62b8a03-dbe1-45ed-aadc-68dc2fd3961c';

  const isCurrentUserDev = DEV_USER_IDS.includes(currentUserId);

  const { data, error } = await client
    .from('personagens')
    .select('id, user_id, nome, creditos')
    .order('nome', { ascending: true });

  if (error || !data) return;

  const personagensFiltrados = data.filter(personagem => {
    const pId = (personagem.id || '').toLowerCase();
    const pUserId = (personagem.user_id || '').toLowerCase();
    const pNome = (personagem.nome || '').toUpperCase();

    // Filtra Mestre
    if (pId === MESTRE_USER_ID || pUserId === MESTRE_USER_ID) return false;

    // Filtra instâncias secundárias de MCMT mantendo o principal
    const isMcmtShared = (pId === MCMT_SHARED_ID || pUserId === MCMT_SHARED_ID);
    if (isMcmtShared) {
      if (pNome.includes('MCMT1') || pNome.includes('MCMT2') || pNome.includes('MCMT 1') || pNome.includes('MCMT 2') || pNome === 'MCMT') {
        return false;
      }
    }

    // Devs só aparecem se o usuário autenticado for Dev
    const isDev = DEV_USER_IDS.includes(pId) || DEV_USER_IDS.includes(pUserId);
    if (isDev && !isCurrentUserDev) return false;

    return true;
  });

  personagensCache = personagensFiltrados;
  const loanSelect = document.getElementById('loan-player');
  const taxSelect = document.getElementById('tax-target');

  const optionsHtml = '<option value="">-- SELECIONE UM USUÁRIO/PERSONAGEM --</option>' +
    personagensFiltrados.map(p => 
      `<option value="${p.id}" data-nome="${p.nome || 'Desconhecido'}">
        ${p.nome || 'Sem Nome'} [Saldo: ${(p.creditos || 0).toLocaleString('pt-BR')} CR]
      </option>`
    ).join('');

  if (loanSelect) loanSelect.innerHTML = optionsHtml;
  if (taxSelect) {
    taxSelect.innerHTML = `<option value="ALL" data-nome="Todos os Jogadores">TODOS OS JOGADORES (DECRETO GERAL)</option>` + optionsHtml;
  }
}

/**
 * 2. SALDO E HISTÓRICO
 */
async function carregarDadosBancarios() {
  const client = getSupabase();
  let gastoCreditosPuros = 0;
  let gastoReaisPuros = 0;

  if (client) {
    const { data: logs } = await client
      .from('log_bancario')
      .select('valor_creditos, dados_adicionais, tipo_evento');

    if (logs) {
      logs.forEach(l => {
        const val = Number(l.valor_creditos) || 0;
        const moeda = l.dados_adicionais?.moeda || 'CREDITOS';
        if (moeda === 'BRL') {
          gastoReaisPuros += val;
        } else {
          gastoCreditosPuros += val;
        }
      });
    }
  }

  const reaisConvertidos = gastoReaisPuros * CONVERSION_RATE_BRL_TO_CREDITS;
  const totalImperialCredits = gastoCreditosPuros + reaisConvertidos;

  document.getElementById('bank-current-credits').innerText = saldoAtualBanco.toLocaleString('pt-BR');
  document.getElementById('direct-credits').innerText = gastoCreditosPuros.toLocaleString('pt-BR');
  document.getElementById('direct-brl').innerText = gastoReaisPuros.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  document.getElementById('total-imperial-credits').innerText = totalImperialCredits.toLocaleString('pt-BR');
}

/**
 * 3. EMPRÉSTIMOS
 */
async function handleCreateLoan(event) {
  event.preventDefault();
  const client = getSupabase();
  if (!client) return;

  const select = document.getElementById('loan-player');
  const personagemId = select.value;
  const playerName = select.options[select.selectedIndex].getAttribute('data-nome');
  const amount = parseInt(document.getElementById('loan-amount').value, 10);
  const interest = parseFloat(document.getElementById('loan-interest').value);
  const notes = document.getElementById('loan-notes').value.trim();

  if (!personagemId) {
    alert('Selecione um jogador.');
    return;
  }

  if (amount > saldoAtualBanco) {
    alert('Saldo insuficiente no Tesouro!');
    return;
  }

  const totalToPay = Math.round(amount + (amount * (interest / 100)));

  const { error } = await client.from('dividas_emprestimos').insert([{
    categoria: 'EMPRESTIMO',
    titulo: `Empréstimo Bancário: ${playerName}`,
    alvo_descricao: playerName,
    personagem_id: personagemId,
    valor_original: amount,
    taxa_juros: interest,
    valor_total: totalToPay,
    frequencia: 'UNICA',
    ciclos_totais: 1,
    ciclos_pagos: 0,
    status: 'PENDENTE',
    observacoes: notes || null
  }]);

  if (error) {
    alert('Erro ao conceder empréstimo: ' + error.message);
    return;
  }

  saldoAtualBanco -= amount;

  await registrarLogBancario({
    tipo_evento: 'CONCESSAO_EMPRESTIMO',
    descricao: `Empréstimo concedido a ${playerName}. Principal: ${amount} CR com ${interest}% de juros. Total: ${totalToPay} CR.`,
    valor_creditos: amount,
    personagem_id: personagemId,
    dados_adicionais: { juros: interest, total_a_pagar: totalToPay, garantia: notes }
  });

  await carregarEmprestimosETaxas();
  carregarDadosBancarios();
  document.getElementById('loan-form').reset();
}

async function quitarEmprestimo(id) {
  const loan = emprestimos.find(l => l.id === id);
  if (!loan || !confirm(`Confirmar quitação do empréstimo de ${loan.alvo_descricao}? O registro será removido da lista de dívidas ativas.`)) return;

  const client = getSupabase();
  if (!client) return;

  // Remoção permanente da tabela de dívidas
  const { error } = await client.from('dividas_emprestimos').delete().eq('id', id);
  if (error) {
    alert('Falha ao quitar empréstimo: ' + error.message);
    return;
  }

  saldoAtualBanco += Number(loan.valor_total);

  // Registro de quitação de dívida
  await registrarLogBancario({
    tipo_evento: 'QUITACAO_DIVIDA',
    descricao: `Empréstimo quitado integralmente por ${loan.alvo_descricao}. Dívida liquidada e removida do registro ativo.`,
    valor_creditos: loan.valor_total,
    personagem_id: loan.personagem_id,
    dados_adicionais: { valor_original: loan.valor_original, juros: loan.taxa_juros, id_removido: id }
  });

  await carregarEmprestimosETaxas();
  carregarDadosBancarios();
}

function renderizarTabelaEmprestimos() {
  const grid = document.getElementById('loans-grid');
  const cardList = document.getElementById('loans-card-list');
  const tbody = document.getElementById('loans-table-body');
  if (!grid || !cardList || !tbody) return;

  if (emprestimos.length === 0) {
    grid.className = 'dynamic-grid single-col';
    cardList.style.display = 'none';
    return;
  }

  grid.className = 'dynamic-grid double-col';
  cardList.style.display = 'block';
  tbody.innerHTML = '';

  emprestimos.forEach(loan => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="player-transfer">${loan.alvo_descricao}</span></td>
      <td>${Number(loan.valor_original).toLocaleString('pt-BR')} CR</td>
      <td>${loan.taxa_juros}%</td>
      <td><strong style="color: var(--neon-blue);">${Number(loan.valor_total).toLocaleString('pt-BR')} CR</strong></td>
      <td>
        <button class="btn-icon" onclick="quitarEmprestimo('${loan.id}')">QUITAR</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * 4. TAXAS E IMPOSTOS
 */
async function handleCreateTax(event) {
  event.preventDefault();
  const client = getSupabase();
  if (!client) return;

  const name = document.getElementById('tax-name').value.trim();
  const select = document.getElementById('tax-target');
  const alvoId = select.value;
  const targetName = select.options[select.selectedIndex].getAttribute('data-nome');
  const value = parseInt(document.getElementById('tax-value').value, 10);
  const type = document.getElementById('tax-type').value;

  if (!alvoId) {
    alert('Selecione um alvo.');
    return;
  }

  const { error } = await client.from('dividas_emprestimos').insert([{
    categoria: 'TAXA_IMPOSTO',
    titulo: name,
    alvo_descricao: targetName,
    personagem_id: alvoId === 'ALL' ? null : alvoId,
    valor_original: value,
    taxa_juros: 0,
    valor_total: value,
    frequencia: type,
    ciclos_totais: 1,
    ciclos_pagos: 0,
    status: 'PENDENTE'
  }]);

  if (error) {
    alert('Erro ao registrar taxa: ' + error.message);
    return;
  }

  await registrarLogBancario({
    tipo_evento: 'DECRETO_TAXA',
    descricao: `Taxa decretada para ${targetName}: ${name}. Valor: ${value} CR (${type}).`,
    valor_creditos: value,
    personagem_id: alvoId === 'ALL' ? null : alvoId,
    dados_adicionais: { titulo: name, frequencia: type }
  });

  await carregarEmprestimosETaxas();
  document.getElementById('tax-form').reset();
}

async function alterarCicloTaxa(id, delta) {
  const tax = taxas.find(t => t.id === id);
  if (!tax) return;

  const client = getSupabase();
  if (!client) return;

  let novosCiclos = (tax.ciclos_totais || 1) + delta;
  if (novosCiclos < 1) novosCiclos = 1;

  const novoValorTotal = Number(tax.valor_original) * novosCiclos;

  const { error } = await client
    .from('dividas_emprestimos')
    .update({
      ciclos_totais: novosCiclos,
      valor_total: novoValorTotal,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) {
    alert('Erro ao atualizar ciclos: ' + error.message);
    return;
  }

  await registrarLogBancario({
    tipo_evento: 'AJUSTE_CICLO_TAXA',
    descricao: `Ciclos de cobrança ajustados para a taxa [${tax.titulo}] (${tax.alvo_descricao}). Ciclos totais: ${novosCiclos}. Débito recalculado: ${novoValorTotal} CR.`,
    valor_creditos: novoValorTotal,
    personagem_id: tax.personagem_id,
    dados_adicionais: { variacao_ciclo: delta, ciclos_totais: novosCiclos }
  });

  await carregarEmprestimosETaxas();
}

async function quitarTaxa(id) {
  const tax = taxas.find(t => t.id === id);
  if (!tax || !confirm(`Confirmar pagamento e quitação da taxa [${tax.titulo}] de ${tax.alvo_descricao}? Ela será removida da lista.`)) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client.from('dividas_emprestimos').delete().eq('id', id);
  if (error) {
    alert('Erro ao quitar taxa: ' + error.message);
    return;
  }

  saldoAtualBanco += Number(tax.valor_total);

  await registrarLogBancario({
    tipo_evento: 'QUITACAO_DIVIDA',
    descricao: `Taxa imperial [${tax.titulo}] quitada por ${tax.alvo_descricao}. Dívida liquidada e removida do registro ativo.`,
    valor_creditos: tax.valor_total,
    personagem_id: tax.personagem_id,
    dados_adicionais: { titulo: tax.titulo, tipo: 'TAXA_IMPOSTO', ciclos: tax.ciclos_totais }
  });

  await carregarEmprestimosETaxas();
  carregarDadosBancarios();
}

async function toggleTaxStatus(id) {
  const tax = taxas.find(t => t.id === id);
  if (!tax) return;

  const client = getSupabase();
  if (!client) return;

  const novoStatus = tax.status === 'PENDENTE' ? 'SUSPENSO' : 'PENDENTE';
  const { error } = await client
    .from('dividas_emprestimos')
    .update({ status: novoStatus, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return;

  await registrarLogBancario({
    tipo_evento: novoStatus === 'SUSPENSO' ? 'SUSPENSAO_TAXA' : 'REATIVACAO_TAXA',
    descricao: `Status da taxa [${tax.titulo}] (${tax.alvo_descricao}) alterado para ${novoStatus}.`,
    valor_creditos: tax.valor_total,
    personagem_id: tax.personagem_id,
    dados_adicionais: { novo_status: novoStatus }
  });

  await carregarEmprestimosETaxas();
}

async function deleteTax(id) {
  const tax = taxas.find(t => t.id === id);
  if (!tax || !confirm(`Revogar e expurgar a taxa [${tax.titulo}]?`)) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client.from('dividas_emprestimos').delete().eq('id', id);
  if (error) return;

  await registrarLogBancario({
    tipo_evento: 'REVOGACAO_TAXA',
    descricao: `Taxa [${tax.titulo}] revogada permanentemente por decreto do ISB.`,
    valor_creditos: 0,
    personagem_id: tax.personagem_id,
    dados_adicionais: { id_revogado: id }
  });

  await carregarEmprestimosETaxas();
}

async function carregarEmprestimosETaxas() {
  const client = getSupabase();
  if (!client) return;

  const { data } = await client
    .from('dividas_emprestimos')
    .select('*')
    .order('created_at', { ascending: false });

  emprestimos = (data || []).filter(item => item.categoria === 'EMPRESTIMO');
  taxas = (data || []).filter(item => item.categoria === 'TAXA_IMPOSTO');

  renderizarTabelaEmprestimos();
  renderizarTabelaTaxas();
}

function renderizarTabelaTaxas() {
  const grid = document.getElementById('taxes-grid');
  const cardList = document.getElementById('taxes-card-list');
  const tbody = document.getElementById('taxes-table-body');
  if (!grid || !cardList || !tbody) return;

  if (taxas.length === 0) {
    grid.className = 'dynamic-grid single-col';
    cardList.style.display = 'none';
    return;
  }

  grid.className = 'dynamic-grid double-col';
  cardList.style.display = 'block';
  tbody.innerHTML = '';

  taxas.forEach(tax => {
    const isAtiva = tax.status === 'PENDENTE';
    const statusClass = isAtiva ? 'badge-active' : 'badge-inactive';
    const statusText = isAtiva ? 'VIGENTE' : 'SUSPENSA';
    const ciclos = tax.ciclos_totais || 1;
    const devedorTotal = Number(tax.valor_original) * ciclos;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tax.titulo}</strong></td>
      <td><span class="player-transfer">${tax.alvo_descricao}</span></td>
      <td>${devedorTotal.toLocaleString('pt-BR')} CR</td>
      <td>
        ${tax.frequencia === 'MENSAL' ? `
          <div class="cycle-counter">
            <span>${ciclos}m</span>
            <button class="cycle-btn" onclick="alterarCicloTaxa('${tax.id}', 1)" title="Adicionar Ciclo">+</button>
            <button class="cycle-btn" onclick="alterarCicloTaxa('${tax.id}', -1)" title="Remover Ciclo">-</button>
          </div>
        ` : 'ÚNICA'}
      </td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td>
        <div class="action-grid">
          <button class="btn-icon" onclick="quitarTaxa('${tax.id}')" title="Quitar">QUITAR</button>
          <button class="btn-icon" onclick="toggleTaxStatus('${tax.id}')">
            ${isAtiva ? 'SUSPENDER' : 'ATIVAR'}
          </button>
          <button class="btn-icon del" onclick="deleteTax('${tax.id}')">REVOGAR</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * 5. CUPONS DE DESCONTO
 */
async function carregarCupons() {
  const client = getSupabase();
  if (!client) return;

  const { data } = await client.from('cupons').select('*').order('created_at', { ascending: false });
  cupons = data || [];
  renderizarTabelaCupons();
}

async function handleCreateCoupon(event) {
  event.preventDefault();
  const client = getSupabase();
  if (!client) return;

  const code = document.getElementById('coupon-code').value.trim().toUpperCase();
  const currency = document.getElementById('currency-type').value;
  const discountType = document.getElementById('discount-type').value;
  const discountValue = parseFloat(document.getElementById('discount-value').value);
  const usageLimit = document.getElementById('usage-limit').value;

  const { error } = await client.from('cupons').insert([{
    codigo: code,
    moeda: currency,
    tipo_desconto: discountType,
    valor_desconto: discountValue,
    limite_usos: usageLimit ? parseInt(usageLimit, 10) : null,
    vezes_usado: 0,
    is_ativo: true
  }]);

  if (error) {
    alert(error.code === '23505' ? 'Cupom já existente!' : error.message);
    return;
  }

  await registrarLogBancario({
    tipo_evento: 'CRIACAO_CUPOM',
    descricao: `Cupom [${code}] criado com sucesso. Tipo: ${discountType}, Valor: ${discountValue} (${currency}).`,
    valor_creditos: currency === 'CREDITOS' ? discountValue : null,
    dados_adicionais: { codigo: code, moeda: currency, tipo: discountType, valor: discountValue }
  });

  await carregarCupons();
  document.getElementById('coupon-form').reset();
}

async function toggleCouponStatus(id) {
  const coupon = cupons.find(c => c.id === id);
  if (!coupon) return;

  const client = getSupabase();
  if (!client) return;

  const novoStatus = !coupon.is_ativo;
  const { error } = await client
    .from('cupons')
    .update({ is_ativo: novoStatus, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return;

  await registrarLogBancario({
    tipo_evento: novoStatus ? 'ATIVACAO_CUPOM' : 'DESATIVACAO_CUPOM',
    descricao: `Status do cupom [${coupon.codigo}] alterado para ${novoStatus ? 'ATIVO' : 'INATIVO'}.`,
    dados_adicionais: { codigo: coupon.codigo, is_ativo: novoStatus }
  });

  await carregarCupons();
}

async function deleteCoupon(id) {
  const coupon = cupons.find(c => c.id === id);
  if (!coupon || !confirm(`Expurgar cupom ${coupon.codigo}?`)) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client.from('cupons').delete().eq('id', id);
  if (error) return;

  await registrarLogBancario({
    tipo_evento: 'EXPURGO_CUPOM',
    descricao: `Cupom de desconto [${coupon.codigo}] foi removido permanentemente da HoloNet.`,
    dados_adicionais: { codigo: coupon.codigo, id_deletado: id }
  });

  await carregarCupons();
}

function renderizarTabelaCupons() {
  const grid = document.getElementById('coupons-grid');
  const cardList = document.getElementById('coupons-card-list');
  const tbody = document.getElementById('coupons-table-body');
  if (!grid || !cardList || !tbody) return;

  if (cupons.length === 0) {
    grid.className = 'dynamic-grid single-col';
    cardList.style.display = 'none';
    return;
  }

  grid.className = 'dynamic-grid double-col';
  cardList.style.display = 'block';
  tbody.innerHTML = '';

  cupons.forEach(coupon => {
    const tr = document.createElement('tr');
    const discountText = coupon.tipo_desconto === 'PERCENTAGE'
      ? `${coupon.valor_desconto}%`
      : `${Number(coupon.valor_desconto).toLocaleString('pt-BR')} ${coupon.moeda === 'BRL' ? 'R$' : 'CR'}`;
    const limitText = coupon.limite_usos !== null ? coupon.limite_usos : '∞';

    tr.innerHTML = `
      <td><span class="code-tag">${coupon.codigo}</span></td>
      <td>${discountText}</td>
      <td>${coupon.moeda}</td>
      <td><strong>${coupon.vezes_usado} / ${limitText}</strong></td>
      <td><span class="badge ${coupon.is_ativo ? 'badge-active' : 'badge-inactive'}">${coupon.is_ativo ? 'ONLINE' : 'OFFLINE'}</span></td>
      <td>
        <div class="action-grid">
          <button class="btn-icon" onclick="openEditModal('${coupon.id}')">EDITAR</button>
          <button class="btn-icon" onclick="toggleCouponStatus('${coupon.id}')">${coupon.is_ativo ? 'DESATIVAR' : 'ATIVAR'}</button>
          <button class="btn-icon del" onclick="deleteCoupon('${coupon.id}')">EXPURGAR</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openEditModal(id) {
  const coupon = cupons.find(c => c.id === id);
  if (!coupon) return;

  document.getElementById('edit-coupon-id').value = coupon.id;
  document.getElementById('edit-coupon-code').value = coupon.codigo;
  document.getElementById('edit-currency-type').value = coupon.moeda;
  document.getElementById('edit-discount-type').value = coupon.tipo_desconto;
  document.getElementById('edit-discount-value').value = coupon.valor_desconto;
  document.getElementById('edit-usage-limit').value = coupon.limite_usos || '';
  document.getElementById('edit-modal').classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('active');
}

async function handleSaveEditCoupon(event) {
  event.preventDefault();
  const id = document.getElementById('edit-coupon-id').value;
  const client = getSupabase();
  if (!client) return;

  const limitVal = document.getElementById('edit-usage-limit').value;
  const payload = {
    moeda: document.getElementById('edit-currency-type').value,
    tipo_desconto: document.getElementById('edit-discount-type').value,
    valor_desconto: parseFloat(document.getElementById('edit-discount-value').value),
    limite_usos: limitVal ? parseInt(limitVal, 10) : null,
    updated_at: new Date().toISOString()
  };

  const { error } = await client.from('cupons').update(payload).eq('id', id);
  if (error) {
    alert('Erro ao atualizar cupom: ' + error.message);
    return;
  }

  await registrarLogBancario({
    tipo_evento: 'EDICAO_CUPOM',
    descricao: `Parâmetros do cupom id [${id}] foram atualizados.`,
    dados_adicionais: payload
  });

  closeEditModal();
  await carregarCupons();
}