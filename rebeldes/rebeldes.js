// Base de dados dos Grupos Rebeldes - Ordenada por Prioridade de Ameaça
const rebelGroups = [
    {
        id: "massassi",
        name: "Grupo Massassi",
        leader: "General Jan Dodonna",
        threatLevel: "Extremo",
        threatClass: "extreme", // Vermelho piscante
        icon: "fa-solid fa-jet-fighter",
        base: "Yavin 4",
        activity: "Orla Exterior / Setor Gordian",
        description: "Classificado como Nível de Ameaça Extrema, o Grupo Massassi representa a maior afronta militar à ordem imperial. Operando a partir da lua de Yavin 4 sob o comando do General Jan Dodonna, seu objetivo primário é consolidar uma força bélica organizada capaz de engajar nossa frota em combate aberto. Sua estrutura é rigorosamente militar e hierarquizada, dividindo-se entre o Alto Comando, Comandantes de Célula, Oficiais de Inteligência e Operações. O grupo conta ainda com unidades de elite como a SpecForce e esquadrões de caça estelar veteranos, tornando-os alvos de eliminação imediata."
    },
    {
        id: "partisans",
        name: "Os Partisans",
        leader: "Saw Gerrera",
        threatLevel: "Extremo",
        threatClass: "extreme",
        icon: "fa-solid fa-bomb",
        base: "Jedha (Anteriormente)",
        activity: "Setores Múltiplos",
        description: "Liderados pelo terrorista Saw Gerrera, os Partisans são extremistas violentos que rejeitam qualquer forma de diplomacia. Diferente de outras células rebeldes, este grupo não hesita em causar baixas civis ou danos colaterais massivos para atingir alvos imperiais. Operam de forma descentralizada e brutal, utilizando táticas de terrorismo direto. Devido à sua imprevisibilidade e selvageria, a neutralização de Gerrera é considerada crítica para a estabilidade regional."
    },
    {
        id: "hiddenpath_custom",
        name: "O Caminho",
        leader: "Descentralizado",
        threatLevel: "Prioridade Inquisitorial",
        threatClass: "high", // Laranja/Alto
        icon: "fa-solid fa-compass",
        base: "Móvel (Jabiim / Mapuzo)",
        activity: "Rotas do Hiperespaço",
        description: "Uma rede clandestina dedicada a esconder e transportar traidores da Ordem 66 e sensitivos à Força. Embora não possua poderio bélico convencional, sua existência desafia a pureza ideológica do Império e representa um risco espiritual inaceitável. Operam através de uma hierarquia oculta composta por Guias, Condutores de Rota, Protetores Locais e Guardiões de Casas Seguras. A aniquilação desta rede e a captura de seus protegidos é prioridade absoluta para o Inquisitorius."
    },
    {
        id: "orion",
        name: "Diretiva Orion",
        leader: "Cmdt. Arven Korr",
        threatLevel: "Alto",
        threatClass: "high",
        icon: "fa-solid fa-burst",
        base: "Raxus Prime",
        activity: "Logística Imperial / Lixões Industriais",
        description: "Sob a liderança do Comandante de Célula Arven Korr em Raxus Prime, esta organização foca na sabotagem sistêmica da infraestrutura logística do Império. Seus agentes visam criar falhas de suprimento e colapsos industriais. A célula é estruturada com eficiência técnica, contando com um Quartel-Mestre, Oficiais de Operações e núcleos médicos e de engenharia dedicados. Eles utilizam o ambiente hostil dos lixões industriais como cobertura para seus atos de sabotagem."
    },
    {
        id: "phoenix",
        name: "Esquadrão Phoenix",
        leader: "Hera Syndulla",
        threatLevel: "Alto",
        threatClass: "high",
        icon: "fa-brands fa-phoenix-squadron",
        base: "Nave Capital da Classe Pelta",
        activity: "Setor Lothal",
        description: "Uma célula rebelde naval altamente móvel e resiliente, liderada pela Twi'lek Hera Syndulla. Especializados em ataques rápidos contra comboios de suprimentos e operações de resgate, eles utilizam uma frota nômade que dificulta o rastreamento imperial. O grupo possui conexões confirmadas com antigos Jedi e demonstra capacidade de coordenar ataques em múltiplos sistemas, exigindo vigilância constante da Marinha Imperial."
    },
    {
        id: "astara",
        name: "Movimento Astara",
        leader: "Cmdt. Astara Lumon",
        threatLevel: "Médio",
        threatClass: "medium", // Amarelo/Médio
        icon: "fa-solid fa-users-rays",
        base: "Chandrila",
        activity: "Mundos do Núcleo / Política",
        description: "Localizado no mundo do núcleo de Chandrila e liderado por Astara Lumon, este grupo atua na subversão política e social. Seu foco principal não é o combate direto, mas o enfraquecimento do domínio imperial através de influência política clandestina, desinformação e organização civil. Sua estrutura baseia-se em células de inteligência, coordenadores de comunicação, logística e uma vasta rede de agentes locais infiltrados na sociedade civil."
    }
];

// Função para renderizar os cards
function renderRebelGroups() {
    const container = document.getElementById('rebel-groups-container');
    container.innerHTML = ''; // Limpa container

    rebelGroups.forEach(group => {
        const card = document.createElement('div');
        card.classList.add('group-card');
        card.setAttribute('data-id', group.id);

        let threatDisplay = group.threatLevel;

        card.innerHTML = `
            <div class="card-header">
                <div class="group-name">
                    <i class="${group.icon}"></i>
                    ${group.name.toUpperCase()}
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span class="threat-level ${group.threatClass}">Nível: ${threatDisplay}</span>
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
                        <strong>PLANETA-BASE / LOCAL:</strong>
                        <span>${group.base}</span>
                    </div>
                    <div class="description-text">
                        ${group.description}
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            toggleCard(card);
        });

        container.appendChild(card);
    });
}

// Função de Toggle (Acordeão)
function toggleCard(clickedCard) {
    const allCards = document.querySelectorAll('.group-card');
    
    allCards.forEach(card => {
        if (card !== clickedCard && card.classList.contains('active')) {
            card.classList.remove('active');
        }
    });

    clickedCard.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    renderRebelGroups();
    console.log("ISB Database: Manifesto atualizado e ordenado por prioridade.");
});