// --- ESTADO DA APLICAÇÃO E ARMAZENAMENTO ---
const STORAGE_KEY = 'starWarsRPGState';

const defaultState = {
    personalCredits: 3500,
    workshopCredits: 10000,
    cart: [],
    personalInventory: [],
    workshopInventory: [],
    activeTab: 'lojas',
    filters: { search: '', quality: 'all', category: 'all' },
    itemDatabase: [...itemDatabase] // Usa uma cópia da base de dados original
};

let state = JSON.parse(JSON.stringify(defaultState));

const saveState = () => {
    const stateToSave = {
        personalCredits: state.personalCredits,
        workshopCredits: state.workshopCredits,
        personalInventory: state.personalInventory,
        workshopInventory: state.workshopInventory,
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
const workshopCreditsEl = document.getElementById('workshop-credits');
const itemGridEl = document.getElementById('item-grid');
const personalInventoryGridEl = document.getElementById('personal-inventory-grid');
const workshopInventoryGridEl = document.getElementById('workshop-inventory-grid');
const tabsEl = document.getElementById('tabs');
const tabPanes = document.querySelectorAll('.tab-pane');
const searchInput = document.getElementById('search-input');
const qualityFilter = document.getElementById('quality-filter');
const categoryFilter = document.getElementById('category-filter');
const cartEl = document.getElementById('cart');
const cartItemsEl = document.getElementById('cart-items');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartTotalPersonalEl = document.getElementById('cart-total-personal');
const cartTotalWorkshopEl = document.getElementById('cart-total-workshop');
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
    workshopCreditsEl.textContent = state.workshopCredits.toLocaleString();
};

const createItemCard = (item, context = 'shop') => {
    const card = document.createElement('div');
    const qualityClass = item.quality.replace(/\s/g, '-');
    card.className = `glass-pane p-4 rounded-lg flex flex-col border-l-4 quality-${qualityClass}`;
    
    let buttonsHtml = '';
    if (context === 'shop') {
        buttonsHtml = `<button class="add-to-cart-btn mt-4 btn-primary font-bold py-2 px-4 rounded-md w-full">Adicionar ao Carrinho</button>`;
    } else {
         buttonsHtml = `<button class="remove-from-inventory-btn mt-4 btn-danger font-bold py-2 px-4 rounded-md w-full">Remover do Inventário</button>`;
    }

    card.innerHTML = `
        <div class="flex-grow">
            <h4 class="font-orbitron text-lg text-cyan-400">${item.name}</h4>
            <p class="text-sm text-gray-400 mb-2">Qualidade: <span class="font-bold">${item.quality}</span></p>
            <p class="text-xs mb-2">Categoria: ${item.category}</p>
            <p class="text-sm mb-4">${item.description}</p>
        </div>
        <div>
            <p class="font-bold text-yellow-400 text-lg">${item.price.toLocaleString()} Créditos</p>
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
            if(context === 'personal') handleRemoveFromInventory('personal', itemToRemove);
            if(context === 'workshop') handleRemoveFromInventory('workshop', itemToRemove);
        });
    }

    return card;
};

const renderItems = () => {
    itemGridEl.innerHTML = '';
    const filteredItems = state.itemDatabase.filter(item => {
        const searchMatch = item.name.toLowerCase().includes(state.filters.search.toLowerCase());
        const qualityMatch = state.filters.quality === 'all' || item.quality === state.filters.quality;
        const categoryMatch = state.filters.category === 'all' || item.category === state.filters.category;
        return searchMatch && qualityMatch && categoryMatch;
    });

    if (filteredItems.length === 0) {
         itemGridEl.innerHTML = '<p class="text-gray-400 col-span-full text-center">Nenhum item encontrado com os filtros atuais.</p>';
         return;
    }

    filteredItems.sort((a,b) => b.price - a.price);

    filteredItems.forEach(item => {
        const card = createItemCard(item, 'shop');
        itemGridEl.appendChild(card);
    });
};

const renderInventories = () => {
    personalInventoryGridEl.innerHTML = '<p class="text-gray-400 col-span-full text-center">Nenhum item no inventário pessoal.</p>';
    workshopInventoryGridEl.innerHTML = '<p class="text-gray-400 col-span-full text-center">Nenhum item no inventário da oficina.</p>';
    
    if (state.personalInventory.length > 0) {
        personalInventoryGridEl.innerHTML = '';
        state.personalInventory.sort((a,b) => b.price - a.price).forEach(item => {
            personalInventoryGridEl.appendChild(createItemCard(item, 'personal'));
        });
    }

    if (state.workshopInventory.length > 0) {
        workshopInventoryGridEl.innerHTML = '';
        state.workshopInventory.sort((a,b) => b.price - a.price).forEach(item => {
            workshopInventoryGridEl.appendChild(createItemCard(item, 'workshop'));
        });
    }
};

const renderCart = () => {
    cartItemsEl.innerHTML = '';
    let totalPersonal = 0;
    let totalWorkshop = 0;

    if (state.cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="text-gray-400">O carrinho está vazio.</p>';
    } else {
        state.cart.forEach((cartItem, index) => {
            const div = document.createElement('div');
            div.className = 'mb-4 p-2 rounded-md bg-gray-900/50';
            div.innerHTML = `
                <p class="font-bold">${cartItem.item.name}</p>
                <p class="text-sm text-yellow-400">${cartItem.item.price.toLocaleString()} Créditos</p>
                <div class="mt-2 flex space-x-2">
                   <button data-index="${index}" class="assign-btn assign-personal-btn text-xs btn-primary px-2 py-1 rounded-md flex-1">Personagem</button>
                   <button data-index="${index}" class="assign-btn assign-workshop-btn text-xs btn-primary px-2 py-1 rounded-md flex-1">Oficina</button>
                </div>
                <div class="mt-1 flex">
                    <button data-index="${index}" class="remove-from-cart-btn text-xs btn-danger px-2 py-1 rounded-md w-full">Remover</button>
                </div>
            `;

            const personalBtn = div.querySelector('.assign-personal-btn');
            const workshopBtn = div.querySelector('.assign-workshop-btn');

            if (cartItem.destination === 'personal') {
                personalBtn.classList.replace('btn-primary', 'btn-secondary');
                personalBtn.classList.add('opacity-75');
                totalPersonal += cartItem.item.price;
            } else if (cartItem.destination === 'workshop') {
                workshopBtn.classList.replace('btn-primary', 'btn-secondary');
                workshopBtn.classList.add('opacity-75');
                totalWorkshop += cartItem.item.price;
            }
            cartItemsEl.appendChild(div);
        });
    }

    cartTotalPersonalEl.textContent = `${totalPersonal.toLocaleString()} Créditos`;
    cartTotalWorkshopEl.textContent = `${totalWorkshop.toLocaleString()} Créditos`;
    
    document.querySelectorAll('.assign-btn').forEach(btn => btn.addEventListener('click', (e) => {
        const destination = e.target.classList.contains('assign-personal-btn') ? 'personal' : 'workshop';
        handleAssignDestination(e.target.dataset.index, destination);
    }));
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
        else state.workshopCredits = value;
    }
    renderCredits();
    saveState();
};

const showNotification = (message, type = 'success') => {
    notificationEl.textContent = message;
    notificationEl.className = `notification fixed top-5 right-5 p-4 rounded-lg text-white font-bold z-50 opacity-0 transform translate-y-[-20px] ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`;
    
    // Atraso mínimo para garantir que a transição CSS funcione
    setTimeout(() => {
        // Remove as classes que o escondem
        notificationEl.classList.remove('opacity-0', 'translate-y-[-20px]');
        // Adiciona as classes que o tornam visível
        notificationEl.classList.add('opacity-100', 'translate-y-0');
    }, 10);

    // Define um tempo para o popup desaparecer
    setTimeout(() => {
        // Remove as classes que o tornam visível
        notificationEl.classList.remove('opacity-100', 'translate-y-0');
        // Adiciona de volta as classes que o escondem para ativar a animação de saída
        notificationEl.classList.add('opacity-0', 'translate-y-[-20px]');
    }, 3000); // O popup desaparecerá após 3000ms (3 segundos)
};

const handleAddToCart = (item) => {
    const uniqueItem = {...item, uid: Date.now() + Math.random() };
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
    let personalCost = 0;
    let workshopCost = 0;
    if (state.cart.some(item => item.destination === null)) {
        showNotification('Por favor, atribua todos os itens a um inventário.', 'danger');
        return;
    }
    state.cart.forEach(cartItem => {
        if (cartItem.destination === 'personal') personalCost += cartItem.item.price;
        else workshopCost += cartItem.item.price;
    });
    if (state.personalCredits < personalCost) {
        showNotification('Créditos pessoais insuficientes!', 'danger');
        return;
    }
    if (state.workshopCredits < workshopCost) {
        showNotification('Créditos da oficina insuficientes!', 'danger');
        return;
    }
    state.personalCredits -= personalCost;
    state.workshopCredits -= workshopCost;
    state.cart.forEach(cartItem => {
        if (cartItem.destination === 'personal') state.personalInventory.push(cartItem.item);
        else state.workshopInventory.push(cartItem.item);
    });
    state.cart = [];
    renderCredits();
    renderInventories();
    renderCart();
    cartEl.classList.add('translate-x-full');
    showNotification('Compra realizada com sucesso!', 'success');
    saveState();
};

const handleRemoveFromInventory = (inventoryType, itemToRemove) => {
    if(inventoryType === 'personal') {
        state.personalInventory = state.personalInventory.filter(item => item.uid !== itemToRemove.uid);
    } else if (inventoryType === 'workshop') {
        state.workshopInventory = state.workshopInventory.filter(item => item.uid !== itemToRemove.uid);
    }
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

    const destination = document.querySelector('input[name="inventory"]:checked').value;

    // Adiciona ao banco de dados principal e ao inventário correto
    state.itemDatabase.push(newItem);
    if (destination === 'personal') {
        state.personalInventory.push(newItem);
    } else {
        state.workshopInventory.push(newItem);
    }

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
    workshopCreditsEl.addEventListener('blur', handleUpdateCredits);
    tabsEl.addEventListener('click', handleTabClick);
    searchInput.addEventListener('input', handleFilterChange);
    qualityFilter.addEventListener('change', handleFilterChange);
    categoryFilter.addEventListener('change', handleFilterChange);
    closeCartBtn.addEventListener('click', () => cartEl.classList.add('translate-x-full'));
    checkoutBtn.addEventListener('click', handleCheckout);
    resetBtn.addEventListener('click', handleReset);
    addCustomItemBtn.addEventListener('click', () => customItemModal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => customItemModal.classList.add('hidden'));
    customItemForm.addEventListener('submit', handleCustomItemSubmit);
    
    renderCredits();
    renderItems();
    renderInventories();
};

init();