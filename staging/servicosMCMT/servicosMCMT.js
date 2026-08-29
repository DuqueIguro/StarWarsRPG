// --- MCMT WORKSHOP SERVICES SCRIPT (SUPABASE INTEGRATED) ---

let currentMode = 'view'; // 'view' or 'edit'
let currentWorkshop = 'MCMT1';
let currentCategory = 'todas';
let partsDatabase = []; 
let workshopServices = { MCMT1: [], MCMT2: [] };

// Initialize Data
document.addEventListener("DOMContentLoaded", async () => {
    await loadDatabase();
    await fetchServicesFromDB();
    renderServices();
});

// Load parts database JavaScript file (js/databaseInventario.js -> itemDatabase)
async function loadDatabase() {
    try {
        if (typeof itemDatabase !== 'undefined' && Array.isArray(itemDatabase)) {
            partsDatabase = itemDatabase;
            return;
        }

        try {
            const module = await import('../../js/databaseInventario.js');
            partsDatabase = module.itemDatabase || module.default || [];
            if (partsDatabase.length) return;
        } catch (e) {
            // Fallback to script tag injection
        }

        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '../js/databaseInventario.js';
            script.onload = () => {
                if (typeof itemDatabase !== 'undefined') {
                    partsDatabase = itemDatabase;
                } else if (window.itemDatabase) {
                    partsDatabase = window.itemDatabase;
                }
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    } catch (err) {
        console.error("Erro ao carregar banco de dados de peças:", err);
    }
}

// Fetch Services from Supabase (servicos_mcmt table)
async function fetchServicesFromDB() {
    workshopServices.MCMT1 = [];
    workshopServices.MCMT2 = [];

    if (typeof supabaseClient === 'undefined') {
        console.warn("Supabase client não encontrado. Verifique se supabase.js foi carregado.");
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('servicos_mcmt')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error("Erro ao buscar serviços no banco:", error.message);
            return;
        }

        if (data) {
            data.forEach(item => {
                const serviceObj = {
                    id: item.id,
                    oficina: item.oficina || 'MCMT1',
                    category: item.categoria || 'outros',
                    name: item.nome_servico || '',
                    laborCost: parseInt(item.mao_de_obra) || 0,
                    partName: item.peca || '',
                    partPrice: parseInt(item.preco_componentes) || 0,
                    totalPrice: (parseInt(item.mao_de_obra) || 0) + (parseInt(item.preco_componentes) || 0),
                    description: item.descricao || '',
                    quality: getQualityForPart(item.peca)
                };

                const targetWorkshop = serviceObj.oficina.toUpperCase().trim();
                if (workshopServices[targetWorkshop]) {
                    workshopServices[targetWorkshop].push(serviceObj);
                } else {
                    workshopServices.MCMT1.push(serviceObj);
                }
            });
        }
    } catch (err) {
        console.error("Falha ao comunicar com Supabase:", err);
    }
}

// Helper: Tenta deduzir a qualidade a partir do nome da peça ou da base local
function getQualityForPart(partName) {
    if (!partName) return '';
    const match = partsDatabase.find(p => p.name && p.name.toLowerCase() === partName.toLowerCase());
    if (match && match.quality) return match.quality;

    if (partName.includes('(Exc)') || partName.includes('Excelente')) return 'Excelente';
    if (partName.includes('(Normal)')) return 'Normal';
    if (partName.includes('(Boa)')) return 'Boa';
    if (partName.includes('(Baixa)')) return 'Baixa';
    if (partName.includes('(Imp)') || partName.includes('Imperial')) return 'Imperial';
    if (partName.includes('(Lend)') || partName.includes('Lendária')) return 'Lendária';
    return '';
}

// Switch Workshop (MCMT1 / MCMT2)
function switchWorkshop(workshop) {
    currentWorkshop = workshop;
    document.getElementById("currentWorkshopLabel").textContent = workshop;
    renderServices();
}

// Set View / Edit Mode
function setMode(mode) {
    currentMode = mode;
    const viewBtn = document.getElementById("viewModeBtn");
    const editBtn = document.getElementById("editModeBtn");
    const editPanel = document.getElementById("editControls");

    if (mode === 'edit') {
        document.body.classList.add("edit-mode-active");
        editBtn.classList.add("active");
        viewBtn.classList.remove("active");
        editPanel.classList.remove("hidden");
    } else {
        document.body.classList.remove("edit-mode-active");
        viewBtn.classList.add("active");
        editBtn.classList.remove("active");
        editPanel.classList.add("hidden");
    }
    renderServices();
}

