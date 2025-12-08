// Base de dados dos Grupos Rebeldes
const rebelGroups = [
    {
        id: "alliance",
        name: "Aliança para Restauração da República",
        leader: "Mon Mothma / Bail Organa",
        threatLevel: "Extremo",
        threatClass: "extreme", // classe CSS
        icon: "fa-brands fa-rebel",
        base: "Desconhecida (Móvel)",
        activity: "Setores Múltiplos",
        description: "Uma coalizão ilegal de células dissidentes que visa derrubar a Nova Ordem. Altamente organizada e equipada com caças estelares de nível militar roubados. Responsáveis por inúmeros ataques a instalações imperiais de mineração e logística."
    },
    {
        id: "partisans",
        name: "Os Partisans",
        leader: "Saw Gerrera",
        threatLevel: "Extremo",
        threatClass: "extreme",
        icon: "fa-solid fa-bomb",
        base: "Jedha (Antigamente)",
        activity: "Orla Exterior",
        description: "Extremistas violentos que não hesitam em causar danos colaterais civis. Utilizam táticas de guerrilha assimétrica e terrorismo direto. Gerrera é considerado um dos homens mais perigosos da galáxia."
    },
    {
        id: "phoenix",
        name: "Célula Fênix (Esquadrão Phoenix)",
        leader: "Hera Syndulla",
        threatLevel: "Alto",
        threatClass: "high",
        icon: "fa-solid fa-fire",
        base: "Nave Capital da Classe Pelta",
        activity: "Setor Lothal",
        description: "Grupo ágil focado em ataques a comboios de suprimentos e sabotagem industrial. Operam com uma frota pequena, mas eficaz. Conexões confirmadas com a antiga Ordem Jedi."
    },
    {
        id: "hiddenpath",
        name: "O Caminho Oculto",
        leader: "Desconhecido",
        threatLevel: "Médio",
        threatClass: "high",
        icon: "fa-solid fa-map-location-dot",
        base: "Descentralizada",
        activity: "Rotas do Hiperespaço",
        description: "Rede de contrabando dedicada a esconder e transportar traidores do Império e sensitivos à Força sobreviventes. Não possuem poderio militar significativo, mas representam risco à segurança ideológica."
    },
    {
        id: "cloudriders",
        name: "Cavaleiros das Nuvens (Cloud-Riders)",
        leader: "Enfys Nest",
        threatLevel: "Médio",
        threatClass: "high",
        icon: "fa-solid fa-mask",
        base: "Nômade",
        activity: "Setores Industriais",
        description: "Piratas saqueadores que frequentemente atacam transportes de Coaxium e refinarias. Embora pareçam criminosos comuns, demonstram motivações políticas contra a nacionalização de recursos pelo Império."
    }
];

// Função para renderizar os cards
function renderRebelGroups() {
    const container = document.getElementById('rebel-groups-container');
    container.innerHTML = ''; // Limpa container

    rebelGroups.forEach(group => {
        // Cria o elemento do card
        const card = document.createElement('div');
        card.classList.add('group-card');
        card.setAttribute('data-id', group.id);

        // HTML interno do card
        card.innerHTML = `
            <div class="card-header">
                <div class="group-name">
                    <i class="${group.icon}"></i>
                    ${group.name.toUpperCase()}
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span class="threat-level ${group.threatClass}">Ameaça: ${group.threatLevel}</span>
                    <i class="fa-solid fa-chevron-down expand-icon"></i>
                </div>
            </div>
            <div class="card-details">
                <div class="detail-grid">
                    <div class="detail-item">
                        <strong>LÍDER IDENTIFICADO:</strong>
                        <span>${group.leader}</span>
                    </div>
                    <div class="detail-item">
                        <strong>ÁREA DE OPERAÇÃO:</strong>
                        <span>${group.activity}</span>
                    </div>
                    <div class="detail-item">
                        <strong>BASE SUSPEITA:</strong>
                        <span>${group.base}</span>
                    </div>
                    <div class="description-text">
                        <strong>ANÁLISE DE INTELIGÊNCIA:</strong>
                        ${group.description}
                    </div>
                </div>
            </div>
        `;

        // Adiciona evento de clique para expandir/fechar
        card.addEventListener('click', () => {
            toggleCard(card);
        });

        container.appendChild(card);
    });
}

// Função de Toggle (Acordeão)
function toggleCard(clickedCard) {
    // Fecha outros cards abertos (opcional - remova se quiser permitir múltiplos abertos)
    const allCards = document.querySelectorAll('.group-card');
    allCards.forEach(card => {
        if (card !== clickedCard && card.classList.contains('active')) {
            card.classList.remove('active');
        }
    });

    // Alterna o card clicado
    clickedCard.classList.toggle('active');
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    renderRebelGroups();
    
    // Efeito sonoro simples de UI (opcional, apenas visual no log por enquanto)
    console.log("ISB Database: Conexão Segura Estabelecida.");
});