/**
 * DADOS MESTRES DO SISTEMA TÁTICO IMPERIAL - GENERAL DUR'TOC
 * 
 * ESCALA DE RECURSOS:
 * 1 FC (Faccred) = 100.000 CI = 100 Toneladas de Matéria-Prima/Peças
 * Exemplo de Manufatura: 1 Caça TIE = 4 Toneladas -> 1 FC produz 25 Caças TIE.
 */

const METRIC_RULES = {
    ci_per_fc: 100000,
    tons_per_fc: 100,
    tons_per_tie: 4,
    ties_per_fc: 25
};

const INITIAL_CATALOG = [
    {
        id: "base_outpost",
        name: "Base de Influência (Posto Avançado)",
        costFC: 10,
        costTons: 1000,
        costCI: 1000000,
        category: "Logística",
        desc: "Filial no planeta; indispensável para comprar ativos ou recrutar na região (1.000 Tons de infraestrutura).",
        hpMax: 20
    },
    {
        id: "sec_garrison",
        name: "Guarnição de Segurança",
        costFC: 5,
        costTons: 500,
        costCI: 500000,
        category: "Militar",
        desc: "Guarda civil barata para policiamento e defesa local contra desordem (500 Tons em quartéis/blindagens leves).",
        hpMax: 10
    },
    {
        id: "stormtrooper_inf",
        name: "Infantaria Stormtrooper",
        costFC: 8,
        costTons: 800,
        costCI: 800000,
        category: "Militar",
        desc: "Tropa de choque imperial de alta disciplina com armaduras e blindados (800 Tons em suprimentos e transporte).",
        hpMax: 15
    },
    {
        id: "navy_fleet",
        name: "Frota de Ataque Marinha",
        costFC: 12,
        costTons: 1200,
        costCI: 1200000,
        category: "Militar",
        desc: "Cruzadores e esquadrões pesados para combate no espaço e bombardeio orbital (1.200 Tons de ligas durasteel).",
        hpMax: 30
    },
    {
        id: "blockade_fleet",
        name: "Frota de Bloqueio",
        costFC: 10,
        costTons: 1000,
        costCI: 1000000,
        category: "Militar",
        desc: "Tranca o espaço orbital do planeta e drena 1d4 de riqueza local (1.000 Tons de naves interceptadoras).",
        hpMax: 25
    },
    {
        id: "counter_intel",
        name: "Contrainteligência",
        costFC: 10,
        costTons: 1000,
        costCI: 1000000,
        category: "Inteligência",
        desc: "Agentes do ISB com transmissores criptografados e armas furtivas (1.000 Tons equivalentes em aparato técnico).",
        hpMax: 10
    },
    {
        id: "informants",
        name: "Informantes",
        costFC: 5,
        costTons: 500,
        costCI: 500000,
        category: "Inteligência",
        desc: "Rede de espionagem e sensores de varredura para revelar células rebeldes e alvos ocultos (500 Tons de equipamento).",
        hpMax: 8
    },
    {
        id: "saboteurs",
        name: "Sabotadores",
        costFC: 11,
        costTons: 1100,
        costCI: 1100000,
        category: "Inteligência",
        desc: "Comandos táticos e cargas de baradium para travar o macro inimigo por 1 turno (1.100 Tons em explosivos e armamento).",
        hpMax: 10
    },
    {
        id: "politicians",
        name: "Políticos & Diplomatas",
        costFC: 8,
        costTons: 800,
        costCI: 800000,
        category: "Político",
        desc: "Suborno, tráfico de influência no Moffato e manobras legais (800 Tons em presentes de luxo e contratos).",
        hpMax: 8
    },
    {
        id: "smugglers",
        name: "Contrabandistas",
        costFC: 6,
        costTons: 600,
        costCI: 600000,
        category: "Logística",
        desc: "Naves modificadas com porões ocultos para furar bloqueios e contrabandear cargas (600 Tons).",
        hpMax: 12
    },
    {
        id: "stealth_transport",
        name: "Transporte Secreto",
        costFC: 12,
        costTons: 1200,
        costCI: 1200000,
        category: "Logística",
        desc: "Embarcações revestidas com ligas anti-radar para mover tropas sem detecção (1.200 Tons de fuselagem blindada).",
        hpMax: 20
    },
    {
        id: "agitators",
        name: "Agitadores de Massas",
        costFC: 16,
        costTons: 1600,
        costCI: 1600000,
        category: "Político",
        desc: "Propaganda, armas clandestinas e fundos de greve para gerar caos e paralisar patrulhas inimigas.",
        hpMax: 10
    },
    {
        id: "industrial_complex",
        name: "Complexo Industrial",
        costFC: 12,
        costTons: 1200,
        costCI: 1200000,
        category: "Logística",
        desc: "Fábrica e usinagem pesada com forjas para manufatura contínua (1.200 Tons em maquinário industrial).",
        hpMax: 35
    },
    {
        id: "freighters",
        name: "Cargueiros Pesados",
        costFC: 9,
        costTons: 900,
        costCI: 900000,
        category: "Logística",
        desc: "Naves de transporte capazes de carregar milhares de toneladas de matéria-prima entre mundos (900 Tons).",
        hpMax: 22
    },
    {
        id: "research_center",
        name: "Centro de Pesquisa Avançada",
        costFC: 33,
        costTons: 3300,
        costCI: 3300000,
        category: "Logística",
        desc: "Complexo de alta tecnologia com túneis de vento e simuladores para testes do TIE Defender (3.300 Tons).",
        hpMax: 40
    }
];

