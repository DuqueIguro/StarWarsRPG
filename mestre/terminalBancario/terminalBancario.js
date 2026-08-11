/* ===================================================
   DATAPAD BANCÁRIO IMPERIAL - STAR WARS RPG
   =================================================== */

const STORAGE_CUPONS_KEY = 'starwars_rpg_cupons';
const STORAGE_LOGS_KEY = 'starwars_rpg_banco_logs';
const STORAGE_P2W_KEY = 'starwars_rpg_p2w_sales';

// Taxa de conversão: R$ 1.00 = 10.000 Créditos Imperiais
const CONVERSION_RATE_BRL_TO_CREDITS = 10000;

let cupons = [];
let logsTransacoes = [];

document.addEventListener('DOMContentLoaded', () => {
  iniciarRelogioEmTempoReal();
  carregarDadosBancarios();
  carregarCupons();
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
 * 1. Saldo Bancário Unificado
 * Preço gasto em Créditos + (Preço gasto em BRL * 10000) = Total em Créditos Imperiais
 */
function carregarDadosBancarios() {
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
    // Valores iniciais padrão para exibição de demonstração
    gastoCreditosPuros = 250000;
    gastoReaisPuros = 150.00;
  }

  // Conversão de BRL em Créditos Imperiais
  const reaisConvertidosEmCreditos = gastoReaisPuros * CONVERSION_RATE_BRL_TO_CREDITS;
  const totalImperialCredits = gastoCreditosPuros + reaisConvertidosEmCreditos;

  // Atualiza os valores no DOM
  document.getElementById('direct-credits').innerText = gastoCreditosPuros.toLocaleString('pt-BR');
  document.getElementById('direct-brl').innerText = gastoReaisPuros.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  document.getElementById('total-imperial-credits').innerText = totalImperialCredits.toLocaleString('pt-BR');
}

/**
 * 2. Log das últimas transferências do site
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

function getLogsDefault() {
  return [
    {
      horario: '18:42:10',
      remetente: 'Darth Dravos',
      destinatario: 'Oficina Durtoc',
      valor: 15000,
      moeda: 'CREDITOS',
      pagina: 'oficina.html'
    },
    {
      horario: '17:15:33',
      remetente: 'Keiran Jinn',
      destinatario: 'Mandalorian Black Market',
      valor: 45.00,
      moeda: 'BRL',
      pagina: 'p2w.html'
    },
    {
      horario: '15:02:44',
      remetente: 'Lihua (Piloto)',
      destinatario: 'Ren Tai Sol',
      valor: 5000,
      moeda: 'CREDITOS',
      pagina: 'banco.html'
    }
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

    // Transferência entre jogadores ou compra no sistema
    const remetenteText = log.remetente || 'Sistema';
    const destinatarioText = log.destinatario || 'Loja Imperial';

    tr.innerHTML = `
      <td>${log.horario}</td>
      <td><span class="player-transfer">${remetenteText}</span></td>
      <td><span class="player-transfer">${destinatarioText}</span></td>
      <td><strong>${valorFormatado}</strong></td>
      <td>${moedaFormatada}</td>
      <td><span class="page-tag">${log.pagina}</span></td>
    `;

    tbody.appendChild(tr);
  });
}

/**
 * Gestão de Cupons
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