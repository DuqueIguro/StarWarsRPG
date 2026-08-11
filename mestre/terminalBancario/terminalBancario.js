/* ===================================================
   TERMINAL BANCÁRIO IMPERIAL - LÓGICA DO DATAPAD
   =================================================== */

const STORAGE_CUPONS_KEY = 'starwars_rpg_cupons';
const STORAGE_P2W_KEY = 'starwars_rpg_p2w_sales';

let cupons = [];
let saldoTotalCreditos = 0;

document.addEventListener('DOMContentLoaded', () => {
  carregarDadosBancarios();
  carregarCupons();
});

/**
 * 1. Saldo Bancário Galáctico acumulado
 */
function carregarDadosBancarios() {
  const vendasSalvas = localStorage.getItem(STORAGE_P2W_KEY);
  
  if (vendasSalvas) {
    try {
      const vendas = JSON.parse(vendasSalvas);
      saldoTotalCreditos = vendas.reduce((acc, item) => acc + (item.precoCreditos || 0), 0);
    } catch(e) {
      saldoTotalCreditos = 185000;
    }
  } else {
    // Valor inicial simulado
    saldoTotalCreditos = 185000; 
  }

  document.getElementById('total-credits').innerText = saldoTotalCreditos.toLocaleString('pt-BR');
  
  // Estimativa BRL (1 CR = R$ 0.10)
  const estimativaBRL = saldoTotalCreditos * 0.10;
  document.getElementById('total-brl').innerText = estimativaBRL.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/**
 * Carrega cupons ativos do banco de dados local
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
    {
      id: '1',
      code: 'IMPERIO10',
      currency: 'AMBAS',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      usageLimit: 100,
      usageCount: 28,
      active: true
    },
    {
      id: '2',
      code: 'SITH1000',
      currency: 'CREDITOS',
      discountType: 'FIXED',
      discountValue: 1000,
      usageLimit: 50,
      usageCount: 12,
      active: true
    }
  ];
}

function salvarCuponsStorage() {
  localStorage.setItem(STORAGE_CUPONS_KEY, JSON.stringify(cupons));
}

/**
 * 2. Criar Cupons de Desconto
 */
function handleCreateCoupon(event) {
  event.preventDefault();

  const codeInput = document.getElementById('coupon-code').value.trim().toUpperCase();
  const currencyType = document.getElementById('currency-type').value;
  const discountType = document.getElementById('discount-type').value;
  const discountValue = parseFloat(document.getElementById('discount-value').value);
  const usageLimitInput = document.getElementById('usage-limit').value;

  if (cupons.some(c => c.code === codeInput)) {
    alert('ERRO HOLONET: Já existe um cupom ativo registrado com esse código!');
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

/**
 * 3. Mostrar Cupons Ativos e Frequência de Uso
 */
function renderizarTabelaCupons() {
  const tbody = document.getElementById('coupons-table-body');
  tbody.innerHTML = '';

  if (cupons.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--neon-gold);">[ NENHUM REGISTRO DE CUPOM NA HOLONET ]</td></tr>`;
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

/**
 * 4. Ações: Editar, Desativar e Remover Cupons
 */
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
  if (coupon && confirm(`TERMINAL IMPERIAL: Deseja apagar o cupom [${coupon.code}] da HoloNet?`)) {
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
    coupon.discountValue = parseFloat(document.getElementById('discount-value').value) || coupon.discountValue;
    
    const limitValue = document.getElementById('edit-usage-limit').value;
    coupon.usageLimit = limitValue ? parseInt(limitValue) : null;

    salvarCuponsStorage();
    renderizarTabelaCupons();
    closeEditModal();
  }
}