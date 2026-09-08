/* ===================================================
   DATAPAD BANCÁRIO IMPERIAL - STAR WARS RPG
   =================================================== */

// Taxa de conversão: R$ 1.00 = 10.000 Créditos Imperiais
const CONVERSION_RATE_BRL_TO_CREDITS = 10000;

// Estado da aplicação em memória
let cupons = [];
let logsTransacoes = [];
let emprestimos = [];
let taxas = [];
let saldoAtualBanco = 5000000;

// Obtém o cliente Supabase global inicializado no projeto
function getSupabase() {
  if (typeof supabaseClient !== 'undefined') return supabaseClient;
  if (typeof supabase !== 'undefined' && supabase.from) return supabase;
  if (window.supabase && typeof window.supabase.from === 'function') return window.supabase;
  console.error("ERRO IMPERIAL: Cliente Supabase não encontrado.");
  return null;
}

document.addEventListener('DOMContentLoaded', async () => {
  iniciarRelogioEmTempoReal();
  await carregarTodosOsDados();
});

async function carregarTodosOsDados() {
  await Promise.all([
    carregarDadosBancarios(),
    carregarLogsTransacoes(),
    carregarEmprestimosETaxas(),
    carregarCupons()
  ]);
}

/**
 * Horário em tempo real galáctico
 */
