/* ===================================================
   DATAPAD BANCÁRIO IMPERIAL - STAR WARS RPG
   =================================================== */

const STORAGE_CUPONS_KEY = 'starwars_rpg_cupons';
const STORAGE_LOGS_KEY = 'starwars_rpg_banco_logs';
const STORAGE_LOANS_KEY = 'starwars_rpg_emprestimos';
const STORAGE_TAXES_KEY = 'starwars_rpg_taxas';
const STORAGE_P2W_KEY = 'starwars_rpg_p2w_sales';
const STORAGE_BANK_BALANCE_KEY = 'starwars_rpg_banco_saldo_atual';

// Taxa de conversão: R$ 1.00 = 10.000 Créditos Imperiais
const CONVERSION_RATE_BRL_TO_CREDITS = 10000;

let cupons = [];
let logsTransacoes = [];
let emprestimos = [];
let taxas = [];
let saldoAtualBanco = 5000000;

document.addEventListener('DOMContentLoaded', () => {
  iniciarRelogioEmTempoReal();
  carregarDadosBancarios();
  carregarLogsTransacoes();
  carregarEmprestimos();
  carregarTaxas();
  carregarCupons();
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
 * 1. TESOURO IMPERIAL & HISTÓRICO DE VENDAS
 */
function carregarDadosBancarios() {
  const saldoSalvo = localStorage.getItem(STORAGE_BANK_BALANCE_KEY);
  if (saldoSalvo !== null) {
    saldoAtualBanco = parseInt(saldoSalvo);
  } else {
    localStorage.setItem(STORAGE_BANK_BALANCE_KEY, saldoAtualBanco.toString());
  }

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
 * 2. LOG DE ÚLTIMAS TRANSAÇÕES DA HOLONET
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

  logsTransacoes.unshift(novoLog);
  if (logsTransacoes.length > 20) logsTransacoes.pop();

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
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--neon-blue);">[ NENHUMA TRANSAÇÃO REGISTRADA RECENTEMENTE ]</td></tr>`;
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
 * 3. EMPRÉSTIMOS IMPERIAIS
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
  
  saldoAtualBanco -= amount;
  localStorage.setItem(STORAGE_BANK_BALANCE_KEY, saldoAtualBanco.toString());

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
  const grid = document.getElementById('loans-grid');
  const cardList = document.getElementById('loans-card-list');
  const tbody = document.getElementById('loans-table-body');

  // REQUISITO: Se não houver empréstimos, ocupa 1 coluna. Se houver, vira 2 colunas.
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
      <td><span class="player-transfer">${loan.player}</span></td>
      <td>${loan.amount.toLocaleString('pt-BR')} CR</td>
      <td>${loan.interest}%</td>
      <td><strong style="color: var(--neon-blue);">${loan.totalToPay.toLocaleString('pt-BR')} CR</strong></td>
      <td>
        <button class="btn-icon" onclick="quitarEmprestimo('${loan.id}')" title="Marcar Pago">QUITAR</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function quitarEmprestimo(id) {
  const loan = emprestimos.find(l => l.id === id);
  if (loan && confirm(`TERMINAL IMPERIAL: Confirmar a quitação do empréstimo de ${loan.player}?`)) {
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
 * 4. TAXAS, IMPOSTOS E LICENÇAS
 */
function carregarTaxas() {
  const taxasSalvas = localStorage.getItem(STORAGE_TAXES_KEY);
  if (taxasSalvas) {
    try {
      taxas = JSON.parse(taxasSalvas);
    } catch(e) {
      taxas = [];
    }
  } else {
    taxas = [];
  }

  renderizarTabelaTaxas();
}

function salvarTaxasStorage() {
  localStorage.setItem(STORAGE_TAXES_KEY, JSON.stringify(taxas));
}

function handleCreateTax(event) {
  event.preventDefault();

  const name = document.getElementById('tax-name').value.trim();
  const currency = document.getElementById('tax-currency').value;
  const value = parseFloat(document.getElementById('tax-value').value);
  const type = document.getElementById('tax-type').value;

  const newTax = {
    id: Date.now().toString(),
    name: name,
    currency: currency,
    value: value,
    type: type,
    active: true
  };

  taxas.push(newTax);
  salvarTaxasStorage();
  renderizarTabelaTaxas();

  document.getElementById('tax-form').reset();
}

function renderizarTabelaTaxas() {
  const grid = document.getElementById('taxes-grid');
  const cardList = document.getElementById('taxes-card-list');
  const tbody = document.getElementById('taxes-table-body');

  // REQUISITO: Se não houver taxas, ocupa 1 coluna. Se houver, vira 2 colunas.
  if (taxas.length === 0) {
    grid.className = 'dynamic-grid single-col';
    cardList.style.display = 'none';
    return;
  }

  grid.className = 'dynamic-grid double-col';
  cardList.style.display = 'block';
  tbody.innerHTML = '';

  taxas.forEach(tax => {
    const tr = document.createElement('tr');

    const valorFormatado = tax.currency === 'BRL'
      ? `R$ ${tax.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      : `${tax.value.toLocaleString('pt-BR')} CR`;

    const statusClass = tax.active ? 'badge-active' : 'badge-inactive';
    const statusText = tax.active ? 'VIGENTE' : 'SUSPENSA';

    tr.innerHTML = `
      <td><strong>${tax.name}</strong></td>
      <td>${valorFormatado}</td>
      <td>${tax.type}</td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td>
        <div class="action-grid">
          <button class="btn-icon" onclick="toggleTaxStatus('${tax.id}')">
            ${tax.active ? 'SUSPENDER' : 'ATIVAR'}
          </button>
          <button class="btn-icon del" onclick="deleteTax('${tax.id}')">REVOGAR</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function toggleTaxStatus(id) {
  const tax = taxas.find(t => t.id === id);
  if (tax) {
    tax.active = !tax.active;
    salvarTaxasStorage();
    renderizarTabelaTaxas();
  }
}

function deleteTax(id) {
  const tax = taxas.find(t => t.id === id);
  if (tax && confirm(`DECRETO IMPERIAL: Revogar a taxa [${tax.name}]?`)) {
    taxas = taxas.filter(t => t.id !== id);
    salvarTaxasStorage();
    renderizarTabelaTaxas();
  }
}

/**
 * 5. CUPONS DE DESCONTO
 */
function carregarCupons() {
  const cuponsSalvos = localStorage.getItem(STORAGE_CUPONS_KEY);
  if (cuponsSalvos) {
    try {
      cupons = JSON.parse(cuponsSalvos);
    } catch(e) {
      cupons = [];
    }
  } else {
    cupons = [];
  }

  renderizarTabelaCupons();
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
  const grid = document.getElementById('coupons-grid');
  const cardList = document.getElementById('coupons-card-list');
  const tbody = document.getElementById('coupons-table-body');

  // REQUISITO: Cupons registrados só aparece se houver cupom (1 col -> 2 col)
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