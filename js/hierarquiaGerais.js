// Banco de dados das hierarquias e posições das bolinhas
const dadosHierarquias = {
    exercito: {
        nome: "Exército",
        corPrincipal: "#ff2a2a",
        patentes: [
            { nome: "General", desc: "O posto mais alto do exército. Responsável por planejar missões de alto risco, ordenar tropas e definir a estratégia terrestre da Aliança.", placa: [["R", "R", ""], ["", "R", ""], ["R", "R", ""]] },
            { nome: "Coronel", desc: "Um dos oficiais de campo mais graduados. Normalmente encarregado de comandar um regimento inteiro no campo de batalha.", placa: [["R", "R", ""], ["", "R", "R"]] },
            { nome: "Comandante", desc: "Possui autoridade direta sobre corpos de tropas menores e lidera operações militares táticas diretamente no terreno.", placa: [["", "R", ""], ["R", "", "R"]] },
            { nome: "Major", desc: "Atua como oficial de operações de um privilégio/batalhão. É um posto vital para a organização estrutural das tropas.", placa: [["R", "", "R"], ["", "R", ""]] },
            { nome: "Capitão", desc: "Lidera diretamente uma companhia de soldados nas missões e ofensivas terrestres.", placa: [["R", "R", ""], ["", "", ""]] },
            { nome: "Tenente", desc: "A patente de comando mais baixa, servindo de elo de comunicação e liderança direta entre o comando superior e a infantaria.", placa: [["R", "", ""], ["", "", ""]] },
            { nome: "Soldado", desc: "A base da força de combate. Não usavam as placas cromadas com bolinhas, mas sim remendos na manga ou peito para indicar sua especialidade ou esquadrão.", placa: null, detalhe: "Remendos de tecido" }
        ]
    },
    marinha: {
        nome: "Marinha (Frota Rebelde)",
        corPrincipal: "#2a80ff",
        patentes: [
            { nome: "Almirante da Frota", desc: "O comandante naval supremo da Aliança. Gerencia toda a movimentação estratégica de frotas inteiras na galáxia.", placa: [["", "R", "R"], ["B", "B", "B"]] },
            { nome: "Almirante", desc: "Oficial encarregado de comandar linhas de batalha, além de lidar com os deveres administrativos navais.", placa: [["B", "B", ""], ["", "B", ""], ["B", "B", ""]] },
            { nome: "Comodoro", desc: "Posto superior de liderança naval. Geralmente ficam encarregados de liderar e gerenciar uma nave capital específica.", placa: [["R", "R", ""], ["", "B", "B"]] },
            { nome: "Coronel Naval", desc: "Oficial de estado-maior da frota, responsável por administrar e coordenar grupos de caças estelares a partir de naves-mãe.", placa: [["B", "B", ""], ["", "B", "B"]] },
            { nome: "Comandante Naval", desc: "Atua nas operações táticas de frota e na execução em tempo real dos planos de batalha no espaço.", placa: [["", "B", ""], ["B", "B", ""]] },
            { nome: "Major Naval", desc: "Atua como oficial executivo dentro das naves, garantindo que as operações internas da tripulação funcionem sem falhas.", placa: [["B", "B", ""], ["", "B", ""]] },
            { nome: "Capitão Naval", desc: "O oficial no comando direto da ponte de uma nave específica da Frota Rebelde.", placa: [["B", "B", ""], ["", "", ""]] },
            { nome: "Tenente Naval", desc: "Oficial de frota que atua logo acima da tripulação de voo, auxiliando na logística e na ponte de comando.", placa: [["B", "", ""], ["", "", ""]] },
            { nome: "Chefe Marechal (Caças)", desc: "O posto máximo exclusivo da área de caças estelares. Oficial responsável por comandar os líderes de todos os esquadrões.", placa: [["R", "R", ""], ["", "B", ""], ["R", "R", ""]] }
        ]
    },
    inteligencia: {
        nome: "Inteligência Rebelde",
        corPrincipal: "#2aff6b",
        patentes: [
            { nome: "Chefe da Inteligência", desc: "O líder supremo das operações secretas. Decide as diretrizes de espionagem, infiltração e gerencia a rede de informantes contra o Império.", placa: [["G", "G", ""], ["", "G", ""], ["G", "G", ""]] },
            { nome: "Comandante da Inteligência", desc: "Coordena as células de espionagem locais e as missões de coleta de dados de alto risco.", placa: [["", "G", ""], ["G", "G", ""]] },
            { nome: "Capitão da Inteligência", desc: "Responsável operacional por analisar as informações roubadas (diplomáticas, militares ou econômicas) e filtrá-las para os líderes da Aliança.", placa: [["G", "G", ""], ["", "", ""]] }
        ]
    }
};

// Função para gerar o SVG realista da placa de insígnia
function gerarPlacaSVG(matriz) {
    if (!matriz) return `<div class="remendo-textil">Remendo de Tecido</div>`;

    const cores = { 'R': '#ff2a2a', 'B': '#2a80ff', 'G': '#2aff6b' };
    const glows = { 'R': 'rgba(255,42,42,0.6)', 'B': 'rgba(42,128,255,0.6)', 'G': 'rgba(42,255,107,0.6)' };

    let bolinhasHTML = '';
    const numLinhas = matriz.length;
    const larguraPlaca = 120;
    const alturaPlaca = numLinhas === 3 ? 110 : 80;

    matriz.forEach((linha, idxLinha) => {
        linha.forEach((tipo, idxColuna) => {
            if (tipo && cores[tipo]) {
                let cx = 30 + idxColuna * 30;
                let cy = 25 + idxLinha * 30;

                // Adaptação de layout para alinhar verticalmente insígnias de 3 linhas
                if (numLinhas === 3 && idxLinha === 1) cx = 45; // Centraliza a bolinha do meio se for estilo General/Almirante

                bolinhasHTML += `
                    <circle cx="${cx}" cy="${cy}" r="10" fill="${cores[tipo]}" filter="url(#glow)" opacity="0.7"/>
                    <circle cx="${cx}" cy="${cy}" r="9" fill="${cores[tipo]}" stroke="#111" stroke-width="1"/>
                    <circle cx="${cx - 3}" cy="${cy - 3}" r="3" fill="#fff" opacity="0.5"/>
                `;
            }
        });
    });

    return `
        <svg width="${larguraPlaca}" height="${alturaPlaca}" viewBox="0 0 ${larguraPlaca} ${alturaPlaca}">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                </filter>
                <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#e0e0e0" />
                    <stop offset="50%" stop-color="#999999" />
                    <stop offset="100%" stop-color="#555555" />
                </linearGradient>
            </defs>
            <rect x="5" y="5" width="${larguraPlaca - 10}" height="${alturaPlaca - 10}" rx="6" fill="url(#metal)" stroke="#444" stroke-width="2"/>
            <rect x="9" y="9" width="${larguraPlaca - 18}" height="${alturaPlaca - 18}" rx="4" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.4"/>
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

// Função para controlar a expansão dos cards de forma limpa
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