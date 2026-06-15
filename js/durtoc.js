const dadosVertentes = {
    mecnico: {
        idade: "25 Anos (Período de Ascensão)",
        patente: "Mecânico Autônomo da Linha Cinzenta",
        setor: "Níveis Inferiores / Zona Industrial de Coruscant",
        autorizacao: "Acesso Civil Restrito (Sob Vigilância do ISB)",
        lore: "Mecânico ríspido, ranzinza e incrivelmente genial que operava uma humilde oficina cravada no limiar cinzento dos subníveis de Coruscant. Reconhecido no submundo por seu absoluto desdém por burocratas e por sua capacidade milagrosa de ouvir e diagnosticar falhas moleculares em motores e compressores iônicos. Fundador da lendária 'Brigada das Catracas', utilizava sucatas recondicionadas e ferramentas modificadas para construir engenharia de sobrevivência pura, dando vida à nave-base 'A Engrenagem Mestra' e ao caça leve personalizado 'O Cinzel'. Assombrado pelo confisco do Kalicore de sua linhagem, canalizava sua fúria na criação de droids e modificações de alta performance que superavam as especificações originais dos fabricantes.",
        fotoCorpo: "../img/DurtocMec.png",
        fotoDoc: "../img/DurtocDocumento.png",
        mostrarFabricas: false
    },
    general: {
        idade: "34 Anos (Período de Glória)",
        patente: "Engenheiro Mecânico Chefe das Indústrias Imperiais / General de Divisão",
        setor: "Setor Industrial Avançado, Cidade Capital (Planeta Lothal)",
        autorizacao: "Nível Alfa / Código Vermelho de Comando Galáctico",
        lore: "Decorridos nove anos de operações implacáveis e expansão tecnológica massiva, Dur'toc acumulou capital e prestígio galáctico incontestáveis, expandindo sua influência com a compra e reabertura de uma segunda e seleta oficina mecânica na alta sociedade de Coruscant. Sua fama como o engenheiro mais meticuloso da galáxia chamou a atenção direta do Alto Comando Imperial e do Grande Almirante Thrawn. Convocado para o planeta industrial Lothal, Dur'toc assumiu a prestigiada patente de General e o cargo crítico de Engenheiro Mecânico Chefe das Indústrias Imperiais. Atualmente, ele é a autoridade técnica final sobre três colossais fábricas de produção em massa na Cidade Capital de Lothal, sendo o responsável direto pela montagem tática, calibração e testes de voo secretos do revolucionário caça estelar experimental TIE Defender.",
        fotoCorpo: "../img/DurtocGeneral.png",
        fotoDoc: "../img/DurtocGenDocumento.png",
        mostrarFabricas: true
    }
};

function alternarVertente(vertente) {
    const dados = dadosVertentes[vertente];
    if (!dados) return;

    // Atualização em Massa de Textos
    document.getElementById("txtIdade").innerText = dados.idade;
    document.getElementById("txtPatente").innerText = dados.patente;
    document.getElementById("txtSetor").innerText = dados.setor;
    document.getElementById("txtAutorizacao").innerText = dados.autorizacao;
    document.getElementById("txtLore").innerText = dados.lore;

    // Atualização das Vertentes de Imagem
    document.getElementById("fotoCorpo").src = dados.fotoCorpo;
    document.getElementById("fotoDoc").src = dados.fotoDoc;

    // Controle Exclusivo do Bloco de Fábricas de Lothal
    const painelFabricas = document.getElementById("painelFabricas");
    if (dados.mostrarFabricas) {
        painelFabricas.classList.remove("hidden");
    } else {
        painelFabricas.classList.add("hidden");
    }

    // Toggle de Classes Ativas no Menu Superior
    const botoes = document.querySelectorAll(".tab-btn");
    botoes.forEach(btn => btn.classList.remove("active"));
    
    const eventoBtn = window.event.target;
    if(eventoBtn && eventoBtn.tagName === "BUTTON") {
        eventoBtn.classList.add("active");
    }
}