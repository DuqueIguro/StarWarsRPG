const database = [
    { "nome": "Tatooine", "descricao": "Planeta desértico dominado pelo submundo do crime.", "regiao": "Orla Exterior", "setor": "Setor Arkanis", "sistema": "Sistema Tatoo", "governo": "Senhores locais e Cartel Hutt", "afiliacao": "Cartel Hutt", "rota_utilizada": "Corredor Corelliano (via conexões locais), Rota de Triellus.", "principais_especies": ["Humanos"], "outras_informacoes": "Local de nascimento de Anakin Skywalker e lar de Luke Skywalker durante sua juventude." },
    { "nome": "Coruscant", "descricao": "Ecumenópole que serve como capital do Império.", "regiao": "Núcleo", "setor": "Setor Coruscant", "sistema": "Sistema Coruscant", "governo": "Capital Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota Comercial Perlemiana, Via Hydiana.", "principais_especies": ["Diversas"], "outras_informacoes": "Sede do Templo Jedi e do Senado Galáctico." },
    { "nome": "Naboo", "descricao": "Planeta exuberante de lagos, florestas e arquitetura clássica.", "regiao": "Orla Média", "setor": "Setor Chommell", "sistema": "Sistema Naboo", "governo": "Monarquia eletiva", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota Comercial de Corellia.", "principais_especies": ["Humanos", "Gungans"], "outras_informacoes": "Planeta natal de Padmé Amidala e do Imperador Palpatine." },
    { "nome": "Alderaan", "descricao": "Planeta pacífico, montanhoso e altamente desenvolvido.", "regiao": "Núcleo", "setor": "Setor Alderaan", "sistema": "Sistema Alderaan", "governo": "Monarquia constitucional", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota Comercial Perlemiana.", "principais_especies": ["Humanos"], "outras_informacoes": "Planeta natal da Princesa Leia Organa." },
    { "nome": "Kashyyyk", "descricao": "Planeta florestal onde os Wookiees são escravizados pelo Império.", "regiao": "Orla Média", "setor": "Setor Mytaranor", "sistema": "Sistema Kashyyyk", "governo": "Ocupação Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Via Hydiana.", "principais_especies": ["Wookiees"], "outras_informacoes": "Cenário de uma grande batalha durante as Guerras Clônicas." },
    { "nome": "Bespin", "descricao": "Gigante gasoso famoso pela mineração de tibanna.", "regiao": "Orla Exterior", "setor": "Setor Anoat", "sistema": "Sistema Bespin", "governo": "Administração planetária", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Humanos"], "outras_informacoes": "Local do confronto icônico entre Luke Skywalker e Darth Vader." },
    { "nome": "Endor", "descricao": "Lua florestal coberta por densas matas.", "regiao": "Orla Exterior", "setor": "Setor Moddell", "sistema": "Sistema Endor", "governo": "Tribos locais", "afiliacao": "Nenhuma", "rota_utilizada": "Rota do Santuário.", "principais_especies": ["Ewoks"], "outras_informacoes": "Local da Batalha de Endor, destruição da segunda Estrela da Morte." },
    { "nome": "Hoth", "descricao": "Mundo gelado, desabitado e coberto por neve.", "regiao": "Orla Exterior", "setor": "Setor Anoat", "sistema": "Sistema Hoth", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Fora das principais rotas.", "principais_especies": ["Nenhuma"], "outras_informacoes": "Cenário da Batalha de Hoth." },
    { "nome": "Dagobah", "descricao": "Planeta pantanoso, rico na Força e praticamente inexplorado.", "regiao": "Orla Exterior", "setor": "Setor Sluis", "sistema": "Sistema Dagobah", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Desconhecida e de difícil acesso.", "principais_especies": ["Nenhuma"], "outras_informacoes": "Local onde Luke Skywalker recebeu seu treinamento Jedi de Yoda." },
    { "nome": "Mustafar", "descricao": "Planeta vulcânico que abriga a fortaleza de Darth Vader.", "regiao": "Orla Exterior", "setor": "Setor Atravis", "sistema": "Sistema Mustafar", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Via Hydiana.", "principais_especies": ["Mustafarianos"], "outras_informacoes": "Local do duelo entre Obi-Wan Kenobi e Anakin Skywalker." },
    { "nome": "Geonosis", "descricao": "Mundo desértico onde é construída a primeira Estrela da Morte.", "regiao": "Orla Exterior", "setor": "Setor Arkanis", "sistema": "Sistema Geonosis", "governo": "Ocupação Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Geonosianos"], "outras_informacoes": "Local da primeira batalha das Guerras Clônicas." },
    { "nome": "Utapau", "descricao": "Mundo de enormes sumidouros onde ficam suas cidades.", "regiao": "Orla Exterior", "setor": "Setor Tarabba", "sistema": "Sistema Utapau", "governo": "Conselho local", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota de Comércio de Rimma.", "principais_especies": ["Pau'ans", "Utai"], "outras_informacoes": "Confronto final entre Obi-Wan Kenobi e General Grievous." },
    { "nome": "Felucia", "descricao": "Selva exuberante repleta de fungos e plantas gigantes.", "regiao": "Orla Exterior", "setor": "Setor Thanium", "sistema": "Sistema Felucia", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota Perlemiana.", "principais_especies": ["Felucianos"], "outras_informacoes": "Morte da Mestre Jedi Aayla Secura na Ordem 66." },
    { "nome": "Mygeeto", "descricao": "Mundo gelado conhecido por seus bancos e minas de cristais.", "regiao": "Orla Exterior", "setor": "Setor Albarrio", "sistema": "Sistema Mygeeto", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Trilha de Braxant.", "principais_especies": ["Muuns"], "outras_informacoes": "Morte do Mestre Jedi Ki-Adi-Mundi na Ordem 66." },
    { "nome": "Corellia", "descricao": "Centro industrial e um dos maiores fabricantes de naves.", "regiao": "Núcleo", "setor": "Setor Corelliano", "sistema": "Sistema Corelliano", "governo": "Diktat Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Humanos"], "outras_informacoes": "Planeta natal de Han Solo." },
    { "nome": "Mandalore", "descricao": "Mundo natal dos mandalorianos, sob forte controle imperial.", "regiao": "Orla Exterior", "setor": "Setor Mandalore", "sistema": "Sistema Mandalore", "governo": "Ocupação Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor de Shustine.", "principais_especies": ["Mandalorianos"], "outras_informacoes": "Cultura valoriza armadura de beskar." },
    { "nome": "Dantooine", "descricao": "Mundo rural de extensas planícies e pequenas colônias.", "regiao": "Orla Exterior", "setor": "Setor Raioballo", "sistema": "Sistema Dantooine", "governo": "Administração local", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota de Myto.", "principais_especies": ["Humanos"], "outras_informacoes": "Abandonado pela Aliança Rebelde." },
    { "nome": "Ryloth", "descricao": "Mundo árido explorado economicamente pelo Império.", "regiao": "Orla Exterior", "setor": "Setor Gaulus", "sistema": "Sistema Ryloth", "governo": "Governo planetário", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Twi'leks"], "outras_informacoes": "Conhecido por sua exportação da especiaria ryll." },
    { "nome": "Yavin 4", "descricao": "Lua coberta por selvas e antigas ruínas Massassi.", "regiao": "Orla Exterior", "setor": "Setor Gordian Reach", "sistema": "Sistema Yavin", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Corredor Gordiano.", "principais_especies": ["Nenhuma"], "outras_informacoes": "Local da Batalha de Yavin." },
    { "nome": "Mon Cala", "descricao": "Mundo oceânico famoso por seus engenheiros navais.", "regiao": "Orla Exterior", "setor": "Setor Mon Calamari", "sistema": "Sistema Mon Cala", "governo": "Monarquia", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota de Nklon.", "principais_especies": ["Mon Calamari", "Quarren"], "outras_informacoes": "Planeta natal do Almirante Ackbar." },
    { "nome": "Sullust", "descricao": "Mundo vulcânico de grande importância industrial.", "regiao": "Orla Exterior", "setor": "Setor Sullust", "sistema": "Sistema Sullust", "governo": "Governo planetário", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota de Rimma.", "principais_especies": ["Sullustanos"], "outras_informacoes": "A Frota Rebelde se reuniu aqui antes de Endor." },
    { "nome": "Jakku", "descricao": "Mundo desértico remoto e pouco desenvolvido.", "regiao": "Orla Interior", "setor": "Setor Go-Bral", "sistema": "Sistema Jakku", "governo": "Assentamentos locais", "afiliacao": "Império Galáctico", "rota_utilizada": "Fora das rotas.", "principais_especies": ["Humanos"], "outras_informacoes": "Onde Rey viveu antes de se juntar à Resistência." },
    { "nome": "Crait", "descricao": "Mundo mineral coberto por sal branco sobre solo vermelho.", "regiao": "Orla Exterior", "setor": "Setor Crait", "sistema": "Sistema Crait", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Desconhecida.", "principais_especies": ["Nenhuma"], "outras_informacoes": "Local de confronto da Resistência contra a Primeira Ordem." },
    { "nome": "Scarif", "descricao": "Mundo tropical que abriga o cofre de dados militar imperial.", "regiao": "Orla Exterior", "setor": "Setor Abrion", "sistema": "Sistema Scarif", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota do Santuário.", "principais_especies": ["Humanos"], "outras_informacoes": "Onde os planos da Estrela da Morte foram roubados." },
    { "nome": "Lothal", "descricao": "Mundo agrícola transformado em importante polo imperial.", "regiao": "Orla Exterior", "setor": "Setor Lothal", "sistema": "Sistema Lothal", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota de Comércio de Hydian.", "principais_especies": ["Humanos"], "outras_informacoes": "Planeta natal de Ezra Bridger." },
    { "nome": "D'Qar", "descricao": "Mundo florestal remoto e pouco habitado.", "regiao": "Orla Exterior", "setor": "Setor Ileenium", "sistema": "Sistema D'Qar", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Desconhecida.", "principais_especies": ["Nenhuma"], "outras_informacoes": "Base secreta da Resistência evacuada." },
    { "nome": "Hosnian Prime", "descricao": "Planeta urbano e importante centro político do Núcleo.", "regiao": "Núcleo", "setor": "Setor Hosniano", "sistema": "Sistema Hosnian", "governo": "Governo planetário", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Humanos"], "outras_informacoes": "Destruído pela Base Starkiller." },
    { "nome": "Kuat", "descricao": "Centro de construção das maiores frotas estelares.", "regiao": "Núcleo", "setor": "Setor Kuat", "sistema": "Sistema Kuat", "governo": "Aristocracia", "afiliacao": "Império Galáctico", "rota_utilizada": "Via Hydiana.", "principais_especies": ["Humanos"], "outras_informacoes": "Fabricante dos Destróieres Estelares." },
    { "nome": "Fondor", "descricao": "Potente centro industrial e estaleiro naval.", "regiao": "Núcleo", "setor": "Setor Tapani", "sistema": "Sistema Fondor", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Humanos"], "outras_informacoes": "Construiu o Super Destróier Executor." },
    { "nome": "Raxus Prime", "descricao": "Mundo coberto por sucata e destroços industriais.", "regiao": "Orla Exterior", "setor": "Setor Tion Hegemony", "sistema": "Sistema Raxus", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Rota Perlemiana.", "principais_especies": ["Diversas"], "outras_informacoes": "Local de refugo e peças raras de dróides." },
    { "nome": "Christophsis", "descricao": "Mundo cristalino rico em recursos minerais.", "regiao": "Orla Exterior", "setor": "Setor Savareen", "sistema": "Sistema Christoph", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Humanos"], "outras_informacoes": "Primeira missão de Ahsoka Tano com Anakin." },
    { "nome": "Umbara", "descricao": "Mundo sombrio com tecnologia avançada e atmosfera densa.", "regiao": "Orla Exterior", "setor": "Setor Fantasma", "sistema": "Sistema Umbara", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Umbaranos"], "outras_informacoes": "Campanha brutal liderada por Pong Krell." },
    { "nome": "Kessel", "descricao": "Mundo minerador conhecido pela extração de especiarias e coaxium.", "regiao": "Orla Exterior", "setor": "Setor Kessel", "sistema": "Sistema Kessel", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Kessel Run.", "principais_especies": ["Diversas"], "outras_informacoes": "Han Solo fez a rota em menos de 12 parsecs." },
    { "nome": "Malastare", "descricao": "Mundo industrial rico em combustível e energia.", "regiao": "Orla Interior", "setor": "Setor Futhark", "sistema": "Sistema Malastare", "governo": "Governo planetário", "afiliacao": "Império Galáctico", "rota_utilizada": "Via Hydiana.", "principais_especies": ["Dug", "Humanos"], "outras_informacoes": "Famoso por suas corridas de pods de alta periculosidade." },
    { "nome": "Korriban (Moraband)", "descricao": "Antigo mundo-túmulo dos Sith, abandonado e envolto pelo lado sombrio.", "regiao": "Orla Exterior", "setor": "Setor Esstran", "sistema": "Sistema Horuset", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Vale dos Lordes Sombrios.", "principais_especies": ["Nenhuma"], "outras_informacoes": "Mundo de origem e criptas dos antigos Lordes Sith." },
    { "nome": "Dathomir", "descricao": "Mundo sombrio dominado por magia e fauna hostil.", "regiao": "Orla Exterior", "setor": "Setor Quelii", "sistema": "Sistema Dathomir", "governo": "Irmãs da Noite", "afiliacao": "Independente", "rota_utilizada": "Desconhecida.", "principais_especies": ["Zabraks", "Dathomirianos"], "outras_informacoes": "Planeta de origem de Darth Maul." },
    { "nome": "Cato Neimoidia", "descricao": "Mundo de cidades suspensas e antiga riqueza comercial.", "regiao": "Orla Interior", "setor": "Setor Kanz", "sistema": "Sistema Cato Neimoidia", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor de Neimoidia.", "principais_especies": ["Neimoidianos"], "outras_informacoes": "Bastião da Federação de Comércio." },
    { "nome": "Saleucami", "descricao": "Planeta quente de desertos e vegetação rasteira.", "regiao": "Orla Exterior", "setor": "Setor Saleucami", "sistema": "Sistema Saleucami", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota de Rimma.", "principais_especies": ["Saleucami"], "outras_informacoes": "Stass Allie foi assassinada aqui na Ordem 66." },
    { "nome": "Zeffo", "descricao": "Mundo ventoso repleto de tumbas de uma antiga civilização.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Sistema Zeffo", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Desconhecida.", "principais_especies": ["Zeffo (extintos)"], "outras_informacoes": "Contém segredos arcanos sobre a Força antiga." },
    { "nome": "Bracca", "descricao": "Ferro-velho galáctico onde naves são desmontadas.", "regiao": "Orla Média", "setor": "Desconhecido", "sistema": "Sistema Bracca", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Via Hydiana.", "principais_especies": ["Humanos"], "outras_informacoes": "Onde Cal Kestis se escondeu como sucateiro." },
    { "nome": "Chandrila", "descricao": "Planeta agrícola conhecido por sua tradição política.", "regiao": "Núcleo", "setor": "Setor Bormea", "sistema": "Sistema Chandrila", "governo": "República planetária", "afiliacao": "Império Galáctico", "rota_utilizada": "Rota Perlemiana.", "principais_especies": ["Humanos"], "outras_informacoes": "Mundo natal de Mon Mothma." },
    { "nome": "Ord Mantell", "descricao": "Mundo comercial conhecido por caçadores de recompensas.", "regiao": "Orla Média", "setor": "Setor Bright Jewel", "sistema": "Sistema Bright Jewel", "governo": "Governo planetário", "afiliacao": "Império Galáctico", "rota_utilizada": "Corredor Corelliano.", "principais_especies": ["Humanos"], "outras_informacoes": "Sede de guildas de caçadores e contrabandistas." },
    { "nome": "Kef Bir", "descricao": "Lua oceânica com destroços da segunda Estrela da Morte.", "regiao": "Orla Exterior", "setor": "Setor Moddell", "sistema": "Sistema Endor", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Rota do Santuário.", "principais_especies": ["Aki-Aki"], "outras_informacoes": "Onde o Navegador Sith estava ocultado." },
    { "nome": "Pasaana", "descricao": "Mundo desértico onde tribos nômades realizam festivais.", "regiao": "Orla Exterior", "setor": "Setor Gavar", "sistema": "Sistema Pasaana", "governo": "Nenhum", "afiliacao": "Nenhuma", "rota_utilizada": "Desconhecida.", "principais_especies": ["Aki-Aki"], "outras_informacoes": "Palco do Festival dos Ancestrais." },
    { "nome": "Nal Hutta", "descricao": "Mundo pantanoso e centro do poder dos Hutts.", "regiao": "Orla Exterior", "setor": "Setor Y'Toub", "sistema": "Sistema Y'Toub", "governo": "Clãs Hutt", "afiliacao": "Cartel Hutt", "rota_utilizada": "Corredor de Pabol.", "principais_especies": ["Hutts"], "outras_informacoes": "Capital dos cartéis do Espaço Hutt." },
    { "nome": "Nar Shaddaa", "descricao": "Lua urbana dominada pelo crime organizado.", "regiao": "Orla Exterior", "setor": "Setor Y'Toub", "sistema": "Sistema Y'Toub", "governo": "Clãs Hutt", "afiliacao": "Cartel Hutt", "rota_utilizada": "Corredor de Pabol.", "principais_especies": ["Diversas"], "outras_informacoes": "Conhecida como a Lua dos Contrabandistas." },
    { "nome": "Concord Dawn", "descricao": "Mundo mandaloriano estratégico, conhecido por seus Protetores.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Sistema Concord Dawn", "governo": "Casas Mandalorianas", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Mandalorianos"], "outras_informacoes": "Planeta natal de Jango Fett (Legends)." },
    { "nome": "Florrum", "descricao": "Planeta árido que serve de refúgio para piratas.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Sistema Florrum", "governo": "Clãs Piratas", "afiliacao": "Piratas de Hondo Ohnaka", "rota_utilizada": "Desconhecida.", "principais_especies": ["Diversas"], "outras_informacoes": "Base da gangue de piratas Weequay de Hondo." },
    { "nome": "Kirneh", "descricao": "Mundo conhecido por ter resistido à invasão separatista.", "regiao": "Orla Média", "setor": "Desconhecido", "sistema": "Sistema Kirneh", "governo": "Governo Planetário", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Humanos"], "outras_informacoes": "Reconstruído sob forte influência Imperial." },
    { "nome": "Brentaal IV", "descricao": "Importante centro comercial e cruzamento de rotas.", "regiao": "Núcleo", "setor": "Desconhecido", "sistema": "Sistema Brentaal", "governo": "Governador Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Humanos"], "outras_informacoes": "Nó de tráfego vital que conecta rotas do Núcleo." },
    { "nome": "Jedha", "descricao": "Antigo mundo sagrado explorado por seus cristais kyber.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Sistema Jedha", "governo": "Ocupação Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Humanos"], "outras_informacoes": "Primeiro teste do superlaser da Estrela da Morte." },
    { "nome": "Atollon", "descricao": "Mundo remoto.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Atollon", "governo": "Nenhum", "afiliacao": "Nenhum", "rota_utilizada": "Desconhecida.", "principais_especies": ["Dokma"], "outras_informacoes": "Base secreta da célula rebelde Phoenix." },
    { "nome": "Nur", "descricao": "Lua oceânica que abriga a Fortaleza Inquisitorial.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Mustafar", "governo": "Império Galáctico", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Nenhuma"], "outras_informacoes": "Local onde os Inquisidores caçam os Jedi sobreviventes." },
    { "nome": "Garel", "descricao": "Mundo remoto.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Garel", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Humanos"], "outras_informacoes": "Ponto de passagem frequente para operações imperiais secundárias." },
    { "nome": "Mapuzo", "descricao": "Mundo minerador e agrícola.", "regiao": "Orla Interior", "setor": "Desconhecido", "sistema": "Mapuzo", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Humanos"], "outras_informacoes": "Onde Obi-Wan e Leia se esconderam no Caminho." },
    { "nome": "Jabiim", "descricao": "Planeta chuvoso.", "regiao": "Orla Exterior", "setor": "Desconhecido", "sistema": "Jabiim", "governo": "Administração Imperial", "afiliacao": "Império Galáctico", "rota_utilizada": "Desconhecida.", "principais_especies": ["Humanos"], "outras_informacoes": "Local de evacuação massiva da rede de contrabando de Jedi." }
];

const regionWeights = {
    "Núcleo": 1,
    "Orla Interior": 3,
    "Orla Média": 5,
    "Orla Exterior": 8
};

const originSelect = document.getElementById('origin');
const destSelect = document.getElementById('destination');
const gateOverlay = document.getElementById('gate');

function initTerminal() {
    database.sort((a, b) => a.nome.localeCompare(b.nome)).forEach((p, idx) => {
        originSelect.add(new Option(p.nome, p.nome));
        destSelect.add(new Option(p.nome, p.nome));
        if (idx === 1) destSelect.options[1].selected = true;
    });

    for (let i = 0; i < 60; i++) {
        let line = document.createElement('div');
        line.className = 'tunnel-line';
        line.style.setProperty('--angle', `${Math.random() * 360}deg`);
        line.style.top = `${Math.random() * 100}%`;
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 0.4}s`;
        gateOverlay.appendChild(line);
    }

    updatePlanetCard('origin');
}

function updatePlanetCard(type) {
    const select = type === 'origin' ? originSelect : destSelect;
    const planet = database.find(p => p.nome === select.value);

    if (!planet) return;

    document.getElementById(`${type}Region`).innerText = `${planet.regiao.toUpperCase()}`;
    document.getElementById('cardNome').innerText = planet.nome.toUpperCase();
    document.getElementById('cardLocal').innerText = `${planet.regiao} // ${planet.setor}`;
    document.getElementById('cardGov').innerText = `${planet.governo} [${planet.afiliacao}]`;
    document.getElementById('cardEspecies').innerText = planet.principais_especies.join(', ');
    document.getElementById('cardDesc').innerText = `${planet.descricao} Rota principal: ${planet.rota_utilizada} ${planet.outras_informacoes}`;
}

function engageHyperdrive() {
    const oName = originSelect.value;
    const dName = destSelect.value;
    const consoleOut = document.getElementById('consoleOut');
    const metricsBox = document.getElementById('metricsBox');

    if (oName === dName) {
        consoleOut.innerText = "> ERRO CÓDIGO 0x44: COORDENADAS COINCIDENTES. ABORTANDO.";
        consoleOut.style.color = "var(--neon-red)";
        metricsBox.classList.remove('show');
        return;
    }

    consoleOut.innerText = "> INICIANDO ALINHAMENTO DE MATRIZ... TRANSMITINDO IMPULSO HIPERESPAÇO.";
    consoleOut.style.color = "var(--amber)";
    metricsBox.classList.remove('show');

    gateOverlay.classList.add('active');

    setTimeout(() => {
        gateOverlay.classList.remove('active');

        const pOrig = database.find(p => p.nome === oName);
        const pDest = database.find(p => p.nome === dName);

        const wOrig = regionWeights[pOrig.regiao] || 4;
        const wDest = regionWeights[pDest.regiao] || 4;

        let baseDistance = Math.abs(wOrig - wDest) * 3500 + (Math.random() * 800 + 400);
        if (baseDistance === 0) baseDistance = 1200 + (Math.random() * 400);

        const parsecs = baseDistance.toFixed(1);
        const jumps = Math.max(1, Math.ceil(parsecs / (pDest.regiao === "Orla Exterior" ? 1400 : 2200)));

        consoleOut.innerText = `> CÁLCULO CONCLUÍDO. ROTA ESTÁVEL CONECTANDO ${pOrig.sistema.toUpperCase()} AO ${pDest.sistema.toUpperCase()}.`;
        consoleOut.style.color = "var(--neon-green)";

        document.getElementById('distOut').innerText = `${parsecs} PC`;
        document.getElementById('jumpsOut').innerText = jumps;
        metricsBox.classList.add('show');
    }, 2200);
}

window.onload = initTerminal;
