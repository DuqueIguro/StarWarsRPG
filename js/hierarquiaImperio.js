// Banco de dados expandido e corrigido do Império Galáctico
const dadosImperio = {
    politico_imp: {
        nome: "Setor Político e Administrativo",
        corPrincipal: "#ff0033",
        patentes: [
            { nome: "Grande Moff", desc: "Comandante de super-setores (grupos de sistemas estelares). Possui autoridade irrestrita para realocar exércitos e destituir outros governadores.", blocos: [["B", "B", "B", "B", "B", "B"], ["R", "R", "R", "Y", "Y", "Y"]], cilindros: 4 },
            { nome: "Moff", desc: "Governador de um setor imperial. Administra a política local e atua como líder militar máximo dentro das fronteiras de seu setor.", blocos: [["B", "B", "B", "B", "B", "B"], ["R", "R", "R", "Y", "Y", "Y"]], cilindros: 2 }
        ]
    },
    exercito_imp: {
        nome: "Exército Imperial (Forças de Ocupação Terrestre)",
        corPrincipal: "#ff3300",
        patentes: [
            { nome: "General de Superfície", desc: "Posição mais alta do exército de um setor, coordenando recursos e ataques na linha de frente. Planejador estratégico responsável por divisões inteiras.", blocos: [["R", "R", "R", "R", "R", "R"], ["B", "B", "B", "B", "B", "B"]], cilindros: 2 },
            { nome: "Coronel", desc: "Oficial superior encarregado de liderar brigadas diretamente no campo de batalha e guarnições táticas.", blocos: [["R", "R", "B", "B", "B", "B"]], cilindros: 0 },
            { nome: "Oficial do Corpo Stormtrooper", desc: "Cuida do comando tático e burocrático dos soldados de base do corpo de assalto.", blocos: [["B", "B", "B", "B"]], cilindros: 0 },
            { nome: "Comandante Stormtrooper", desc: "Oficial tático máximo no calor da batalha. Identificado no campo por sua ombreira tática especial.", blocos: null, cilindros: 0, ombreira: "laranja" },
            { nome: "Capitão / Líder de Esquadrão", desc: "Comanda pelotões e lidera o avanço frontal das tropas de choque.", blocos: null, cilindros: 0, ombreira: "vermelha" },
            { nome: "Sargento Stormtrooper", desc: "Lidera patrulhas de rua e grupos menores de ação contínua em áreas de ocupação.", blocos: null, cilindros: 0, ombreira: "branca" },
            { nome: "Cabo Stormtrooper", desc: "Comando de base para pequenos agrupamentos ou guaritas de segurança periférica.", blocos: null, cilindros: 0, ombreira: "preta" },
            { nome: "Stormtrooper / Cadete", desc: "Soldados rasos operacionais para combate armado e jovens em treinamento de infantaria.", blocos: null, cilindros: 0, ombreira: "padrão" }
        ]
    },
    marinha_imp: {
        nome: "Marinha Imperial (Frota Naval)",
        corPrincipal: "#ff0000",
        patentes: [
            { nome: "Grão-Almirante", desc: "Oficial supremo da Marinha. Comanda as maiores e mais letais frotas do Império, vestindo um uniforme branco exclusivo.", blocos: [["R", "R", "R", "Y", "Y", "Y"], ["B", "B", "B", "Y", "Y", "Y"]], cilindros: 4 },
            { nome: "Almirante", desc: "Oficial responsável por comandar frotas regulares e traçar estratégias navais de grande escala.", blocos: [["R", "R", "R", "R", "R", "R"], ["B", "B", "B", "B", "B", "B"]], cilindros: 4 },
            { nome: "Vice-Almirante", desc: "Oficial de inteligência naval que atua logo abaixo do Almirante, auxiliando no comando e na ponte com o Senado.", blocos: [["R", "R", "R", "R"], ["B", "B", "B", "B"]], cilindros: 2 },
            { nome: "Capitão de Nave", desc: "Autoridade absoluta dentro de um Star Destroyer, governando toda a tripulação e o poder de fogo de sua embarcação.", blocos: [["R", "R", "R"], ["B", "B", "B"]], cilindros: 2 },
            { nome: "Tenente Sênior", desc: "Oficial superior de convés, atua garantindo que as ordens do capitão sejam cumpridas à risca na nave.", blocos: [["B", "B", "B", "R"]], cilindros: 0 },
            { nome: "Tenente", desc: "Oficial de navegação, qualificado para comandar naves menores como cruzadores leves e escoltas.", blocos: [["R", "R"], ["B", "B"]], cilindros: 0 },
            { nome: "Aspirante", desc: "Estagiário de operações em naves capitais, dedicado ao estudo tático e auxílio na ponte de comando.", blocos: [["R"], ["B"]], cilindros: 0 },
            { nome: "Oficial de Convés", desc: "Tripulante militar padrão, focado em tarefas de vigilância e manutenção interna da nave.", blocos: null, cilindros: 0 }
        ]
    }
};