function iniciarRelogioEmTempoReal() {
  const clockElement = document.getElementById('realtime-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * 1. TESOURO IMPERIAL & HISTÓRICO DE VENDAS
 */
async function carregarDadosBancarios() {
  const client = getSupabase();
  let gastoCreditosPuros = 0;
  let gastoReaisPuros = 0;

  if (client) {
    // Busca transações para consolidar volume transacionado
    const { data: logs, error } = await client
      .from('transacoes_log')
      .select('valor_ou_quantidade, tipo_transacao, detalhes');

    if (!error && logs) {
      logs.forEach(item => {
        const val = Number(item.valor_ou_quantidade) || 0;
        if (item.tipo_transacao === 'COMPRA_BRL' || (item.detalhes && item.detalhes.includes('BRL'))) {
          gastoReaisPuros += val;
        } else {
          gastoCreditosPuros += val;
        }
      });
    }
  }

  // Se não houver transações salvas ainda, mantém uma base visual inicial
  if (gastoCreditosPuros === 0 && gastoReaisPuros === 0) {
    const backupSalvo = localStorage.getItem('starwars_rpg_banco_saldo_atual');
    saldoAtualBanco = backupSalvo ? parseInt(backupSalvo) : 5000000;
  }

  const reaisConvertidos = gastoReaisPuros * CONVERSION_RATE_BRL_TO_CREDITS;
  const totalImperialCredits = gastoCreditosPuros + reaisConvertidos;

  document.getElementById('bank-current-credits').innerText = saldoAtualBanco.toLocaleString('pt-BR');
  document.getElementById('direct-credits').innerText = gastoCreditosPuros.toLocaleString('pt-BR');
  document.getElementById('direct-brl').innerText = gastoReaisPuros.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  document.getElementById('total-imperial-credits').innerText = totalImperialCredits.toLocaleString('pt-BR');
}

/**
 * 2. LOG DE TRANSAÇÕES
 */
async function carregarLogsTransacoes() {
  const client = getSupabase();
  if (!client) return;

  const { data, error } = await client
    .from('transacoes_log')
    .select('*')
    .order('data_transacao', { ascending: false })
    .limit(30);

  if (error) {
    console.error('Erro ao buscar logs:', error.message);
    return;
  }

  logsTransacoes = data || [];
  renderizarTabelaLogs();
}

async function registrarLogTransacao(dados) {
  const client = getSupabase();
  if (!client) return;

  // Fallback para UUID seguro quando a transação vem do banco/sistema
  const defaultSystemId = '00000000-0000-0000-0000-000000000000';

  const payload = {
    tipo_transacao: dados.tipo || 'TRANSFERENCIA',
    remetente_id: dados.remetente_id || defaultSystemId,
    destinatario_id: dados.destinatario_id || defaultSystemId,
    valor_ou_quantidade: Math.round(Number(dados.valor) || 0),
    detalhes: JSON.stringify({
      remetente_nome: dados.remetente,
      destinatario_nome: dados.destinatario,
      moeda: dados.moeda,
      pagina: dados.pagina
    }),
    data_transacao: new Date().toISOString()
  };

  const { error } = await client.from('transacoes_log').insert([payload]);
  if (error) console.error('Erro ao registrar log:', error.message);

  await carregarLogsTransacoes();
}

async function deleteLog(id) {
  if (!confirm("TERMINAL IMPERIAL: Deseja apagar este registro de log permanentemente?")) return;
  
  const client = getSupabase();
  if (!client) return;

  const { error } = await client.from('transacoes_log').delete().eq('id', id);
  if (error) {
    alert('ERRO AO DELETAR LOG: ' + error.message);
    return;
  }

  await carregarLogsTransacoes();
}

function renderizarTabelaLogs() {
  const tbody = document.getElementById('logs-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (logsTransacoes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--neon-blue);">[ NENHUMA TRANSAÇÃO REGISTRADA RECENTEMENTE ]</td></tr>`;
    return;
  }

  logsTransacoes.forEach(log => {
    let extra = {};
    try {
      extra = typeof log.detalhes === 'string' ? JSON.parse(log.detalhes) : (log.detalhes || {});
    } catch(e) {
      extra = { detalhes: log.detalhes };
    }

    const dataObj = log.data_transacao ? new Date(log.data_transacao) : new Date();
    const horario = dataObj.toLocaleTimeString('pt-BR');
    const moeda = extra.moeda || 'CREDITOS';
    const moedaFormatada = moeda === 'BRL' ? 'R$' : 'CR';
    const valor = Number(log.valor_ou_quantidade) || 0;
    const valorFormatado = moeda === 'BRL'
      ? valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      : valor.toLocaleString('pt-BR');

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${horario}</td>
      <td><span class="player-transfer">${extra.remetente_nome || 'Terminal Imperial'}</span></td>
      <td><span class="player-transfer">${extra.destinatario_nome || 'Banco'}</span></td>
      <td><strong>${valorFormatado}</strong></td>
      <td>${moedaFormatada}</td>
      <td><span class="page-tag">${extra.pagina || 'terminalBancario.html'}</span></td>
      <td>
        <button class="btn-icon del" onclick="deleteLog('${log.id}')" title="Apagar Log">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * 3 & 4. EMPRÉSTIMOS, TAXAS E DÍVIDAS
 */
async function carregarEmprestimosETaxas() {
  const client = getSupabase();
  if (!client) return;

  const { data, error } = await client
    .from('dividas_emprestimos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao carregar dívidas/empréstimos:', error.message);
    return;
  }

  emprestimos = (data || []).filter(item => item.categoria === 'EMPRESTIMO' && item.status === 'PENDENTE');
  taxas = (data || []).filter(item => item.categoria === 'TAXA_IMPOSTO' && item.status !== 'REVOGADO');

  renderizarTabelaEmprestimos();
  renderizarTabelaTaxas();
}

// Auxiliar para localizar personagem por nome aproximado
async function buscarPersonagemPorNome(nome) {
  const client = getSupabase();
  if (!client || !nome) return null;

  const { data } = await client
    .from('personagens')
    .select('id, nome')
    .ilike('nome', `%${nome.trim()}%`)
    .limit(1);

  return (data && data.length > 0) ? data[0] : null;
}

async function handleCreateLoan(event) {
  event.preventDefault();
  const client = getSupabase();
  if (!client) return;

  const player = document.getElementById('loan-player').value.trim();
  const amount = parseInt(document.getElementById('loan-amount').value, 10);
  const interest = parseFloat(document.getElementById('loan-interest').value);
  const notes = document.getElementById('loan-notes').value.trim();

  if (amount > saldoAtualBanco) {
    alert('ERRO IMPERIAL: Saldo insuficiente no Tesouro Banco!');
    return;
  }

  const totalToPay = Math.round(amount + (amount * (interest / 100)));
  const personagem = await buscarPersonagemPorNome(player);

  const payload = {
    categoria: 'EMPRESTIMO',
    titulo: `Empréstimo: ${player}`,
    alvo_descricao: player,
    personagem_id: personagem ? personagem.id : null,
    valor_original: amount,
    taxa_juros: interest,
    valor_total: totalToPay,
    frequencia: 'UNICA',
    status: 'PENDENTE',
    observacoes: notes || null
  };

  const { error } = await client.from('dividas_emprestimos').insert([payload]);
  if (error) {
    alert('ERRO AO CRIAR EMPRÉSTIMO: ' + error.message);
    return;
  }

  saldoAtualBanco -= amount;
  localStorage.setItem('starwars_rpg_banco_saldo_atual', saldoAtualBanco.toString());

  await registrarLogTransacao({
    remetente: 'Banco Imperial',
    destinatario: player,
    destinatario_id: personagem ? personagem.id : null,
    valor: amount,
    moeda: 'CREDITOS',
    tipo: 'EMPRESTIMO',
    pagina: 'terminalBancario.html'
  });

  await carregarEmprestimosETaxas();
  carregarDadosBancarios();
  document.getElementById('loan-form').reset();
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
        <button class="btn-icon" onclick="quitarEmprestimo('${loan.id}')" title="Marcar Pago">QUITAR</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function quitarEmprestimo(id) {
  const loan = emprestimos.find(l => l.id === id);
  if (!loan) return;

  if (!confirm(`TERMINAL IMPERIAL: Confirmar a quitação do empréstimo de ${loan.alvo_descricao}?`)) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client
    .from('dividas_emprestimos')
    .update({ status: 'QUITADO', updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    alert('ERRO AO QUITAR EMPRÉSTIMO: ' + error.message);
    return;
  }

  saldoAtualBanco += Number(loan.valor_total);
  localStorage.setItem('starwars_rpg_banco_saldo_atual', saldoAtualBanco.toString());

  await registrarLogTransacao({
    remetente: loan.alvo_descricao,
    remetente_id: loan.personagem_id,
    destinatario: 'Banco Imperial',
    valor: loan.valor_total,
    moeda: 'CREDITOS',
    tipo: 'QUITACAO_EMPRESTIMO',
    pagina: 'terminalBancario.html'
  });

  await carregarEmprestimosETaxas();
  carregarDadosBancarios();
}

async function handleCreateTax(event) {
  event.preventDefault();
  const client = getSupabase();
  if (!client) return;

  const name = document.getElementById('tax-name').value.trim();
  const target = document.getElementById('tax-target').value.trim();
  const value = parseInt(document.getElementById('tax-value').value, 10);
  const type = document.getElementById('tax-type').value;

  const personagem = await buscarPersonagemPorNome(target);

  const payload = {
    categoria: 'TAXA_IMPOSTO',
    titulo: name,
    alvo_descricao: target,
    personagem_id: personagem ? personagem.id : null,
    valor_original: value,
    taxa_juros: 0,
    valor_total: value,
    frequencia: type,
    status: 'PENDENTE'
  };

  const { error } = await client.from('dividas_emprestimos').insert([payload]);
  if (error) {
    alert('ERRO AO REGISTRAR TAXA: ' + error.message);
    return;
  }

  await carregarEmprestimosETaxas();
  document.getElementById('tax-form').reset();
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

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tax.titulo}</strong></td>
      <td><span class="player-transfer">${tax.alvo_descricao}</span></td>
      <td>${Number(tax.valor_total).toLocaleString('pt-BR')} CR</td>
      <td>${tax.frequencia}</td>
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

async function toggleTaxStatus(id) {
  const tax = taxas.find(t => t.id === id);
  if (!tax) return;

  const novoStatus = tax.status === 'PENDENTE' ? 'SUSPENSO' : 'PENDENTE';
  const client = getSupabase();
  if (!client) return;

  const { error } = await client
    .from('dividas_emprestimos')
    .update({ status: novoStatus, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    alert('ERRO AO ALTERAR STATUS DA TAXA: ' + error.message);
    return;
  }

  await carregarEmprestimosETaxas();
}

async function deleteTax(id) {
  const tax = taxas.find(t => t.id === id);
  if (!tax) return;

  if (!confirm(`DECRETO IMPERIAL: Revogar a taxa [${tax.titulo}]?`)) return;

  const client = getSupabase();
  if (!client) return;

  // Marca como REVOGADO
  const { error } = await client
    .from('dividas_emprestimos')
    .update({ status: 'REVOGADO', updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    alert('ERRO AO REVOGAR TAXA: ' + error.message);
    return;
  }

  await carregarEmprestimosETaxas();
}

/**
 * 5. CUPONS DE DESCONTO
 */
async function carregarCupons() {
  const client = getSupabase();
  if (!client) return;

  const { data, error } = await client
    .from('cupons')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar cupons:', error.message);
    return;
  }

  cupons = data || [];
  renderizarTabelaCupons();
}

async function handleCreateCoupon(event) {
  event.preventDefault();
  const client = getSupabase();
  if (!client) return;

  const codeInput = document.getElementById('coupon-code').value.trim().toUpperCase();
  const currencyType = document.getElementById('currency-type').value;
  const discountType = document.getElementById('discount-type').value;
  const discountValue = parseFloat(document.getElementById('discount-value').value);
  const usageLimitInput = document.getElementById('usage-limit').value;

  const payload = {
    codigo: codeInput,
    moeda: currencyType,
    tipo_desconto: discountType,
    valor_desconto: discountValue,
    limite_usos: usageLimitInput ? parseInt(usageLimitInput, 10) : null,
    vezes_usado: 0,
    is_ativo: true
  };

  const { error } = await client.from('cupons').insert([payload]);
  if (error) {
    if (error.code === '23505') {
      alert('ERRO HOLONET: Já existe um cupom com esse código!');
    } else {
      alert('ERRO AO CRIAR CUPOM: ' + error.message);
    }
    return;
  }

  await carregarCupons();
  document.getElementById('coupon-form').reset();
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

    let currencyText = 'AMBAS';
    if (coupon.moeda === 'CREDITOS') currencyText = 'CRÉDITOS (CR)';
    if (coupon.moeda === 'BRL') currencyText = 'REAIS (R$)';

    const discountText = coupon.tipo_desconto === 'PERCENTAGE'
      ? `${coupon.valor_desconto}%`
      : `${Number(coupon.valor_desconto).toLocaleString('pt-BR')} ${coupon.moeda === 'BRL' ? 'R$' : 'CR'}`;

    const limitText = coupon.limite_usos !== null ? coupon.limite_usos : '∞';
    const usagesDisplay = `${coupon.vezes_usado} / ${limitText}`;

    const statusClass = coupon.is_ativo ? 'badge-active' : 'badge-inactive';
    const statusText = coupon.is_ativo ? 'ONLINE' : 'OFFLINE';

    tr.innerHTML = `
      <td><span class="code-tag">${coupon.codigo}</span></td>
      <td>${discountText}</td>
      <td>${currencyText}</td>
      <td><strong>${usagesDisplay}</strong></td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td>
        <div class="action-grid">
          <button class="btn-icon" onclick="openEditModal('${coupon.id}')" title="Editar">EDITAR</button>
          <button class="btn-icon" onclick="toggleCouponStatus('${coupon.id}')" title="Ativar/Desativar">
            ${coupon.is_ativo ? 'DESATIVAR' : 'ATIVAR'}
          </button>
          <button class="btn-icon del" onclick="deleteCoupon('${coupon.id}')" title="Remover">EXPURGAR</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
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

  if (error) {
    alert('ERRO AO ALTERAR STATUS DO CUPOM: ' + error.message);
    return;
  }

  await carregarCupons();
}

async function deleteCoupon(id) {
  const coupon = cupons.find(c => c.id === id);
  if (!coupon) return;

  if (!confirm(`TERMINAL IMPERIAL: Apagar o cupom [${coupon.codigo}] da HoloNet?`)) return;

  const client = getSupabase();
  if (!client) return;

  const { error } = await client.from('cupons').delete().eq('id', id);
  if (error) {
    alert('ERRO AO REMOVER CUPOM: ' + error.message);
    return;
  }

  await carregarCupons();
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

  const limitValue = document.getElementById('edit-usage-limit').value;

  const payload = {
    moeda: document.getElementById('edit-currency-type').value,
    tipo_desconto: document.getElementById('edit-discount-type').value,
    valor_desconto: parseFloat(document.getElementById('edit-discount-value').value),
    limite_usos: limitValue ? parseInt(limitValue, 10) : null,
    updated_at: new Date().toISOString()
  };

  const { error } = await client.from('cupons').update(payload).eq('id', id);
  if (error) {
    alert('ERRO AO ATUALIZAR CUPOM: ' + error.message);
    return;
  }

  closeEditModal();
  await carregarCupons();
}