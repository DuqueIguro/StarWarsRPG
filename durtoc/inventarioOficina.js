// --- ESTADO DA APLICAÇÃO E ARMAZENAMENTO ---
const STORAGE_KEY = 'starWarsRPGState';

// Constantes Hardcoded das Oficinas (Geradas no BD)
const OFICINA1_ID = '2924a75f-6638-49c8-bb65-10e8ab55f134';
const OFICINA2_ID = '6eef10e3-b1c0-475a-b2f6-811bc065706c';

const defaultState = {
    personalCredits: 0, 
    cart: [],
    personalInventory: [],
    oficina1Inventory: [], // Nova array para MCMT 1
    oficina2Inventory: [], // Nova array para MCMT 2
    activeTab: 'lojas',
    filters: { search: '', quality: 'all', category: 'all' },
    itemDatabase: [...itemDatabase]
};

let state = JSON.parse(JSON.stringify(defaultState));

// --- VARIÁVEIS DO BANCO DE DADOS (SUPABASE) ---
let currentUser = null;
let currentPersonagemId = null;

const registarLog = async (personagemId, tipoEvento, descricao, mudancaCreditos = 0) => {
    if (!personagemId) return;
    await supabaseClient.from('logs_auditoria').insert([{
        personagem_id: personagemId,
        tipo_evento: tipoEvento,
        descricao: descricao,
        mudanca_creditos: mudancaCreditos
    }]);
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

const oficina1InventoryGridEl = document.getElementById('oficina1-inventory-grid');
const oficina2InventoryGridEl = document.getElementById('oficina2-inventory-grid');
const cartDestinationEl = document.getElementById('cart-destination');

const carregarDadosDoBanco = async () => {
    personalCreditsEl.textContent = "CONECTANDO...";

    // 1. Identifica quem está logado
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !userData.user) {
        personalCreditsEl.textContent = "NÃO AUTENTICADO";
        return;
    }
    currentUser = userData.user;

    // 2. Busca o ID do personagem e o dinheiro oficial
    const { data: personagens, error: pError } = await supabaseClient
        .from('personagens')
        .select('id, creditos')
        .eq('user_id', currentUser.id)
        .limit(1);

    if (pError || !personagens || personagens.length === 0) {
        personalCreditsEl.textContent = "PERSONAGEM NÃO ENCONTRADO";
        return;
    }

    currentPersonagemId = personagens[0].id;
    state.personalCredits = personagens[0].creditos || 0;
    renderCredits();

    // 3. Puxa os itens que ele já comprou da tabela inventario
    const { data: inventarioDB, error: invError } = await supabaseClient
        .from('inventario')
        .select('*')
        .eq('personagem_id', currentPersonagemId);

    if (!invError && inventarioDB) {
        state.personalInventory = [];
        inventarioDB.forEach(dbItem => {
            // Se o item veio da loja (tem item_id)
            if (dbItem.item_id) {
                const itemBase = state.itemDatabase.find(i => i.id === dbItem.item_id);
                if (itemBase) {
                    state.personalInventory.push({ ...itemBase, db_id: dbItem.id });
                }
            }
            // Se o item foi criado manualmente (tem dados_customizados)
            else if (dbItem.dados_customizados && Object.keys(dbItem.dados_customizados).length > 0) {
                state.personalInventory.push({ ...dbItem.dados_customizados, db_id: dbItem.id });
            }
        });
        renderInventories();
    }
};

// --- FUNÇÕES DE RENDERIZAÇÃO ---
const renderCredits = () => {
    personalCreditsEl.textContent = state.personalCredits.toLocaleString();
};

