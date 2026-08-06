// --- MCMT WORKSHOP SERVICES SCRIPT ---

let currentMode = 'view'; // 'view' or 'edit'
let currentWorkshop = 'MCMT1';
let currentCategory = 'todas';
let partsDatabase = []; // Populated via databaseInventario.js (itemDatabase)
let workshopServices = { MCMT1: [], MCMT2: [] };

// Initialize Data
document.addEventListener("DOMContentLoaded", async () => {
    await loadDatabase();
    loadInitialServices();
    renderServices();
});

// Load database JavaScript file (js/databaseInventario.js -> itemDatabase)
async function loadDatabase() {
    try {
        // Check if itemDatabase is already loaded globally via script tag
        if (typeof itemDatabase !== 'undefined' && Array.isArray(itemDatabase)) {
            partsDatabase = itemDatabase;
            return;
        }

        // Try dynamic import
        try {
            const module = await import('../js/databaseInventario.js');
            partsDatabase = module.itemDatabase || module.default || [];
            if (partsDatabase.length) return;
        } catch (e) {
            // Ignore module import error
        }

        // Load via script tag injection as fallback
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

// Initial Mock Services for MCMT1 and MCMT2
function loadInitialServices() {
    workshopServices.MCMT1 = [
        {
            id: "s1",
            category: "naves",
            name: "Substituição de Bobina de Hiperespaço",
            partId: "106",
            partName: "Bobina de hiperespaço (Normal)",
            quality: "Normal",
            partPrice: 3200,
            laborCost: 800,
            totalPrice: 4000,
            description: "Substituição completa da bobina de hiperespaço com alinhamento de campo."
        },
        {
            id: "s2",
            category: "droids",
            name: "Troca e Calibragem de Processador Heurístico",
            partId: "461",
            partName: "Processador Heurístico (Dróide) (Normal)",
            quality: "Normal",
            partPrice: 4000,
            laborCost: 1200,
            totalPrice: 5200,
            description: "Instalação de processador heurístico e reconfiguração de matriz de memória."
        }
    ];

    workshopServices.MCMT2 = [
        {
            id: "s3",
            category: "naves",
            name: "Instalação de Gerador de Escudo Defletor Redundante",
            partId: "151",
            partName: "Gerador de escudo defletor (Redundante) (Exc)",
            quality: "Excelente",
            partPrice: 60000,
            laborCost: 10000,
            totalPrice: 70000,
            description: "Montagem militar com roteamento triplo de energia."
        },
        {
            id: "s4",
            category: "equipamentos",
            name: "Manutenção Prévia em Datapad Militar",
            partId: "10",
            partName: "Datapad Militar Criptografado",
            quality: "Excelente",
            partPrice: 9000,
            laborCost: 1500,
            totalPrice: 10500,
            description: "Criptografia de sistema e troca de barramento térmico."
        }
    ];
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
    event.target.classList.add("active");
    renderServices();
}

// Render Services with Search Filter
function renderServices() {
    const container = document.getElementById("servicesContainer");
    const searchQuery = document.getElementById("searchInput").value.toLowerCase().trim();

    let list = workshopServices[currentWorkshop] || [];

    // Category filter
    if (currentCategory !== 'todas') {
        list = list.filter(s => s.category === currentCategory);
    }

    // Text search filter across service name, part name, description, and quality
    if (searchQuery) {
        list = list.filter(s =>
            (s.name && s.name.toLowerCase().includes(searchQuery)) ||
            (s.partName && s.partName.toLowerCase().includes(searchQuery)) ||
            (s.description && s.description.toLowerCase().includes(searchQuery)) ||
            (s.quality && s.quality.toLowerCase().includes(searchQuery))
        );
    }

    if (list.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 3rem; color: var(--text-dim);">Nenhum serviço encontrado com os filtros aplicados para a ${currentWorkshop}.</div>`;
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
        const group = list.filter(s => s.category === key);
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
              <button class="btn-mcmt" onclick="editService('${s.id}')">Editar</button>
              <button class="btn-mcmt btn-danger" onclick="deleteService('${s.id}')">Excluir</button>
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

// Autocomplete Logic using itemDatabase from databaseInventario.js
function onPartSearch(val) {
    const listContainer = document.getElementById("autocompleteList");
    listContainer.innerHTML = "";
    if (!val || val.trim() === "") return;

    const db = partsDatabase.length ? partsDatabase : (typeof itemDatabase !== 'undefined' ? itemDatabase : []);
    const query = val.toLowerCase().trim();

    const matches = db.filter(item =>
        item.name && item.name.toLowerCase().includes(query)
    ).slice(0, 10); // Max 10 suggestions

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
    document.getElementById("modalTitle").textContent = "Adicionar Novo Serviço";
    document.getElementById("serviceForm").reset();
    document.getElementById("serviceId").value = "";
    document.getElementById("partInfoBox").classList.add("hidden");
    document.getElementById("modalTotalCalculated").textContent = "0 cr";
    document.getElementById("serviceModal").classList.add("open");
}

function closeServiceModal() {
    document.getElementById("serviceModal").classList.remove("open");
}

function handleServiceSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("serviceId").value || 's_' + Date.now();
    const category = document.getElementById("serviceCategory").value;
    const name = document.getElementById("serviceName").value;
    const partName = document.getElementById("partAutocomplete").value;
    const partId = document.getElementById("selectedPartId").value;

    const quality = document.getElementById("infoPartQuality").textContent !== '-' ? document.getElementById("infoPartQuality").textContent : '';
    const partPrice = parseFloat(document.getElementById("partCostOverride").value) || 0;
    const laborCost = parseFloat(document.getElementById("laborCost").value) || 0;
    const totalPrice = partPrice + laborCost;
    const description = document.getElementById("serviceDesc").value;

    const serviceData = {
        id,
        category,
        name,
        partId,
        partName,
        quality,
        partPrice,
        laborCost,
        totalPrice,
        description
    };

    const currentList = workshopServices[currentWorkshop];
    const existingIdx = currentList.findIndex(s => s.id === id);

    if (existingIdx >= 0) {
        currentList[existingIdx] = serviceData;
    } else {
        currentList.push(serviceData);
    }

    closeServiceModal();
    renderServices();
}

function editService(id) {
    const service = workshopServices[currentWorkshop].find(s => s.id === id);
    if (!service) return;

    document.getElementById("modalTitle").textContent = "Editar Serviço";
    document.getElementById("serviceId").value = service.id;
    document.getElementById("serviceCategory").value = service.category;
    document.getElementById("serviceName").value = service.name;
    document.getElementById("partAutocomplete").value = service.partName || '';
    document.getElementById("selectedPartId").value = service.partId || '';
    document.getElementById("laborCost").value = service.laborCost;
    document.getElementById("partCostOverride").value = service.partPrice;
    document.getElementById("serviceDesc").value = service.description || '';

    if (service.partName) {
        document.getElementById("infoPartName").textContent = service.partName;
        const qualBadge = document.getElementById("infoPartQuality");
        qualBadge.textContent = service.quality;
        qualBadge.className = `quality-badge quality-${service.quality}`;
        document.getElementById("infoPartPrice").textContent = service.partPrice;
        document.getElementById("partInfoBox").classList.remove("hidden");
    } else {
        document.getElementById("partInfoBox").classList.add("hidden");
    }

    calculateTotalModal();
    document.getElementById("serviceModal").classList.add("open");
}

function deleteService(id) {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
        workshopServices[currentWorkshop] = workshopServices[currentWorkshop].filter(s => s.id !== id);
        renderServices();
    }
}
