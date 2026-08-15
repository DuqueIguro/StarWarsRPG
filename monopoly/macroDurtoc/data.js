/**
 * DADOS MESTRES DO SISTEMA TÁTICO IMPERIAL - GENERAL DUR'TOC
 */

const INITIAL_CATALOG = [
    {
        id: "base_outpost",
        name: "Base de Influência (Posto Avançado)",
        costFC: 10,
        costCI: 1000000,
        category: "Logística",
        desc: "Filial no planeta; indispensável para comprar ativos ou recrutar na região.",
        hpMax: 20
    },
    {
        id: "sec_garrison",
        name: "Guarnição de Segurança",
        costFC: 5,
        costCI: 500000,
        category: "Militar",
        desc: "Guarda civil barata para policiamento e defesa local contra desordem.",
        hpMax: 10
    },
    {
        id: "stormtrooper_inf",
        name: "Infantaria Stormtrooper",
        costFC: 8,
        costCI: 800000,
        category: "Militar",
        desc: "Tropa de choque imperial altamente disciplinada para assaltos táticos.",
        hpMax: 15
    },
    {
        id: "navy_fleet",
        name: "Frota de Ataque Marinha",
        costFC: 12,
        costCI: 1200000,
        category: "Militar",
        desc: "Superioridade aeroespacial, combate de frotas e bombardeio orbital.",
        hpMax: 30
    },
    {
        id: "blockade_fleet",
        name: "Frota de Bloqueio",
        costFC: 10,
        costCI: 1000000,
        category: "Militar",
        desc: "Tranca o tráfego espacial do planeta e drena 1d4 de riqueza por turno.",
        hpMax: 25
    },
    {
        id: "counter_intel",
        name: "Contrainteligência",
        costFC: 10,
        costCI: 1000000,
        category: "Inteligência",
        desc: "Agentes do ISB/Especiais que caçam e anulam espiões e sabotadores inimigos.",
        hpMax: 10
    },
    {
        id: "informants",
        name: "Informantes",
        costFC: 5,
        costCI: 500000,
        category: "Inteligência",
        desc: "Varredura contínua para revelar células rebeldes e ameaças ocultas.",
        hpMax: 8
    },
    {
        id: "saboteurs",
        name: "Sabotadores",
        costFC: 11,
        costCI: 1100000,
        category: "Inteligência",
        desc: "Infiltração especializada capaz de paralisar o macro inimigo por 1 turno.",
        hpMax: 10
    },
    {
        id: "politicians",
        name: "Políticos & Diplomatas",
        costFC: 8,
        costCI: 800000,
        category: "Político",
        desc: "Articulação burocrática no Senado/Moffato, pressão fiscal e corrupção.",
        hpMax: 8
    },
    {
        id: "smugglers",
        name: "Contrabandistas",
        costFC: 6,
        costCI: 600000,
        category: "Logística",
        desc: "Canais escusos para furar bloqueios e mover cargas não rastreadas.",
        hpMax: 12
    },
    {
        id: "stealth_transport",
        name: "Transporte Secreto",
        costFC: 12,
        costCI: 1200000,
        category: "Logística",
        desc: "Mover frotas e regimentos inteiros entre sistemas sem ser detectado.",
        hpMax: 20
    },
    {
        id: "agitators",
        name: "Agitadores de Massas",
        costFC: 16,
        costCI: 1600000,
        category: "Político",
        desc: "Criam protestos, greves e tumultos civis para travar patrulhas inimigas.",
        hpMax: 10
    },
    {
        id: "industrial_complex",
        name: "Complexo Industrial",
        costFC: 12,
        costCI: 1200000,
        category: "Logística",
        desc: "Fábrica e linha de montagem para produção de maquinário pesado.",
        hpMax: 35
    },
    {
        id: "freighters",
        name: "Cargueiros Pesados",
        costFC: 9,
        costCI: 900000,
        category: "Logística",
        desc: "Naves de frete para movimentação de grandes volumes de peças e Faccreds.",
        hpMax: 22
    },
    {
        id: "research_center",
        name: "Centro de Pesquisa Avançada",
        costFC: 33,
        costCI: 3300000,
        category: "Logística",
        desc: "Laboratório de alta tecnologia para criar, proteger e testar protótipos.",
        hpMax: 40
    }
];

const INITIAL_FACILITIES = {
    mcmt1: {
        id: "mcmt1",
        name: "Oficina MCMT 1 (Coruscant)",
        location: "Coruscant",
        type: "Oficina Privada",
        description: "Oficina mecânica principal de Dur'toc nos níveis médios de Coruscant.",
        credits: 450000,
        faccreds: 12,
        laborCostCI: 35000,
        maintCostFC: 1,
        incomeCI: 95000,
        status: "Operação Normal"
    },
    mcmt2: {
        id: "mcmt2",
        name: "Oficina MCMT 2 (Coruscant)",
        location: "Coruscant",
        type: "Oficina Privada",
        description: "Segunda oficina comercial voltada a reparos de naves civis e cargueiros.",
        credits: 320000,
        faccreds: 8,
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
        description: "Grande linha de montagem e usinagem para caças TIE e veículos terrestres.",
        credits: 1200000,
        faccreds: 25,
        laborCostCI: 110000,
        maintCostFC: 3,
        incomeCI: 260000,
        status: "Meta Imperial Ativa"
    },
    fab2: {
        id: "fab2",
        name: "Complexo Fabril 2 (Lothal)",
        location: "Lothal",
        type: "Fábrica Imperial",
        description: "Instalação de blindagem, propulsão e manutenção da guarnição de Lothal.",
        credits: 980000,
        faccreds: 18,
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
        description: "Complexo subterrâneo isolado para desenvolvimento do TIE Defender.",
        credits: 1500000,
        faccreds: 35,
        laborCostCI: 140000,
        maintCostFC: 4,
        incomeCI: 0, // P&D drena recursos, não produz receita direta de venda
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
