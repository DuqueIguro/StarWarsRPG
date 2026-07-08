/* ============================================================
   mtpEffects.js — Camada de vida visual do Terminal Secreto (MTP)
   Partículas holográficas, boot sequence digitada e glitch aleatório.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    criarScanlineNoContainer();
    criarCamposDeParticulas(28);
    rodarBootSequence();
    agendarGlitchAleatorio();
});

/* Insere o retângulo de scanline dentro do .container, sem mexer no HTML existente */
function criarScanlineNoContainer() {
    const container = document.querySelector('.container');
    if (!container) return;
    const scan = document.createElement('div');
    scan.className = 'mtp-scanline';
    container.appendChild(scan);
}

/* Cria um campo de partículas fixo cobrindo a tela toda, atrás do conteúdo */
function criarCamposDeParticulas(qtd) {
    const campo = document.createElement('div');
    campo.className = 'mtp-particles';
    document.body.prepend(campo);

    const cores = ['p-neutro', 'p-euphoria', 'p-imperio', 'p-rebeldes'];

    for (let i = 0; i < qtd; i++) {
        const p = document.createElement('span');
        const cor = cores[Math.floor(Math.random() * cores.length)];
        p.className = `mtp-particle ${cor}`;

        const esquerda = Math.random() * 100;
        const atraso = Math.random() * 8;
        const duracao = 6 + Math.random() * 8;
        const deriva = (Math.random() * 60 - 30).toFixed(0) + 'px';

        p.style.left = `${esquerda}vw`;
        p.style.animationDelay = `${atraso}s`;
        p.style.animationDuration = `${duracao}s`;
        p.style.setProperty('--drift', deriva);

        campo.appendChild(p);
    }
}

/* Efeito de digitação no topo, como um terminal ligando */
function rodarBootSequence() {
    const alvo = document.getElementById('mtp-boot-text');
    if (!alvo) return;

    const linhas = [
        '> Estabelecendo link com o nó oculto...',
        '> Autenticação de assinatura multi-facção: OK',
        '> Descriptografando camadas de sobreposição planetária...',
        '> Sincronizando com Terminal Secreto de Cartografia.'
    ];

    let indiceLinha = 0;
    let indiceChar = 0;
    alvo.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'mtp-cursor';

    function digitar() {
        if (indiceLinha >= linhas.length) {
            alvo.appendChild(cursor);
            return;
        }
        const linhaAtual = linhas[indiceLinha];
        if (indiceChar < linhaAtual.length) {
            alvo.textContent += linhaAtual.charAt(indiceChar);
            indiceChar++;
            setTimeout(digitar, 14);
        } else {
            alvo.textContent += '\n';
            indiceLinha++;
            indiceChar = 0;
            setTimeout(digitar, 220);
        }
    }

    setTimeout(digitar, 400);
}

/* De tempos em tempos, um card aleatório "engasga" como um holograma instável */
function agendarGlitchAleatorio() {
    function disparar() {
        const cards = document.querySelectorAll('.planeta-card');
        if (cards.length > 0) {
            const alvo = cards[Math.floor(Math.random() * cards.length)];
            alvo.classList.add('mtp-glitching');
            setTimeout(() => alvo.classList.remove('mtp-glitching'), 400);
        }
        const proximo = 3000 + Math.random() * 6000;
        setTimeout(disparar, proximo);
    }
    setTimeout(disparar, 2000);
}