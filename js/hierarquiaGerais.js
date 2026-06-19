// Banco de dados das hierarquias e posições das bolinhas
const dadosHierarquias = {
    exercito: {
        nome: "Exército",
        corPrincipal: "#ff2a2a",
        patentes: [
            { nome: "General", desc: "O posto mais alto do exército. Responsável por planejar missões de alto risco, ordenar tropas e definir a estratégia terrestre da Aliança.", placa: [["R", "", "R"], ["", "R", ""], ["R", "", "R"]] },
            { nome: "Coronel", desc: "Um dos oficiais de campo mais graduados. Normalmente encarregado de comandar um regimento inteiro no campo de batalha.", placa: [["R", "R", ""], ["", "R", "R"]] },
            { nome: "Comandante", desc: "Possui autoridade direta sobre corpos de tropas menores e lidera operações militares táticas diretamente no terreno.", placa: [["", "R", ""], ["R", "", "R"]] },
            { nome: "Major", desc: "Atua como oficial de operações de um privilégio/batalhão. É um posto vital para a organização estrutural das tropas.", placa: [["R", "", "R"], ["", "R", ""]] },
            { nome: "Capitão", desc: "Lidera diretamente uma companhia de soldados nas missões e ofensivas terrestres.", placa: [["R", "R", ""], ["", "", ""]] },
            { nome: "Tenente", desc: "A patente de comando mais baixa, servindo de elo de comunicação e liderança direta entre o comando superior e a infantaria.", placa: [["R", "", ""], ["", "", ""]] },
            { nome: "Soldado", desc: "A base da force de combate. Não usavam as placas cromadas com bolinhas, mas sim remendos na manga ou peito para indicar sua especialidade ou esquadrão.", placa: null, detalhe: "Remendos de tecido" }
        ]
    },
    marinha: {
        nome: "Marinha (Frota Rebelde)",
        corPrincipal: "#2a80ff",
        patentes: [
            { nome: "Almirante da Frota", desc: "O comandante naval supremo da Aliança. Gerencia toda a movimentação estratégica de frotas inteiras na galáxia.", placa: [["", "R", "R"], ["B", "B", "B"]] },
            { nome: "Almirante", desc: "Oficial encarregado de comandar linhas de batalha, além de lidar com os deveres administrativos navais.", placa: [["B", "", "B"], ["", "B", ""], ["B", "", "B"]] },
            { nome: "Comodoro", desc: "Posto superior de liderança naval. Geralmente ficam encarregados de liderar e gerenciar uma nave capital específica.", placa: [["R", "R", ""], ["", "B", "B"]] },
            { nome: "Coronel Naval", desc: "Oficial de estado-maior da frota, responsável por administrar e coordenar grupos de caças estelares a partir de naves-mãe.", placa: [["B", "B", ""], ["", "B", "B"]] },
            { nome: "Comandante Naval", desc: "Atua nas operações táticas de frota e na execução em tempo real dos planos de batalha no espaço.", placa: [["", "B", ""], ["B", "", "B"]] },
            { nome: "Major Naval", desc: "Atua como oficial executivo dentro das naves, garantindo que as operações internas da tripulação funcionem sem falhas.", placa: [["B", "", "B"], ["", "B", ""]] },
            { nome: "Capitão Naval", desc: "O oficial no comando direto da ponte de uma nave específica da Frota Rebelde.", placa: [["B", "B", ""], ["", "", ""]] },
            { nome: "Tenente Naval", desc: "Oficial de frota que atua logo acima da tripulação de voo, auxiliando na logística e na ponte de comando.", placa: [["B", "", ""], ["", "", ""]] },
            { nome: "Chefe Marechal (Caças)", desc: "O posto máximo exclusivo da área de caças estelares. Oficial responsável por comandar os líderes de todos os esquadrões.", placa: [["R", "", "R"], ["", "B", ""], ["R", "", "R"]] }
        ]
    },
    inteligencia: {
        nome: "Inteligência Rebelde",
        corPrincipal: "#2aff6b",
        patentes: [
            { nome: "Chefe da Inteligência", desc: "O líder supremo das operações secretas. Decide as diretrizes de espionagem, infiltração e gerencia a rede de informantes contra o Império.", placa: [["G", "", "G"], ["", "G", ""], ["G", "", "G"]] },
            { nome: "Comandante da Inteligência", desc: "Coordena as células de espionagem locais e as missões de coleta de dados de alto risco.", placa: [["", "G", ""], ["G", "", "G"]] },
            { nome: "Capitão da Inteligência", desc: "Responsável operacional por analisar as informações roubadas (diplomáticas, militares ou econômicas) e filtrá-las para os líderes da Aliança.", placa: [["G", "G", ""], ["", "", ""]] }
        ]
    }
};

