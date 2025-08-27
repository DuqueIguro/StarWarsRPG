document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const commandInput = document.getElementById('commandInput');
    const terminalBody = document.getElementById('terminal-body');

    const welcomeMessage = "Conectando ao sistema de suporte...\nConexão estabelecida.\n\nBem-vindo ao Terminal de Manutenção. \n\nDigite 'ajuda' para uma lista de comandos.";
    let commandHistory = [];
    let historyIndex = -1;

    function print(message, className = '') {
        const p = document.createElement('p');
        if (className) {
            p.className = className;
        }
        p.innerHTML = message; // Usando innerHTML para permitir tags HTML no formulário
        output.appendChild(p);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function showBugReportForm() {
        commandInput.disabled = true; // Desabilita o input principal
        const formContainer = document.createElement('div');
        formContainer.id = 'bug-report-form';

        const formHTML = `
            <p>Seu nome:</p>
            <input type="text" id="reporter-name" class="form-input">
            <p>Reportar para o Dev:</p>
            <select id="dev-select" class="form-select">
                <option value="Duque Iguro">Duque Iguro</option>
                <option value="EidenFox">EidenFox</option>
            </select>
            <p>Página do Bug:</p>
            <input type="text" id="bug-page" class="form-input" placeholder="Ex: ficha.html">
            <p>Descrição do Bug:</p>
            <textarea id="bug-description" class="form-textarea" rows="4"></textarea>
            <button id="submit-bug-report" class="form-button">Enviar Report</button>
            <button id="cancel-bug-report" class="form-button">Cancelar</button>
        `;
        formContainer.innerHTML = formHTML;
        output.appendChild(formContainer);
        terminalBody.scrollTop = terminalBody.scrollHeight;

        document.getElementById('submit-bug-report').addEventListener('click', () => {
            const reporterName = document.getElementById('reporter-name').value;
            const dev = document.getElementById('dev-select').value;
            const bugPage = document.getElementById('bug-page').value;
            const bugDescription = document.getElementById('bug-description').value;

            if (reporterName && dev && bugPage && bugDescription) {
                print(`\n<span class="success">Bug reportado com sucesso!</span>\nObrigado, ${reporterName}. O Dev ${dev} foi notificado.`, 'success');
                formContainer.remove();
                commandInput.disabled = false;
                commandInput.focus();
            } else {
                print('\n<span class="error">Erro: Por favor, preencha todos os campos.</span>', 'error');
            }
        });

        document.getElementById('cancel-bug-report').addEventListener('click', () => {
            print('\n<span class="info">Reporte de bug cancelado.</span>', 'info');
            formContainer.remove();
            commandInput.disabled = false;
            commandInput.focus();
        });
    }

    const commands = {
        'ajuda': 'Comandos disponíveis:\n  faq - Exibe perguntas frequentes.\n  reportar - Inicia o processo de reporte de bug.\n  limpar - Limpa a tela do terminal.\n  creditos - Exibe os créditos.',

        'faq': 'Perguntas Frequentes:\n\nQ: Como acesso minha ficha?\nA: Navegue para a página "ficha.html".\n\nQ: Onde posso ver as naves?\nA: Visite o "hangar.html".\n\nQ: Esqueci minha senha.\nA: Contate o Mestre do Jogo diretamente.',

        'reportar': () => {
            print('Iniciando formulário de reporte de bug...');
            showBugReportForm();
        },

        'limpar': () => {
            output.innerHTML = '';
            // Recria a mensagem de boas vindas para um contexto limpo
            typeWriter(welcomeMessage, true);
            return '';
        },
        
        'creditos': 'Desenvolvido por Duque Iguro e EidenFox.\nInspirado no universo de Star Wars.',
    };
    
    function executeCommand(command) {
        commandHistory.unshift(command);
        historyIndex = -1;
        print(`> ${command}`);
        if (commands[command]) {
            const result = commands[command];
            if (typeof result === 'function') {
                const funcResult = result();
                if (funcResult) print(funcResult, 'info');
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
    function typeWriter(text, clear = false) {
        if(clear) {
            output.innerHTML = '';
            i = 0;
        }
        if (i < text.length) {
            output.innerHTML += text.charAt(i);
            i++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(() => typeWriter(text), 25);
        }
    }

    typeWriter(welcomeMessage);
});