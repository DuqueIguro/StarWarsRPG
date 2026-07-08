const DADOS_CLASSES = {
    'jedi': {
        nome: 'Jedi',
        bonusDefesa: { fort: 1, ref: 1, von: 1 },
        talentosIniciais: ['Sensitividade da Força', 'Prof.Sabres de luz', 'Prof.Arma simples'],
        bba: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        pvIniciais: 30, 
        dadoVida: 10     
    },
    'nobre': {
        nome: 'Nobre',
        bonusDefesa: { fort: 0, ref: 1, von: 2 },
        talentosIniciais: ['Lingüística', 'Prof.Pistolas', 'Prof.Arma simples'],
        bba: [0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15],
        pvIniciais: 18, 
        dadoVida: 6      
    },
    'vigarista': {
        nome: 'Vigarista',
        bonusDefesa: { fort: 0, ref: 2, von: 1 },
        talentosIniciais: ['Tiro à Queima Roupa', 'Prof.Pistolas', 'Prof.Armas simples'],
        bba: [0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15],
        pvIniciais: 18, 
        dadoVida: 6      
    },
    'batedor': {
        nome: 'Batedor',
        bonusDefesa: { fort: 1, ref: 2, von: 0 },
        talentosIniciais: ['Se Livrar', 'Prof.Pistolas', 'Prof.Rifles', 'Prof.Armas simples)'],
        bba: [0, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 9, 9, 10, 11, 12, 12, 13, 14, 15],
        pvIniciais: 24, 
        dadoVida: 8      
    },
    'soldado': {
        nome: 'Soldado',
        bonusDefesa: { fort: 2, ref: 1, von: 0 },
        talentosIniciais: ['Prof.Armadura leve', 'Prof.Armadura média', 'Prof.Pistolas', 'Prof.Rifles', 'Prof.Armas simples'],
        bba: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        pvIniciais: 30, 
        dadoVida: 10     
    }
};