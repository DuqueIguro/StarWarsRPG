/**
 * Holonet Rebelde - Motor de Gerenciamento das Organizações
 * Desenvolvido exclusivamente para as páginas da pasta /rebeldes/
 */

let dadosAliancaAtual = null;

async function inicializarPaginaAlianca() {
    // Identifica a organização pelo atributo configurado na tag body do HTML
    const idAlianca = document.body.getAttribute("data-alianca");
    if (!idAlianca) return;

    try {
        const response = await fetch('../data/contatosRebeldes.json');
        if (!response.ok) throw new Error('Falha de sincronização com o banco de dados.');
        const bancoContatos = await response.json();
        
        dadosAliancaAtual = bancoContatos[idAlianca];
        if (dadosAliancaAtual) {
            renderizarInterface(dadosAliancaAtual);
        }
    } catch (error) {
        console.error('Erro na Holonet:', error);
    }
}

function renderizarInterface(data) {
    // Carrega Identificadores Visuais Básicos
    document.getElementById("nomeAlianca").innerText = data.nome;
    document.getElementById("brasaoAlianca").src = data.logo;
    document.body.style.backgroundImage = `url('${data.fundo}')`;

    // Carrega Feed de Transmissões Importantes / Notícias
    const feedNoticias = document.getElementById("feedNoticias");
    feedNoticias.innerHTML = data.noticias.map(noticia => `<li>⚠️ ${noticia}</li>`).join('');

    // Carrega Painel de Informações de Localidade e Contato
    document.getElementById("infoBase").innerText = data.base;
    document.getElementById("infoFrequencia").innerText = data.frequencia;
    document.getElementById("infoEmergencia").innerText = data.contato_emergencia;

    // FLUXO DE EXCEÇÃO: IDENTIFICAÇÃO DE "O CAMINHO"
    if (data.isOculta) {
        // Oculta elementos de células com liderança padrão
        document.getElementById("containerMissoes").classList.add("hidden");
        document.getElementById("panelLider").classList.add("hidden");
        document.getElementById("panelAgentes").classList.add("hidden");
        document.getElementById("btnToggleSidebar").classList.add("hidden");

        // Ativa e renderiza o mapeamento de Rotas e Planetas de Fuga
        const containerRotas = document.getElementById("containerRotas");
        containerRotas.classList.remove("hidden");

        const listaRotas = document.getElementById("listaRotas");
        listaRotas.innerHTML = data.rotas.map(rota => `
            <div class="route-card">
                <h5>${rota.planeta}</h5>
                <p>${rota.desc}</p>
            </div>
        `).join('');

    } else {
        // PROCESSO PADRÃO: PARA AS OUTRAS 3 CÉLULAS REBELDES COMUNS
        // Injeta dados de Liderança Executiva
        document.getElementById("fotoLider").src = data.lider.foto;
        document.getElementById("nomeLider").innerText = data.lider.nome;
        document.getElementById("cargoLider").innerText = data.lider.cargo;

        // Injeta lista de Agentes ativos
        const listaAgentes = document.getElementById("listaAgentes");
        listaAgentes.innerHTML = data.agents.map(agente => `
            <li><strong>${agente.nome}</strong> - <span>${agente.cargo}</span></li>
        `).join('');

        // Injeta Inventário e Frota na barra lateral expansível
        const sideNaves = document.getElementById("sideNaves");
        sideNaves.innerHTML = data.inventario.naves.map(nave => `<li>🚀 ${nave}</li>`).join('');

        const sideItens = document.getElementById("sideItens");
        sideItens.innerHTML = data.inventario.itens.map(item => `<li>📦 ${item}</li>`).join('');

        // Ativa por padrão a primeira aba do menu de missões
        const primeiroBotaoMissao = document.querySelector(".tab-link");
        if (primeiroBotaoMissao) primeiroBotaoMissao.click();
    }
}

// Controle do Menu de Abas de Missão (Disponíveis, Concluídas, etc)
function mudarAbaMissao(evt, statusMissao) {
    if (!dadosAliancaAtual || !dadosAliancaAtual.missoes) return;

    const linksAbas = document.querySelectorAll(".tab-link");
    linksAbas.forEach(link => link.classList.remove("active"));

    evt.currentTarget.classList.add("active");

    const conteudoBox = document.getElementById("conteudoMissao");
    const listaMissoes = dadosAliancaAtual.missoes[statusMissao] || [];

    if (listaMissoes.length === 0) {
        conteudoBox.innerHTML = `<p class="no-mission">Nenhuma diretiva tática nesta aba.</p>`;
    } else {
        conteudoBox.innerHTML = `<ul class="mission-list">${listaMissoes.map(mis => `<li>🛰️ ${mis}</li>`).join('')}</ul>`;
    }
}

// Controle de Expansão da Gaveta Lateral de Logística
function toggleSidebar() {
    const sidebar = document.getElementById("sidebarLogistica");
    sidebar.classList.toggle("open");
}

// Inicializador da captura de dados
document.addEventListener("DOMContentLoaded", inicializarPaginaAlianca);