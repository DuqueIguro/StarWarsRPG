// Banco de dados das hierarquias do Império Galáctico
const dadosImperio = {
    exercito_imp: {
        nome: "Exército Imperial",
        corPrincipal: "#ff0033",
        patentes: [
            { nome: "General de Superfície", desc: "Comandante supremo das forças terrestres em setores planetários. Lidera legiões inteiras de Stormtroopers e divisões de AT-ATs.", blocos: [["R", "R", "R", "R", "R", "R"]], cilindros: 2 },
            { nome: "Coronel", desc: "Oficial superior responsável pelo gerenciamento tático de regimentos blindados e guarnições planetárias críticas.", blocos: [["R", "R", "R", "R"]], cilindros: 2 },
            { nome: "Major", desc: "Supervisiona as operações de batalhões terrestres coordenando ataques de infantaria pesada e suporte logístico.", blocos: [["R", "R", "R"]], cilindros: 1 },
            { nome: "Capitão", desc: "Comanda diretamente companhias de assalto no campo de batalha avançado.", blocos: [["R", "R"]], cilindros: 1 },
            { nome: "Tenente", desc: "Oficial de campo júnior encarregado de pelotões ou postos avançados de fronteira.", blocos: [["R"]], cilindros: 1 }
        ]
    },
    marinha_imp: {
        nome: "Marinha Imperial",
        corPrincipal: "#ff0000",
        patentes: [
            { nome: "Grão-Almirante", desc: "O ápice do comando militar do Império. Controla frotas estelares inteiras e dita a estratégia espacial da galáxia.", blocos: [["R", "R", "R", "B", "B", "B"]], cilindros: 2 },
            { nome: "Almirante", desc: "Responsável por comandar esquadrões de Star Destroyers e coordenar cercos orbitais a planetas rebeldes.", blocos: [["R", "R", "R", "R", "R", "R"]], cilindros: 2 },
            { nome: "Capitão de Linha", desc: "Oficial comandante encarregado de uma nave capital específica, como um Star Destroyer classe Imperial.", blocos: [["R", "R", "R", "R"]], cilindros: 2 },
            { nome: "Comandante de Voo", desc: "Administra as alas de caças TIE a partir dos hangares das naves-mãe.", blocos: [["R", "R", "R"]], cilindros: 1 },
            { nome: "Tenente de Voo", desc: "Líder de esquadrão de caças TIE encarregado de interceptações no espaço profundo.", blocos: [["R", "R"]], cilindros: 1 }
        ]
    },
    isb_imp: {
        nome: "Diretório de Segurança (ISB)",
        corPrincipal: "#ff3300",
        patentes: [
            { nome: "Diretor do ISB", desc: "Líder supremo da Inteligência Imperial e do Escritório de Segurança. Responsável direto por caçar células rebeldes e expor traidores.", blocos: [["B", "B", "B", "R", "R", "R"]], cilindros: 2 },
            { nome: "Coronel do ISB", desc: "Interrogador chefe e estrategista de contra-espionagem operando em setores de alta traição.", blocos: [["B", "B", "B", "R"]], cilindros: 2 },
            { nome: "Comandante Operacional", desc: "Supervisiona redes de agentes infiltrados e operações de vigilância em massa.", blocos: [["B", "B", "R"]], cilindros: 1 },
            { nome: "Inspetor", desc: "Agente de campo encarregado de auditorias ideológicas e investigações de segurança em guarnições.", blocos: [["B", "R"]], cilindros: 1 }
        ]
    }
};

// Gera o SVG Imperial rígido com blocos quadrados e cilindros de código ao lado direito
function gerarPlacaImperialSVG(matriz, numCilindros) {
    const cores = { 'R': '#ff0033', 'B': '#0066ff' };
    let blocosHTML = '';
    
    const blocoLargura = 14;
    const blocoAltura = 22;
    const espacamento = 4;
    
    let maxColunas = 0;
    matriz.forEach(linha => maxColunas = Math.max(maxColunas, linha.length));
    
    // Dimensões dinâmicas da insígnia metálica baseada no número de blocos
    const larguraInsignia = 20 + maxColunas * (blocoLargura + espacamento);
    const alturaInsignia = 45;
    
    // Espaço extra para renderizar os cilindros de código ao lado direito
    const espacoCilindros = numCilindros * 22;
    const larguraTotalSVG = larguraInsignia + espacoCilindros + 10;
    const alturaTotalSVG = 60;

    // 1. Renderiza os blocos retangulares/quadrados rígidos do Império
    matriz.forEach((linha, idxLinha) => {
        linha.forEach((tipo, idxColuna) => {
            if (tipo && cores[tipo]) {
                let x = 12 + idxColuna * (blocoLargura + espacamento);
                let y = 12 + idxLinha * (blocoAltura + 4);
                
                blocosHTML += `
                    <rect x="${x}" y="${y}" width="${blocoLargura}" height="${blocoAltura}" fill="${cores[tipo]}" filter="url(#glowImperial)" opacity="0.4"/>
                    <rect x="${x}" y="${y}" width="${blocoLargura}" height="${blocoAltura}" fill="${cores[tipo]}" stroke="#000" stroke-width="1.5" rx="1"/>
                    <rect x="${x + 2}" y="${y + 2}" width="3" height="${blocoAltura - 4}" fill="#fff" opacity="0.3"/>
                `;
            }
        });
    });

    // 2. Renderiza os Cilindros de Código (Code Cylinders) à direita da placa
    let cilindrosHTML = '';
    for (let i = 0; i < numCilindros; i++) {
        let xCilindro = larguraInsignia + 10 + (i * 20);
        cilindrosHTML += `
            <rect x="${xCilindro}" y="6" width="12" height="48" rx="2" fill="#000" opacity="0.4"/>
            <rect x="${xCilindro}" y="5" width="12" height="44" rx="2" fill="url(#metalImperial)" stroke="#222" stroke-width="1"/>
            <rect x="${xCilindro + 2}" y="5" width="8" height="6" fill="#00aeff" stroke="#111" stroke-width="0.5"/>
            <line x1="${xCilindro + 6}" y1="15" x2="${xCilindro + 6}" y2="38" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
            <line x1="${xCilindro}" y1="41" x2="${xCilindro + 12}" y2="41" stroke="#222" stroke-width="1"/>
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
                    ${gerarPlacaImperialSVG(patente.blocos, patente.cilindros)}
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