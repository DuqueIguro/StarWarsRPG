// Dados locais simulando a evolução da Lore de Dur'toc em 9 anos
const dadosVertentes = {
    mecnico: {
        idade: "25 Anos",
        patente: "Mecânico Autônomo da Linha Cinzenta",
        setor: "Níveis Inferiores / Médios de Coruscant",
        lore: "Mecânico ríspido e genial que opera na divisa dos níveis de Coruscant. Conhecido por gritar com ferramentas teimosas e reconstruir droids e naves a partir de sucatas (Criador da nave 'A Engrenagem Mestra' e do caça 'O Cinzel'). Perdeu a relíquia mecânica de sua família, o Kalicore, para guarnições imperiais nas sombras da Cidade Imperial.",
        fotoCorpo: "../img/DurtocMec.png",
        fotoDoc: "../img/DurtocDocumento.png",
        mostrarFabricas: false
    },
    general: {
        idade: "34 Anos",
        patente: "General de Divisão Industrial Imperial",
        setor: "Cidade Capital, Planeta Lothal (Setor da Orla Exterior)",
        lore: "Após 9 anos de expansão de sua equipe (Brigada das Catracas) e melhorias contínuas em seus droids e ferramentas, Dur'toc expandiu seus negócios e comprou uma segunda oficina na prestigiada parte alta de Coruscant. Posteriormente, sua maestria técnica chamou atenção do Alto Comando, sendo convocado para liderar secretamente o desenvolvimento do protótipo TIE Defender em Lothal, assumindo o controle de 3 complexos fabris industriais no planeta.",
        fotoCorpo: "../img/DurtocGeneral.png",
        fotoDoc: "../img/DurtocGenDocumento.png",
        mostrarFabricas: true
    }
};

function alternarVertente(vertente) {
    const dados = dadosVertentes[vertente];
    if (!dados) return;

    // Atualiza Textos
    document.getElementById("txtIdade").innerText = dados.idade;
    document.getElementById("txtPatente").innerText = dados.patente;
    document.getElementById("txtSetor").innerText = dados.setor;
    document.getElementById("txtLore").innerText = dados.lore;

    // Atualiza Imagens específicas anexadas
    document.getElementById("fotoCorpo").src = dados.fotoCorpo;
    document.getElementById("fotoDoc").src = dados.fotoDoc;

    // Controla painel de fábricas de Lothal
    const painelFabricas = document.getElementById("painelFabricas");
    if (dados.mostrarFabricas) {
        painelFabricas.classList.remove("hidden");
    } else {
        painelFabricas.classList.add("hidden");
    }

    // Gerencia botões ativos do menu
    const botoes = document.querySelectorAll(".tab-btn");
    botoes.forEach(btn => btn.classList.remove("active"));
    
    // Define botão ativo baseado na chamada
    const eventoBtn = window.event.target;
    if(eventoBtn && eventoBtn.tagName === "BUTTON") {
        eventoBtn.classList.add("active");
    }
}