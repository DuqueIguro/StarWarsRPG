document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const commandInput = document.getElementById('commandInput');
    const terminalBody = document.getElementById('terminal-body');

    const welcomeMessage = "Conectando ao sistema de suporte...\nConexão estabelecida.\n\nBem-vindo ao Terminal de Manutenção. Digite 'ajuda' para uma lista de comandos.";
    let commandHistory = [];
    let historyIndex = -1;

    const commands = {
        'ajuda': 'Comandos disponíveis:\n  faq - Exibe perguntas frequentes.\n  reportar - Inicia o processo de reporte de bug.\n  limpar - Limpa a tela do terminal.\n  creditos - Exibe os créditos.',
        'faq': 'Perguntas Frequentes:\n\nQ: Como acesso minha ficha?\nA: Navegue para a página "ficha.html".\n\nQ: Onde posso ver as naves?\nA: Visite o "hangar.html".\n\nQ: Esqueci minha senha.\nA: Contate o Mestre do Jogo diretamente.',
        'reportar': 'Para reportar um bug, envie um email para o endereço de suporte: murilohiulgabr@gmail.com com o assunto "Star Wars RPG - Reporte de Bug".\nPor favor, inclua uma descrição detalhada e, se possível, capturas de tela.',
        'limpar': () => {
            output.innerHTML = '';
            return '';
        },
        'creditos': 'Desenvolvido por Duque Iguro e EidenFox.\nInspirado no universo de Star Wars.',
    };

    function print(message, className = '') {
        const p = document.createElement('p');
        p.textContent = message;
        if (className) {
            p.className = className;
        }
        output.appendChild(p);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function executeCommand(command) {
        commandHistory.unshift(command);
        historyIndex = -1;
        print(`> ${command}`);
        if (commands[command]) {
            const result = commands[command];
            if (typeof result === 'function') {
                const funcResult = result();
                if (funcResult) print(funcResult);
            } else {
                print(result, 'info');
            }
        } else {
            print(`Erro: comando '${command}' não encontrado.`, 'error');
        }
    }

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && commandInput.value.trim() !== '') {
            executeCommand(commandInput.value.trim().toLowerCase());
            commandInput.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                commandInput.value = '';
            }
        }
    });

    // Efeito de digitação para a mensagem de boas-vindas
    let i = 0;
    function typeWriter() {
        if (i < welcomeMessage.length) {
            output.innerHTML += welcomeMessage.charAt(i);
            i++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(typeWriter, 25);
        }
    }

    typeWriter();
});