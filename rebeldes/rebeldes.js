// Base de dados dos Grupos Rebeldes (Completa)
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
        description: `
            <strong>OBJETIVO PRIMÁRIO:</strong> Criar uma força militar organizada contra o Império.<br><br>
            <strong>ESTRUTURA HIERÁRQUICA:</strong><br>
            • General<br>
            • Comandantes de Célula<br>
            • Oficiais de Operações e Inteligência<br>
            • SpecForce<br>
            • Esquadrões de Caça<br><br>
            <strong>OBSERVAÇÃO IMPERIAL:</strong> Grupo altamente perigoso e bem armado. Operam com disciplina militar.
        `
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
        description: `
            <strong>OBJETIVO PRIMÁRIO:</strong> Sabotar a estrutura logística do Império, criando falhas sistêmicas e colapsos de suprimento.<br><br>
            <strong>ESTRUTURA HIERÁRQUICA:</strong><br>
            • Comandante de Célula<br>
            • Oficial de Inteligência<br>
            • Oficial de Operações<br>
            • Quartel-Mestre<br>
            • Núcleo Técnico e Médico<br><br>
            <strong>OBSERVAÇÃO IMPERIAL:</strong> Especialistas em sabotagem industrial. Monitorar instalações de lixo e reciclagem em Raxus Prime.
        `
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
        description: `
            <strong>OBJETIVO PRIMÁRIO:</strong> Enfraquecer o domínio imperial através de influência política clandestina, informação e organização civil.<br><br>
            <strong>ESTRUTURA HIERÁRQUICA:</strong><br>
            • Comandante de Célula<br>
            • Coordenador de Comunicações<br>
            • Oficial de Inteligência<br>
            • Núcleo de Logística<br>
            • Rede de Agentes Locais<br><br>
            <strong>OBSERVAÇÃO IMPERIAL:</strong> Atividade subversiva sutil. Foco em propaganda e incitação civil.
        `
    },
    {
        id: "hiddenpath_custom",
        name: "O Caminho",
        leader: "Descentralizado",
        threatLevel: "Prioridade Inquisitorial",
        threatClass: "high",
        icon: "fa-solid fa-compass",
        base: "Móvel (Jabiim / Mapuzo)",
        activity: "Rotas do Hiperespaço",
        description: `
            <strong>OBJETIVO PRIMÁRIO:</strong> Esconder, transportar e proteger usuários da Força e Jedi sobreviventes.<br><br>
            <strong>ESTRUTURA HIERÁRQUICA:</strong><br>
            • Guias<br>
            • Protetores Locais<br>
            • Condutores de Rota<br>
            • Guardiões de Casas Seguras<br>
            • Contatadores<br><br>
            <strong>OBSERVAÇÃO IMPERIAL:</strong> Alvos prioritários para o Inquisitorius. Onde houver usuários da força, eles estarão.
        `
    },
    // Grupos canônicos extras para preencher a lista
    {
        id: "partisans",
        name: "Os Partisans",
        leader: "Saw Gerrera",
        threatLevel: "Extremo",
        threatClass: "extreme",
        icon: "fa-solid fa-bomb",
        base: "Jedha (Anteriormente)",
        activity: "Setores Múltiplos",
        description: "Extremistas violentos que utilizam táticas de terrorismo direto. Gerrera rompeu com outras células rebeldes devido à sua brutalidade."
    },
    {
        id: "phoenix",
        name: "Esquadrão Phoenix",
        leader: "Hera Syndulla",
        threatLevel: "Alto",
        threatClass: "high",
        icon: "fa-brands fa-phoenix-squadron",
        base: "Nave Capital",
        activity: "Setor Lothal",
        description: "Célula rebelde naval altamente móvel. Responsável por ataques a comboios e libertação de prisioneiros."
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
    console.log("ISB Database: Atualização de manifesto rebelde concluída.");
});