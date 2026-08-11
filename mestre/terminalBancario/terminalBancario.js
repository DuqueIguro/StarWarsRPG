/* ===================================================
   DATAPAD BANCÁRIO IMPERIAL - STAR WARS RPG
   =================================================== */

const STORAGE_CUPONS_KEY = 'starwars_rpg_cupons';
const STORAGE_LOGS_KEY = 'starwars_rpg_banco_logs';
const STORAGE_LOANS_KEY = 'starwars_rpg_emprestimos';
const STORAGE_P2W_KEY = 'starwars_rpg_p2w_sales';
const STORAGE_BANK_BALANCE_KEY = 'starwars_rpg_banco_saldo_atual';

// Taxa de conversão: R$ 1.00 = 10.000 Créditos Imperiais
const CONVERSION_RATE_BRL_TO_CREDITS = 10000;

let cupons = [];
let logsTransacoes = [];
let emprestimos = [];
let saldoAtualBanco = 5000000; // Saldo de Créditos disponível no Tesouro Imperial

document.addEventListener('DOMContentLoaded', () => {
  iniciarRelogioEmTempoReal();
  carregarDadosBancarios();
  carregarCupons();
  carregarEmprestimos();
  carregarLogsTransacoes();
});

/**
 * Horário em tempo real galáctico
 */
