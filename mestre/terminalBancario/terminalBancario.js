/* ===================================================
   DATAPAD BANCÁRIO IMPERIAL - STAR WARS RPG
   =================================================== */

const CONVERSION_RATE_BRL_TO_CREDITS = 10000;

let cupons = [];
let logsTransacoes = [];
let emprestimos = [];
let taxas = [];
let personagensCache = [];
let saldoAtualBanco = 5000000;

function getSupabase() {
  if (typeof supabaseClient !== 'undefined') return supabaseClient;
  if (typeof supabase !== 'undefined' && supabase.from) return supabase;
  if (window.supabase && typeof window.supabase.from === 'function') return window.supabase;
  console.error("ERRO IMPERIAL: Cliente Supabase não encontrado.");
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
    carregarLogsAuditoria(),
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
 * 1. LOGS DE AUDITORIA & REGISTRO UNIVERSAL
 */
async function registrarAuditoriaBancaria({ acao, remetente, destinatario, valor = 0, moeda = 'CREDITOS', detalhes = '' }) {
  const client = getSupabase();
  if (!client) return;

  const defaultId = '00000000-0000-0000-0000-000000000000';
  const payload = {
    tipo_transacao: acao,
    remetente_id: defaultId,
    destinatario_id: defaultId,
    valor_ou_quantidade: Math.round(valor),
    detalhes: JSON.stringify({
      origem: remetente || 'Terminal Imperial',
      destino: destinatario || 'Banco Imperial',
      moeda: moeda,
      pagina: 'terminalBancario.html',
      descricao: detalhes
    }),
    data_transacao: new Date().toISOString()
  };

  await client.from('transacoes_log').insert([payload]);
  await carregarLogsAuditoria();
}

async function carregarLogsAuditoria() {
  const client = getSupabase();
  if (!client) return;

  const { data, error } = await client
    .from('transacoes_log')
    .select('*')
    .order('data_transacao', { ascending: false })
    .limit(40);

  if (error) {
    console.error('Erro ao buscar logs:', error.message);
    return;
  }

  logsTransacoes = data || [];
  renderizarTabelaLogs();
}

function renderizarTabelaLogs() {
  const tbody = document.getElementById('logs-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (logsTransacoes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--neon-blue);">[ NENHUMA AUDITORIA REGISTRADA RECENTEMENTE ]</td></tr>`;
    return;
  }

  logsTransacoes.forEach(log => {
    let extra = {};
    try {
      extra = typeof log.detalhes === 'string' ? JSON.parse(log.detalhes) : (log.detalhes || {});
    } catch(e) {
      extra = { descricao: log.detalhes };
    }

    const dataObj = log.data_transacao ? new Date(log.data_transacao) : new Date();
    const horario = dataObj.toLocaleTimeString('pt-BR');
    const moeda = extra.moeda || 'CREDITOS';
    const moedaFormatada = moeda === 'BRL' ? 'R$' : 'CR';
    const valor = Number(log.valor_ou_quantidade) || 0;
    const valorFormatado = moeda === 'BRL'
      ? valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      : valor.toLocaleString('pt-BR');

    const acaoFormatada = extra.descricao ? `${log.tipo_transacao} (${extra.descricao})` : log.tipo_transacao;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${horario}</td>
      <td><span class="player-transfer">${extra.origem || 'Sistema'}</span></td>
      <td><span class="player-transfer">${extra.destino || 'Terminal'}</span></td>
      <td><strong>${valorFormatado}</strong></td>
      <td>${moedaFormatada}</td>
      <td><span class="page-tag">${acaoFormatada}</span></td>
      <td>
        <button class="btn-icon del" onclick="deleteLog('${log.id}')" title="Apagar Registro">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function deleteLog(id) {
  if (!confirm("TERMINAL IMPERIAL: Deseja apagar este registro permanentemente?")) return;
  const client = getSupabase();
  if (!client) return;

  const { error } = await client.from('transacoes_log').delete().eq('id', id);
  if (error) {
    alert('ERRO: ' + error.message);
    return;
  }
  await carregarLogsAuditoria();
}

/**
 * 2. DROPDOWN DE USUÁRIOS / PERSONAGENS COM FILTROS ESPECÍFICOS
 */
async function carregarUsuariosCadastrados() {
  const client = getSupabase();
  if (!client) return;

  // 1. Identificar usuário logado
  const { data: { user } } = await client.auth.getUser();
  const currentUserId = user ? user.id : null;

  // UUIDs de Controle
  const DEV_USER_IDS = [
    'c28cf763-c1a9-4f31-b0b8-6bfe296810e2', // Eiden
    '94d1ed61-7955-40d8-a0a1-7733bd716b5d'  // Duque
  ];
  const MESTRE_USER_ID = 'e5fc379a-fc6c-42bb-a3d4-b6984f1693b9';
  const MCMT_SHARED_ID = 'f62b8a03-dbe1-45ed-aadc-68dc2fd3961c';

  const isCurrentUserDev = DEV_USER_IDS.includes(currentUserId);

  // 2. Busca todos os personagens
  const { data, error } = await client
    .from('personagens')
    .select('id, user_id, nome, creditos')
    .order('nome', { ascending: true });

  if (error || !data) {
    console.error('Falha ao listar personagens:', error);
    return;
  }

  // 3. Aplicação dos filtros solicitados
  const personagensFiltrados = data.filter(personagem => {
    const pId = (personagem.id || '').toLowerCase();
    const pUserId = (personagem.user_id || '').toLowerCase();
    const pNome = (personagem.nome || '').toUpperCase();

    // Regra 1: Ocultar personagem do Mestre
    if (pId === MESTRE_USER_ID || pUserId === MESTRE_USER_ID) {
      return false;
    }

    // Regra 2: Ocultar apenas MCMT1 e MCMT2, mantendo o personagem principal com mesmo UUID
    const isMcmtShared = (pId === MCMT_SHARED_ID || pUserId === MCMT_SHARED_ID);
    if (isMcmtShared) {
      if (pNome.includes('MCMT1') || pNome.includes('MCMT2') || pNome.includes('MCMT 1') || pNome.includes('MCMT 2') || pNome === 'MCMT') {
        return false;
      }
    }

    // Regra 3: Personagens dos devs só aparecem se o usuário logado for um dos devs
    const isDevCharacter = DEV_USER_IDS.includes(pId) || DEV_USER_IDS.includes(pUserId);
    if (isDevCharacter && !isCurrentUserDev) {
      return false;
    }

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
 * 3. TESOURO IMPERIAL & HISTÓRICO
 */
async function carregarDadosBancarios() {
  const client = getSupabase();
  let gastoCreditosPuros = 0;
  let gastoReaisPuros = 0;

  if (client) {
    const { data: logs } = await client
      .from('transacoes_log')
      .select('valor_ou_quantidade, detalhes, tipo_transacao');

    if (logs) {
      logs.forEach(item => {
        const val = Number(item.valor_ou_quantidade) || 0;
        let extra = {};
        try { extra = JSON.parse(item.detalhes); } catch(e) {}
        if (extra.moeda === 'BRL' || item.tipo_transacao === 'COMPRA_BRL') {
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
 * 4. GESTÃO DE EMPRÉSTIMOS
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
    alert('Selecione um jogador na lista.');
    return;
  }

  if (amount > saldoAtualBanco) {
    alert('Saldo insuficiente no Tesouro Imperial!');
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
  await registrarAuditoriaBancaria({
    acao: 'CRIAR_EMPRESTIMO',
    remetente: 'Banco Imperial',
    destinatario: playerName,
    valor: amount,
    moeda: 'CREDITOS',
    detalhes: `Juros: ${interest}% | A pagar: ${totalToPay} CR`
  });

  await carregarEmprestimosETaxas();
  carregarDadosBancarios();
  document.getElementById('loan-form').reset();
}

async function quitarEmprestimo(id) {
  const loan = emprestimos.find(l => l.id === id);
  if (!loan || !confirm(`Confirmar quitação total do empréstimo de ${loan.alvo_descricao}?`)) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client
    .from('dividas_emprestimos')
    .update({ status: 'QUITADO', ciclos_pagos: 1, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    alert('Falha ao quitar empréstimo: ' + error.message);
    return;
  }

  saldoAtualBanco += Number(loan.valor_total);
  await registrarAuditoriaBancaria({
    acao: 'QUITAR_EMPRESTIMO',
    remetente: loan.alvo_descricao,
    destinatario: 'Banco Imperial',
    valor: loan.valor_total,
    moeda: 'CREDITOS',
    detalhes: 'Quitação Integral Concluída'
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
 * 5. GESTÃO DE TAXAS, IMPOSTOS E CICLOS RECORRENTES
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
    alert('Selecione um alvo válido.');
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
    alert('Erro ao criar taxa: ' + error.message);
    return;
  }

  await registrarAuditoriaBancaria({
    acao: 'DECRETAR_TAXA',
    remetente: 'Governo Imperial',
    destinatario: targetName,
    valor: value,
    moeda: 'CREDITOS',
    detalhes: `Tipo: ${type} | Título: ${name}`
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
  if (novosCiclos < (tax.ciclos_pagos || 0)) novosCiclos = tax.ciclos_pagos || 0;
  if (novosCiclos < 1) novosCiclos = 1;

  const novoValorTotal = Number(tax.valor_original) * novosCiclos;
  const pendentes = novosCiclos - (tax.ciclos_pagos || 0);
  const novoStatus = pendentes <= 0 ? 'QUITADO' : 'PENDENTE';

  const { error } = await client
    .from('dividas_emprestimos')
    .update({
      ciclos_totais: novosCiclos,
      valor_total: novoValorTotal,
      status: novoStatus,
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) {
    alert('Erro ao alterar ciclo: ' + error.message);
    return;
  }

  await registrarAuditoriaBancaria({
    acao: 'AJUSTE_CICLOS_TAXA',
    remetente: 'Terminal Imperial',
    destinatario: tax.alvo_descricao,
    valor: tax.valor_original,
    moeda: 'CREDITOS',
    detalhes: `Ciclos: ${novosCiclos} | Saldo devedor: ${novoValorTotal} CR`
  });

  await carregarEmprestimosETaxas();
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

  if (error) {
    alert('Erro ao alterar status da taxa: ' + error.message);
    return;
  }

  await registrarAuditoriaBancaria({
    acao: novoStatus === 'SUSPENSO' ? 'SUSPENDER_TAXA' : 'ATIVAR_TAXA',
    remetente: 'Terminal Imperial',
    destinatario: tax.alvo_descricao,
    valor: 0,
    detalhes: `Taxa [${tax.titulo}] agora está ${novoStatus}`
  });

  await carregarEmprestimosETaxas();
}

async function deleteTax(id) {
  const tax = taxas.find(t => t.id === id);
  if (!tax || !confirm(`Revogar permanentemente a taxa [${tax.titulo}]?`)) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client
    .from('dividas_emprestimos')
    .update({ status: 'REVOGADO', updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    alert('Erro ao revogar taxa: ' + error.message);
    return;
  }

  await registrarAuditoriaBancaria({
    acao: 'REVOGAR_TAXA',
    remetente: 'Terminal Imperial',
    destinatario: tax.alvo_descricao,
    valor: 0,
    detalhes: `Taxa revogada: ${tax.titulo}`
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

  emprestimos = (data || []).filter(item => item.categoria === 'EMPRESTIMO' && item.status === 'PENDENTE');
  taxas = (data || []).filter(item => item.categoria === 'TAXA_IMPOSTO' && item.status !== 'REVOGADO');

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
 * 6. GESTÃO DE CUPONS
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
    alert(error.code === '23505' ? 'Cupom já cadastrado com esse código!' : error.message);
    return;
  }

  await registrarAuditoriaBancaria({
    acao: 'GERAR_CUPOM',
    remetente: 'Terminal Imperial',
    destinatario: 'HoloNet Pública',
    valor: discountValue,
    moeda: currency,
    detalhes: `Cupom ${code} gerado`
  });

  await carregarCupons();
  document.getElementById('coupon-form').reset();
}

async function toggleCouponStatus(id) {
  const coupon = cupons.find(c => c.id === id);
  if (!coupon) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client
    .from('cupons')
    .update({ is_ativo: !coupon.is_ativo, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return;

  await registrarAuditoriaBancaria({
    acao: !coupon.is_ativo ? 'ATIVAR_CUPOM' : 'DESATIVAR_CUPOM',
    remetente: 'Terminal Imperial',
    destinatario: 'HoloNet',
    valor: 0,
    detalhes: `Status do cupom ${coupon.codigo} alterado`
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

  await registrarAuditoriaBancaria({
    acao: 'EXPURGAR_CUPOM',
    remetente: 'Terminal Imperial',
    destinatario: 'HoloNet',
    valor: 0,
    detalhes: `Cupom removido: ${coupon.codigo}`
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
    alert('Erro ao atualizar: ' + error.message);
    return;
  }

  await registrarAuditoriaBancaria({
    acao: 'EDITAR_CUPOM',
    remetente: 'Terminal Imperial',
    destinatario: 'HoloNet',
    valor: payload.valor_desconto,
    moeda: payload.moeda,
    detalhes: 'Parâmetros atualizados via Datapad'
  });

  closeEditModal();
  await carregarCupons();
}