// Base de dados dos Grupos Rebeldes - Priorizada
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
        description: "Alvo Prioritário. O Grupo Massassi representa a maior afronta militar à ordem imperial. Operando a partir da lua de Yavin 4 sob o comando do General Jan Dodonna, seu objetivo primário é consolidar uma força bélica organizada capaz de engajar nossa frota em combate aberto. Sua estrutura é rigorosamente militar e hierarquizada, dividindo-se entre o Alto Comando, Comandantes de Célula, Oficiais de Inteligência e Operações. O grupo conta ainda com unidades de elite como a SpecForce e esquadrões de caça estelar veteranos, tornando-os alvos de eliminação imediata."
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
        description: "Célula terrorista de alta periculosidade. Saw Gerrera e seus seguidores não seguem regras de engajamento, utilizando táticas de terra arrasada e atentados em áreas civis. Sua erradicação é vital para a manutenção da ordem pública e segurança planetária."
    },
    {
        id: "hiddenpath_custom",
        name: "O Caminho (The Path)",
        leader: "Descentralizado",
        threatLevel: "Inquisitorius",
        threatClass: "high",
        icon: "fa-solid fa-compass",
        base: "Móvel / Oculta",
        activity: "Rotas do Hiperespaço",
        description: "Rede clandestina de contrabando humano focada em proteger traidores Jedi e sensitivos à Força. Embora evitem combate direto, sua existência desafia a Doutrina Imperial. Onde esta rede opera, a presença de usuários da Força hostis é quase garantida."
    },
    {
        id: "orion",
        name: "Diretiva Orion",
        leader: "Cmdt. Arven Korr",
        threatLevel: "Alto",
        threatClass: "high",
        icon: "fa-solid fa-burst",
        base: "Raxus Prime",
        activity: "Logística Imperial",
        description: "Grupo especializado em sabotagem industrial e logística. Operando a partir dos lixões de Raxus Prime, visam interromper cadeias de suprimento imperiais. Seus métodos envolvem falhas mecânicas induzidas e corrupção de dados técnicos."
    },
    {
        id: "phoenix",
        name: "Esquadrão Phoenix",
        leader: "Hera Syndulla",
        threatLevel: "Alto",
        threatClass: "high",
        icon: "fa-brands fa-phoenix-squadron",
        base: "Frota Nômade",
        activity: "Setor Lothal",
        description: "Célula rebelde baseada em naves capitais. Altamente móvel e difícil de rastrear. Especialistas em ataques de 'bater e correr' contra comboios de carga. Possuem forte apoio local no sistema Lothal."
    },
    {
        id: "astara",
        name: "Movimento Astara",
        leader: "Cmdt. Astara Lumon",
        threatLevel: "Médio",
        threatClass: "medium",
        icon: "fa-solid fa-users-rays",
        base: "Chandrila",
        activity: "Mundos do Núcleo",
        description: "Ameaça política e ideológica. O Movimento Astara foca na disseminação de propaganda anti-imperial e incitação civil nos Mundos do Núcleo. Embora evitem violência aberta, sua capacidade de recrutar informantes e desestabilizar governos locais é notável."
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
                    ${group.name}
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
                    ${group.description}
                </div>
            </div>
        `;

        // Evento de Click
        card.addEventListener('click', () => {
            // Fecha outros (Opcional - remova se quiser abrir vários)
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
    console.log("Sistema ISB: Lista de Procurados Atualizada.");
});