function iniciarRelogioEmTempoReal() {
  const clockElement = document.getElementById('realtime-clock');
  
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
 * 1. Saldo Bancário Atual e Conversão de Gastos
 */
function carregarDadosBancarios() {
  // Saldo Atual do Banco
  const saldoSalvo = localStorage.getItem(STORAGE_BANK_BALANCE_KEY);
  if (saldoSalvo !== null) {
    saldoAtualBanco = parseInt(saldoSalvo);
  } else {
    localStorage.setItem(STORAGE_BANK_BALANCE_KEY, saldoAtualBanco.toString());
  }

  // Vendas acumuladas da loja
  let gastoCreditosPuros = 0;
  let gastoReaisPuros = 0;

  const vendasSalvas = localStorage.getItem(STORAGE_P2W_KEY);
  if (vendasSalvas) {
    try {
      const vendas = JSON.parse(vendasSalvas);
      vendas.forEach(item => {
        if (item.moeda === 'BRL') {
          gastoReaisPuros += (item.valor || 0);
        } else {
          gastoCreditosPuros += (item.precoCreditos || item.valor || 0);
        }
      });
    } catch(e) {
      gastoCreditosPuros = 250000;
      gastoReaisPuros = 150.00;
    }
  } else {
    gastoCreditosPuros = 250000;
    gastoReaisPuros = 150.00;
  }

  // R$ 1.00 = 10.000 CR
  const reaisConvertidos = gastoReaisPuros * CONVERSION_RATE_BRL_TO_CREDITS;
  const totalImperialCredits = gastoCreditosPuros + reaisConvertidos;

  // Atualiza a tela
  document.getElementById('bank-current-credits').innerText = saldoAtualBanco.toLocaleString('pt-BR');
  document.getElementById('direct-credits').innerText = gastoCreditosPuros.toLocaleString('pt-BR');
  document.getElementById('direct-brl').innerText = gastoReaisPuros.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  document.getElementById('total-imperial-credits').innerText = totalImperialCredits.toLocaleString('pt-BR');
}

/**
 * 2. Empréstimos Bancários
 */
function carregarEmprestimos() {
  const empSalvos = localStorage.getItem(STORAGE_LOANS_KEY);
  if (empSalvos) {
    try {
      emprestimos = JSON.parse(empSalvos);
    } catch(e) {
      emprestimos = [];
    }
  } else {
    emprestimos = [];
  }

  renderizarTabelaEmprestimos();
}

function salvarEmprestimosStorage() {
  localStorage.setItem(STORAGE_LOANS_KEY, JSON.stringify(emprestimos));
}

function handleCreateLoan(event) {
  event.preventDefault();

  const player = document.getElementById('loan-player').value.trim();
  const amount = parseInt(document.getElementById('loan-amount').value);
  const interest = parseFloat(document.getElementById('loan-interest').value);
  const notes = document.getElementById('loan-notes').value.trim();

  if (amount > saldoAtualBanco) {
    alert('ERRO IMPERIAL: Saldo insuficiente no Tesouro Banco!');
    return;
  }

  const totalToPay = Math.round(amount + (amount * (interest / 100)));

  const newLoan = {
    id: Date.now().toString(),
    player: player,
    amount: amount,
    interest: interest,
    totalToPay: totalToPay,
    notes: notes || 'Nenhuma'
  };

  emprestimos.push(newLoan);
  
  // Deduz do saldo do banco
  saldoAtualBanco -= amount;
  localStorage.setItem(STORAGE_BANK_BALANCE_KEY, saldoAtualBanco.toString());

  // Registra no Log automaticamente
  registrarLogTransacao({
    remetente: 'Banco Imperial',
    destinatario: player,
    valor: amount,
    moeda: 'CREDITOS',
    pagina: 'mestre/terminalBancario.html'
  });

  salvarEmprestimosStorage();
  carregarDadosBancarios();
  renderizarTabelaEmprestimos();

  document.getElementById('loan-form').reset();
}

function renderizarTabelaEmprestimos() {
  const section = document.getElementById('loans-section');
  const tbody = document.getElementById('loans-table-body');

  // REGRA: Se não houver empréstimos, a área NÃO aparece
  if (emprestimos.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  tbody.innerHTML = '';

  emprestimos.forEach(loan => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><span class="player-transfer">${loan.player}</span></td>
      <td>${loan.amount.toLocaleString('pt-BR')} CR</td>
      <td>${loan.interest}%</td>
      <td><strong style="color: var(--neon-gold);">${loan.totalToPay.toLocaleString('pt-BR')} CR</strong></td>
      <td>${loan.notes}</td>
      <td>
        <button class="btn-icon" onclick="quitarEmprestimo('${loan.id}')" title="Marcar Pago">QUITAR</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function quitarEmprestimo(id) {
  const loan = emprestimos.find(l => l.id === id);
  if (loan && confirm(`DESEJA CONFIRMAR A QUITAÇÃO DO EMPRÉSTIMO DE ${loan.player}?`)) {
    // Retorna o valor pago de volta ao Banco
    saldoAtualBanco += loan.totalToPay;
    localStorage.setItem(STORAGE_BANK_BALANCE_KEY, saldoAtualBanco.toString());

    registrarLogTransacao({
      remetente: loan.player,
      destinatario: 'Banco Imperial',
      valor: loan.totalToPay,
      moeda: 'CREDITOS',
      pagina: 'mestre/terminalBancario.html'
    });

    emprestimos = emprestimos.filter(l => l.id !== id);
    salvarEmprestimosStorage();
    carregarDadosBancarios();
    renderizarTabelaEmprestimos();
  }
}

/**
 * 3. Log de Transações do Site
 */
function carregarLogsTransacoes() {
  const logsSalvos = localStorage.getItem(STORAGE_LOGS_KEY);
  if (logsSalvos) {
    try {
      logsTransacoes = JSON.parse(logsSalvos);
    } catch(e) {
      logsTransacoes = getLogsDefault();
    }
  } else {
    logsTransacoes = getLogsDefault();
    localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(logsTransacoes));
  }

  renderizarTabelaLogs();
}

function registrarLogTransacao(dados) {
  const now = new Date();
  const horario = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const novoLog = {
    horario: horario,
    remetente: dados.remetente,
    destinatario: dados.destinatario,
    valor: dados.valor,
    moeda: dados.moeda,
    pagina: dados.pagina
  };

  logsTransacoes.unshift(novoLog); // Adiciona no topo
  if (logsTransacoes.length > 20) logsTransacoes.pop(); // Mantém os últimos 20

  localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(logsTransacoes));
  renderizarTabelaLogs();
}

function getLogsDefault() {
  return [
    { horario: '18:42:10', remetente: 'Darth Dravos', destinatario: 'Oficina Durtoc', valor: 15000, moeda: 'CREDITOS', pagina: 'oficina.html' },
    { horario: '17:15:33', remetente: 'Keiran Jinn', destinatario: 'Loja Imperial', valor: 45.00, moeda: 'BRL', pagina: 'p2w.html' },
    { horario: '15:02:44', remetente: 'Lihua', destinatario: 'Ren Tai Sol', valor: 5000, moeda: 'CREDITOS', pagina: 'banco.html' }
  ];
}

function renderizarTabelaLogs() {
  const tbody = document.getElementById('logs-table-body');
  tbody.innerHTML = '';

  if (logsTransacoes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--neon-gold);">[ NENHUMA TRANSAÇÃO REGISTRADA RECENTEMENTE ]</td></tr>`;
    return;
  }

  logsTransacoes.forEach(log => {
    const tr = document.createElement('tr');

    const moedaFormatada = log.moeda === 'BRL' ? 'R$' : 'CR';
    const valorFormatado = log.moeda === 'BRL' 
      ? log.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      : log.valor.toLocaleString('pt-BR');

    tr.innerHTML = `
      <td>${log.horario}</td>
      <td><span class="player-transfer">${log.remetente || 'Sistema'}</span></td>
      <td><span class="player-transfer">${log.destinatario || 'Loja Imperial'}</span></td>
      <td><strong>${valorFormatado}</strong></td>
      <td>${moedaFormatada}</td>
      <td><span class="page-tag">${log.pagina}</span></td>
    `;

    tbody.appendChild(tr);
  });
}

/**
 * 4. Gestão de Cupons
 */
function carregarCupons() {
  const cuponsSalvos = localStorage.getItem(STORAGE_CUPONS_KEY);
  if (cuponsSalvos) {
    try {
      cupons = JSON.parse(cuponsSalvos);
    } catch(e) {
      cupons = getCuponsDefault();
    }
  } else {
    cupons = getCuponsDefault();
    salvarCuponsStorage();
  }

  renderizarTabelaCupons();
}

function getCuponsDefault() {
  return [
    { id: '1', code: 'IMPERIO10', currency: 'AMBAS', discountType: 'PERCENTAGE', discountValue: 10, usageLimit: 100, usageCount: 28, active: true },
    { id: '2', code: 'SITH1000', currency: 'CREDITOS', discountType: 'FIXED', discountValue: 1000, usageLimit: 50, usageCount: 12, active: true }
  ];
}

function salvarCuponsStorage() {
  localStorage.setItem(STORAGE_CUPONS_KEY, JSON.stringify(cupons));
}

function handleCreateCoupon(event) {
  event.preventDefault();

  const codeInput = document.getElementById('coupon-code').value.trim().toUpperCase();
  const currencyType = document.getElementById('currency-type').value;
  const discountType = document.getElementById('discount-type').value;
  const discountValue = parseFloat(document.getElementById('discount-value').value);
  const usageLimitInput = document.getElementById('usage-limit').value;

  if (cupons.some(c => c.code === codeInput)) {
    alert('ERRO HOLONET: Já existe um cupom ativo com esse código!');
    return;
  }

  const newCoupon = {
    id: Date.now().toString(),
    code: codeInput,
    currency: currencyType,
    discountType: discountType,
    discountValue: discountValue,
    usageLimit: usageLimitInput ? parseInt(usageLimitInput) : null,
    usageCount: 0,
    active: true
  };

  cupons.push(newCoupon);
  salvarCuponsStorage();
  renderizarTabelaCupons();

  document.getElementById('coupon-form').reset();
}

function renderizarTabelaCupons() {
  const tbody = document.getElementById('coupons-table-body');
  tbody.innerHTML = '';

  if (cupons.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--neon-gold);">[ NENHUM CUPOM REGISTRADO ]</td></tr>`;
    return;
  }

  cupons.forEach(coupon => {
    const tr = document.createElement('tr');

    let currencyText = 'AMBAS';
    if (coupon.currency === 'CREDITOS') currencyText = 'CRÉDITOS (CR)';
    if (coupon.currency === 'BRL') currencyText = 'REAIS (R$)';

    const discountText = coupon.discountType === 'PERCENTAGE'
      ? `${coupon.discountValue}%`
      : `${coupon.discountValue} ${coupon.currency === 'BRL' ? 'R$' : 'CR'}`;

    const limitText = coupon.usageLimit ? coupon.usageLimit : '∞';
    const usagesDisplay = `${coupon.usageCount} / ${limitText}`;

    const statusClass = coupon.active ? 'badge-active' : 'badge-inactive';
    const statusText = coupon.active ? 'ONLINE' : 'OFFLINE';

    tr.innerHTML = `
      <td><span class="code-tag">${coupon.code}</span></td>
      <td>${discountText}</td>
      <td>${currencyText}</td>
      <td><strong>${usagesDisplay}</strong></td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td>
        <div class="action-grid">
          <button class="btn-icon" onclick="openEditModal('${coupon.id}')" title="Editar">EDITAR</button>
          <button class="btn-icon" onclick="toggleCouponStatus('${coupon.id}')" title="Ativar/Desativar">
            ${coupon.active ? 'DESATIVAR' : 'ATIVAR'}
          </button>
          <button class="btn-icon del" onclick="deleteCoupon('${coupon.id}')" title="Remover">EXPURGAR</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function toggleCouponStatus(id) {
  const coupon = cupons.find(c => c.id === id);
  if (coupon) {
    coupon.active = !coupon.active;
    salvarCuponsStorage();
    renderizarTabelaCupons();
  }
}

function deleteCoupon(id) {
  const coupon = cupons.find(c => c.id === id);
  if (coupon && confirm(`TERMINAL IMPERIAL: Apagar o cupom [${coupon.code}] da HoloNet?`)) {
    cupons = cupons.filter(c => c.id !== id);
    salvarCuponsStorage();
    renderizarTabelaCupons();
  }
}

function openEditModal(id) {
  const coupon = cupons.find(c => c.id === id);
  if (!coupon) return;

  document.getElementById('edit-coupon-id').value = coupon.id;
  document.getElementById('edit-coupon-code').value = coupon.code;
  document.getElementById('edit-currency-type').value = coupon.currency;
  document.getElementById('edit-discount-type').value = coupon.discountType;
  document.getElementById('edit-discount-value').value = coupon.discountValue;
  document.getElementById('edit-usage-limit').value = coupon.usageLimit || '';

  document.getElementById('edit-modal').classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('active');
}

function handleSaveEditCoupon(event) {
  event.preventDefault();

  const id = document.getElementById('edit-coupon-id').value;
  const coupon = cupons.find(c => c.id === id);

  if (coupon) {
    coupon.currency = document.getElementById('edit-currency-type').value;
    coupon.discountType = document.getElementById('edit-discount-type').value;
    coupon.discountValue = parseFloat(document.getElementById('edit-discount-value').value) || coupon.discountValue;
    
    const limitValue = document.getElementById('edit-usage-limit').value;
    coupon.usageLimit = limitValue ? parseInt(limitValue) : null;

    salvarCuponsStorage();
    renderizarTabelaCupons();
    closeEditModal();
  }
}