// Função corrigida para gerar o SVG perfeitamente centralizado e quadrado
function gerarPlacaSVG(matriz) {
    if (!matriz) return `<div class="remendo-textil">Remendo de Tecido</div>`;

    const cores = { 'R': '#ff2a2a', 'B': '#2a80ff', 'G': '#2aff6b' };
    
    let bolinhasHTML = '';
    const numLinhas = matriz.length;
    
    // Descobre o número máximo de colunas preenchidas na matriz para ajustar o tamanho da placa
    let maxColunas = 0;
    matriz.forEach(linha => {
        maxColunas = Math.max(maxColunas, linha.length);
    });

    // Dimensões dinâmicas proporcionais para manter o quadrado perfeito centralizado
    const larguraPlaca = maxColunas === 3 ? 110 : 90;
    const alturaPlaca = numLinhas === 3 ? 110 : 80;

    matriz.forEach((linha, idxLinha) => {
        linha.forEach((tipo, idxColuna) => {
            if (tipo && cores[tipo]) {
                // Cálculo matemático de espaçamento centralizado baseado no tamanho da placa
                let cx, cy;
                
                if (maxColunas === 3) {
                    cx = 25 + idxColuna * 30;
                } else {
                    cx = 30 + idxColuna * 30;
                }

                if (numLinhas === 3) {
                    cy = 25 + idxLinha * 30;
                } else {
                    cy = 25 + idxLinha * 30;
                }

                bolinhasHTML += `
                    <!-- Efeito de sombra/Glow da bolinha acesa -->
                    <circle cx="${cx}" cy="${cy}" r="11" fill="${cores[tipo]}" filter="url(#glow)" opacity="0.6"/>
                    <!-- Base interna da bolinha cilíndrica -->
                    <circle cx="${cx}" cy="${cy}" r="9" fill="${cores[tipo]}" stroke="#111" stroke-width="1.5"/>
                    <!-- Ponto de reflexo de luz superior (Efeito 3D cromado idêntico à foto) -->
                    <circle cx="${cx - 3}" cy="${cy - 3}" r="3" fill="#ffffff" opacity="0.6"/>
                `;
            }
        });
    });

    return `
        <svg width="${larguraPlaca}" height="${alturaPlaca}" viewBox="0 0 ${larguraPlaca} ${alturaPlaca}">
            <defs>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                </filter>
                <linearGradient id="metal-placa" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f0f0f0" />
                    <stop offset="35%" stop-color="#b8b8b8" />
                    <stop offset="65%" stop-color="#8a8a8a" />
                    <stop offset="100%" stop-color="#555555" />
                </linearGradient>
            </defs>
            <!-- Placa Metálica Quadrada com Bordas Chanfradas -->
            <rect x="4" y="4" width="${larguraPlaca - 8}" height="${alturaPlaca - 8}" rx="8" fill="url(#metal-placa)" stroke="#333" stroke-width="2"/>
            <!-- Friso interno metálico de acabamento -->
            <rect x="8" y="8" width="${larguraPlaca - 16}" height="${alturaPlaca - 16}" rx="5" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
            ${bolinhasHTML}
        </svg>
    `;
}

// Inicialização da Página
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(dadosHierarquias).forEach(chave => {
        const categoria = dadosHierarquias[chave];
        const container = document.getElementById(`lista-${chave}`);

        categoria.patentes.forEach(patente => {
            const item = document.createElement("div");
            item.className = "patente-item";

            item.innerHTML = `
                
                <div class="patente-info">
                    <h3>${patente.nome}</h3>
                    <div class="brasao-container">
                    ${gerarPlacaSVG(patente.placa)}
                    </div>
                    <p>${patente.desc}</p>
                </div>
            `;
            container.appendChild(item);
        });
    });
});

// Função para controlar a expansão dos cards de forma limpa (Ajustada para abrir e fechar no mesmo card)
function alternarCard(idCard) {
    const card = document.getElementById(idCard);
    const estaAtivo = card.classList.contains("ativo");

    // Fecha todos os cards antes
    document.querySelectorAll(".card-hierarquia").forEach(c => c.classList.remove("ativo"));

    // Se o clicado não estava ativo, abre ele
    if (!estaAtivo) {
        card.classList.add("ativo");
    }
}