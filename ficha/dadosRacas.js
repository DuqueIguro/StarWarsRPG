const DADOS_RACAS = {
    'humano': {
        nome: 'Humano',
        modificadores: {},
        bonusDefesa: {},
        linguagens: ['Básico'],
        notas: 'Recebe uma perícia treinada e um talento bônus no 1º nível.'
    },
    'bothan': {
        nome: 'Bothan',
        modificadores: { des: 2, con: -2 },
        bonusDefesa: { von: 2 },
        linguagens: ['Básico', 'Bothês'],
        notas: 'Vontade de Ferro (+2 de bônus de espécie na Defesa de Vontade). Recebe Foco em Perícia (Obter Informação) como talento bônus se for treinado na perícia.'
    },
    'cereano': {
        nome: 'Cereano',
        modificadores: { int: 2, sab: 2, des: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Cereano'],
        notas: 'Iniciativa Intuitiva (pode re-rolar um teste de Iniciativa). Recebe Foco em Perícia (Iniciativa) como talento bônus se for treinado na perícia.'
    },
    'duros': {
        nome: 'Duros',
        modificadores: { des: 2, int: 2, con: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Durês'],
        notas: 'Piloto Especialista (pode re-rolar qualquer teste de Pilotar).'
    },
    'ewok': {
        nome: 'Ewok',
        modificadores: { des: 2, vig: -2 },
        bonusDefesa: {},
        linguagens: ['Ewokês'],
        notas: 'Tamanho Pequeno. Primitivo. Rastro (sentido de faro aguçado). Furtivo (pode re-rolar testes de Furtividade). Recebe Foco em Perícia (Sobrevivência) como talento bônus se for treinado na perícia.'
    },
    'gamorreano': {
        nome: 'Gamorreano',
        modificadores: { vig: 2, des: -2, int: -2 },
        bonusDefesa: { fort: 2 },
        linguagens: ['Gamorreano', 'Básico (apenas entende)'],
        notas: 'Primitivo. Grande Fortitude (+2 de bônus de espécie na Defesa de Fortitude). Recebe Limiar de Dano Aprimorado como talento bônus.'
    },
    'gungan': {
        nome: 'Gungan',
        modificadores: { des: 2, int: -2, car: -2 },
        bonusDefesa: { ref: 2 },
        linguagens: ['Básico', 'Gunganês'],
        notas: 'Nadador Especialista. Segurar Fôlego. Reflexo Relâmpago (+2 de bônus de espécie na Defesa de Reflexo). Visão na Penumbra. Familiaridade com Armas (atlatl e cesta).'
    },
    'ithoriano': {
        nome: 'Ithoriano',
        modificadores: { sab: 2, car: 2, des: -2 },
        bonusDefesa: { von: 2 },
        linguagens: ['Básico', 'Ithorês'],
        notas: 'Vontade de Ferro (+2 bônus de espécie na Defesa de Vontade). Berro (ataque sônico em cone). Instinto de Sobrevivência (pode re-rolar testes de Sobrevivência). Recebe Foco em Perícia (Conhecimento [ciências biológicas]) como talento bônus se for treinado na perícia.'
    },
    'kel_dor': {
        nome: 'Kel Dor',
        modificadores: { des: 2, sab: 2, con: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Kel Dor'],
        notas: 'Percepção da Força Apurada. Visão na Penumbra. Requer equipamento especial para respirar e enxergar fora de Dorin.'
    },
    'mon_calamariano': {
        nome: 'Mon Calamariano',
        modificadores: { int: 2, sab: 2, con: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Mon Calamariano'],
        notas: 'Respiração Subaquática. Nadador Especialista. Visão na Penumbra. Recebe Foco em Perícia (Percepção) como talento bônus se for treinado na perícia.'
    },
    'quarren': {
        nome: 'Quarren',
        modificadores: { con: 2, sab: -2, car: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Quarrenês'],
        notas: 'Respiração Subaquática. Nadador Especialista. Visão na Penumbra. Recebe Foco em Perícia (Persuasão) como talento bônus se for treinado na perícia.'
    },
    'rodiano': {
        nome: 'Rodiano',
        modificadores: { des: 2, sab: -2, car: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Rodês'],
        notas: 'Consciência Aumentada (pode re-rolar testes de Percepção). Visão na Penumbra. Recebe Foco em Perícia (Sobrevivência) como talento bônus se for treinado na perícia.'
    },
    'sullustano': {
        nome: 'Sullustano',
        modificadores: { des: 2, con: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Sullustês'],
        notas: 'Visão no Escuro. Escalador Especialista. Consciência Aumentada (pode re-rolar testes de Percepção).'
    },
    'trandoshano': {
        nome: 'Trandoshano',
        modificadores: { vig: 2, des: -2 },
        bonusDefesa: {},
        linguagens: ['Básico', 'Dosh'],
        notas: 'Visão no Escuro. Regeneração de Membros. Armadura Natural. Recebe Vitalidade como talento bônus.'
    },
    'twi_lek': {
        nome: 'Twi\'lek',
        modificadores: { int: 2, sab: 2 },
        bonusDefesa: { fort: 2 },
        linguagens: ['Básico', 'Alto Galáctico','Ryl'],
        notas: 'Enganador (pode re-rolar testes de Enganar). Grande Fortitude (+2 bônus de espécie na Defesa de Fortitude). Visão na Penumbra.'
    },
    'wookiee': {
        nome: 'Wookiee',
        modificadores: { vig: 4, con: 2, des: -2, sab: -2, car: -2 },
        bonusDefesa: {},
        linguagens: ['Shyriiwook', 'Básico (apenas entende)'],
        notas: 'Recuperação Extraordinária. Fúria (1/dia). Familiaridade com Arma (bowcaster). Escalador (pode escolher 10 em testes de Escalar).'
    },
    'zabrak': {
        nome: 'Zabrak',
        modificadores: {},
        bonusDefesa: { ref: 1, fort: 1, von: 1 },
        linguagens: ['Básico', 'Zabrak'],
        notas: 'Consciência Aumentada (pode re-rolar testes de Percepção). Defesas Superiores (+1 bônus de espécie em todas as defesas).'
    }
};