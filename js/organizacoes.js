/**
 * Holonet Rebelde - Motor de Gerenciamento das Organizações
 * Desenvolvido exclusivamente para as páginas da pasta /rebeldes/
 */

let dadosAliancaAtual = null;

async function inicializarPaginaAlianca() {
    const idAlianca = document.body.getAttribute("data-alianca");
    if (!idAlianca) return;

    try {
        const response = await fetch('../data/contatosRebeldes.json');
        if (!response.ok) throw new Error('Erro ao carregar banco de contatos.');
        const bancoContatos = await response.json();
        
        dadosAliancaAtual = bancoContatos[idAlianca];
        if (dadosAliancaAtual) {
            renderizarInterface(dadosAliancaAtual);
        }
    } catch (error) {
        console.error('Erro na sincronização Holonet:', error);
    }
}

function renderizarInterface(data) {
    document.getElementById("nomeAlianca").innerText = data.nome;
    document.getElementById("brasaoAlianca").src = data.logo;

    // Injeta canais de notícias e rodapé tático
    document.getElementById("feedNoticias").innerHTML = data.noticias.map(n => `<li>📡 ${n}</li>`).join('');
    document.getElementById("infoBase").innerText = data.base;
    document.getElementById("infoFrequencia").innerText = data.frequencia;
    document.getElementById("infoEmergencia").innerText = data.contato_emergencia;
    
    // Injeta foto do contato de emergência no rodapé tático
    document.getElementById("fotoContatoEmergencia").src = data.foto_emergencia;

    if (data.isOculta) {
        // "O Caminho": Esconde apenas os painéis exclusivos das outras alianças (líder e agentes convencionais)
        // As missões permanecem visíveis, então o painel de agentes é reaproveitado dentro das rotas.
        document.getElementById("panelLider").classList.add("hidden");
        document.getElementById("panelAgentes").classList.add("hidden");

        // Substitui o botão de logística por um placeholder invisível para manter o título centralizado
        const btnSidebar = document.getElementById("btnToggleSidebar");
        btnSidebar.classList.add("hidden");
        const placeholder = document.createElement("div");
        placeholder.menu.cssText = btnSidebar.getBoundingClientRect().width
            ? `width:${btnSidebar.getBoundingClientRect().width}px; visibility:hidden;`
            : `width: 160px; visibility:hidden;`;
        btnSidebar.parentNode.insertBefore(placeholder, btnSidebar);

        // Colapsa a coluna direita para layout de coluna unica
        const colunaDir = document.querySelector(".right-column");
        if (colunaDir) colunaDir.classList.add("hidden");
        const gridDash = document.querySelector(".grid-dashboard");
        if (gridDash) gridDash.style.gridTemplateColumns = "1fr";

        // Ativa e renderiza as rotas estruturadas + inventário expansível + agentes
        const containerRotas = document.getElementById("containerRotas");
        containerRotas.classList.remove("hidden");

        const inventarioHTML = data.inventario && data.inventario.itens ? `
            <div class="panel-section" style="margin-top: 1.5rem;">
                <button class="btn-open-sidebar" onclick="toggleInventarioCaminho(this)"
                    style="width:100%; text-align:left; margin-bottom:0;">
                    INVENTÁRIO / RECURSOS ▶
                </button>
                <div id="inventarioCaminhoConteudo" class="hidden" style="padding: 1rem 0.5rem;">
                    <h4 style="color:var(--color-cyan, #00e5ff); margin-bottom:0.5rem;">SUPRIMENTOS E RECURSOS</h4>
                    <ul>
                        ${data.inventario.itens.map(i => `<li>📦 ${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        ` : '';

        const agentesHTML = data.agentes && data.agentes.length > 0 ? `
            <div class="panel-section" style="margin-top: 1.5rem;">
                <h3>AGENTES REGISTADOS</h3>
                <ul class="agents-list">
                    ${data.agentes.map(a => `
                        <li class="agent-item">
                            <img src="${a.foto}" alt="${a.nome}" class="contact-mini-img">
                            <div><strong>${a.nome}</strong> - <span>${a.cargo}</span></div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : '';

        const listaRotas = document.getElementById("listaRotas");
        listaRotas.innerHTML = `
            <div class="caminho-profile border-neon">
                <img src="${data.lider.foto}" alt="Lider do Caminho">
                <div class="caminho-desc">
                    <h4>REDE OCULTA DE FUGA</h4>
                    <p><strong>Operadora Principal:</strong> ${data.contato_emergencia}</p>
                </div>
            </div>
            <div class="routes-grid">
                ${data.rotas.map(r => `
                    <div class="route-item">
                        <h5>${r.planeta}</h5>
                        <p>${r.desc}</p>
                    </div>
                `).join('')}
            </div>
            ${inventarioHTML}
            ${agentesHTML}
        `;

        // Ativa a primeira aba de missões (Convocados) por padrão, assim como nas outras alianças
        const primeiroBotaoCaminho = document.querySelector(".tab-btn");
        if (primeiroBotaoCaminho) primeiroBotaoCaminho.click();
    } else {
        // Estrutura padrão para as outras 3 organizações (Astara, Massassi, Orion)
        document.getElementById("fotoLider").src = data.lider.foto;
        document.getElementById("nomeLider").innerText = data.lider.nome;
        document.getElementById("cargoLider").innerText = data.lider.cargo;

        document.getElementById("listaAgentes").innerHTML = data.agentes.map(a => `
            <li class="agent-item">
                <img src="${a.foto}" alt="${a.nome}" class="contact-mini-img">
                <div><strong>${a.nome}</strong> - <span>${a.cargo}</span></div>
            </li>
        `).join('');

        document.getElementById("sideNaves").innerHTML = data.inventario.naves.map(n => `<li>🚀 ${n}</li>`).join('');
        document.getElementById("sideItens").innerHTML = data.inventario.itens.map(i => `<li>📦 ${i}</li>`).join('');

        const primeiroBotao = document.querySelector(".tab-btn");
        if (primeiroBotao) primeiroBotao.click();
    }
}

function mudarAbaMissao(evt, statusMissao) {
    if (!dadosAliancaAtual || !dadosAliancaAtual.missoes) return;

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    evt.currentTarget.classList.add("active");

    const lista = dadosAliancaAtual.missoes[statusMissao] || [];
    const box = document.getElementById("conteudoMissao");

    if (lista.length === 0) {
        box.innerHTML = `<p class="empty-txt">Sem registos operacionais nesta categoria.</p>`;
    } else {
        box.innerHTML = `<ul class="mission-ul">${lista.map(m => `<li>🛰️ ${m}</li>`).join('')}</ul>`;
    }
}

function toggleInventarioCaminho(btn) {
    const conteudo = document.getElementById("inventarioCaminhoConteudo");
    const aberto = !conteudo.classList.contains("hidden");
    conteudo.classList.toggle("hidden");
    btn.textContent = aberto ? "INVENTÁRIO / RECURSOS ▶" : "INVENTÁRIO / RECURSOS ▼";
}

function toggleSidebar() {
    document.getElementById("sidebarLogistica").classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", inicializarPaginaAlianca);