// Filter Category
function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    if (event && event.target) {
        event.target.classList.add("active");
    }
    renderServices();
}

// Render Services with Search Filter
function renderServices() {
    const container = document.getElementById("servicesContainer");
    const searchQuery = document.getElementById("searchInput").value.toLowerCase().trim();

    let list = workshopServices[currentWorkshop] || [];

    // Category filter
    if (currentCategory !== 'todas') {
        list = list.filter(s => s.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Text search filter
    if (searchQuery) {
        list = list.filter(s =>
            (s.name && s.name.toLowerCase().includes(searchQuery)) ||
            (s.partName && s.partName.toLowerCase().includes(searchQuery)) ||
            (s.description && s.description.toLowerCase().includes(searchQuery)) ||
            (s.quality && s.quality.toLowerCase().includes(searchQuery))
        );
    }

    if (list.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 3rem; color: var(--text-dim);">Nenhum serviço registrado para a ${currentWorkshop} com os filtros atuais.</div>`;
        return;
    }

    // Group by categories
    const categories = {
        naves: "Naves",
        droids: "Droids",
        equipamentos: "Equipamentos",
        outros: "Outros"
    };

    let html = "";

    for (const [key, label] of Object.entries(categories)) {
        const group = list.filter(s => s.category.toLowerCase() === key.toLowerCase());
        if (group.length === 0) continue;

        html += `
      <div class="services-section">
        <div class="section-header">
          <h2>${label}</h2>
        </div>
        <table class="service-table">
          <thead>
            <tr>
              <th>Serviço / Descrição</th>
              <th>Peça Utilizada</th>
              <th>Qualidade Peça</th>
              <th>Custo Peça Base</th>
              <th>Mão de Obra</th>
              <th>Valor Total</th>
              ${currentMode === 'edit' ? '<th>Ações</th>' : ''}
            </tr>
          </thead>
          <tbody>
    `;

        group.forEach(s => {
            html += `
        <tr>
          <td>
            <span class="service-name">${s.name}</span>
            <div class="service-desc">${s.description || 'Sem descrição.'}</div>
          </td>
          <td>${s.partName ? s.partName : '<em>Nenhuma peça</em>'}</td>
          <td>
            ${s.quality ? `<span class="quality-badge quality-${s.quality}">${s.quality}</span>` : '-'}
          </td>
          <td>${s.partPrice ? s.partPrice + ' cr' : '-'}</td>
          <td>${s.laborCost} cr</td>
          <td class="price-cell">${s.totalPrice} cr</td>
          ${currentMode === 'edit' ? `
            <td>
              <button class="btn-mcmt" onclick="editService(${s.id})">Editar</button>
              <button class="btn-mcmt btn-danger" onclick="deleteService(${s.id})">Excluir</button>
            </td>
          ` : ''}
        </tr>
      `;
        });

        html += `
          </tbody>
        </table>
      </div>
    `;
    }

    container.innerHTML = html;
}

// Autocomplete Logic using itemDatabase
function onPartSearch(val) {
    const listContainer = document.getElementById("autocompleteList");
    listContainer.innerHTML = "";
    if (!val || val.trim() === "") return;

    const db = partsDatabase.length ? partsDatabase : (typeof itemDatabase !== 'undefined' ? itemDatabase : []);
    const query = val.toLowerCase().trim();

    const matches = db.filter(item =>
        item.name && item.name.toLowerCase().includes(query)
    ).slice(0, 10);

    if (matches.length === 0) {
        const div = document.createElement("div");
        div.style.color = "var(--text-dim)";
        div.style.cursor = "default";
        div.textContent = "Nenhuma peça encontrada";
        listContainer.appendChild(div);
        return;
    }

    matches.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
      <span>${item.name}</span>
      <span class="quality-badge quality-${item.quality}">${item.quality} - ${item.price} cr</span>
    `;
        div.onclick = () => selectPart(item);
        listContainer.appendChild(div);
    });
}

function selectPart(item) {
    document.getElementById("partAutocomplete").value = item.name;
    document.getElementById("selectedPartId").value = item.id;
    document.getElementById("autocompleteList").innerHTML = "";

    document.getElementById("infoPartName").textContent = item.name;

    const qualBadge = document.getElementById("infoPartQuality");
    qualBadge.textContent = item.quality;
    qualBadge.className = `quality-badge quality-${item.quality}`;

    document.getElementById("infoPartPrice").textContent = item.price;
    document.getElementById("partCostOverride").value = item.price;

    document.getElementById("partInfoBox").classList.remove("hidden");
    calculateTotalModal();
}

function calculateTotalModal() {
    const labor = parseFloat(document.getElementById("laborCost").value) || 0;
    const partCost = parseFloat(document.getElementById("partCostOverride").value) || 0;
    const total = labor + partCost;
    document.getElementById("modalTotalCalculated").textContent = `${total} cr`;
}

// Modal Handlers
function openAddServiceModal() {
    document.getElementById("modalTitle").textContent = `Adicionar Novo Serviço (${currentWorkshop})`;
    document.getElementById("serviceForm").reset();
    document.getElementById("serviceId").value = "";
    document.getElementById("selectedPartId").value = "";
    document.getElementById("partInfoBox").classList.add("hidden");
    document.getElementById("modalTotalCalculated").textContent = "0 cr";
    document.getElementById("serviceModal").classList.add("open");
}

function closeServiceModal() {
    document.getElementById("serviceModal").classList.remove("open");
}

async function handleServiceSubmit(e) {
    e.preventDefault();

    const serviceId = document.getElementById("serviceId").value;
    const categoria = document.getElementById("serviceCategory").value;
    const nome_servico = document.getElementById("serviceName").value.trim();
    const peca = document.getElementById("partAutocomplete").value.trim();
    const preco_componentes = parseInt(document.getElementById("partCostOverride").value) || 0;
    const mao_de_obra = parseInt(document.getElementById("laborCost").value) || 0;
    const descricao = document.getElementById("serviceDesc").value.trim();

    const payload = {
        oficina: currentWorkshop,
        categoria: categoria,
        nome_servico: nome_servico,
        peca: peca || null,
        preco_componentes: preco_componentes,
        mao_de_obra: mao_de_obra,
        descricao: descricao || null
    };

    try {
        if (serviceId) {
            // UPDATE
            const { error } = await supabaseClient
                .from('servicos_mcmt')
                .update(payload)
                .eq('id', serviceId);

            if (error) throw error;
        } else {
            // INSERT
            const { error } = await supabaseClient
                .from('servicos_mcmt')
                .insert([payload]);

            if (error) throw error;
        }

        closeServiceModal();
        await fetchServicesFromDB();
        renderServices();
    } catch (err) {
        alert("Erro ao salvar serviço no banco de dados: " + err.message);
        console.error(err);
    }
}

function editService(id) {
    const service = workshopServices[currentWorkshop].find(s => s.id == id);
    if (!service) return;

    document.getElementById("modalTitle").textContent = "Editar Serviço";
    document.getElementById("serviceId").value = service.id;
    document.getElementById("serviceCategory").value = service.category;
    document.getElementById("serviceName").value = service.name;
    document.getElementById("partAutocomplete").value = service.partName || '';
    document.getElementById("laborCost").value = service.laborCost;
    document.getElementById("partCostOverride").value = service.partPrice;
    document.getElementById("serviceDesc").value = service.description || '';

    if (service.partName) {
        document.getElementById("infoPartName").textContent = service.partName;
        const qualBadge = document.getElementById("infoPartQuality");
        qualBadge.textContent = service.quality || '-';
        qualBadge.className = `quality-badge quality-${service.quality || 'Normal'}`;
        document.getElementById("infoPartPrice").textContent = service.partPrice;
        document.getElementById("partInfoBox").classList.remove("hidden");
    } else {
        document.getElementById("partInfoBox").classList.add("hidden");
    }

    calculateTotalModal();
    document.getElementById("serviceModal").classList.add("open");
}

async function deleteService(id) {
    if (!confirm("Tem certeza que deseja excluir este serviço do banco de dados?")) return;

    try {
        const { error } = await supabaseClient
            .from('servicos_mcmt')
            .delete()
            .eq('id', id);

        if (error) throw error;

        await fetchServicesFromDB();
        renderServices();
    } catch (err) {
        alert("Erro ao excluir serviço: " + err.message);
        console.error(err);
    }
}