const INITIAL_FACILITIES = {
    mcmt1: {
        id: "mcmt1",
        name: "Oficina MCMT 1 (Coruscant)",
        location: "Coruscant",
        type: "Oficina Privada",
        description: "Oficina mecânica principal de Dur'toc nos níveis intermediários da Cidade Galáctica.",
        credits: 450000,
        faccreds: 12, // 1.200 Tons de peças
        laborCostCI: 35000,
        maintCostFC: 1, // 100 Tons/giro em peças
        incomeCI: 95000,
        status: "Operação Normal"
    },
    mcmt2: {
        id: "mcmt2",
        name: "Oficina MCMT 2 (Coruscant)",
        location: "Coruscant",
        type: "Oficina Privada",
        description: "Segunda oficina comercial voltada a retífica e serviços mecânicos de frotas civis.",
        credits: 320000,
        faccreds: 8, // 800 Tons de peças
        laborCostCI: 25000,
        maintCostFC: 1,
        incomeCI: 70000,
        status: "Operação Normal"
    },
    fab1: {
        id: "fab1",
        name: "Complexo Fabril 1 (Lothal)",
        location: "Lothal",
        type: "Fábrica Imperial",
        description: "Linha principal de fundição e montagem seriada de caças TIE e andadores.",
        credits: 1200000,
        faccreds: 25, // 2.500 Tons (capacidade para até 625 caças TIE padrão)
        laborCostCI: 110000,
        maintCostFC: 3, // 300 Tons/giro em ligas e componentes
        incomeCI: 260000,
        status: "Meta Imperial Ativa"
    },
    fab2: {
        id: "fab2",
        name: "Complexo Fabril 2 (Lothal)",
        location: "Lothal",
        type: "Fábrica Imperial",
        description: "Instalação de blindagem, propulsores iônicos e suporte à guarnição regional.",
        credits: 980000,
        faccreds: 18, // 1.800 Tons
        laborCostCI: 90000,
        maintCostFC: 2,
        incomeCI: 220000,
        status: "Meta Imperial Ativa"
    },
    lab_tie: {
        id: "lab_tie",
        name: "Laboratório de P&D TIE/d (Lothal)",
        location: "Lothal",
        type: "Centro de P&D Secreto",
        description: "Instalação subterrânea reservada ao desenvolvimento e forja dos protótipos do TIE Defender.",
        credits: 1500000,
        faccreds: 35, // 3.500 Tons de ligas nobres e cristais hiperespaciais
        laborCostCI: 140000,
        maintCostFC: 4,
        incomeCI: 0,
        status: "Em Pesquisa Intensiva"
    }
};

const INITIAL_ASSETS = [
    {
        id: "ast_1",
        templateId: "stormtrooper_inf",
        name: "501º Destacamento de Guarnição",
        category: "Militar",
        location: "Lothal",
        facilityId: "fab1",
        hp: 15,
        hpMax: 15,
        maintCI: 10000,
        status: "Pronto"
    },
    {
        id: "ast_2",
        templateId: "counter_intel",
        name: "Célula de Segurança ISB - Lothal",
        category: "Inteligência",
        location: "Lothal",
        facilityId: "lab_tie",
        hp: 10,
        hpMax: 10,
        maintCI: 15000,
        status: "Vigilância Ativa"
    },
    {
        id: "ast_3",
        templateId: "freighters",
        name: "Cargueiro Pesado 'Dread-Hauler'",
        category: "Logística",
        location: "Coruscant",
        facilityId: "mcmt1",
        hp: 22,
        hpMax: 22,
        maintCI: 12000,
        status: "Em Rota"
    },
    {
        id: "ast_4",
        templateId: "sec_garrison",
        name: "Vigilantes Civis de Coruscant",
        category: "Militar",
        location: "Coruscant",
        facilityId: "mcmt2",
        hp: 10,
        hpMax: 10,
        maintCI: 5000,
        status: "Patrulha"
    }
];