const createItemCard = (item, context = 'shop') => {
    const card = document.createElement('div');

    // Normalização de dados (A Ficha usa propriedades diferentes da Loja, então usamos fallback)
    const itemName = item.name || item.nome || 'Item Desconhecido';
    const itemQuality = item.quality || 'Normal';
    const itemCategory = item.category || (item.tipo_inventario === 'arma' ? 'Armamento' : 'Equipamento Geral');
    const itemDesc = item.description || (item.notasCritico ? `Notas de Combate: ${item.notasCritico}` : 'Equipamento customizado inserido via Terminal de Comando.');
    const itemPrice = item.price !== undefined ? item.price : (parseFloat(item.custo) || 0);

    const qualityClass = itemQuality.replace(/\s/g, '-');
    card.className = `glass-pane p-4 rounded-lg flex flex-col border-l-4 quality-${qualityClass} item-card-animate transform transition-all duration-300 hover:-translate-y-1`;

    let buttonsHtml = '';
    if (context === 'shop') {
        buttonsHtml = `<button class="add-to-cart-btn mt-4 btn-primary font-bold py-2 px-4 rounded-md w-full cursor-pointer">Adicionar ao Carrinho</button>`;
    } else {
        buttonsHtml = `<button class="remove-from-inventory-btn mt-4 btn-danger font-bold py-2 px-4 rounded-md w-full cursor-pointer">Remover do Inventário</button>`;
    }

    // CÁLCULO DA CONVERSÃO (10000 créditos = 1 real)
    const priceInReais = itemPrice / 10000;

    card.innerHTML = `
        <div class="flex-grow">
            <h4 class="font-orbitron text-lg text-cyan-400">${itemName}</h4>
            <p class="text-sm text-gray-400 mb-2">Qualidade: <span class="font-bold">${itemQuality}</span></p>
            <p class="text-xs mb-2 text-gray-400">Categoria: ${itemCategory}</p>
            <p class="text-sm mb-4 text-gray-300">${itemDesc}</p>
        </div>
        <div>
            <p class="font-bold text-yellow-400 text-lg">${itemPrice.toLocaleString()} ⦻ (Créditos)</p>
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
        state.personalInventory.sort((a, b) => {
            // Garante que a ordenação suporta tanto os itens da Loja quanto os da Ficha
            const priceA = a.price !== undefined ? a.price : (parseFloat(a.custo) || 0);
            const priceB = b.price !== undefined ? b.price : (parseFloat(b.custo) || 0);
            return priceB - priceA;
        }).forEach(item => {
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

const handleCheckout = async () => {
    if (state.cart.length === 0) {
        showNotification('O carrinho está vazio!', 'danger');
        return;
    }

    if (!currentPersonagemId) {
        showNotification('Erro: Nenhum personagem ativo encontrado no sistema.', 'danger');
        return;
    }

    const selectedPayment = document.querySelector('input[name="payment-method"]:checked').value;
    let personalCost = 0;
    state.cart.forEach(cartItem => { personalCost += cartItem.item.price; });

    // Desativa o botão temporariamente para evitar cliques duplos (Double Spend)
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "PROCESSANDO TRANSAÇÃO...";

    if (selectedPayment === 'credits') {
        // BLINDAGEM: Busca o saldo atual e real do banco de dados antes de cobrar
        const { data: dbData, error: dbError } = await supabaseClient
            .from('personagens')
            .select('creditos')
            .eq('id', currentPersonagemId)
            .single();

        if (dbError || !dbData) {
            showNotification('Erro de comunicação com o Banco Imperial.', 'danger');
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "FINALIZAR COMPRA";
            return;
        }

        const saldoReal = dbData.creditos;

        if (saldoReal < personalCost) {
            showNotification('Transação Negada: Fundos Insuficientes!', 'danger');
            // Pune tentativas de manipulação restaurando o valor visual real
            state.personalCredits = saldoReal;
            renderCredits();
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "FINALIZAR COMPRA";
            return;
        }

        const novoSaldo = saldoReal - personalCost;

        // Debita o valor na conta do Supabase
        const { error: updateError } = await supabaseClient
            .from('personagens')
            .update({ creditos: novoSaldo })
            .eq('id', currentPersonagemId);

        if (updateError) {
            showNotification('Erro crítico ao processar o pagamento.', 'danger');
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "FINALIZAR COMPRA";
            return;
        }

        state.personalCredits = novoSaldo;

        // REGISTRA O LOG DE COMPRA COM RELATÓRIO FINANCEIRO
        const nomesItens = state.cart.map(c => c.item.name).join(', ');
        await registarLog(
            currentPersonagemId,
            'COMPRA_LOJA',
            `Compra Finalizada: [${nomesItens}]. Saldo anterior: ${saldoReal} | Novo Saldo: ${novoSaldo}`,
            -personalCost
        );
    } else if (selectedPayment === 'reais') {
        window.open('https://livepix.gg/doisimperadores', '_blank');
        showNotification('Aguardando compensação via Livepix. Itens despachados!', 'success');

        // REGISTRA O LOG DE COMPRA COM REAIS
        const nomesItens = state.cart.map(c => c.item.name).join(', ');
        await registarLog(
            currentPersonagemId,
            'COMPRA_REAIS',
            `Aquisição Externa (R$): [${nomesItens}].`,
            0
        );
    }

    // Cria o pacote de itens para inserir no banco
    const itensParaInserir = state.cart.map(cartItem => ({
        user_id: currentUser.id,
        personagem_id: currentPersonagemId,
        item_id: cartItem.item.id,
        quantidade: 1,
        origem: selectedPayment === 'credits' ? 'loja_comum' : 'loja_reais'
    }));

    // Dispara a entrega dos itens no inventário
    const { error: insertError } = await supabaseClient
        .from('inventario')
        .insert(itensParaInserir);

    if (insertError) {
        console.error(insertError);
        showNotification('Erro de logística: Itens não puderam ser adicionados.', 'danger');
    } else {
        if (selectedPayment === 'credits') {
            showNotification('Compra autorizada e itens armazenados!', 'success');
        }

        // Limpa o carrinho
        state.cart = [];
        cartEl.classList.add('translate-x-full');

        // Recarrega os dados do banco de dados para garantir que a interface está atualizada
        await carregarDadosDoBanco();
        renderCart();
    }

    checkoutBtn.disabled = false;
    checkoutBtn.textContent = "FINALIZAR COMPRA";
};

const handleRemoveFromInventory = async (itemToRemove) => {
    // 1. Remove visualmente para feedback instantâneo no ecrã
    state.personalInventory = state.personalInventory.filter(item => item.db_id !== itemToRemove.db_id);
    renderInventories();

    // 2. Remove definitivamente da base de dados usando o ID da transação
    const { error } = await supabaseClient
        .from('inventario')
        .delete()
        .eq('id', itemToRemove.db_id);

    if (error) {
        console.error(error);
        showNotification('Erro de comunicação. O item não foi descartado.', 'danger');
        await carregarDadosDoBanco(); // Recarrega para corrigir a interface
    } else {
        const nomeItemDesc = itemToRemove.name || itemToRemove.nome || 'Desconhecido';
        await registarLog(currentPersonagemId, 'DESCARTE_ITEM', `Item descartado pelo Terminal da Loja: ${nomeItemDesc}`);
        showNotification(`${nomeItemDesc} removido do compartimento de carga.`, 'danger');
    }
};

const handleReset = async () => {
    if (confirm('ALERTA DE SEGURANÇA MÁXIMA: Esta ação irá purgar todo o seu inventário e repor os créditos ao valor padrão de 1000. Deseja proceder?')) {
        if (!currentPersonagemId) return;

        resetBtn.disabled = true;
        resetBtn.textContent = "A PURGAR DADOS...";

        await supabaseClient.from('inventario').delete().eq('personagem_id', currentPersonagemId);
        await supabaseClient.from('personagens').update({ creditos: 1000 }).eq('id', currentPersonagemId);

        showNotification('Sistema formatado. Registo limpo.', 'success');
        await carregarDadosDoBanco();

        resetBtn.disabled = false;
        resetBtn.textContent = "Resetar Jogo";
    }
};

const handleCustomItemSubmit = async (e) => {
    e.preventDefault();
    if (!currentPersonagemId) {
        showNotification('Autenticação necessária para arquivar itens.', 'danger');
        return;
    }

    const submitBtn = document.querySelector('#custom-item-form button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "A REGISTAR...";

    const customData = {
        name: document.getElementById('custom-item-name').value,
        description: document.getElementById('custom-item-desc').value,
        price: parseInt(document.getElementById('custom-item-price').value),
        quality: document.getElementById('custom-item-quality').value,
        category: document.getElementById('custom-item-category').value,
        is_custom: true
    };

    const { error: insertError } = await supabaseClient
        .from('inventario')
        .insert([{
            user_id: currentUser.id,
            personagem_id: currentPersonagemId,
            item_id: null,
            quantidade: 1,
            origem: 'manual',
            dados_customizados: customData
        }]);

    if (insertError) {
        showNotification('Falha ao registar o diagrama do item.', 'danger');
    } else {
        await registarLog(currentPersonagemId, 'CRIACAO_MANUAL', `Item customizado criado na Loja: ${customData.name} (Valor estipulado: ${customData.price} Créditos)`);
        showNotification(`Diagrama "${customData.name}" arquivado com sucesso!`, 'success');
        customItemModal.classList.add('hidden');
        customItemForm.reset();
        await carregarDadosDoBanco(); // Sincroniza a nova base de dados
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Salvar Item";
};

// --- INICIALIZAÇÃO ---
const init = async () => {
    tabsEl.addEventListener('click', handleTabClick);
    searchInput.addEventListener('input', handleFilterChange);
    qualityFilter.addEventListener('change', handleFilterChange);
    categoryFilter.addEventListener('change', handleFilterChange);

    closeCartBtn.addEventListener('click', () => cartEl.classList.add('translate-x-full'));
    openCartBtn.addEventListener('click', () => cartEl.classList.remove('translate-x-full'));

    checkoutBtn.addEventListener('click', handleCheckout);
    resetBtn.addEventListener('click', handleReset);
    addCustomItemBtn.addEventListener('click', () => customItemModal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => customItemModal.classList.add('hidden'));
    customItemForm.addEventListener('submit', handleCustomItemSubmit);
    sortByEl.addEventListener('change', renderItems);

    renderItems(); // Desenha a base de dados em memória
    await carregarDadosDoBanco(); // Procura o utilizador e sincroniza
};

init();