// Gera o SVG Imperial estruturado corretamente com linhas empilhadas e cilindros alinhados à direita
function gerarPlacaImperialSVG(matriz, numCilindros, ombreira) {
    if (ombreira) {
        if (ombreira === "padrão") return `<span class="sem-placa">Armadura Branca Padrão</span>`;
        return `<div class="ombreira-box omb-${ombreira}">Ombreira ${ombreira}</div>`;
    }
    if (!matriz) return `<span class="sem-placa">Sem placa de identificação</span>`;

    // Inclusão do Amarelo Imperial
    const cores = { 'R': '#ff0033', 'B': '#0066ff', 'Y': '#ffcc00' };
    let blocosHTML = '';
    
    const blocoLargura = 14;
    const blocoAltura = 22;
    const espacamentoX = 4;
    const espacamentoY = 6;
    
    const numLinhas = matriz.length;
    let maxColunas = 0;
    matriz.forEach(linha => maxColunas = Math.max(maxColunas, linha.length));
    
    // Ajuste dinâmico de dimensões da placa de cromo
    const larguraInsignia = 20 + maxColunas * (blocoLargura + espacamentoX);
    const alturaInsignia = numLinhas === 2 ? 68 : 45;
    
    const espacoCilindros = numCilindros * 22;
    const larguraTotalSVG = larguraInsignia + espacoCilindros + 15;
    const alturaTotalSVG = numLinhas === 2 ? 80 : 60;

    matriz.forEach((linha, idxLinha) => {
        linha.forEach((tipo, idxColuna) => {
            if (tipo && cores[tipo]) {
                let x = 12 + idxColuna * (blocoLargura + espacamentoX);
                let y = 12 + idxLinha * (blocoAltura + espacamentoY);
                
                blocosHTML += `
                    <!-- Brilho/Glow do Bloco -->
                    <rect x="${x}" y="${y}" width="${blocoLargura}" height="${blocoAltura}" fill="${cores[tipo]}" filter="url(#glowImperial)" opacity="0.35"/>
                    <!-- Bloco Sólido Retangular -->
                    <rect x="${x}" y="${y}" width="${blocoLargura}" height="${blocoAltura}" fill="${cores[tipo]}" stroke="#000" stroke-width="1.5" rx="1"/>
                    <!-- Reflexo Metálico Interno -->
                    <rect x="${x + 2}" y="${y + 2}" width="2" height="${blocoAltura - 4}" fill="#fff" opacity="0.3"/>
                `;
            }
        });
    });

    // Renderização dos Cilindros de Código alinhados de acordo com a altura da placa
    let cilindrosHTML = '';
    const yTopCilindro = numLinhas === 2 ? 16 : 5;
    for (let i = 0; i < numCilindros; i++) {
        let xCilindro = larguraInsignia + 10 + (i * 20);
        cilindrosHTML += `
            <!-- Sombra projetada do cilindro -->
            <rect x="${xCilindro}" y="${yTopCilindro + 1}" width="12" height="48" rx="2" fill="#000" opacity="0.4"/>
            <!-- Corpo de Cromo Prata -->
            <rect x="${xCilindro}" y="${yTopCilindro}" width="12" height="44" rx="2" fill="url(#metalImperial)" stroke="#222" stroke-width="1"/>
            <!-- Cabeça azul do cilindro de dados -->
            <rect x="${xCilindro + 2}" y="${yTopCilindro}" width="8" height="6" fill="#00aeff" stroke="#111" stroke-width="0.5"/>
            <!-- Clipe de fixação metálico -->
            <line x1="${xCilindro + 6}" y1="${yTopCilindro + 10}" x2="${xCilindro + 6}" y2="${yTopCilindro + 33}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
            <!-- Ranhuras do design -->
            <line x1="${xCilindro}" y1="${yTopCilindro + 36}" x2="${xCilindro + 12}" y2="${yTopCilindro + 36}" stroke="#222" stroke-width="1"/>
        `;
    }

    return `
        <svg width="${larguraTotalSVG}" height="${alturaTotalSVG}" viewBox="0 0 ${larguraTotalSVG} ${alturaTotalSVG}">
            <defs>
                <filter id="glowImperial" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                </filter>
                <linearGradient id="metalImperial" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="25%" stop-color="#cccccc" />
                    <stop offset="70%" stop-color="#777777" />
                    <stop offset="100%" stop-color="#333333" />
                </linearGradient>
            </defs>
            
            <!-- Placa Metálica Imperial Rígida -->
            <rect x="4" y="6" width="${larguraInsignia - 8}" height="${alturaInsignia}" rx="2" fill="url(#metalImperial)" stroke="#111" stroke-width="2"/>
            <rect x="7" y="9" width="${larguraInsignia - 14}" height="${alturaInsignia - 6}" rx="1" fill="none" stroke="#000000" stroke-width="1" opacity="0.2"/>
            
            ${blocosHTML}
            ${cilindrosHTML}
        </svg>
    `;
}

// Inicialização da Árvore Imperial
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(dadosImperio).forEach(chave => {
        const categoria = dadosImperio[chave];
        const container = document.getElementById(`lista-${chave}`);

        categoria.patentes.forEach(patente => {
            const item = document.createElement("div");
            item.className = "patente-item-imp";

            item.innerHTML = `
                <div class="brasao-container-imp">
                    ${gerarPlacaImperialSVG(patente.blocos, patente.cilindros, patente.ombreira)}
                </div>
                <div class="patente-info-imp">
                    <h4>${patente.nome}</h4>
                    <p>${patente.desc}</p>
                </div>
            `;
            container.appendChild(item);
        });
    });
});

// Controle Sanfona da Interface Imperial
function alternarCardImperio(idCard) {
    const card = document.getElementById(idCard);
    const estaAtivo = card.classList.contains("ativo");

    document.querySelectorAll(".card-imperio").forEach(c => c.classList.remove("ativo"));

    if (!estaAtivo) {
        card.classList.add("ativo");
    }
}