// Base de dados dos Grupos Rebeldes - Descrições Expandidas (05 ABY)
const rebelGroups = [
    {
        id: "massassi",
        name: "Grupo Massassi",
        leader: "General Jan Dodonna",
        threatLevel: "Extremo",
        threatClass: "extreme",
        icon: "fa-solid fa-jet-fighter",
        base: "Yavin 4",
        activity: "Orla Exterior / Setor Gordian",
        description: "Classificado com Nível de Ameaça Extrema, o Grupo Massassi permanece como o 'Projenitor' da insurgência militar organizada. Sob a liderança estratégica do General Jan Dodonna, esta célula não opera como simples guerrilheiros, mas sim como um exército estruturado com hierarquia rígida, dividindo-se entre Alto Comando, Inteligência e Operações Especiais. Eles são responsáveis por coordenar ataques de larga escala contra frotas imperiais remanescentes. Seus esquadrões de caça e unidades SpecForce são altamente treinados e equipados, tornando qualquer engajamento direto uma operação de alto risco para nossas forças."
    },
    {
        id: "partisans",
        name: "Os Partisans",
        leader: "Saw Gerrera",
        threatLevel: "Extremo",
        threatClass: "extreme",
        icon: "fa-solid fa-bomb",
        base: "Descentralizada",
        activity: "Setores Múltiplos",
        description: "Mesmo após a fragmentação de sua liderança original, os remanescentes dos Partisans mantêm a filosofia brutal de Saw Gerrera viva. Este grupo é composto por extremistas violentos que rejeitam qualquer forma de diplomacia ou rendição. Diferente de outras células que buscam legitimidade política, os Partisans utilizam táticas de terrorismo puro, sabotagem indiscriminada e ataques suicidas em áreas civis e militares. Eles operam sem regras de engajamento, sendo considerados imprevisíveis e perigosos até mesmo para outras facções rebeldes."
    },
    {
        id: "hiddenpath_custom",
        name: "O Caminho",
        leader: "Descentralizado",
        threatLevel: "Prioridade Inquisitorial",
        threatClass: "high",
        icon: "fa-solid fa-compass",
        base: "Móvel (Jabiim / Mapuzo)",
        activity: "Rotas do Hiperespaço Desconhecidas",
        description: "Uma rede subterrânea elusiva dedicada exclusivamente à proteção e transporte de traidores da Ordem 66 e sensitivos à Força. O Caminho não busca confronto militar, mas sim a sobrevivência ideológica dos Jedi. Operando através de uma complexa rede de Guias, Condutores de Rota e Casas Seguras, eles movem fugitivos pelas sombras da galáxia. Para o Inquisitorius, a existência deste grupo é uma afronta pessoal; onde quer que O Caminho opere, a presença de usuários da Força hostis é garantida, exigindo protocolos de contenção especiais."
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
        description: "Operando a partir dos ambientes tóxicos e esquecidos de Raxus Prime, a Diretiva Orion, liderada pelo Comandante Arven Korr, especializou-se na guerra de atrito logístico. Seu objetivo não é a conquista de território, mas o colapso sistêmico da máquina de guerra imperial através da sabotagem industrial. Seus agentes, apoiados por núcleos técnicos avançados, infiltram-se em linhas de suprimento para criar falhas mecânicas e corrupção de dados. Eles transformam o próprio lixo da galáxia em armas contra a ordem estabelecida."
    },
    {
        id: "phoenix",
        name: "Esquadrão Phoenix",
        leader: "Hera Syndulla",
        threatLevel: "Alto",
        threatClass: "high",
        icon: "fa-brands fa-phoenix-squadron",
        base: "Frota Nômade",
        activity: "Setor Lothal e Adjacências",
        description: "Liderada pela notória General Hera Syndulla, a célula Phoenix evoluiu de um pequeno grupo de resistência para uma frota de ataque móvel e altamente eficiente. Especialistas em guerra naval de guerrilha, eles atacam comboios de suprimentos imperiais e desaparecem antes que reforços possam chegar. O grupo possui forte apelo simbólico e conexões profundas com antigos Jedi, servindo frequentemente como ponta de lança para operações de libertação em sistemas oprimidos. Sua mobilidade constante torna o rastreamento quase impossível."
    },
    {
        id: "astara",
        name: "Movimento Astara",
        leader: "Cmdt. Astara Lumon",
        threatLevel: "Médio",
        threatClass: "medium",
        icon: "fa-solid fa-users-rays",
        base: "Chandrila",
        activity: "Mundos do Núcleo / Política",
        description: "Sediado nos Mundos do Núcleo, especificamente em Chandrila, o Movimento Astara representa a ameaça insidiosa da subversão política. Sob o comando de Astara Lumon, o grupo evita o combate armado em favor da guerra de informação, propaganda e organização civil. Eles corroem a lealdade imperial de dentro para fora, espalhando desinformação e recrutando agentes em camadas sociais influentes. Embora classificados como ameaça média militarmente, seu potencial para incitar revoltas planetárias e desestabilizar governos locais é monitorado de perto pelo ISB."
    }
];

// Função de Renderização
function renderRebelGroups() {
    const container = document.getElementById('rebel-groups-container');
    container.innerHTML = ''; 

    rebelGroups.forEach(group => {
        const card = document.createElement('div');
        card.classList.add('group-card');
        card.setAttribute('data-id', group.id);

        card.innerHTML = `
            <div class="card-header">
                <div class="group-name">
                    <i class="${group.icon}"></i>
                    ${group.name.toUpperCase()}
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="threat-badge ${group.threatClass}">${group.threatLevel}</span>
                    <i class="fa-solid fa-chevron-down expand-icon"></i>
                </div>
            </div>
            
            <div class="card-details">
                <div class="detail-grid">
                    <div class="info-block">
                        <label>LÍDER ALVO</label>
                        <span>${group.leader}</span>
                    </div>
                    <div class="info-block">
                        <label>LOCALIZAÇÃO PROVÁVEL</label>
                        <span>${group.base}</span>
                    </div>
                    <div class="info-block">
                        <label>ÁREA DE ATUAÇÃO</label>
                        <span>${group.activity}</span>
                    </div>
                </div>
                <div class="description-box">
                    <strong>ANÁLISE DE INTELIGÊNCIA:</strong><br>
                    <p>${group.description}</p>
                </div>
            </div>
        `;

        // Evento de Click
        card.addEventListener('click', () => {
            // Fecha outros cards para manter o foco (opcional)
            const allCards = document.querySelectorAll('.group-card');
            allCards.forEach(c => {
                if (c !== card) c.classList.remove('active');
            });

            card.classList.toggle('active');
        });

        container.appendChild(card);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderRebelGroups();
    console.log("Sistema ISB (05 ABY): Lista de Procurados Sincronizada.");
});