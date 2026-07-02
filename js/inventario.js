// --- ESTADO DA APLICAÇÃO E ARMAZENAMENTO ---
const STORAGE_KEY = 'starWarsRPGState';

const defaultState = {
    personalCredits: 1000,
    cart: [],
    personalInventory: [],
    activeTab: 'lojas',
    filters: { search: '', quality: 'all', category: 'all' },
    itemDatabase: [...itemDatabase]
};

let state = JSON.parse(JSON.stringify(defaultState));

const saveState = () => {
    const stateToSave = {
        personalCredits: state.personalCredits,
        personalInventory: state.personalInventory,
        itemDatabase: state.itemDatabase
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
};

const loadState = () => {
    const savedStateJSON = localStorage.getItem(STORAGE_KEY);
    if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        Object.assign(state, savedState);
    }
};

// --- ELEMENTOS DO DOM ---
const personalCreditsEl = document.getElementById('personal-credits');
const itemGridEl = document.getElementById('item-grid');
const personalInventoryGridEl = document.getElementById('personal-inventory-grid');
const tabsEl = document.getElementById('tabs');
const tabPanes = document.querySelectorAll('.tab-pane');
const searchInput = document.getElementById('search-input');
const qualityFilter = document.getElementById('quality-filter');
const categoryFilter = document.getElementById('category-filter');
const sortByEl = document.getElementById('sort-by');
const cartEl = document.getElementById('cart');
const cartItemsEl = document.getElementById('cart-items');
const closeCartBtn = document.getElementById('close-cart-btn');
const openCartBtn = document.getElementById('open-cart-btn'); // Novo Botão
const cartTotalPersonalEl = document.getElementById('cart-total-personal');
const cartTotalReaisEl = document.getElementById('cart-total-reais');
const checkoutBtn = document.getElementById('checkout-btn');
const notificationEl = document.getElementById('notification');
const resetBtn = document.getElementById('reset-btn');
const addCustomItemBtn = document.getElementById('add-custom-item-btn');
const customItemModal = document.getElementById('custom-item-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const customItemForm = document.getElementById('custom-item-form');


// --- FUNÇÕES DE RENDERIZAÇÃO ---
const renderCredits = () => {
    personalCreditsEl.textContent = state.personalCredits.toLocaleString();
};

const createItemCard = (item, context = 'shop') => {
    const card = document.createElement('div');
    const qualityClass = item.quality.replace(/\s/g, '-');
    card.className = `glass-pane p-4 rounded-lg flex flex-col border-l-4 quality-${qualityClass} item-card-animate transform transition-all duration-300 hover:-translate-y-1`;

    let buttonsHtml = '';
    if (context === 'shop') {
        buttonsHtml = `<button class="add-to-cart-btn mt-4 btn-primary font-bold py-2 px-4 rounded-md w-full cursor-pointer">Adicionar ao Carrinho</button>`;
    } else {
        buttonsHtml = `<button class="remove-from-inventory-btn mt-4 btn-danger font-bold py-2 px-4 rounded-md w-full cursor-pointer">Remover do Inventário</button>`;
    }

    // CÁLCULO DA CONVERSÃO (10000 créditos = 1 real)
    const priceInReais = item.price / 10000;

    card.innerHTML = `
        <div class="flex-grow">
            <h4 class="font-orbitron text-lg text-cyan-400">${item.name}</h4>
            <p class="text-sm text-gray-400 mb-2">Qualidade: <span class="font-bold">${item.quality}</span></p>
            <p class="text-xs mb-2 text-gray-400">Categoria: ${item.category}</p>
            <p class="text-sm mb-4 text-gray-300">${item.description}</p>
        </div>
        <div>
            <p class="font-bold text-yellow-400 text-lg">${item.price.toLocaleString()} ⦻ (Créditos)</p>
            <p class="text-sm text-green-400 font-bold mb-2">R$ ${priceInReais.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            ${buttonsHtml}
        </div>
    `;

    const itemData = JSON.stringify(item);
    if (context === 'shop') {
        card.querySelector('.add-to-cart-btn').addEventListener('click', () => handleAddToCart(item));
    } else {
        card.querySelector('.remove-from-inventory-btn').dataset.item = itemData;
        card.querySelector('.remove-from-inventory-btn').addEventListener('click', (e) => {
            const itemToRemove = JSON.parse(e.target.dataset.item);
            handleRemoveFromInventory(itemToRemove);
        });
    }

    return card;
};

const qualityOrder = {
    'Lendária': 5,
    'Imperial': 4,
    'Excelente': 3,
    'Boa': 2,
    'Normal': 1,
    'Baixa': 0
};

const renderItems = () => {
    itemGridEl.innerHTML = '';
    let filteredItems = state.itemDatabase.filter(item => {
        const searchMatch = item.name.toLowerCase().includes(state.filters.search.toLowerCase());
        const qualityMatch = state.filters.quality === 'all' || item.quality === state.filters.quality;
        const categoryMatch = state.filters.category === 'all' || item.category === state.filters.category;
        return searchMatch && qualityMatch && categoryMatch;
    });

    if (filteredItems.length === 0) {
        itemGridEl.innerHTML = '<p class="text-gray-400 col-span-full text-center">Nenhum item encontrado com os filtros atuais.</p>';
        return;
    }

    const sortMethod = sortByEl.value;
    filteredItems.sort((a, b) => {
        switch (sortMethod) {
            case 'price-asc':
                return a.price - b.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'quality-desc':
                return (qualityOrder[b.quality] || 0) - (qualityOrder[a.quality] || 0);
            case 'quality-asc':
                return (qualityOrder[a.quality] || 0) - (qualityOrder[b.quality] || 0);
            case 'price-desc':
            default:
                return b.price - a.price;
        }
    });

    filteredItems.forEach(item => {
        const card = createItemCard(item, 'shop');
        itemGridEl.appendChild(card);
    });
};

const renderInventories = () => {
    personalInventoryGridEl.innerHTML = '<p class="text-gray-400 col-span-full text-center">Nenhum item no inventário pessoal.</p>';
    if (state.personalInventory.length > 0) {
        personalInventoryGridEl.innerHTML = '';
        state.personalInventory.sort((a, b) => b.price - a.price).forEach(item => {
            personalInventoryGridEl.appendChild(createItemCard(item, 'personal'));
        });
    }
};

const renderCart = () => {
    cartItemsEl.innerHTML = '';
    let totalPersonal = 0;

    if (state.cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="text-gray-400 text-center py-4">O carrinho está vazio.</p>';
    } else {
        state.cart.forEach((cartItem, index) => {
            const div = document.createElement('div');
            div.className = 'mb-4 p-3 rounded-md bg-gray-900/40 border border-gray-800 flex flex-col item-card-animate';

            const itemPriceInReais = cartItem.item.price / 10000;

            div.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="font-bold text-sm text-cyan-100">${cartItem.item.name}</p>
                        <p class="text-xs text-yellow-400">${cartItem.item.price.toLocaleString()} Créditos</p>
                        <p class="text-xs text-green-400">R$ ${itemPriceInReais.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </div>
                <button data-index="${index}" class="remove-from-cart-btn text-xs btn-danger px-2 py-1 rounded-md w-full mt-1 cursor-pointer">Remover</button>
            `;
            totalPersonal += cartItem.item.price;
            cartItemsEl.appendChild(div);
        });
    }

    const totalInReais = totalPersonal / 10000;
    cartTotalPersonalEl.textContent = `${totalPersonal.toLocaleString()} Créditos`;
    cartTotalReaisEl.textContent = `R$ ${totalInReais.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    document.querySelectorAll('.remove-from-cart-btn').forEach(btn => btn.addEventListener('click', (e) => handleRemoveFromCart(parseInt(e.target.dataset.index))));
};

// --- FUNÇÕES DE MANIPULAÇÃO (HANDLERS) ---
const handleTabClick = (e) => {
    if (!e.target.matches('.tab-btn')) return;
    const tabName = e.target.dataset.tab;
    state.activeTab = tabName;
    tabsEl.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.toggle('tab-active', tab.dataset.tab === tabName);
        tab.classList.toggle('tab-inactive', tab.dataset.tab !== tabName);
    });
    tabPanes.forEach(pane => {
        pane.classList.toggle('hidden', pane.id !== `${tabName}-pane`);
    });
};

const handleFilterChange = () => {
    state.filters.search = searchInput.value;
    state.filters.quality = qualityFilter.value;
    state.filters.category = categoryFilter.value;
    renderItems();
};

const handleUpdateCredits = (e) => {
    const value = parseInt(e.target.textContent.replace(/[,.]/g, ''));
    if (!isNaN(value)) {
        if (e.target.id === 'personal-credits') state.personalCredits = value;
    }
    renderCredits();
    saveState();
};

const showNotification = (message, type = 'success') => {
    notificationEl.textContent = message;
    notificationEl.className = `notification fixed top-5 right-5 p-4 rounded-lg text-white font-bold z-50 opacity-0 transform translate-y-[-20px] transition-all duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
    setTimeout(() => {
        notificationEl.classList.remove('opacity-0', 'translate-y-[-20px]');
        notificationEl.classList.add('opacity-100', 'translate-y-0');
    }, 10);
    setTimeout(() => {
        notificationEl.classList.remove('opacity-100', 'translate-y-0');
        notificationEl.classList.add('opacity-0', 'translate-y-[-20px]');
    }, 3000);
};

const handleAddToCart = (item) => {
    const uniqueItem = { ...item, uid: Date.now() + Math.random() };
    state.cart.push({ item: uniqueItem, destination: null });
    cartEl.classList.remove('translate-x-full');
    renderCart();
    showNotification(`${item.name} adicionado ao carrinho!`);
};

const handleRemoveFromCart = (index) => {
    const removed = state.cart.splice(index, 1);
    showNotification(`${removed[0].item.name} removido do carrinho.`, 'danger');
    renderCart();
};

const handleAssignDestination = (index, destination) => {
    state.cart[index].destination = destination;
    renderCart();
};

const handleCheckout = () => {
    if (state.cart.length === 0) {
        showNotification('O carrinho está vazio!', 'danger');
        return;
    }

    const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;

    let personalCost = 0;
    state.cart.forEach(cartItem => {
        personalCost += cartItem.item.price;
    });

    if (selectedPayment === 'credits') {
        if (state.personalCredits < personalCost) {
            showNotification('Créditos pessoais insuficientes!', 'danger');
            return;
        }
        state.personalCredits -= personalCost;

        state.cart.forEach(cartItem => {
            state.personalInventory.push(cartItem.item);
        });
        showNotification('Compra realizada com Créditos!', 'success');

    } else if (selectedPayment === 'reais') {
        state.cart.forEach(cartItem => {
            state.personalInventory.push(cartItem.item);
        });

        window.open('https://livepix.gg/doisimperadores', '_blank');
        showNotification('Redirecionando para o Livepix para concluir o pagamento!', 'success');
    }

    state.cart = [];
    renderCredits();
    renderInventories();
    renderCart();
    cartEl.classList.add('translate-x-full');
    saveState();
};

const handleRemoveFromInventory = (itemToRemove) => {
    state.personalInventory = state.personalInventory.filter(item => item.uid !== itemToRemove.uid);
    showNotification(`${itemToRemove.name} removido do inventário.`, 'danger');
    renderInventories();
    saveState();
};

const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todo o progresso? Créditos, inventários e itens customizados serão perdidos.')) {
        localStorage.removeItem(STORAGE_KEY);
        state = JSON.parse(JSON.stringify(defaultState));
        init();
    }
};

const handleCustomItemSubmit = (e) => {
    e.preventDefault();
    const newItem = {
        name: document.getElementById('custom-item-name').value,
        description: document.getElementById('custom-item-desc').value,
        price: parseInt(document.getElementById('custom-item-price').value),
        quality: document.getElementById('custom-item-quality').value,
        category: document.getElementById('custom-item-category').value,
        uid: Date.now() + Math.random()
    };

    state.itemDatabase.push(newItem);
    state.personalInventory.push(newItem);

    showNotification(`Item customizado "${newItem.name}" adicionado!`, 'success');
    saveState();
    renderItems();
    renderInventories();
    customItemModal.classList.add('hidden');
    customItemForm.reset();
};

// --- INICIALIZAÇÃO ---
const init = () => {
    loadState();
    personalCreditsEl.addEventListener('blur', handleUpdateCredits);
    tabsEl.addEventListener('click', handleTabClick);
    searchInput.addEventListener('input', handleFilterChange);
    qualityFilter.addEventListener('change', handleFilterChange);
    categoryFilter.addEventListener('change', handleFilterChange);
    
    // Controles de Visibilidade do Carrinho (Sem Mutar Dados)
    closeCartBtn.addEventListener('click', () => cartEl.classList.add('translate-x-full'));
    openCartBtn.addEventListener('click', () => cartEl.classList.remove('translate-x-full'));
    
    checkoutBtn.addEventListener('click', handleCheckout);
    resetBtn.addEventListener('click', handleReset);
    addCustomItemBtn.addEventListener('click', () => customItemModal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => customItemModal.classList.add('hidden'));
    customItemForm.addEventListener('submit', handleCustomItemSubmit);
    sortByEl.addEventListener('change', renderItems);
    renderCredits();
    renderItems();
    renderInventories();
};

init();